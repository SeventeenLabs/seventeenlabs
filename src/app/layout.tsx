import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
  title: {
    default: "SeventeenLabs | AI Automation Agency",
    template: "%s | SeventeenLabs"
  },
  description: "AI automation agency specializing in custom workflow automation, intelligent process optimization, and scalable automation solutions. Transform your business operations with AI-powered workflows.",
  keywords: ["AI automation agency", "workflow automation", "AI automation", "custom automation", "business automation", "process automation", "n8n workflows", "AI integration"],
  authors: [{ name: "SeventeenLabs" }],
  creator: "SeventeenLabs",
  publisher: "SeventeenLabs",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/',
      'de': '/de',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'SeventeenLabs',
  title: 'SeventeenLabs | AI Automation Agency',
    description: 'AI automation agency specializing in custom workflow automation and intelligent process optimization. Transform your business with AI-powered solutions.',
    images: [
      {
        url: '/opengraph-image',
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
    images: ['/opengraph-image'],
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
  category: 'Technology',
  classification: 'Business Services',
};

// Root layout provides HTML structure for routes outside [locale]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'SeventeenLabs',
    description: 'AI automation agency specializing in custom workflow automation and intelligent process optimization',
    url: 'https://seventeenlabs.io',
    logo: 'https://seventeenlabs.io/logo-white.svg',
    image: 'https://seventeenlabs.io/opengraph-image',
    telephone: '+1-XXX-XXX-XXXX',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    sameAs: [
      'https://twitter.com/seventeenlabs',
      'https://linkedin.com/company/seventeenlabs',
    ],
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    serviceType: ['AI Automation', 'Workflow Automation', 'Process Optimization'],
    priceRange: '$$',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: '10',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body 
        className={`${inter.variable} ${plusJakartaSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
