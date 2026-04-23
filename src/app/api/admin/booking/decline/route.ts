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
import { SITE_URL } from '@/lib/site-url';
import { verifyAdminActionToken } from '@/lib/booking/admin-action-token';

// GET — one-click from email. Auth = HMAC token in ?token= bound to
// the booking id. See `admin-action-token.ts` for the CSRF rationale.
export async function GET(request: NextRequest) {
  const bookingId = request.nextUrl.searchParams.get('id');
  const token = request.nextUrl.searchParams.get('token');
  if (!bookingId) {
    return NextResponse.json({ error: 'Missing booking id' }, { status: 400 });
  }
  if (!verifyAdminActionToken(bookingId, 'decline', token)) {
    return new NextResponse(
      renderResultPage(false, 'Invalid or missing decline token'),
      { status: 401, headers: { 'Content-Type': 'text/html' } },
    );
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
/**
 * Smart alternative slot finder — suggests practical, relevant times.
 *
 * Intelligence rules:
 * 1. Only future dates (never suggest past slots)
 * 2. Only reasonable hours (8 AM – 8 PM in client's timezone)
 * 3. Prefer slots near the original booking time (±2 hours first)
 * 4. Spread across different days (max 2 per day) for variety
 * 5. Check up to 7 days ahead for maximum options
 */
async function findAlternativeSlots(
  bookingDate: string,
  durationMinutes: number,
  clientTimezone?: string,
  originalStartTime?: string,
): Promise<Array<{ label: string; startIso: string }>> {
  const tz = clientTimezone || 'America/Toronto';
  const now = new Date();
  const nowIso = now.toISOString();

  // Get the original booking hour in client's timezone for proximity scoring
  let originalHour = 10; // default: morning preference
  if (originalStartTime) {
    try {
      const fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
      originalHour = parseInt(fmt.format(new Date(originalStartTime)), 10);
    } catch { /* use default */ }
  }

  // Collect candidate slots from the next 7 days
  type Candidate = { startIso: string; hour: number; dateStr: string };
  const candidates: Candidate[] = [];

  for (let offset = 0; offset <= 7; offset++) {
    const d = new Date(now);
    d.setDate(d.getDate() + offset);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    try {
      const slots = await getAvailableSlots(dateStr, durationMinutes);
      const available = slots.filter(s => s.available && s.start > nowIso);

      for (const slot of available) {
        // Get the hour in client's timezone
        let hour = 10;
        try {
          const fmt = new Intl.DateTimeFormat('en-US', { timeZone: tz, hour: 'numeric', hour12: false });
          hour = parseInt(fmt.format(new Date(slot.start)), 10);
        } catch { /* use default */ }

        // Only reasonable hours: 8 AM – 8 PM in client's timezone
        if (hour >= 8 && hour <= 20) {
          candidates.push({ startIso: slot.start, hour, dateStr });
        }
      }
    } catch {
      // Skip days that fail
    }
  }

  // Score candidates: closer to original time = better, spread across days
  const scored = candidates.map(c => ({
    ...c,
    timeDiff: Math.abs(c.hour - originalHour), // 0 = same time, higher = further
  }));

  // Sort: prefer closest time match, then earliest date
  scored.sort((a, b) => {
    if (a.timeDiff !== b.timeDiff) return a.timeDiff - b.timeDiff;
    return a.startIso.localeCompare(b.startIso);
  });

  // Pick top 5, max 2 per day for variety
  const result: Array<{ label: string; startIso: string }> = [];
  const perDay: Record<string, number> = {};

  for (const c of scored) {
    if (result.length >= 5) break;
    perDay[c.dateStr] = (perDay[c.dateStr] || 0) + 1;
    if (perDay[c.dateStr] > 2) continue; // max 2 per day

    const label = new Date(c.startIso).toLocaleString('en-US', {
      timeZone: tz,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    result.push({ label, startIso: c.startIso });
  }

  // Final sort by date/time for clean display
  result.sort((a, b) => a.startIso.localeCompare(b.startIso));

  return result;
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
    booking.clientTimezone,
    booking.startTime,
  ).catch(() => [] as Array<{ label: string; startIso: string }>);

  // Send decline email to client
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const bookUrl = `${SITE_URL}/en/book?service=${booking.serviceSlug}`;

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h2 style="${emailStyles.heading}">Let's Find the Right Time</h2>
      <p style="${emailStyles.text}">Hi ${firstName},</p>
      <p style="${emailStyles.text}">Thank you for reaching out about ${serviceName}. Unfortunately, the time you selected isn't available, but I'd love to connect with you soon.</p>
      ${alternativeSlots.length > 0 ? `
      <p style="${emailStyles.text};font-weight:600;color:#7A3B5E;">Here are some times that work well:</p>
      <div style="background:#FFFAF5;border-radius:12px;padding:16px 20px;margin:12px 0 16px;">
        ${alternativeSlots.map((slot, i) =>
          `<p style="margin:0 0 ${i < alternativeSlots.length - 1 ? '8' : '0'}px;font-size:14px;color:#2D2A33;font-weight:500;">&#9679; ${slot.label}</p>`
        ).join('')}
      </div>
      <div style="text-align:center;margin:8px 0 16px;">
        <a href="${bookUrl}" style="${emailStyles.button}">Book One of These Times</a>
      </div>
      <p style="${emailStyles.muted};text-align:center;">Or pick any time that suits you from our full calendar</p>
      ` : `
      <div style="text-align:center;margin:16px 0;">
        <a href="${SITE_URL}/en/book" style="${emailStyles.button}">See Available Times</a>
      </div>
      `}
      <div style="${emailStyles.goldAccent};margin-top:16px;">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">Need a specific time? Message us on <a href="${BUSINESS.whatsappUrl}" style="color:#7A3B5E;font-weight:600;">WhatsApp</a> and we'll work it out together.</p>
      </div>
      <p style="${emailStyles.muted};margin-top:16px;">— The Mama Hala Team</p>
    </div>
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
  const iconBg = success ? '#F0FAF5' : '#FFF5F5';
  const iconColor = success ? '#3B8A6E' : '#C45B5B';
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Request ${success ? 'Declined' : 'Error'}</title></head>
<body style="margin:0;padding:60px 20px;background:#FAF7F2;font-family:'Segoe UI',sans-serif;text-align:center;">
  <div style="max-width:400px;margin:0 auto;background:white;border-radius:16px;padding:40px;box-shadow:0 2px 12px rgba(0,0,0,0.06);">
    <div style="width:56px;height:56px;border-radius:50%;background:${iconBg};color:${iconColor};font-size:28px;line-height:56px;margin:0 auto 20px;">${icon}</div>
    <p style="margin:0 0 20px;font-size:14px;color:#4A4A5C;line-height:1.5;">${message}</p>
    <a href="${SITE_URL}/admin" style="display:inline-block;padding:12px 28px;background:#7A3B5E;color:white;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">Go to Dashboard</a>
  </div>
</body></html>`;
}
