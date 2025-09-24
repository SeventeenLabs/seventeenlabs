import Link from "next/link";
import { Zap, Mail, Github, Linkedin } from "lucide-react";

export default function WorkflowsFooter() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
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
                href="https://github.com/seventeenlabs"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/company/seventeenlabs"
                className="text-muted-foreground hover:text-foreground transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Browse</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  All Workflows
                </Link>
              </li>
              <li>
                <Link href="/?category=Free" className="hover:text-foreground transition-colors">
                  Free Templates
                </Link>
              </li>
              <li>
                <Link href="/?category=Premium" className="hover:text-foreground transition-colors">
                  Premium Templates
                </Link>
              </li>
              <li>
                <Link href="/?category=Sales%20%26%20CRM" className="hover:text-foreground transition-colors">
                  Sales & CRM
                </Link>
              </li>
              <li>
                <Link href="/?category=Marketing" className="hover:text-foreground transition-colors">
                  Marketing
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
                  SeventeenLabs Agency
                </Link>
              </li>
              <li>
                <Link href="mailto:workflows@seventeenlabs.io" className="hover:text-foreground transition-colors flex items-center">
                  <Mail className="h-3 w-3 mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/?category=Data%20Processing" className="hover:text-foreground transition-colors">
                  Custom Workflows
                </Link>
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
          </div>
        </div>
      </div>
    </footer>
  );
}