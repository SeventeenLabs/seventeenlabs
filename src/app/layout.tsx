import type { Metadata } from "next";
import { headers } from "next/headers";
import { IBM_Plex_Mono, Instrument_Sans, Manrope, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./company.css";

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

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const requestedPath = headersList.get("next-url") || "/";
  const normalizedPath = requestedPath.startsWith("/")
    ? requestedPath
    : `/${requestedPath}`;
  const canonicalUrl = new URL(
    normalizedPath === "/" ? "/" : normalizedPath,
    baseUrl,
  ).toString();

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "SeventeenLabs | Creative software for generative media",
      template: "%s | SeventeenLabs",
    },
    description:
      "SeventeenLabs is an open project building creative software for generative media. Tools for AI-native filmmaking, made in public, from the first idea to the final frame.",
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
      title: "SeventeenLabs | Creative software for generative media",
      description:
        "Independent creative software for a new generation of filmmakers. Explore Frame, the generative video editor we’re building.",
      images: [
        {
          url: ogImageUrl,
          width: 1672,
          height: 941,
          alt: "SeventeenLabs. Creative software for generative media.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "SeventeenLabs | Creative software for generative media",
      description:
        "Independent creative software for a new generation of filmmakers.",
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
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    category: "Technology",
    classification: "Creative Software",
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
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
        className={`${manrope.variable} ${sora.variable} ${instrumentSans.variable} ${plexMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
