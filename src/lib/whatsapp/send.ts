/* ================================================================
   WhatsApp send — gated entry point
   ================================================================
   Single function the rest of the app uses. Order of checks:
     1. Reachability (consent + phone present + not opted out)
     2. Locale resolution (default 'en' unless customer prefers 'ar')
     3. Template send via the low-level client

   Failures (including reachability misses) are returned as a
   structured result. They are NEVER thrown — callers must remain
   fail-soft so a WhatsApp issue can't break the booking, payment,
   or login flow it sits behind.
   ================================================================ */

import { sendTemplateMessage, type SendTemplateResult } from './client';
import type { TemplateName, TemplateParamMap, WhatsappLocale } from './templates';
import { isWhatsappReachable } from './consent';
import { getCustomer } from '@/lib/invoicing/customer-store';

export interface SendWhatsappInput<T extends TemplateName> {
  /** Lower-case client email — used to look up consent + phone. */
  email: string;
  template: T;
  vars: TemplateParamMap[T];
  /**
   * Override locale (otherwise read from the booking/customer record).
   * Pass when the caller already knows the language for this message
   * (e.g. session_reminder_1h reads booking.preferredLanguage).
   */
  locale?: WhatsappLocale;
  /**
   * Pre-resolved phone in E.164 — skips the customer lookup. Useful
   * when you already have the phone (e.g. from the booking record)
   * and want to avoid an extra KV round-trip.
   */
  phoneOverride?: string;
}

export type SendWhatsappResult =
  | { sent: true; messageId: string }
  | { sent: false; reason: string; httpStatus?: number; meta?: unknown };

/**
 * Send a WhatsApp template message. Always returns a result —
 * never throws. Callers should log on failure but continue.
 */
export async function sendWhatsapp<T extends TemplateName>(
  input: SendWhatsappInput<T>,
): Promise<SendWhatsappResult> {
  // Reachability check (consent + phone). Skipped only when caller
  // explicitly provides a phone override AND we're sending an auth
  // message (magic_link), which is identity-bound and pre-consented
  // via the magic-link request itself. For everything else, opt-in
  // is required.
  const customer = await getCustomer(input.email);
  let phone = input.phoneOverride;

  if (!input.phoneOverride) {
    const reach = await isWhatsappReachable(input.email);
    if (!reach.reachable) {
      return { sent: false, reason: `not-reachable:${reach.reason}` };
    }
    phone = reach.phone!;
  } else {
    // Even with override, honor opt-out hard flag.
    if (customer?.whatsappOptOut) {
      return { sent: false, reason: 'not-reachable:opted-out' };
    }
    // For non-magic-link templates, also require explicit opt-in.
    if (input.template !== 'magic_link' && !customer?.consentWhatsapp?.acceptedAt) {
      return { sent: false, reason: 'not-reachable:no-opt-in' };
    }
  }

  if (!phone) {
    return { sent: false, reason: 'not-reachable:no-phone' };
  }

  const locale: WhatsappLocale = input.locale ?? 'en';

  const result: SendTemplateResult = await sendTemplateMessage({
    template: input.template,
    to: phone,
    vars: input.vars,
    locale,
  });

  if (!result.ok) {
    return {
      sent: false,
      reason: result.skipped ?? `meta-error:${result.error.code ?? 'unknown'}`,
      httpStatus: result.error.httpStatus,
      meta: result.error,
    };
  }
  return { sent: true, messageId: result.messageId };
}
