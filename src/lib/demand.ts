// Heuristic demand labels for the booking calendar. Deterministic per
// show+date (a stable hash, not Math.random) so the same date shows the same
// label on every refresh and in every component, weighted by real demand
// signals: how close the date is (a date escalates naturally as it
// approaches, because daysOut shrinks) and Friday/Saturday popularity. Real
// sold-out data from the office overrides is layered on in showtimes.ts and
// always wins. No seat counts are ever shown or invented.

export type DemandLevel = "available" | "limited" | "going-fast" | "sold-out";

/** FNV-1a, 32-bit. Stable across runtimes; nothing about it is secret. */
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export function demandForDate(
  slug: string,
  dateISO: string,
  daysOut: number
): Exclude<DemandLevel, "sold-out"> {
  const roll = hash32(`${slug}|${dateISO}`) % 100;
  const [y, m, d] = dateISO.split("-").map(Number);
  const weekday = new Date(y, m - 1, d).getDay();
  const weekend = weekday === 5 || weekday === 6;

  // Cumulative thresholds out of 100: below the first is "going-fast",
  // below the second "limited", the rest "available".
  let goingFast: number;
  let limited: number;
  if (daysOut <= 3) {
    goingFast = 55;
    limited = 90;
  } else if (daysOut <= 10) {
    goingFast = 30;
    limited = 70;
  } else if (daysOut <= 30) {
    goingFast = 12;
    limited = 40;
  } else {
    goingFast = 5;
    limited = 20;
  }
  if (weekend) {
    goingFast += 15;
    limited += 15;
  }

  if (roll < goingFast) return "going-fast";
  if (roll < limited) return "limited";
  return "available";
}

export const DEMAND_LABELS: Record<DemandLevel, string> = {
  available: "Available",
  limited: "Limited",
  "going-fast": "Going Fast",
  "sold-out": "Sold Out",
};
