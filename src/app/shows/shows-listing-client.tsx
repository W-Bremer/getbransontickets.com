"use client";

import { useState, useMemo } from "react";
import { ShowCard } from "@/components/show-card";
import { SlidersHorizontal, X } from "lucide-react";
import type { Show } from "@/data/shows";
import type { categories } from "@/lib/config";

type SortOption = "popular" | "price-low" | "price-high" | "rating" | "name";

interface ShowsListingClientProps {
  shows: Show[];
  categories: typeof categories;
}

export function ShowsListingClient({ shows, categories }: ShowsListingClientProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [timeOfDay, setTimeOfDay] = useState<string>("all");
  const [mealOnly, setMealOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredShows = useMemo(() => {
    let filtered = [...shows];

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((s) => s.category.includes(selectedCategory));
    }

    // Price filter
    filtered = filtered.filter(
      (s) => s.priceFrom >= priceRange[0] && s.priceFrom <= priceRange[1]
    );

    // Time of day filter
    if (timeOfDay !== "all") {
      filtered = filtered.filter((s) => s.timeOfDay === timeOfDay);
    }

    // Meal filter
    if (mealOnly) {
      filtered = filtered.filter((s) => s.mealIncluded);
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.theater.toLowerCase().includes(q) ||
          s.tags.some((t) => t.includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case "price-low":
        filtered.sort((a, b) => a.priceFrom - b.priceFrom);
        break;
      case "price-high":
        filtered.sort((a, b) => b.priceFrom - a.priceFrom);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [shows, selectedCategory, sortBy, priceRange, timeOfDay, mealOnly, searchQuery]);

  const activeFilterCount = [
    selectedCategory !== "all",
    timeOfDay !== "all",
    mealOnly,
    priceRange[0] > 0 || priceRange[1] < 100,
  ].filter(Boolean).length;

  return (
    <div className="py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-200">
          <div className="flex flex-wrap items-center gap-3">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.slug
                      ? "bg-[#037B98] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#F76E00] text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-[#037B98]"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">A — Z</option>
            </select>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mb-8 p-6 rounded-xl bg-[#F5F5F5] border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Search
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Show name, theater..."
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#037B98]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Time of Day
                </label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#037B98]"
                >
                  <option value="all">Any Time</option>
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Max Price
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full accent-[#037B98]"
                />
                <div className="text-sm text-gray-500 mt-1">Up to ${priceRange[1]}</div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#333333] mb-2">
                  Options
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={mealOnly}
                    onChange={(e) => setMealOnly(e.target.checked)}
                    className="rounded accent-[#037B98]"
                  />
                  Dinner shows only
                </label>
              </div>
            </div>
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setTimeOfDay("all");
                  setMealOnly(false);
                  setPriceRange([0, 100]);
                  setSearchQuery("");
                }}
                className="mt-4 flex items-center gap-1 text-sm text-[#037B98] hover:text-[#005C73] font-medium"
              >
                <X className="w-4 h-4" /> Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-sm text-gray-500">
          Showing {filteredShows.length} of {shows.length} shows
        </div>

        {/* Show Grid */}
        {filteredShows.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredShows.map((show, index) => (
              <ShowCard key={show.slug} show={show} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No shows match your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setTimeOfDay("all");
                setMealOnly(false);
                setPriceRange([0, 100]);
                setSearchQuery("");
              }}
              className="mt-4 text-[#037B98] hover:text-[#005C73] font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
