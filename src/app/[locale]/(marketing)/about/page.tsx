import LandingHeader from '@/components/landing-header';
import { AboutHero } from '@/components/about/about-hero';
import { AboutValues } from '@/components/about/about-values';
import { AboutApproach } from '@/components/about/about-approach';
import { AboutMetrics } from '@/components/about/about-metrics';
import { AboutTech } from '@/components/about/about-tech';
import { AboutCTA } from '@/components/about/about-cta';
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
        <AboutValues locale={locale} />
        <AboutApproach locale={locale} />
        <AboutMetrics locale={locale} />
        <AboutTech locale={locale} />
        <AboutCTA locale={locale} />
      </main>
      <SiteFooter />
    </>
  );
}
