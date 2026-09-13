import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { I18nProvider } from "@/lib/i18n/context";
import { getLocaleFromString, locales } from "@/lib/i18n/config";
import StructuredData from "@/components/structured-data";
import "../globals.css";

export const dynamicParams = false;

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata dynamically for each locale
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.some((supported) => supported === locale)) notFound();
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === "de";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
  const ogImageUrl = `${baseUrl}/og-image.png`;
  const title = isGerman
    ? "SeventeenLabs | Kreative Software für generative Medien"
    : "SeventeenLabs | Creative software for generative media";
  const description = isGerman
    ? "SeventeenLabs entwickelt kreative Software für generative Medien."
    : "SeventeenLabs builds creative software for generative media.";

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      type: "website",
      locale: isGerman ? "de_DE" : "en_US",
      url: isGerman ? `${baseUrl}/de` : baseUrl,
      siteName: "SeventeenLabs",
      title,
      description,
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
      title,
      description,
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
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  if (!locales.some((supported) => supported === locale)) notFound();

  // Validate locale and ensure it's one of our supported locales
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === "de";
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: isGerman ? `${baseUrl}/de` : baseUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-GP1PFPXNHD"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-GP1PFPXNHD');
        `}
      </Script>

      {/* Structured Data */}
      <StructuredData locale={validLocale} type="home" />

      <I18nProvider locale={validLocale}>{children}</I18nProvider>
    </>
  );
}

// Generate static params for supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
