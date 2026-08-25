import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branson Show Schedule 2026 | Showtimes by Day",
  description:
    "See which Branson shows play on each day of the week, with morning, afternoon, and evening showtimes, and filter the schedule to fit your trip.",
  alternates: { canonical: "/shows/schedule" },
};

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
