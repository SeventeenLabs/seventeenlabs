"use client";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
const frames = [
  {
    image: "/Mountain Path Solitude.png",
    title: "Worlds worth getting lost in.",
    tag: "WORLD BUILDING",
    alt: "A traveler walks toward a dramatic mountain peak in warm evening light",
  },
  {
    image: "/Surreal Space Scene.png",
    title: "A different kind of possible.",
    tag: "NEW PERSPECTIVES",
    alt: "An imagined celestial landscape with a luminous horizon",
  },
  {
    image: "/Digital Forest Harmony.png",
    title: "Let the unexpected in.",
    tag: "VISUAL EXPLORATION",
    alt: "A dreamlike forest with richly colored foliage and atmospheric light",
  },
];
export function CreativeGallery() {
  const [active, setActive] = useState(0);
  return (
    <section className="sl-gallery">
      <div className="sl-container">
        <div className="sl-section-heading">
          <div>
            <p className="sl-eyebrow">ROOM TO IMAGINE</p>
            <h2>
              There’s more than
              <br />
              one way to see it.
            </h2>
          </div>
          <p className="sl-heading-aside">
            Strange worlds. Familiar feelings.
            <br />
            Tools for wherever the idea takes you.
          </p>
        </div>
        <div className="sl-gallery-image">
          <Image
            key={frames[active].image}
            src={frames[active].image}
            alt={frames[active].alt}
            fill
            sizes="(max-width: 700px) 100vw, 90vw"
          />
          <div>
            <span className="sl-eyebrow">{frames[active].tag}</span>
            <h3>{frames[active].title}</h3>
          </div>
        </div>
        <div className="sl-gallery-controls">
          <span>
            Visual explorations{" "}
            <span className="sl-gallery-disclaimer">· Concept imagery</span>
          </span>
          <div>
            <span aria-live="polite">
              0{active + 1} <span className="sl-editor-muted">/ 03</span>
            </span>
            <button
              onClick={() =>
                setActive((active + frames.length - 1) % frames.length)
              }
              aria-label="Previous visual exploration"
            >
              <ArrowLeft size={19} />
            </button>
            <button
              onClick={() => setActive((active + 1) % frames.length)}
              aria-label="Next visual exploration"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
