/* ================================================================
   Mama Hala Academy — Email system
   ================================================================
   Handles every student-facing academy email:

     - access-granted     → immediate, fired after a manual grant or
                            successful Stripe payment webhook.
     - welcome-paid       → 24h nudge for fullAccess students who
                            haven't opened a module yet.
     - stuck              → 7+ days since last module, <80% complete.
     - almost-there       → 80-99% complete and 3+ days dormant.
     - completed          → 100% — celebrates + links the certificate.
     - level-1-done       → Level 1 complete, paid levels still locked
                            → warm upsell nudge.
     - abandoned          → 21+ days no activity, <100% complete.

   Each send writes an idempotency key to KV so the daily cron never
   re-sends the same nudge. Opt-out is respected globally.

   All HTML uses shared emailWrapper + emailStyles. Dr. Hala's voice:
   warm, grounded, specific — no corporate filler.
   ================================================================ */

import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';
import { SITE_URL } from '@/lib/site-url';
import type { AcademyProgram } from '@/types';
import crypto from 'node:crypto';

export type AcademyEmailKind =
  | 'access-granted'
  | 'welcome-paid'
  | 'stuck'
  | 'almost-there'
  | 'completed'
  | 'level-1-done'
  | 'abandoned';

export interface AcademyEmailContext {
  /** Student email (authoritative — lowercased). */
  email: string;
  /** Student's display name; falls back to the email local-part. */
  name?: string;
  /** Program the email is about. */
  program: AcademyProgram;
  /** Progress metrics (pass what you have). */
  completedModules?: number;
  totalModules?: number;
  /** Slug of the module they should jump into next. */
  nextModuleSlug?: string | null;
  /** For completed flow — certificate id if it exists. */
  certificateId?: string | null;
  /** Which levels are unlocked (e.g. [2, 3] for full access). */
  unlockedLevels?: number[];
  /** Locale for copy (default 'en'). */
  locale?: 'en' | 'ar';
}

export interface BuiltEmail {
  subject: string;
  html: string;
  /** Short internal tag for logging (e.g. "access-granted"). */
  tag: AcademyEmailKind;
  /** Idempotency key — same student + context yields same key. */
  idempotencyKey: string;
}

const FROM_ADDRESS = 'Mama Hala Academy <academy@mamahala.ca>';

// ─── Copy helpers ───────────────────────────────────────────────

function firstName(ctx: AcademyEmailContext): string {
  if (ctx.name && ctx.name.trim()) {
    return ctx.name.trim().split(/\s+/)[0];
  }
  return ctx.email.split('@')[0];
}

function programLink(slug: string, locale: 'en' | 'ar' = 'en'): string {
  return `${SITE_URL}/${locale}/programs/${slug}`;
}

function moduleLink(slug: string, moduleSlug: string, locale: 'en' | 'ar' = 'en'): string {
  return `${SITE_URL}/${locale}/programs/${slug}/${moduleSlug}`;
}

function certificateLink(certId: string, locale: 'en' | 'ar' = 'en'): string {
  return `${SITE_URL}/${locale}/programs/certificate/${certId}`;
}

function unsubscribeLink(email: string): string {
  const token = signUnsubscribeToken(email);
  return `${SITE_URL}/api/academy/unsubscribe?token=${encodeURIComponent(token)}`;
}

function unsubFooter(email: string): string {
  return `<p style="${emailStyles.muted};margin-top:24px;text-align:center;">
    Receiving too many of these? <a href="${unsubscribeLink(email)}" style="color:#8E8E9F;text-decoration:underline;">Unsubscribe from academy emails</a>.
  </p>`;
}

function signatureLine(): string {
  return `<p style="${emailStyles.muted};margin-top:20px;">— Dr. Hala &amp; the Mama Hala Academy team</p>`;
}

// ─── Unsubscribe token (HMAC) ────────────────────────────────────

/** Secret used to sign unsubscribe tokens. Falls back to ADMIN_PASSWORD
 *  when the dedicated secret isn't configured — still not leakable in
 *  the token since HMAC is one-way. */
function getUnsubSecret(): string {
  return process.env.ACADEMY_EMAIL_SECRET
    || process.env.ADMIN_PASSWORD
    || 'mama-hala-unsub-fallback';
}

export function signUnsubscribeToken(email: string): string {
  const payload = email.toLowerCase().trim();
  const sig = crypto.createHmac('sha256', getUnsubSecret())
    .update(payload)
    .digest('base64url')
    .slice(0, 24);
  return `${Buffer.from(payload).toString('base64url')}.${sig}`;
}

export function verifyUnsubscribeToken(token: string): string | null {
  const [encoded, sig] = token.split('.');
  if (!encoded || !sig) return null;
  let email: string;
  try {
    email = Buffer.from(encoded, 'base64url').toString('utf8').toLowerCase().trim();
  } catch {
    return null;
  }
  const expected = crypto.createHmac('sha256', getUnsubSecret())
    .update(email)
    .digest('base64url')
    .slice(0, 24);
  // constant-time compare
  if (sig.length !== expected.length) return null;
  let mismatch = 0;
  for (let i = 0; i < sig.length; i += 1) mismatch |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  return mismatch === 0 ? email : null;
}

// ─── Template builders ──────────────────────────────────────────

export function buildAccessGrantedEmail(ctx: AcademyEmailContext): BuiltEmail {
  const name = firstName(ctx);
  const programTitle = ctx.program.titleEn;
  const start = ctx.nextModuleSlug
    ? moduleLink(ctx.program.slug, ctx.nextModuleSlug)
    : programLink(ctx.program.slug);
  const levels = (ctx.unlockedLevels && ctx.unlockedLevels.length > 0)
    ? ctx.unlockedLevels.join(', ')
    : 'all paid levels';

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">You're in, ${name} 🎉</h1>
      <p style="${emailStyles.text}">Full access to <strong>${programTitle}</strong> is now yours — Levels ${levels} unlocked, lifetime access, no subscription.</p>
      <p style="${emailStyles.text}">The program is designed to work <em>with</em> your life, not against it. Start wherever you want. One module at a time is plenty.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${start}" style="${emailStyles.button}">Start Learning</a>
      </div>
      <div style="${emailStyles.goldAccent}">
        <p style="margin:0;font-size:13px;color:#6B5A47;"><strong>Tip:</strong> Pair each module with a real-life moment this week — that's where the real change happens.</p>
      </div>
      ${signatureLine()}
    </div>
    ${unsubFooter(ctx.email)}
  `);

  return {
    subject: `Full access to ${programTitle} — you're in`,
    html,
    tag: 'access-granted',
    idempotencyKey: `access-granted:${ctx.program.slug}`,
  };
}

export function buildWelcomePaidEmail(ctx: AcademyEmailContext): BuiltEmail {
  const name = firstName(ctx);
  const programTitle = ctx.program.titleEn;
  const start = ctx.nextModuleSlug
    ? moduleLink(ctx.program.slug, ctx.nextModuleSlug)
    : programLink(ctx.program.slug);

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">${name}, your program is waiting</h1>
      <p style="${emailStyles.text}">You unlocked <strong>${programTitle}</strong> — the whole thing is ready whenever you are.</p>
      <p style="${emailStyles.text}">Most people find the first module takes 20 minutes. That's it. One small step, and the rest of the path is shorter than you think.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${start}" style="${emailStyles.button}">Open Module 1</a>
      </div>
      ${signatureLine()}
    </div>
    ${unsubFooter(ctx.email)}
  `);

  return {
    subject: `${programTitle}: ready when you are`,
    html,
    tag: 'welcome-paid',
    idempotencyKey: `welcome-paid:${ctx.program.slug}`,
  };
}

export function buildStuckEmail(ctx: AcademyEmailContext): BuiltEmail {
  const name = firstName(ctx);
  const programTitle = ctx.program.titleEn;
  const pct = ctx.completedModules && ctx.totalModules
    ? Math.round((ctx.completedModules / ctx.totalModules) * 100)
    : 0;
  const link = ctx.nextModuleSlug
    ? moduleLink(ctx.program.slug, ctx.nextModuleSlug)
    : programLink(ctx.program.slug);

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">Still thinking about you, ${name}</h1>
      <p style="${emailStyles.text}">You're <strong>${pct}% through ${programTitle}</strong>. That's real progress — and it's also completely normal to pause.</p>
      <p style="${emailStyles.text}">If the program has slipped down the list, a 10-minute module this week would reset everything. You don't have to start where you left off; pick any one that calls to you.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${link}" style="${emailStyles.button}">Pick Up Where You Left Off</a>
      </div>
      <p style="${emailStyles.muted}">If something has come up and you'd like to talk it through, just reply — I read every message personally.</p>
      ${signatureLine()}
    </div>
    ${unsubFooter(ctx.email)}
  `);

  return {
    subject: `${programTitle}: a gentle nudge`,
    html,
    tag: 'stuck',
    idempotencyKey: `stuck:${ctx.program.slug}:${pct}`,
  };
}

export function buildAlmostThereEmail(ctx: AcademyEmailContext): BuiltEmail {
  const name = firstName(ctx);
  const programTitle = ctx.program.titleEn;
  const remaining = Math.max(0, (ctx.totalModules ?? 0) - (ctx.completedModules ?? 0));
  const link = ctx.nextModuleSlug
    ? moduleLink(ctx.program.slug, ctx.nextModuleSlug)
    : programLink(ctx.program.slug);

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">${name}, you're so close</h1>
      <p style="${emailStyles.text}">Just <strong>${remaining} module${remaining === 1 ? '' : 's'}</strong> left in ${programTitle}. Everything you've already done compounds — the last stretch is where it really clicks.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${link}" style="${emailStyles.button}">Finish the Program</a>
      </div>
      <p style="${emailStyles.muted}">After the last quiz, your personalized certificate — with a note from me — will be waiting.</p>
      ${signatureLine()}
    </div>
    ${unsubFooter(ctx.email)}
  `);

  return {
    subject: `${remaining} module${remaining === 1 ? '' : 's'} to go`,
    html,
    tag: 'almost-there',
    idempotencyKey: `almost-there:${ctx.program.slug}`,
  };
}

export function buildCompletedEmail(ctx: AcademyEmailContext): BuiltEmail {
  const name = firstName(ctx);
  const programTitle = ctx.program.titleEn;
  const certLink = ctx.certificateId
    ? certificateLink(ctx.certificateId)
    : programLink(ctx.program.slug);

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">You did it, ${name} 🌳</h1>
      <p style="${emailStyles.text}">Every module of <strong>${programTitle}</strong> — complete. This is not a small thing.</p>
      <p style="${emailStyles.text}">Your certificate is ready, personalized with a note from me and your growth map.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${certLink}" style="${emailStyles.button}">View Your Certificate</a>
      </div>
      <p style="${emailStyles.muted}">If you'd like to keep going — whether with another program or a one-on-one session — just reply.</p>
      ${signatureLine()}
    </div>
    ${unsubFooter(ctx.email)}
  `);

  return {
    subject: `${programTitle} — complete 🎓`,
    html,
    tag: 'completed',
    idempotencyKey: `completed:${ctx.program.slug}`,
  };
}

export function buildLevel1DoneEmail(ctx: AcademyEmailContext): BuiltEmail {
  const name = firstName(ctx);
  const programTitle = ctx.program.titleEn;
  const link = programLink(ctx.program.slug) + '?unlock=level-2';

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">Level 1 is behind you, ${name}</h1>
      <p style="${emailStyles.text}">Foundation modules of <strong>${programTitle}</strong> — done. The work you've done in these modules is what makes the rest click.</p>
      <p style="${emailStyles.text}">Levels 2 and 3 are where the program shifts from <em>understanding</em> to <em>doing</em>. Unlock them with one payment — lifetime access, no subscription.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${link}" style="${emailStyles.button}">Unlock the Full Program</a>
      </div>
      ${signatureLine()}
    </div>
    ${unsubFooter(ctx.email)}
  `);

  return {
    subject: `You're ready for Level 2`,
    html,
    tag: 'level-1-done',
    idempotencyKey: `level-1-done:${ctx.program.slug}`,
  };
}

export function buildAbandonedEmail(ctx: AcademyEmailContext): BuiltEmail {
  const name = firstName(ctx);
  const programTitle = ctx.program.titleEn;
  const link = ctx.nextModuleSlug
    ? moduleLink(ctx.program.slug, ctx.nextModuleSlug)
    : programLink(ctx.program.slug);

  const html = emailWrapper(`
    <div style="${emailStyles.card}">
      <h1 style="${emailStyles.heading}">Hey ${name} — still here for you</h1>
      <p style="${emailStyles.text}">It's been a few weeks since you looked at <strong>${programTitle}</strong>. No pressure at all — life gets loud. This is just a small hand in the doorway.</p>
      <p style="${emailStyles.text}">Your progress is saved. Your access is lifetime. Whenever you come back, the program will meet you where you are — no catch-up required.</p>
      <div style="text-align:center;margin:22px 0 8px;">
        <a href="${link}" style="${emailStyles.buttonSecondary}">Reopen the Program</a>
      </div>
      <p style="${emailStyles.muted}">If this program isn't quite right for you, a simple reply lets me know and I'll stop the check-ins.</p>
      ${signatureLine()}
    </div>
    ${unsubFooter(ctx.email)}
  `);

  return {
    subject: `We're still here, ${name}`,
    html,
    tag: 'abandoned',
    idempotencyKey: `abandoned:${ctx.program.slug}`,
  };
}

// ─── KV-backed send helper (idempotent, opt-out-aware) ──────────

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKV() {
  if (!KV_AVAILABLE) return null;
  const { kv } = await import('@vercel/kv');
  return kv;
}

/** Has this student opted out of academy emails? */
export async function isOptedOut(email: string): Promise<boolean> {
  const kv = await getKV();
  if (!kv) return false;
  const v = await kv.get(`academy:email-opt-out:${email.toLowerCase().trim()}`);
  return !!v;
}

/** Mark a student as opted out. Called by the unsubscribe endpoint. */
export async function setOptedOut(email: string): Promise<void> {
  const kv = await getKV();
  if (!kv) return;
  await kv.set(`academy:email-opt-out:${email.toLowerCase().trim()}`, {
    optedOut: true,
    at: new Date().toISOString(),
  });
}

/** Retrieve the list of email tags already sent to a student. */
export async function getSentLog(email: string): Promise<Record<string, string>> {
  const kv = await getKV();
  if (!kv) return {};
  const rec = await kv.get(`academy:email-log:${email.toLowerCase().trim()}`) as Record<string, string> | null;
  return rec ?? {};
}

async function recordSent(email: string, idempotencyKey: string): Promise<void> {
  const kv = await getKV();
  if (!kv) return;
  const key = `academy:email-log:${email.toLowerCase().trim()}`;
  const current = (await kv.get(key)) as Record<string, string> | null;
  const next = { ...(current ?? {}), [idempotencyKey]: new Date().toISOString() };
  await kv.set(key, next);
}

export interface SendResult {
  sent: boolean;
  reason?: 'opt-out' | 'duplicate' | 'no-key' | 'send-failed';
  resendId?: string;
  error?: string;
}

/** Send an academy email respecting opt-out + idempotency. */
export async function sendAcademyEmail(
  built: BuiltEmail,
  email: string,
  opts: { force?: boolean } = {},
): Promise<SendResult> {
  if (!process.env.RESEND_API_KEY) {
    return { sent: false, reason: 'no-key' };
  }
  const normalized = email.toLowerCase().trim();

  if (await isOptedOut(normalized)) {
    return { sent: false, reason: 'opt-out' };
  }

  if (!opts.force) {
    const log = await getSentLog(normalized);
    if (log[built.idempotencyKey]) {
      return { sent: false, reason: 'duplicate' };
    }
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);
    const resp = await resend.emails.send({
      from: FROM_ADDRESS,
      to: normalized,
      subject: built.subject,
      html: built.html,
    });
    if (resp.error) {
      return { sent: false, reason: 'send-failed', error: resp.error.message };
    }
    await recordSent(normalized, built.idempotencyKey);
    return { sent: true, resendId: resp.data?.id };
  } catch (err) {
    return { sent: false, reason: 'send-failed', error: err instanceof Error ? err.message : String(err) };
  }
}
