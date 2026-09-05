import { Phone, MapPin, BadgeDollarSign, Ticket } from "lucide-react";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

/**
 * Every claim here has to be checkable against the catalog or the business.
 * No invented totals: the counts are computed from the data we actually sell.
 */
export function TrustBar({ className }: { className?: string }) {
  const showCount = shows.length;
  const attractionCount = attractions.length;

  return (
    <section className={cn("border-y border-[#E4E2DC] bg-[#F6F4EF]", className)}>
      <div className="mx-auto grid max-w-7xl gap-px bg-[#E4E2DC] px-0 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1.5 bg-[#F6F4EF] p-6">
          <Phone className="h-5 w-5 text-[#C8102E]" strokeWidth={1.6} />
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            className="font-display text-lg font-bold text-[#13264D] hover:text-[#C8102E]"
          >
            {siteConfig.phone}
          </a>
          <p className="text-sm text-[#5C6478]">
            Questions about a show or an order? Give us a call.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 bg-[#F6F4EF] p-6">
          <Ticket className="h-5 w-5 text-[#C8102E]" strokeWidth={1.6} />
          <p className="font-display text-lg font-bold text-[#13264D]">
            {showCount} shows, {attractionCount} attractions
          </p>
          <p className="text-sm text-[#5C6478]">
            Everything currently running, and nothing that closed.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 bg-[#F6F4EF] p-6">
          <BadgeDollarSign className="h-5 w-5 text-[#C8102E]" strokeWidth={1.6} />
          <p className="font-display text-lg font-bold text-[#13264D]">
            Best Price Guarantee
          </p>
          <p className="text-sm text-[#5C6478]">
            Find a lower price for the same seats and we will match it.
          </p>
        </div>

        <div className="flex flex-col gap-1.5 bg-[#F6F4EF] p-6">
          <MapPin className="h-5 w-5 text-[#C8102E]" strokeWidth={1.6} />
          <p className="font-display text-lg font-bold text-[#13264D]">Based in Branson, Missouri</p>
          <p className="text-sm text-[#5C6478]">
            A local company, not a national reseller.
          </p>
        </div>
      </div>
    </section>
  );
}
