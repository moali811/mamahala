#!/usr/bin/env npx tsx
/* ================================================================
   Google Calendar OAuth2 Setup Script
   ================================================================
   Run once to generate the refresh token for Google Calendar
   integration. Follow these steps:

   1. Go to https://console.cloud.google.com/
   2. Create a project (or use existing)
   3. Enable "Google Calendar API"
   4. Create OAuth 2.0 credentials (Desktop application type)
   5. Copy Client ID and Client Secret below
   6. Run: npx tsx scripts/google-calendar-auth.ts
   7. Follow the browser prompt to authorize
   8. Copy the refresh token to .env.local

   Usage: npx tsx scripts/google-calendar-auth.ts
   ================================================================ */

import http from 'http';
import open from 'open';

// ─── Configuration (fill these in before running) ────────────

const CLIENT_ID = process.env.GOOGLE_CALENDAR_CLIENT_ID || 'YOUR_CLIENT_ID';
const CLIENT_SECRET = process.env.GOOGLE_CALENDAR_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'http://localhost:3333/callback';
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',
  'https://www.googleapis.com/auth/calendar.events',
];

if (CLIENT_ID === 'YOUR_CLIENT_ID') {
  console.error('\n❌ Please set GOOGLE_CALENDAR_CLIENT_ID and GOOGLE_CALENDAR_CLIENT_SECRET');
  console.error('   Either as environment variables or by editing this script.\n');
  process.exit(1);
}

// ─── OAuth2 Flow ────────────────────────────────────────────

const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
authUrl.searchParams.set('client_id', CLIENT_ID);
authUrl.searchParams.set('redirect_uri', REDIRECT_URI);
authUrl.searchParams.set('response_type', 'code');
authUrl.searchParams.set('scope', SCOPES.join(' '));
authUrl.searchParams.set('access_type', 'offline');
authUrl.searchParams.set('prompt', 'consent');

console.log('\n📅 Google Calendar OAuth2 Setup\n');
console.log('Opening browser for authorization...\n');

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url!, `http://localhost:3333`);

  if (url.pathname !== '/callback') {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Error: ${error}</h1><p>Please try again.</p>`);
    server.close();
    process.exit(1);
  }

  if (!code) {
    res.writeHead(400);
    res.end('Missing authorization code');
    return;
  }

  // Exchange code for tokens
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenRes.json();

    if (tokens.error) {
      console.error('❌ Token exchange failed:', tokens.error_description);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Error</h1><p>${tokens.error_description}</p>`);
      server.close();
      process.exit(1);
    }

    const refreshToken = tokens.refresh_token;

    console.log('✅ Authorization successful!\n');
    console.log('Add these to your .env.local:\n');
    console.log(`GOOGLE_CALENDAR_CLIENT_ID=${CLIENT_ID}`);
    console.log(`GOOGLE_CALENDAR_CLIENT_SECRET=${CLIENT_SECRET}`);
    console.log(`GOOGLE_CALENDAR_REFRESH_TOKEN=${refreshToken}`);
    console.log(`GOOGLE_CALENDAR_ID=primary`);
    console.log('');

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <html><body style="font-family:sans-serif;text-align:center;padding:60px;">
        <h1 style="color:#3B8A6E;">✅ Authorization Complete!</h1>
        <p>You can close this window. Check your terminal for the refresh token.</p>
      </body></html>
    `);

    server.close();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    res.writeHead(500);
    res.end('Internal error');
    server.close();
    process.exit(1);
  }
});

server.listen(3333, () => {
  open(authUrl.toString());
});
