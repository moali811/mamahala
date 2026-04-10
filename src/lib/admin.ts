/**
 * Server-side admin email check.
 * Emails come from two sources:
 * 1. BUSINESS.vipEmails in src/config/business.ts (primary source)
 * 2. ADMIN_EMAILS env var (comma-separated, legacy/optional)
 */

import { BUSINESS } from '@/config/business';

const adminEmails: Set<string> = new Set([
  ...BUSINESS.vipEmails.map(e => e.toLowerCase().trim()),
  ...(process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean),
]);

export function isAdminEmail(email: string): boolean {
  return adminEmails.has(email.trim().toLowerCase());
}
