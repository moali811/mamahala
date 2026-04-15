/* ================================================================
   Booking Emails — Branded templates for all booking lifecycle events
   ================================================================
   Uses shared email components for branded header (with logo),
   footer, and wrapper. Brand palette: Cream (#FAF7F2), Plum
   (#7A3B5E), Gold (#C8A97D), White cards.
   Sent via Resend. ICS attachments included where relevant.
   ================================================================ */

import type { Booking } from './types';
import { BUSINESS } from '@/config/business';
import { generateBookingICS, generateCancelICS } from './ics-generator';
import { emailStyles as styles, emailWrapper } from '@/lib/email/shared-email-components';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

// ─── Formatting Helpers ─────────────────────────────────────────

function formatDateTime(iso: string, timezone: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function formatDateTimeAr(iso: string, timezone: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString('ar', {
      timeZone: timezone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function formatTime(iso: string, timezone: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function getManageUrl(manageToken: string): string {
  return `${SITE_URL}/en/book/manage?token=${manageToken}`;
}

function getCalendarUrl(booking: Booking): string {
  const title = encodeURIComponent(`Session with Dr. Hala Ali`);
  const details = encodeURIComponent(
    `${booking.serviceName || booking.serviceSlug}\nBooking ID: ${booking.bookingId}`,
  );
  const location = encodeURIComponent(
    booking.sessionMode === 'online' ? 'Online' : '430 Hazeldean Rd, Ottawa, ON',
  );
  const start = booking.startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = booking.endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

// ─── Email Wrapper (delegates to shared branded wrapper with logo) ──

function wrapEmail(content: string): string {
  return emailWrapper(content);
}

// ─── Session Details Card (reused) ──────────────────────────────

function sessionDetailsCard(booking: Booking): string {
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = formatDateTime(booking.startTime, booking.clientTimezone);
  const mode = booking.sessionMode === 'online' ? 'Online / Video Call' : 'In-Person — Ottawa';

  return `<div style="${styles.card}">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">Service</span></td>
          <td style="padding:6px 0;text-align:right;"><span style="${styles.detailValue}">${serviceName}</span></td></tr>
      <tr><td colspan="2" style="border-bottom:1px solid #F0ECE8;"></td></tr>
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">Date & Time</span></td>
          <td style="padding:6px 0;text-align:right;"><span style="${styles.detailValue}">${dateTime}</span></td></tr>
      <tr><td colspan="2" style="border-bottom:1px solid #F0ECE8;"></td></tr>
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">Duration</span></td>
          <td style="padding:6px 0;text-align:right;"><span style="${styles.detailValue}">${booking.durationMinutes} minutes</span></td></tr>
      <tr><td colspan="2" style="border-bottom:1px solid #F0ECE8;"></td></tr>
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">Mode</span></td>
          <td style="padding:6px 0;text-align:right;"><span style="${styles.detailValue}">${mode}</span></td></tr>
    </table>
  </div>`;
}

// ─── 1. Booking Confirmation Email ──────────────────────────────

export interface ConfirmationEmailData {
  booking: Booking;
  manageToken: string;
  prepTips?: string[];
  aiMessage?: string;
  isFreeSession?: boolean;
}

export function buildConfirmationEmail(data: ConfirmationEmailData): {
  subject: string;
  html: string;
  icsContent: string;
} {
  const { booking, manageToken, prepTips, aiMessage, isFreeSession } = data;
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const firstName = booking.clientName.split(' ')[0];
  const isPendingApproval = booking.status === 'pending_approval';

  const tipsHtml = prepTips?.length
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#7A3B5E;">Prepare for Your Session</p>
        ${prepTips.map(t => `<p style="margin:0 0 4px;font-size:13px;color:#4A4A5C;">&#8226; ${t}</p>`).join('')}
      </div>`
    : '';

  const aiMessageHtml = aiMessage
    ? `<p style="${styles.text};font-style:italic;color:#7A3B5E;">${aiMessage}</p>`
    : '';

  // Meet link section (only for confirmed free sessions)
  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:3px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">Join Online Session</p>
        <p style="margin:0 0 10px;font-size:12px;color:#4A4A5C;">Your Google Meet link is ready. Use it when the session starts.</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:10px 24px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">Open Google Meet</a>
      </div>`
    : '';

  // Pending approval banner
  const pendingBanner = isPendingApproval
    ? `<div style="${styles.card};background:#FFFAF5;border:2px solid #C8A97D;">
        <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#7A3B5E;">What Happens Next?</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:8px 0;vertical-align:top;width:28px;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#C8A97D;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">1</span></td>
              <td style="padding:8px 0 8px 8px;"><p style="margin:0;font-size:13px;color:#4A4A5C;"><strong>Dr. Hala reviews your request</strong> — typically within a few hours</p></td></tr>
          <tr><td style="padding:8px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#C8A97D;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">2</span></td>
              <td style="padding:8px 0 8px 8px;"><p style="margin:0;font-size:13px;color:#4A4A5C;"><strong>You receive an invoice</strong> with payment details</p></td></tr>
          <tr><td style="padding:8px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#3B8A6E;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">3</span></td>
              <td style="padding:8px 0 8px 8px;"><p style="margin:0;font-size:13px;color:#4A4A5C;"><strong>Complete payment</strong> — your session is confirmed and a calendar invite is sent</p></td></tr>
        </table>
      </div>`
    : '';

  const heading = isPendingApproval
    ? 'Your Request Has Been Received'
    : 'Your Session is Confirmed';

  const statusText = isPendingApproval
    ? 'Thank you for reaching out. Dr. Hala will review your request and get back to you shortly with next steps.'
    : 'Your session with Dr. Hala has been confirmed. Here are the details:';

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${heading}</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">${statusText}</p>
      ${aiMessageHtml}
    </div>
    ${pendingBanner}
    ${sessionDetailsCard(booking)}
    ${meetHtml}
    ${!isPendingApproval ? tipsHtml : ''}
    ${!isPendingApproval ? `<div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">Add to Calendar</a>
    </div>` : ''}
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken)}" style="${styles.buttonSecondary}">${isPendingApproval ? 'View or Cancel Request' : 'Reschedule or Cancel'}</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Need help? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp us at ${BUSINESS.phone}</a> or ${BUSINESS.email}</p>
      <p style="${styles.muted}">Booking ID: ${booking.bookingId}</p>
    </div>`;

  return {
    subject: isPendingApproval
      ? `Request received — ${serviceName}`
      : `Your session is confirmed — ${serviceName}`,
    html: wrapEmail(content),
    icsContent: generateBookingICS(booking),
  };
}

// ─── 1b. Session Locked In Email — fires after payment ─────────
// Sent when the mark-paid route transitions a paid booking from
// 'approved' → 'confirmed'. This is the first email where the
// client sees their Meet link front-and-center, along with an ICS
// attachment so they can block the time on their calendar.

export interface SessionLockedInEmailData {
  booking: Booking;
  manageToken: string;
  prepTips?: string[];
  aiMessage?: string;
}

export function buildSessionLockedInEmail(
  data: SessionLockedInEmailData,
): { subject: string; html: string; icsContent: string } {
  const { booking, manageToken, prepTips, aiMessage } = data;
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const firstName = booking.clientName.split(' ')[0];

  // Prominent "Join Google Meet" card — the single most important element.
  // For in-person sessions, show the Ottawa address instead.
  const joinHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:4px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#3B8A6E;">Your Google Meet Link</p>
        <p style="margin:0 0 14px;font-size:13px;color:#4A4A5C;">Bookmark this link now — you&apos;ll use it to join your session.</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:12px 32px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;">Open Google Meet</a>
      </div>`
    : booking.sessionMode === 'inPerson'
      ? `<div style="${styles.card};background:#FFFAF5;border-left:4px solid #C8A97D;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#7A3B5E;">Office Location</p>
          <p style="margin:0 0 10px;font-size:13px;color:#4A4A5C;">430 Hazeldean Rd, Ottawa, ON K2L 1E8 — Canada. Please arrive 5 minutes early.</p>
        </div>`
      : `<div style="${styles.card};background:#FFFAF5;border-left:4px solid #C8A97D;">
          <p style="margin:0;font-size:13px;color:#4A4A5C;">Your video call link will be shared via email and calendar invite before the session.</p>
        </div>`;

  const tipsHtml = prepTips?.length
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#7A3B5E;">Prepare for Your Session</p>
        ${prepTips.map(t => `<p style="margin:0 0 4px;font-size:13px;color:#4A4A5C;">&#8226; ${t}</p>`).join('')}
      </div>`
    : '';

  const aiMessageHtml = aiMessage
    ? `<p style="${styles.text};font-style:italic;color:#7A3B5E;">${aiMessage}</p>`
    : '';

  const content = `
    <div style="${styles.card}">
      <div style="text-align:center;margin:0 0 16px;">
        <div style="display:inline-block;width:56px;height:56px;border-radius:50%;background:#F0FAF5;line-height:56px;font-size:28px;text-align:center;color:#3B8A6E;">&#10003;</div>
      </div>
      <h2 style="${styles.heading};text-align:center;">Your Session is Confirmed &amp; Paid</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">Thank you! Your payment has been received and your session with Dr. Hala is locked in. Here are the details:</p>
      ${aiMessageHtml}
    </div>
    ${sessionDetailsCard(booking)}
    ${joinHtml}
    ${tipsHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">Add to Your Calendar</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken)}" style="${styles.buttonSecondary}">Reschedule or Cancel</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Need anything before your session? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp us at ${BUSINESS.phone}</a> or reply to this email.</p>
      <p style="${styles.muted}">Booking ID: ${booking.bookingId}</p>
    </div>`;

  return {
    subject: `Your session is locked in — ${serviceName}`,
    html: wrapEmail(content),
    icsContent: generateBookingICS(booking),
  };
}

// ─── 2. 24-Hour Reminder Email ──────────────────────────────────

export function buildReminder24hEmail(
  booking: Booking,
  manageToken: string,
  aiReminderContent?: string,
): { subject: string; html: string } {
  const firstName = booking.clientName.split(' ')[0];
  const timeStr = formatTime(booking.startTime, booking.clientTimezone);
  const dateStr = formatDateTime(booking.startTime, booking.clientTimezone);

  const aiHtml = aiReminderContent
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">${aiReminderContent}</p>
      </div>`
    : '';

  // Meet link block — conditionally rendered if the booking has one.
  // For online sessions this is the single most important thing in the
  // email, so it sits right below the session details card.
  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:3px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">Join Online Session</p>
        <p style="margin:0 0 10px;font-size:12px;color:#4A4A5C;">Your Google Meet link is ready — save it now so you don&apos;t have to hunt for it tomorrow.</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:10px 24px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">Open Google Meet</a>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">Your Session is Tomorrow</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">This is a friendly reminder that your session with Dr. Hala is tomorrow at <strong>${timeStr}</strong>.</p>
      ${aiHtml}
    </div>
    ${sessionDetailsCard(booking)}
    ${meetHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">Add to Calendar</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken)}" style="${styles.buttonSecondary}">Need to Reschedule?</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Questions? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp us at ${BUSINESS.phone}</a></p>
    </div>`;

  return {
    subject: `Reminder: Your session with Dr. Hala is tomorrow`,
    html: wrapEmail(content),
  };
}

// ─── 3. 1-Hour Reminder Email ───────────────────────────────────

export function buildReminder1hEmail(
  booking: Booking,
): { subject: string; html: string } {
  const firstName = booking.clientName.split(' ')[0];
  const mode = booking.sessionMode === 'online'
    ? 'Please make sure you are in a quiet, private space with a good internet connection.'
    : 'The office is located at 430 Hazeldean Rd, Ottawa. Please arrive 5 minutes early.';

  // Big "Join Now" button for online sessions — this is THE most
  // important CTA at T-1h. If the client clicks this and nothing else,
  // the email did its job.
  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:4px solid #3B8A6E;text-align:center;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#3B8A6E;">Ready to Join?</p>
        <p style="margin:0 0 14px;font-size:12px;color:#4A4A5C;">The link is active now.</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:14px 36px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;">Join Google Meet</a>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">Starting Soon — 1 Hour</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">Your session with Dr. Hala starts in about 1 hour.</p>
      <p style="${styles.text}">${mode}</p>
      <div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">Take a few deep breaths. You are doing something wonderful for yourself.</p>
      </div>
    </div>
    ${meetHtml}
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Need to reach Dr. Hala urgently? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp ${BUSINESS.phone}</a></p>
    </div>`;

  return {
    subject: `Starting soon: Your session in 1 hour`,
    html: wrapEmail(content),
  };
}

// ─── 4. Reschedule Confirmation Email ───────────────────────────

export function buildRescheduleEmail(
  oldBooking: Booking,
  newBooking: Booking,
  manageToken: string,
): { subject: string; html: string; icsContent: string } {
  const firstName = newBooking.clientName.split(' ')[0];
  const oldDateTime = formatDateTime(oldBooking.startTime, oldBooking.clientTimezone);
  const newDateTime = formatDateTime(newBooking.startTime, newBooking.clientTimezone);

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">Session Rescheduled</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">Your session has been successfully rescheduled.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
        <tr>
          <td style="padding:8px 12px;background:#FFF5F5;border-radius:8px;">
            <p style="margin:0;font-size:12px;color:#8E8E9F;">Previous time</p>
            <p style="margin:0;font-size:14px;color:#C45B5B;text-decoration:line-through;">${oldDateTime}</p>
          </td>
        </tr>
        <tr><td style="padding:4px;"></td></tr>
        <tr>
          <td style="padding:8px 12px;background:#F0FAF5;border-radius:8px;">
            <p style="margin:0;font-size:12px;color:#8E8E9F;">New time</p>
            <p style="margin:0;font-size:14px;color:#3B8A6E;font-weight:600;">${newDateTime}</p>
          </td>
        </tr>
      </table>
    </div>
    ${sessionDetailsCard(newBooking)}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(newBooking)}" style="${styles.button}">Update Calendar</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken)}" style="${styles.buttonSecondary}">Manage Booking</a>
    </div>`;

  return {
    subject: `Session rescheduled — new time confirmed`,
    html: wrapEmail(content),
    icsContent: generateBookingICS(newBooking),
  };
}

// ─── 5. Cancellation Confirmation Email ─────────────────────────

export function buildCancellationEmail(
  booking: Booking,
): { subject: string; html: string; icsContent: string } {
  const firstName = booking.clientName.split(' ')[0];
  const dateTime = formatDateTime(booking.startTime, booking.clientTimezone);

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">Session Cancelled</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">Your session on <strong>${dateTime}</strong> has been cancelled.</p>
      ${booking.cancelReason ? `<p style="${styles.text}">Reason: ${booking.cancelReason}</p>` : ''}
      <p style="${styles.text}">We understand that plans change. Whenever you are ready, we would love to see you.</p>
    </div>
    <div style="text-align:center;padding:8px 0 20px;">
      <a href="${SITE_URL}/en/book" style="${styles.button}">Book a New Session</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Questions? Reach us at ${BUSINESS.email} or <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp ${BUSINESS.phone}</a></p>
    </div>`;

  return {
    subject: `Your session has been cancelled`,
    html: wrapEmail(content),
    icsContent: generateCancelICS(booking),
  };
}

// ─── 6. Admin Notification Email ────────────────────────────────

export type AdminNotificationType = 'new-booking' | 'pending-approval' | 'cancellation' | 'reschedule' | 'payment-received';

export function buildAdminNotificationEmail(
  type: AdminNotificationType,
  booking: Booking,
  extraInfo?: { oldBooking?: Booking },
): { subject: string; html: string } {
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = formatDateTime(booking.startTime, 'America/Toronto');

  const typeLabels: Record<AdminNotificationType, { label: string; color: string }> = {
    'new-booking': { label: 'New Booking', color: '#3B8A6E' },
    'pending-approval': { label: 'Needs Your Approval', color: '#C8A97D' },
    cancellation: { label: 'Cancellation', color: '#C45B5B' },
    reschedule: { label: 'Rescheduled', color: '#D49A4E' },
    'payment-received': { label: 'Payment Received', color: '#3B8A6E' },
  };

  const { label, color } = typeLabels[type];

  const subjects: Record<AdminNotificationType, string> = {
    'new-booking': `[Booking] Confirmed: ${booking.clientName} — ${serviceName}`,
    'pending-approval': `[Action Required] New request: ${booking.clientName} — ${serviceName}`,
    cancellation: `[Booking] Cancelled: ${booking.clientName} — ${serviceName}`,
    reschedule: `[Booking] Rescheduled: ${booking.clientName} — ${serviceName}`,
    'payment-received': `[Booking] Paid: ${booking.clientName} — ${serviceName}`,
  };

  let extraHtml = '';
  if (type === 'reschedule' && extraInfo?.oldBooking) {
    const oldDt = formatDateTime(extraInfo.oldBooking.startTime, 'America/Toronto');
    extraHtml = `<p style="${styles.text}">Moved from: <span style="text-decoration:line-through;color:#C45B5B;">${oldDt}</span></p>`;
  }
  if (type === 'cancellation' && booking.cancelReason) {
    extraHtml = `<p style="${styles.text}">Reason: ${booking.cancelReason}</p>`;
  }

  const content = `
    <div style="${styles.card}">
      <div style="display:inline-block;padding:4px 12px;background:${color};color:#FFFFFF;border-radius:6px;font-size:12px;font-weight:600;margin:0 0 16px;">${label}</div>
      <h2 style="${styles.heading};margin-top:12px;">${booking.clientName}</h2>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">Service</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${serviceName}</span></td></tr>
        <tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">When</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${dateTime}</span></td></tr>
        <tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">Email</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${booking.clientEmail}</span></td></tr>
        ${booking.clientPhone ? `<tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">Phone</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${booking.clientPhone}</span></td></tr>` : ''}
        <tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">Mode</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${booking.sessionMode === 'online' ? 'Online' : 'In-Person'}</span></td></tr>
        ${booking.preferredLanguage ? `<tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">Language</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${booking.preferredLanguage === 'ar' ? 'Arabic' : 'English'}</span></td></tr>` : ''}
        ${booking.clientCountry ? `<tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">Location</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${booking.clientCountry}</span></td></tr>` : ''}
        <tr><td style="padding:4px 0;"><span style="${styles.detailLabel}">Source</span></td>
            <td style="padding:4px 0;"><span style="${styles.detailValue}">${booking.source}</span></td></tr>
      </table>
      ${extraHtml}
      ${booking.clientNotes ? `<div style="${styles.goldAccent}"><p style="margin:0;font-size:13px;color:#4A4A5C;"><strong>Client notes:</strong> ${booking.clientNotes}</p></div>` : ''}
      ${booking.aiIntakeNotes ? `<div style="${styles.goldAccent}"><p style="margin:0;font-size:13px;color:#4A4A5C;"><strong>AI intake summary:</strong> ${booking.aiIntakeNotes}</p></div>` : ''}
      ${type === 'pending-approval' ? `
        <div style="padding:20px 0 8px;text-align:center;">
          <p style="margin:0 0 12px;font-size:13px;color:#8E8E9F;">Review this request and take action:</p>
          <a href="${SITE_URL}/api/admin/booking/approve?id=${booking.bookingId}" style="display:inline-block;padding:14px 32px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin:0 6px;">Approve & Send Invoice</a>
          <a href="${SITE_URL}/api/admin/booking/decline?id=${booking.bookingId}" style="display:inline-block;padding:14px 32px;background:#C45B5B;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin:0 6px;">Decline</a>
        </div>
      ` : ''}
      <div style="padding:12px 0 0;text-align:center;">
        <a href="${SITE_URL}/admin?tab=bookings" style="display:inline-block;padding:10px 24px;background:#F5F0EB;color:#7A3B5E;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">Open Dashboard</a>
      </div>
    </div>`;

  return {
    subject: subjects[type],
    html: wrapEmail(content),
  };
}

// ─── Email Sender ───────────────────────────────────────────────

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// Client-facing emails: use verified Resend domain, or fallback to onboarding@resend.dev
// Once mamahala.ca DNS records are verified in Resend, switch to: 'Mama Hala Consulting <admin@mamahala.ca>'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>';
// Admin notifications go to ALL addresses in BUSINESS.adminEmails
const ADMIN_EMAILS = BUSINESS.adminEmails;
// Reply-to on client emails always admin@mamahala.ca
const REPLY_TO_EMAIL = BUSINESS.email; // admin@mamahala.ca

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  icsContent?: string;
  replyTo?: string;
}

export async function sendBookingEmail(options: SendEmailOptions): Promise<string | null> {
  if (!RESEND_API_KEY) {
    console.warn('[Booking Email] RESEND_API_KEY not set — skipping');
    return null;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    const attachments = options.icsContent
      ? [{
          filename: 'session.ics',
          content: Buffer.from(options.icsContent).toString('base64'),
          content_type: 'text/calendar; method=REQUEST',
        }]
      : [];

    // Resend returns { data, error } — it does NOT throw on API errors.
    // Must inspect `error` explicitly or failures silently disappear into
    // the void. This was the root cause of the "no emails arriving" bug
    // on 2026-04-15 after RESEND_FROM_EMAIL was switched to an unverified
    // domain — every send returned error, nobody checked it.
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo ?? REPLY_TO_EMAIL,
      attachments: attachments as any,
    });

    if (error) {
      console.error('[EMAIL FAILURE] Booking email rejected by Resend:', {
        to: options.to,
        from: FROM_EMAIL,
        subject: options.subject,
        errorName: (error as any).name,
        errorMessage: (error as any).message,
      });
      return null;
    }

    return (data as any)?.id ?? null;
  } catch (err) {
    console.error('[EMAIL FAILURE] Booking email threw:', {
      to: options.to,
      from: FROM_EMAIL,
      error: err instanceof Error ? err.message : String(err),
    });
    return null;
  }
}

/**
 * Send admin notification (to Dr. Hala).
 * Returns the per-recipient results so callers can surface them in
 * API responses or logs for end-to-end visibility.
 */
export async function notifyAdmin(
  type: AdminNotificationType,
  booking: Booking,
  extraInfo?: { oldBooking?: Booking },
): Promise<Array<{ to: string; messageId: string | null }>> {
  const { subject, html } = buildAdminNotificationEmail(type, booking, extraInfo);
  // Log upfront so we can see the recipient list at runtime even if
  // the Promise.all is somehow partial.
  console.error('[Admin Notify] dispatching', {
    type,
    bookingId: booking.bookingId,
    adminEmails: ADMIN_EMAILS,
    adminEmailsLength: ADMIN_EMAILS.length,
  });
  const results = await Promise.all(
    ADMIN_EMAILS.map(async email => {
      const id = await sendBookingEmail({
        to: email,
        subject,
        html,
        replyTo: booking.clientEmail || undefined,
      });
      console.error('[Admin Notify] send result', { to: email, messageId: id });
      return { to: email, messageId: id };
    }),
  );
  const delivered = results.filter(r => r.messageId).length;
  if (delivered < ADMIN_EMAILS.length) {
    console.error('[Admin Notify] INCOMPLETE: only', delivered, 'of', ADMIN_EMAILS.length, 'sends succeeded', { results });
  }
  return results;
}

// ─── 7. Payment Confirmation Email ──────────────────────────────

export function buildPaymentConfirmationEmail(
  booking: Booking,
  manageToken: string,
): { subject: string; html: string } {
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = formatDateTime(booking.startTime, booking.clientTimezone);

  const meetHtml = booking.meetLink
    ? `<div style="text-align:center;padding:12px 0;">
        <a href="${booking.meetLink}" style="${styles.button};background:#3B8A6E;">Join via Google Meet</a>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <div style="text-align:center;margin:0 0 16px;">
        <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#F0FAF5;line-height:48px;font-size:24px;text-align:center;">&#10003;</div>
      </div>
      <h2 style="${styles.heading};text-align:center;">Payment Received — Session Confirmed!</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">Thank you for your payment. Your session is now fully confirmed and Dr. Hala is looking forward to meeting you.</p>
    </div>
    ${sessionDetailsCard(booking)}
    ${meetHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">Add to Calendar</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken)}" style="${styles.buttonSecondary}">Manage Booking</a>
    </div>`;

  return {
    subject: `Payment confirmed — ${serviceName} on ${dateTime}`,
    html: wrapEmail(content),
  };
}

// ─── 8. Post-Session Follow-Up Email ────────────────────────────

export function buildFollowUpEmail(
  booking: Booking,
  aiFollowUpMessage?: string,
): { subject: string; html: string } {
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');

  const aiHtml = aiFollowUpMessage
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;font-style:italic;">${aiFollowUpMessage}</p>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">Thank You, ${firstName}</h2>
      <p style="${styles.text}">Thank you for your session today. Taking time for yourself is one of the most important investments you can make, and we are honored to be part of your journey.</p>
      ${aiHtml}
      <p style="${styles.text}">If anything comes up between sessions, please do not hesitate to reach out. We are here for you.</p>
      <p style="${styles.text};font-weight:600;color:#7A3B5E;">With warmth,<br/>Dr. Hala Ali</p>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.subheading}">What's Next?</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:8px 0;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#4A4A5C;">Book Your Next Session</p>
          <p style="margin:0;font-size:12px;color:#8E8E9F;">Consistency is key to growth. Schedule your next session at a time that works for you.</p>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#4A4A5C;">Reflect & Journal</p>
          <p style="margin:0;font-size:12px;color:#8E8E9F;">Take a few minutes to write down any insights or feelings from today's session.</p>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#4A4A5C;">Practice Self-Care</p>
          <p style="margin:0;font-size:12px;color:#8E8E9F;">Be gentle with yourself today. Drink water, rest, and give yourself space to process.</p>
        </td></tr>
      </table>
    </div>
    <div style="text-align:center;padding:16px 0 20px;">
      <a href="${SITE_URL}/en/book" style="${styles.button}">Book Next Session</a>
    </div>
    <div style="text-align:center;padding:0 0 12px;">
      <a href="${SITE_URL}/en/account" style="${styles.buttonSecondary}">View My Account</a>
    </div>
    <div style="text-align:center;padding:12px 0;">
      <p style="${styles.muted}">Questions or need support? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp us at ${BUSINESS.phone}</a> or <a href="mailto:${BUSINESS.email}" style="color:#7A3B5E;">${BUSINESS.email}</a></p>
    </div>`;

  return {
    subject: `Thank you for your session — ${serviceName}`,
    html: wrapEmail(content),
  };
}

// ─── 9. Status → Confirmed Email (admin-triggered) ───────────

export function buildStatusConfirmedEmail(
  booking: Booking,
  manageToken?: string,
): { subject: string; html: string } {
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = formatDateTime(booking.startTime, booking.clientTimezone);

  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:3px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">Join Online Session</p>
        <p style="margin:0 0 10px;font-size:12px;color:#4A4A5C;">Your Google Meet link is ready.</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:10px 24px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">Open Google Meet</a>
      </div>`
    : booking.sessionMode === 'online'
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">Your video call link will be shared before the session via email and calendar invite.</p>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <div style="text-align:center;margin:0 0 16px;">
        <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#F0FAF5;line-height:48px;font-size:24px;text-align:center;">&#10003;</div>
      </div>
      <h2 style="${styles.heading};text-align:center;">Your Session is Confirmed!</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">Great news — your <strong>${serviceName}</strong> session is now confirmed. Dr. Hala is looking forward to meeting you.</p>
    </div>
    ${sessionDetailsCard(booking)}
    ${meetHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">Add to Calendar</a>
    </div>
    ${manageToken ? `<div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken)}" style="${styles.buttonSecondary}">Manage Booking</a>
    </div>` : ''}
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Questions? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp us at ${BUSINESS.phone}</a></p>
    </div>`;

  return {
    subject: `Your session is confirmed — ${serviceName} on ${dateTime}`,
    html: wrapEmail(content),
  };
}

// ─── 10. Status → Completed Email (admin-triggered) ──────────

export function buildStatusCompletedEmail(
  booking: Booking,
): { subject: string; html: string } {
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">Session Complete</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">Your <strong>${serviceName}</strong> session has been marked as complete. Thank you for investing in yourself — we are honored to be part of your journey.</p>
      <div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">Take a moment to reflect. Growth happens one step at a time.</p>
      </div>
    </div>
    <div style="text-align:center;padding:16px 0 20px;">
      <a href="${SITE_URL}/en/book" style="${styles.button}">Book Next Session</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Questions or need support? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp us at ${BUSINESS.phone}</a> or <a href="mailto:${BUSINESS.email}" style="color:#7A3B5E;">${BUSINESS.email}</a></p>
    </div>`;

  return {
    subject: `Session complete — thank you, ${firstName}`,
    html: wrapEmail(content),
  };
}

// ─── 11. Status → No-Show Email (admin-triggered) ────────────

export function buildStatusNoShowEmail(
  booking: Booking,
): { subject: string; html: string } {
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = formatDateTime(booking.startTime, booking.clientTimezone);

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">We Missed You</h2>
      <p style="${styles.text}">Hi ${firstName},</p>
      <p style="${styles.text}">We noticed you were unable to attend your <strong>${serviceName}</strong> session on <strong>${dateTime}</strong>. We hope everything is okay.</p>
      <p style="${styles.text}">Life gets busy, and we completely understand. Whenever you are ready, we would love to reschedule your session.</p>
    </div>
    <div style="text-align:center;padding:16px 0 20px;">
      <a href="${SITE_URL}/en/book" style="${styles.button}">Reschedule Session</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">Need to talk? <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">WhatsApp us at ${BUSINESS.phone}</a> or <a href="mailto:${BUSINESS.email}" style="color:#7A3B5E;">${BUSINESS.email}</a></p>
    </div>`;

  return {
    subject: `We missed you — ${serviceName}`,
    html: wrapEmail(content),
  };
}
