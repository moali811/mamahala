/* ================================================================
   WhatsApp Templates — Typed registry
   ================================================================
   Every template here must also be REGISTERED + APPROVED in Meta
   Business Manager → WhatsApp Manager → Message Templates before
   it can actually send. Until then `sendWhatsApp` will return a
   warning (Meta returns code 132001 for unregistered templates).

   Template names use snake_case to match Meta's convention. The
   `params` shape names the variables for type-safety on the call
   site; positionally they map to {{1}}, {{2}}, ... in the body.

   Voice rule (per Mo's WhatsApp instruction): name Dr. Hala using
   the "Dr. Hala Ali | Mama Hala" attribution — distinct from the
   general "we / Mama Hala Team" voice rule for other channels.
   Templates here include that attribution literally in the body
   text Meta has approved, so it's not a runtime parameter.
   ================================================================ */

export type WhatsappLocale = 'en' | 'ar';

export type WhatsappCategory = 'UTILITY' | 'AUTHENTICATION' | 'MARKETING';

export interface TemplateDefinition<P> {
  /** Snake-case name as registered with Meta. */
  name: string;
  /** Category submitted to Meta. Affects pricing + approval rules. */
  category: WhatsappCategory;
  /** Languages this template is registered in. */
  locales: WhatsappLocale[];
  /** Phantom for typing — the params object expected at send time. */
  paramsType?: P;
}

/* ─── Booking confirmation (post-payment session lock-in) ────── */
export interface BookingConfirmationParams {
  first_name: string;
  /** "Monday, April 21" formatted in the client's timezone */
  session_date: string;
  /** "11:00 AM" formatted in the client's timezone */
  session_time_local: string;
  /** Google Meet link from the booking record */
  meet_link: string;
  /** Manage-booking deep link with token */
  manage_url: string;
}

/* ─── 1-hour reminder ─────────────────────────────────────────── */
export interface SessionReminder1hParams {
  first_name: string;
  meet_link: string;
}

/* ─── Magic link (account login) ──────────────────────────────── */
export interface MagicLinkParams {
  first_name: string;
  login_url: string;
}

/* ─── Payment reminder, pre-due ───────────────────────────────── */
export interface PaymentReminderPreDueParams {
  first_name: string;
  /** Formatted amount string e.g. "CAD 250.00" */
  amount: string;
  /** Due date string e.g. "May 5" */
  due_date: string;
  pay_url: string;
}

/* ─── Payment reminder, overdue ───────────────────────────────── */
export interface PaymentReminderOverdueParams {
  first_name: string;
  amount: string;
  /** Integer days past due, formatted as string for {{N}} substitution. */
  days_overdue: string;
  pay_url: string;
}

/* ─── Rebook nudge variants ───────────────────────────────────── */
export interface RebookNudgeWarmParams {
  first_name: string;
  rebook_url: string;
}
export interface RebookNudgeCadenceParams {
  first_name: string;
  /** Integer weeks since last completed session. */
  weeks_since: string;
  rebook_url: string;
}
export interface RebookNudgeLongGapParams {
  first_name: string;
  rebook_url: string;
}
export interface RebookNudgeSeasonalParams {
  first_name: string;
  rebook_url: string;
}

/* ─── Registry ────────────────────────────────────────────────── */

export const TEMPLATES = {
  booking_confirmation: {
    name: 'booking_confirmation',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  session_reminder_1h: {
    name: 'session_reminder_1h',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  magic_link: {
    name: 'magic_link',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  payment_reminder_pre_due: {
    name: 'payment_reminder_pre_due',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  payment_reminder_overdue: {
    name: 'payment_reminder_overdue',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  rebook_nudge_warm: {
    name: 'rebook_nudge_warm',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  rebook_nudge_cadence: {
    name: 'rebook_nudge_cadence',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  rebook_nudge_long_gap: {
    name: 'rebook_nudge_long_gap',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
  rebook_nudge_seasonal: {
    name: 'rebook_nudge_seasonal',
    category: 'UTILITY' as const,
    locales: ['en', 'ar'] as WhatsappLocale[],
  },
} as const;

export type TemplateName = keyof typeof TEMPLATES;

/**
 * Param-shape map per template. Used by `sendWhatsApp` to type-check
 * the `vars` argument at the call site. Positional ordering of the
 * keys here MUST match the {{1}}, {{2}}, ... in the registered Meta
 * body, otherwise the substitution will be wrong.
 */
export interface TemplateParamMap {
  booking_confirmation: BookingConfirmationParams;
  session_reminder_1h: SessionReminder1hParams;
  magic_link: MagicLinkParams;
  payment_reminder_pre_due: PaymentReminderPreDueParams;
  payment_reminder_overdue: PaymentReminderOverdueParams;
  rebook_nudge_warm: RebookNudgeWarmParams;
  rebook_nudge_cadence: RebookNudgeCadenceParams;
  rebook_nudge_long_gap: RebookNudgeLongGapParams;
  rebook_nudge_seasonal: RebookNudgeSeasonalParams;
}

/**
 * Positional ordering for param substitution. Each entry is the list
 * of param keys in the order they appear in Meta's approved body.
 * If Meta approves a different order, edit ONLY this map.
 */
export const TEMPLATE_PARAM_ORDER: { [K in TemplateName]: ReadonlyArray<keyof TemplateParamMap[K]> } = {
  booking_confirmation: ['first_name', 'session_date', 'session_time_local', 'meet_link', 'manage_url'],
  session_reminder_1h: ['first_name', 'meet_link'],
  magic_link: ['first_name', 'login_url'],
  payment_reminder_pre_due: ['first_name', 'amount', 'due_date', 'pay_url'],
  payment_reminder_overdue: ['first_name', 'amount', 'days_overdue', 'pay_url'],
  rebook_nudge_warm: ['first_name', 'rebook_url'],
  rebook_nudge_cadence: ['first_name', 'weeks_since', 'rebook_url'],
  rebook_nudge_long_gap: ['first_name', 'rebook_url'],
  rebook_nudge_seasonal: ['first_name', 'rebook_url'],
};
