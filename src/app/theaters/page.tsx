import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Users, Star, Calendar, ChevronRight } from "lucide-react";
import { theaters } from "@/data/theaters";
import { shows } from "@/data/shows";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `All Branson Theaters & Venues 2026 | ${siteConfig.name}`,
  description:
    "Explore every Branson theater and performance venue — from the iconic Clay Cooper Theatre to Sight & Sound's massive stage. Find shows, seating, directions, and more.",
  openGraph: {
    title: "All Branson Theaters & Venues 2026",
    description:
      "Complete guide to every Branson theater and venue. Find shows, seating, parking, and directions.",
    url: `${siteConfig.url}/theaters`,
    type: "website",
    siteName: siteConfig.name,
  },
};

function getShowCountForTheater(theaterName: string): number {
  return shows.filter((s) => s.theater === theaterName).length;
}

export default function TheatersPage() {
  const theaterSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Branson Theaters & Venues",
    description: metadata.description,
    url: `${siteConfig.url}/theaters`,
    mainEntity: theaters.map((theater) => ({
      "@type": "PerformingArtsTheater",
      name: theater.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: theater.address,
        addressLocality: "Branson",
        addressRegion: "MO",
        postalCode: "65616",
        addressCountry: "US",
      },
      telephone: theater.phone,
      url: theater.website,
    })),
  };

  return (
    <>
      <JsonLd data={theaterSchema} />

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px]">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Clay_Cooper_Theatre%2C_Branson%2C_MO_IMG_1716_%282%29.JPG/1280px-Clay_Cooper_Theatre%2C_Branson%2C_MO_IMG_1716_%282%29.JPG"
          alt="Clay Cooper Theatre on the famous 76 Country Boulevard Strip in Branson Missouri"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#5A1212] via-[#5A1212]/60 to-[#5A1212]/30" />
        <div className="absolute bottom-0 left-0 right-0 pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Theaters" },
              ]}
            />
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
              Branson Theaters & Venues
            </h1>
            <p className="mt-3 text-lg text-white/70 max-w-2xl">
              Discover {theaters.length} world-class theaters and performance venues
              across Branson — from intimate 210-seat stages to the massive 3,000-seat
              Mansion Theatre. Every theater has its own personality and charm.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#0f172a] border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-[#d4a843] font-heading">
                {theaters.length}+
              </div>
              <div className="text-sm text-white/60">Theaters & Venues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#d4a843] font-heading">
                {theaters.reduce((sum, t) => sum + t.seatingCapacity, 0).toLocaleString()}+
              </div>
              <div className="text-sm text-white/60">Total Seats</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#d4a843] font-heading">50+</div>
              <div className="text-sm text-white/60">Live Shows</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#d4a843] font-heading">1959</div>
              <div className="text-sm text-white/60">First Theater Opened</div>
            </div>
          </div>
        </div>
      </section>

      {/* Theater Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {theaters.map((theater) => {
              const showCount = getShowCountForTheater(theater.name);
              return (
                <Link
                  key={theater.slug}
                  href={`/theaters/${theater.slug}`}
                  className="group rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={theater.imageUrl}
                      alt={theater.imageAlt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-sm">
                      <Star className="w-4 h-4 text-[#d4a843] fill-[#d4a843]" />
                      <span className="font-semibold">{theater.rating}</span>
                      <span className="text-white/70">
                        ({theater.reviewCount.toLocaleString()})
                      </span>
                    </div>
                    {showCount > 0 && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#d4a843] text-[#0f172a] text-xs font-bold">
                        {showCount} {showCount === 1 ? "Show" : "Shows"}
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-bold text-[#0f172a] font-heading group-hover:text-[#d4a843] transition-colors">
                      {theater.name}
                    </h2>
                    <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {theater.address.split(",")[0]}
                    </p>
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                      {theater.shortDescription}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          {theater.seatingCapacity.toLocaleString()} seats
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          Est. {theater.yearBuilt}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#d4a843] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Branson Theater District Info */}
      <section className="py-12 sm:py-16 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0f172a] font-heading">
                The 76 Country Boulevard Theater District
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Most of Branson&apos;s theaters are concentrated along the famous 76
                Country Boulevard — a stretch of road known simply as &quot;The Strip.&quot;
                This iconic entertainment corridor runs through the heart of Branson and
                is lined with theaters, restaurants, shops, and attractions. From Clay
                Cooper Theatre on the west end to Presleys&apos; on the east, you can
                easily visit multiple theaters in a single day.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Beyond the Strip, you&apos;ll find additional venues along Shepherd of the
                Hills Expressway and in downtown Branson near the Branson Landing
                waterfront. Whether you&apos;re looking for a 2,000-seat production or an
                intimate 400-seat family show, Branson has a theater that&apos;s perfect for
                your experience.
              </p>
              <div className="mt-6">
                <Link
                  href="/shows"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a843] text-white rounded-lg font-semibold hover:bg-[#b8922e] transition-colors"
                >
                  Browse All Shows
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="mt-8 lg:mt-0 grid grid-cols-2 gap-4">
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Downtown_Branson_Missouri.jpg/1280px-Downtown_Branson_Missouri.jpg"
                  alt="Downtown Branson Missouri entertainment district"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Table_Rock_Branson_Missouri.jpg/1280px-Table_Rock_Branson_Missouri.jpg"
                  alt="Table Rock Lake scenic view near Branson Missouri"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Clay_Cooper_Theatre%2C_Branson%2C_MO_IMG_1716_%282%29.JPG/640px-Clay_Cooper_Theatre%2C_Branson%2C_MO_IMG_1716_%282%29.JPG"
                  alt="Clay Cooper Theatre exterior on the Branson Strip"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="relative h-48 rounded-xl overflow-hidden">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Moon_River_Theatre%2C_Branson%2C_MO_IMG_1682.JPG/640px-Moon_River_Theatre%2C_Branson%2C_MO_IMG_1682.JPG"
                  alt="Andy Williams Moon River Theatre on the Branson Strip"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-[#0f172a]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
            Need Help Choosing a Show?
          </h2>
          <p className="mt-3 text-white/60">
            Our Branson entertainment experts know every theater and every show.
            Call us for personalized recommendations.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`tel:${siteConfig.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#d4a843] text-[#0f172a] rounded-lg font-semibold hover:bg-[#e8c36a] transition-colors"
            >
              Call {siteConfig.phone}
            </Link>
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/20 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Browse Shows
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
