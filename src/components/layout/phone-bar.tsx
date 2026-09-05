"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function PhoneBar() {
  const pathname = usePathname();

  // Show detail pages carry their own sticky booking bar (with a call
  // button), so the global call bar would just stack on top of it.
  const parts = pathname.split("/").filter(Boolean);
  const isShowDetail =
    parts.length === 2 &&
    parts[0] === "shows" &&
    !["schedule", "deals", "category"].includes(parts[1]);
  if (isShowDetail) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-50 transition-transform duration-300 md:hidden [.mobile-nav-open_&]:translate-y-full">
      <a
        href={`tel:${siteConfig.phoneRaw}`}
        className="flex items-center justify-center gap-2.5 bg-[#E8C65A] px-4 py-3 font-semibold text-[#13264D] shadow-lg shadow-black/20 transition-colors active:bg-[#c49a38]"
      >
        <Phone className="h-5 w-5" />
        <span className="text-sm">
          <span className="font-bold">{siteConfig.phone}</span> Talk to a Local Expert
        </span>
      </a>
    </div>
  );
}
