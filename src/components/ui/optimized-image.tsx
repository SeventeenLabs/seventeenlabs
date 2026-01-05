/**
 * Optimized Image Component
 * 
 * Enhanced Next.js Image with:
 * - Automatic blur placeholder generation
 * - Loading state animations
 * - Lazy loading with intersection observer
 * - SEO-friendly alt text handling
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

// Low quality placeholder color based on dominant color (fallback)
const DEFAULT_BLUR_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTVlN2ViIi8+PC9zdmc+';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  /** Custom blur data URL for LQIP */
  blurDataURL?: string;
  /** Whether to show loading animation */
  showLoading?: boolean;
  /** Custom loading placeholder color */
  placeholderColor?: string;
  /** Aspect ratio for responsive sizing */
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  /** Whether to use fade-in animation on load */
  fadeIn?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  portrait: 'aspect-[3/4]',
  auto: '',
};

export function OptimizedImage({
  src,
  alt,
  className,
  blurDataURL,
  showLoading = true,
  placeholderColor = '#e5e7eb',
  aspectRatio = 'auto',
  fadeIn = true,
  priority = false,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Lazy load images using IntersectionObserver
  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  // Generate placeholder SVG with custom color
  const placeholderDataUrl = blurDataURL || generatePlaceholder(placeholderColor);

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Loading skeleton */}
      {showLoading && !isLoaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ backgroundColor: placeholderColor }}
          aria-hidden="true"
        />
      )}

      {/* Image */}
      {isInView && (
        <Image
          src={src}
          alt={alt}
          className={cn(
            'transition-opacity duration-300',
            fadeIn && !isLoaded ? 'opacity-0' : 'opacity-100'
          )}
          placeholder={blurDataURL ? 'blur' : 'empty'}
          blurDataURL={placeholderDataUrl}
          priority={priority}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </div>
  );
}

// Generate a simple placeholder SVG
function generatePlaceholder(color: string): string {
  const svg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

// Blog post featured image with optimized defaults
interface BlogImageProps extends Omit<OptimizedImageProps, 'aspectRatio'> {
  caption?: string;
}

export function BlogImage({
  src,
  alt,
  caption,
  className,
  ...props
}: BlogImageProps) {
  return (
    <figure className={cn('my-8', className)}>
      <OptimizedImage
        src={src}
        alt={alt}
        aspectRatio="video"
        className="rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
        {...props}
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// Avatar image with circular styling
interface AvatarImageProps extends Omit<OptimizedImageProps, 'aspectRatio'> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const avatarSizes = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
};

export function AvatarImage({
  src,
  alt,
  size = 'md',
  className,
  ...props
}: AvatarImageProps) {
  const dimension = avatarSizes[size];
  
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={dimension}
      height={dimension}
      aspectRatio="square"
      className={cn('rounded-full', className)}
      placeholderColor="#d1d5db"
      {...props}
    />
  );
}

// Hero/banner image with full-width optimization
export function HeroImage({
  src,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      priority
      fill
      className={cn('object-cover', className)}
      sizes="100vw"
      {...props}
    />
  );
}
