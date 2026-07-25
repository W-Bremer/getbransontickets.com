import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/config";
import {
  passportCategories,
  getGuideCategory,
  getPlacesByCategory,
  type PassportCategorySlug,
} from "@/data/passport";
import { PlaceCard } from "@/components/passport/place-card";
import { Breadcrumbs } from "@/components/breadcrumbs";

export function generateStaticParams() {
  return passportCategories
    .filter((c) => c.isGuideCategory)
    .map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getGuideCategory(category);
  if (!cat) return {};
  return {
    title: `${cat.name} | Branson Passport`,
    description: `${cat.description} Part of the free Branson Passport insider guide.`,
    openGraph: {
      title: `${cat.name} | Branson Passport`,
      description: cat.description,
      url: `${siteConfig.url}/passport/${cat.slug}`,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default async function PassportCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getGuideCategory(category);
  if (!cat) notFound();

  const places = getPlacesByCategory(cat.slug as PassportCategorySlug);
  const otherCategories = passportCategories.filter(
    (c) => c.isGuideCategory && c.slug !== cat.slug
  );

  return (
    <div className="pt-24 sm:pt-28">
      <section className="bg-gradient-to-br from-[#13264D] to-[#1B355F] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Branson Passport", href: "/passport" },
              { label: cat.name },
            ]}
          />
          <h1 className="mt-4 text-3xl font-bold text-white sm:text-5xl">{cat.name}</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">{cat.description}</p>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {places.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {places.map((place) => (
                <PlaceCard key={place.name} place={place} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-[#F4F6FA] p-12 text-center">
              <p className="text-lg text-gray-500">
                We&apos;re putting the finishing touches on this section of the Passport. Check
                back soon!
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#F4F6FA] p-6 sm:p-8">
            <Link
              href="/passport"
              className="inline-flex items-center gap-2 font-semibold text-[#C8102E] transition-colors hover:text-[#A50D26]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to the Passport
            </Link>
            <div className="flex flex-wrap gap-2">
              {otherCategories.map((c) => (
                <Link
                  key={c.slug}
                  href={c.href}
                  className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-[#C8102E] hover:text-[#C8102E]"
                >
                  {c.shortName}
                </Link>
              ))}
            </div>
            <Link
              href="/shows"
              className="inline-flex items-center gap-2 font-semibold text-[#C8102E] transition-colors hover:text-[#A50D26]"
            >
              Book a Show
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
