import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  return {
    title: isGerman 
      ? 'Apps | SeventeenLabs - Geschäftsanwendungen & Tools'
      : 'Apps | SeventeenLabs - Business Applications & Tools',
    description: isGerman
      ? 'Entdecken Sie unsere Suite von Geschäftsanwendungen und Tools. Zugriff auf Workflows, Admin-Panel und andere Produktivitätslösungen zur Optimierung Ihrer Abläufe.'
      : 'Explore our suite of business applications and tools. Access workflows, admin panel, and other productivity solutions designed to streamline your operations.',
    keywords: isGerman
      ? ['Geschäftsanwendungen', 'Produktivitätstools', 'Workflow-Management', 'Admin-Panel', 'Geschäftsautomatisierung', 'SeventeenLabs Anwendungen']
      : ['business apps', 'productivity tools', 'workflow management', 'admin panel', 'business automation', 'SeventeenLabs applications'],
    authors: [{ name: "SeventeenLabs" }],
    creator: "SeventeenLabs",
    publisher: "SeventeenLabs",
    openGraph: {
      title: isGerman 
        ? 'Apps | SeventeenLabs - Geschäftsanwendungen & Tools'
        : 'Apps | SeventeenLabs - Business Applications & Tools',
      description: isGerman
        ? 'Entdecken Sie unsere Suite von Geschäftsanwendungen zur Optimierung Ihrer Abläufe.'
        : 'Explore our suite of business applications and tools designed to streamline your operations.',
      url: isGerman ? `${baseUrl}/de/apps` : `${baseUrl}/apps`,
      siteName: "SeventeenLabs",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isGerman 
        ? 'Apps | SeventeenLabs - Geschäftsanwendungen & Tools'
        : 'Apps | SeventeenLabs - Business Applications & Tools',
      description: isGerman
        ? 'Entdecken Sie unsere Suite von Geschäftsanwendungen zur Optimierung Ihrer Abläufe.'
        : 'Explore our suite of business applications and tools designed to streamline your operations.',
    },
    alternates: {
      canonical: isGerman ? `${baseUrl}/de/apps` : `${baseUrl}/apps`,
      languages: {
        'en': `${baseUrl}/apps`,
        'de': `${baseUrl}/de/apps`,
      },
    },
  };
}

export default function AppsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${plusJakartaSans.variable} font-sans`}>
      <div className="flex min-h-screen flex-col bg-slate-950">
        <LandingHeader />
        <div className="flex-1 pt-20">
          {children}
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}