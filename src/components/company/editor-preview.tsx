"use client";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronDown,
  Circle,
  Lock,
  Music2,
  Plus,
  Scissors,
  Search,
  Settings2,
  Sparkles,
  Square,
  Type,
  Volume2,
} from "lucide-react";

const shots = [
  {
    title: "The arrival",
    image: "/images/company-hero.png",
    time: "00:00:04:12",
    speaker: "Scene 01",
    caption: "The beginning of something.",
    prompt: "A lone traveler. An unfamiliar world.",
    length: "4.5s",
  },
  {
    title: "Beyond the ridge",
    image: "/Mountain Path Solitude.png",
    time: "00:00:09:00",
    speaker: "Scene 02",
    caption: "Over the ridge, the light changes.",
    prompt: "Follow the traveler over the ridge. Warm evening light.",
    length: "4.5s",
  },
  {
    title: "Another world",
    image: "/Surreal Space Scene.png",
    time: "00:00:14:08",
    speaker: "Scene 03",
    caption: "A world beyond the familiar.",
    prompt: "A new perspective on somewhere that does not exist.",
    length: "5.3s",
  },
];

const assets = [
  { src: "/images/company-hero.png", name: "C0021.MP4", dur: "04:32" },
  { src: "/Mountain Path Solitude.png", name: "C0023.MP4", dur: "00:17" },
  { src: "/Surreal Space Scene.png", name: "C0023.MP4", dur: "02:51" },
  { src: "/images/ai-shot-planning.png", name: "C0025.MP4", dur: "03:11" },
  { src: "/Digital Forest Harmony.png", name: "A001C014.MP4", dur: "09:14" },
  { src: "/Abstract Celestial Art.png", name: "GX0402.MP4", dur: "01:46" },
  { src: "/Fiery Abstract Artwork.png", name: "GX0431.MP4", dur: "04:26" },
  { src: "/images/ai-camera-workbench.png", name: "GX0447.MP4", dur: "10:21" },
  { src: "/hero-lone-walker.png", name: "B003.C09.MP4", dur: "02:13" },
  { src: "/images/ai-production-bible.png", name: "RX_2024.WAV", dur: "14:22" },
];

/* label, colour, and the clips as [left%, width%, label] */
const tracks: {
  name: string;
  kind: string;
  locked?: boolean;
  clips: [number, number, string][];
}[] = [
  {
    name: "Captions",
    kind: "cap",
    locked: true,
    clips: [
      [2, 11, "The streets are quiet"],
      [14, 12, "A good launch of the line"],
      [27, 9, "Perfect timing"],
      [37, 13, "The team has waited"],
      [51, 11, "Lap fourteen"],
      [63, 12, "He has surprising pace"],
      [76, 10, "Barcelona, in four"],
      [87, 11, "I can't believe my eyes"],
    ],
  },
  {
    name: "Sequence",
    kind: "adj",
    clips: [
      [2, 6, "Adjustment"],
      [9, 26, "Adjustment Layer"],
      [36, 7, "Adjust…"],
      [44, 8, "Adjust…"],
      [53, 21, "Adjustment Layer"],
      [75, 14, "Adjustment Layer"],
    ],
  },
  {
    name: "Graphics",
    kind: "html",
    locked: true,
    clips: [[5, 62, "HTML · Race Graphics"]],
  },
  {
    name: "Group",
    kind: "grp",
    clips: [
      [2, 7, "Logo.png"],
      [11, 4, "Sa…"],
      [16, 16, "Léo Vasseur · Driver…"],
      [34, 5, "Re…"],
      [40, 7, "Rectangle"],
      [49, 11, "Group"],
      [62, 6, "Rectangle"],
      [69, 8, "Scene · Grap…"],
      [79, 7, "Sponsor…"],
      [87, 9, "Group"],
    ],
  },
  {
    name: "B-Roll",
    kind: "vid",
    clips: [
      [12, 22, "Scene · S3 · Garage"],
      [35, 12, "C0021.mp4"],
      [49, 20, "Scene · S3 · Interview"],
      [71, 17, "B003.C093.MP4"],
    ],
  },
  {
    name: "A-Roll",
    kind: "vid2",
    clips: [
      [2, 13, "C0021.MP4"],
      [16, 9, "GX0403…"],
      [26, 11, "C0021.MP4"],
      [38, 15, "GX040317.MP4"],
      [54, 6, "C00…"],
      [61, 8, "GX040…"],
      [70, 12, "C0019.MP4"],
      [83, 13, "GX0403.MP4"],
    ],
  },
  {
    name: "Audio 1",
    kind: "aud",
    clips: [
      [2, 9, "Intro.mp3"],
      [12, 7, "Who…"],
      [20, 14, "ZOOM0025.WAV"],
      [35, 24, "Who…"],
      [60, 10, "ZOOM0025.W…"],
      [71, 16, "ZOOM0029.WAV"],
      [88, 10, "ZOOM0025.W…"],
    ],
  },
  {
    name: "Music Bed",
    kind: "mus",
    clips: [[2, 46, "background_warm_strings_loop.WAV"], [50, 46, "background_warm_strings_calm_loop.WAV"]],
  },
];

const inspector = [
  { group: "Time", rows: [["Speed", "100%"]] },
  {
    group: "Transform",
    rows: [
      ["Position", "X 0    Y 0"],
      ["Rotate", "0°"],
    ],
  },
  { group: "Layout", rows: [["Size", "W 1920   H 1080"]] },
  {
    group: "Appearance",
    rows: [
      ["Opacity", "100"],
      ["Blending", "Normal"],
    ],
  },
];

export function EditorPreview() {
  const [active, setActive] = useState(0);
  const shot = shots[active];

  return (
    <div className="sl-editor" aria-label="Concept preview of the Frame editor">
      <div className="sl-ed-bar">
        <div className="sl-ed-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span className="sl-ed-project">
          <Circle size={11} /> Monaco · 2026 <ChevronDown size={11} />
        </span>
        <span className="sl-editor-badge">CONCEPT PREVIEW</span>
      </div>

      <div className="sl-ed-body">
        {/* ---------- assets ---------- */}
        <aside className="sl-ed-assets">
          <div className="sl-ed-panel-head">
            <span>Assets ({assets.length * 12 + 1})</span>
            <span>
              <Settings2 size={11} />
              <Plus size={11} />
            </span>
          </div>
          <div className="sl-ed-search">
            <Search size={10} /> Search
          </div>
          <div className="sl-ed-asset-grid">
            {assets.map((a) => (
              <figure key={a.name + a.dur}>
                <span className="sl-ed-thumb">
                  <Image src={a.src} alt="" fill sizes="90px" />
                  <em>{a.dur}</em>
                </span>
                <figcaption>{a.name}</figcaption>
              </figure>
            ))}
          </div>
        </aside>

        {/* ---------- stage ---------- */}
        <div className="sl-ed-stage">
          <div className="sl-ed-stage-head">
            <span>
              ❙❙ {shot.speaker} · 1080p · S3 · L14 onboard · v04{" "}
              <em>Active</em>
            </span>
            <span className="sl-timecode">14:18</span>
          </div>
          <div className="sl-editor-frame">
            <Image
              key={shot.image}
              src={shot.image}
              alt={shot.prompt}
              fill
              sizes="(max-width: 900px) 90vw, 55vw"
            />
            <span className="sl-ed-lower-third">
              <strong>{shot.title}</strong>
              <em>#3 · LAP 14 / 22</em>
            </span>
            <span className="sl-ed-caption">{shot.caption}</span>
          </div>
          <div className="sl-ed-tools" aria-hidden="true">
            <button className="is-active">
              <Scissors size={12} />
            </button>
            <button>
              <Square size={12} />
            </button>
            <button>
              <Type size={12} />
            </button>
            <button>
              <Sparkles size={12} />
            </button>
            <button>
              <Music2 size={12} />
            </button>
          </div>
        </div>

        {/* ---------- inspector ---------- */}
        <aside className="sl-ed-inspector">
          <div className="sl-ed-panel-head">
            <span>Editor</span>
            <span>72%</span>
          </div>
          {inspector.map((section) => (
            <div key={section.group} className="sl-ed-section">
              <p>
                {section.group} <Plus size={10} />
              </p>
              {section.rows.map(([k, v]) => (
                <div key={k} className="sl-ed-field">
                  <span>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          ))}
          <div className="sl-ed-section">
            <p>
              Fill <Plus size={10} />
            </p>
            <div className="sl-ed-field">
              <span>Video</span>
              <span>GX040224 · 100%</span>
            </div>
          </div>
          {["Border", "Shadow", "Effects", "Animation", "Transition"].map(
            (row) => (
              <div key={row} className="sl-ed-collapsed">
                {row} <Plus size={10} />
              </div>
            ),
          )}
          <p className="sl-editor-concept-note">
            Generation, right where you edit.
          </p>
        </aside>
      </div>

      <div className="sl-ed-transport">
        <span className="sl-timecode">00:00:14:18</span>
        <span className="sl-ed-transport-keys" aria-hidden="true">
          <i /><i /><i /><i />
        </span>
        <span>24 fps · 1920×1080 · Rec.709</span>
      </div>

      {/* ---------- timeline ---------- */}
      <div className="sl-ed-timeline">
        <div className="sl-ed-ruler" aria-hidden="true">
          {["0", "5", "10", "15", "20", "25", "30", "35"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="sl-ed-tracks">
          <div className="sl-ed-playhead" />
            {tracks.map((track) => (
            <div key={track.name} className={`sl-ed-track is-${track.kind}`}>
              <span className="sl-ed-track-name">
                {track.locked ? <Lock size={9} /> : <Volume2 size={9} />}
                {track.name}
              </span>
              <div className="sl-ed-lane">
                {track.clips.map(([left, width, label], i) => (
                  <button
                    key={track.name + i}
                    className={`sl-ed-clip ${track.kind === "vid2" && i === 0 && active === 0 ? "is-selected" : ""}`}
                    style={{ left: `${left}%`, width: `${width}%` }}
                    onClick={() => setActive(i % shots.length)}
                    aria-label={`${track.name}: ${label}`}
                  >
                    {track.kind === "aud" || track.kind === "mus" ? (
                      <svg viewBox="0 0 120 20" preserveAspectRatio="none">
                        {Array.from({ length: 60 }, (_, n) => {
                          /* Rounded to two decimals on purpose: the raw trig
                             results differ in their last float digit between
                             the server's serialisation and the browser's, and
                             React compares these attributes as strings — which
                             produced a hydration mismatch on every line. */
                          const h =
                            3 +
                            Math.abs(Math.sin(n * 1.7 + i) * Math.cos(n * 0.4)) *
                              7;
                          const top = Math.round((10 - h) * 100) / 100;
                          const bottom = Math.round((10 + h) * 100) / 100;
                          return (
                            <line
                              key={n}
                              x1={n * 2}
                              x2={n * 2}
                              y1={top}
                              y2={bottom}
                            />
                          );
                        })}
                      </svg>
                    ) : null}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="sl-ed-meters" aria-hidden="true">
          {[
            [0.82, 0.74],
            [0.63, 0.58],
          ].map(([a, b], i) => (
            <div key={i}>
              <i style={{ height: `${a * 100}%` }} />
              <i style={{ height: `${b * 100}%` }} />
            </div>
          ))}
          <span>Audio 1 · Master</span>
        </div>
      </div>
    </div>
  );
}
