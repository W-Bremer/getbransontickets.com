import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { REF_COOKIE } from "@/lib/passport";
import { computeTotalCents } from "@/lib/pricing";

interface IncomingItem {
  id: string;
  name: string;
  date: string;
  adults: number;
  children: number;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { items?: IncomingItem[] };
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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        referralPartner,
        itemCount: String(items.length),
        items: JSON.stringify(
          items.map((i) => ({
            id: i.id,
            date: i.date,
            adults: i.adults,
            children: i.children,
          }))
        ).slice(0, 500),
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
