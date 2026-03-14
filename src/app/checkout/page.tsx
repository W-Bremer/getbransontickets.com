"use client";

import { useState, useEffect } from "react";
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
import { useCartStore } from "@/stores/cart";
import { Breadcrumbs } from "@/components/breadcrumbs";

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
                  isComplete ? "bg-[#018941]" : "bg-gray-200"
                }`}
              />
            )}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all ${
                  isComplete
                    ? "bg-[#018941] text-white"
                    : isActive
                      ? "bg-[#037B98] text-white ring-4 ring-[#037B98]/20"
                      : "bg-gray-100 text-[#333333]/40"
                }`}
              >
                {isComplete ? <Check className="h-5 w-5" /> : stepNum}
              </div>
              <span
                className={`text-xs font-semibold whitespace-nowrap ${
                  isActive
                    ? "text-[#037B98]"
                    : isComplete
                      ? "text-[#018941]"
                      : "text-[#333333]/40"
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
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#037B98]/10">
          <User className="h-5 w-5 text-[#037B98]" />
        </div>
        <h2 className="text-xl font-bold text-[#333333]">
          Contact Information
        </h2>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#333333] mb-1.5">
          Full Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="John Smith"
          className={`w-full rounded-lg border px-4 py-3 text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.name
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#037B98] focus:ring-[#037B98]/20"
          }`}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#333333] mb-1.5">
          Email Address *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="john@example.com"
          className={`w-full rounded-lg border px-4 py-3 text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.email
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#037B98] focus:ring-[#037B98]/20"
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#333333] mb-1.5">
          Phone Number *
        </label>
        <input
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="(555) 123-4567"
          className={`w-full rounded-lg border px-4 py-3 text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.phone
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#037B98] focus:ring-[#037B98]/20"
          }`}
        />
        {errors.phone && (
          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
        )}
      </div>

      <button
        onClick={() => validate() && onNext()}
        className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#018941] py-4 text-lg font-semibold text-white hover:bg-[#018941]/90 transition-colors"
      >
        Continue to Payment
        <ArrowRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function PaymentStep({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function formatCardNumber(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    return digits;
  }

  function validate() {
    const e: Record<string, string> = {};
    if (cardNumber.replace(/\s/g, "").length < 16)
      e.cardNumber = "Enter a valid card number";
    if (expiry.length < 5) e.expiry = "Enter expiration date";
    if (cvv.length < 3) e.cvv = "Enter CVV";
    if (!cardName.trim()) e.cardName = "Enter name on card";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#037B98]/10">
          <CreditCard className="h-5 w-5 text-[#037B98]" />
        </div>
        <h2 className="text-xl font-bold text-[#333333]">
          Payment Information
        </h2>
      </div>

      <div className="rounded-lg bg-[#F5F5F5] p-3 flex items-center gap-2 text-sm text-[#333333]/60">
        <ShieldCheck className="h-4 w-4 text-[#018941]" />
        <span>Your payment information is secure and encrypted</span>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#333333] mb-1.5">
          Card Number *
        </label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
          placeholder="1234 5678 9012 3456"
          className={`w-full rounded-lg border px-4 py-3 text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.cardNumber
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#037B98] focus:ring-[#037B98]/20"
          }`}
        />
        {errors.cardNumber && (
          <p className="mt-1 text-xs text-red-500">{errors.cardNumber}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#333333] mb-1.5">
          Name on Card *
        </label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="John Smith"
          className={`w-full rounded-lg border px-4 py-3 text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:ring-2 transition-all ${
            errors.cardName
              ? "border-red-300 focus:ring-red-200"
              : "border-gray-200 focus:border-[#037B98] focus:ring-[#037B98]/20"
          }`}
        />
        {errors.cardName && (
          <p className="mt-1 text-xs text-red-500">{errors.cardName}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-[#333333] mb-1.5">
            Expiration *
          </label>
          <input
            type="text"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            placeholder="MM/YY"
            className={`w-full rounded-lg border px-4 py-3 text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:ring-2 transition-all ${
              errors.expiry
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:border-[#037B98] focus:ring-[#037B98]/20"
            }`}
          />
          {errors.expiry && (
            <p className="mt-1 text-xs text-red-500">{errors.expiry}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#333333] mb-1.5">
            CVV *
          </label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
            placeholder="123"
            className={`w-full rounded-lg border px-4 py-3 text-[#333333] placeholder:text-[#333333]/30 focus:outline-none focus:ring-2 transition-all ${
              errors.cvv
                ? "border-red-300 focus:ring-red-200"
                : "border-gray-200 focus:border-[#037B98] focus:ring-[#037B98]/20"
            }`}
          />
          {errors.cvv && (
            <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onBack}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 px-6 py-4 font-semibold text-[#333333]/70 hover:border-[#037B98] hover:text-[#037B98] transition-all"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
        <button
          onClick={() => validate() && onNext()}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#018941] py-4 text-lg font-semibold text-white hover:bg-[#018941]/90 transition-colors"
        >
          Complete Booking
          <ShieldCheck className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function ConfirmationStep({
  formData,
  total,
  itemCount,
}: {
  formData: { name: string; email: string; phone: string };
  total: number;
  itemCount: number;
}) {
  const orderNumber = `BRN-${Date.now().toString(36).toUpperCase()}`;

  return (
    <div className="text-center space-y-6">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#018941]/10">
        <Check className="h-10 w-10 text-[#018941]" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#333333]">Booking Confirmed!</h2>
        <p className="mt-2 text-[#333333]/60">
          Thank you for your order, {formData.name.split(" ")[0]}!
        </p>
      </div>

      <div className="rounded-xl bg-[#F5F5F5] p-6 text-left space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[#333333]/60">Order Number</span>
          <span className="font-bold text-[#037B98]">{orderNumber}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#333333]/60">Items</span>
          <span className="font-medium text-[#333333]">
            {itemCount} ticket{itemCount !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#333333]/60">Email</span>
          <span className="font-medium text-[#333333]">{formData.email}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[#333333]/60">Phone</span>
          <span className="font-medium text-[#333333]">{formData.phone}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between">
          <span className="font-semibold text-[#333333]">Total Charged</span>
          <span className="text-xl font-bold text-[#333333]">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <p className="text-sm text-[#333333]/50">
        A confirmation email has been sent to{" "}
        <span className="font-medium text-[#333333]">{formData.email}</span>.
        Please check your inbox for your e-tickets and booking details.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
        <Link
          href="/shows"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#037B98] px-6 py-3 font-semibold text-white hover:bg-[#005C73] transition-colors"
        >
          Browse More Shows
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 px-6 py-3 font-semibold text-[#333333]/70 hover:border-[#037B98] hover:text-[#037B98] transition-all"
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#037B98] border-t-transparent" />
      </div>
    );
  }

  const total = getTotal();

  if (items.length === 0 && step !== 3) {
    return (
      <>
        <section className="bg-[#037B98] pt-12 pb-16">
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
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F5F5F5]">
              <ShoppingCart className="h-10 w-10 text-[#333333]/30" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#333333]">
              Nothing to Check Out
            </h2>
            <p className="mt-3 text-[#333333]/60">
              Add some shows or attractions to your cart first.
            </p>
            <Link
              href="/shows"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#018941] px-6 py-3 font-semibold text-white hover:bg-[#018941]/90 transition-colors"
            >
              Browse Shows
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </>
    );
  }

  function handleCompleteBooking() {
    clearCart();
    setStep(3);
  }

  return (
    <>
      {/* Header */}
      <section className="bg-[#037B98] pt-12 pb-16">
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
      <section className="py-10 sm:py-14 bg-[#F5F5F5]">
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
                    onNext={handleCompleteBooking}
                  />
                )}
                {step === 3 && (
                  <ConfirmationStep
                    formData={formData}
                    total={total}
                    itemCount={items.length}
                  />
                )}
              </div>
            </div>

            {/* Cart Summary Sidebar */}
            {step !== 3 && (
              <div className="mt-8 lg:mt-0">
                <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                  <h2 className="text-lg font-bold text-[#333333] mb-4">
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
                            <span className="text-[#333333] font-medium truncate mr-2">
                              {item.name}
                            </span>
                            <span className="font-semibold text-[#333333] whitespace-nowrap">
                              ${sub.toFixed(2)}
                            </span>
                          </div>
                          <p className="text-xs text-[#333333]/40">
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
                  <div className="mt-4 flex justify-between text-lg font-bold text-[#333333]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <Link
                    href="/cart"
                    className="mt-4 block text-center text-sm font-medium text-[#037B98] hover:text-[#005C73] transition-colors"
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
