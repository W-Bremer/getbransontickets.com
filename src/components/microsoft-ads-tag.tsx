"use client";

import Script from "next/script";

export const UET_TAG_ID = "97266168";

declare global {
  interface Window {
    uetq?: unknown[];
  }
}

function uetPush(...args: unknown[]) {
  window.uetq = window.uetq || [];
  (window.uetq as unknown[]).push(...args);
}

/** "(417) 555-0100" -> "+14175550100"; returns null if it can't be E.164'd. */
function e164(phone?: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

/**
 * Enhanced conversions: hand UET the buyer's contact so Microsoft can match
 * the conversion across devices. Values are hashed client-side by the UET
 * library before transmission (per Microsoft's enhanced-conversions doc);
 * must be pushed BEFORE the event it should apply to, or UET ignores it.
 */
export function uetSetCustomer(email?: string, phone?: string) {
  const pid: Record<string, string> = {};
  const em = email?.trim().toLowerCase();
  if (em && em.includes("@")) pid.em = em;
  const ph = e164(phone);
  if (ph) pid.ph = ph;
  if (Object.keys(pid).length > 0) uetPush("set", { pid });
}

/** Variable-revenue purchase event for the Microsoft Ads conversion goal. */
export function reportUetPurchase(revenue: number, orderNumber: string) {
  uetPush("event", "purchase", {
    event_category: "purchase",
    event_label: orderNumber,
    revenue_value: revenue,
    currency: "USD",
  });
}

/**
 * Microsoft Ads UET tag (97266168). enableAutoSpaTracking makes UET report
 * client-side route changes itself, so unlike the Google tag it needs no
 * per-route wiring. Loaded once in the root layout.
 */
export function MicrosoftAdsTag() {
  return (
    <Script id="microsoft-uet" strategy="afterInteractive">
      {`(function(w, d, t, u, o) {w[u] = w[u] || [], o.ts = (new Date).getTime();var n = d.createElement(t);n.src = "https://bat.bing.net/bat.js?ti=" + o.ti + ("uetq" != u ? "&q=" + u : ""),n.async = 1, n.onload = n.onreadystatechange = function() {var s = this.readyState;s && "loaded" !== s && "complete" !== s ||(o.q = w[u], w[u] = new UET(o), w[u].push("pageLoad"),n.onload = n.onreadystatechange = null)};var i = d.getElementsByTagName(t)[0];i.parentNode.insertBefore(n, i);})(window, document, "script", "uetq", {ti:"${UET_TAG_ID}",enableAutoSpaTracking: true});`}
    </Script>
  );
}
