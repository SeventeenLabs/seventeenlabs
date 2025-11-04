"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Building2, Users, Zap, CheckCircle2 } from "lucide-react";

interface BlueprintBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}

interface FormData {
  companyName: string;
  email: string;
  teamSize: string;
  industry: string;
  mainChallenge: string;
  currentTools: string;
  addStrategySession: boolean;
}

export default function BlueprintBookingModal({ isOpen, onClose, locale }: BlueprintBookingModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    email: "",
    teamSize: "",
    industry: "",
    mainChallenge: "",
    currentTools: "",
    addStrategySession: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track conversion event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'Blueprint',
          event_label: 'Qualification Form Completed',
          form_step: 'pre_checkout',
          company_name: formData.companyName,
          team_size: formData.teamSize,
          industry: formData.industry,
          has_strategy_session: formData.addStrategySession,
        });
      }

      // Calculate total price
      const basePrice = 499;
      const strategySessionPrice = formData.addStrategySession ? 250 : 0;
      const totalPrice = basePrice + strategySessionPrice;

      // Create Stripe Checkout session
      const response = await fetch('/api/create-blueprint-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale,
          totalPrice,
        }),
      });

      const { checkoutUrl } = await response.json();

      // Track checkout initiation
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'begin_checkout', {
          currency: 'USD',
          value: totalPrice,
          items: [{
            item_id: 'blueprint_early_adopter',
            item_name: 'Agency Automation Blueprint',
            price: basePrice,
            quantity: 1,
            item_category: 'Automation Services',
            item_variant: 'Early Adopter'
          }, ...(formData.addStrategySession ? [{
            item_id: 'strategy_session',
            item_name: '30-min Strategy Session',
            price: strategySessionPrice,
            quantity: 1,
            item_category: 'Consulting',
            item_variant: 'Add-on'
          }] : [])]
        });
      }

      // Redirect to Stripe Checkout
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert('Something went wrong. Please try again or contact us directly.');
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const totalPrice = 499 + (formData.addStrategySession ? 250 : 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black border border-white/10 w-full max-w-5xl pointer-events-auto relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-8 sm:p-12 lg:p-16">
                {/* Header */}
                <div className="mb-12">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-3">
                    Get Your Blueprint
                  </h2>
                  <p className="text-white/40 font-light">
                    Tell us about your agency to receive a custom automation roadmap
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                    {/* Left Column - Company Info */}
                    <div className="lg:col-span-2 space-y-8">
                      <div>
                        <h3 className="text-sm font-light text-white/60 tracking-wider uppercase mb-6">
                          Company Information
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <input
                              type="text"
                              id="companyName"
                              required
                              value={formData.companyName}
                              onChange={(e) => updateField('companyName', e.target.value)}
                              className="w-full bg-transparent border-b border-white/10 text-white pb-3 font-light focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                              placeholder="Company Name *"
                            />
                          </div>

                          <div>
                            <input
                              type="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={(e) => updateField('email', e.target.value)}
                              className="w-full bg-transparent border-b border-white/10 text-white pb-3 font-light focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                              placeholder="Email Address *"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-5">
                            <select
                              id="teamSize"
                              required
                              value={formData.teamSize}
                              onChange={(e) => updateField('teamSize', e.target.value)}
                              className="w-full bg-transparent border-b border-white/10 text-white pb-3 font-light focus:outline-none focus:border-white/30 transition-colors"
                            >
                              <option value="" className="bg-black">Team Size *</option>
                              <option value="1-5" className="bg-black">1-5 people</option>
                              <option value="6-10" className="bg-black">6-10 people</option>
                              <option value="11-25" className="bg-black">11-25 people</option>
                              <option value="26-50" className="bg-black">26-50 people</option>
                              <option value="51+" className="bg-black">51+ people</option>
                            </select>

                            <select
                              id="industry"
                              required
                              value={formData.industry}
                              onChange={(e) => updateField('industry', e.target.value)}
                              className="w-full bg-transparent border-b border-white/10 text-white pb-3 font-light focus:outline-none focus:border-white/30 transition-colors"
                            >
                              <option value="" className="bg-black">Industry *</option>
                              <option value="marketing" className="bg-black">Marketing</option>
                              <option value="design" className="bg-black">Design</option>
                              <option value="dev" className="bg-black">Development</option>
                              <option value="consulting" className="bg-black">Consulting</option>
                              <option value="ecommerce" className="bg-black">E-commerce</option>
                              <option value="saas" className="bg-black">SaaS</option>
                              <option value="other" className="bg-black">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-light text-white/60 tracking-wider uppercase mb-6">
                          Your Challenge
                        </h3>
                        <div className="space-y-5">
                          <div>
                            <textarea
                              id="mainChallenge"
                              required
                              value={formData.mainChallenge}
                              onChange={(e) => updateField('mainChallenge', e.target.value)}
                              rows={3}
                              className="w-full bg-transparent border border-white/10 text-white p-4 font-light focus:outline-none focus:border-white/30 transition-colors resize-none placeholder:text-white/30"
                              placeholder="What's your biggest operational challenge? *"
                            />
                          </div>

                          <div>
                            <input
                              type="text"
                              id="currentTools"
                              value={formData.currentTools}
                              onChange={(e) => updateField('currentTools', e.target.value)}
                              className="w-full bg-transparent border-b border-white/10 text-white pb-3 font-light focus:outline-none focus:border-white/30 transition-colors placeholder:text-white/30"
                              placeholder="Current Tools (Optional)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Pricing */}
                    <div className="space-y-6">
                      {/* Add-on */}
                      <button
                        type="button"
                        onClick={() => updateField('addStrategySession', !formData.addStrategySession)}
                        className={`w-full border ${
                          formData.addStrategySession ? 'border-white/30' : 'border-white/10'
                        } p-5 transition-all text-left group hover:border-white/30`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-1 h-4 w-4 rounded-full border transition-all ${
                            formData.addStrategySession ? 'border-white bg-white' : 'border-white/30'
                          }`}>
                            {formData.addStrategySession && (
                              <div className="h-full w-full flex items-center justify-center">
                                <div className="h-2 w-2 bg-black rounded-full" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-white font-light text-sm">Strategy Session</span>
                              <span className="text-white/60 text-xs">+$250</span>
                            </div>
                            <p className="text-white/40 text-xs font-light leading-relaxed">
                              30-min walkthrough with expert
                            </p>
                          </div>
                        </div>
                      </button>

                      {/* Price Summary */}
                      <div className="border-t border-white/10 pt-6">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-white/60 font-light">Blueprint</span>
                            <span className="text-white font-light">$499</span>
                          </div>
                          {formData.addStrategySession && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-white/60 font-light">Session</span>
                              <span className="text-white font-light">$250</span>
                            </div>
                          )}
                        </div>
                        <div className="border-t border-white/10 pt-4 flex items-baseline justify-between">
                          <span className="text-white/60 text-sm font-light">Total</span>
                          <span className="text-white text-3xl font-light">${totalPrice}</span>
                        </div>
                      </div>

                      {/* Benefits */}
                      <div className="border-t border-white/10 pt-6">
                        <ul className="space-y-3">
                          {[
                            '3 custom opportunities',
                            'ROI projections',
                            'Implementation roadmap',
                            'Delivered in 5-7 days'
                          ].map((item, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <div className="h-1 w-1 bg-white/40 rounded-full mt-2 flex-shrink-0" />
                              <span className="text-white/50 text-xs font-light">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Footer CTA */}
                  <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <p className="text-white/30 text-xs font-light">
                        Secure checkout via Stripe
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group bg-white text-black px-10 py-4 font-light text-sm hover:bg-white/90 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span>{isSubmitting ? 'Processing...' : 'Continue to Payment'}</span>
                        {!isSubmitting && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
