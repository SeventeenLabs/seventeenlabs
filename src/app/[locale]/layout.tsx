import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n/context";
import { getLocaleFromString, locales } from "@/lib/i18n/config";
import StructuredData from "@/components/structured-data";
import "../globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

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

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: isGerman ? `${baseUrl}/de` : baseUrl,
      languages: {
        'en': baseUrl,
        'de': `${baseUrl}/de`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isGerman ? 'de_DE' : 'en_US',
      url: isGerman ? `${baseUrl}/de` : baseUrl,
      siteName: 'SeventeenLabs',
      title: 'SeventeenLabs - AI Automation Agency | Custom Workflow Solutions',
      description: 'AI automation agency specializing in custom workflow automation and intelligent process optimization. Transform your business with AI-powered solutions.',
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'SeventeenLabs - AI Automation Agency',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'SeventeenLabs - AI Automation Agency',
      description: 'AI automation agency specializing in custom workflow automation and intelligent process optimization.',
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
      icon: '/favicon.ico',
      apple: '/favicon.ico',
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

  // Organization structured data
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'SeventeenLabs',
    url: baseUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/logo-white.svg`,
      width: 150,
      height: 150,
    },
    sameAs: [
      'https://twitter.com/seventeenlabs',
      'https://linkedin.com/company/seventeenlabs',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      availableLanguage: ['en', 'de'],
    },
  };

  // Website structured data
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    url: baseUrl,
    name: 'SeventeenLabs',
    description: 'AI automation agency specializing in custom workflow automation',
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    inLanguage: isGerman ? 'de-DE' : 'en-US',
  };
  
  return (
    <>
      {/* Hreflang tags with absolute URLs for international SEO */}
      <link rel="alternate" hrefLang="en" href={baseUrl} />
      <link rel="alternate" hrefLang="de" href={`${baseUrl}/de`} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      
      {/* Structured Data - JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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