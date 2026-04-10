/**
 * Client-safe VIP email check.
 * Used on client components to auto-unlock premium content for admin/founder emails.
 * Source of truth: BUSINESS.vipEmails in src/config/business.ts
 */

import { BUSINESS } from '@/config/business';

const vipSet = new Set(BUSINESS.vipEmails.map(e => e.toLowerCase().trim()));

export function isVipEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return vipSet.has(email.toLowerCase().trim());
}

/**
 * Write unlock flags to localStorage for all known premium content.
 * Called when a VIP email is detected anywhere on the site.
 * Currently covers: anxiety-recovery-journal (premium toolkit)
 * and all academy programs (levels 2 & 3).
 */
export function unlockAllForVip(programSlugs: string[], toolkitSlugs: string[]): void {
  if (typeof window === 'undefined') return;
  // Unlock all premium toolkits
  toolkitSlugs.forEach(slug => {
    localStorage.setItem(`toolkit:paid:${slug}`, 'true');
  });
  // Unlock all academy levels (2 and 3)
  programSlugs.forEach(slug => {
    localStorage.setItem(`academy:paid:${slug}:level-2`, 'true');
    localStorage.setItem(`academy:paid:${slug}:level-3`, 'true');
  });
}
