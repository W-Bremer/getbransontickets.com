import { NextResponse } from "next/server";
import { isOfficeRequest, officeConfigured } from "@/lib/office-auth";
import { getShowBySlug } from "@/data/shows";
import {
  isShowtimesAgentRequest,
  saveVerificationResults,
  type VerificationStatus,
} from "@/lib/showtimes";

export const dynamic = "force-dynamic";

const STATUSES: VerificationStatus[] = ["ok", "mismatch", "warning", "unchecked"];

/**
 * Records the outcome of a showtimes check. Posted by the daily automated
 * check with one result per show, and by the dashboard's "mark verified"
 * button. Body:
 *   { checkedBy: "daily-check", results: [{ slug, status, note?, source? }] }
 */
export async function POST(req: Request) {
  if (!((officeConfigured() && isOfficeRequest(req)) || isShowtimesAgentRequest(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    checkedBy?: string;
    results?: { slug?: string; status?: string; note?: string; source?: string }[];
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body.results) || body.results.length === 0) {
    return NextResponse.json({ error: "results must be a non-empty list" }, { status: 400 });
  }

  const cleaned: { slug: string; status: VerificationStatus; note?: string; source?: string }[] = [];
  for (const r of body.results) {
    const show = r.slug ? getShowBySlug(r.slug) : undefined;
    if (!show || !show.isFeaturedPartner) {
      return NextResponse.json({ error: `Unknown show "${String(r.slug)}"` }, { status: 400 });
    }
    if (!STATUSES.includes(r.status as VerificationStatus)) {
      return NextResponse.json(
        { error: `Status for ${show.slug} must be one of ${STATUSES.join(", ")}` },
        { status: 400 }
      );
    }
    cleaned.push({
      slug: show.slug,
      status: r.status as VerificationStatus,
      note: typeof r.note === "string" ? r.note.trim().slice(0, 500) : undefined,
      source: typeof r.source === "string" ? r.source.trim().slice(0, 300) : undefined,
    });
  }

  const checkedBy =
    typeof body.checkedBy === "string" && body.checkedBy.trim()
      ? body.checkedBy.trim().slice(0, 60)
      : "office";

  const doc = await saveVerificationResults(cleaned, checkedBy);
  return NextResponse.json({ ok: true, lastRun: doc.lastRun });
}
