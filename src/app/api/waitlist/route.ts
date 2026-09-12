import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return NextResponse.json(
      { error: "Request not allowed." },
      { status: 403 },
    );
  let payload: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 6000)
      return NextResponse.json(
        { error: "Your message is too long." },
        { status: 413 },
      );
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
      throw new Error("Invalid payload");
    payload = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 },
    );
  }
  if (payload.website)
    return NextResponse.json(
      { error: "Request not accepted." },
      { status: 400 },
    );
  const email =
    typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254)
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  if (payload.consent !== true)
    return NextResponse.json(
      { error: "Please agree to receive early-access updates." },
      { status: 400 },
    );
  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const project =
    typeof payload.project === "string" ? payload.project.trim() : "";
  if (name.length > 100 || project.length > 2000)
    return NextResponse.json(
      { error: "Please shorten your name or project description." },
      { status: 400 },
    );
  const apiKey = process.env.LOOPS_API_KEY;
  if (!apiKey)
    return NextResponse.json(
      {
        error:
          "The list is temporarily unavailable. Please try again later, or contact hello@seventeenlabs.io.",
      },
      { status: 503 },
    );
  try {
    const response = await fetch(
      "https://app.loops.so/api/v1/contacts/update",
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName: name,
          source: "seventeenlabs-company",
          userGroup: "generative-editor-waitlist",
          subscribed: true,
          ...(project ? { projectType: project } : {}),
        }),
        signal: AbortSignal.timeout(10000),
      },
    );
    if (!response.ok) throw new Error("Email provider unavailable");
    const result = await response.json();
    if (result.success !== true) throw new Error("Contact was not saved");
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "We couldn’t save your details just now. Please try again in a moment.",
      },
      { status: 502 },
    );
  }
}
