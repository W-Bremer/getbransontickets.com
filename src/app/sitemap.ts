import type { MetadataRoute } from "next";
import { siteConfig, categories } from "@/lib/config";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { theaters } from "@/data/theaters";
import { passportCategories } from "@/data/passport";
import { partners } from "@/data/partners";

/**
 * lastModified is set per content group rather than to the build clock. An
 * identical timestamp on every URL reads as a build artifact and Google
 * discounts it. changeFrequency is omitted entirely: Google ignores it.
 */
const CONTENT_UPDATED = {
  // Show catalog audit: schedules and venues verified against each box office.
  shows: new Date("2026-07-25"),
  // Attraction copy cleaned of upstream boilerplate.
  attractions: new Date("2026-07-25"),
  passport: new Date("2026-07-25"),
  theaters: new Date("2026-07-25"),
  legal: new Date("2026-07-25"),
} as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: CONTENT_UPDATED.shows, priority: 1 },
    { url: `${baseUrl}/shows`, lastModified: CONTENT_UPDATED.shows, priority: 0.9 },
    { url: `${baseUrl}/attractions`, lastModified: CONTENT_UPDATED.attractions, priority: 0.9 },
    { url: `${baseUrl}/passport`, lastModified: CONTENT_UPDATED.passport, priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: CONTENT_UPDATED.shows, priority: 0.8 },
    { url: `${baseUrl}/shows/schedule`, lastModified: CONTENT_UPDATED.shows, priority: 0.8 },
    { url: `${baseUrl}/theaters`, lastModified: CONTENT_UPDATED.theaters, priority: 0.7 },
    { url: `${baseUrl}/plan-your-trip`, lastModified: CONTENT_UPDATED.passport, priority: 0.7 },
    { url: `${baseUrl}/passport/deals`, lastModified: CONTENT_UPDATED.passport, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: CONTENT_UPDATED.legal, priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: CONTENT_UPDATED.legal, priority: 0.6 },
    { url: `${baseUrl}/passport/join`, lastModified: CONTENT_UPDATED.passport, priority: 0.6 },
    { url: `${baseUrl}/passport/partners`, lastModified: CONTENT_UPDATED.passport, priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: CONTENT_UPDATED.legal, priority: 0.5 },
    { url: `${baseUrl}/privacy`, lastModified: CONTENT_UPDATED.legal, priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: CONTENT_UPDATED.legal, priority: 0.3 },
    { url: `${baseUrl}/refund-policy`, lastModified: CONTENT_UPDATED.legal, priority: 0.3 },
  ];

  const passportGuidePages: MetadataRoute.Sitemap = passportCategories
    .filter((c) => c.isGuideCategory)
    .map((c) => ({
      url: `${baseUrl}/passport/${c.slug}`,
      lastModified: CONTENT_UPDATED.passport,
      priority: 0.8,
    }));

  const partnerPages: MetadataRoute.Sitemap = partners.map((p) => ({
    url: `${baseUrl}/passport/partners/${p.slug}`,
    lastModified: CONTENT_UPDATED.passport,
    priority: 0.5,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug !== "all")
    .map((cat) => ({
      url: `${baseUrl}/shows/category/${cat.slug}`,
      lastModified: CONTENT_UPDATED.shows,
      priority: 0.7,
    }));

  const showPages: MetadataRoute.Sitemap = shows.map((show) => ({
    url: `${baseUrl}/shows/${show.slug}`,
    lastModified: CONTENT_UPDATED.shows,
    priority: 0.8,
  }));

  const attractionPages: MetadataRoute.Sitemap = attractions.map((a) => ({
    url: `${baseUrl}/attractions/${a.slug}`,
    lastModified: CONTENT_UPDATED.attractions,
    priority: 0.6,
  }));

  const theaterPages: MetadataRoute.Sitemap = theaters.map((t) => ({
    url: `${baseUrl}/theaters/${t.slug}`,
    lastModified: CONTENT_UPDATED.theaters,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...passportGuidePages,
    ...partnerPages,
    ...categoryPages,
    ...showPages,
    ...theaterPages,
    ...attractionPages,
  ];
}
