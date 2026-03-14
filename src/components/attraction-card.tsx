import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import type { Attraction } from "@/data/attractions";

const typeLabels: Record<Attraction["type"], string> = {
  "theme-park": "Theme Park",
  museum: "Museum",
  outdoor: "Outdoor",
  show: "Show",
  "water-park": "Water Park",
  amusement: "Amusement",
  tour: "Tour",
};

function StarRating({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={`full-${i}`} size={14} className="fill-[#D4A843] text-[#D4A843]" />
        ))}
        {hasHalf && (
          <span className="relative inline-block" style={{ width: 14, height: 14 }}>
            <Star size={14} className="absolute inset-0 text-[#D4A843]" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
              <Star size={14} className="fill-[#D4A843] text-[#D4A843]" />
            </span>
          </span>
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} size={14} className="text-[#D4A843]/30" />
        ))}
      </div>
      <span className="text-xs font-semibold text-[#D4A843]">{rating.toFixed(1)}</span>
      <span className="text-xs text-[#333333]/60">
        ({reviewCount.toLocaleString()} reviews)
      </span>
    </div>
  );
}

interface AttractionCardProps {
  attraction: Attraction;
  className?: string;
}

export function AttractionCard({ attraction, className }: AttractionCardProps) {
  return (
    <div className={className}>
      <Link href={`/attractions/${attraction.slug}`} className="block">
        <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={attraction.imageUrl}
              alt={attraction.imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />

            {/* Type badge */}
            <div className="absolute top-3 left-3">
              <span className="rounded-full bg-[#7B1A1A]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {typeLabels[attraction.type]}
              </span>
            </div>

            {/* Price badge */}
            <div className="absolute bottom-3 right-3 rounded-xl bg-[#5A1212]/85 px-3 py-1.5 backdrop-blur-md">
              <span className="text-xs font-medium text-white/80">From</span>
              <span className="ml-1 text-lg font-bold text-white">
                ${attraction.adultPrice}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 pt-3">
            <h3 className="text-lg font-bold leading-tight text-[#333333] transition-colors group-hover:text-[#7B1A1A] line-clamp-1">
              {attraction.name}
            </h3>

            <div className="mt-1.5">
              <StarRating rating={attraction.rating} reviewCount={attraction.reviewCount} />
            </div>

            <p className="mt-2 text-sm leading-relaxed text-[#333333]/60 line-clamp-2">
              {attraction.shortDescription}
            </p>

            <div className="mt-2.5 flex items-center gap-1.5 text-sm text-[#333333]/50">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#D4A843]" />
              <span className="truncate">{attraction.address}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
