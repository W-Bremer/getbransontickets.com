"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, ChevronRight, Clock, Users, CalendarDays, UtensilsCrossed } from "lucide-react";
import { TabNavigation } from "@/components/tab-navigation";
import AvailabilityGrid from "@/components/availability-grid";
import { BookingCtaBanner } from "@/components/booking-cta-banner";
import { FAQSection } from "@/components/faq-section";
import { PhotoGallery } from "@/components/photo-gallery";
import UpcomingTimesList from "@/components/upcoming-times-list";

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
  isFeaturedPartner: boolean;
  seasonStart: string;
  seasonEnd: string;
  priceFrom: number;
  priceTo: number;
  childPriceFrom?: number;
  mealIncluded: boolean;
  mealType: string | null;
  faqs: { question: string; answer: string }[];
  category: string[];
  galleryImages?: string[];
  galleryImageAlts?: string[];
  galleryNote?: string;
  videoUrl?: string;
}

interface ShowDetailClientProps {
  show: ShowData;
  theaterSlug?: string;
}

export function ShowDetailClient({ show, theaterSlug }: ShowDetailClientProps) {
  const isDinnerShow = show.category.includes("dinner-shows");

  // No Reviews tab: the reviews it showed were generated placeholder text,
  // not reviews we hold. Restore only with real, citable guest reviews.
  const baseTabs = [
    { id: "details", label: "Details" },
    { id: "schedule", label: "Schedule" },
    { id: "location", label: "Location" },
  ];

  if (isDinnerShow) {
    baseTabs.splice(2, 0, { id: "menu", label: "Menu" });
  }

  const [activeTab, setActiveTab] = useState("details");

  return (
    <div>
      <TabNavigation tabs={baseTabs} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="py-8">
        {/* ===== Details Tab ===== */}
        {activeTab === "details" && (
          <div className="space-y-10">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-[#1A1614] font-heading mb-4">
                About {show.name}
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <p>{show.description}</p>
              </div>
            </div>

            {/* First in-content booking prompt: the reader just finished the
                pitch — don't make them hunt for where to act on it. */}
            {show.isFeaturedPartner && (
              <BookingCtaBanner
                heading="Ready to see it live?"
                priceFrom={show.priceFrom}
                childPriceFrom={show.childPriceFrom}
              />
            )}

            {/* Official promo video */}
            {show.videoUrl && (
              <div id="show-video" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1A1614] font-heading mb-4">
                  See the Show
                </h2>
                <div className="relative aspect-video overflow-hidden rounded-xl border border-gray-100 bg-black shadow-md">
                  <iframe
                    src={show.videoUrl}
                    title={`${show.name} official video`}
                    className="absolute inset-0 h-full w-full"
                    loading="lazy"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            )}

            {/* Photos */}
            {show.galleryImages && show.galleryImages.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#1A1614] font-heading mb-1">
                  Photos
                </h2>
                {show.galleryNote && (
                  <p className="mb-4 text-xs text-gray-500">{show.galleryNote}</p>
                )}
                <PhotoGallery
                  className={show.galleryNote ? undefined : "mt-3"}
                  images={show.galleryImages.map((src, i) => ({
                    src,
                    alt: show.galleryImageAlts?.[i] ?? `${show.name} photo ${i + 1}`,
                  }))}
                />
              </div>
            )}

            {/* Quick Facts Card */}
            <div className="rounded-xl bg-[#F6F4EF] border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#1A1614] mb-4">Quick Facts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <span className="text-sm text-gray-500">Duration: </span>
                    <span className="text-sm font-semibold text-[#1A1614]">{show.duration}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <span className="text-sm text-gray-500">Ages: </span>
                    <span className="text-sm font-semibold text-[#1A1614]">{show.ageRecommendation}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <span className="text-sm text-gray-500">Season: </span>
                    <span className="text-sm font-semibold text-[#1A1614]">{show.seasonStart} to {show.seasonEnd}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#13264D]" />
                  <div>
                    <span className="text-sm text-gray-500">Theater: </span>
                    <span className="text-sm font-semibold text-[#1A1614]">{show.theater}</span>
                  </div>
                </div>
              </div>
              {show.mealIncluded && (
                <div className="mt-4 flex items-center gap-3 pt-4 border-t border-gray-200">
                  <UtensilsCrossed className="w-5 h-5 text-[#E8C65A]" />
                  <div>
                    <span className="text-sm font-semibold text-[#E8C65A]">{show.mealType} Included</span>
                    <span className="text-sm text-gray-500"> with your ticket</span>
                  </div>
                </div>
              )}
            </div>

            {/* Show Times. Sellable shows get the bookable date list — the
                old static time chips looked like buttons and did nothing,
                which is exactly what trips up older visitors. */}
            {show.isFeaturedPartner ? (
              <div>
                <h3 className="text-lg font-bold text-[#1A1614] mb-1">Show Times</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Pick a date &mdash; every button below is a real, on-sale showtime.
                </p>
                <UpcomingTimesList slug={show.slug} />
                <p className="mt-2 text-sm text-gray-500">
                  Season: {show.seasonStart} through {show.seasonEnd}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold text-[#1A1614] mb-4">Show Times</h3>
                <div className="p-6 rounded-xl bg-[#F6F4EF] border border-gray-100">
                  <div className="flex flex-wrap gap-3">
                    {show.showTimes.map((time) => (
                      <span
                        key={time}
                        className="px-4 py-2 rounded-lg bg-[#13264D] text-white font-medium"
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
            )}

            {/* No Special Offers section: theater promos route buyers to the
                box office instead of our checkout (removed 2026-08-29). */}

            {/* FAQs */}
            {show.faqs.length > 0 && (
              <FAQSection
                faqs={show.faqs}
                title={`${show.name} Frequently Asked Questions`}
              />
            )}

            {/* Closing booking prompt for the thorough readers who made it
                all the way down. */}
            {show.isFeaturedPartner && (
              <BookingCtaBanner
                heading="Ready when you are."
                priceFrom={show.priceFrom}
                childPriceFrom={show.childPriceFrom}
              />
            )}
          </div>
        )}

        {/* ===== Schedule Tab ===== */}
        {activeTab === "schedule" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1A1614] font-heading">
              {show.name} Schedule & Availability
            </h2>
            <p className="text-gray-600">
              See upcoming show times and book your preferred date below. Green buttons indicate
              available performances.
            </p>
            <AvailabilityGrid
              slug={show.slug}
              isSellable={show.isFeaturedPartner}
              showTimes={show.showTimes}
              showName={show.name}
              pricePerAdult={show.priceFrom}
              darkDays={show.darkDays}
            />
            <div className="rounded-xl bg-[#F6F4EF] border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#1A1614] mb-2">Season Information</h3>
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

        {/* ===== Location Tab ===== */}
        {activeTab === "location" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1A1614] font-heading">
              Theater Location
            </h2>
            <div className="rounded-xl bg-[#F6F4EF] border border-gray-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#13264D]/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#13264D]" />
                </div>
                <div>
                  {theaterSlug ? (
                    <Link
                      href={`/theaters/${theaterSlug}`}
                      className="text-xl font-bold text-[#13264D] hover:text-[#0D1B38] transition-colors"
                    >
                      {show.theater}
                    </Link>
                  ) : (
                    <p className="text-xl font-bold text-[#1A1614]">{show.theater}</p>
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
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#13264D] text-white font-medium text-sm hover:bg-[#0D1B38] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </a>
                {theaterSlug && (
                  <Link
                    href={`/theaters/${theaterSlug}`}
                    className="inline-flex items-center gap-1 px-5 py-2.5 rounded-lg border-2 border-[#13264D] text-[#13264D] font-medium text-sm hover:bg-[#13264D] hover:text-white transition-all"
                  >
                    View Theater Details <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>

            {/* Map preview — the keyless Google Maps embed endpoint */}
            <div className="rounded-xl border border-gray-200 overflow-hidden">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(
                  `${show.theater}, ${show.theaterAddress}`
                )}&output=embed`}
                title={`Map to ${show.theater}`}
                className="h-72 w-full border-0 sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            {/* Getting There */}
            <div className="rounded-xl bg-[#F6F4EF] border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-[#1A1614] mb-3">Getting There</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#13264D] mt-2 shrink-0" />
                  Located on the famous 76 Country Boulevard (Highway 76) in Branson, MO.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#13264D] mt-2 shrink-0" />
                  Parking is available at the theater. Arrive 30 minutes early for best seating.
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#13264D] mt-2 shrink-0" />
                  Contact the theater or call us for accessible seating options.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* ===== Menu Tab (Dinner Shows Only) ===== */}
        {activeTab === "menu" && isDinnerShow && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#1A1614] font-heading">
              {show.mealType} Menu
            </h2>
            <p className="text-gray-600">
              Your {show.mealType?.toLowerCase()} is included with every ticket to {show.name}.
              Enjoy a delicious meal before the show begins.
            </p>
            <div className="rounded-xl bg-[#F6F4EF] border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <UtensilsCrossed className="w-6 h-6 text-[#E8C65A]" />
                <h3 className="text-lg font-bold text-[#1A1614]">
                  {show.mealType} Included with Your Ticket
                </h3>
              </div>
              <p className="text-sm text-gray-600">
                The {show.mealType?.toLowerCase()} menu features a selection of home-style entrees,
                sides, and desserts. Ask the theater about dietary accommodations.
              </p>
              <div className="mt-4 p-4 rounded-lg bg-[#E8C65A]/5 border border-[#E8C65A]/20">
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
