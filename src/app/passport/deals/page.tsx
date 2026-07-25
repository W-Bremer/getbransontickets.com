import type { Metadata } from "next";
import Link from "next/link";
import { BadgePercent, Tag, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { partners } from "@/data/partners";
import { Breadcrumbs } from "@/components/breadcrumbs";

export const metadata: Metadata = {
  title: `Passport Deals | Exclusive Branson Offers`,
  description:
    "Exclusive Branson deals from Passport partner businesses, plus BOGO show offers and discount tickets.",
  openGraph: {
    title: "Branson Passport Deals",
    description: "Exclusive offers from Passport partners plus site-wide ticket deals.",
    url: `${siteConfig.url}/passport/deals`,
    type: "website",
    siteName: siteConfig.name,
  },
};

export default function PassportDealsPage() {
  const dealPartners = partners.filter((p) => p.passportDeal);

  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#13264D] to-[#1B355F] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Branson Passport", href: "/passport" },
              { label: "Deals" },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">Passport Deals</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Offers you only get through the Branson Passport, straight from our partner
            businesses.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {dealPartners.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {dealPartners.map((partner) => (
                <Link
                  key={partner.id}
                  href={`/passport/partners/${partner.slug}`}
                  className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C8102E] uppercase">
                    <BadgePercent className="h-4 w-4" />
                    Passport Exclusive
                  </div>
                  <h2 className="mt-3 text-xl font-bold text-[#13264D] transition-colors group-hover:text-[#C8102E]">
                    {partner.name}
                  </h2>
                  <p className="mt-2 font-medium text-[#C8102E]">{partner.passportDeal}</p>
                  <p className="mt-2 text-sm text-gray-500">{partner.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E]">
                    View partner
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-[#F4F6FA] p-12 text-center">
              <p className="text-lg text-gray-500">
                Partner deals are coming soon. In the meantime, check out our ticket deals below.
              </p>
            </div>
          )}

          {/* Site deals cross-link */}
          <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-[#C8102E] to-[#A50D26] p-8 sm:flex-row">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white/25 p-3.5">
                <Tag className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  BOGO Shows & Discount Tickets
                </h2>
                <p className="text-white/85">
                  Our ticket deals are open to everyone, Passport or not.
                </p>
              </div>
            </div>
            <Link
              href="/deals"
              className="rounded-xl bg-white px-7 py-3.5 font-semibold whitespace-nowrap text-[#C8102E] shadow-lg transition-colors hover:bg-gray-50"
            >
              View Ticket Deals
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
