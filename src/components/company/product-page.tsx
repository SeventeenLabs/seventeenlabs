import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorPreview } from "./editor-preview";
import { InsideFrame } from "./inside-frame";
import { CompanyCTA } from "./company-cta";

const specs = [
  ["Format", "One timeline"],
  ["Sources", "Footage and generated"],
  ["Status", "In development"],
  ["Access", "By application"],
];

const stages = [
  {
    n: "01 / CREATE",
    t: "Start with an idea.",
    p: "Bring your references, existing footage, and creative direction into one project. Give every new shot a place in the bigger picture.",
  },
  {
    n: "02 / GENERATE",
    t: "Explore another take.",
    p: "Our intent is to bring generative models directly into the edit, so trying a new direction feels like part of the process rather than a detour out of it.",
  },
  {
    n: "03 / EDIT",
    t: "Make it your film.",
    p: "Shape the sequence, compare your shots, and find the rhythm. The timeline is where individual moments become a story.",
  },
];

const surfaces = [
  {
    t: "The project",
    p: "Assets, scenes and versions in one place, so a film is a thing you open rather than a folder you assemble.",
    m: ["ASSET BROWSER", "SCENES", "VERSIONS"],
  },
  {
    t: "The frame",
    p: "A viewer that shows the shot as it will be seen — safe areas, captions and graphics composited, not approximated.",
    m: ["16:9", "CAPTIONS", "LOWER THIRDS"],
  },
  {
    t: "The cut",
    p: "Trim, slip and reorder on typed tracks, with the same gestures whether a clip was filmed or generated.",
    m: ["TRIM", "REORDER", "ADJUSTMENT LAYERS"],
  },
];

const notYet = [
  ["Collaboration", "Review, comments and shared projects. Real needs, and not the ones we are solving first."],
  ["Colour and finishing", "Grading belongs in a finishing tool for now. We would rather hand off cleanly than do it badly."],
  ["A model list", "Which models Frame talks to is still open. Announcing one before it works would be a promise we cannot keep."],
];

const faqs = [
  [
    "Is Frame available yet?",
    "No. Frame is in development. Joining the early-access list puts you in line for an invitation; we have not announced a public launch date.",
  ],
  [
    "Who are you building it for?",
    "Independent filmmakers, small studios, and anyone turning generative material into a considered piece of work. We are starting with the process of creating and editing a film.",
  ],
  [
    "Which models will it support?",
    "That is still being worked out. The intent is an editor that is not tied to a single provider, so the models can change without the work changing.",
  ],
  [
    "How much will it cost?",
    "Pricing has not been announced. Joining the early-access list is free and commits you to nothing.",
  ],
  [
    "Will it replace my current editor?",
    "Not at first, and maybe not ever for finishing. Frame is being built for the part of the process where the shot is still being found.",
  ],
  [
    "What happens to my footage?",
    "Your material is yours. We will publish specifics on storage and processing before anyone outside early access uses Frame.",
  ],
];

export function CompanyProductPage() {
  return (
    <main id="main" className="sl-site">
      <section className="sl-inner-hero sl-frame-hero sl-container">
        <p className="sl-eyebrow">FRAME · IN DEVELOPMENT</p>
        <h1>
          Your next film.
          <br />A new kind of timeline.
        </h1>
        <div className="sl-button-row">
          <Link href="/apply" className="sl-button sl-button-primary">
            Get early access <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="sl-product-detail sl-container">
        <EditorPreview />
        <div className="sl-product-caption">
          <span>Select a shot to explore the concept.</span>
          <span>Concept preview · Interface in development</span>
        </div>
        <div className="sl-frame-intro">
          <p>
            Frame is a generative video editor. A place for your footage, your
            ideas, and generative models to work together.
          </p>
          <dl className="sl-spec-strip">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <InsideFrame />
      </section>

      <section id="surfaces" className="sl-who sl-invert">
        <div className="sl-container">
          <div className="sl-section-heading">
            <div>
              <p className="sl-eyebrow">THE THREE SURFACES</p>
              <h2>
                A project, a frame,
                <br />
                and a cut.
              </h2>
            </div>
            <div className="sl-heading-aside">
              <p>
                Everything in Frame happens in one of three places. Keeping it
                to three is the design, not a limitation of the preview.
              </p>
            </div>
          </div>
          <div className="sl-who-grid">
            {surfaces.map((s, i) => (
              <div key={s.t}>
                <span>0{i + 1}</span>
                <h3>{s.t}</h3>
                <p>{s.p}</p>
                <div className="sl-inside-meta">
                  {s.m.map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-product-detail sl-container">
        <div className="sl-detail-features">
          {stages.map((s) => (
            <div key={s.n}>
              <span>{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sl-status sl-container">
        <div className="sl-section-heading">
          <div>
            <p className="sl-eyebrow">NOT IN IT YET</p>
            <h2>What Frame does not do.</h2>
          </div>
          <div className="sl-heading-aside">
            <p>
              A short list is more useful than a long one full of things that
              only half work.
            </p>
          </div>
        </div>
        {notYet.map(([t, p]) => (
          <article key={t} className="sl-status-row">
            <span className="sl-status-tag">Not yet</span>
            <div>
              <h3>{t}</h3>
              <p>{p}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="sl-faq sl-container">
        <div>
          <p className="sl-eyebrow">QUESTIONS</p>
          <h2>
            A few things
            <br />
            you might be wondering.
          </h2>
        </div>
        <div>
          {faqs.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <CompanyCTA />
    </main>
  );
}
