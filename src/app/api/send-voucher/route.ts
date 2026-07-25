import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendVoucherEmail } from "@/lib/email";
import { shows } from "@/data/shows";
import { computeTotalCents, getServerPrices } from "@/lib/pricing";
import type { VoucherItem } from "@/lib/voucher-template";

interface IncomingItem {
  id: string;
  name: string;
  date: string;
  time?: string;
  adults: number;
  children: number;
  seatingTier?: string;
  pricePerAdult: number;
  pricePerChild: number;
}

interface SendVoucherBody {
  paymentIntentId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: IncomingItem[];
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SendVoucherBody;

    if (
      !body.paymentIntentId ||
      !body.customerEmail ||
      !body.customerName ||
      !body.items?.length
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(body.paymentIntentId);
    if (paymentIntent.status !== "succeeded") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    // A voucher must describe exactly what was paid for: recompute the total
    // from server-side prices and require it to match the captured amount.
    const expectedCents = computeTotalCents(body.items);
    if (expectedCents === null || expectedCents !== paymentIntent.amount) {
      console.error("send-voucher amount mismatch:", {
        paymentIntentId: paymentIntent.id,
        paid: paymentIntent.amount,
        expected: expectedCents,
      });
      return NextResponse.json(
        { error: "Order details do not match this payment" },
        { status: 400 }
      );
    }

    // One voucher per payment: refuse replays.
    if (paymentIntent.metadata?.voucherSentAt) {
      return NextResponse.json(
        { error: "A voucher was already sent for this payment" },
        { status: 409 }
      );
    }

    const confirmationNumber = paymentIntent.id.replace(/^pi_/, "").slice(0, 16).toUpperCase();
    const orderNumber = `BRN-${Date.now().toString(36).toUpperCase()}`;
    const totalAmount = paymentIntent.amount / 100;

    const voucherItems: VoucherItem[] = body.items.map((item) => {
      const show = shows.find((s) => s.slug === item.id);
      const prices = getServerPrices(item.id);
      return {
        name: show?.name ?? item.name,
        date: item.date,
        time: item.time,
        adults: item.adults,
        children: item.children,
        seatingTier: item.seatingTier,
        pricePerAdult: prices?.adult ?? item.pricePerAdult,
        pricePerChild: prices?.child ?? item.pricePerChild,
        theaterAddress: show?.theaterAddress,
      };
    });

    await sendVoucherEmail({
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      orderNumber,
      confirmationNumber,
      items: voucherItems,
      totalAmount,
    });

    await stripe.paymentIntents.update(paymentIntent.id, {
      metadata: {
        ...paymentIntent.metadata,
        voucherSentAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ ok: true, orderNumber, confirmationNumber });
  } catch (err) {
    console.error("send-voucher error:", err);
    return NextResponse.json(
      { error: "Failed to send voucher. Please contact us and we will make it right." },
      { status: 500 }
    );
  }
}
