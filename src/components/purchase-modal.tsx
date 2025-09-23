"use client";

import { useState } from "react";
import { X, ShoppingCart, Download, CreditCard, Lock, Check, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PurchaseModalProps {
  workflow: {
    id: number;
    title: string;
    price: number;
    isFree: boolean;
    description: string;
    integrations: string[];
  };
  isOpen: boolean;
  onClose: () => void;
  onPurchaseComplete: (workflowId: number) => void;
}

export default function PurchaseModal({ workflow, isOpen, onClose, onPurchaseComplete }: PurchaseModalProps) {
  const [step, setStep] = useState<'checkout' | 'processing' | 'success'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsProcessing(true);
    setStep('processing');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Store purchase in localStorage (in real app, this would be backend)
    const purchases = JSON.parse(localStorage.getItem('purchased_workflows') || '[]');
    if (!purchases.includes(workflow.id)) {
      purchases.push(workflow.id);
      localStorage.setItem('purchased_workflows', JSON.stringify(purchases));
    }

    setStep('success');
    onPurchaseComplete(workflow.id);
  };

  const handleDownload = () => {
    // Generate download file content
    const downloadContent = {
      workflow: {
        id: workflow.id,
        title: workflow.title,
        description: workflow.description,
        integrations: workflow.integrations,
      },
      n8nWorkflow: {
        name: workflow.title,
        nodes: [
          {
            id: "trigger",
            type: "webhook",
            name: "Webhook Trigger",
            position: [250, 300],
            parameters: {
              path: "workflow-webhook",
              httpMethod: "POST"
            }
          },
          {
            id: "process",
            type: "function",
            name: "Process Data",
            position: [450, 300],
            parameters: {
              functionCode: "// Your workflow processing logic here\nreturn items;"
            }
          }
        ],
        connections: {
          "trigger": {
            "main": [
              [
                {
                  "node": "process",
                  "type": "main",
                  "index": 0
                }
              ]
            ]
          }
        }
      },
      installation: {
        steps: [
          "1. Import this JSON file into N8N",
          "2. Configure your integrations",
          "3. Test the workflow",
          "4. Activate when ready"
        ],
        documentation: "https://docs.seventeenlabs.io/workflows/" + workflow.id
      }
    };

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
          
          {step === 'checkout' && (
            <>
              <CardTitle className="flex items-center gap-2">
                {workflow.isFree ? (
                  <Download className="h-5 w-5 text-green-600" />
                ) : (
                  <ShoppingCart className="h-5 w-5 text-blue-600" />
                )}
                {workflow.isFree ? 'Download Workflow' : 'Purchase Workflow'}
              </CardTitle>
              <CardDescription>{workflow.title}</CardDescription>
            </>
          )}

          {step === 'processing' && (
            <>
              <CardTitle className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                Processing...
              </CardTitle>
              <CardDescription>Please wait while we process your purchase</CardDescription>
            </>
          )}

          {step === 'success' && (
            <>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <Check className="h-5 w-5" />
                Purchase Complete!
              </CardTitle>
              <CardDescription>Your workflow is ready to download</CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 'checkout' && (
            <>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{workflow.title}</span>
                  <span className="font-medium">
                    {workflow.isFree ? 'Free' : `$${workflow.price}`}
                  </span>
                </div>
                
                {!workflow.isFree && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Processing fee</span>
                      <span>$0.00</span>
                    </div>
                    <hr className="border-gray-200" />
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${workflow.price}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">What&apos;s included:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Complete N8N workflow JSON file
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Setup documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Integration guides
                  </li>
                  {!workflow.isFree && (
                    <li className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Email support for 30 days
                    </li>
                  )}
                </ul>
              </div>

              {workflow.isFree ? (
                <Button
                  onClick={handlePurchase}
                  disabled={isProcessing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Free Workflow
                </Button>
              ) : (
                <>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-blue-800 text-sm">
                      <Lock className="h-4 w-4" />
                      <span className="font-medium">Secure Payment</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">
                      Your payment is processed securely. We never store your payment information.
                    </p>
                  </div>

                  <Button
                    onClick={handlePurchase}
                    disabled={isProcessing}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Complete Purchase - ${workflow.price}
                  </Button>
                </>
              )}

              <p className="text-xs text-gray-500 text-center">
                By {workflow.isFree ? 'downloading' : 'purchasing'}, you agree to our Terms of Service and Privacy Policy
              </p>
            </>
          )}

          {step === 'processing' && (
            <div className="py-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">
                {workflow.isFree ? 'Preparing your download...' : 'Processing your payment...'}
              </p>
            </div>
          )}

          {step === 'success' && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <Check className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-green-800 mb-1">
                  {workflow.isFree ? 'Download Ready!' : 'Payment Successful!'}
                </h3>
                <p className="text-sm text-green-700">
                  Your workflow is now available for download
                </p>
              </div>

              <Button
                onClick={handleDownload}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Workflow File
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Need help with setup?
                </p>
                <Button variant="outline" size="sm">
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