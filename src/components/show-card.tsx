"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { RatingDisplay } from "@/components/rating-display";
import type { Show } from "@/data/shows";

interface ShowCardProps {
  show: Show;
  index?: number;
  className?: string;
}

const tagColors: Record<string, string> = {
  BOGO: "bg-[#8B6914] text-white",
  Dinner: "bg-[#D4A843] text-white",
  New: "bg-[#7B1A1A] text-white",
  "Limited Engagement": "bg-[#C04E0C] text-white",
  "Family Friendly": "bg-sky-500/90 text-white",
  "Most Popular": "bg-[#D4A843] text-white",
};

function getTagStyle(tag: string) {
  return tagColors[tag] || "bg-white/20 text-white backdrop-blur-sm";
}

export function ShowCard({ show, index = 0, className }: ShowCardProps) {
  const displayTags: string[] = [];
  if (show.isNew2026) displayTags.push("New");
  if (show.mealIncluded) displayTags.push("Dinner");
  if (show.isLimitedEngagement) displayTags.push("Limited Engagement");
  if (show.specialOffers.some((o) => o.toLowerCase().includes("bogo")))
    displayTags.push("BOGO");
  if (show.isFeatured && !show.isNew2026) displayTags.push("Most Popular");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className={cn("group", className)}
    >
      <Link href={`/shows/${show.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-2xl border border-gray-100">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={show.imageUrl}
              alt={show.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Tags */}
            {displayTags.length > 0 && (
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide",
                      getTagStyle(tag)
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Price badge */}
            <div className="absolute bottom-3 right-3 rounded-xl bg-white/95 px-3 py-1.5 backdrop-blur-md shadow-sm">
              <span className="text-xs font-medium text-[#7B1A1A]">From</span>
              <span className="ml-1 text-lg font-bold text-[#333333]">
                ${show.priceFrom}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 pt-3">
            <h3 className="text-lg font-bold text-[#333333] leading-tight group-hover:text-[#7B1A1A] transition-colors line-clamp-1">
              {show.name}
            </h3>

            <div className="mt-1.5 flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4A843]" />
              <span className="truncate">{show.theater}</span>
            </div>

            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <Clock className="h-3.5 w-3.5 shrink-0 text-[#7B1A1A]" />
              <span>{show.duration}</span>
              <span className="text-gray-300">|</span>
              <span className="capitalize">{show.timeOfDay}</span>
            </div>

            <div className="mt-2.5">
              <RatingDisplay
                rating={show.rating}
                reviewCount={show.reviewCount}
                size="sm"
              />
            </div>

            <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
              {show.shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
