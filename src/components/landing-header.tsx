"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { BrandLockup } from "@/components/company/brand-mark";

type NavItem = { label: string; href: string; note: string };
type NavGroup = { label: string; items: NavItem[] };

const groups: NavGroup[] = [
  {
    label: "Product",
    items: [
      {
        label: "Frame",
        href: "/frame",
        note: "The generative video editor, in development",
      },
      {
        label: "Our approach",
        href: "/#approach",
        note: "How we think the work should feel",
      },
      {
        label: "What it does",
        href: "/#capabilities",
        note: "Four things Frame is built around",
      },
    ],
  },
  {
    label: "Project",
    items: [
      {
        label: "About the project",
        href: "/about",
        note: "An open project, not a company",
      },
      {
        label: "Ways in",
        href: "/#access",
        note: "Early access, updates, or just a conversation",
      },
      {
        label: "Questions",
        href: "/#faq",
        note: "What we can and can't answer yet",
      },
    ],
  },
];

export default function LandingHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [notice, setNotice] = useState(true);
  const toggle = useRef<HTMLButtonElement>(null);
  const nav = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const home = ["/", "/en", "/de"].includes(pathname);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 32);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => {
    if (!open && !menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (menu) setMenu(null);
      else {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open, menu]);

  useEffect(() => {
    if (!menu) return;
    const away = (event: PointerEvent) => {
      if (!nav.current?.contains(event.target as Node)) setMenu(null);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [menu]);

  return (
    <header
      className={`sl-header ${scrolled || !home || open || menu ? "sl-header-solid" : ""}`}
    >
      <a className="sl-skip" href="#main">
        Skip to content
      </a>

      {notice && (
        <div className="sl-notice">
          <div className="sl-container">
            <p>
              <span>Early access</span> Frame is in development and open by
              application.
            </p>
            <Link href="/apply">
              Apply <ArrowUpRight size={12} />
            </Link>
            <button onClick={() => setNotice(false)} aria-label="Dismiss">
              <X size={13} />
            </button>
          </div>
        </div>
      )}

      <nav className="sl-nav sl-container" aria-label="Main navigation">
        <Link
          className="sl-brand"
          href="/"
          onClick={() => setOpen(false)}
          aria-label="SeventeenLabs home"
        >
          <BrandLockup />
        </Link>

        <div className="sl-nav-links" ref={nav} onMouseLeave={() => setMenu(null)}>
          {groups.map((group) => (
            <div
              key={group.label}
              className="sl-nav-group"
              onMouseEnter={() => setMenu(group.label)}
            >
              <button
                type="button"
                aria-expanded={menu === group.label}
                /* Opening is idempotent: hovering already opened it, so a
                   click must not toggle it shut. Escape and click-away close. */
                onClick={() => setMenu(group.label)}
              >
                {group.label}
                <ChevronDown size={14} />
              </button>
              {menu === group.label && (
                <div className="sl-nav-panel">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenu(null)}
                    >
                      <span>{item.label}</span>
                      <span>{item.note}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="sl-nav-actions">
          <a className="sl-nav-contact" href="mailto:hello@seventeenlabs.io">
            Contact
          </a>
          <Link className="sl-button sl-button-primary" href="/apply">
            Get early access <ArrowUpRight size={16} />
          </Link>
          <button
            ref={toggle}
            className="sl-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <nav
          id="mobile-navigation"
          className="sl-mobile-nav"
          aria-label="Mobile navigation"
        >
          {groups.map((group) => (
            <div key={group.label}>
              <p className="sl-eyebrow">{group.label}</p>
              {group.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  <ArrowUpRight size={20} />
                </Link>
              ))}
            </div>
          ))}
          <div>
            <p className="sl-eyebrow">Get in touch</p>
            <a href="mailto:hello@seventeenlabs.io">
              hello@seventeenlabs.io
              <ArrowUpRight size={20} />
            </a>
            <Link href="/apply" onClick={() => setOpen(false)}>
              Get early access
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
