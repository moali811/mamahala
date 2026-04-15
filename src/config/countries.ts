/* ================================================================
   Shared Country Data — ISO-2 codes, EN/AR names, flags, dial codes
   ================================================================
   Single source of truth for country information across:
   - Booking page picker (`src/app/[locale]/book/page.tsx`)
   - Invoice review sheet country dropdown (`src/components/admin/InvoiceReviewSheet.tsx`)
   - Invoice compose country field (`src/components/admin/InvoicesModule.tsx`)
   - Server-side country normalization (`src/lib/invoicing/booking-intake.ts`)

   Pricing band data lives in `src/config/pricing.ts` — this file
   focuses on display metadata (names, flags, timezones) and ISO-2
   normalization helpers.

   Coverage: all countries in COUNTRY_TO_BAND (pricing.ts) plus a
   curated set of major markets Dr. Hala serves.
   ================================================================ */

export interface CountryInfo {
  /** ISO-3166-1 alpha-2 uppercase code (e.g. 'CA', 'AE', 'KZ'). */
  code: string;
  /** English display name. */
  name: string;
  /** Arabic display name. */
  nameAr: string;
  /** Unicode flag emoji. */
  flag: string;
  /** International dial code (e.g. '+1', '+971'). Empty string if unknown. */
  dial: string;
  /** Primary city for display (optional). */
  city?: string;
  /** Primary city in Arabic. */
  cityAr?: string;
  /** IANA timezones in this country (for auto-detect). Empty = manual pick only. */
  timezones: string[];
}

export const COUNTRIES: CountryInfo[] = [
  // ─── GCC ────────────────────────────────────────────────────────
  { code: 'AE', name: 'UAE', nameAr: 'الإمارات', flag: '\u{1F1E6}\u{1F1EA}', dial: '+971', city: 'Dubai', cityAr: 'دبي', timezones: ['Asia/Dubai', 'Asia/Muscat'] },
  { code: 'CA', name: 'Canada', nameAr: 'كندا', flag: '\u{1F1E8}\u{1F1E6}', dial: '+1', city: 'Ottawa', cityAr: 'أوتاوا', timezones: ['America/Toronto', 'America/Vancouver', 'America/Edmonton', 'America/Winnipeg', 'America/Halifax', 'America/St_Johns'] },
  { code: 'US', name: 'United States', nameAr: 'أمريكا', flag: '\u{1F1FA}\u{1F1F8}', dial: '+1', city: '', cityAr: '', timezones: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Phoenix'] },
  { code: 'SA', name: 'Saudi Arabia', nameAr: 'السعودية', flag: '\u{1F1F8}\u{1F1E6}', dial: '+966', city: 'Riyadh', cityAr: 'الرياض', timezones: ['Asia/Riyadh'] },
  { code: 'KW', name: 'Kuwait', nameAr: 'الكويت', flag: '\u{1F1F0}\u{1F1FC}', dial: '+965', city: 'Kuwait City', cityAr: 'الكويت', timezones: ['Asia/Kuwait'] },
  { code: 'QA', name: 'Qatar', nameAr: 'قطر', flag: '\u{1F1F6}\u{1F1E6}', dial: '+974', city: 'Doha', cityAr: 'الدوحة', timezones: ['Asia/Qatar'] },
  { code: 'BH', name: 'Bahrain', nameAr: 'البحرين', flag: '\u{1F1E7}\u{1F1ED}', dial: '+973', city: 'Manama', cityAr: 'المنامة', timezones: ['Asia/Bahrain'] },
  { code: 'OM', name: 'Oman', nameAr: 'عُمان', flag: '\u{1F1F4}\u{1F1F2}', dial: '+968', city: 'Muscat', cityAr: 'مسقط', timezones: [] },

  // ─── Middle East ────────────────────────────────────────────────
  { code: 'JO', name: 'Jordan', nameAr: 'الأردن', flag: '\u{1F1EF}\u{1F1F4}', dial: '+962', city: 'Amman', cityAr: 'عمّان', timezones: ['Asia/Amman'] },
  { code: 'LB', name: 'Lebanon', nameAr: 'لبنان', flag: '\u{1F1F1}\u{1F1E7}', dial: '+961', city: 'Beirut', cityAr: 'بيروت', timezones: ['Asia/Beirut'] },
  { code: 'IQ', name: 'Iraq', nameAr: 'العراق', flag: '\u{1F1EE}\u{1F1F6}', dial: '+964', city: 'Baghdad', cityAr: 'بغداد', timezones: ['Asia/Baghdad'] },
  { code: 'SY', name: 'Syria', nameAr: 'سوريا', flag: '\u{1F1F8}\u{1F1FE}', dial: '+963', city: 'Damascus', cityAr: 'دمشق', timezones: ['Asia/Damascus'] },
  { code: 'PS', name: 'Palestine', nameAr: 'فلسطين', flag: '\u{1F1F5}\u{1F1F8}', dial: '+970', city: 'Gaza', cityAr: 'غزة', timezones: ['Asia/Gaza', 'Asia/Hebron'] },
  { code: 'YE', name: 'Yemen', nameAr: 'اليمن', flag: '\u{1F1FE}\u{1F1EA}', dial: '+967', city: 'Sanaa', cityAr: 'صنعاء', timezones: ['Asia/Aden'] },
  { code: 'TR', name: 'Turkey', nameAr: 'تركيا', flag: '\u{1F1F9}\u{1F1F7}', dial: '+90', city: 'Istanbul', cityAr: 'إسطنبول', timezones: ['Europe/Istanbul'] },
  { code: 'IL', name: 'Israel', nameAr: 'إسرائيل', flag: '\u{1F1EE}\u{1F1F1}', dial: '+972', city: 'Tel Aviv', cityAr: 'تل أبيب', timezones: ['Asia/Jerusalem'] },
  { code: 'IR', name: 'Iran', nameAr: 'إيران', flag: '\u{1F1EE}\u{1F1F7}', dial: '+98', city: 'Tehran', cityAr: 'طهران', timezones: ['Asia/Tehran'] },

  // ─── North Africa ───────────────────────────────────────────────
  { code: 'EG', name: 'Egypt', nameAr: 'مصر', flag: '\u{1F1EA}\u{1F1EC}', dial: '+20', city: 'Cairo', cityAr: 'القاهرة', timezones: ['Africa/Cairo'] },
  { code: 'MA', name: 'Morocco', nameAr: 'المغرب', flag: '\u{1F1F2}\u{1F1E6}', dial: '+212', city: 'Casablanca', cityAr: 'الدار البيضاء', timezones: ['Africa/Casablanca'] },
  { code: 'TN', name: 'Tunisia', nameAr: 'تونس', flag: '\u{1F1F9}\u{1F1F3}', dial: '+216', city: 'Tunis', cityAr: 'تونس', timezones: ['Africa/Tunis'] },
  { code: 'DZ', name: 'Algeria', nameAr: 'الجزائر', flag: '\u{1F1E9}\u{1F1FF}', dial: '+213', city: 'Algiers', cityAr: 'الجزائر', timezones: ['Africa/Algiers'] },
  { code: 'LY', name: 'Libya', nameAr: 'ليبيا', flag: '\u{1F1F1}\u{1F1FE}', dial: '+218', city: 'Tripoli', cityAr: 'طرابلس', timezones: ['Africa/Tripoli'] },
  { code: 'SD', name: 'Sudan', nameAr: 'السودان', flag: '\u{1F1F8}\u{1F1E9}', dial: '+249', city: 'Khartoum', cityAr: 'الخرطوم', timezones: ['Africa/Khartoum'] },

  // ─── Sub-Saharan Africa ─────────────────────────────────────────
  { code: 'NG', name: 'Nigeria', nameAr: 'نيجيريا', flag: '\u{1F1F3}\u{1F1EC}', dial: '+234', city: 'Lagos', cityAr: 'لاغوس', timezones: ['Africa/Lagos'] },
  { code: 'ZA', name: 'South Africa', nameAr: 'جنوب أفريقيا', flag: '\u{1F1FF}\u{1F1E6}', dial: '+27', city: 'Johannesburg', cityAr: 'جوهانسبرغ', timezones: ['Africa/Johannesburg'] },
  { code: 'KE', name: 'Kenya', nameAr: 'كينيا', flag: '\u{1F1F0}\u{1F1EA}', dial: '+254', city: 'Nairobi', cityAr: 'نيروبي', timezones: ['Africa/Nairobi'] },
  { code: 'GH', name: 'Ghana', nameAr: 'غانا', flag: '\u{1F1EC}\u{1F1ED}', dial: '+233', city: 'Accra', cityAr: 'أكرا', timezones: ['Africa/Accra'] },
  { code: 'ET', name: 'Ethiopia', nameAr: 'إثيوبيا', flag: '\u{1F1EA}\u{1F1F9}', dial: '+251', city: 'Addis Ababa', cityAr: 'أديس أبابا', timezones: ['Africa/Addis_Ababa'] },
  { code: 'SO', name: 'Somalia', nameAr: 'الصومال', flag: '\u{1F1F8}\u{1F1F4}', dial: '+252', city: 'Mogadishu', cityAr: 'مقديشو', timezones: ['Africa/Mogadishu'] },
  { code: 'UG', name: 'Uganda', nameAr: 'أوغندا', flag: '\u{1F1FA}\u{1F1EC}', dial: '+256', city: 'Kampala', cityAr: 'كمبالا', timezones: ['Africa/Kampala'] },
  { code: 'TZ', name: 'Tanzania', nameAr: 'تنزانيا', flag: '\u{1F1F9}\u{1F1FF}', dial: '+255', city: 'Dar es Salaam', cityAr: 'دار السلام', timezones: ['Africa/Dar_es_Salaam'] },
  { code: 'RW', name: 'Rwanda', nameAr: 'رواندا', flag: '\u{1F1F7}\u{1F1FC}', dial: '+250', timezones: ['Africa/Kigali'] },
  { code: 'NA', name: 'Namibia', nameAr: 'ناميبيا', flag: '\u{1F1F3}\u{1F1E6}', dial: '+264', timezones: ['Africa/Windhoek'] },
  { code: 'BW', name: 'Botswana', nameAr: 'بوتسوانا', flag: '\u{1F1E7}\u{1F1FC}', dial: '+267', timezones: ['Africa/Gaborone'] },
  { code: 'MU', name: 'Mauritius', nameAr: 'موريشيوس', flag: '\u{1F1F2}\u{1F1FA}', dial: '+230', timezones: ['Indian/Mauritius'] },

  // ─── Europe — Western ───────────────────────────────────────────
  { code: 'GB', name: 'United Kingdom', nameAr: 'بريطانيا', flag: '\u{1F1EC}\u{1F1E7}', dial: '+44', city: 'London', cityAr: 'لندن', timezones: ['Europe/London'] },
  { code: 'DE', name: 'Germany', nameAr: 'ألمانيا', flag: '\u{1F1E9}\u{1F1EA}', dial: '+49', city: 'Berlin', cityAr: 'برلين', timezones: ['Europe/Berlin'] },
  { code: 'FR', name: 'France', nameAr: 'فرنسا', flag: '\u{1F1EB}\u{1F1F7}', dial: '+33', city: 'Paris', cityAr: 'باريس', timezones: ['Europe/Paris'] },
  { code: 'NL', name: 'Netherlands', nameAr: 'هولندا', flag: '\u{1F1F3}\u{1F1F1}', dial: '+31', city: 'Amsterdam', cityAr: 'أمستردام', timezones: ['Europe/Amsterdam'] },
  { code: 'IT', name: 'Italy', nameAr: 'إيطاليا', flag: '\u{1F1EE}\u{1F1F9}', dial: '+39', city: 'Rome', cityAr: 'روما', timezones: ['Europe/Rome'] },
  { code: 'ES', name: 'Spain', nameAr: 'إسبانيا', flag: '\u{1F1EA}\u{1F1F8}', dial: '+34', city: 'Madrid', cityAr: 'مدريد', timezones: ['Europe/Madrid'] },
  { code: 'PT', name: 'Portugal', nameAr: 'البرتغال', flag: '\u{1F1F5}\u{1F1F9}', dial: '+351', city: 'Lisbon', cityAr: 'لشبونة', timezones: ['Europe/Lisbon'] },
  { code: 'CH', name: 'Switzerland', nameAr: 'سويسرا', flag: '\u{1F1E8}\u{1F1ED}', dial: '+41', city: 'Zurich', cityAr: 'زيوريخ', timezones: ['Europe/Zurich'] },
  { code: 'AT', name: 'Austria', nameAr: 'النمسا', flag: '\u{1F1E6}\u{1F1F9}', dial: '+43', city: 'Vienna', cityAr: 'فيينا', timezones: ['Europe/Vienna'] },
  { code: 'BE', name: 'Belgium', nameAr: 'بلجيكا', flag: '\u{1F1E7}\u{1F1EA}', dial: '+32', city: 'Brussels', cityAr: 'بروكسل', timezones: ['Europe/Brussels'] },
  { code: 'IE', name: 'Ireland', nameAr: 'أيرلندا', flag: '\u{1F1EE}\u{1F1EA}', dial: '+353', city: 'Dublin', cityAr: 'دبلن', timezones: ['Europe/Dublin'] },
  { code: 'LU', name: 'Luxembourg', nameAr: 'لوكسمبورغ', flag: '\u{1F1F1}\u{1F1FA}', dial: '+352', timezones: ['Europe/Luxembourg'] },

  // ─── Europe — Nordic ────────────────────────────────────────────
  { code: 'SE', name: 'Sweden', nameAr: 'السويد', flag: '\u{1F1F8}\u{1F1EA}', dial: '+46', city: 'Stockholm', cityAr: 'ستوكهولم', timezones: ['Europe/Stockholm'] },
  { code: 'NO', name: 'Norway', nameAr: 'النرويج', flag: '\u{1F1F3}\u{1F1F4}', dial: '+47', city: 'Oslo', cityAr: 'أوسلو', timezones: ['Europe/Oslo'] },
  { code: 'DK', name: 'Denmark', nameAr: 'الدنمارك', flag: '\u{1F1E9}\u{1F1F0}', dial: '+45', city: 'Copenhagen', cityAr: 'كوبنهاغن', timezones: ['Europe/Copenhagen'] },
  { code: 'FI', name: 'Finland', nameAr: 'فنلندا', flag: '\u{1F1EB}\u{1F1EE}', dial: '+358', city: 'Helsinki', cityAr: 'هلسنكي', timezones: ['Europe/Helsinki'] },
  { code: 'IS', name: 'Iceland', nameAr: 'آيسلندا', flag: '\u{1F1EE}\u{1F1F8}', dial: '+354', timezones: ['Atlantic/Reykjavik'] },

  // ─── Europe — Southern/Mediterranean ────────────────────────────
  { code: 'GR', name: 'Greece', nameAr: 'اليونان', flag: '\u{1F1EC}\u{1F1F7}', dial: '+30', city: 'Athens', cityAr: 'أثينا', timezones: ['Europe/Athens'] },
  { code: 'CY', name: 'Cyprus', nameAr: 'قبرص', flag: '\u{1F1E8}\u{1F1FE}', dial: '+357', timezones: ['Asia/Nicosia'] },
  { code: 'MT', name: 'Malta', nameAr: 'مالطا', flag: '\u{1F1F2}\u{1F1F9}', dial: '+356', timezones: ['Europe/Malta'] },

  // ─── Europe — Eastern / Balkans ─────────────────────────────────
  { code: 'PL', name: 'Poland', nameAr: 'بولندا', flag: '\u{1F1F5}\u{1F1F1}', dial: '+48', city: 'Warsaw', cityAr: 'وارسو', timezones: ['Europe/Warsaw'] },
  { code: 'CZ', name: 'Czech Republic', nameAr: 'التشيك', flag: '\u{1F1E8}\u{1F1FF}', dial: '+420', city: 'Prague', cityAr: 'براغ', timezones: ['Europe/Prague'] },
  { code: 'SK', name: 'Slovakia', nameAr: 'سلوفاكيا', flag: '\u{1F1F8}\u{1F1F0}', dial: '+421', timezones: ['Europe/Bratislava'] },
  { code: 'HU', name: 'Hungary', nameAr: 'المجر', flag: '\u{1F1ED}\u{1F1FA}', dial: '+36', timezones: ['Europe/Budapest'] },
  { code: 'SI', name: 'Slovenia', nameAr: 'سلوفينيا', flag: '\u{1F1F8}\u{1F1EE}', dial: '+386', timezones: ['Europe/Ljubljana'] },
  { code: 'HR', name: 'Croatia', nameAr: 'كرواتيا', flag: '\u{1F1ED}\u{1F1F7}', dial: '+385', timezones: ['Europe/Zagreb'] },
  { code: 'EE', name: 'Estonia', nameAr: 'إستونيا', flag: '\u{1F1EA}\u{1F1EA}', dial: '+372', timezones: ['Europe/Tallinn'] },
  { code: 'LV', name: 'Latvia', nameAr: 'لاتفيا', flag: '\u{1F1F1}\u{1F1FB}', dial: '+371', timezones: ['Europe/Riga'] },
  { code: 'LT', name: 'Lithuania', nameAr: 'ليتوانيا', flag: '\u{1F1F1}\u{1F1F9}', dial: '+370', timezones: ['Europe/Vilnius'] },
  { code: 'RO', name: 'Romania', nameAr: 'رومانيا', flag: '\u{1F1F7}\u{1F1F4}', dial: '+40', city: 'Bucharest', cityAr: 'بوخارست', timezones: ['Europe/Bucharest'] },
  { code: 'BG', name: 'Bulgaria', nameAr: 'بلغاريا', flag: '\u{1F1E7}\u{1F1EC}', dial: '+359', timezones: ['Europe/Sofia'] },
  { code: 'RS', name: 'Serbia', nameAr: 'صربيا', flag: '\u{1F1F7}\u{1F1F8}', dial: '+381', timezones: ['Europe/Belgrade'] },
  { code: 'BA', name: 'Bosnia & Herzegovina', nameAr: 'البوسنة والهرسك', flag: '\u{1F1E7}\u{1F1E6}', dial: '+387', timezones: ['Europe/Sarajevo'] },
  { code: 'MK', name: 'North Macedonia', nameAr: 'مقدونيا الشمالية', flag: '\u{1F1F2}\u{1F1F0}', dial: '+389', timezones: ['Europe/Skopje'] },
  { code: 'AL', name: 'Albania', nameAr: 'ألبانيا', flag: '\u{1F1E6}\u{1F1F1}', dial: '+355', timezones: ['Europe/Tirane'] },
  { code: 'ME', name: 'Montenegro', nameAr: 'الجبل الأسود', flag: '\u{1F1F2}\u{1F1EA}', dial: '+382', timezones: ['Europe/Podgorica'] },
  { code: 'XK', name: 'Kosovo', nameAr: 'كوسوفو', flag: '\u{1F1FD}\u{1F1F0}', dial: '+383', timezones: ['Europe/Belgrade'] },
  { code: 'MD', name: 'Moldova', nameAr: 'مولدوفا', flag: '\u{1F1F2}\u{1F1E9}', dial: '+373', timezones: ['Europe/Chisinau'] },
  { code: 'UA', name: 'Ukraine', nameAr: 'أوكرانيا', flag: '\u{1F1FA}\u{1F1E6}', dial: '+380', city: 'Kyiv', cityAr: 'كييف', timezones: ['Europe/Kyiv', 'Europe/Kiev'] },
  { code: 'BY', name: 'Belarus', nameAr: 'بيلاروسيا', flag: '\u{1F1E7}\u{1F1FE}', dial: '+375', timezones: ['Europe/Minsk'] },
  { code: 'RU', name: 'Russia', nameAr: 'روسيا', flag: '\u{1F1F7}\u{1F1FA}', dial: '+7', city: 'Moscow', cityAr: 'موسكو', timezones: ['Europe/Moscow'] },

  // ─── Caucasus ───────────────────────────────────────────────────
  { code: 'GE', name: 'Georgia', nameAr: 'جورجيا', flag: '\u{1F1EC}\u{1F1EA}', dial: '+995', timezones: ['Asia/Tbilisi'] },
  { code: 'AM', name: 'Armenia', nameAr: 'أرمينيا', flag: '\u{1F1E6}\u{1F1F2}', dial: '+374', timezones: ['Asia/Yerevan'] },
  { code: 'AZ', name: 'Azerbaijan', nameAr: 'أذربيجان', flag: '\u{1F1E6}\u{1F1FF}', dial: '+994', timezones: ['Asia/Baku'] },

  // ─── Central Asia ───────────────────────────────────────────────
  { code: 'KZ', name: 'Kazakhstan', nameAr: 'كازاخستان', flag: '\u{1F1F0}\u{1F1FF}', dial: '+7', timezones: ['Asia/Almaty', 'Asia/Qostanay', 'Asia/Aqtobe'] },
  { code: 'UZ', name: 'Uzbekistan', nameAr: 'أوزبكستان', flag: '\u{1F1FA}\u{1F1FF}', dial: '+998', city: 'Tashkent', cityAr: 'طشقند', timezones: ['Asia/Tashkent'] },
  { code: 'KG', name: 'Kyrgyzstan', nameAr: 'قيرغيزستان', flag: '\u{1F1F0}\u{1F1EC}', dial: '+996', timezones: ['Asia/Bishkek'] },
  { code: 'TJ', name: 'Tajikistan', nameAr: 'طاجيكستان', flag: '\u{1F1F9}\u{1F1EF}', dial: '+992', timezones: ['Asia/Dushanbe'] },
  { code: 'MN', name: 'Mongolia', nameAr: 'منغوليا', flag: '\u{1F1F2}\u{1F1F3}', dial: '+976', timezones: ['Asia/Ulaanbaatar'] },
  { code: 'AF', name: 'Afghanistan', nameAr: 'أفغانستان', flag: '\u{1F1E6}\u{1F1EB}', dial: '+93', timezones: ['Asia/Kabul'] },

  // ─── North America ──────────────────────────────────────────────
  { code: 'MX', name: 'Mexico', nameAr: 'المكسيك', flag: '\u{1F1F2}\u{1F1FD}', dial: '+52', city: 'Mexico City', cityAr: 'مكسيكو', timezones: ['America/Mexico_City'] },

  // ─── Latin America — South ──────────────────────────────────────
  { code: 'BR', name: 'Brazil', nameAr: 'البرازيل', flag: '\u{1F1E7}\u{1F1F7}', dial: '+55', city: 'São Paulo', cityAr: 'ساو باولو', timezones: ['America/Sao_Paulo'] },
  { code: 'AR', name: 'Argentina', nameAr: 'الأرجنتين', flag: '\u{1F1E6}\u{1F1F7}', dial: '+54', city: 'Buenos Aires', cityAr: 'بوينس آيرس', timezones: ['America/Argentina/Buenos_Aires'] },
  { code: 'CL', name: 'Chile', nameAr: 'تشيلي', flag: '\u{1F1E8}\u{1F1F1}', dial: '+56', city: 'Santiago', cityAr: 'سانتياغو', timezones: ['America/Santiago'] },
  { code: 'CO', name: 'Colombia', nameAr: 'كولومبيا', flag: '\u{1F1E8}\u{1F1F4}', dial: '+57', city: 'Bogotá', cityAr: 'بوغوتا', timezones: ['America/Bogota'] },
  { code: 'PE', name: 'Peru', nameAr: 'بيرو', flag: '\u{1F1F5}\u{1F1EA}', dial: '+51', timezones: ['America/Lima'] },
  { code: 'UY', name: 'Uruguay', nameAr: 'أوروغواي', flag: '\u{1F1FA}\u{1F1FE}', dial: '+598', timezones: ['America/Montevideo'] },
  { code: 'EC', name: 'Ecuador', nameAr: 'الإكوادور', flag: '\u{1F1EA}\u{1F1E8}', dial: '+593', timezones: ['America/Guayaquil'] },
  { code: 'BO', name: 'Bolivia', nameAr: 'بوليفيا', flag: '\u{1F1E7}\u{1F1F4}', dial: '+591', timezones: ['America/La_Paz'] },
  { code: 'VE', name: 'Venezuela', nameAr: 'فنزويلا', flag: '\u{1F1FB}\u{1F1EA}', dial: '+58', timezones: ['America/Caracas'] },

  // ─── Latin America — Central ────────────────────────────────────
  { code: 'CR', name: 'Costa Rica', nameAr: 'كوستاريكا', flag: '\u{1F1E8}\u{1F1F7}', dial: '+506', timezones: ['America/Costa_Rica'] },
  { code: 'PA', name: 'Panama', nameAr: 'بنما', flag: '\u{1F1F5}\u{1F1E6}', dial: '+507', timezones: ['America/Panama'] },
  { code: 'DO', name: 'Dominican Republic', nameAr: 'جمهورية الدومينيكان', flag: '\u{1F1E9}\u{1F1F4}', dial: '+1', timezones: ['America/Santo_Domingo'] },
  { code: 'GT', name: 'Guatemala', nameAr: 'غواتيمالا', flag: '\u{1F1EC}\u{1F1F9}', dial: '+502', timezones: ['America/Guatemala'] },
  { code: 'HN', name: 'Honduras', nameAr: 'هندوراس', flag: '\u{1F1ED}\u{1F1F3}', dial: '+504', timezones: ['America/Tegucigalpa'] },
  { code: 'SV', name: 'El Salvador', nameAr: 'السلفادور', flag: '\u{1F1F8}\u{1F1FB}', dial: '+503', timezones: ['America/El_Salvador'] },
  { code: 'NI', name: 'Nicaragua', nameAr: 'نيكاراغوا', flag: '\u{1F1F3}\u{1F1EE}', dial: '+505', timezones: ['America/Managua'] },

  // ─── South Asia ─────────────────────────────────────────────────
  { code: 'IN', name: 'India', nameAr: 'الهند', flag: '\u{1F1EE}\u{1F1F3}', dial: '+91', city: '', cityAr: '', timezones: ['Asia/Kolkata'] },
  { code: 'PK', name: 'Pakistan', nameAr: 'باكستان', flag: '\u{1F1F5}\u{1F1F0}', dial: '+92', city: '', cityAr: '', timezones: ['Asia/Karachi'] },
  { code: 'BD', name: 'Bangladesh', nameAr: 'بنغلاديش', flag: '\u{1F1E7}\u{1F1E9}', dial: '+880', city: 'Dhaka', cityAr: 'دكا', timezones: ['Asia/Dhaka'] },
  { code: 'LK', name: 'Sri Lanka', nameAr: 'سريلانكا', flag: '\u{1F1F1}\u{1F1F0}', dial: '+94', city: 'Colombo', cityAr: 'كولومبو', timezones: ['Asia/Colombo'] },
  { code: 'NP', name: 'Nepal', nameAr: 'نيبال', flag: '\u{1F1F3}\u{1F1F5}', dial: '+977', timezones: ['Asia/Kathmandu'] },

  // ─── Southeast Asia ─────────────────────────────────────────────
  { code: 'MY', name: 'Malaysia', nameAr: 'ماليزيا', flag: '\u{1F1F2}\u{1F1FE}', dial: '+60', city: 'Kuala Lumpur', cityAr: 'كوالالمبور', timezones: ['Asia/Kuala_Lumpur'] },
  { code: 'SG', name: 'Singapore', nameAr: 'سنغافورة', flag: '\u{1F1F8}\u{1F1EC}', dial: '+65', city: 'Singapore', cityAr: 'سنغافورة', timezones: ['Asia/Singapore'] },
  { code: 'ID', name: 'Indonesia', nameAr: 'إندونيسيا', flag: '\u{1F1EE}\u{1F1E9}', dial: '+62', city: 'Jakarta', cityAr: 'جاكرتا', timezones: ['Asia/Jakarta'] },
  { code: 'PH', name: 'Philippines', nameAr: 'الفلبين', flag: '\u{1F1F5}\u{1F1ED}', dial: '+63', city: 'Manila', cityAr: 'مانيلا', timezones: ['Asia/Manila'] },
  { code: 'TH', name: 'Thailand', nameAr: 'تايلاند', flag: '\u{1F1F9}\u{1F1ED}', dial: '+66', city: 'Bangkok', cityAr: 'بانكوك', timezones: ['Asia/Bangkok'] },
  { code: 'VN', name: 'Vietnam', nameAr: 'فيتنام', flag: '\u{1F1FB}\u{1F1F3}', dial: '+84', city: 'Hanoi', cityAr: 'هانوي', timezones: ['Asia/Ho_Chi_Minh'] },
  { code: 'KH', name: 'Cambodia', nameAr: 'كمبوديا', flag: '\u{1F1F0}\u{1F1ED}', dial: '+855', timezones: ['Asia/Phnom_Penh'] },
  { code: 'LA', name: 'Laos', nameAr: 'لاوس', flag: '\u{1F1F1}\u{1F1E6}', dial: '+856', timezones: ['Asia/Vientiane'] },
  { code: 'MM', name: 'Myanmar', nameAr: 'ميانمار', flag: '\u{1F1F2}\u{1F1F2}', dial: '+95', timezones: ['Asia/Yangon'] },

  // ─── East Asia ──────────────────────────────────────────────────
  { code: 'CN', name: 'China', nameAr: 'الصين', flag: '\u{1F1E8}\u{1F1F3}', dial: '+86', city: 'Beijing', cityAr: 'بكين', timezones: ['Asia/Shanghai'] },
  { code: 'JP', name: 'Japan', nameAr: 'اليابان', flag: '\u{1F1EF}\u{1F1F5}', dial: '+81', city: 'Tokyo', cityAr: 'طوكيو', timezones: ['Asia/Tokyo'] },
  { code: 'KR', name: 'South Korea', nameAr: 'كوريا الجنوبية', flag: '\u{1F1F0}\u{1F1F7}', dial: '+82', city: 'Seoul', cityAr: 'سيول', timezones: ['Asia/Seoul'] },
  { code: 'TW', name: 'Taiwan', nameAr: 'تايوان', flag: '\u{1F1F9}\u{1F1FC}', dial: '+886', city: 'Taipei', cityAr: 'تايبيه', timezones: ['Asia/Taipei'] },
  { code: 'HK', name: 'Hong Kong', nameAr: 'هونغ كونغ', flag: '\u{1F1ED}\u{1F1F0}', dial: '+852', city: 'Hong Kong', cityAr: 'هونغ كونغ', timezones: ['Asia/Hong_Kong'] },

  // ─── Oceania ────────────────────────────────────────────────────
  { code: 'AU', name: 'Australia', nameAr: 'أستراليا', flag: '\u{1F1E6}\u{1F1FA}', dial: '+61', city: 'Sydney', cityAr: 'سيدني', timezones: ['Australia/Sydney', 'Australia/Melbourne', 'Australia/Brisbane', 'Australia/Perth'] },
  { code: 'NZ', name: 'New Zealand', nameAr: 'نيوزيلندا', flag: '\u{1F1F3}\u{1F1FF}', dial: '+64', city: 'Auckland', cityAr: 'أوكلاند', timezones: ['Pacific/Auckland'] },

  // ─── Africa — additional lower-band markets ─────────────────────
  { code: 'SN', name: 'Senegal', nameAr: 'السنغال', flag: '\u{1F1F8}\u{1F1F3}', dial: '+221', timezones: ['Africa/Dakar'] },
  { code: 'CI', name: 'Ivory Coast', nameAr: 'ساحل العاج', flag: '\u{1F1E8}\u{1F1EE}', dial: '+225', timezones: ['Africa/Abidjan'] },
  { code: 'CM', name: 'Cameroon', nameAr: 'الكاميرون', flag: '\u{1F1E8}\u{1F1F2}', dial: '+237', timezones: ['Africa/Douala'] },
  { code: 'ZW', name: 'Zimbabwe', nameAr: 'زيمبابوي', flag: '\u{1F1FF}\u{1F1FC}', dial: '+263', timezones: ['Africa/Harare'] },
  { code: 'ZM', name: 'Zambia', nameAr: 'زامبيا', flag: '\u{1F1FF}\u{1F1F2}', dial: '+260', timezones: ['Africa/Lusaka'] },
  { code: 'MZ', name: 'Mozambique', nameAr: 'موزمبيق', flag: '\u{1F1F2}\u{1F1FF}', dial: '+258', timezones: ['Africa/Maputo'] },
];

/** Fast O(1) lookup by ISO-2 code (uppercase). */
export const COUNTRIES_BY_CODE: Record<string, CountryInfo> = Object.fromEntries(
  COUNTRIES.map((c) => [c.code, c]),
);

/** Canada fallback — used when nothing else resolves. */
export const DEFAULT_COUNTRY: CountryInfo = COUNTRIES_BY_CODE['CA'];

/**
 * Detect country from IANA timezone. Returns Canada as fallback.
 * Used by the booking page to pre-select the client's country.
 */
export function detectCountryFromTimezone(tz: string): CountryInfo {
  const match = COUNTRIES.find((c) => c.timezones.includes(tz));
  return match ?? DEFAULT_COUNTRY;
}

/**
 * Normalize any country input to an ISO-3166 alpha-2 uppercase code.
 *
 * Accepts:
 * - ISO-2 codes ("CA", "ca", "US")
 * - English names ("Canada", "United States", "UAE", "USA")
 * - Arabic names ("كندا", "الإمارات", "أمريكا")
 * - Known aliases ("U.A.E.", "Great Britain", etc.)
 *
 * Returns `'CA'` if the input can't be resolved. Never throws.
 *
 * **This is the function to use everywhere country handling used to
 * silently fall through to the wrong band.**
 */
export function toISO2(input: string | undefined | null): string {
  if (!input) return 'CA';
  const raw = input.trim();
  if (!raw) return 'CA';

  // 1. Already an ISO-2 code?
  if (/^[A-Za-z]{2}$/.test(raw)) {
    const upper = raw.toUpperCase();
    if (COUNTRIES_BY_CODE[upper]) return upper;
  }

  // 2. Exact EN or AR name match (case-insensitive for English)
  const rawLower = raw.toLowerCase();
  const match = COUNTRIES.find(
    (c) => c.name.toLowerCase() === rawLower || c.nameAr === raw,
  );
  if (match) return match.code;

  // 3. Common aliases not in the COUNTRIES array
  const aliases: Record<string, string> = {
    'usa': 'US',
    'us': 'US',
    'u.s.': 'US',
    'u.s.a.': 'US',
    'america': 'US',
    'uk': 'GB',
    'u.k.': 'GB',
    'britain': 'GB',
    'great britain': 'GB',
    'england': 'GB',
    'scotland': 'GB',
    'wales': 'GB',
    'uae': 'AE',
    'u.a.e.': 'AE',
    'emirates': 'AE',
    'ksa': 'SA',
    'saudi': 'SA',
    'czechia': 'CZ',
    'holland': 'NL',
    'south korea': 'KR',
    'korea': 'KR',
    'republic of korea': 'KR',
    'russian federation': 'RU',
    'bosnia': 'BA',
    'macedonia': 'MK',
  };
  if (aliases[rawLower]) return aliases[rawLower];

  // 4. Give up — log server-side so we can add the missing name to the list
  if (typeof console !== 'undefined') {
    console.warn(`[countries] Could not resolve "${input}" to ISO-2. Defaulting to 'CA'.`);
  }
  return 'CA';
}

/**
 * Format a country for display: "🇨🇦 Canada" (EN) or "🇨🇦 كندا" (AR).
 * Returns the raw input if the code is unknown.
 */
export function getCountryDisplay(
  code: string | undefined | null,
  locale: 'en' | 'ar' = 'en',
): string {
  if (!code) return '';
  const c = COUNTRIES_BY_CODE[code.toUpperCase()];
  if (!c) return code;
  return `${c.flag} ${locale === 'ar' ? c.nameAr : c.name}`;
}
