import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Tag, Ticket, Users, Sparkles, Star } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Branson Discount Tickets & Deals 2026 | Save Big | ${siteConfig.name}`,
  description:
    "Find the best Branson discount tickets and deals for 2026. BOGO show offers, cheap Branson show tickets, attraction discounts, and family packages. Save on your Branson vacation.",
  keywords: [
    "branson discount tickets",
    "cheap branson show tickets",
    "branson deals",
    "branson coupons",
    "branson show deals",
    "branson vacation deals",
    "branson family packages",
  ],
  openGraph: {
    title: "Branson Discount Tickets & Deals 2026",
    description:
      "BOGO shows, discount tickets, and family packages. Save big on Branson entertainment.",
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

  // Best value attractions (lowest price with high rating)
  const valuAttractions = [...attractions]
    .sort((a, b) => a.adultPrice / a.rating - b.adultPrice / b.rating)
    .slice(0, 6);

  // Family packages (combine a show + attraction)
  const familyPackages = [
    {
      name: "Theme Park & Show Combo",
      description:
        "Silver Dollar City admission plus an evening show. A full day of Branson entertainment for the whole family.",
      items: ["Silver Dollar City", "The Haygoods"],
      originalPrice: 130,
      dealPrice: 109,
      savings: 21,
    },
    {
      name: "Aquarium & Dinner Show",
      description:
        "Explore the Aquarium at the Boardwalk then enjoy a dinner show. Perfect for families with young children.",
      items: ["Aquarium at the Boardwalk", "Dolly Parton's Stampede"],
      originalPrice: 100,
      dealPrice: 84,
      savings: 16,
    },
    {
      name: "Outdoor Adventure Package",
      description:
        "Ride the ducks and zip through the treetops. An action-packed day for thrill-seekers visiting Branson.",
      items: ["Ride the Ducks", "Shepherd of the Hills"],
      originalPrice: 70,
      dealPrice: 56,
      savings: 14,
    },
  ];

  const dealsSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Branson Discount Tickets & Deals 2026",
    description:
      "Discount show tickets, BOGO offers, and family packages for Branson, Missouri entertainment.",
    url: `${siteConfig.url}/deals`,
    numberOfItems: bogoShows.length + discountShows.length,
  };

  return (
    <>
      <JsonLd data={dealsSchema} />

      {/* Header */}
      <section className="bg-[#037B98] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Deals" },
            ]}
            className="mb-6"
          />
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F76E00] px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
              <Tag className="h-3 w-3" />
              Deals &amp; Savings
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Discount Tickets &amp; Deals 2026
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Save on the best shows and attractions in Branson. BOGO offers,
            discount tickets, family packages, and more.
          </p>
        </div>
      </section>

      {/* BOGO Shows */}
      {bogoShows.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Ticket className="h-6 w-6 text-[#F76E00]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] font-heading">
                BOGO &amp; Special Offers
              </h2>
            </div>
            <p className="text-[#333333]/60 mb-8 max-w-xl">
              Buy one, get one deals on select Branson shows. Limited-time
              offers — book now before they sell out.
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
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#F76E00] px-3 py-1 text-xs font-bold text-white shadow-lg">
                          <Tag className="h-3 w-3" />
                          BOGO
                        </span>
                      </div>
                      {/* Price */}
                      <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 backdrop-blur-md shadow-sm">
                        <span className="text-xs font-medium text-[#037B98]">
                          From
                        </span>
                        <span className="ml-1 text-lg font-bold text-[#333333]">
                          ${show.priceFrom}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#037B98] transition-colors">
                        {show.name}
                      </h3>
                      <p className="mt-1 text-sm text-[#333333]/60">
                        {show.theater}
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="w-4 h-4 fill-[#FB9219] text-[#FB9219]" />
                        <span className="text-sm font-semibold text-[#333333]">
                          {show.rating}
                        </span>
                        <span className="text-sm text-[#333333]/50">
                          ({show.reviewCount.toLocaleString()})
                        </span>
                      </div>
                      <div className="mt-3 space-y-1">
                        {show.specialOffers.map((offer, i) => (
                          <p
                            key={i}
                            className="text-sm font-semibold text-[#F76E00]"
                          >
                            {offer}
                          </p>
                        ))}
                      </div>
                      <button className="mt-4 w-full rounded-lg bg-[#018941] py-2.5 text-sm font-semibold text-white hover:bg-[#018941]/90 transition-colors">
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
      <section className="py-12 sm:py-16 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-6 w-6 text-[#037B98]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] font-heading">
              Lowest-Priced Show Tickets
            </h2>
          </div>
          <p className="text-[#333333]/60 mb-8 max-w-xl">
            Great entertainment doesn&apos;t have to break the bank. These
            top-rated shows offer the best value in Branson.
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
                    <div className="absolute bottom-3 right-3 rounded-xl bg-[#018941] px-3 py-1.5 shadow-lg">
                      <span className="text-xs font-medium text-white/80">
                        From
                      </span>
                      <span className="ml-1 text-lg font-bold text-white">
                        ${show.priceFrom}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#037B98] transition-colors">
                      {show.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#333333]/60 line-clamp-2">
                      {show.shortDescription}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FB9219] text-[#FB9219]" />
                      <span className="text-sm font-semibold text-[#333333]">
                        {show.rating}
                      </span>
                      <span className="text-sm text-[#333333]/50">
                        ({show.reviewCount.toLocaleString()})
                      </span>
                    </div>
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
            <Tag className="h-6 w-6 text-[#F76E00]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] font-heading">
              Top Attraction Deals
            </h2>
          </div>
          <p className="text-[#333333]/60 mb-8 max-w-xl">
            The best-value attractions in Branson — top-rated experiences at
            great prices.
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
                      <span className="rounded-full bg-[#F76E00] px-3 py-1 text-xs font-bold text-white">
                        Best Value
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 rounded-xl bg-[#005C73]/85 px-3 py-1.5 backdrop-blur-md">
                      <span className="text-xs font-medium text-white/80">
                        From
                      </span>
                      <span className="ml-1 text-lg font-bold text-white">
                        ${attr.adultPrice}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#333333] group-hover:text-[#037B98] transition-colors">
                      {attr.name}
                    </h3>
                    <p className="mt-1 text-sm text-[#333333]/60 line-clamp-2">
                      {attr.shortDescription}
                    </p>
                    <div className="mt-2 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-[#FB9219] text-[#FB9219]" />
                      <span className="text-sm font-semibold text-[#333333]">
                        {attr.rating}
                      </span>
                      <span className="text-sm text-[#333333]/50">
                        ({attr.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Family Packages */}
      <section className="py-12 sm:py-16 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-6 w-6 text-[#018941]" />
            <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] font-heading">
              Family Packages
            </h2>
          </div>
          <p className="text-[#333333]/60 mb-8 max-w-xl">
            Save when you bundle shows and attractions. These curated packages
            make planning your Branson trip easy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {familyPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-2xl bg-white border border-gray-100 shadow-md overflow-hidden"
              >
                <div className="bg-[#037B98] px-6 py-4">
                  <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-sm text-[#333333]/70 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="mt-4 space-y-2">
                    {pkg.items.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 text-sm"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#018941]" />
                        <span className="text-[#333333] font-medium">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 flex items-end gap-3">
                    <div>
                      <span className="text-sm text-[#333333]/50 line-through">
                        ${pkg.originalPrice}
                      </span>
                      <div className="text-3xl font-bold text-[#333333]">
                        ${pkg.dealPrice}
                      </div>
                    </div>
                    <span className="rounded-full bg-[#F76E00]/10 px-3 py-1 text-xs font-bold text-[#F76E00]">
                      Save ${pkg.savings}
                    </span>
                  </div>
                  <button className="mt-5 w-full rounded-lg bg-[#018941] py-3 text-sm font-semibold text-white hover:bg-[#018941]/90 transition-colors">
                    Book Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-[#005C73]">
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F76E00] text-white rounded-lg font-semibold hover:bg-[#C04E0C] transition-colors"
            >
              Call {siteConfig.phone}
            </a>
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#005C73] transition-all"
            >
              Browse All Shows
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
