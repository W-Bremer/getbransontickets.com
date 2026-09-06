import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Sparkles, TreePine } from "lucide-react";
import { shows } from "@/data/shows";
import { siteConfig } from "@/lib/config";
import { formatBasePrice } from "@/lib/tax";
import { getMonthSchedule, monthToSlug } from "@/lib/month-schedule";
import { JsonLd } from "@/components/json-ld";
import { ShowCard } from "@/components/show-card";
import { FAQSection } from "@/components/faq-section";

// Rolling December window plus the visible updated date; regenerate daily.
export const revalidate = 86400;

const chicagoYear = () =>
  Number(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Chicago", year: "numeric" }).format(
      new Date()
    )
  );

const updatedFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const isChristmasShow = (s: (typeof shows)[number]) =>
  s.tags.includes("christmas") || /christmas/i.test(s.name);

export function generateMetadata(): Metadata {
  const year = chicagoYear();
  const title = `Branson Christmas Shows ${year} | Schedule & Tickets`;
  const description = `See every Christmas show playing in Branson in ${year} with dates, showtimes and ticket prices, plus the shows running holiday editions through December.`;
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/shows/christmas` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/shows/christmas`,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default function ChristmasShowsPage() {
  const year = chicagoYear();
  const christmasShows = shows.filter(isChristmasShow);

  // Every show with December performances, so the holiday section reflects
  // the real calendar (seasons, dark ranges) rather than a hand-kept list.
  const december = getMonthSchedule(year, 12);
  const holidayShows = december.filter((e) => !isChristmasShow(e.show));
  const decemberSlug = monthToSlug(year, 12);

  const prices = christmasShows.map((s) => s.priceFrom);
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;

  const faqs = [
    {
      question: `What Christmas shows are playing in Branson in ${year}?`,
      answer: `${christmasShows.map((s) => s.name).join(" and ")} are Branson's dedicated Christmas productions for ${year}, and ${holidayShows.length} more shows have performances running through December, many with holiday segments added after November 1.`,
    },
    {
      question: "When do Branson Christmas shows start?",
      answer: `Branson's Christmas season runs November and December. ${christmasShows
        .map((s) => `${s.name} plays ${s.timeOfDay} performances (${s.showTimes.join(", ")})`)
        .join(", and ")}.`,
    },
    {
      question: "How much are Branson Christmas show tickets?",
      answer: `Christmas show tickets start at $${formatBasePrice(minPrice)} plus tax. Evening seats in December weekends sell out earliest, so book those dates first if your trip is set.`,
    },
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Branson Christmas Shows ${year}`,
    numberOfItems: christmasShows.length + holidayShows.length,
    itemListElement: [...christmasShows, ...holidayShows.map((e) => e.show)].map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.name,
      url: `${siteConfig.url}/shows/${s.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={itemListSchema} />

      {/* Header */}
      <section className="bg-[#13264D] pt-12 pb-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-white/60 mb-6">
            <Link href="/" className="hover:text-[#E8C65A] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shows" className="hover:text-[#E8C65A] transition-colors">
              Shows
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Christmas Shows</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Christmas Shows {year}: Schedule & Tickets
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl">
            Branson runs {christmasShows.length} dedicated Christmas productions in
            November and December, and {holidayShows.length} more shows play through
            the holidays. Tickets start at ${formatBasePrice(minPrice)} plus tax,
            and the listings below show days and times for the season.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Schedule updated {updatedFormat.format(new Date())}
          </p>
        </div>
      </section>

      {/* Dedicated Christmas shows */}
      <section className="py-12 sm:py-16 bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#C8102E] flex items-center justify-center">
              <TreePine className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#13264D] font-heading">
                The Christmas Shows
              </h2>
              <p className="text-sm text-gray-500">
                Full holiday productions, November and December only
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {christmasShows.map((show, i) => (
              <ShowCard key={show.slug} show={show} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Holiday-season shows */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-[#13264D] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#E8C65A]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#13264D] font-heading">
                Also Playing Through December {year}
              </h2>
              <p className="text-sm text-gray-500">
                Many add holiday numbers after November 1
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {holidayShows.map(({ show, daysLabel }) => (
              <Link
                key={show.slug}
                href={`/shows/${show.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-gray-100 bg-[#FAF8F3] p-4 hover:border-[#E8C65A]/40 hover:shadow-sm transition-all"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[#13264D] group-hover:text-[#C8102E] transition-colors truncate">
                    {show.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      {daysLabel} &middot; {show.showTimes.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{show.theater}</span>
                  </div>
                </div>
                <span className="text-sm font-semibold text-[#1A1614] shrink-0">
                  ${formatBasePrice(show.priceFrom)}
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500">
            Want day-by-day December planning? See the full{" "}
            <Link
              href={`/shows/schedule/${decemberSlug}`}
              className="font-semibold text-[#13264D] underline hover:text-[#C8102E]"
            >
              Branson shows December {year} schedule
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Lights and attractions */}
      <section className="py-12 sm:py-16 bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#13264D] font-heading mb-6">
            Christmas Lights & More
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/attractions/lost-canyon-nature-at-night-christmas-at-top-of-the-rock"
              className="group rounded-xl bg-white border border-gray-100 p-5 hover:border-[#E8C65A]/40 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-[#13264D] group-hover:text-[#C8102E] transition-colors">
                Christmas at Top of the Rock: Lost Canyon Nature at Night
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                The self-guided golf cart tour through Lost Canyon, lit for the
                holidays. The most requested Christmas outing we sell.
              </p>
            </Link>
            <Link
              href="/blog/branson-christmas-shows-lights-guide"
              className="group rounded-xl bg-white border border-gray-100 p-5 hover:border-[#E8C65A]/40 hover:shadow-md transition-all"
            >
              <h3 className="font-bold text-[#13264D] group-hover:text-[#C8102E] transition-colors">
                Branson Christmas Guide: Shows, Lights & Events
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Drive-through light displays, holiday events and how to plan a
                December trip around them.
              </p>
            </Link>
          </div>
        </div>
      </section>

      <div className="bg-[#FAF8F3] pb-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FAQSection faqs={faqs} title="Branson Christmas Show FAQs" />
        </div>
      </div>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#13264D] font-heading">
            Planning a Christmas Trip to Branson?
          </h2>
          <p className="mt-4 text-gray-600">
            December weekends book up first. Call us and we&apos;ll build your
            holiday show lineup around your dates.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C8102E] text-white rounded-lg font-semibold hover:bg-[#a60d26] transition-colors"
            >
              Call {siteConfig.phone}
            </Link>
            <Link
              href={`/shows/schedule/${decemberSlug}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#13264D] text-[#13264D] rounded-lg font-semibold hover:bg-[#13264D] hover:text-white transition-all"
            >
              December {year} Schedule
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
