/* ================================================================
   Academy Unlock Backfill — Admin-only
   ================================================================
   Three modes, all admin-Bearer protected:

   1. Expand partial unlocks (default behaviour)
      For every student with at least one paid level unlocked in a
      given program, expand the entry to include every paid level —
      fixing records written by the old single-level webhook.

   2. Reconcile from Stripe (POST { reconcileStripe: true })
      List successful academy checkout sessions in Stripe and diff
      against KV. Any paid student whose KV record is missing or
      incomplete is granted the correct fullAccess unlock.
      Catches payments made before the webhook secret was set.

   3. Manual grants (POST { grants: [{ email, programSlug }, ...] })
      Explicitly grant fullAccess for the listed students.
      Last resort for unusual cases.

   GET  → dry-run report for mode 1 (partial-unlock expansion).
   POST → apply mode 1 by default; modes 2 and 3 via request body.
   All modes are idempotent — re-running is a no-op.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import type { AcademyProgram } from '@/types';
import { intentionalParentProgram } from '@/data/programs/intentional-parent';
import { resilientTeensProgram } from '@/data/programs/resilient-teens';
import { strongerTogetherProgram } from '@/data/programs/stronger-together';
import { innerCompassProgram } from '@/data/programs/inner-compass';
import { buildAccessGrantedEmail, sendAcademyEmail } from '@/lib/academy/emails';

export const dynamic = 'force-dynamic';

function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes('PLACEHOLDER')) return null;
  return new Stripe(key, { apiVersion: '2025-03-31.basil' });
}

const PROGRAMS: AcademyProgram[] = [
  intentionalParentProgram,
  resilientTeensProgram,
  strongerTogetherProgram,
  innerCompassProgram,
];

const PROGRAMS_BY_SLUG: Record<string, AcademyProgram> = Object.fromEntries(
  PROGRAMS.map(p => [p.slug, p]),
);

function paidLevelsFor(slug: string): number[] {
  const p = PROGRAMS_BY_SLUG[slug];
  if (!p || p.isFree) return [];
  return p.levels.filter(l => !l.isFree).map(l => l.level);
}

interface StudentShape {
  email?: string;
  name?: string;
  enrolledPrograms?: string[];
  unlockedLevels?: Record<string, number[]>;
  [k: string]: unknown;
}

interface StudentReport {
  email: string;
  name: string;
  enrolledPrograms: string[];
  current: Record<string, number[]>;
  proposed: Record<string, number[]>;
  changed: boolean;
}

async function loadAllStudents() {
  const { kv } = await import('@vercel/kv');
  const keys = await kv.keys('academy:student:*');
  const records: { key: string; email: string; student: StudentShape }[] = [];
  for (const key of keys) {
    const email = key.replace(/^academy:student:/, '');
    const student = (await kv.get(key)) as StudentShape | null;
    if (student) records.push({ key, email, student });
  }
  return records;
}

function buildReport(student: StudentShape, email: string): StudentReport {
  const current: Record<string, number[]> = {};
  const proposed: Record<string, number[]> = {};
  const unlocked = student.unlockedLevels ?? {};

  for (const slug of Object.keys(unlocked)) {
    const cur = Array.isArray(unlocked[slug]) ? [...unlocked[slug]] : [];
    current[slug] = [...cur].sort((a, b) => a - b);
    const paid = paidLevelsFor(slug);
    // Only expand if the student already has at least one paid level —
    // that's how we know they paid (vs. just browsing).
    const hasAnyPaid = cur.some(n => paid.includes(n));
    const target = hasAnyPaid
      ? Array.from(new Set([...cur, ...paid])).sort((a, b) => a - b)
      : [...cur].sort((a, b) => a - b);
    proposed[slug] = target;
  }

  const changed = Object.keys(proposed).some(
    slug => JSON.stringify(proposed[slug]) !== JSON.stringify(current[slug]),
  );

  return {
    email,
    name: typeof student.name === 'string' ? student.name : '',
    enrolledPrograms: Array.isArray(student.enrolledPrograms) ? student.enrolledPrograms : [],
    current,
    proposed,
    changed,
  };
}

export async function GET(req: NextRequest) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return NextResponse.json({ error: 'KV unavailable' }, { status: 503 });
  }

  const records = await loadAllStudents();
  const reports = records.map(r => buildReport(r.student, r.email));
  const changed = reports.filter(r => r.changed);

  return NextResponse.json({
    totalStudents: reports.length,
    wouldChange: changed.length,
    paidLevelsByProgram: Object.fromEntries(
      PROGRAMS.map(p => [p.slug, paidLevelsFor(p.slug)]),
    ),
    students: reports,
  });
}

interface PostBody {
  reconcileStripe?: boolean;
  grants?: Array<{ email: string; programSlug: string; amountCAD?: number }>;
}

interface ApplyAccessOpts {
  email: string;
  programSlug: string;
  source: string;
  /** Amount paid in CAD; attributed to the primary (lowest) paid level only. */
  amountCAD?: number | null;
  currency?: string;
  stripeSessionId?: string;
  paidAt?: string;
}

async function applyFullAccess(
  opts: ApplyAccessOpts,
): Promise<{ email: string; programSlug: string; before: number[]; after: number[]; amountWritten: number | null; created: boolean } | null> {
  const { email, programSlug, source, amountCAD = null, currency = 'cad', stripeSessionId, paidAt } = opts;
  const paid = paidLevelsFor(programSlug);
  if (paid.length === 0) return null;

  const { kv } = await import('@vercel/kv');
  const studentKey = `academy:student:${email}`;
  const existing = (await kv.get(studentKey)) as StudentShape | null;
  const student: StudentShape = existing ?? {
    email,
    enrolledPrograms: [],
    unlockedLevels: {},
  };

  if (!student.enrolledPrograms) student.enrolledPrograms = [];
  if (!student.enrolledPrograms.includes(programSlug)) {
    student.enrolledPrograms.push(programSlug);
  }

  const unlocked = (student.unlockedLevels as Record<string, number[]>) ?? {};
  const before = Array.isArray(unlocked[programSlug]) ? [...unlocked[programSlug]].sort((a, b) => a - b) : [];
  const after = Array.from(new Set([...before, ...paid])).sort((a, b) => a - b);
  unlocked[programSlug] = after;
  student.unlockedLevels = unlocked;
  student.lastPayment = {
    programSlug,
    tier: 'fullAccess',
    source,
    amount: amountCAD,
    date: paidAt ?? new Date().toISOString(),
  };
  await kv.set(studentKey, student);

  // Per-level paid markers — the admin dashboard sums `amount` across these
  // keys. Put the full payment amount on the PRIMARY (lowest-numbered) paid
  // level and null on the rest so a single payment isn't counted once per
  // level. Always rewrite these so re-running reconcile can fix records
  // written earlier with missing amounts.
  const primaryLevel = paid[0];
  const ts = paidAt ?? new Date().toISOString();
  for (const n of paid) {
    await kv.set(`academy:paid:${programSlug}:level-${n}:${email}`, {
      paid: true,
      paidAt: ts,
      amount: n === primaryLevel ? amountCAD : null,
      currency,
      tier: 'fullAccess',
      source,
      ...(stripeSessionId ? { stripeSessionId } : {}),
    });
  }

  return {
    email,
    programSlug,
    before,
    after,
    amountWritten: amountCAD,
    created: !existing,
  };
}

async function reconcileFromStripe() {
  const stripe = getStripe();
  if (!stripe) return { error: 'Stripe not configured' as const };

  const granted: Array<{ email: string; programSlug: string; before: number[]; after: number[]; sessionId: string; amountCAD: number | null }> = [];
  const skipped: Array<{ sessionId: string; reason: string }> = [];

  let startingAfter: string | undefined;
  let pagesFetched = 0;
  // Sweep up to ~500 recent sessions — plenty for a launch-window tool.
  while (pagesFetched < 5) {
    const page: Stripe.ApiList<Stripe.Checkout.Session> = await stripe.checkout.sessions.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    pagesFetched += 1;

    for (const s of page.data) {
      if (s.status !== 'complete' || s.payment_status !== 'paid') continue;
      const meta = s.metadata || {};
      // Only academy sessions — skip invoices, toolkits, bookings
      if (meta.type === 'invoice' || meta.type === 'toolkit') continue;
      const programSlug = typeof meta.programSlug === 'string' ? meta.programSlug : '';
      if (!programSlug || !PROGRAMS_BY_SLUG[programSlug]) {
        skipped.push({ sessionId: s.id, reason: 'no programSlug metadata' });
        continue;
      }
      const email = ((meta.email as string) || s.customer_email || '').toLowerCase().trim();
      if (!email) {
        skipped.push({ sessionId: s.id, reason: 'no email' });
        continue;
      }
      const amountCAD = s.amount_total ? s.amount_total / 100 : null;
      const currency = s.currency || 'cad';
      const paidAt = s.created ? new Date(s.created * 1000).toISOString() : undefined;
      const res = await applyFullAccess({
        email,
        programSlug,
        source: `stripe:${s.id}`,
        amountCAD,
        currency,
        stripeSessionId: s.id,
        paidAt,
      });
      if (res) {
        granted.push({ email: res.email, programSlug: res.programSlug, before: res.before, after: res.after, sessionId: s.id, amountCAD: res.amountWritten });
      }
    }

    if (!page.has_more) break;
    startingAfter = page.data[page.data.length - 1]?.id;
    if (!startingAfter) break;
  }

  return { granted, skipped, scanned: pagesFetched * 100 };
}

export async function POST(req: NextRequest) {
  const auth = await authorizeWithLimit(req);
  if (!auth.ok) return NextResponse.json({ error: auth.error }, { status: auth.status });

  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return NextResponse.json({ error: 'KV unavailable' }, { status: 503 });
  }

  let body: PostBody = {};
  try { body = await req.json(); } catch { /* empty body is fine */ }

  // Mode 3: explicit manual grants
  if (Array.isArray(body.grants) && body.grants.length > 0) {
    const results = [];
    for (const g of body.grants) {
      const email = (g.email || '').toLowerCase().trim();
      const slug = (g.programSlug || '').trim();
      if (!email || !slug) {
        results.push({ email, programSlug: slug, error: 'missing email or programSlug' });
        continue;
      }
      const res = await applyFullAccess({
        email,
        programSlug: slug,
        source: 'manual-grant',
        amountCAD: typeof g.amountCAD === 'number' ? g.amountCAD : null,
      });
      if (res) {
        // Fire the welcome-to-full-access email. Non-blocking behaviour:
        // failure to send the email never invalidates the grant — we log
        // the reason so the admin UI can surface it if needed.
        const program = PROGRAMS_BY_SLUG[slug];
        let emailResult: { sent: boolean; reason?: string; error?: string } = { sent: false, reason: 'no-program' };
        if (program) {
          const nextModuleSlug = program.levels[0]?.modules[0]?.slug ?? null;
          const built = buildAccessGrantedEmail({
            email,
            program,
            unlockedLevels: res.after,
            nextModuleSlug,
          });
          const send = await sendAcademyEmail(built, email, { force: true });
          emailResult = { sent: send.sent, reason: send.reason, error: send.error };
        }
        results.push({ ...res, email: email, programSlug: slug, email_status: emailResult });
      } else {
        results.push({ email, programSlug: slug, error: 'no paid levels for program' });
      }
    }
    return NextResponse.json({ mode: 'manual-grants', results });
  }

  // Mode 2: reconcile from Stripe
  if (body.reconcileStripe) {
    const out = await reconcileFromStripe();
    return NextResponse.json({ mode: 'reconcile-stripe', ...out });
  }

  // Mode 1 (default): expand existing partial unlocks
  const { kv } = await import('@vercel/kv');
  const records = await loadAllStudents();
  const changes: Array<{ email: string; before: Record<string, number[]>; after: Record<string, number[]> }> = [];

  for (const { key, email, student } of records) {
    const report = buildReport(student, email);
    if (!report.changed) continue;

    const next: StudentShape = { ...student, unlockedLevels: report.proposed };
    await kv.set(key, next);
    changes.push({ email, before: report.current, after: report.proposed });
  }

  return NextResponse.json({
    mode: 'expand-partial',
    totalStudents: records.length,
    updated: changes.length,
    changes,
  });
}
