import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { siteConfig } from "@/lib/config";
import { TripPlanner } from "@/components/trip-planner";

export function HeroSection() {
  return (
    <section className="relative flex min-h-[78vh] flex-col justify-end overflow-hidden lg:min-h-[86vh] lg:justify-center">
      <div className="absolute inset-0">
        <Image
          src="/Branson-strip.jpg"
          alt="The Branson Strip after dark, looking down 76 Country Boulevard toward the Branson Ferris Wheel"
          fill
          className="object-cover object-[68%_35%] lg:object-[center_38%]"
          priority
          sizes="100vw"
          quality={82}
        />
        {/* Directional wash keeps the ferris wheel visible on the right instead
            of flattening the whole photo under one scrim. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B1424] via-[#0B1424]/80 to-[#0B1424]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1424] via-transparent to-transparent lg:from-[#0B1424]/70" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-6 sm:px-6 sm:pb-12 lg:px-8 lg:pb-0">
        <div className="grid items-center gap-6 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-3">
            <h1 className="marquee text-[2rem] text-white sm:text-5xl lg:text-[3.6rem]">
              Tickets to {shows.length} Branson shows,
              <br />
              <span className="text-[#E8C65A]">checked against the box office.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              We re-verified every showtime and venue in July 2026, which is how four shows that
              had closed came off this site. Plus {attractions.length} attractions worth your time.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/shows"
                className="inline-flex items-center rounded-sm bg-[#C8102E] px-6 py-3.5 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#A50D26]"
              >
                Browse all shows
              </Link>
              <Link
                href="/passport"
                className="inline-flex items-center rounded-sm border border-white/45 px-6 py-3.5 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
              >
                Free Branson guide
              </Link>
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="inline-flex items-center gap-2 py-3.5 text-sm font-semibold text-white/80 transition-colors hover:text-white"
              >
                <Phone className="h-4 w-4" />
                {siteConfig.phone}
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <TripPlanner className="bg-white shadow-[0_24px_60px_-20px_rgba(0,0,0,0.65)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
