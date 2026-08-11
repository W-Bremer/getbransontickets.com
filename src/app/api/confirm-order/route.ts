import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { dispatchOrderConfirmation } from "@/lib/fulfillment";
import { orderNumberFor } from "@/lib/order";

/**
 * Called by the checkout page once Stripe reports the payment succeeded.
 * Sends the customer their receipt and tells the office a voucher is due.
 * The Stripe webhook does the same job if the customer closes the tab first.
 */

interface Body {
  paymentIntentId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    if (!body.paymentIntentId) {
      return NextResponse.json({ error: "Missing payment reference" }, { status: 400 });
    }

    const pi = await stripe.paymentIntents.retrieve(body.paymentIntentId);
    if (pi.status !== "succeeded") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
    }

    const result = await dispatchOrderConfirmation(pi, {
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
    });

    if (result.status === "no-items") {
      console.error("confirm-order could not rebuild the order:", pi.id);
      return NextResponse.json(
        { error: "We could not read your order details. Please contact us." },
        { status: 422 }
      );
    }

    // "already-sent" is a success from the customer's point of view: the
    // webhook beat the browser to it and the email is on its way.
    return NextResponse.json({
      ok: true,
      orderNumber: orderNumberFor(pi.id),
      total: pi.amount / 100,
      alreadySent: result.status === "already-sent",
    });
  } catch (err) {
    console.error("confirm-order error:", err);
    return NextResponse.json(
      { error: "Payment went through but we could not send your confirmation. Please contact us." },
      { status: 500 }
    );
  }
}
