/* ================================================================
   Country name → ISO-3166-1 alpha-2 converter
   ================================================================
   Used by the Zoho CSV import to convert full country names
   ("Canada", "United Arab Emirates") into our internal ISO-2 format
   ("CA", "AE"). Dictionary covers the ~30 countries most likely to
   appear in Dr. Hala's real customer data.

   Contract: returns empty string if unrecognized — caller decides
   the fallback (usually "CA").
   ================================================================ */

const COUNTRY_NAME_TO_ISO2: Record<string, string> = {
  // North America
  canada: 'CA',
  'united states': 'US',
  usa: 'US',
  us: 'US',
  america: 'US',
  mexico: 'MX',

  // UK & Ireland
  'united kingdom': 'GB',
  uk: 'GB',
  britain: 'GB',
  'great britain': 'GB',
  england: 'GB',
  scotland: 'GB',
  wales: 'GB',
  ireland: 'IE',

  // Europe — Eurozone
  germany: 'DE',
  france: 'FR',
  netherlands: 'NL',
  belgium: 'BE',
  luxembourg: 'LU',
  austria: 'AT',
  switzerland: 'CH',
  spain: 'ES',
  portugal: 'PT',
  italy: 'IT',
  greece: 'GR',
  finland: 'FI',

  // Nordics
  denmark: 'DK',
  sweden: 'SE',
  norway: 'NO',
  iceland: 'IS',

  // Eastern Europe
  poland: 'PL',
  'czech republic': 'CZ',
  czechia: 'CZ',
  hungary: 'HU',
  romania: 'RO',
  ukraine: 'UA',
  russia: 'RU',

  // GCC / Middle East
  'united arab emirates': 'AE',
  uae: 'AE',
  emirates: 'AE',
  'u.a.e.': 'AE',
  'saudi arabia': 'SA',
  ksa: 'SA',
  saudi: 'SA',
  kuwait: 'KW',
  qatar: 'QA',
  bahrain: 'BH',
  oman: 'OM',
  jordan: 'JO',
  lebanon: 'LB',
  palestine: 'PS',
  iraq: 'IQ',
  iran: 'IR',
  syria: 'SY',
  yemen: 'YE',
  israel: 'IL',

  // North Africa
  egypt: 'EG',
  morocco: 'MA',
  tunisia: 'TN',
  algeria: 'DZ',
  libya: 'LY',
  sudan: 'SD',

  // Sub-Saharan Africa
  'south africa': 'ZA',
  nigeria: 'NG',
  kenya: 'KE',
  ghana: 'GH',
  ethiopia: 'ET',

  // Asia
  india: 'IN',
  pakistan: 'PK',
  bangladesh: 'BD',
  'sri lanka': 'LK',
  china: 'CN',
  japan: 'JP',
  'south korea': 'KR',
  korea: 'KR',
  singapore: 'SG',
  'hong kong': 'HK',
  taiwan: 'TW',
  malaysia: 'MY',
  indonesia: 'ID',
  philippines: 'PH',
  thailand: 'TH',
  vietnam: 'VN',

  // Oceania
  australia: 'AU',
  'new zealand': 'NZ',

  // Latin America
  brazil: 'BR',
  argentina: 'AR',
  chile: 'CL',
  colombia: 'CO',
  peru: 'PE',
  venezuela: 'VE',

  // ─── Arabic names (for RTL booking page + Arabic-speaking admin) ──
  // Matches the `nameAr` values in src/config/countries.ts. Keys are
  // stored verbatim (case matters for non-Latin text; we match exactly).
  'كندا': 'CA',
  'أمريكا': 'US',
  'المكسيك': 'MX',
  'بريطانيا': 'GB',
  'ألمانيا': 'DE',
  'فرنسا': 'FR',
  'هولندا': 'NL',
  'بلجيكا': 'BE',
  'سويسرا': 'CH',
  'النمسا': 'AT',
  'أيرلندا': 'IE',
  'إسبانيا': 'ES',
  'البرتغال': 'PT',
  'إيطاليا': 'IT',
  'اليونان': 'GR',
  'السويد': 'SE',
  'النرويج': 'NO',
  'الدنمارك': 'DK',
  'فنلندا': 'FI',
  'آيسلندا': 'IS',
  'بولندا': 'PL',
  'التشيك': 'CZ',
  'رومانيا': 'RO',
  'أوكرانيا': 'UA',
  'روسيا': 'RU',
  'بيلاروسيا': 'BY',
  'الإمارات': 'AE',
  'السعودية': 'SA',
  'الكويت': 'KW',
  'قطر': 'QA',
  'البحرين': 'BH',
  'عُمان': 'OM',
  'الأردن': 'JO',
  'لبنان': 'LB',
  'فلسطين': 'PS',
  'العراق': 'IQ',
  'إيران': 'IR',
  'سوريا': 'SY',
  'اليمن': 'YE',
  'إسرائيل': 'IL',
  'تركيا': 'TR',
  'مصر': 'EG',
  'المغرب': 'MA',
  'تونس': 'TN',
  'الجزائر': 'DZ',
  'ليبيا': 'LY',
  'السودان': 'SD',
  'جنوب أفريقيا': 'ZA',
  'نيجيريا': 'NG',
  'كينيا': 'KE',
  'غانا': 'GH',
  'إثيوبيا': 'ET',
  'الصومال': 'SO',
  'الهند': 'IN',
  'باكستان': 'PK',
  'بنغلاديش': 'BD',
  'سريلانكا': 'LK',
  'نيبال': 'NP',
  'الصين': 'CN',
  'اليابان': 'JP',
  'كوريا الجنوبية': 'KR',
  'تايوان': 'TW',
  'هونغ كونغ': 'HK',
  'سنغافورة': 'SG',
  'ماليزيا': 'MY',
  'إندونيسيا': 'ID',
  'الفلبين': 'PH',
  'تايلاند': 'TH',
  'فيتنام': 'VN',
  'كازاخستان': 'KZ',
  'أوزبكستان': 'UZ',
  'أستراليا': 'AU',
  'نيوزيلندا': 'NZ',
  'البرازيل': 'BR',
  'الأرجنتين': 'AR',
  'تشيلي': 'CL',
  'كولومبيا': 'CO',
  'بيرو': 'PE',
};

/**
 * Convert a full country name to its ISO-3166-1 alpha-2 code.
 *
 * Examples:
 *   "Canada"              → "CA"
 *   "United Arab Emirates" → "AE"
 *   "CA"                  → "CA" (already ISO-2, returned as-is uppercase)
 *   "xyz"                 → ""   (unknown, caller falls back)
 */
export function countryNameToISO2(input: string | undefined): string {
  if (!input) return '';
  const trimmed = input.trim();
  if (!trimmed) return '';

  // Already a 2-letter ISO code?
  if (/^[A-Za-z]{2}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  return COUNTRY_NAME_TO_ISO2[trimmed.toLowerCase()] ?? '';
}
