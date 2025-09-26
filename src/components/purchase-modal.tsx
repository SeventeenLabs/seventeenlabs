"use client";

import { useState } from "react";
import { X, Download, Lock, Check, FileText, AlertCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowData } from "@/hooks/useWorkflows";

interface PurchaseModalProps {
  workflow: WorkflowData;
  isOpen: boolean;
  onClose: () => void;
  onPurchaseComplete: (workflowId: number) => void;
}

function PurchaseForm({ workflow, onSuccess, onError }: {
  workflow: WorkflowData;
  onSuccess: () => void;
  onError: (error: string) => void;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handleCheckout = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!email.trim()) {
      onError('Please enter your email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      onError('Please enter a valid email address');
      return;
    }

    setIsProcessing(true);

    try {
      // First check if user has already purchased this workflow
      const verifyResponse = await fetch('/api/verify-purchase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'verify-purchase',
          email: email.trim(),
          workflowId: workflow.id,
        }),
      });

      const verifyData = await verifyResponse.json();
      
      if (verifyData.hasPurchased) {
        onSuccess();
        return;
      }

      // Create Stripe checkout session
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId: workflow.id,
          customerEmail: email.trim(),
          // Let the API use its default success URL with session_id
          cancelUrl: `${window.location.origin}/workflows/${workflow.id}?payment=cancelled`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        onError(data.error || 'Failed to create checkout session');
        return;
      }

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        onError('Failed to redirect to checkout');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      onError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleCheckout} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
          required
        />
        <p className="text-xs text-slate-500">
          We'll use this to verify your purchase and send download links
        </p>
      </div>

      <Button
        type="submit"
        disabled={isProcessing || !email.trim()}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white"
        size="lg"
      >
        {isProcessing ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          <div className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            Continue to Stripe Checkout
          </div>
        )}
      </Button>

      <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-3">
        <Lock className="h-3 w-3" />
        <span>Secure payment powered by Stripe</span>
      </div>
    </form>
  );
}

export default function PurchaseModal({ workflow, isOpen, onClose, onPurchaseComplete }: PurchaseModalProps) {
  const [step, setStep] = useState<'checkout' | 'processing' | 'success' | 'error'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleFreeDownload = async () => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate processing for free downloads
    setTimeout(() => {
      setStep('success');
      onPurchaseComplete(workflow.id);
    }, 2000);
  };

  const handleSuccess = () => {
    setStep('success');
    onPurchaseComplete(workflow.id);
  };

  const handleError = (error: string) => {
    setErrorMessage(error);
    setStep('error');
  };

  const handleClose = () => {
    setStep('checkout');
    setErrorMessage('');
    setIsProcessing(false);
    onClose();
  };

  const resetToCheckout = () => {
    setStep('checkout');
    setErrorMessage('');
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900">
            {step === 'success' ? 'Purchase Complete!' : 
             step === 'error' ? 'Payment Failed' : 
             'Complete Purchase'}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {step === 'checkout' && (
            <div className="space-y-6">
              <div className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-slate-900 mb-1">
                      {workflow.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {workflow.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      {workflow.category && (
                        <span className="px-2 py-1 bg-slate-100 rounded text-xs">
                          {workflow.category}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    {!workflow.isFree ? (
                      <div className="text-2xl font-bold text-slate-900">
                        ${workflow.price}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-green-600">
                        FREE
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-slate-900 mb-3">What's included:</h4>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Complete n8n workflow file
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Setup instructions and documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    30-day email support
                  </li>
                  {!workflow.isFree && (
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-600" />
                      Commercial usage license
                    </li>
                  )}
                </ul>
              </div>

              {!workflow.isFree ? (
                <PurchaseForm
                  workflow={workflow}
                  onSuccess={handleSuccess}
                  onError={handleError}
                />
              ) : (
                <Button
                  onClick={handleFreeDownload}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Preparing Download...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Download className="mr-2 h-4 w-4" />
                      Download Free Workflow
                    </div>
                  )}
                </Button>
              )}
            </div>
          )}

          {step === 'processing' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Processing your purchase...
              </h3>
              <p className="text-slate-600">
                Please wait while we prepare your workflow download.
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                {!workflow.isFree ? 'Payment Successful!' : 'Download Ready!'}
              </h3>
              <p className="text-slate-600 mb-6">
                {!workflow.isFree 
                  ? 'Your purchase is complete. Check your email for download instructions.'
                  : 'Your free workflow is ready for download. Check your email for the download link.'}
              </p>
              <Button
                onClick={handleClose}
                className="bg-slate-900 hover:bg-slate-800 text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Close
              </Button>
            </div>
          )}

          {step === 'error' && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 mb-2">
                Payment Failed
              </h3>
              <p className="text-slate-600 mb-6">
                {errorMessage || 'Something went wrong with your payment. Please try again.'}
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={resetToCheckout}
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Try Again
                </Button>
                <Button
                  onClick={handleClose}
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}