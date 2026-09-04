import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { unpackCartMetadata } from "@/lib/order";
import { getServerPrices } from "@/lib/pricing";
import { shows } from "@/data/shows";

/**
 * Rebuilds a cart from an abandoned PaymentIntent so the recovery email's
 * "Finish My Booking" link can drop the customer straight back into checkout.
 * Returns only the line items (with catalog names/prices) — never the
 * contact details — so a forwarded link exposes nothing personal. Checkout
 * then creates a fresh intent; the abandoned one is left behind untouched.
 */

const RESUMABLE = new Set([
  "requires_payment_method",
  "requires_confirmation",
  "requires_action",
]);

function chicagoToday(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { paymentIntentId?: string };
    const id = body.paymentIntentId ?? "";
    if (!/^pi_[A-Za-z0-9]+$/.test(id)) {
      return NextResponse.json({ error: "Invalid link" }, { status: 400 });
    }

    const pi = await stripe.paymentIntents.retrieve(id);

    if (pi.status === "succeeded") {
      return NextResponse.json({ completed: true });
    }
    if (!RESUMABLE.has(pi.status)) {
      return NextResponse.json({ error: "This booking can't be resumed" }, { status: 410 });
    }

    const today = chicagoToday();
    const items = unpackCartMetadata(pi.metadata ?? {})
      .filter((line) => line.date >= today)
      .map((line) => {
        const show = shows.find((s) => s.slug === line.id);
        const prices = getServerPrices(line.id);
        if (!show || !prices) return null;
        return {
          type: "show" as const,
          id: line.id,
          name: show.name,
          date: line.date,
          time: line.time,
          adults: line.adults,
          children: line.children,
          childAges: [],
          seatingTier: line.seatingTier,
          pricePerAdult: prices.adult,
          pricePerChild: prices.child,
          imageUrl: show.imageUrl,
        };
      })
      .filter((i) => i !== null);

    if (items.length === 0) {
      return NextResponse.json(
        { error: "The show dates in this cart have already passed" },
        { status: 410 }
      );
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("resume-cart error:", err);
    return NextResponse.json({ error: "Unable to restore this cart" }, { status: 500 });
  }
}
