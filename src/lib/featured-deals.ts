import { shows } from "@/data/shows";
import { partners } from "@/data/partners";
import type { FeaturedDeal } from "@/data/passport";

/**
 * The deal rail on the Passport. Partner-exclusive offers lead, then show
 * offers pulled from the catalog so the rail never shows an offer we cannot
 * honor.
 */
export function getFeaturedDeals(limit = 8): FeaturedDeal[] {
  const partnerDeals: FeaturedDeal[] = partners
    .filter((p) => p.passportDeal && p.imageUrl)
    .map((p) => ({
      name: p.name,
      href: `/passport/partners/${p.slug}`,
      imageUrl: p.imageUrl as string,
      imageAlt: `${p.name} in Branson, Missouri`,
      badge: "Passport deal",
      blurb: p.passportDeal as string,
      isExclusive: true,
    }));

  const showDeals: FeaturedDeal[] = shows
    .filter((s) => s.specialOffers.length > 0 && s.imageUrl)
    .slice(0, 5)
    .map((s) => ({
      name: s.name,
      href: `/shows/${s.slug}`,
      imageUrl: s.imageUrl,
      imageAlt: s.imageAlt,
      badge: shortenOffer(s.specialOffers[0]),
      blurb: s.shortDescription,
      priceFrom: s.priceFrom,
    }));

  // No attraction rail entries: they were selected and badged by
  // attraction.rating, an invented value from the original build, and
  // attractions carry no verified offers to honor.
  return [...partnerDeals, ...showDeals].slice(0, limit);
}

/** Trims catalog offer text down to something that fits on a badge. */
function shortenOffer(offer: string): string {
  if (/bogo/i.test(offer)) return "BOGO";
  if (/kids free/i.test(offer)) return "Kids free";
  if (/family pass/i.test(offer)) return "Family pass";
  const percent = offer.match(/(\d+)%/);
  if (percent) return `Save ${percent[1]}%`;
  const dollars = offer.match(/\$(\d+)/);
  if (dollars) return `$${dollars[1]} off`;
  return offer.length > 18 ? "Special offer" : offer;
}
