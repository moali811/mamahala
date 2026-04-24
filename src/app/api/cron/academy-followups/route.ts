/* ================================================================
   Cron: /api/cron/academy-followups
   ================================================================
   Daily sweep that picks the single most-relevant follow-up email
   for each academy student and sends it (once per category per
   program, idempotently). Categories, in priority order:

     1. completed      → hit 100%, cert email
     2. almost-there   → 80-99% complete, 3+ days dormant
     3. abandoned      → 21+ days dormant, not complete
     4. stuck          → 7+ days dormant, <80%, has started
     5. welcome-paid   → fullAccess unlocked, 0 modules, 24h+ post-payment
     6. level-1-done   → Level 1 complete, paid levels still locked

   Runs once a day. Each student gets at most ONE nudge per run to
   avoid feeling spammy. Admin/VIP emails are skipped. Opt-out and
   per-student send log are enforced inside sendAcademyEmail.

   Auth: Bearer CRON_SECRET (Vercel cron sets this automatically)
   or the admin password (for manual kicks).
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import type { AcademyProgram } from '@/types';
import { intentionalParentProgram } from '@/data/programs/intentional-parent';
import { resilientTeensProgram } from '@/data/programs/resilient-teens';
import { strongerTogetherProgram } from '@/data/programs/stronger-together';
import { innerCompassProgram } from '@/data/programs/inner-compass';
import { isAdminEmail } from '@/lib/admin';
import { isVipEmail } from '@/lib/vip-emails';
import {
  buildWelcomePaidEmail,
  buildStuckEmail,
  buildAlmostThereEmail,
  buildCompletedEmail,
  buildLevel1DoneEmail,
  buildAbandonedEmail,
  sendAcademyEmail,
  getSentLog,
  type AcademyEmailKind,
} from '@/lib/academy/emails';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const PROGRAMS: Record<string, AcademyProgram> = {
  [intentionalParentProgram.slug]: intentionalParentProgram,
  [resilientTeensProgram.slug]: resilientTeensProgram,
  [strongerTogetherProgram.slug]: strongerTogetherProgram,
  [innerCompassProgram.slug]: innerCompassProgram,
};

interface StudentKV {
  email?: string;
  name?: string;
  enrolledPrograms?: string[];
  enrolledAt?: string;
  lastActive?: string;
  unlockedLevels?: Record<string, number[]>;
  lastPayment?: {
    programSlug?: string;
    tier?: string;
    date?: string;
  };
}

interface ProgressKV {
  completedModules?: string[];
  currentModule?: string | null;
  lastActivity?: string;
  startedAt?: string;
}

type Candidate =
  | { kind: 'completed'; program: AcademyProgram; nextModuleSlug: string | null; certificateId: string | null; completedModules: number; totalModules: number }
  | { kind: 'almost-there'; program: AcademyProgram; nextModuleSlug: string | null; completedModules: number; totalModules: number }
  | { kind: 'abandoned'; program: AcademyProgram; nextModuleSlug: string | null; completedModules: number; totalModules: number }
  | { kind: 'stuck'; program: AcademyProgram; nextModuleSlug: string | null; completedModules: number; totalModules: number }
  | { kind: 'welcome-paid'; program: AcademyProgram; nextModuleSlug: string | null }
  | { kind: 'level-1-done'; program: AcademyProgram };

// Priority — lower index wins
const PRIORITY: AcademyEmailKind[] = [
  'completed',
  'almost-there',
  'abandoned',
  'stuck',
  'welcome-paid',
  'level-1-done',
];

function daysSince(iso?: string | null): number {
  if (!iso) return Infinity;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return Infinity;
  return (Date.now() - t) / (1000 * 60 * 60 * 24);
}

function paidLevels(program: AcademyProgram): number[] {
  if (program.isFree) return [];
  return program.levels.filter(l => !l.isFree).map(l => l.level);
}

function findNextModule(program: AcademyProgram, completedSet: Set<string>, unlockedLevels: number[]): string | null {
  for (const lvl of program.levels) {
    const accessible = lvl.isFree || program.isFree || unlockedLevels.includes(lvl.level);
    if (!accessible) continue;
    for (const m of lvl.modules) {
      if (!completedSet.has(m.slug)) return m.slug;
    }
  }
  return null;
}

function level1AllDone(program: AcademyProgram, completedSet: Set<string>): boolean {
  const lvl1 = program.levels.find(l => l.level === 1);
  if (!lvl1) return false;
  return lvl1.modules.every(m => completedSet.has(m.slug));
}

async function getCertificateId(kv: typeof import('@vercel/kv').kv, email: string, slug: string): Promise<string | null> {
  try {
    const rec = await kv.get(`academy:certificate:${email}:${slug}`) as { certId?: string } | null;
    return rec?.certId ?? null;
  } catch {
    return null;
  }
}

/** Compute the best follow-up candidate for (student, program), or null. */
function computeCandidate(
  program: AcademyProgram,
  student: StudentKV,
  progress: ProgressKV | null,
  unlockedLevels: number[],
  certificateId: string | null,
): Candidate | null {
  const completed = progress?.completedModules ?? [];
  const completedSet = new Set(completed);
  const total = program.totalModules ?? program.levels.flatMap(l => l.modules).length;
  const pct = total > 0 ? (completed.length / total) * 100 : 0;
  const dormantDays = daysSince(progress?.lastActivity ?? student.lastActive);
  const nextMod = findNextModule(program, completedSet, unlockedLevels);

  const fullyUnlocked = paidLevels(program).length > 0
    && paidLevels(program).every(n => unlockedLevels.includes(n));
  const daysSincePayment = daysSince(student.lastPayment?.date);

  // 1. completed
  if (completed.length > 0 && completed.length >= total && total > 0) {
    return {
      kind: 'completed',
      program,
      nextModuleSlug: null,
      certificateId,
      completedModules: completed.length,
      totalModules: total,
    };
  }

  // 2. almost-there
  if (pct >= 80 && pct < 100 && dormantDays >= 3) {
    return {
      kind: 'almost-there',
      program,
      nextModuleSlug: nextMod,
      completedModules: completed.length,
      totalModules: total,
    };
  }

  // 3. abandoned — 21 days, has any activity
  if (dormantDays >= 21 && dormantDays !== Infinity && completed.length > 0) {
    return {
      kind: 'abandoned',
      program,
      nextModuleSlug: nextMod,
      completedModules: completed.length,
      totalModules: total,
    };
  }

  // 4. stuck — started, dormant 7+ days, under 80%
  if (completed.length >= 1 && dormantDays >= 7 && pct < 80) {
    return {
      kind: 'stuck',
      program,
      nextModuleSlug: nextMod,
      completedModules: completed.length,
      totalModules: total,
    };
  }

  // 5. welcome-paid — paid fullAccess, nothing done yet, 24h+ since payment
  if (fullyUnlocked && completed.length === 0 && daysSincePayment >= 1) {
    return {
      kind: 'welcome-paid',
      program,
      nextModuleSlug: nextMod,
    };
  }

  // 6. level-1-done — finished free level, no paid levels unlocked yet
  if (!fullyUnlocked && paidLevels(program).length > 0 && level1AllDone(program, completedSet)) {
    return { kind: 'level-1-done', program };
  }

  return null;
}

function pickHighestPriority(candidates: Candidate[]): Candidate | null {
  if (candidates.length === 0) return null;
  const byKind = new Map<AcademyEmailKind, Candidate>();
  for (const c of candidates) byKind.set(c.kind, c);
  for (const kind of PRIORITY) {
    const hit = byKind.get(kind);
    if (hit) return hit;
  }
  return null;
}

async function processStudent(
  kv: typeof import('@vercel/kv').kv,
  email: string,
  student: StudentKV,
  dryRun: boolean,
): Promise<{ action: 'skipped' | 'sent' | 'would-send' | 'dedup'; kind?: AcademyEmailKind; programSlug?: string; reason?: string }> {
  if (isAdminEmail(email) || isVipEmail(email)) {
    return { action: 'skipped', reason: 'admin-or-vip' };
  }

  const slugs = new Set<string>([
    ...(student.enrolledPrograms ?? []),
    ...Object.keys(student.unlockedLevels ?? {}),
  ]);
  if (slugs.size === 0) return { action: 'skipped', reason: 'no-programs' };

  const log = await getSentLog(email);
  const candidates: Candidate[] = [];

  for (const slug of slugs) {
    const program = PROGRAMS[slug];
    if (!program) continue;
    const progress = (await kv.get(`academy:progress:${email}:${slug}`)) as ProgressKV | null;
    const unlocked = (student.unlockedLevels ?? {})[slug] ?? [];
    const certId = await getCertificateId(kv, email, slug);
    const candidate = computeCandidate(program, student, progress, unlocked, certId);
    if (!candidate) continue;

    // Dedup per (student, kind, program)
    const idempotencyKey = candidate.kind === 'stuck'
      ? `stuck:${program.slug}:${Math.round(((candidate as { completedModules: number }).completedModules / Math.max(1, (candidate as { totalModules: number }).totalModules)) * 100)}`
      : `${candidate.kind}:${program.slug}`;
    if (log[idempotencyKey]) continue;

    candidates.push(candidate);
  }

  const winner = pickHighestPriority(candidates);
  if (!winner) return { action: 'skipped', reason: 'no-candidate' };

  if (dryRun) {
    return { action: 'would-send', kind: winner.kind, programSlug: winner.program.slug };
  }

  const base = {
    email,
    name: student.name,
    program: winner.program,
  };

  let built;
  switch (winner.kind) {
    case 'completed':
      built = buildCompletedEmail({
        ...base,
        completedModules: winner.completedModules,
        totalModules: winner.totalModules,
        certificateId: winner.certificateId,
      });
      break;
    case 'almost-there':
      built = buildAlmostThereEmail({
        ...base,
        completedModules: winner.completedModules,
        totalModules: winner.totalModules,
        nextModuleSlug: winner.nextModuleSlug,
      });
      break;
    case 'abandoned':
      built = buildAbandonedEmail({
        ...base,
        completedModules: winner.completedModules,
        totalModules: winner.totalModules,
        nextModuleSlug: winner.nextModuleSlug,
      });
      break;
    case 'stuck':
      built = buildStuckEmail({
        ...base,
        completedModules: winner.completedModules,
        totalModules: winner.totalModules,
        nextModuleSlug: winner.nextModuleSlug,
      });
      break;
    case 'welcome-paid':
      built = buildWelcomePaidEmail({
        ...base,
        nextModuleSlug: winner.nextModuleSlug,
      });
      break;
    case 'level-1-done':
      built = buildLevel1DoneEmail(base);
      break;
  }

  const send = await sendAcademyEmail(built, email);
  if (!send.sent) {
    return { action: send.reason === 'duplicate' ? 'dedup' : 'skipped', kind: winner.kind, programSlug: winner.program.slug, reason: send.reason };
  }
  return { action: 'sent', kind: winner.kind, programSlug: winner.program.slug };
}

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization') || '';
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && auth === `Bearer ${cronSecret}`) return true;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword && auth === `Bearer ${adminPassword}`) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return NextResponse.json({ error: 'KV unavailable' }, { status: 503 });
  }

  const dryRun = req.nextUrl.searchParams.get('dryRun') === '1';

  const { kv } = await import('@vercel/kv');
  const studentKeys = await kv.keys('academy:student:*');
  const summary = {
    dryRun,
    totalStudents: studentKeys.length,
    sent: 0,
    dedup: 0,
    skipped: 0,
    wouldSend: 0,
    details: [] as Array<{ email: string; action: string; kind?: string; programSlug?: string; reason?: string }>,
  };

  for (const key of studentKeys) {
    const email = key.slice('academy:student:'.length);
    const student = (await kv.get(key)) as StudentKV | null;
    if (!student) continue;
    const result = await processStudent(kv, email, student, dryRun);
    summary.details.push({ email, ...result });
    if (result.action === 'sent') summary.sent += 1;
    else if (result.action === 'would-send') summary.wouldSend += 1;
    else if (result.action === 'dedup') summary.dedup += 1;
    else summary.skipped += 1;
  }

  return NextResponse.json(summary);
}
