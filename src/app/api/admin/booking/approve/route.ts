/* ================================================================
   GET /api/admin/booking/approve?id=bk_xxx — Approve booking
   POST /api/admin/booking/approve — Approve with auth header
   ================================================================
   When Dr. Hala clicks "Approve" in her email notification:
   1. Marks booking as "approved"
   2. Creates Google Calendar event + auto Meet link
   3. Sends a short "approved" notification to the client
   4. Redirects Dr. Hala to the draft invoice in the admin dashboard
      so she can review/edit the price before sending the invoice

   The INVOICE is sent separately via the existing "Send Invoice"
   flow in the admin dashboard — Dr. Hala clicks Send after
   reviewing/adjusting the draft. That invoice email already
   includes payment instructions + Stripe "Pay Online" button.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { getBooking, updateBooking, createManageToken } from '@/lib/booking/booking-store';
import { createCalendarEvent } from '@/lib/booking/google-calendar';
import { sendBookingEmail } from '@/lib/booking/emails';
import { emailCopy, type EmailLocale } from '@/lib/booking/email-copy';
import { authorize } from '@/lib/invoicing/auth';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';
import { SITE_URL } from '@/lib/site-url';
import { verifyAdminActionToken } from '@/lib/booking/admin-action-token';

// GET — one-click from email. Auth = HMAC token in ?token= bound to
// the booking id. An attacker who tricks Dr. Hala into clicking a
// crafted link cannot forge the token without ADMIN_PASSWORD, so CSRF
// via image/link prefetch or a malicious third-party email is blocked.
export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get('id');
  const token = request.nextUrl.searchParams.get('token');
  if (!bookingId) {
    return new NextResponse(renderPage(false, 'Missing booking ID'), { headers: { 'Content-Type': 'text/html' } });
  }
  if (!verifyAdminActionToken(bookingId, 'approve', token)) {
    return new NextResponse(renderPage(false, 'Invalid or missing approval token'), {
      status: 401,
      headers: { 'Content-Type': 'text/html' },
    });
  }

  const result = await processApproval(bookingId);

  if (result.error) {
    return new NextResponse(renderPage(false, result.error), { headers: { 'Content-Type': 'text/html' } });
  }

  // Redirect to the draft invoice in the dashboard for price review
  return new NextResponse(
    renderPage(true, result.clientName!, result.draftId),
    { headers: { 'Content-Type': 'text/html' } },
  );
}

// POST — from admin dashboard
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bookingId } = await request.json();
  if (!bookingId) {
    return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
  }

  const result = await processApproval(bookingId);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, ...result });
}

async function processApproval(bookingId: string): Promise<{
  error?: string;
  clientName?: string;
  meetLink?: string;
  draftId?: string;
}> {
  const booking = await getBooking(bookingId);
  if (!booking) return { error: 'Booking not found' };

  if (booking.status !== 'pending_approval') {
    return { error: `Booking is already ${booking.status} — cannot approve` };
  }

  // 1. Mark as approved
  const now = new Date().toISOString();
  await updateBooking(bookingId, {
    status: 'approved',
    approvedAt: now,
    approvedBy: 'admin',
  });

  // 2. Create Google Calendar event + Meet link
  let meetLink: string | undefined;
  try {
    const calResult = await createCalendarEvent({ ...booking, status: 'approved' as const });
    if (calResult) {
      meetLink = calResult.meetLink;
      await updateBooking(bookingId, {
        calendarEventId: calResult.eventId,
        meetLink: calResult.meetLink,
      });
    }
  } catch (err) {
    console.error('[Approve] GCal failed:', err);
  }

  // 3. Send short "approved" notification to client (NOT the invoice — that comes later).
  // Honors booking.preferredLanguage so AR clients get AR copy; the localized
  // strings (subject/heading/body/meet block) live in email-copy.ts `approved`.
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = new Date(booking.startTime).toLocaleString(locale === 'ar' ? 'ar' : 'en-US', {
    timeZone: booking.clientTimezone,
    weekday: 'long', month: 'long', day: 'numeric',
    hour: 'numeric', minute: '2-digit',
    hour12: locale !== 'ar',
  });

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <div style="text-align:center;margin:0 0 16px;">
        <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#F0FAF5;line-height:48px;font-size:24px;text-align:center;">&#10003;</div>
      </div>
      <h2 style="${emailStyles.heading};text-align:center;">${t.approved.heading(firstName)}</h2>
      <p style="${emailStyles.text}">${t.approved.body(serviceName, dateTime)}</p>
      <p style="${emailStyles.text}">${t.approved.invoiceNote}</p>
      ${meetLink ? `
      <div style="background:#F0FAF5;border-left:3px solid #3B8A6E;padding:12px 16px;border-radius:0 8px 8px 0;margin:16px 0;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">${t.approved.meetHeading}</p>
        <p style="margin:0 0 8px;font-size:12px;color:#4A4A5C;">${t.approved.meetHint}</p>
        <a href="${meetLink}" style="display:inline-block;padding:8px 20px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">${t.approved.meetCta}</a>
      </div>
      ` : (booking.sessionMode === 'online' ? `
      <div style="${emailStyles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">${t.approved.onlineFallback}</p>
      </div>
      ` : '')}
    </div>
  `, { locale });

  await sendBookingEmail({
    to: booking.clientEmail,
    subject: t.approved.subject(serviceName),
    html,
  }).catch(err => console.error('[Approve] Client notification failed:', err));

  return {
    clientName: booking.clientName,
    meetLink,
    draftId: booking.draftId,
  };
}

function renderPage(success: boolean, messageOrName: string, draftId?: string): string {
  if (success) {
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Booking Approved</title></head>
<body style="margin:0;padding:60px 20px;background:#FAF7F2;font-family:'Segoe UI',sans-serif;text-align:center;">
  <div style="max-width:440px;margin:0 auto;background:white;border-radius:16px;padding:40px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
    <div style="width:56px;height:56px;border-radius:50%;background:#F0FAF5;display:inline-flex;align-items:center;justify-content:center;font-size:28px;color:#3B8A6E;margin:0 0 20px;line-height:56px;">&#10003;</div>
    <h1 style="margin:0 0 8px;font-size:20px;color:#4A4A5C;">Approved!</h1>
    <p style="margin:0 0 8px;font-size:14px;color:#8E8E9F;">Booking for <strong>${messageOrName}</strong> has been approved.</p>
    <p style="margin:0 0 8px;font-size:14px;color:#8E8E9F;">The client has been notified. A Google Calendar event has been created.</p>
    <div style="background:#FFFAF5;border:2px solid #C8A97D;border-radius:12px;padding:16px;margin:20px 0;">
      <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#7A3B5E;">Next Step: Review & Send Invoice</p>
      <p style="margin:0 0 12px;font-size:12px;color:#8E8E9F;">Open the draft invoice, adjust the price if needed, then click Send to email the invoice with payment instructions.</p>
      <a href="${SITE_URL}/admin?tab=invoices" style="display:inline-block;padding:12px 28px;background:#7A3B5E;color:white;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">Open Dashboard &rarr; Send Invoice</a>
    </div>
  </div>
</body></html>`;
  }

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Error</title></head>
<body style="margin:0;padding:60px 20px;background:#FAF7F2;font-family:'Segoe UI',sans-serif;text-align:center;">
  <div style="max-width:400px;margin:0 auto;background:white;border-radius:16px;padding:40px;">
    <p style="margin:0 0 12px;font-size:14px;color:#C45B5B;">${messageOrName}</p>
    <a href="${SITE_URL}/admin?tab=invoices" style="display:inline-block;padding:12px 28px;background:#7A3B5E;color:white;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">Go to Dashboard</a>
  </div>
</body></html>`;
}
