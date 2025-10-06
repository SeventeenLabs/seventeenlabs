"use client";

import { use, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "@/lib/i18n/context";
import { Code2, Workflow, Brain, Lightbulb, ArrowRight, CheckCircle2, TrendingUp, Users, Clock, Target } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
import ContactModal from "@/components/contact-modal";
import { getTranslations } from "@/lib/i18n/translations";
import { Locale } from "@/lib/i18n/config";

interface AgencyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default function AgencyPage({ params }: AgencyPageProps) {
  const { locale } = use(params);
  const { t } = useTranslations();
  const [contactModalOpen, setContactModalOpen] = useState(false);
  
  // Get raw translations for accessing arrays
  const translations = getTranslations(locale as Locale);

  const services = [
    { key: "customDev", icon: Code2, color: "from-blue-500 to-cyan-500" },
    { key: "automation", icon: Workflow, color: "from-purple-500 to-pink-500" },
    { key: "aiIntegration", icon: Brain, color: "from-green-500 to-emerald-500" },
    { key: "consulting", icon: Lightbulb, color: "from-orange-500 to-red-500" }
  ];

  const processSteps = [
    { key: "discovery", icon: Target, number: "01" },
    { key: "planning", icon: Lightbulb, number: "02" },
    { key: "implementation", icon: Code2, number: "03" },
    { key: "support", icon: TrendingUp, number: "04" }
  ];

  const stats = [
    { key: "timeSaved", icon: Clock },
    { key: "projects", icon: CheckCircle2 },
    { key: "satisfaction", icon: Users },
    { key: "roi", icon: TrendingUp }
  ];

  return (
    <div className="bg-slate-950">
      <LandingHeader />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              {t("agency.hero.title")}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t("agency.hero.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setContactModalOpen(true)} className="group px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all duration-200 flex items-center justify-center gap-2">
                {t("agency.hero.cta.primary")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href={`/${locale}/apps`} className="px-8 py-4 bg-slate-800 text-white font-semibold rounded-lg hover:bg-slate-700 transition-all duration-200 flex items-center justify-center gap-2 border border-slate-700">
                {t("agency.hero.cta.secondary")}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t("agency.services.title")}</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("agency.services.subtitle")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div key={service.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="group relative overflow-hidden rounded-2xl bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 hover:border-slate-700 transition-all duration-300">
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${service.color} p-3 mb-6`}>
                      <Icon className="w-full h-full text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{t(`agency.services.items.${service.key}.title`)}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{t(`agency.services.items.${service.key}.description`)}</p>
                    <ul className="space-y-3">
                      {(translations.agency.services.items[service.key as keyof typeof translations.agency.services.items].features as string[]).map((feature: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300">
                          <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{t("agency.process.title")}</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">{t("agency.process.subtitle")}</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative">
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-slate-700 to-transparent -translate-x-8" />
                  )}
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2.5">
                        <Icon className="w-full h-full text-white" />
                      </div>
                      <span className="text-5xl font-bold text-slate-800">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{t(`agency.process.steps.${step.key}.title`)}</h3>
                    <p className="text-slate-400 leading-relaxed">{t(`agency.process.steps.${step.key}.description`)}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-white">{t("agency.results.title")}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.key} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }} className="relative group">
                  <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 text-center hover:border-slate-700 transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-5xl font-bold text-white mb-2">{t(`agency.results.stats.${stat.key}.value`)}</div>
                    <div className="text-slate-400">{t(`agency.results.stats.${stat.key}.label`)}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{t("agency.team.title")}</h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">{t("agency.team.description")}</p>
            <div className="flex flex-wrap justify-center gap-4">
              {(translations.agency.team.expertise as string[]).map((expertise: string, index: number) => (
                <motion.span key={index} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: index * 0.05 }} className="px-6 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-full text-slate-300 font-medium hover:border-slate-700 transition-colors">
                  {expertise}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-950/50 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">{t("agency.cta.title")}</h2>
            <p className="text-xl text-slate-300 mb-12 leading-relaxed">{t("agency.cta.description")}</p>
            <button onClick={() => setContactModalOpen(true)} className="group px-8 py-4 bg-white text-slate-900 font-semibold rounded-lg hover:bg-slate-100 transition-all duration-200 inline-flex items-center gap-2 text-lg">
              {t("agency.cta.button")}
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />
      <ContactModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </div>
  );
}