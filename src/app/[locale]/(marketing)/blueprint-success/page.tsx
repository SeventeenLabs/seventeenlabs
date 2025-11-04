"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Mail, ArrowRight } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";

export default function BlueprintSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // Track conversion
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'purchase', {
          transaction_id: sessionId,
          value: 499,
          currency: 'USD',
          items: [{
            item_id: 'blueprint_early_adopter',
            item_name: 'Agency Automation Blueprint',
            price: 499,
            quantity: 1,
          }]
        });
      }

      // Fetch session details (optional)
      fetch(`/api/checkout-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setSessionData(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-slate-950">
      <LandingHeader />
      
      <main className="relative py-24 sm:py-32">
        <div className="max-w-3xl mx-auto px-6 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full mb-8">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-light text-white mb-4">
              Payment Successful! 🎉
            </h1>
            <p className="text-xl text-white/60 font-light mb-12">
              Your Agency Automation Blueprint is on its way
            </p>

            {/* What Happens Next */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-sm text-left mb-8">
              <h2 className="text-2xl font-light text-white mb-6">What happens next?</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-light mb-1">Check your email</h3>
                    <p className="text-white/60 text-sm">
                      You'll receive a confirmation email with next steps and a link to schedule your kickoff call.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-light mb-1">Schedule your kickoff call</h3>
                    <p className="text-white/60 text-sm">
                      Book a 30-minute discovery call where we'll dive deep into your operations and gather the insights needed for your custom blueprint.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-light mb-1">We analyze your business</h3>
                    <p className="text-white/60 text-sm">
                      Our team conducts a comprehensive analysis of your workflows, tools, and processes to identify the highest-impact automation opportunities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white text-sm">
                    4
                  </div>
                  <div>
                    <h3 className="text-white font-light mb-1">Receive your blueprint (5-7 days)</h3>
                    <p className="text-white/60 text-sm">
                      Get your personalized roadmap with 3 custom automation opportunities, implementation guides, ROI projections, and priority recommendations.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:hello@seventeenlabs.io"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-sm font-light hover:bg-white/90 transition-all"
              >
                <Mail className="h-4 w-4" />
                <span>Email Us</span>
              </a>
              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white px-8 py-4 rounded-sm font-light hover:bg-white/5 transition-all"
              >
                <span>Back to Home</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            {/* Additional Info */}
            <div className="mt-12 text-white/40 text-sm">
              <p>Questions? Email us at <a href="mailto:hello@seventeenlabs.io" className="text-white/60 hover:text-white underline">hello@seventeenlabs.io</a></p>
            </div>
          </motion.div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
