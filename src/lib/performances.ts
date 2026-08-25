import type { Show } from "@/data/shows";
import { getSeasonDates } from "./season";

export interface Performance {
  /** ISO 8601 with America/Chicago offset, e.g. "2026-08-22T19:30:00-05:00". */
  startDate: string;
  endDate: string;
}

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_ABBREVS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface TimeEntry {
  /** 0-6 (Sunday-Saturday) when the entry is day-specific, null when it applies daily. */
  day: number | null;
  hour: number;
  minute: number;
}

function parseShowTime(raw: string): TimeEntry | null {
  const m = raw.match(/^(?:(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s+)?(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!m) return null;
  let hour = parseInt(m[2], 10) % 12;
  if (m[4].toUpperCase() === "PM") hour += 12;
  return {
    day: m[1] ? DAY_ABBREVS.indexOf(m[1]) : null,
    hour,
    minute: parseInt(m[3], 10),
  };
}

// en-CA renders as YYYY-MM-DD.
const chicagoDate = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" });
const chicagoOffsetFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  timeZoneName: "longOffset",
});

function chicagoOffset(instant: Date): string {
  const name = chicagoOffsetFormat
    .formatToParts(instant)
    .find((p) => p.type === "timeZoneName")?.value;
  // "GMT-05:00" -> "-05:00". A bare "GMT" never happens for Chicago.
  return name && name.length > 3 ? name.slice(3) : "-06:00";
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Expands a show's weekly schedule into concrete upcoming performances.
 *
 * Event search engines (Bing's "Book Tickets" panel, Google event results)
 * match ticket sources per performance instance, so the markup needs exact
 * date-time startDates rather than the season range shown on the page.
 */
export function getUpcomingPerformances(
  show: Show,
  windowDays = 45,
  now = new Date()
): Performance[] {
  const season = getSeasonDates(show, now);
  if (!season) return [];

  const entries = show.showTimes
    .map(parseShowTime)
    .filter((e): e is TimeEntry => e !== null);
  if (entries.length === 0 && !show.extraPerformances?.length) return [];

  const durationHours = parseFloat(show.duration) || 2;
  const darkDayNums = new Set(
    show.darkDays.map((d) => DAY_NAMES.indexOf(d)).filter((n) => n >= 0)
  );

  // Anchor the window to today's calendar date in Branson, not UTC.
  const [y, m, d] = chicagoDate.format(now).split("-").map(Number);

  const results: Performance[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < windowDays; i++) {
    // Noon UTC avoids any DST edge when deriving the calendar date and weekday.
    const cal = new Date(Date.UTC(y, m - 1, d + i, 12));
    const dateStr = cal.toISOString().slice(0, 10);
    const weekday = cal.getUTCDay();

    const dark =
      dateStr < season.startDate ||
      dateStr > season.endDate ||
      darkDayNums.has(weekday) ||
      (show.darkDateRanges?.some((r) => dateStr >= r.start && dateStr <= r.end) ?? false) ||
      (show.seasonalDarkWeekdays?.some(
        (r) => r.day === DAY_NAMES[weekday] && dateStr >= r.start && dateStr <= r.end
      ) ??
        false);

    // Extra performances are explicit dates and play even where the weekly
    // pattern is dark; the booking engine applies them the same way.
    const dayEntries = dark
      ? []
      : entries.filter((t) => t.day === null || t.day === weekday);
    for (const extra of show.extraPerformances ?? []) {
      if (extra.date !== dateStr) continue;
      for (const raw of extra.times) {
        const entry = parseShowTime(raw);
        if (entry) dayEntries.push(entry);
      }
    }
    if (dayEntries.length === 0) continue;

    const offset = chicagoOffset(cal);
    for (const t of dayEntries) {
      const startDate = `${dateStr}T${pad(t.hour)}:${pad(t.minute)}:00${offset}`;
      if (seen.has(startDate)) continue;
      seen.add(startDate);
      // Wall-clock arithmetic; no Branson show runs past midnight or across
      // the 2 AM DST switch, so the start offset holds for the end too.
      const endWall = new Date(
        Date.UTC(y, m - 1, d + i, t.hour, t.minute + Math.round(durationHours * 60))
      );
      const endDate = `${endWall.toISOString().slice(0, 10)}T${pad(endWall.getUTCHours())}:${pad(
        endWall.getUTCMinutes()
      )}:00${offset}`;
      results.push({ startDate, endDate });
    }
  }

  // Drop performances already underway or finished.
  return results
    .filter((p) => new Date(p.startDate) > now)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}
