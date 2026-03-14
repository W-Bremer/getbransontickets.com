"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { shows } from "@/data/shows";
import { siteConfig } from "@/lib/config";

const daysOfWeek = [
  "All Days",
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

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<string>("All Days");

  const getShowsForTimeSlot = (timeOfDay: "morning" | "afternoon" | "evening") => {
    let filtered = shows.filter((s) => s.timeOfDay === timeOfDay);

    if (selectedDay !== "All Days") {
      filtered = filtered.filter(
        (s) => !s.darkDays.includes(selectedDay)
      );
    }

    return filtered;
  };

  return (
    <>
      {/* Header */}
      <section className="bg-[#7B1A1A] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-[#d4a843] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shows" className="hover:text-[#d4a843] transition-colors">
              Shows
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Schedule</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Show Schedule 2026
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Plan your perfect day in Branson. Browse shows by time of day and find
            the ideal entertainment for your schedule.
          </p>
        </div>
      </section>

      {/* Day Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedDay === day
                    ? "bg-[#7B1A1A] text-white"
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
      <section className="py-12 sm:py-16 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {timeSlots.map((slot) => {
            const slotShows = getShowsForTimeSlot(slot.value);
            return (
              <div key={slot.value}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#7B1A1A] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#d4a843]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#7B1A1A] font-heading">
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
                      <Link
                        key={show.slug}
                        href={`/shows/${show.slug}`}
                        className="group flex gap-4 p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#d4a843]/30 transition-all"
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
                          <h3 className="font-bold text-[#7B1A1A] group-hover:text-[#d4a843] transition-colors truncate">
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
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-sm font-semibold text-[#d4a843]">
                              From ${show.priceFrom}
                            </span>
                            <span className="text-xs text-gray-400">
                              {show.duration}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 rounded-xl bg-white border border-gray-100 text-center">
                    <p className="text-gray-500">
                      No {slot.value} shows available{" "}
                      {selectedDay !== "All Days" ? `on ${selectedDay}s` : ""}.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7B1A1A] font-heading">
            Need Help Planning Your Schedule?
          </h2>
          <p className="mt-4 text-gray-600">
            Our Branson entertainment experts can help you build the perfect
            itinerary for your trip.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d4a843] text-white rounded-lg font-semibold hover:bg-[#b8922e] transition-colors"
            >
              Call {siteConfig.phone}
            </Link>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#7B1A1A] text-[#7B1A1A] rounded-lg font-semibold hover:bg-[#7B1A1A] hover:text-white transition-all"
            >
              Trip Planning Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
