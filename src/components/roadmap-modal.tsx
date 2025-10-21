"use client";

import { Dialog } from "@/components/ui/dialog";
import { 
  InputGroup, 
  InputGroupAddon, 
  InputGroupInput, 
  InputGroupText, 
  InputGroupTextarea 
} from "@/components/ui/input-group";
import { ArrowRight, Mail, User, Building2, Globe } from "lucide-react";
import { useState, useEffect } from "react";

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Add global style for autofill - make it fully transparent
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-box-shadow: 0 0 0 0 transparent inset !important;
      box-shadow: none !important;
      -webkit-text-fill-color: white !important;
      background-color: transparent !important;
      background-image: none !important;
      transition: background-color 5000s ease-in-out 0s;
    }
  `;
  if (!document.querySelector('#autofill-fix')) {
    style.id = 'autofill-fix';
    document.head.appendChild(style);
  }
}

export default function RoadmapModal({ isOpen, onClose }: RoadmapModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyType: "Marketing Agency",
    companyUrl: "",
    primaryGoal: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    companyType: "",
    primaryGoal: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      companyType: "",
      primaryGoal: ""
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.companyType.trim()) {
      newErrors.companyType = "Company type is required";
    }

    if (!formData.primaryGoal.trim()) {
      newErrors.primaryGoal = "Please describe your challenges";
    } else if (formData.primaryGoal.trim().length < 20) {
      newErrors.primaryGoal = "Please provide more detail (at least 20 characters)";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_ROADMAP_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error('Webhook URL not configured');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          companyType: formData.companyType,
          companyUrl: formData.companyUrl,
          primaryGoal: formData.primaryGoal,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
      console.log("Form submitted successfully:", formData);
      
      // Close modal after a short delay to show success state
      setTimeout(() => {
        onClose();
        // Reset form state after closing
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            companyType: "Marketing Agency",
            companyUrl: "",
            primaryGoal: ""
          });
          setSubmitSuccess(false);
        }, 300);
      }, 1500);

    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <div className="h-full flex flex-col bg-zinc-950">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 pt-6 sm:pt-8 pb-6 flex flex-col">
          {/* Header */}
          <div className="mb-3">
            <h2 className="text-2xl sm:text-3xl font-light text-white mb-1">
              Get Your Free AI Automation Roadmap
            </h2>
            <p className="text-sm text-white/70 font-light leading-relaxed">
              Tell us about your business and we'll send you a personalized roadmap showing where automation can save you the most time and money.
            </p>
          </div>

          {/* Form - Centered */}
          <div className="flex-1 flex items-center">
            <form onSubmit={handleSubmit} className="w-full space-y-3">
            {/* Name and Email Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-light text-white/70 mb-1">
                  Name
                </label>
                <InputGroup className={`bg-white/5 ${errors.name ? 'border-red-500' : 'border-white/10'} text-white`}>
                  <InputGroupInput
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    className="bg-transparent text-white placeholder:text-white/40"
                    aria-invalid={!!errors.name}
                  />
                  <InputGroupAddon className="text-white/70">
                    <User className="h-4 w-4" />
                  </InputGroupAddon>
                </InputGroup>
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-light text-white/70 mb-1">
                  Email
                </label>
                <InputGroup className={`bg-white/5 ${errors.email ? 'border-red-500' : 'border-white/10'} text-white`}>
                  <InputGroupInput
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="bg-transparent text-white placeholder:text-white/40"
                    aria-invalid={!!errors.email}
                  />
                  <InputGroupAddon className="text-white/70">
                    <Mail className="h-4 w-4" />
                  </InputGroupAddon>
                </InputGroup>
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Company Type */}
            <div>
              <label htmlFor="companyType" className="block text-sm font-light text-white/70 mb-1.5">
                Company Type
              </label>
              <InputGroup className={`bg-white/5 ${errors.companyType ? 'border-red-500' : 'border-white/10'} text-white`}>
                <InputGroupInput
                  type="text"
                  id="companyType"
                  name="companyType"
                  value={formData.companyType}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Marketing Agency, Ecommerce, SaaS"
                  className="bg-transparent text-white placeholder:text-white/40"
                  aria-invalid={!!errors.companyType}
                />
                <InputGroupAddon className="text-white/70">
                  <Building2 className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
              {errors.companyType && (
                <p className="text-red-400 text-xs mt-1">{errors.companyType}</p>
              )}
            </div>

            {/* Company URL */}
            <div>
              <label htmlFor="companyUrl" className="block text-sm font-light text-white/70 mb-1.5">
                Company URL <span className="text-white/40">(optional)</span>
              </label>
              <InputGroup className="bg-white/5 border-white/10 text-white">
                <InputGroupAddon className="text-white/70">
                  <InputGroupText className="text-white/70">https://</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  type="text"
                  id="companyUrl"
                  name="companyUrl"
                  value={formData.companyUrl}
                  onChange={handleChange}
                  placeholder="yourcompany.com"
                  className="!pl-1 bg-transparent text-white placeholder:text-white/40"
                />
                <InputGroupAddon align="inline-end" className="text-white/70">
                  <Globe className="h-4 w-4" />
                </InputGroupAddon>
              </InputGroup>
            </div>

            {/* Primary Goal */}
            <div>
              <label htmlFor="primaryGoal" className="block text-sm font-light text-white/70 mb-1.5">
                What challenges are you facing right now?
              </label>
              <InputGroup className={`bg-white/5 ${errors.primaryGoal ? 'border-red-500' : 'border-white/10'} text-white`}>
                <InputGroupTextarea
                  id="primaryGoal"
                  name="primaryGoal"
                  value={formData.primaryGoal}
                  onChange={handleChange}
                  required
                  rows={3}
                  maxLength={350}
                  placeholder="e.g., Too much time on manual reporting, struggling with lead management..."
                  className="bg-transparent text-white placeholder:text-white/40"
                  aria-invalid={!!errors.primaryGoal}
                />
                <InputGroupAddon align="block-end" className="text-white/50 text-xs">
                  {350 - formData.primaryGoal.length} characters remaining
                </InputGroupAddon>
              </InputGroup>
              {errors.primaryGoal && (
                <p className="text-red-400 text-xs mt-1">{errors.primaryGoal}</p>
              )}
            </div>
          </form>
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="border-t border-white/10 px-6 sm:px-8 py-4 bg-zinc-950">
          {submitError && (
            <p className="text-red-400 text-sm text-center mb-3">{submitError}</p>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || submitSuccess}
            className="w-full group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-black bg-white rounded-lg hover:bg-white/90 transition-all shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <span className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full"></span>
                Submitting...
              </>
            ) : submitSuccess ? (
              <>
                <span className="text-green-600">✓</span>
                Success! Check your email
              </>
            ) : (
              <>
                Generate My Free Roadmap
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
          
          {/* Microcopy */}
          {!submitSuccess && (
            <p className="text-xs text-white/50 font-light text-center mt-2.5">
              Takes less than 5 minutes. We'll email your roadmap instantly.
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
}
