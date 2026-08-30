import { BadgePercent, Baby, Check, Users } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface DealHighlightsProps {
  priceFrom: number;
  childPriceFrom?: number;
  studentPriceFrom?: number;
  kidsFreeUnderAge?: number;
  className?: string;
}

/**
 * Savings framing for the booking panel. Every figure here is computed from
 * the prices our checkout actually charges (which match the theaters' FIT
 * contract box-office rates) — nothing is an invented "was" price.
 */
export function DealHighlights({
  priceFrom,
  childPriceFrom,
  studentPriceFrom,
  kidsFreeUnderAge,
  className,
}: DealHighlightsProps) {
  const kidsFree = childPriceFrom === 0;
  const kidsDiscounted =
    childPriceFrom !== undefined && childPriceFrom > 0 && childPriceFrom < priceFrom;
  const kidsPct = kidsDiscounted
    ? Math.round((1 - (childPriceFrom as number) / priceFrom) * 100)
    : 0;

  // Family-of-4 bundle math: what 2 adults + 2 kids actually pay at checkout
  // vs. what four adult seats would cost. Real arithmetic, not a fake markdown.
  const showBundle = childPriceFrom !== undefined && childPriceFrom < priceFrom;
  const bundlePrice = showBundle ? 2 * priceFrom + 2 * (childPriceFrom as number) : 0;
  const fourAdults = 4 * priceFrom;
  const bundleSavings = fourAdults - bundlePrice;

  return (
    <div className={className}>
      {/* Deal chips — only claims backed by the price data render */}
      <div className="flex flex-wrap gap-1.5">
        {kidsFree && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#C8102E] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
            <BadgePercent className="h-3 w-3" />
            Kids&apos; tickets free
          </span>
        )}
        {kidsDiscounted && kidsPct >= 10 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E8C65A] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
            <BadgePercent className="h-3 w-3" />
            Kids save {kidsPct}%
          </span>
        )}
        {kidsFreeUnderAge !== undefined && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#13264D] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
            <Baby className="h-3 w-3" />
            Ages {kidsFreeUnderAge} &amp; under free
          </span>
        )}
        {studentPriceFrom !== undefined && studentPriceFrom < priceFrom && (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#13264D] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
            Students ${formatPrice(studentPriceFrom)}
          </span>
        )}
      </div>

      {/* Family bundle */}
      {showBundle && bundleSavings > 0 && (
        <div className="mt-3 rounded-lg border border-[#E8C65A]/50 bg-[#E8C65A]/10 p-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 shrink-0 text-[#C04E0C]" />
              <span className="text-sm font-semibold text-[#1A1614]">
                Family of 4 &middot; 2 adults + 2 kids
              </span>
            </div>
            <div className="text-right">
              <span className="mr-1.5 text-xs text-gray-400 line-through">
                ${formatPrice(fourAdults)}
              </span>
              <span className="text-base font-bold text-[#C8102E]">
                ${formatPrice(bundlePrice)}
              </span>
            </div>
          </div>
          <p className="mt-1 text-xs font-medium text-[#C04E0C]">
            Save ${formatPrice(bundleSavings)} vs. four adult seats — kids{" "}
            {kidsFree ? "go free" : "pay the kids' rate"}.
          </p>
        </div>
      )}

      {/* Value line — matches the guarantees made at checkout */}
      <ul className="mt-3 space-y-1 text-xs text-gray-600">
        <li className="flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          Box-office rate — no added fees, taxes included
        </li>
        <li className="flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          Free cancellation with 24+ hours notice
        </li>
        <li className="flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          Instant e-tickets by email
        </li>
      </ul>
    </div>
  );
}
