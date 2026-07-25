import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, BadgePercent, ExternalLink, Phone, ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { partners, getPartnerBySlug } from "@/data/partners";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function generateStaticParams() {
  return partners.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) return {};
  return {
    title: `${partner.name} | Branson Passport Partner`,
    description: `${partner.tagline}. ${partner.name} is a Branson Passport partner.`,
    openGraph: {
      title: `${partner.name} | Branson Passport Partner`,
      description: partner.tagline,
      url: `${siteConfig.url}/passport/partners/${partner.slug}`,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default async function PartnerProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#13264D] to-[#1B355F] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Branson Passport", href: "/passport" },
              { label: "Partners", href: "/passport/partners" },
              { label: partner.name },
            ]}
          />
          <p className="mt-6 text-xs font-semibold tracking-wider text-[#C8102E] uppercase">
            Passport Partner · {partner.category}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-5xl">{partner.name}</h1>
          <p className="mt-3 flex items-center gap-2 text-white/70">
            <MapPin className="h-4 w-4" />
            {partner.address ?? partner.area}
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              {partner.imageUrl && (
                <div className="relative mb-8 h-64 overflow-hidden rounded-2xl sm:h-96">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                  />
                </div>
              )}
              <h2 className="text-2xl font-bold text-[#13264D]">About {partner.name}</h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-600">{partner.description}</p>
            </div>

            <div className="space-y-6">
              {partner.passportDeal && (
                <div className="rounded-2xl border-2 border-[#C8102E] bg-gradient-to-br from-[#F4F6FA] to-white p-7">
                  <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-[#C8102E] uppercase">
                    <BadgePercent className="h-5 w-5 text-[#C8102E]" />
                    Passport Exclusive
                  </div>
                  <p className="mt-3 text-lg font-semibold text-[#13264D]">
                    {partner.passportDeal}
                  </p>
                </div>
              )}

              <div className="rounded-2xl border border-gray-100 bg-white p-7 shadow-sm">
                <h3 className="font-bold text-[#13264D]">Visit</h3>
                <div className="mt-4 space-y-3 text-sm text-gray-600">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
                    {partner.address ?? partner.area}
                  </p>
                  {partner.phone && (
                    <a
                      href={`tel:${partner.phone.replace(/[^0-9+]/g, "")}`}
                      className="flex items-center gap-2.5 transition-colors hover:text-[#C8102E]"
                    >
                      <Phone className="h-4 w-4 shrink-0 text-[#C8102E]" />
                      {partner.phone}
                    </a>
                  )}
                  {partner.url && (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 font-semibold text-[#C8102E] transition-colors hover:text-[#A50D26]"
                    >
                      <ExternalLink className="h-4 w-4 shrink-0" />
                      Official website
                    </a>
                  )}
                </div>
              </div>

              <Link
                href="/passport"
                className="inline-flex items-center gap-2 font-semibold text-[#C8102E] transition-colors hover:text-[#A50D26]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to the Passport
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
