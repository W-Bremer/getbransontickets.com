"use client";

import { Info, Ticket } from "lucide-react";
import { openBooking } from "@/components/book-now-button";
import { baseOf, formatBasePrice } from "@/lib/tax";

interface PricesSectionProps {
  priceFrom: number;
  childPriceFrom?: number;
  kidsFreeUnderAge?: number;
  bogo50?: boolean;
}

function PriceCard({
  title,
  children,
  onBook,
}: {
  title: string;
  children: React.ReactNode;
  onBook: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#13264D]">
      <div className="bg-[#13264D] px-5 py-3 text-center">
        <h3 className="text-xl font-bold text-white font-heading">{title}</h3>
      </div>
      <div className="flex flex-col items-start gap-4 bg-gray-50 p-5 sm:flex-row sm:items-center">
        <div className="hidden h-20 w-24 shrink-0 items-center justify-center rounded-lg bg-[#13264D]/5 sm:flex">
          <Ticket className="h-10 w-10 text-[#13264D]" aria-hidden />
        </div>
        <div className="min-w-0 flex-1 space-y-1">{children}</div>
        <button
          type="button"
          onClick={onBook}
          className="w-full shrink-0 rounded-lg bg-[#E8C65A] px-6 py-2.5 font-bold text-[#1A1614] shadow transition-colors hover:bg-[#d9b544] sm:w-auto"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

/**
 * The Prices section under the booking calendar: the standard rates and the
 * automatic BOGO 50% two-ticket price, each with its own Book Now.
 */
export function PricesSection({
  priceFrom,
  childPriceFrom,
  kidsFreeUnderAge,
  bogo50,
}: PricesSectionProps) {
  const baseAdult = baseOf(priceFrom);
  const bogoPair = Math.round((2 * baseAdult - baseAdult / 2) * 100) / 100;

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[#1A1614] font-heading">Prices</h2>
      <p className="mt-2 flex items-center gap-2 text-sm text-[#1A1614]/70">
        <Info className="h-4 w-4 shrink-0 text-[#13264D]" aria-hidden />
        Prices do not include tax. We have no fees.
      </p>

      <div className="mt-5 space-y-6">
        <PriceCard title="Standard" onBook={() => openBooking()}>
          <p className="text-lg text-[#1A1614]">
            <span className="font-bold">Adult:</span> ${formatBasePrice(priceFrom)}
          </p>
          {childPriceFrom !== undefined && childPriceFrom > 0 && (
            <p className="text-lg text-[#1A1614]">
              <span className="font-bold">Child:</span> ${formatBasePrice(childPriceFrom)}
            </p>
          )}
          {childPriceFrom === 0 && (
            <p className="text-lg font-bold text-emerald-700">Kids free</p>
          )}
          <p className="text-sm text-[#1A1614]/60">Prices do not include tax.</p>
          {kidsFreeUnderAge !== undefined && (
            <p className="text-sm text-[#1A1614]/60">
              Ages {kidsFreeUnderAge} and under are free.
            </p>
          )}
        </PriceCard>

        {bogo50 && (
          <PriceCard
            title="BOGO 50% (2 Tickets)"
            onBook={() => openBooking({ adults: 2, children: 0 })}
          >
            <p className="text-lg text-[#1A1614]">
              <span className="font-bold">2 Adults:</span> ${bogoPair.toFixed(2)}
            </p>
            <p className="text-sm text-[#1A1614]/60">
              Buy one adult ticket, get the second 50% off. Applied
              automatically at checkout on every pair of adult tickets.
            </p>
            <p className="text-sm text-[#1A1614]/60">Prices do not include tax.</p>
          </PriceCard>
        )}
      </div>
    </div>
  );
}
