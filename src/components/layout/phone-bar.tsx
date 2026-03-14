"use client";

import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function PhoneBar() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 md:hidden">
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        className="flex items-center justify-center gap-2.5 bg-[#d4a843] px-4 py-3 font-semibold text-[#0f172a] shadow-lg shadow-black/20 transition-colors active:bg-[#c49a38]"
      >
        <Phone className="h-5 w-5" />
        <span className="text-sm">Call Now: {siteConfig.phone}</span>
      </a>
    </div>
  );
}
