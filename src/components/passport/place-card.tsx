import { MapPin, Lightbulb, ExternalLink, CalendarDays } from "lucide-react";
import type { PassportPlace } from "@/data/passport";

export function PlaceCard({ place }: { place: PassportPlace }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-[#13264D]">{place.name}</h3>
        {place.priceLevel && (
          <span className="shrink-0 rounded-full bg-[#F4F6FA] px-2.5 py-1 text-xs font-semibold text-[#C8102E]">
            {place.priceLevel}
          </span>
        )}
      </div>
      {(place.area || place.timeframe) && (
        <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
          {place.timeframe ? (
            <>
              <CalendarDays className="h-3.5 w-3.5" />
              {place.timeframe}
              {place.area ? ` · ${place.area}` : ""}
            </>
          ) : (
            <>
              <MapPin className="h-3.5 w-3.5" />
              {place.area}
            </>
          )}
        </p>
      )}
      <p className="mt-3 text-gray-600">{place.description}</p>
      {place.insiderTip && (
        <div className="mt-4 flex gap-2.5 rounded-xl bg-[#F4F6FA] p-3.5">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-[#C8102E]" />
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-[#C8102E]">Insider tip: </span>
            {place.insiderTip}
          </p>
        </div>
      )}
      <div className="mt-auto pt-4">
        {place.url && (
          <a
            href={place.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#C8102E] transition-colors hover:text-[#A50D26]"
          >
            Visit website
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
        {place.address && (
          <p className="mt-1.5 text-xs text-gray-400">{place.address}</p>
        )}
      </div>
    </div>
  );
}
