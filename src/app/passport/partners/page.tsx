import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin, BadgePercent, QrCode, Users, TrendingUp } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { partners } from "@/data/partners";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: `Passport Partners | Local Branson Businesses`,
  alternates: { canonical: "/passport/partners" },
  description:
    "Meet the local Branson businesses in the Branson Passport network: lodging, restaurants, shows, and shops offering insider recommendations and exclusive deals.",
  openGraph: {
    title: "Branson Passport Partners",
    description:
      "The local businesses behind Branson's free insider guide.",
    url: `${siteConfig.url}/passport/partners`,
    type: "website",
    siteName: siteConfig.name,
  },
};

const perks = [
  {
    icon: <Users className="h-6 w-6 text-white" />,
    title: "Free listing",
    text: "Your own profile in the Passport with your story, photos, and what makes you worth a stop.",
  },
  {
    icon: <QrCode className="h-6 w-6 text-white" />,
    title: "Your own QR code",
    text: "A unique QR code for your counter or door. Guests scan it and land on the Passport with your name on it.",
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-white" />,
    title: "Referral tracking",
    text: "Every scan and every ticket booked from your code is tracked, so you can see the traffic you send.",
  },
];

export default function PartnersPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#13264D] to-[#1B355F] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Branson Passport", href: "/passport" },
              { label: "Partners" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">
            Passport Partners
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            The local businesses behind the Branson Passport. Every partner is a real Branson
            business we recommend to our own visitors.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {partners.map((partner) => (
              <Link
                key={partner.id}
                href={`/passport/partners/${partner.slug}`}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {partner.imageUrl && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={partner.imageUrl}
                      alt={partner.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                )}
                <div className="p-7">
                  <p className="text-xs font-semibold tracking-wider text-[#C8102E] uppercase">
                    {partner.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-[#13264D] transition-colors group-hover:text-[#C8102E]">
                    {partner.name}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
                    <MapPin className="h-3.5 w-3.5" />
                    {partner.area}
                  </p>
                  <p className="mt-3 text-gray-600">{partner.tagline}</p>
                  {partner.passportDeal && (
                    <p className="mt-4 flex items-start gap-2 rounded-xl bg-[#F4F6FA] p-3.5 text-sm font-medium text-[#C8102E]">
                      <BadgePercent className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
                      {partner.passportDeal}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Join pitch */}
      <section className="bg-[#F4F6FA] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-[#13264D] sm:text-4xl">
              Partner With the Passport
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              Join for $60 a month, and your guests get a better trip.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-5 flex h-13 w-13 items-center justify-center rounded-xl bg-[#C8102E] p-3">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-bold text-[#13264D]">{perk.title}</h3>
                <p className="mt-3 text-gray-500">{perk.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/passport/join"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C8102E] px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors hover:bg-[#A50D26]"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
