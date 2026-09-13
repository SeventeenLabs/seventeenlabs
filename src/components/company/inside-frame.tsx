const cards = [
  {
    k: "Inspector",
    t: "Every property in one place",
    p: "Time, transform, layout, appearance, fill. The values a shot is made of, editable where the shot lives rather than in a dialog.",
    m: ["SPEED", "POSITION", "OPACITY", "BLENDING"],
  },
  {
    k: "Timeline",
    t: "Tracks that know what they hold",
    p: "Video, audio, captions, graphics and adjustment layers, each typed and stacked, with waveforms drawn where sound is.",
    m: ["8 TRACK TYPES", "WAVEFORMS", "ADJUSTMENT LAYERS"],
  },
  {
    k: "Generation",
    t: "A model is another source",
    p: "Generated material arrives on the timeline as a clip like any other — trimmed, moved and replaced with the same tools.",
    m: ["IN PLACE", "NO ROUND TRIP"],
  },
];

export function InsideFrame({ heading = "What you are looking at." }) {
  return (
    <div className="sl-inside">
      <div className="sl-inside-head">
        <p className="sl-eyebrow">INSIDE THE PREVIEW</p>
        <h3>{heading}</h3>
      </div>
      <div className="sl-inside-grid">
        {cards.map((c) => (
          <article key={c.k}>
            <span className="sl-inside-key">{c.k}</span>
            <h4>{c.t}</h4>
            <p>{c.p}</p>
            <div className="sl-inside-meta">
              {c.m.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
