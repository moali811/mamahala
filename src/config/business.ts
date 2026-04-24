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

  // In-person session addresses by region. The email/ICS/GCal layer picks
  // the right one based on booking.effectiveLocationLabel (or the current
  // provider location when that's not set). Update the Dubai address when
  // the permanent venue is confirmed.
  inPersonAddresses: {
    canada: {
      en: '430 Hazeldean Rd, Ottawa, ON K2L 1E8 — Canada',
      ar: '430 Hazeldean Rd, Ottawa, ON K2L 1E8 — كندا',
    },
    uae: {
      en: 'HDS Business Centre, Cluster M, JLT, 34th Floor, Dubai, UAE',
      ar: 'HDS Business Centre, Cluster M, JLT, الطّابق 34، دبي، الإمارات',
    },
  },

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
  // Strategy: lead magnet → 1:1 funnel (Dr. Hala's real business).
  // Pricing comes from KV settings (admin-editable) via getProductPricing();
  // the value below is only the bootstrap default. Checkout is 100% dynamic
  // via /api/academy/checkout — no static Stripe Payment Links in play.
  academyFullAccessPrice: 41,

  // ─── TOOLKITS — Single Premium Access tier ────────────────────
  // One flat price unlocks any premium toolkit. Free preview (section 1) stays.
  // Launch price: $7 CAD. Pricing is admin-editable via KV settings and
  // consumed by /api/toolkit/checkout which creates a fresh Stripe Checkout
  // Session with the current price each time — no static Payment Links in
  // play (the previous $19 static link risked over-charging when the
  // dynamic price changed).
  toolkitFullAccessPrice: 7,

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
