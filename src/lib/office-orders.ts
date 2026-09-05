import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { shows } from "@/data/shows";
import {
  adjustmentsFromMetadata,
  confirmationNumberFor,
  orderNumberFor,
  unpackCartMetadata,
} from "@/lib/order";

/**
 * Read models for the /office voucher desk. Orders still live entirely on
 * their Stripe PaymentIntent (see order.ts); these helpers only reshape an
 * intent for the desk, they never write.
 */

export interface OfficeOrderItem {
  /** Show slug, the cart line id. The amount check needs it back unchanged. */
  id: string;
  name: string;
  theaterName?: string;
  theaterAddress?: string;
  date: string;
  time?: string;
  adults: number;
  children: number;
  seatingTier?: string;
}

export interface OfficeOrder {
  paymentIntentId: string;
  orderNumber: string;
  confirmationNumber: string;
  /** Unix seconds. */
  created: number;
  totalAmount: number;
  /** e.g. "Senior discount (55+): $5.00 off", so a below-list total is no surprise. */
  discountLabel: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OfficeOrderItem[];
  voucherSentAt: string | null;
  confirmationSentAt: string | null;
}

export function officeOrderFromIntent(pi: Stripe.PaymentIntent): OfficeOrder | null {
  if (pi.status !== "succeeded") return null;
  const lines = unpackCartMetadata(pi.metadata ?? {});
  // No cart lines means this intent is not a ticket order (Passport
  // subscription invoices land here too) or its metadata is unreadable.
  if (lines.length === 0) return null;

  const items: OfficeOrderItem[] = lines.map((line) => {
    const show = shows.find((s) => s.slug === line.id);
    return {
      id: line.id,
      name: show?.name ?? line.id,
      theaterName: show?.theater,
      theaterAddress: show?.theaterAddress,
      date: line.date,
      time: line.time,
      adults: line.adults,
      children: line.children,
      seatingTier: line.seatingTier,
    };
  });

  const locked = adjustmentsFromMetadata(pi.metadata);

  return {
    paymentIntentId: pi.id,
    orderNumber: orderNumberFor(pi.id),
    confirmationNumber: confirmationNumberFor(pi.id),
    created: pi.created,
    totalAmount: pi.amount / 100,
    discountLabel:
      locked.discountCents > 0
        ? `${locked.adjustments[0].label}: $${(locked.discountCents / 100).toFixed(2)} off`
        : null,
    customerName: pi.metadata?.customerName || "",
    customerEmail: pi.metadata?.customerEmail || pi.receipt_email || "",
    customerPhone: pi.metadata?.customerPhone || "",
    items,
    voucherSentAt: pi.metadata?.voucherSentAt || null,
    confirmationSentAt: pi.metadata?.confirmationSentAt || null,
  };
}

/** Newest first, ticket orders only. */
export async function listOfficeOrders(): Promise<OfficeOrder[]> {
  const res = await stripe.paymentIntents.list({ limit: 100 });
  return res.data
    .map(officeOrderFromIntent)
    .filter((o): o is OfficeOrder => o !== null);
}

export async function getOfficeOrder(paymentIntentId: string): Promise<OfficeOrder | null> {
  if (!/^pi_[A-Za-z0-9]+$/.test(paymentIntentId)) return null;
  try {
    const pi = await stripe.paymentIntents.retrieve(paymentIntentId);
    return officeOrderFromIntent(pi);
  } catch {
    return null;
  }
}

/** Branson-local timestamp for the desk. */
export function officeTime(unixSeconds: number): string {
  return new Date(unixSeconds * 1000).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
