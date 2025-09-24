import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Workflows subdomain - root path  
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "workflows.seventeenlabs.io",
          },
        ],
        destination: "/workflows",
      },
      // Workflows subdomain - all other paths
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
      // Agency subdomain - root path
      {
        source: "/",
        has: [
          {
            type: "host",
            value: "agency.seventeenlabs.io",
          },
        ],
        destination: "/agency",
      },
      // Agency subdomain - all other paths
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
    ];
  },
};

export default nextConfig;
