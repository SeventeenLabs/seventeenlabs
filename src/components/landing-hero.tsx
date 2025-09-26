"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import GlassSurface from "./GlassSurface";
import Prism from "./ui/prism";

const features = [
  "Ready-to-use AI tools & apps",
  "Automation workflow marketplace", 
  "Expert agency services & support"
];

export default function LandingHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1 }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.8 },
    visible: { opacity: 1, x: 0, scale: 1 }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-950">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}
      >
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
      </motion.div>
      <div className="relative flex min-h-screen items-center w-full z-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mx-auto w-full max-w-4xl px-6 py-24 text-center"
        >
          <motion.h1
            variants={titleVariants}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Smart Business Automation & AI Tools for Growth
          </motion.h1>

          <motion.p
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-slate-300"
          >
            From ready-to-deploy workflows to custom AI applications and expert implementation support - we provide everything small businesses need to automate operations and accelerate profitable growth.
          </motion.p>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            >
              <Button asChild size="lg" className="min-w-48 bg-white px-8 py-3 text-slate-900 hover:bg-slate-100">
                <Link href="/apps">Explore Our Products</Link>
              </Button>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.65 }}
            >
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
                  href="/workflows" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-2.5 text-white hover:text-white/90 transition-colors w-full h-full text-sm font-medium whitespace-nowrap"
                >
                  Automation Workflows
                </Link>
              </GlassSurface>
            </motion.div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-16 grid gap-4 text-left sm:grid-cols-3"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                variants={featureVariants}
                transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 0.8 + index * 0.15,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200 
                  }}
                  className="flex size-6 items-center justify-center rounded-full bg-white/10"
                >
                  <Check className="size-4 text-white" />
                </motion.div>
                <span className="text-sm text-slate-300">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
