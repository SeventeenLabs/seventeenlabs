import DevelopmentHero from "@/components/services/development/development-hero";
import DevelopmentCapabilities from "@/components/services/development/development-capabilities";
import DevelopmentTechStack from "@/components/services/development/development-tech-stack";
import DevelopmentProcess from "@/components/services/development/development-process";
import DevelopmentCta from "@/components/services/development/development-cta";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AiDevelopmentPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <main className="min-h-screen">
      <DevelopmentHero />
      <DevelopmentCapabilities />
      <DevelopmentTechStack />
      <DevelopmentProcess />
      <DevelopmentCta />
    </main>
  );
}
