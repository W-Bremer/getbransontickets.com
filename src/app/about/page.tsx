import type { Metadata } from "next";
import Link from "next/link";
import { Star, Users, Ticket, Shield } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { shows } from "@/data/shows";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: `About Us | ${siteConfig.name} — Branson's Trusted Ticket Source`,
  description: `Learn about ${siteConfig.name}, Branson's trusted source for show tickets and entertainment since ${siteConfig.foundedYear}. Over ${siteConfig.showsBooked.toLocaleString()} tickets booked.`,
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: `Branson's trusted source for show tickets and entertainment.`,
    url: `${siteConfig.url}/about`,
    type: "website",
    siteName: siteConfig.name,
  },
};

const team = [
  {
    name: "Sarah Mitchell",
    role: "Founder & CEO",
    bio: "Branson native with 15+ years in the entertainment industry. Sarah's passion for live shows drives everything we do.",
    initials: "SM",
  },
  {
    name: "David Chen",
    role: "Head of Customer Experience",
    bio: "Former theater manager who ensures every customer has an unforgettable Branson experience from booking to showtime.",
    initials: "DC",
  },
  {
    name: "Rachel Thompson",
    role: "Show Relations Director",
    bio: "Connects with every theater and performer in Branson to bring you exclusive deals and the latest show information.",
    initials: "RT",
  },
  {
    name: "Marcus Johnson",
    role: "Travel & Content Specialist",
    bio: "Writes our travel guides and show reviews. Has personally attended every show in Branson — some more than once.",
    initials: "MJ",
  },
];

const stats = [
  {
    value: `${new Date().getFullYear() - siteConfig.foundedYear}+`,
    label: "Years Serving Branson",
    icon: Shield,
  },
  {
    value: siteConfig.showsBooked.toLocaleString() + "+",
    label: "Tickets Booked",
    icon: Ticket,
  },
  {
    value: siteConfig.averageRating.toString(),
    label: "Average Rating",
    icon: Star,
  },
  {
    value: siteConfig.reviewCount.toLocaleString() + "+",
    label: "Happy Customers",
    icon: Users,
  },
];

export default function AboutPage() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${siteConfig.name}`,
    description: `Learn about ${siteConfig.name}, Branson's trusted source for show tickets.`,
    url: `${siteConfig.url}/about`,
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      foundingDate: siteConfig.foundedYear.toString(),
      url: siteConfig.url,
      telephone: siteConfig.phone,
    },
  };

  return (
    <>
      <JsonLd data={aboutSchema} />

      {/* Header */}
      <section className="bg-[#7B1A1A] pt-12 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
            ]}
            className="text-white/60 mb-6 [&_span]:text-white"
          />
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white font-heading">
            About {siteConfig.name}
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl">
            Your trusted guide to Branson&apos;s best live entertainment since{" "}
            {siteConfig.foundedYear}.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7B1A1A] font-heading mb-6">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>
              {siteConfig.name} was born from a simple idea: make it easy for
              families to discover, compare, and book the best shows in Branson,
              Missouri. As locals who grew up attending shows on the Strip, we
              know firsthand how overwhelming it can be to choose from {shows.length}+
              live performances.
            </p>
            <p>
              We started by attending every single show in town, writing honest
              reviews, and building relationships with theaters and performers
              across Branson. Today, we&apos;re proud to be the go-to resource
              for thousands of families planning their Branson entertainment.
            </p>
            <p>
              Whether you&apos;re a first-time visitor or a Branson regular,
              our team is here to help you find the perfect shows, secure the
              best deals, and create unforgettable memories in the Live
              Entertainment Capital of the World.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20 bg-[#faf8f5]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#7B1A1A] font-heading mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
            To connect visitors with Branson&apos;s incredible live entertainment
            by providing trusted reviews, unbeatable deals, and personalized
            recommendations &mdash; making every Branson trip an unforgettable
            experience.
          </p>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="py-16 sm:py-20 bg-[#7B1A1A]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-heading">
              Trusted by Thousands
            </h2>
            <p className="mt-3 text-white/60">
              Numbers that speak for themselves.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10"
              >
                <stat.icon className="w-8 h-8 text-[#d4a843] mx-auto mb-3" />
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#7B1A1A] font-heading">
              Meet Our Team
            </h2>
            <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
              A passionate team of Branson entertainment experts dedicated to
              helping you have the best experience.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center p-6 rounded-2xl bg-[#faf8f5] border border-gray-100"
              >
                <div className="w-20 h-20 rounded-full bg-[#7B1A1A] flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#d4a843]">
                    {member.initials}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#7B1A1A]">
                  {member.name}
                </h3>
                <p className="text-sm text-[#d4a843] font-medium">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#d4a843] to-[#b8922e]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white font-heading">
            Ready to Experience Branson?
          </h2>
          <p className="mt-4 text-white/90 text-lg">
            Let us help you find the perfect shows for your next Branson
            vacation.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shows"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#7B1A1A] text-white rounded-xl font-semibold text-lg hover:bg-[#5A1212] transition-colors"
            >
              Browse Shows
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#7B1A1A] rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
