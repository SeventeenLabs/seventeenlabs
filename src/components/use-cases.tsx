"use client";

import { motion } from "framer-motion";
import { FileText, Mail, Users, Database, BarChart3, Zap } from "lucide-react";
import { useTranslations } from "@/lib/i18n/context";

interface UseCase {
  icon: React.ElementType;
  title: string;
  before: string;
  after: string;
  time: string;
}

export default function UseCases() {
  const { t } = useTranslations();

  const useCases: UseCase[] = [
    {
      icon: FileText,
      title: t("useCases.items.reporting.title", "Client Reporting"),
      before: t("useCases.items.reporting.before", "4 hours copying data into spreadsheets"),
      after: t("useCases.items.reporting.after", "Auto-generated reports sent every Monday"),
      time: t("useCases.items.reporting.time", "4h → 0h"),
    },
    {
      icon: Mail,
      title: t("useCases.items.leads.title", "Lead Follow-up"),
      before: t("useCases.items.leads.before", "Manually checking and emailing new leads"),
      after: t("useCases.items.leads.after", "Instant personalized response in 30 seconds"),
      time: t("useCases.items.leads.time", "2h → 0h"),
    },
    {
      icon: Database,
      title: t("useCases.items.dataEntry.title", "Data Entry"),
      before: t("useCases.items.dataEntry.before", "Copy-pasting between CRM, sheets, tools"),
      after: t("useCases.items.dataEntry.after", "Everything syncs automatically"),
      time: t("useCases.items.dataEntry.time", "5h → 0h"),
    },
    {
      icon: Users,
      title: t("useCases.items.onboarding.title", "Client Onboarding"),
      before: t("useCases.items.onboarding.before", "Sending 5 emails and creating accounts manually"),
      after: t("useCases.items.onboarding.after", "One click sets up everything"),
      time: t("useCases.items.onboarding.time", "1h → 2min"),
    },
    {
      icon: BarChart3,
      title: t("useCases.items.analytics.title", "Analytics Collection"),
      before: t("useCases.items.analytics.before", "Logging into 6 platforms to gather stats"),
      after: t("useCases.items.analytics.after", "One dashboard with all data"),
      time: t("useCases.items.analytics.time", "3h → 0h"),
    },
    {
      icon: Zap,
      title: t("useCases.items.invoicing.title", "Invoicing"),
      before: t("useCases.items.invoicing.before", "Creating invoices from project tracking"),
      after: t("useCases.items.invoicing.after", "Invoice auto-created when project closes"),
      time: t("useCases.items.invoicing.time", "2h → 0h"),
    },
  ];

  return (
    <section className="relative bg-black py-24 lg:py-32 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-white mb-4">
            {t("useCases.title", "What I Automate")}
          </h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto">
            {t("useCases.subtitle", "Real tasks that eat your week — gone by next Friday")}
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative border border-white/10 bg-white/[0.02] rounded-2xl p-6 hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                    <Icon className="w-5 h-5 text-white/70" />
                  </div>
                  <h3 className="text-lg font-medium text-white">{useCase.title}</h3>
                </div>

                {/* Before/After */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-red-400/80 text-xs font-medium uppercase mt-0.5">Before:</span>
                    <p className="text-white/50 text-sm font-light">{useCase.before}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400/80 text-xs font-medium uppercase mt-0.5">After:</span>
                    <p className="text-white/70 text-sm font-light">{useCase.after}</p>
                  </div>
                </div>

                {/* Time saved badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                  {useCase.time}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
