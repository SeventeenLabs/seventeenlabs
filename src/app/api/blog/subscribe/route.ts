import { NextResponse } from 'next/server';

const HOSTINGER_ENDPOINT = 'https://developers.hostinger.com/api/reach/v1/contacts';
const DEFAULT_NOTE = 'SeventeenLabs blog subscriber';

function isValidEmail(email: string) {
  return /.+@.+\..+/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body || typeof body.email !== 'string') {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const email = body.email.trim().toLowerCase();
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 });
    }

    const token = process.env.HOSTINGER_REACH_TOKEN;
    if (!token) {
      console.error('Missing HOSTINGER_REACH_TOKEN environment variable.');
      return NextResponse.json({ error: 'Subscription service unavailable.' }, { status: 500 });
    }

    const name = typeof body.name === 'string' ? body.name.trim() : undefined;
    const surname = typeof body.surname === 'string' ? body.surname.trim() : undefined;
    const noteSource = typeof body.note === 'string' && body.note.trim().length > 0
      ? body.note.trim()
      : DEFAULT_NOTE;
    const note = noteSource.slice(0, 200);

    const payload: Record<string, string> = {
      email,
      note,
    };

    if (name) payload.name = name;
    if (surname) payload.surname = surname;

    const upstreamResponse = await fetch(HOSTINGER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (upstreamResponse.status === 409) {
      return NextResponse.json({ success: true, message: 'You are already subscribed.' }, { status: 200 });
    }

    if (!upstreamResponse.ok) {
      const errorText = await upstreamResponse.text();
      console.error('Hostinger subscription failed', upstreamResponse.status, errorText);
      return NextResponse.json({ error: 'Unable to subscribe right now. Please try again soon.' }, { status: 502 });
    }

    return NextResponse.json({ success: true, message: 'Thanks for subscribing!' });
  } catch (error) {
    console.error('Blog subscription error', error);
    return NextResponse.json({ error: 'Unexpected error while subscribing.' }, { status: 500 });
  }
}
