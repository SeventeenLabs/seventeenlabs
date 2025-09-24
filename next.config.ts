import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "workflows.seventeenlabs.io" }],
        destination: "/workflows/:path*",
      },
      {
        source: "/:path*", 
        has: [{ type: "host", value: "agency.seventeenlabs.io" }],
        destination: "/agency/:path*",
      },
    ];
  },
};

export default nextConfig;
