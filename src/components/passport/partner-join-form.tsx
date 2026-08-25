"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

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

export function PartnerJoinForm() {
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
        body: JSON.stringify({ type: "partner", ...form, website }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
        <CheckCircle2 className="mx-auto mb-3 h-10 w-10 text-green-600" />
        <h3 className="text-xl font-bold text-[#13264D]">Application received!</h3>
        <p className="mt-2 text-gray-600">
          Thanks for your interest in the Branson Passport. We&apos;ll reach out within 2 business
          days to set up your free listing and your QR code kit.
        </p>
      </div>
    );
  }

  return (
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
        Apply to Join, Free
      </button>
      {status === "error" && (
        <p className="text-sm text-[#C04E0C]">
          Something went wrong. Please try again, or email us at contact@getbransontickets.com.
        </p>
      )}
    </form>
  );
}
