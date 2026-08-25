"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { EffectiveSchedule } from "@/lib/showtimes";

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

interface ShowtimesEditorProps {
  slug: string;
  name: string;
  schedule: EffectiveSchedule;
  hasOverride: boolean;
}

/**
 * Inline schedule editor for one show. Saves an override to the office
 * showtimes API; edits go live on the booking calendar within minutes and
 * never require a deploy. Everything is line-based text on purpose so Z can
 * paste dates straight from a theater email.
 */
export function ShowtimesEditor({ slug, name, schedule, hasOverride }: ShowtimesEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const [showTimes, setShowTimes] = useState(schedule.showTimes.join("\n"));
  const [darkDays, setDarkDays] = useState<string[]>(schedule.darkDays);
  const [darkRanges, setDarkRanges] = useState(
    schedule.darkDateRanges.map((r) => `${r.start} ${r.end}`).join("\n")
  );
  const [seasonalDark, setSeasonalDark] = useState(
    schedule.seasonalDarkWeekdays.map((r) => `${r.day} ${r.start} ${r.end}`).join("\n")
  );
  const [extras, setExtras] = useState(
    schedule.extraPerformances
      .flatMap((e) => e.times.map((t) => `${e.date} ${t}`))
      .join("\n")
  );
  const [soldOut, setSoldOut] = useState(schedule.soldOut.join("\n"));
  const [seasonStart, setSeasonStart] = useState(schedule.seasonStart);
  const [seasonEnd, setSeasonEnd] = useState(schedule.seasonEnd);
  const [note, setNote] = useState(schedule.scheduleNote ?? "");
  const [bookingDisabled, setBookingDisabled] = useState(schedule.bookingDisabled);

  const lines = (value: string) =>
    value
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);

  const toggleDay = (day: string) => {
    setDarkDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  async function post(body: unknown) {
    setBusy(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/office/showtimes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setBusy(false);
    }
  }

  const save = () => {
    const rangeRows = [];
    for (const line of lines(darkRanges)) {
      const [start, end] = line.split(/\s+/);
      rangeRows.push({ start, end });
    }
    const seasonalRows = [];
    for (const line of lines(seasonalDark)) {
      const [day, start, end] = line.split(/\s+/);
      seasonalRows.push({ day, start, end });
    }
    const extrasByDate = new Map<string, string[]>();
    for (const line of lines(extras)) {
      const date = line.slice(0, 10);
      const time = line.slice(10).trim();
      const existing = extrasByDate.get(date) ?? [];
      if (time) existing.push(time);
      extrasByDate.set(date, existing);
    }

    post({
      slug,
      override: {
        showTimes: lines(showTimes),
        darkDays,
        darkDateRanges: rangeRows,
        seasonalDarkWeekdays: seasonalRows,
        extraPerformances: [...extrasByDate.entries()].map(([date, times]) => ({
          date,
          times,
        })),
        soldOut: lines(soldOut),
        seasonStart,
        seasonEnd,
        scheduleNote: note,
        bookingDisabled,
      },
    });
  };

  const reset = () => {
    if (!confirm(`Clear all edits for ${name} and go back to the site defaults?`)) return;
    post({ slug, reset: true });
  };

  const markVerified = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/office/showtimes-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          checkedBy: "office",
          results: [{ slug, status: "ok", note: "Verified by hand from the dashboard" }],
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Could not mark verified");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not mark verified");
    } finally {
      setBusy(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-[#1A1614] focus:border-[#13264D] focus:ring-1 focus:ring-[#13264D] focus:outline-none";
  const labelClass = "mb-1 block text-xs font-semibold text-gray-600";

  return (
    <div className="mt-3">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg border border-[#13264D] px-3 py-1.5 text-xs font-semibold text-[#13264D] hover:bg-[#13264D] hover:text-white"
        >
          {open ? "Close editor" : "Edit schedule"}
        </button>
        <button
          onClick={markVerified}
          disabled={busy}
          className="rounded-lg border border-green-700 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-700 hover:text-white disabled:opacity-50"
        >
          Mark verified OK
        </button>
        {hasOverride && (
          <button
            onClick={reset}
            disabled={busy}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-500 hover:border-[#C8102E] hover:text-[#C8102E] disabled:opacity-50"
          >
            Reset to site defaults
          </button>
        )}
      </div>

      {error && <p className="mt-2 text-xs font-semibold text-[#C8102E]">{error}</p>}
      {saved && !error && (
        <p className="mt-2 text-xs font-semibold text-green-700">
          Saved. Live on the booking calendar within about 5 minutes; this page
          can take a minute to catch up.
        </p>
      )}

      {open && (
        <div className="mt-4 space-y-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Show times (one per line, like &quot;7:30 PM&quot; or &quot;Sat 2:00 PM&quot;)
              </label>
              <textarea
                value={showTimes}
                onChange={(e) => setShowTimes(e.target.value)}
                rows={3}
                className={inputClass}
              />
            </div>
            <div>
              <span className={labelClass}>Dark days (never plays on these)</span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {DAY_NAMES.map((day) => (
                  <label key={day} className="flex items-center gap-1 text-xs text-[#1A1614]">
                    <input
                      type="checkbox"
                      checked={darkDays.includes(day)}
                      onChange={() => toggleDay(day)}
                    />
                    {day.slice(0, 3)}
                  </label>
                ))}
              </div>
              <div className="mt-3 flex gap-2">
                <div>
                  <label className={labelClass}>Season start</label>
                  <select
                    value={seasonStart}
                    onChange={(e) => setSeasonStart(e.target.value)}
                    className={inputClass}
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Season end</label>
                  <select
                    value={seasonEnd}
                    onChange={(e) => setSeasonEnd(e.target.value)}
                    className={inputClass}
                  >
                    {MONTH_NAMES.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div>
              <label className={labelClass}>
                Closed date ranges (one per line: &quot;2026-08-23 2026-08-31&quot;)
              </label>
              <textarea
                value={darkRanges}
                onChange={(e) => setDarkRanges(e.target.value)}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Weekdays dark within a span (one per line: &quot;Monday 2026-09-01 2026-12-20&quot;)
              </label>
              <textarea
                value={seasonalDark}
                onChange={(e) => setSeasonalDark(e.target.value)}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Added one-off performances (one per line: &quot;2026-10-10 2:00 PM&quot;)
              </label>
              <textarea
                value={extras}
                onChange={(e) => setExtras(e.target.value)}
                rows={2}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>
                Sold out (one per line: &quot;2026-10-10&quot; for the whole day, or &quot;2026-10-10 7:30 PM&quot;)
              </label>
              <textarea
                value={soldOut}
                onChange={(e) => setSoldOut(e.target.value)}
                rows={2}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Schedule note (shows in the office and digest only)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              className={inputClass}
            />
          </div>
          <label className="flex items-center gap-2 text-sm font-semibold text-[#C8102E]">
            <input
              type="checkbox"
              checked={bookingDisabled}
              onChange={(e) => setBookingDisabled(e.target.checked)}
            />
            Pause online booking for this show
          </label>
          <button
            onClick={save}
            disabled={busy}
            className="rounded-lg bg-[#13264D] px-4 py-2 text-sm font-bold text-white hover:bg-[#0D1B38] disabled:opacity-50"
          >
            {busy ? "Saving..." : "Save schedule"}
          </button>
        </div>
      )}
    </div>
  );
}
