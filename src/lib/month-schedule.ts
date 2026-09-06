import { shows } from "@/data/shows";
import type { Show } from "@/data/shows";
import { getUpcomingPerformances } from "./performances";

/**
 * Month-by-month schedule expansion for the /shows/schedule/[month] pages.
 * Reuses the same performance expansion as the Event markup, so a month page
 * never advertises a date the booking calendar would refuse.
 */

export interface ScheduleMonth {
  slug: string; // "september-2026"
  name: string; // "September"
  year: number;
  month: number; // 1-12
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const MONTH_ABBREVS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
// Display order Monday-first; getUTCDay() indexes into the label list.
const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0] as const;
const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const chicagoDate = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" });

const pad = (n: number) => String(n).padStart(2, "0");

function currentChicagoYearMonth(now: Date): { year: number; month: number } {
  const [y, m] = chicagoDate.format(now).split("-").map(Number);
  return { year: y, month: m };
}

export function monthToSlug(year: number, month: number): string {
  return `${MONTH_NAMES[month - 1].toLowerCase()}-${year}`;
}

export function parseMonthSlug(slug: string): ScheduleMonth | null {
  const m = slug.match(/^([a-z]+)-(\d{4})$/);
  if (!m) return null;
  const idx = MONTH_NAMES.findIndex((n) => n.toLowerCase() === m[1]);
  if (idx === -1) return null;
  const year = Number(m[2]);
  if (year < 2024 || year > 2099) return null;
  return { slug, name: MONTH_NAMES[idx], year, month: idx + 1 };
}

/** Whole months between now (Branson time) and the target; negative = past. */
export function monthOffsetFromNow(
  target: { year: number; month: number },
  now = new Date()
): number {
  const { year, month } = currentChicagoYearMonth(now);
  return (target.year - year) * 12 + (target.month - month);
}

/** The current month plus the next `count - 1`, for nav chips and static params. */
export function getScheduleMonths(count = 4, now = new Date()): ScheduleMonth[] {
  const { year, month } = currentChicagoYearMonth(now);
  const out: ScheduleMonth[] = [];
  for (let i = 0; i < count; i++) {
    const y = year + Math.floor((month - 1 + i) / 12);
    const m = ((month - 1 + i) % 12) + 1;
    out.push({ slug: monthToSlug(y, m), name: MONTH_NAMES[m - 1], year: y, month: m });
  }
  return out;
}

export interface ShowMonthSchedule {
  show: Show;
  /** ISO dates within the month that still have a performance ahead. */
  dates: string[];
  /** "Daily", "Mon-Thu, Sat", or "Sep 9 & 23" when only a few dates remain. */
  daysLabel: string;
}

function weekdayOf(isoDate: string): number {
  return new Date(`${isoDate}T12:00:00Z`).getUTCDay();
}

function daysLabel(dates: string[], month: number): string {
  if (dates.length <= 4) {
    const days = dates.map((d) => Number(d.slice(8, 10)));
    const joined =
      days.length === 1
        ? String(days[0])
        : `${days.slice(0, -1).join(", ")} & ${days[days.length - 1]}`;
    return `${MONTH_ABBREVS[month - 1]} ${joined}`;
  }

  const present = new Set(dates.map(weekdayOf));
  if (present.size === 7) return "Daily";

  // Compress the Monday-first weekday sequence into ranges: "Mon-Thu, Sat".
  const parts: string[] = [];
  let run: number[] = [];
  const flush = () => {
    if (run.length === 0) return;
    parts.push(
      run.length >= 3
        ? `${WEEKDAY_LABELS[run[0]]}-${WEEKDAY_LABELS[run[run.length - 1]]}`
        : run.map((d) => WEEKDAY_LABELS[d]).join(", ")
    );
    run = [];
  };
  for (const day of WEEKDAY_ORDER) {
    if (present.has(day)) run.push(day);
    else flush();
  }
  flush();
  return parts.join(", ");
}

/**
 * Every show with at least one remaining performance in the given month.
 * For the current month, dates already past are excluded, so the page reads
 * as "what you can still see", not a history.
 */
export function getMonthSchedule(
  year: number,
  month: number,
  now = new Date()
): ShowMonthSchedule[] {
  const monthStart = `${year}-${pad(month)}-01`;
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const monthEnd = `${year}-${pad(month)}-${pad(lastDay)}`;

  const [ty, tm, td] = chicagoDate.format(now).split("-").map(Number);
  const windowDays =
    Math.round((Date.UTC(year, month - 1, lastDay, 12) - Date.UTC(ty, tm - 1, td, 12)) / 86400000) + 1;
  if (windowDays <= 0) return [];

  const results: ShowMonthSchedule[] = [];
  for (const show of shows) {
    const dates = [
      ...new Set(
        getUpcomingPerformances(show, windowDays, now)
          .map((p) => p.startDate.slice(0, 10))
          .filter((d) => d >= monthStart && d <= monthEnd)
      ),
    ].sort();
    if (dates.length > 0) {
      results.push({ show, dates, daysLabel: daysLabel(dates, month) });
    }
  }
  return results;
}
