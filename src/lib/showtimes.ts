import { timingSafeEqual } from "crypto";
import { get, put } from "@vercel/blob";
import type { Show } from "@/data/shows";
import { shows } from "@/data/shows";
import { getSeasonDates } from "./season";

/**
 * Single source of truth for what dates and times a show can be booked.
 *
 * Base schedules live in shows.ts (weekly pattern + dark days/ranges). The
 * office can correct any show from /office/showtimes without a deploy: edits
 * are stored as per-show overrides in the private gbt-passport-events Blob
 * store and merged over the static data everywhere that matters, which is
 * the booking calendar (/api/schedule/[slug]), the server-side purchase
 * validation in create-payment-intent, the office dashboard, and the daily
 * digest email. The public SEO markup in performances.ts intentionally keeps
 * reading the static data only, so it can stay statically rendered; booking
 * is the authoritative surface.
 *
 * A daily automated check re-verifies every sellable show against the
 * theater's official schedule and posts results to /api/office/showtimes-verify;
 * that verification state also lives here.
 */

// ---------------------------------------------------------------------------
// Types and storage

export interface ScheduleOverride {
  showTimes?: string[];
  darkDays?: string[];
  darkDateRanges?: { start: string; end: string }[];
  seasonalDarkWeekdays?: { day: string; start: string; end: string }[];
  seasonStart?: string;
  seasonEnd?: string;
  /** One-off added performances that the weekly pattern does not cover. */
  extraPerformances?: { date: string; times: string[] }[];
  /** "YYYY-MM-DD" blocks the whole date; "YYYY-MM-DD 7:30 PM" blocks one time. */
  soldOut?: string[];
  scheduleNote?: string;
  /** Kill switch: stops online booking for the show without hiding the page. */
  bookingDisabled?: boolean;
  updatedAt: string;
  updatedBy?: string;
}

export interface OverridesDoc {
  version: 1;
  overrides: Record<string, ScheduleOverride>;
}

export type VerificationStatus = "ok" | "mismatch" | "warning" | "unchecked";

export interface VerificationEntry {
  at: string;
  status: VerificationStatus;
  note?: string;
  source?: string;
  checkedBy?: string;
}

export interface VerificationDoc {
  version: 1;
  lastRun?: { at: string; checkedBy: string; summary: string };
  shows: Record<string, VerificationEntry>;
}

const ROOT = "showtimes";

/** production | preview | development; keeps dev testing out of real state. */
function env(): string {
  return process.env.VERCEL_ENV ?? "development";
}

const overridesPath = () => `${ROOT}/${env()}/overrides.json`;
const verificationPath = () => `${ROOT}/${env()}/verification.json`;

async function readDoc<T>(pathname: string, fallback: T): Promise<T> {
  try {
    const result = await get(pathname, { access: "private" });
    if (!result || result.statusCode !== 200) return fallback;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

async function writeDoc(pathname: string, doc: unknown): Promise<void> {
  await put(pathname, JSON.stringify(doc, null, 2), {
    access: "private",
    contentType: "application/json",
    allowOverwrite: true,
    // These docs are overwritten in place; the default edge cache is a month,
    // which would pin stale schedules. 60 is the minimum allowed.
    cacheControlMaxAge: 60,
  });
}

export async function loadOverrides(): Promise<OverridesDoc> {
  return readDoc<OverridesDoc>(overridesPath(), { version: 1, overrides: {} });
}

/** Pass null to clear a show back to its shows.ts defaults. */
export async function saveOverride(
  slug: string,
  override: ScheduleOverride | null
): Promise<OverridesDoc> {
  const doc = await loadOverrides();
  if (override === null) {
    delete doc.overrides[slug];
  } else {
    doc.overrides[slug] = override;
  }
  await writeDoc(overridesPath(), doc);
  return doc;
}

export async function loadVerification(): Promise<VerificationDoc> {
  return readDoc<VerificationDoc>(verificationPath(), { version: 1, shows: {} });
}

export async function saveVerificationResults(
  results: { slug: string; status: VerificationStatus; note?: string; source?: string }[],
  checkedBy: string
): Promise<VerificationDoc> {
  const doc = await loadVerification();
  const at = new Date().toISOString();
  for (const r of results) {
    doc.shows[r.slug] = {
      at,
      status: r.status,
      ...(r.note ? { note: r.note } : {}),
      ...(r.source ? { source: r.source } : {}),
      checkedBy,
    };
  }
  const counts = results.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] ?? 0) + 1;
    return acc;
  }, {});
  doc.lastRun = {
    at,
    checkedBy,
    summary: Object.entries(counts)
      .map(([k, v]) => `${v} ${k}`)
      .join(", "),
  };
  await writeDoc(verificationPath(), doc);
  return doc;
}

// ---------------------------------------------------------------------------
// Schedule engine

export interface EffectiveSchedule {
  showTimes: string[];
  darkDays: string[];
  darkDateRanges: { start: string; end: string }[];
  seasonalDarkWeekdays: { day: string; start: string; end: string }[];
  seasonStart: string;
  seasonEnd: string;
  extraPerformances: { date: string; times: string[] }[];
  soldOut: string[];
  scheduleNote?: string;
  bookingDisabled: boolean;
}

export const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const DAY_ABBREVS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function effectiveSchedule(
  show: Show,
  override?: ScheduleOverride
): EffectiveSchedule {
  return {
    showTimes: override?.showTimes ?? show.showTimes,
    darkDays: override?.darkDays ?? show.darkDays,
    darkDateRanges: override?.darkDateRanges ?? show.darkDateRanges ?? [],
    seasonalDarkWeekdays:
      override?.seasonalDarkWeekdays ?? show.seasonalDarkWeekdays ?? [],
    seasonStart: override?.seasonStart ?? show.seasonStart,
    seasonEnd: override?.seasonEnd ?? show.seasonEnd,
    extraPerformances: override?.extraPerformances ?? show.extraPerformances ?? [],
    soldOut: override?.soldOut ?? [],
    scheduleNote: override?.scheduleNote ?? show.scheduleNote,
    bookingDisabled: override?.bookingDisabled ?? false,
  };
}

interface TimeEntry {
  /** 0-6 (Sunday-Saturday) when day-specific, null when it applies daily. */
  day: number | null;
  minutes: number;
  /** Canonical display form without the day prefix, e.g. "2:00 PM". */
  label: string;
}

export const TIME_PATTERN = /^(?:(Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s+)?(\d{1,2}):(\d{2})\s*(AM|PM)$/i;

function parseShowTime(raw: string): TimeEntry | null {
  const m = raw.trim().match(TIME_PATTERN);
  if (!m) return null;
  let hour = parseInt(m[2], 10) % 12;
  if (m[4].toUpperCase() === "PM") hour += 12;
  const minute = parseInt(m[3], 10);
  const displayHour = parseInt(m[2], 10);
  return {
    day: m[1]
      ? DAY_ABBREVS.findIndex((d) => d.toLowerCase() === m[1].toLowerCase())
      : null,
    minutes: hour * 60 + minute,
    label: `${displayHour}:${m[3]} ${m[4].toUpperCase()}`,
  };
}

/** "7:30 PM" -> minutes since midnight, or null when unparseable. */
function timeMinutes(raw: string): number | null {
  const entry = parseShowTime(raw);
  return entry ? entry.minutes : null;
}

function sameTime(a: string, b: string): boolean {
  const am = timeMinutes(a);
  const bm = timeMinutes(b);
  if (am !== null && bm !== null) return am === bm;
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}

// en-CA renders as YYYY-MM-DD.
const chicagoDate = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Chicago" });

/** Today's calendar date in Branson, not UTC. */
export function chicagoToday(now = new Date()): string {
  return chicagoDate.format(now);
}

const chicagoClock = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  hour: "numeric",
  minute: "numeric",
  hour12: false,
});

/** Minutes since midnight in Branson. Some engines render midnight as "24". */
function chicagoMinutesNow(now: Date): number {
  const parts = chicagoClock.formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}

/** Weekday index (0 = Sunday) for an ISO date, DST-safe via noon UTC. */
function weekdayOf(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12)).getUTCDay();
}

function addDays(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days, 12)).toISOString().slice(0, 10);
}

/**
 * Bookable times for one date. Order of application: weekly pattern within
 * the season and outside dark days/ranges, plus explicit extra performances,
 * minus sold-out entries. Season resolution uses getSeasonDates anchored to
 * "now", so dates in the NEXT season (more than a year out) read as closed;
 * nobody sells that far ahead.
 */
export function timesForDate(
  schedule: EffectiveSchedule,
  dateStr: string,
  now = new Date()
): string[] {
  if (schedule.bookingDisabled) return [];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return [];

  const season = getSeasonDates(schedule, now);
  const weekday = weekdayOf(dateStr);
  const dayName = DAY_NAMES[weekday];

  let times: string[] = [];
  const inSeason =
    !!season && dateStr >= season.startDate && dateStr <= season.endDate;
  const dark =
    schedule.darkDays.includes(dayName) ||
    schedule.darkDateRanges.some((r) => dateStr >= r.start && dateStr <= r.end) ||
    schedule.seasonalDarkWeekdays.some(
      (r) => r.day === dayName && dateStr >= r.start && dateStr <= r.end
    );

  if (inSeason && !dark) {
    times = schedule.showTimes
      .map(parseShowTime)
      .filter((e): e is TimeEntry => e !== null)
      .filter((e) => e.day === null || e.day === weekday)
      .sort((a, b) => a.minutes - b.minutes)
      .map((e) => e.label);
  }

  for (const extra of schedule.extraPerformances) {
    if (extra.date !== dateStr) continue;
    for (const t of extra.times) {
      const entry = parseShowTime(t);
      if (entry && !times.some((x) => sameTime(x, entry.label))) {
        times.push(entry.label);
      }
    }
  }

  for (const so of schedule.soldOut) {
    const soDate = so.slice(0, 10);
    if (soDate !== dateStr) continue;
    const soTime = so.slice(10).trim();
    if (!soTime) return [];
    times = times.filter((t) => !sameTime(t, soTime));
  }

  // A performance stops selling at its start time: without this, tonight's
  // 7:30 PM stays buyable at 11 PM (calendar and payment validation both).
  if (dateStr === chicagoToday(now)) {
    const nowMinutes = chicagoMinutesNow(now);
    times = times.filter((t) => (timeMinutes(t) ?? 0) > nowMinutes);
  }

  return times.sort((a, b) => (timeMinutes(a) ?? 0) - (timeMinutes(b) ?? 0));
}

export interface DayAvailability {
  date: string;
  times: string[];
}

/** Every bookable date in the next windowDays, starting today Branson time. */
export function buildAvailability(
  schedule: EffectiveSchedule,
  windowDays = 240,
  now = new Date()
): DayAvailability[] {
  const start = chicagoToday(now);
  const days: DayAvailability[] = [];
  for (let i = 0; i < windowDays; i++) {
    const date = addDays(start, i);
    const times = timesForDate(schedule, date, now);
    if (times.length > 0) days.push({ date, times });
  }
  return days;
}

// ---------------------------------------------------------------------------
// Office report (dashboard, office API, digest email)

export interface ShowtimesReportRow {
  slug: string;
  name: string;
  theater: string;
  externalUrl?: string;
  schedule: EffectiveSchedule;
  hasOverride: boolean;
  override?: ScheduleOverride;
  upcoming: DayAvailability[];
  verification?: VerificationEntry;
}

export interface ShowtimesReport {
  generatedAt: string;
  rows: ShowtimesReportRow[];
  lastRun?: VerificationDoc["lastRun"];
}

export function sellableShows(): Show[] {
  return shows.filter((s) => s.isFeaturedPartner);
}

export async function buildShowtimesReport(
  upcomingCount = 8,
  windowDays = 240,
  // Blob reads right after a write can return the previous version for up to
  // a minute; a handler that just saved passes the doc it wrote so its
  // response reflects the edit.
  preloadedOverrides?: OverridesDoc
): Promise<ShowtimesReport> {
  const [overrides, verification] = await Promise.all([
    preloadedOverrides ?? loadOverrides(),
    loadVerification(),
  ]);
  const now = new Date();
  const rows = sellableShows().map((show) => {
    const override = overrides.overrides[show.slug];
    const schedule = effectiveSchedule(show, override);
    return {
      slug: show.slug,
      name: show.name,
      theater: show.theater,
      externalUrl: show.externalUrl,
      schedule,
      hasOverride: !!override,
      override,
      upcoming: buildAvailability(schedule, windowDays, now).slice(0, upcomingCount),
      verification: verification.shows[show.slug],
    };
  });
  return {
    generatedAt: now.toISOString(),
    rows,
    lastRun: verification.lastRun,
  };
}

// ---------------------------------------------------------------------------
// Agent auth: a limited-scope key for the automated daily check, distinct from
// OFFICE_PASSWORD so the scheduled agent never holds order access.

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export function isShowtimesAgentRequest(req: Request): boolean {
  const key = process.env.SHOWTIMES_KEY;
  const given = req.headers.get("x-showtimes-key");
  return !!key && key.length >= 16 && !!given && safeEqual(given, key);
}

// ---------------------------------------------------------------------------
// Override input validation (office editor POSTs)

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function validateOverrideInput(
  raw: unknown
): { override: Omit<ScheduleOverride, "updatedAt" | "updatedBy"> } | { error: string } {
  if (typeof raw !== "object" || raw === null) return { error: "Invalid body" };
  const input = raw as Record<string, unknown>;
  const out: Omit<ScheduleOverride, "updatedAt" | "updatedBy"> = {};

  if (input.showTimes !== undefined) {
    if (!Array.isArray(input.showTimes)) return { error: "showTimes must be a list" };
    const cleaned: string[] = [];
    for (const t of input.showTimes) {
      const entry = typeof t === "string" ? parseShowTime(t) : null;
      if (!entry) return { error: `Unrecognized show time "${String(t)}". Use "7:30 PM" or "Sat 2:00 PM".` };
      cleaned.push(t.trim());
    }
    out.showTimes = cleaned;
  }

  if (input.darkDays !== undefined) {
    if (!Array.isArray(input.darkDays)) return { error: "darkDays must be a list" };
    for (const d of input.darkDays) {
      if (!DAY_NAMES.includes(d as string)) return { error: `Unknown day "${String(d)}"` };
    }
    out.darkDays = input.darkDays as string[];
  }

  if (input.darkDateRanges !== undefined) {
    if (!Array.isArray(input.darkDateRanges)) return { error: "darkDateRanges must be a list" };
    const ranges: { start: string; end: string }[] = [];
    for (const r of input.darkDateRanges) {
      const range = r as { start?: unknown; end?: unknown };
      if (
        typeof range?.start !== "string" ||
        typeof range?.end !== "string" ||
        !DATE_PATTERN.test(range.start) ||
        !DATE_PATTERN.test(range.end) ||
        range.start > range.end
      ) {
        return { error: "Each dark range needs start and end dates like 2026-09-01, start before end" };
      }
      ranges.push({ start: range.start, end: range.end });
    }
    out.darkDateRanges = ranges;
  }

  if (input.seasonalDarkWeekdays !== undefined) {
    if (!Array.isArray(input.seasonalDarkWeekdays)) return { error: "seasonalDarkWeekdays must be a list" };
    const rows: { day: string; start: string; end: string }[] = [];
    for (const r of input.seasonalDarkWeekdays) {
      const row = r as { day?: unknown; start?: unknown; end?: unknown };
      if (
        typeof row?.day !== "string" ||
        !DAY_NAMES.includes(row.day) ||
        typeof row?.start !== "string" ||
        typeof row?.end !== "string" ||
        !DATE_PATTERN.test(row.start) ||
        !DATE_PATTERN.test(row.end) ||
        row.start > row.end
      ) {
        return { error: "Each seasonal dark weekday needs a day name plus start and end dates" };
      }
      rows.push({ day: row.day, start: row.start, end: row.end });
    }
    out.seasonalDarkWeekdays = rows;
  }

  for (const key of ["seasonStart", "seasonEnd"] as const) {
    if (input[key] !== undefined) {
      if (typeof input[key] !== "string" || !MONTH_NAMES.includes(input[key] as string)) {
        return { error: `${key} must be a month name` };
      }
      out[key] = input[key] as string;
    }
  }

  if (input.extraPerformances !== undefined) {
    if (!Array.isArray(input.extraPerformances)) return { error: "extraPerformances must be a list" };
    const extras: { date: string; times: string[] }[] = [];
    for (const e of input.extraPerformances) {
      const extra = e as { date?: unknown; times?: unknown };
      if (typeof extra?.date !== "string" || !DATE_PATTERN.test(extra.date)) {
        return { error: "Each extra performance needs a date like 2026-10-10" };
      }
      if (!Array.isArray(extra.times) || extra.times.length === 0) {
        return { error: "Each extra performance needs at least one time" };
      }
      for (const t of extra.times) {
        if (typeof t !== "string" || !parseShowTime(t) || TIME_PATTERN.exec(t.trim())?.[1]) {
          return { error: `Extra performance time "${String(t)}" must look like "2:00 PM"` };
        }
      }
      extras.push({ date: extra.date, times: (extra.times as string[]).map((t) => t.trim()) });
    }
    out.extraPerformances = extras;
  }

  if (input.soldOut !== undefined) {
    if (!Array.isArray(input.soldOut)) return { error: "soldOut must be a list" };
    const entries: string[] = [];
    for (const s of input.soldOut) {
      if (typeof s !== "string") return { error: "Sold out entries must be text" };
      const trimmed = s.trim();
      const date = trimmed.slice(0, 10);
      const time = trimmed.slice(10).trim();
      if (!DATE_PATTERN.test(date) || (time && (!parseShowTime(time) || TIME_PATTERN.exec(time)?.[1]))) {
        return { error: `Sold out entry "${trimmed}" must be "2026-10-10" or "2026-10-10 7:30 PM"` };
      }
      entries.push(time ? `${date} ${time}` : date);
    }
    out.soldOut = entries;
  }

  if (input.scheduleNote !== undefined) {
    if (typeof input.scheduleNote !== "string") return { error: "scheduleNote must be text" };
    out.scheduleNote = input.scheduleNote.trim().slice(0, 500);
  }

  if (input.bookingDisabled !== undefined) {
    out.bookingDisabled = !!input.bookingDisabled;
  }

  return { override: out };
}
