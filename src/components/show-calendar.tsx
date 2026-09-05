"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { openBooking } from "@/components/book-now-button";
import { loadSchedule } from "@/lib/schedule-client";
import { DEMAND_LABELS, type DemandLevel } from "@/lib/demand";

interface ShowCalendarProps {
  slug: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const pad = (n: number) => String(n).padStart(2, "0");

const DEMAND_PILLS: Record<DemandLevel, string> = {
  available: "bg-emerald-100 text-emerald-800",
  limited: "bg-amber-100 text-amber-900",
  "going-fast": "bg-[#C8102E] text-white",
  "sold-out": "bg-gray-200 text-gray-500",
};

/**
 * The full-month booking calendar: a time button for every performance, with
 * demand labels per day. Clicking a time opens the booking popup with that
 * performance preselected. This is the page's main booking surface, so it
 * carries id="booking-widget" for every scroll-to-booking control.
 */
export function ShowCalendar({ slug }: ShowCalendarProps) {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [availability, setAvailability] = useState<Map<string, string[]> | null>(null);
  const [demandMap, setDemandMap] = useState<Map<string, DemandLevel> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadSchedule(slug)
      .then((data) => {
        if (cancelled) return;
        setAvailability(new Map(data.dates.map((d) => [d.date, d.times])));
        setDemandMap(
          data.dates.some((d) => d.demand)
            ? new Map(
                data.dates.flatMap((d) => (d.demand ? [[d.date, d.demand] as const] : []))
              )
            : null
        );
        // Jump to the first bookable month when the current one has nothing.
        const currentPrefix = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-`;
        if (data.dates.length > 0 && !data.dates.some((d) => d.date.startsWith(currentPrefix))) {
          const [y, m] = data.dates[0].date.split("-").map(Number);
          setYear(y);
          setMonth(m - 1);
        }
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const weeks = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [
      ...Array.from({ length: firstDay }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);
    const out: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) out.push(cells.slice(i, i + 7));
    return out;
  }, [month, year]);

  const isoOf = (day: number) => `${year}-${pad(month + 1)}-${pad(day)}`;
  const todayIso = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const goToday = () => {
    setMonth(now.getMonth());
    setYear(now.getFullYear());
  };
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const monthHasDates = useMemo(() => {
    if (!availability) return true;
    const prefix = `${year}-${pad(month + 1)}-`;
    for (const [date, times] of availability) {
      if (date.startsWith(prefix) && times.length > 0) return true;
    }
    return false;
  }, [availability, month, year]);

  if (failed) {
    return (
      <p className="text-sm text-gray-600">
        We could not load the calendar. Please refresh the page, or call us to book.
      </p>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-2xl font-bold text-[#1A1614] font-heading">
          {MONTHS[month]} {year}
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToday}
            className="rounded-lg bg-gray-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-600"
          >
            today
          </button>
          <div className="flex overflow-hidden rounded-lg bg-[#13264D]">
            <button
              type="button"
              onClick={prevMonth}
              aria-label="Previous month"
              className="px-3 py-2 text-white transition-colors hover:bg-[#0D1B38]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              aria-label="Next month"
              className="px-3 py-2 text-white transition-colors hover:bg-[#0D1B38]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[640px] table-fixed border-collapse">
          <thead>
            <tr>
              {DOW.map((d) => (
                <th
                  key={d}
                  className="border-b border-gray-200 px-2 py-2.5 text-center text-sm font-bold text-[#13264D]"
                >
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {weeks.map((week, wi) => (
              <tr key={wi}>
                {week.map((day, di) => {
                  if (day === null) {
                    return <td key={di} className="border border-gray-100 bg-gray-50/50" />;
                  }
                  const iso = isoOf(day);
                  const past = iso < todayIso;
                  const times = !past ? (availability?.get(iso) ?? []) : [];
                  const demand = !past ? demandMap?.get(iso) : undefined;
                  return (
                    <td
                      key={di}
                      className={`h-24 border border-gray-100 p-1.5 align-top sm:h-28 ${
                        iso === todayIso ? "bg-[#FDF8E7]" : ""
                      }`}
                    >
                      <div
                        className={`text-right text-sm font-semibold ${
                          past || (times.length === 0 && demand !== "sold-out")
                            ? "text-gray-300"
                            : "text-[#13264D]"
                        }`}
                      >
                        {day}
                      </div>
                      <div className="mt-1 space-y-1">
                        {times.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() => openBooking({ date: iso, time: t })}
                            className="block w-full truncate rounded bg-[#13264D] px-1.5 py-1 text-left text-[11px] font-semibold text-white transition-colors hover:bg-[#C8102E]"
                          >
                            {t} Show
                          </button>
                        ))}
                        {demand && (times.length > 0 || demand === "sold-out") && (
                          <span
                            className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${DEMAND_PILLS[demand]}`}
                          >
                            {DEMAND_LABELS[demand]}
                          </span>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-2 min-h-[1rem] text-center text-sm text-gray-500">
        {!availability
          ? "Loading available dates..."
          : !monthHasDates
            ? "No performances this month. Use the arrows to browse other months."
            : null}
      </p>
    </div>
  );
}
