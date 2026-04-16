/**
 * Quiz Share Utilities
 * Encode/decode quiz results for shareable URLs and counselor summaries.
 */

export interface QuizResultPayload {
  /** Quiz slug (short key) */
  q: string;
  /** Session ID */
  s: string;
  /** Locale */
  l: string;
  /** Total score */
  t: number;
  /** Max possible score */
  m: number;
  /** Tier key */
  k: string;
  /** Dimension scores */
  d?: Record<string, number>;
  /** Dominant style (parenting quiz only) */
  ds?: string;
  /** Raw answers */
  a: Record<string, number | string>;
  /** Completed at ISO string */
  c: string;
}

const QUIZ_NAMES: Record<string, { en: string; ar: string }> = {
  'family-harmony': { en: 'Family Harmony Assessment', ar: 'تقييمُ الانسجامِ الأسريّ' },
  'executive-function': { en: 'Executive Function Screener', ar: 'فاحصُ الوظائفِ التنفيذيّة' },
  'wellbeing': { en: 'Wellbeing Check-in', ar: 'فحصُ الرّفاهية' },
  'emotional-intelligence': { en: 'Child Emotional Intelligence Assessment', ar: 'تقييمُ الذكاءِ العاطفيِّ للطفل' },
  'parenting-style': { en: "Mama Hala's Parenting Compass", ar: 'بوصلةُ ماما هالة للتربية' },
  'life-balance': { en: 'Life Balance & Fulfillment Assessment', ar: 'تقييمُ التوازنِ والرضا في الحياة' },
  'relationship-health': { en: "Mama Hala's Relationship Compass", ar: 'بوصلةُ ماما هالة للعلاقات' },
  'pre-marriage': { en: 'Pre-Marriage Readiness Check', ar: 'فحصُ الجاهزيّةِ لِلزّواج' },
  'digital-life': { en: 'My Digital Life Check-in', ar: 'فحصُ حياتي الرقميّة' },
  'identity-compass': { en: 'Who Am I Becoming?', ar: 'مَن أنا الذي أصبح؟' },
  'adulting-check': { en: 'The Adulting Reality Check', ar: 'فحصُ واقعِ حياةِ الكبار' },
  'conflict-style': { en: 'How Do We Fight?', ar: 'كيفَ نتخاصم؟' },
  'communication-style': { en: 'Are We Speaking the Same Language?', ar: 'هل نتحدّثُ اللغةَ نفسَها؟' },
  'digital-awareness': { en: 'The Digital Self-Awareness Profile', ar: 'مِلَفُّ الوعيِ الرَّقمِيِّ الذَّاتِيّ' },
};

/** Generate a unique session ID */
export function generateSessionId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID().slice(0, 12);
  }
  return Math.random().toString(36).slice(2, 14);
}

/** Encode results to a URL-safe base64 string */
export function encodeResults(data: QuizResultPayload): string {
  try {
    const json = JSON.stringify(data);
    // Use btoa with URI encoding for safety
    const encoded = btoa(unescape(encodeURIComponent(json)));
    return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  } catch {
    return '';
  }
}

/** Decode results from a URL-safe base64 string */
export function decodeResults(encoded: string): QuizResultPayload | null {
  try {
    // Restore standard base64
    let base64 = encoded.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    const json = decodeURIComponent(escape(atob(base64)));
    return JSON.parse(json) as QuizResultPayload;
  } catch {
    return null;
  }
}

/** Build a shareable URL */
export function buildShareUrl(locale: string, quizSlug: string, encoded: string): string {
  const base = typeof window !== 'undefined' ? window.location.origin : 'https://mamahala.ca';
  return `${base}/${locale}/quiz/${quizSlug}?r=${encoded}`;
}

/** Format a counselor summary (plain text for clipboard) */
export function formatCounselorSummary(
  data: QuizResultPayload,
  locale: string = 'en',
  tierTitle?: string,
  dimensionLabels?: Record<string, string>,
): string {
  const isAr = locale === 'ar';
  const quizName = QUIZ_NAMES[data.q]?.[isAr ? 'ar' : 'en'] || data.q;
  const date = new Date(data.c).toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const lines: string[] = [
    isAr ? '═══ ملخّصُ نتائجِ التقييم ═══' : '═══ Assessment Results Summary ═══',
    '',
    `${isAr ? 'التقييم' : 'Assessment'}: ${quizName}`,
    `${isAr ? 'التاريخ' : 'Date'}: ${date}`,
    `${isAr ? 'معرّف الجلسة' : 'Session ID'}: ${data.s}`,
    '',
    `${isAr ? 'النتيجة الإجماليّة' : 'Overall Score'}: ${data.t}/${data.m}`,
  ];

  if (tierTitle) {
    lines.push(`${isAr ? 'المستوى' : 'Tier'}: ${tierTitle}`);
  }

  if (data.d && dimensionLabels) {
    lines.push('');
    lines.push(isAr ? '── التفاصيل ──' : '── Dimension Breakdown ──');
    for (const [key, score] of Object.entries(data.d)) {
      const label = dimensionLabels[key] || key;
      lines.push(`  ${label}: ${score}`);
    }
  }

  if (data.ds) {
    lines.push('');
    lines.push(`${isAr ? 'النمط السائد' : 'Dominant Style'}: ${data.ds}`);
  }

  lines.push('');
  lines.push(isAr ? '── ──' : '── ──');
  lines.push(isAr
    ? 'ماما هالة للاستشارات | mamahala.ca'
    : 'Mama Hala Consulting | mamahala.ca'
  );

  return lines.join('\n');
}

/** Share using native share API or fallback to clipboard */
export async function shareResults(url: string, title: string): Promise<'shared' | 'copied' | 'error'> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, url });
      return 'shared';
    } catch {
      // User cancelled or share failed — fall through to clipboard
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch {
      return 'error';
    }
  }

  return 'error';
}

/** Copy text to clipboard */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  }
  return false;
}

/** Get quiz display name */
export function getQuizName(slug: string, locale: string = 'en'): string {
  return QUIZ_NAMES[slug]?.[locale === 'ar' ? 'ar' : 'en'] || slug;
}
