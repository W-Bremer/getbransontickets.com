"use client";

import { useCallback, useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { CheckCircle2, Loader2, Lock } from "lucide-react";
import { getStripe } from "@/lib/stripe-client";

const CATEGORIES = [
  "Hotel / Lodging",
  "Restaurant",
  "Coffee Shop",
  "Attraction",
  "Show / Theater",
  "Shopping / Retail",
  "Other",
];

const inputClasses =
  "w-full rounded-lg border border-gray-300 px-4 py-3 text-[#13264D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#13264D]";

/**
 * Two-step enrollment used on the private partner signup page: business info
 * first (so the office knows who paid), then the Stripe payment link.
 */
export function PartnerSignupFlow() {
  const [form, setForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    category: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const update = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/passport-subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: form.businessName,
        contactName: form.contactName,
        email: form.email,
      }),
    });
    if (!res.ok) throw new Error("Could not start checkout");
    const data = await res.json();
    return data.clientSecret as string;
  }, [form.businessName, form.contactName, form.email]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const website =
      (e.currentTarget.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/passport-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "partner", source: "paid-signup", ...form, website }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div>
        <p className="text-sm font-semibold tracking-wide text-[#C8102E] uppercase">
          Step 2 of 2
        </p>
        <h2 className="mt-1 text-2xl font-bold text-[#13264D]">Set up your membership</h2>
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#F4F6FA] p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
          <p className="text-sm text-gray-700">
            <span className="font-semibold text-[#13264D]">{form.businessName}</span> is ready
            to go. Complete the payment below and your listing goes live within 7 days.
          </p>
        </div>
        <div className="mt-5 min-h-[420px]">
          <EmbeddedCheckoutProvider stripe={getStripe()} options={{ fetchClientSecret }}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-sm text-gray-500">
          <Lock className="h-3.5 w-3.5 shrink-0" />
          Secure checkout by Stripe. $60/month, no contract, cancel anytime.
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          Questions? Email{" "}
          <a href="mailto:contact@getbransontickets.com" className="font-medium text-[#13264D] underline">
            contact@getbransontickets.com
          </a>
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm font-semibold tracking-wide text-[#C8102E] uppercase">
        Step 1 of 2
      </p>
      <h2 className="mt-1 text-2xl font-bold text-[#13264D]">Your business</h2>
      <p className="mt-2 mb-6 text-sm text-gray-500">
        Takes about a minute. Payment is the next step, after this form.
      </p>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="text"
          value={form.businessName}
          onChange={update("businessName")}
          placeholder="Business name"
          required
          minLength={2}
          maxLength={200}
          className={inputClasses}
        />
        <input
          type="text"
          value={form.contactName}
          onChange={update("contactName")}
          placeholder="Your name"
          required
          minLength={2}
          maxLength={120}
          className={inputClasses}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          type="email"
          value={form.email}
          onChange={update("email")}
          placeholder="Email"
          required
          maxLength={200}
          className={inputClasses}
        />
        <input
          type="tel"
          value={form.phone}
          onChange={update("phone")}
          placeholder="Phone (optional)"
          maxLength={30}
          className={inputClasses}
        />
      </div>
      <select
        value={form.category}
        onChange={update("category")}
        className={`${inputClasses} ${form.category === "" ? "text-gray-400" : ""}`}
      >
        <option value="" disabled>
          Business type
        </option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <textarea
        value={form.message}
        onChange={update("message")}
        placeholder="Tell us about your business and any deal you'd like to offer Passport visitors (optional)"
        rows={4}
        maxLength={2000}
        className={inputClasses}
      />
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#A50D26] disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        Continue to Payment
      </button>
      {status === "error" && (
        <p className="text-sm text-[#C04E0C]">
          Something went wrong. Please try again, or email us at contact@getbransontickets.com.
        </p>
      )}
    </form>
    </div>
  );
}
