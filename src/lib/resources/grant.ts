/* ================================================================
   Resource Grant — shared helpers for admin-initiated unlocks
   ================================================================
   Mirrors the KV writes the Stripe webhook performs, but tags each
   record with `source: 'admin-grant'` plus a reason + grantedBy for
   audit. Used by /api/admin/resources/grant and /revoke.

   Key shape (must match Stripe webhook exactly):
     toolkit:paid:{toolkitSlug}:{email}        → ToolkitUnlockRecord
     academy:paid:{programSlug}:level-{N}:{email} → AcademyUnlockRecord
     academy:student:{email}                   → AcademyStudentRecord
   ================================================================ */

import type { AcademyProgram } from '@/types';
import {
  intentionalParentProgram,
} from '@/data/programs/intentional-parent';
import { resilientTeensProgram } from '@/data/programs/resilient-teens';
import { strongerTogetherProgram } from '@/data/programs/stronger-together';
import { innerCompassProgram } from '@/data/programs/inner-compass';
import { getToolkit, toolkitCatalog } from '@/data/toolkits';
import { sendAcademyEmail, type BuiltEmail } from '@/lib/academy/emails';
import { signGrantToken } from '@/lib/academy/grant-token';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

export type GrantReason = 'gift' | 'comp' | 'package-perk' | 'beta' | 'make-good' | 'other';

export interface GrantAuditFields {
  source: 'admin-grant';
  grantedAt: string;
  grantedReason: GrantReason;
  grantedReasonNote?: string;
  grantedBy?: string;
}

export interface ToolkitUnlockRecord extends Partial<GrantAuditFields> {
  paid: true;
  paidAt: string;
  amount: number | null;
  currency: string;
  stripeSessionId?: string;
}

export interface AcademyUnlockRecord extends Partial<GrantAuditFields> {
  paid: true;
  paidAt: string;
  amount: number | null;
  currency: string;
  stripeSessionId?: string;
  tier: string | null;
}

const PROGRAMS_BY_SLUG: Record<string, AcademyProgram> = {
  [intentionalParentProgram.slug]: intentionalParentProgram,
  [resilientTeensProgram.slug]: resilientTeensProgram,
  [strongerTogetherProgram.slug]: strongerTogetherProgram,
  [innerCompassProgram.slug]: innerCompassProgram,
};

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
let _kv: typeof import('@vercel/kv').kv | null = null;

async function getKV() {
  if (!_kv && KV_AVAILABLE) {
    const mod = await import('@vercel/kv');
    _kv = mod.kv;
  }
  return _kv;
}

function normalizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

export function getProgram(slug: string): AcademyProgram | null {
  return PROGRAMS_BY_SLUG[slug] ?? null;
}

export function getPaidLevels(slug: string): number[] {
  const p = PROGRAMS_BY_SLUG[slug];
  if (!p || p.isFree) return [];
  return p.levels.filter(l => !l.isFree).map(l => l.level);
}

/* ──────────────────────────────────────────────────────────────
   Toolkit grant + revoke
   ────────────────────────────────────────────────────────────── */

export interface GrantToolkitInput {
  toolkitSlug: string;
  recipientEmail: string;
  recipientName?: string;
  reason: GrantReason;
  reasonNote?: string;
  grantedBy?: string;
  sendEmail: boolean;
}

export interface GrantToolkitResult {
  ok: boolean;
  toolkitSlug: string;
  email: string;
  emailSent: boolean;
  emailError?: string;
  alreadyUnlocked?: boolean;
  error?: string;
}

export async function grantToolkitAccess(
  input: GrantToolkitInput,
): Promise<GrantToolkitResult> {
  const email = normalizeEmail(input.recipientEmail);
  const slug = input.toolkitSlug;
  const result: GrantToolkitResult = {
    ok: false,
    toolkitSlug: slug,
    email,
    emailSent: false,
  };

  // Validate toolkit exists in catalog (skip orphan/legacy slugs)
  const inCatalog = toolkitCatalog.some(t => t.slug === slug);
  if (!inCatalog) {
    result.error = `Unknown toolkit: ${slug}`;
    return result;
  }

  const kv = await getKV();
  if (!kv) {
    result.error = 'KV store not configured';
    return result;
  }

  const key = `toolkit:paid:${slug}:${email}`;
  const existing = await kv.get(key);
  const audit: GrantAuditFields = {
    source: 'admin-grant',
    grantedAt: new Date().toISOString(),
    grantedReason: input.reason,
    ...(input.reasonNote ? { grantedReasonNote: input.reasonNote } : {}),
    ...(input.grantedBy ? { grantedBy: input.grantedBy } : {}),
  };

  const record: ToolkitUnlockRecord = {
    paid: true,
    paidAt: new Date().toISOString(),
    amount: null,                      // free-grant — not revenue
    currency: 'cad',
    ...audit,
  };

  await kv.set(key, record);
  result.ok = true;
  result.alreadyUnlocked = !!existing;

  if (input.sendEmail) {
    const meta = toolkitCatalog.find(t => t.slug === slug)!;
    try {
      const sent = await sendToolkitGrantEmail({
        toolkitTitle: meta.titleEn,
        toolkitSlug: slug,
        recipientEmail: email,
        recipientName: input.recipientName,
        reason: input.reason,
      });
      result.emailSent = sent.sent;
      if (!sent.sent && sent.error) result.emailError = sent.error;
    } catch (err) {
      result.emailError = err instanceof Error ? err.message : 'Email send failed';
    }
  }

  return result;
}

export async function revokeToolkitAccess(
  toolkitSlug: string,
  recipientEmail: string,
): Promise<{ ok: boolean; error?: string }> {
  const kv = await getKV();
  if (!kv) return { ok: false, error: 'KV store not configured' };
  const key = `toolkit:paid:${toolkitSlug}:${normalizeEmail(recipientEmail)}`;
  await kv.del(key);
  return { ok: true };
}

/* ──────────────────────────────────────────────────────────────
   Academy program grant + revoke
   ────────────────────────────────────────────────────────────── */

export interface GrantAcademyInput {
  programSlug: string;
  /** Specific levels to unlock. Empty / omitted = all paid levels. */
  levels?: number[];
  recipientEmail: string;
  recipientName?: string;
  reason: GrantReason;
  reasonNote?: string;
  grantedBy?: string;
  sendEmail: boolean;
}

export interface GrantAcademyResult {
  ok: boolean;
  programSlug: string;
  email: string;
  unlockedLevels: number[];
  emailSent: boolean;
  emailError?: string;
  error?: string;
}

export async function grantAcademyAccess(
  input: GrantAcademyInput,
): Promise<GrantAcademyResult> {
  const email = normalizeEmail(input.recipientEmail);
  const programSlug = input.programSlug;
  const program = PROGRAMS_BY_SLUG[programSlug];
  const result: GrantAcademyResult = {
    ok: false,
    programSlug,
    email,
    unlockedLevels: [],
    emailSent: false,
  };

  if (!program) {
    result.error = `Unknown program: ${programSlug}`;
    return result;
  }

  const allPaidLevels = getPaidLevels(programSlug);
  const requested = input.levels && input.levels.length > 0 ? input.levels : allPaidLevels;
  const validLevels = requested.filter(n => allPaidLevels.includes(n));

  if (validLevels.length === 0) {
    result.error = 'No valid paid levels to unlock for this program';
    return result;
  }

  const kv = await getKV();
  if (!kv) {
    result.error = 'KV store not configured';
    return result;
  }

  const grantedAt = new Date().toISOString();
  const audit: GrantAuditFields = {
    source: 'admin-grant',
    grantedAt,
    grantedReason: input.reason,
    ...(input.reasonNote ? { grantedReasonNote: input.reasonNote } : {}),
    ...(input.grantedBy ? { grantedBy: input.grantedBy } : {}),
  };

  for (const n of validLevels) {
    const key = `academy:paid:${programSlug}:level-${n}:${email}`;
    const record: AcademyUnlockRecord = {
      paid: true,
      paidAt: grantedAt,
      amount: null,
      currency: 'cad',
      tier: validLevels.length === allPaidLevels.length ? 'fullAccess' : null,
      ...audit,
    };
    await kv.set(key, record);
  }

  // Mirror the webhook's student record update so admin dashboards
  // (which read academy:student:{email}) reflect the grant.
  const studentKey = `academy:student:${email}`;
  const student = (await kv.get(studentKey) as Record<string, unknown>) || {};
  const unlockedLevels = (student.unlockedLevels as Record<string, number[]>) || {};
  unlockedLevels[programSlug] = Array.from(new Set([
    ...(unlockedLevels[programSlug] || []),
    ...validLevels,
  ])).sort((a, b) => a - b);
  student.unlockedLevels = unlockedLevels;
  student.lastGrant = {
    programSlug,
    unlockedLevels: validLevels,
    reason: input.reason,
    grantedAt,
    grantedBy: input.grantedBy,
  };
  if (input.recipientName && !student.name) student.name = input.recipientName;
  await kv.set(studentKey, student);

  result.ok = true;
  result.unlockedLevels = validLevels;

  if (input.sendEmail) {
    try {
      const built = buildAcademyGrantEmail({
        program,
        recipientEmail: email,
        recipientName: input.recipientName,
        unlockedLevels: validLevels,
        reason: input.reason,
      });
      const sent = await sendAcademyEmail(built, email, { force: true });
      result.emailSent = sent.sent;
      if (!sent.sent && sent.error) result.emailError = sent.error;
    } catch (err) {
      result.emailError = err instanceof Error ? err.message : 'Email send failed';
    }
  }

  return result;
}

/**
 * Build the academy grant email — uses the unlock-success bridge with a
 * signed grant token so the recipient's localStorage gets primed on
 * click. Distinct from the Stripe-paid `buildAccessGrantedEmail` (which
 * stays unchanged for the existing checkout flow).
 */
function buildAcademyGrantEmail({
  program,
  recipientEmail,
  recipientName,
  unlockedLevels,
  reason,
}: {
  program: AcademyProgram;
  recipientEmail: string;
  recipientName?: string;
  unlockedLevels: number[];
  reason: GrantReason;
}): BuiltEmail {
  const firstName = (recipientName?.trim().split(/\s+/)[0]) || 'friend';
  const programTitle = program.titleEn;
  const opener = REASON_OPENERS[reason];
  const levels = unlockedLevels.join(', ') || 'all paid levels';
  const { token } = signGrantToken(recipientEmail);
  const ref = `${program.slug}:level-${unlockedLevels[0] ?? 1}:${recipientEmail}`;
  const startUrl =
    `https://mamahala.ca/en/programs/unlock-success`
    + `?ref=${encodeURIComponent(ref)}`
    + `&grant=${encodeURIComponent(token)}`;

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">${opener}, ${firstName}</h1>
      <p style="${emailStyles.text}">Full access to <strong>${programTitle}</strong> is yours — Levels ${levels} unlocked, lifetime access.</p>
      <p style="${emailStyles.text}">The program is designed to work with your life, not against it. Start wherever you want; one module at a time is plenty.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${startUrl}" style="${emailStyles.button}">Open Your Program</a>
      </div>
      <p style="${emailStyles.muted};margin-top:16px;">— The Mama Hala Team</p>
    </div>
  `);

  return {
    subject: `${programTitle} is yours`,
    html,
    tag: 'access-granted',
    // Distinct idempotency key so manual re-grants don't collide with
    // the Stripe-flow access-granted send (which uses 'access-granted:{slug}').
    idempotencyKey: `access-granted-grant:${program.slug}`,
  };
}

export async function revokeAcademyAccess(
  programSlug: string,
  recipientEmail: string,
  levels?: number[],
): Promise<{ ok: boolean; revokedLevels: number[]; error?: string }> {
  const kv = await getKV();
  if (!kv) return { ok: false, revokedLevels: [], error: 'KV store not configured' };
  const email = normalizeEmail(recipientEmail);
  const targetLevels = levels && levels.length > 0 ? levels : getPaidLevels(programSlug);

  const revoked: number[] = [];
  for (const n of targetLevels) {
    const key = `academy:paid:${programSlug}:level-${n}:${email}`;
    await kv.del(key);
    revoked.push(n);
  }

  // Remove from student record's unlockedLevels too
  const studentKey = `academy:student:${email}`;
  const student = (await kv.get(studentKey) as Record<string, unknown>) || {};
  const unlockedLevels = (student.unlockedLevels as Record<string, number[]>) || {};
  if (unlockedLevels[programSlug]) {
    unlockedLevels[programSlug] = unlockedLevels[programSlug].filter(n => !targetLevels.includes(n));
    if (unlockedLevels[programSlug].length === 0) {
      delete unlockedLevels[programSlug];
    }
    student.unlockedLevels = unlockedLevels;
    await kv.set(studentKey, student);
  }

  return { ok: true, revokedLevels: revoked };
}

/* ──────────────────────────────────────────────────────────────
   Toolkit "your-toolkit-is-unlocked" grant email
   ────────────────────────────────────────────────────────────── */

interface ToolkitGrantEmailInput {
  toolkitTitle: string;
  toolkitSlug: string;
  recipientEmail: string;
  recipientName?: string;
  reason: GrantReason;
}

interface ToolkitEmailResult {
  sent: boolean;
  error?: string;
}

const REASON_OPENERS: Record<GrantReason, string> = {
  gift: 'A gift for you',
  comp: 'Unlocked on the house',
  'package-perk': 'A perk from your session package',
  beta: 'Early access — thank you for testing',
  'make-good': 'A small make-good',
  other: 'Your toolkit is unlocked',
};

async function sendToolkitGrantEmail(
  input: ToolkitGrantEmailInput,
): Promise<ToolkitEmailResult> {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false, error: 'RESEND_API_KEY not set' };
  }
  const firstName = input.recipientName?.trim().split(/\s+/)[0] || 'friend';
  const opener = REASON_OPENERS[input.reason];

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Route through /resources/toolkits/unlock-success so localStorage
    // toolkit:paid:{slug} gets written on the recipient's device — that's
    // the actual gate the toolkit page checks. The Stripe success_url
    // takes the same path; without it, the link drops the recipient on
    // a paywall even though the KV record is set.
    const unlockUrl = `https://mamahala.ca/en/resources/toolkits/unlock-success?slug=${encodeURIComponent(input.toolkitSlug)}`;
    const html = emailWrapper(`
      <div style="${emailStyles.card}">
        <h1 style="${emailStyles.heading}">${opener}, ${firstName}</h1>
        <p style="${emailStyles.text}">We've unlocked <strong>${input.toolkitTitle}</strong> for you — every section, every exercise, yours to keep.</p>
        <div style="text-align:center;margin:24px 0 8px;">
          <a href="${unlockUrl}" style="${emailStyles.button}">Open Your Toolkit</a>
        </div>
        <p style="${emailStyles.muted};margin-top:16px;">— The Mama Hala Team</p>
      </div>
    `);
    const resp = await resend.emails.send({
      from: 'Mama Hala <toolkits@mamahala.ca>',
      to: input.recipientEmail,
      subject: `${input.toolkitTitle} is yours`,
      html,
    });
    if (resp.error) return { sent: false, error: resp.error.message };
    return { sent: true };
  } catch (err) {
    return { sent: false, error: err instanceof Error ? err.message : 'Send failed' };
  }
}
