import { Star, BadgeCheck, CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { baseOf, formatBasePrice } from "@/lib/tax";

interface MobileBuyBlockProps {
  priceFrom: number;
  competitorPrice?: number;
  bogo50?: boolean;
  rating?: number;
  reviewCount?: number;
}

/**
 * The mobile fold's selling block: stars with a review count, the price with
 * its competitor strike and savings, the BOGO offer, and trust chips. Server
 * component, zero JS, lg:hidden (the desktop rail carries these already).
 * Every figure derives from real data: catalog price, documented competitor
 * rate, live Google rating.
 */
export function MobileBuyBlock({
  priceFrom,
  competitorPrice,
  bogo50,
  rating,
  reviewCount,
}: MobileBuyBlockProps) {
  const savings =
    competitorPrice !== undefined && competitorPrice > baseOf(priceFrom)
      ? (competitorPrice - baseOf(priceFrom)).toFixed(2)
      : null;

  return (
    <div className="lg:hidden">
      {rating !== undefined && reviewCount !== undefined && (
        <p className="flex items-center gap-1.5 text-sm text-[#1A1614]">
          <Star className="h-4 w-4 fill-[#E8C65A] text-[#E8C65A]" aria-hidden />
          <span className="font-bold">{rating}</span>
          <span className="text-[#1A1614]/60">({reviewCount} Google reviews)</span>
        </p>
      )}

      <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        {competitorPrice !== undefined && (
          <span className="text-base font-bold text-gray-400 line-through">
            ${competitorPrice}
          </span>
        )}
        <span className="text-2xl font-bold text-[#13264D]">
          ${formatBasePrice(priceFrom)}
        </span>
        <span className="text-sm text-[#1A1614]/60">plus tax</span>
        {savings && (
          <span className="rounded-md bg-[#C8102E] px-1.5 py-0.5 text-xs font-bold text-white">
            Save ${savings}
          </span>
        )}
      </p>

      {bogo50 && (
        <p className="mt-1.5 inline-flex items-start gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold leading-snug text-emerald-800">
          <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          <span>BOGO 50%: 2nd adult ticket half price, applied automatically</span>
        </p>
      )}

      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-semibold text-[#1A1614]/70">
        <span className="inline-flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" aria-hidden />
          Instant Confirmation
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock3 className="h-3.5 w-3.5 text-[#13264D]" aria-hidden />
          Free cancel 24 hrs
        </span>
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#13264D]" aria-hidden />
          Authorized reseller
        </span>
      </div>
    </div>
  );
}
