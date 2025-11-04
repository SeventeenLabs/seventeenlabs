import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import { I18nProvider } from "@/lib/i18n/context";

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function ServicesLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;

  return (
    <I18nProvider locale={locale as any}>
      <div className="min-h-screen bg-black">
        <LandingHeader />
        {children}
        <SiteFooter />
      </div>
    </I18nProvider>
  );
}
