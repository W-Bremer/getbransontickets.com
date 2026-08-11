import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { dispatchOrderConfirmation } from "@/lib/fulfillment";

export async function POST(req: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe signature verification failed:", message);
    return NextResponse.json({ error: `Invalid signature: ${message}` }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.log(
        `[stripe] payment succeeded: ${pi.id}, $${(pi.amount / 100).toFixed(2)} ${pi.currency}`
      );

      // Backstop for customers who close the tab before the browser confirms.
      // dispatchOrderConfirmation is idempotent, so the usual case is a no-op.
      try {
        const result = await dispatchOrderConfirmation(pi);
        console.log(`[stripe] confirmation for ${pi.id}: ${result.status}`);
      } catch (err) {
        console.error(`[stripe] confirmation failed for ${pi.id}:`, err);
        // 500 so Stripe retries. The idempotency flag makes a retry safe.
        return NextResponse.json({ error: "Confirmation failed" }, { status: 500 });
      }
      break;
    }
    case "payment_intent.payment_failed": {
      const pi = event.data.object as Stripe.PaymentIntent;
      console.warn(
        `[stripe] payment failed: ${pi.id}, ${pi.last_payment_error?.message ?? "unknown"}`
      );
      break;
    }
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      console.log(`[stripe] charge refunded: ${charge.id}`);
      break;
    }
    default:
      // Ignore other events
      break;
  }

  return NextResponse.json({ received: true });
}
