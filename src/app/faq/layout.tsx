import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branson Show FAQs | Booking, Tickets & Trip Questions",
  description:
    "Answers to common questions about booking Branson show tickets: cancellations, digital tickets, group rates, deals, and planning your trip.",
  alternates: { canonical: "/faq" },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
