"use client";

import { useState, useEffect } from "react";

interface StickyBookingBarProps {
  priceFrom: number;
  showName: string;
}

export default function StickyBookingBar({
  priceFrom,
  showName,
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
          <p className="text-lg font-bold text-[#333333]">
            From <span className="text-[#018941]">${priceFrom}</span>
          </p>
        </div>
        <button
          onClick={scrollToBooking}
          className="rounded-lg bg-[#018941] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#017535]"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}
