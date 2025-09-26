import Link from "next/link";
import { Mail, ExternalLink } from "lucide-react";

const mainLinks = [
  { label: "Workflows", href: "https://n8nworkflows.seventeenlabs.io", external: true },
  { label: "Apps & Tools", href: "/apps", external: false },
  { label: "Agency Services", href: "/agency", external: false },
];

const supportLinks = [
  { label: "Contact Us", href: "mailto:hello@seventeenlabs.io", external: true },
  { label: "Documentation", href: "/docs", external: false },
  { label: "Community", href: "https://discord.gg/seventeenlabs", external: true },
];

const companyLinks = [
  { label: "About", href: "/about", external: false },
  { label: "Blog", href: "/blog", external: false },
  { label: "Privacy", href: "/privacy", external: false },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 px-6 py-16 text-slate-200">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand & Contact */}
          <div className="space-y-4 md:col-span-1">
            <div className="text-2xl font-bold text-white">SeventeenLabs</div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Save time, cut costs, and grow smarter with AI tools, automation workflows, and expert agency services.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Mail className="size-4 text-slate-400" />
              <a 
                href="mailto:hello@seventeenlabs.io" 
                className="text-slate-300 hover:text-white transition-colors"
              >
                hello@seventeenlabs.io
              </a>
            </div>
          </div>

          {/* Main Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h3>
            <nav className="space-y-3">
              {mainLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.external && <ExternalLink className="size-3" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h3>
            <nav className="space-y-3">
              {supportLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                >
                  {link.label}
                  {link.external && <ExternalLink className="size-3" />}
                </Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <nav className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-sm text-slate-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-500">
            © {new Date().getFullYear()} SeventeenLabs. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <span>Made with ❤️ for small businesses</span>
            <div className="flex items-center gap-1">
              <div className="size-2 rounded-full bg-slate-500 animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
