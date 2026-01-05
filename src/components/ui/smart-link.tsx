/**
 * Smart Link Component
 * 
 * Enhanced Next.js Link that prefetches on viewport entry
 * for faster navigation and better UX.
 */

'use client';

import { useEffect, useRef, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import Link, { LinkProps } from 'next/link';

interface SmartLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
  /** Prefetch when link enters viewport */
  prefetchOnViewport?: boolean;
  /** Root margin for viewport detection */
  rootMargin?: string;
}

export const SmartLink = forwardRef<HTMLAnchorElement, SmartLinkProps>(
  function SmartLink(
    { href, children, className, prefetchOnViewport = true, rootMargin = '200px', ...props },
    externalRef
  ) {
    const internalRef = useRef<HTMLAnchorElement>(null);
    const router = useRouter();
    const prefetchedRef = useRef(false);

    useEffect(() => {
      if (!prefetchOnViewport || prefetchedRef.current) return;

      const element = internalRef.current;
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !prefetchedRef.current) {
            const hrefString = typeof href === 'string' ? href : href.pathname || '';
            if (hrefString.startsWith('/')) {
              router.prefetch(hrefString);
              prefetchedRef.current = true;
            }
            observer.disconnect();
          }
        },
        { rootMargin, threshold: 0 }
      );

      observer.observe(element);

      return () => observer.disconnect();
    }, [href, prefetchOnViewport, rootMargin, router]);

    return (
      <Link
        ref={(node) => {
          // Handle both refs
          (internalRef as React.MutableRefObject<HTMLAnchorElement | null>).current = node;
          if (typeof externalRef === 'function') {
            externalRef(node);
          } else if (externalRef) {
            externalRef.current = node;
          }
        }}
        href={href}
        className={className}
        prefetch={false} // Disable default prefetch, use viewport-based
        {...props}
      >
        {children}
      </Link>
    );
  }
);
