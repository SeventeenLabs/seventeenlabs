import type { Metadata } from "next";
import "./globals.css";
import StructuredData from "@/components/structured-data";

export const metadata: Metadata = {
  title: {
    default: "SeventeenLabs - AI-Powered Workflow Automation & Custom Development",
    template: "%s | SeventeenLabs"
  },
  description: "Transform your business with AI-powered workflow automation, custom software development, and intelligent process optimization. SeventeenLabs delivers cutting-edge automation solutions.",
  keywords: ["workflow automation", "AI automation", "custom development", "business automation", "process optimization", "n8n workflows", "AI integration"],
  authors: [{ name: "SeventeenLabs" }],
  creator: "SeventeenLabs",
  publisher: "SeventeenLabs",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'de-DE': '/de-DE',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'SeventeenLabs',
    title: 'SeventeenLabs - AI-Powered Workflow Automation & Custom Development',
    description: 'Transform your business with AI-powered workflow automation and custom development solutions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SeventeenLabs - Workflow Automation Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SeventeenLabs - AI-Powered Workflow Automation',
    description: 'Transform your business with AI-powered workflow automation and custom development.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code', // Add your verification code
  },
};

// Root layout provides HTML structure for routes outside [locale]
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <StructuredData type="home" />
        {children}
      </body>
    </html>
  );
}
