"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const items = useCartStore((s) => s.items);
  const closeCart = useCartStore((s) => s.closeCart);
  const removeItem = useCartStore((s) => s.removeItem);
  const getTotal = useCartStore((s) => s.getTotal);
  const getItemCount = useCartStore((s) => s.getItemCount);

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

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="text-lg font-bold text-[#333333]">
            Your Cart ({getItemCount()})
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-[#333333]"
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
              <p className="mb-1 text-lg font-semibold text-[#333333]">
                Your cart is empty
              </p>
              <p className="text-sm text-gray-500">
                Browse our shows and add tickets to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => {
                const subtotal =
                  item.adults * item.pricePerAdult +
                  item.children * item.pricePerChild;

                return (
                  <div
                    key={`${item.id}-${item.date}-${idx}`}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-bold text-[#333333]">
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
                    <div className="mt-2 text-right text-sm font-semibold text-[#333333]">
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
            <div className="mb-4 flex items-center justify-between">
              <span className="text-base font-bold text-[#333333]">Total</span>
              <span className="text-xl font-bold text-[#333333]">
                ${getTotal().toFixed(2)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-lg bg-[#8B6914] py-3 text-center text-sm font-bold text-white transition-colors hover:bg-[#6B5210]"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="mt-2 w-full py-2 text-center text-sm font-medium text-[#7B1A1A] hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
