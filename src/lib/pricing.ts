import { shows } from "@/data/shows";

export interface PricedItem {
  id: string;
  adults: number;
  children: number;
}

/** Authoritative per-person prices for a cart item id. Returns null for unknown ids. */
export function getServerPrices(id: string): { adult: number; child: number } | null {
  const show = shows.find((s) => s.slug === id);
  if (!show) return null;
  return {
    adult: show.priceFrom,
    child: show.childPriceFrom ?? Math.round(show.priceFrom * 0.6),
  };
}

/**
 * Total in cents from server-side prices only. Client-supplied prices are
 * never trusted. Returns null if any item id is unknown or quantities invalid.
 */
export function computeTotalCents(items: PricedItem[]): number | null {
  let total = 0;
  for (const item of items) {
    const prices = getServerPrices(item.id);
    if (!prices) return null;
    const adults = Math.floor(item.adults);
    const children = Math.floor(item.children);
    if (adults < 0 || children < 0 || adults + children === 0 || adults + children > 50) {
      return null;
    }
    total += Math.round(prices.adult * 100) * adults + Math.round(prices.child * 100) * children;
  }
  return total;
}
