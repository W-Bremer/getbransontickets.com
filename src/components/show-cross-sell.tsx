import Image from "next/image";
import Link from "next/link";
import { shows, getShowBySlug } from "@/data/shows";
import type { Show } from "@/data/shows";
import { getUpcomingPerformances } from "@/lib/performances";
import { formatPrice } from "@/lib/utils";

interface ShowCrossSellProps {
  /** Shows to feature first (an attraction's related shows); non-bookable entries are skipped. */
  preferredSlugs?: string[];
  limit?: number;
}

/**
 * Sidebar rail of bookable shows for pages that don't sell anything
 * themselves (attractions, venue guides): gives visitors who arrived for
 * information an on-site next step instead of a dead end.
 */
export function ShowCrossSell({ preferredSlugs = [], limit = 3 }: ShowCrossSellProps) {
  const picked: Show[] = [];
  const seen = new Set<string>();

  // A show with no performances in the next month (seasonal pause, mid-season
  // dark run) would send the visitor to an empty booking calendar.
  const bookableSoon = (s: Show) =>
    s.isFeaturedPartner && getUpcomingPerformances(s, 30).length > 0;

  for (const slug of preferredSlugs) {
    if (picked.length >= limit) break;
    const show = getShowBySlug(slug);
    if (show && bookableSoon(show) && !seen.has(show.slug)) {
      picked.push(show);
      seen.add(show.slug);
    }
  }

  if (picked.length < limit) {
    const featured = shows
      .filter((s) => bookableSoon(s) && !seen.has(s.slug))
      .sort((a, b) => (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99));
    for (const show of featured) {
      if (picked.length >= limit) break;
      picked.push(show);
      seen.add(show.slug);
    }
  }

  if (picked.length === 0) return null;

  return (
    <div className="rounded-2xl bg-[#13264D] p-6 shadow-lg">
      <h3 className="text-lg font-bold text-white font-heading">
        Seeing a show while you're in town?
      </h3>
      <p className="mt-1 text-sm text-white/70">
        Book tickets on this site, all in one cart.
      </p>
      <div className="mt-4 space-y-3">
        {picked.map((show) => (
          <div key={show.slug} className="rounded-xl bg-white/10 p-3">
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={show.imageUrl}
                  alt={show.imageAlt}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  href={`/shows/${show.slug}`}
                  className="block truncate font-semibold text-white transition-colors hover:text-[#E8C65A]"
                >
                  {show.name}
                </Link>
                <p className="text-sm text-white/60">From ${formatPrice(show.priceFrom)}</p>
              </div>
            </div>
            <Link
              href={`/shows/${show.slug}#booking-widget`}
              className="mt-2.5 block rounded-lg bg-[#C8102E] py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#a60d26]"
            >
              Get Tickets
            </Link>
          </div>
        ))}
      </div>
      <Link
        href="/shows"
        className="mt-4 block text-center text-sm font-medium text-[#E8C65A] transition-colors hover:text-white"
      >
        Browse all Branson shows
      </Link>
    </div>
  );
}
