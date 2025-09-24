import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
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
      // Local testing convenience (map agency.localhost in hosts file)
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
            value: "workflows.seventeenlabs.io",
          },
        ],
        destination: "/workflows/:path*",
      },
      // Local testing convenience (map workflows.localhost in hosts file)
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
      {
        source: "/agency/:path*",
        has: [
          {
            type: "host",
            value: "(?!agency\\.).*seventeenlabs\\.io",
          },
        ],
        destination: "https://agency.seventeenlabs.io/:path*",
        permanent: false,
      },
      // Only redirect workflows routes in production/live environments
      {
        source: "/workflows/:path*",
        has: [
          {
            type: "host",
            value: "(?!workflows\\.).*seventeenlabs\\.io",
          },
        ],
        destination: "https://workflows.seventeenlabs.io/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
