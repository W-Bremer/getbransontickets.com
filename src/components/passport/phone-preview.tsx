import Image from "next/image";
import { Star, Ticket, Compass, BadgePercent, Menu } from "lucide-react";
import { TixBransonWordmark } from "@/components/passport/wordmark";

/**
 * Static illustration of the Passport on a phone, used in the marketing
 * sections. Decorative: not a real device frame or live screenshot.
 */
export function PhonePreview({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="relative mx-auto w-[248px] rounded-[2.2rem] border-[10px] border-[#0B1424] bg-[#0B1424] shadow-[0_30px_60px_-20px_rgba(19,38,77,0.55)]">
        <div className="absolute top-2.5 left-1/2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-[#0B1424]" />
        <div className="overflow-hidden rounded-[1.6rem] bg-white">
          {/* status bar */}
          <div className="flex items-center justify-between bg-[#13264D] px-4 pt-3 pb-1 text-[9px] font-semibold text-white/70">
            <span>9:41</span>
            <span>· · ·</span>
          </div>
          {/* app header */}
          <div className="bg-[#13264D] px-4 pb-4 text-center text-white">
            <TixBransonWordmark className="text-[13px]" starClassName="text-[#C8102E]" subline={false} />
            <p className="marquee mt-2 text-[17px] leading-tight">
              Branson
              <br />
              Passport
            </p>
          </div>
          {/* points strip */}
          <div className="mx-3 -mt-3 flex items-center justify-between rounded-lg bg-[#C8102E] px-3 py-2 text-white shadow-md">
            <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-wide uppercase">
              <Star className="h-3 w-3" fill="currentColor" />
              Branson Bucks
            </span>
            <span className="text-[11px] font-bold">125 pts</span>
          </div>
          {/* deals list */}
          <div className="px-3 pt-3 pb-2">
            <p className="mb-2 text-[9px] font-bold tracking-wider text-[#13264D] uppercase">
              Today&apos;s top deals
            </p>
            <div className="space-y-2">
              {[
                { img: "/branson-lakes-lodging.jpg", t: "Branson Lakes Lodging", s: "Late checkout" },
                { img: "/shows/the-duttons.jpg", t: "The Duttons", s: "Family Pass $113" },
              ].map((row) => (
                <div key={row.t} className="flex items-center gap-2 rounded-md border border-[#E4E2DC] p-1.5">
                  <div className="relative h-8 w-10 shrink-0 overflow-hidden rounded">
                    <Image src={row.img} alt="" fill sizes="40px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[9px] font-bold text-[#13264D]">{row.t}</p>
                    <p className="truncate text-[8px] text-[#C8102E]">{row.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* tab bar */}
          <div className="flex items-center justify-around border-t border-[#E4E2DC] px-2 py-2 text-[#9AA0AE]">
            <Compass className="h-3.5 w-3.5 text-[#C8102E]" />
            <BadgePercent className="h-3.5 w-3.5" />
            <Ticket className="h-3.5 w-3.5" />
            <Star className="h-3.5 w-3.5" />
            <Menu className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
