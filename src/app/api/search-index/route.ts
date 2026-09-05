import { NextResponse } from "next/server";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { theaters } from "@/data/theaters";

/**
 * Compact site-wide search index for the header search modal. Fetched once
 * per session when search opens, so the heavy catalogs (attractions alone is
 * half a megabyte of source) never ride along in the client bundle.
 */
export interface SearchRecord {
  type: "show" | "attraction" | "theater";
  name: string;
  slug: string;
  subtitle: string;
  /** Tax-inclusive catalog price; the client renders the pre-tax sticker. */
  price?: number;
  tags: string[];
  featured?: boolean;
}

export async function GET() {
  const records: SearchRecord[] = [
    ...shows.map((s) => ({
      type: "show" as const,
      name: s.name,
      slug: s.slug,
      subtitle: s.theater,
      price: s.priceFrom,
      tags: [...s.category, ...s.tags],
      featured: s.isFeatured || undefined,
    })),
    ...attractions.map((a) => ({
      type: "attraction" as const,
      name: a.name,
      slug: a.slug,
      subtitle: "Attraction",
      tags: a.tags.slice(0, 6),
    })),
    ...theaters.map((t) => ({
      type: "theater" as const,
      name: t.name,
      slug: t.slug,
      subtitle: "Branson Theater",
      tags: t.tags.slice(0, 6),
    })),
  ];

  return NextResponse.json(
    { records },
    {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
