"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { TripPlanner } from "@/components/trip-planner";

export function HeroSection() {
  return (
    <section className="relative min-h-[75vh] lg:min-h-[85vh] flex flex-col justify-end lg:justify-center overflow-hidden">
      {/* Background Photo */}
      <div className="absolute inset-0">
        <Image
          src="/Branson-strip.jpg"
          alt="Aerial nighttime view of the Branson Strip with Ferris wheel and attractions lit up"
          fill
          className="object-cover object-[center_30%] lg:object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/75 via-50% to-black/40 lg:from-black/95 lg:via-black/55 lg:via-40% lg:to-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-6 sm:pb-10 lg:pb-0">
        <div className="grid lg:grid-cols-5 gap-5 lg:gap-12 items-center">
          {/* Headline & CTAs */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-[0.65rem] sm:text-sm font-semibold tracking-widest text-white/60 uppercase mb-1.5 sm:mb-3">
              Branson, Missouri
            </p>

            <h1 className="text-[1.6rem] sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.15] tracking-tight">
              Live Shows, Legendary
              <br />
              Attractions, One Town.
            </h1>

            <p className="mt-2.5 sm:mt-5 text-sm sm:text-lg text-white/80 max-w-lg leading-relaxed">
              Find tickets to 50+ shows and 130+ attractions in the live entertainment capital of the world.
            </p>

            <div className="mt-4 sm:mt-8 flex flex-wrap gap-2.5 sm:gap-3">
              <Link
                href="/shows"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-[#1a1a1a] shadow-lg transition hover:bg-white/90"
              >
                Browse Shows
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/attractions"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Explore Attractions
              </Link>
            </div>
          </motion.div>

          {/* Trip Planner */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <TripPlanner className="backdrop-blur-md bg-white/95 shadow-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
