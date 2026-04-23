/* GET /api/auth/google/callback — Google OAuth callback
   Exchanges the auth code for tokens and displays the refresh token
   for copying to env vars. */

import { NextRequest, NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site-url';

const CLIENT_ID = process.env.GOOGLE_CALENDAR_CLIENT_ID ?? '';
const CLIENT_SECRET = process.env.GOOGLE_CALENDAR_CLIENT_SECRET ?? '';
const REDIRECT_URI = `${SITE_URL}/api/auth/google/callback`;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');
  const error = request.nextUrl.searchParams.get('error');

  if (error) {
    return new NextResponse(renderPage(false, `Authorization failed: ${error}`), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

  if (!code) {
    return new NextResponse(renderPage(false, 'Missing authorization code'), {
      headers: { 'Content-Type': 'text/html' },
    });
  }

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
      return new NextResponse(
        renderPage(false, `Token exchange failed: ${tokens.error_description || tokens.error}`),
        { headers: { 'Content-Type': 'text/html' } },
      );
    }

    const refreshToken = tokens.refresh_token;

    if (!refreshToken) {
      return new NextResponse(
        renderPage(false, 'No refresh token received. Try revoking access at myaccount.google.com/permissions and authorizing again.'),
        { headers: { 'Content-Type': 'text/html' } },
      );
    }

    return new NextResponse(renderPage(true, refreshToken), {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return new NextResponse(
      renderPage(false, `Error: ${err instanceof Error ? err.message : 'Unknown error'}`),
      { headers: { 'Content-Type': 'text/html' } },
    );
  }
}

function renderPage(success: boolean, content: string): string {
  if (success) {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Google Calendar Connected</title></head>
<body style="margin:0;padding:60px 20px;background:#FAF7F2;font-family:'Segoe UI',sans-serif;text-align:center;">
  <div style="max-width:560px;margin:0 auto;background:white;border-radius:16px;padding:40px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
    <div style="width:56px;height:56px;border-radius:50%;background:#F0FAF5;display:inline-flex;align-items:center;justify-content:center;font-size:28px;color:#3B8A6E;margin:0 0 20px;line-height:56px;">&#10003;</div>
    <h1 style="margin:0 0 12px;font-size:22px;color:#4A4A5C;">Google Calendar Connected!</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#8E8E9F;">Copy the refresh token below and add it to your Vercel environment variables as <code>GOOGLE_CALENDAR_REFRESH_TOKEN</code>.</p>
    <div style="background:#F5F0EB;border-radius:8px;padding:16px;margin:0 0 20px;word-break:break-all;text-align:left;">
      <p style="margin:0 0 6px;font-size:11px;color:#8E8E9F;font-weight:600;">GOOGLE_CALENDAR_REFRESH_TOKEN</p>
      <code style="font-size:13px;color:#7A3B5E;line-height:1.5;">${content}</code>
    </div>
    <button onclick="navigator.clipboard.writeText('${content}').then(()=>this.textContent='Copied!')" style="padding:12px 28px;background:#7A3B5E;color:white;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;">Copy Refresh Token</button>
    <p style="margin:20px 0 0;font-size:12px;color:#C0B8B0;">After adding to Vercel env vars, redeploy for changes to take effect.</p>
  </div>
</body></html>`;
  }

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Authorization Error</title></head>
<body style="margin:0;padding:60px 20px;background:#FAF7F2;font-family:'Segoe UI',sans-serif;text-align:center;">
  <div style="max-width:440px;margin:0 auto;background:white;border-radius:16px;padding:40px;">
    <div style="width:56px;height:56px;border-radius:50%;background:#FFF5F5;display:inline-flex;align-items:center;justify-content:center;font-size:28px;color:#C45B5B;margin:0 0 20px;line-height:56px;">&#10007;</div>
    <h1 style="margin:0 0 12px;font-size:20px;color:#4A4A5C;">Authorization Failed</h1>
    <p style="margin:0 0 20px;font-size:14px;color:#8E8E9F;">${content}</p>
    <a href="${SITE_URL}/api/auth/google/authorize" style="display:inline-block;padding:12px 28px;background:#7A3B5E;color:white;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">Try Again</a>
  </div>
</body></html>`;
}
