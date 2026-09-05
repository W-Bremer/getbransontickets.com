import type { DemandLevel } from "@/lib/demand";

/**
 * One schedule fetch per show per page view. Four components on a show page
 * (date strip, calendar, times list, booking widget) all need the same
 * /api/schedule payload; this module-level cache dedupes them into a single
 * request, mirroring the pattern search-modal uses for its index. TTL matches
 * the API route's s-maxage=300 so a cached response is never older than what
 * the CDN would have served anyway.
 */
export interface ScheduleDate {
  date: string;
  times: string[];
  demand?: DemandLevel;
}

export interface ScheduleResponse {
  slug: string;
  bookingDisabled: boolean;
  scheduleNote: string | null;
  dates: ScheduleDate[];
}

const TTL_MS = 5 * 60_000;
const cache = new Map<string, { at: number; promise: Promise<ScheduleResponse> }>();

function fetchSchedule(slug: string, noStore: boolean): Promise<ScheduleResponse> {
  const promise = fetch(`/api/schedule/${slug}`, noStore ? { cache: "no-store" } : undefined)
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
    .catch((err) => {
      cache.delete(slug);
      throw err;
    });
  cache.set(slug, { at: Date.now(), promise });
  return promise;
}

export function loadSchedule(slug: string): Promise<ScheduleResponse> {
  const hit = cache.get(slug);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.promise;
  return fetchSchedule(slug, false);
}

/** Fresh no-store fetch (the Reserve re-check); also refreshes the cache. */
export function refreshSchedule(slug: string): Promise<ScheduleResponse> {
  return fetchSchedule(slug, true);
}
