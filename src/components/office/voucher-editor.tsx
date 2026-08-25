"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { OfficeOrder } from "@/lib/office-orders";

interface EditableItem {
  date: string;
  time: string;
  seatingTier: string;
  voucherCode: string;
}

const inputClass =
  "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#1A1614] focus:border-[#13264D] focus:outline-none focus:ring-1 focus:ring-[#13264D]";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold tracking-wide text-gray-500 uppercase">
        {label}
      </span>
      {children}
    </label>
  );
}

export function VoucherEditor({ order }: { order: OfficeOrder }) {
  const router = useRouter();
  const [customerName, setCustomerName] = useState(order.customerName);
  const [customerEmail, setCustomerEmail] = useState(order.customerEmail);
  const [customerPhone, setCustomerPhone] = useState(order.customerPhone);
  const [items, setItems] = useState<EditableItem[]>(
    order.items.map((item) => ({
      date: item.date,
      time: item.time ?? "",
      seatingTier: item.seatingTier ?? "",
      voucherCode: "",
    }))
  );
  const [force, setForce] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  const alreadySent = Boolean(order.voucherSentAt) && !sentTo;

  function setItem(index: number, patch: Partial<EditableItem>) {
    setItems((prev) => prev.map((it, i) => (i === index ? { ...it, ...patch } : it)));
  }

  async function send() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/send-voucher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId: order.paymentIntentId,
          customerName: customerName.trim(),
          customerEmail: customerEmail.trim(),
          customerPhone: customerPhone.trim(),
          force: alreadySent ? force : undefined,
          items: order.items.map((item, i) => ({
            id: item.id,
            name: item.name,
            date: items[i].date.trim(),
            time: items[i].time.trim() || undefined,
            adults: item.adults,
            children: item.children,
            seatingTier: items[i].seatingTier.trim() || undefined,
            voucherCode: items[i].voucherCode.trim() || undefined,
            // The server always reprices from the catalog; these are ignored.
            pricePerAdult: 0,
            pricePerChild: 0,
          })),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Send failed");
        return;
      }
      setSentTo(customerEmail.trim());
      router.refresh();
    } catch {
      setError("Send failed. Check the connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  if (sentTo) {
    return (
      <div className="mt-6 rounded-xl border border-green-300 bg-green-50 p-6">
        <h2 className="font-bold text-green-900">Voucher sent</h2>
        <p className="mt-1 text-sm text-green-900">
          The voucher email for {order.orderNumber} went to {sentTo}.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {alreadySent && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          A voucher for this order already went out on{" "}
          {new Date(order.voucherSentAt!).toLocaleString("en-US", {
            timeZone: "America/Chicago",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          })}
          . Sending again emails the customer a second voucher.
        </div>
      )}

      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-bold text-[#13264D]">Customer</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Name">
            <input
              className={inputClass}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </Field>
          <Field label="Email">
            <input
              className={inputClass}
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </Field>
          <Field label="Phone">
            <input
              className={inputClass}
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </Field>
        </div>
      </section>

      {order.items.map((item, i) => (
        <section key={i} className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-bold text-[#13264D]">{item.name}</h2>
            <span className="text-sm text-gray-500">
              {item.adults} adult{item.adults !== 1 ? "s" : ""}
              {item.children > 0 &&
                `, ${item.children} child${item.children !== 1 ? "ren" : ""}`}
            </span>
          </div>
          {item.theaterName && (
            <p className="mt-1 text-sm text-gray-600">
              {item.theaterName}
              {item.theaterAddress && ` · ${item.theaterAddress}`}
            </p>
          )}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Show date">
              <input
                className={inputClass}
                type="date"
                value={items[i].date}
                onChange={(e) => setItem(i, { date: e.target.value })}
              />
            </Field>
            <Field label="Show time">
              <input
                className={inputClass}
                placeholder="7:30 PM"
                value={items[i].time}
                onChange={(e) => setItem(i, { time: e.target.value })}
              />
            </Field>
            <Field label="Seating">
              <input
                className={inputClass}
                placeholder="Standard"
                value={items[i].seatingTier}
                onChange={(e) => setItem(i, { seatingTier: e.target.value })}
              />
            </Field>
            <Field label="Voucher number">
              <input
                className={inputClass}
                placeholder={`${order.orderNumber}-${String(i + 1).padStart(2, "0")}`}
                value={items[i].voucherCode}
                onChange={(e) => setItem(i, { voucherCode: e.target.value })}
              />
            </Field>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Leave the voucher number empty to use the printed default. If the box
            office issued its own number, put it here so their system matches.
          </p>
        </section>
      ))}

      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-gray-600">
              Total paid: <span className="font-bold text-[#1A1614]">${order.totalAmount.toFixed(2)}</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Confirm the seats with the theater before sending. The email goes
              straight to the customer.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {alreadySent && (
              <label className="flex items-center gap-2 text-sm text-amber-900">
                <input
                  type="checkbox"
                  checked={force}
                  onChange={(e) => setForce(e.target.checked)}
                />
                Send again anyway
              </label>
            )}
            <button
              onClick={send}
              disabled={busy || (alreadySent && !force) || !customerEmail.trim()}
              className="rounded-lg bg-[#C8102E] px-6 py-2.5 font-semibold text-white transition hover:bg-[#A50D26] disabled:opacity-50"
            >
              {busy ? "Sending..." : "Send voucher"}
            </button>
          </div>
        </div>
        {error && (
          <p className="mt-3 text-sm font-medium text-[#C8102E]">{error}</p>
        )}
      </section>
    </div>
  );
}
