"use client";

import { track } from "@vercel/analytics";

declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: FunnelProperties) => void;
    dataLayer?: unknown[];
  }
}

export type FunnelProperties = Record<string, string | number | boolean | null>;

export function trackFunnelEvent(eventName: string, properties: FunnelProperties = {}) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    track(eventName, properties);
  } catch {
    // Analytics should never block the application flow.
  }

  window.gtag?.("event", eventName, properties);
  window.dataLayer?.push({ event: eventName, ...properties });
}
