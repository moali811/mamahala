/* Cron: /api/cron/booking-auto-approve
   Scheduled via vercel.json: every 30 minutes

   Smart Hold Auto-Approve Engine:
   Scans for pending_approval bookings whose holdExpiresAt has passed.
   Auto-approves them so clients are never left hanging.
   Creates GCal events, sends confirmation emails, notifies Dr. Hala.
*/

import { NextRequest, NextResponse } from 'next/server';
import {
  getBookingsByDate,
  updateBooking,
  getAvailabilityRules,
} from '@/lib/booking/booking-store';
import { createCalendarEvent } from '@/lib/booking/google-calendar';
import { sendBookingEmail, notifyAdmin } from '@/lib/booking/emails';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';
import type { Booking } from '@/lib/booking/types';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

async function findExpiredPendingBookings(): Promise<Booking[]> {
  const now = new Date();
  const nowIso = now.toISOString();
  const expired: Booking[] = [];

  // Scan the next 60 days (covers the advance booking window)
  for (let i = 0; i < 60; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    const dateStr = d.toISOString().slice(0, 10);

    try {
      const bookings = await getBookingsByDate(dateStr);
      for (const b of bookings) {
        if (
          b.status === 'pending_approval' &&
          b.holdExpiresAt &&
          b.holdExpiresAt < nowIso
        ) {
          expired.push(b);
        }
      }
    } catch {
      // Skip dates that fail — don't let one bad day block the sweep
    }
  }

  return expired;
}

async function autoApproveBooking(booking: Booking): Promise<boolean> {
  try {
    const now = new Date().toISOString();

    // Update status to approved
    const updated: Partial<Booking> = {
      status: 'approved',
      approvedAt: now,
      approvedBy: 'auto-approve',
      updatedAt: now,
    };

    await updateBooking(booking.bookingId, updated);

    // Create Google Calendar event + Meet link
    const mergedBooking = { ...booking, ...updated } as Booking;
    try {
      const calResult = await createCalendarEvent(mergedBooking);
      if (calResult) {
        await updateBooking(booking.bookingId, {
          calendarEventId: calResult.eventId,
          ...(calResult.meetLink ? { meetLink: calResult.meetLink } : {}),
        });
        mergedBooking.calendarEventId = calResult.eventId;
        if (calResult.meetLink) mergedBooking.meetLink = calResult.meetLink;
      }
    } catch (calErr) {
      console.error(`[Auto-Approve] GCal failed for ${booking.bookingId}:`, calErr);
    }

    // Send approval email to client (same template as manual approve)
    try {
      const firstName = booking.clientName.split(' ')[0];
      const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
      const dateTime = new Date(booking.startTime).toLocaleString('en-US', {
        timeZone: booking.clientTimezone || 'America/Toronto',
        weekday: 'long', month: 'long', day: 'numeric',
        hour: 'numeric', minute: '2-digit',
      });

      const html = emailWrapper(`
        <div style="${emailStyles.card}">
          <div style="text-align:center;margin:0 0 16px;">
            <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#F0FAF5;line-height:48px;font-size:24px;text-align:center;">&#10003;</div>
          </div>
          <h2 style="${emailStyles.heading};text-align:center;">Good News, ${firstName}!</h2>
          <p style="${emailStyles.text}">Your session request for <strong>${serviceName}</strong> on <strong>${dateTime}</strong> has been confirmed.</p>
          <p style="${emailStyles.text}">You will receive an invoice with payment details shortly. Once payment is complete, your session is fully locked in.</p>
          ${mergedBooking.meetLink ? `
          <div style="background:#F0FAF5;border-left:3px solid #3B8A6E;padding:12px 16px;border-radius:0 8px 8px 0;margin:16px 0;">
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">Your Google Meet Link</p>
            <a href="${mergedBooking.meetLink}" style="display:inline-block;padding:8px 20px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">Open Google Meet</a>
          </div>
          ` : ''}
        </div>
      `);

      await sendBookingEmail({
        to: booking.clientEmail,
        subject: `Great news — your ${serviceName} session is confirmed!`,
        html,
      });
    } catch (emailErr) {
      console.error(`[Auto-Approve] Client email failed for ${booking.bookingId}:`, emailErr);
    }

    // Notify Dr. Hala
    try {
      await notifyAdmin(mergedBooking, 'auto-approved');
    } catch {
      // Non-critical
    }

    console.log(`[Auto-Approve] Approved booking ${booking.bookingId} (${booking.clientName}, ${booking.serviceName})`);
    return true;
  } catch (err) {
    console.error(`[Auto-Approve] Failed for ${booking.bookingId}:`, err);
    return false;
  }
}

export async function GET(request: NextRequest) {
  // Auth: Vercel Cron sends CRON_SECRET, or allow admin Bearer token
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Check if auto-approve is enabled
  const rules = await getAvailabilityRules().catch(() => null);
  const autoApproveEnabled = rules?.autoApproveOnExpiry !== false; // default: true

  if (!autoApproveEnabled) {
    return NextResponse.json({
      message: 'Auto-approve is disabled in settings',
      autoApproved: 0,
    });
  }

  const expired = await findExpiredPendingBookings();

  if (expired.length === 0) {
    return NextResponse.json({ message: 'No expired holds found', autoApproved: 0 });
  }

  let approved = 0;
  let failed = 0;

  for (const booking of expired) {
    const success = await autoApproveBooking(booking);
    if (success) approved++;
    else failed++;
  }

  console.log(`[Auto-Approve Cron] Processed ${expired.length} expired holds: ${approved} approved, ${failed} failed`);

  return NextResponse.json({
    message: `Auto-approved ${approved} bookings`,
    autoApproved: approved,
    failed,
    total: expired.length,
  });
}
