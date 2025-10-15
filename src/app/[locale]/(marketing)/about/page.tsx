import { AboutHero } from '@/components/about/about-hero';
import { AboutMission } from '@/components/about/about-mission';
import { AboutTeam } from '@/components/about/about-team';
import { AboutValues } from '@/components/about/about-values';
import { AboutCTA } from '@/components/about/about-cta';
import LandingHeader from '@/components/landing-header';
import SiteFooter from '@/components/site-footer';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  return (
    <>
      <LandingHeader />
      <main className="min-h-screen">
        <AboutHero locale={locale} />
        <AboutMission locale={locale} />
        <AboutValues locale={locale} />
        <AboutTeam locale={locale} />
        <AboutCTA locale={locale} />
      </main>
      <SiteFooter />
    </>
  );
}
