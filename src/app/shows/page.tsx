import type { Metadata } from "next";
import { shows } from "@/data/shows";
import { categories } from "@/lib/config";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { ShowsListingClient } from "./shows-listing-client";

export const metadata: Metadata = {
  title: `Branson Shows 2026 | All Shows, Tickets & Schedules | ${siteConfig.name}`,
  description:
    "Browse all 50+ Branson shows. Compare tickets, read reviews, and find the perfect show. Variety, comedy, magic, dinner shows, and more. Book online and save!",
  openGraph: {
    title: `Branson Shows 2026 | All Shows, Tickets & Schedules`,
    description:
      "Browse all 50+ Branson shows. Compare tickets, read reviews, and find the perfect show.",
    url: `${siteConfig.url}/shows`,
    type: "website",
    siteName: siteConfig.name,
  },
};

export default function ShowsPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Branson Shows",
    description: "Complete listing of all live shows in Branson, Missouri",
    url: `${siteConfig.url}/shows`,
    numberOfItems: shows.length,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <div className="bg-[#037B98] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shows" }]} />
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold text-white font-heading">
            Branson Shows 2026
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-2xl">
            Browse all {shows.length}+ live shows in Branson, Missouri. Filter by category,
            price, and more to find your perfect entertainment.
          </p>
        </div>
      </div>
      <ShowsListingClient shows={shows} categories={categories} />
    </>
  );
}
