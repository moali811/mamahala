/* GET /api/auth/google/authorize — Start Google OAuth flow
   Admin-only: redirects to Google consent screen */

import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site-url';

const CLIENT_ID = process.env.GOOGLE_CALENDAR_CLIENT_ID ?? '';
const REDIRECT_URI = `${SITE_URL}/api/auth/google/callback`;

const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

export async function GET(request: NextRequest) {
  // Simple admin check
  const adminPassword = process.env.ADMIN_PASSWORD;
  const authParam = request.nextUrl.searchParams.get('key');
  if (adminPassword && authParam !== adminPassword) {
    return NextResponse.json(
      { error: 'Unauthorized. Add ?key=YOUR_ADMIN_PASSWORD to the URL.' },
      { status: 401 },
    );
  }

  if (!CLIENT_ID) {
    return NextResponse.json({ error: 'GOOGLE_CALENDAR_CLIENT_ID not configured' }, { status: 500 });
  }

  const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authUrl.searchParams.set('client_id', CLIENT_ID);
  authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
  authUrl.searchParams.set('response_type', 'code');
  authUrl.searchParams.set('scope', SCOPES.join(' '));
  authUrl.searchParams.set('access_type', 'offline');
  authUrl.searchParams.set('prompt', 'consent');

  return NextResponse.redirect(authUrl.toString());
}
