"use client";

import { Ticket } from "lucide-react";

export interface OpenBookingDetail {
  date?: string;
  time?: string;
  /** Prefill the guest steppers (e.g. the family bundle strip opens 2 + 2). */
  adults?: number;
  children?: number;
}

/** Open the booking popup from anywhere on a show page. */
export function openBooking(detail: OpenBookingDetail = {}) {
  window.dispatchEvent(new CustomEvent("gbt:open-booking", { detail }));
}

interface BookNowButtonProps {
  label?: string;
  /** Preselect this performance in the popup. */
  date?: string;
  time?: string;
  variant?: "primary" | "outline";
  className?: string;
}

/**
 * The site's older audience needs booking to be one obvious tap, wherever
 * they happen to be on the page: every instance of this button opens the
 * booking popup (see BookingModal) rather than asking them to find the
 * panel again.
 */
export function BookNowButton({
  label = "Book Now",
  date,
  time,
  variant = "primary",
  className = "",
}: BookNowButtonProps) {
  return (
    <button
      type="button"
      onClick={() => openBooking({ date, time })}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-lg font-bold transition-colors ${
        variant === "primary"
          ? "bg-[#C8102E] text-white hover:bg-[#A50D26]"
          : "border-2 border-white/80 text-white hover:bg-white hover:text-[#13264D]"
      } ${className}`}
    >
      <Ticket className="h-5 w-5" aria-hidden />
      {label}
    </button>
  );
}
