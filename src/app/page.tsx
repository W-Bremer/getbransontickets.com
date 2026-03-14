import Link from "next/link";
import Image from "next/image";
import { siteConfig, categories } from "@/lib/config";
import { getFeaturedShows, shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { blogPosts } from "@/data/blog";
import { ShowCard } from "@/components/show-card";
import { CategoryCard } from "@/components/category-card";
import { TrustBar } from "@/components/trust-bar";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { DealBanner } from "@/components/deal-banner";
import { HeroSection } from "@/components/hero-section";
import { Tag, Percent, Sparkles } from "lucide-react";

export default function HomePage() {
  const featuredShows = getFeaturedShows();
  const showCategories = categories.filter((c) => c.slug !== "all");
  const topAttractions = attractions.slice(0, 4);

  return (
    <>
      <DealBanner />
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
              className="hidden sm:inline-flex items-center gap-2 text-[#037B98] hover:text-[#005C73] font-semibold transition-colors"
            >
              View All Shows →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredShows.slice(0, 6).map((show, index) => (
              <ShowCard key={show.slug} show={show} index={index} />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#018941] text-white rounded-lg font-semibold hover:bg-[#006B33] transition-colors"
            >
              View All Shows →
            </Link>
          </div>
        </div>
      </section>

      {/* BOGO Deals Callout */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#F76E00] to-[#FB9219]">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#F76E00] rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg whitespace-nowrap"
            >
              View All Deals
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 sm:py-20 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
              What Kind of Show Are You Looking For?
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              From high-energy variety shows to intimate dinner theater, Branson
              has something for every taste.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {showCategories.map((category) => (
              <CategoryCard
                key={category.slug}
                name={category.name}
                slug={category.slug}
                description={category.description}
                showCount={
                  shows.filter((s) => s.category.includes(category.slug)).length
                }
              />
            ))}
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
              className="hidden sm:inline-flex items-center gap-2 text-[#037B98] hover:text-[#005C73] font-semibold transition-colors"
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
                    <div className="absolute top-3 left-3 rounded-full bg-[#037B98] px-3 py-1 text-xs font-semibold text-white capitalize">
                      {attraction.type.replace("-", " ")}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-[#333333] group-hover:text-[#037B98] transition-colors">
                      {attraction.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {attraction.shortDescription}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#018941]">
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
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#037B98] text-white rounded-lg font-semibold hover:bg-[#005C73] transition-colors"
            >
              View All Attractions →
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <TrustBar />

      {/* Plan Your Entertainment */}
      <section className="py-16 sm:py-20 bg-[#F5F5F5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#333333]">
              Plan Your Branson Entertainment
            </h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              With {shows.length}+ shows and {attractions.length}+ attractions,
              every day in Branson is packed with entertainment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              href="/shows/schedule"
              className="group rounded-2xl bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="w-14 h-14 rounded-xl bg-[#037B98] flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#037B98] transition-colors">
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
              <div className="w-14 h-14 rounded-xl bg-[#F76E00] flex items-center justify-center mb-5">
                <Tag className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#F76E00] transition-colors">
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
              <div className="w-14 h-14 rounded-xl bg-[#018941] flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#333333] mb-2 group-hover:text-[#018941] transition-colors">
                Plan Your Trip
              </h3>
              <p className="text-gray-500">
                First time? Let us help you plan the perfect Branson entertainment itinerary.
              </p>
            </Link>
          </div>
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

      {/* Blog / Guides */}
      <section className="py-16 sm:py-20 bg-[#005C73]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Branson Travel Guides
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
              Expert tips, show reviews, and insider knowledge to help you plan the perfect Branson trip.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl bg-white/5 backdrop-blur-sm overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#FB9219]">
                    {post.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white group-hover:text-[#FB9219] transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 line-clamp-2">{post.excerpt}</p>
                  <span className="mt-4 inline-block text-sm text-[#FB9219] font-medium">Read Guide →</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white hover:text-[#005C73] transition-all duration-300"
            >
              View All Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#037B98] to-[#005C73]" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white">
            Ready to Experience Branson?
          </h2>
          <p className="mt-6 text-xl text-white/80 max-w-2xl mx-auto">
            Over {shows.length} incredible shows, world-class attractions, and unforgettable memories await. Start planning your trip today.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#018941] text-white rounded-xl font-semibold text-lg hover:bg-[#006B33] transition-colors shadow-xl"
            >
              Browse All Shows
            </Link>
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#037B98] rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
            >
              Call {siteConfig.phone}
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 bg-[#F5F5F5]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#333333]">
            Get Branson Deals in Your Inbox
          </h2>
          <p className="mt-3 text-gray-500">
            Be the first to know about BOGO offers, new shows, and exclusive discounts.
          </p>
          <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#037B98] focus:border-transparent text-[#333333]"
              required
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#018941] text-white rounded-lg font-semibold hover:bg-[#006B33] transition-colors whitespace-nowrap"
            >
              Get Deals
            </button>
          </form>
          <p className="mt-3 text-xs text-gray-400">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  );
}
