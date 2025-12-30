'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Mail, Sparkles, X } from 'lucide-react';
import { useBlogSubscription } from '@/hooks/useBlogSubscription';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed?: () => void;
}

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 20, scale: 0.97 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export function SubscribeModal({ isOpen, onClose, onSubscribed }: SubscribeModalProps) {
  const [email, setEmail] = useState('');
  const { status, message, subscribe, reset } = useBlogSubscription('Blog landing modal');

  const isLoading = status === 'loading';
  const isSuccess = status === 'success';

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      reset();
    }
  }, [isOpen, reset]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = await subscribe(email);
    if (result.success) {
      onSubscribed?.();
    }
  };

  const closeAndReset = () => {
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="subscribe-modal"
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            variants={overlayVariants}
            onClick={closeAndReset}
          />
          <motion.div
            variants={modalVariants}
            className="relative w-full max-w-3xl rounded-[28px] border border-gray-100 bg-white shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="absolute top-4 right-4 rounded-full border border-gray-200 bg-white p-2 text-gray-500 hover:text-gray-900"
              aria-label="Close subscribe modal"
              onClick={closeAndReset}
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-600">
                  <Sparkles className="h-4 w-4 text-gray-500" />
                  Field Notes
                </div>
                <h3 className="mt-6 text-3xl font-semibold text-gray-900 leading-tight">
                  Weekly automation playbooks from the SeventeenLabs floor
                </h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  A concise Thursday memo that breaks down one workflow, the stack powering it, and the metrics that prove it out.
                </p>
                <ul className="mt-6 space-y-3 text-sm text-gray-700">
                  {[
                    'Stack diagrams and prompts you can reuse',
                    'Revenue, marketing, and ops examples',
                    'Only one email per week. Unsubscribe any time.',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-900/5">
                        <Check className="h-3 w-3 text-gray-900" />
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50/60 p-4 text-sm text-gray-600">
                  Trusted by operators shipping inside SaaS, agency, and PE-backed teams.
                </div>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">
                  Newsletter
                </p>
                <h4 className="mt-3 text-2xl font-semibold text-gray-900">
                  Join the briefing
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Tell us where to send the next teardown.
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <label className="text-xs font-medium text-gray-500" htmlFor="subscribe-modal-email">
                    Work email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
                      <Mail className="h-5 w-5" />
                    </div>
                    <input
                      id="subscribe-modal-email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-2xl border border-gray-200 bg-white pl-12 pr-4 py-4 text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 disabled:opacity-60"
                      required
                      disabled={isLoading || isSuccess}
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-gray-800 disabled:opacity-70"
                    disabled={isLoading || isSuccess}
                  >
                    {isLoading ? 'Joining list...' : isSuccess ? "You're subscribed" : 'Send me the memos'}
                    {!isSuccess && <ArrowRight className="h-4 w-4" />}
                  </button>
                </form>
                <div className="min-h-[1.5rem] mt-4" aria-live="polite" role="status">
                  {message && (
                    <p className={`text-sm ${isSuccess ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {message}
                    </p>
                  )}
                </div>
                <div className="mt-6 text-xs text-gray-500">
                  Only signal, never spam. You can opt out in one click.
                </div>
                <button
                  type="button"
                  className="mt-4 text-xs font-medium text-gray-400 underline-offset-4 hover:text-gray-700 hover:underline"
                  onClick={closeAndReset}
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
