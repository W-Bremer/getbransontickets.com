import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Users, CalendarDays, UtensilsCrossed, Star, Tag, ChevronRight, Phone, ExternalLink } from "lucide-react";
import { shows, getShowBySlug, getPartnerShows } from "@/data/shows";
import { theaters } from "@/data/theaters";
import { siteConfig } from "@/lib/config";
import { getSeasonDates } from "@/lib/season";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RatingDisplay } from "@/components/rating-display";
import { PriceDisplay } from "@/components/price-display";
import { ShowCard } from "@/components/show-card";
import { JsonLd } from "@/components/json-ld";
import BookingWidget from "@/components/booking-widget";
import StickyBookingBar from "@/components/sticky-booking-bar";
import { ShowDetailClient } from "./show-detail-client";

export async function generateStaticParams() {
  return shows.map((show) => ({ slug: show.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const show = getShowBySlug(slug);
  if (!show) return { title: "Show Not Found" };

  return {
    title: `${show.name} Branson Tickets 2026 | Discount Tickets & Schedule`,
    description: `Get ${show.name} tickets in Branson, MO. ${show.shortDescription} Book online & save! ★ ${show.rating} rated. Tickets from $${show.priceFrom}.`,
    alternates: { canonical: `${siteConfig.url}/shows/${show.slug}` },
    openGraph: {
      title: `${show.name} Branson Tickets 2026 | Discount Tickets & Schedule`,
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

  const eventSchema = {
    "@context": "https://schema.org",
    // startDate is required for Event rich results; without it the whole
    // block is ignored by Google.
    "@type": "Event",
    name: show.name,
    description: show.shortDescription,
    url: `${siteConfig.url}/shows/${show.slug}`,
    image: show.imageUrl,
    ...(season ? { startDate: season.startDate, endDate: season.endDate } : {}),
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
      price: show.priceFrom,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/shows/${show.slug}`,
      ...(season ? { validFrom: season.startDate } : {}),
    },
    performer: {
      "@type": "PerformingGroup",
      name: show.name,
    },
  };

  const ratingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${show.name} Tickets`,
    description: show.shortDescription,
    image: show.imageUrl,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: show.priceFrom,
      highPrice: show.priceTo,
      priceCurrency: "USD",
    },
  };

  return (
    <>
      <JsonLd data={eventSchema} />
      <JsonLd data={ratingSchema} />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={show.imageUrl}
          alt={show.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#13264D] via-[#0D1B38]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Shows", href: "/shows" },
                { label: show.name },
              ]}
            />
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {show.specialOffers.map((offer) => (
                <span
                  key={offer}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#C8102E] text-white text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {offer}
                </span>
              ))}
              {show.mealIncluded && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E8C65A] text-white text-sm font-medium">
                  <UtensilsCrossed className="w-3 h-3" />
                  {show.mealType} Included
                </span>
              )}
              {show.isNew2026 && (
                <span className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm">
                  New for 2026!
                </span>
              )}
            </div>
            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading drop-shadow-md">
              {show.name}
            </h1>
            <p className="mt-2 text-lg text-white/90 font-medium">{show.tagline}</p>
            <div className="mt-3 flex items-center gap-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(show.rating)
                        ? "text-[#E8C65A] fill-[#E8C65A]"
                        : "text-white/40"
                    }`}
                  />
                ))}
                <span className="ml-2 text-white font-semibold">
                  {show.rating} ({show.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
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
                      {show.seasonStart} – {show.seasonEnd}
                    </div>
                  </div>
                </div>
              </div>

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
                  seasonStart: show.seasonStart,
                  seasonEnd: show.seasonEnd,
                  priceFrom: show.priceFrom,
                  priceTo: show.priceTo,
                  rating: show.rating,
                  reviewCount: show.reviewCount,
                  specialOffers: show.specialOffers,
                  mealIncluded: show.mealIncluded,
                  mealType: show.mealType,
                  faqs: show.faqs,
                  category: show.category,
                }}
                theaterSlug={showTheater?.slug}
              />
            </div>

            {/* Sidebar */}
            <div className="mt-10 lg:mt-0">
              <div id="booking-widget" className="sticky top-24 space-y-6">
                {show.isFeaturedPartner ? (
                  <>
                    <div className="rounded-2xl border border-gray-200 shadow-lg bg-white overflow-hidden">
                      <div className="bg-[#13264D] px-6 py-4">
                        <PriceDisplay priceFrom={show.priceFrom} priceTo={show.priceTo} variant="light" />
                      </div>
                      <div className="p-1">
                        <BookingWidget
                          showId={show.slug}
                          showName={show.name}
                          pricePerAdult={show.priceFrom}
                          pricePerChild={show.childPriceFrom ?? Math.round(show.priceFrom * 0.6)}
                          imageUrl={show.imageUrl}
                          showTimes={show.showTimes}
                        />
                      </div>
                    </div>

                    {/* Call to book */}
                    <Link
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#13264D] text-[#13264D] rounded-xl font-semibold hover:bg-[#13264D] hover:text-white transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Call {siteConfig.phone}
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
                            className="w-full flex items-center justify-center gap-2 py-3 bg-[#d4a843] text-white rounded-xl font-semibold hover:bg-[#b8922e] transition-colors"
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

                {/* Sidebar quick info */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Rating</span>
                    <span className="flex items-center gap-1 font-medium text-[#1A1614]">
                      <Star className="w-4 h-4 text-[#E8C65A] fill-[#E8C65A]" />
                      {show.rating} ({show.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Duration</span>
                    <span className="font-medium text-[#1A1614]">{show.duration}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Show Times</span>
                    <span className="font-medium text-[#1A1614]">
                      {show.showTimes.join(", ")}
                    </span>
                  </div>
                  {show.scheduleNote && (
                    <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">
                      {show.scheduleNote}
                    </p>
                  )}
                  {show.mealIncluded && (
                    <div className="flex justify-between text-gray-600">
                      <span>Meal</span>
                      <span className="font-medium text-[#C8102E]">{show.mealType} Included</span>
                    </div>
                  )}
                </div>

                {show.specialOffers.length > 0 && (
                  <div className="p-4 rounded-lg bg-[#C8102E]/10 border border-[#C8102E]/20">
                    <p className="text-sm font-semibold text-[#C8102E]">Special Offers</p>
                    {show.specialOffers.map((offer) => (
                      <p key={offer} className="text-sm text-[#C8102E]/80 mt-1">
                        {offer}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

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

      {/* Sticky mobile booking bar */}
      <StickyBookingBar priceFrom={show.priceFrom} showName={show.name} isFeaturedPartner={show.isFeaturedPartner} externalUrl={show.externalUrl} />
    </>
  );
}
