"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart";
import { cartBaseSubtotal } from "@/lib/tax";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const storedItems = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const getItemCount = useCartStore((s) => s.getItemCount);

  // The cart rehydrates from localStorage, which the server can't see;
  // rendering it during hydration mismatches the SSR HTML for anyone who
  // arrives with items and forces a full client re-render. Content fills in
  // after mount instead (the drawer is closed at that point anyway).
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const items = mounted ? storedItems : [];
  const count = mounted ? getItemCount() : 0;

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const formatDate = (dateStr: string) => {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer. The clipping wrapper keeps the closed (translated-off) panel
          from widening the page — without it, mobile browsers grow the layout
          viewport to fit the off-canvas panel and a gap opens on the right. */}
      <div
        className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-[visibility] duration-300 ${
          isOpen ? "" : "invisible"
        }`}
        aria-hidden={!isOpen}
      >
      <div
        className={`pointer-events-auto absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-[#1A1614]">
            Your Cart ({count})
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-[#1A1614]"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-gray-300" />
              <p className="mb-1 text-lg font-semibold text-[#1A1614]">
                Your cart is empty
              </p>
              <p className="text-sm text-gray-500">
                Browse our shows and add tickets to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => {
                // Pre-tax base; taxes appear once, at checkout.
                const subtotal = cartBaseSubtotal([item]);

                return (
                  <div
                    key={`${item.id}-${item.date}-${idx}`}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-[#1A1614]">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-gray-500">
                          {formatDate(item.date)}
                          {item.time && ` at ${item.time}`}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.adults} Adult{item.adults !== 1 ? "s" : ""}
                          {item.children > 0 &&
                            `, ${item.children} Child${item.children !== 1 ? "ren" : ""}`}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.date)}
                        className="ml-2 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-2 text-right text-sm font-semibold text-[#1A1614]">
                      ${subtotal.toFixed(2)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-200 px-5 py-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="text-base font-bold text-[#1A1614]">Subtotal</span>
              <span className="text-xl font-bold text-[#1A1614]">
                ${cartBaseSubtotal(items).toFixed(2)}
              </span>
            </div>
            <p className="mb-4 text-xs text-gray-400">Taxes calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-lg bg-[#C8102E] py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="mt-2 w-full py-2 text-center text-sm font-medium text-[#13264D] hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
      </div>
    </>
  );
}
