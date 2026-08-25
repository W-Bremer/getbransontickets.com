import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import type { Attraction } from "@/data/attractions";

const typeLabels: Record<Attraction["type"], string> = {
  "theme-park": "Theme Park",
  museum: "Museum",
  outdoor: "Outdoor",
  show: "Show",
  "water-park": "Water Park",
  amusement: "Amusement",
  tour: "Tour",
  entertainment: "Entertainment",
  "mini-golf": "Mini Golf",
};

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
              <span className="rounded-full bg-[#13264D]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                {typeLabels[attraction.type]}
              </span>
            </div>

            {/* Price badge */}
            <div className="absolute bottom-3 right-3 rounded-xl bg-[#0D1B38]/85 px-3 py-1.5 backdrop-blur-md">
              <span className="text-xs font-medium text-white/80">From</span>
              <span className="ml-1 text-lg font-bold text-white">
                ${attraction.adultPrice}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 pt-3">
            <h3 className="text-lg font-bold leading-tight text-[#1A1614] transition-colors group-hover:text-[#13264D] line-clamp-1">
              {attraction.name}
            </h3>

            {/* Ratings removed: attraction.rating / attraction.reviewCount
                were invented values from the original build, not reviews we
                hold. Restore only with a real, citable source. */}

            <p className="mt-2 text-sm leading-relaxed text-[#1A1614]/60 line-clamp-2">
              {attraction.shortDescription}
            </p>

            <div className="mt-2.5 flex items-center gap-1.5 text-sm text-[#1A1614]/50">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-[#E8C65A]" />
              <span className="truncate">{attraction.address}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
