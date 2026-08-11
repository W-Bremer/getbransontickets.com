import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { sendVoucherEmail } from "@/lib/email";
import { shows } from "@/data/shows";
import { computeTotalCents, getServerPrices } from "@/lib/pricing";
import {
  confirmationNumberFor,
  orderNumberFor,
  unpackCartMetadata,
} from "@/lib/order";
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
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  /** Omit to rebuild the order from the PaymentIntent (the manual-send case). */
  items?: IncomingItem[];
}

/**
 * Issues the actual show voucher. Vouchers are sent by hand after the seats are
 * confirmed with the theater, so this runs well after the customer's order
 * confirmation went out. Post just a paymentIntentId and the order is rebuilt
 * from Stripe.
 */
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SendVoucherBody;

    if (!body.paymentIntentId) {
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

    const storedLines = unpackCartMetadata(paymentIntent.metadata ?? {});
    const items: IncomingItem[] =
      body.items?.length
        ? body.items
        : storedLines.map((line) => ({
            id: line.id,
            name: line.id,
            date: line.date,
            time: line.time,
            adults: line.adults,
            children: line.children,
            seatingTier: line.seatingTier,
            pricePerAdult: 0,
            pricePerChild: 0,
          }));

    if (items.length === 0) {
      return NextResponse.json(
        { error: "No line items on this payment. Send them in the request body." },
        { status: 400 }
      );
    }

    const customerName = (body.customerName || paymentIntent.metadata?.customerName || "").trim();
    const customerEmail = (
      body.customerEmail ||
      paymentIntent.metadata?.customerEmail ||
      paymentIntent.receipt_email ||
      ""
    ).trim();
    const customerPhone = (body.customerPhone || paymentIntent.metadata?.customerPhone || "").trim();

    if (!customerName || !customerEmail) {
      return NextResponse.json(
        { error: "This payment has no customer name or email on file" },
        { status: 400 }
      );
    }

    // A voucher must describe exactly what was paid for: recompute the total
    // from server-side prices and require it to match the captured amount.
    const expectedCents = computeTotalCents(items);
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

    // Same numbers the customer already has on their order confirmation.
    const confirmationNumber = confirmationNumberFor(paymentIntent.id);
    const orderNumber = orderNumberFor(paymentIntent.id);
    const totalAmount = paymentIntent.amount / 100;

    const voucherItems: VoucherItem[] = items.map((item) => {
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
      customerName,
      customerEmail,
      customerPhone,
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
