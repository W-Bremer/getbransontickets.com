import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${siteConfig.name}`,
  description:
    "Get answers to common questions about booking Branson show tickets, attractions, parking, group discounts, and planning your Branson, Missouri vacation.",
  openGraph: {
    title: "Branson Show & Attraction FAQs",
    description:
      "Get answers to common questions about booking Branson show tickets, attractions, and planning your vacation.",
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
