import { NextResponse } from "next/server";
import { getShowBySlug } from "@/data/shows";
import { buildAvailability, effectiveSchedule, loadOverrides } from "@/lib/showtimes";

export const dynamic = "force-dynamic";

/**
 * Bookable dates and times for one show, office overrides applied. The
 * booking calendar reads this so customers can only pick dates the show
 * actually plays; create-payment-intent re-checks server-side.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const show = getShowBySlug(slug);
  if (!show || !show.isFeaturedPartner) {
    return NextResponse.json({ error: "Unknown show" }, { status: 404 });
  }

  const overrides = await loadOverrides();
  const schedule = effectiveSchedule(show, overrides.overrides[show.slug]);
  const dates = buildAvailability(schedule, 240);

  return NextResponse.json(
    {
      slug: show.slug,
      bookingDisabled: schedule.bookingDisabled,
      scheduleNote: schedule.scheduleNote ?? null,
      dates,
    },
    {
      headers: {
        // Sold-out edits from the office should land within minutes: the CDN
        // may cache 5 minutes, but browsers must revalidate every page view
        // (max-age=0, or they heuristically cache the schedule for hours).
        "Cache-Control": "public, max-age=0, s-maxage=300, stale-while-revalidate=600",
      },
    }
  );
}
