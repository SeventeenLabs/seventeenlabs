"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";
import { ArrowRight, Calendar, Mail, X } from "lucide-react";
import { useLocale } from "@/lib/i18n/context";

interface ContactModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  prefillMessage?: string;
  scrollTrigger?: boolean;
}

export default function ContactModal({ 
  isOpen: externalIsOpen, 
  onClose: externalOnClose,
  prefillMessage,
  scrollTrigger = false 
}: ContactModalProps) {
  const locale = useLocale();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Determine if controlled or uncontrolled
  const isControlled = externalIsOpen !== undefined;
  const isOpen = isControlled ? externalIsOpen : internalIsOpen;
  const setIsOpen = isControlled ? (v: boolean) => !v && externalOnClose?.() : setInternalIsOpen;

  const content = {
    en: {
      title: "Let's talk",
      subtitle: "Tell me what's eating your time. I'll show you how to fix it.",
      orCall: "Or book a call directly",
      bookCall: "Book 15-min Call",
      name: "Your name",
      email: "Email",
      message: "What should I automate for you?",
      messagePlaceholder: "e.g. I spend 4 hours/week on client reporting...",
      send: "Send Message",
      sending: "Sending...",
      success: "Got it! I'll reply within 24 hours.",
      error: "Something went wrong. Try chris@seventeenlabs.io instead.",
    },
    de: {
      title: "Lass uns reden",
      subtitle: "Sag mir, was deine Zeit frisst. Ich zeige dir, wie du es löst.",
      orCall: "Oder direkt einen Call buchen",
      bookCall: "15-Min Call buchen",
      name: "Dein Name",
      email: "E-Mail",
      message: "Was soll ich für dich automatisieren?",
      messagePlaceholder: "z.B. Ich verbringe 4h/Woche mit Kunden-Reporting...",
      send: "Nachricht senden",
      sending: "Wird gesendet...",
      success: "Erhalten! Ich melde mich innerhalb von 24 Stunden.",
      error: "Etwas ist schiefgegangen. Versuch's mit chris@seventeenlabs.io",
    },
  };

  const t = content[locale as keyof typeof content] || content.en;

  // Scroll trigger (only when scrollTrigger=true and not controlled)
  useEffect(() => {
    if (!scrollTrigger || isControlled || hasShown) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 800;
      
      if (scrollY > triggerPoint && !hasShown) {
        setInternalIsOpen(true);
        setHasShown(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollTrigger, isControlled, hasShown]);

  // Prefill message when modal opens
  useEffect(() => {
    if (isOpen && prefillMessage && formData.message.trim() === '') {
      setFormData(prev => ({ ...prev, message: prefillMessage }));
    }
  }, [isOpen, prefillMessage, formData.message]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus('idle');
    }
  }, [isOpen]);

  const isFormValid = 
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.email.includes('@') &&
    formData.message.trim() !== '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleClose = () => {
    if (isControlled) {
      externalOnClose?.();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL || '';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error('Failed');
      setSubmitStatus('success');
      
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setSubmitStatus('idle');
        handleClose();
      }, 2500);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="relative bg-black border border-white/10 rounded-2xl max-w-lg w-full overflow-hidden pointer-events-auto">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-white/40 hover:text-white/80 transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <h2 className="text-2xl font-light text-white mb-2">
                    {t.title}
                  </h2>
                  <p className="text-white/50 text-sm">
                    {t.subtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.name}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.email}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/30 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <textarea
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.messagePlaceholder}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:border-white/30 focus:outline-none transition-colors resize-none"
                    />
                    <p className="text-[11px] text-white/30 mt-1.5 ml-1">
                      {t.message}
                    </p>
                  </div>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="text-sm text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-center">
                      ✓ {t.success}
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                      {t.error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="w-full flex items-center justify-center gap-2 bg-white text-black py-3.5 px-6 rounded-full font-medium hover:bg-white/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4" />
                        {t.send}
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-black text-white/30 text-xs">{t.orCall}</span>
                  </div>
                </div>

                {/* Book Call CTA */}
                <a
                  href="https://cal.com/christian-lutz-pw2nn4/15min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-white/20 text-white py-3.5 px-6 rounded-full font-medium hover:bg-white/5 hover:border-white/30 transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  {t.bookCall}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
