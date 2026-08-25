import type { Metadata } from "next";

// Internal fulfillment desk. Password-gated, never indexed, not in the
// sitemap or nav. robots.ts also disallows /office.
export const metadata: Metadata = {
  title: "Voucher Desk",
  robots: { index: false, follow: false },
};

export default function OfficeLayout({ children }: { children: React.ReactNode }) {
  return <div className="bg-[#FAF8F3] min-h-screen">{children}</div>;
}
