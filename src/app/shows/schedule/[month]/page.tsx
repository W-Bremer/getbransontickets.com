import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Clock, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { formatBasePrice } from "@/lib/tax";
import {
  getMonthSchedule,
  getScheduleMonths,
  monthOffsetFromNow,
  monthToSlug,
  parseMonthSlug,
} from "@/lib/month-schedule";
import type { ShowMonthSchedule } from "@/lib/month-schedule";
import { JsonLd } from "@/components/json-ld";
import { FAQSection } from "@/components/faq-section";

// The month grid is a rolling window off today's date; regenerate daily so
// "still playing this month" stays true without a deploy.
export const revalidate = 86400;

// Months beyond the static params render on demand; anything outside the
// browsable window 404s or redirects in the page body.
export async function generateStaticParams() {
  return getScheduleMonths(4).map((m) => ({ month: m.slug }));
}

const timeSlots = [
  { label: "Morning Shows", value: "morning" as const, time: "Before 12:00 PM" },
  { label: "Afternoon Shows", value: "afternoon" as const, time: "12:00 PM - 5:00 PM" },
  { label: "Evening Shows", value: "evening" as const, time: "After 5:00 PM" },
];

const updatedFormat = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Chicago",
  month: "long",
  day: "numeric",
  year: "numeric",
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ month: string }>;
}): Promise<Metadata> {
  const parsed = parseMonthSlug((await params).month);
  if (!parsed) return { title: "Schedule Not Found" };

  const label = `${parsed.name} ${parsed.year}`;
  const count = getMonthSchedule(parsed.year, parsed.month).length;
  const title = `Branson Shows ${label} | Schedule, Showtimes & Tickets`;
  const description = `${count} live shows are playing in Branson in ${label}. See the exact days, showtimes and ticket prices for every show, updated daily.`;
  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/shows/schedule/${parsed.slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/shows/schedule/${parsed.slug}`,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default async function MonthSchedulePage({
  params,
}: {
  params: Promise<{ month: string }>;
}) {
  const parsed = parseMonthSlug((await params).month);
  if (!parsed) notFound();

  const offset = monthOffsetFromNow(parsed);
  // A finished month redirects to the live schedule rather than 404ing the
  // links Bing already has; far-future months have no expanded performances
  // to show yet.
  if (offset < 0) {
    const { year, month } = getScheduleMonths(1)[0];
    redirect(`/shows/schedule/${monthToSlug(year, month)}`);
  }
  if (offset > 6) notFound();

  const label = `${parsed.name} ${parsed.year}`;
  const schedule = getMonthSchedule(parsed.year, parsed.month);
  if (schedule.length === 0) notFound();

  const months = getScheduleMonths(4);
  const minPrice = Math.min(...schedule.map((e) => e.show.priceFrom));
  const counts = Object.fromEntries(
    timeSlots.map((slot) => [
      slot.value,
      schedule.filter((e) => e.show.timeOfDay === slot.value).length,
    ])
  ) as Record<"morning" | "afternoon" | "evening", number>;

  const featuredNames = schedule
    .filter((e) => e.show.isFeatured)
    .slice(0, 3)
    .map((e) => e.show.name);
  const dailyShows = schedule.filter((e) => e.daysLabel === "Daily");
  const christmasShows = schedule.filter((e) =>
    e.show.tags.includes("christmas") || /christmas/i.test(e.show.name)
  );

  const faqs = [
    {
      question: `How many shows are playing in Branson in ${label}?`,
      answer: `${schedule.length} live shows have performances scheduled in Branson in ${label}${
        featuredNames.length > 0 ? `, including ${featuredNames.join(", ")}` : ""
      }. Each listing on this page shows the exact days and showtimes for the month.`,
    },
    {
      question: `What times do Branson shows start in ${label}?`,
      answer: `${counts.morning} morning, ${counts.afternoon} afternoon and ${counts.evening} evening shows are running in ${label}. Morning curtains are typically 9:30 or 10:00 AM, matinees start between noon and 3:00 PM, and evening shows usually begin at 7:00 or 7:30 PM.`,
    },
    ...(christmasShows.length > 0 && (parsed.month === 11 || parsed.month === 12)
      ? [
          {
            question: `What Christmas shows are playing in Branson in ${label}?`,
            answer: `${christmasShows
              .map((e) => e.show.name)
              .join(" and ")} ${christmasShows.length === 1 ? "is" : "are"} playing in ${label}, and many other Branson shows switch to holiday editions in November and December. See the full lineup on our Branson Christmas shows page.`,
          },
        ]
      : dailyShows.length > 0
        ? [
            {
              question: `Which Branson shows play every day in ${label}?`,
              answer: `${dailyShows
                .slice(0, 5)
                .map((e) => e.show.name)
                .join(", ")} ${dailyShows.length === 1 ? "has" : "have"} performances every day of ${label}.`,
            },
          ]
        : []),
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Branson Shows ${label} Schedule`,
    numberOfItems: schedule.length,
    itemListElement: schedule.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: e.show.name,
      url: `${siteConfig.url}/shows/${e.show.slug}`,
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
            <Link href="/shows/schedule" className="hover:text-[#E8C65A] transition-colors">
              Schedule
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{label}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Shows {label}: Schedule & Showtimes
          </h1>
          <p className="mt-4 text-lg text-white/80 max-w-3xl">
            {schedule.length} live shows are playing in Branson in {label}, with
            tickets from ${formatBasePrice(minPrice)} plus tax. Every listing
            below shows the exact days and showtimes for the month, so you can
            match shows to your trip dates before you book.
          </p>
          <p className="mt-3 text-sm text-white/50">
            Schedule updated {updatedFormat.format(new Date())}
          </p>
        </div>
      </section>

      {/* Month switcher */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-hide">
            <Link
              href="/shows/schedule"
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Weekly View
            </Link>
            <span className="self-stretch w-px bg-gray-200 mx-1 shrink-0" aria-hidden />
            {months.map((m) => (
              <Link
                key={m.slug}
                href={`/shows/schedule/${m.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  m.slug === parsed.slug
                    ? "bg-[#13264D] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {m.name} {m.year}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Listings by time of day */}
      <section className="py-12 sm:py-16 bg-[#FAF8F3]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {timeSlots.map((slot) => {
            const slotShows = schedule.filter((e) => e.show.timeOfDay === slot.value);
            if (slotShows.length === 0) return null;
            return (
              <div key={slot.value}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#13264D] flex items-center justify-center">
                    <Clock className="w-6 h-6 text-[#E8C65A]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#13264D] font-heading">
                      {slot.label} in {label}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {slot.time} &middot; {slotShows.length} show
                      {slotShows.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {slotShows.map(({ show, daysLabel }: ShowMonthSchedule) => (
                    <div
                      key={show.slug}
                      className="flex flex-col rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#E8C65A]/40 transition-all"
                    >
                      <Link
                        href={`/shows/${show.slug}`}
                        className="group flex flex-1 gap-4 p-4 pb-3"
                      >
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={show.imageUrl}
                            alt={show.imageAlt}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        </div>
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
                      </Link>
                      <div className="flex items-center justify-between gap-3 px-4 pb-4">
                        <span className="text-sm font-semibold text-[#1A1614]">
                          From ${formatBasePrice(show.priceFrom)}
                        </span>
                        {show.isFeaturedPartner ? (
                          <Link
                            href={`/shows/${show.slug}#booking-widget`}
                            className="rounded-lg bg-[#C8102E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#a60d26] transition-colors"
                          >
                            Get Tickets
                          </Link>
                        ) : (
                          <Link
                            href={`/shows/${show.slug}`}
                            className="rounded-lg border border-[#13264D]/30 px-4 py-2 text-sm font-semibold text-[#13264D] hover:bg-[#13264D] hover:text-white transition-colors"
                          >
                            Details
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="bg-[#FAF8F3] pb-4">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <FAQSection faqs={faqs} title={`Branson ${label} Schedule FAQs`} />
        </div>
      </div>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#13264D] font-heading">
            Planning a {parsed.name} Trip to Branson?
          </h2>
          <p className="mt-4 text-gray-600">
            Call us and we&apos;ll match shows to your exact dates, or browse
            the full weekly schedule.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C8102E] text-white rounded-lg font-semibold hover:bg-[#a60d26] transition-colors"
            >
              Call {siteConfig.phone}
            </Link>
            <Link
              href="/shows/schedule"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#13264D] text-[#13264D] rounded-lg font-semibold hover:bg-[#13264D] hover:text-white transition-all"
            >
              Full Branson Show Schedule
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
