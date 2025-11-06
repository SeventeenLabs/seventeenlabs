import { Metadata } from 'next';
import AiWorkflowAuditClient from './AiWorkflowAuditClient';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = locale === 'de' 
    ? 'Kostenloser AI Workflow Audit für Marketing Agenturen | SeventeenLabs'
    : 'Free AI Workflow Audit for Marketing Agencies | SeventeenLabs';
  
  const description = locale === 'de'
    ? 'Erhalten Sie eine maßgeschneiderte Automatisierungsstrategie für Ihre Marketing Agentur. Wir analysieren Ihre Prozesse und zeigen konkrete Optimierungsmöglichkeiten mit AI-Workflows. Jetzt für 5 kostenlose Spots bewerben.'
    : 'Get a custom automation strategy for your marketing agency. We analyze your processes and show concrete optimization opportunities with AI workflows. Apply now for 5 free spots.';

  const keywords = locale === 'de'
    ? 'AI Workflow Audit, Marketing Agentur Automatisierung, Prozessoptimierung, kostenlose Beratung, AI Tools für Agenturen, Workflow Analyse'
    : 'AI workflow audit, marketing agency automation, process optimization, free consultation, AI tools for agencies, workflow analysis';

  const canonical = locale === 'de' 
    ? 'https://seventeenlabs.io/de/products/ai-workflow-audit'
    : 'https://seventeenlabs.io/products/ai-workflow-audit';

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'SeventeenLabs',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical,
      languages: {
        'en': 'https://seventeenlabs.io/products/ai-workflow-audit',
        'de': 'https://seventeenlabs.io/de/products/ai-workflow-audit',
      },
    },
  };
}

export default async function AiWorkflowAuditPage({ params }: Props) {
  const { locale } = await params;
  return <AiWorkflowAuditClient locale={locale} />;
}
