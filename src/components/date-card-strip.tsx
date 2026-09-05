"use client";

import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { openBooking } from "@/components/book-now-button";
import { loadSchedule } from "@/lib/schedule-client";
import { DEMAND_LABELS, type DemandLevel } from "@/lib/demand";

const DEMAND_TEXT: Record<DemandLevel, string> = {
  available: "text-emerald-600",
  limited: "text-amber-500",
  "going-fast": "text-[#C8102E]",
  "sold-out": "text-gray-400",
};

interface DateCardStripProps {
  slug: string;
}

const pad = (n: number) => String(n).padStart(2, "0");
const isoOf = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/**
 * Quick date cards right under the hero: the next 7 days plus a More Dates
 * card that jumps to the full calendar. Tapping a card opens the booking
 * popup with that date preselected; days with no performance are grayed out.
 */
export function DateCardStrip({ slug }: DateCardStripProps) {
  const [availability, setAvailability] = useState<Map<string, string[]> | null>(null);
  const [demandMap, setDemandMap] = useState<Map<string, DemandLevel> | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadSchedule(slug)
      .then((data) => {
        if (!cancelled) {
          setAvailability(new Map(data.dates.map((d) => [d.date, d.times])));
          setDemandMap(
            data.dates.some((d) => d.demand)
              ? new Map(
                  data.dates.flatMap((d) =>
                    d.demand ? [[d.date, d.demand] as const] : []
                  )
                )
              : null
          );
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
    return d;
  });

  const scrollToCalendar = () => {
    const el = document.getElementById("booking-widget");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wide text-[#1A1614]/70">
        Pick your date
      </h2>
      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8 sm:gap-3">
        {days.map((d, i) => {
          const iso = isoOf(d);
          const hasShow = !!availability?.get(iso)?.length;
          const loading = availability === null;
          const demand = demandMap?.get(iso);
          const chip = i === 0 ? "Today" : i === 1 ? "Tomorrow" : null;
          return (
            <button
              key={iso}
              type="button"
              disabled={!hasShow}
              onClick={() => openBooking({ date: iso })}
              className={`relative rounded-xl border-2 px-1 pt-3 text-center transition-all ${
                chip ? "pb-6" : "pb-3"
              } ${
                hasShow
                  ? "border-gray-200 bg-white hover:border-[#13264D] hover:shadow-md"
                  : loading
                    ? "border-gray-100 bg-white opacity-60"
                    : "cursor-not-allowed border-gray-100 bg-gray-50 opacity-60"
              }`}
            >
              <span className="block text-xs font-semibold text-[#1A1614]/60">
                {d.toLocaleDateString("en-US", { month: "short" })}
              </span>
              <span className="block text-2xl font-bold leading-tight text-[#13264D]">
                {d.getDate()}
              </span>
              <span className="block text-xs text-[#1A1614]/60">
                {d.toLocaleDateString("en-US", { weekday: "short" })}
              </span>
              <span
                className={`block truncate text-[9px] font-bold uppercase leading-tight tracking-tight ${
                  demand ? DEMAND_TEXT[demand] : "text-transparent"
                }`}
              >
                {demand ? DEMAND_LABELS[demand] : "."}
              </span>
              {chip && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-md bg-[#13264D] px-2 py-0.5 text-[10px] font-bold text-white">
                  {chip}
                </span>
              )}
            </button>
          );
        })}
        <button
          type="button"
          onClick={scrollToCalendar}
          className="rounded-xl border-2 border-gray-200 bg-white px-2 py-3 text-center transition-all hover:border-[#13264D] hover:shadow-md"
        >
          <CalendarDays className="mx-auto h-7 w-7 text-[#13264D]" aria-hidden />
          <span className="mt-1 block text-xs font-semibold text-[#1A1614]">
            More dates
          </span>
        </button>
      </div>
    </div>
  );
}
