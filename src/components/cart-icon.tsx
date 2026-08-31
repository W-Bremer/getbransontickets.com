"use client";

import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart";

export function CartIcon() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const getItemCount = useCartStore((s) => s.getItemCount);

  // The cart lives in localStorage, which the server can't see: rendering the
  // count during hydration mismatches the server HTML for anyone arriving
  // with items, and React then regenerates the whole tree (slow first paint
  // for exactly the visitors who are mid-purchase). Badge appears post-mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const count = mounted ? getItemCount() : 0;

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
