import type { Metadata } from "next";
import { siteConfig, attractionTypes } from "@/lib/config";
import { attractions } from "@/data/attractions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { AttractionsFilterClient } from "./attractions-filter-client";

export const metadata: Metadata = {
  title: `Branson Attractions & Things to Do 2026 | ${siteConfig.name}`,
  description:
    "Discover the best Branson attractions for 2026. Theme parks, museums, outdoor adventures, water parks & more. Find tickets, hours, and reviews for top things to do in Branson, Missouri.",
  keywords: [
    "branson attractions",
    "things to do in branson",
    "branson things to do",
    "branson missouri attractions",
    "branson theme parks",
    "branson activities",
  ],
  openGraph: {
    title: "Branson Attractions & Things to Do 2026",
    description:
      "Discover the best Branson attractions. Theme parks, museums, outdoor adventures, water parks & family fun.",
    url: `${siteConfig.url}/attractions`,
    type: "website",
    siteName: siteConfig.name,
  },
};

export default function AttractionsPage() {
  const collectionsSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Branson Attractions & Things to Do 2026",
    description:
      "Comprehensive guide to the best attractions and things to do in Branson, Missouri for 2026.",
    url: `${siteConfig.url}/attractions`,
    numberOfItems: attractions.length,
    hasPart: attractions.map((a) => ({
      "@type": "TouristAttraction",
      name: a.name,
      url: `${siteConfig.url}/attractions/${a.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={collectionsSchema} />

      {/* Header */}
      <section className="bg-[#7B1A1A] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Attractions" },
            ]}
            className="mb-6"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Attractions &amp; Things to Do 2026
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Beyond the shows, Branson offers world-class theme parks, outdoor
            adventures, museums, and family fun. Explore {attractions.length}{" "}
            top-rated attractions.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <AttractionsFilterClient
        attractions={attractions}
        attractionTypes={attractionTypes}
      />

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333] font-heading">
            Combine Shows &amp; Attractions for the Ultimate Trip
          </h2>
          <p className="mt-4 text-[#333333]/70">
            Browse our show schedule and plan a full day of Branson
            entertainment.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7B1A1A] text-white rounded-lg font-semibold hover:bg-[#5A1212] transition-colors"
            >
              Browse Shows
            </a>
            <a
              href="/plan-your-trip"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#333333] text-[#333333] rounded-lg font-semibold hover:bg-[#333333] hover:text-white transition-all"
            >
              Plan Your Trip
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
