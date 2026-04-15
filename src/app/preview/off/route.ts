import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/* ================================================================
   GET /preview/off
   ================================================================
   Clears the bypass cookie and redirects to /. Used to test that
   the coming-soon gate actually blocks unauthenticated visitors.
   ================================================================ */

export async function GET(request: Request) {
  const response = NextResponse.redirect(new URL('/', request.url));
  (await cookies()).delete('mh_preview');
  return response;
}
