import { BadgePercent, Baby, Check } from "lucide-react";
import { formatBasePrice } from "@/lib/tax";

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

  return (
    <div className={className}>
      {/* Deal chips — only claims backed by the price data render. Hidden on
          desktop, where the sticky panel is fighting for viewport height and
          the navy header already shows adult + kids pricing; the free-age
          rule still reaches desktop buyers via the child-age selector note
          and the FAQ. */}
      <div className="flex flex-wrap gap-1.5 lg:hidden">
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
            Students ${formatBasePrice(studentPriceFrom)}
          </span>
        )}
      </div>

      {/* Value line, matching the guarantees made at checkout */}
      <ul className="mt-3 lg:mt-0 space-y-1 text-xs text-gray-600">
        <li className="flex items-center gap-1.5">
          <Check className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
          No added fees. Your total never tops the box-office rate
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
