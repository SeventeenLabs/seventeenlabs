import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import MarketingAgenciesHero from "@/components/solutions/marketing-agencies/marketing-agencies-hero";
import MarketingAgenciesFeatures from "@/components/solutions/marketing-agencies/marketing-agencies-features";
import MarketingAgenciesWorkflows from "@/components/solutions/marketing-agencies/marketing-agencies-workflows";
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
        <MarketingAgenciesFeatures locale={locale} />
        <MarketingAgenciesWorkflows locale={locale} />
        <MarketingAgenciesCTA locale={locale} />
      </main>
      <SiteFooter />
    </div>
  );
}
