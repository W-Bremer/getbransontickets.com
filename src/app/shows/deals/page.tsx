import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { shows } from "@/data/shows";
import { ShowCard } from "@/components/show-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Branson Show Deals & Discounts 2026`,
  alternates: { canonical: "/shows/deals" },
  description:
    "Find current Branson show deals for 2026. BOGO offers, family passes, kids' ticket offers, and dinner show packages from Branson theaters.",
  openGraph: {
    title: "Branson Show Deals & Discounts 2026",
    description:
      "Find current Branson show deals for 2026. BOGO offers, family passes, and dinner show packages.",
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
      (o) =>
        o.toLowerCase().includes("kid") ||
        o.toLowerCase().includes("child") ||
        o.toLowerCase().includes("family pass")
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
      "Current deals and discounts on Branson shows including BOGO offers, family passes, and dinner show packages.",
    url: `${siteConfig.url}/shows/deals`,
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
              { label: "Shows", href: "/shows" },
              { label: "Deals & Discounts", href: "/shows/deals" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Show Deals & Discounts 2026
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Current offers on Branson shows. BOGO deals, family passes, kids&apos;
            ticket offers, and dinner show packages.
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
                className="flex-1 sm:w-72 px-4 py-3 rounded-lg border-0 text-[#13264D] focus:outline-none focus:ring-2 focus:ring-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#13264D] text-white rounded-lg font-semibold hover:bg-[#0D1B38] transition-colors whitespace-nowrap"
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#13264D] font-heading">
                Buy One, Get One Deals
              </h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">
              These theaters currently advertise buy one, get one offers. See
              each show page for how the offer works and which tickets qualify.
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
                Family
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#13264D] font-heading">
                Kids &amp; Family Ticket Offers
              </h2>
            </div>
            <p className="text-gray-600 mb-8 max-w-2xl">
              Family passes and kids&apos; ticket offers at these shows. See each
              show page for prices and details.
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#13264D] font-heading">
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#13264D] font-heading">
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
      <section className="py-16 sm:py-20 bg-[#13264D]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-heading">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="mt-4 text-white/70 text-lg">
            Call us and we'll help you find the right show and any current
            offers that fit your dates.
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
