"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Phone } from "lucide-react";
import { openBooking } from "@/components/book-now-button";
import { siteConfig } from "@/lib/config";
import { formatBasePrice } from "@/lib/tax";

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
  // Visible from page load and through the whole scroll: the ticket CTA
  // should never be off screen on a phone. It steps aside only while the
  // booking popup itself is open (and while the mobile nav is, via the
  // .mobile-nav-open class variant).
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onModal = (e: Event) =>
      setModalOpen(!!(e as CustomEvent<{ open: boolean }>).detail?.open);
    window.addEventListener("gbt:booking-modal", onModal);
    return () => window.removeEventListener("gbt:booking-modal", onModal);
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
        ? `Kids $${formatBasePrice(childPriceFrom)}`
        : null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[55] border-t border-gray-200 bg-white px-4 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden [.mobile-nav-open_&]:translate-y-full ${
        modalOpen ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-xs text-gray-500 leading-tight">{showName}</p>
          <p className="text-lg font-bold leading-tight text-[#1A1614]">
            From <span className="text-[#C8102E]">${formatBasePrice(priceFrom)}</span>
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
            className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#13264D] text-[#13264D]"
          >
            <Phone className="h-5 w-5" />
          </a>
          {isFeaturedPartner ? (
            <button
              onClick={() => openBooking()}
              className="min-h-12 rounded-lg bg-[#C8102E] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
            >
              Buy Tickets
            </button>
          ) : externalUrl ? (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-12 items-center gap-1.5 rounded-lg bg-[#E8C65A] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#C04E0C]"
            >
              Official Site
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={scrollToBooking}
              className="min-h-12 rounded-lg bg-[#C8102E] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
            >
              Get Tickets
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
