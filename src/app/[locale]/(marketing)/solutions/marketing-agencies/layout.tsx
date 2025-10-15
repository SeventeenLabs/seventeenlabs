import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === 'de';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';

  return {
    title: isGerman 
      ? 'Workflow-Automatisierung für Marketing-Agenturen | SeventeenLabs'
      : 'Workflow Automation for Marketing Agencies | SeventeenLabs',
    description: isGerman
      ? 'Automatisieren Sie Ihre Marketing-Agentur mit KI-gestützten Workflows. Lead-Management, Content-Erstellung, Social Media Automation und mehr. Sparen Sie Zeit und skalieren Sie Ihr Geschäft.'
      : 'Automate your marketing agency with AI-powered workflows. Lead management, content creation, social media automation, and more. Save time and scale your business.',
    keywords: isGerman
      ? ['Marketing-Automatisierung', 'Agentur-Workflows', 'Lead-Management', 'Social Media Automation', 'Content-Automatisierung', 'Marketing-Tools']
      : ['marketing automation', 'agency workflows', 'lead management', 'social media automation', 'content automation', 'marketing tools'],
    openGraph: {
      title: isGerman 
        ? 'Workflow-Automatisierung für Marketing-Agenturen | SeventeenLabs'
        : 'Workflow Automation for Marketing Agencies | SeventeenLabs',
      description: isGerman
        ? 'KI-gestützte Workflow-Automatisierung speziell für Marketing-Agenturen'
        : 'AI-powered workflow automation specifically for marketing agencies',
      url: isGerman ? `${baseUrl}/de/solutions/marketing-agencies` : `${baseUrl}/solutions/marketing-agencies`,
      type: 'website',
    },
    alternates: {
      canonical: isGerman ? `${baseUrl}/de/solutions/marketing-agencies` : `${baseUrl}/solutions/marketing-agencies`,
      languages: {
        'en': `${baseUrl}/solutions/marketing-agencies`,
        'de': `${baseUrl}/de/solutions/marketing-agencies`,
      },
    },
  };
}

export default function MarketingAgenciesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
