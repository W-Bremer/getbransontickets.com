"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function OfficeLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/office/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.refresh();
        return;
      }
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Sign-in failed");
    } catch {
      setError("Sign-in failed. Check the connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold tracking-widest text-[#C8102E] uppercase">
          Get Branson Tickets
        </p>
        <h1 className="mt-1 text-2xl font-bold text-[#13264D]">Voucher Desk</h1>
        <p className="mt-2 text-sm text-gray-600">
          Office sign-in. One password for the team.
        </p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Office password"
            autoFocus
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[#1A1614] focus:border-[#13264D] focus:outline-none focus:ring-1 focus:ring-[#13264D]"
          />
          {error && <p className="text-sm font-medium text-[#C8102E]">{error}</p>}
          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="w-full rounded-lg bg-[#C8102E] px-4 py-2.5 font-semibold text-white transition hover:bg-[#A50D26] disabled:opacity-50"
          >
            {busy ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
