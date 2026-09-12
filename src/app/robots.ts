import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/app/", "/signin", "/signup"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
