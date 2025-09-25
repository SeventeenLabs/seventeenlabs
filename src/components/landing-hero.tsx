"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import LiquidEther from "@/components/ui/liquid-ether";
import GlassSurface from "./GlassSurface";
import Orb from "./ui/orb";
import Prism from "./ui/prism";

const features = [
  "Ready-to-use AI tools & apps",
  "Automation workflow marketplace", 
  "Expert agency services & support"
];

export default function LandingHero() {
  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
        <Prism
    animationType="3drotate"
    timeScale={0.4}
    height={3.5}
    baseWidth={5.5}
    scale={3}
    hueShift={0}
    colorFrequency={1}
    noise={0.1}
    glow={0.4}
  />
      </div>
      <div className="relative flex min-h-screen items-center w-full z-20">
        <div className="relative mx-auto w-full max-w-4xl px-6 py-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          Save Time, Cut Costs, Grow Smarter
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-300"
        >
          SeventeenLabs helps small businesses thrive with AI tools, automation workflows, and expert agency services. Everything you need to streamline operations and accelerate growth.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button asChild size="lg" className="min-w-48 bg-white px-8 py-3 text-slate-900 hover:bg-slate-100">
            <Link href="/apps">Explore Our Products</Link>
          </Button>
          <GlassSurface 
            width={192} 
            height={44}
            borderRadius={6}
            displace={2}
            distortionScale={-120}
            redOffset={3}
            greenOffset={8}
            blueOffset={15}
            brightness={70}
            opacity={0.25}
            blur={15}
            mixBlendMode="screen"
            className="min-w-48 h-11 hover:scale-[1.02] transition-transform duration-200"
          >
            <Link 
              href="https://workflows.seventeenlabs.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-2.5 text-white hover:text-white/90 transition-colors w-full h-full text-sm font-medium whitespace-nowrap"
            >
              Automation Workflows
            </Link>
          </GlassSurface>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          className="mt-16 grid gap-4 text-left sm:grid-cols-3"
        >
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-3">
              <div className="flex size-6 items-center justify-center rounded-full bg-white/10">
                <Check className="size-4 text-white" />
              </div>
              <span className="text-sm text-slate-300">{feature}</span>
            </div>
          ))}
        </motion.div>
      </div>
      </div>
    </div>
  );
}
