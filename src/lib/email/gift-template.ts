/* ================================================================
   Gift Card Email Template — Editorial redesign
   ================================================================
   Designed to feel like a card you'd display on a mantel rather than
   a generic branded email. Editorial typography (gold-foil masthead,
   Georgia serif), oversized quotation marks framing the personal
   message, hand-drawn botanical divider, per-occasion wisdom line,
   and a wax-seal sign-off above Dr. Hala's italic signature.

   Per-occasion hero illustrations come from gift-illustrations.ts —
   Mo generates the 7 PNGs in Midjourney/Imagen and pastes them as
   data URIs there. Until then, the botanical SVG divider does the
   visual work.

   Occasion-specific wisdom lines + subject-variant pickers also live
   here so they're easy to edit without touching the API route.
   ================================================================ */

import { emailWrapper } from './shared-email-components';
import {
  getGiftHeroIllustration,
  giftBotanicalDivider,
  giftWaxSeal,
  type OccasionKey,
} from './gift-illustrations';

export interface GiftEmailParams {
  recipientName: string;
  gifterName: string;
  serviceName: string;
  serviceNameAr: string;
  serviceDuration: string;
  occasion: string;
  occasionAr: string;
  /** Slug from the gift form (birthday, support, etc.). Drives the
   *  hero illustration, wisdom line, and subject variant. */
  occasionKey?: string;
  personalMessage?: string;
  schedulingUrl: string;
  locale: 'en' | 'ar';
}

// ─── Per-occasion wisdom lines ─────────────────────────────────────
//
// One short, original line that sits beneath the gold divider. Italic,
// gold, in the same serif as the recipient name. Easy to tune without
// touching layout.

const WISDOM_LINES: Record<OccasionKey, { en: string; ar: string }> = {
  'birthday':     { en: 'Another year of becoming.',                 ar: 'عامٌ جديدٌ من الصّيرورة.' },
  'support':      { en: 'May this be a small light in a long evening.', ar: 'لِيَكُن هذا نوراً صغيراً في مساءٍ طويل.' },
  'just-because': { en: 'Care, freely given.',                       ar: 'رعايةٌ تُمنَحُ بسخاء.' },
  'wedding':      { en: 'Two paths, one quiet sky.',                 ar: 'طريقانِ، وسماءٌ هادئةٌ واحدة.' },
  'new-parent':   { en: 'Soft hours for the early days.',            ar: 'ساعاتٌ ليّنةٌ للأيّامِ الأولى.' },
  'self-care':    { en: 'Permission, not obligation.',               ar: 'إذنٌ، لا واجب.' },
  'other':        { en: 'A quiet space, made for you.',              ar: 'مساحةٌ هادئة، صُنِعت لأجلِك.' },
};

function getWisdomLine(key: string | undefined, locale: 'en' | 'ar'): string {
  const k = (key && key in WISDOM_LINES ? key : 'other') as OccasionKey;
  return WISDOM_LINES[k][locale];
}

// ─── Per-occasion subject-line variants ────────────────────────────
//
// Multiple openings per occasion so the same recipient doesn't get
// the identical subject if gifted twice. Picked deterministically
// from a hash of (recipient email + occasion) so it stays stable
// per-recipient but varies across them.

const SUBJECT_VARIANTS: Record<OccasionKey, { en: string[]; ar: string[] }> = {
  'birthday': {
    en: [
      'Happy birthday, {recipient} 🤍',
      'A small celebration from {gifter}',
      "{gifter} sent you something for your day",
    ],
    ar: [
      'كلَّ عامٍ وأنتَ بخير، {recipient} 🤍',
      'احتفالٌ صغيرٌ من {gifter}',
      'أهداكَ {gifter} شيئاً ليومك',
    ],
  },
  'support': {
    en: [
      'A small light from {gifter}',
      '{gifter} is thinking of you',
      'Something soft from {gifter}',
    ],
    ar: [
      'نورٌ صغيرٌ من {gifter}',
      '{gifter} يفكّرُ بك',
      'شيءٌ ليّنٌ من {gifter}',
    ],
  },
  'just-because': {
    en: [
      '{gifter} is thinking of you',
      'A note of care from {gifter}',
      'For you, {recipient} 🤍',
    ],
    ar: [
      '{gifter} يفكّرُ بك',
      'لمسةُ اهتمامٍ من {gifter}',
      'لأجلك، {recipient} 🤍',
    ],
  },
  'wedding': {
    en: [
      'A gift for the new chapter, from {gifter}',
      '{gifter} sent something for the two of you',
      'For your new beginning, {recipient}',
    ],
    ar: [
      'هديّةٌ للفصلِ الجديد، من {gifter}',
      'أرسلَ {gifter} شيئاً لأجلكما',
      'لبدايتكما الجديدة، {recipient}',
    ],
  },
  'new-parent': {
    en: [
      'A soft moment, from {gifter}',
      '{gifter} sent you something gentle',
      'For these early days, {recipient}',
    ],
    ar: [
      'لحظةٌ ليّنة، من {gifter}',
      'أرسلَ {gifter} شيئاً رقيقاً لك',
      'لهذه الأيّامِ الأولى، {recipient}',
    ],
  },
  'self-care': {
    en: [
      'A quiet space, from {gifter}',
      '{gifter} thinks you deserve this',
      'Permission to pause, from {gifter}',
    ],
    ar: [
      'مساحةٌ هادئة، من {gifter}',
      '{gifter} يرى أنّك تستحقُّ هذا',
      'إذنٌ بالتوقّف، من {gifter}',
    ],
  },
  'other': {
    en: [
      'A gift of care from {gifter}',
      '{gifter} sent something for you',
      'For you, {recipient}',
    ],
    ar: [
      'هديّةُ رعايةٍ من {gifter}',
      'أرسلَ {gifter} شيئاً لأجلك',
      'لأجلك، {recipient}',
    ],
  },
};

// Stable, dependency-free hash over a string (FNV-1a 32-bit).
function hash32(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Pick one of N subject variants deterministically based on the
 *  recipient email + occasion key. Same recipient always gets the
 *  same line (consistent across re-sends), but different recipients
 *  see different lines so the email feels less templated. */
export function pickGiftSubject(params: {
  occasionKey?: string;
  recipientEmail: string;
  recipientName: string;
  gifterName: string;
  locale: 'en' | 'ar';
}): string {
  const k = (params.occasionKey && params.occasionKey in SUBJECT_VARIANTS
    ? params.occasionKey
    : 'other') as OccasionKey;
  const variants = SUBJECT_VARIANTS[k][params.locale];
  const idx = hash32(`${params.recipientEmail}::${k}`) % variants.length;
  return variants[idx]
    .replace('{recipient}', params.recipientName)
    .replace('{gifter}', params.gifterName);
}

// ─── Email body ────────────────────────────────────────────────────

export function generateGiftEmail(params: GiftEmailParams): string {
  const {
    recipientName,
    gifterName,
    serviceName,
    serviceNameAr,
    serviceDuration,
    occasion,
    occasionAr,
    occasionKey,
    personalMessage,
    schedulingUrl,
    locale,
  } = params;

  const isAr = locale === 'ar';
  const align = isAr ? 'right' : 'left';
  const serif = isAr
    ? "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
    : "Georgia, 'Times New Roman', serif";
  const sans = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  const svcName = isAr ? serviceNameAr : serviceName;
  const occ = isAr ? occasionAr : occasion;
  const wisdom = getWisdomLine(occasionKey, locale);
  const heroDataUri = getGiftHeroIllustration(occasionKey);

  const t = {
    giftForYou: isAr ? 'هديّةُ رعايةٍ لك' : 'A Gift of Care For You',
    from: isAr ? 'مِن' : 'From',
    personalMessage: isAr ? 'كلمةٌ مكتوبةٌ لك' : 'Written for you',
    sessionDetails: isAr ? 'تفاصيلُ الجلسة' : 'Session Details',
    service: isAr ? 'الخدمة' : 'Service',
    duration: isAr ? 'المدّة' : 'Duration',
    scheduleBtn: isAr ? 'احجِزْ جلستَك' : 'Schedule Your Session',
    signature: isAr ? 'بِكُلِّ دفء، د. هالة' : 'With warmth, Dr. Hala',
    careNote: isAr
      ? 'شخصٌ يهتمُّ بك يريدُك أن تشعرَ بالدّعم.'
      : 'Someone who cares about you wants you to feel supported.',
    sentBecause: isAr
      ? `تلقّيتَ هذا البريدَ لأنّ ${gifterName} أرسلَ لك هديّةَ رعايةٍ عبر ماما هالة للاستشارات.`
      : `You received this email because ${gifterName} sent you a gift of care through Mama Hala Consulting.`,
  };

  // Editorial gold-foil gradient on the recipient name. Falls back to
  // solid gold #C8A97D in clients that don't support background-clip.
  const goldFoil =
    "background:linear-gradient(135deg,#B8915F 0%,#E8C9A5 50%,#9C7A4D 100%);" +
    "-webkit-background-clip:text;background-clip:text;color:#C8A97D;-webkit-text-fill-color:transparent;";

  // Subtle paper-grain noise as a data URI. Renders behind the personal
  // message card to suggest a hand-written paper texture. Inline SVG
  // wrapped in url() works in Apple Mail and most modern clients;
  // ignored gracefully where unsupported (just a flat cream card).
  const paperGrain =
    "url('data:image/svg+xml;utf8," +
    encodeURIComponent(
      "<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>" +
      "<filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.6' numOctaves='2' /><feColorMatrix values='0 0 0 0 0.78 0 0 0 0 0.66 0 0 0 0 0.49 0 0 0 0.06 0' /></filter>" +
      "<rect width='100%' height='100%' filter='url(#n)' />" +
      "</svg>",
    ) + "')";

  const heroSection = heroDataUri
    ? `<tr><td style="padding:0;">
        <img src="${heroDataUri}" alt="" width="480" height="280" style="display:block;width:100%;max-width:480px;height:auto;border:0;border-radius:12px 12px 0 0;" />
      </td></tr>`
    : '';

  const content = `
    <!-- Gift Card -->
    <tr>
      <td>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0E0D8;border-radius:16px;overflow:hidden;">
          ${heroSection}
          <tr>
            <td style="padding:${heroDataUri ? '32px' : '52px'} 40px 36px;text-align:center;">
              <p style="margin:0;font-family:${sans};font-size:11px;color:#8A6E4F;text-transform:uppercase;letter-spacing:4px;font-weight:600;">
                ${t.giftForYou}
              </p>

              <!-- Recipient masthead — gold-foil text -->
              <h1 style="margin:18px 0 0;font-family:${serif};font-size:46px;${goldFoil};font-weight:700;line-height:1.1;letter-spacing:-0.5px;">
                ${recipientName}
              </h1>

              <!-- Botanical sprig divider -->
              <div style="margin:18px auto 14px;line-height:0;">
                ${giftBotanicalDivider()}
              </div>

              <!-- Wisdom line — italic, gold serif -->
              <p style="margin:0 0 18px;font-family:${serif};font-size:17px;color:#A07B4D;font-style:italic;line-height:1.4;">
                ${wisdom}
              </p>

              <p style="margin:0;font-family:${sans};font-size:14px;color:#5A4A3F;">
                ${t.from} <strong style="color:#2D2A33;font-weight:700;">${gifterName}</strong>${occ ? ` &middot; <span style="color:#8A6E4F;">${occ}</span>` : ''}
              </p>
            </td>
          </tr>

          ${personalMessage ? `
          <!-- Personal Message — centerpiece with oversized quotes -->
          <tr>
            <td style="padding:0 32px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF7F2;background-image:${paperGrain};border-radius:14px;">
                <tr>
                  <td style="padding:28px 28px 24px;position:relative;text-align:${align};" dir="${isAr ? 'rtl' : 'ltr'}">
                    <p style="margin:0 0 6px;font-family:${sans};font-size:10px;color:#C8A97D;text-transform:uppercase;letter-spacing:2px;font-weight:600;">
                      ${t.personalMessage}
                    </p>
                    <!-- Oversized opening quote -->
                    <span style="display:block;font-family:${serif};font-size:64px;line-height:0.4;color:#C8A97D;opacity:0.35;margin-${isAr ? 'right' : 'left'}:-4px;">${isAr ? '”' : '“'}</span>
                    <p style="margin:6px 0 0;font-family:${serif};font-size:18px;color:#2D2A33;line-height:1.65;font-style:italic;">
                      ${personalMessage}
                    </p>
                    <!-- Oversized closing quote, right-aligned -->
                    <span style="display:block;font-family:${serif};font-size:64px;line-height:0.2;color:#C8A97D;opacity:0.35;text-align:${isAr ? 'left' : 'right'};margin-${isAr ? 'left' : 'right'}:-4px;">${isAr ? '“' : '”'}</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          ` : ''}
        </table>
      </td>
    </tr>

    <!-- Session Details -->
    <tr>
      <td style="padding:32px 0 20px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
          <tr>
            <td style="padding:22px 32px;">
              <p style="margin:0 0 14px;font-family:${sans};font-size:11px;color:#C8A97D;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;text-align:${align};">
                ${t.sessionDetails}
              </p>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;font-family:${sans};font-size:13px;color:#8E8E9F;text-align:${align};">${t.service}</td>
                  <td style="padding:6px 0;font-family:${sans};font-size:14px;color:#2D2A33;font-weight:600;text-align:${isAr ? 'left' : 'right'};">${svcName}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-family:${sans};font-size:13px;color:#8E8E9F;text-align:${align};">${t.duration}</td>
                  <td style="padding:6px 0;font-family:${sans};font-size:14px;color:#2D2A33;font-weight:600;text-align:${isAr ? 'left' : 'right'};">${serviceDuration}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- CTA Button -->
    <tr>
      <td align="center" style="padding:6px 0 32px;">
        <a href="${schedulingUrl}" target="_blank" style="display:inline-block;padding:16px 44px;background-color:#7A3B5E;color:#FFFFFF;font-family:${sans};font-size:15px;font-weight:600;text-decoration:none;border-radius:50px;letter-spacing:0.4px;box-shadow:0 4px 12px rgba(122,59,94,0.18);">
          ${t.scheduleBtn}
        </a>
      </td>
    </tr>

    <!-- Wax seal sign-off -->
    <tr>
      <td align="center" style="padding:8px 0 4px;">
        ${giftWaxSeal()}
        <p style="margin:10px 0 0;font-family:${serif};font-size:15px;color:#7A3B5E;font-style:italic;">
          ${t.signature}
        </p>
      </td>
    </tr>

    <!-- Care Note -->
    <tr>
      <td align="center" style="padding:18px 0 4px;">
        <p style="margin:0 0 6px;font-family:${sans};font-size:12px;color:#7A3B5E;line-height:1.6;font-weight:500;">
          ${t.careNote}
        </p>
        <p style="margin:0;font-family:${sans};font-size:10px;color:#C4C0BC;line-height:1.6;">
          ${t.sentBecause}
        </p>
      </td>
    </tr>`;

  return emailWrapper(content, { locale });
}
