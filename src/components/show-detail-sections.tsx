import Image from "next/image";
import type { Show } from "@/data/shows";

/**
 * Long-form editorial sections at the bottom of a show page: h2 headings for
 * search engines, real prose for people still deciding, and gallery photos
 * alternating sides on desktop. Renders nothing for shows without
 * detailSections, so rollout is per-show via the data file.
 */
export function ShowDetailSections({ show }: { show: Show }) {
  const sections = show.detailSections;
  if (!sections || sections.length === 0) return null;

  return (
    <section className="mt-14 border-t border-gray-200 pt-10">
      <h2 className="text-2xl font-bold text-[#1A1614] font-heading">
        More About {show.name}
      </h2>
      <div className="mt-6 space-y-10">
        {sections.map((section, i) => (
          <div
            key={section.heading}
            className={`flex flex-col gap-5 sm:gap-7 ${
              section.imageUrl
                ? i % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
                : ""
            }`}
          >
            {section.imageUrl && (
              <div className="relative h-52 w-full shrink-0 overflow-hidden rounded-xl sm:h-60 md:w-2/5">
                <Image
                  src={section.imageUrl}
                  alt={section.imageAlt ?? section.heading}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-[#1A1614]">{section.heading}</h3>
              {section.paragraphs.map((p, j) => (
                <p key={j} className="mt-3 text-sm leading-relaxed text-[#1A1614]/75">
                  {p}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
