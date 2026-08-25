import type { Metadata } from "next";
import { QrCode, Users, TrendingUp, BadgeCheck } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PartnerJoinForm } from "@/components/passport/partner-join-form";

export const metadata: Metadata = {
  title: `Join the Branson Passport | $60/Month for Local Businesses`,
  alternates: { canonical: "/passport/join" },
  description:
    "Join the Branson Passport for $60 a month. Get a listing in Branson's insider guide, your own QR code, and trackable referrals for your business.",
  openGraph: {
    title: "Join the Branson Passport: $60 a Month for Local Businesses",
    description:
      "A listing in Branson's insider guide, your own QR code, and new customers for $60 a month.",
    url: `${siteConfig.url}/passport/join`,
    type: "website",
    siteName: siteConfig.name,
  },
};

const benefits = [
  {
    icon: <BadgeCheck className="h-5 w-5 text-[#C8102E]" />,
    text: "$60 a month. No contracts, cancel anytime.",
  },
  {
    icon: <Users className="h-5 w-5 text-[#C8102E]" />,
    text: "Your own profile in the guide visitors actually use.",
  },
  {
    icon: <QrCode className="h-5 w-5 text-[#C8102E]" />,
    text: "A unique QR code kit for your counter, printed cards and stickers included.",
  },
  {
    icon: <TrendingUp className="h-5 w-5 text-[#C8102E]" />,
    text: "See how many visitors you referred, scan by scan.",
  },
];

export default function JoinPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#13264D] to-[#1B355F] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Branson Passport", href: "/passport" },
              { label: "Join" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
            Put Your Business in the Passport
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            The Branson Passport is the free insider guide we hand every visitor. Partner
            businesses get listed, get a QR code, and get customers for $60 a month.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-[#13264D]">What partners get</h2>
              <ul className="mt-6 space-y-4">
                {benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl bg-[#F4F6FA] p-4">
                    <span className="mt-0.5 shrink-0">{b.icon}</span>
                    <span className="text-gray-700">{b.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-2xl border border-gray-100 p-6">
                <h3 className="font-bold text-[#13264D]">Why we built this</h3>
                <p className="mt-2 text-gray-600">
                  Visitors trust recommendations from the places they stay, eat, and shop. The
                  Passport turns that trust into a network: you point your guests to the best of
                  Branson, and every other partner points their guests to you.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
              <h2 className="mb-6 text-2xl font-bold text-[#13264D]">Apply in 2 minutes</h2>
              <PartnerJoinForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
