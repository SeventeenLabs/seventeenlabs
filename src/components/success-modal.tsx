"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  userInput: string;
  agentId?: string;
}

export default function SuccessModal({
  isOpen,
  onClose,
  userInput,
  agentId = "demo-123"
}: SuccessModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleTestLive = () => {
    setIsLoading(true);
    // Open demo in new tab
    window.open(`/project/${agentId}`, '_blank');
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleBookCall = () => {
    window.open('https://calendly.com/seventeenlabs/15min', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-3xl"
          >
            {/* Outer container with glass morphism matching hero design */}
            <div className="group relative rounded-3xl bg-gradient-to-br from-white/5 via-white/[0.02] to-transparent backdrop-blur-2xl border border-white/20 hover:border-white/30 transition-all duration-300 shadow-2xl p-2">
              
              {/* Inner container matching hero input style */}
              <div className="rounded-2xl bg-[#0f0f1a]/90 backdrop-blur-sm border border-white/5 overflow-hidden">
                
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-6 right-6 z-10 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-all duration-200"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="px-8 py-12 md:px-12 md:py-16 text-center">
                  {/* Success Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="flex justify-center mb-6"
                  >
                    <span className="inline-flex items-center gap-2 rounded-full bg-green-500/20 border border-green-500/30 px-4 py-2 text-sm font-semibold text-green-400">
                      <span className="inline-block rounded-full bg-green-500 w-2 h-2"></span>
                      Project Generated
                    </span>
                  </motion.div>

                  {/* Main heading */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight"
                  >
                    Your Project is Ready
                  </motion.h2>
                  
                  {/* User input echo */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="mb-10"
                  >
                    <p className="text-lg text-white/70 mb-4">Requirements analyzed:</p>
                    <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 via-blue-400/5 to-transparent border border-blue-500/20 p-6">
                      <span className="text-lg md:text-xl font-medium text-blue-400">
                        "{userInput}"
                      </span>
                    </div>
                  </motion.div>

                  {/* Test Live Button matching hero button style */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mb-12"
                  >
                    <button
                      onClick={handleTestLive}
                      disabled={isLoading}
                      className="group/btn relative px-12 py-4 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:via-blue-400 hover:to-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold text-lg md:text-xl transition-all duration-200 hover:scale-[1.02] shadow-xl disabled:hover:scale-100"
                    >
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />
                      <span className="relative flex items-center gap-3">
                        {isLoading ? (
                          <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Loading demo...
                          </>
                        ) : (
                          <>
                            <span>View Implementation</span>
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </>
                        )}
                      </span>
                    </button>
                  </motion.div>

                  {/* Upgrade CTA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="text-center"
                  >
                    <div className="rounded-2xl bg-white/[0.02] border border-white/10 p-6">
                      <p className="text-base text-white/70 mb-4 leading-relaxed">
                        Ready to implement this solution in your business environment?
                      </p>
                      <button
                        onClick={handleBookCall}
                        className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors hover:underline"
                      >
                        <span>Schedule Implementation Call</span>
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
              
              {/* Ambient glow effect matching hero */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}