"use client";

import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, CheckCircle, Zap, Settings, X, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WorkflowTransformation() {
  return (
    <section className="relative bg-slate-900 py-24 overflow-hidden">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent z-30"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl mb-6">
            From Broken Workflows to 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-green-400"> Perfect Solutions</span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We transform your complex, unreliable automation into clean, maintainable solutions that work flawlessly every time.
          </p>
        </motion.div>

        {/* Before & After Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-center mb-16">
          
          {/* BEFORE Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full border border-red-500/20 mb-4">
                <X className="w-8 h-8 text-red-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">Before</h3>
              <p className="text-red-300">Complex & Unreliable</p>
            </div>

            {/* Problems Card */}
            <div className="bg-slate-800/50 rounded-xl border border-red-500/20 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-300">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>Constant failures & timeouts</span>
                </div>
                <div className="flex items-center gap-3 text-red-300">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>Manual fixes required daily</span>
                </div>
                <div className="flex items-center gap-3 text-red-300">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>Unpredictable performance</span>
                </div>
                <div className="flex items-center gap-3 text-red-300">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <span>Difficult to maintain</span>
                </div>
              </div>
              
              {/* Error Stats */}
              <div className="mt-6 pt-4 border-t border-red-500/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-red-400">73%</div>
                    <div className="text-xs text-red-300">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">4.2h</div>
                    <div className="text-xs text-red-300">Daily Fixes</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* TRANSFORMATION Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center space-y-4"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
                <Wrench className="w-8 h-8 text-blue-400" />
              </div>
              <p className="text-blue-300 font-medium">We Transform</p>
            </div>
            
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-8 h-8 text-blue-400" />
            </motion.div>
            
            <div className="text-center">
              <p className="text-sm text-slate-400">Professional</p>
              <p className="text-sm text-slate-400">Implementation</p>
            </div>
          </motion.div>

          {/* AFTER Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full border border-green-500/20 mb-4">
                <Sparkles className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">After</h3>
              <p className="text-green-300">Clean & Reliable</p>
            </div>

            {/* Solutions Card */}
            <div className="bg-slate-800/50 rounded-xl border border-green-500/20 p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-green-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-green-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Zero maintenance required</span>
                </div>
                <div className="flex items-center gap-3 text-green-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Predictable performance</span>
                </div>
                <div className="flex items-center gap-3 text-green-300">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span>Built for scale</span>
                </div>
              </div>

              {/* Success Stats */}
              <div className="mt-6 pt-4 border-t border-green-500/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-400">99.9%</div>
                    <div className="text-xs text-green-300">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">0m</div>
                    <div className="text-xs text-green-300">Daily Fixes</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Process Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold text-white text-center mb-8">Our Transformation Process</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "1",
                title: "Analyze",
                description: "We audit your current workflows and identify all the pain points",
                icon: Settings
              },
              {
                step: "2", 
                title: "Redesign",
                description: "We architect clean, efficient solutions from the ground up",
                icon: Wrench
              },
              {
                step: "3",
                title: "Deploy",
                description: "We implement and monitor to ensure perfect performance",
                icon: Zap
              }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-slate-800/30 rounded-xl border border-slate-700/50"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/10 rounded-full border border-blue-500/20 mb-4">
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-sm text-blue-400 font-medium mb-2">Step {item.step}</div>
                <h4 className="text-lg font-semibold text-white mb-3">{item.title}</h4>
                <p className="text-slate-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-slate-800/30 rounded-2xl border border-slate-700/50 p-8"
        >
          <h3 className="text-2xl font-semibold text-white mb-4">
            Ready to transform your workflows?
          </h3>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8">
            Stop wasting time on broken automation. Let our experts rebuild your workflows properly - with guaranteed reliability and performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white border-0"
            >
              <Link href="/products">
                <Wrench className="w-4 h-4 mr-2" />
                Get Started Today
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              size="lg" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Link href="/workflows">
                <Sparkles className="w-4 h-4 mr-2" />
                See Examples
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}