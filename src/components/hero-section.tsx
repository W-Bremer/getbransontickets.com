"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ChevronRight } from "lucide-react";
import { TripPlanner } from "@/components/trip-planner";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-end overflow-hidden">
      {/* Background Photo — let it breathe */}
      <div className="absolute inset-0">
        <Image
          src="/Branson-strip.jpg"
          alt="Aerial nighttime view of the Branson Strip with Ferris wheel and attractions lit up"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Subtle gradient: transparent at top to let photo show, dark at bottom for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* Content — pinned to the bottom */}
      <div className="relative z-10 mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-12 lg:pb-16">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-end">
          {/* Left — Headline & CTAs (3 cols) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm sm:text-base font-medium tracking-wide text-white/70 uppercase mb-3">
              Branson, Missouri
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1] tracking-tight">
              Live Shows, Legendary
              <br />
              Attractions, One Town.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-white/70 max-w-lg leading-relaxed">
              Find tickets to 50+ shows and 130+ attractions in the live entertainment capital of the world.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shows"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#1a1a1a] shadow-lg transition hover:bg-white/90"
              >
                Browse Shows
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/attractions"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Explore Attractions
              </Link>
            </div>
          </motion.div>

          {/* Right — Trip Planner (2 cols) */}
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
