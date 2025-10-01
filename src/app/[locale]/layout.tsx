import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { I18nProvider } from "@/lib/i18n/context";
import { getLocaleFromString, locales } from "@/lib/i18n/config";
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

export const metadata: Metadata = {
  title: "SeventeenLabs",
  description: "SeventeenLabs platform",
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale and ensure it's one of our supported locales
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === 'de-DE';
  
  return (
    <html lang={isGerman ? 'de' : 'en'} suppressHydrationWarning>
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