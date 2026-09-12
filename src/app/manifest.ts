import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SeventeenLabs",
    short_name: "SeventeenLabs",
    description: "Creative software for generative media.",
    start_url: "/",
    display: "browser",
    background_color: "#10120f",
    theme_color: "#10120f",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
    shortcuts: [
      { name: "Frame", url: "/frame" },
      { name: "Early access", url: "/apply" },
    ],
  };
}
