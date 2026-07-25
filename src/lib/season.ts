import type { Show } from "@/data/shows";

const MONTHS: Record<string, number> = {
  January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
  July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
};

/**
 * Turns a show's "March" to "December" season into concrete ISO dates for
 * Event structured data, which requires startDate. Google needs a real date;
 * a season name alone makes the whole Event markup ineligible.
 *
 * Returns the current season window when we are inside it, otherwise next
 * year's window, so the markup never advertises a date already past.
 */
export function getSeasonDates(
  show: Pick<Show, "seasonStart" | "seasonEnd">,
  today = new Date()
): { startDate: string; endDate: string } | null {
  const startMonth = MONTHS[show.seasonStart];
  const endMonth = MONTHS[show.seasonEnd];
  if (startMonth === undefined || endMonth === undefined) return null;

  const year = today.getFullYear();
  // Seasons that wrap the new year (e.g. November to January) end next year.
  const wraps = endMonth < startMonth;
  let startYear = year;
  let endYear = wraps ? year + 1 : year;

  const seasonEnd = new Date(Date.UTC(endYear, endMonth + 1, 0));
  if (seasonEnd < today) {
    startYear += 1;
    endYear += 1;
  }

  const start = new Date(Date.UTC(startYear, startMonth, 1));
  const end = new Date(Date.UTC(endYear, endMonth + 1, 0));

  return { startDate: iso(start), endDate: iso(end) };
}

function iso(d: Date): string {
  return d.toISOString().slice(0, 10);
}
