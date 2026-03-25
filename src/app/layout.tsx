import type { Metadata } from "next";
import { headers } from "next/headers";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

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
      default: "SeventeenLabs | AI Automation Agency",
      template: "%s | SeventeenLabs",
    },
    description:
      "AI automation agency specializing in custom workflow automation, intelligent process optimization, and scalable automation solutions. Transform your business operations with AI-powered workflows.",
    keywords: [
      "AI automation agency",
      "workflow automation",
      "AI automation",
      "custom automation",
      "business automation",
      "process automation",
      "n8n workflows",
      "AI integration",
    ],
    authors: [{ name: "SeventeenLabs" }],
    creator: "SeventeenLabs",
    publisher: "SeventeenLabs",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      locale: normalizedPath.startsWith("/de") ? "de_DE" : "en_US",
      url: canonicalUrl,
      siteName: "SeventeenLabs",
      title: "SeventeenLabs | AI Automation Agency",
      description:
        "AI automation agency specializing in custom workflow automation and intelligent process optimization. Transform your business with AI-powered solutions.",
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: "SeventeenLabs - AI Automation Agency",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "SeventeenLabs - AI Automation Agency",
      description:
        "AI automation agency specializing in custom workflow automation and intelligent process optimization.",
      images: [`${baseUrl}/opengraph-image`],
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

// Root layout provides HTML structure for routes outside [locale]
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const hintedLocale = headersList.get('x-path-locale');
  let htmlLang = 'en';
  if (hintedLocale === 'de') {
    htmlLang = 'de';
  } else if (hintedLocale === 'en') {
    htmlLang = 'en';
  } else {
    const pathname = headersList.get('next-url') || '/';
    const firstSegment = pathname.split('/')[1];
    htmlLang = firstSegment === 'de' ? 'de' : 'en';
  }
  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        {/* Resource Hints for Performance */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
      </body>
    </html>
  );
}
