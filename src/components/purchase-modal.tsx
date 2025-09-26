"use client";

import { useState } from "react";
import { X, ShoppingCart, Download, CreditCard, Lock, Check, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import getStripe from "@/lib/stripe";
import { WorkflowData } from "@/hooks/useWorkflows";

interface PurchaseModalProps {
  workflow: WorkflowData;
  isOpen: boolean;
  onClose: () => void;
  onPurchaseComplete: (workflowId: number) => void;
}

// Stripe payment form component
function PaymentForm({ workflow, onSuccess, onError }: {
  workflow: WorkflowData;
  onSuccess: (paymentIntentId: string) => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

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
        onSuccess('already_purchased');
        setIsProcessing(false);
        return;
      }

      // Create payment intent using workflow ID
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workflowId: workflow.id,
        }),
      });

      const { clientSecret, workflow: workflowData, error: intentError } = await response.json();

      if (intentError) {
        onError(intentError);
        setIsProcessing(false);
        return;
      }

      // Log sync status for debugging
      if (workflowData && !workflowData.syncedWithStripe) {
        console.warn('⚠️ Workflow not synced with Stripe products. Using fallback pricing.');
      }

      // Confirm payment
      const cardElement = elements.getElement(CardElement);
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement!,
          billing_details: {
            email: email.trim(),
          },
        },
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent?.status === 'succeeded') {
        // Confirm the purchase in our database
        await fetch('/api/verify-purchase', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'confirm-purchase',
            email: email.trim(),
            workflowId: workflow.id,
            paymentIntentId: paymentIntent.id,
          }),
        });

        onSuccess(paymentIntent.id);
      }
    } catch {
      onError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Payment Information
        </label>
        <div className="p-4 border border-slate-200 rounded-lg">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#334155',
                  fontFamily: 'system-ui, sans-serif',
                  '::placeholder': {
                    color: '#94a3b8',
                  },
                },
              },
            }}
          />
        </div>
      </div>
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-colors"
        size="lg"
      >
        {isProcessing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="mr-2 h-4 w-4" />
            Complete Purchase - ${workflow.price}
          </>
        )}
      </Button>
    </form>
  );
}

export default function PurchaseModal({ workflow, isOpen, onClose, onPurchaseComplete }: PurchaseModalProps) {
  const [step, setStep] = useState<'checkout' | 'processing' | 'success' | 'error'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [stripePromise] = useState(() => getStripe());

  if (!isOpen) return null;

  const handleFreeDownload = async () => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate processing for free downloads
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Store purchase in localStorage
    const purchases = JSON.parse(localStorage.getItem('purchased_workflows') || '[]');
    if (!purchases.includes(workflow.id)) {
      purchases.push(workflow.id);
      localStorage.setItem('purchased_workflows', JSON.stringify(purchases));
    }

    setStep('success');
    onPurchaseComplete(workflow.id);
  };

  const handlePaymentSuccess = (paymentIntentId: string) => {
    if (paymentIntentId === 'already_purchased') {
      // User already owns this workflow
      setStep('success');
      onPurchaseComplete(workflow.id);
      return;
    }

    // Store purchase info temporarily for download
    sessionStorage.setItem('recent_purchase', JSON.stringify({
      workflowId: workflow.id,
      paymentIntentId,
      timestamp: Date.now()
    }));

    setStep('success');
    onPurchaseComplete(workflow.id);
  };

  const handlePaymentError = (error: string) => {
    setErrorMessage(error);
    setStep('error');
  };

  const resetModal = () => {
    setStep('checkout');
    setErrorMessage('');
    setIsProcessing(false);
  };

  const handleDownload = () => {
    // Use the actual n8n workflow data if available, otherwise create a basic structure
    let downloadContent;
    
    if (workflow.n8nData) {
      // Use the real n8n workflow format
      downloadContent = {
        name: workflow.title,
        nodes: workflow.n8nData.nodes,
        connections: workflow.n8nData.connections,
        active: false,
        settings: workflow.n8nData.settings || {},
        staticData: workflow.n8nData.staticData || {},
        pinData: workflow.n8nData.pinData || {},
        versionId: workflow.n8nVersionId || undefined,
        meta: {
          templateCredsSetupCompleted: false,
          instanceId: undefined
        },
        id: workflow.n8nId || undefined,
        tags: []
      };
    } else {
      // Fallback for workflows without n8n data - create a minimal n8n structure
      downloadContent = {
        name: workflow.title,
        nodes: [
          {
            parameters: {},
            type: "n8n-nodes-base.start",
            typeVersion: 1,
            position: [240, 300],
            id: "start-node",
            name: "Start"
          },
          {
            parameters: {
              notice: `This is a template for: ${workflow.title}\n\nDescription: ${workflow.description}\n\nIntegrations: ${workflow.integrations.join(', ')}\n\nPlease configure the nodes according to your needs.`
            },
            type: "n8n-nodes-base.noOp",
            typeVersion: 1,
            position: [460, 300],
            id: "template-info",
            name: "Template Info"
          }
        ],
        connections: {
          "Start": {
            "main": [
              [
                {
                  "node": "Template Info",
                  "type": "main",
                  "index": 0
                }
              ]
            ]
          }
        },
        active: false,
        settings: {},
        staticData: {},
        pinData: {},
        meta: {
          templateCredsSetupCompleted: false
        },
        tags: []
      };
    }

    // Create and download file
    const blob = new Blob([JSON.stringify(downloadContent, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workflow.title.toLowerCase().replace(/\s+/g, '-')}-workflow.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white shadow-xl border-slate-200 rounded-xl">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-3 top-3 h-8 w-8 p-0 hover:bg-slate-100"
          >
            <X className="h-4 w-4 text-slate-500" />
          </Button>
          
          {step === 'checkout' && (
            <>
              <CardTitle className="flex items-center gap-2 text-slate-900 text-xl">
                {workflow.isFree ? (
                  <Download className="h-5 w-5 text-green-600" />
                ) : (
                  <ShoppingCart className="h-5 w-5 text-slate-700" />
                )}
                {workflow.isFree ? 'Download Workflow' : 'Purchase Workflow'}
              </CardTitle>
              <CardDescription className="text-slate-600">{workflow.title}</CardDescription>
            </>
          )}

          {step === 'processing' && (
            <>
              <CardTitle className="flex items-center gap-2 text-slate-900 text-xl">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-700"></div>
                Processing...
              </CardTitle>
              <CardDescription className="text-slate-600">Please wait while we process your purchase</CardDescription>
            </>
          )}

          {step === 'success' && (
            <>
              <CardTitle className="flex items-center gap-2 text-green-600 text-xl">
                <Check className="h-5 w-5" />
                Purchase Complete!
              </CardTitle>
              <CardDescription className="text-slate-600">Your workflow is ready to download</CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-6 pt-2">
          {step === 'checkout' && (
            <>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{workflow.title}</span>
                  <span className="font-semibold text-slate-900">
                    {workflow.isFree ? 'Free' : `$${workflow.price}`}
                  </span>
                </div>
                
                {!workflow.isFree && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Processing fee</span>
                      <span className="text-slate-700">$0.00</span>
                    </div>
                    <hr className="border-slate-200" />
                    <div className="flex items-center justify-between font-semibold text-slate-900">
                      <span>Total</span>
                      <span>${workflow.price}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">What&apos;s included:</h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-500" />
                    Complete N8N workflow JSON file
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-500" />
                    Setup documentation
                  </li>
                  <li className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-slate-500" />
                    Integration guides
                  </li>
                  {!workflow.isFree && (
                    <li className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-slate-500" />
                      Email support for 30 days
                    </li>
                  )}
                </ul>
              </div>

              {workflow.isFree ? (
                <Button
                  onClick={handleFreeDownload}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Free Workflow
                </Button>
              ) : (
                <>
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-slate-800 text-sm">
                      <Lock className="h-4 w-4 text-slate-600" />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Your payment is processed securely. We never store your payment information.
                    </p>
                  </div>

                  <Elements stripe={stripePromise}>
                    <PaymentForm
                      workflow={workflow}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </Elements>
                </>
              )}

              <p className="text-xs text-slate-500 text-center">
                By {workflow.isFree ? 'downloading' : 'purchasing'}, you agree to our Terms of Service and Privacy Policy
              </p>
            </>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-700 mx-auto mb-4"></div>
              <p className="text-slate-600">
                {workflow.isFree ? 'Preparing your download...' : 'Processing your payment...'}
              </p>
            </div>
          )}

          {step === 'error' && (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <AlertCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <h3 className="font-semibold text-red-800 mb-1">
                  Payment Failed
                </h3>
                <p className="text-sm text-red-700">
                  {errorMessage}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={resetModal}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50"
                >
                  Try Again
                </Button>
                <Button
                  onClick={onClose}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-800 mb-1">
                  {workflow.isFree ? 'Download Ready!' : 'Payment Successful!'}
                </h3>
                <p className="text-sm text-green-700">
                  Your workflow is now available for download
                </p>
              </div>

              <Button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white transition-colors"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Workflow File
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-slate-600">
                  Need help with setup?
                </p>
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                  View Documentation
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}