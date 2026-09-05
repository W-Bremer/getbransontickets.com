"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { formatBasePrice } from "@/lib/tax";

interface TicketInfoCardProps {
  priceFrom: number;
  competitorPrice?: number;
}

/** Scrolls to the big booking calendar (it carries id="booking-widget"). */
function scrollToBooking() {
  const el = document.getElementById("booking-widget");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * The right-rail Ticket Info panel: the as-low-as price, one Reserve button
 * that jumps to the booking calendar, and the phone path with a live local
 * expert. Replaces the old in-panel mini calendar.
 */
export function TicketInfoCard({ priceFrom, competitorPrice }: TicketInfoCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-[#C8102E] bg-white shadow-lg">
      <div className="bg-[#C8102E] px-5 py-3 text-center">
        <h2 className="text-xl font-bold text-white font-heading">Ticket Info</h2>
      </div>
      <div className="space-y-4 px-5 py-6 text-center">
        <p className="text-lg font-semibold text-[#1A1614]">
          As low as{" "}
          {competitorPrice !== undefined && (
            <span className="mr-1 font-bold text-gray-400 line-through">
              ${competitorPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-[#13264D]">
            ${formatBasePrice(priceFrom)}
          </span>{" "}
          plus tax
        </p>

        <button
          type="button"
          onClick={scrollToBooking}
          className="w-full rounded-xl bg-[#E8C65A] px-6 py-3.5 text-lg font-bold text-[#1A1614] shadow transition-colors hover:bg-[#d9b544]"
        >
          Reserve Tickets
        </button>

        <p className="text-lg font-bold text-[#1A1614]">Or</p>

        <p className="text-base font-semibold text-[#1A1614]">
          Call for the latest discounts and packages
        </p>

        <div>
          <p className="text-sm font-medium text-[#1A1614]/70">Live Local Expert</p>
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="mt-0.5 block text-3xl font-bold tracking-tight text-[#13264D] hover:text-[#C8102E] transition-colors"
          >
            {siteConfig.phone}
          </a>
        </div>

        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-6 py-3 font-bold text-white transition-colors hover:bg-[#A50D26]"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Call Now
        </a>
      </div>
    </div>
  );
}
