import type { Metadata } from "next";
import StudioAppClient from "@/components/studio-app-client";
import type { Locale } from "@/lib/i18n/config";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Studio App",
  description: "Manage AI movie and series projects inside the SeventeenLabs studio workspace.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AppPage({ params }: PageProps) {
  const { locale } = await params;
  return <StudioAppClient locale={locale as Locale} />;
}
