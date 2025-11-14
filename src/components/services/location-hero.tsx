"use client";

import { motion } from "framer-motion";
import { MapPin, Building2, TrendingUp, Users, Lightbulb, Code2, SearchCheck, Target, Clock, Zap, CheckCircle } from "lucide-react";

interface LocationHeroProps {
  location: {
    name: string;
    region: string;
    localName: string;
  };
  service: {
    name: string;
    color: "orange" | "emerald" | "blue";
    iconName: "lightbulb" | "code" | "search";
  };
  isGerman: boolean;
}

export default function LocationHero({ location, service, isGerman }: LocationHeroProps) {
  const colorClasses = {
    orange: {
      gradient: "from-orange-950/20",
      pattern: "rgb(249 115 22 / 0.3)",
      orb1: "bg-orange-500/20",
      orb2: "bg-amber-600/15",
      badge: "border-orange-500/30 bg-orange-500/10",
      badgeText: "text-orange-400",
      icon: "text-orange-400",
    },
    emerald: {
      gradient: "from-emerald-950/20",
      pattern: "rgb(16 185 129 / 0.1)",
      orb1: "bg-emerald-500/20",
      orb2: "bg-teal-600/15",
      badge: "border-emerald-500/30 bg-emerald-500/10",
      badgeText: "text-emerald-400",
      icon: "text-emerald-400",
    },
    blue: {
      gradient: "from-blue-950/20",
      pattern: "rgb(59 130 246 / 0.1)",
      orb1: "bg-blue-500/20",
      orb2: "bg-blue-600/15",
      badge: "border-blue-500/30 bg-blue-500/10",
      badgeText: "text-blue-400",
      icon: "text-blue-400",
    },
  };

  const colors = colorClasses[service.color];
  
  // Map icon name to actual icon component
  const iconMap = {
    lightbulb: Lightbulb,
    code: Code2,
    search: SearchCheck,
  };
  const ServiceIcon = iconMap[service.iconName];

  const locationStats = isGerman ? {
    title: service.name,
    subtitle: location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
      ? `Ihr Partner in München und Umgebung`
      : `Ihr Partner in ganz Bayern`,
    description: service.iconName === "lightbulb"
      ? location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
        ? `Wir verstehen die Herausforderungen Münchner Unternehmen: Hohe Betriebskosten, Fachkräftemangel und enormer Wettbewerbsdruck. Wir entwickeln KI-Strategien, die sich rechnen – mit klarem ROI-Fokus.`
        : `Bayerische Unternehmen verbinden traditionelle Werte mit Innovation. Wir entwickeln Automatisierungsstrategien, die zu dieser Kultur passen: Pragmatisch, nachhaltig, mit klarem Geschäftswert.`
      : service.iconName === "code"
      ? location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
        ? `Wir entwickeln produktionsreife AI-Systeme für Unternehmen in München und Umgebung. Mit DSGVO-konformer Implementierung, lokaler Betreuung und Integration in bestehende Systeme.`
        : `Robuste AI-Lösungen für bayerische Unternehmen: Wir integrieren uns in Ihre Systemlandschaft und entwickeln Lösungen, die auch in komplexen Strukturen funktionieren.`
      : location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
        ? `In 1-2 Wochen analysieren wir Ihre Prozesse und identifizieren konkrete Automatisierungs-Möglichkeiten. Mit Fokus auf Quick Wins, die sich sofort umsetzen lassen.`
        : `Strukturiertes Audit mit pragmatischem Ansatz: Keine theoretischen Konzepte, sondern konkrete Empfehlungen mit realistischen ROI-Berechnungen.`,
    stats: service.iconName === "lightbulb" ? [
      { icon: Target, value: "5-10", label: "Use Cases" },
      { icon: TrendingUp, value: "ROI", label: "Fokussiert" },
      { icon: Clock, value: "4-8", label: "Wochen" },
    ] : service.iconName === "code" ? [
      { icon: Zap, value: "DSGVO", label: "Konform" },
      { icon: CheckCircle, value: "99.9%", label: "Uptime-Ziel" },
      { icon: Clock, value: "6-12", label: "Wochen" },
    ] : [
      { icon: SearchCheck, value: "15-30", label: "Use Cases" },
      { icon: TrendingUp, value: "€100k+", label: "Ø Potenzial" },
      { icon: Clock, value: "1-2", label: "Wochen" },
    ],
  } : {
    title: service.name,
    subtitle: location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
      ? `Your Partner in Munich & Surrounding Area`
      : `Your Partner Across Bavaria`,
    description: service.iconName === "lightbulb"
      ? location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
        ? `We understand Munich business challenges: High operating costs, talent shortage, and intense competition. We develop AI strategies that pay off – with clear ROI focus.`
        : `Bavarian companies combine traditional values with innovation. We develop automation strategies that fit this culture: Pragmatic, sustainable, with clear business value.`
      : service.iconName === "code"
      ? location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
        ? `We build production-ready AI systems for businesses in Munich and surrounding areas. With GDPR-compliant implementation, local support, and integration with existing systems.`
        : `Robust AI solutions for Bavarian businesses: We integrate into your system landscape and build solutions that work in complex structures.`
      : location.name.toLowerCase().includes("münch") || location.name.toLowerCase().includes("munic")
        ? `In 1-2 weeks, we analyze your processes and identify concrete automation opportunities. Focus on quick wins you can implement immediately.`
        : `Structured audit with pragmatic approach: No theoretical concepts, but concrete recommendations with realistic ROI calculations.`,
    stats: service.iconName === "lightbulb" ? [
      { icon: Target, value: "5-10", label: "Use Cases" },
      { icon: TrendingUp, value: "ROI", label: "Focused" },
      { icon: Clock, value: "4-8", label: "Weeks" },
    ] : service.iconName === "code" ? [
      { icon: Zap, value: "GDPR", label: "Compliant" },
      { icon: CheckCircle, value: "99.9%", label: "Uptime Goal" },
      { icon: Clock, value: "6-12", label: "Weeks" },
    ] : [
      { icon: SearchCheck, value: "15-30", label: "Use Cases" },
      { icon: TrendingUp, value: "€100k+", label: "Avg Potential" },
      { icon: Clock, value: "1-2", label: "Weeks" },
    ],
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} via-black to-black`} />
      
      {/* Animated pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, ${colors.pattern} 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} />
      </div>

      {/* Glowing orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className={`absolute top-0 left-1/4 w-[600px] h-[600px] ${colors.orb1} rounded-full blur-[120px]`}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
        className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] ${colors.orb2} rounded-full blur-[100px]`}
      />

      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center">
          <div className="px-6 sm:px-12 lg:px-16 xl:px-20 py-32 lg:py-40 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left column - Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors.badge} backdrop-blur-sm mb-8`}
                >
                  <MapPin className={`w-4 h-4 ${colors.badgeText}`} />
                  <span className={`text-sm ${colors.badgeText} font-light`}>
                    {locationStats.subtitle}
                  </span>
                </motion.div>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight mb-6 leading-[1.1]"
                >
                  {locationStats.title}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.4 }}
                  className="text-base sm:text-lg lg:text-xl text-white/60 font-light leading-relaxed mb-10"
                >
                  {locationStats.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <button className={`group px-8 py-4 rounded-full bg-white text-black font-light text-base transition-all hover:scale-105`}>
                    {isGerman ? "Kostenloses Erstgespräch" : "Free Consultation"}
                    <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
                  </button>
                  <button className="px-8 py-4 rounded-full border border-white/20 text-white font-light text-base transition-all hover:bg-white/5">
                    {isGerman ? "Mehr erfahren" : "Learn More"}
                  </button>
                </motion.div>
              </motion.div>

              {/* Right column - Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                className="relative"
              >
                <div className="grid gap-6">
                  {locationStats.stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        className="p-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colors.badge}`}>
                            <Icon className={`w-6 h-6 ${colors.icon}`} />
                          </div>
                          <div>
                            <div className="text-3xl font-light text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-white/60 font-light">{stat.label}</div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
