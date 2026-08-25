import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal fulfillment desk. Pages also carry noindex meta.
        disallow: "/office",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
