import type { Metadata } from "next";
import ConsultingHero from "@/components/services/consulting/consulting-hero";
import ConsultingApproach from "@/components/services/consulting/consulting-approach";
import ConsultingServices from "@/components/services/consulting/consulting-services";
import ConsultingCta from "@/components/services/consulting/consulting-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pagePath = isGerman ? "/de/services/ai-consulting" : "/services/ai-consulting";

  const title = isGerman
    ? "Strategische KI-Beratung & Automatisierungsstrategie"
    : "AI Consulting & Automation Strategy Services";

  const description = isGerman
    ? "Entwickeln Sie mit uns eine praxisnahe KI-Strategie. Wir definieren Prioritäten, Business-Cases und Roadmaps für Ihre Automatisierungsvorhaben."
    : "Build a practical AI strategy with dedicated consulting. We prioritize use cases, model ROI, and craft roadmaps for your automation initiatives.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "KI Beratung",
          "Automatisierungsstrategie",
          "AI Roadmap",
          "Digitalisierung Beratung",
          "Prozessoptimierung",
          "SeventeenLabs Beratung",
        ]
      : [
          "AI consulting",
          "automation strategy",
          "AI roadmap",
          "digital transformation consulting",
          "process optimization",
          "AI advisory",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/services/ai-consulting`,
        de: `${baseUrl}/de/services/ai-consulting`,
        'x-default': `${baseUrl}/services/ai-consulting`,
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
            ? "SeventeenLabs KI-Beratung"
            : "SeventeenLabs AI Consulting",
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
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
