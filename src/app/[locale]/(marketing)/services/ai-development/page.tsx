import type { Metadata } from "next";
import DevelopmentHero from "@/components/services/development/development-hero";
import DevelopmentCapabilities from "@/components/services/development/development-capabilities";
import DevelopmentTechStack from "@/components/services/development/development-tech-stack";
import DevelopmentProcess from "@/components/services/development/development-process";
import DevelopmentCta from "@/components/services/development/development-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman
    ? "/de/services/ai-development"
    : "/services/ai-development";

  const title = isGerman
    ? "Maßgeschneiderte KI- & Automatisierungsentwicklung"
    : "Custom AI Development & Automation Engineering";

  const description = isGerman
    ? "Wir entwickeln individuelle KI-Anwendungen, Automatisierungsworkflows und Integrationen, die exakt zu Ihren Prozessen passen."
    : "We build custom AI applications, automation workflows, and integrations tailored to your processes and tech stack.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "Individuelle KI Entwicklung",
          "Automatisierungsworkflows",
          "n8n Entwicklung",
          "SaaS Prototyping",
          "LLM Integration",
          "SeventeenLabs Entwicklung",
        ]
      : [
          "custom AI development",
          "automation engineering",
          "n8n workflow development",
          "LLM integration",
          "AI product development",
          "SeventeenLabs developers",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/services/ai-development`,
        de: `${baseUrl}/de/services/ai-development`,
        'x-default': `${baseUrl}/services/ai-development`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${pagePath}`,
      siteName: "SeventeenLabs",
      type: "website",
      locale: isGerman ? "de_DE" : "en_US",
      images: [
        {
          url: `${baseUrl}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: isGerman
            ? "SeventeenLabs KI-Entwicklung"
            : "SeventeenLabs AI Development",
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

export default async function AiDevelopmentPage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pageUrl = isGerman
    ? `${baseUrl}/de/services/ai-development`
    : `${baseUrl}/services/ai-development`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: isGerman ? "Individuelle KI-Entwicklung" : "Custom AI Development",
    description: isGerman
      ? "Entwicklung maßgeschneiderter KI-Anwendungen, Automatisierungen und Integrationen für wachsende Unternehmen."
      : "Development of bespoke AI applications, automations, and integrations for scaling businesses.",
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    serviceType: isGerman ? "KI Entwicklung" : "AI Development",
    areaServed: "Worldwide",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      price: "4990",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What types of AI solutions do you develop?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We develop custom AI applications, intelligent automation workflows, LLM integrations, data processing systems, and web applications powered by AI. All solutions are tailored to your specific business requirements.',
        },
      },
      {
        '@type': 'Question',
        name: 'What technologies do you use for development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use modern, proven technologies including Python, Node.js, React, Next.js for web development; OpenAI GPT, Claude, and custom models for AI; and platforms like n8n, Zapier, and custom APIs for automation.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does custom development take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Development timelines vary by project complexity. Simple automation workflows take 1-2 weeks, while custom AI applications typically require 4-12 weeks. We deliver MVPs quickly and iterate based on feedback.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide ongoing support after development?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide comprehensive ongoing support including maintenance, updates, optimization, monitoring, and feature enhancements to ensure your solutions continue delivering value.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can you integrate with our existing systems?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. We specialize in seamless integration with existing systems through APIs, webhooks, and custom connectors. Our solutions are designed to enhance your current workflows without disruption.',
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
        <DevelopmentHero />
        <DevelopmentCapabilities />
        <DevelopmentTechStack />
        <DevelopmentProcess />
        <DevelopmentCta />
      </main>
    </>
  );
}
