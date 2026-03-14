"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  showCount?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { star: 14, text: "text-xs", gap: "gap-0.5" },
  md: { star: 18, text: "text-sm", gap: "gap-1" },
  lg: { star: 22, text: "text-base", gap: "gap-1" },
};

export function RatingDisplay({
  rating,
  reviewCount,
  size = "md",
  showCount = true,
  className,
}: RatingDisplayProps) {
  const { star: starSize, text, gap } = sizeMap[size];
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className={cn("flex items-center", gap, className)}>
      <div className="flex items-center" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={starSize}
            className="fill-[#D4A843] text-[#D4A843]"
          />
        ))}
        {hasHalf && (
          <span className="relative inline-block" style={{ width: starSize, height: starSize }}>
            <Star
              size={starSize}
              className="absolute inset-0 text-[#D4A843]"
            />
            <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <Star
                size={starSize}
                className="fill-[#D4A843] text-[#D4A843]"
              />
            </span>
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={starSize}
            className="text-[#D4A843]/30"
          />
        ))}
      </div>
      <span className={cn("font-semibold text-[#D4A843]", text)}>
        {rating.toFixed(1)}
      </span>
      {showCount && reviewCount !== undefined && (
        <span className={cn("text-muted-foreground", text)}>
          ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}
