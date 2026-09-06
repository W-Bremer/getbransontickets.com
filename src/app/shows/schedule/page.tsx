import Link from "next/link";
import { shows } from "@/data/shows";
import { getUpcomingPerformances } from "@/lib/performances";
import { getScheduleMonths } from "@/lib/month-schedule";
import { siteConfig } from "@/lib/config";
import { ScheduleExplorer } from "./schedule-explorer";

// The Today / This Weekend filters and the visible updated date are anchored
// to the render date; regenerate daily so they track the real calendar.
export const revalidate = 86400;

const chicagoDate = new Intl.DateTimeFormat("en-CA", {
  timeZone: "America/Chicago",
});

const updatedFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export default function SchedulePage() {
  const now = new Date();
  const todayIso = chicagoDate.format(now);

  // The current Fri-Sun block: walk forward and stop after the first Sunday.
  const weekendIsos: string[] = [];
  for (let i = 0; i < 7; i++) {
    const iso = chicagoDate.format(new Date(now.getTime() + i * 86400000));
    const weekday = new Date(`${iso}T12:00:00Z`).getUTCDay();
    if (weekday === 5 || weekday === 6 || weekday === 0) weekendIsos.push(iso);
    if (weekday === 0 && weekendIsos.length > 0) break;
  }

  // Real playable dates per show (season, dark days, seasonal pauses) via the
  // same expansion the Event markup uses, so Today / This Weekend reflect the
  // actual calendar rather than the weekly pattern alone.
  const playableDates: Record<string, string[]> = {};
  for (const s of shows) {
    playableDates[s.slug] = [
      ...new Set(getUpcomingPerformances(s, 9, now).map((p) => p.startDate.slice(0, 10))),
    ];
  }

  const months = getScheduleMonths(4, now);

  return (
    <>
      {/* Header */}
      <section className="bg-[#13264D] pt-12 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-[#E8C65A] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shows" className="hover:text-[#E8C65A] transition-colors">
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
          <p className="mt-3 text-sm text-white/50">
            Schedule updated {updatedFormat.format(now)}
          </p>
          {/* Month pages: server-rendered links, so search engines can reach
              the month-by-month schedules from the main one. */}
          <div className="mt-5 flex flex-wrap gap-2">
            {months.map((m) => (
              <Link
                key={m.slug}
                href={`/shows/schedule/${m.slug}`}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium bg-white/10 text-white hover:bg-[#E8C65A] hover:text-[#13264D] transition-colors"
              >
                Shows in {m.name} {m.year}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ScheduleExplorer
        todayIso={todayIso}
        weekendIsos={weekendIsos}
        playableDates={playableDates}
      />

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#13264D] font-heading">
            Need Help Planning Your Schedule?
          </h2>
          <p className="mt-4 text-gray-600">
            Call us and we&apos;ll help you build a show schedule for your trip.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C8102E] text-white rounded-lg font-semibold hover:bg-[#a60d26] transition-colors"
            >
              Call {siteConfig.phone}
            </Link>
            <Link
              href="/plan-your-trip"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#13264D] text-[#13264D] rounded-lg font-semibold hover:bg-[#13264D] hover:text-white transition-all"
            >
              Trip Planning Guide
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
