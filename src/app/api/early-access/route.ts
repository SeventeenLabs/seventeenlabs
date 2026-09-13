import { NextResponse } from "next/server";

const loopsEndpoint = "https://app.loops.so/api/v1/contacts/update";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getStringField(payload: unknown, field: string) {
  if (typeof payload !== "object" || payload === null) {
    return "";
  }

  const value = (payload as Record<string, unknown>)[field];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const apiKey = process.env.LOOPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = getStringField(payload, "email").toLowerCase();
  const plan = getStringField(payload, "plan") || "Early Access Creator";
  const price = getStringField(payload, "price") || "$79/month";
  const planId = getStringField(payload, "planId") || "creator";
  const projectType = getStringField(payload, "projectType");
  const currentTools = getStringField(payload, "currentTools");
  const biggestProblem = getStringField(payload, "biggestProblem");
  const projectLink = getStringField(payload, "projectLink");
  const trafficSource = getStringField(payload, "trafficSource");
  const paymentStatus = getStringField(payload, "paymentStatus") || "not_charged_application";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  if (!projectType || !currentTools || !biggestProblem) {
    return NextResponse.json(
      { error: "Tell us what you are making, your current tools, and your biggest production problem." },
      { status: 400 }
    );
  }

  const loopsResponse = await fetch(loopsEndpoint, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      source: "seventeenlabs-landing",
      userGroup: "early-access-application",
      plan,
      planId,
      price,
      projectType,
      currentTools,
      mainPain: biggestProblem,
      biggestProductionProblem: biggestProblem,
      projectLink,
      trafficSource,
      paymentStatus,
      applicationStatus: "applied",
      funnelStage: "application_completed",
    }),
  });

  if (!loopsResponse.ok) {
    let message = "Could not submit the early access application.";

    try {
      const errorBody = await loopsResponse.json();
      if (
        typeof errorBody === "object" &&
        errorBody !== null &&
        "message" in errorBody &&
        typeof errorBody.message === "string"
      ) {
        message = errorBody.message;
      }
    } catch {
      // Keep the generic message when Loops returns a non-JSON error body.
    }

    return NextResponse.json({ error: message }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
