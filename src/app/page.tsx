import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { getPartnerShows } from "@/data/shows";
import { attractions } from "@/data/attractions";
// import { getPublishedPosts } from "@/data/blog"; // archived
import { ShowCard } from "@/components/show-card";
// import { CategoryCard } from "@/components/category-card";
import { TrustBar } from "@/components/trust-bar";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
// import { DealBanner } from "@/components/deal-banner";
import { HeroSection } from "@/components/hero-section";
import { NewsletterForm } from "@/components/passport/newsletter-form";
import { Tag, Percent, Compass, QrCode, BadgePercent } from "lucide-react";

export default function HomePage() {
  const partnerShows = getPartnerShows();
  const topAttractions = attractions.slice(0, 4);

  return (
    <>
      {/* DealBanner removed */}
      <HeroSection />

      {/* Popular Shows */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
                Most Popular Shows
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                The shows everyone&apos;s talking about — book early, they sell
                out fast.
              </p>
            </div>
            <Link
              href="/shows"
              className="hidden sm:inline-flex items-center gap-2 text-[#7B1A1A] hover:text-[#5A1212] font-semibold transition-colors"
            >
              View All Shows →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {partnerShows.map((show, index) => (
              <ShowCard key={show.slug} show={show} index={index} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6914] text-white rounded-lg font-semibold hover:bg-[#6B5210] transition-colors"
            >
              View All Shows →
            </Link>
          </div>
        </div>
      </section>

      {/* BOGO Deals Callout */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#D4A843] to-[#D4A843]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white/20 p-4">
                <Percent className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  BOGO Deals & Discount Tickets
                </h2>
                <p className="mt-1 text-white/80">
                  Buy one, get one 50% off on select shows. Save big on your Branson vacation.
                </p>
              </div>
            </div>
            <Link
              href="/deals"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#D4A843] rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap"
            >
              View All Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Branson Passport */}
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#13264D] via-[#1B355F] to-[#13264D]" />
        <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-[#C8102E] px-4 py-1.5 text-xs font-bold tracking-widest text-white uppercase">
                <Compass className="h-4 w-4" />
                New & Free
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                The Branson Passport
              </h2>
              <p className="mt-4 text-lg text-white/80">
                More than tickets: your free insider guide to Branson. Where locals eat, what&apos;s
                free to do, what&apos;s on this season, and exclusive deals from local partner
                businesses.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/passport"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-7 py-3.5 font-bold text-white shadow-lg transition-colors hover:bg-[#A50D26]"
                >
                  Open the Passport
                </Link>
                <Link
                  href="/passport/join"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/20"
                >
                  For Businesses
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                {
                  icon: <Compass className="h-6 w-6 text-[#E8555F]" />,
                  title: "Insider Guide",
                  text: "Local restaurants, coffee, shopping, and free things to do.",
                },
                {
                  icon: <QrCode className="h-6 w-6 text-[#E8555F]" />,
                  title: "Scan Anywhere",
                  text: "Passport QR codes at hotels and shops all over town.",
                },
                {
                  icon: <BadgePercent className="h-6 w-6 text-[#E8555F]" />,
                  title: "Exclusive Deals",
                  text: "Partner-only offers you won't find anywhere else.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
                >
                  {item.icon}
                  <h3 className="mt-3 font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-white/70">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Attractions */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
                Top Branson Attractions
              </h2>
              <p className="mt-3 text-lg text-gray-500">
                World-class theme parks, museums, and outdoor adventures beyond the shows.
              </p>
            </div>
            <Link
              href="/attractions"
              className="hidden sm:inline-flex items-center gap-2 text-[#7B1A1A] hover:text-[#5A1212] font-semibold transition-colors"
            >
              View All Attractions →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topAttractions.map((attraction) => (
              <Link
                key={attraction.slug}
                href={`/attractions/${attraction.slug}`}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl border border-gray-100">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={attraction.imageUrl}
                      alt={attraction.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute top-3 left-3 rounded-full bg-[#7B1A1A] px-3 py-1 text-xs font-semibold text-white capitalize">
                      {attraction.type.replace("-", " ")}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#7B1A1A] transition-colors">
                      {attraction.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {attraction.shortDescription}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#8B6914]">
                        From ${attraction.adultPrice}
                      </span>
                      <span className="text-sm text-gray-400">
                        ★ {attraction.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/attractions"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#7B1A1A] text-white rounded-lg font-semibold hover:bg-[#5A1212] transition-colors"
            >
              View All Attractions →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Plan Your Entertainment */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
              Plan Your Branson Entertainment
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              With 40+ shows and {attractions.length}+ attractions,
              every day in Branson is packed with entertainment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/shows/schedule"
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-[#7B1A1A] flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#7B1A1A] transition-colors">
                Show Schedule
              </h3>
              <p className="text-gray-500">
                See what&apos;s playing today, this week, or plan months ahead with our complete schedule.
              </p>
            </Link>
            <Link
              href="/deals"
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-[#D4A843] flex items-center justify-center mb-5">
                <Tag className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#D4A843] transition-colors">
                Deals & Discounts
              </h3>
              <p className="text-gray-500">
                BOGO offers, family packages, and seasonal specials — save big on Branson entertainment.
              </p>
            </Link>
            <Link
              href="/plan-your-trip"
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-[#8B6914] flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#8B6914] transition-colors">
                Plan Your Trip
              </h3>
              <p className="text-gray-500">
                First time? Let us help you plan the perfect Branson entertainment itinerary.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Lodging Partner — Branson Lakes Lodging */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <a
            href="https://bransonlakeslodging.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >
            <div className="flex flex-col lg:flex-row">
              {/* Image side */}
              <div className="relative lg:w-1/2 h-64 sm:h-80 lg:h-auto min-h-[320px] overflow-hidden">
                <Image
                  src="/branson-lakes-lodging.jpg"
                  alt="Premium vacation rental with lake view in Branson, Missouri — Branson Lakes Lodging"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 rounded-full bg-[#1e3a5f] px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-wider">
                  Featured Partner
                </div>
              </div>
              {/* Content side */}
              <div className="lg:w-1/2 p-8 sm:p-10 lg:p-12 flex flex-col justify-center bg-gradient-to-br from-[#1e3a5f] to-[#152d4a]">
                <p className="text-[#D4A843] font-semibold text-sm uppercase tracking-wider mb-3">
                  Where to Stay in Branson
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                  Branson Lakes Lodging
                </h2>
                <p className="text-white/80 text-lg leading-relaxed mb-6">
                  Premium vacation rentals in the heart of Branson — villas, condos, and lake houses with hot tubs, game rooms, and stunning views. From $135/night with 24/7 support and local expertise.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {["Lake Views", "Hot Tubs", "Game Rooms", "Private Docks"].map(
                    (amenity) => (
                      <span
                        key={amenity}
                        className="px-3 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    )
                  )}
                </div>
                <span className="inline-flex items-center gap-2 text-[#D4A843] font-semibold text-lg group-hover:gap-3 transition-all duration-300">
                  Browse Vacation Rentals
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
              What Our Visitors Say
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Join thousands of happy families who booked their Branson entertainment with us.
            </p>
          </div>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Blog / Guides — archived, restore when ready */}

      {/* Final CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B1A1A] to-[#5A1212]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Ready to Experience Branson?
          </h2>
          <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto">
            Over 40 incredible shows, world-class attractions, and unforgettable memories await. Start planning your trip today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8B6914] text-white rounded-xl font-semibold text-lg hover:bg-[#6B5210] transition-colors shadow-xl"
            >
              Browse All Shows
            </Link>
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#7B1A1A] rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Call {siteConfig.phone}
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333]">
            Get Branson Deals in Your Inbox
          </h2>
          <p className="mt-3 text-gray-500">
            Be the first to know about BOGO offers, new shows, and exclusive discounts.
          </p>
          <NewsletterForm />
          <p className="mt-3 text-xs text-gray-400">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
