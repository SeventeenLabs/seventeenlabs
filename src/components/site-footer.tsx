import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BrandLockup } from "@/components/company/brand-mark";
export default function SiteFooter() {
  return (
    <footer className="sl-footer">
      <div className="sl-container">
        <div className="sl-footer-top">
          <div>
            <Link href="/" className="sl-brand">
              <BrandLockup />
            </Link>
            <p>
              Independent minds.
              <br />
              New creative possibilities.
            </p>
          </div>
          <div className="sl-footer-links">
            <div>
              <span>Explore</span>
              <Link href="/frame">Frame</Link>
              <Link href="/#approach">Our approach</Link>
              <Link href="/apply">
                Early access <ArrowUpRight size={13} />
              </Link>
            </div>
            <div>
              <span>Project</span>
              <Link href="/about">About SeventeenLabs</Link>
              <a href="mailto:hello@seventeenlabs.io">
                Get in touch <ArrowUpRight size={13} />
              </a>
              <Link href="/privacy">Privacy policy</Link>
              <Link href="/terms">Terms of service</Link>
            </div>
          </div>
        </div>
        <div className="sl-footer-wordmark" aria-hidden="true">
          <BrandLockup />
        </div>
        <div className="sl-footer-bottom">
          <span>© {new Date().getFullYear()} SeventeenLabs</span>
          <span>Creative software for generative media.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
