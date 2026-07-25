"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

export function PassportSignupForm() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

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
        body: JSON.stringify({ type: "visitor", email, phone, smsOptIn, website }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex items-center justify-center gap-3 rounded-xl bg-white/10 px-6 py-5 text-white">
        <CheckCircle2 className="h-6 w-6 shrink-0 text-white" />
        <p className="font-medium">
          You&apos;re in! Watch your inbox for Branson deals and trip tips.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        maxLength={200}
        className="w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/25"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Mobile number (optional)"
        maxLength={30}
        className="w-full rounded-lg border border-white/25 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 focus:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/25"
      />
      {/* honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {phone.trim() !== "" && (
        <label className="flex items-start gap-2.5 text-left text-xs text-white/70">
          <input
            type="checkbox"
            checked={smsOptIn}
            onChange={(e) => setSmsOptIn(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded accent-[#C8102E]"
          />
          <span>
            Text me Branson deals and trip tips. Message and data rates may apply. Reply STOP anytime to opt out.
          </span>
        </label>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 font-bold text-white transition-colors hover:bg-[#A50D26] disabled:opacity-60"
      >
        {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
        Get My Free Passport
      </button>
      {status === "error" && (
        <p className="text-sm text-white">
          Something went wrong. Please try again, or email us at info@getbransontickets.com.
        </p>
      )}
      <p className="text-xs text-white/50">Free forever. No spam. Unsubscribe anytime.</p>
    </form>
  );
}
