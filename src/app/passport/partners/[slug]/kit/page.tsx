import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Caveat } from "next/font/google";
import {
  ArrowLeft,
  Printer,
  Download,
  Tag,
  MapPin,
  HandHeart,
  Gift,
  FileImage,
  FileCode2,
} from "lucide-react";
import { siteConfig } from "@/lib/config";
import { partners, getPartnerBySlug } from "@/data/partners";
import { QrCode } from "@/components/passport/qr-code";
import { TixBransonWordmark } from "@/components/passport/wordmark";
import { PrintButton } from "@/components/passport/print-button";

const caveat = Caveat({ subsets: ["latin"], weight: ["600"], display: "swap" });

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
    title: `QR kit for ${partner.name}`,
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
    <div className="bg-[#F6F4EF] pt-24 pb-16 sm:pt-28 print:bg-white print:pt-0 print:pb-0">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 print:max-w-none print:px-0">
        {/* Toolbar (screen only) */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href={`/passport/partners/${partner.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-[#C8102E] transition-colors hover:text-[#A50D26]"
          >
            <ArrowLeft className="h-4 w-4" />
            {partner.name}
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <a
              href={`/api/qr/${partner.refCode}`}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#13264D] px-3 py-2 text-sm font-semibold text-[#13264D] transition-colors hover:bg-white"
            >
              <FileCode2 className="h-4 w-4" />
              SVG
            </a>
            <a
              href={`/api/qr/${partner.refCode}?f=png`}
              className="inline-flex items-center gap-1.5 rounded-sm border border-[#13264D] px-3 py-2 text-sm font-semibold text-[#13264D] transition-colors hover:bg-white"
            >
              <FileImage className="h-4 w-4" />
              PNG
            </a>
            <PrintButton />
          </div>
        </div>

        {/* ---------- Printable counter card ---------- */}
        <div className="mx-auto w-full max-w-[420px] overflow-hidden rounded-lg bg-[#13264D] shadow-[0_24px_60px_-20px_rgba(19,38,77,0.55)] print:max-w-none print:rounded-none print:shadow-none">
          <div className="px-8 pt-9 text-center">
            <TixBransonWordmark
              className="text-2xl text-white"
              starClassName="text-[#C8102E]"
            />
            <p className={`${caveat.className} mt-6 text-3xl text-[#E8555F]`}>Get Your</p>
            <h1 className="marquee mt-1 text-[2.1rem] leading-[0.95] text-white">
              Free Branson
              <br />
              <span className="text-[#E8555F]">Passport</span>
            </h1>
            <p className="mx-auto mt-4 max-w-[19rem] font-display text-[11px] leading-relaxed font-bold tracking-wide text-white/85 uppercase">
              Exclusive deals. Local favorites. Everything worth doing, in one place.
            </p>
          </div>

          <div className="flex justify-center px-8 py-7">
            <div className="rounded-md bg-white p-4">
              <div className="w-44">
                <QrCode value={trackingUrl} className="[&>svg]:h-auto [&>svg]:w-full" />
              </div>
              <p className={`${caveat.className} mt-1 text-center text-2xl text-[#13264D]`}>
                Scan here
              </p>
            </div>
          </div>

          <div className="mx-8 flex -rotate-1 items-center justify-center gap-3 rounded-sm bg-[#C8102E] px-5 py-3">
            <Gift className="h-6 w-6 shrink-0 text-white" />
            <p className="font-display text-[13px] leading-snug font-bold text-white uppercase">
              Unlock deals made just for our guests
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 px-8 py-7 text-center">
            {[
              { icon: <Tag className="mx-auto h-6 w-6 text-[#E8555F]" strokeWidth={1.6} />, label: "Save money" },
              { icon: <MapPin className="mx-auto h-6 w-6 text-[#E8555F]" strokeWidth={1.6} />, label: "Discover more" },
              { icon: <HandHeart className="mx-auto h-6 w-6 text-[#E8555F]" strokeWidth={1.6} />, label: "Support local" },
            ].map((b) => (
              <div key={b.label}>
                {b.icon}
                <p className="mt-2 font-display text-[10px] font-bold tracking-wide text-white uppercase">
                  {b.label}
                </p>
              </div>
            ))}
          </div>

          <p className="px-8 pb-4 text-center text-[10px] tracking-wide text-white/45">
            Shared with you by {partner.name} · {displayUrl}
          </p>

          <div className="bg-[#C8102E] py-3 text-center">
            <p className="font-display text-[11px] font-bold tracking-[0.18em] text-white uppercase">
              100% free · No app needed
            </p>
          </div>
        </div>

        {/* ---------- Instructions (screen only) ---------- */}
        <div className="mt-10 rounded-lg border border-[#E4E2DC] bg-white p-6 print:hidden">
          <h2 className="font-display text-lg font-bold text-[#13264D]">Using your kit</h2>
          <ul className="mt-4 space-y-3 text-[#5C6478]">
            <li className="flex gap-3">
              <Printer className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              <span>
                Print this page for a counter card. It is sized for a standard 5x7 acrylic stand.
              </span>
            </li>
            <li className="flex gap-3">
              <Download className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              <span>
                Need artwork for a print shop or your own signage? Download the{" "}
                <a href={`/api/qr/${partner.refCode}`} className="font-semibold text-[#C8102E] underline underline-offset-2">
                  vector SVG
                </a>{" "}
                (scales to any size) or the{" "}
                <a href={`/api/qr/${partner.refCode}?f=png`} className="font-semibold text-[#C8102E] underline underline-offset-2">
                  1200px PNG
                </a>
                .
              </span>
            </li>
            <li className="flex gap-3">
              <Tag className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
              <span>
                Every scan is tagged{" "}
                <span className="font-mono text-[#13264D]">{partner.refCode}</span>, so we can tell
                you how many visitors came from your counter.
              </span>
            </li>
          </ul>
          <p className="mt-5 border-t border-[#E4E2DC] pt-4 text-sm text-[#7A8194]">
            Want printed stickers or table tents instead? Email {siteConfig.email} or call{" "}
            {siteConfig.phone} and we will send them.
          </p>
        </div>
      </div>
    </div>
  );
}

