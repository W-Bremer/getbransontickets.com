import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { REF_COOKIE } from "@/lib/passport";
import { computeTotalCents } from "@/lib/pricing";
import { packCartMetadata, type CartLine } from "@/lib/order";

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
