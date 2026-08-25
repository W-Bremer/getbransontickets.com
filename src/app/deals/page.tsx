import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Tag, Ticket, Sparkles } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Branson Discount Tickets & Deals 2026`,
  alternates: { canonical: "/deals" },
  description:
    "Find Branson discount tickets and deals for 2026. Current theater offers, BOGO deals on select shows, and the lowest-priced shows and attractions.",
  keywords: [
    "branson discount tickets",
    "cheap branson show tickets",
    "branson deals",
    "branson show deals",
  ],
  openGraph: {
    title: "Branson Discount Tickets & Deals 2026",
    description:
      "Current theater offers, BOGO deals on select shows, and the lowest-priced shows and attractions in Branson.",
    url: `${siteConfig.url}/deals`,
    type: "website",
    siteName: siteConfig.name,
  },
};

export default function DealsPage() {
  // BOGO shows
  const bogoShows = shows.filter((s) =>
    s.specialOffers.some((o) => o.toLowerCase().includes("bogo"))
  );

  // Cheapest shows
  const discountShows = [...shows]
    .sort((a, b) => a.priceFrom - b.priceFrom)
    .slice(0, 6);

  // Lowest-priced attractions by adult ticket. The old sort divided price by
  // attraction.rating, an invented value from the original build.
  const valuAttractions = [...attractions]
    .sort((a, b) => a.adultPrice - b.adultPrice)
    .slice(0, 6);

  const dealsSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Branson Discount Tickets & Deals 2026",
    description:
      "Discount show tickets and current theater offers for Branson, Missouri entertainment.",
    url: `${siteConfig.url}/deals`,
    numberOfItems: bogoShows.length + discountShows.length,
  };

  return (
    <>
      <JsonLd data={dealsSchema} />

      {/* Header */}
      <section className="bg-[#13264D] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Deals" },
            ]}
            className="mb-6"
          />
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E8C65A] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              <Tag className="h-3 w-3" />
              Deals &amp; Savings
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Discount Tickets &amp; Deals 2026
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Save on shows and attractions in Branson. Current theater offers,
            the lowest-priced show tickets, and the lowest-priced attractions.
          </p>
        </div>
      </section>

      {/* BOGO Shows */}
      {bogoShows.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Ticket className="h-6 w-6 text-[#E8C65A]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1614] font-heading">
                BOGO &amp; Special Offers
              </h2>
            </div>
            <p className="text-[#1A1614]/60 mb-8 max-w-xl">
              Buy one, get one offers on select Branson shows. Offers are set
              by each theater and can change, so check the show page for
              current dates and details.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bogoShows.map((show) => (
                <Link
                  key={show.slug}
                  href={`/shows/${show.slug}`}
                  className="group"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={show.imageUrl}
                        alt={show.imageAlt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      {/* BOGO Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#E8C65A] px-3 py-1 text-xs font-bold text-white shadow-lg">
                          <Tag className="h-3 w-3" />
                          BOGO
                        </span>
                      </div>
                      {/* Price */}
                      <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 backdrop-blur-md shadow-sm">
                        <span className="text-xs font-medium text-[#13264D]">
                          From
                        </span>
                        <span className="ml-1 text-lg font-bold text-[#1A1614]">
                          ${show.priceFrom}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#1A1614] group-hover:text-[#13264D] transition-colors">
                        {show.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#1A1614]/60">
                        {show.theater}
                      </p>
                      <div className="mt-3 space-y-1">
                        {show.specialOffers.map((offer, i) => (
                          <p
                            key={i}
                            className="text-sm font-semibold text-[#E8C65A]"
                          >
                            {offer}
                          </p>
                        ))}
                      </div>
                      <button className="mt-4 w-full rounded-lg bg-[#C8102E] py-2.5 text-sm font-semibold text-white hover:bg-[#C8102E]/90 transition-colors">
                        View Deal
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Discount Show Tickets */}
      <section className="py-12 sm:py-16 bg-[#F6F4EF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-[#13264D]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1614] font-heading">
              Lowest-Priced Show Tickets
            </h2>
          </div>
          <p className="text-[#1A1614]/60 mb-8 max-w-xl">
            Great entertainment doesn&apos;t have to break the bank. These
            shows have the lowest ticket prices in Branson.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {discountShows.map((show) => (
              <Link
                key={show.slug}
                href={`/shows/${show.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={show.imageUrl}
                      alt={show.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    {/* Price badge */}
                    <div className="absolute bottom-3 right-3 rounded-xl bg-[#C8102E] px-3 py-1.5 shadow-lg">
                      <span className="text-xs font-medium text-white/80">
                        From
                      </span>
                      <span className="ml-1 text-lg font-bold text-white">
                        ${show.priceFrom}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1A1614] group-hover:text-[#13264D] transition-colors">
                      {show.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#1A1614]/60 line-clamp-2">
                      {show.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Attraction Deals */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="h-6 w-6 text-[#E8C65A]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1614] font-heading">
              Lowest-Priced Attractions
            </h2>
          </div>
          <p className="text-[#1A1614]/60 mb-8 max-w-xl">
            The lowest-priced attractions in Branson, ranked by adult ticket
            price.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuAttractions.map((attr) => (
              <Link
                key={attr.slug}
                href={`/attractions/${attr.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md border border-gray-100 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={attr.imageUrl}
                      alt={attr.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="rounded-full bg-[#E8C65A] px-3 py-1 text-xs font-bold text-white">
                        Low Price
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-xl bg-[#0D1B38]/85 px-3 py-1.5 backdrop-blur-md">
                      <span className="text-xs font-medium text-white/80">
                        From
                      </span>
                      <span className="ml-1 text-lg font-bold text-white">
                        ${attr.adultPrice}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1A1614] group-hover:text-[#13264D] transition-colors">
                      {attr.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#1A1614]/60 line-clamp-2">
                      {attr.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#0D1B38]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Need Help Finding the Best Deal?
          </h2>
          <p className="mt-4 text-white/70">
            Call our Branson experts and we will help you find the best tickets
            at the best prices for your trip.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#E8C65A] text-white rounded-lg font-semibold hover:bg-[#C04E0C] transition-colors"
            >
              Call {siteConfig.phone}
            </a>
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#0D1B38] transition-all"
            >
              Browse All Shows
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
