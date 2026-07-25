"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Check,
  CreditCard,
  User,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { Appearance } from "@stripe/stripe-js";
import { useCartStore, type CartItem } from "@/stores/cart";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { getStripe } from "@/lib/stripe-client";

type Step = 1 | 2 | 3;

const stepLabels = ["Contact Info", "Payment", "Confirmation"];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {stepLabels.map((label, i) => {
        const stepNum = (i + 1) as Step;
        const isActive = stepNum === current;
        const isComplete = stepNum < current;

        return (
          <div key={label} className="flex items-center">
            {i > 0 && (
              <div
                className={`h-0.5 w-8 sm:w-16 ${
                  isComplete ? "bg-[#C8102E]" : "bg-gray-200"
                }`}
              />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  isComplete
                    ? "bg-[#C8102E] text-white"
                    : isActive
                      ? "bg-[#13264D] text-white ring-4 ring-[#13264D]/20"
                      : "bg-gray-100 text-[#1A1614]/40"
                }`}
              >
                {isComplete ? <Check className="h-5 w-5" /> : stepNum}
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? "text-[#13264D]"
                    : isComplete
                      ? "text-[#C8102E]"
                      : "text-[#1A1614]/40"
                }`}
              >
                {label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ContactInfoStep({
  onNext,
  formData,
  setFormData,
}: {
  onNext: () => void;
  formData: { name: string; email: string; phone: string };
  setFormData: (d: { name: string; email: string; phone: string }) => void;
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] py-4 text-lg font-semibold text-white hover:bg-[#C8102E]/90 transition-colors"
      >
        Continue to Payment
        <ArrowRight className="h-5 w-5" />
      </button>
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
          : "Payment succeeded but we couldn't send your voucher email. We'll follow up shortly."
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
              {submitStage === "emailing" ? "Sending voucher..." : "Processing..."}
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

function PaymentStep({
  onBack,
  onSuccess,
  items,
  formData,
}: {
  onBack: () => void;
  onSuccess: (paymentIntentId: string) => Promise<void>;
  items: CartItem[];
  formData: { name: string; email: string; phone: string };
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function createIntent() {
      try {
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: items.map((item) => ({
              id: item.id,
              name: item.name,
              date: item.date,
              adults: item.adults,
              children: item.children,
              pricePerAdult: item.pricePerAdult,
              pricePerChild: item.pricePerChild,
            })),
          }),
        });

        if (!res.ok) {
          const body = (await res.json().catch(() => ({}))) as {
            error?: string;
          };
          throw new Error(body.error ?? "Unable to start payment");
        }

        const data = (await res.json()) as { clientSecret: string; amount: number };
        const expectedCents = items.reduce(
          (sum, item) =>
            sum +
            Math.round(item.pricePerAdult * 100) * item.adults +
            Math.round(item.pricePerChild * 100) * item.children,
          0
        );
        if (data.amount !== expectedCents) {
          throw new Error(
            "Prices have been updated since you added these items. Please empty your cart and add them again."
          );
        }
        if (!cancelled) setClientSecret(data.clientSecret);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to start payment");
        }
      }
    }

    createIntent();
    return () => {
      cancelled = true;
    };
  }, [items]);

  const appearance: Appearance = useMemo(
    () => ({
      theme: "stripe",
      variables: {
        colorPrimary: "#13264D",
        colorText: "#1A1614",
        fontFamily: "system-ui, sans-serif",
        borderRadius: "8px",
      },
    }),
    []
  );

  if (error) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-3 font-semibold text-[#1A1614]/70 hover:border-[#13264D] hover:text-[#13264D] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-16">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#13264D] border-t-transparent" />
        <p className="text-sm text-[#1A1614]/60">Preparing secure payment...</p>
      </div>
    );
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{ clientSecret, appearance }}
    >
      <StripePaymentForm
        onBack={onBack}
        onSuccess={onSuccess}
        contactEmail={formData.email}
        contactName={formData.name}
        contactPhone={formData.phone}
      />
    </Elements>
  );
}

function ConfirmationStep({
  formData,
  total,
  itemCount,
  orderNumber,
  emailSent,
}: {
  formData: { name: string; email: string; phone: string };
  total: number;
  itemCount: number;
  orderNumber: string;
  emailSent: boolean;
}) {

  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C8102E]/10">
        <Check className="h-10 w-10 text-[#C8102E]" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#1A1614]">Booking Confirmed!</h2>
        <p className="mt-2 text-[#1A1614]/60">
          Thank you for your order, {formData.name.split(" ")[0]}!
        </p>
      </div>

      <div className="rounded-xl bg-[#F6F4EF] p-6 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#1A1614]/60">Order Number</span>
          <span className="font-bold text-[#13264D]">{orderNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#1A1614]/60">Items</span>
          <span className="font-medium text-[#1A1614]">
            {itemCount} ticket{itemCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#1A1614]/60">Email</span>
          <span className="font-medium text-[#1A1614]">{formData.email}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#1A1614]/60">Phone</span>
          <span className="font-medium text-[#1A1614]">{formData.phone}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-semibold text-[#1A1614]">Total Charged</span>
          <span className="text-xl font-bold text-[#1A1614]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {emailSent ? (
        <p className="text-sm text-[#1A1614]/50">
          Your show voucher has been sent to{" "}
          <span className="font-medium text-[#1A1614]">{formData.email}</span>.
          Please check your inbox — present the voucher at the box office to
          redeem your tickets.
        </p>
      ) : (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-left">
          <p className="text-sm font-semibold text-amber-900">
            Payment received — voucher email couldn&apos;t be sent automatically.
          </p>
          <p className="mt-1 text-xs text-amber-800">
            Please screenshot this confirmation and email{" "}
            <a
              href="mailto:info@getbransontickets.com"
              className="underline font-medium"
            >
              info@getbransontickets.com
            </a>{" "}
            with your order number. We&apos;ll send your voucher manually.
          </p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href="/shows"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#13264D] px-6 py-3 font-semibold text-white hover:bg-[#0D1B38] transition-colors"
        >
          Browse More Shows
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 px-6 py-3 font-semibold text-[#1A1614]/70 hover:border-[#13264D] hover:text-[#13264D] transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    total: number;
    itemCount: number;
    emailSent: boolean;
  } | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#13264D] border-t-transparent" />
      </div>
    );
  }

  const total = getTotal();

  if (items.length === 0 && step !== 3) {
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

  async function handleCompleteBooking(paymentIntentId: string) {
    const fallbackOrder = `BRN-${Date.now().toString(36).toUpperCase()}`;
    const snapshotTotal = total;
    const snapshotCount = items.length;

    try {
      const res = await fetch("/api/send-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          customerName: formData.name,
          customerEmail: formData.email,
          customerPhone: formData.phone,
          items: items.map((item) => ({
            id: item.id,
            name: item.name,
            date: item.date,
            time: item.time,
            adults: item.adults,
            children: item.children,
            seatingTier: item.seatingTier,
            pricePerAdult: item.pricePerAdult,
            pricePerChild: item.pricePerChild,
          })),
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as { orderNumber: string };
        setCompletedOrder({
          orderNumber: data.orderNumber,
          total: snapshotTotal,
          itemCount: snapshotCount,
          emailSent: true,
        });
      } else {
        setCompletedOrder({
          orderNumber: fallbackOrder,
          total: snapshotTotal,
          itemCount: snapshotCount,
          emailSent: false,
        });
      }
    } catch {
      setCompletedOrder({
        orderNumber: fallbackOrder,
        total: snapshotTotal,
        itemCount: snapshotCount,
        emailSent: false,
      });
    }

    clearCart();
    setStep(3);
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
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Form Area */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
                {step === 1 && (
                  <ContactInfoStep
                    onNext={() => setStep(2)}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {step === 2 && (
                  <PaymentStep
                    onBack={() => setStep(1)}
                    onSuccess={handleCompleteBooking}
                    items={items}
                    formData={formData}
                  />
                )}
                {step === 3 && completedOrder && (
                  <ConfirmationStep
                    formData={formData}
                    total={completedOrder.total}
                    itemCount={completedOrder.itemCount}
                    orderNumber={completedOrder.orderNumber}
                    emailSent={completedOrder.emailSent}
                  />
                )}
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            {step !== 3 && (
              <div className="mt-8 lg:mt-0">
                <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                  <h2 className="text-lg font-bold text-[#1A1614] mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-3 border-b border-gray-100 pb-4">
                    {items.map((item, i) => {
                      const sub =
                        item.adults * item.pricePerAdult +
                        item.children * item.pricePerChild;
                      return (
                        <div
                          key={`${item.id}-${item.date}-${i}`}
                          className="space-y-0.5"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="text-[#1A1614] font-medium truncate mr-2">
                              {item.name}
                            </span>
                            <span className="font-semibold text-[#1A1614] whitespace-nowrap">
                              ${sub.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-[#1A1614]/40">
                            {item.adults} adult{item.adults !== 1 ? "s" : ""}
                            {item.children > 0 &&
                              `, ${item.children} child${item.children !== 1 ? "ren" : ""}`}
                            {" | "}
                            {item.date}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex justify-between text-lg font-bold text-[#1A1614]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/cart"
                    className="mt-4 block text-center text-sm font-medium text-[#13264D] hover:text-[#0D1B38] transition-colors"
                  >
                    Edit Cart
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
