import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, CalendarCheck, ClipboardList, XCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { shows } from "@/data/shows";
import { attractions } from "@/data/attractions";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "About us and how we check show schedules",
  description: `How ${siteConfig.name} sources and verifies Branson show information, who to call, and what we do when a show closes or changes venue.`,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `About us`,
    description: "How we verify Branson show schedules, and who to call.",
    url: `${siteConfig.url}/about`,
    type: "website",
    siteName: siteConfig.name,
  },
};

const removedInLastAudit = [
  "Southern Raised, no longer in the Little Opry lineup",
  "Brett Daniels, limited run ended March 8, 2026",
  "Mountain Ruckus, never a Branson show",
  "Cassandre's Carpenters show, replaced by a Christmas run",
];

const movedInLastAudit = [
  ["SIX and Legends in Concert", "Pepsi Legends Theater"],
  ["Pierce Arrow", "Reza Live Theatre"],
  ["Patsy Cline & Friends, Rick Thomas, George Dyer, CJ Newsom", "Americana Theatre"],
  ["The Baldknobbers", "Hughes Brothers Theatre"],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: `About ${siteConfig.name}`,
          url: `${siteConfig.url}/about`,
          description:
            "How GetBransonTickets.com verifies Branson show schedules and venues.",
          mainEntity: {
            "@type": "LocalBusiness",
            name: siteConfig.name,
            url: siteConfig.url,
            telephone: siteConfig.phone,
            email: siteConfig.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Branson",
              addressRegion: "MO",
              postalCode: "65616",
              addressCountry: "US",
            },
          },
        }}
      />

      <section className="bg-[#13264D] pt-28 pb-14 sm:pt-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
            ]}
          />
          <h1 className="marquee mt-5 text-3xl text-white sm:text-5xl">
            How we check what we sell
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Branson schedules move constantly. Shows change theaters mid-season, close early, or
            switch to a Christmas run in November. Here is how we keep this site honest about it.
          </p>
        </div>
      </section>

      <section className="py-14 sm:py-18">
        <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="marquee text-2xl text-[#13264D] sm:text-3xl">What we do</h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-[#3D4354]">
              <p>
                We sell tickets to {shows.length} Branson shows and list {attractions.length}{" "}
                attractions. We are based in Branson and we answer our own phone.
              </p>
              <p>
                Most ticket sites copy their show data from each other, which is why you can still
                find pages selling shows that closed two seasons ago. We check ours against the
                venue.
              </p>
            </div>
          </div>

          <div>
            <h2 className="marquee text-2xl text-[#13264D] sm:text-3xl">Our last audit</h2>
            <p className="mt-4 flex items-center gap-2 text-[#5C6478]">
              <CalendarCheck className="h-5 w-5 text-[#C8102E]" />
              Completed July 2026. Every listing was re-checked against the theater&apos;s own
              box office calendar or ticketing system.
            </p>

            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              <div className="border-t-2 border-[#C8102E] pt-4">
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-[#13264D]">
                  <XCircle className="h-4 w-4 text-[#C8102E]" />
                  Four shows we removed
                </h3>
                <ul className="mt-3 space-y-2 text-[#5C6478]">
                  {removedInLastAudit.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="border-t-2 border-[#13264D] pt-4">
                <h3 className="flex items-center gap-2 font-display text-base font-bold text-[#13264D]">
                  <ClipboardList className="h-4 w-4 text-[#13264D]" />
                  Venues we corrected
                </h3>
                <ul className="mt-3 space-y-2 text-[#5C6478]">
                  {movedInLastAudit.map(([who, where]) => (
                    <li key={who}>
                      <span className="text-[#13264D]">{who}</span> now at {where}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="mt-6 text-[#5C6478]">
              We also replaced every third-party aggregator link with the show&apos;s own website,
              so you can always check our work against the source.
            </p>
          </div>

          <div>
            <h2 className="marquee text-2xl text-[#13264D] sm:text-3xl">
              If something is still wrong
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-[#3D4354]">
              Schedules change after we publish. If you spot a showtime that does not match the
              theater, tell us and we will fix it the same day. That is genuinely useful to us.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <a
                href={`tel:${siteConfig.phoneRaw}`}
                className="flex items-center gap-3 border border-[#E4E2DC] bg-white p-4 transition-colors hover:border-[#C8102E]"
              >
                <Phone className="h-5 w-5 shrink-0 text-[#C8102E]" />
                <span className="font-semibold text-[#13264D]">{siteConfig.phone}</span>
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 border border-[#E4E2DC] bg-white p-4 transition-colors hover:border-[#C8102E]"
              >
                <Mail className="h-5 w-5 shrink-0 text-[#C8102E]" />
                <span className="truncate font-semibold text-[#13264D]">{siteConfig.email}</span>
              </a>
              <div className="flex items-center gap-3 border border-[#E4E2DC] bg-white p-4">
                <MapPin className="h-5 w-5 shrink-0 text-[#C8102E]" />
                <span className="font-semibold text-[#13264D]">{siteConfig.address}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E4E2DC] pt-8">
            <h2 className="marquee text-2xl text-[#13264D] sm:text-3xl">The Branson Passport</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#3D4354]">
              Alongside tickets we publish a free local guide: where to eat that is not a chain,
              what costs nothing, and what is on each season. It is free, there is no app, and
              local businesses can join it at no cost.
            </p>
            <Link
              href="/passport"
              className="mt-5 inline-flex items-center rounded-sm bg-[#C8102E] px-6 py-3 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#A50D26]"
            >
              Open the Passport
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
