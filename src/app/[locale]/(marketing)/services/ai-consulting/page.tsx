import ConsultingHero from "@/components/services/consulting/consulting-hero";
import ConsultingApproach from "@/components/services/consulting/consulting-approach";
import ConsultingServices from "@/components/services/consulting/consulting-services";
import ConsultingCta from "@/components/services/consulting/consulting-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AiConsultingPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <ConsultingHero />
      <ConsultingApproach />
      <ConsultingServices />
      <ConsultingCta />
    </main>
  );
}
