"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewCard } from "@/components/review-card";

interface Review {
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  location?: string;
}

interface ReviewsSectionProps {
  showName: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
}

const INITIAL_COUNT = 5;

export function ReviewsSection({
  showName,
  rating,
  reviewCount,
  reviews,
}: ReviewsSectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  // Calculate star distribution from reviews
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.floor(r.rating) === star).length;
    const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
    return { star, count, pct };
  });

  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  const visibleReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-[#333333]">
        Reviews for {showName}
      </h2>

      {/* Aggregate stats */}
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:items-start">
        {/* Big rating */}
        <div className="flex shrink-0 flex-col items-center rounded-xl bg-gray-50 px-8 py-6">
          <span className="text-5xl font-bold text-[#333333]">
            {rating.toFixed(1)}
          </span>
          <div
            className="mt-2 flex items-center gap-0.5"
            aria-label={`${rating} out of 5 stars`}
          >
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star
                key={`full-${i}`}
                size={20}
                className="fill-[#D4A843] text-[#D4A843]"
              />
            ))}
            {hasHalf && (
              <span
                className="relative inline-block"
                style={{ width: 20, height: 20 }}
              >
                <Star size={20} className="absolute inset-0 text-[#D4A843]" />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star
                    size={20}
                    className="fill-[#D4A843] text-[#D4A843]"
                  />
                </span>
              </span>
            )}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <Star
                key={`empty-${i}`}
                size={20}
                className="text-[#D4A843]/30"
              />
            ))}
          </div>
          <span className="mt-1 text-sm text-gray-500">
            {reviewCount.toLocaleString()} reviews
          </span>
        </div>

        {/* Distribution bars */}
        <div className="flex-1 space-y-2">
          {distribution.map(({ star, count, pct }) => (
            <div key={star} className="flex items-center gap-3">
              <span className="w-12 shrink-0 text-right text-sm font-medium text-[#333333]">
                {star} star
              </span>
              <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#D4A843] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-8 shrink-0 text-sm text-gray-500">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews list */}
      <div className="mt-8 space-y-4">
        {visibleReviews.map((review, i) => (
          <ReviewCard key={i} {...review} />
        ))}
      </div>

      {/* Show more button */}
      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() =>
              setVisibleCount((prev) => prev + INITIAL_COUNT)
            }
            className="rounded-lg border border-[#7B1A1A] px-6 py-2.5 text-sm font-semibold text-[#7B1A1A] transition-colors hover:bg-[#7B1A1A] hover:text-white"
          >
            Show More Reviews
          </button>
        </div>
      )}
    </section>
  );
}
