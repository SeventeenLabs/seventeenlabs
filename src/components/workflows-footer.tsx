import Link from "next/link";
import { Zap, Mail, Twitter, Github, Linkedin } from "lucide-react";

export default function WorkflowsFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-blue-600" />
              <span className="font-bold">SeventeenLabs Workflows</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional N8N workflow templates to automate your business processes.
            </p>
            <div className="flex space-x-3">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Workflows */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Workflows</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/workflows" className="hover:text-foreground transition-colors">
                  Browse All
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=Free" className="hover:text-foreground transition-colors">
                  Free Templates
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=Premium" className="hover:text-foreground transition-colors">
                  Premium Templates
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=Sales%20%26%20CRM" className="hover:text-foreground transition-colors">
                  Sales & CRM
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=Marketing" className="hover:text-foreground transition-colors">
                  Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/workflows?category=E-commerce" className="hover:text-foreground transition-colors">
                  E-commerce
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=Data%20Processing" className="hover:text-foreground transition-colors">
                  Data Processing
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=Communication" className="hover:text-foreground transition-colors">
                  Communication
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=Finance" className="hover:text-foreground transition-colors">
                  Finance
                </Link>
              </li>
              <li>
                <Link href="/workflows?category=HR%20%26%20Recruiting" className="hover:text-foreground transition-colors">
                  HR & Recruiting
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  About SeventeenLabs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Custom Workflows
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-foreground transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="h-3 w-3" />
                  <span className="text-xs">workflows@seventeenlabs.io</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-xs text-muted-foreground">
            © 2025 SeventeenLabs. All rights reserved.
          </p>
          <div className="flex space-x-6 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-foreground transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}