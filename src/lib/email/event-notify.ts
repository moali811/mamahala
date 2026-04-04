/* ================================================================
   Event Notification Email Templates
   ================================================================
   - Date Announcement: sent to "Notify Me" subscribers when a
     concept event gets a confirmed date
   - Reminder: sent 24h before event start
   ================================================================ */

import type { SmartEvent } from '@/types';
import { getFormattedDate, getFormattedTime } from '@/data/events';

/**
 * Date Announcement — sent when admin confirms a date for a TBD event.
 */
export function generateDateAnnouncementEmail(event: SmartEvent, locale: string): string {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const align = isAr ? 'right' : 'left';
  const title = isAr ? event.titleAr : event.titleEn;
  const description = isAr ? event.descriptionAr : event.descriptionEn;
  const location = isAr ? event.locationNameAr : event.locationNameEn;
  const formattedDate = getFormattedDate(event, locale);
  const formattedTime = getFormattedTime(event, locale);
  const locationIcon = event.locationType === 'online' ? '💻' : event.locationType === 'hybrid' ? '🔄' : '📍';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mama-hala-website.vercel.app';
  const eventsUrl = `${siteUrl}/${locale}/resources/events#${event.slug}`;

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
    <div style="width:60px;height:2px;background:#C8A97D;margin:16px auto 0;"></div>
  </td></tr>

  <!-- Announcement Card -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#F0E8DC,#FAF5ED);border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px;text-align:center;">
        <div style="font-size:40px;margin-bottom:12px;">🎉</div>
        <h1 style="margin:0;font-size:24px;color:#2D2A33;font-family:Georgia,serif;">
          ${isAr ? 'تمّ تحديدُ الموعد!' : 'The Date is Set!'}
        </h1>
        <p style="margin:12px 0 0;font-size:15px;color:#4A4A5C;line-height:1.6;">
          ${isAr
            ? `أنتَ أبديتَ اهتمامَك بـ "${title}" — والآن أصبحَ حقيقة.`
            : `You expressed interest in "${title}" — and now it's happening.`}
        </p>
      </td></tr>
    </table>
  </td></tr>

  <!-- Event Details -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:24px;text-align:${align};">
        <h2 style="margin:0 0 8px;font-size:20px;color:#2D2A33;font-family:Georgia,serif;">${title}</h2>
        <p style="margin:0 0 16px;font-size:14px;color:#6B6580;line-height:1.5;">${description}</p>
        <table cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;">📅</td><td style="padding:4px 0;font-size:14px;color:#2D2A33;font-weight:600;">${formattedDate}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;">🕐</td><td style="padding:4px 0;font-size:14px;color:#2D2A33;font-weight:600;">${formattedTime}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;">${locationIcon}</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${location}</td></tr>
          ${event.isFree ? `<tr><td style="padding:4px 12px 4px 0;font-size:14px;">✨</td><td style="padding:4px 0;font-size:14px;color:#3B8A6E;font-weight:600;">${isAr ? 'مجّانيّ' : 'Free'}</td></tr>` : ''}
        </table>
      </td></tr>
    </table>
  </td></tr>

  <!-- CTA -->
  <tr><td style="padding:0 0 24px;text-align:center;">
    <a href="${eventsUrl}" target="_blank" style="display:inline-block;padding:14px 36px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;">
      ${isAr ? 'سجّلْ الآن' : 'Register Now'}
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;padding:16px 0;border-top:1px solid #F3EFE8;">
    <p style="margin:0;font-size:12px;color:#8E8E9F;">
      ${isAr ? 'تلقّيتَ هذا البريدَ لأنّك أبديتَ اهتمامَك بهذا الموضوع.' : 'You received this because you expressed interest in this topic.'}
    </p>
    <p style="margin:4px 0 0;font-size:11px;color:#B0B0B0;">Mama Hala Consulting</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/**
 * Event Reminder — sent 24h before event start.
 */
export function generateEventReminderEmail(event: SmartEvent, firstName: string, locale: string): string {
  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const align = isAr ? 'right' : 'left';
  const title = isAr ? event.titleAr : event.titleEn;
  const location = isAr ? event.locationNameAr : event.locationNameEn;
  const formattedDate = getFormattedDate(event, locale);
  const formattedTime = getFormattedTime(event, locale);
  const whatToBring = isAr ? event.whatToBringAr : event.whatToBringEn;
  const locationIcon = event.locationType === 'online' ? '💻' : '📍';

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
    <div style="width:60px;height:2px;background:#C8A97D;margin:16px auto 0;"></div>
  </td></tr>

  <!-- Reminder Card -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#E8F0E8,#F0F8F0);border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px;text-align:center;">
        <div style="font-size:40px;margin-bottom:12px;">⏰</div>
        <h1 style="margin:0;font-size:24px;color:#2D2A33;font-family:Georgia,serif;">
          ${isAr ? `${firstName}، موعدُك غدًا!` : `${firstName}, You're Up Tomorrow!`}
        </h1>
        <p style="margin:12px 0 0;font-size:15px;color:#4A4A5C;">
          ${isAr ? 'تذكيرٌ وديّ بفعاليّتِك القادمة.' : 'A friendly reminder about your upcoming event.'}
        </p>
      </td></tr>
    </table>
  </td></tr>

  <!-- Event Details -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:24px;text-align:${align};">
        <h2 style="margin:0 0 16px;font-size:20px;color:#2D2A33;font-family:Georgia,serif;">${title}</h2>
        <table cellpadding="0" cellspacing="0">
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;">📅</td><td style="padding:4px 0;font-size:14px;color:#2D2A33;font-weight:600;">${formattedDate}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;">🕐</td><td style="padding:4px 0;font-size:14px;color:#2D2A33;font-weight:600;">${formattedTime}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;">${locationIcon}</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${location}</td></tr>
        </table>
      </td></tr>
    </table>
  </td></tr>

  ${whatToBring && whatToBring.length > 0 ? `
  <!-- What to Bring -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:20px;text-align:${align};">
        <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#C8A97D;text-transform:uppercase;letter-spacing:1px;">🎒 ${isAr ? 'لا تنسَ أن تُحضِر' : "Don't Forget to Bring"}</p>
        ${whatToBring.map(item => `<p style="margin:0 0 6px;font-size:14px;color:#4A4A5C;padding-${isAr ? 'right' : 'left'}:16px;">• ${item}</p>`).join('')}
      </td></tr>
    </table>
  </td></tr>` : ''}

  <!-- Questions -->
  <tr><td style="padding:0 0 24px;text-align:center;">
    <p style="margin:0 0 8px;font-size:14px;color:#8E8E9F;">${isAr ? 'أسئلة أو تغييرات؟' : 'Questions or changes?'}</p>
    <a href="https://wa.me/16132222104" target="_blank" style="display:inline-block;padding:10px 24px;background:#25D366;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
      💬 ${isAr ? 'تواصلْ عبر واتساب' : 'Chat on WhatsApp'}
    </a>
  </td></tr>

  <!-- Footer -->
  <tr><td style="text-align:center;padding:16px 0;border-top:1px solid #F3EFE8;">
    <p style="margin:0;font-size:11px;color:#B0B0B0;">Mama Hala Consulting</p>
  </td></tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

/**
 * Admin notification — sent when pulse count hits threshold.
 */
export function generatePulseThresholdEmail(event: SmartEvent, pulseCount: number): string {
  const title = event.titleEn;
  return `
    <div style="font-family:'Segoe UI',sans-serif;max-width:500px;margin:0 auto;padding:20px;">
      <h2 style="color:#7A3B5E;margin:0 0 8px;">🔥 Event Interest Threshold Reached</h2>
      <p style="color:#4A4A5C;font-size:14px;margin:0 0 16px;">"${title}" has reached <strong>${pulseCount} community votes</strong>.</p>
      <p style="color:#4A4A5C;font-size:14px;margin:0 0 16px;">Consider scheduling this event — people are waiting.</p>
      <table style="width:100%;font-size:14px;color:#4A4A5C;margin-bottom:16px;">
        <tr><td style="padding:6px 0;font-weight:600;width:120px;">Event:</td><td>${title}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Pulse Count:</td><td>${pulseCount}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Type:</td><td>${event.type}</td></tr>
      </table>
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://mama-hala-website.vercel.app'}/admin/events" style="display:inline-block;padding:12px 24px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">
        Open Events Manager
      </a>
    </div>
  `;
}
