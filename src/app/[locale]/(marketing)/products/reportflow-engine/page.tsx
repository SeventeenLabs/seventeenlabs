import type { Metadata } from "next";
import AIAppointmentEngineHero from "@/components/products/ai-appointment-engine/ai-appointment-engine-hero";
import ProblemSection from "@/components/products/ai-appointment-engine/problem-section";
import SolutionSection from "@/components/products/ai-appointment-engine/solution-section";
import MidCtaSection from "@/components/products/ai-appointment-engine/mid-cta-section";
import OutcomeSection from "@/components/products/ai-appointment-engine/outcome-section";
import GuaranteeSection from "@/components/products/ai-appointment-engine/guarantee-section";
import PricingSection from "@/components/products/ai-appointment-engine/pricing-section";
import FAQSection from "@/components/products/ai-appointment-engine/faq-section";
import AIAppointmentEngineCta from "@/components/products/ai-appointment-engine/ai-appointment-engine-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/products/reportflow-engine" : "/products/reportflow-engine";

  const title = isGerman
    ? "ReportFlow Engine™ - 23+ Stunden Monatlich Sparen | SeventeenLabs"
    : "ReportFlow Engine™ - Save 23+ Hours Monthly With Automated Client Reporting | SeventeenLabs";

  const description = isGerman
    ? "Automatisieren Sie Ihre Client-Berichte mit ReportFlow Engine™. Sparen Sie 23+ Stunden monatlich mit KI-gestützten Dashboards, automatisierter Datensammlung und professionellen Reports."
    : "Automate your client reporting with ReportFlow Engine™. Save 23+ hours monthly with AI-powered dashboards, automated data collection, and professional reports.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "ReportFlow Engine",
          "Client Reporting Automatisierung",
          "Agency Reporting",
          "Marketing Dashboard",
          "KI Reports",
          "Automatisierte Berichte",
        ]
      : [
          "ReportFlow Engine",
          "automated client reporting",
          "agency reporting automation",
          "marketing dashboard",
          "AI reports",
          "client report automation",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/products/reportflow-engine`,
        de: `${baseUrl}/de/products/reportflow-engine`,
        'x-default': `${baseUrl}/products/reportflow-engine`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${pagePath}`,
      type: "website",
      siteName: "SeventeenLabs",
      locale: isGerman ? "de_DE" : "en_US",
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: isGerman
            ? "SeventeenLabs ReportFlow Engine™"
            : "SeventeenLabs ReportFlow Engine™",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/opengraph-image`],
    },
  };
}

export default async function ReportFlowEnginePage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pageUrl = isGerman ? `${baseUrl}/de/products/reportflow-engine` : `${baseUrl}/products/reportflow-engine`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isGerman ? "ReportFlow Engine™" : "ReportFlow Engine™",
    description: isGerman
      ? "ReportFlow Engine™ automatisiert Ihre Client-Berichte mit KI-gestützten Dashboards, spart 23+ Stunden monatlich und verbessert die Kundenzufriedenheit durch professionelle, automatisierte Reports."
      : "ReportFlow Engine™ automates your client reporting with AI-powered dashboards, saves 23+ hours monthly, and improves client satisfaction through professional, automated reports.",
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    serviceType: isGerman ? "Marketing Automatisierung" : "Marketing Automation",
    areaServed: "Worldwide",
    url: pageUrl,
  };

  // FAQ Schema using content from translations
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What exactly does ReportFlow Engine automate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It automatically collects data from your marketing platforms, generates AI powered performance summaries, creates visual dashboards, and delivers reports to your clients on schedule. Everything that takes your team hours every week happens automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'How quickly can I start saving time?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Implementation takes 3 to 5 business days. Once live, you immediately stop spending hours on manual data collection and report creation. Most agencies see the full 23+ hours saved within the first month.',
        },
      },
      {
        '@type': 'Question',
        name: 'Which marketing platforms can you connect?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We can connect virtually any platform your agency uses. Advertising platforms, analytics tools, social media, CRM systems, email marketing tools. If it has data you need to report on, we can pull it in automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'What reports will I receive?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You get automated dashboards showing all your marketing performance data in one place. The system generates AI powered summaries of what is working and what needs attention. You can access real time dashboards anytime or receive scheduled report summaries via email.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to change how I work with clients?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. The system works behind the scenes. Your client communication stays the same, but you spend zero time building reports. You focus on strategy and optimization while automation handles the reporting.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I need to add new data sources?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We handle it. As your agency adds new tools or platforms, we integrate them into your reporting system. This is included in the ongoing support, no additional setup process needed.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen">
        <AIAppointmentEngineHero />
        <ProblemSection />
        <SolutionSection />
        <MidCtaSection />
        <OutcomeSection />
        <GuaranteeSection />
        <FAQSection />
        <AIAppointmentEngineCta />
      </main>
    </>
  );
}
