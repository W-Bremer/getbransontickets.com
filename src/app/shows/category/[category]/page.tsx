import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, categories } from "@/lib/config";
import { getShowsByCategory, shows } from "@/data/shows";
import { ShowCard } from "@/components/show-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export async function generateStaticParams() {
  return categories
    .filter((c) => c.slug !== "all")
    .map((c) => ({ category: c.slug }));
}

function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return { title: "Category Not Found" };

  return {
    title: `Branson ${cat.name} Shows 2026 | Tickets & Schedule | ${siteConfig.name}`,
    description: `Discover the best ${cat.name.toLowerCase()} shows in Branson, MO for 2026. ${cat.description}. Compare prices, read reviews, and book discount tickets online.`,
    openGraph: {
      title: `Branson ${cat.name} Shows 2026 | Tickets & Schedule`,
      description: `Discover the best ${cat.name.toLowerCase()} shows in Branson, MO for 2026. ${cat.description}.`,
      url: `${siteConfig.url}/shows/category/${category}`,
      type: "website",
      siteName: siteConfig.name,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  const categoryShows = getShowsByCategory(category);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `Branson ${cat?.name ?? category} Shows 2026`,
    description: cat?.description ?? "",
    url: `${siteConfig.url}/shows/category/${category}`,
    numberOfItems: categoryShows.length,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />

      {/* Header */}
      <section className="bg-[#0f172a] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Shows", href: "/shows" },
              { label: cat?.name ?? category, href: `/shows/category/${category}` },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson {cat?.name ?? category} Shows 2026
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            {cat?.description ?? `Browse ${category} shows in Branson, Missouri.`}{" "}
            Showing {categoryShows.length} show{categoryShows.length !== 1 ? "s" : ""}.
          </p>
        </div>
      </section>

      {/* Shows Grid */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {categoryShows.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {categoryShows.map((show, index) => (
                <ShowCard key={show.slug} show={show} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-gray-600">
                No shows found in this category right now.
              </p>
              <Link
                href="/shows"
                className="mt-4 inline-flex items-center gap-2 px-6 py-3 bg-[#d4a843] text-white rounded-lg font-semibold hover:bg-[#b8922e] transition-colors"
              >
                Browse All Shows
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="py-12 sm:py-16 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#0f172a] font-heading mb-8">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== "all" && c.slug !== category)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/shows/category/${c.slug}`}
                  className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[#0f172a] font-medium text-sm hover:border-[#d4a843] hover:text-[#d4a843] transition-colors"
                >
                  {c.name} ({shows.filter((s) => s.category.includes(c.slug)).length})
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
