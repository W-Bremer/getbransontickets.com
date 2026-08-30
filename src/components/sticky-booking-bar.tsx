"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { formatPrice } from "@/lib/utils";

interface StickyBookingBarProps {
  priceFrom: number;
  childPriceFrom?: number;
  showName: string;
  isFeaturedPartner: boolean;
  externalUrl?: string;
}

export default function StickyBookingBar({
  priceFrom,
  childPriceFrom,
  showName,
  isFeaturedPartner,
  externalUrl,
}: StickyBookingBarProps) {
  // Visible from page load — the ticket CTA should never be off screen on a
  // phone. It only steps aside while the real booking widget is in view.
  const [widgetInView, setWidgetInView] = useState(false);

  useEffect(() => {
    const el = document.getElementById("booking-widget");
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setWidgetInView(entry.isIntersecting),
      // Count the widget as "in view" once a meaningful slice of it shows.
      { rootMargin: "-96px 0px -96px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking-widget");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const kidsLine =
    childPriceFrom === 0
      ? "Kids' tickets free"
      : childPriceFrom !== undefined && childPriceFrom < priceFrom
        ? `Kids $${formatPrice(childPriceFrom)}`
        : null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[55] border-t border-gray-200 bg-white px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden [.mobile-nav-open_&]:translate-y-full ${
        widgetInView ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-gray-500 leading-tight">{showName}</p>
          <p className="text-lg font-bold leading-tight text-[#1A1614]">
            From <span className="text-[#C8102E]">${formatPrice(priceFrom)}</span>
            {kidsLine && (
              <span className="ml-1.5 align-middle text-[11px] font-bold text-[#C04E0C] uppercase tracking-wide">
                &middot; {kidsLine}
              </span>
            )}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={`tel:${siteConfig.phoneRaw}`}
            aria-label={`Call ${siteConfig.phone}`}
            className="flex h-10 w-10 items-center justify-center rounded-lg border-2 border-[#13264D] text-[#13264D]"
          >
            <Phone className="h-4 w-4" />
          </a>
          {isFeaturedPartner ? (
            <button
              onClick={scrollToBooking}
              className="rounded-lg bg-[#C8102E] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
            >
              Buy Tickets
            </button>
          ) : externalUrl ? (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg bg-[#E8C65A] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#C04E0C]"
            >
              Official Site
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={scrollToBooking}
              className="rounded-lg bg-[#C8102E] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
            >
              Get Tickets
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
