/**
 * Server-side admin email check.
 * ADMIN_EMAILS env var is a comma-separated list of emails with full content access.
 */

const adminEmails: Set<string> = new Set(
  (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean),
);

export function isAdminEmail(email: string): boolean {
  return adminEmails.has(email.trim().toLowerCase());
}
