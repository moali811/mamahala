import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/* ================================================================
   GET /preview?key=<ADMIN_PASSWORD>
   ================================================================
   Sets the bypass cookie so the coming-soon proxy lets this browser
   through to the real site for 30 days. Wrong key → 401 with a
   small delay to discourage casual guessing.

   Remove at full launch along with proxy.ts and /coming-soon.
   ================================================================ */

const BYPASS_COOKIE = 'mh_preview';
const THIRTY_DAYS_SECONDS = 60 * 60 * 24 * 30;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return new Response('Preview disabled', { status: 503 });
  }

  if (key !== expected) {
    // Small delay to slow down brute-force attempts.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return new Response('Access denied', { status: 401 });
  }

  const response = NextResponse.redirect(new URL('/', request.url));
  (await cookies()).set(BYPASS_COOKIE, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: THIRTY_DAYS_SECONDS,
    path: '/',
  });

  return response;
}
