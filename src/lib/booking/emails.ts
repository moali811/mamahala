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
import { emailCopy, type EmailLocale } from './email-copy';
import { SITE_URL } from '@/lib/site-url';
import { computeAdminActionToken } from './admin-action-token';
import { resolveInPersonAddress, getEffectiveLocation } from './provider-location';

async function inPersonAddressFor(booking: Booking, locale: EmailLocale): Promise<string> {
  if (booking.effectiveLocationLabel) {
    return resolveInPersonAddress(booking.effectiveLocationLabel, locale);
  }
  const eff = await getEffectiveLocation(booking.startTime);
  return resolveInPersonAddress(eff.locationLabel, locale);
}

// ─── Formatting Helpers ─────────────────────────────────────────

// Formats a datetime like "Monday, April 21 at 11:00 AM" in the given
// IANA timezone. Previously included the year + used comma separators,
// producing awkward subject lines like "Monday, April 21, 2026, 11:00 AM"
// where the year break mid-string read as a timestamp typo in inbox
// previews. Year is dropped (always "current" in transactional context);
// ` at ` separator between date and time reads cleaner.
function formatDateTime(iso: string, timezone: string): string {
  try {
    const d = new Date(iso);
    const datePart = d.toLocaleString('en-US', {
      timeZone: timezone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    const timePart = d.toLocaleString('en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `${datePart} at ${timePart}`;
  } catch {
    return iso;
  }
}

function formatDateTimeAr(iso: string, timezone: string): string {
  try {
    const d = new Date(iso);
    const datePart = d.toLocaleString('ar', {
      timeZone: timezone,
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
    const timePart = d.toLocaleString('ar', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
    });
    return `${datePart} — ${timePart}`;
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

function formatTimeLocalized(iso: string, timezone: string, locale: EmailLocale): string {
  try {
    return new Date(iso).toLocaleString(locale === 'ar' ? 'ar' : 'en-US', {
      timeZone: timezone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: locale !== 'ar',
    });
  } catch {
    return iso;
  }
}

function getCalendarUrl(booking: Booking): string {
  const title = encodeURIComponent(`Counseling Session — Mama Hala Consulting`);
  const details = encodeURIComponent(
    `${booking.serviceName || booking.serviceSlug}\nBooking ID: ${booking.bookingId}`,
  );
  const location = encodeURIComponent(
    booking.sessionMode === 'online'
      ? 'Online'
      : resolveInPersonAddress(booking.effectiveLocationLabel, 'en'),
  );
  const start = booking.startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = booking.endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

// ─── Email Wrapper (delegates to shared branded wrapper with logo) ──

function wrapEmail(content: string, locale?: EmailLocale): string {
  return emailWrapper(content, { locale });
}

function getManageUrl(manageToken: string, locale?: EmailLocale): string {
  return `${SITE_URL}/${locale === 'ar' ? 'ar' : 'en'}/book/manage?token=${manageToken}`;
}

// ─── Session Details Card (reused) ──────────────────────────────

function sessionDetailsCard(booking: Booking, locale?: EmailLocale): string {
  const t = emailCopy(locale);
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = locale === 'ar'
    ? formatDateTimeAr(booking.startTime, booking.clientTimezone)
    : formatDateTime(booking.startTime, booking.clientTimezone);
  const mode = booking.sessionMode === 'online' ? t.labels.modeOnline : t.labels.modeInPerson;
  const valueAlign = locale === 'ar' ? 'left' : 'right';

  return `<div style="${styles.card}">
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">${t.labels.service}</span></td>
          <td style="padding:6px 0;text-align:${valueAlign};"><span style="${styles.detailValue}">${serviceName}</span></td></tr>
      <tr><td colspan="2" style="border-bottom:1px solid #F0ECE8;"></td></tr>
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">${t.labels.dateTime}</span></td>
          <td style="padding:6px 0;text-align:${valueAlign};"><span style="${styles.detailValue}">${dateTime}</span></td></tr>
      <tr><td colspan="2" style="border-bottom:1px solid #F0ECE8;"></td></tr>
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">${t.labels.duration}</span></td>
          <td style="padding:6px 0;text-align:${valueAlign};"><span style="${styles.detailValue}">${t.labels.minutes(booking.durationMinutes)}</span></td></tr>
      <tr><td colspan="2" style="border-bottom:1px solid #F0ECE8;"></td></tr>
      <tr><td style="padding:6px 0;"><span style="${styles.detailLabel}">${t.labels.mode}</span></td>
          <td style="padding:6px 0;text-align:${valueAlign};"><span style="${styles.detailValue}">${mode}</span></td></tr>
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
  const { booking, manageToken, prepTips, aiMessage } = data;
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const firstName = booking.clientName.split(' ')[0];
  const isPendingApproval = booking.status === 'pending_approval';

  const tipsHtml = prepTips?.length
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#7A3B5E;">${t.confirmation.tipsHeading}</p>
        ${prepTips.map(tip => `<p style="margin:0 0 4px;font-size:13px;color:#4A4A5C;">&#8226; ${tip}</p>`).join('')}
      </div>`
    : '';

  const aiMessageHtml = aiMessage
    ? `<p style="${styles.text};font-style:italic;color:#7A3B5E;">${aiMessage}</p>`
    : '';

  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:3px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">${t.confirmation.meetHeading}</p>
        <p style="margin:0 0 10px;font-size:12px;color:#4A4A5C;">${t.confirmation.meetHint}</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:10px 24px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">${t.confirmation.meetCta}</a>
      </div>`
    : '';

  const pendingBanner = isPendingApproval
    ? `<div style="${styles.card};background:#FFFAF5;border:2px solid #C8A97D;">
        <p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#7A3B5E;">${t.confirmation.pendingBannerHeading}</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="padding:8px 0;vertical-align:top;width:28px;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#C8A97D;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">1</span></td>
              <td style="padding:8px 0 8px 8px;"><p style="margin:0;font-size:13px;color:#4A4A5C;">${t.confirmation.step1}</p></td></tr>
          <tr><td style="padding:8px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#C8A97D;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">2</span></td>
              <td style="padding:8px 0 8px 8px;"><p style="margin:0;font-size:13px;color:#4A4A5C;">${t.confirmation.step2}</p></td></tr>
          <tr><td style="padding:8px 0;vertical-align:top;"><span style="display:inline-block;width:22px;height:22px;border-radius:50%;background:#3B8A6E;color:#fff;text-align:center;line-height:22px;font-size:11px;font-weight:700;">3</span></td>
              <td style="padding:8px 0 8px 8px;"><p style="margin:0;font-size:13px;color:#4A4A5C;">${t.confirmation.step3}</p></td></tr>
        </table>
      </div>`
    : '';

  const heading = isPendingApproval ? t.confirmation.headingPending : t.confirmation.headingApproved;
  const statusText = isPendingApproval ? t.confirmation.statusTextPending : t.confirmation.statusTextApproved;
  const manageLabel = isPendingApproval ? t.confirmation.manageViewCancel : t.confirmation.manageReschedule;

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${statusText}</p>
      ${aiMessageHtml}
    </div>
    ${pendingBanner}
    ${sessionDetailsCard(booking, locale)}
    ${meetHtml}
    ${!isPendingApproval ? tipsHtml : ''}
    ${!isPendingApproval ? `<div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">${t.confirmation.addToCalendar}</a>
    </div>` : ''}
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken, locale)}" style="${styles.buttonSecondary}">${manageLabel}</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.needHelp} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a> · ${BUSINESS.email}</p>
      <p style="${styles.muted}">${t.bookingIdLabel}: <span dir="ltr">${booking.bookingId}</span></p>
    </div>`;

  return {
    subject: isPendingApproval
      ? t.confirmation.subjectPending(serviceName)
      : t.confirmation.subjectApproved(serviceName),
    html: wrapEmail(content, locale),
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

export async function buildSessionLockedInEmail(
  data: SessionLockedInEmailData,
): Promise<{ subject: string; html: string; icsContent: string }> {
  const { booking, manageToken, prepTips, aiMessage } = data;
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const firstName = booking.clientName.split(' ')[0];
  const inPersonAddr = booking.sessionMode === 'inPerson'
    ? await inPersonAddressFor(booking, locale)
    : '';

  const joinHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:4px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#3B8A6E;">${t.lockedIn.meetHeading}</p>
        <p style="margin:0 0 14px;font-size:13px;color:#4A4A5C;">${t.lockedIn.meetHint}</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:12px 32px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;">${t.lockedIn.meetCta}</a>
      </div>`
    : booking.sessionMode === 'inPerson'
      ? `<div style="${styles.card};background:#FFFAF5;border-left:4px solid #C8A97D;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#7A3B5E;">${t.lockedIn.officeHeading}</p>
          <p style="margin:0 0 10px;font-size:13px;color:#4A4A5C;">${t.lockedIn.officeBody(inPersonAddr)}</p>
        </div>`
      : `<div style="${styles.card};background:#FFFAF5;border-left:4px solid #C8A97D;">
          <p style="margin:0;font-size:13px;color:#4A4A5C;">${t.lockedIn.onlineFallback}</p>
        </div>`;

  const tipsHtml = prepTips?.length
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0 0 8px;font-size:13px;font-weight:600;color:#7A3B5E;">${t.lockedIn.tipsHeading}</p>
        ${prepTips.map(tip => `<p style="margin:0 0 4px;font-size:13px;color:#4A4A5C;">&#8226; ${tip}</p>`).join('')}
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
      <h2 style="${styles.heading};text-align:center;">${t.lockedIn.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.lockedIn.body}</p>
      ${aiMessageHtml}
    </div>
    ${sessionDetailsCard(booking, locale)}
    ${joinHtml}
    ${tipsHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">${t.lockedIn.addToCalendar}</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken, locale)}" style="${styles.buttonSecondary}">${t.lockedIn.manageReschedule}</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.lockedIn.needAnything} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a></p>
      <p style="${styles.muted}">${t.bookingIdLabel}: <span dir="ltr">${booking.bookingId}</span></p>
    </div>`;

  return {
    subject: t.lockedIn.subject(serviceName),
    html: wrapEmail(content, locale),
    icsContent: generateBookingICS(booking),
  };
}

// ─── 2. 24-Hour Reminder Email ──────────────────────────────────

export function buildReminder24hEmail(
  booking: Booking,
  manageToken: string,
  aiReminderContent?: string,
): { subject: string; html: string } {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const timeStr = formatTimeLocalized(booking.startTime, booking.clientTimezone, locale);

  const aiHtml = aiReminderContent
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">${aiReminderContent}</p>
      </div>`
    : '';

  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:3px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">${t.reminder24h.meetHeading}</p>
        <p style="margin:0 0 10px;font-size:12px;color:#4A4A5C;">${t.reminder24h.meetHint}</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:10px 24px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">${t.reminder24h.meetCta}</a>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${t.reminder24h.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.reminder24h.body(timeStr)}</p>
      ${aiHtml}
    </div>
    ${sessionDetailsCard(booking, locale)}
    ${meetHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">${t.reminder24h.addToCalendar}</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken, locale)}" style="${styles.buttonSecondary}">${t.reminder24h.needReschedule}</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.reminder24h.questions} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a></p>
    </div>`;

  return {
    subject: t.reminder24h.subject,
    html: wrapEmail(content, locale),
  };
}

// ─── 3. 1-Hour Reminder Email ───────────────────────────────────

export async function buildReminder1hEmail(
  booking: Booking,
): Promise<{ subject: string; html: string }> {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const mode = booking.sessionMode === 'online'
    ? t.reminder1h.modeOnline
    : t.reminder1h.modeInPerson(await inPersonAddressFor(booking, locale));

  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:4px solid #3B8A6E;text-align:center;">
        <p style="margin:0 0 6px;font-size:14px;font-weight:700;color:#3B8A6E;">${t.reminder1h.readyToJoin}</p>
        <p style="margin:0 0 14px;font-size:12px;color:#4A4A5C;">${t.reminder1h.activeNow}</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:14px 36px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;">${t.reminder1h.joinCta}</a>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${t.reminder1h.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.reminder1h.intro}</p>
      <p style="${styles.text}">${mode}</p>
      <div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">${t.reminder1h.encouragement}</p>
      </div>
    </div>
    ${meetHtml}
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.reminder1h.urgentContact} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a></p>
    </div>`;

  return {
    subject: t.reminder1h.subject,
    html: wrapEmail(content, locale),
  };
}

// ─── 4. Reschedule Confirmation Email ───────────────────────────

export function buildRescheduleEmail(
  oldBooking: Booking,
  newBooking: Booking,
  manageToken: string,
): { subject: string; html: string; icsContent: string } {
  const locale: EmailLocale = newBooking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = newBooking.clientName.split(' ')[0];
  const oldDateTime = locale === 'ar'
    ? formatDateTimeAr(oldBooking.startTime, oldBooking.clientTimezone)
    : formatDateTime(oldBooking.startTime, oldBooking.clientTimezone);
  const newDateTime = locale === 'ar'
    ? formatDateTimeAr(newBooking.startTime, newBooking.clientTimezone)
    : formatDateTime(newBooking.startTime, newBooking.clientTimezone);

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${t.reschedule.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.reschedule.intro}</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
        <tr>
          <td style="padding:8px 12px;background:#FFF5F5;border-radius:8px;">
            <p style="margin:0;font-size:12px;color:#8E8E9F;">${t.reschedule.previousTime}</p>
            <p style="margin:0;font-size:14px;color:#C45B5B;text-decoration:line-through;">${oldDateTime}</p>
          </td>
        </tr>
        <tr><td style="padding:4px;"></td></tr>
        <tr>
          <td style="padding:8px 12px;background:#F0FAF5;border-radius:8px;">
            <p style="margin:0;font-size:12px;color:#8E8E9F;">${t.reschedule.newTime}</p>
            <p style="margin:0;font-size:14px;color:#3B8A6E;font-weight:600;">${newDateTime}</p>
          </td>
        </tr>
      </table>
    </div>
    ${sessionDetailsCard(newBooking, locale)}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(newBooking)}" style="${styles.button}">${t.reschedule.updateCalendar}</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken, locale)}" style="${styles.buttonSecondary}">${t.reschedule.manageBooking}</a>
    </div>`;

  return {
    subject: t.reschedule.subject,
    html: wrapEmail(content, locale),
    icsContent: generateBookingICS(newBooking),
  };
}

// ─── 5. Cancellation Confirmation Email ─────────────────────────

export function buildCancellationEmail(
  booking: Booking,
): { subject: string; html: string; icsContent: string } {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const dateTime = locale === 'ar'
    ? formatDateTimeAr(booking.startTime, booking.clientTimezone)
    : formatDateTime(booking.startTime, booking.clientTimezone);

  // Fee notice — shown when a late-cancel fee was applied. Honest disclosure
  // so the client isn't surprised by a partial refund on their statement.
  let feeNoticeHtml = '';
  const feeCents = booking.cancellationFeeAppliedCents ?? 0;
  const refundCents = booking.refundedAmountCents ?? 0;
  const currency = (booking.paidCurrency || 'CAD').toUpperCase();
  if (feeCents > 0) {
    const feeAmt = (feeCents / 100).toFixed(2);
    const refundAmt = (refundCents / 100).toFixed(2);
    if (locale === 'ar') {
      feeNoticeHtml = `
        <div style="${styles.card};background:#FFFAF0;border-color:#D49A4E33;">
          <p style="${styles.text};margin:0 0 6px;"><strong>تم تطبيق رسوم إلغاء متأخر</strong></p>
          <p style="${styles.text};margin:0;">تم خصم ${feeAmt} ${currency} كرسوم إلغاء متأخر، وسيتم استرداد ${refundAmt} ${currency} إلى بطاقتك خلال 5–10 أيام عمل.</p>
        </div>`;
    } else {
      feeNoticeHtml = `
        <div style="${styles.card};background:#FFFAF0;border-color:#D49A4E33;">
          <p style="${styles.text};margin:0 0 6px;"><strong>Late-cancel fee applied</strong></p>
          <p style="${styles.text};margin:0;">A ${feeAmt} ${currency} late-cancel fee has been retained; ${refundAmt} ${currency} will be refunded to your card within 5–10 business days.</p>
        </div>`;
    }
  } else if (refundCents > 0) {
    const refundAmt = (refundCents / 100).toFixed(2);
    if (locale === 'ar') {
      feeNoticeHtml = `
        <div style="${styles.card};background:#F0FAF5;border-color:#3B8A6E33;">
          <p style="${styles.text};margin:0;">سيتم استرداد ${refundAmt} ${currency} كاملًا إلى بطاقتك خلال 5–10 أيام عمل.</p>
        </div>`;
    } else {
      feeNoticeHtml = `
        <div style="${styles.card};background:#F0FAF5;border-color:#3B8A6E33;">
          <p style="${styles.text};margin:0;">A full refund of ${refundAmt} ${currency} will be returned to your card within 5–10 business days.</p>
        </div>`;
    }
  }

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${t.cancellation.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.cancellation.body(dateTime)}</p>
      ${booking.cancelReason ? `<p style="${styles.text}">${t.cancellation.reasonPrefix} ${booking.cancelReason}</p>` : ''}
      <p style="${styles.text}">${t.cancellation.note}</p>
    </div>
    ${feeNoticeHtml}
    <div style="text-align:center;padding:8px 0 20px;">
      <a href="${SITE_URL}/${locale}/book" style="${styles.button}">${t.cancellation.bookNew}</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.cancellation.questions} ${BUSINESS.email} · <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a></p>
    </div>`;

  return {
    subject: t.cancellation.subject,
    html: wrapEmail(content, locale),
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
  // Show time in client's timezone (primary) + Dr. Hala's timezone if different
  const clientTz = booking.clientTimezone || 'America/Toronto';
  const dateTime = formatDateTime(booking.startTime, clientTz);
  const clientTzLabel = clientTz.split('/').pop()?.replace(/_/g, ' ') || clientTz;

  const typeLabels: Record<AdminNotificationType, { label: string; color: string }> = {
    'new-booking': { label: 'New Booking', color: '#3B8A6E' },
    'pending-approval': { label: 'Needs Your Approval', color: '#C8A97D' },
    cancellation: { label: 'Cancellation', color: '#C45B5B' },
    reschedule: { label: 'Rescheduled', color: '#D49A4E' },
    'payment-received': { label: 'Payment Received', color: '#3B8A6E' },
  };

  const { label, color } = typeLabels[type];

  // Spam filters flag "[Action Required]" and bracketed prefixes as
  // urgency triggers. Use plain, descriptive subjects — spam score
  // improves significantly and the content still reads as clearly
  // transactional to Dr. Hala scanning her inbox.
  const subjects: Record<AdminNotificationType, string> = {
    'new-booking': `New booking confirmed — ${booking.clientName} for ${serviceName}`,
    'pending-approval': `New session request from ${booking.clientName} — ${serviceName}`,
    cancellation: `Session cancelled — ${booking.clientName} for ${serviceName}`,
    reschedule: `Session rescheduled — ${booking.clientName} for ${serviceName}`,
    'payment-received': `Payment received — ${booking.clientName} for ${serviceName}`,
  };

  let extraHtml = '';
  if (type === 'reschedule' && extraInfo?.oldBooking) {
    const oldDt = formatDateTime(extraInfo.oldBooking.startTime, extraInfo.oldBooking.clientTimezone || 'America/Toronto');
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
      ${type === 'pending-approval' ? (() => {
        const approveToken = computeAdminActionToken(booking.bookingId, 'approve');
        const declineToken = computeAdminActionToken(booking.bookingId, 'decline');
        return `
        <div style="padding:20px 0 8px;text-align:center;">
          <p style="margin:0 0 12px;font-size:13px;color:#8E8E9F;">Review this request and take action:</p>
          <a href="${SITE_URL}/api/admin/booking/approve?id=${booking.bookingId}&token=${approveToken}" style="display:inline-block;padding:14px 32px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin:0 6px;">Approve & Send Invoice</a>
          <a href="${SITE_URL}/api/admin/booking/decline?id=${booking.bookingId}&token=${declineToken}" style="display:inline-block;padding:14px 32px;background:#C45B5B;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:700;margin:0 6px;">Decline</a>
        </div>
      `;
      })() : ''}
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

/**
 * Standard deliverability headers for all transactional emails.
 *
 * Why these matter:
 * - List-Unsubscribe + List-Unsubscribe-Post is the single most
 *   effective header for transactional spam-score reduction. Mailbox
 *   providers (Gmail, Outlook, SiteGround/MailSpamProtection) reward
 *   senders who include it with higher inbox placement.
 * - Auto-Submitted: auto-generated flags the email as system-generated
 *   rather than human-authored, which most filters grade as lower
 *   spam risk for transactional content.
 * - Precedence: bulk is a soft signal; many filters check it.
 *
 * These were missing on 2026-04-15 when booking notifications to
 * admin@mamahala.ca started landing in the SiteGround junk folder
 * despite correct SPF/DKIM/DMARC alignment. Adding them won't make
 * spam filters love us overnight, but combined with marking past
 * junk emails as "Not Spam" (to train the filter), they should
 * restore inbox placement within a few sends.
 */
function deliverabilityHeaders(bookingId?: string): Record<string, string> {
  const headers: Record<string, string> = {
    'List-Unsubscribe': `<mailto:${BUSINESS.email}?subject=unsubscribe>`,
    'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    'Auto-Submitted': 'auto-generated',
    'Precedence': 'bulk',
  };
  if (bookingId) headers['X-Entity-Ref-ID'] = bookingId;
  return headers;
}

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
    // the void. Root cause of the 2026-04-15 "no emails arriving" bug.
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo ?? REPLY_TO_EMAIL,
      headers: deliverabilityHeaders(),
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
 * Send admin notification (to Dr. Hala and any other admin addresses).
 *
 * Uses Resend's batch API — sends ALL admin recipients in a single
 * HTTP call, which counts as ONE rate limit slot instead of N. This
 * sidesteps the 2-request/second rate limit that was silently
 * dropping one of every two parallel admin sends on 2026-04-15.
 *
 * Batch API does NOT support attachments, but admin notifications
 * never have attachments (no ICS, no PDF) so this is a good fit.
 *
 * Returns per-recipient results for end-to-end visibility.
 */
export async function notifyAdmin(
  type: AdminNotificationType,
  booking: Booking,
  extraInfo?: { oldBooking?: Booking },
): Promise<Array<{ to: string; messageId: string | null }>> {
  const { subject, html } = buildAdminNotificationEmail(type, booking, extraInfo);

  if (!RESEND_API_KEY) {
    console.warn('[Admin Notify] RESEND_API_KEY not set — skipping');
    return ADMIN_EMAILS.map(to => ({ to, messageId: null }));
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(RESEND_API_KEY);

    const payload = ADMIN_EMAILS.map(email => ({
      from: FROM_EMAIL,
      to: email,
      subject,
      html,
      replyTo: booking.clientEmail || REPLY_TO_EMAIL,
      headers: deliverabilityHeaders(booking.bookingId),
    }));

    const { data, error } = await resend.batch.send(payload as any);

    if (error) {
      console.error('[EMAIL FAILURE] Admin notify batch rejected by Resend:', {
        bookingId: booking.bookingId,
        errorName: (error as any).name,
        errorMessage: (error as any).message,
      });
      return ADMIN_EMAILS.map(to => ({ to, messageId: null }));
    }

    // Resend batch response: { data: { data: [{ id }, { id }] } }
    // Map each result back to its recipient by index.
    const batchData = (data as any)?.data ?? [];
    return ADMIN_EMAILS.map((to, i) => ({
      to,
      messageId: batchData[i]?.id ?? null,
    }));
  } catch (err) {
    console.error('[EMAIL FAILURE] Admin notify batch threw:', {
      bookingId: booking.bookingId,
      error: err instanceof Error ? err.message : String(err),
    });
    return ADMIN_EMAILS.map(to => ({ to, messageId: null }));
  }
}

// ─── 7. Payment Confirmation Email ──────────────────────────────

export function buildPaymentConfirmationEmail(
  booking: Booking,
  manageToken: string,
): { subject: string; html: string } {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = locale === 'ar'
    ? formatDateTimeAr(booking.startTime, booking.clientTimezone)
    : formatDateTime(booking.startTime, booking.clientTimezone);

  const meetHtml = booking.meetLink
    ? `<div style="text-align:center;padding:12px 0;">
        <a href="${booking.meetLink}" style="${styles.button};background:#3B8A6E;">${t.payment.meetCta}</a>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <div style="text-align:center;margin:0 0 16px;">
        <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#F0FAF5;line-height:48px;font-size:24px;text-align:center;">&#10003;</div>
      </div>
      <h2 style="${styles.heading};text-align:center;">${t.payment.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.payment.body}</p>
    </div>
    ${sessionDetailsCard(booking, locale)}
    ${meetHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">${t.payment.addToCalendar}</a>
    </div>
    <div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken, locale)}" style="${styles.buttonSecondary}">${t.payment.manageBooking}</a>
    </div>`;

  return {
    subject: t.payment.subject(serviceName, dateTime),
    html: wrapEmail(content, locale),
  };
}

// ─── 8. Post-Session Follow-Up Email ────────────────────────────

export function buildFollowUpEmail(
  booking: Booking,
  aiFollowUpMessage?: string,
): { subject: string; html: string } {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');

  const aiHtml = aiFollowUpMessage
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;font-style:italic;">${aiFollowUpMessage}</p>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${t.followUp.heading(firstName)}</h2>
      <p style="${styles.text}">${t.followUp.thanks}</p>
      ${aiHtml}
      <p style="${styles.text}">${t.followUp.care}</p>
      <p style="${styles.text};font-weight:600;color:#7A3B5E;">${t.followUp.signoff}</p>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.subheading}">${t.followUp.whatsNext}</p>
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:8px 0;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#4A4A5C;">${t.followUp.bookNextTitle}</p>
          <p style="margin:0;font-size:12px;color:#8E8E9F;">${t.followUp.bookNextBody}</p>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#4A4A5C;">${t.followUp.reflectTitle}</p>
          <p style="margin:0;font-size:12px;color:#8E8E9F;">${t.followUp.reflectBody}</p>
        </td></tr>
        <tr><td style="padding:8px 0;">
          <p style="margin:0 0 4px;font-size:13px;font-weight:600;color:#4A4A5C;">${t.followUp.selfCareTitle}</p>
          <p style="margin:0;font-size:12px;color:#8E8E9F;">${t.followUp.selfCareBody}</p>
        </td></tr>
      </table>
    </div>
    <div style="text-align:center;padding:16px 0 20px;">
      <a href="${SITE_URL}/${locale}/book" style="${styles.button}">${t.followUp.bookNextCta}</a>
    </div>
    <div style="text-align:center;padding:0 0 12px;">
      <a href="${SITE_URL}/${locale}/account" style="${styles.buttonSecondary}">${t.followUp.viewAccount}</a>
    </div>
    <div style="text-align:center;padding:12px 0;">
      <p style="${styles.muted}">${t.followUp.contact} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a> · <a href="mailto:${BUSINESS.email}" style="color:#7A3B5E;">${BUSINESS.email}</a></p>
    </div>`;

  return {
    subject: t.followUp.subject(serviceName),
    html: wrapEmail(content, locale),
  };
}

// ─── 9. Status → Confirmed Email (admin-triggered) ───────────

export function buildStatusConfirmedEmail(
  booking: Booking,
  manageToken?: string,
): { subject: string; html: string } {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = locale === 'ar'
    ? formatDateTimeAr(booking.startTime, booking.clientTimezone)
    : formatDateTime(booking.startTime, booking.clientTimezone);

  const meetHtml = booking.meetLink
    ? `<div style="${styles.card};background:#F0FAF5;border-left:3px solid #3B8A6E;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#3B8A6E;">${t.statusConfirmed.meetHeading}</p>
        <p style="margin:0 0 10px;font-size:12px;color:#4A4A5C;">${t.statusConfirmed.meetHint}</p>
        <a href="${booking.meetLink}" style="display:inline-block;padding:10px 24px;background:#3B8A6E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;">${t.statusConfirmed.meetCta}</a>
      </div>`
    : booking.sessionMode === 'online'
    ? `<div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">${t.statusConfirmed.onlineFallback}</p>
      </div>`
    : '';

  const content = `
    <div style="${styles.card}">
      <div style="text-align:center;margin:0 0 16px;">
        <div style="display:inline-block;width:48px;height:48px;border-radius:50%;background:#F0FAF5;line-height:48px;font-size:24px;text-align:center;">&#10003;</div>
      </div>
      <h2 style="${styles.heading};text-align:center;">${t.statusConfirmed.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.statusConfirmed.body(serviceName)}</p>
    </div>
    ${sessionDetailsCard(booking, locale)}
    ${meetHtml}
    <div style="text-align:center;padding:8px 0 12px;">
      <a href="${getCalendarUrl(booking)}" style="${styles.button}">${t.statusConfirmed.addToCalendar}</a>
    </div>
    ${manageToken ? `<div style="text-align:center;padding:0 0 20px;">
      <a href="${getManageUrl(manageToken, locale)}" style="${styles.buttonSecondary}">${t.statusConfirmed.manageBooking}</a>
    </div>` : ''}
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.statusConfirmed.questions} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a></p>
    </div>`;

  return {
    subject: t.statusConfirmed.subject(serviceName, dateTime),
    html: wrapEmail(content, locale),
  };
}

// ─── 10. Status → Completed Email (admin-triggered) ──────────

export function buildStatusCompletedEmail(
  booking: Booking,
): { subject: string; html: string } {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${t.statusCompleted.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.statusCompleted.body(serviceName)}</p>
      <div style="${styles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#4A4A5C;">${t.statusCompleted.note}</p>
      </div>
    </div>
    <div style="text-align:center;padding:16px 0 20px;">
      <a href="${SITE_URL}/${locale}/book" style="${styles.button}">${t.statusCompleted.bookNext}</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.statusCompleted.questions} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a> · <a href="mailto:${BUSINESS.email}" style="color:#7A3B5E;">${BUSINESS.email}</a></p>
    </div>`;

  return {
    subject: t.statusCompleted.subject(firstName),
    html: wrapEmail(content, locale),
  };
}

// ─── 11. Status → No-Show Email (admin-triggered) ────────────

export function buildStatusNoShowEmail(
  booking: Booking,
): { subject: string; html: string } {
  const locale: EmailLocale = booking.preferredLanguage === 'ar' ? 'ar' : 'en';
  const t = emailCopy(locale);
  const firstName = booking.clientName.split(' ')[0];
  const serviceName = booking.serviceName || booking.serviceSlug.replace(/-/g, ' ');
  const dateTime = locale === 'ar'
    ? formatDateTimeAr(booking.startTime, booking.clientTimezone)
    : formatDateTime(booking.startTime, booking.clientTimezone);

  const content = `
    <div style="${styles.card}">
      <h2 style="${styles.heading}">${t.statusNoShow.heading}</h2>
      <p style="${styles.text}">${t.greetingPrefix(firstName)}</p>
      <p style="${styles.text}">${t.statusNoShow.body(serviceName, dateTime)}</p>
      <p style="${styles.text}">${t.statusNoShow.note}</p>
    </div>
    <div style="text-align:center;padding:16px 0 20px;">
      <a href="${SITE_URL}/${locale}/book" style="${styles.button}">${t.statusNoShow.reschedule}</a>
    </div>
    <div style="${styles.card};background:#FEFCFB;">
      <p style="${styles.muted}">${t.statusNoShow.contact} <a href="${BUSINESS.whatsappUrl}" style="color:#8E8E9F;">${t.whatsappUs} <span dir="ltr">${BUSINESS.phone}</span></a> · <a href="mailto:${BUSINESS.email}" style="color:#7A3B5E;">${BUSINESS.email}</a></p>
    </div>`;

  return {
    subject: t.statusNoShow.subject(serviceName),
    html: wrapEmail(content, locale),
  };
}
