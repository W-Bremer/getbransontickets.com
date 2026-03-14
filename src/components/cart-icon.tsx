"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export function CartIcon() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const getItemCount = useCartStore((s) => s.getItemCount);
  const count = getItemCount();

  return (
    <button
      onClick={toggleCart}
      className="relative rounded-full p-2 text-white hover:bg-white/10 transition-colors"
      aria-label={`Shopping cart${count > 0 ? `, ${count} item${count !== 1 ? "s" : ""}` : ""}`}
    >
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}
