"use client";

import Link from "next/link";
import { Users } from "lucide-react";
import { openBooking } from "@/components/book-now-button";
import { baseOf } from "@/lib/tax";

interface FamilyBundleProps {
  priceFrom: number;
  childPriceFrom?: number;
  /** Fold the automatic BOGO 50% (half off the 2nd adult) into the math. */
  bogo50?: boolean;
  /** When set, the CTA links to this show page with ?adults=2&children=2
      (theatre pages); otherwise it opens the booking popup prefilled. */
  href?: string;
  className?: string;
}

/**
 * Family-of-4 framing as one compact strip: real arithmetic from the prices
 * checkout actually charges (2 adults + 2 kids vs 4 adult seats), advertised
 * pre-tax like every other sticker. No invented prices, and deliberately not
 * a box: the old family-of-4 box was cut for hogging vertical space.
 */
export function FamilyBundle({
  priceFrom,
  childPriceFrom,
  bogo50,
  href,
  className = "",
}: FamilyBundleProps) {
  // Only render when kids genuinely cost less than adults.
  if (childPriceFrom === undefined || childPriceFrom >= priceFrom) return null;

  const baseAdult = baseOf(priceFrom);
  const baseChild = baseOf(childPriceFrom);
  const bogoOff = bogo50 ? Math.round((baseAdult / 2) * 100) / 100 : 0;
  const family = Math.round((2 * baseAdult + 2 * baseChild - bogoOff) * 100) / 100;
  const fourAdults = Math.round(4 * baseAdult * 100) / 100;
  const saved = Math.round((fourAdults - family) * 100) / 100;

  const label =
    childPriceFrom === 0 ? (
      <>
        <span className="font-bold">Family of 4: ${family.toFixed(2)}</span> plus tax.
        Kids&apos; tickets are free, so 4 seats cost the same as 2 adults.
      </>
    ) : (
      <>
        <span className="font-bold">Family of 4: ${family.toFixed(2)}</span> plus tax
        (2 adults + 2 kids{bogo50 ? " with BOGO 50%" : ""}). Save ${saved.toFixed(2)}{" "}
        vs. 4 adult seats.
      </>
    );

  const inner = (
    <>
      <Users className="h-4 w-4 shrink-0 text-[#13264D]" aria-hidden />
      <span className="min-w-0 text-xs leading-relaxed text-[#1A1614]/80">{label}</span>
      <span className="ml-auto shrink-0 rounded-full bg-[#13264D] px-2.5 py-1 text-[11px] font-bold text-white">
        Book 2 + 2
      </span>
    </>
  );

  const strip =
    "flex w-full items-center gap-2 rounded-lg border border-[#13264D]/15 bg-[#F6F4EF] px-3 py-2 text-left transition-colors hover:border-[#13264D]/40";

  return href ? (
    <Link href={`${href}?adults=2&children=2`} className={`${strip} ${className}`}>
      {inner}
    </Link>
  ) : (
    <button
      type="button"
      onClick={() => openBooking({ adults: 2, children: 2 })}
      className={`${strip} ${className}`}
    >
      {inner}
    </button>
  );
}
