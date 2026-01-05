/**
 * Web Vitals Monitoring
 * 
 * Client-side monitoring for Core Web Vitals:
 * - LCP (Largest Contentful Paint)
 * - FID (First Input Delay) / INP (Interaction to Next Paint)
 * - CLS (Cumulative Layout Shift)
 * - FCP (First Contentful Paint)
 * - TTFB (Time to First Byte)
 */

'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

export type WebVitalName = 'CLS' | 'FID' | 'FCP' | 'INP' | 'LCP' | 'TTFB';

export interface WebVitalMetric {
  name: WebVitalName;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
}

interface WebVitalsConfig {
  /** Report metrics to analytics */
  reportToAnalytics?: boolean;
  /** Custom analytics endpoint */
  analyticsEndpoint?: string;
  /** Log metrics to console (dev only) */
  debug?: boolean;
  /** Callback when a metric is captured */
  onMetric?: (metric: WebVitalMetric) => void;
}

// Thresholds based on Google's Core Web Vitals
const thresholds: Record<WebVitalName, [number, number]> = {
  CLS: [0.1, 0.25],
  FID: [100, 300],
  FCP: [1800, 3000],
  INP: [200, 500],
  LCP: [2500, 4000],
  TTFB: [800, 1800],
};

function getRating(name: WebVitalName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const [good, poor] = thresholds[name];
  if (value <= good) return 'good';
  if (value <= poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Hook to monitor and report Web Vitals
 */
export function useWebVitals(config: WebVitalsConfig = {}) {
  const { reportToAnalytics = false, analyticsEndpoint, debug = false, onMetric } = config;
  const pathname = usePathname();

  const handleMetric = useCallback(
    (metric: WebVitalMetric) => {
      // Debug logging
      if (debug && process.env.NODE_ENV === 'development') {
        const color = metric.rating === 'good' ? 'green' : metric.rating === 'poor' ? 'red' : 'orange';
        console.log(
          `%c[Web Vital] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`,
          `color: ${color}; font-weight: bold`
        );
      }

      // Custom callback
      if (onMetric) {
        onMetric(metric);
      }

      // Report to analytics
      if (reportToAnalytics) {
        // Send to Google Analytics
        if (typeof window !== 'undefined' && 'gtag' in window) {
          (window as any).gtag('event', metric.name, {
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            event_category: 'Web Vitals',
            event_label: metric.id,
            non_interaction: true,
          });
        }

        // Send to custom endpoint
        if (analyticsEndpoint) {
          const body = JSON.stringify({
            name: metric.name,
            value: metric.value,
            rating: metric.rating,
            delta: metric.delta,
            id: metric.id,
            page: pathname,
            timestamp: Date.now(),
          });

          // Use sendBeacon for reliability
          if (navigator.sendBeacon) {
            navigator.sendBeacon(analyticsEndpoint, body);
          } else {
            fetch(analyticsEndpoint, {
              body,
              method: 'POST',
              keepalive: true,
              headers: { 'Content-Type': 'application/json' },
            }).catch(() => {
              // Silently fail
            });
          }
        }
      }
    },
    [debug, onMetric, reportToAnalytics, analyticsEndpoint, pathname]
  );

  useEffect(() => {
    // Dynamically import web-vitals to avoid SSR issues
    // Note: Install web-vitals with: npm install web-vitals
    import('web-vitals' as any).then((mod: any) => {
      const { onCLS, onFID, onFCP, onINP, onLCP, onTTFB } = mod;
      const createHandler = (name: WebVitalName) => (metric: any) => {
        handleMetric({
          name,
          value: metric.value,
          rating: getRating(name, metric.value),
          delta: metric.delta,
          id: metric.id,
          navigationType: metric.navigationType,
        });
      };

      onCLS?.(createHandler('CLS'));
      onFID?.(createHandler('FID'));
      onFCP?.(createHandler('FCP'));
      onINP?.(createHandler('INP'));
      onLCP?.(createHandler('LCP'));
      onTTFB?.(createHandler('TTFB'));
    }).catch(() => {
      // web-vitals not installed, skip monitoring
      if (debug) {
        console.warn('[Web Vitals] web-vitals package not found. Install with: npm install web-vitals');
      }
    });
  }, [handleMetric, debug]);
}

/**
 * Web Vitals Reporter Component
 * Add this to your layout to automatically monitor vitals
 */
export function WebVitalsReporter({
  reportToAnalytics = true,
  analyticsEndpoint,
  debug,
}: Omit<WebVitalsConfig, 'onMetric'>) {
  useWebVitals({
    reportToAnalytics,
    analyticsEndpoint,
    debug: debug ?? process.env.NODE_ENV === 'development',
  });

  return null;
}

/**
 * Performance observer for custom metrics
 */
export function usePerformanceObserver(
  entryTypes: string[],
  callback: (entries: PerformanceEntry[]) => void
) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });

      observer.observe({ entryTypes });

      return () => observer.disconnect();
    } catch {
      // Observer not supported for these entry types
    }
  }, [entryTypes, callback]);
}

/**
 * Track long tasks that block the main thread
 */
export function useLongTaskMonitor(threshold = 50, onLongTask?: (duration: number) => void) {
  usePerformanceObserver(['longtask'], (entries) => {
    entries.forEach((entry) => {
      if (entry.duration > threshold) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[Long Task] ${entry.duration.toFixed(2)}ms`);
        }
        onLongTask?.(entry.duration);
      }
    });
  });
}
