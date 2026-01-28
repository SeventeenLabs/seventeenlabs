import type { Metadata } from "next";
import ConsultingHero from "@/components/services/consulting/consulting-hero";
import ConsultingApproach from "@/components/services/consulting/consulting-approach";
import ConsultingServices from "@/components/services/consulting/consulting-services";
import ConsultingCta from "@/components/services/consulting/consulting-cta";
import ProblemSection from "@/components/problem-section";
import FAQSection from "@/components/faq-section";
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

  // Problem section content
  const problems = isGerman ? [
    { text: "Sie wissen, dass KI helfen könnte, aber nicht wo Sie anfangen sollen", impact: "Verschwendete Monate" },
    { text: "Ihr Team ist skeptisch gegenüber KI oder hat Angst davor", impact: "Keine Akzeptanz" },
    { text: "Sie haben KI-Tools ausprobiert, die nicht funktioniert haben", impact: "Verlorenes Budget" },
    { text: "Sie können keinen klaren ROI für KI-Investitionen sehen", impact: "Keine Genehmigung" },
    { text: "Sie haben keine Zeit, alles selbst herauszufinden", impact: "Stillstand" },
    { text: "Sie sind sich nicht sicher, welche Prozesse automatisiert werden sollten", impact: "Falsche Prioritäten" },
  ] : [
    { text: "You know AI could help, but don't know where to start", impact: "Months wasted" },
    { text: "Your team is skeptical about AI or afraid of it", impact: "No buy-in" },
    { text: "You've tried AI tools that didn't work out", impact: "Budget lost" },
    { text: "You can't see clear ROI for AI investments", impact: "No approval" },
    { text: "You don't have time to figure it all out yourself", impact: "Paralysis" },
    { text: "You're unsure which processes should be automated first", impact: "Wrong priorities" },
  ];

  // FAQ content
  const faqItems = isGerman ? [
    {
      question: "Wie lange dauert ein AI Consulting Engagement?",
      answer: "Die meisten Beratungsprojekte dauern 2-6 Wochen, abhängig vom Umfang. Ein AI Audit kann in 1-2 Wochen abgeschlossen werden. Wir können den Zeitplan an Ihre Bedürfnisse anpassen."
    },
    {
      question: "Was ist der Unterschied zwischen Audit und Consulting?",
      answer: "Ein AI Audit ist eine einmalige Bewertung Ihrer aktuellen Prozesse mit einem Aktionsplan. Consulting ist laufend und umfasst Strategie, Implementierungsplanung und laufende Unterstützung während Sie KI einführen."
    },
    {
      question: "Bauen Sie auch die Automatisierungen?",
      answer: "Ja! Consulting führt oft zu Custom Development Projekten. Wir zeigen Ihnen, was möglich ist, erstellen den Plan, und können dann die Lösung für Sie bauen."
    },
    {
      question: "Benötigen wir technisches Wissen?",
      answer: "Nein. Wir erklären alles in geschäftlicher Sprache und konzentrieren uns auf ROI und Ergebnisse, nicht auf technischen Jargon. Unser Ziel ist es, KI für Ihr Team zugänglich zu machen."
    },
  ] : [
    {
      question: "How long does an AI consulting engagement take?",
      answer: "Most consulting projects run 2-6 weeks depending on scope. An AI audit can be completed in 1-2 weeks. We can adjust timelines to fit your needs."
    },
    {
      question: "What's the difference between audit and consulting?",
      answer: "An AI audit is a one-time assessment of your current processes with an action plan. Consulting is ongoing and includes strategy, implementation planning, and continued support as you roll out AI."
    },
    {
      question: "Do you also build the automations?",
      answer: "Yes! Consulting often leads to custom development projects. We'll show you what's possible, create the plan, then we can build the solution for you."
    },
    {
      question: "Do we need technical knowledge?",
      answer: "Not at all. We explain everything in business language and focus on ROI and outcomes, not technical jargon. Our goal is to make AI accessible for your team."
    },
  ];

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
        <ProblemSection 
          title={isGerman ? "Kommt Ihnen das bekannt vor?" : "Sound Familiar?"}
          subtitle={isGerman 
            ? "Diese Herausforderungen halten Unternehmen davon ab, von KI zu profitieren" 
            : "These challenges keep businesses from benefiting from AI"}
          problems={problems}
        />
        <ConsultingApproach />
        <ConsultingServices />
        <FAQSection 
          title={isGerman ? "Häufig gestellte Fragen" : "Frequently Asked Questions"}
          items={faqItems}
        />
        <ConsultingCta />
      </main>
    </>
  );
}
