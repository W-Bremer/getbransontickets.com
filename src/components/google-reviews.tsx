import { Star } from "lucide-react";
import type { CuratedReview } from "@/lib/google-places";

interface GoogleReviewsProps {
  reviews: CuratedReview[];
  rating: number;
  reviewCount: number;
  className?: string;
}

/**
 * Curated 5-star guest quotes from the show's Google listing, shown with the
 * aggregate rating beside them so the highlights stay in honest context.
 * Author attribution is required for Google-sourced reviews. No outbound
 * link — paid traffic stays on the page.
 */
export function GoogleReviews({
  reviews,
  rating,
  reviewCount,
  className,
}: GoogleReviewsProps) {
  if (reviews.length === 0) return null;

  return (
    <section className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-2xl font-bold text-[#1A1614] font-heading">
          What Guests Say
        </h2>
        <span className="text-sm font-medium text-gray-500">
          {rating}&#9733; from {reviewCount} Google reviews
        </span>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <figure
            key={`${review.author}-${review.when}`}
            className="flex flex-col rounded-xl border border-gray-100 bg-[#F6F4EF] p-5"
          >
            <div className="flex items-center gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className="h-3.5 w-3.5 fill-[#E8C65A] text-[#E8C65A]"
                  aria-hidden
                />
              ))}
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-xs text-gray-500">
              <span className="font-semibold text-[#1A1614]">{review.author}</span>
              {" "}&middot; Google review &middot; {review.when}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
