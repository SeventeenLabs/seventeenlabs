import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Agency", href: "/agency" },
  { label: "Workflows", href: "https://n8nworkflows.seventeenlabs.io", external: true },
  { label: "Apps", href: "/apps" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 px-4 py-12 text-slate-200 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <div className="text-lg font-semibold tracking-tight text-white">SeventeenLabs</div>
          <p className="text-sm text-slate-400">AI tools and automation for smarter marketing teams.</p>
          <a href="mailto:hello@seventeenlabs.io" className="text-sm text-slate-200 underline decoration-dotted underline-offset-4">
            hello@seventeenlabs.io
          </a>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-6 text-xs text-slate-500">
        © {new Date().getFullYear()} SeventeenLabs. All rights reserved.
      </div>
    </footer>
  );
}
