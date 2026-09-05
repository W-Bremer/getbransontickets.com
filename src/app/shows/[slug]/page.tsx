import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Users, CalendarDays, UtensilsCrossed, Phone, ExternalLink, Star, CheckCircle2 } from "lucide-react";
import { shows, getShowBySlug, getPartnerShows } from "@/data/shows";
import { theaters } from "@/data/theaters";
import { siteConfig } from "@/lib/config";
import { getSeasonDates } from "@/lib/season";
import { getUpcomingPerformances } from "@/lib/performances";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PriceDisplay } from "@/components/price-display";
import { DealHighlights } from "@/components/deal-highlights";
import { baseOf, formatBasePrice } from "@/lib/tax";
import { ShowCard } from "@/components/show-card";
import { JsonLd } from "@/components/json-ld";
import { BookNowButton } from "@/components/book-now-button";
import BookingWidget from "@/components/booking-widget";
import { BookingModal } from "@/components/booking-modal";
import StickyBookingBar from "@/components/sticky-booking-bar";
import { GoogleReviews } from "@/components/google-reviews";
import { FamilyBundle } from "@/components/family-bundle";
import { TicketInfoCard } from "@/components/ticket-info-card";
import { BestPriceBadge } from "@/components/best-price-badge";
import { DateCardStrip } from "@/components/date-card-strip";
import { ShowCalendar } from "@/components/show-calendar";
import { PricesSection } from "@/components/prices-section";
import { ShowDetailSections } from "@/components/show-detail-sections";
import { getPlaceSnapshot } from "@/lib/google-places";
import { ShowDetailClient } from "./show-detail-client";

export async function generateStaticParams() {
  return shows.map((show) => ({ slug: show.slug }));
}

// The Event markup covers a rolling window of upcoming performances; without
// revalidation the window would freeze at whatever day the site last deployed.
export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = getShowBySlug(slug);
  if (!show) return { title: "Show Not Found" };

  return {
    title: `${show.name} Branson Tickets 2026 | Showtimes & Schedule`,
    description: `Get ${show.name} tickets in Branson, MO. ${show.shortDescription} Tickets from $${formatBasePrice(show.priceFrom)}.`,
    alternates: { canonical: `${siteConfig.url}/shows/${show.slug}` },
    openGraph: {
      title: `${show.name} Branson Tickets 2026 | Showtimes & Schedule`,
      description: `Get ${show.name} tickets in Branson, MO. ${show.shortDescription}`,
      url: `${siteConfig.url}/shows/${show.slug}`,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: show.imageUrl, width: 800, height: 500 }],
    },
  };
}

export default async function ShowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const show = getShowBySlug(slug);
  if (!show) notFound();

  const showTheater = theaters.find(
    (t) =>
      t.showSlugs.includes(show.slug) ||
      t.name.toLowerCase() === show.theater.toLowerCase()
  );

  const relatedShows = getPartnerShows()
    .filter((s) => s.slug !== show.slug)
    .slice(0, 6);

  const season = getSeasonDates(show);

  const performances = getUpcomingPerformances(show);

  // Live Google rating + curated 5-star quotes, refreshed with the page's
  // ISR window. Falls back to the hand-verified static values in shows.ts.
  const place = show.googlePlaceId ? await getPlaceSnapshot(show.googlePlaceId) : null;
  const googleRating = place?.rating ?? show.googleRating;
  const googleReviewCount = place?.reviewCount ?? show.googleReviewCount;

  const eventDetails = {
    name: show.name,
    description: show.shortDescription,
    url: `${siteConfig.url}/shows/${show.slug}`,
    image: show.imageUrl,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: show.theater,
    },
    location: {
      "@type": "Place",
      name: show.theater,
      address: {
        "@type": "PostalAddress",
        streetAddress: show.theaterAddress,
        addressLocality: "Branson",
        addressRegion: "MO",
        postalCode: "65616",
        addressCountry: "US",
      },
    },
    offers: {
      "@type": "Offer",
      // Advertised pre-tax base, matching the on-page sticker.
      price: baseOf(show.priceFrom),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/shows/${show.slug}`,
    },
    performer: {
      "@type": "PerformingGroup",
      name: show.name,
    },
  };

  // One Event per performance: search engines match ticket sellers to a
  // specific date-time instance, so a season-range Event can never join the
  // ticket panels. The season-range fallback only applies to shows whose
  // season hasn't started yet (startDate is still required for eligibility);
  // a show that is mid-season yet fully dark (e.g. a long pause in
  // darkDateRanges) gets no Event markup at all, since a season range would
  // advertise performances that aren't happening.
  const seasonNotStarted =
    season !== null && season.startDate > new Date().toISOString().slice(0, 10);
  const eventSchema =
    performances.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": performances.map((p) => ({
            "@type": "Event",
            ...eventDetails,
            startDate: p.startDate,
            endDate: p.endDate,
          })),
        }
      : seasonNotStarted
        ? {
            "@context": "https://schema.org",
            "@type": "Event",
            ...eventDetails,
            startDate: season.startDate,
            endDate: season.endDate,
          }
        : null;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${show.name} Tickets`,
    description: show.shortDescription,
    image: show.imageUrl,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: baseOf(show.priceFrom),
      highPrice: show.priceTo !== undefined ? baseOf(show.priceTo) : undefined,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      {eventSchema && <JsonLd data={eventSchema} />}
      <JsonLd data={productSchema} />

      {/* Hero. Short on phones so the booking panel below it starts above the
          fold — buying shouldn't require scrolling past a screen of photo.
          Desktop stays slim too, so the sticky panel's top half (price,
          rating, trust, date chips) lands inside the first viewport. */}
      <div className="relative h-[32svh] min-h-[240px] sm:h-[42vh] sm:min-h-[340px] lg:h-[42vh] lg:min-h-[360px]">
        <Image
          src={show.imageUrl}
          alt={show.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13264D] via-[#0D1B38]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-5 sm:pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="hidden sm:block">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Shows", href: "/shows" },
                  { label: show.name },
                ]}
              />
            </div>
            <div className="mt-0 sm:mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
              {show.mealIncluded && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8C65A] text-white text-xs sm:text-sm font-medium">
                  <UtensilsCrossed className="w-3 h-3" />
                  {show.mealType} Included
                </span>
              )}
              {show.isNew2026 && (
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-sm">
                  New for 2026!
                </span>
              )}
              {show.childPriceFrom === 0 && (
                <span className="px-3 py-1 rounded-full bg-[#C8102E] text-white text-xs sm:text-sm font-bold uppercase tracking-wide">
                  Kids&apos; tickets free
                </span>
              )}
            </div>
            <h1 className="mt-2 sm:mt-3 text-2xl sm:text-4xl lg:text-5xl font-bold text-white font-heading drop-shadow-md">
              {show.name}
            </h1>
            <p className="mt-1.5 sm:mt-2 text-base sm:text-lg text-white/90 font-medium">{show.tagline}</p>
            {/* Instant venue confirmation: a large share of ad clicks search
                the theater's name, not the show's. */}
            <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-white/75">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              {show.theater} &middot; Branson, MO
            </p>
            {/* The primary CTA lives in the hero on tablet/desktop so it is
                above the fold on every screen (phones already have the
                sticky Buy Tickets bar in view from load). Eyetracking says
                attention falls off a cliff at the fold; the button doesn't
                get to live below it. */}
            {show.isFeaturedPartner && (
              <div className="mt-5 hidden sm:flex flex-wrap items-center gap-x-5 gap-y-3">
                <BookNowButton label={`Book Now from $${formatBasePrice(show.priceFrom)}`} />
                <span className="text-sm font-medium text-white/90 drop-shadow">
                  {googleRating !== undefined && googleReviewCount !== undefined && (
                    <>
                      <span className="text-[#E8C65A]">&#9733;</span>{" "}
                      <span className="font-bold">{googleRating}</span> ({googleReviewCount}{" "}
                      reviews) &middot;{" "}
                    </>
                  )}
                  Free cancellation up to 24 hrs
                </span>
              </div>
            )}
            {/* Ratings removed: show.rating / show.reviewCount were invented
                values from the original build, not reviews we hold. Restore
                only with a real, citable source. */}
          </div>
        </div>
      </div>

      {/* Quick date cards (enhanced booking layout) */}
      {show.bookingPageV2 && show.isFeaturedPartner && (
        <div className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <DateCardStrip slug={show.slug} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          {/* Booking renders first in the DOM so it sits directly under the
              hero on phones; the lg grid moves it into the right column. */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Booking column. The sticky panel is capped at the viewport so
                the Reserve button is always reachable — on shorter screens the
                panel scrolls internally instead of running past the fold. */}
            <div className="lg:col-start-3 lg:row-start-1">
              <div
                id={show.bookingPageV2 ? undefined : "booking-widget"}
                className="lg:sticky lg:top-24 space-y-6 lg:space-y-4 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto lg:overscroll-contain lg:pb-1 lg:pr-1"
              >
                {show.isFeaturedPartner && show.bookingPageV2 ? (
                  <>
                    <TicketInfoCard
                      priceFrom={show.priceFrom}
                      competitorPrice={show.competitorPrice}
                    />
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                      <span className="text-sm font-bold text-emerald-800">
                        Instant Confirmation
                      </span>
                    </div>
                    <BestPriceBadge />
                    {show.familyBundle && (
                      <FamilyBundle
                        priceFrom={show.priceFrom}
                        childPriceFrom={show.childPriceFrom}
                        bogo50={show.bogo50}
                      />
                    )}
                  </>
                ) : show.isFeaturedPartner ? (
                  <>
                    <div className="rounded-2xl border border-gray-200 shadow-lg bg-white overflow-hidden">
                      <div className="bg-[#13264D] px-5 py-4">
                        <div className="flex items-end justify-between gap-3">
                          <div>
                            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E8C65A]">
                              Tickets from
                            </span>
                            <div className="flex items-baseline gap-1.5">
                              {show.competitorPrice !== undefined && (
                                <span className="text-xl font-bold leading-none text-white/40 line-through decoration-[#C8102E] decoration-2">
                                  ${show.competitorPrice}
                                </span>
                              )}
                              <span className="text-3xl font-bold leading-none text-white">
                                ${formatBasePrice(show.priceFrom)}
                              </span>
                              <span className="text-sm whitespace-nowrap text-white/70">/ adult + tax</span>
                            </div>
                          </div>
                          <div className="pb-0.5 text-right">
                            {show.childPriceFrom === 0 ? (
                              <span className="inline-block rounded-md bg-[#C8102E] px-2.5 py-1.5 text-xs font-bold tracking-wide text-white uppercase">
                                Kids free
                              </span>
                            ) : show.childPriceFrom !== undefined &&
                              show.childPriceFrom < show.priceFrom ? (
                              <>
                                <div className="text-[11px] font-semibold uppercase tracking-wider text-white/60">
                                  Kids
                                </div>
                                <div className="text-xl font-bold leading-tight text-[#E8C65A]">
                                  ${formatBasePrice(show.childPriceFrom)}
                                </div>
                              </>
                            ) : null}
                          </div>
                        </div>
                        {/* Real Google rating — live via Places when a place
                            id is set, else the verified values in shows.ts.
                            Deliberately NOT a link: paid clicks shouldn't be
                            handed back to Google mid-purchase. */}
                        {googleRating !== undefined &&
                          googleReviewCount !== undefined && (
                            <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-white/85">
                              <Star className="h-3.5 w-3.5 fill-[#E8C65A] text-[#E8C65A]" aria-hidden />
                              <span className="font-bold text-white">{googleRating}</span>
                              <span>{googleReviewCount} Google reviews</span>
                            </div>
                          )}
                      </div>
                      <DealHighlights
                        priceFrom={show.priceFrom}
                        childPriceFrom={show.childPriceFrom}
                        studentPriceFrom={show.studentPriceFrom}
                        kidsFreeUnderAge={show.kidsFreeUnderAge}
                        className="px-4 pt-4"
                      />
                      {show.familyBundle && (
                        <div className="px-4 pt-3">
                          <FamilyBundle
                            priceFrom={show.priceFrom}
                            childPriceFrom={show.childPriceFrom}
                            bogo50={show.bogo50}
                          />
                        </div>
                      )}
                      <div className="p-1 pt-3">
                        <BookingWidget
                          showId={show.slug}
                          showName={show.name}
                          pricePerAdult={show.priceFrom}
                          pricePerChild={show.childPriceFrom ?? Math.round(show.priceFrom * 0.6)}
                          imageUrl={show.imageUrl}
                          kidsFreeUnderAge={show.kidsFreeUnderAge}
                          bogo50={show.bogo50}
                          competitorPrice={show.competitorPrice}
                        />
                      </div>
                    </div>

                    {/* Call to book — full button on phones (calls dominate
                        there); a slim line on desktop where sticky-panel
                        height is the scarce resource. */}
                    <Link
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="w-full flex lg:hidden items-center justify-center gap-2 py-3 border-2 border-[#13264D] text-[#13264D] rounded-xl font-semibold hover:bg-[#13264D] hover:text-white transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Call {siteConfig.phone}
                    </Link>
                    <Link
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="hidden lg:flex items-center justify-center gap-1.5 text-sm font-semibold text-[#13264D] hover:text-[#C8102E] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      Prefer to book by phone? {siteConfig.phone}
                    </Link>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border border-gray-200 shadow-lg bg-white overflow-hidden">
                      <div className="bg-[#13264D] px-6 py-4">
                        <PriceDisplay priceFrom={show.priceFrom} priceTo={show.priceTo} variant="light" />
                      </div>
                      <div className="p-6 space-y-4">
                        <p className="text-sm text-gray-600 text-center">
                          Tickets for this show are available directly from the venue.
                        </p>
                        {show.externalUrl && (
                          <a
                            href={show.externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#E8C65A] text-white rounded-xl font-semibold hover:bg-[#C04E0C] transition-colors"
                          >
                            Visit Official Website
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          href={`tel:${siteConfig.phoneRaw}`}
                          className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#13264D] text-[#13264D] rounded-xl font-semibold hover:bg-[#13264D] hover:text-white transition-all"
                        >
                          <Phone className="w-4 h-4" />
                          Questions? Call {siteConfig.phone}
                        </Link>
                      </div>
                    </div>
                  </>
                )}

                {/* The duration/meal quick-info box that used to sit here
                    duplicated the Quick Facts tiles and pushed the sticky
                    panel past the viewport; removed to keep the panel whole. */}
              </div>
            </div>

            {/* Left Content */}
            <div className="mt-10 lg:mt-0 lg:col-span-2 lg:col-start-1 lg:row-start-1">
              {/* Quick Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F6F4EF]">
                  <Clock className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-[#1A1614]">{show.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F6F4EF]">
                  <MapPin className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <div className="text-xs text-gray-500">Theater</div>
                    <div className="font-semibold text-[#1A1614] text-sm">{show.theater}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F6F4EF]">
                  <Users className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <div className="text-xs text-gray-500">Ages</div>
                    <div className="font-semibold text-[#1A1614]">{show.ageRecommendation}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#F6F4EF]">
                  <CalendarDays className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <div className="text-xs text-gray-500">Season</div>
                    <div className="font-semibold text-[#1A1614]">
                      {show.seasonStart} to {show.seasonEnd}
                    </div>
                  </div>
                </div>
              </div>

              {/* Curated 5-star Google quotes, high on the page where the
                  buying decision happens; the aggregate link keeps context. */}
              {place && googleRating !== undefined && googleReviewCount !== undefined && (
                <GoogleReviews
                  reviews={place.reviews}
                  rating={googleRating}
                  reviewCount={googleReviewCount}
                  className="mb-10"
                />
              )}

              {/* Tabbed Content Section */}
              <ShowDetailClient
                show={{
                  name: show.name,
                  slug: show.slug,
                  description: show.description,
                  duration: show.duration,
                  theater: show.theater,
                  theaterAddress: show.theaterAddress,
                  ageRecommendation: show.ageRecommendation,
                  showTimes: show.showTimes,
                  darkDays: show.darkDays,
                  isFeaturedPartner: show.isFeaturedPartner,
                  seasonStart: show.seasonStart,
                  seasonEnd: show.seasonEnd,
                  priceFrom: show.priceFrom,
                  priceTo: show.priceTo,
                  childPriceFrom: show.childPriceFrom,
                  mealIncluded: show.mealIncluded,
                  mealType: show.mealType,
                  faqs: show.faqs,
                  category: show.category,
                  galleryImages: show.galleryImages,
                  galleryImageAlts: show.galleryImageAlts,
                  galleryNote: show.galleryNote,
                  videoUrl: show.videoUrl,
                }}
                theaterSlug={showTheater?.slug}
              />
            </div>
          </div>

          {/* Full booking calendar + prices (enhanced booking layout) */}
          {show.bookingPageV2 && show.isFeaturedPartner && (
            <section
              id="booking-widget"
              className="mt-16 scroll-mt-32 md:scroll-mt-24 border-t border-gray-200 pt-10"
            >
              <h2 className="text-2xl font-bold text-[#1A1614] font-heading">
                Pick Your Date and Time
              </h2>
              <p className="mt-2 text-sm text-[#1A1614]/70">
                Click on a date or show time below to book.
              </p>
              <div className="mt-6">
                <ShowCalendar slug={show.slug} />
              </div>
              <PricesSection
                priceFrom={show.priceFrom}
                childPriceFrom={show.childPriceFrom}
                kidsFreeUnderAge={show.kidsFreeUnderAge}
                bogo50={show.bogo50}
              />
            </section>
          )}

          {/* Long-form editorial + photos (per-show via detailSections) */}
          <ShowDetailSections show={show} />

          {/* Related Shows */}
          {relatedShows.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-[#1A1614] font-heading mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedShows.map((related, index) => (
                  <ShowCard key={related.slug} show={related} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking popup — every "Book Now" button on the page opens it */}
      {show.isFeaturedPartner && (
        <BookingModal
          showId={show.slug}
          showName={show.name}
          pricePerAdult={show.priceFrom}
          pricePerChild={show.childPriceFrom ?? Math.round(show.priceFrom * 0.6)}
          imageUrl={show.imageUrl}
          kidsFreeUnderAge={show.kidsFreeUnderAge}
          competitorPrice={show.competitorPrice}
          bogo50={show.bogo50}
        />
      )}

      {/* Sticky mobile booking bar */}
      <StickyBookingBar
        priceFrom={show.priceFrom}
        childPriceFrom={show.childPriceFrom}
        showName={show.name}
        isFeaturedPartner={show.isFeaturedPartner}
        externalUrl={show.externalUrl}
      />
    </>
  );
}
