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
  // Previous tiered pricing (Standard $19 / Flagship $29) was collapsed.
  // Success URL configured in Stripe dashboard:
  //   https://mamahala.ca/en/resources/toolkits/unlock-success?slug={CHECKOUT_SESSION_CLIENT_REFERENCE_ID}
  toolkitFullAccessPrice: 19,
  toolkitPaymentLinks: {
    fullAccess: 'https://buy.stripe.com/00w8wOaB88gd23XaMxawo0b',  // $19 CAD — Mama Hala Toolkit - Full Premium Access
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
