import type { MetadataRoute } from "next";
import { siteConfig, categories } from "@/lib/config";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
// import { getPublishedPosts } from "@/data/blog"; // archived
import { theaters } from "@/data/theaters";
import { passportCategories } from "@/data/passport";
import { partners } from "@/data/partners";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/shows`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/deals`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${baseUrl}/shows/schedule`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/theaters`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/attractions`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    // { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 }, // archived
    { url: `${baseUrl}/cart`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/plan-your-trip`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/passport`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/passport/join`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/passport/partners`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/passport/deals`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const passportGuidePages: MetadataRoute.Sitemap = passportCategories
    .filter((c) => c.isGuideCategory)
    .map((c) => ({
      url: `${baseUrl}/passport/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));

  const partnerPages: MetadataRoute.Sitemap = partners.map((p) => ({
    url: `${baseUrl}/passport/partners/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const categoryPages: MetadataRoute.Sitemap = categories
    .filter((c) => c.slug !== "all")
    .map((cat) => ({
      url: `${baseUrl}/shows/category/${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const showPages: MetadataRoute.Sitemap = shows.map((show) => ({
    url: `${baseUrl}/shows/${show.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const attractionPages: MetadataRoute.Sitemap = attractions.map((a) => ({
    url: `${baseUrl}/attractions/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Blog pages archived
  const blogPages: MetadataRoute.Sitemap = [];

  const theaterPages: MetadataRoute.Sitemap = theaters.map((t) => ({
    url: `${baseUrl}/theaters/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...passportGuidePages, ...partnerPages, ...categoryPages, ...showPages, ...theaterPages, ...attractionPages, ...blogPages];
}
