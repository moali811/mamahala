'use client';

/* ================================================================
   ResourcesModule — Admin toolkits + academy programs overview
   ================================================================
   Renders real-time stats joined from:
     - Real toolkit catalog in src/data/toolkits
     - Real program catalog in src/data/programs
     - KV-backed runtime counts (free downloads, paid unlocks,
       per-program students + revenue)

   All aggregation lives server-side at /api/admin/resources/stats.
   This component is now a pure view over the fresh payload — no
   hardcoded slug lists, no fake program counts.

   Premium toolkits unlocked via Stripe are shown alongside free
   downloads so Mo sees the true engagement + revenue picture. Any
   slug that has usage but isn't in the catalog (legacy / removed)
   surfaces in a separate "Legacy" group.
   ================================================================ */

import { useEffect, useState, useMemo } from 'react';
import {
  BookOpen, Sparkles, TrendingUp, Download, Lock, DollarSign,
  Users, Loader2, AlertTriangle, RefreshCw,
} from 'lucide-react';

interface ToolkitStatRow {
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

interface ProgramStatRow {
  slug: string;
  titleEn: string;
  titleAr: string;
  categoryLabel: string;
  priceCAD: number;
  totalModules: number;
  students: number;
  paidLevels: number;
  revenueCAD: number;
  lastUnlockAt: string | null;
}

interface StatsResponse {
  toolkits: ToolkitStatRow[];
  programs: ProgramStatRow[];
  totals: {
    toolkitCount: number;
    toolkitDownloads: number;
    toolkitPaidUnlocks: number;
    toolkitRevenueCAD: number;
    programCount: number;
    programStudents: number;
    programPaidLevels: number;
    programRevenueCAD: number;
    totalResourceRevenueCAD: number;
  };
  kvAvailable: boolean;
}

interface Props {
  password: string;
}

function fmtCAD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'CAD', maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(iso: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 30) return `${diffDays}d ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

export default function ResourcesModule({ password }: Props) {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStats = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/resources/stats', {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as StatsResponse;
      setStats(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password]);

  // Split real vs legacy/orphan toolkits for display
  const { realToolkits, legacyToolkits } = useMemo(() => {
    if (!stats) return { realToolkits: [], legacyToolkits: [] as ToolkitStatRow[] };
    const real: ToolkitStatRow[] = [];
    const legacy: ToolkitStatRow[] = [];
    for (const t of stats.toolkits) {
      if (t.titleEn.endsWith('(legacy)')) legacy.push(t);
      else real.push(t);
    }
    return { realToolkits: real, legacyToolkits: legacy };
  }, [stats]);

  const maxCount = useMemo(() => {
    if (!stats) return 1;
    return Math.max(
      1,
      ...stats.toolkits.map(t => t.freeDownloads + t.paidUnlocks),
    );
  }, [stats]);

  if (loading && !stats) {
    return (
      <div className="bg-white rounded-2xl border border-[#F3EFE8] p-10 text-center">
        <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin mx-auto" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-red-200 p-6 text-center">
        <AlertTriangle className="w-5 h-5 text-red-600 mx-auto mb-2" />
        <p className="text-sm text-red-700 mb-3">{error}</p>
        <button
          onClick={loadStats}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#7A3B5E] text-white text-xs font-semibold hover:bg-[#6A2E4E]"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Retry
        </button>
      </div>
    );
  }

  if (!stats) return null;
  const t = stats.totals;

  return (
    <div className="space-y-4">
      {/* Summary tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatTile
          label="Toolkits"
          value={String(t.toolkitCount)}
          subtitle={`${t.toolkitDownloads} free · ${t.toolkitPaidUnlocks} paid`}
          icon={<Download className="w-4 h-4" />}
          accent="#7A3B5E"
        />
        <StatTile
          label="Toolkit Revenue"
          value={fmtCAD(t.toolkitRevenueCAD)}
          subtitle={t.toolkitPaidUnlocks === 0 ? 'No unlocks yet' : `${t.toolkitPaidUnlocks} unlocks`}
          icon={<DollarSign className="w-4 h-4" />}
          accent="#3B8A6E"
        />
        <StatTile
          label="Programs"
          value={String(t.programCount)}
          subtitle={`${t.programStudents} ${t.programStudents === 1 ? 'student' : 'students'} · ${t.programPaidLevels} paid levels`}
          icon={<BookOpen className="w-4 h-4" />}
          accent="#C8A97D"
        />
        <StatTile
          label="Academy Revenue"
          value={fmtCAD(t.programRevenueCAD)}
          subtitle={`Total resources: ${fmtCAD(t.totalResourceRevenueCAD)}`}
          icon={<Sparkles className="w-4 h-4" />}
          accent="#C4878A"
        />
      </div>

      {/* KV-unavailable banner (dev / misconfigured) */}
      {!stats.kvAvailable && (
        <div className="px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          KV store is not configured in this environment — numbers shown are zero by default.
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Toolkit Engagement */}
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-[#2D2A33] flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
              <TrendingUp className="w-4 h-4 text-[#7A3B5E]" />
              Toolkit Engagement
            </h3>
            <button
              onClick={loadStats}
              className="p-1.5 rounded-lg text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2]"
              title="Refresh"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>

          {realToolkits.length === 0 ? (
            <p className="text-xs text-[#8E8E9F] text-center py-6">No toolkits in catalog.</p>
          ) : (
            <div className="space-y-3">
              {realToolkits.map((tk, i) => (
                <ToolkitRow key={tk.slug} row={tk} rank={i + 1} maxCount={maxCount} />
              ))}
            </div>
          )}

          {legacyToolkits.length > 0 && (
            <div className="mt-4 pt-4 border-t border-[#F3EFE8]">
              <p className="text-[10px] uppercase tracking-widest font-semibold text-amber-700 mb-2 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Legacy slugs with stray counters
              </p>
              <div className="space-y-1.5">
                {legacyToolkits.map(tk => (
                  <div key={tk.slug} className="flex items-center justify-between text-[11px] text-[#8E8E9F]">
                    <span className="font-mono truncate">{tk.slug}</span>
                    <span>{tk.freeDownloads + tk.paidUnlocks} events</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Academy Programs */}
        <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5">
          <h3 className="text-sm font-semibold text-[#2D2A33] mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <BookOpen className="w-4 h-4 text-[#C8A97D]" />
            Academy Programs
          </h3>
          {stats.programs.length === 0 ? (
            <p className="text-xs text-[#8E8E9F] text-center py-6">No programs in catalog.</p>
          ) : (
            <div className="space-y-2.5">
              {stats.programs.map(p => (
                <ProgramRow key={p.slug} row={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Subcomponents ─────────────────────────────────────────────

function StatTile({
  label, value, subtitle, icon, accent,
}: {
  label: string; value: string; subtitle: string; icon: React.ReactNode; accent: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#F3EFE8] p-4">
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color: accent }}>{icon}</span>
        <p className="text-[10px] uppercase tracking-wider text-[#8E8E9F] font-semibold">{label}</p>
      </div>
      <p className="text-xl sm:text-2xl font-bold text-[#2D2A33] tabular-nums leading-tight" style={{ color: accent }}>{value}</p>
      <p className="text-[11px] text-[#8E8E9F] mt-1 truncate">{subtitle}</p>
    </div>
  );
}

function ToolkitRow({ row, rank, maxCount }: { row: ToolkitStatRow; rank: number; maxCount: number }) {
  const total = row.freeDownloads + row.paidUnlocks;
  const freePct = maxCount > 0 ? (row.freeDownloads / maxCount) * 100 : 0;
  const paidPct = maxCount > 0 ? (row.paidUnlocks / maxCount) * 100 : 0;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[10px] font-bold text-[#7A3B5E] tabular-nums w-5 shrink-0">#{rank}</span>
          <span className="text-xs font-medium text-[#2D2A33] truncate">{row.titleEn}</span>
          {row.isPremium && (
            <span className="shrink-0 px-1.5 py-0.5 rounded bg-[#C8A97D]/15 text-[#7A3B5E] text-[9px] font-bold uppercase tracking-wide">
              ${row.priceCAD}
            </span>
          )}
        </div>
        <div className="shrink-0 text-right">
          <span className="text-xs font-bold text-[#7A3B5E] tabular-nums">{total}</span>
          {row.paidUnlocks > 0 && (
            <span className="ml-1.5 text-[10px] text-[#3B8A6E]">({fmtCAD(row.revenueCAD)})</span>
          )}
        </div>
      </div>
      <div className="h-2 bg-[#F3EFE8] rounded-full overflow-hidden flex">
        {row.freeDownloads > 0 && (
          <div
            className="h-full bg-[#C8A97D]"
            style={{ width: `${freePct}%` }}
            title={`${row.freeDownloads} free downloads`}
          />
        )}
        {row.paidUnlocks > 0 && (
          <div
            className="h-full bg-[#3B8A6E]"
            style={{ width: `${paidPct}%` }}
            title={`${row.paidUnlocks} paid unlocks`}
          />
        )}
      </div>
      <div className="flex items-center gap-3 mt-1 text-[10px] text-[#8E8E9F]">
        {row.freeDownloads > 0 && (
          <span className="inline-flex items-center gap-0.5">
            <Download className="w-2.5 h-2.5" /> {row.freeDownloads}
          </span>
        )}
        {row.paidUnlocks > 0 && (
          <span className="inline-flex items-center gap-0.5 text-[#3B8A6E]">
            <Lock className="w-2.5 h-2.5" /> {row.paidUnlocks} unlocked
          </span>
        )}
        {row.lastUnlockAt && (
          <span>last {fmtDate(row.lastUnlockAt)}</span>
        )}
        {total === 0 && <span className="italic text-[#B8B3AD]">No activity yet</span>}
      </div>
    </div>
  );
}

function ProgramRow({ row }: { row: ProgramStatRow }) {
  return (
    <div className="flex items-center justify-between gap-3 px-3 py-3 rounded-xl border border-[#F3EFE8] hover:bg-[#FAF7F2]/60 transition-colors">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <div className="w-9 h-9 rounded-xl bg-[#C8A97D]/10 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 text-[#C8A97D]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[#2D2A33] truncate">{row.titleEn}</p>
          <p className="text-[10px] text-[#8E8E9F] truncate">
            {row.categoryLabel} · {row.totalModules} modules · ${row.priceCAD} CAD
          </p>
        </div>
      </div>
      <div className="shrink-0 text-right">
        {row.students > 0 ? (
          <>
            <p className="text-xs font-bold text-[#7A3B5E] tabular-nums inline-flex items-center gap-1">
              <Users className="w-3 h-3" /> {row.students}
            </p>
            <p className="text-[10px] text-[#3B8A6E] tabular-nums">{fmtCAD(row.revenueCAD)}</p>
          </>
        ) : (
          <p className="text-[10px] text-[#B8B3AD] italic">No enrollments</p>
        )}
      </div>
    </div>
  );
}
