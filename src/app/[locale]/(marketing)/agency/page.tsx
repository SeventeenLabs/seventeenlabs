"use client";

import { use } from "react";
import { useTranslations } from "@/lib/i18n/context";

interface AgencyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function AgencyPage({ params }: AgencyPageProps) {
  const { locale } = use(params);
  const { t } = useTranslations();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t("common.agency")}</h1>
        <p className="text-xl text-white/80">
          {t("whatWeOffer.agency.description")}
        </p>
      </div>
    </div>
  );
}