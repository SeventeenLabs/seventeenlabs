import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Subdomain routing is now handled by middleware.ts for better reliability

  // SEO Optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security

  // Generate ETags for caching
  generateEtags: true,

  // Experimental features for performance
  experimental: {
    // optimizeCss: true, // Temporarily disabled - requires critters package
  },

  // Image optimization
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      {
        pathname: "/api/image-proxy",
      },
      {
        pathname: "/**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.notion.so",
      },
      {
        protocol: "https",
        hostname: "notion.so",
      },
      {
        protocol: "https",
        hostname: "www.notion.so",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
    ],
  },

  // Trailing slashes for consistent URLs
  trailingSlash: false,

  // Public English routes share the existing locale-aware layouts.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/about", destination: "/en/about" },
        { source: "/frame", destination: "/en/frame" },
        { source: "/privacy", destination: "/en/privacy" },
        { source: "/terms", destination: "/en/terms" },
        { source: "/blog/:path*", destination: "/en/blog/:path*" },
      ],
    };
  },

  // Redirect deprecated /en routes to root / for canonical English
  async redirects() {
    return [
      { source: "/products", destination: "/frame", permanent: true },
      { source: "/de/products", destination: "/de/frame", permanent: true },
      { source: "/products/relay", destination: "/frame", permanent: true },
      { source: "/products/core", destination: "/frame", permanent: true },
      {
        source: "/de/products/relay",
        destination: "/de/frame",
        permanent: true,
      },
      {
        source: "/de/products/core",
        destination: "/de/frame",
        permanent: true,
      },
      { source: "/solutions/:path*", destination: "/about", permanent: true },
      {
        source: "/de/solutions/:path*",
        destination: "/de/about",
        permanent: true,
      },
      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.svg",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache fonts
      {
        source: "/:path*.woff2",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
