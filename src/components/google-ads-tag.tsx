"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export const GOOGLE_ADS_ID = "AW-18023358057";

/** Paths that report their own page view with extra guards. */
const SELF_REPORTING = ["/checkout/confirmation"];

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Report one Google Ads page view for a route. The confirmation page calls
 * this directly (with order value attached) once it has verified a real
 * order, which is what the URL-based Purchase conversion in Google Ads
 * counts.
 */
export function reportAdsPageView(
  path: string,
  params: Record<string, unknown> = {}
) {
  window.gtag?.("event", "page_view", {
    send_to: GOOGLE_ADS_ID,
    page_path: path,
    page_location: window.location.origin + path,
    ...params,
  });
}

/**
 * Google Ads tag (AW-18023358057). Automatic page views are disabled and
 * reported per route change instead, because checkout finishes with a
 * client-side navigation the stock tag never sees. /checkout/confirmation is
 * excluded here and reports its own view only when a real order exists, so
 * the Purchase conversion counts orders rather than stray visits.
 */
export function GoogleAdsTag() {
  const pathname = usePathname();
  const lastReported = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastReported.current === pathname) return;
    lastReported.current = pathname;
    if (SELF_REPORTING.some((p) => pathname.startsWith(p))) return;
    reportAdsPageView(pathname);
  }, [pathname]);

  return (
    <>
      {/* Init runs before hydration so window.gtag exists for every effect;
          commands queue in dataLayer until the library loads and flushes. */}
      <Script id="google-ads-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}', { send_page_view: false });`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
