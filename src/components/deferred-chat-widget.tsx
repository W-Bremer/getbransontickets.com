"use client";

import { useEffect } from "react";

const LOADER_SRC = "https://widgets.leadconnectorhq.com/loader.js";
const RESOURCES_URL = "https://widgets.leadconnectorhq.com/chat-widget/loader.js";
const WIDGET_ID = "6a7bcb4770d2c2478c5ee9cf";

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

    return cleanup;
  }, []);

  return null;
}
