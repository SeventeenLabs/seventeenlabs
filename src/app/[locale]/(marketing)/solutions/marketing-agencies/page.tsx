import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import MarketingAgenciesHero from "@/components/solutions/marketing-agencies/marketing-agencies-hero";
import MarketingAgenciesRoadmapPreview from "@/components/solutions/marketing-agencies/marketing-agencies-roadmap-preview";
import MarketingAgenciesProblems from "@/components/solutions/marketing-agencies/marketing-agencies-problems";
import MarketingAgenciesSolutions from "@/components/solutions/marketing-agencies/marketing-agencies-solutions";
import MarketingAgenciesFeatures from "@/components/solutions/marketing-agencies/marketing-agencies-features";
import MarketingAgenciesPrebuiltWorkflows from "@/components/solutions/marketing-agencies/marketing-agencies-prebuilt-workflows";
import MarketingAgenciesCTA from "@/components/solutions/marketing-agencies/marketing-agencies-cta";

interface MarketingAgenciesPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function MarketingAgenciesPage({ params }: MarketingAgenciesPageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-black">
      <LandingHeader />
      <main>
        <MarketingAgenciesHero locale={locale} />
        <MarketingAgenciesProblems locale={locale} />
        <MarketingAgenciesSolutions locale={locale} />
        <MarketingAgenciesRoadmapPreview locale={locale} />
        <MarketingAgenciesPrebuiltWorkflows locale={locale} />
        <MarketingAgenciesFeatures locale={locale} />
        <MarketingAgenciesCTA locale={locale} />
      </main>
      <SiteFooter />
    </div>
  );
}
