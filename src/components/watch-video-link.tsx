"use client";

import { Play } from "lucide-react";

/**
 * "Watch the show" affordance for the booking panel. The video itself lives
 * inside the tabbed detail section, so this dispatches an event the tab
 * component listens for (switch to Details, scroll the player into view)
 * rather than assuming the element is currently rendered.
 */
export function WatchVideoLink({ className }: { className?: string }) {
  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new CustomEvent("gbt:watch-video"))}
        className="inline-flex items-center gap-2 text-xs font-semibold text-[#13264D] transition-colors hover:text-[#C8102E]"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8102E] text-white">
          <Play className="h-3 w-3 fill-current" aria-hidden />
        </span>
        Watch the show
      </button>
    </div>
  );
}
