"use client";

import { Dialog } from "./ui/dialog";
import { useTranslations } from "@/lib/i18n/context";
import { useState, FormEvent, useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillMessage?: string;
}

export default function ContactModal({ isOpen, onClose, prefillMessage }: ContactModalProps) {
  const { t } = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    company: '',
    website: '',
    companySize: '',
    revenue: '',
    budget: '',
    services: '',
    message: '',
  });

  const isFormValid = 
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.email.includes('@') &&
    formData.message.trim() !== '';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        name: '',
        email: '',
        role: '',
        company: '',
        website: '',
        companySize: '',
        revenue: '',
        budget: '',
        services: '',
        message: '',
      });
      setSubmitStatus('idle');
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && prefillMessage && formData.message.trim() === '') {
      setFormData(prev => ({
        ...prev,
        message: prefillMessage,
      }));
    }
  }, [isOpen, prefillMessage, formData.message]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const data = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL || '';
      
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitStatus('success');
      
      // Reset form and close modal after 2 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          role: '',
          company: '',
          website: '',
          companySize: '',
          revenue: '',
          budget: '',
          services: '',
          message: '',
        });
        setSubmitStatus('idle');
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="h-full flex flex-col bg-zinc-950">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            {t("contactModal.title")}
          </h2>
          
          <form id="contact-form" onSubmit={handleSubmit} className="space-y-4">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-white/70 mb-1">
                  {t("contactModal.fields.name.label")}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t("contactModal.fields.name.placeholder")}
                  required
                  className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm placeholder-white/40 focus:border-white/50 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-white/70 mb-1">
                  {t("contactModal.fields.email.label")}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={t("contactModal.fields.email.placeholder")}
                  required
                  className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm placeholder-white/40 focus:border-white/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-xs font-medium text-white/70 mb-1">
                {t("contactModal.fields.role.label")}
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder={t("contactModal.fields.role.placeholder")}
                className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm placeholder-white/40 focus:border-white/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Company Name and Website Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="company" className="block text-xs font-medium text-white/70 mb-1">
                  {t("contactModal.fields.company.label")}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder={t("contactModal.fields.company.placeholder")}
                  className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm placeholder-white/40 focus:border-white/50 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="website" className="block text-xs font-medium text-white/70 mb-1">
                  {t("contactModal.fields.website.label")}
                </label>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder={t("contactModal.fields.website.placeholder")}
                  className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm placeholder-white/40 focus:border-white/50 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Company Size and Revenue Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="companySize" className="block text-xs font-medium text-white/70 mb-1">
                  {t("contactModal.fields.companySize.label")}
                </label>
                <select
                  id="companySize"
                  name="companySize"
                  value={formData.companySize}
                  onChange={handleInputChange}
                  className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-white">{t("contactModal.fields.companySize.placeholder")}</option>
                  <option value="1-10" className="bg-zinc-900 text-white">{t("contactModal.fields.companySize.options.1-10")}</option>
                  <option value="11-50" className="bg-zinc-900 text-white">{t("contactModal.fields.companySize.options.11-50")}</option>
                  <option value="51-200" className="bg-zinc-900 text-white">{t("contactModal.fields.companySize.options.51-200")}</option>
                  <option value="201-500" className="bg-zinc-900 text-white">{t("contactModal.fields.companySize.options.201-500")}</option>
                  <option value="500+" className="bg-zinc-900 text-white">{t("contactModal.fields.companySize.options.500+")}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="revenue" className="block text-xs font-medium text-white/70 mb-1">
                  {t("contactModal.fields.revenue.label")}
                </label>
                <select
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleInputChange}
                  className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer"
                >
                  <option value="" className="bg-zinc-900 text-white">{t("contactModal.fields.revenue.placeholder")}</option>
                  <option value="0-100k" className="bg-zinc-900 text-white">{t("contactModal.fields.revenue.options.0-100k")}</option>
                  <option value="100k-500k" className="bg-zinc-900 text-white">{t("contactModal.fields.revenue.options.100k-500k")}</option>
                  <option value="500k-1m" className="bg-zinc-900 text-white">{t("contactModal.fields.revenue.options.500k-1m")}</option>
                  <option value="1m-5m" className="bg-zinc-900 text-white">{t("contactModal.fields.revenue.options.1m-5m")}</option>
                  <option value="5m+" className="bg-zinc-900 text-white">{t("contactModal.fields.revenue.options.5m+")}</option>
                </select>
              </div>
            </div>

            {/* Project Budget */}
            <div>
              <label htmlFor="budget" className="block text-xs font-medium text-white/70 mb-1">
                {t("contactModal.fields.budget.label")}
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-zinc-900 text-white">{t("contactModal.fields.budget.placeholder")}</option>
                <option value="0-5k" className="bg-zinc-900 text-white">{t("contactModal.fields.budget.options.0-5k")}</option>
                <option value="5k-10k" className="bg-zinc-900 text-white">{t("contactModal.fields.budget.options.5k-10k")}</option>
                <option value="10k-25k" className="bg-zinc-900 text-white">{t("contactModal.fields.budget.options.10k-25k")}</option>
                <option value="25k-50k" className="bg-zinc-900 text-white">{t("contactModal.fields.budget.options.25k-50k")}</option>
                <option value="50k+" className="bg-zinc-900 text-white">{t("contactModal.fields.budget.options.50k+")}</option>
              </select>
            </div>

            {/* Services */}
            <div>
              <label htmlFor="services" className="block text-xs font-medium text-white/70 mb-1">
                {t("contactModal.fields.services.label")}
              </label>
              <select
                id="services"
                name="services"
                value={formData.services}
                onChange={handleInputChange}
                className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm focus:border-white/50 focus:outline-none transition-colors appearance-none cursor-pointer"
              >
                <option value="" className="bg-zinc-900 text-white">{t("contactModal.fields.services.placeholder")}</option>
                <option value="workflows" className="bg-zinc-900 text-white">{t("contactModal.fields.services.options.workflows")}</option>
                <option value="apps" className="bg-zinc-900 text-white">{t("contactModal.fields.services.options.apps")}</option>
                <option value="consulting" className="bg-zinc-900 text-white">{t("contactModal.fields.services.options.consulting")}</option>
                <option value="integration" className="bg-zinc-900 text-white">{t("contactModal.fields.services.options.integration")}</option>
                <option value="other" className="bg-zinc-900 text-white">{t("contactModal.fields.services.options.other")}</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-xs font-medium text-white/70 mb-1">
                {t("contactModal.fields.message.label")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t("contactModal.fields.message.placeholder")}
                required
                className="w-full px-0 py-1.5 border-b border-white/20 bg-transparent text-white text-sm placeholder-white/40 focus:border-white/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="text-sm text-green-400 bg-green-950/30 border border-green-500/20 rounded-lg p-3">
                ✓ Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="text-sm text-red-400 bg-red-950/30 border border-red-500/20 rounded-lg p-3">
                ✗ Something went wrong. Please try again or email us directly.
              </div>
            )}
          </form>
        </div>

        {/* Fixed Submit Button */}
        <div className="border-t border-white/10 p-6 bg-zinc-950">
          <button
            type="submit"
            form="contact-form"
            disabled={isSubmitting || !isFormValid}
            className="w-full bg-white text-black py-3 px-6 rounded-lg font-semibold hover:bg-white/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : (
              t("contactModal.submit")
            )}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
