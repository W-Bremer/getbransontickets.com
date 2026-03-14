import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { shows } from "@/data/shows";
import { ShowCard } from "@/components/show-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Branson Show Deals & Discounts 2026 | Save on Tickets | ${siteConfig.name}`,
  description:
    "Find the best Branson show deals for 2026. BOGO offers, kids-free specials, family packages, and seasonal discounts on top-rated Branson entertainment.",
  openGraph: {
    title: "Branson Show Deals & Discounts 2026",
    description:
      "Find the best Branson show deals for 2026. BOGO offers, kids-free specials, and family packages.",
    url: `${siteConfig.url}/shows/deals`,
    type: "website",
    siteName: siteConfig.name,
  },
};

export default function DealsPage() {
  const bogoShows = shows.filter((s) =>
    s.specialOffers.some((o) => o.toLowerCase().includes("bogo"))
  );
  const kidsFreeShows = shows.filter((s) =>
    s.specialOffers.some(
      (o) => o.toLowerCase().includes("kid") || o.toLowerCase().includes("child")
    )
  );
  const familyShows = shows.filter(
    (s) =>
      s.tags.includes("family-friendly") ||
      s.category.includes("family") ||
      s.ageRecommendation === "All ages"
  );
  const dinnerDeals = shows.filter((s) => s.mealIncluded);

  const dealsSchema = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Branson Show Deals & Discounts 2026",
    description:
      "Current deals and discounts on Branson shows including BOGO, kids-free, and family packages.",
    url: `${siteConfig.url}/shows/deals`,
  };

  return (
    <>
      <JsonLd data={dealsSchema} />

      {/* Header */}
      <section className="bg-[#0f172a] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shows", href: "/shows" },
              { label: "Deals & Discounts", href: "/shows/deals" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Show Deals & Discounts 2026
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Save big on Branson&apos;s best entertainment. Find BOGO offers, family
            packages, kids-free deals, and seasonal specials.
          </p>
        </div>
      </section>

      {/* Deal Alert CTA */}
      <section className="bg-gradient-to-r from-[#d4a843] to-[#b8922e] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-heading">
                Never Miss a Deal
              </h2>
              <p className="text-white/90 text-sm mt-1">
                Get exclusive Branson show deals delivered to your inbox.
              </p>
            </div>
            <form className="flex gap-3 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 sm:w-72 px-4 py-3 rounded-lg border-0 text-[#0f172a] focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#0f172a] text-white rounded-lg font-semibold hover:bg-[#1e293b] transition-colors whitespace-nowrap"
              >
                Get Alerts
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* BOGO Deals */}
      {bogoShows.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-sm font-bold uppercase tracking-wider">
                BOGO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading">
                Buy One, Get One Deals
              </h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Double the fun at half the price. These shows are currently offering
              buy-one-get-one-free tickets.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {bogoShows.map((show, index) => (
                <ShowCard key={show.slug} show={show} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Kids Free */}
      {kidsFreeShows.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#faf8f5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-800 text-sm font-bold uppercase tracking-wider">
                Kids Free
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading">
                Kids Go Free Specials
              </h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Bring the whole family without breaking the bank. These shows let kids
              attend free with a paying adult.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {kidsFreeShows.map((show, index) => (
                <ShowCard key={show.slug} show={show} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dinner Show Deals */}
      {dinnerDeals.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-orange-100 text-orange-800 text-sm font-bold uppercase tracking-wider">
                Dinner Included
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading">
                Dinner Show Packages
              </h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Get a full meal and a show for one great price. These dinner shows
              include a complete meal with your ticket.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {dinnerDeals.map((show, index) => (
                <ShowCard key={show.slug} show={show} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Family Packages */}
      {familyShows.length > 0 && (
        <section className="py-12 sm:py-16 bg-[#faf8f5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <span className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 text-sm font-bold uppercase tracking-wider">
                Family
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading">
                Family-Friendly Shows
              </h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">
              These top-rated shows are perfect for all ages. Fun for kids, entertaining
              for adults.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {familyShows.slice(0, 6).map((show, index) => (
                <ShowCard key={show.slug} show={show} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-[#0f172a]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-heading">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Call our Branson entertainment experts for personalized recommendations
            and exclusive phone-only deals.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#d4a843] text-white rounded-xl font-semibold text-lg hover:bg-[#b8922e] transition-colors"
            >
              Call {siteConfig.phone}
            </Link>
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Browse All Shows
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
