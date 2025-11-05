import type { Metadata } from "next";
import BlueprintSuccessClient from "./BlueprintSuccessClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isGerman = locale === "de";
  const canonicalPath = isGerman ? "/de/blueprint-success" : "/blueprint-success";

  const title = isGerman
    ? "Kauf bestätigt – Agency Automation Blueprint"
    : "Purchase Confirmed – Agency Automation Blueprint";

  const description = isGerman
    ? "Vielen Dank für Ihren Kauf. Prüfen Sie Ihr Postfach und vereinbaren Sie Ihren Kickoff-Termin, um mit Ihrer Automatisierungs-Blueprint zu starten."
    : "Thanks for your purchase. Check your inbox and schedule your kickoff call to activate your automation blueprint.";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
    alternates: {
      canonical: `${baseUrl}${canonicalPath}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}${canonicalPath}`,
      siteName: "SeventeenLabs",
      type: "website",
    },
  };
}

export default function BlueprintSuccessPage() {
  return <BlueprintSuccessClient />;
}
