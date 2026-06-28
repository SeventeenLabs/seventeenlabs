import { NextResponse } from "next/server";

const loopsEndpoint = "https://app.loops.so/api/v1/contacts/update";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

  const email =
    typeof payload === "object" &&
    payload !== null &&
    "email" in payload &&
    typeof payload.email === "string"
      ? payload.email.trim().toLowerCase()
      : "";

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
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
      userGroup: "early-access",
    }),
  });

  if (!loopsResponse.ok) {
    let message = "Could not join the early-access list.";

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
