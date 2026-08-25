import { NextResponse } from "next/server";
import { sendShowtimesDigestEmail } from "@/lib/email";
import { isOfficeRequest, officeConfigured } from "@/lib/office-auth";
import { buildShowtimesReport, isShowtimesAgentRequest } from "@/lib/showtimes";
import { buildShowtimesDigest } from "@/lib/showtimes-digest";

export const dynamic = "force-dynamic";

/**
 * Sends the daily showtimes digest to the office inboxes. Fired by the
 * Vercel cron in vercel.json every morning after the automated schedule
 * check has posted its results; the office key or a signed-in office
 * session can also trigger it manually.
 */
export async function GET(req: Request) {
  const cronOk =
    !!process.env.CRON_SECRET &&
    req.headers.get("authorization") === `Bearer ${process.env.CRON_SECRET}`;
  const officeOk = officeConfigured() && isOfficeRequest(req);
  if (!cronOk && !officeOk && !isShowtimesAgentRequest(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const report = await buildShowtimesReport();
    const digest = buildShowtimesDigest(report);
    await sendShowtimesDigestEmail(digest);
    return NextResponse.json({
      sent: true,
      subject: digest.subject,
      shows: report.rows.length,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("showtimes-digest error:", err);
    // Callers are the cron and the office; the detail helps them fix it.
    return NextResponse.json(
      { error: "Digest failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
