import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  MapPin,
  Star,
  Phone,
  ExternalLink,
  CheckCircle2,
  Clock,
} from "lucide-react";
import {
  attractions,
  getAttractionBySlug,
  getRelatedAttractions,
} from "@/data/attractions";
import { getShowBySlug } from "@/data/shows";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { QuickInfoBar } from "@/components/quick-info-bar";
import { TicketPricingTable } from "@/components/ticket-pricing-table";
import { PhotoGallery } from "@/components/photo-gallery";
import { FAQSection } from "@/components/faq-section";

export async function generateStaticParams() {
  return attractions.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const attraction = getAttractionBySlug(slug);
  if (!attraction) return { title: "Attraction Not Found" };

  const primaryKeyword = attraction.targetKeywords[0] || attraction.name;

  return {
    title: `${attraction.name} Branson 2026 | Tickets from $${attraction.adultPrice} | ${siteConfig.name}`,
    description: `${attraction.shortDescription} Tickets from $${attraction.adultPrice}. Rated ${attraction.rating}/5 stars (${attraction.reviewCount.toLocaleString()} reviews). Hours, pricing, photos & FAQs.`,
    keywords: attraction.targetKeywords,
    openGraph: {
      title: `${attraction.name} Branson 2026 | Tickets & Info`,
      description: `Visit ${attraction.name} in Branson, MO. ${attraction.shortDescription}`,
      url: `${siteConfig.url}/attractions/${attraction.slug}`,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: attraction.imageUrl,
          width: 800,
          height: 500,
          alt: attraction.imageAlt,
        },
      ],
    },
  };
}

export default async function AttractionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const attraction = getAttractionBySlug(slug);
  if (!attraction) notFound();

  const related = getRelatedAttractions(slug, 3);

  const relatedShows = attraction.relatedShowSlugs
    .map((s) => getShowBySlug(s))
    .filter(Boolean);

  // Build price range string
  const prices = [attraction.adultPrice, attraction.childPrice];
  if (attraction.seniorPrice) prices.push(attraction.seniorPrice);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange =
    minPrice === maxPrice ? `$${minPrice}` : `$${minPrice} - $${maxPrice}`;

  // Primary hours display
  const primaryHours = attraction.hours[0];
  const hoursDisplay = primaryHours
    ? `${primaryHours.days}: ${primaryHours.hours}`
    : "See website";

  // JSON-LD schemas
  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.name,
    description: attraction.description,
    url: `${siteConfig.url}/attractions/${attraction.slug}`,
    image: attraction.imageUrl,
    telephone: attraction.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: attraction.address,
      addressLocality: "Branson",
      addressRegion: "MO",
      postalCode: "65616",
      addressCountry: "US",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: attraction.rating,
      reviewCount: attraction.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    geo: {
      "@type": "GeoCoordinates",
      url: attraction.mapUrl,
    },
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${attraction.name} Tickets`,
    description: attraction.shortDescription,
    image: attraction.imageUrl,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: minPrice,
      highPrice: maxPrice,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/attractions/${attraction.slug}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: attraction.rating,
      reviewCount: attraction.reviewCount,
      bestRating: 5,
    },
  };

  // Split description into paragraphs for richer content
  const descParagraphs = attraction.description
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .reduce<string[]>((acc, sentence, i) => {
      const pIdx = Math.floor(i / 3);
      if (!acc[pIdx]) acc[pIdx] = "";
      acc[pIdx] += (acc[pIdx] ? " " : "") + sentence;
      return acc;
    }, []);

  const galleryImages = attraction.galleryImages.map((src, i) => ({
    src,
    alt: `${attraction.name} photo ${i + 1}`,
  }));

  return (
    <>
      <JsonLd data={touristAttractionSchema} />
      <JsonLd data={productSchema} />

      {/* Hero */}
      <div className="relative h-[45vh] min-h-[350px]">
        <Image
          src={attraction.imageUrl}
          alt={attraction.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#005C73] via-[#005C73]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 pb-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Attractions", href: "/attractions" },
                { label: attraction.name },
              ]}
              className="mb-4"
            />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
              {attraction.name}
            </h1>
            <p className="mt-2 text-lg text-[#FB9219] font-medium">
              {attraction.tagline}
            </p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(attraction.rating)
                        ? "fill-[#FB9219] text-[#FB9219]"
                        : "text-white/30"
                    }`}
                  />
                ))}
              </div>
              <span className="text-white font-semibold">
                {attraction.rating}
              </span>
              <span className="text-white/70">
                ({attraction.reviewCount.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <QuickInfoBar
            hours={hoursDisplay}
            priceRange={priceRange}
            location="Branson, MO"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <section>
                <h2 className="text-2xl font-bold text-[#333333] font-heading mb-4">
                  About {attraction.name}
                </h2>
                <div className="prose prose-lg max-w-none text-[#333333]/80">
                  {descParagraphs.map((p, i) => (
                    <p key={i} className="mb-4 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </section>

              {/* Ticket Pricing */}
              <section>
                <h2 className="text-2xl font-bold text-[#333333] font-heading mb-4">
                  Ticket Prices
                </h2>
                <TicketPricingTable
                  showName={attraction.name}
                  adultPrice={attraction.adultPrice}
                  childPrice={attraction.childPrice}
                  seniorPrice={attraction.seniorPrice}
                />
              </section>

              {/* Photo Gallery */}
              {galleryImages.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#333333] font-heading mb-4">
                    Photos
                  </h2>
                  <PhotoGallery images={galleryImages} />
                </section>
              )}

              {/* Hours */}
              {attraction.hours.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#333333] font-heading mb-4">
                    Hours of Operation
                  </h2>
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#037B98]/5 border-b border-gray-200">
                          <th className="px-5 py-3 text-sm font-semibold text-[#333333]">
                            Season
                          </th>
                          <th className="px-5 py-3 text-sm font-semibold text-[#333333]">
                            Days
                          </th>
                          <th className="px-5 py-3 text-sm font-semibold text-[#333333]">
                            Hours
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {attraction.hours.map((h, i) => (
                          <tr
                            key={i}
                            className={
                              i < attraction.hours.length - 1
                                ? "border-b border-gray-100"
                                : ""
                            }
                          >
                            <td className="px-5 py-3.5 font-medium text-[#333333]">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#037B98]" />
                                {h.season}
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-sm text-[#333333]/70">
                              {h.days}
                            </td>
                            <td className="px-5 py-3.5 text-sm font-medium text-[#333333]">
                              {h.hours}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* Features */}
              {attraction.features.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#333333] font-heading mb-4">
                    Features &amp; Highlights
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {attraction.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3 rounded-lg bg-[#F5F5F5] p-3"
                      >
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#018941]" />
                        <span className="text-sm font-medium text-[#333333]">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs */}
              {attraction.faqs.length > 0 && (
                <FAQSection
                  faqs={attraction.faqs}
                  title={`${attraction.name} — Frequently Asked Questions`}
                />
              )}

              {/* Location */}
              <section>
                <h2 className="text-2xl font-bold text-[#333333] font-heading mb-4">
                  Location &amp; Contact
                </h2>
                <div className="rounded-xl bg-[#F5F5F5] p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-[#F76E00]" />
                    <div>
                      <p className="font-semibold text-[#333333]">
                        {attraction.name}
                      </p>
                      <p className="text-sm text-[#333333]/70">
                        {attraction.address}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-[#037B98]" />
                    <a
                      href={`tel:${attraction.phone.replace(/[^0-9+]/g, "")}`}
                      className="text-sm font-medium text-[#037B98] hover:underline"
                    >
                      {attraction.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <ExternalLink className="h-5 w-5 text-[#037B98]" />
                    <a
                      href={attraction.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[#037B98] hover:underline"
                    >
                      Official Website
                    </a>
                  </div>
                  <a
                    href={attraction.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[#F76E00] hover:text-[#C04E0C] font-semibold text-sm transition-colors"
                  >
                    Get Directions &rarr;
                  </a>
                </div>
              </section>

              {/* Related Shows */}
              {relatedShows.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#333333] font-heading mb-6">
                    Related Shows
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {relatedShows.map((show) =>
                      show ? (
                        <Link
                          key={show.slug}
                          href={`/shows/${show.slug}`}
                          className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:shadow-md hover:border-[#037B98]/30"
                        >
                          <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={show.imageUrl}
                              alt={show.imageAlt}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                              sizes="112px"
                            />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-[#333333] group-hover:text-[#037B98] transition-colors truncate">
                              {show.name}
                            </h3>
                            <p className="mt-0.5 text-sm text-[#333333]/60 line-clamp-1">
                              {show.theater}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-[#F76E00]">
                              From ${show.priceFrom}
                            </p>
                          </div>
                        </Link>
                      ) : null
                    )}
                  </div>
                </section>
              )}

              {/* Related Attractions */}
              {related.length > 0 && (
                <section>
                  <h2 className="text-2xl font-bold text-[#333333] font-heading mb-6">
                    Related Attractions
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {related.map((r) => (
                      <Link
                        key={r.slug}
                        href={`/attractions/${r.slug}`}
                        className="group rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden hover:shadow-lg transition-all"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={r.imageUrl}
                            alt={r.imageAlt}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-[#333333] group-hover:text-[#037B98] transition-colors">
                            {r.name}
                          </h3>
                          <p className="mt-1 text-sm text-[#333333]/60 line-clamp-2">
                            {r.shortDescription}
                          </p>
                          <span className="mt-2 inline-block text-sm font-semibold text-[#F76E00]">
                            From ${r.adultPrice}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="mt-10 lg:mt-0">
              <div className="sticky top-24 space-y-6">
                {/* Booking Card */}
                <div className="rounded-2xl border border-gray-200 shadow-lg p-6 bg-white">
                  <div className="text-center">
                    <span className="text-sm text-[#333333]/60">
                      Tickets from
                    </span>
                    <div className="text-4xl font-bold text-[#333333] mt-1">
                      ${Math.min(attraction.adultPrice, attraction.childPrice)}
                    </div>
                    <span className="text-sm text-[#333333]/50">per person</span>
                  </div>

                  <div className="mt-6">
                    <button className="w-full py-4 bg-[#018941] hover:bg-[#018941]/90 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg cursor-pointer">
                      Get Tickets
                    </button>
                  </div>
                  <div className="mt-3">
                    <Link
                      href={`tel:${siteConfig.phoneRaw}`}
                      className="w-full flex items-center justify-center gap-2 py-3 border-2 border-[#037B98] text-[#037B98] rounded-xl font-semibold hover:bg-[#037B98] hover:text-white transition-all"
                    >
                      Call {siteConfig.phone}
                    </Link>
                  </div>

                  <div className="mt-6 space-y-3 text-sm">
                    <div className="flex justify-between text-[#333333]/70">
                      <span>Rating</span>
                      <span className="flex items-center gap-1 font-medium text-[#333333]">
                        <Star className="w-4 h-4 fill-[#FB9219] text-[#FB9219]" />
                        {attraction.rating} (
                        {attraction.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    <div className="flex justify-between text-[#333333]/70">
                      <span>Type</span>
                      <span className="font-medium text-[#333333] capitalize">
                        {attraction.type.replace("-", " ")}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#333333]/70">
                      <span>Adult</span>
                      <span className="font-medium text-[#333333]">
                        ${attraction.adultPrice}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#333333]/70">
                      <span>Child</span>
                      <span className="font-medium text-[#333333]">
                        ${attraction.childPrice}
                      </span>
                    </div>
                    {attraction.seniorPrice && (
                      <div className="flex justify-between text-[#333333]/70">
                        <span>Senior</span>
                        <span className="font-medium text-[#333333]">
                          ${attraction.seniorPrice}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-xl bg-[#F5F5F5] p-4 space-y-2">
                  <a
                    href={attraction.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[#037B98] hover:text-[#005C73] transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Official Website
                  </a>
                  <a
                    href={attraction.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[#037B98] hover:text-[#005C73] transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    View on Map
                  </a>
                  <a
                    href={`tel:${attraction.phone.replace(/[^0-9+]/g, "")}`}
                    className="flex items-center gap-2 text-sm font-medium text-[#037B98] hover:text-[#005C73] transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    {attraction.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
