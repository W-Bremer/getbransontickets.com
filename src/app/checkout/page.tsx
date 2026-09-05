"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  User,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Phone,
  Plus,
} from "lucide-react";
import {
  Elements,
  ExpressCheckoutElement,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type {
  Appearance,
  StripeExpressCheckoutElementConfirmEvent,
  StripeExpressCheckoutElementReadyEvent,
} from "@stripe/stripe-js";
import { useCartStore, type CartItem } from "@/stores/cart";
import {
  applyAdjustments,
  bogoAmountCents,
  computeAdjustments,
} from "@/lib/adjustments";
import { baseOf, cartBaseSubtotal, cartTax } from "@/lib/tax";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  CONVERSION_LABELS,
  reportAdsConversion,
} from "@/components/google-ads-tag";
import { getStripe } from "@/lib/stripe-client";
import { StepIndicator, type Step } from "./step-indicator";
import { COMPLETED_ORDER_KEY } from "./confirmation/confirmation-client";

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
}

const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#13264D",
    colorText: "#1A1614",
    fontFamily: "system-ui, sans-serif",
    borderRadius: "8px",
  },
};

function itemsPayload(items: CartItem[]) {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    date: item.date,
    time: item.time,
    adults: item.adults,
    children: item.children,
    seatingTier: item.seatingTier,
  }));
}

function expectedCents(items: CartItem[]) {
  return items.reduce(
    (sum, item) =>
      sum +
      Math.round(item.pricePerAdult * 100) * item.adults +
      Math.round(item.pricePerChild * 100) * item.children,
    0
  );
}

/** Client mirror of the automatic BOGO 50%, from the cart's own flags. */
function cartBogoCents(items: CartItem[]) {
  return bogoAmountCents(
    items.map((item) => ({
      adults: item.adults,
      adultPriceCents: Math.round(item.pricePerAdult * 100),
      bogo50: item.bogo50,
    }))
  );
}

/**
 * Group carts convert better on the phone than in a form — a 10-seat order
 * usually has questions the checkout can't answer. One compact line, only
 * for parties this size.
 */
function GroupCallHint({ guests }: { guests: number }) {
  if (guests < 8) return null;
  return (
    <a
      href={`tel:${siteConfig.phoneRaw}`}
      onClick={() => reportAdsConversion(CONVERSION_LABELS.callClick)}
      className="mb-5 flex items-center justify-center gap-2 rounded-lg bg-[#13264D]/5 px-3 py-2.5 text-sm text-[#13264D] hover:bg-[#13264D]/10 transition-colors"
    >
      <Phone className="h-4 w-4 shrink-0" />
      <span>
        Booking {guests} people? Call{" "}
        <span className="font-semibold underline underline-offset-2">{siteConfig.phone}</span>{" "}
        for group orders.
      </span>
    </a>
  );
}

// Senior/military $5 selector removed 2026-09-05 (paused per William).
// The adjustments engine still honors discounts stamped on existing intents;
// to re-enable, restore DiscountSelector and its wiring from git history.

/**
 * One-tap wallets (Apple Pay / Google Pay / Link) ahead of the contact form.
 * The wallet supplies name, email, and phone, so a wallet buyer never types.
 * Redirect-based express methods are excluded: this flow finishes in-page.
 */
function ExpressCheckoutSection({
  onSuccess,
}: {
  onSuccess: (paymentIntentId: string, contact: ContactInfo) => Promise<void>;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [available, setAvailable] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onReady = (event: StripeExpressCheckoutElementReadyEvent) => {
    setAvailable(!!event.availablePaymentMethods);
  };

  const onConfirm = async (event: StripeExpressCheckoutElementConfirmEvent) => {
    if (!stripe || !elements || processing) return;
    setProcessing(true);
    setErrorMessage(null);

    // The wallet's own values win inside Stripe; this just fills any gaps.
    const contact: ContactInfo = {
      name: event.billingDetails?.name ?? "",
      email: event.billingDetails?.email ?? "",
      phone: event.billingDetails?.phone ?? "",
    };

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setProcessing(false);
      return;
    }
    if (!paymentIntent) {
      setErrorMessage("Payment did not complete. Please try again.");
      setProcessing(false);
      return;
    }

    try {
      await onSuccess(paymentIntent.id, contact);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Payment succeeded but we couldn't send your confirmation email. We'll follow up shortly."
      );
      setProcessing(false);
    }
  };

  return (
    <div className={available ? "mb-6" : "hidden"}>
      <ExpressCheckoutElement
        options={{
          buttonHeight: 48,
          buttonType: { applePay: "book", googlePay: "book" },
          paymentMethods: {
            paypal: "never",
            amazonPay: "never",
            klarna: "never",
          },
          emailRequired: true,
          phoneNumberRequired: true,
        }}
        onReady={onReady}
        onConfirm={onConfirm}
      />
      {processing && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-[#1A1614]/60">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#13264D] border-t-transparent" />
          Completing your booking...
        </p>
      )}
      {errorMessage && (
        <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}
      <div className="mt-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gray-200" />
        <span className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Or enter your details
        </span>
        <div className="h-px flex-1 bg-gray-200" />
      </div>
    </div>
  );
}

function ContactInfoStep({
  onNext,
  formData,
  setFormData,
  onFieldBlur,
  disabled,
}: {
  onNext: () => void;
  formData: ContactInfo;
  setFormData: (d: ContactInfo) => void;
  /** Fires as fields are completed so partial contact info still reaches the intent. */
  onFieldBlur: () => void;
  disabled?: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim() || !formData.email.includes("@"))
      e.email = "Valid email is required";
    if (!formData.phone.trim() || formData.phone.replace(/\D/g, "").length < 10)
      e.phone = "Valid phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#13264D]/10">
          <User className="h-5 w-5 text-[#13264D]" />
        </div>
        <h2 className="text-xl font-bold text-[#1A1614]">
          Contact Information
        </h2>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1614] mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          onBlur={onFieldBlur}
          placeholder="John Smith"
          className={`w-full rounded-lg border px-4 py-3 text-[#1A1614] placeholder:text-[#1A1614]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.name
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#13264D] focus:ring-[#13264D]/20"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1614] mb-1.5">
          Email Address *
        </label>
        <input
          type="email"
          autoComplete="email"
          inputMode="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          onBlur={onFieldBlur}
          placeholder="john@example.com"
          className={`w-full rounded-lg border px-4 py-3 text-[#1A1614] placeholder:text-[#1A1614]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.email
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#13264D] focus:ring-[#13264D]/20"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#1A1614] mb-1.5">
          Phone Number *
        </label>
        <input
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          onBlur={onFieldBlur}
          placeholder="(555) 123-4567"
          className={`w-full rounded-lg border px-4 py-3 text-[#1A1614] placeholder:text-[#1A1614]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.phone
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#13264D] focus:ring-[#13264D]/20"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      <button
        onClick={() => validate() && onNext()}
        disabled={disabled}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] py-4 text-lg font-semibold text-white hover:bg-[#C8102E]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Continue to Payment
        <ArrowRight className="h-5 w-5" />
      </button>

      <p className="text-xs leading-relaxed text-[#1A1614]/45">
        We use these details only for this booking, including an email or
        text reminder if you leave before finishing. No marketing lists.
      </p>
    </div>
  );
}

function StripePaymentForm({
  onBack,
  onSuccess,
  contactEmail,
  contactName,
  contactPhone,
}: {
  onBack: () => void;
  onSuccess: (paymentIntentId: string) => Promise<void>;
  contactEmail: string;
  contactName: string;
  contactPhone: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [submitStage, setSubmitStage] = useState<"idle" | "paying" | "emailing">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!stripe || !elements) return;

    setSubmitting(true);
    setSubmitStage("paying");
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        payment_method_data: {
          billing_details: {
            name: contactName,
            email: contactEmail,
            phone: contactPhone,
          },
        },
      },
    });

    if (error) {
      setErrorMessage(error.message ?? "Payment failed. Please try again.");
      setSubmitting(false);
      setSubmitStage("idle");
      return;
    }

    if (!paymentIntent) {
      setErrorMessage("Payment did not complete. Please try again.");
      setSubmitting(false);
      setSubmitStage("idle");
      return;
    }

    setSubmitStage("emailing");

    try {
      await onSuccess(paymentIntent.id);
    } catch (err) {
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "Payment succeeded but we couldn't send your confirmation email. We'll follow up shortly."
      );
      setSubmitting(false);
      setSubmitStage("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#13264D]/10">
          <CreditCard className="h-5 w-5 text-[#13264D]" />
        </div>
        <h2 className="text-xl font-bold text-[#1A1614]">
          Payment Information
        </h2>
      </div>

      <div className="rounded-lg bg-[#F6F4EF] p-3 flex items-center gap-2 text-sm text-[#1A1614]/60">
        <ShieldCheck className="h-4 w-4 text-[#C8102E]" />
        <span>Payments securely processed by Stripe</span>
      </div>

      <PaymentElement
        options={{
          layout: "tabs",
          // Wallets already have their own buttons on the contact step.
          wallets: { applePay: "never", googlePay: "never" },
          defaultValues: {
            billingDetails: {
              name: contactName,
              email: contactEmail,
              phone: contactPhone,
            },
          },
        }}
      />

      {errorMessage && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {errorMessage}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-4 font-semibold text-[#1A1614]/70 hover:border-[#13264D] hover:text-[#13264D] transition-all disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          type="submit"
          disabled={!stripe || !elements || submitting}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] py-4 text-lg font-semibold text-white hover:bg-[#C8102E]/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {submitStage === "emailing" ? "Confirming order..." : "Processing..."}
            </>
          ) : (
            <>
              Complete Booking
              <ShieldCheck className="h-5 w-5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
  });
  // The PaymentIntent is created as soon as checkout loads — before any
  // contact info exists — so the express wallet buttons can render on step 1.
  // Contact details are stamped onto the intent when the card path advances,
  // and always travel with confirm-order after payment.
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [intentError, setIntentError] = useState<string | null>(null);
  // Skips contact re-stamps when nothing changed; must sit above the early
  // returns with the other hooks.
  const lastStamp = useRef("");

  useEffect(() => {
    setMounted(true);
  }, []);

  // Secondary funnel signal for Ads: a real begin-checkout (cart has items).
  // Once per checkout visit, not per re-render.
  useEffect(() => {
    if (mounted && items.length > 0) {
      reportAdsConversion(CONVERSION_LABELS.beginCheckout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted]);

  useEffect(() => {
    if (!mounted || items.length === 0) return;
    let cancelled = false;
    setClientSecret(null);
    setIntentError(null);

    (async () => {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: itemsPayload(items) }),
        });
        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(body.error ?? "Unable to start payment");
        }
        const data = (await res.json()) as {
          clientSecret: string;
          amount: number;
        };
        // Mirror the server math exactly (same shared module) so a catalog
        // price change between add-to-cart and checkout still surfaces.
        const subtotal = expectedCents(items);
        const expected = applyAdjustments(
          subtotal,
          computeAdjustments(subtotal, "none", cartBogoCents(items))
        );
        if (data.amount !== expected) {
          throw new Error(
            "Prices have been updated since you added these items. Please empty your cart and add them again."
          );
        }
        if (!cancelled) setClientSecret(data.clientSecret);
      } catch (err) {
        if (!cancelled) {
          setIntentError(err instanceof Error ? err.message : "Unable to start payment");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mounted, items]);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#13264D] border-t-transparent" />
      </div>
    );
  }

  // All the money figures the page shows. Cart items store the tax-inclusive
  // box-office prices; the sidebar advertises the pre-tax subtotal and breaks
  // the embedded tax out as its own cart-level row, then applies the discount.
  // baseSubtotal + taxes always equals the old all-in subtotal to the cent.
  const subtotalCents = expectedCents(items);
  const adjustments = computeAdjustments(subtotalCents, "none", cartBogoCents(items));
  const total = applyAdjustments(subtotalCents, adjustments) / 100;
  const baseSubtotal = cartBaseSubtotal(items);
  const taxes = cartTax(items);

  if (items.length === 0) {
    return (
      <>
        <section className="bg-[#13264D] pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Checkout" },
              ]}
              className="mb-6"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Checkout
            </h1>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F6F4EF]">
              <ShoppingCart className="h-10 w-10 text-[#1A1614]/30" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#1A1614]">
              Nothing to Check Out
            </h2>
            <p className="mt-3 text-[#1A1614]/60">
              Add some shows or attractions to your cart first.
            </p>
            <Link
              href="/shows"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 font-semibold text-white hover:bg-[#C8102E]/90 transition-colors"
            >
              Browse Shows
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  async function handleCompleteBooking(paymentIntentId: string, contact?: ContactInfo) {
    const who = contact ?? formData;
    const fallbackOrder = `BRN-${paymentIntentId.replace(/^pi_/, "").slice(-8).toUpperCase()}`;
    // Ads/UET conversion value. Prefer the amount Stripe actually captured
    // (confirm-order returns it); the client-side figure is only the fallback
    // when that call fails.
    let snapshotTotal = total;
    // Tickets, not cart lines: one line for "2 adults, 1 child" is 3 tickets.
    const snapshotCount = items.reduce((n, i) => n + i.adults + i.children, 0);

    let orderNumber = fallbackOrder;
    let emailSent = false;

    try {
      const res = await fetch("/api/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          customerName: who.name,
          customerEmail: who.email,
          customerPhone: who.phone,
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as { orderNumber: string; total?: number };
        orderNumber = data.orderNumber;
        if (typeof data.total === "number" && data.total > 0) {
          snapshotTotal = data.total;
        }
        emailSent = true;
      }
    } catch {
      // Payment already succeeded; fall through with the fallback order
      // number so the customer still reaches the confirmation page.
    }

    // Handed off via sessionStorage, not the URL, so customer details
    // stay out of query strings and analytics logs. The confirmation
    // page clears the cart once it picks this up.
    sessionStorage.setItem(
      COMPLETED_ORDER_KEY,
      JSON.stringify({
        orderNumber,
        total: snapshotTotal,
        itemCount: snapshotCount,
        emailSent,
        name: who.name,
        email: who.email,
        phone: who.phone,
      })
    );

    router.push("/checkout/confirmation");
  }

  // Stamp contact details onto the intent so the webhook backstop, the
  // Stripe receipt, and the abandoned-cart reminder know who this is — even
  // if the tab closes mid-checkout. Fires on field blur (once the email looks
  // usable) and again on Continue; fire-and-forget, checkout never waits on
  // it, and the ref skips sends when nothing changed.
  function stampContact() {
    const paymentIntentId = clientSecret?.split("_secret")[0];
    if (!paymentIntentId) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) return;
    const signature = JSON.stringify([paymentIntentId, formData]);
    if (signature === lastStamp.current) return;
    lastStamp.current = signature;
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paymentIntentId,
        customerName: formData.name,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        items: itemsPayload(items),
      }),
    }).catch(() => {});
  }

  function handleContactContinue() {
    stampContact();
    setStep(2);
  }

  return (
    <>
      {/* Header */}
      <section className="bg-[#13264D] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Cart", href: "/cart" },
              { label: "Checkout" },
            ]}
            className="mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Checkout
          </h1>
        </div>
      </section>

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <StepIndicator current={step} />
        </div>
      </div>

      {/* Content */}
      <section className="py-10 sm:py-14 bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Contact step centers alone; the payment step splits with the
              Order Summary column. */}
          <div className={step === 2 ? "lg:grid lg:grid-cols-3 lg:gap-8" : "mx-auto max-w-3xl"}>
            {/* Cart Summary Sidebar; shown at the payment step, where the
                money conversation belongs. */}
            {step === 2 && (
            <div className="mb-8 lg:mb-0 lg:col-start-3 lg:row-start-1">
                <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                  <h2 className="text-lg font-bold text-[#1A1614] mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    {items.map((item, i) => {
                      // Line prices advertise the pre-tax base; the embedded
                      // tax shows once, in the Taxes row below.
                      const sub = cartBaseSubtotal([item]);
                      // What the same seats list for on the competitor site
                      // (their adult rate; kids at our rate when present).
                      const compare =
                        item.competitorPricePerAdult !== undefined
                          ? item.competitorPricePerAdult * item.adults +
                            baseOf(item.pricePerChild) * item.children
                          : null;
                      return (
                        <div
                          key={`${item.id}-${item.date}-${i}`}
                          className="space-y-0.5"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="text-[#1A1614] font-medium truncate mr-2">
                              {item.name}
                            </span>
                            <span className="text-right">
                              {compare !== null && compare > sub && (
                                <span className="block text-xs leading-tight text-gray-400 line-through">
                                  ${compare.toFixed(2)}
                                </span>
                              )}
                              <span className="font-semibold text-[#1A1614] whitespace-nowrap">
                                ${sub.toFixed(2)}
                              </span>
                            </span>
                          </div>
                          <p className="text-xs text-[#1A1614]/40">
                            {item.adults} adult{item.adults !== 1 ? "s" : ""}
                            {item.children > 0 &&
                              `, ${item.children} child${item.children !== 1 ? "ren" : ""}`}
                            {" | "}
                            {item.date}
                            {item.time && ` at ${item.time}`}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 space-y-1.5 text-sm text-[#1A1614]/70">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${baseSubtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>${taxes.toFixed(2)}</span>
                    </div>
                    {adjustments.map((a) => (
                      <div
                        key={a.code}
                        className="flex justify-between font-medium text-emerald-700"
                      >
                        <span>{a.label}</span>
                        <span>-${(-a.amountCents / 100).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-lg font-bold text-[#1A1614]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/shows"
                    className="mt-4 flex items-center justify-center gap-1.5 text-center text-sm font-medium text-[#13264D] hover:text-[#0D1B38] transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add another show
                  </Link>
                  <Link
                    href="/cart"
                    className="mt-2 block text-center text-sm font-medium text-[#1A1614]/50 hover:text-[#13264D] transition-colors"
                  >
                    Edit Cart
                  </Link>

                  {/* Human safety net at the highest-anxiety moment. Framed as
                      help, not as an alternative to paying online, so it
                      rescues stuck buyers without inviting channel-switching.
                      The tel: link fires the callClick conversion. */}
                  <div className="mt-4 border-t border-gray-100 pt-4 text-center">
                    <p className="text-xs text-[#1A1614]/60">
                      Need help finishing your booking?
                    </p>
                    <a
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="mt-1 inline-flex items-center gap-1.5 text-lg font-bold text-[#13264D] transition-colors hover:text-[#C8102E]"
                    >
                      <Phone className="h-4 w-4" aria-hidden />
                      {siteConfig.phone}
                    </a>
                    <p className="mt-0.5 text-[11px] text-[#1A1614]/45">
                      A live local expert will finish it with you.
                    </p>
                  </div>
                </div>
            </div>
            )}

            {/* Form Area */}
            <div className={step === 2 ? "lg:col-span-2 lg:col-start-1 lg:row-start-1" : ""}>
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                {intentError && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {intentError}
                  </div>
                )}
                {step === 1 && (
                  <>
                    <GroupCallHint
                      guests={items.reduce((n, i) => n + i.adults + i.children, 0)}
                    />
                    {clientSecret && (
                      <Elements
                        key={`express-${clientSecret}`}
                        stripe={getStripe()}
                        options={{ clientSecret, appearance }}
                      >
                        <ExpressCheckoutSection onSuccess={handleCompleteBooking} />
                      </Elements>
                    )}
                    <ContactInfoStep
                      onNext={handleContactContinue}
                      formData={formData}
                      setFormData={setFormData}
                      onFieldBlur={stampContact}
                      disabled={!!intentError}
                    />
                  </>
                )}
                {step === 2 &&
                  (clientSecret ? (
                    <Elements
                      key={`payment-${clientSecret}`}
                      stripe={getStripe()}
                      options={{ clientSecret, appearance }}
                    >
                      <StripePaymentForm
                        onBack={() => setStep(1)}
                        onSuccess={handleCompleteBooking}
                        contactEmail={formData.email}
                        contactName={formData.name}
                        contactPhone={formData.phone}
                      />
                    </Elements>
                  ) : !intentError ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-16">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#13264D] border-t-transparent" />
                      <p className="text-sm text-[#1A1614]/60">Preparing secure payment...</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => setStep(1)}
                      className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-[#1A1614]/70 hover:border-[#13264D] hover:text-[#13264D] transition-all"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                  ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
