import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export function CompanyCTA() {
  return (
    <section className="sl-cta">
      <div className="sl-container">
        <p className="sl-eyebrow">LET’S MAKE SOMETHING NEW</p>
        <h2>
          The next frame
          <br />
          starts with you.
        </h2>
        <div>
          <p>
            Be part of what we’re building.
            <br />
            Get product news and early access updates.
          </p>
          <Link href="/apply" className="sl-button sl-button-primary">
            Get early access <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
