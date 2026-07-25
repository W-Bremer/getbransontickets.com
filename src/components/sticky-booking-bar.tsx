"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface StickyBookingBarProps {
  priceFrom: number;
  showName: string;
  isFeaturedPartner: boolean;
  externalUrl?: string;
}

export default function StickyBookingBar({
  priceFrom,
  showName,
  isFeaturedPartner,
  externalUrl,
}: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToBooking = () => {
    const el = document.getElementById("booking-widget");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-30 border-t border-gray-200 bg-white px-4 py-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500 leading-tight">{showName}</p>
          <p className="text-lg font-bold text-[#1A1614]">
            From <span className="text-[#C8102E]">${priceFrom}</span>
          </p>
        </div>
        {isFeaturedPartner ? (
          <button
            onClick={scrollToBooking}
            className="rounded-lg bg-[#C8102E] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
          >
            Book Now
          </button>
        ) : externalUrl ? (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-[#d4a843] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#b8922e] flex items-center gap-1.5"
          >
            Official Site
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            onClick={scrollToBooking}
            className="rounded-lg bg-[#C8102E] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
          >
            Get Tickets
          </button>
        )}
      </div>
    </div>
  );
}
