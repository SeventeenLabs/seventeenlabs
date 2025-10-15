import { AutomationHero } from '@/components/services/automation/automation-hero';
import { AutomationApproach } from '@/components/services/automation/automation-approach';
import { AutomationServices } from '@/components/services/automation/automation-services';
import { AutomationCTA } from '@/components/services/automation/automation-cta';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AutomationConsultingPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <AutomationHero locale={locale} />
      <AutomationApproach locale={locale} />
      <AutomationServices locale={locale} />
      <AutomationCTA locale={locale} />
    </main>
  );
}
