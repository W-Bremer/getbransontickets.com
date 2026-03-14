import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, MapPin, Users, CalendarDays, UtensilsCrossed, Star, Tag, ChevronRight, Phone } from "lucide-react";
import { shows, getShowBySlug } from "@/data/shows";
import { theaters } from "@/data/theaters";
import { siteConfig } from "@/lib/config";
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
    title: `${show.name} Branson Tickets 2026 | Discount Tickets & Schedule | ${siteConfig.name}`,
    description: `Get ${show.name} tickets in Branson, MO. ${show.shortDescription} Book online & save! ★ ${show.rating} rated. Tickets from $${show.priceFrom}.`,
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

  const relatedShows = show.relatedShows
    .map((s) => getShowBySlug(s))
    .filter(Boolean)
    .slice(0, 3);

  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: show.name,
    description: show.shortDescription,
    url: `${siteConfig.url}/shows/${show.slug}`,
    image: show.imageUrl,
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
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: show.rating,
      reviewCount: show.reviewCount,
      bestRating: 5,
    },
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#7B1A1A] via-[#5A1212]/50 to-transparent" />
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
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8B6914] text-white text-sm font-medium"
                >
                  <Tag className="w-3 h-3" />
                  {offer}
                </span>
              ))}
              {show.mealIncluded && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#D4A843] text-white text-sm font-medium">
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
                        ? "text-[#D4A843] fill-[#D4A843]"
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
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF8F5]">
                  <Clock className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <div className="text-xs text-gray-500">Duration</div>
                    <div className="font-semibold text-[#333333]">{show.duration}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF8F5]">
                  <MapPin className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <div className="text-xs text-gray-500">Theater</div>
                    <div className="font-semibold text-[#333333] text-sm">{show.theater}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF8F5]">
                  <Users className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <div className="text-xs text-gray-500">Ages</div>
                    <div className="font-semibold text-[#333333]">{show.ageRecommendation}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-[#FAF8F5]">
                  <CalendarDays className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <div className="text-xs text-gray-500">Season</div>
                    <div className="font-semibold text-[#333333]">
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

            {/* Sidebar -- Booking Widget */}
            <div className="mt-10 lg:mt-0">
              <div id="booking-widget" className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-gray-200 shadow-lg bg-white overflow-hidden">
                  <div className="bg-[#7B1A1A] px-6 py-4">
                    <PriceDisplay priceFrom={show.priceFrom} priceTo={show.priceTo} variant="light" />
                  </div>
                  <div className="p-1">
                    <BookingWidget
                      showId={show.slug}
                      showName={show.name}
                      pricePerAdult={show.priceFrom}
                      pricePerChild={Math.round(show.priceFrom * 0.6)}
                      imageUrl={show.imageUrl}
                      showTimes={show.showTimes}
                    />
                  </div>
                </div>

                {/* Call to book */}
                <Link
                  href={`tel:${siteConfig.phoneRaw}`}
                  className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#7B1A1A] text-[#7B1A1A] rounded-xl font-semibold hover:bg-[#7B1A1A] hover:text-white transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call {siteConfig.phone}
                </Link>

                {/* Sidebar quick info */}
                <div className="rounded-xl border border-gray-200 p-5 bg-white space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Rating</span>
                    <span className="flex items-center gap-1 font-medium text-[#333333]">
                      <Star className="w-4 h-4 text-[#D4A843] fill-[#D4A843]" />
                      {show.rating} ({show.reviewCount.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Duration</span>
                    <span className="font-medium text-[#333333]">{show.duration}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Show Times</span>
                    <span className="font-medium text-[#333333]">
                      {show.showTimes.join(", ")}
                    </span>
                  </div>
                  {show.mealIncluded && (
                    <div className="flex justify-between text-gray-600">
                      <span>Meal</span>
                      <span className="font-medium text-[#8B6914]">{show.mealType} Included</span>
                    </div>
                  )}
                </div>

                {show.specialOffers.length > 0 && (
                  <div className="p-4 rounded-lg bg-[#8B6914]/10 border border-[#8B6914]/20">
                    <p className="text-sm font-semibold text-[#8B6914]">Special Offers</p>
                    {show.specialOffers.map((offer) => (
                      <p key={offer} className="text-sm text-[#8B6914]/80 mt-1">
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
              <h2 className="text-2xl font-bold text-[#333333] font-heading mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedShows.map((related, index) => (
                  <ShowCard key={related!.slug} show={related!} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky mobile booking bar */}
      <StickyBookingBar priceFrom={show.priceFrom} showName={show.name} />
    </>
  );
}
