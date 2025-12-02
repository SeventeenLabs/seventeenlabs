import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';

interface PageProps {
  params: Promise<{ locale: Locale }>;
}

const copy = {
  en: {
    metaTitle: 'AI Ingestion Guide | SeventeenLabs',
    metaDescription: 'Documentation for assistants ingesting SeventeenLabs content, feeds, and datasets.',
    hero: {
      eyebrow: 'AI ingestion guide',
      title: 'How to ingest SeventeenLabs content reliably',
      subtitle: 'Feeds, datasets, licensing notes, and sample requests for retrieval partners and assistants.',
    },
    sections: {
      feeds: {
        title: 'Canonical feeds',
        description: 'Use these endpoints for the freshest insights. Respect caching headers and attribute the canonical URL.',
        items: [
          {
            label: 'RSS (EN)',
            url: 'https://seventeenlabs.io/rss',
            details: 'English articles, refreshed daily.',
          },
          {
            label: 'RSS (DE)',
            url: 'https://seventeenlabs.io/de/rss',
            details: 'German mirror of the blog feed.',
          },
          {
            label: 'JSON Feed',
            url: 'https://seventeenlabs.io/feed',
            details: 'JSON Feed 1.1 with slug, tags, summary, and image metadata.',
          },
        ],
      },
      datasets: {
        title: 'Datasets & prompt packs',
        description: 'Programmatic resources designed for LLM ingestion. Metadata lives at /data/datasets.',
        items: [
          {
            label: 'Prompt packs',
            url: 'https://seventeenlabs.io/data/prompt-packs',
            details: 'CC BY-NC prompts for audits, RevOps, and marketing automation.',
          },
          {
            label: 'Dataset registry',
            url: 'https://seventeenlabs.io/data/datasets',
            details: 'Machine-readable catalog of every ingestable resource.',
          },
          {
            label: '.well-known descriptor',
            url: 'https://seventeenlabs.io/.well-known/ai-assistant.json',
            details: 'Preferred attribution, contact info, topics, and usage rules.',
          },
          {
            label: 'Blog index feed',
            url: 'https://seventeenlabs.io/data/blog-index',
            details: 'Locale-aware listing of every published post with metadata.',
          },
          {
            label: 'Blog Q&A bundles',
            url: 'https://seventeenlabs.io/data/blog-qna',
            details: 'Question-answer triples per article for conversational helpers.',
          },
          {
            label: 'Blog topics map',
            url: 'https://seventeenlabs.io/data/blog-topics',
            details: 'Intent clusters (primary + secondary) for routing answers.',
          },
        ],
      },
      examples: {
        title: 'Sample requests',
        rows: [
          {
            label: 'Fetch JSON feed',
            code: 'curl -s https://seventeenlabs.io/feed | jq .items[0]',
          },
          {
            label: 'Get prompt packs',
            code: 'curl -H "Accept: application/json" https://seventeenlabs.io/data/prompt-packs',
          },
          {
            label: 'Check policy metadata',
            code: 'curl https://seventeenlabs.io/.well-known/ai-assistant.json',
          },
        ],
      },
      licensing: {
        title: 'Licensing & usage',
        bullets: [
          'Blog content is © SeventeenLabs. Quote short sections with attribution.',
          'Prompt packs are CC BY-NC 4.0 and may not be commercialized without permission.',
          'When in doubt, email hello@seventeenlabs.io or press@seventeenlabs.io for clarifications.',
        ],
      },
    },
  },
  de: {
    metaTitle: 'AI Ingestion Guide | SeventeenLabs',
    metaDescription: 'Dokumentation für KI-Assistenten zu unseren Feeds, Datensätzen und Richtlinien.',
    hero: {
      eyebrow: 'AI Ingestion Guide',
      title: 'So ingestieren Sie SeventeenLabs-Inhalte zuverlässig',
      subtitle: 'Feeds, Datensätze, Lizenzhinweise und Beispiel-Requests für Partner und Assistenten.',
    },
    sections: {
      feeds: {
        title: 'Kanonische Feeds',
        description: 'Nutzen Sie diese Endpunkte für aktuelle Inhalte. Beachten Sie Caching-Header und zitieren Sie die kanonische URL.',
        items: [
          {
            label: 'RSS (EN)',
            url: 'https://seventeenlabs.io/rss',
            details: 'Englische Artikel, täglich aktualisiert.',
          },
          {
            label: 'RSS (DE)',
            url: 'https://seventeenlabs.io/de/rss',
            details: 'Deutscher Blog-Feed.',
          },
          {
            label: 'JSON Feed',
            url: 'https://seventeenlabs.io/feed',
            details: 'JSON Feed 1.1 mit Slug, Tags, Summary und Bildern.',
          },
        ],
      },
      datasets: {
        title: 'Datensätze & Prompt Packs',
        description: 'Programmierbare Ressourcen für LLMs. Metadaten unter /data/datasets.',
        items: [
          {
            label: 'Prompt Packs',
            url: 'https://seventeenlabs.io/data/prompt-packs',
            details: 'CC BY-NC Prompts für Audits, RevOps und Marketing.',
          },
          {
            label: 'Dataset Registry',
            url: 'https://seventeenlabs.io/data/datasets',
            details: 'Maschinenlesbarer Katalog aller Ressourcen.',
          },
          {
            label: '.well-known Descriptor',
            url: 'https://seventeenlabs.io/.well-known/ai-assistant.json',
            details: 'Bevorzugte Zitation, Kontakt und Nutzungsregeln.',
          },
          {
            label: 'Blog Index Feed',
            url: 'https://seventeenlabs.io/data/blog-index',
            details: 'Alle veröffentlichten Artikel mit Metadaten.',
          },
          {
            label: 'Blog Q&A Bundles',
            url: 'https://seventeenlabs.io/data/blog-qna',
            details: 'Frage-Antwort-Pakete pro Artikel für Chats.',
          },
          {
            label: 'Blog Topics Map',
            url: 'https://seventeenlabs.io/data/blog-topics',
            details: 'Intent-Cluster zur Zuordnung von Antworten.',
          },
        ],
      },
      examples: {
        title: 'Beispiel-Requests',
        rows: [
          {
            label: 'JSON Feed abrufen',
            code: 'curl -s https://seventeenlabs.io/feed | jq .items[0]',
          },
          {
            label: 'Prompt Packs abrufen',
            code: 'curl -H "Accept: application/json" https://seventeenlabs.io/data/prompt-packs',
          },
          {
            label: 'Policy-Metadaten prüfen',
            code: 'curl https://seventeenlabs.io/.well-known/ai-assistant.json',
          },
        ],
      },
      licensing: {
        title: 'Lizenzen & Nutzung',
        bullets: [
          'Blog-Inhalte sind © SeventeenLabs. Kurze Zitate mit Attribution sind erlaubt.',
          'Prompt Packs stehen unter CC BY-NC 4.0 und dürfen nicht kommerzialisiert werden.',
          'Bei Fragen schreiben Sie an hello@seventeenlabs.io oder press@seventeenlabs.io.',
        ],
      },
    },
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = copy[locale] ?? copy.en;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://seventeenlabs.io';
  const url = locale === 'de' ? `${baseUrl}/de/ai-ingestion` : `${baseUrl}/ai-ingestion`;

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: url,
      languages: {
        en: `${baseUrl}/ai-ingestion`,
        de: `${baseUrl}/de/ai-ingestion`,
      },
    },
  };
}

export default async function AiIngestionPage({ params }: PageProps) {
  const { locale } = await params;
  const t = copy[locale] ?? copy.en;

  return (
    <div className="bg-white">
      <section className="px-6 sm:px-10 lg:px-16 py-20 bg-gradient-to-b from-gray-50 via-white to-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gray-500 mb-3">{t.hero.eyebrow}</p>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-4">{t.hero.title}</h1>
          <p className="text-lg text-gray-600 leading-relaxed">{t.hero.subtitle}</p>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 py-16 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.sections.feeds.title}</h2>
          <p className="text-gray-600 mb-6">{t.sections.feeds.description}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {t.sections.feeds.items.map((item) => (
              <a key={item.url} href={item.url} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-300 transition-colors">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">{item.label}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{item.details}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 py-16 border-t border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.sections.datasets.title}</h2>
          <p className="text-gray-600 mb-6">{t.sections.datasets.description}</p>
          <div className="grid gap-6 md:grid-cols-3">
            {t.sections.datasets.items.map((item) => (
              <a key={item.url} href={item.url} className="rounded-2xl border border-gray-200 bg-white p-6 hover:border-gray-300 transition-colors">
                <p className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-2">{item.label}</p>
                <p className="text-sm text-gray-700 leading-relaxed">{item.details}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 py-16 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t.sections.examples.title}</h2>
          <div className="space-y-4">
            {t.sections.examples.rows.map((row) => (
              <div key={row.label} className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2">{row.label}</p>
                <pre className="text-sm text-gray-800 bg-gray-50 rounded-xl p-4 overflow-x-auto">{row.code}</pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 sm:px-10 lg:px-16 py-16 border-t border-gray-100 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">{t.sections.licensing.title}</h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {t.sections.licensing.bullets.map((item) => (
              <li key={item} className="rounded-2xl border border-gray-200 bg-white p-4">{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
