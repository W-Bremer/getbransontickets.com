import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Theater,
  FerrisWheel,
  UtensilsCrossed,
  Coffee,
  ShoppingBag,
  Sparkles,
  CalendarDays,
  Star,
  BadgePercent,
  QrCode as QrCodeIcon,
  Compass,
  Heart,
  Gift,
  Smartphone,
  Store,
  ArrowRight,
  HandHeart,
  Wallet,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { passportCategories } from "@/data/passport";
import { getPartnerByRefCode } from "@/data/partners";
import { getFeaturedDeals } from "@/lib/featured-deals";
import { PassportSignupForm } from "@/components/passport/passport-signup-form";
import { QrCode } from "@/components/passport/qr-code";
import { DealRail } from "@/components/passport/deal-rail";
import { PhonePreview } from "@/components/passport/phone-preview";
import { JsonLd } from "@/components/json-ld";

export const metadata: Metadata = {
  title: "Branson Passport: Free Local Guide and Deals",
  description:
    "A free guide to Branson from the people who sell its show tickets. Local restaurants and coffee, free things to do, the 2026 event calendar, and partner deals you won't find on the Strip.",
  keywords: [
    "branson passport",
    "free branson guide",
    "branson deals",
    "things to do in branson",
    "branson local recommendations",
  ],
  alternates: { canonical: `${siteConfig.url}/passport` },
  openGraph: {
    title: "Branson Passport: Free Local Guide and Deals",
    description:
      "Local restaurants, free things to do, the event calendar, and partner deals. Free, no app needed.",
    url: `${siteConfig.url}/passport`,
    type: "website",
    siteName: siteConfig.name,
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  Theater: <Theater className="h-6 w-6" strokeWidth={1.6} />,
  FerrisWheel: <FerrisWheel className="h-6 w-6" strokeWidth={1.6} />,
  UtensilsCrossed: <UtensilsCrossed className="h-6 w-6" strokeWidth={1.6} />,
  Coffee: <Coffee className="h-6 w-6" strokeWidth={1.6} />,
  ShoppingBag: <ShoppingBag className="h-6 w-6" strokeWidth={1.6} />,
  Sparkles: <Sparkles className="h-6 w-6" strokeWidth={1.6} />,
  CalendarDays: <CalendarDays className="h-6 w-6" strokeWidth={1.6} />,
  Star: <Star className="h-6 w-6" strokeWidth={1.6} />,
  BadgePercent: <BadgePercent className="h-6 w-6" strokeWidth={1.6} />,
};

const howItWorks = [
  {
    icon: <QrCodeIcon className="h-5 w-5" />,
    title: "Scan",
    text: "Scan a Passport code at a hotel front desk, a restaurant counter, or a shop window.",
  },
  {
    icon: <Compass className="h-5 w-5" />,
    title: "Explore",
    text: "Browse where locals eat, what is free this week, and which shows are actually running.",
  },
  {
    icon: <Heart className="h-5 w-5" />,
    title: "Enjoy",
    text: "Redeem partner offers and book show and attraction tickets straight from the guide.",
  },
  {
    icon: <Gift className="h-5 w-5" />,
    title: "Earn Branson Bucks",
    text: "Check in around town to collect points toward free tickets. Launching for the 2027 season.",
    soon: true,
  },
];

const whyUse = [
  {
    icon: <BadgePercent className="h-5 w-5" />,
    title: "Deals worth using",
    text: "Offers negotiated with the businesses themselves, not scraped coupon codes.",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Checked by people here",
    text: "Every showtime and address in this guide was verified against the venue in July 2026.",
  },
  {
    icon: <Wallet className="h-5 w-5" />,
    title: "Free, and no app",
    text: "It opens in your phone browser. Nothing to download, nothing to sign up for.",
  },
  {
    icon: <HandHeart className="h-5 w-5" />,
    title: "Keeps money local",
    text: "Independent Branson businesses, not the chains you can visit back home.",
  },
];

export default async function PassportPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const referrer = ref ? getPartnerByRefCode(ref) : undefined;
  const deals = getFeaturedDeals();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Branson Passport",
          url: `${siteConfig.url}/passport`,
          description:
            "A free local guide to Branson, Missouri: restaurants, coffee, shopping, free things to do, seasonal events, and partner deals.",
          isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
          publisher: {
            "@type": "LocalBusiness",
            name: siteConfig.name,
            telephone: siteConfig.phone,
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

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Branson-strip.jpg"
            alt="The Branson Strip at night, seen from above, with the Branson Ferris Wheel lit up"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-[70%_40%] lg:object-center"
          />
          {/* Keep the ferris wheel readable on the right; darken only far
              enough on the left to carry the headline. */}
          <div className="absolute inset-0 bg-[#0B1424]/35" />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#0B1424] via-[#0B1424]/80 via-45% to-[#0B1424]/10"
            aria-hidden="true"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 lg:px-8">
          {referrer && (
            <p className="mb-7 inline-flex items-center gap-2 rounded-sm border border-white/25 bg-white/10 px-3.5 py-1.5 text-sm text-white backdrop-blur-sm">
              <Star className="h-3.5 w-3.5 text-[#E8555F]" fill="currentColor" />
              Shared with you by {referrer.name}
            </p>
          )}

          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h1 className="marquee text-[2.65rem] text-white sm:text-6xl lg:text-[4.2rem]">
                Your{" "}
                <span className="inline-block -rotate-[1.2deg] bg-[#C8102E] px-3 pb-1">Free</span>
                <br />
                Branson Passport
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/85">
                The guide we hand our own visitors. Where locals eat, what costs nothing, what is
                on this season, and deals you only get by asking.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#signup"
                  className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#C8102E] px-7 py-4 font-display text-base font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#A50D26]"
                >
                  <Smartphone className="h-5 w-5" />
                  Get your free Passport
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/45 px-7 py-4 font-display text-base font-bold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
                >
                  How it works
                </a>
              </div>

              <p className="ozark-serif mt-7 text-lg text-[#E8C65A]">
                Scan. Explore. Save. Repeat.
              </p>
            </div>

            {/* QR card */}
            <div className="lg:col-span-5">
              <div className="mx-auto w-full max-w-[310px] rotate-[0.8deg] rounded-md bg-white p-6 text-center shadow-[0_28px_60px_-18px_rgba(0,0,0,0.6)]">
                <p className="font-display text-[15px] leading-snug font-extrabold tracking-wide text-[#13264D] uppercase">
                  Scan to open
                  <br />
                  the Passport
                </p>
                <div className="mx-auto mt-4 w-48">
                  <QrCode
                    value={`${siteConfig.url}/passport`}
                    className="[&>svg]:h-auto [&>svg]:w-full"
                  />
                </div>
                <p className="mt-4 text-sm text-[#5C6478]">
                  Point your phone camera at the code.
                </p>
                <p className="mt-3 border-t border-dashed border-[#D9D5CC] pt-3 font-mono text-[11px] tracking-tight text-[#9AA0AE]">
                  getbransontickets.com/passport
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Category strip ---------- */}
      <section className="border-b border-[#E4E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-3 divide-x divide-y divide-[#EDEBE5] sm:grid-cols-5 lg:grid-cols-9 lg:divide-y-0">
            {passportCategories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={category.href}
                  className="group flex h-full flex-col items-center justify-start gap-2.5 px-2 py-6 text-center transition-colors hover:bg-[#F6F4EF]"
                >
                  <span className="text-[#13264D] transition-colors group-hover:text-[#C8102E]">
                    {categoryIcons[category.icon]}
                  </span>
                  <span className="font-display text-[11px] leading-tight font-bold tracking-wide text-[#13264D] uppercase">
                    {category.shortName}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Featured deals ---------- */}
      <section className="bg-[#F6F4EF] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="marquee text-3xl text-[#13264D] sm:text-4xl">Featured deals</h2>
              <p className="mt-2 text-[#5C6478]">
                Current offers from Passport partners and Branson venues.
              </p>
            </div>
            <Link
              href="/passport/deals"
              className="inline-flex items-center gap-2 font-display text-sm font-bold tracking-wide text-[#C8102E] uppercase transition-colors hover:text-[#A50D26]"
            >
              All deals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <DealRail deals={deals} />
        </div>
      </section>

      {/* ---------- Branson Bucks ---------- */}
      <section className="bg-[#13264D] py-14 sm:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-4 sm:px-6 lg:flex-row lg:px-8">
          <PhonePreview className="shrink-0 scale-90 sm:scale-100" />
          <div className="flex-1 text-center lg:text-left">
            <span className="inline-block rounded-sm bg-[#C8102E] px-2.5 py-1 font-display text-[11px] font-bold tracking-widest text-white uppercase">
              Coming for the 2027 season
            </span>
            <h2 className="marquee mt-4 text-3xl text-white sm:text-4xl">
              Earn rewards with every visit
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-white/75 lg:mx-0">
              Check in at partner businesses, collect Branson Bucks, and trade them for show
              tickets. We are signing up partners now, so the map is worth watching.
            </p>
            <Link
              href="/passport/join"
              className="mt-7 inline-flex items-center gap-2 rounded-sm border border-white/40 px-6 py-3 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-white/10"
            >
              Put your business on the map
            </Link>
          </div>
          <div className="hidden shrink-0 lg:block">
            <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border-[3px] border-white/85 text-center">
              <span className="font-display text-[10px] font-bold tracking-[0.28em] text-white/75 uppercase">
                Branson
              </span>
              <span className="marquee text-2xl text-white">Bucks</span>
              <span className="mt-1 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <Star key={i} className="h-3 w-3 text-[#E8555F]" fill="currentColor" />
                ))}
              </span>
              <span className="mt-1 font-display text-[8px] font-bold tracking-[0.2em] text-white/60 uppercase">
                Earn · Redeem · Enjoy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- How it works / why ---------- */}
      <section id="how-it-works" className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="marquee text-3xl text-[#13264D] sm:text-4xl">How it works</h2>
            <ol className="mt-8 space-y-7">
              {howItWorks.map((step, i) => (
                <li key={step.title} className="flex gap-5">
                  <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#13264D] text-white">
                    {step.icon}
                    <span className="absolute -top-1.5 -left-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#C8102E] font-display text-[10px] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-[#13264D]">
                      {step.title}
                      {step.soon && (
                        <span className="rounded-sm bg-[#C8102E]/10 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#C8102E] uppercase">
                          Soon
                        </span>
                      )}
                    </h3>
                    <p className="mt-1 text-[#5C6478]">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="marquee text-3xl text-[#13264D] sm:text-4xl">Why bother with it</h2>
            <div className="mt-8 divide-y divide-[#E4E2DC] border-y border-[#E4E2DC]">
              {whyUse.map((item) => (
                <div key={item.title} className="flex gap-4 py-5">
                  <span className="mt-0.5 text-[#C8102E]">{item.icon}</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-[#13264D]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-[#5C6478]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-[#7A8194]">
              Questions about any of it? Call us at{" "}
              <a href={`tel:${siteConfig.phoneRaw}`} className="font-semibold text-[#C8102E] underline underline-offset-2">
                {siteConfig.phone}
              </a>
              . A person in Branson picks up.
            </p>
          </div>
        </div>
      </section>

      {/* ---------- Signup ---------- */}
      <section id="signup" className="relative isolate overflow-hidden bg-[#0B1424] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="marquee text-3xl text-white sm:text-4xl">Stay in the loop</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/75">
            Seasonal picks, new partner deals, and a heads-up when show schedules change. Usually
            twice a month, never more.
          </p>
          <div className="mt-9">
            <PassportSignupForm />
          </div>
        </div>
      </section>

      {/* ---------- Business CTA ---------- */}
      <section className="bg-[#F6F4EF] py-16 sm:py-20">
        <div className="mx-auto grid max-w-5xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[auto_1fr]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#13264D]">
            <Store className="h-7 w-7 text-white" />
          </div>
          <div>
            <h2 className="marquee text-3xl text-[#13264D] sm:text-4xl">
              Own a Branson business?
            </h2>
            <p className="mt-3 max-w-2xl text-lg text-[#5C6478]">
              Join free. You get a listing, a QR code kit for your counter, and a report of how
              many visitors you sent us. No fee, no contract.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/passport/join"
                className="inline-flex items-center justify-center rounded-sm bg-[#C8102E] px-7 py-3.5 font-display text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-[#A50D26]"
              >
                Join free
              </Link>
              <Link
                href="/passport/partners"
                className="inline-flex items-center justify-center rounded-sm border border-[#13264D] px-7 py-3.5 font-display text-sm font-bold tracking-wide text-[#13264D] uppercase transition-colors hover:bg-white"
              >
                See who is in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
