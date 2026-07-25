"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

/** Light-background email capture used on the homepage. Posts to the passport signup API. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
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
        body: JSON.stringify({ type: "visitor", email, website }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="mt-8 flex items-center justify-center gap-2.5 text-[#333333]">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <p className="font-medium">You&apos;re on the list! Deals are on the way.</p>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
        {/* honeypot */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          maxLength={200}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-[#333333] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#7B1A1A]"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center justify-center gap-2 rounded-lg bg-[#8B6914] px-6 py-3 font-semibold whitespace-nowrap text-white transition-colors hover:bg-[#6B5210] disabled:opacity-60"
        >
          {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
          Get Deals
        </button>
      </form>
      {status === "error" && (
        <p className="mt-3 text-sm text-[#C04E0C]">Something went wrong. Please try again.</p>
      )}
    </>
  );
}
