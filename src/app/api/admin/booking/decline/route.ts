/* ================================================================
   GET /api/admin/booking/decline?id=bk_xxx — One-click decline
   POST /api/admin/booking/decline — Decline with auth + reason
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { getBooking, updateBooking } from '@/lib/booking/booking-store';
import { sendBookingEmail } from '@/lib/booking/emails';
import { authorize } from '@/lib/invoicing/auth';
import { deleteDraft } from '@/lib/invoicing/kv-store';
import { BUSINESS } from '@/config/business';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';
import { getAvailableSlots } from '@/lib/booking/availability';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

// GET — one-click from email
export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get('id');
  if (!bookingId) {
    return NextResponse.json({ error: 'Missing booking id' }, { status: 400 });
  }

  const result = await processDecline(bookingId);

  return new NextResponse(
    renderResultPage(!result.error, result.error || `Request from ${result.clientName} has been declined.`),
    { headers: { 'Content-Type': 'text/html' } },
  );
}

// POST — from admin dashboard
export async function POST(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { bookingId, reason } = await request.json();
  if (!bookingId) {
    return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
  }

  const result = await processDecline(bookingId, reason);
  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, ...result });
}

/**
 * Find up to 5 available alternative slots on the booking's date and +/-2 nearby days.
 * Returns formatted strings like "Tuesday, April 22 at 10:00 AM" plus ISO start times.
 */
async function findAlternativeSlots(
  bookingDate: string,
  durationMinutes: number,
): Promise<Array<{ label: string; startIso: string }>> {
  const alternatives: Array<{ label: string; startIso: string }> = [];

  // Check the booking day and +/-2 nearby days (5 days total)
  const [year, month, day] = bookingDate.split('-').map(Number);
  const baseDate = new Date(year, month - 1, day);
  const datesToCheck: string[] = [];

  for (let offset = -2; offset <= 2; offset++) {
    const d = new Date(baseDate);
    d.setDate(d.getDate() + offset);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    datesToCheck.push(dateStr);
  }

  for (const dateStr of datesToCheck) {
    if (alternatives.length >= 5) break;
    try {
      const slots = await getAvailableSlots(dateStr, durationMinutes);
      const available = slots.filter(s => s.available);
      for (const slot of available) {
        if (alternatives.length >= 5) break;
        const d = new Date(slot.start);
        const label = d.toLocaleString('en-US', {
          timeZone: booking.clientTimezone || 'America/Toronto',
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        });
        alternatives.push({ label, startIso: slot.start });
      }
    } catch {
      // Skip days that fail — non-critical
    }
  }

  return alternatives;
}

async function processDecline(bookingId: string, reason?: string): Promise<{
  error?: string;
  clientName?: string;
}> {
  const booking = await getBooking(bookingId);
  if (!booking) return { error: 'Booking not found' };

  if (booking.status !== 'pending_approval') {
    return { error: `Booking is already ${booking.status} — cannot decline` };
  }

  // Mark as declined
  await updateBooking(bookingId, {
    status: 'declined',
    declinedAt: new Date().toISOString(),
    declineReason: reason?.trim() || 'Schedule conflict',
  });

  // Delete the draft invoice
  if (booking.draftId) {
    await deleteDraft(booking.draftId).catch(() => {});
  }

  // Find alternative available slots near the original booking date
  const bookingDate = booking.startTime.slice(0, 10); // YYYY-MM-DD from ISO
  const alternativeSlots = await findAlternativeSlots(
    bookingDate,
    booking.durationMinutes,
  ).catch(() => [] as Array<{ label: string; startIso: string }>);

  // Send decline email to client
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const bookUrl = `${SITE_URL}/en/book?service=${booking.serviceSlug}`;

  // Build the "Suggested Alternative Times" section if alternatives were found
  const alternativesHtml = alternativeSlots.length > 0
    ? `<div style="${emailStyles.card};background:#FFFAF5;border-left:3px solid #C8A97D;">
        <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#7A3B5E;">We have these times available instead:</p>
        ${alternativeSlots.map(slot =>
          `<p style="margin:0 0 6px;font-size:13px;color:#4A4A5C;">&#8226; ${slot.label}</p>`
        ).join('')}
        <div style="text-align:center;margin:14px 0 2px;">
          <a href="${bookUrl}" style="${emailStyles.button}">Book a New Time</a>
        </div>
      </div>`
    : '';

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h2 style="${emailStyles.heading}">Regarding Your Session Request</h2>
      <p style="${emailStyles.text}">Hi ${firstName},</p>
      <p style="${emailStyles.text}">Thank you for your interest in booking a ${serviceName} session. Unfortunately, we are unable to accommodate this particular time slot.</p>
      <p style="${emailStyles.text}">We would love to find a time that works for both of us. Please feel free to:</p>
      <div style="${emailStyles.goldAccent}">
        <p style="margin:0 0 6px;font-size:13px;color:#4A4A5C;">&#8226; Book a different time on our website</p>
        <p style="margin:0 0 6px;font-size:13px;color:#4A4A5C;">&#8226; Message us on <a href="${BUSINESS.whatsappUrl}" style="color:#7A3B5E;font-weight:600;">WhatsApp</a> at ${BUSINESS.phone}</p>
        <p style="margin:0;font-size:13px;color:#4A4A5C;">&#8226; We typically reply within a few hours</p>
      </div>
    </div>
    ${alternativesHtml}
    ${alternativeSlots.length === 0 ? `<div style="text-align:center;margin:20px 0 4px;">
      <a href="${SITE_URL}/en/book" style="${emailStyles.button}">Book Another Time</a>
    </div>` : ''}
  `);

  await sendBookingEmail({
    to: booking.clientEmail,
    subject: `Update on your session request — ${serviceName}`,
    html,
  }).catch(err => console.error('[Decline] Email failed:', err));

  return { clientName: booking.clientName };
}

function renderResultPage(success: boolean, message: string): string {
  const icon = success ? '&#10003;' : '&#10007;';
  const iconBg = success ? '#FFF5F5' : '#FFF5F5';
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Request ${success ? 'Declined' : 'Error'}</title></head>
<body style="margin:0;padding:60px 20px;background:#FAF7F2;font-family:'Segoe UI',sans-serif;text-align:center;">
  <div style="max-width:400px;margin:0 auto;background:white;border-radius:16px;padding:40px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
    <p style="margin:0 0 12px;font-size:14px;color:#8E8E9F;line-height:1.5;">${message}</p>
    <a href="${SITE_URL}/admin" style="display:inline-block;padding:12px 28px;background:#7A3B5E;color:white;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">Go to Dashboard</a>
  </div>
</body></html>`;
}
