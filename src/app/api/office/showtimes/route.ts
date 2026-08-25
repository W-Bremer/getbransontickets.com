import { NextResponse } from "next/server";
import { isOfficeRequest, officeConfigured } from "@/lib/office-auth";
import { getShowBySlug } from "@/data/shows";
import {
  buildShowtimesReport,
  isShowtimesAgentRequest,
  saveOverride,
  validateOverrideInput,
  type ScheduleOverride,
} from "@/lib/showtimes";

export const dynamic = "force-dynamic";

function authorized(req: Request): boolean {
  return (officeConfigured() && isOfficeRequest(req)) || isShowtimesAgentRequest(req);
}

/**
 * Full showtimes report for every show we sell: effective schedule
 * (overrides applied), upcoming bookable dates, verification state, and the
 * official source URL to check against. Read by the office dashboard and by
 * the daily automated schedule check.
 */
export async function GET(req: Request) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  // 60 upcoming dates per show: the daily check compares both directions, so
  // it needs enough of our calendar to tell "we don't sell that date" from
  // "beyond the report's horizon". The dashboard shows its own shorter list.
  const report = await buildShowtimesReport(60);
  return NextResponse.json(report);
}

/**
 * Save a schedule override for one show (office only, not the agent key).
 * Body: { slug, override: {...} } or { slug, reset: true } to return the
 * show to its shows.ts defaults.
 */
export async function POST(req: Request) {
  if (!(officeConfigured() && isOfficeRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { slug?: string; override?: unknown; reset?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const show = body.slug ? getShowBySlug(body.slug) : undefined;
  if (!show || !show.isFeaturedPartner) {
    return NextResponse.json({ error: "Unknown show" }, { status: 400 });
  }

  if (body.reset) {
    const doc = await saveOverride(show.slug, null);
    const report = await buildShowtimesReport(8, 240, doc);
    return NextResponse.json({ ok: true, report });
  }

  const validated = validateOverrideInput(body.override);
  if ("error" in validated) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const override: ScheduleOverride = {
    ...validated.override,
    updatedAt: new Date().toISOString(),
    updatedBy: "office",
  };
  const doc = await saveOverride(show.slug, override);
  const report = await buildShowtimesReport(8, 240, doc);
  return NextResponse.json({ ok: true, report });
}
