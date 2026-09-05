import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { adjustmentsFromMetadata, hydrateLines, unpackCartMetadata } from "@/lib/order";
import { applyAdjustments } from "@/lib/adjustments";
import { sendAbandonedCartOfficeAlert, sendCartRecoveryEmail } from "@/lib/email";
import { renderCartRecoverySms, type CartRecoveryData } from "@/lib/cart-recovery-template";
import { sendSms, smsConfigured, toE164 } from "@/lib/sms";
import { siteConfig } from "@/lib/config";

/**
 * Abandoned-checkout recovery. Checkout creates a PaymentIntent the moment
 * the page loads and stamps contact details onto it as the buyer types, so an
 * abandoned cart IS an incomplete PaymentIntent with a customerEmail. There
 * is no database to keep in sync: this scan reads Stripe, sends at most one
 * reminder per intent, and records that send back onto the intent's metadata.
 */

/** Set once the reminder went out; the value is the ISO send time. */
const RECOVERY_FLAG = "recoverySentAt";

/** Ignore carts younger than this: the buyer may still be mid-checkout. */
const MIN_AGE_MINUTES = 45;
/** Ignore carts older than this: a days-old nudge reads as spam. */
const MAX_AGE_HOURS = 36;

const INCOMPLETE_STATUSES: Stripe.PaymentIntent.Status[] = [
  "requires_payment_method",
  "requires_confirmation",
  "requires_action",
];

export interface RecoveryRunSummary {
  scanned: number;
  reminded: number;
  smsSent: number;
  skipped: Record<string, number>;
  /** Order numbers style ids of the intents reminded, for the cron log. */
  remindedIntents: string[];
}

export interface RecoveryRunOptions {
  /**
   * Overrides the quiet period before a cart counts as abandoned. The office
   * "sweep now" button passes 0; the hourly cron always uses the default.
   */
  minAgeMinutes?: number;
}

/** YYYY-MM-DD for "now" in Branson, matching the date strings carts carry. */
function chicagoToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** The next calendar day for a YYYY-MM-DD string, timezone-free. */
function nextDay(isoDate: string): string {
  const d = new Date(`${isoDate}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + 1);
  return d.toISOString().slice(0, 10);
}

async function listWindow(gte: number, lte: number): Promise<Stripe.PaymentIntent[]> {
  const out: Stripe.PaymentIntent[] = [];
  let starting_after: string | undefined;
  for (;;) {
    const page = await stripe.paymentIntents.list({
      limit: 100,
      created: { gte, lte },
      ...(starting_after ? { starting_after } : {}),
    });
    out.push(...page.data);
    if (!page.has_more || page.data.length === 0) break;
    starting_after = page.data[page.data.length - 1].id;
  }
  return out;
}

/** Emails that completed a payment recently; never remind these people. */
async function recentBuyerEmails(now: number): Promise<Set<string>> {
  const emails = new Set<string>();
  const weekAgo = now - 7 * 24 * 3600;
  const pis = await listWindow(weekAgo, now);
  for (const pi of pis) {
    if (pi.status !== "succeeded") continue;
    for (const e of [pi.metadata?.customerEmail, pi.receipt_email]) {
      if (e) emails.add(e.trim().toLowerCase());
    }
  }
  return emails;
}

export async function runCartRecovery(
  options: RecoveryRunOptions = {}
): Promise<RecoveryRunSummary> {
  const minAgeMinutes = options.minAgeMinutes ?? MIN_AGE_MINUTES;
  const now = Math.floor(Date.now() / 1000);
  const summary: RecoveryRunSummary = {
    scanned: 0,
    reminded: 0,
    smsSent: 0,
    skipped: {},
    remindedIntents: [],
  };
  const skip = (reason: string) => {
    summary.skipped[reason] = (summary.skipped[reason] ?? 0) + 1;
  };

  const candidates = await listWindow(
    now - MAX_AGE_HOURS * 3600,
    now - minAgeMinutes * 60
  );
  summary.scanned = candidates.length;

  const today = chicagoToday();
  const tomorrow = nextDay(today);
  const buyers = await recentBuyerEmails(now);

  // Newest cart wins per email; all of that email's intents get stamped so a
  // buyer who reloaded checkout four times still gets exactly one reminder.
  const byEmail = new Map<string, Stripe.PaymentIntent[]>();
  for (const pi of candidates) {
    if (!INCOMPLETE_STATUSES.includes(pi.status)) {
      skip("not-incomplete");
      continue;
    }
    if (pi.metadata?.[RECOVERY_FLAG]) {
      skip("already-reminded");
      continue;
    }
    const email = (pi.metadata?.customerEmail ?? "").trim().toLowerCase();
    if (!email || !email.includes("@")) {
      skip("no-contact");
      continue;
    }
    if (!pi.metadata?.item0) {
      skip("no-items");
      continue;
    }
    if (buyers.has(email)) {
      skip("already-purchased");
      continue;
    }
    const group = byEmail.get(email) ?? [];
    group.push(pi);
    byEmail.set(email, group);
  }

  const officeRows: {
    name: string;
    email: string;
    phone: string;
    total: number;
    summary: string;
    createdUnix: number;
  }[] = [];

  for (const [, group] of byEmail) {
    group.sort((a, b) => b.created - a.created);
    const pi = group[0];

    const lines = unpackCartMetadata(pi.metadata ?? {}).filter(
      (line) => line.date >= today
    );
    if (lines.length === 0) {
      skip("show-date-passed");
      continue;
    }

    const items = hydrateLines(lines);
    // Same math as checkout: catalog subtotal minus whatever discount the
    // abandoned intent had locked in, so the emailed total matches what the
    // customer saw (and what the resumed cart will charge).
    const { adjustments } = adjustmentsFromMetadata(pi.metadata);
    const subtotalCents = items.reduce(
      (sum, i) =>
        sum +
        Math.round(i.pricePerAdult * 100) * i.adults +
        Math.round(i.pricePerChild * 100) * i.children,
      0
    );
    const total = applyAdjustments(subtotalCents, adjustments) / 100;
    const earliest = [...lines].map((l) => l.date).sort()[0];

    const data: CartRecoveryData = {
      customerName: pi.metadata?.customerName ?? "",
      customerEmail: pi.metadata.customerEmail,
      items,
      ...(adjustments.length > 0 ? { adjustments } : {}),
      totalAmount: total,
      resumeUrl: `${siteConfig.url}/cart/resume?pi=${pi.id}`,
      showIsSoon: earliest === today || earliest === tomorrow,
    };

    // Claim every intent in the group before sending (same pattern as
    // dispatchOrderConfirmation): a concurrent run must see the flag.
    const stamped: Stripe.PaymentIntent[] = [];
    try {
      for (const g of group) {
        await stripe.paymentIntents.update(g.id, {
          metadata: { [RECOVERY_FLAG]: new Date().toISOString() },
        });
        stamped.push(g);
      }
      await sendCartRecoveryEmail(data);
    } catch (err) {
      console.error("cart-recovery send failed:", pi.id, err);
      // Release the claims so the next hourly run can retry the send.
      for (const g of stamped) {
        try {
          await stripe.paymentIntents.update(g.id, {
            metadata: { [RECOVERY_FLAG]: "" },
          });
        } catch (releaseErr) {
          console.error("cart-recovery release failed:", g.id, releaseErr);
        }
      }
      skip("send-failed");
      continue;
    }

    summary.reminded += 1;
    summary.remindedIntents.push(pi.id);

    // Text reminder: only with the checkout consent stamp, a working E.164
    // number, and a configured Twilio account. Failures never undo the email.
    const phone = toE164(pi.metadata?.customerPhone ?? "");
    if (smsConfigured() && pi.metadata?.contactConsent && phone) {
      try {
        await sendSms(phone, renderCartRecoverySms(data));
        summary.smsSent += 1;
      } catch (err) {
        console.error("cart-recovery SMS failed:", pi.id, err);
      }
    }

    officeRows.push({
      name: data.customerName || "(no name)",
      email: data.customerEmail,
      phone: pi.metadata?.customerPhone ?? "",
      total,
      summary: items
        .map((i) => `${i.name} ${i.date} (${i.adults}A/${i.children}C)`)
        .join("; "),
      createdUnix: pi.created,
    });
  }

  // One office heads-up per run that actually reminded someone, so a person
  // can decide to pick up the phone — that call is how a 10-seat group cart
  // actually closes.
  if (officeRows.length > 0) {
    try {
      await sendAbandonedCartOfficeAlert(officeRows);
    } catch (err) {
      console.error("cart-recovery office alert failed:", err);
    }
  }

  return summary;
}
