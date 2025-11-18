import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import MarketingAgenciesHero from "@/components/solutions/marketing-agencies/marketing-agencies-hero";
import MarketingAgenciesRoadmapPreview from "@/components/solutions/marketing-agencies/marketing-agencies-roadmap-preview";
import MarketingAgenciesProblems from "@/components/solutions/marketing-agencies/marketing-agencies-problems";
import MarketingAgenciesSolutions from "@/components/solutions/marketing-agencies/marketing-agencies-solutions";
import MarketingAgenciesFeatures from "@/components/solutions/marketing-agencies/marketing-agencies-features";
import MarketingAgenciesPrebuiltWorkflows from "@/components/solutions/marketing-agencies/marketing-agencies-prebuilt-workflows";
import MarketingAgenciesCTA from "@/components/solutions/marketing-agencies/marketing-agencies-cta";
import type { Metadata } from "next";

interface MarketingAgenciesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: MarketingAgenciesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const pagePath = isGerman ? '/de/industries/marketing-agencies' : '/industries/marketing-agencies';
  const pageUrl = `${baseUrl}${pagePath}`;

  return {
    title: isGerman 
      ? "Marketing Agentur Automatisierung | AI-gestützte Lösungen"
      : "Marketing Agency Automation | AI-Powered Solutions for Agencies",
    description: isGerman
      ? "Automatisieren Sie Ihre Marketing-Agentur mit AI. Sparen Sie 70% Zeit, gewinnen Sie 3x mehr Kunden. Maßgeschneiderte Workflow-Automatisierung für moderne Agenturen."
      : "Automate your marketing agency with AI. Save 70% time, gain 3x more clients. Custom workflow automation solutions for modern agencies.",
    keywords: isGerman
      ? [
          "Marketing Agentur Automatisierung",
          "KI für Agenturen",
          "Workflow Automatisierung",
          "Kampagnen Automatisierung",
          "Lead Management Automation",
          "Reporting Automatisierung",
        ]
      : [
          "marketing agency automation",
          "AI for marketing agencies",
          "agency workflow automation",
          "campaign automation",
          "lead management automation",
          "client reporting automation",
        ],
    alternates: {
      canonical: pageUrl,
      languages: {
        en: `${baseUrl}/industries/marketing-agencies`,
        de: `${baseUrl}/de/industries/marketing-agencies`,
        'x-default': `${baseUrl}/industries/marketing-agencies`,
      },
    },
    openGraph: {
      title: "Marketing Agency Automation | SeventeenLabs",
      description: "Save 70% time and gain 3x more clients with AI-powered marketing agency automation",
      url: pageUrl,
      siteName: 'SeventeenLabs',
      images: [
        {
          url: `${baseUrl}/marketing-agencies/opengraph-image`,
          width: 1200,
          height: 630,
          alt: 'Marketing Agency Automation - SeventeenLabs',
        },
      ],
      locale: isGerman ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: "Marketing Agency Automation | SeventeenLabs",
      description: "Save 70% time and gain 3x more clients with AI-powered automation",
      images: [`${baseUrl}/marketing-agencies/opengraph-image`],
    },
  };
}

export default async function MarketingAgenciesPage({ params }: MarketingAgenciesPageProps) {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const pageUrl = locale === 'de'
    ? `${baseUrl}/de/industries/marketing-agencies`
    : `${baseUrl}/industries/marketing-agencies`;

  // Structured data for SEO
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Marketing Agency Automation',
    provider: {
      '@type': 'Organization',
      name: 'SeventeenLabs',
      url: baseUrl,
    },
    description: 'AI-powered workflow automation solutions specifically designed for marketing agencies',
    serviceType: 'Marketing Automation',
    areaServed: 'Worldwide',
    url: pageUrl,
    offers: {
      '@type': 'Offer',
      description: 'Custom marketing agency automation solutions',
      availability: 'https://schema.org/InStock',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How can automation help my marketing agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Marketing agency automation saves 70% of time on repetitive tasks, allowing you to handle 3x more clients with the same team size. Automate client onboarding, reporting, social media posting, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'What processes can be automated in a marketing agency?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Common automations include: client onboarding workflows, social media scheduling and posting, analytics reporting, lead nurturing, email campaigns, content approval workflows, and client communication.',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <LandingHeader />
      <main>
        <MarketingAgenciesHero locale={locale} />
        <MarketingAgenciesProblems locale={locale} />
        <MarketingAgenciesSolutions locale={locale} />
        <MarketingAgenciesRoadmapPreview locale={locale} />
        <MarketingAgenciesPrebuiltWorkflows locale={locale} />
        <MarketingAgenciesFeatures locale={locale} />
        <MarketingAgenciesCTA locale={locale} />
      </main>
      <SiteFooter />
    </div>
  );
}
