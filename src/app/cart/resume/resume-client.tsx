"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useCartStore, type CartItem } from "@/stores/cart";

type State =
  | { phase: "loading" }
  | { phase: "completed" }
  | { phase: "error"; message: string };

/**
 * Landing spot for the recovery email's "Finish My Booking" link. Swaps the
 * stored cart for the abandoned one and forwards to checkout; anything that
 * can't be restored explains itself and points back at the shows.
 */
export function ResumeCartClient() {
  const router = useRouter();
  const params = useSearchParams();
  const { clearCart, addItem } = useCartStore();
  const [state, setState] = useState<State>({ phase: "loading" });
  const started = useRef(false);

  const pi = params.get("pi") ?? "";

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    (async () => {
      try {
        const res = await fetch("/api/resume-cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentIntentId: pi }),
        });
        const data = (await res.json()) as {
          items?: CartItem[];
          completed?: boolean;
          error?: string;
        };

        if (data.completed) {
          setState({ phase: "completed" });
          return;
        }
        if (!res.ok || !data.items || data.items.length === 0) {
          setState({
            phase: "error",
            message: data.error ?? "We couldn't restore this cart.",
          });
          return;
        }

        clearCart();
        data.items.forEach((item) => addItem(item));
        router.replace("/checkout");
      } catch {
        setState({ phase: "error", message: "We couldn't restore this cart." });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.phase === "loading") {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#13264D] border-t-transparent" />
        <p className="text-sm text-[#1A1614]/60">Restoring your cart...</p>
      </div>
    );
  }

  if (state.phase === "completed") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
          <h1 className="mt-4 text-2xl font-bold text-[#1A1614]">
            This booking is already complete
          </h1>
          <p className="mt-3 text-[#1A1614]/60">
            Good news — this order went through. Check your inbox for the
            confirmation and voucher emails.
          </p>
          <Link
            href="/shows"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 font-semibold text-white hover:bg-[#C8102E]/90 transition-colors"
          >
            Browse More Shows
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-[#1A1614]">
          We couldn&rsquo;t restore this cart
        </h1>
        <p className="mt-3 text-[#1A1614]/60">{state.message}</p>
        <p className="mt-2 text-[#1A1614]/60">
          Tickets are still available — picking your show again only takes a
          minute.
        </p>
        <Link
          href="/shows"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 font-semibold text-white hover:bg-[#C8102E]/90 transition-colors"
        >
          Browse Shows
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
