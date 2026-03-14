import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: `Branson Show Schedule 2026 | Daily Showtimes & Availability | ${siteConfig.name}`,
  description:
    "View the complete Branson show schedule for 2026. Browse morning, afternoon, and evening showtimes. Plan your perfect day of live entertainment in Branson, Missouri.",
  openGraph: {
    title: "Branson Show Schedule 2026 — Daily Showtimes",
    description:
      "View the complete Branson show schedule. Browse morning, afternoon, and evening showtimes in Branson, Missouri.",
  },
};

export default function ScheduleLayout({ children }: { children: React.ReactNode }) {
  return children;
}
