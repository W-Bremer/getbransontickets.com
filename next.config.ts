import type { NextConfig } from "next";

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
  },
};

export default nextConfig;
