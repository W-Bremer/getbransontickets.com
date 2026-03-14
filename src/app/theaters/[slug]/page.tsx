import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Phone,
  Globe,
  Users,
  Calendar,
  Star,
  ChevronRight,
  Armchair,
  Car,
  Accessibility,
  CheckCircle2,
} from "lucide-react";
import { theaters, getTheaterBySlug } from "@/data/theaters";
import { shows } from "@/data/shows";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RatingDisplay } from "@/components/rating-display";
import { ShowCard } from "@/components/show-card";
import { JsonLd } from "@/components/json-ld";

export async function generateStaticParams() {
  return theaters.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const theater = getTheaterBySlug(slug);
  if (!theater) return { title: "Theater Not Found" };

  return {
    title: `${theater.name} — Shows, Seating & Directions | ${siteConfig.name}`,
    description: `${theater.name} in Branson, MO — ${theater.shortDescription} ${theater.seatingCapacity} seats. See current shows, get directions, and book tickets.`,
    openGraph: {
      title: `${theater.name} — Branson Theater Guide`,
      description: theater.shortDescription,
      url: `${siteConfig.url}/theaters/${theater.slug}`,
      type: "website",
      siteName: siteConfig.name,
      images: [{ url: theater.imageUrl, width: 800, height: 500 }],
    },
  };
}

export default async function TheaterDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const theater = getTheaterBySlug(slug);
  if (!theater) notFound();

  const theaterShows = shows.filter(
    (s) =>
      theater.showSlugs.includes(s.slug) ||
      s.theater.toLowerCase() === theater.name.toLowerCase()
  );

  const otherTheaters = theaters
    .filter((t) => t.slug !== theater.slug)
    .slice(0, 3);

  const theaterSchema = {
    "@context": "https://schema.org",
    "@type": "PerformingArtsTheater",
    name: theater.name,
    description: theater.description,
    url: theater.website,
    image: theater.imageUrl,
    telephone: theater.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: theater.address.split(",")[0],
      addressLocality: "Branson",
      addressRegion: "MO",
      postalCode: "65616",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: theater.rating,
      reviewCount: theater.reviewCount,
      bestRating: 5,
    },
  };

  return (
    <>
      <JsonLd data={theaterSchema} />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={theater.imageUrl}
          alt={theater.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Theaters", href: "/theaters" },
                { label: theater.name },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0f172a] font-heading">
                {theater.name}
              </h1>
              <p className="mt-3 text-xl text-[#d4a843] font-medium">
                {theater.tagline}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <RatingDisplay
                  rating={theater.rating}
                  reviewCount={theater.reviewCount}
                />
              </div>

              {/* Quick Facts */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Armchair className="w-5 h-5 text-[#d4a843]" />
                  <div>
                    <div className="text-xs text-gray-500">Capacity</div>
                    <div className="font-semibold text-[#0f172a]">
                      {theater.seatingCapacity.toLocaleString()} seats
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <MapPin className="w-5 h-5 text-[#d4a843]" />
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="font-semibold text-[#0f172a] text-sm">
                      {theater.address.includes("76 Country")
                        ? "76 Strip"
                        : theater.address.includes("Shepherd")
                        ? "Shepherd of the Hills"
                        : theater.address.includes("Commercial")
                        ? "Downtown"
                        : "Branson"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Calendar className="w-5 h-5 text-[#d4a843]" />
                  <div>
                    <div className="text-xs text-gray-500">Established</div>
                    <div className="font-semibold text-[#0f172a]">
                      {theater.yearBuilt}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50">
                  <Star className="w-5 h-5 text-[#d4a843] fill-[#d4a843]" />
                  <div>
                    <div className="text-xs text-gray-500">Rating</div>
                    <div className="font-semibold text-[#0f172a]">
                      {theater.rating} / 5.0
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-[#0f172a] font-heading mb-4">
                  About {theater.name}
                </h2>
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p>{theater.description}</p>
                </div>
              </div>

              {/* Features */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-[#0f172a] font-heading mb-4">
                  Theater Features
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {theater.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parking & Accessibility */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Car className="w-5 h-5 text-[#d4a843]" />
                    <h3 className="font-semibold text-[#0f172a]">Parking</h3>
                  </div>
                  <p className="text-sm text-gray-600">{theater.parking}</p>
                </div>
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                  <div className="flex items-center gap-2 mb-3">
                    <Accessibility className="w-5 h-5 text-[#d4a843]" />
                    <h3 className="font-semibold text-[#0f172a]">Accessibility</h3>
                  </div>
                  <p className="text-sm text-gray-600">{theater.accessibility}</p>
                </div>
              </div>

              {/* Gallery */}
              {theater.galleryImages.length > 0 && (
                <div className="mt-10">
                  <h2 className="text-2xl font-bold text-[#0f172a] font-heading mb-4">
                    Photo Gallery
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {theater.galleryImages.map((img, i) => (
                      <div
                        key={i}
                        className="relative h-56 rounded-xl overflow-hidden"
                      >
                        <Image
                          src={img.url}
                          alt={img.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Location */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-[#0f172a] font-heading mb-4">
                  Location & Directions
                </h2>
                <div className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="font-semibold text-[#0f172a]">{theater.name}</p>
                  <p className="text-gray-600 mt-1">{theater.address}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      theater.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[#d4a843] hover:text-[#b8922e] font-medium text-sm"
                  >
                    Get Directions on Google Maps{" "}
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="mt-10 lg:mt-0">
              <div className="sticky top-24 space-y-6">
                {/* Contact Card */}
                <div className="rounded-2xl border border-gray-200 shadow-lg p-6 bg-white">
                  <h3 className="text-lg font-bold text-[#0f172a] font-heading mb-4">
                    Contact & Info
                  </h3>
                  <div className="space-y-4">
                    <a
                      href={`tel:${theater.phone.replace(/[^0-9]/g, "")}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-[#d4a843] transition-colors"
                    >
                      <Phone className="w-5 h-5 text-[#d4a843]" />
                      <span className="font-medium">{theater.phone}</span>
                    </a>
                    <a
                      href={theater.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-700 hover:text-[#d4a843] transition-colors"
                    >
                      <Globe className="w-5 h-5 text-[#d4a843]" />
                      <span className="font-medium">Official Website</span>
                    </a>
                    <div className="flex items-start gap-3 text-gray-700">
                      <MapPin className="w-5 h-5 text-[#d4a843] shrink-0 mt-0.5" />
                      <span className="text-sm">{theater.address}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link
                      href="/shows"
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#d4a843] text-white rounded-xl font-semibold hover:bg-[#b8922e] transition-colors"
                    >
                      Book Show Tickets
                    </Link>
                  </div>
                  <div className="mt-3">
                    <Link
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#0f172a] text-[#0f172a] rounded-xl font-semibold hover:bg-[#0f172a] hover:text-white transition-all"
                    >
                      Call {siteConfig.phone}
                    </Link>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="rounded-2xl border border-gray-200 p-6 bg-white">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                    Theater Details
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Seating Capacity</span>
                      <span className="font-medium text-[#0f172a]">
                        {theater.seatingCapacity.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Established</span>
                      <span className="font-medium text-[#0f172a]">
                        {theater.yearBuilt}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shows Playing</span>
                      <span className="font-medium text-[#0f172a]">
                        {theaterShows.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <span className="flex items-center gap-1 font-medium text-[#0f172a]">
                        <Star className="w-3.5 h-3.5 text-[#d4a843] fill-[#d4a843]" />
                        {theater.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shows at This Theater */}
          {theaterShows.length > 0 && (
            <div className="mt-16 pt-12 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-[#0f172a] font-heading mb-2">
                Shows at {theater.name}
              </h2>
              <p className="text-gray-600 mb-8">
                {theaterShows.length} show
                {theaterShows.length !== 1 ? "s" : ""} currently performing at
                this theater.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {theaterShows.map((show, index) => (
                  <ShowCard key={show.slug} show={show} index={index} />
                ))}
              </div>
            </div>
          )}

          {/* Other Theaters */}
          <div className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-[#0f172a] font-heading mb-8">
              Explore More Branson Theaters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherTheaters.map((t) => (
                <Link
                  key={t.slug}
                  href={`/theaters/${t.slug}`}
                  className="group rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={t.imageUrl}
                      alt={t.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#0f172a] group-hover:text-[#d4a843] transition-colors">
                      {t.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {t.seatingCapacity.toLocaleString()} seats
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
