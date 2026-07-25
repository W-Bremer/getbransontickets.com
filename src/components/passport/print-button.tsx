"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print card" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-sm bg-[#13264D] px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#1B355F]"
    >
      <Printer className="h-4 w-4" />
      {label}
    </button>
  );
}
