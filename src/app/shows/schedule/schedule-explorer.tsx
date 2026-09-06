"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { shows } from "@/data/shows";
import type { Show } from "@/data/shows";
import { formatBasePrice } from "@/lib/tax";

const quickFilters = [
  { value: "all", label: "All Days" },
  { value: "today", label: "Today" },
  { value: "weekend", label: "This Weekend" },
] as const;

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const timeSlots = [
  {
    label: "Morning Shows",
    value: "morning" as const,
    description: "Start your day with entertainment",
    time: "Before 12:00 PM",
  },
  {
    label: "Afternoon Shows",
    value: "afternoon" as const,
    description: "Perfect mid-day entertainment",
    time: "12:00 PM - 5:00 PM",
  },
  {
    label: "Evening Shows",
    value: "evening" as const,
    description: "End your day with a spectacular show",
    time: "After 5:00 PM",
  },
];

interface ScheduleExplorerProps {
  /** Today's ISO date in Branson time, computed server-side. */
  todayIso: string;
  /** ISO dates of the current Fri-Sun block. */
  weekendIsos: string[];
  /** Per-show ISO dates with a real upcoming performance (season, dark days,
   * seasonal pauses applied), so Today / This Weekend reflect the actual
   * calendar rather than the weekly pattern alone. */
  playableDates: Record<string, string[]>;
}

export function ScheduleExplorer({
  todayIso,
  weekendIsos,
  playableDates,
}: ScheduleExplorerProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const matchesFilter = (s: Show) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "today") {
      return playableDates[s.slug]?.includes(todayIso) ?? false;
    }
    if (selectedFilter === "weekend") {
      const dates = playableDates[s.slug];
      return weekendIsos.some((d) => dates?.includes(d));
    }
    return !s.darkDays.includes(selectedFilter);
  };

  const getShowsForTimeSlot = (timeOfDay: "morning" | "afternoon" | "evening") =>
    shows.filter((s) => s.timeOfDay === timeOfDay && matchesFilter(s));

  const emptySuffix =
    selectedFilter === "all"
      ? ""
      : selectedFilter === "today"
      ? " today"
      : selectedFilter === "weekend"
      ? " this weekend"
      : ` on ${selectedFilter}s`;

  return (
    <>
      {/* Day Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {quickFilters.map((f) => (
              <button
                key={f.value}
                onClick={() => setSelectedFilter(f.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === f.value
                    ? f.value === "all"
                      ? "bg-[#13264D] text-white"
                      : "bg-[#C8102E] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {f.label}
              </button>
            ))}
            <span className="self-stretch w-px bg-gray-200 mx-1 shrink-0" aria-hidden />
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedFilter(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedFilter === day
                    ? "bg-[#13264D] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="py-12 sm:py-16 bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {timeSlots.map((slot) => {
            const slotShows = getShowsForTimeSlot(slot.value);
            return (
              <div key={slot.value}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#13264D] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#E8C65A]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#13264D] font-heading">
                      {slot.label}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {slot.time} &middot; {slotShows.length} show
                      {slotShows.length !== 1 ? "s" : ""} available
                    </p>
                  </div>
                </div>

                {slotShows.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {slotShows.map((show) => (
                      <div
                        key={show.slug}
                        className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#E8C65A]/40 transition-all"
                      >
                        <Link
                          href={`/shows/${show.slug}`}
                          className="group flex flex-1 gap-4 p-4 pb-3"
                        >
                          <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={show.imageUrl}
                              alt={show.imageAlt}
                              fill
                              className="object-cover"
                              sizes="96px"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-[#13264D] group-hover:text-[#C8102E] transition-colors truncate">
                              {show.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                              <Clock className="w-3.5 h-3.5 shrink-0" />
                              <span>{show.showTimes.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                              <MapPin className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">{show.theater}</span>
                            </div>
                          </div>
                        </Link>
                        <div className="flex items-center justify-between gap-3 px-4 pb-4">
                          <div>
                            <span className="text-sm font-semibold text-[#1A1614]">
                              From ${formatBasePrice(show.priceFrom)}
                            </span>
                            <span className="ml-2 text-xs text-gray-400">
                              {show.duration}
                            </span>
                          </div>
                          {show.isFeaturedPartner ? (
                            <Link
                              href={`/shows/${show.slug}#booking-widget`}
                              className="rounded-lg bg-[#C8102E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a60d26] transition-colors"
                            >
                              Get Tickets
                            </Link>
                          ) : (
                            <Link
                              href={`/shows/${show.slug}`}
                              className="rounded-lg border border-[#13264D]/30 px-4 py-2 text-sm font-semibold text-[#13264D] hover:bg-[#13264D] hover:text-white transition-colors"
                            >
                              Details
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-xl bg-white border border-gray-100 text-center">
                    <p className="text-gray-500">
                      No {slot.value} shows available{emptySuffix}.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
