/* ================================================================
   GET /api/academy/unsubscribe?token=<hmac>
   ================================================================
   One-click opt-out for academy emails. Token is an HMAC of the
   student's email signed with ACADEMY_EMAIL_SECRET (or ADMIN_PASSWORD
   as fallback). No account needed — the link from the email footer
   is the entire authorization.

   On success: writes `academy:email-opt-out:{email}` and returns a
   small HTML confirmation page. The daily cron and grant flow both
   check this key and skip the send when present.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { verifyUnsubscribeToken, setOptedOut } from '@/lib/academy/emails';

export const dynamic = 'force-dynamic';

function renderPage(title: string, message: string, color = '#7A3B5E'): NextResponse {
  const html = `<!DOCTYPE html>
<html lang="en"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin:0; padding:0; background:#FAF7F2; font-family:'Segoe UI',Tahoma,sans-serif; }
    .card { max-width:440px; margin:14vh auto 0; background:#fff; border-radius:16px; padding:36px 28px; text-align:center; box-shadow:0 2px 14px rgba(0,0,0,.04); }
    h1 { margin:0 0 12px; font-size:20px; color:${color}; }
    p { margin:0 0 8px; font-size:14px; color:#4A4A5C; line-height:1.6; }
    .muted { margin-top:20px; font-size:12px; color:#8E8E9F; }
    a { color:${color}; }
  </style>
</head><body>
  <div class="card">
    <h1>${title}</h1>
    <p>${message}</p>
    <p class="muted">If this was a mistake, reply to any academy email and we'll put you back on the list.</p>
  </div>
</body></html>`;
  return new NextResponse(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token') || '';
  const email = verifyUnsubscribeToken(token);
  if (!email) {
    return renderPage(
      'Link expired',
      'That unsubscribe link is not valid. Reach out to academy@mamahala.ca and we will take you off the list manually.',
      '#C4878A',
    );
  }

  try {
    await setOptedOut(email);
  } catch {
    return renderPage(
      'Something went wrong',
      'We could not process your request right now. Please try again in a few minutes, or email academy@mamahala.ca.',
      '#C4878A',
    );
  }

  return renderPage(
    "You're unsubscribed",
    `We'll stop sending academy nudges to ${email}. Transactional messages (receipts, password/access links) will still arrive since those aren't promotional.`,
  );
}
