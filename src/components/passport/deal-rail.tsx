import Link from "next/link";
import Image from "next/image";
import type { FeaturedDeal } from "@/data/passport";

export function DealRail({ deals }: { deals: FeaturedDeal[] }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
      <ul className="flex gap-5">
        {deals.map((deal) => (
          <li key={deal.href} className="w-[268px] shrink-0">
            <Link
              href={deal.href}
              className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#E4E2DC] bg-white transition-shadow hover:shadow-[0_12px_30px_-12px_rgba(19,38,77,0.35)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E9E6DF]">
                <Image
                  src={deal.imageUrl}
                  alt={deal.imageAlt}
                  fill
                  sizes="268px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="absolute bottom-0 left-0 bg-[#C8102E] px-3 py-1.5 text-xs font-bold tracking-wide text-white uppercase">
                  {deal.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="font-display text-base leading-snug font-bold text-[#13264D]">
                  {deal.name}
                </h3>
                <p className="mt-1.5 line-clamp-2 text-sm text-[#5C6478]">{deal.blurb}</p>
                <div className="mt-auto flex items-baseline gap-2 pt-3">
                  {deal.priceFrom !== undefined ? (
                    <>
                      <span className="text-sm font-bold text-[#C8102E]">
                        From ${deal.priceFrom.toFixed(2).replace(/\.00$/, "")}
                      </span>
                      {deal.wasPrice !== undefined && (
                        <span className="text-sm text-[#9AA0AE] line-through">
                          ${deal.wasPrice}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-sm font-bold text-[#C8102E]">
                      Show your Passport
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
