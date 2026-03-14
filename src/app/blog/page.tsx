import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { blogPosts } from "@/data/blog";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `Branson Travel Blog & Guides | ${siteConfig.name}`,
  description:
    "Expert Branson travel guides, show reviews, trip planning tips, and insider knowledge. Everything you need for the perfect Branson, Missouri vacation.",
  openGraph: {
    title: "Branson Travel Blog & Guides",
    description:
      "Expert Branson travel guides, show reviews, and trip planning tips.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    siteName: siteConfig.name,
  },
};

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);
  const allCategories = Array.from(new Set(blogPosts.map((p) => p.category)));

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${siteConfig.name} Blog`,
    description: "Expert Branson travel guides, show reviews, and trip planning tips.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };

  return (
    <>
      <JsonLd data={blogSchema} />

      {/* Header */}
      <section className="bg-[#7B1A1A] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Blog", href: "/blog" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            Branson Travel Blog & Guides
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Expert tips, show reviews, and insider knowledge to help you plan
            the perfect Branson vacation.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <Link
              href="/blog"
              className="px-4 py-2 rounded-full text-sm font-medium bg-[#7B1A1A] text-white whitespace-nowrap"
            >
              All Posts
            </Link>
            {allCategories.map((cat) => (
              <span
                key={cat}
                className="px-4 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 whitespace-nowrap cursor-default"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <Image
                  src={featuredPost.imageUrl}
                  alt={featuredPost.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#d4a843]">
                  Featured &middot; {featuredPost.category}
                </span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold text-[#7B1A1A] font-heading group-hover:text-[#d4a843] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="mt-3 text-gray-600 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span>By {featuredPost.author}</span>
                  <span>&middot;</span>
                  <span>{featuredPost.publishedDate}</span>
                  <span>&middot;</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                <span className="mt-4 inline-block text-[#d4a843] font-semibold">
                  Read Article &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Posts Grid */}
      <section className="py-12 sm:py-16 bg-[#faf8f5]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#7B1A1A] font-heading mb-8">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {remainingPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#d4a843]">
                    {post.category}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-[#7B1A1A] group-hover:text-[#d4a843] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-400">
                    <span>{post.author}</span>
                    <span>&middot;</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
