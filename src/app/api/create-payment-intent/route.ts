import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { REF_COOKIE } from "@/lib/passport";
import { computeTotalCents } from "@/lib/pricing";
import { packCartMetadata, type CartLine } from "@/lib/order";
import { getShowBySlug } from "@/data/shows";
import { effectiveSchedule, loadOverrides, timesForDate } from "@/lib/showtimes";
import { formatDate } from "@/lib/email-format";

interface IncomingItem {
  id: string;
  name: string;
  date: string;
  time?: string;
  adults: number;
  children: number;
  seatingTier?: string;
}

interface Body {
  items?: IncomingItem[];
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  /** When set, stamp contact details onto this existing intent instead of creating one. */
  paymentIntentId?: string;
}

/** Stripe caps a metadata value at 500 characters. */
function trim(value: string | undefined, max = 200): string {
  return (value ?? "").trim().slice(0, max);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const items = body.items ?? [];

    if (items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Prices are looked up server-side by item id; client-supplied prices are ignored.
    const totalCents = computeTotalCents(items);
    if (totalCents === null) {
      return NextResponse.json(
        { error: "Cart contains an unknown item or invalid quantities" },
        { status: 400 }
      );
    }

    if (totalCents < 50) {
      return NextResponse.json(
        { error: "Order total is below the minimum charge amount" },
        { status: 400 }
      );
    }

    // Every item's date must be a performance the show actually plays
    // (weekly pattern plus office overrides). The booking calendar enforces
    // this client-side; this is the backstop so a stale cart or crafted
    // request cannot buy a date with no show. Fails open on a storage
    // hiccup: blocking every sale is worse than skipping the date check.
    try {
      const overrides = await loadOverrides();
      for (const item of items) {
        const show = getShowBySlug(item.id);
        if (!show) continue;
        const schedule = effectiveSchedule(show, overrides.overrides[show.slug]);
        const times = timesForDate(schedule, item.date);
        if (times.length === 0) {
          return NextResponse.json(
            {
              error: `${show.name} does not have a performance on ${formatDate(item.date)}. Please remove it from your cart and pick an available date.`,
            },
            { status: 400 }
          );
        }
        const itemTime = item.time?.trim();
        if (itemTime && !times.some((t) => t === itemTime)) {
          return NextResponse.json(
            {
              error: `${show.name} plays at ${times.join(" and ")} on ${formatDate(item.date)}, not ${item.time}. Please remove it from your cart and pick an available time.`,
            },
            { status: 400 }
          );
        }
      }
    } catch (err) {
      console.error("create-payment-intent date validation skipped:", err);
    }

    // Passport partner referral attribution (set by /p/[code] QR links)
    const referralPartner = (await cookies()).get(REF_COOKIE)?.value ?? "";

    const lines: CartLine[] = items.map((i) => ({
      id: i.id,
      date: i.date,
      time: i.time,
      adults: i.adults,
      children: i.children,
      seatingTier: i.seatingTier,
    }));

    const customerEmail = trim(body.customerEmail);

    // Update mode: checkout creates the intent before the buyer has typed
    // anything (the express wallet buttons need it), then stamps contact
    // details here once the card path collects them. The amount must match
    // what the intent already locked in, so a crafted update can't relabel a
    // cheap intent as a more expensive cart.
    if (body.paymentIntentId) {
      const existing = await stripe.paymentIntents.retrieve(body.paymentIntentId);
      if (existing.amount !== totalCents) {
        return NextResponse.json(
          { error: "Cart no longer matches this payment" },
          { status: 409 }
        );
      }
      const updated = await stripe.paymentIntents.update(body.paymentIntentId, {
        ...(customerEmail ? { receipt_email: customerEmail } : {}),
        metadata: {
          referralPartner,
          itemCount: String(items.length),
          customerName: trim(body.customerName),
          customerEmail,
          customerPhone: trim(body.customerPhone, 40),
          ...packCartMetadata(lines),
        },
      });
      return NextResponse.json({
        clientSecret: updated.client_secret,
        amount: updated.amount,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      // Stripe's own card receipt, separate from the order confirmation we send.
      ...(customerEmail ? { receipt_email: customerEmail } : {}),
      metadata: {
        referralPartner,
        itemCount: String(items.length),
        customerName: trim(body.customerName),
        customerEmail,
        customerPhone: trim(body.customerPhone, 40),
        // One key per line item so the webhook can rebuild the order if the
        // customer closes the tab before the browser confirms.
        ...packCartMetadata(lines),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: totalCents,
    });
  } catch (err) {
    console.error("create-payment-intent error:", err);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}
