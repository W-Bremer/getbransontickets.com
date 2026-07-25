import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Printer, Star, Tag, MapPin, HandHeart, Gift } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { partners, getPartnerBySlug } from "@/data/partners";
import { QrCode } from "@/components/passport/qr-code";

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
    title: `QR Kit for ${partner.name} | Branson Passport`,
    robots: { index: false, follow: false },
  };
}

export default async function PartnerKitPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);
  if (!partner) notFound();

  const trackingUrl = `${siteConfig.url}/p/${partner.refCode}`;
  const displayUrl = trackingUrl.replace(/^https?:\/\//, "");

  return (
    <div className="pt-24 sm:pt-28 print:pt-0">
      <section className="mx-auto max-w-2xl px-4 py-12 sm:px-6 print:max-w-none print:py-0">
        <div className="mb-8 flex items-center justify-between print:hidden">
          <Link
            href={`/passport/partners/${partner.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-[#C8102E] transition-colors hover:text-[#A50D26]"
          >
            <ArrowLeft className="h-4 w-4" />
            {partner.name}
          </Link>
          <p className="inline-flex items-center gap-2 text-sm text-gray-400">
            <Printer className="h-4 w-4" />
            Print this page for a counter card
          </p>
        </div>

        {/* Printable counter card */}
        <div className="overflow-hidden rounded-3xl bg-[#13264D] shadow-2xl print:rounded-none print:shadow-none">
          <div className="px-8 pt-9 text-center">
            <p className="text-2xl font-black tracking-wide text-white uppercase">
              Tix Br<Star className="-mt-1 inline h-4 w-4 text-[#C8102E]" fill="currentColor" />nson
            </p>
            <p className="mt-0.5 text-[10px] font-semibold tracking-[0.3em] text-white/70 uppercase">
              Your Branson Connection
            </p>
            <p className="mt-5 font-serif text-xl text-[#E8555F] italic">~ Get Your ~</p>
            <h1 className="mt-1 text-3xl leading-tight font-black text-white uppercase sm:text-4xl">
              Free Branson
              <br />
              <span className="text-[#E8555F]">Passport</span>
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm font-semibold tracking-wide text-white/85 uppercase">
              Exclusive deals. Local favorites. Hidden gems. All in one place.
            </p>
          </div>

          <div className="flex items-center justify-center gap-8 px-8 py-8">
            <div className="rounded-2xl bg-white p-4 shadow-lg">
              <div className="w-40">
                <QrCode value={trackingUrl} className="[&>svg]:h-auto [&>svg]:w-full" />
              </div>
              <p className="mt-2 text-center font-serif text-lg text-[#13264D] italic">Scan Here!</p>
            </div>
          </div>

          <div className="mx-8 flex -rotate-1 items-center justify-center gap-3 rounded-lg bg-[#C8102E] px-5 py-3">
            <Gift className="h-6 w-6 shrink-0 text-white" />
            <p className="text-sm leading-snug font-bold text-white uppercase">
              Unlock exclusive deals &amp; offers just for you!
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 px-8 py-7 text-center">
            {[
              { icon: <Tag className="mx-auto h-6 w-6 text-[#E8555F]" />, label: "Save Money" },
              { icon: <MapPin className="mx-auto h-6 w-6 text-[#E8555F]" />, label: "Discover More" },
              { icon: <HandHeart className="mx-auto h-6 w-6 text-[#E8555F]" />, label: "Support Local" },
            ].map((b) => (
              <div key={b.label}>
                {b.icon}
                <p className="mt-2 text-[11px] font-bold tracking-wide text-white uppercase">{b.label}</p>
              </div>
            ))}
          </div>

          <p className="pb-4 text-center text-[10px] tracking-wide text-white/50 uppercase">
            Shared with you by {partner.name} · {displayUrl}
          </p>

          <div className="bg-[#C8102E] py-3 text-center">
            <p className="text-xs font-bold tracking-widest text-white uppercase">
              100% Free · Easy to Use · Instant Access
            </p>
          </div>
        </div>

        <div className="mt-8 rounded-2xl bg-[#F4F6FA] p-6 text-sm text-gray-600 print:hidden">
          <p className="font-semibold text-[#13264D]">How to use your kit</p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5">
            <li>Print this card and place it by your register, front desk, or door.</li>
            <li>
              Every scan of your code is tracked to <span className="font-mono">{partner.refCode}</span>,
              so we can show you how many visitors you referred.
            </li>
            <li>Want stickers or table tents? Email us at {siteConfig.email} and we&apos;ll help.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
