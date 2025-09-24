import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Agency subdomain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "agency.seventeenlabs.io",
          },
        ],
        destination: "/agency/:path*",
      },
      // Workflows subdomain  
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "workflows.seventeenlabs.io",
          },
        ],
        destination: "/workflows/:path*",
      },
      // Local development convenience
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "agency.localhost",
          },
        ],
        destination: "/agency/:path*",
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "workflows.localhost",
          },
        ],
        destination: "/workflows/:path*",
      },
    ];
  },
  async redirects() {
    return [
      // Redirect /agency routes from main domain to agency subdomain
      {
        source: "/agency/:path*",
        has: [
          {
            type: "host",
            value: "seventeenlabs.io",
          },
        ],
        destination: "https://agency.seventeenlabs.io/:path*",
        permanent: false,
      },
      // Redirect /workflows routes from main domain to workflows subdomain
      {
        source: "/workflows/:path*",
        has: [
          {
            type: "host",
            value: "seventeenlabs.io",
          },
        ],
        destination: "https://workflows.seventeenlabs.io/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
