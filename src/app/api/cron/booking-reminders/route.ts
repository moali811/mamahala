/* Cron: /api/cron/booking-reminders
   Scheduled via vercel.json: every 15 minutes

   Handles:
   1. 24-hour reminders (with payment nudge if unpaid)
   2. 1-hour reminders
   3. Session completion (marks past sessions as completed)
   4. Post-session follow-up emails (2 hours after session ends)
   5. GCal event retry for bookings missing calendar events */

import { NextRequest, NextResponse } from 'next/server';
import {
  getUpcomingBookings,
  getBookingsByDate,
  updateBooking,
  createManageToken,
} from '@/lib/booking/booking-store';
import {
  buildReminder24hEmail,
  buildReminder1hEmail,
  buildFollowUpEmail,
  sendBookingEmail,
} from '@/lib/booking/emails';
import { retryMissingCalendarEvents } from '@/lib/booking/google-calendar';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const bookings = await getUpcomingBookings(200);
    const now = Date.now();
    let sent24h = 0;
    let sent1h = 0;
    let completed = 0;
    let followUpsSent = 0;
    let gcalRetries = 0;

    for (const booking of bookings) {
      const startMs = new Date(booking.startTime).getTime();
      const endMs = new Date(booking.endTime).getTime();
      const hoursUntil = (startMs - now) / 3_600_000;
      const hoursSinceEnd = (now - endMs) / 3_600_000;

      // ─── 24h Reminder (with payment nudge if pending) ──────
      if (booking.status === 'confirmed' && hoursUntil >= 23 && hoursUntil <= 25 && !booking.reminder24hSentAt) {
        try {
          const manageToken = await createManageToken(booking.bookingId);

          const reminderContent = booking.aiReminderContent;

          const { subject, html } = buildReminder24hEmail(booking, manageToken, reminderContent);
          const messageId = await sendBookingEmail({ to: booking.clientEmail, subject, html });
          if (messageId) {
            await updateBooking(booking.bookingId, { reminder24hSentAt: new Date().toISOString() });
            sent24h++;
          }
        } catch (err) {
          console.error(`[Reminder 24h] Failed for ${booking.bookingId}:`, err);
        }
      }

      // Also send 24h reminder for approved (awaiting payment) bookings
      if (booking.status === 'approved' && hoursUntil >= 23 && hoursUntil <= 25 && !booking.reminder24hSentAt) {
        try {
          const manageToken = await createManageToken(booking.bookingId);
          const { subject, html } = buildReminder24hEmail(
            booking,
            manageToken,
            'Your session is tomorrow. If you have not completed payment yet, please do so to confirm your booking.',
          );
          const messageId = await sendBookingEmail({ to: booking.clientEmail, subject, html });
          if (messageId) {
            await updateBooking(booking.bookingId, { reminder24hSentAt: new Date().toISOString() });
            sent24h++;
          }
        } catch (err) {
          console.error(`[Reminder 24h Approved] Failed for ${booking.bookingId}:`, err);
        }
      }

      // ─── 1h Reminder ───────────────────────────────────────
      if (booking.status === 'confirmed' && hoursUntil >= 0.75 && hoursUntil <= 1.25 && !booking.reminder1hSentAt) {
        try {
          const { subject, html } = await buildReminder1hEmail(booking);
          const messageId = await sendBookingEmail({ to: booking.clientEmail, subject, html });
          if (messageId) {
            await updateBooking(booking.bookingId, { reminder1hSentAt: new Date().toISOString() });
            sent1h++;
          }
        } catch (err) {
          console.error(`[Reminder 1h] Failed for ${booking.bookingId}:`, err);
        }
      }

      // ─── Auto-complete past sessions ───────────────────────
      if (booking.status === 'confirmed' && hoursSinceEnd >= 0.5 && hoursSinceEnd < 48) {
        try {
          await updateBooking(booking.bookingId, {
            status: 'completed',
            completedAt: new Date().toISOString(),
          });
          completed++;
        } catch (err) {
          console.error(`[Auto-complete] Failed for ${booking.bookingId}:`, err);
        }
      }

      // ─── Follow-up email (2 hours after session ends) ──────
      if (
        (booking.status === 'completed' || (booking.status === 'confirmed' && hoursSinceEnd >= 2))
        && hoursSinceEnd >= 2
        && hoursSinceEnd < 24
        && !booking.followUpSentAt
      ) {
        try {
          const { subject, html } = buildFollowUpEmail(booking);
          const messageId = await sendBookingEmail({ to: booking.clientEmail, subject, html });
          if (messageId) {
            await updateBooking(booking.bookingId, { followUpSentAt: new Date().toISOString() });
            followUpsSent++;
          }
        } catch (err) {
          console.error(`[Follow-up] Failed for ${booking.bookingId}:`, err);
        }
      }
    }

    // ─── Retry GCal events for missing ones ──────────────────
    const bookingsMissingCal = bookings.filter(b => !b.calendarEventId && b.status === 'confirmed');
    if (bookingsMissingCal.length > 0) {
      try {
        gcalRetries = await retryMissingCalendarEvents(bookingsMissingCal);
      } catch (gcalErr) {
        console.error('[Booking Reminders] GCal retry failed (non-blocking):', gcalErr);
        gcalRetries = 0;
      }
    }

    return NextResponse.json({
      ok: true,
      processed: bookings.length,
      sent24h,
      sent1h,
      completed,
      followUpsSent,
      gcalRetries,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error('[Booking Reminders] Error:', err);
    return NextResponse.json({ error: 'Cron failed' }, { status: 500 });
  }
}
