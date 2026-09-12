interface FAQItem {
  question: string;
  answer: string;
}
interface StructuredDataProps {
  locale?: string;
  type?: "home" | "agency" | "product";
  faqItems?: FAQItem[];
}
export default function StructuredData({
  locale = "en",
  faqItems,
}: StructuredDataProps) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://seventeenlabs.io";
  const data: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${base}/#organization`,
      name: "SeventeenLabs",
      url: base,
      logo: `${base}/icon.svg`,
      description:
        "SeventeenLabs builds creative software for generative media.",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "SeventeenLabs",
      url: base,
      inLanguage: locale,
      publisher: { "@id": `${base}/#organization` },
    },
  ];
  if (faqItems?.length)
    data.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
