import type Stripe from "stripe";
import { shows } from "@/data/shows";
import { getServerPrices } from "@/lib/pricing";
import {
  BOGO_CODE,
  BOGO_LABEL,
  DISCOUNTS,
  parseDiscountType,
  type DiscountType,
  type OrderAdjustment,
} from "@/lib/adjustments";
import type { ConfirmationItem, OrderConfirmationData } from "@/lib/order-confirmation-template";

/**
 * An order lives entirely on its Stripe PaymentIntent: there is no database
 * yet. The checkout page and the webhook backstop both rebuild the same order
 * from the same PaymentIntent, so every derived value here must be a pure
 * function of the intent. Nothing may depend on wall-clock time or request
 * order, or the two paths would disagree about what the customer bought.
 */

export interface CartLine {
  id: string;
  date: string;
  time?: string;
  adults: number;
  children: number;
  seatingTier?: string;
}

/** Stable, human-readable order number derived from the PaymentIntent. */
export function orderNumberFor(paymentIntentId: string): string {
  return `BRN-${paymentIntentId.replace(/^pi_/, "").slice(-8).toUpperCase()}`;
}

/** The number the box office quotes back to us. */
export function confirmationNumberFor(paymentIntentId: string): string {
  return paymentIntentId.replace(/^pi_/, "").slice(0, 16).toUpperCase();
}

/**
 * One metadata key per line item. Stripe caps a metadata value at 500
 * characters, so packing the whole cart into a single JSON string truncates
 * (and therefore corrupts) larger orders.
 */
export function packCartMetadata(lines: CartLine[]): Record<string, string> {
  const out: Record<string, string> = {};
  lines.slice(0, 40).forEach((line, i) => {
    out[`item${i}`] = JSON.stringify({
      i: line.id,
      d: line.date,
      t: line.time ?? "",
      a: line.adults,
      c: line.children,
      s: line.seatingTier ?? "",
    }).slice(0, 500);
  });
  return out;
}

export function unpackCartMetadata(metadata: Stripe.Metadata): CartLine[] {
  const lines: CartLine[] = [];
  for (let i = 0; i < 40; i++) {
    const raw = metadata[`item${i}`];
    if (!raw) break;
    try {
      const p = JSON.parse(raw) as {
        i: string;
        d: string;
        t?: string;
        a: number;
        c: number;
        s?: string;
      };
      lines.push({
        id: p.i,
        date: p.d,
        time: p.t || undefined,
        adults: Number(p.a) || 0,
        children: Number(p.c) || 0,
        seatingTier: p.s || undefined,
      });
    } catch {
      // A single unreadable line should not sink the whole order: the office
      // still needs the alert so a human can look it up in Stripe.
    }
  }
  return lines;
}

/**
 * The adjustments an intent locked in at creation, from metadata snapshots
 * written alongside the amount (so they stay correct even if the discount
 * table or a show's BOGO flag changes later). `discountCents` falls back to
 * today's table when only the type survived. Intents created before these
 * features existed carry no keys and parse to none / 0 / 0, which is what
 * keeps every old order verifying.
 */
export function adjustmentsFromMetadata(
  metadata: Stripe.Metadata | null | undefined
): {
  discountType: DiscountType;
  discountCents: number;
  bogoCents: number;
  adjustments: OrderAdjustment[];
} {
  const adjustments: OrderAdjustment[] = [];

  const bogoSnapshot = Number.parseInt(metadata?.bogoCents ?? "", 10);
  const bogoCents =
    Number.isFinite(bogoSnapshot) && bogoSnapshot > 0 ? bogoSnapshot : 0;
  if (bogoCents > 0) {
    adjustments.push({ code: BOGO_CODE, label: BOGO_LABEL, amountCents: -bogoCents });
  }

  const discountType = parseDiscountType(metadata?.discountType);
  let discountCents = 0;
  if (discountType !== "none") {
    const snapshot = Number.parseInt(metadata?.discountCents ?? "", 10);
    discountCents =
      Number.isFinite(snapshot) && snapshot >= 0
        ? snapshot
        : DISCOUNTS[discountType].amountCents;
    adjustments.push({
      code: discountType,
      label: DISCOUNTS[discountType].label,
      amountCents: -discountCents,
    });
  }

  return { discountType, discountCents, bogoCents, adjustments };
}

/** Fills in show name, theater, and authoritative prices from the catalog. */
export function hydrateLines(lines: CartLine[]): ConfirmationItem[] {
  return lines.map((line) => {
    const show = shows.find((s) => s.slug === line.id);
    const prices = getServerPrices(line.id);
    return {
      name: show?.name ?? line.id,
      date: line.date,
      time: line.time,
      adults: line.adults,
      children: line.children,
      seatingTier: line.seatingTier,
      theaterName: show?.theater,
      pricePerAdult: prices?.adult ?? 0,
      pricePerChild: prices?.child ?? 0,
    };
  });
}

/**
 * Rebuilds a confirmation from the PaymentIntent alone. Used by the webhook
 * when the customer closed the tab before the browser could call us.
 * Returns null when the intent carries no usable line items.
 */
export function confirmationFromPaymentIntent(
  pi: Stripe.PaymentIntent
): OrderConfirmationData | null {
  const lines = unpackCartMetadata(pi.metadata ?? {});
  if (lines.length === 0) return null;

  const { adjustments } = adjustmentsFromMetadata(pi.metadata);

  return {
    customerName: pi.metadata?.customerName || "Customer",
    customerEmail: pi.metadata?.customerEmail || pi.receipt_email || "",
    customerPhone: pi.metadata?.customerPhone || "",
    orderNumber: orderNumberFor(pi.id),
    items: hydrateLines(lines),
    ...(adjustments.length > 0 ? { adjustments } : {}),
    // Always the amount Stripe actually captured, never a recomputed figure.
    totalAmount: pi.amount / 100,
    paymentIntentId: pi.id,
  };
}
