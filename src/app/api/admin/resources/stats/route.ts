/* ================================================================
   GET /api/admin/resources/stats
   ================================================================
   Aggregated resources stats for the admin Resources module. Joins
   the real catalogs (src/data/toolkits, src/data/programs) with
   runtime data:

     - Free toolkit downloads  → from `stats:toolkits` analytics hash
     - Paid toolkit unlocks    → scan of `toolkit:paid:{slug}:{email}`
     - Academy level unlocks   → scan of `academy:paid:{programSlug}:level-{N}:{email}`
     - Revenue per toolkit / program in CAD

   This is the single source of truth the ResourcesModule renders
   against — no hardcoded slugs or program lists in the component.
   ================================================================ */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { authorizeWithLimit } from '@/lib/invoicing/auth';
import { toolkitCatalog } from '@/data/toolkits';
import { programCatalog } from '@/data/programs';
import { BUSINESS } from '@/config/business';
import { isAdminEmail } from '@/lib/admin';
import { isVipEmail } from '@/lib/vip-emails';
import { intentionalParentProgram } from '@/data/programs/intentional-parent';
import { resilientTeensProgram } from '@/data/programs/resilient-teens';
import { strongerTogetherProgram } from '@/data/programs/stronger-together';
import { innerCompassProgram } from '@/data/programs/inner-compass';
import type { AcademyProgram } from '@/types';

const PROGRAMS_FULL: Record<string, AcademyProgram> = {
  [intentionalParentProgram.slug]: intentionalParentProgram,
  [resilientTeensProgram.slug]: resilientTeensProgram,
  [strongerTogetherProgram.slug]: strongerTogetherProgram,
  [innerCompassProgram.slug]: innerCompassProgram,
};

function paidLevelsForSlug(slug: string): number[] {
  const p = PROGRAMS_FULL[slug];
  if (!p || p.isFree) return [];
  return p.levels.filter(l => !l.isFree).map(l => l.level);
}

interface StudentKVShape {
  email?: string;
  name?: string;
  enrolledPrograms?: string[];
  enrolledAt?: string;
  lastActive?: string;
  unlockedLevels?: Record<string, number[]>;
}

interface ProgressKVShape {
  completedModules?: string[];
  currentModule?: string | null;
  startedAt?: string;
  lastActivity?: string;
}

const KV_AVAILABLE = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

interface PaidRecord {
  paid?: boolean;
  paidAt?: string;
  amount?: number | null;
  currency?: string;
}

export interface ToolkitStatRow {
  slug: string;
  titleEn: string;
  titleAr: string;
  isPremium: boolean;
  priceCAD: number;
  freeDownloads: number;
  paidUnlocks: number;
  revenueCAD: number;
  lastUnlockAt: string | null;
}

export interface ProgramStatRow {
  slug: string;
  titleEn: string;
  titleAr: string;
  categoryLabel: string;
  priceCAD: number;
  totalModules: number;
  students: number;           // distinct student emails with ≥1 paid level
  paidLevels: number;         // total level-unlock events across all students
  revenueCAD: number;
  lastUnlockAt: string | null;
}

/** Per-program status for a single student (roster detail). */
export interface StudentProgramStatus {
  programSlug: string;
  programTitleEn: string;
  enrolled: boolean;
  unlockedLevels: number[];
  fullyUnlocked: boolean;     // every paid level unlocked (i.e. fullAccess)
  completedModules: number;
  totalModules: number;
  progressPercent: number;    // completedModules / totalModules
  currentModule: string | null;
  lastActivity: string | null;
  revenueCAD: number;         // paid amount attributed to this student × program
}

export interface StudentRosterRow {
  email: string;
  name: string;
  enrolledAt: string | null;
  lastActive: string | null;
  isAdmin: boolean;
  isVip: boolean;
  totalCompletedModules: number;
  totalPaidLevels: number;
  totalRevenueCAD: number;
  programs: StudentProgramStatus[];
  emailLog: Record<string, string>;    // idempotency key → ISO timestamp
  optedOut: boolean;
}

export interface ResourceStatsResponse {
  toolkits: ToolkitStatRow[];
  programs: ProgramStatRow[];
  students: StudentRosterRow[];
  totals: {
    toolkitCount: number;
    toolkitDownloads: number;
    toolkitPaidUnlocks: number;
    toolkitRevenueCAD: number;
    programCount: number;
    programStudents: number;     // distinct student emails across all programs
    programPaidLevels: number;
    programRevenueCAD: number;
    totalResourceRevenueCAD: number;
    rosterSize: number;          // total students in KV (enrolled or paid, any program)
  };
  kvAvailable: boolean;
}

export async function GET(request: NextRequest) {
  const _auth = await authorizeWithLimit(request);
  if (!_auth.ok) {
    return NextResponse.json({ error: _auth.error }, { status: _auth.status });
  }

  // ─── Free-download hash (analytics) ───
  const freeDownloads: Record<string, number> = {};
  if (KV_AVAILABLE) {
    try {
      const hash = (await kv.hgetall('stats:toolkits')) as Record<string, unknown> | null;
      if (hash) {
        for (const [k, v] of Object.entries(hash)) {
          const n = typeof v === 'number' ? v : parseInt(String(v), 10);
          freeDownloads[k] = Number.isFinite(n) ? n : 0;
        }
      }
    } catch {
      /* continue with empty map */
    }
  }

  // ─── Paid toolkit unlocks ───
  // Scan every key matching `toolkit:paid:*`, group by slug, sum amount.
  const toolkitPaid: Record<string, { count: number; revenueCAD: number; lastUnlockAt: string | null }> = {};
  if (KV_AVAILABLE) {
    try {
      const keys = await kv.keys('toolkit:paid:*');
      if (keys.length > 0) {
        // Parse slug from the key: `toolkit:paid:{slug}:{email}`
        // Then fetch the value to sum revenue.
        const values = (await kv.mget(...keys)) as (PaidRecord | null)[];
        for (let i = 0; i < keys.length; i += 1) {
          const rest = keys[i].slice('toolkit:paid:'.length);
          const firstColon = rest.indexOf(':');
          const slug = firstColon === -1 ? rest : rest.slice(0, firstColon);
          if (!slug) continue;
          const record = values[i];
          const bucket = toolkitPaid[slug] ?? { count: 0, revenueCAD: 0, lastUnlockAt: null };
          bucket.count += 1;
          if (record?.amount && (record.currency?.toLowerCase() === 'cad' || !record.currency)) {
            bucket.revenueCAD += record.amount;
          }
          if (record?.paidAt && (!bucket.lastUnlockAt || record.paidAt > bucket.lastUnlockAt)) {
            bucket.lastUnlockAt = record.paidAt;
          }
          toolkitPaid[slug] = bucket;
        }
      }
    } catch {
      /* continue */
    }
  }

  // ─── Academy program unlocks ───
  // Source-of-truth is `academy:paid:{slug}:level-{N}:{email}` per level,
  // but we also read `academy:student:{email}` to count distinct students
  // per program (since multiple levels = multiple keys for one student).
  const programPaid: Record<string, {
    paidLevels: number;
    studentSet: Set<string>;
    revenueCAD: number;
    lastUnlockAt: string | null;
  }> = {};
  // Per-student × level amount, keyed as `{slug}:{level}:{email}`. Populated
  // during the same sweep so the roster can compute each student's revenue
  // in O(1) without re-scanning KV.
  const studentPaidAmount: Record<string, number> = {};
  if (KV_AVAILABLE) {
    try {
      const paidKeys = await kv.keys('academy:paid:*');
      if (paidKeys.length > 0) {
        const values = (await kv.mget(...paidKeys)) as (PaidRecord | null)[];
        for (let i = 0; i < paidKeys.length; i += 1) {
          // Key: academy:paid:{slug}:level-{N}:{email}
          const rest = paidKeys[i].slice('academy:paid:'.length);
          const match = rest.match(/^([^:]+):level-(\d+):(.+)$/);
          if (!match) continue;
          const slug = match[1];
          const level = Number(match[2]);
          const email = match[3];
          const record = values[i];
          const bucket = programPaid[slug] ?? {
            paidLevels: 0,
            studentSet: new Set<string>(),
            revenueCAD: 0,
            lastUnlockAt: null,
          };
          bucket.paidLevels += 1;
          bucket.studentSet.add(email);
          if (record?.amount && (record.currency?.toLowerCase() === 'cad' || !record.currency)) {
            bucket.revenueCAD += record.amount;
            studentPaidAmount[`${slug}:${level}:${email}`] = record.amount;
          }
          if (record?.paidAt && (!bucket.lastUnlockAt || record.paidAt > bucket.lastUnlockAt)) {
            bucket.lastUnlockAt = record.paidAt;
          }
          programPaid[slug] = bucket;
        }
      }
    } catch {
      /* continue */
    }
  }

  // ─── Build toolkit rows (drive from the real catalog) ───
  const toolkits: ToolkitStatRow[] = toolkitCatalog.map(tk => {
    const paid = toolkitPaid[tk.slug] ?? { count: 0, revenueCAD: 0, lastUnlockAt: null };
    return {
      slug: tk.slug,
      titleEn: tk.titleEn,
      titleAr: tk.titleAr,
      isPremium: !!tk.isPremium,
      priceCAD: tk.priceCAD ?? 0,
      freeDownloads: freeDownloads[tk.slug] ?? 0,
      paidUnlocks: paid.count,
      revenueCAD: Math.round(paid.revenueCAD),
      lastUnlockAt: paid.lastUnlockAt,
    };
  });

  // Include any orphan slugs that have downloads but aren't in the catalog
  // (e.g. legacy toolkit that was removed but its slug still lives in the
  // analytics hash). These are surfaced as a separate group so Mo can see
  // them and decide whether to clear the counters.
  const orphanToolkits: ToolkitStatRow[] = [];
  const knownSlugs = new Set(toolkitCatalog.map(t => t.slug));
  for (const [slug, downloads] of Object.entries(freeDownloads)) {
    if (knownSlugs.has(slug)) continue;
    const paid = toolkitPaid[slug] ?? { count: 0, revenueCAD: 0, lastUnlockAt: null };
    orphanToolkits.push({
      slug,
      titleEn: `${slug} (legacy)`,
      titleAr: slug,
      isPremium: false,
      priceCAD: 0,
      freeDownloads: downloads,
      paidUnlocks: paid.count,
      revenueCAD: Math.round(paid.revenueCAD),
      lastUnlockAt: paid.lastUnlockAt,
    });
  }
  // Also catch orphan paid-only slugs with no free downloads
  for (const [slug, paid] of Object.entries(toolkitPaid)) {
    if (knownSlugs.has(slug) || freeDownloads[slug] !== undefined) continue;
    orphanToolkits.push({
      slug,
      titleEn: `${slug} (legacy)`,
      titleAr: slug,
      isPremium: false,
      priceCAD: 0,
      freeDownloads: 0,
      paidUnlocks: paid.count,
      revenueCAD: Math.round(paid.revenueCAD),
      lastUnlockAt: paid.lastUnlockAt,
    });
  }

  // ─── Build program rows ───
  // Price comes from BUSINESS config (single source of truth) — the catalog
  // still holds a priceCAD but we prefer the live value.
  const academyFullAccessPrice = BUSINESS.academyFullAccessPrice;
  const programs: ProgramStatRow[] = programCatalog.map(p => {
    const paid = programPaid[p.slug] ?? {
      paidLevels: 0,
      studentSet: new Set<string>(),
      revenueCAD: 0,
      lastUnlockAt: null,
    };
    return {
      slug: p.slug,
      titleEn: p.titleEn,
      titleAr: p.titleAr,
      categoryLabel: p.categoryLabel,
      priceCAD: p.isFree ? 0 : academyFullAccessPrice,
      totalModules: p.totalModules ?? 0,
      students: paid.studentSet.size,
      paidLevels: paid.paidLevels,
      revenueCAD: Math.round(paid.revenueCAD),
      lastUnlockAt: paid.lastUnlockAt,
    };
  });

  // ─── Build student roster ───
  // Reads `academy:student:{email}` for the identity + enrollment record, and
  // `academy:progress:{email}:{slug}` for completion counts / last activity.
  const students: StudentRosterRow[] = [];
  if (KV_AVAILABLE) {
    try {
      const studentKeys = await kv.keys('academy:student:*');
      if (studentKeys.length > 0) {
        const studentVals = (await kv.mget(...studentKeys)) as (StudentKVShape | null)[];
        for (let i = 0; i < studentKeys.length; i += 1) {
          const key = studentKeys[i];
          const email = key.slice('academy:student:'.length);
          const s = studentVals[i];
          if (!s) continue;

          const enrolledPrograms = Array.isArray(s.enrolledPrograms) ? s.enrolledPrograms : [];
          const unlocked = s.unlockedLevels ?? {};
          // Gather every program this student touches (enrolled OR paid).
          const slugSet = new Set<string>([...enrolledPrograms, ...Object.keys(unlocked)]);

          // Fetch progress for each program in parallel.
          const progressEntries = await Promise.all(
            Array.from(slugSet).map(async (slug): Promise<[string, ProgressKVShape | null]> => {
              const p = (await kv.get(`academy:progress:${email}:${slug}`)) as ProgressKVShape | null;
              return [slug, p];
            }),
          );
          const progressBySlug: Record<string, ProgressKVShape | null> = Object.fromEntries(progressEntries);

          const programRows: StudentProgramStatus[] = Array.from(slugSet).map(slug => {
            const p = PROGRAMS_FULL[slug];
            const unlockedLevels = Array.isArray(unlocked[slug]) ? [...unlocked[slug]].sort((a, b) => a - b) : [];
            const paidLevels = paidLevelsForSlug(slug);
            const fullyUnlocked = paidLevels.length > 0 && paidLevels.every(n => unlockedLevels.includes(n));
            const totalModules = p?.totalModules ?? 0;
            const prog = progressBySlug[slug];
            const completed = Array.isArray(prog?.completedModules) ? prog!.completedModules.length : 0;

            // Revenue attributed to this student × program: sum of `amount`
            // on this student's paid-level markers (only the primary level
            // carries a non-null amount; others are $0 by design so a single
            // fullAccess payment isn't double-counted).
            let revenueCAD = 0;
            for (const n of unlockedLevels) {
              const r = studentPaidAmount[`${slug}:${n}:${email}`];
              if (typeof r === 'number') revenueCAD += r;
            }

            return {
              programSlug: slug,
              programTitleEn: p?.titleEn ?? slug,
              enrolled: enrolledPrograms.includes(slug),
              unlockedLevels,
              fullyUnlocked,
              completedModules: completed,
              totalModules,
              progressPercent: totalModules > 0 ? Math.round((completed / totalModules) * 100) : 0,
              currentModule: prog?.currentModule ?? null,
              lastActivity: prog?.lastActivity ?? null,
              revenueCAD: Math.round(revenueCAD),
            };
          });

          const totalCompleted = programRows.reduce((sum, r) => sum + r.completedModules, 0);
          const totalPaid = programRows.reduce((sum, r) => sum + r.unlockedLevels.length, 0);
          const totalRev = programRows.reduce((sum, r) => sum + r.revenueCAD, 0);
          const lastActive = programRows
            .map(r => r.lastActivity)
            .filter(Boolean)
            .sort()
            .pop() ?? s.lastActive ?? null;

          // Email history + opt-out status for this student
          const [emailLog, optOut] = await Promise.all([
            kv.get(`academy:email-log:${email}`) as Promise<Record<string, string> | null>,
            kv.get(`academy:email-opt-out:${email}`) as Promise<unknown>,
          ]);

          students.push({
            email,
            name: s.name ?? '',
            enrolledAt: s.enrolledAt ?? null,
            lastActive,
            isAdmin: isAdminEmail(email),
            isVip: isVipEmail(email),
            totalCompletedModules: totalCompleted,
            totalPaidLevels: totalPaid,
            totalRevenueCAD: totalRev,
            programs: programRows.sort((a, b) => {
              // Paid/enrolled first, then by progress, then by title
              const aScore = (a.fullyUnlocked ? 2 : 0) + (a.enrolled ? 1 : 0);
              const bScore = (b.fullyUnlocked ? 2 : 0) + (b.enrolled ? 1 : 0);
              if (aScore !== bScore) return bScore - aScore;
              return b.progressPercent - a.progressPercent;
            }),
            emailLog: emailLog ?? {},
            optedOut: !!optOut,
          });
        }
      }
    } catch {
      /* continue with empty roster */
    }
  }

  // Sort roster: revenue DESC, then total progress DESC, then last active DESC,
  // then email alphabetically. Admin/VIP pinned at top for quick access.
  students.sort((a, b) => {
    if (a.isAdmin !== b.isAdmin) return a.isAdmin ? -1 : 1;
    if (a.isVip !== b.isVip) return a.isVip ? -1 : 1;
    if (a.totalRevenueCAD !== b.totalRevenueCAD) return b.totalRevenueCAD - a.totalRevenueCAD;
    if (a.totalCompletedModules !== b.totalCompletedModules) return b.totalCompletedModules - a.totalCompletedModules;
    const la = a.lastActive ?? '';
    const lb = b.lastActive ?? '';
    if (la !== lb) return lb.localeCompare(la);
    return a.email.localeCompare(b.email);
  });

  const allToolkits = [...toolkits, ...orphanToolkits];
  const toolkitDownloads = allToolkits.reduce((s, t) => s + t.freeDownloads, 0);
  const toolkitPaidUnlocks = allToolkits.reduce((s, t) => s + t.paidUnlocks, 0);
  const toolkitRevenueCAD = allToolkits.reduce((s, t) => s + t.revenueCAD, 0);

  const programStudentsSet = new Set<string>();
  for (const buckets of Object.values(programPaid)) {
    for (const email of buckets.studentSet) programStudentsSet.add(email);
  }
  const programPaidLevels = programs.reduce((s, p) => s + p.paidLevels, 0);
  const programRevenueCAD = programs.reduce((s, p) => s + p.revenueCAD, 0);

  const payload: ResourceStatsResponse = {
    toolkits: [...allToolkits].sort((a, b) =>
      (b.freeDownloads + b.paidUnlocks) - (a.freeDownloads + a.paidUnlocks),
    ),
    programs: [...programs].sort((a, b) => b.students - a.students || b.paidLevels - a.paidLevels),
    students,
    totals: {
      toolkitCount: toolkitCatalog.length,
      toolkitDownloads,
      toolkitPaidUnlocks,
      toolkitRevenueCAD,
      programCount: programCatalog.length,
      programStudents: programStudentsSet.size,
      programPaidLevels,
      programRevenueCAD,
      totalResourceRevenueCAD: toolkitRevenueCAD + programRevenueCAD,
      rosterSize: students.length,
    },
    kvAvailable: KV_AVAILABLE,
  };

  return NextResponse.json(payload);
}
