import assert from "node:assert/strict";
import { POST } from "../src/app/api/waitlist/route";

async function main() {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.LOOPS_API_KEY;
  let providerCalls = 0;
  let submitted: Record<string, unknown> = {};
  const valid = {
    email: "  Creator@Example.com ",
    name: "Alex",
    project: "A short film",
    consent: true,
  };
  const request = (body: unknown, origin = "https://seventeenlabs.io") =>
    new Request("https://seventeenlabs.io/api/waitlist", {
      method: "POST",
      headers: { origin, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  try {
    process.env.LOOPS_API_KEY = "test-only-key";
    globalThis.fetch = async (_input, init) => {
      providerCalls++;
      submitted = JSON.parse(String(init?.body));
      return Response.json({ success: true });
    };
    assert.equal(
      (await POST(request({ ...valid, email: "invalid" }))).status,
      400,
    );
    assert.equal(
      (await POST(request({ ...valid, consent: false }))).status,
      400,
    );
    assert.equal(
      (await POST(request(valid, "https://unrelated.example"))).status,
      403,
    );
    assert.equal(
      (await POST(request({ ...valid, website: "bot.example" }))).status,
      400,
    );
    assert.equal((await POST(request(null))).status, 400);
    assert.equal(
      (await POST(request({ ...valid, project: "x".repeat(7000) }))).status,
      413,
    );
    assert.equal(
      providerCalls,
      0,
      "Invalid requests must never reach the provider",
    );
    const success = await POST(request(valid));
    assert.equal(success.status, 200);
    assert.deepEqual(await success.json(), { ok: true });
    assert.equal(submitted.email, "creator@example.com");
    assert.equal(submitted.userGroup, "generative-editor-waitlist");
    assert.equal(submitted.subscribed, true);
    assert.equal(
      submitted.price,
      undefined,
      "A free waitlist must not assign a paid plan",
    );
    globalThis.fetch = async () => new Response("Unavailable", { status: 503 });
    assert.equal((await POST(request(valid))).status, 502);
    globalThis.fetch = async () => Response.json({ success: false });
    assert.equal((await POST(request(valid))).status, 502);
    globalThis.fetch = async () => {
      throw new Error("Network timeout");
    };
    assert.equal((await POST(request(valid))).status, 502);
    delete process.env.LOOPS_API_KEY;
    assert.equal((await POST(request(valid))).status, 503);
    console.log(
      "Waitlist checks passed: validation, consent, origin, bot field, normalization, provider failure, timeout, and missing configuration. No external requests sent.",
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (originalKey === undefined) delete process.env.LOOPS_API_KEY;
    else process.env.LOOPS_API_KEY = originalKey;
  }
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
