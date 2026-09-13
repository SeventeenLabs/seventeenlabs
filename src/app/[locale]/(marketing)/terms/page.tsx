import type { Metadata } from "next";
import { getLocaleFromString } from "@/lib/i18n/config";

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
const lastUpdated = "November 18, 2025";

const termsContent = {
  en: {
    title: "Terms of Service",
    intro:
      "These Terms govern your access to SeventeenLabs websites, applications, and professional services. By working with us, you agree to the responsibilities and commitments described below.",
    sections: [
      {
        heading: "Scope of Services",
        items: [
          "We provide automation consulting, workflow implementation, and related strategic services as outlined in signed proposals",
          "Deliverables, timelines, and fees are defined in each Statement of Work or order form",
          "Any changes to scope require written confirmation and may affect project schedules or pricing",
        ],
      },
      {
        heading: "Client Responsibilities",
        items: [
          "Provide timely access to stakeholders, data sources, and required tooling",
          "Ensure that information shared with SeventeenLabs is accurate and complete",
          "Maintain all necessary rights and permissions for the systems we integrate or automate",
        ],
      },
      {
        heading: "Payment & Invoicing",
        items: [
          "Invoices are due within 14 days unless a different schedule is specified in the agreement",
          "Late payments may pause project work until the account is current",
          "All fees are non-refundable unless otherwise stated in the signed contract",
        ],
      },
      {
        heading: "Confidentiality & IP",
        items: [
          "Both parties agree to protect confidential information shared during the engagement",
          "Custom automations, documentation, and assets created for you become your property after final payment",
          "SeventeenLabs may reference anonymized project outcomes for marketing with prior written approval",
        ],
      },
      {
        heading: "Contact",
        items: [
          "Questions about these Terms can be sent to legal@seventeenlabs.io",
        ],
      },
    ],
  },
  de: {
    title: "Allgemeine Geschäftsbedingungen",
    intro:
      "Diese Bedingungen regeln den Zugriff auf die Websites, Anwendungen und Beratungsleistungen von SeventeenLabs. Durch die Zusammenarbeit mit uns akzeptieren Sie die folgenden Pflichten und Vereinbarungen.",
    sections: [
      {
        heading: "Leistungsumfang",
        items: [
          "Wir erbringen Automationsberatung, Workflow-Implementierung und verwandte Services gemäß unterschriebenen Angeboten",
          "Liefergegenstände, Zeitpläne und Gebühren werden in jedem Statement of Work oder Bestellformular festgelegt",
          "Änderungen am Leistungsumfang erfordern eine schriftliche Bestätigung und können Zeitpläne oder Preise beeinflussen",
        ],
      },
      {
        heading: "Pflichten des Kunden",
        items: [
          "Zeitnaher Zugang zu Ansprechpartnern, Datenquellen und benötigten Tools",
          "Sicherstellung, dass bereitgestellte Informationen korrekt und vollständig sind",
          "Vorliegen aller Rechte und Freigaben für Systeme, die wir integrieren oder automatisieren",
        ],
      },
      {
        heading: "Zahlung & Rechnungsstellung",
        items: [
          "Rechnungen sind innerhalb von 14 Tagen fällig, sofern nichts anderes vereinbart wurde",
          "Bei Zahlungsverzug kann die Projektarbeit bis zum Zahlungseingang pausieren",
          "Alle Gebühren sind nicht erstattungsfähig, sofern im Vertrag nichts anderes geregelt ist",
        ],
      },
      {
        heading: "Vertraulichkeit & IP",
        items: [
          "Beide Parteien verpflichten sich, vertrauliche Informationen zu schützen",
          "Individuell entwickelte Automationen, Dokumentationen und Assets gehen nach vollständiger Zahlung in Ihr Eigentum über",
          "SeventeenLabs darf anonymisierte Projektergebnisse nur mit vorheriger schriftlicher Zustimmung referenzieren",
        ],
      },
      {
        heading: "Kontakt",
        items: [
          "Fragen zu diesen Bedingungen richten Sie an legal@seventeenlabs.io",
        ],
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === "de";
  const pathname = isGerman ? "/de/terms" : "/terms";
  const pageTitle = isGerman
    ? "AGB | SeventeenLabs"
    : "Terms of Service | SeventeenLabs";
  const description = isGerman
    ? "Rechtliche Rahmenbedingungen für Beratungen und Automationsprojekte mit SeventeenLabs."
    : "Legal terms governing consulting and automation projects with SeventeenLabs.";

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `${baseUrl}${pathname}`,
      languages: {
        en: `${baseUrl}/terms`,
        de: `${baseUrl}/de/terms`,
        "x-default": `${baseUrl}/terms`,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: `${baseUrl}${pathname}`,
      type: "article",
      siteName: "SeventeenLabs",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const copy = termsContent[validLocale];

  return (
    <main id="main" className="sl-site sl-legal">
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-28">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
            {validLocale === "de" ? "Rechtliches" : "Legal"}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6">
            {copy.title}
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
            {copy.intro}
          </p>
          <p className="text-sm text-white/50 mb-12">
            {validLocale === "de"
              ? `Zuletzt aktualisiert: ${lastUpdated}`
              : `Last updated: ${lastUpdated}`}
          </p>
          <div className="space-y-10">
            {copy.sections.map((section) => (
              <div key={section.heading} className="space-y-4">
                <h2 className="text-xl sm:text-2xl font-light text-white">
                  {section.heading}
                </h2>
                <ul className="list-disc list-inside space-y-3 text-white/70 text-base">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
