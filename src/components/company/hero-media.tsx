"use client";
import { useEffect, useRef } from "react";

/* The hero background. The still is the poster, so there is a frame on
   screen before the video is ready and if it never loads at all.
   Motion is paused rather than hidden when the viewer asks for reduced
   motion — CSS can hide a video but it cannot stop it playing. */
export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) el.pause();
      else void el.play().catch(() => {});
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={video}
      className="sl-hero-image"
      poster="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%229%22%3E%3Crect%20width%3D%2216%22%20height%3D%229%22%20fill%3D%22%2307130e%22%2F%3E%3C%2Fsvg%3E"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
  );
}
