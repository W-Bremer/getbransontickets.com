"use client";

import { useState } from "react";
import { X, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface DealBannerProps {
  headline?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

export function DealBanner({
  headline = "BOGO Deals Available — Buy One, Get One 50% Off Select Shows!",
  description,
  ctaText = "View Deals",
  ctaHref = "/deals",
  className,
}: DealBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-gradient-to-r from-[#F76E00] via-[#FB9219] to-[#F76E00]",
        className
      )}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-3 min-w-0">
          <Sparkles className="h-5 w-5 shrink-0 text-white" />
          <div className="min-w-0">
            <p className="font-bold text-white text-sm sm:text-base truncate">
              {headline}
            </p>
            {description && (
              <p className="text-white/80 text-xs sm:text-sm truncate">
                {description}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={ctaHref}
            className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-[#F76E00] transition-all hover:bg-white/90 hover:scale-105"
          >
            {ctaText}
          </a>
          <button
            onClick={() => setDismissed(true)}
            className="rounded-full p-1 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Dismiss banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
