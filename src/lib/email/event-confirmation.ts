/* ================================================================
   Event Registration Confirmation Email Template
   Table-based HTML for maximum email client compatibility.
   ================================================================ */

import type { SmartEvent } from '@/types';
import { generateGoogleCalendarUrl } from '@/lib/calendar';
import { getFormattedDate, getFormattedTime } from '@/data/events';

interface EventConfirmationParams {
  firstName: string;
  registrationId: string;
  event: SmartEvent;
  locale: string;
  waitlisted?: boolean;
}

export function generateEventConfirmationEmail(params: EventConfirmationParams): string {
  const { firstName, registrationId, event, locale, waitlisted } = params;
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const align = isAr ? 'right' : 'left';

  const title = isAr ? event.titleAr : event.titleEn;
  const location = isAr ? event.locationNameAr : event.locationNameEn;
  const formattedDate = getFormattedDate(event, locale);
  const formattedTime = getFormattedTime(event, locale);
  const whatToBring = isAr ? event.whatToBringAr : event.whatToBringEn;
  const calendarUrl = generateGoogleCalendarUrl(event, locale);
  const customMessage = isAr ? event.confirmationMessageAr : event.confirmationMessageEn;

  const locationIcon = event.locationType === 'online' ? '💻' : event.locationType === 'hybrid' ? '🔄' : '📍';

  const heading = waitlisted
    ? (isAr ? "أنت على قائمة الانتظار" : "You're on the Waitlist")
    : (isAr ? "تم تسجيلك بنجاح!" : "You're Registered!");

  const subheading = waitlisted
    ? (isAr ? `${firstName}، تم إضافتك لقائمة الانتظار. سنبلغك فور توفر مكان.` : `${firstName}, you've been added to the waitlist. We'll notify you if a spot opens up.`)
    : (isAr ? `${firstName}، نحن متحمسون لرؤيتك!` : `${firstName}, we're excited to see you!`);

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${locale}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Segoe UI',Tahoma,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:32px 16px;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

  <!-- Header -->
  <tr><td style="text-align:center;padding:24px 0 16px;">
    <p style="margin:0;font-size:18px;font-weight:700;color:#7A3B5E;letter-spacing:1px;">Mama Hala Consulting</p>
    <p style="margin:4px 0 0;font-size:12px;color:#C8A97D;letter-spacing:2px;text-transform:uppercase;">${isAr ? 'ماما هالة للاستشارات' : 'Guidance with Heart'}</p>
    <div style="width:60px;height:2px;background:#C8A97D;margin:16px auto 0;"></div>
  </td></tr>

  <!-- Confirmation Card -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#F0E0D8,#FAF0EC);border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px;text-align:center;">
        <div style="width:56px;height:56px;border-radius:50%;background:${waitlisted ? '#C8A97D' : '#3B8A6E'};margin:0 auto 16px;line-height:56px;font-size:28px;">${waitlisted ? '⏳' : '✓'}</div>
        <h1 style="margin:0;font-size:28px;color:#2D2A33;font-family:Georgia,serif;">${heading}</h1>
        <p style="margin:8px 0 0;font-size:16px;color:#4A4A5C;">${subheading}</p>
        <p style="margin:12px 0 0;font-size:12px;color:#8E8E9F;">${isAr ? 'رقم التسجيل' : 'Registration ID'}: ${registrationId}</p>
      </td></tr>
    </table>
  </td></tr>

  <!-- Event Details -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:24px;text-align:${align};">
        <h2 style="margin:0 0 16px;font-size:22px;color:#2D2A33;font-family:Georgia,serif;">${title}</h2>
        <table cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">📅</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${formattedDate}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">🕐</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${formattedTime}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">${locationIcon}</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${location}</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  ${customMessage ? `
  <!-- Custom Message -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border-radius:12px;border-left:4px solid #C8A97D;">
      <tr><td style="padding:16px 20px;font-size:14px;color:#4A4A5C;text-align:${align};">
        ${customMessage}
      </td></tr>
    </table>
  </td></tr>` : ''}

  ${!event.isFree && !waitlisted ? `
  <!-- Payment Info -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDF5F0;border-radius:12px;border:1px solid #D4836A30;">
      <tr><td style="padding:20px;text-align:center;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#D4836A;">💳 ${isAr ? 'الدفع مطلوب' : 'Payment Required'}</p>
        <p style="margin:0 0 12px;font-size:13px;color:#4A4A5C;">${isAr ? 'لإتمام تسجيلك، يرجى إرسال الدفع عبر واتساب أو التحويل الإلكتروني.' : 'To complete your registration, please send payment via WhatsApp or e-transfer.'}</p>
        <a href="https://wa.me/16132222104?text=${encodeURIComponent(isAr ? 'مرحباً، أريد إتمام الدفع لـ ' + (isAr ? event.titleAr : event.titleEn) : 'Hi, I want to complete payment for ' + event.titleEn)}" target="_blank" style="display:inline-block;padding:12px 28px;background:#25D366;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
          💬 ${isAr ? 'أكمل الدفع عبر واتساب' : 'Complete Payment via WhatsApp'}
        </a>
      </td></tr>
    </table>
  </td></tr>` : ''}

  <!-- Add to Calendar CTA -->
  ${!waitlisted ? `
  <tr><td style="padding:0 0 24px;text-align:center;">
    <a href="${calendarUrl}" target="_blank" style="display:inline-block;padding:14px 32px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">
      📅 ${isAr ? 'أضف إلى التقويم' : 'Add to Calendar'}
    </a>
  </td></tr>` : ''}

  ${whatToBring && whatToBring.length > 0 && !waitlisted ? `
  <!-- What to Bring -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:20px;text-align:${align};">
        <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#C8A97D;text-transform:uppercase;letter-spacing:1px;">🎒 ${isAr ? 'ماذا تحضر' : 'What to Bring'}</p>
        ${whatToBring.map(item => `<p style="margin:0 0 6px;font-size:14px;color:#4A4A5C;padding-${isAr ? 'right' : 'left'}:16px;">• ${item}</p>`).join('')}
      </td></tr>
    </table>
  </td></tr>` : ''}

  <!-- Questions -->
  <tr><td style="padding:0 0 24px;text-align:center;">
    <p style="margin:0 0 12px;font-size:14px;color:#8E8E9F;">${isAr ? 'أسئلة؟' : 'Questions?'}</p>
    <a href="https://wa.me/16132222104" target="_blank" style="display:inline-block;padding:10px 24px;background:#25D366;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
      💬 ${isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;padding:16px 0;border-top:1px solid #F3EFE8;">
    <p style="margin:0;font-size:12px;color:#8E8E9F;">Mama Hala Consulting — ${isAr ? 'إرشاد بحب' : 'Guidance with Heart'}</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

export function generateAdminEventNotification(params: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  eventTitle: string;
  registrationId: string;
  waitlisted: boolean;
  spotsRemaining: number;
}): string {
  const { firstName, lastName, email, phone, eventTitle, registrationId, waitlisted, spotsRemaining } = params;
  return `
    <div style="font-family:'Segoe UI',sans-serif;max-width:500px;margin:0 auto;padding:20px;">
      <h2 style="color:#7A3B5E;margin:0 0 8px;">New Event Registration ${waitlisted ? '(Waitlist)' : ''}</h2>
      <p style="color:#8E8E9F;font-size:14px;margin:0 0 16px;">ID: ${registrationId}</p>
      <table style="width:100%;font-size:14px;color:#4A4A5C;">
        <tr><td style="padding:6px 0;font-weight:600;width:100px;">Event:</td><td>${eventTitle}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Name:</td><td>${firstName} ${lastName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Email:</td><td>${email}</td></tr>
        ${phone ? `<tr><td style="padding:6px 0;font-weight:600;">Phone:</td><td>${phone}</td></tr>` : ''}
        <tr><td style="padding:6px 0;font-weight:600;">Spots left:</td><td>${spotsRemaining}</td></tr>
      </table>
    </div>
  `;
}
