import { Star, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ReviewCardProps {
  name: string;
  rating: number;
  date: string;
  text: string;
  verified: boolean;
  location?: string;
}

export function ReviewCard({
  name,
  rating,
  date,
  text,
  verified,
  location,
}: ReviewCardProps) {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-semibold text-[#333333]">{name}</h4>
            {verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#8B6914]/10 px-2 py-0.5 text-xs font-medium text-[#8B6914]">
                <CheckCircle className="h-3 w-3" />
                Verified Booking
              </span>
            )}
          </div>
          {location && (
            <p className="mt-0.5 text-sm text-gray-500">{location}</p>
          )}
        </div>
        <time className="shrink-0 text-sm text-gray-400">{date}</time>
      </div>

      <div className="mt-2 flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={16}
            className="fill-[#D4A843] text-[#D4A843]"
          />
        ))}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={16}
            className="text-[#D4A843]/30"
          />
        ))}
      </div>

      <p className="mt-3 text-sm leading-relaxed text-[#333333]/80">{text}</p>
    </div>
  );
}
