import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CompanyCTA } from "./company-cta";
export function CompanyAboutPage() {
  return (
    <main id="main" className="sl-site">
      <section className="sl-inner-hero sl-container">
        <p className="sl-eyebrow">ABOUT SEVENTEENLABS</p>
        <h1>
          Independent minds.
          <br />A shared curiosity
          <br />
          for what comes next.
        </h1>
        <p>
          We’re an open project building tools for the generative
          media era. Starting with a new way to make films.
        </p>
      </section>
      <div className="sl-wide-image">
        <Image
          src="/images/company-hero.png"
          alt="A traveler looking toward an open horizon across an imagined world"
          fill
          priority
          sizes="100vw"
        />
      </div>
      <section className="sl-about-body sl-container">
        <p className="sl-eyebrow">WHY WE’RE HERE</p>
        <div>
          <h2>
            Great tools make room
            <br />
            for your imagination.
          </h2>
          <p>
            The way we make images, films, and stories is changing. Generative
            technology is opening doors that were hard to imagine a few years
            ago. But possibility alone isn’t a creative process.
          </p>
          <p>
            We believe the next generation of creative software should connect
            that possibility to the way people actually work: experimenting,
            making choices, refining details, and finding something they
            couldn’t have planned.
          </p>
          <p>
            That’s why we’re building SeventeenLabs. A project for creative
            tools that give ideas somewhere to go.
          </p>
        </div>
      </section>
      <section className="sl-about-body sl-container">
        <p className="sl-eyebrow">ONE COMPANY. ROOM TO GROW.</p>
        <div>
          <h2>
            Filmmaking is
            <br />
            our first chapter.
          </h2>
          <p>
            Our first product is Frame, a generative video editor, bringing models
            directly into the timeline. A place to shape a film, explore a new
            take, and move between creating and editing without losing the
            thread.
          </p>
          <p>
            SeventeenLabs is the project around it. As the possibilities of
            generative media grow, there’s room for new tools to join the
            family.
          </p>
          <Link href="/frame" className="sl-text-link">
            Explore Frame <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <CompanyCTA />
    </main>
  );
}
