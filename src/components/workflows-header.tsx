"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Zap, ShoppingCart, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePurchase } from "@/contexts/purchase-context";

export default function WorkflowsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { purchasedWorkflows } = usePurchase();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <Zap className="h-6 w-6 text-blue-600" />
            <span className="hidden font-bold sm:inline-block">
              SeventeenLabs Workflows
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
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
              Free Workflows
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/workflows?category=Premium"
            >
              Premium
            </Link>
            <Link
              className="transition-colors hover:text-foreground/80 text-foreground/60"
              href="/"
            >
              About
            </Link>
          </nav>
        </div>
        
        <button
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          <span className="sr-only">Toggle Menu</span>
        </button>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search workflows..."
                className="inline-flex items-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64 pl-8"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative">
              <User className="h-4 w-4" />
              <span className="sr-only">Account</span>
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
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="flex flex-col space-y-2 p-4">
            <Link
              className="text-sm font-medium transition-colors hover:text-foreground/80"
              href="/workflows"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse Workflows
            </Link>
            <Link
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              href="/workflows?category=Free"
              onClick={() => setIsMenuOpen(false)}
            >
              Free Workflows
            </Link>
            <Link
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              href="/workflows?category=Premium"
              onClick={() => setIsMenuOpen(false)}
            >
              Premium
            </Link>
            <Link
              className="text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60"
              href="/"
              onClick={() => setIsMenuOpen(false)}
            >
              About SeventeenLabs
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}