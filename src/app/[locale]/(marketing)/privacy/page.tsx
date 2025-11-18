import type { Metadata } from "next";
import { getLocaleFromString } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: string }>;
}

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
const lastUpdated = 'November 18, 2025';

const privacyContent = {
  en: {
    title: 'Privacy Policy',
    intro: 'We take data protection seriously. This policy explains how SeventeenLabs collects, stores, and processes personal data when you visit our website or work with our team.',
    sections: [
      {
        heading: 'Data We Collect',
        items: [
          'Contact details such as name, email address, and company information',
          'Usage data from our websites and applications to understand product performance',
          'Payment and billing data when you purchase services from us',
          'Communication records when you interact with our team via email, chat, or calls',
        ],
      },
      {
        heading: 'How We Use Your Data',
        items: [
          'Deliver the services, audits, or automations you request',
          'Send service updates, invoices, onboarding materials, and critical notifications',
          'Improve our products by understanding how features are used',
          'Comply with legal, tax, and regulatory requirements applicable to our business',
        ],
      },
      {
        heading: 'Data Retention & Security',
        items: [
          'We store customer data only for as long as necessary to provide services or comply with regulations',
          'All systems are protected with access controls, encryption at rest, and encrypted network connections',
          'Access to client data is restricted to team members who need it to fulfill contracted work',
        ],
      },
      {
        heading: 'Your Rights',
        items: [
          'Request a copy of the personal data we hold about you',
          'Ask us to correct inaccurate information or delete data when permitted',
          'Withdraw consent for marketing communications at any time',
          'Contact us at privacy@seventeenlabs.io for any privacy-related questions',
        ],
      },
    ],
  },
  de: {
    title: 'Datenschutzerklärung',
    intro: 'Der Schutz Ihrer Daten hat für uns höchste Priorität. Diese Erklärung beschreibt, wie SeventeenLabs personenbezogene Daten sammelt, speichert und verarbeitet, wenn Sie unsere Website besuchen oder mit unserem Team zusammenarbeiten.',
    sections: [
      {
        heading: 'Welche Daten wir erfassen',
        items: [
          'Kontaktdaten wie Name, E-Mail-Adresse und Unternehmensinformationen',
          'Nutzungsdaten unserer Websites und Anwendungen, um die Produktleistung zu verstehen',
          'Zahlungs- und Abrechnungsdaten, wenn Sie Services bei uns buchen',
          'Kommunikationsdaten aus E-Mails, Chats oder Telefonaten mit unserem Team',
        ],
      },
      {
        heading: 'Wie wir Ihre Daten verwenden',
        items: [
          'Bereitstellung der von Ihnen beauftragten Services, Audits oder Automatisierungen',
          'Versand von Service-Updates, Rechnungen, Onboarding-Unterlagen und wichtigen Benachrichtigungen',
          'Verbesserung unserer Produkte anhand von Nutzungsanalysen',
          'Einhaltung gesetzlicher, steuerlicher und regulatorischer Vorgaben',
        ],
      },
      {
        heading: 'Speicherung und Sicherheit',
        items: [
          'Wir speichern Kundendaten nur so lange, wie es für die Leistungserbringung oder gesetzliche Vorgaben erforderlich ist',
          'Alle Systeme sind durch Zugriffskontrollen, Verschlüsselung im Ruhezustand und verschlüsselte Verbindungen geschützt',
          'Zugriff auf Kundendaten erhalten nur Teammitglieder, die diese für die Vertragserfüllung benötigen',
        ],
      },
      {
        heading: 'Ihre Rechte',
        items: [
          'Anforderung einer Kopie Ihrer bei uns gespeicherten personenbezogenen Daten',
          'Berichtigung unrichtiger Informationen oder Löschung von Daten, sofern zulässig',
          'Widerruf einer erteilten Einwilligung für Marketing-Kommunikation jederzeit möglich',
          'Kontaktieren Sie uns bei Fragen unter privacy@seventeenlabs.io',
        ],
      },
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const isGerman = validLocale === 'de';
  const pathname = isGerman ? '/de/privacy' : '/privacy';
  const pageTitle = isGerman ? 'Datenschutz | SeventeenLabs' : 'Privacy Policy | SeventeenLabs';
  const description = isGerman
    ? 'Erfahren Sie, wie SeventeenLabs personenbezogene Daten verarbeitet, speichert und schützt.'
    : 'Learn how SeventeenLabs collects, stores, and protects your personal data.';

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `${baseUrl}${pathname}`,
      languages: {
        en: `${baseUrl}/privacy`,
        de: `${baseUrl}/de/privacy`,
        'x-default': `${baseUrl}/privacy`,
      },
    },
    openGraph: {
      title: pageTitle,
      description,
      url: `${baseUrl}${pathname}`,
      type: 'article',
      siteName: 'SeventeenLabs',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
    },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const validLocale = getLocaleFromString(locale);
  const copy = privacyContent[validLocale];

  return (
    <main className="bg-black text-white">
      <section className="w-full px-4 sm:px-6 lg:px-12 xl:px-16 2xl:px-20 py-20 sm:py-28">
        <div className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-4">
            {validLocale === 'de' ? 'Rechtliches' : 'Legal'}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight mb-6">
            {copy.title}
          </h1>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
            {copy.intro}
          </p>
          <p className="text-sm text-white/50 mb-12">
            {validLocale === 'de' ? `Zuletzt aktualisiert: ${lastUpdated}` : `Last updated: ${lastUpdated}`}
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
          <div className="mt-12 p-6 rounded-xl border border-white/10 bg-white/[0.03]">
            <p className="text-sm text-white/70">
              {validLocale === 'de'
                ? 'Bei Fragen zur Datenverarbeitung kontaktieren Sie uns unter privacy@seventeenlabs.io.'
                : 'If you have questions about how we process data, contact us at privacy@seventeenlabs.io.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
