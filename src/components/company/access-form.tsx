"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
export function AccessForm() {
  const [status, setStatus] = useState<
    "idle" | "pending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "pending") return;
    const data = new FormData(event.currentTarget);
    setStatus("pending");
    setError("");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.get("email"),
          name: data.get("name"),
          project: data.get("project"),
          website: data.get("website"),
          consent: data.get("consent") === "on",
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.ok)
        throw new Error(
          result.error || "Something went wrong. Please try again.",
        );
      setStatus("success");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "We couldn’t connect. Please try again.",
      );
      setStatus("error");
    }
  }
  if (status === "success")
    return (
      <div className="sl-form-success" role="status">
        <CheckCircle2 size={38} />
        <h2>You’re on the list.</h2>
        <p>
          Thanks for being part of what comes next. We’ll email you with product
          news and early-access updates.
        </p>
        <Link className="sl-text-link" href="/frame">
          Explore what we’re building <ArrowUpRight size={18} />
        </Link>
      </div>
    );
  return (
    <form className="sl-access-form" onSubmit={submit}>
      <label>
        Your name{" "}
        <input
          name="name"
          autoComplete="given-name"
          placeholder="Alex"
          maxLength={100}
        />
      </label>
      <label>
        Email address{" "}
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          maxLength={254}
        />
      </label>
      <label>
        What would you like to make?{" "}
        <span>Optional. We’d love to hear what you have in mind.</span>
        <textarea
          name="project"
          placeholder="A short film, a new world, something we haven’t thought of…"
          maxLength={2000}
        />
      </label>
      <div className="sl-honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="sl-consent">
        <input name="consent" type="checkbox" required />
        <span>
          I’d like to receive product news and early-access updates from
          SeventeenLabs. I can unsubscribe at any time.{" "}
          <Link href="/privacy">Privacy policy</Link>.
        </span>
      </label>
      {error && (
        <p className="sl-form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="sl-button sl-button-primary"
        disabled={status === "pending"}
        type="submit"
      >
        {status === "pending" ? "Joining…" : "Join the early-access list"}
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
