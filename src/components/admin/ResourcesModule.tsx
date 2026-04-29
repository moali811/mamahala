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
  Users, Loader2, AlertTriangle, RefreshCw, Mail, Copy, Check,
  Shield, Star, ChevronDown, ChevronRight, Unlock, Search, Gift,
} from 'lucide-react';
import GrantAccessModal from './GrantAccessModal';

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

interface StudentProgramStatus {
  programSlug: string;
  programTitleEn: string;
  enrolled: boolean;
  unlockedLevels: number[];
  fullyUnlocked: boolean;
  completedModules: number;
  totalModules: number;
  progressPercent: number;
  currentModule: string | null;
  lastActivity: string | null;
  revenueCAD: number;
}

interface StudentRosterRow {
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
  emailLog: Record<string, string>;
  optedOut: boolean;
}

interface StatsResponse {
  toolkits: ToolkitStatRow[];
  programs: ProgramStatRow[];
  students: StudentRosterRow[];
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
    rosterSize: number;
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

const EMAIL_KIND_LABEL: Record<string, string> = {
  'access-granted': 'Welcome (access granted)',
  'welcome-paid': 'Welcome nudge (paid, not started)',
  'stuck': 'Gentle nudge (stuck)',
  'almost-there': 'Almost there',
  'completed': 'Congratulations (completed)',
  'level-1-done': 'Level 1 done (upsell)',
  'abandoned': 'We miss you',
};

function formatEmailKey(key: string): string {
  // key format: "kind:programSlug" or "stuck:slug:pct"
  const [kind, slug] = key.split(':');
  const label = EMAIL_KIND_LABEL[kind] ?? kind;
  return slug ? `${label} · ${slug}` : label;
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
  const [grantOpen, setGrantOpen] = useState(false);

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
      {/* Action bar — admin grants live here */}
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>
            Resources
          </h2>
          <p className="text-[11px] text-[#8E8E9F] mt-0.5">
            Toolkits, programs, and direct unlocks for known clients.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setGrantOpen(true)}
          data-cta="open-grant-access"
          className="shrink-0 inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#7A3B5E] text-white text-[12px] sm:text-[13px] font-semibold hover:bg-[#6A2E4E] active:scale-[0.97] transition-all shadow-sm"
        >
          <Gift className="w-3.5 h-3.5" />
          Grant Access
        </button>
      </div>

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

      {/* Academy Students — the actionable roster */}
      <StudentsSection
        students={stats.students}
        programs={stats.programs}
        password={password}
        onReload={loadStats}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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

      <GrantAccessModal
        open={grantOpen}
        password={password}
        onClose={() => setGrantOpen(false)}
        onGranted={loadStats}
      />
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
            {row.categoryLabel} · {row.totalModules} modules
            {row.priceCAD > 0 && <> · Full access ${row.priceCAD} CAD</>}
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

// ─── Students section ─────────────────────────────────────────────

function StudentsSection({
  students,
  programs,
  password,
  onReload,
}: {
  students: StudentRosterRow[];
  programs: ProgramStatRow[];
  password: string;
  onReload: () => void;
}) {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [grantingKey, setGrantingKey] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return students;
    return students.filter(s =>
      s.email.toLowerCase().includes(q)
      || (s.name && s.name.toLowerCase().includes(q)),
    );
  }, [students, search]);

  const totalRevenue = useMemo(
    () => students.reduce((s, r) => s + r.totalRevenueCAD, 0),
    [students],
  );

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 1500);
    } catch { /* clipboard blocked */ }
  };

  const grantFullAccess = async (email: string, programSlug: string) => {
    const key = `${email}:${programSlug}`;
    if (grantingKey) return;
    if (!confirm(`Grant full access to ${programSlug} for ${email}? This is free — no Stripe charge.`)) return;
    setGrantingKey(key);
    try {
      const res = await fetch('/api/admin/academy/backfill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify({ grants: [{ email, programSlug }] }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onReload();
    } catch (e) {
      alert(`Failed to grant access: ${e instanceof Error ? e.message : 'unknown error'}`);
    } finally {
      setGrantingKey(null);
    }
  };

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 text-center">
        <Users className="w-5 h-5 text-[#8E8E9F] mx-auto mb-2" />
        <p className="text-xs text-[#8E8E9F]">No academy students yet. Enrollments and payments will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-[#F3EFE8] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <Users className="w-4 h-4 text-[#7A3B5E] shrink-0" />
          <h3 className="text-sm font-semibold text-[#2D2A33]" style={{ fontFamily: 'Georgia, serif' }}>
            Academy Students
          </h3>
          <span className="text-[10px] text-[#8E8E9F] tabular-nums">
            · {students.length} total · {fmtCAD(totalRevenue)}
          </span>
        </div>
        <div className="relative shrink-0">
          <Search className="w-3.5 h-3.5 text-[#8E8E9F] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email"
            className="w-full sm:w-56 pl-8 pr-3 py-1.5 rounded-lg border border-[#F3EFE8] text-xs focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-xs text-[#8E8E9F] text-center py-6">No students match &ldquo;{search}&rdquo;.</p>
      ) : (
        <div className="space-y-1.5">
          {filtered.map(s => {
            const isOpen = expanded === s.email;
            return (
              <div key={s.email} className="rounded-xl border border-[#F3EFE8] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpanded(isOpen ? null : s.email)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-[#FAF7F2]/60 transition-colors"
                >
                  <span className="w-5 text-[#8E8E9F]">
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-semibold text-[#2D2A33] truncate">
                        {s.name || s.email.split('@')[0]}
                      </span>
                      {s.isAdmin && <Shield className="w-3 h-3 text-[#7A3B5E]" aria-label="Admin" />}
                      {s.isVip && <Star className="w-3 h-3 text-[#C8A97D]" aria-label="VIP" />}
                    </div>
                    <p className="text-[10px] text-[#8E8E9F] truncate">{s.email}</p>
                  </div>
                  <div className="shrink-0 text-right hidden sm:block">
                    <p className="text-[10px] text-[#8E8E9F]">last {fmtDate(s.lastActive)}</p>
                    <p className="text-[10px] text-[#3B8A6E] tabular-nums">
                      {s.totalCompletedModules} modules · {fmtCAD(s.totalRevenueCAD)}
                    </p>
                  </div>
                </button>

                {isOpen && (
                  <div className="px-3 pb-3 pt-1 border-t border-[#F3EFE8] bg-[#FAF7F2]/40">
                    <div className="flex items-center gap-1.5 mb-2.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => copyEmail(s.email)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold text-[#4A4A5C] border border-[#F3EFE8] hover:bg-white"
                      >
                        {copiedEmail === s.email
                          ? <><Check className="w-3 h-3 text-[#3B8A6E]" /> Copied</>
                          : <><Copy className="w-3 h-3" /> Copy email</>}
                      </button>
                      <a
                        href={`mailto:${s.email}`}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold text-[#4A4A5C] border border-[#F3EFE8] hover:bg-white"
                      >
                        <Mail className="w-3 h-3" /> Email
                      </a>
                    </div>

                    {/* Per-program rows (enrolled OR paid) */}
                    <div className="space-y-1.5">
                      {s.programs.length === 0 && (
                        <p className="text-[10px] text-[#8E8E9F] italic">Enrolled but no program activity yet.</p>
                      )}
                      {s.programs.map(p => {
                        const needsGrant = !p.fullyUnlocked;
                        const grantKey = `${s.email}:${p.programSlug}`;
                        const isGranting = grantingKey === grantKey;
                        return (
                          <div key={p.programSlug} className="bg-white rounded-lg border border-[#F3EFE8] px-3 py-2">
                            <div className="flex items-center justify-between gap-3 mb-1.5">
                              <div className="min-w-0 flex-1">
                                <p className="text-xs font-semibold text-[#2D2A33] truncate">{p.programTitleEn}</p>
                                <p className="text-[10px] text-[#8E8E9F]">
                                  {p.enrolled ? 'Enrolled' : 'Not enrolled'}
                                  {' · '}
                                  {p.unlockedLevels.length === 0
                                    ? 'Level 1 free only'
                                    : `Levels unlocked: ${p.unlockedLevels.join(', ')}`}
                                  {p.fullyUnlocked && <span className="text-[#3B8A6E] font-semibold"> · Full access</span>}
                                  {p.revenueCAD > 0 && <> · paid {fmtCAD(p.revenueCAD)}</>}
                                </p>
                              </div>
                              {needsGrant && (
                                <button
                                  type="button"
                                  onClick={() => grantFullAccess(s.email, p.programSlug)}
                                  disabled={isGranting}
                                  className="shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold text-white bg-[#7A3B5E] hover:bg-[#6A2E4E] disabled:opacity-60"
                                  title="Grant full access to this program (no Stripe charge)"
                                >
                                  {isGranting
                                    ? <Loader2 className="w-3 h-3 animate-spin" />
                                    : <Unlock className="w-3 h-3" />}
                                  Grant full access
                                </button>
                              )}
                            </div>
                            {/* Progress bar */}
                            {p.totalModules > 0 && (
                              <div>
                                <div className="flex items-center justify-between text-[9px] text-[#8E8E9F] mb-1">
                                  <span>{p.completedModules} / {p.totalModules} modules · {p.progressPercent}%</span>
                                  {p.currentModule && (
                                    <span className="truncate ml-2 font-mono">{p.currentModule}</span>
                                  )}
                                </div>
                                <div className="h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-[#3B8A6E]"
                                    style={{ width: `${p.progressPercent}%` }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Reconcile-from-Stripe hint if no programs and no payments */}
                    {s.programs.length > 0 && s.totalRevenueCAD === 0 && !s.isAdmin && !s.isVip && s.programs.some(p => p.fullyUnlocked) && (
                      <p className="text-[9px] text-[#C8A97D] italic mt-2">
                        Paid access granted but no revenue attributed — payment may have been a manual grant or reconciled from Stripe.
                      </p>
                    )}

                    {/* Email history */}
                    <div className="mt-3 pt-3 border-t border-[#F3EFE8]">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[10px] uppercase tracking-wider font-semibold text-[#8E8E9F]">
                          Email history
                        </p>
                        {s.optedOut && (
                          <span className="text-[9px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 uppercase tracking-wider font-semibold">
                            Opted out
                          </span>
                        )}
                      </div>
                      {Object.keys(s.emailLog).length === 0 ? (
                        <p className="text-[10px] text-[#B8B3AD] italic">No emails sent yet.</p>
                      ) : (
                        <div className="space-y-0.5">
                          {Object.entries(s.emailLog)
                            .sort((a, b) => b[1].localeCompare(a[1]))
                            .slice(0, 6)
                            .map(([key, ts]) => (
                              <div key={key} className="flex items-center justify-between text-[10px]">
                                <span className="font-mono text-[#4A4A5C] truncate" title={key}>
                                  {formatEmailKey(key)}
                                </span>
                                <span className="text-[#8E8E9F] shrink-0 ml-2">{fmtDate(ts)}</span>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
