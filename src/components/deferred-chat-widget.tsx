"use client";

import { useEffect } from "react";

const LOADER_SRC = "https://widgets.leadconnectorhq.com/loader.js";
const RESOURCES_URL = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
const WIDGET_ID = "6a7bcb4770d2c2478c5ee9cf";

/**
 * On phones the closed chat bubble (fixed, bottom: 20px) lands on top of the
 * sticky bottom bars — the Buy Tickets bar on show pages (61px) and the gold
 * call bar elsewhere (44px) — so lift it clear of both. The bubble and its
 * prompt container are separate fixed elements inside the widget's shadow
 * root, hence the style must be injected there; scoping to
 * [data-active="false"] leaves the opened chat window (near fullscreen on
 * mobile) at its stock position.
 */
const MOBILE_OFFSET_CSS = `
@media (max-width: 767px) {
  :host([data-active="false"]) .lc_text-widget,
  :host([data-active="false"]) #lc_text-widget--btn {
    bottom: calc(80px + env(safe-area-inset-bottom, 0px)) !important;
  }
}`;

/**
 * Loads the LeadConnector chat widget only after the visitor interacts (or a
 * timer well past page load). Injected at load time, the widget's chat bubble
 * paints past the right edge of a phone viewport and Chrome permanently widens
 * the layout viewport to fit it — the "gap down the right side of the page"
 * bug. Past the load window, wide fixed elements no longer trigger that
 * expansion, so a deferred inject keeps the widget without the gap.
 */
export function DeferredChatWidget() {
  useEffect(() => {
    let injected = false;
    let offsetPoll = 0;
    let offsetPollStop = 0;

    // The loader builds the <chat-widget> element (and its shadow root) at its
    // own pace after the script lands, so poll briefly for it.
    const applyMobileOffset = () => {
      offsetPoll = window.setInterval(() => {
        const host = document.querySelector("chat-widget");
        if (!host?.shadowRoot) return;
        const style = document.createElement("style");
        style.textContent = MOBILE_OFFSET_CSS;
        host.shadowRoot.appendChild(style);
        window.clearInterval(offsetPoll);
        window.clearTimeout(offsetPollStop);
      }, 250);
      offsetPollStop = window.setTimeout(
        () => window.clearInterval(offsetPoll),
        20000
      );
    };

    const inject = () => {
      if (injected) return;
      injected = true;
      cleanup();
      const script = document.createElement("script");
      script.src = LOADER_SRC;
      script.dataset.resourcesUrl = RESOURCES_URL;
      script.dataset.widgetId = WIDGET_ID;
      script.async = true;
      document.body.appendChild(script);
      applyMobileOffset();
    };

    const events: (keyof WindowEventMap)[] = [
      "pointerdown",
      "scroll",
      "keydown",
      "touchstart",
    ];
    // Fallback for visitors who read without touching anything.
    const timer = window.setTimeout(inject, 8000);
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, inject));
      window.clearTimeout(timer);
    };

    events.forEach((e) =>
      window.addEventListener(e, inject, { once: true, passive: true })
    );

    return () => {
      cleanup();
      window.clearInterval(offsetPoll);
      window.clearTimeout(offsetPollStop);
    };
  }, []);

  return null;
}
