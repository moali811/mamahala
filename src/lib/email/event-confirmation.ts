/* ================================================================
   Event Registration Confirmation Email Template
   Uses shared branded wrapper with logo header + footer.
   ================================================================ */

import type { SmartEvent } from '@/types';
import { generateGoogleCalendarUrl } from '@/lib/calendar';
import { getFormattedDate, getFormattedTime } from '@/data/events';
import { getServiceBySlug } from '@/data/services';
import { emailWrapper } from './shared-email-components';
import { SITE_URL } from '@/lib/site-url';

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
  const isGauging = !!event.dateTBD;

  const locationIcon = event.locationType === 'online' ? '💻' : event.locationType === 'hybrid' ? '🔄' : '📍';

  // ── Heading & subheading adapt to lifecycle phase ────────────
  let heading: string;
  let subheading: string;
  let iconBg: string;
  let iconEmoji: string;

  if (waitlisted) {
    heading = isAr ? "أنت على قائمة الانتظار" : "You're on the Waitlist";
    subheading = isAr
      ? `${firstName}، تم إضافتك لقائمة الانتظار. سنبلغك فور توفر مكان.`
      : `${firstName}, you've been added to the waitlist. We'll notify you if a spot opens up.`;
    iconBg = '#C8A97D';
    iconEmoji = '⏳';
  } else if (isGauging) {
    heading = isAr ? 'تمّ حجزُ مكانِك!' : 'Spot Saved!';
    subheading = isAr
      ? `${firstName}، أنتَ من أوّلِ مَنْ أبدى اهتمامًا. سنتواصلُ معك قريبًا بالتفاصيل.`
      : `${firstName}, you're one of the first to show interest. We'll reach out soon with the details.`;
    iconBg = '#7A3B5E';
    iconEmoji = '✨';
  } else {
    heading = isAr ? "تم تسجيلك بنجاح!" : "You're Registered!";
    subheading = isAr
      ? `${firstName}، نحن متحمسون لرؤيتك!`
      : `${firstName}, we're excited to see you!`;
    iconBg = '#3B8A6E';
    iconEmoji = '✓';
  }

  // ── Gauging-phase: show "what happens next" steps ───────────
  const gaugingNextSteps = isGauging ? `
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:24px;text-align:${align};">
        <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#7A3B5E;text-transform:uppercase;letter-spacing:1px;">${isAr ? 'ما سيحدث بعد ذلك' : 'What Happens Next'}</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding:0 0 14px;vertical-align:top;width:36px;">
              <div style="width:28px;height:28px;border-radius:50%;background:#F0E0D8;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#7A3B5E;">1</div>
            </td>
            <td style="padding:2px 0 14px 8px;font-size:14px;color:#4A4A5C;line-height:1.5;">
              <strong style="color:#2D2A33;">${isAr ? 'نجمع المجموعة' : 'We gather the circle'}</strong><br/>
              <span style="font-size:13px;color:#8E8E9F;">${isAr ? 'البرنامج يبدأ عندما يكون الفريق جاهزًا' : 'The program starts when the group is the right size'}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:0 0 14px;vertical-align:top;width:36px;">
              <div style="width:28px;height:28px;border-radius:50%;background:#F0E0D8;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#7A3B5E;">2</div>
            </td>
            <td style="padding:2px 0 14px 8px;font-size:14px;color:#4A4A5C;line-height:1.5;">
              <strong style="color:#2D2A33;">${isAr ? 'نؤكّد المواعيد' : 'We confirm the dates'}</strong><br/>
              <span style="font-size:13px;color:#8E8E9F;">${isAr ? 'ستكون أوّل من يعرف' : "You'll be the first to know"}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:0;vertical-align:top;width:36px;">
              <div style="width:28px;height:28px;border-radius:50%;background:#F0E0D8;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#7A3B5E;">3</div>
            </td>
            <td style="padding:2px 0 0 8px;font-size:14px;color:#4A4A5C;line-height:1.5;">
              <strong style="color:#2D2A33;">${isAr ? 'نرسل لك كلّ التفاصيل' : 'We send you all the details'}</strong><br/>
              <span style="font-size:13px;color:#8E8E9F;">${isAr ? 'الجدول، الدفع، وما تحتاجه للبدء' : 'Schedule, payment, and everything you need'}</span>
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </td></tr>` : '';

  const content = `
  <table width="100%" cellpadding="0" cellspacing="0">
  <!-- Confirmation Card -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#F0E0D8,#FAF0EC);border-radius:16px;overflow:hidden;">
      <tr><td style="padding:32px;text-align:center;">
        <div style="width:56px;height:56px;border-radius:50%;background:${iconBg};margin:0 auto 16px;line-height:56px;font-size:28px;">${iconEmoji}</div>
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
          ${isGauging ? '' : `<tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">📅</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${formattedDate}</td></tr>`}
          ${isGauging ? '' : `<tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">🕐</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${formattedTime}</td></tr>`}
          ${isGauging ? `<tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">📅</td><td style="padding:4px 0;font-size:14px;color:#C8A97D;font-style:italic;">${isAr ? 'سيُعلَن قريبًا' : 'Coming soon'}</td></tr>` : ''}
          <tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">${locationIcon}</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">${location}</td></tr>
          ${!isGauging && event.priceCAD ? `<tr><td style="padding:4px 12px 4px 0;font-size:14px;color:#8E8E9F;">💰</td><td style="padding:4px 0;font-size:14px;color:#4A4A5C;">$${event.priceCAD} CAD</td></tr>` : ''}
        </table>
      </td></tr>
    </table>
  </td></tr>

  ${isGauging ? gaugingNextSteps : ''}

  ${customMessage && !isGauging ? `
  <!-- Custom Message (hidden during gauging — next-steps card replaces it) -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8F5F0;border-radius:12px;border-left:4px solid #C8A97D;">
      <tr><td style="padding:16px 20px;font-size:14px;color:#4A4A5C;text-align:${align};">
        ${customMessage}
      </td></tr>
    </table>
  </td></tr>` : ''}

  ${!event.isFree && !waitlisted && !isGauging ? `
  <!-- Payment Info (only when dates are confirmed) -->
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

  <!-- Add to Calendar CTA (only when dates are set) -->
  ${!waitlisted && !isGauging ? `
  <tr><td style="padding:0 0 24px;text-align:center;">
    <a href="${calendarUrl}" target="_blank" style="display:inline-block;padding:14px 32px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;">
      📅 ${isAr ? 'أضف إلى التقويم' : 'Add to Calendar'}
    </a>
  </td></tr>` : ''}

  ${whatToBring && whatToBring.length > 0 && !waitlisted && !isGauging ? `
  <!-- What to Bring (only when dates are set) -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:20px;text-align:${align};">
        <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#C8A97D;text-transform:uppercase;letter-spacing:1px;">🎒 ${isAr ? 'ماذا تحضر' : 'What to Bring'}</p>
        ${whatToBring.map(item => `<p style="margin:0 0 6px;font-size:14px;color:#4A4A5C;padding-${isAr ? 'right' : 'left'}:16px;">• ${item}</p>`).join('')}
      </td></tr>
    </table>
  </td></tr>` : ''}

  ${(() => {
    const siteUrl = SITE_URL;
    const relatedService = event.relatedServiceSlug ? getServiceBySlug(event.relatedServiceSlug) : undefined;
    if (!relatedService || waitlisted) return '';
    const serviceName = isAr ? relatedService.nameAr : relatedService.name;
    const serviceUrl = `${siteUrl}/${locale}/services/${relatedService.category}/${relatedService.slug}?utm_source=event&utm_medium=email&utm_campaign=${event.slug}`;
    return `
  <!-- Deeper Support CTA -->
  <tr><td style="padding:0 0 24px;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;border-radius:12px;border:1px solid #F3EFE8;">
      <tr><td style="padding:20px;text-align:center;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#7A3B5E;">💡 ${isAr ? 'هل تريدُ دعمًا أعمق؟' : 'Want Deeper Support?'}</p>
        <p style="margin:0 0 12px;font-size:13px;color:#4A4A5C;line-height:1.5;">${isAr ? `ما تعلّمتَه في هذه الفعاليّة هو بدايةٌ رائعة. للحصولِ على إرشادٍ شخصيّ، نُقدّمُ جلساتِ "${serviceName}".` : `What you'll learn in this event is a great start. For personalized guidance, we offer "${serviceName}" sessions.`}</p>
        <a href="${serviceUrl}" target="_blank" style="display:inline-block;padding:10px 24px;background:#C8A97D;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
          ${isAr ? 'تعرَّفْ على الخدمة' : 'Learn About This Service'}
        </a>
        <p style="margin:8px 0 0;font-size:12px;color:#8E8E9F;">${isAr ? 'الاستشارةُ الأولى مجّانيّة — 30 دقيقة' : 'First consultation is free — 30 minutes'}</p>
      </td></tr>
    </table>
  </td></tr>`;
  })()}

  <!-- Questions -->
  <tr><td style="padding:0 0 24px;text-align:center;">
    <p style="margin:0 0 12px;font-size:14px;color:#8E8E9F;">${isAr ? 'أسئلة؟' : 'Questions?'}</p>
    <a href="https://wa.me/16132222104" target="_blank" style="display:inline-block;padding:10px 24px;background:#25D366;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:13px;font-weight:600;">
      ${isAr ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
    </a>
  </td></tr>
  </table>`;

  return emailWrapper(content, { locale });
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
  const content = `
    <div style="background:#FFFFFF;border-radius:12px;padding:24px;margin:0 0 16px;">
      <h2 style="color:#7A3B5E;margin:0 0 8px;font-size:18px;">New Event Registration ${waitlisted ? '(Waitlist)' : ''}</h2>
      <p style="color:#8E8E9F;font-size:14px;margin:0 0 16px;">ID: ${registrationId}</p>
      <table style="width:100%;font-size:14px;color:#4A4A5C;">
        <tr><td style="padding:6px 0;font-weight:600;width:100px;">Event:</td><td>${eventTitle}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Name:</td><td>${firstName} ${lastName}</td></tr>
        <tr><td style="padding:6px 0;font-weight:600;">Email:</td><td>${email}</td></tr>
        ${phone ? `<tr><td style="padding:6px 0;font-weight:600;">Phone:</td><td>${phone}</td></tr>` : ''}
        <tr><td style="padding:6px 0;font-weight:600;">Spots left:</td><td>${spotsRemaining}</td></tr>
      </table>
    </div>`;
  return emailWrapper(content);
}
