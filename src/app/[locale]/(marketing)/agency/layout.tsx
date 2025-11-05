import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  return {
    title: isGerman 
      ? 'Agentur für KI-Automatisierung & Softwareentwicklung'
      : 'AI Automation & Development Agency',
    description: isGerman
      ? 'Maßgeschneiderte Softwareentwicklung, KI-Integration und Workflow-Automatisierung. Transformieren Sie Ihr Unternehmen mit intelligenten Automatisierungslösungen von SeventeenLabs.'
      : 'Custom software development, AI integration, and workflow automation services. Transform your business with intelligent automation solutions from SeventeenLabs.',
    keywords: isGerman
      ? ['Softwareentwicklung', 'KI-Automatisierung', 'Workflow-Automatisierung', 'Prozessoptimierung', 'AI Integration', 'Beratung']
      : ['custom development', 'AI automation', 'workflow automation', 'consulting', 'AI integration', 'process optimization'],
    openGraph: {
      title: isGerman 
        ? 'SeventeenLabs Agentur - KI-Automatisierung & Softwareentwicklung'
        : 'SeventeenLabs Agency - AI Automation & Custom Development',
      description: isGerman
        ? 'Maßgeschneiderte Softwareentwicklung und KI-Automatisierung für Ihr Unternehmen'
        : 'Custom software development and AI automation for your business',
      url: isGerman ? `${baseUrl}/de/agency` : `${baseUrl}/agency`,
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? `${baseUrl}/de/agency` : `${baseUrl}/agency`,
      languages: {
        'en': `${baseUrl}/agency`,
        'de': `${baseUrl}/de/agency`,
      },
    },
  };
}

export default function AgencyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
