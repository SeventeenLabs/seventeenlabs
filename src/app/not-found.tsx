import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import SiteFooter from "@/components/site-footer";
export default function NotFound() {
  return (
    <>
      <LandingHeader />
      <main id="main" className="sl-site">
        <section
          className="sl-inner-hero sl-container"
          style={{ minHeight: "75vh" }}
        >
          <p className="sl-eyebrow">404 / OUT OF FRAME</p>
          <h1>A little off the timeline.</h1>
          <p>
            This page isn’t here. Let’s get you back to what we’re building.
          </p>
          <div className="sl-button-row">
            <Link className="sl-button sl-button-primary" href="/">
              Back to the homepage <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
