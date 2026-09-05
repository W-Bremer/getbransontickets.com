"use client";

import { useEffect, useMemo, useState } from "react";
import { openBooking } from "@/components/book-now-button";
import { formatBasePrice } from "@/lib/tax";
import { DEMAND_LABELS, type DemandLevel } from "@/lib/demand";

/** Pill styling per demand level, in the spirit of box-office grids. */
const DEMAND_PILLS: Record<DemandLevel, string> = {
  available: "bg-emerald-100 text-emerald-800",
  limited: "bg-amber-100 text-amber-900",
  "going-fast": "bg-[#C8102E] text-white",
  "sold-out": "bg-gray-200 text-gray-500",
};

interface AvailabilityGridProps {
  /** Slug for the live schedule lookup; only sellable shows have one served. */
  slug?: string;
  isSellable?: boolean;
  showTimes: string[];
  showName: string;
  pricePerAdult: number;
  darkDays?: string[];
}

interface ScheduleResponse {
  dates: { date: string; times: string[]; demand?: DemandLevel }[];
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const isoOf = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

export default function AvailabilityGrid({
  slug,
  isSellable = false,
  showTimes,
  showName,
  pricePerAdult,
  darkDays = [],
}: AvailabilityGridProps) {
  const days = useMemo(() => {
    const result: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push(d);
    }
    return result;
  }, []);

  // Sellable shows render the real performance calendar (same source as the
  // booking widget); others fall back to the weekly pattern for display.
  const [availability, setAvailability] = useState<Map<string, string[]> | null>(null);
  const [demandMap, setDemandMap] = useState<Map<string, DemandLevel> | null>(null);
  useEffect(() => {
    if (!isSellable || !slug) return;
    let cancelled = false;
    fetch(`/api/schedule/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: ScheduleResponse) => {
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
  }, [isSellable, slug]);

  const darkDayNames = useMemo(
    () => new Set(darkDays.map((d) => d.toLowerCase())),
    [darkDays]
  );

  const patternDark = (date: Date) =>
    darkDayNames.has(DAY_NAMES[date.getDay()].toLowerCase());

  /** null = no performance that day; list = times playing. */
  const timesFor = (date: Date): string[] | null => {
    if (isSellable && availability) {
      const times = availability.get(isoOf(date));
      return times && times.length > 0 ? times : null;
    }
    return patternDark(date) ? null : showTimes;
  };

  // Opens the booking popup with that day preselected. The old behavior
  // scrolled to the calendar and forgot which day was clicked, so the
  // customer had to find it all over again.
  const bookDay = (date: Date) => openBooking({ date: isoOf(date) });

  const formatHeader = (date: Date) => {
    const dayShort = date.toLocaleDateString("en-US", { weekday: "short" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return { dayShort, dateStr: `${month} ${day}` };
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
      <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
        <h3 className="text-sm font-bold text-[#1A1614]">
          Upcoming Availability: {showName}
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500">
                Date
              </th>
              {days.map((date, i) => {
                const { dayShort, dateStr } = formatHeader(date);
                const dark = timesFor(date) === null;
                return (
                  <th
                    key={i}
                    className={`px-2 py-3 text-center text-xs ${
                      dark ? "text-gray-400" : "text-[#1A1614]"
                    }`}
                  >
                    <div className="font-semibold">{dayShort}</div>
                    <div className="font-normal text-gray-500">{dateStr}</div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 font-medium text-[#1A1614]">Show times</td>
              {days.map((date, i) => {
                const times = timesFor(date);
                const demand = demandMap?.get(isoOf(date));
                return (
                  <td key={i} className="px-2 py-3 text-center align-top">
                    {times === null ? (
                      demand === "sold-out" ? (
                        <span
                          className={`inline-block rounded px-3 py-1.5 text-xs font-bold ${DEMAND_PILLS["sold-out"]}`}
                        >
                          Sold Out
                        </span>
                      ) : (
                        <span className="inline-block rounded bg-gray-100 px-3 py-1.5 text-xs text-gray-400">
                          N/A
                        </span>
                      )
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        {times.map((t) => (
                          <span key={t} className="text-xs font-semibold text-[#1A1614]">
                            {t}
                          </span>
                        ))}
                        {demand && demand !== "sold-out" && (
                          <span
                            className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${DEMAND_PILLS[demand]}`}
                          >
                            {DEMAND_LABELS[demand]}
                          </span>
                        )}
                        {isSellable && (
                          <button
                            onClick={() => bookDay(date)}
                            className="inline-block rounded bg-[#C8102E] px-3 py-1 text-xs font-bold text-white transition-colors hover:bg-[#A50D26]"
                          >
                            BOOK
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 px-5 py-2 text-xs text-gray-500">
        Starting from ${formatBasePrice(pricePerAdult)}/adult plus tax
      </div>
    </div>
  );
}
