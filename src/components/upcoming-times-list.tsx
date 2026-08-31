"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { openBooking } from "@/components/book-now-button";
import { siteConfig } from "@/lib/config";

interface UpcomingTimesListProps {
  slug: string;
  /** Extra dates revealed by "Show more". */
  initialCount?: number;
}

interface ScheduleResponse {
  dates: { date: string; times: string[] }[];
}

const pad = (n: number) => String(n).padStart(2, "0");
const localIso = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

/**
 * The plain-list way to book: real upcoming performances as readable rows,
 * one big button per showtime, no calendar to decode. Built for the site's
 * older audience — each button names exactly what it does and opens the
 * booking popup with that performance already selected.
 */
export default function UpcomingTimesList({
  slug,
  initialCount = 8,
}: UpcomingTimesListProps) {
  const [dates, setDates] = useState<{ date: string; times: string[] }[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/schedule/${slug}`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: ScheduleResponse) => {
        if (!cancelled) setDates(data.dates);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const rows = useMemo(() => {
    if (!dates) return [];
    return dates.slice(0, expanded ? 30 : initialCount);
  }, [dates, expanded, initialCount]);

  const dayLabel = (iso: string) => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    if (iso === localIso(now)) return "Today";
    if (iso === localIso(tomorrow)) return "Tomorrow";
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  if (failed) {
    return (
      <p className="text-sm text-gray-600">
        We could not load upcoming dates. Please use the booking calendar, or
        call us at{" "}
        <a href={`tel:${siteConfig.phoneRaw}`} className="font-semibold text-[#13264D]">
          {siteConfig.phone}
        </a>
        .
      </p>
    );
  }

  if (!dates) {
    return <p className="text-sm text-gray-500">Loading upcoming show times&hellip;</p>;
  }

  if (dates.length === 0) {
    return (
      <p className="text-sm text-gray-600">
        No upcoming performances are on sale right now. Call us at{" "}
        <a href={`tel:${siteConfig.phoneRaw}`} className="font-semibold text-[#13264D]">
          {siteConfig.phone}
        </a>{" "}
        and we&apos;ll help.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <ul className="divide-y divide-gray-100">
        {rows.map((row) => (
          <li
            key={row.date}
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-3 sm:px-5"
          >
            <span className="text-base font-semibold text-[#1A1614]">
              {dayLabel(row.date)}
            </span>
            <div className="flex flex-wrap gap-2">
              {row.times.map((time) => (
                <button
                  key={time}
                  onClick={() => openBooking({ date: row.date, time })}
                  className="rounded-lg bg-[#C8102E] px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#A50D26]"
                >
                  Book {time}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-5">
        {!expanded && dates.length > initialCount ? (
          <button
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#13264D] hover:text-[#C8102E]"
          >
            Show more dates
            <ChevronDown className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <span className="text-xs text-gray-500">
            Looking further ahead? Use the booking calendar.
          </span>
        )}
        <a
          href={`tel:${siteConfig.phoneRaw}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#13264D] hover:text-[#C8102E]"
        >
          <Phone className="h-4 w-4" aria-hidden />
          Or call {siteConfig.phone}
        </a>
      </div>
    </div>
  );
}
