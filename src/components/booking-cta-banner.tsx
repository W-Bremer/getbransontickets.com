import { Phone } from "lucide-react";
import { BookNowButton } from "@/components/book-now-button";
import { siteConfig } from "@/lib/config";
import { formatBasePrice } from "@/lib/tax";

interface BookingCtaBannerProps {
  heading: string;
  priceFrom: number;
  childPriceFrom?: number;
  className?: string;
}

/**
 * A can't-miss-it booking prompt for long-scrolling readers: big heading,
 * the price in plain words, one red Book Now (opens the booking popup) and
 * a phone number. Repeated after the sections where people finish reading
 * and are ready to decide.
 */
export function BookingCtaBanner({
  heading,
  priceFrom,
  childPriceFrom,
  className = "",
}: BookingCtaBannerProps) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-r from-[#13264D] to-[#0D1B38] p-6 sm:p-8 ${className}`}
    >
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
            {heading}
          </h3>
          <p className="mt-1.5 text-sm sm:text-base text-white/80">
            Tickets ${formatBasePrice(priceFrom)} + tax
            {childPriceFrom !== undefined && childPriceFrom > 0 && (
              <> &middot; kids ${formatBasePrice(childPriceFrom)}</>
            )}
            {childPriceFrom === 0 && <> &middot; kids free</>}
            {" "}&middot; free cancellation up to 24 hours before
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:shrink-0 sm:flex-row sm:items-center">
          <BookNowButton className="w-full sm:w-auto" />
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-white/70 px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white hover:text-[#13264D] sm:w-auto"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </div>
  );
}
