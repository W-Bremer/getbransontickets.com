import type { Metadata } from "next";
import Link from "next/link";
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
  CircleDollarSign,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { passportCategories } from "@/data/passport";
import { partners, getPartnerByRefCode } from "@/data/partners";
import { getPartnerShows } from "@/data/shows";
import { ShowCard } from "@/components/show-card";
import { PassportSignupForm } from "@/components/passport/passport-signup-form";
import { QrCode } from "@/components/passport/qr-code";

export const metadata: Metadata = {
  title: `Branson Passport | Your Free Insider Guide to Branson`,
  description:
    "The free Branson Passport is your insider guide to Branson, Missouri: the best shows, local restaurants, coffee shops, free things to do, seasonal events, and exclusive partner deals.",
  keywords: [
    "branson passport",
    "branson insider guide",
    "free branson guide",
    "branson deals",
    "things to do in branson",
    "branson local recommendations",
  ],
  openGraph: {
    title: "Branson Passport: Your Free Insider Guide to Branson",
    description:
      "Unlock exclusive deals, local favorites, and hidden gems all over Branson. Free for every visitor.",
    url: `${siteConfig.url}/passport`,
    type: "website",
    siteName: siteConfig.name,
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  Theater: <Theater className="h-6 w-6" />,
  FerrisWheel: <FerrisWheel className="h-6 w-6" />,
  UtensilsCrossed: <UtensilsCrossed className="h-6 w-6" />,
  Coffee: <Coffee className="h-6 w-6" />,
  ShoppingBag: <ShoppingBag className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  CalendarDays: <CalendarDays className="h-6 w-6" />,
  Star: <Star className="h-6 w-6" />,
  BadgePercent: <BadgePercent className="h-6 w-6" />,
};

const howItWorks = [
  {
    icon: <QrCodeIcon className="h-6 w-6" />,
    title: "Scan",
    text: "Scan a Passport QR code at any participating hotel, restaurant, or shop around town.",
  },
  {
    icon: <Compass className="h-6 w-6" />,
    title: "Explore",
    text: "Browse exclusive deals, local favorites, and hidden gems picked by people who live here.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Enjoy",
    text: "Redeem offers, book shows and attractions, and experience the best of Branson.",
  },
  {
    icon: <Gift className="h-6 w-6" />,
    title: "Earn Rewards",
    text: "Branson Bucks rewards are on the way. Check in, earn points, unlock perks.",
    comingSoon: true,
  },
];

const whyUse = [
  {
    icon: <BadgePercent className="h-5 w-5" />,
    title: "Exclusive deals",
    text: "Special discounts from partner businesses you won't find anywhere else.",
  },
  {
    icon: <Star className="h-5 w-5" />,
    title: "Local favorites",
    text: "Handpicked recommendations from locals, not an algorithm.",
  },
  {
    icon: <CircleDollarSign className="h-5 w-5" />,
    title: "Easy and free",
    text: "100% free to use. No app to download, no catches, just great experiences.",
  },
  {
    icon: <HandHeart className="h-5 w-5" />,
    title: "Support local",
    text: "Every scan supports local businesses and the Branson community.",
  },
];

export default async function PassportPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const { ref } = await searchParams;
  const referrer = ref ? getPartnerByRefCode(ref) : undefined;
  const dealPartners = partners.filter((p) => p.passportDeal);
  const featuredShows = getPartnerShows().slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className={`relative overflow-hidden bg-gradient-to-br from-[#13264D] via-[#1B355F] to-[#0D1B38] pt-28 pb-16 sm:pt-36 sm:pb-24`}>
        <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {referrer && (
            <div className="mb-8 text-center lg:text-left">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
                <Star className="h-4 w-4 text-[#C8102E]" fill="currentColor" />
                Welcome from {referrer.name}!
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5">
            <div className="text-center lg:col-span-3 lg:text-left">
              <h1 className="font-sans text-4xl leading-tight font-black tracking-tight text-white uppercase sm:text-6xl">
                Your{" "}
                <span className={`inline-block -rotate-1 rounded-md bg-[#C8102E] px-3`}>Free</span>
                <br />
                Branson
                <br />
                Passport
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-lg text-white/85 sm:text-xl lg:mx-0">
                Unlock exclusive deals, local favorites, and hidden gems all over Branson!
              </p>
              <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <a
                  href="#signup"
                  className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-8 py-4 text-lg font-bold text-white shadow-xl transition-colors hover:bg-[#A50D26]`}
                >
                  <Smartphone className="h-5 w-5" />
                  Get Your Free Passport
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/40 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-white/10"
                >
                  How It Works
                </a>
              </div>
              <p className="mt-6 text-sm font-semibold tracking-wide text-white/70">
                Scan. Explore. Save. Repeat.
              </p>
            </div>

            {/* QR card */}
            <div className="mx-auto w-full max-w-xs lg:col-span-2">
              <div className="rounded-3xl bg-white p-7 text-center shadow-2xl">
                <p className={`text-lg leading-snug font-bold text-[#13264D] uppercase`}>
                  Scan to Unlock
                  <br />
                  the Passport
                </p>
                <div className="mx-auto mt-5 w-44">
                  <QrCode value={`${siteConfig.url}/passport`} className="[&>svg]:h-auto [&>svg]:w-full" />
                </div>
                <p className="mt-5 text-sm text-gray-500">Start exploring Branson in seconds!</p>
                <p className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <Smartphone className="h-4 w-4" />
                  Scan with your phone camera
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category icon row */}
      <section className="relative z-10 -mt-8 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-4 shadow-xl ring-1 ring-gray-100 sm:grid-cols-5 lg:grid-cols-9">
            {passportCategories.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center transition-colors hover:bg-[#F4F6FA]"
              >
                <span className={`text-[#13264D] transition-colors group-hover:text-[#C8102E]`}>
                  {categoryIcons[category.icon]}
                </span>
                <span className={`text-[11px] leading-tight font-bold tracking-wide text-[#13264D] uppercase`}>
                  {category.shortName}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured deals */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className={`font-sans text-2xl font-black tracking-wide text-[#13264D] uppercase sm:text-3xl`}>
              Featured Deals
            </h2>
            <Link
              href="/passport/deals"
              className={`inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#C8102E] uppercase transition-colors hover:text-[#A50D26]`}
            >
              View All Deals
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {dealPartners.map((partner) => (
              <Link
                key={partner.id}
                href={`/passport/partners/${partner.slug}`}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-lg"
              >
                <span className={`inline-flex w-fit items-center gap-1.5 rounded bg-[#C8102E] px-2.5 py-1 text-xs font-bold text-white uppercase`}>
                  <BadgePercent className="h-3.5 w-3.5" />
                  Passport Exclusive
                </span>
                <h3 className={`mt-4 text-xl font-bold text-[#13264D] transition-colors group-hover:text-[#C8102E]`}>
                  {partner.name}
                </h3>
                <p className={`mt-2 font-semibold text-[#C8102E]`}>{partner.passportDeal}</p>
                <p className="mt-2 text-sm text-gray-500">{partner.tagline}</p>
              </Link>
            ))}
          </div>

          <div className="mt-14">
            <div className="mb-8 flex items-end justify-between">
              <h2 className={`font-sans text-2xl font-black tracking-wide text-[#13264D] uppercase sm:text-3xl`}>
                Featured Shows
              </h2>
              <Link
                href="/shows"
                className={`inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#C8102E] uppercase transition-colors hover:text-[#A50D26]`}
              >
                All Shows
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredShows.map((show, index) => (
                <ShowCard key={show.slug} show={show} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Branson Bucks teaser */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className={`flex flex-col items-center justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-r from-[#13264D] to-[#1B355F] p-8 sm:p-10 lg:flex-row`}>
            <div className="text-center lg:text-left">
              <span className={`inline-block rounded bg-[#C8102E] px-2.5 py-1 text-xs font-bold tracking-wider text-white uppercase`}>
                Coming Soon
              </span>
              <h2 className="font-sans mt-3 text-2xl font-black text-white uppercase sm:text-3xl">
                Earn Rewards With Every Visit!
              </h2>
              <p className="mt-2 max-w-xl text-white/80">
                Check in at participating locations, earn points, and unlock awesome rewards with
                Branson Bucks.
              </p>
            </div>
            <div className={`flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full border-4 border-white/80 text-center`}>
              <span className="text-[10px] font-bold tracking-widest text-white/80 uppercase">Branson</span>
              <span className="text-xl leading-none font-black tracking-wide text-white uppercase">Bucks</span>
              <span className="mt-1 flex gap-0.5">
                {[0, 1, 2].map((i) => (
                  <Star key={i} className={`h-3 w-3 text-[#C8102E]`} fill="currentColor" />
                ))}
              </span>
              <span className="mt-1 text-[9px] font-semibold tracking-widest text-white/70 uppercase">
                Earn · Redeem · Enjoy
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works + why use */}
      <section id="how-it-works" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <div>
              <h2 className={`mb-8 font-sans text-2xl font-black tracking-wide text-[#13264D] uppercase sm:text-3xl`}>
                How It Works
              </h2>
              <ol className="space-y-6">
                {howItWorks.map((step) => (
                  <li key={step.title} className="flex items-start gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-[#C8102E] text-[#C8102E]`}>
                      {step.icon}
                    </span>
                    <div>
                      <h3 className={`flex items-center gap-2 font-bold tracking-wide text-[#13264D] uppercase`}>
                        {step.title}
                        {step.comingSoon && (
                          <span className={`rounded bg-[#C8102E]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#C8102E] uppercase`}>
                            Coming Soon
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 text-gray-500">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h2 className={`mb-8 font-sans text-2xl font-black tracking-wide text-[#13264D] uppercase sm:text-3xl`}>
                Why Use the Passport?
              </h2>
              <div className="space-y-4">
                {whyUse.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl bg-[#F4F6FA] p-5">
                    <span className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#13264D] text-white`}>
                      {item.icon}
                    </span>
                    <div>
                      <h3 className={`font-bold text-[#13264D] uppercase`}>{item.title}</h3>
                      <p className="mt-1 text-gray-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signup */}
      <section id="signup" className={`bg-gradient-to-br from-[#13264D] to-[#1B355F] py-16 sm:py-20`}>
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-sans text-3xl font-black text-white uppercase sm:text-4xl">Stay in the Loop</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/80">
            Be the first to know about new deals, seasonal events, and Branson updates, before and
            during your trip.
          </p>
          <div className="mt-9">
            <PassportSignupForm />
          </div>
        </div>
      </section>

      {/* Business CTA */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <div className={`mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#13264D]`}>
            <Store className="h-7 w-7 text-white" />
          </div>
          <h2 className={`text-3xl font-bold text-[#13264D] sm:text-4xl`}>
            Own a Branson Business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
            Join the Passport free. Get your own listing, a unique QR code for your counter, and new
            customers walking through your door.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/passport/join"
              className={`inline-flex items-center justify-center gap-2 rounded-lg bg-[#C8102E] px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#A50D26]`}
            >
              Join Free
            </Link>
            <Link
              href="/passport/partners"
              className={`inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[#13264D] px-8 py-4 text-lg font-semibold text-[#13264D] transition-colors hover:bg-[#F4F6FA]`}
            >
              Meet Our Partners
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
