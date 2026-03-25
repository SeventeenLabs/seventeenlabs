"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, Mail, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePurchase } from "@/contexts/purchase-context";
import Image from "next/image";
import WorkflowsLogo from "../../public/SeventeenLabsWorkflowsLogo.svg";

export default function WorkflowsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const { purchasedWorkflows, purchasedWorkflowDetails, userEmail, setUserEmail } = usePurchase();

  const handleEmailSubmit = async (e: React.FormEvent) => {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto w-full max-w-[94rem] px-2.5 sm:px-3 lg:px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center" href="/">
            <Image
              src={WorkflowsLogo}
              alt="SeventeenLabs Workflows"
              height={40}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="/"
            >
              Browse
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/?category=Free"
            >
              Free
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/?category=Premium"
            >
              Premium
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Toggle Menu</span>
            </Button>

            {/* Desktop actions */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart className="h-4 w-4" />
                {purchasedWorkflows.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-[10px] font-medium text-white flex items-center justify-center">
                    {purchasedWorkflows.length}
                  </span>
                )}
                <span className="sr-only">Purchased workflows</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="mx-auto w-full max-w-[94rem] px-2.5 sm:px-3 lg:px-4">
            <nav className="flex flex-col space-y-1 py-4">
              <Link
                className="px-3 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md"
                href="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse All
              </Link>
              <Link
                className="px-3 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md text-muted-foreground"
                href="/?category=Free"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Workflows
              </Link>
              <Link
                className="px-3 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md text-muted-foreground"
                href="/?category=Premium"
                onClick={() => setIsMenuOpen(false)}
              >
                Premium
              </Link>
            </nav>
          </div>
        </div>
      )}

      {/* Cart Panel */}
      {isCartOpen && (
        <div className="absolute top-16 right-4 w-96 z-50">
          <Card className="shadow-2xl border-slate-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">My Workflows</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <CardDescription>
                Manage your purchased workflows and account
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Email Verification Section */}
              {!userEmail ? (
                <div className="border border-slate-200 rounded-lg p-4">
                  <h3 className="font-medium text-slate-900 mb-2">Sign In</h3>
                  <p className="text-sm text-slate-600 mb-3">
                    Enter your email to access your purchased workflows
                  </p>
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={isVerifying || !email.trim()}
                      size="sm"
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
                          Sign In
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-slate-900">Signed in as:</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleChangeEmail}
                      className="text-xs"
                    >
                      Change
                    </Button>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{userEmail}</p>
                </div>
              )}

              {/* Purchased Workflows */}
              <div>
                <h3 className="font-medium text-slate-900 mb-3">
                  Your Workflows ({purchasedWorkflows.length})
                </h3>
                
                {purchasedWorkflowDetails.length > 0 ? (
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {purchasedWorkflowDetails.map((workflow) => (
                      <div key={workflow.workflowId} className="flex items-center justify-between p-2 bg-slate-50 rounded-md">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900 truncate">
                            {workflow.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              Purchased
                            </Badge>
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                        </div>
                        <Link href={`/workflows/${workflow.workflowId}`}>
                          <Button variant="ghost" size="sm" className="text-xs">
                            View
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-600 text-center py-4">
                    {userEmail ? 'No workflows purchased yet' : 'Sign in to see your workflows'}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="border-t border-slate-200 pt-4">
                <Link href="/" onClick={() => setIsCartOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Browse More Workflows
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Backdrop for cart panel */}
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsCartOpen(false)}
        />
      )}
    </header>
  );
}