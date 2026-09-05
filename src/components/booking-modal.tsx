"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import BookingWidget from "@/components/booking-widget";
import { formatBasePrice } from "@/lib/tax";
import type { OpenBookingDetail } from "@/components/book-now-button";

interface BookingModalProps {
  showId: string;
  showName: string;
  pricePerAdult: number;
  pricePerChild: number;
  imageUrl?: string;
  kidsFreeUnderAge?: number;
  /** Competitor's documented listed rate, struck through. */
  competitorPrice?: number;
  bogo50?: boolean;
  /** Open immediately with this event (the lazy wrapper replays the first
      gbt:open-booking that arrived before the chunk loaded). */
  initialEvent?: OpenBookingDetail;
}

/**
 * The booking popup: the full booking widget in a dialog, opened by any
 * "Book Now" button on the page (window event `gbt:open-booking`, optionally
 * carrying a preselected date/time). Full-screen on phones, centered card on
 * desktop. Mounted once per show page; reserving navigates to /checkout,
 * which unmounts it.
 */
export function BookingModal({
  showId,
  showName,
  pricePerAdult,
  pricePerChild,
  imageUrl,
  kidsFreeUnderAge,
  competitorPrice,
  bogo50,
  initialEvent,
}: BookingModalProps) {
  const [open, setOpen] = useState(initialEvent !== undefined);
  const [preselect, setPreselect] = useState<OpenBookingDetail>(initialEvent ?? {});
  // Remounts the widget on every open so a fresh preselection applies.
  const [openCount, setOpenCount] = useState(0);

  // Tell the rest of the page (the sticky buy bar) when the popup is up.
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("gbt:booking-modal", { detail: { open } }));
  }, [open]);

  useEffect(() => {
    const onOpen = (e: Event) => {
      setPreselect((e as CustomEvent<OpenBookingDetail>).detail ?? {});
      setOpenCount((n) => n + 1);
      setOpen(true);
    };
    window.addEventListener("gbt:open-booking", onOpen);
    return () => window.removeEventListener("gbt:open-booking", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-stretch justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={`Book ${showName}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => setOpen(false)}
      />

      {/* Panel: full-screen sheet on phones, roomy card on larger screens so
          the calendar can carry demand labels on the dates. */}
      <div className="relative flex w-full flex-col bg-white sm:h-auto sm:max-h-[92vh] sm:max-w-xl sm:rounded-2xl sm:shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 bg-[#13264D] px-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold text-white">{showName}</p>
            <p className="text-xs text-white/75">
              {competitorPrice !== undefined && (
                <span className="mr-1 text-white/45 line-through">
                  ${competitorPrice}
                </span>
              )}
              ${formatBasePrice(pricePerAdult)} adult
              {pricePerChild > 0 && pricePerChild < pricePerAdult && (
                <> &middot; ${formatBasePrice(pricePerChild)} kids</>
              )}
              {pricePerChild === 0 && <> &middot; kids free</>}
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-lg border border-white/40 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
            aria-label="Close booking"
          >
            <X className="h-4 w-4" aria-hidden />
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <BookingWidget
            key={openCount}
            showId={showId}
            showName={showName}
            pricePerAdult={pricePerAdult}
            pricePerChild={pricePerChild}
            imageUrl={imageUrl}
            kidsFreeUnderAge={kidsFreeUnderAge}
            initialDate={preselect.date}
            initialTime={preselect.time}
            initialAdults={preselect.adults}
            initialChildren={preselect.children}
            bogo50={bogo50}
            largeCalendar
            competitorPrice={competitorPrice}
            autoSelectFirst
          />
        </div>
      </div>
    </div>
  );
}
