"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

export const GOOGLE_ADS_ID = "AW-18023358057";

/**
 * Event-snippet conversion labels, from the conversion actions created via
 * the Ads API on 2026-08-31. "purchase" (action 7740671642) is the primary
 * goal and carries the real order value; the other two are secondary
 * observation signals. The old URL-based flat-$1 "Purchase" (7538277494)
 * still records from the page_view below until it's demoted in the UI.
 */
export const CONVERSION_LABELS = {
  purchase: "dAnvCJqNhescEOm8mpJD",
  callClick: "hsI1CJ2NhescEOm8mpJD",
  beginCheckout: "sG6WCKCNhescEOm8mpJD",
} as const;

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
 * Fire an event-snippet conversion. For purchases pass value, currency, and
 * transaction_id so Google records the real order value and dedupes retries.
 */
export function reportAdsConversion(
  label: string,
  params: Record<string, unknown> = {}
) {
  window.gtag?.("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
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
    // Secondary funnel signal: reaching checkout. Cheap to record, and it
    // gives the low-volume campaign an early optimization signal.
    if (pathname === "/checkout") {
      reportAdsConversion(CONVERSION_LABELS.beginCheckout);
    }
  }, [pathname]);

  // Phone taps are a real conversion path for this audience, but a tel: link
  // is invisible to Ads without this. Capture-phase so stopPropagation in a
  // widget can't hide a call button.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (target?.closest?.('a[href^="tel:"]')) {
        reportAdsConversion(CONVERSION_LABELS.callClick);
      }
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

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
