import type { Metadata } from "next";
import AIAppointmentEngineHero from "@/components/products/ai-appointment-engine/ai-appointment-engine-hero";
import WhatIsAIAppointmentEngine from "@/components/products/ai-appointment-engine/what-is-ai-appointment-engine";
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
  const pagePath = isGerman ? "/de/products/ai-appointment-engine" : "/products/ai-appointment-engine";

  const title = isGerman
    ? "AI Appointment Engine™ - 5-15 Termine in 30 Tagen Garantiert | SeventeenLabs"
    : "AI Appointment Engine™ - 5-15 Extra Appointments in 30 Days Guaranteed | SeventeenLabs";

  const description = isGerman
    ? "Verwandeln Sie Leads mit der AI Appointment Engine™ in gebuchte Termine. Sofortiges AI Follow-up, 24/7 Nurturing und intelligente Lead-Weiterleitung. Garantiert 5-15 extra Termine in 30 Tagen."
    : "Turn leads into booked appointments with the AI Appointment Engine™. Instant AI follow-up, 24/7 nurturing, and intelligent lead routing. Guaranteed 5-15 extra appointments in 30 days.";

  return {
    title,
    description,
    keywords: isGerman
      ? [
          "AI Appointment Engine",
          "Termine Automatisierung",
          "Lead Follow-up",
          "Terminbuchung",
          "KI Nurturing",
          "Appointment Setter",
        ]
      : [
          "AI appointment engine",
          "appointment automation",
          "lead follow-up",
          "appointment booking",
          "AI nurturing",
          "appointment setter",
        ],
    alternates: {
      canonical: `${baseUrl}${pagePath}`,
      languages: {
        en: `${baseUrl}/products/ai-appointment-engine`,
        de: `${baseUrl}/de/products/ai-appointment-engine`,
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
            ? "SeventeenLabs AI Appointment Engine™"
            : "SeventeenLabs AI Appointment Engine™",
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

export default async function AIAppointmentEnginePage({ params }: PageProps) {
  const { locale } = await params;
  const isGerman = locale === "de";
  const pageUrl = isGerman ? `${baseUrl}/de/products/ai-appointment-engine` : `${baseUrl}/products/ai-appointment-engine`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isGerman ? "AI Appointment Engine™" : "AI Appointment Engine™",
    description: isGerman
      ? "Die AI Appointment Engine™ verwandelt Ihre bestehenden Leads mit sofortigem AI Follow-up, 24/7 Nurturing und intelligenter Lead-Weiterleitung in gebuchte Termine."
      : "The AI Appointment Engine™ turns your existing leads into booked calls using instant AI follow-up, 24/7 nurturing, and intelligent lead routing.",
    provider: {
      "@type": "Organization",
      name: "SeventeenLabs",
      url: baseUrl,
    },
    serviceType: isGerman ? "AI Terminbuchung" : "AI Appointment Booking",
    areaServed: "Worldwide",
    url: pageUrl,
    offers: {
      "@type": "Offer",
      url: pageUrl,
      availability: "https://schema.org/InStock",
      price: "1500",
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
        <AIAppointmentEngineHero />
        <WhatIsAIAppointmentEngine />
        <PricingSection />
        <GuaranteeSection />
        <FAQSection />
        <AIAppointmentEngineCta />
      </main>
    </>
  );
}
