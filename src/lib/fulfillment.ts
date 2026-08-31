import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { sendOrderConfirmationEmail, sendNewOrderAlert } from "@/lib/email";
import { confirmationFromPaymentIntent } from "@/lib/order";
import type { OrderConfirmationData } from "@/lib/order-confirmation-template";

/**
 * Two things race to confirm an order: the browser right after payment, and
 * the Stripe webhook. Whichever wins stamps the PaymentIntent, and the other
 * backs off, so the customer never gets the confirmation twice.
 */
const SENT_FLAG = "confirmationSentAt";

export interface DispatchResult {
  status: "sent" | "already-sent" | "no-items";
  order?: OrderConfirmationData;
}

export async function dispatchOrderConfirmation(
  pi: Stripe.PaymentIntent,
  overrides?: Partial<Pick<OrderConfirmationData, "customerName" | "customerEmail" | "customerPhone">>
): Promise<DispatchResult> {
  if (pi.metadata?.[SENT_FLAG]) {
    return { status: "already-sent" };
  }

  const base = confirmationFromPaymentIntent(pi);
  if (!base) return { status: "no-items" };

  const order: OrderConfirmationData = {
    ...base,
    // The browser knows about contact edits made after the intent was created.
    customerName: overrides?.customerName?.trim() || base.customerName,
    customerEmail: overrides?.customerEmail?.trim() || base.customerEmail,
    customerPhone: overrides?.customerPhone?.trim() || base.customerPhone,
  };

  // Wallet payments (Apple Pay / Google Pay / Link) create the intent before
  // any contact info exists, so if the buyer closes the tab the metadata has
  // no email. The wallet did hand Stripe billing details on the charge —
  // recover them so the webhook backstop can still confirm and alert.
  if (!order.customerEmail) {
    try {
      const chargeId =
        typeof pi.latest_charge === "string" ? pi.latest_charge : pi.latest_charge?.id;
      if (chargeId) {
        const charge = await stripe.charges.retrieve(chargeId);
        const billing = charge.billing_details;
        if (billing.email) {
          order.customerEmail = billing.email;
          if (order.customerName === "Customer" && billing.name) {
            order.customerName = billing.name;
          }
          if (!order.customerPhone && billing.phone) {
            order.customerPhone = billing.phone;
          }
        }
      }
    } catch (err) {
      console.error("billing-details fallback failed:", pi.id, err);
    }
  }

  if (!order.customerEmail) return { status: "no-items" };

  // Claim the send before doing it. A duplicate confirmation is worse than a
  // missing one: the office alert below is what actually triggers fulfilment,
  // and a failed send still leaves the payment visible in Stripe.
  await stripe.paymentIntents.update(pi.id, {
    metadata: { ...pi.metadata, [SENT_FLAG]: new Date().toISOString() },
  });

  try {
    await sendOrderConfirmationEmail(order);
  } catch (err) {
    // Release the claim so the webhook retry can attempt the send again.
    // An empty string deletes the metadata key on Stripe's side.
    try {
      await stripe.paymentIntents.update(pi.id, {
        metadata: { ...pi.metadata, [SENT_FLAG]: "" },
      });
    } catch (releaseErr) {
      console.error("failed to release confirmation claim:", pi.id, releaseErr);
    }
    throw err;
  }

  // Never let a failed internal alert surface as a customer-facing error.
  try {
    await sendNewOrderAlert(order);
  } catch (err) {
    console.error("new-order alert failed:", pi.id, err);
  }

  return { status: "sent", order };
}
