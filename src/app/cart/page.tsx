"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingCart,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { useCartStore, type CartItem } from "@/stores/cart";
import { DISCOUNTS } from "@/lib/adjustments";
import { baseOf, cartBaseSubtotal } from "@/lib/tax";
import { Breadcrumbs } from "@/components/breadcrumbs";

function CartItemRow({ item }: { item: CartItem }) {
  const { removeItem, updateItem } = useCartStore();

  // Advertised pre-tax; the tax line lands once, at checkout.
  const itemTotal = cartBaseSubtotal([item]);

  function updateAdults(delta: number) {
    const newAdults = Math.max(0, item.adults + delta);
    if (newAdults === 0 && item.children === 0) {
      removeItem(item.id, item.date);
      return;
    }
    updateItem(item.id, item.date, { adults: newAdults });
  }

  function updateChildren(delta: number) {
    const newChildren = Math.max(0, item.children + delta);
    updateItem(item.id, item.date, { children: newChildren });
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
      {/* Image */}
      {item.imageUrl && (
        <div className="relative h-24 w-full sm:h-28 sm:w-36 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            sizes="144px"
          />
          <div className="absolute top-2 left-2">
            <span className="rounded-full bg-[#13264D]/90 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              {item.type}
            </span>
          </div>
        </div>
      )}

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-[#1A1614]">{item.name}</h3>
            <p className="text-sm text-[#1A1614]/60 mt-0.5">
              {item.date}
              {item.time ? ` at ${item.time}` : ""}
            </p>
            {item.seatingTier && (
              <p className="text-sm text-[#13264D] font-medium mt-0.5">
                {item.seatingTier}
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(item.id, item.date)}
            className="shrink-0 rounded-lg p-2 text-[#1A1614]/40 hover:bg-red-50 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        {/* Quantity controls */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
          <div className="flex gap-6">
            {/* Adults */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1614]/40">
                Adults
              </span>
              <div className="mt-1 flex items-center gap-2">
                <button
                  onClick={() => updateAdults(-1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#1A1614]/60 hover:border-[#13264D] hover:text-[#13264D] transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#1A1614]">
                  {item.adults}
                </span>
                <button
                  onClick={() => updateAdults(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#1A1614]/60 hover:border-[#13264D] hover:text-[#13264D] transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-xs text-[#1A1614]/40 mt-0.5 block">
                ${baseOf(item.pricePerAdult).toFixed(2)} each
              </span>
            </div>

            {/* Children */}
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#1A1614]/40">
                Children
              </span>
              <div className="mt-1 flex items-center gap-2">
                <button
                  onClick={() => updateChildren(-1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#1A1614]/60 hover:border-[#13264D] hover:text-[#13264D] transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#1A1614]">
                  {item.children}
                </span>
                <button
                  onClick={() => updateChildren(1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-[#1A1614]/60 hover:border-[#13264D] hover:text-[#13264D] transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="text-xs text-[#1A1614]/40 mt-0.5 block">
                ${baseOf(item.pricePerChild).toFixed(2)} each
              </span>
            </div>
          </div>

          {/* Item Total */}
          <div className="text-right">
            <span className="text-xs text-[#1A1614]/40">Subtotal</span>
            <div className="text-xl font-bold text-[#1A1614]">
              ${itemTotal.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, clearCart, discountType } = useCartStore();
  const [mounted, setMounted] = useState(false);

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

  const baseSubtotal = cartBaseSubtotal(items);

  if (items.length === 0) {
    return (
      <>
        <section className="bg-[#13264D] pt-12 pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Cart" },
              ]}
              className="mb-6"
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
              Your Cart
            </h1>
          </div>
        </section>
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-lg px-4 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F6F4EF]">
              <ShoppingCart className="h-10 w-10 text-[#1A1614]/30" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-[#1A1614]">
              Your Cart is Empty
            </h2>
            <p className="mt-3 text-[#1A1614]/60">
              Browse our shows and attractions to find the perfect Branson
              entertainment.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shows"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 font-semibold text-white hover:bg-[#C8102E]/90 transition-colors"
              >
                Browse Shows
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/attractions"
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#13264D] px-6 py-3 font-semibold text-[#13264D] hover:bg-[#13264D] hover:text-white transition-all"
              >
                Browse Attractions
              </Link>
            </div>
          </div>
        </section>
      </>
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
              { label: "Cart" },
            ]}
            className="mb-6"
          />
          <h1 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Your Cart ({items.length} item{items.length !== 1 ? "s" : ""})
          </h1>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-10 sm:py-14 bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, i) => (
                <CartItemRow key={`${item.id}-${item.date}-${i}`} item={item} />
              ))}

              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/shows"
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#13264D] hover:text-[#0D1B38] transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Continue Shopping
                </Link>
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-[#1A1614]/50 hover:text-red-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:mt-0">
              <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                <h2 className="text-lg font-bold text-[#1A1614]">
                  Order Summary
                </h2>

                <div className="mt-4 space-y-3 border-b border-gray-100 pb-4">
                  {items.map((item, i) => {
                    const sub = cartBaseSubtotal([item]);
                    return (
                      <div
                        key={`${item.id}-${item.date}-${i}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-[#1A1614]/70 truncate mr-2">
                          {item.name}
                        </span>
                        <span className="font-medium text-[#1A1614] whitespace-nowrap">
                          ${sub.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex justify-between text-lg font-bold text-[#1A1614]">
                  <span>Subtotal</span>
                  <span>${baseSubtotal.toFixed(2)}</span>
                </div>
                {discountType !== "none" && (
                  <div className="mt-1 flex justify-between text-sm font-medium text-emerald-700">
                    <span>{DISCOUNTS[discountType].label}</span>
                    <span>
                      -${(DISCOUNTS[discountType].amountCents / 100).toFixed(2)}
                    </span>
                  </div>
                )}
                <p className="mt-1 text-xs text-[#1A1614]/40">
                  Taxes calculated at checkout.
                </p>

                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C8102E] py-4 text-lg font-semibold text-white hover:bg-[#C8102E]/90 transition-colors shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </Link>

                <p className="mt-4 text-center text-xs text-[#1A1614]/40">
                  Secure checkout. No hidden fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
