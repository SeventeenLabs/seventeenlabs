import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EditorPreview } from "@/components/company/editor-preview";
import { CreativeGallery } from "@/components/company/creative-gallery";
import { CompanyCTA } from "@/components/company/company-cta";
import { FrameLockup } from "@/components/company/brand-mark";
import { HeroMedia } from "@/components/company/hero-media";
import { InsideFrame } from "@/components/company/inside-frame";
export default function SeventeenLabsLanding() {
  return (
    <main id="main" className="sl-site">
      <section className="sl-hero" aria-labelledby="hero-title">
        <HeroMedia />
        <div className="sl-hero-shade" />
        <div className="sl-hero-content">
          <p className="sl-eyebrow">
            <span className="sl-dot" /> IMAGINATION, IN MOTION
          </p>
          <h1 id="hero-title">
            Creative software
            <br />
            for generative media.
          </h1>
          <p className="sl-hero-description">
            We build tools for a new generation of filmmakers.
            <br className="sl-desktop-break" /> From the first idea to the final
            frame.
          </p>
          <div className="sl-button-row">
            <Link href="/frame" className="sl-button sl-button-primary">
              Explore what we’re building <ArrowUpRight size={17} />
            </Link>
            <Link href="/about" className="sl-button sl-button-outline">
              Meet SeventeenLabs <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
      <section id="possibilities" className="sl-intro sl-container">
        <p className="sl-eyebrow">THE NEXT CREATIVE CHAPTER</p>
        <div>
          <h2>
            The possibilities are changing.
            <br />
            <span>The tools should, too.</span>
          </h2>
          <p>
            Generative models are opening up entirely new ways to create. We’re
            building the software that puts those possibilities into your hands,
            with the precision, freedom, and flow that creative work deserves.
          </p>
        </div>
      </section>
      <section id="products" className="sl-product-section sl-container">
        <div className="sl-section-heading">
          <div>
            <p className="sl-eyebrow">OUR FIRST PRODUCT · IN DEVELOPMENT</p>
            <FrameLockup />
            <h2>
              One timeline.
              <br />A whole new way to create.
            </h2>
          </div>
          <div className="sl-heading-aside">
            <p>
              Frame is a generative video editor, built to bring your footage,
              your ideas, and generative models into the same creative space.
            </p>
            <Link className="sl-text-link" href="/frame">
              Discover Frame <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
        <EditorPreview />
        <InsideFrame />
        <div className="sl-product-caption">
          <span>A glimpse of what we’re building.</span>
          <span>Concept preview · Interface in development</span>
        </div>
      </section>
      <section id="capabilities" className="sl-capabilities sl-invert">
        <div className="sl-container">
        <div className="sl-section-heading">
          <div>
            <p className="sl-eyebrow">WHAT WE’RE BUILDING TOWARD</p>
            <h2>
              Built to hold
              <br />
              the whole process.
            </h2>
          </div>
          <div className="sl-heading-aside">
            <p>
              Four things Frame is being designed around. None of them are
              finished, and all of them are why we started.
            </p>
          </div>
        </div>
        {[
          {
            n: "01",
            title: "Footage and generation, side by side",
            text: "What you shot and what you generate live on the same timeline, so choosing between them is a creative decision rather than a technical one.",
            labels: ["ONE TIMELINE", "IN DEVELOPMENT"],
          },
          {
            n: "02",
            title: "Generation where the work happens",
            text: "Prompting, revising and placing a shot without leaving the edit. Less moving between tools, more staying with the idea.",
            labels: ["IN THE WORKFLOW", "NO ROUND TRIPS"],
          },
          {
            n: "03",
            title: "The details stay yours",
            text: "Direction, timing, texture, feeling. The model can propose; the cut is still yours to make.",
            labels: ["YOU DECIDE"],
          },
          {
            n: "04",
            title: "From the first idea to the final frame",
            text: "A place for the rough version and the finished one, without starting again somewhere else when the work gets serious.",
            labels: ["EARLY TO FINAL"],
          },
        ].map((item) => (
          <article key={item.n} className="sl-cap-row">
            <span className="sl-cap-index">{item.n}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
            <div className="sl-cap-labels">
              {item.labels.map((l) => (
                <span key={l}>{l}</span>
              ))}
            </div>
          </article>
        ))}
        </div>
      </section>
      <section id="fit" className="sl-spec sl-container">
        <div>
          <div className="sl-section-heading">
            <div>
              <p className="sl-eyebrow">HOW IT FITS</p>
              <h2>
                The round trip,
                <br />
                removed.
              </h2>
            </div>
            <div className="sl-heading-aside">
              <p>
                What the work looks like now, and what Frame is being built to
                replace. The right-hand column is intent, not a feature list.
              </p>
            </div>
          </div>
          <div className="sl-spec-head">
            <span />
            <span>Today</span>
            <span>The intent</span>
          </div>
          {[
            {
              t: "Trying an idea",
              a: "Export a plate, prompt somewhere else, download, re-import, re-cut.",
              b: "Generate against the shot where it already sits on the timeline.",
            },
            {
              t: "Changing your mind",
              a: "Start the round trip again, and hope the new version still cuts.",
              b: "Adjust and re-run in place, with the edit around it intact.",
            },
            {
              t: "Keeping track",
              a: "Versions spread across tools, folders and file names.",
              b: "One project holds every attempt, in the order you made them.",
            },
            {
              t: "Finishing",
              a: "Rebuild the edit in a finishing tool once the look is agreed.",
              b: "The same timeline carries from the first rough to the last frame.",
            },
          ].map((row) => (
            <div key={row.t} className="sl-spec-row">
              <h3>{row.t}</h3>
              <p>{row.a}</p>
              <p>{row.b}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="approach" className="sl-approach sl-container">
        <p className="sl-eyebrow">BUILT AROUND THE WAY YOU THINK</p>
        <div className="sl-approach-content">
          <h2>
            More possibility.
            <br />
            Still your vision.
          </h2>
          <div className="sl-principles">
            {[
              {
                n: "01",
                title: "The creative comes first.",
                text: "Start with what you want to make. The technology should follow your intent and give you room to explore.",
              },
              {
                n: "02",
                title: "Generation belongs in the workflow.",
                text: "Creating and editing should be one continuous process. Less moving between tools. More staying with the idea.",
              },
              {
                n: "03",
                title: "You make the decisions.",
                text: "Direction, timing, texture, feeling. The details that make the work yours should always remain in your hands.",
              },
            ].map((item) => (
              <article key={item.n}>
                <span>{item.n}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CreativeGallery />
      <section id="who" className="sl-who sl-invert">
        <div className="sl-container">
          <div className="sl-section-heading">
            <div>
              <p className="sl-eyebrow">WHO IT’S FOR</p>
              <h2>
                Made for people
                <br />
                who finish things.
              </h2>
            </div>
            <div className="sl-heading-aside">
              <p>
                Frame is being shaped with a specific kind of work in mind.
                If this sounds like yours, we want to hear from you.
              </p>
            </div>
          </div>
          <div className="sl-who-grid">
            {[
              {
                n: "01",
                t: "Directors and editors",
                p: "You cut your own work, and you want generation on the timeline rather than in a browser tab you keep switching to.",
              },
              {
                n: "02",
                t: "Small studios",
                p: "A few people, a lot of output, and no appetite for another tool to administer on top of the ones you already run.",
              },
              {
                n: "03",
                t: "Anyone starting from nothing",
                p: "No footage yet — an idea and a deadline. The timeline is where it stops being a pitch and starts being a film.",
              },
            ].map((c) => (
              <div key={c.n}>
                <span>{c.n}</span>
                <h3>{c.t}</h3>
                <p>{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="sl-company-strip sl-container">
        <p className="sl-eyebrow">THE PROJECT BEHIND THE TOOLS</p>
        <div>
          <h2>
            A little lab.
            <br />A wider lens.
          </h2>
          <p>
            SeventeenLabs is an open project building creative software for
            generative media. It is not a company with a roadmap to defend —
            it is a place where the tools get made in public, starting with
            filmmaking.
          </p>
          <Link className="sl-text-link" href="/about">
            More about SeventeenLabs <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <section id="access" className="sl-access sl-container">
        <div>
        <div className="sl-section-heading">
          <div>
            <p className="sl-eyebrow">HOW TO GET INVOLVED</p>
            <h2>Ways in.</h2>
          </div>
          <div className="sl-heading-aside">
            <p>
              Frame is in development. These are the three doors that are
              open while it is.
            </p>
          </div>
        </div>
        <div className="sl-cards">
          <div className="sl-card">
            <div className="sl-card-labels">
              <span>BY APPLICATION</span>
              <span>WHILE IN DEVELOPMENT</span>
            </div>
            <h3>Early access</h3>
            <p>
              We’re working with a small group of filmmakers and studios
              while Frame takes shape. Tell us what you make.
            </p>
            <Link className="sl-text-link" href="/apply">
              Apply for access <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="sl-card">
            <div className="sl-card-labels">
              <span>OCCASIONAL</span>
              <span>NO NOISE</span>
            </div>
            <h3>Product updates</h3>
            <p>
              News as Frame comes together, and an invitation when the next
              group opens up.
            </p>
            <Link className="sl-text-link" href="/apply">
              Join the list <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="sl-card">
            <div className="sl-card-labels">
              <span>DIRECT</span>
              <span>NO TICKET SYSTEM</span>
            </div>
            <h3>Talk to us</h3>
            <p>
              Working on something that needs tools which don’t exist yet?
              That’s the conversation we want to have.
            </p>
            <a className="sl-text-link" href="mailto:hello@seventeenlabs.io">
              hello@seventeenlabs.io <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        </div>
      </section>
      <section id="next" className="sl-steps sl-container">
        <div className="sl-section-heading">
          <div>
            <p className="sl-eyebrow">WHAT HAPPENS NEXT</p>
            <h2>Three steps, no theatre.</h2>
          </div>
          <div className="sl-heading-aside">
            <p>
              What applying for early access actually involves, so you know
              before you spend two minutes on it.
            </p>
          </div>
        </div>
        {[
          {
            n: "01",
            t: "You tell us what you make",
            p: "A short form. What you’re working on, and what keeps getting in the way of it.",
          },
          {
            n: "02",
            t: "We talk",
            p: "A conversation rather than a demo script. We’re working out whether Frame is useful to you yet — the answer is sometimes no.",
          },
          {
            n: "03",
            t: "You get in, or you get a date",
            p: "Groups are small while it’s in development. If this isn’t the right moment we’ll say so, rather than leave you on a list.",
          },
        ].map((step) => (
          <article key={step.n} className="sl-step">
            <span>{step.n}</span>
            <h3>{step.t}</h3>
            <p>{step.p}</p>
          </article>
        ))}
      </section>
      <section id="faq" className="sl-faq sl-container">
        <div>
          <p className="sl-eyebrow">QUESTIONS</p>
          <h2>Before you ask.</h2>
        </div>
        <div>
          {[
            {
              q: "Can I use Frame today?",
              a: "Not yet. It’s in development, and we’re working with a small group during early access. Applying puts you in line for the next one.",
            },
            {
              q: "What will it cost?",
              a: "Pricing isn’t set. We’d rather work out what the tool is worth with the people using it than announce a number before it’s finished.",
            },
            {
              q: "Which models will it work with?",
              a: "That’s part of what we’re working out. The intent is an editor that isn’t tied to one provider, so the models can change without the work changing.",
            },
            {
              q: "Is SeventeenLabs only building an editor?",
              a: "Frame is the first thing we are building. SeventeenLabs is the project around it — open work on creative software for generative media, with a wider set of tools in mind.",
            },
          ].map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <section id="status" className="sl-status sl-container">
        <div className="sl-section-heading">
          <div>
            <p className="sl-eyebrow">WHERE IT’S GOING</p>
            <h2>Honest about the state of it.</h2>
          </div>
          <div className="sl-heading-aside">
            <p>
              Frame is unfinished. This is what we’re working on, what
              we’re still figuring out, and what comes after.
            </p>
          </div>
        </div>
        {[
          {
            tag: "In development",
            title: "The timeline",
            text: "Footage and generated material on one timeline, with the editing tools you would expect around them.",
          },
          {
            tag: "Exploring",
            title: "Model integrations",
            text: "Which models, how they are addressed, and how to keep the editor from being tied to any one of them.",
          },
          {
            tag: "After that",
            title: "Working with others",
            text: "Review, hand-off and shared projects. Real questions, but not the ones we are answering first.",
          },
        ].map((row) => (
          <article key={row.tag} className="sl-status-row">
            <span className="sl-status-tag">{row.tag}</span>
            <div>
              <h3>{row.title}</h3>
              <p>{row.text}</p>
            </div>
          </article>
        ))}
      </section>
      <CompanyCTA />
    </main>
  );
}
