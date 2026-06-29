import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
const ogImageUrl = `${baseUrl}/og-image.png`;

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const requestedPath = headersList.get("next-url") || "/";
  const normalizedPath = requestedPath.startsWith("/") ? requestedPath : `/${requestedPath}`;
  const canonicalUrl = new URL(normalizedPath === "/" ? "/" : normalizedPath, baseUrl).toString();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "SeventeenLabs | AI Movie and Series Creation SaaS",
      template: "%s | SeventeenLabs",
    },
    description:
      "AI studio workspace for creators, brands, and studios. Turn concepts into cinematic movies, series, pilots, trailers, posters, and launch assets.",
    keywords: [
      "AI movie creation",
      "AI series creation",
      "AI film studio",
      "AI video production",
      "AI trailer creation",
      "AI filmmaking",
      "AI story production",
      "SeventeenLabs",
    ],
    authors: [{ name: "SeventeenLabs" }],
    creator: "SeventeenLabs",
    publisher: "SeventeenLabs",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: canonicalUrl,
      siteName: "SeventeenLabs",
      title: "SeventeenLabs | AI Production Pipeline for Films and Series",
      description:
        "Plan scenes, lock continuity, and generate consistent shots for AI films, pilots, trailers, and series.",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "SeventeenLabs AI production pipeline for films, pilots, trailers, and series",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "SeventeenLabs - AI Production Pipeline for Films and Series",
      description:
        "Plan scenes, lock continuity, and generate consistent shots for AI films, pilots, trailers, and series.",
      images: [ogImageUrl],
      creator: "@seventeenlabs",
      site: "@seventeenlabs",
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "32x32" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [
        { url: "/apple-touch-icon.png", sizes: "180x180" },
      ],
    },
    category: "Technology",
    classification: "Business Services",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
        {/* Preconnect to common third-party services */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        {/* Preload critical assets */}
        <link rel="preload" href="/favicon.ico" as="image" />
      </head>
      <body 
        className={`${manrope.variable} ${sora.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
