"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/i18n/context";
import ColorBends from "./ColorBends";

export default function LandingHero() {
  const locale = useLocale();

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-black">
      {/* Subtle Background */}
      <div className="absolute w-full h-full opacity-40">
        <ColorBends
          colors={["#ff6b35ff", "#2c5aa0"]}
          rotation={10}
          speed={0.08}
          scale={1.5}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          parallax={0.6}
          noise={0.08}
        />
      </div>
    
      <div className="relative z-10 w-full">
        <div className="flex min-h-screen items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-5xl mx-auto px-6 py-20 text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium uppercase tracking-wider mb-8"
            >
              {locale === 'de' ? 'Für Agenturen, Berater & SaaS' : 'For Agencies, Consultants & SaaS'}
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-light text-white leading-[1.1] tracking-tight mb-6"
            >
              {locale === 'de' 
                ? <>Noch immer alles von Hand?</>
                : <>Still Doing Everything Manually?</>}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl sm:text-2xl text-white/70 font-light leading-relaxed max-w-3xl mx-auto mb-12"
            >
              {locale === 'de' 
                ? <>Die Aufgabe, die Sie diese Woche 20x gemacht haben? Die erledigt sich ab nächster Woche von selbst.</>
                : <>That task you did 20 times this week? Next week, it runs itself.</>}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            >
              <a
                href="https://cal.com/christian-lutz-pw2nn4/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-8 py-4 rounded-full bg-white text-black font-medium text-lg hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-white/20 hover:shadow-white/30 hover:scale-105 inline-flex items-center gap-3"
              >
                <span>{locale === 'de' ? 'Kostenloses Gespräch' : 'Book Free Call'}</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <a
                href="#results"
                className="group px-8 py-4 rounded-full border-2 border-white/30 text-white font-medium text-lg hover:border-white/50 hover:bg-white/5 transition-all duration-300 inline-flex items-center gap-2"
              >
                <span>{locale === 'de' ? 'Beispiele' : 'See Examples'}</span>
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/50"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>{locale === 'de' ? '15-Min Gratisgespräch' : '15-min free call'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>{locale === 'de' ? 'Keine Verpflichtung' : 'No commitment'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
                <span>{locale === 'de' ? 'Mit konkretem Plan raus' : 'Leave with a real plan'}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
