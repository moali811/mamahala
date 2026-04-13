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

  // Send decline email to client
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');

  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Segoe UI',Tahoma,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:32px 16px;">
<tr><td align="center">
<table width="500" cellpadding="0" cellspacing="0" style="max-width:500px;width:100%;">
  <tr><td style="text-align:center;padding:24px 0 16px;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#7A3B5E;">Mama Hala Consulting</p>
    <div style="width:60px;height:2px;background:#C8A97D;margin:16px auto 0;"></div>
  </td></tr>
  <tr><td style="padding:0 0 24px;">
    <div style="background:white;border-radius:12px;padding:28px 24px;">
      <h2 style="margin:0 0 16px;font-size:18px;font-weight:700;color:#4A4A5C;">Regarding Your Session Request</h2>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#4A4A5C;">Hi ${firstName},</p>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#4A4A5C;">Thank you for your interest in booking a ${serviceName} session. Unfortunately, we are unable to accommodate this particular time slot.</p>
      <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#4A4A5C;">We would love to find a time that works for both of us. Please feel free to:</p>
      <div style="background:#FFFAF5;border-left:3px solid #C8A97D;padding:12px 16px;border-radius:0 8px 8px 0;margin:16px 0;">
        <p style="margin:0 0 6px;font-size:13px;color:#4A4A5C;">&#8226; Book a different time on our website</p>
        <p style="margin:0 0 6px;font-size:13px;color:#4A4A5C;">&#8226; Reach out to us directly at ${BUSINESS.phone}</p>
        <p style="margin:0;font-size:13px;color:#4A4A5C;">&#8226; Send us a WhatsApp message anytime</p>
      </div>
      <div style="text-align:center;padding:16px 0 4px;">
        <a href="${SITE_URL}/en/book" style="display:inline-block;padding:14px 32px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">Book Another Time</a>
      </div>
    </div>
  </td></tr>
  <tr><td style="text-align:center;padding:16px 0;">
    <p style="margin:0;font-size:11px;color:#B0B0B0;">Mama Hala Consulting</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;

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
