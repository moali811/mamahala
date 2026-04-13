/* ================================================================
   Shared Email Components — Logo header, footer, wrapper, styles
   ================================================================
   Single source of truth for all branded email HTML fragments.
   Used by: booking/emails.ts, email/event-*.ts, email/gift-template.ts,
            invoicing/email-sender.ts
   ================================================================ */

import { BUSINESS } from '@/config/business';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://mamahala.ca';

// ─── Shared Styles ──────────────────────────────────────────────

export const emailStyles = {
  body: 'margin:0;padding:0;background:#FAF7F2;font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;',
  container: 'max-width:560px;width:100%;',
  header: 'text-align:center;padding:28px 0 16px;',
  brandName: 'margin:0;font-size:18px;font-weight:700;color:#7A3B5E;',
  divider: 'width:60px;height:2px;background:#C8A97D;margin:14px auto 0;',
  card: 'background:#FFFFFF;border-radius:12px;padding:28px 24px;margin:0 0 20px;',
  heading: 'margin:0 0 16px;font-size:20px;font-weight:700;color:#7A3B5E;',
  subheading: 'margin:0 0 12px;font-size:15px;font-weight:600;color:#4A4A5C;',
  text: 'margin:0 0 12px;font-size:14px;line-height:1.6;color:#4A4A5C;',
  muted: 'margin:0;font-size:12px;color:#8E8E9F;line-height:1.5;',
  detailRow: 'padding:8px 0;border-bottom:1px solid #F0ECE8;display:flex;',
  detailLabel: 'font-size:13px;color:#8E8E9F;min-width:100px;',
  detailValue: 'font-size:14px;color:#4A4A5C;font-weight:500;',
  button: 'display:inline-block;padding:14px 32px;background:#7A3B5E;color:#FFFFFF;text-decoration:none;border-radius:10px;font-size:14px;font-weight:600;',
  buttonSecondary: 'display:inline-block;padding:10px 24px;background:#F5F0EB;color:#7A3B5E;text-decoration:none;border-radius:8px;font-size:13px;font-weight:600;border:1px solid #E8E0D8;',
  goldAccent: 'background:#FFFAF5;border-left:3px solid #C8A97D;padding:12px 16px;border-radius:0 8px 8px 0;margin:16px 0;',
  footer: 'text-align:center;padding:20px 0;',
  footerText: 'margin:0;font-size:11px;color:#B0B0B0;',
};

// ─── Branded Header (with logo) ─────────────────────────────────

export function emailHeader(options?: { locale?: string }): string {
  const isAr = options?.locale === 'ar';
  const brandName = isAr ? BUSINESS.nameAr : BUSINESS.name;
  const dir = isAr ? 'rtl' : 'ltr';

  return `<tr><td style="text-align:center;padding:28px 0 16px;" dir="${dir}">
    <img src="${SITE_URL}/images/logo-256.png" alt="${BUSINESS.name}" width="48" height="48" style="display:block;margin:0 auto 10px;border-radius:8px;border:0;" />
    <p style="${emailStyles.brandName}">${brandName}</p>
    <div style="${emailStyles.divider}"></div>
  </td></tr>`;
}

// ─── Branded Footer ─────────────────────────────────────────────

export function emailFooter(options?: { locale?: string; showAddress?: boolean }): string {
  const isAr = options?.locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const tagline = isAr
    ? 'لحياة مليئة بالحب والسكينة والسلام'
    : 'For a life full of love, tranquility & peace';

  return `<tr><td style="text-align:center;padding:20px 0 8px;" dir="${dir}">
    <div style="width:40px;height:1px;background:#EDE8DF;margin:0 auto 14px;"></div>
    <p style="margin:0 0 8px;font-size:12px;color:#7A3B5E;font-style:italic;">${tagline}</p>
    <p style="margin:0 0 4px;font-size:11px;color:#B0B0B0;">${BUSINESS.name} | <a href="${BUSINESS.whatsappUrl}" style="color:#B0B0B0;text-decoration:none;">WhatsApp: ${BUSINESS.phone}</a></p>
    <p style="margin:0 0 4px;font-size:11px;color:#B0B0B0;"><a href="mailto:${BUSINESS.email}" style="color:#B0B0B0;text-decoration:none;">${BUSINESS.email}</a> · <a href="${SITE_URL}" style="color:#B0B0B0;text-decoration:none;">mamahala.ca</a></p>
    ${options?.showAddress ? `<p style="margin:4px 0 0;font-size:10px;color:#C0C0C0;">430 Hazeldean Rd, Ottawa, ON K2L 1E8</p>` : ''}
  </td></tr>`;
}

// ─── Full Email Wrapper ─────────────────────────────────────────

export function emailWrapper(
  content: string,
  options?: { locale?: string; showAddress?: boolean },
): string {
  const isAr = options?.locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const lang = isAr ? 'ar' : 'en';

  return `<!DOCTYPE html>
<html dir="${dir}" lang="${lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="${emailStyles.body}">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:32px 16px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="${emailStyles.container}">
  ${emailHeader(options)}
  <tr><td style="padding:0 0 8px;">
    ${content}
  </td></tr>
  ${emailFooter(options)}
</table>
</td></tr>
</table>
</body></html>`;
}
