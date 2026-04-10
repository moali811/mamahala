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

  // Academy Stripe Payment Links (no API key needed — direct redirect)
  academyPaymentLinks: {
    growth: 'https://buy.stripe.com/bJecN424C8gd5g907Tawo08',   // $19 CAD — Level 2
    mastery: 'https://buy.stripe.com/dRm5kC10y8gd0ZT07Tawo09',  // $29 CAD — Level 3
    bundle: 'https://buy.stripe.com/4gM3cueRo7c97ohf2Nawo0a',   // $41 CAD — Full Access (15% off)
  },
  academyBundlePrice: 41,
  academyBundleSavings: 15, // percentage

  // Per-module price (legacy — used as fallback only)
  academyModulePrice: 9,
  // Default per-level prices (CAD). Override per-level via AcademyLevel.priceCAD
  // Pricing strategy: lead magnet → 1:1 funnel. Low friction entry, real business is Dr. Hala's 1:1 practice.
  academyLevelPrices: { growth: 19, mastery: 29 } as { growth: number; mastery: number },

  // Toolkit Premium Stripe Payment Links — shared across all premium toolkits
  // Uses ?client_reference_id={toolkit-slug} so the success URL redirects
  // back to /resources/toolkits/unlock-success?slug={slug}
  // Success URL configured in Stripe dashboard:
  //   https://mamahala.ca/en/resources/toolkits/unlock-success?slug={CHECKOUT_SESSION_CLIENT_REFERENCE_ID}
  toolkitPaymentLinks: {
    standard: 'https://buy.stripe.com/00w8wOaB88gd23XaMxawo0b',  // $19 CAD — Mama Hala Toolkit - Premium
    flagship: 'https://buy.stripe.com/cNi7sK5gO8gddMFbQBawo0c',  // $29 CAD — Mama Hala Toolkit - Flagship
  },

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
