/* ================================================================
   Approval Flow — Reusable processApproval()
   ================================================================
   Extracted from /api/admin/booking/approve so the new
   approve-and-convert route can run the same approval steps before
   converting the booking into a recurring series.

   Steps:
     1. Mark booking as 'approved'
     2. Create Google Calendar event + Meet link
     3. Send a short "approved" notification to the client (HTML email)

   Invoice send remains a SEPARATE manual step — Dr. Hala reviews
   the draft in the dashboard and clicks Send when ready.
   ================================================================ */

import { getBooking, updateBooking } from './booking-store';
import { createCalendarEvent } from './google-calendar';
import { sendBookingEmail } from './emails';
import { emailCopy, type EmailLocale } from './email-copy';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

export interface ApprovalResult {
  error?: string;
  clientName?: string;
  meetLink?: string;
  draftId?: string;
}

export async function processApproval(bookingId: string): Promise<ApprovalResult> {
  const booking = await getBooking(bookingId);
  if (!booking) return { error: 'Booking not found' };

  if (booking.status !== 'pending_approval') {
    return { error: `Booking is already ${booking.status} — cannot approve` };
  }

  const now = new Date().toISOString();
  await updateBooking(bookingId, {
    status: 'approved',
    approvedAt: now,
    approvedBy: 'admin',
  });

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
    console.error('[approval-flow] GCal failed:', err);
  }

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
      ${booking.sessionMode === 'online' ? `
      <div style="${emailStyles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">${t.approved.onlineFallback}</p>
      </div>
      ` : ''}
    </div>
  `, { locale });

  await sendBookingEmail({
    to: booking.clientEmail,
    subject: t.approved.subject(serviceName),
    html,
  }).catch(err => console.error('[approval-flow] Client notification failed:', err));

  return {
    clientName: booking.clientName,
    meetLink,
    draftId: booking.draftId,
  };
}
