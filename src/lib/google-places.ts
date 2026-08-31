/**
 * Live Google Business Profile data for show pages: the current star rating,
 * review count, and a curated set of 5-star review quotes.
 *
 * Reads the Places API (New) server-side only — the key never reaches the
 * browser. Results ride the page's ISR window via fetch revalidation, and
 * every failure path returns null so the page falls back to the verified
 * static values in shows.ts. Google requires reviews to be shown with the
 * author's attribution; the display components render name + source.
 */

export interface CuratedReview {
  author: string;
  rating: number;
  text: string;
  /** Google's human phrasing, e.g. "a month ago". */
  when: string;
}

export interface PlaceSnapshot {
  rating: number;
  reviewCount: number;
  reviews: CuratedReview[];
}

interface PlacesApiReview {
  rating?: number;
  text?: { text?: string };
  authorAttribution?: { displayName?: string };
  relativePublishTimeDescription?: string;
}

interface PlacesApiResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: PlacesApiReview[];
}

/**
 * Quote curation: the page highlights the show's best guest reviews (the
 * 4.6/265 aggregate shown beside them keeps the full picture honest). Google
 * rotates which five "most relevant" reviews the API returns, so the filter
 * has to hold up unattended: 5-star only, enough text to read as a real
 * quote, and no backhanded openers slipping into the highlight reel.
 */
const SOUR_NOTES = /needs work|however|disappoint|rude|dirty|refund|worn|outdated|run.?down/i;

function curateReviews(reviews: PlacesApiReview[]): CuratedReview[] {
  return reviews
    .map((r) => ({
      author: r.authorAttribution?.displayName?.trim() ?? "",
      rating: r.rating ?? 0,
      text: (r.text?.text ?? "").replace(/\s+/g, " ").trim(),
      when: r.relativePublishTimeDescription ?? "",
    }))
    .filter((r) => r.rating === 5 && r.author && r.text.length >= 60 && !SOUR_NOTES.test(r.text))
    .slice(0, 3)
    .map((r) => ({ ...r, text: truncateAtWord(r.text, 230) }));
}

function truncateAtWord(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > max * 0.6 ? lastSpace : max).replace(/[,;:.!?]$/, "")}…`;
}

export async function getPlaceSnapshot(placeId: string): Promise<PlaceSnapshot | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews",
      },
      // Matches the show page's ISR window; one Places call a day per show.
      next: { revalidate: 86400 },
    });
    if (!res.ok) return null;

    const data = (await res.json()) as PlacesApiResponse;
    if (typeof data.rating !== "number" || typeof data.userRatingCount !== "number") {
      return null;
    }

    return {
      rating: data.rating,
      reviewCount: data.userRatingCount,
      reviews: curateReviews(data.reviews ?? []),
    };
  } catch (err) {
    console.error("places lookup failed:", placeId, err);
    return null;
  }
}
