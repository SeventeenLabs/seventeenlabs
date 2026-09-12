import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
  return [
    { path: "/", priority: 1 },
    { path: "/frame", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/apply", priority: 0.8 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ].map(({ path, priority }) => ({
    url: new URL(path, base).toString(),
    changeFrequency: "monthly",
    priority,
  }));
}
