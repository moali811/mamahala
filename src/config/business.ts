/* ================================================================
   Business Configuration — Single source of truth
   Update values here, they propagate across the entire site.
   ================================================================ */

export const BUSINESS = {
  name: 'Mama Hala Consulting',
  nameAr: 'ماما هالة للاستشارات',
  founder: 'Dr. Hala Ali',
  founderAr: 'د. هالة علي',

  phone: '+1 613-222-2104',
  phoneRaw: '16132222104',
  email: 'admin@mamahala.ca',
  whatsappUrl: 'https://wa.me/16132222104',

  // Official street address — used in email footers + PDF invoice footer.
  // Canonical formatted string (single line). Update here if HQ moves.
  address: '430 Hazeldean Rd, Ottawa, ON K2L 1E8, Canada',

  // Brand tagline — appears in website footer, email footers, PDF invoice footer.
  tagline: 'For a life full of love, tranquility & peace',
  taglineAr: 'لحياةٍ مُفعَمةٍ بالحبِّ والسّكينةِ والسّلام',

  // All admin email recipients — single source of truth.
  // Used for BCC on client-facing emails (invoices, receipts) and
  // direct delivery for admin notifications (booking alerts).
  adminEmails: ['admin@mamahala.ca', 'mo.ali811@gmail.com'] as string[],

  location: 'Ottawa, Canada & Dubai, UAE',
  locationAr: 'أوتاوا، كندا ودبي، الإمارات',

  hours: 'Monday - Saturday: 9:00 AM - 8:00 PM',
  hoursAr: 'الإثنين - السبت: 9:00 صباحاً - 8:00 مساءً',

  // Cal.com
  calUsername: 'mamahala',
  calBaseUrl: 'https://cal.com/mamahala',

  // ─── ACADEMY — Single Full Program Access tier ────────────────
  // One flat price unlocks everything (Level 2 + Level 3). Level 1 stays free.
  // Previous tiered pricing (Growth $19 / Mastery $29 / Bundle $41) was
  // collapsed into one clean decision: free or $41 for full access.
  // Strategy: lead magnet → 1:1 funnel (Dr. Hala's real business).
  academyFullAccessPrice: 41,
  academyPaymentLinks: {
    fullAccess: 'https://buy.stripe.com/4gM3cueRo7c97ohf2Nawo0a',  // $41 CAD — Mama Hala Academy - Full Program Access
  },

  // ─── TOOLKITS — Single Premium Access tier ────────────────────
  // One flat price unlocks any premium toolkit. Free preview (section 1) stays.
  // Launch price: $7 CAD (previous: $19 flat, before that: $19/$29 tiered).
  // ⚠️  Stripe payment link still set to $19 — update in Stripe dashboard!
  // Success URL configured in Stripe dashboard:
  //   https://mamahala.ca/en/resources/toolkits/unlock-success?slug={CHECKOUT_SESSION_CLIENT_REFERENCE_ID}
  toolkitFullAccessPrice: 7,
  toolkitPaymentLinks: {
    fullAccess: 'https://buy.stripe.com/00w8wOaB88gd23XaMxawo0b',  // $7 CAD launch price — Mama Hala Toolkit - Full Premium Access (update in Stripe!)
  },

  // VIP emails — bypass ALL paywalls (academy levels + premium toolkits)
  // Used for admin access, founder access, and internal testing
  // When any of these emails are entered in email gates, everything unlocks
  vipEmails: [
    'admin@mamahala.ca',
    'mo.ali811@gmail.com',
  ] as string[],

  // Social
  social: {
    instagram: 'https://www.instagram.com/mamahala.ca/',
    facebook: 'https://www.facebook.com/mamahala.ca',
    youtube: 'https://youtube.com/@MamaHala-ca?si=pwg5_hhRIfXt-usP',
    tiktok: 'https://www.tiktok.com/@mamahala.ca?_t=8jv2H8Tkli2&_r=1',
    snapchat: 'https://www.snapchat.com/add/mamahala.ca',
    telegram: 'https://t.me/+Ut1Xms3zRX5jMmNh',
  },
  // ─── BOOKING SYSTEM — Phase 5 ───────────────────────────────
  // 'native' = new booking page at /[locale]/book
  // 'cal-com' = legacy Cal.com iframe at /[locale]/book-a-session
  bookingMode: 'native' as 'native' | 'cal-com',

  // ─── LEGACY ONLINE PAYMENT LINK — DEPRECATED ───────────────
  // @deprecated As of Apr 2026 this field is NOT referenced by invoice
  // emails or the invoice PDF generator. It was a fixed $150 CAD link
  // that clients were clicking regardless of their actual invoice amount.
  // Replaced by the per-invoice payment concierge flow:
  //   1. Admin pastes a per-invoice Stripe Payment Link in
  //      InvoiceReviewSheet / InvoicesModule → stored on the draft.
  //   2. Email/PDF link to /pay/{token} (the concierge page).
  //   3. Concierge page routes to the best-available payment method
  //      (dynamic session → pasted link → e-Transfer/wire/PayPal).
  // Leaving the constant here only so any unrelated legacy import
  // doesn't break at compile time. DO NOT reference this for new code.
  stripePaymentLink: 'https://buy.stripe.com/bJebJ0dNk6857ohdYJawo0d',
} as const;

// Helper to get WhatsApp link with pre-filled message
export function getWhatsAppLink(message?: string, isRTL = false): string {
  if (!message) return BUSINESS.whatsappUrl;
  const msg = encodeURIComponent(message);
  return `${BUSINESS.whatsappUrl}?text=${msg}`;
}

// Helper to get Cal.com booking URL
export function getCalUrl(slug?: string, embed = false): string {
  const base = slug ? `${BUSINESS.calBaseUrl}/${slug}` : BUSINESS.calBaseUrl;
  return embed ? `${base}?embed=true&theme=light&layout=month_view` : base;
}

/**
 * Smart booking URL — respects the bookingMode feature flag.
 * Use this everywhere instead of hardcoding /book-a-session or /book.
 *
 * @param locale - Current locale ('en' or 'ar')
 * @param serviceSlug - Optional service to pre-select (skips AI intake step)
 */
export function getBookingUrl(locale: string, serviceSlug?: string): string {
  const basePath = BUSINESS.bookingMode === 'native' ? 'book' : 'book-a-session';
  const base = `/${locale}/${basePath}`;
  if (serviceSlug) return `${base}?service=${serviceSlug}`;
  return base;
}
