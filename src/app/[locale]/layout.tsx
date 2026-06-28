import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n/context";
import { getLocaleFromString, locales } from "@/lib/i18n/config";
import StructuredData from "@/components/structured-data";
import "../globals.css";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata dynamically for each locale
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const title = isGerman
    ? 'SeventeenLabs | AI Filme und Serien erstellen'
    : 'SeventeenLabs | AI Movie and Series Creation SaaS';
  const description = isGerman
    ? 'AI Studio Workspace fur Filme, Serien, Trailer, Piloten, Charaktere, Szenen und Launch-Assets.'
    : 'AI studio workspace for creating movies, series, trailers, pilots, characters, scenes, and launch assets.';

  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    openGraph: {
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url: isGerman ? `${baseUrl}/de` : baseUrl,
      siteName: 'SeventeenLabs',
      title,
      description,
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'SeventeenLabs - AI movie and series creation SaaS',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/opengraph-image`],
      creator: '@seventeenlabs',
      site: '@seventeenlabs',
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180' },
      ],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale and ensure it's one of our supported locales
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  // Breadcrumb structured data
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
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
      
      <I18nProvider locale={validLocale}>
        {children}
      </I18nProvider>
      <Analytics />
    </>
  );
}

// Generate static params for supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}
