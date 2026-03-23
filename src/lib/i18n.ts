/* ================================================================
   Internationalization Utilities
   ================================================================ */

import type { Locale } from '@/types';
export type { Locale };

export const locales: Locale[] = ['en', 'ar'];
export const defaultLocale: Locale = 'en';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getMessages(locale: Locale) {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  return require(`@/messages/${locale}.json`);
}

/**
 * Helper to get localized text from en/ar pairs
 */
export function t(locale: Locale, en: string, ar: string): string {
  return locale === 'ar' ? ar : en;
}

/**
 * Get the opposite locale
 */
export function getAltLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}
