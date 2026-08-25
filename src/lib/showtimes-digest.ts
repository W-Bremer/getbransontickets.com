import { siteConfig } from "./config";
import type { EffectiveSchedule, ShowtimesReport, ShowtimesReportRow } from "./showtimes";

/**
 * The daily showtimes digest for William and Z: current dates and times for
 * every show we sell, grouped by theater, with anything that needs attention
 * called out at the top. Plain text on purpose; it is an operations report,
 * not marketing.
 */

const STALE_AFTER_HOURS = 48;

function shortDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function ago(iso: string, now: Date): string {
  const ms = now.getTime() - new Date(iso).getTime();
  const hours = Math.round(ms / 3600000);
  if (hours < 1) return "under an hour ago";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  return `${days}d ago`;
}

function scheduleSummary(s: EffectiveSchedule): string[] {
  const lines: string[] = [];
  lines.push(`Times: ${s.showTimes.join(", ") || "none listed"}`);
  const darkBits: string[] = [];
  if (s.darkDays.length > 0) darkBits.push(`dark ${s.darkDays.join(", ")}`);
  for (const r of s.darkDateRanges) {
    darkBits.push(`closed ${shortDate(r.start)} to ${shortDate(r.end)}`);
  }
  for (const r of s.seasonalDarkWeekdays) {
    darkBits.push(`no ${r.day} shows ${shortDate(r.start)} to ${shortDate(r.end)}`);
  }
  if (darkBits.length > 0) lines.push(`Dark: ${darkBits.join("; ")}`);
  lines.push(`Season: ${s.seasonStart} to ${s.seasonEnd}`);
  if (s.soldOut.length > 0) lines.push(`Sold out: ${s.soldOut.join(", ")}`);
  if (s.extraPerformances.length > 0) {
    lines.push(
      `Added dates: ${s.extraPerformances
        .map((e) => `${shortDate(e.date)} ${e.times.join(" + ")}`)
        .join(", ")}`
    );
  }
  return lines;
}

function upcomingLine(row: ShowtimesReportRow): string {
  if (row.schedule.bookingDisabled) return "Next: booking is turned OFF for this show";
  if (row.upcoming.length === 0) return "Next: NO bookable dates in the next 8 months";
  return `Next: ${row.upcoming
    .slice(0, 5)
    .map((d) => `${shortDate(d.date)} ${d.times.join(" + ")}`)
    .join("; ")}`;
}

function attentionReasons(row: ShowtimesReportRow, now: Date): string[] {
  const reasons: string[] = [];
  const v = row.verification;
  if (v?.status === "mismatch") {
    reasons.push(`schedule MISMATCH${v.note ? `: ${v.note}` : ""}`);
  }
  if (v?.status === "warning") {
    reasons.push(`warning${v.note ? `: ${v.note}` : ""}`);
  }
  if (!v) {
    reasons.push("never verified against the theater's schedule");
  } else if (now.getTime() - new Date(v.at).getTime() > STALE_AFTER_HOURS * 3600000) {
    reasons.push(`not verified since ${ago(v.at, now)}`);
  }
  if (row.schedule.bookingDisabled) reasons.push("online booking is turned off");
  if (!row.schedule.bookingDisabled && row.upcoming.length === 0) {
    reasons.push("no bookable dates in the next 8 months");
  }
  return reasons;
}

export function buildShowtimesDigest(
  report: ShowtimesReport,
  now = new Date()
): { subject: string; text: string } {
  const rows = report.rows;
  const attention = rows
    .map((row) => ({ row, reasons: attentionReasons(row, now) }))
    .filter((r) => r.reasons.length > 0);

  const today = now.toLocaleDateString("en-US", {
    timeZone: "America/Chicago",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const shortToday = now.toLocaleDateString("en-US", {
    timeZone: "America/Chicago",
    month: "short",
    day: "numeric",
  });

  const lines: string[] = [
    `SHOWTIME CHECK: ${today}`,
    `Dashboard: ${siteConfig.url}/office/showtimes`,
  ];
  if (report.lastRun) {
    lines.push(
      `Last automated check: ${ago(report.lastRun.at, now)} by ${report.lastRun.checkedBy} (${report.lastRun.summary})`
    );
  } else {
    lines.push("Last automated check: none recorded yet");
  }
  lines.push("");

  if (attention.length > 0) {
    lines.push(`NEEDS ATTENTION (${attention.length})`);
    for (const { row, reasons } of attention) {
      lines.push(`- ${row.name} (${row.theater}): ${reasons.join("; ")}`);
    }
  } else {
    lines.push(`All ${rows.length} shows verified and bookable. Nothing needs attention.`);
  }
  lines.push("");

  const byTheater = new Map<string, ShowtimesReportRow[]>();
  for (const row of rows) {
    const group = byTheater.get(row.theater) ?? [];
    group.push(row);
    byTheater.set(row.theater, group);
  }

  for (const [theater, group] of byTheater) {
    lines.push(theater.toUpperCase());
    for (const row of group) {
      lines.push("");
      lines.push(`- ${row.name}`);
      for (const s of scheduleSummary(row.schedule)) lines.push(`  ${s}`);
      lines.push(`  ${upcomingLine(row)}`);
      const v = row.verification;
      lines.push(
        v
          ? `  Checked ${ago(v.at, now)} by ${v.checkedBy ?? "unknown"}: ${v.status.toUpperCase()}${v.note ? ` (${v.note})` : ""}`
          : "  Checked: never"
      );
      if (row.externalUrl) lines.push(`  Official: ${row.externalUrl}`);
    }
    lines.push("");
  }

  lines.push(`Edit any schedule at ${siteConfig.url}/office/showtimes`);

  const subject =
    attention.length > 0
      ? `Showtime check: ${attention.length} need${attention.length === 1 ? "s" : ""} attention (${shortToday})`
      : `Showtime check: all ${rows.length} shows OK (${shortToday})`;

  return { subject, text: lines.join("\n") };
}
