import type { Metadata } from "next";
import ConsultingHero from "@/components/services/consulting/consulting-hero";
import ConsultingApproach from "@/components/services/consulting/consulting-approach";
import ConsultingServices from "@/components/services/consulting/consulting-services";
import ConsultingCta from "@/components/services/consulting/consulting-cta";
import { generateServicePageMetadata } from "@/lib/seo/metadata";
import { Locale } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return generateServicePageMetadata('services/ai-consulting', locale as Locale);
}

export default async function AiConsultingPage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pageUrl = isGerman
    ? `${baseUrl}/de/services/ai-consulting`
    : `${baseUrl}/services/ai-consulting`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: isGerman ? "Strategische KI-Beratung" : "AI Consulting",
    description: isGerman
      ? "Beratung für KI-Strategie, Priorisierung von Automatisierungsprojekten und ROI-basierte Entscheidungsgrundlagen."
      : "Consulting for AI strategy, automation opportunity prioritization, and ROI-backed decision making.",
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    areaServed: "Worldwide",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      price: "2490",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What does AI consulting include?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our AI consulting includes strategic AI roadmap development, implementation support, team enablement and training, technology evaluation and selection, and continuous optimization to ensure maximum ROI.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you develop an AI strategy?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We start with understanding your business objectives, assess current capabilities, identify high-impact opportunities, prioritize initiatives by ROI and feasibility, and create a phased implementation roadmap with clear milestones.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the typical engagement duration?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AI consulting engagements typically range from 3-12 months depending on scope. We offer both project-based consulting for specific initiatives and ongoing strategic advisory relationships.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you provide implementation support?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we provide hands-on implementation support throughout your AI journey, from proof of concept development to full deployment, including team training and change management.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you measure consulting success?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Success is measured through clear KPIs including implementation milestones achieved, ROI delivered, team capability improvement, and business process optimization metrics aligned with your strategic objectives.',
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
        <ConsultingHero />
        <ConsultingApproach />
        <ConsultingServices />
        <ConsultingCta />
      </main>
    </>
  );
}
