"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Loader2 } from "lucide-react";
import { usePurchase } from '@/contexts/purchase-context';

export default function EmailVerification() {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { setUserEmail, userEmail } = usePurchase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) return;
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    setIsVerifying(true);
    
    try {
      // Set the email in context, which will trigger purchase verification
      setUserEmail(email.trim());
    } catch (error) {
      console.error('Error setting user email:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleChangeEmail = () => {
    setUserEmail('');
    setEmail('');
  };

  if (userEmail) {
    return (
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-slate-900">Signed in as:</p>
                <p className="text-sm text-slate-600">{userEmail}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleChangeEmail}
            >
              Change Email
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Verify Your Purchases</CardTitle>
        <CardDescription>
          Enter your email to see workflows you've already purchased and enable secure downloads.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          </div>
          
          <Button
            type="submit"
            disabled={isVerifying || !email.trim()}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            {isVerifying ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Mail className="mr-2 h-4 w-4" />
                Verify Email
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}