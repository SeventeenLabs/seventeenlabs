"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePurchase } from "@/contexts/purchase-context";

export default function WorkflowsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { purchasedWorkflows } = usePurchase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link className="flex items-center" href="/workflows">
            <div className="relative flex items-baseline">
              <span className="font-bold text-base">SeventeenLabs</span>
              <span className="font-mono text-xs text-blue-900 ml-1 -translate-y-2">
                Workflows
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="/workflows"
            >
              Browse
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/workflows?category=Free"
            >
              Free
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/workflows?category=Premium"
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
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <User className="h-4 w-4 mr-2" />
                  Agency
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="relative">
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
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col space-y-1 py-4">
              <Link
                className="px-3 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md"
                href="/workflows"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse All
              </Link>
              <Link
                className="px-3 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md text-muted-foreground"
                href="/workflows?category=Free"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Workflows
              </Link>
              <Link
                className="px-3 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md text-muted-foreground"
                href="/workflows?category=Premium"
                onClick={() => setIsMenuOpen(false)}
              >
                Premium
              </Link>
              <div className="border-t pt-2 mt-2">
                <Link
                  className="px-3 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md text-muted-foreground flex items-center"
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Back to Agency
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}