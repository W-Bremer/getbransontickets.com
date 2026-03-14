"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, MapPin, ChevronRight, Clock, Users, CalendarDays, Tag, UtensilsCrossed } from "lucide-react";
import { TabNavigation } from "@/components/tab-navigation";
import AvailabilityGrid from "@/components/availability-grid";
import { FAQSection } from "@/components/faq-section";

interface ShowData {
  name: string;
  slug: string;
  description: string;
  duration: string;
  theater: string;
  theaterAddress: string;
  ageRecommendation: string;
  showTimes: string[];
  darkDays: string[];
  seasonStart: string;
  seasonEnd: string;
  priceFrom: number;
  priceTo: number;
  rating: number;
  reviewCount: number;
  specialOffers: string[];
  mealIncluded: boolean;
  mealType: string | null;
  faqs: { question: string; answer: string }[];
  category: string[];
}

interface ShowDetailClientProps {
  show: ShowData;
  theaterSlug?: string;
}

// Mock reviews generator
function generateMockReviews(showName: string) {
  return [
    {
      name: "Sarah M.",
      location: "Kansas City, MO",
      rating: 5,
      date: "February 2026",
      title: "Absolutely incredible experience!",
      body: `We saw ${showName} on our family trip to Branson and it was the highlight of our vacation. The talent on stage was unbelievable and the production quality rivals anything we've seen in Nashville or Vegas. Already planning to come back next year!`,
    },
    {
      name: "Robert T.",
      location: "Dallas, TX",
      rating: 5,
      date: "January 2026",
      title: "Don't miss this show!",
      body: `This was our third time seeing ${showName} and it somehow gets better every year. The energy, the musicianship, the whole atmosphere -- just top-notch entertainment. We brought friends this time and they were blown away.`,
    },
    {
      name: "Jennifer L.",
      location: "Springfield, MO",
      rating: 4,
      date: "December 2025",
      title: "Great show, great value",
      body: `We had a wonderful time at ${showName}. The performers are incredibly talented and you can tell they love what they do. Seats were comfortable and the venue was clean. Only wish it was a little longer! Highly recommend for families.`,
    },
    {
      name: "Mike & Karen W.",
      location: "Oklahoma City, OK",
      rating: 5,
      date: "November 2025",
      title: "Best show in Branson!",
      body: `We've been coming to Branson for 15 years and have seen dozens of shows. ${showName} is hands down one of the best. From start to finish it was non-stop entertainment. The booking process was easy and our seats were perfect.`,
    },
    {
      name: "Patricia D.",
      location: "Little Rock, AR",
      rating: 5,
      date: "October 2025",
      title: "Worth every penny",
      body: `What an amazing show! ${showName} exceeded all my expectations. The performers are world-class and the whole production is polished and professional. This was our first trip to Branson and we'll definitely be back.`,
    },
    {
      name: "David K.",
      location: "Tulsa, OK",
      rating: 4,
      date: "September 2025",
      title: "Fantastic family entertainment",
      body: `Took our kids (ages 8 and 12) and everyone loved it. ${showName} has something for every age group. The kids were dancing in their seats! Great clean fun that the whole family can enjoy together.`,
    },
  ];
}

export function ShowDetailClient({ show, theaterSlug }: ShowDetailClientProps) {
  const isDinnerShow = show.category.includes("dinner-shows");

  const baseTabs = [
    { id: "details", label: "Details" },
    { id: "schedule", label: "Schedule" },
    { id: "reviews", label: "Reviews" },
    { id: "location", label: "Location" },
  ];

  if (isDinnerShow) {
    baseTabs.splice(3, 0, { id: "menu", label: "Menu" });
  }

  const [activeTab, setActiveTab] = useState("details");

  const reviews = generateMockReviews(show.name);

  return (
    <div>
      <TabNavigation tabs={baseTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="py-8">
        {/* ===== Details Tab ===== */}
        {activeTab === "details" && (
          <div className="space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#333333] font-heading mb-4">
                About {show.name}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{show.description}</p>
              </div>
            </div>

            {/* Quick Facts Card */}
            <div className="rounded-xl bg-[#FAF8F5] border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#333333] mb-4">Quick Facts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <span className="text-sm text-gray-500">Duration: </span>
                    <span className="text-sm font-semibold text-[#333333]">{show.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <span className="text-sm text-gray-500">Ages: </span>
                    <span className="text-sm font-semibold text-[#333333]">{show.ageRecommendation}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <span className="text-sm text-gray-500">Season: </span>
                    <span className="text-sm font-semibold text-[#333333]">{show.seasonStart} – {show.seasonEnd}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#7B1A1A]" />
                  <div>
                    <span className="text-sm text-gray-500">Theater: </span>
                    <span className="text-sm font-semibold text-[#333333]">{show.theater}</span>
                  </div>
                </div>
              </div>
              {show.mealIncluded && (
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-200">
                  <UtensilsCrossed className="w-5 h-5 text-[#D4A843]" />
                  <div>
                    <span className="text-sm font-semibold text-[#D4A843]">{show.mealType} Included</span>
                    <span className="text-sm text-gray-500"> with your ticket</span>
                  </div>
                </div>
              )}
            </div>

            {/* Show Times */}
            <div>
              <h3 className="text-lg font-bold text-[#333333] mb-4">Show Times</h3>
              <div className="p-6 rounded-xl bg-[#FAF8F5] border border-gray-100">
                <div className="flex flex-wrap gap-3">
                  {show.showTimes.map((time) => (
                    <span
                      key={time}
                      className="px-4 py-2 rounded-lg bg-[#7B1A1A] text-white font-medium"
                    >
                      {time}
                    </span>
                  ))}
                </div>
                {show.darkDays.length > 0 && (
                  <p className="mt-3 text-sm text-gray-500">
                    Dark days: {show.darkDays.join(", ")}
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  Season: {show.seasonStart} through {show.seasonEnd}
                </p>
              </div>
            </div>

            {/* Special Offers */}
            {show.specialOffers.length > 0 && (
              <div className="rounded-xl bg-[#8B6914]/5 border border-[#8B6914]/20 p-6">
                <h3 className="text-lg font-bold text-[#8B6914] mb-3 flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  Special Offers
                </h3>
                <ul className="space-y-2">
                  {show.specialOffers.map((offer) => (
                    <li key={offer} className="flex items-center gap-2 text-[#333333]">
                      <span className="w-2 h-2 rounded-full bg-[#8B6914] shrink-0" />
                      {offer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {show.faqs.length > 0 && (
              <FAQSection
                faqs={show.faqs}
                title={`${show.name} — Frequently Asked Questions`}
              />
            )}
          </div>
        )}

        {/* ===== Schedule Tab ===== */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#333333] font-heading">
              {show.name} Schedule & Availability
            </h2>
            <p className="text-gray-600">
              See upcoming show times and book your preferred date below. Green buttons indicate
              available performances.
            </p>
            <AvailabilityGrid
              showTimes={show.showTimes}
              showName={show.name}
              pricePerAdult={show.priceFrom}
              darkDays={show.darkDays}
            />
            <div className="rounded-xl bg-[#FAF8F5] border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#333333] mb-2">Season Information</h3>
              <p className="text-gray-600 text-sm">
                {show.name} runs from <strong>{show.seasonStart}</strong> through{" "}
                <strong>{show.seasonEnd}</strong>.
                {show.darkDays.length > 0 && (
                  <> The show is dark (no performances) on {show.darkDays.join(", ")}.</>
                )}
              </p>
            </div>
          </div>
        )}

        {/* ===== Reviews Tab ===== */}
        {activeTab === "reviews" && (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-[#333333] font-heading">
                Guest Reviews
              </h2>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.round(show.rating)
                          ? "text-[#D4A843] fill-[#D4A843]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-bold text-[#333333]">{show.rating}</span>
                <span className="text-gray-500">
                  Based on {show.reviewCount.toLocaleString()} reviews
                </span>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="rounded-xl bg-[#FAF8F5] border border-gray-100 p-6">
              <h3 className="text-sm font-bold text-[#333333] mb-3">Rating Breakdown</h3>
              {[5, 4, 3, 2, 1].map((stars) => {
                const pct =
                  stars === 5
                    ? 78
                    : stars === 4
                      ? 15
                      : stars === 3
                        ? 5
                        : stars === 2
                          ? 1
                          : 1;
                return (
                  <div key={stars} className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-gray-600 w-12">{stars} star</span>
                    <div className="flex-1 h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#D4A843] rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-10 text-right">{pct}%</span>
                  </div>
                );
              })}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 p-6 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-1 mb-1">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star
                            key={j}
                            className={`w-4 h-4 ${
                              j < review.rating
                                ? "text-[#D4A843] fill-[#D4A843]"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <h4 className="font-bold text-[#333333]">{review.title}</h4>
                    </div>
                    <span className="text-xs text-gray-400">{review.date}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{review.body}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span className="font-medium text-[#333333]">{review.name}</span>
                    <span>&middot;</span>
                    <span>{review.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Location Tab ===== */}
        {activeTab === "location" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#333333] font-heading">
              Theater Location
            </h2>
            <div className="rounded-xl bg-[#FAF8F5] border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#7B1A1A]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#7B1A1A]" />
                </div>
                <div>
                  {theaterSlug ? (
                    <Link
                      href={`/theaters/${theaterSlug}`}
                      className="text-xl font-bold text-[#7B1A1A] hover:text-[#5A1212] transition-colors"
                    >
                      {show.theater}
                    </Link>
                  ) : (
                    <p className="text-xl font-bold text-[#333333]">{show.theater}</p>
                  )}
                  <p className="text-gray-600 mt-1">{show.theaterAddress}</p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    show.theaterAddress
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#7B1A1A] text-white font-medium text-sm hover:bg-[#5A1212] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
                {theaterSlug && (
                  <Link
                    href={`/theaters/${theaterSlug}`}
                    className="inline-flex items-center gap-1 px-5 py-2.5 rounded-lg border-2 border-[#7B1A1A] text-[#7B1A1A] font-medium text-sm hover:bg-[#7B1A1A] hover:text-white transition-all"
                  >
                    View Theater Details <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Map placeholder */}
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-[#7B1A1A] mx-auto mb-2" />
                  <p className="text-sm text-gray-500">{show.theater}</p>
                  <p className="text-xs text-gray-400 mt-1">{show.theaterAddress}</p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      show.theaterAddress
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-3 text-sm font-medium text-[#7B1A1A] hover:text-[#5A1212]"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Getting There */}
            <div className="rounded-xl bg-[#FAF8F5] border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#333333] mb-3">Getting There</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B1A1A] mt-2 shrink-0" />
                  Located on the famous 76 Country Boulevard (Highway 76) in Branson, MO.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B1A1A] mt-2 shrink-0" />
                  Free parking is available at the theater. Arrive 30 minutes early for best seating.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7B1A1A] mt-2 shrink-0" />
                  The theater is wheelchair accessible with designated parking spots near the entrance.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ===== Menu Tab (Dinner Shows Only) ===== */}
        {activeTab === "menu" && isDinnerShow && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#333333] font-heading">
              {show.mealType} Menu
            </h2>
            <p className="text-gray-600">
              Your {show.mealType?.toLowerCase()} is included with every ticket to {show.name}.
              Enjoy a delicious meal before the show begins.
            </p>
            <div className="rounded-xl bg-[#FAF8F5] border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <UtensilsCrossed className="w-6 h-6 text-[#D4A843]" />
                <h3 className="text-lg font-bold text-[#333333]">
                  {show.mealType} Included with Your Ticket
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                The {show.mealType?.toLowerCase()} menu features a selection of home-style entrees,
                sides, and desserts. Vegetarian and gluten-free options are available upon request.
                Please inform staff of any dietary restrictions when you arrive.
              </p>
              <div className="mt-4 p-4 rounded-lg bg-[#D4A843]/5 border border-[#D4A843]/20">
                <p className="text-sm text-[#C04E0C] font-medium">
                  Tip: {show.mealType} is served before the show. Doors typically open 60-90
                  minutes before showtime for dinner seating.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
