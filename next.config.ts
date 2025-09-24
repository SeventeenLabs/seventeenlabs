import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Handle root path for workflows subdomain
      {
        source: "/",
        has: [{ type: "host", value: "workflows.seventeenlabs.io" }],
        destination: "/workflows",
      },
      // Handle all other paths for workflows subdomain  
      {
        source: "/:path+",
        has: [{ type: "host", value: "workflows.seventeenlabs.io" }],
        destination: "/workflows/:path*",
      },
      // Handle root path for agency subdomain
      {
        source: "/",
        has: [{ type: "host", value: "agency.seventeenlabs.io" }],
        destination: "/agency",
      },
      // Handle all other paths for agency subdomain
      {
        source: "/:path+", 
        has: [{ type: "host", value: "agency.seventeenlabs.io" }],
        destination: "/agency/:path*",
      },
    ];
  },
};

export default nextConfig;
