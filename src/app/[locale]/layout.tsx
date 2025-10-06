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
  const isGerman = validLocale === 'de-DE';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  return {
    alternates: {
      canonical: `${baseUrl}/${validLocale}`,
      languages: {
        'en-US': `${baseUrl}/en-US`,
        'de-DE': `${baseUrl}/de-DE`,
      },
    },
    openGraph: {
      locale: isGerman ? 'de_DE' : 'en_US',
      url: `${baseUrl}/${validLocale}`,
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
  const isGerman = validLocale === 'de-DE';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  
  return (
    <html lang={isGerman ? 'de' : 'en'} suppressHydrationWarning>
      <head>
        {/* Hreflang tags with absolute URLs for international SEO */}
        <link rel="alternate" hrefLang="en-US" href={`${baseUrl}/en-US`} />
        <link rel="alternate" hrefLang="de-DE" href={`${baseUrl}/de-DE`} />
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/en-US`} />
      </head>
      <body
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
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
      </body>
    </html>
  );
}

// Generate static params for supported locales
export function generateStaticParams() {
  return locales.map((locale) => ({
    locale,
  }));
}