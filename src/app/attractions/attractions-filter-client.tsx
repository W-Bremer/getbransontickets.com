"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal } from "lucide-react";
import { AttractionCard } from "@/components/attraction-card";
import type { Attraction } from "@/data/attractions";

type SortOption = "popularity" | "price-low" | "price-high" | "rating";

interface AttractionsFilterClientProps {
  attractions: Attraction[];
  attractionTypes: readonly { name: string; slug: string }[];
}

export function AttractionsFilterClient({
  attractions,
  attractionTypes,
}: AttractionsFilterClientProps) {
  const [activeType, setActiveType] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popularity");

  const filtered = useMemo(() => {
    let list =
      activeType === "all"
        ? [...attractions]
        : attractions.filter((a) => a.type === activeType);

    switch (sortBy) {
      case "popularity":
        list.sort((a, b) => b.searchVolume - a.searchVolume);
        break;
      case "price-low":
        list.sort((a, b) => a.adultPrice - b.adultPrice);
        break;
      case "price-high":
        list.sort((a, b) => b.adultPrice - a.adultPrice);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }

    return list;
  }, [attractions, activeType, sortBy]);

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          {/* Type Filters */}
          <div className="flex flex-wrap gap-2">
            {attractionTypes.map((type) => (
              <button
                key={type.slug}
                onClick={() => setActiveType(type.slug)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  activeType === type.slug
                    ? "bg-[#037B98] text-white shadow-md"
                    : "bg-[#F5F5F5] text-[#333333]/70 hover:bg-[#037B98]/10 hover:text-[#037B98]"
                }`}
              >
                {type.name}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-[#333333]/50" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-[#333333] focus:border-[#037B98] focus:outline-none focus:ring-1 focus:ring-[#037B98]"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <p className="mb-6 text-sm text-[#333333]/60">
          Showing {filtered.length} attraction{filtered.length !== 1 ? "s" : ""}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filtered.map((attraction) => (
            <AttractionCard key={attraction.slug} attraction={attraction} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-lg text-[#333333]/60">
              No attractions found for this category.
            </p>
            <button
              onClick={() => setActiveType("all")}
              className="mt-4 text-[#037B98] font-semibold hover:underline"
            >
              View all attractions
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
