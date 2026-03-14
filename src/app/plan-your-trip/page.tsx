import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Sun, Leaf, Snowflake, Flower } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { shows } from "@/data/shows";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Plan Your Branson Trip 2026 | Itineraries & Travel Guide | ${siteConfig.name}`,
  description:
    "Plan the perfect Branson vacation with our trip planning guide. Sample itineraries for 2-4 day trips, seasonal tips, and expert recommendations for shows and attractions.",
  openGraph: {
    title: "Plan Your Branson Trip 2026 | Itineraries & Travel Guide",
    description:
      "Plan the perfect Branson vacation with sample itineraries, seasonal tips, and expert recommendations.",
    url: `${siteConfig.url}/plan-your-trip`,
    type: "website",
    siteName: siteConfig.name,
  },
};

const itineraries = [
  {
    title: "2-Day Branson Getaway",
    description: "A quick but packed introduction to Branson's best entertainment.",
    days: [
      {
        label: "Day 1",
        activities: [
          "Morning: Arrive and check into your hotel on the Strip",
          "Afternoon: Explore Branson Landing for shopping and lunch",
          "Evening: See The Haygoods — Branson's #1 show",
        ],
      },
      {
        label: "Day 2",
        activities: [
          "Morning: Visit Silver Dollar City theme park",
          "Afternoon: Continue at Silver Dollar City (rides, crafts, food)",
          "Evening: Catch a dinner show like Dolly Parton's Stampede",
        ],
      },
    ],
  },
  {
    title: "3-Day Family Adventure",
    description: "The ideal family trip with shows, attractions, and outdoor fun.",
    days: [
      {
        label: "Day 1",
        activities: [
          "Morning: Check in and grab breakfast on the Strip",
          "Afternoon: Afternoon variety show — great for all ages",
          "Evening: Evening show with the family",
        ],
      },
      {
        label: "Day 2",
        activities: [
          "Morning: Silver Dollar City — arrive early for shorter lines",
          "Afternoon: Silver Dollar City rides and live entertainment",
          "Evening: Dinner show — combine dinner and entertainment",
        ],
      },
      {
        label: "Day 3",
        activities: [
          "Morning: Table Rock Lake boat tour or fishing",
          "Afternoon: Go-karts, mini golf, or the Titanic Museum",
          "Evening: Farewell show — see a magic or comedy performance",
        ],
      },
    ],
  },
  {
    title: "4-Day Ultimate Branson Experience",
    description: "See it all — shows, attractions, nature, and shopping.",
    days: [
      {
        label: "Day 1",
        activities: [
          "Morning: Arrive and explore the 76 Strip",
          "Afternoon: Matinee show — start your trip with entertainment",
          "Evening: Dinner at a local restaurant, evening show",
        ],
      },
      {
        label: "Day 2",
        activities: [
          "Morning: Silver Dollar City all day",
          "Afternoon: Roller coasters, live shows, and craftsmen",
          "Evening: Festival of Lights (seasonal) or evening show",
        ],
      },
      {
        label: "Day 3",
        activities: [
          "Morning: Table Rock Lake — kayak, pontoon, or scenic cruise",
          "Afternoon: Titanic Museum or Hollywood Wax Museum",
          "Evening: Acrobatics show — like Amazing Acrobats of Shanghai",
        ],
      },
      {
        label: "Day 4",
        activities: [
          "Morning: Branson Scenic Railway or zip line adventure",
          "Afternoon: Shopping at Branson Landing and Tanger Outlets",
          "Evening: Grand finale show — The Haygoods or your top pick",
        ],
      },
    ],
  },
];

const seasonalTips = [
  {
    season: "Spring (March - May)",
    icon: Flower,
    color: "bg-pink-100 text-pink-800",
    tips: [
      "Show season kicks off — catch opening night specials",
      "Pleasant weather in the 60s-70s, perfect for outdoor attractions",
      "Fewer crowds mean shorter waits and easier parking",
      "Great time for couples and smaller groups",
    ],
  },
  {
    season: "Summer (June - August)",
    icon: Sun,
    color: "bg-amber-100 text-amber-800",
    tips: [
      "Peak season — all shows are running full schedules",
      "Book popular shows 2-3 weeks in advance",
      "Table Rock Lake activities are in full swing",
      "Silver Dollar City runs extended summer hours",
    ],
  },
  {
    season: "Fall (September - November)",
    icon: Leaf,
    color: "bg-orange-100 text-orange-800",
    tips: [
      "Beautiful Ozark foliage makes the drive scenic",
      "Comfortable temperatures in the 50s-70s",
      "Many shows offer end-of-season deals",
      "Silver Dollar City's Harvest Festival is a highlight",
    ],
  },
  {
    season: "Winter (November - December)",
    icon: Snowflake,
    color: "bg-blue-100 text-blue-800",
    tips: [
      "Christmas shows are a Branson specialty — book early",
      "Silver Dollar City's Festival of Lights is world-famous",
      "Holiday dinner shows are especially popular",
      "Cozy atmosphere with holiday decorations everywhere",
    ],
  },
];

export default function PlanYourTripPage() {
  const tripSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    name: "Plan Your Branson Trip",
    description: "Complete guide to planning a Branson, Missouri vacation.",
    url: `${siteConfig.url}/plan-your-trip`,
    toLocation: {
      "@type": "Place",
      name: "Branson, Missouri",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Branson",
        addressRegion: "MO",
        addressCountry: "US",
      },
    },
  };

  return (
    <>
      <JsonLd data={tripSchema} />

      {/* Header */}
      <section className="bg-[#0f172a] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Plan Your Trip", href: "/plan-your-trip" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Plan Your Branson Trip 2026
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Everything you need to plan the perfect Branson vacation. Sample
            itineraries, seasonal tips, and insider advice from our local
            experts.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-10 bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Link
              href="/shows"
              className="p-4 rounded-xl bg-[#faf8f5] border border-gray-100 text-center hover:border-[#d4a843] transition-colors"
            >
              <div className="text-2xl font-bold text-[#0f172a]">
                {shows.length}+
              </div>
              <div className="text-sm text-gray-600">Live Shows</div>
            </Link>
            <Link
              href="/shows/deals"
              className="p-4 rounded-xl bg-[#faf8f5] border border-gray-100 text-center hover:border-[#d4a843] transition-colors"
            >
              <div className="text-2xl font-bold text-[#0f172a]">BOGO</div>
              <div className="text-sm text-gray-600">Deals Available</div>
            </Link>
            <Link
              href="/attractions"
              className="p-4 rounded-xl bg-[#faf8f5] border border-gray-100 text-center hover:border-[#d4a843] transition-colors"
            >
              <div className="text-2xl font-bold text-[#0f172a]">20+</div>
              <div className="text-sm text-gray-600">Attractions</div>
            </Link>
            <Link
              href="/shows/schedule"
              className="p-4 rounded-xl bg-[#faf8f5] border border-gray-100 text-center hover:border-[#d4a843] transition-colors"
            >
              <div className="text-2xl font-bold text-[#0f172a]">7</div>
              <div className="text-sm text-gray-600">Days of Fun</div>
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Itineraries */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading">
              Sample Itineraries
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Not sure how to plan your days? Here are suggested itineraries
              based on how long you&apos;re staying.
            </p>
          </div>

          <div className="space-y-10">
            {itineraries.map((itinerary) => (
              <div
                key={itinerary.title}
                className="rounded-2xl border border-gray-200 overflow-hidden"
              >
                <div className="p-6 bg-[#0f172a]">
                  <h3 className="text-xl font-bold text-white font-heading">
                    {itinerary.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {itinerary.description}
                  </p>
                </div>
                <div className="divide-y divide-gray-100">
                  {itinerary.days.map((day) => (
                    <div key={day.label} className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Calendar className="w-5 h-5 text-[#d4a843]" />
                        <h4 className="font-bold text-[#0f172a]">
                          {day.label}
                        </h4>
                      </div>
                      <ul className="space-y-2">
                        {day.activities.map((activity) => (
                          <li
                            key={activity}
                            className="text-gray-600 text-sm pl-8 relative before:absolute before:left-3 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#d4a843]"
                          >
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Tips */}
      <section className="py-12 sm:py-16 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading">
              Best Time to Visit Branson
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              Each season offers a unique Branson experience. Here&apos;s what
              to expect throughout the year.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {seasonalTips.map((season) => (
              <div
                key={season.season}
                className="rounded-2xl bg-white border border-gray-100 p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center ${season.color}`}
                  >
                    <season.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0f172a]">
                    {season.season}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.tips.map((tip) => (
                    <li
                      key={tip}
                      className="text-sm text-gray-600 pl-5 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-[#d4a843]"
                    >
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Travel Tips */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading mb-8 text-center">
            Branson Travel Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-[#faf8f5] border border-gray-100">
              <h3 className="font-bold text-[#0f172a] mb-3">Getting There</h3>
              <p className="text-sm text-gray-600">
                Fly into Springfield-Branson National Airport (SGF), about 45
                minutes north. Branson Airport (BKG) has limited direct flights.
                Most visitors drive — Branson is an easy road trip from cities
                across the Midwest.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#faf8f5] border border-gray-100">
              <h3 className="font-bold text-[#0f172a] mb-3">Getting Around</h3>
              <p className="text-sm text-gray-600">
                A car is recommended for getting around Branson. Most shows and
                attractions are along the 76 Country Boulevard corridor. Parking
                is free at most theaters. Consider the Branson Scenic Railway for
                a unique experience.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#faf8f5] border border-gray-100">
              <h3 className="font-bold text-[#0f172a] mb-3">Where to Stay</h3>
              <p className="text-sm text-gray-600">
                Hotels along Highway 76 put you closest to theaters. Table Rock
                Lake resorts offer waterfront relaxation. Branson Landing area
                has upscale options with dining and shopping within walking
                distance.
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[#faf8f5] border border-gray-100">
              <h3 className="font-bold text-[#0f172a] mb-3">Booking Tips</h3>
              <p className="text-sm text-gray-600">
                Book popular shows 1-2 weeks ahead during peak season. Look for
                BOGO deals and kids-free specials. Consider seeing 2-3 shows per
                day max. Arrive 15-30 minutes early for the best seats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#d4a843] to-[#b8922e]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Ready to Start Booking?
          </h2>
          <p className="mt-4 text-white/90 text-lg">
            Browse {shows.length}+ shows, compare prices, and book discount
            tickets for your Branson trip.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0f172a] text-white rounded-xl font-semibold text-lg hover:bg-[#1e293b] transition-colors"
            >
              Browse All Shows
            </Link>
            <Link
              href="/shows/deals"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0f172a] rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              View Deals
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
