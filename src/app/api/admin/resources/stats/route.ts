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
import { authorize } from '@/lib/invoicing/auth';
import { toolkitCatalog } from '@/data/toolkits';
import { programCatalog } from '@/data/programs';

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

export interface ResourceStatsResponse {
  toolkits: ToolkitStatRow[];
  programs: ProgramStatRow[];
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
  };
  kvAvailable: boolean;
}

export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
  if (KV_AVAILABLE) {
    try {
      const paidKeys = await kv.keys('academy:paid:*');
      if (paidKeys.length > 0) {
        const values = (await kv.mget(...paidKeys)) as (PaidRecord | null)[];
        for (let i = 0; i < paidKeys.length; i += 1) {
          // Key: academy:paid:{slug}:level-{N}:{email}
          const rest = paidKeys[i].slice('academy:paid:'.length);
          const match = rest.match(/^([^:]+):level-\d+:(.+)$/);
          if (!match) continue;
          const slug = match[1];
          const email = match[2];
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
      priceCAD: p.priceCAD ?? 0,
      totalModules: p.totalModules ?? 0,
      students: paid.studentSet.size,
      paidLevels: paid.paidLevels,
      revenueCAD: Math.round(paid.revenueCAD),
      lastUnlockAt: paid.lastUnlockAt,
    };
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
    },
    kvAvailable: KV_AVAILABLE,
  };

  return NextResponse.json(payload);
}
