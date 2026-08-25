import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { hasOfficeAccess, officeConfigured } from "@/lib/office-auth";
import { OfficeLoginForm } from "@/components/office/login-form";
import { ShowtimesEditor } from "@/components/office/showtimes-editor";
import {
  buildShowtimesReport,
  type ShowtimesReportRow,
  type VerificationEntry,
} from "@/lib/showtimes";

export const dynamic = "force-dynamic";

const STALE_AFTER_HOURS = 48;

function ago(iso: string): string {
  const hours = Math.round((Date.now() - new Date(iso).getTime()) / 3600000);
  if (hours < 1) return "under an hour ago";
  if (hours < 24) return `${hours}h ago`;
  return `${Math.round(hours / 24)}d ago`;
}

function shortDate(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function StatusBadge({ verification }: { verification?: VerificationEntry }) {
  if (!verification) {
    return (
      <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
        Never verified
      </span>
    );
  }
  const stale =
    Date.now() - new Date(verification.at).getTime() > STALE_AFTER_HOURS * 3600000;
  if (verification.status === "mismatch") {
    return (
      <span className="rounded-full bg-[#C8102E] px-2.5 py-0.5 text-xs font-semibold text-white">
        Mismatch
      </span>
    );
  }
  if (verification.status === "warning") {
    return (
      <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-xs font-semibold text-amber-950">
        Warning
      </span>
    );
  }
  if (verification.status === "unchecked") {
    return (
      <span className="rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-semibold text-gray-600">
        Could not check
      </span>
    );
  }
  return stale ? (
    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
      OK, but stale
    </span>
  ) : (
    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800">
      Verified OK
    </span>
  );
}

function ShowRow({ row }: { row: ShowtimesReportRow }) {
  const s = row.schedule;
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-[#13264D]">{row.name}</h3>
          {row.hasOverride && (
            <span className="rounded-full bg-[#13264D]/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#13264D] uppercase">
              Edited
            </span>
          )}
        </div>
        <StatusBadge verification={row.verification} />
      </div>

      <dl className="mt-3 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-xs font-semibold text-gray-500 uppercase">Times</dt>
          <dd className="text-[#1A1614]">{s.showTimes.join(", ") || "none listed"}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold text-gray-500 uppercase">Season</dt>
          <dd className="text-[#1A1614]">
            {s.seasonStart} to {s.seasonEnd}
            {s.darkDays.length > 0 && ` (dark ${s.darkDays.map((d) => d.slice(0, 3)).join(", ")})`}
          </dd>
        </div>
        {s.darkDateRanges.length > 0 && (
          <div>
            <dt className="text-xs font-semibold text-gray-500 uppercase">Closed ranges</dt>
            <dd className="text-[#1A1614]">
              {s.darkDateRanges.map((r) => `${shortDate(r.start)} to ${shortDate(r.end)}`).join("; ")}
            </dd>
          </div>
        )}
        {s.seasonalDarkWeekdays.length > 0 && (
          <div>
            <dt className="text-xs font-semibold text-gray-500 uppercase">Seasonal dark weekdays</dt>
            <dd className="text-[#1A1614]">
              {s.seasonalDarkWeekdays
                .map((r) => `${r.day.slice(0, 3)} ${shortDate(r.start)} to ${shortDate(r.end)}`)
                .join("; ")}
            </dd>
          </div>
        )}
        {s.soldOut.length > 0 && (
          <div>
            <dt className="text-xs font-semibold text-gray-500 uppercase">Sold out</dt>
            <dd className="font-semibold text-[#C8102E]">{s.soldOut.join(", ")}</dd>
          </div>
        )}
        {s.extraPerformances.length > 0 && (
          <div>
            <dt className="text-xs font-semibold text-gray-500 uppercase">Added dates</dt>
            <dd className="text-[#1A1614]">
              {s.extraPerformances
                .map((e) => `${shortDate(e.date)} ${e.times.join(" + ")}`)
                .join("; ")}
            </dd>
          </div>
        )}
      </dl>

      <div className="mt-3">
        <p className="text-xs font-semibold text-gray-500 uppercase">
          Next bookable dates {s.bookingDisabled && "(booking paused)"}
        </p>
        {row.upcoming.length === 0 ? (
          <p className="mt-1 text-sm font-semibold text-[#C8102E]">
            No bookable dates in the next 8 months
          </p>
        ) : (
          <div className="mt-1 flex flex-wrap gap-1.5">
            {row.upcoming.map((d) => (
              <span
                key={d.date}
                className="rounded bg-[#F6F4EF] px-2 py-1 text-xs text-[#1A1614]"
              >
                {shortDate(d.date)} <span className="font-semibold">{d.times.join(" + ")}</span>
              </span>
            ))}
          </div>
        )}
      </div>

      {s.scheduleNote && (
        <p className="mt-3 rounded-lg bg-[#F6F4EF] p-3 text-xs text-gray-600">{s.scheduleNote}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
        {row.verification && (
          <span>
            Checked {ago(row.verification.at)} by {row.verification.checkedBy ?? "unknown"}
            {row.verification.note ? `: ${row.verification.note}` : ""}
          </span>
        )}
        {row.externalUrl && (
          <a
            href={row.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[#C8102E] hover:underline"
          >
            Official schedule
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      <ShowtimesEditor
        slug={row.slug}
        name={row.name}
        schedule={row.schedule}
        hasOverride={row.hasOverride}
      />
    </div>
  );
}

export default async function ShowtimesPage() {
  if (!officeConfigured()) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16">
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-6 text-amber-900">
          <h1 className="font-bold">The office is not set up</h1>
          <p className="mt-2 text-sm">
            Set the OFFICE_PASSWORD environment variable (8+ characters) and redeploy.
          </p>
        </div>
      </div>
    );
  }

  if (!(await hasOfficeAccess())) {
    return <OfficeLoginForm />;
  }

  const report = await buildShowtimesReport();
  const needsAttention = report.rows.filter((row) => {
    const v = row.verification;
    return (
      !v ||
      v.status === "mismatch" ||
      v.status === "warning" ||
      v.status === "unchecked" ||
      Date.now() - new Date(v.at).getTime() > STALE_AFTER_HOURS * 3600000 ||
      row.schedule.bookingDisabled ||
      row.upcoming.length === 0
    );
  }).length;

  const byTheater = new Map<string, ShowtimesReportRow[]>();
  for (const row of report.rows) {
    const group = byTheater.get(row.theater) ?? [];
    group.push(row);
    byTheater.set(row.theater, group);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold tracking-widest text-[#C8102E] uppercase">
        Get Branson Tickets
      </p>
      <h1 className="text-3xl font-bold text-[#13264D]">Showtimes</h1>
      <p className="mt-2 text-sm text-gray-600">
        The dates and times customers can book for every show we sell, checked
        against the theaters daily. Edits here go live on the site within
        minutes, no deploy needed.
      </p>
      <p className="mt-2 text-sm">
        <Link href="/office" className="font-semibold text-[#C8102E] hover:underline">
          Back to the Voucher Desk
        </Link>
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-sm">
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-[#13264D] shadow-sm">
          {report.rows.length} shows
        </span>
        <span
          className={`rounded-full px-3 py-1 font-semibold shadow-sm ${
            needsAttention > 0 ? "bg-[#C8102E] text-white" : "bg-green-100 text-green-800"
          }`}
        >
          {needsAttention > 0 ? `${needsAttention} need attention` : "All clear"}
        </span>
        <span className="rounded-full bg-white px-3 py-1 text-gray-600 shadow-sm">
          {report.lastRun
            ? `Last check: ${ago(report.lastRun.at)} by ${report.lastRun.checkedBy}`
            : "No automated check recorded yet"}
        </span>
      </div>

      {[...byTheater.entries()].map(([theater, rows]) => (
        <section key={theater} className="mt-8">
          <h2 className="text-lg font-bold text-[#13264D]">{theater}</h2>
          <div className="mt-3 space-y-4">
            {rows.map((row) => (
              <ShowRow key={row.slug} row={row} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
