"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  CONVERSION_LABELS,
  reportAdsConversion,
  reportAdsPageView,
} from "@/components/google-ads-tag";
import { StepIndicator } from "../step-indicator";

// Written by /checkout right before it navigates here. Kept in
// sessionStorage (not the URL) so customer details never appear in
// query strings or analytics logs.
export const COMPLETED_ORDER_KEY = "gbt_completed_order";

type CompletedOrder = {
  orderNumber: string;
  total: number;
  itemCount: number;
  emailSent: boolean;
  name: string;
  email: string;
  phone: string;
};

export function ConfirmationClient() {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clearCart);
  const [order, setOrder] = useState<CompletedOrder | null>(null);

  useEffect(() => {
    let parsed: CompletedOrder | null = null;
    try {
      const raw = sessionStorage.getItem(COMPLETED_ORDER_KEY);
      if (raw) parsed = JSON.parse(raw) as CompletedOrder;
    } catch {
      parsed = null;
    }

    if (!parsed?.orderNumber) {
      router.replace("/");
      return;
    }

    setOrder(parsed);
    clearCart();

    // Two conversions report here, only for verified orders. The event
    // conversion is the primary goal and carries the real order value
    // (URL-based conversions can't ingest value); transaction_id dedupes a
    // refresh of this page. The page_view still feeds the legacy URL-based
    // Purchase action until it's retired in the Ads UI.
    reportAdsConversion(CONVERSION_LABELS.purchase, {
      value: parsed.total,
      currency: "USD",
      transaction_id: parsed.orderNumber,
    });
    reportAdsPageView("/checkout/confirmation", {
      value: parsed.total,
      currency: "USD",
      transaction_id: parsed.orderNumber,
    });
  }, [router, clearCart]);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#13264D] border-t-transparent" />
      </div>
    );
  }

  return (
    <>
      {/* Header */}
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

      {/* Progress */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <StepIndicator current={3} />
        </div>
      </div>

      <section className="py-10 sm:py-14 bg-[#F6F4EF]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-sm border border-gray-100">
            <div className="text-center space-y-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#C8102E]/10">
                <Check className="h-10 w-10 text-[#C8102E]" />
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#1A1614]">
                  Booking Confirmed!
                </h2>
                <p className="mt-2 text-[#1A1614]/60">
                  Thank you for your order, {order.name.split(" ")[0]}!
                </p>
              </div>

              <div className="rounded-xl bg-[#F6F4EF] p-6 text-left space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A1614]/60">Order Number</span>
                  <span className="font-bold text-[#13264D]">
                    {order.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A1614]/60">Items</span>
                  <span className="font-medium text-[#1A1614]">
                    {order.itemCount} ticket{order.itemCount !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A1614]/60">Email</span>
                  <span className="font-medium text-[#1A1614]">
                    {order.email}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A1614]/60">Phone</span>
                  <span className="font-medium text-[#1A1614]">
                    {order.phone}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="font-semibold text-[#1A1614]">
                    Total Charged
                  </span>
                  <span className="text-xl font-bold text-[#1A1614]">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {order.emailSent ? (
                <div className="rounded-xl border-l-4 border-[#C8102E] bg-[#FDF3F4] p-5 text-left">
                  <p className="text-base font-bold text-[#C8102E]">
                    Your vouchers arrive within 12 hours
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#1A1614]/75">
                    We sent a receipt to{" "}
                    <span className="font-semibold text-[#1A1614]">
                      {order.email}
                    </span>
                    . We book every seat through the theater by hand, so your
                    show voucher comes in a second email within 12 hours. That
                    voucher is what the box office scans, and there is nothing
                    else you need to do before then.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#1A1614]/75">
                    Attending today or tomorrow? Call{" "}
                    <a
                      href="tel:14172439629"
                      className="font-semibold text-[#C8102E] hover:underline"
                    >
                      (417) 243-9629
                    </a>{" "}
                    and we will move your voucher to the front of the line.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-left">
                  <p className="text-sm font-semibold text-amber-900">
                    Payment received. Your confirmation email did not send
                    automatically.
                  </p>
                  <p className="mt-1 text-xs text-amber-800">
                    Your order is safe and we can see it on our end. Screenshot
                    this page and email{" "}
                    <a
                      href="mailto:contact@getbransontickets.com"
                      className="underline font-medium"
                    >
                      contact@getbransontickets.com
                    </a>{" "}
                    with your order number, or call (417) 243-9629. We will
                    send your voucher within 12 hours either way.
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
          </div>
        </div>
      </section>
    </>
  );
}
