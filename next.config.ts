import type { NextConfig } from "next";

/**
 * Attraction slugs used to contain URL-encoded characters (%3a, %26) and a
 * bare "!". Those URLs may be indexed, so redirect them permanently rather
 * than letting them 404.
 */
const legacyAttractionSlugs: Record<string, string> = {
  "pink-jeep-adventure-tours%3a-branson": "pink-jeep-adventure-tours-branson",
  "runaway-mountain-coaster-%26-flyaway-ziplines-at-branson-mountain-adventure":
    "runaway-mountain-coaster-and-flyaway-ziplines",
  "branson-auto-%26-farm-museum": "branson-auto-and-farm-museum",
  "butterfly-palace-%26-rainforest-adventure": "butterfly-palace-and-rainforest-adventure",
  "dicks-5-%26-10": "dicks-5-and-10",
  "firehouse-bowfishing-%26-outdoors-llc": "firehouse-bowfishing-and-outdoors",
  "the-masters-of-escape-%26-mirage-virtual-reality":
    "masters-of-escape-and-mirage-virtual-reality",
  "promised-land-zoo%3a-eagle-rock": "promised-land-zoo-eagle-rock",
  "ripleys-believe-it-or-not!": "ripleys-believe-it-or-not",
  "vip-wine-shine-%26-dine-tour": "vip-wine-shine-and-dine-tour",
  "white-river-adventure-%26-dive-company": "white-river-adventure-and-dive-company",
  "blue-streak-fast-line-%26-free-fall-express": "blue-streak-fast-line-and-free-fall-express",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "assets.simpleviewinc.com" },
      { protocol: "https", hostname: "thehaygoods.com" },
      { protocol: "https", hostname: "media.bransontourismcenter.com" },
      { protocol: "https", hostname: "www.discoverbranson.com" },
      { protocol: "https", hostname: "legendsinconcert.com" },
      { protocol: "https", hostname: "petersenband.com" },
      { protocol: "https", hostname: "dpstampede.com" },
      { protocol: "https", hostname: "hfe.widen.net" },
      { protocol: "https", hostname: "rezalive.com" },
      { protocol: "https", hostname: "www.bransonshows.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "yakov.com" },
      { protocol: "https", hostname: "sst-prod.cdn.sight-sound.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "www.baldknobbers.com" },
      { protocol: "https", hostname: "postcardslive.com" },
      { protocol: "https", hostname: "theshepherdofthehills.com" },
    ],
    qualities: [75, 80, 82, 90],
  },
  async redirects() {
    return Object.entries(legacyAttractionSlugs).map(([from, to]) => ({
      source: `/attractions/${from}`,
      destination: `/attractions/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
