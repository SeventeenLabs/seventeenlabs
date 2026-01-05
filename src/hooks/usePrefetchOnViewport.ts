/**
 * Viewport-based Prefetching Hook
 * 
 * Prefetches links when they enter the viewport for
 * faster navigation and better UX.
 */

'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface UsePrefetchOnViewportOptions {
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether prefetching is enabled */
  enabled?: boolean;
  /** Delay before prefetching (ms) */
  delay?: number;
}

/**
 * Hook that prefetches a route when the element enters viewport
 */
export function usePrefetchOnViewport(
  href: string,
  options: UsePrefetchOnViewportOptions = {}
) {
  const { rootMargin = '200px', enabled = true, delay = 0 } = options;
  const router = useRouter();
  const elementRef = useRef<HTMLElement>(null);
  const prefetchedRef = useRef(false);

  useEffect(() => {
    if (!enabled || prefetchedRef.current) return;

    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !prefetchedRef.current) {
          if (delay > 0) {
            setTimeout(() => {
              if (!prefetchedRef.current) {
                router.prefetch(href);
                prefetchedRef.current = true;
              }
            }, delay);
          } else {
            router.prefetch(href);
            prefetchedRef.current = true;
          }
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [href, enabled, rootMargin, delay, router]);

  return elementRef;
}

/**
 * Hook that observes multiple links and prefetches them on viewport entry
 */
export function useBatchPrefetchOnViewport(enabled = true) {
  const router = useRouter();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const prefetchedUrls = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!enabled) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const link = entry.target as HTMLAnchorElement;
            const href = link.getAttribute('href');
            
            if (href && !prefetchedUrls.current.has(href) && href.startsWith('/')) {
              router.prefetch(href);
              prefetchedUrls.current.add(href);
            }
          }
        });
      },
      { rootMargin: '200px', threshold: 0 }
    );

    return () => observerRef.current?.disconnect();
  }, [enabled, router]);

  const observe = useCallback((element: HTMLAnchorElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.observe(element);
    }
  }, []);

  const unobserve = useCallback((element: HTMLAnchorElement | null) => {
    if (element && observerRef.current) {
      observerRef.current.unobserve(element);
    }
  }, []);

  return { observe, unobserve };
}
