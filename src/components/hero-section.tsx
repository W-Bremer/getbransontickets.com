"use client";

import Image from "next/image";
import { Star, Ticket, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { TripPlanner } from "@/components/trip-planner";

export function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1920&h=1080&fit=crop&q=80"
          alt="Live entertainment stage with bright lights in Branson Missouri"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#037B98]/70 via-[#005C73]/50 to-[#005C73]/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-6">
              <Star className="w-4 h-4 text-[#FB9219] fill-[#FB9219]" />
              <span>The Live Entertainment Capital of the World</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Book Your Perfect
              <br />
              <span className="text-[#FB9219]">Branson Experience</span>
            </h1>

            <p className="mt-6 text-lg text-white/80 max-w-xl">
              50+ incredible live shows, world-class attractions, and unforgettable entertainment.
              Book tickets, compare prices, and save with exclusive deals.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Ticket className="w-5 h-5 text-[#FB9219]" />
                </div>
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-xs text-white/60">Live Shows</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-[#FB9219] fill-[#FB9219]" />
                </div>
                <div className="text-2xl font-bold text-white">4.8</div>
                <div className="text-xs text-white/60">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <MapPin className="w-5 h-5 text-[#FB9219]" />
                </div>
                <div className="text-2xl font-bold text-white">7M+</div>
                <div className="text-xs text-white/60">Annual Visitors</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Trip Planner Widget */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <TripPlanner />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
