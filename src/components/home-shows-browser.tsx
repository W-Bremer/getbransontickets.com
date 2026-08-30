"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";
import { ShowCard, type ShowCardData } from "@/components/show-card";
import { formatPrice, cn } from "@/lib/utils";

export type BrowsableShow = ShowCardData & { category: string[] };

interface HomeShowsBrowserProps {
  shows: BrowsableShow[];
  /** Category filter chips, in display order: [slug, label]. */
  categories: [string, string][];
}

const TIMES = [
  ["morning", "Morning"],
  ["afternoon", "Afternoon"],
  ["evening", "Evening"],
] as const;

function Chip({
  active,
  onClick,
  children,
  activeClass = "bg-[#13264D] text-white",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  activeClass?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
        active ? activeClass : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      )}
    >
      {children}
    </button>
  );
}

export function HomeShowsBrowser({ shows, categories }: HomeShowsBrowserProps) {
  const [category, setCategory] = useState("all");
  const [time, setTime] = useState<string | null>(null);
  const [kidsFree, setKidsFree] = useState(false);

  const filtered = useMemo(() => {
    return shows.filter((s) => {
      if (category !== "all" && !s.category.includes(category)) return false;
      if (time && s.timeOfDay !== time) return false;
      if (kidsFree && s.childPriceFrom !== 0) return false;
      return true;
    });
  }, [shows, category, time, kidsFree]);

  const hasActiveFilters = category !== "all" || time !== null || kidsFree;
  const clearAll = () => {
    setCategory("all");
    setTime(null);
    setKidsFree(false);
  };

  return (
    <div>
      {/* Filter chips. One row scrolls on phones instead of wrapping into a
          wall of buttons; on wider screens the rows wrap normally. */}
      <div className="space-y-2">
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>
            All Shows
          </Chip>
          {categories.map(([slug, label]) => (
            <Chip
              key={slug}
              active={category === slug}
              onClick={() => setCategory(category === slug ? "all" : slug)}
            >
              {label}
            </Chip>
          ))}
        </div>
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          <Chip
            active={kidsFree}
            onClick={() => setKidsFree(!kidsFree)}
            activeClass="bg-[#C8102E] text-white"
          >
            Kids Free
          </Chip>
          {TIMES.map(([slug, label]) => (
            <Chip
              key={slug}
              active={time === slug}
              onClick={() => setTime(time === slug ? null : slug)}
            >
              {label}
            </Chip>
          ))}
          {hasActiveFilters && (
            <button
              onClick={clearAll}
              className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-[#C8102E] hover:bg-red-50"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 mb-4 text-sm text-gray-500 sm:mb-6">
        {filtered.length === shows.length
          ? `${shows.length} shows`
          : `${filtered.length} of ${shows.length} shows`}
      </p>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-14 text-center">
          <p className="text-gray-500">No shows match those filters.</p>
          <button
            onClick={clearAll}
            className="mt-2 text-sm font-semibold text-[#13264D] hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <>
          {/* Phone: compact list rows — thumbnail, name, price. */}
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm sm:hidden">
            {filtered.map((show) => (
              <li key={show.slug}>
                <Link
                  href={`/shows/${show.slug}`}
                  className="flex items-center gap-3 p-3 active:bg-gray-50"
                >
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={show.imageUrl}
                      alt={show.imageAlt}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-[15px] font-bold leading-snug text-[#1A1614]">
                      {show.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-gray-500">
                      {show.theater}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 capitalize">
                      {show.timeOfDay}
                      {show.mealIncluded && (
                        <span className="text-[#C04E0C] font-medium"> &middot; Dinner show</span>
                      )}
                      {show.childPriceFrom === 0 && (
                        <span className="font-bold text-[#C8102E] uppercase"> &middot; Kids free</span>
                      )}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5">
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wide text-gray-400">
                        From
                      </div>
                      <div className="text-base font-bold leading-tight text-[#1A1614]">
                        ${formatPrice(show.priceFrom)}
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-300" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {/* Tablet and up: the full cards. */}
          <div className="hidden gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
            {filtered.map((show, index) => (
              <ShowCard key={show.slug} show={show} index={index} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
