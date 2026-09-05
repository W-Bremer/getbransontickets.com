"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";

/**
 * The mobile local-expert bar. Lives ABOVE the navbar (the header offsets
 * itself down by h-9 on phones, and the layout pads the page to match), so
 * the number is the first thing on every screen. The tel: link fires the
 * callClick conversion via the global listener.
 */
export function PhoneBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-40 md:hidden">
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        className="flex h-9 items-center justify-center gap-2 bg-[#E8C65A] px-4 text-[#13264D] transition-colors active:bg-[#c49a38]"
      >
        <Phone className="h-4 w-4" aria-hidden />
        <span className="text-xs font-semibold uppercase tracking-wide">
          Talk to a Local Expert
        </span>
        <span className="text-sm font-bold">{siteConfig.phone}</span>
      </a>
    </div>
  );
}
