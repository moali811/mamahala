/* ================================================================
   Dashboard Stats Aggregator
   ================================================================
   Pure function — takes a list of StoredInvoices and computes the
   rich dashboard view-model with summary cards, trends, top clients,
   recent activity, and currency mix.
   ================================================================ */

import type { StoredInvoice } from './types';

export interface DashboardSummaryCards {
  mtdRevenueCAD: number;
  mtdDeltaPct: number; // vs last month
  outstandingCAD: number;
  outstandingCount: number;
  overdueCAD: number;
  overdueCount: number;
  ytdRevenueCAD: number;
}

export interface DashboardTrendPoint {
  monthKey: string; // YYYY-MM
  monthLabel: string;
  revenueCAD: number;
  count: number;
}

export interface DashboardCurrencySlice {
  currency: string;
  revenueCAD: number;
  percent: number;
}

export interface DashboardTopClient {
  email: string;
  name: string;
  country: string;
  totalCAD: number;
  invoiceCount: number;
}

export interface DashboardUpcomingDue {
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  totalLocal: number;
  formattedTotal: string;
  totalCAD: number;
  dueDate: string;
  daysUntilDue: number;
  status: string;
}

export interface DashboardActivity {
  invoiceId: string;
  invoiceNumber: string;
  clientName: string;
  action: 'created' | 'sent' | 'paid' | 'voided' | 'overdue';
  timestamp: string;
  amountCAD: number;
}

/* ═══════════════ Phase 4 — Data Science Additions ═══════════════ */

export interface DashboardClientLTV {
  email: string;
  name: string;
  country: string;
  totalCAD: number;
  invoiceCount: number;
  /** 12 values, oldest month first, latest month last. Zero-filled. */
  last12MonthsSparkline: number[];
  firstInvoiceAt: string;
  lastInvoiceAt: string;
  /** Most-used service slug (for secondary labeling). */
  topService?: string;
}

export interface DashboardRetentionCohort {
  cohortMonth: string; // YYYY-MM
  cohortSize: number; // clients who FIRST invoiced this month
  /** Retention percentages at offsets [0, +1, +2, +3, +4, +5] months. */
  retention: number[];
}

export interface DashboardSeasonalDay {
  date: string; // YYYY-MM-DD
  count: number;
  revenueCAD: number;
}

export interface DashboardServiceMixNode {
  category: string;
  service: string;
  serviceName: string;
  revenueCAD: number;
  count: number;
}

export interface DashboardRelationshipBucket {
  label: string; // "1 invoice" | "2-5" | "6-10" | "11-20" | "21+"
  count: number;
  revenueCAD: number;
}

export interface DashboardForecastPoint {
  weekStart: string; // YYYY-MM-DD
  actualCAD: number | null; // null for future weeks
  forecastCAD: number;
  confidenceLow: number;
  confidenceHigh: number;
}

export interface DashboardGeoRevenue {
  country: string; // ISO-2
  countryName: string; // English name for display
  flag: string; // emoji flag
  count: number;
  revenueCAD: number;
  percent: number;
}

export interface DashboardView {
  summary: DashboardSummaryCards;
  trend: DashboardTrendPoint[];
  currencyMix: DashboardCurrencySlice[];
  topClients: DashboardTopClient[];
  upcomingDue: DashboardUpcomingDue[];
  recentActivity: DashboardActivity[];
  /* Phase 4 — Data science views */
  byClientLTV: DashboardClientLTV[];
  byGeoRevenue: DashboardGeoRevenue[];
  retentionCohorts: DashboardRetentionCohort[];
  seasonalCalendar: DashboardSeasonalDay[];
  serviceMix: DashboardServiceMixNode[];
  relationshipDepth: DashboardRelationshipBucket[];
  weeklyForecast: DashboardForecastPoint[];
  /** Optional Claude-generated weekly commentary (async-loaded, cached 24h). */
  aiCommentary?: string;
  aiCommentaryUpdatedAt?: string;
}

function monthKey(iso: string): string {
  return iso.slice(0, 7);
}

function monthLabel(ym: string): string {
  try {
    const [y, m] = ym.split('-');
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  } catch {
    return ym;
  }
}

export function buildDashboardView(records: StoredInvoice[]): DashboardView {
  const now = new Date();
  const nowMs = now.getTime();
  const thisMonth = monthKey(now.toISOString());
  const lastMonth = monthKey(
    new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString(),
  );
  const thisYear = String(now.getUTCFullYear());

  // ── Summary cards ──
  let mtdRevenueCAD = 0;
  let lastMonthRevenueCAD = 0;
  let outstandingCAD = 0;
  let outstandingCount = 0;
  let overdueCAD = 0;
  let overdueCount = 0;
  let ytdRevenueCAD = 0;

  // ── Trend (last 6 months) ──
  const trendMap = new Map<string, { revenue: number; count: number }>();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const k = monthKey(d.toISOString());
    trendMap.set(k, { revenue: 0, count: 0 });
  }

  // ── Currency mix ──
  const currencyMap = new Map<string, number>(); // currency → CAD revenue

  // ── Top clients (paid only, by year) ──
  const clientMap = new Map<
    string,
    {
      email: string;
      name: string;
      country: string;
      totalCAD: number;
      invoiceCount: number;
    }
  >();

  // ── Upcoming due (next 7 days, status = sent) ──
  const upcoming: DashboardUpcomingDue[] = [];

  // ── Recent activity (last 10 invoices) ──
  const sortedByDate = [...records].sort(
    (a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt),
  );

  const activity: DashboardActivity[] = [];
  for (const inv of sortedByDate.slice(0, 15)) {
    let action: DashboardActivity['action'] = 'created';
    if (inv.status === 'paid') action = 'paid';
    else if (inv.status === 'void') action = 'voided';
    else if (inv.status === 'overdue') action = 'overdue';
    else if (inv.status === 'sent') action = 'sent';
    activity.push({
      invoiceId: inv.invoiceId,
      invoiceNumber: inv.invoiceNumber,
      clientName: inv.draft.client.name,
      action,
      timestamp: inv.updatedAt,
      amountCAD: inv.breakdown.totalCAD,
    });
    if (activity.length >= 10) break;
  }

  for (const inv of records) {
    const cad = inv.breakdown.totalCAD;
    const cur = inv.breakdown.displayCurrency;

    // Outstanding & overdue
    if (inv.status === 'sent' || inv.status === 'overdue') {
      outstandingCAD += cad;
      outstandingCount++;
      if (inv.status === 'overdue') {
        overdueCAD += cad;
        overdueCount++;
      } else {
        // sent — check if due date passed
        const due = Date.parse(inv.dueDate);
        if (due < nowMs) {
          overdueCAD += cad;
          overdueCount++;
        }
      }
    }

    // Paid revenue
    if (inv.status === 'paid') {
      const paidKey = monthKey(inv.paidAt ?? inv.issuedAt);
      if (paidKey === thisMonth) mtdRevenueCAD += cad;
      if (paidKey === lastMonth) lastMonthRevenueCAD += cad;
      if (paidKey.startsWith(thisYear)) ytdRevenueCAD += cad;

      // Trend
      if (trendMap.has(paidKey)) {
        const t = trendMap.get(paidKey)!;
        t.revenue += cad;
        t.count++;
      }

      // Currency mix
      currencyMap.set(cur, (currencyMap.get(cur) || 0) + cad);

      // Top clients
      const email = inv.draft.client.email.toLowerCase();
      const client = clientMap.get(email) ?? {
        email,
        name: inv.draft.client.name,
        country: inv.draft.client.country,
        totalCAD: 0,
        invoiceCount: 0,
      };
      client.totalCAD += cad;
      client.invoiceCount++;
      clientMap.set(email, client);
    }

    // Upcoming due (next 7 days)
    if (inv.status === 'sent' || inv.status === 'overdue') {
      const due = Date.parse(inv.dueDate);
      const daysUntilDue = Math.round((due - nowMs) / (1000 * 60 * 60 * 24));
      if (daysUntilDue >= -7 && daysUntilDue <= 7) {
        upcoming.push({
          invoiceId: inv.invoiceId,
          invoiceNumber: inv.invoiceNumber,
          clientName: inv.draft.client.name,
          clientEmail: inv.draft.client.email,
          totalLocal: inv.breakdown.totalLocal,
          formattedTotal: inv.breakdown.formattedTotal,
          totalCAD: cad,
          dueDate: inv.dueDate,
          daysUntilDue,
          status: inv.status,
        });
      }
    }
  }

  // Compute MTD delta
  const mtdDeltaPct =
    lastMonthRevenueCAD > 0
      ? ((mtdRevenueCAD - lastMonthRevenueCAD) / lastMonthRevenueCAD) * 100
      : mtdRevenueCAD > 0
      ? 100
      : 0;

  // Trend → array
  const trend: DashboardTrendPoint[] = Array.from(trendMap.entries()).map(
    ([k, v]) => ({
      monthKey: k,
      monthLabel: monthLabel(k),
      revenueCAD: v.revenue,
      count: v.count,
    }),
  );

  // Currency mix → percentages, top 6 + Other
  const totalCurrencyRevenue = Array.from(currencyMap.values()).reduce(
    (a, b) => a + b,
    0,
  );
  const currencyMix: DashboardCurrencySlice[] = Array.from(currencyMap.entries())
    .map(([currency, revenueCAD]) => ({
      currency,
      revenueCAD,
      percent:
        totalCurrencyRevenue > 0 ? (revenueCAD / totalCurrencyRevenue) * 100 : 0,
    }))
    .sort((a, b) => b.revenueCAD - a.revenueCAD);

  // Top 6 + collapse rest into Other
  const top6 = currencyMix.slice(0, 6);
  const otherTotal = currencyMix
    .slice(6)
    .reduce((a, b) => a + b.revenueCAD, 0);
  if (otherTotal > 0) {
    top6.push({
      currency: 'Other',
      revenueCAD: otherTotal,
      percent: (otherTotal / totalCurrencyRevenue) * 100,
    });
  }

  // Top clients (top 5)
  const topClients: DashboardTopClient[] = Array.from(clientMap.values())
    .sort((a, b) => b.totalCAD - a.totalCAD)
    .slice(0, 5);

  // Upcoming due — sort by daysUntilDue (overdue first, then upcoming)
  upcoming.sort((a, b) => a.daysUntilDue - b.daysUntilDue);

  // Phase 4 data science views (second pass — reads paid invoices only)
  const paidRecords = records.filter((r) => r.status === 'paid');
  const byClientLTV = buildClientLTV(paidRecords);
  const byGeoRevenue = buildGeoRevenue(paidRecords);
  const retentionCohorts = buildRetentionCohorts(paidRecords);
  const seasonalCalendar = buildSeasonalCalendar(paidRecords);
  const serviceMix = buildServiceMix(paidRecords);
  const relationshipDepth = buildRelationshipDepth(paidRecords);
  const weeklyForecast = buildWeeklyForecast(paidRecords);

  return {
    summary: {
      mtdRevenueCAD,
      mtdDeltaPct,
      outstandingCAD,
      outstandingCount,
      overdueCAD,
      overdueCount,
      ytdRevenueCAD,
    },
    trend,
    currencyMix: top6,
    topClients,
    upcomingDue: upcoming.slice(0, 10),
    recentActivity: activity,
    byClientLTV,
    byGeoRevenue,
    retentionCohorts,
    seasonalCalendar,
    serviceMix,
    relationshipDepth,
    weeklyForecast,
  };
}

/* ═══════════════ Phase 4 — Second-pass aggregators ═══════════════ */

/**
 * Top 20 clients by total paid CAD with a 12-month sparkline for each.
 * The sparkline is ordered oldest-to-newest so charts can render it
 * left-to-right as time.
 */
function buildClientLTV(paidRecords: StoredInvoice[]): DashboardClientLTV[] {
  const now = new Date();
  const thisYM = monthKey(now.toISOString());
  // Precompute the 12 month keys ending at this month
  const monthKeys: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    monthKeys.push(monthKey(d.toISOString()));
  }

  interface Agg {
    email: string;
    name: string;
    country: string;
    totalCAD: number;
    invoiceCount: number;
    monthlyRevenue: Map<string, number>;
    firstAt: string | undefined;
    lastAt: string | undefined;
    serviceCounts: Map<string, number>;
  }

  const byClient = new Map<string, Agg>();
  for (const inv of paidRecords) {
    const email = inv.draft.client.email.toLowerCase();
    let agg = byClient.get(email);
    if (!agg) {
      agg = {
        email,
        name: inv.draft.client.name,
        country: inv.draft.client.country,
        totalCAD: 0,
        invoiceCount: 0,
        monthlyRevenue: new Map(),
        firstAt: undefined,
        lastAt: undefined,
        serviceCounts: new Map(),
      };
      byClient.set(email, agg);
    }
    agg.totalCAD += inv.breakdown.totalCAD;
    agg.invoiceCount++;
    const mk = monthKey(inv.paidAt ?? inv.issuedAt);
    agg.monthlyRevenue.set(mk, (agg.monthlyRevenue.get(mk) || 0) + inv.breakdown.totalCAD);
    if (!agg.firstAt || inv.issuedAt < agg.firstAt) agg.firstAt = inv.issuedAt;
    if (!agg.lastAt || inv.issuedAt > agg.lastAt) agg.lastAt = inv.issuedAt;
    const slug = inv.breakdown.serviceSlug;
    agg.serviceCounts.set(slug, (agg.serviceCounts.get(slug) || 0) + 1);
  }

  // Avoid unused var warning (thisYM reserved for future "is-active" filter)
  void thisYM;

  return Array.from(byClient.values())
    .map((agg) => {
      // Build the sparkline in month-key order
      const sparkline = monthKeys.map((k) => agg.monthlyRevenue.get(k) || 0);
      // Top service (most invoices)
      let topService: string | undefined;
      let topCount = 0;
      for (const [slug, count] of agg.serviceCounts.entries()) {
        if (count > topCount) {
          topCount = count;
          topService = slug;
        }
      }
      return {
        email: agg.email,
        name: agg.name,
        country: agg.country,
        totalCAD: agg.totalCAD,
        invoiceCount: agg.invoiceCount,
        last12MonthsSparkline: sparkline,
        firstInvoiceAt: agg.firstAt ?? '',
        lastInvoiceAt: agg.lastAt ?? '',
        topService,
      };
    })
    .sort((a, b) => b.totalCAD - a.totalCAD)
    .slice(0, 20);
}

/** Country metadata for the top markets Dr. Hala serves. */
const COUNTRY_META: Record<string, { name: string; flag: string }> = {
  CA: { name: 'Canada', flag: '🇨🇦' },
  US: { name: 'United States', flag: '🇺🇸' },
  AE: { name: 'UAE', flag: '🇦🇪' },
  SA: { name: 'Saudi Arabia', flag: '🇸🇦' },
  KW: { name: 'Kuwait', flag: '🇰🇼' },
  QA: { name: 'Qatar', flag: '🇶🇦' },
  BH: { name: 'Bahrain', flag: '🇧🇭' },
  OM: { name: 'Oman', flag: '🇴🇲' },
  JO: { name: 'Jordan', flag: '🇯🇴' },
  LB: { name: 'Lebanon', flag: '🇱🇧' },
  EG: { name: 'Egypt', flag: '🇪🇬' },
  MA: { name: 'Morocco', flag: '🇲🇦' },
  TN: { name: 'Tunisia', flag: '🇹🇳' },
  GB: { name: 'United Kingdom', flag: '🇬🇧' },
  FR: { name: 'France', flag: '🇫🇷' },
  DE: { name: 'Germany', flag: '🇩🇪' },
  AU: { name: 'Australia', flag: '🇦🇺' },
};

function buildGeoRevenue(paidRecords: StoredInvoice[]): DashboardGeoRevenue[] {
  const byCountry = new Map<string, { count: number; revenueCAD: number }>();
  for (const inv of paidRecords) {
    const country = inv.draft.client.country.toUpperCase();
    const entry = byCountry.get(country) ?? { count: 0, revenueCAD: 0 };
    entry.count++;
    entry.revenueCAD += inv.breakdown.totalCAD;
    byCountry.set(country, entry);
  }
  const total = Array.from(byCountry.values()).reduce(
    (sum, v) => sum + v.revenueCAD,
    0,
  );
  return Array.from(byCountry.entries())
    .map(([country, v]) => ({
      country,
      countryName: COUNTRY_META[country]?.name || country,
      flag: COUNTRY_META[country]?.flag || '🌐',
      count: v.count,
      revenueCAD: v.revenueCAD,
      percent: total > 0 ? (v.revenueCAD / total) * 100 : 0,
    }))
    .sort((a, b) => b.revenueCAD - a.revenueCAD);
}

/**
 * Retention cohorts: for each month M, identify clients whose FIRST-EVER
 * paid invoice was in M, then compute what percentage of those clients
 * also paid an invoice in M+1, M+2, M+3, M+4, M+5.
 *
 * Limited to the 12 most recent cohorts for display tractability.
 */
function buildRetentionCohorts(
  paidRecords: StoredInvoice[],
): DashboardRetentionCohort[] {
  // Step 1: for each customer, find their first paid month
  const firstPaidByClient = new Map<string, string>();
  // Step 2: for each customer, collect the set of months they paid in
  const paidMonthsByClient = new Map<string, Set<string>>();

  for (const inv of paidRecords) {
    const email = inv.draft.client.email.toLowerCase();
    const mk = monthKey(inv.paidAt ?? inv.issuedAt);
    const firstSoFar = firstPaidByClient.get(email);
    if (!firstSoFar || mk < firstSoFar) {
      firstPaidByClient.set(email, mk);
    }
    if (!paidMonthsByClient.has(email)) {
      paidMonthsByClient.set(email, new Set());
    }
    paidMonthsByClient.get(email)!.add(mk);
  }

  // Step 3: bucket clients by their first-paid month (this is the cohort)
  const cohortMembers = new Map<string, string[]>();
  for (const [email, cohortMonth] of firstPaidByClient.entries()) {
    if (!cohortMembers.has(cohortMonth)) {
      cohortMembers.set(cohortMonth, []);
    }
    cohortMembers.get(cohortMonth)!.push(email);
  }

  // Step 4: build the cohort array, sorted reverse-chronologically
  const sortedCohortMonths = Array.from(cohortMembers.keys()).sort().reverse();

  // Limit to the 12 most recent cohorts (display reasonable)
  const recentCohorts = sortedCohortMonths.slice(0, 12).reverse();

  const results: DashboardRetentionCohort[] = [];
  for (const cohortMonth of recentCohorts) {
    const members = cohortMembers.get(cohortMonth) || [];
    const cohortSize = members.length;
    if (cohortSize === 0) continue;

    // For each offset [0..5], count how many members paid in that month
    const retention: number[] = [];
    for (let offset = 0; offset <= 5; offset++) {
      const targetMonth = monthOffset(cohortMonth, offset);
      let stillActive = 0;
      for (const email of members) {
        const months = paidMonthsByClient.get(email);
        if (months?.has(targetMonth)) stillActive++;
      }
      retention.push(Math.round((stillActive / cohortSize) * 100));
    }

    results.push({ cohortMonth, cohortSize, retention });
  }

  return results;
}

function monthOffset(ym: string, delta: number): string {
  const [y, m] = ym.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return monthKey(d.toISOString());
}

/**
 * Build a 365-day array ending today, each day showing invoice count
 * and CAD revenue. Used by the GitHub-style contribution calendar.
 */
function buildSeasonalCalendar(
  paidRecords: StoredInvoice[],
): DashboardSeasonalDay[] {
  const now = new Date();
  const days: DashboardSeasonalDay[] = [];
  const byDate = new Map<string, { count: number; revenueCAD: number }>();

  for (const inv of paidRecords) {
    const d = (inv.paidAt ?? inv.issuedAt).slice(0, 10);
    const agg = byDate.get(d) ?? { count: 0, revenueCAD: 0 };
    agg.count++;
    agg.revenueCAD += inv.breakdown.totalCAD;
    byDate.set(d, agg);
  }

  // Dense 365-day array ending today (oldest first for left-to-right render)
  for (let i = 364; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    const agg = byDate.get(dateStr) ?? { count: 0, revenueCAD: 0 };
    days.push({ date: dateStr, count: agg.count, revenueCAD: agg.revenueCAD });
  }
  return days;
}

/**
 * Service mix breakdown for the treemap — each paid invoice contributes
 * its breakdown.totalCAD to its service slug bucket. Uses the services
 * catalog for human-readable names and categories.
 */
function buildServiceMix(
  paidRecords: StoredInvoice[],
): DashboardServiceMixNode[] {
  const byService = new Map<
    string,
    { count: number; revenueCAD: number }
  >();
  for (const inv of paidRecords) {
    const slug = inv.breakdown.serviceSlug;
    const agg = byService.get(slug) ?? { count: 0, revenueCAD: 0 };
    agg.count++;
    agg.revenueCAD += inv.breakdown.totalCAD;
    byService.set(slug, agg);
  }

  return Array.from(byService.entries())
    .map(([slug, v]) => ({
      category: resolveCategoryForSlug(slug),
      service: slug,
      serviceName: resolveServiceName(slug),
      revenueCAD: v.revenueCAD,
      count: v.count,
    }))
    .sort((a, b) => b.revenueCAD - a.revenueCAD);
}

/* Minimal slug → name dictionary. Expanded imports would pull from data/services
 * but keeping this inline keeps the aggregator import-free and testable. */
function resolveServiceName(slug: string): string {
  const names: Record<string, string> = {
    'under-18-counseling': 'Under 18 Counseling',
    'parenting-coaching': 'Parenting Coaching',
    'cbt-youth': 'CBT / DBT Session',
    'individual-counseling': 'Counseling Session',
    'couples-counseling': 'Couples Counseling',
    'family-relationship-strengthening': 'Family Counseling',
    'self-development-coaching': 'Self-Development',
    'anger-management': 'Anger Management',
    'life-coaching': 'Life Coaching',
    'pre-marital-education': 'Pre-Marital Education',
    'adhd-executive-function-coaching': 'ADHD Coaching',
    'lifestyle-coaching': 'Lifestyle Coaching',
    'teen-behavioral-coaching': 'Teen Behavioral Coaching',
    'social-confidence-friendship': 'Social Confidence',
    'supporting-children-through-change': 'Children Through Change',
    'bullying-support': 'Bullying Support',
    'managing-big-emotions': 'Managing Big Emotions',
    'tackling-child-tantrums': 'Child Tantrums',
    'parental-stress-wellbeing': 'Parental Stress',
    'horticultural-plant-therapy': 'Horticultural Therapy',
    'walk-and-talk': 'Walk & Talk',
  };
  return names[slug] || slug;
}

function resolveCategoryForSlug(slug: string): string {
  if (
    slug.includes('parent') ||
    slug.includes('family') ||
    slug.includes('child') ||
    slug.includes('tantrum')
  )
    return 'families';
  if (
    slug.includes('youth') ||
    slug.includes('under-18') ||
    slug.includes('teen') ||
    slug.includes('social')
  )
    return 'youth';
  if (slug.includes('couple') || slug.includes('marital'))
    return 'couples';
  if (slug.includes('horticultural') || slug.includes('walk'))
    return 'experiential';
  return 'adults';
}

/**
 * Histogram of customers bucketed by their total invoice count.
 */
function buildRelationshipDepth(
  paidRecords: StoredInvoice[],
): DashboardRelationshipBucket[] {
  const byClient = new Map<string, { count: number; revenueCAD: number }>();
  for (const inv of paidRecords) {
    const email = inv.draft.client.email.toLowerCase();
    const agg = byClient.get(email) ?? { count: 0, revenueCAD: 0 };
    agg.count++;
    agg.revenueCAD += inv.breakdown.totalCAD;
    byClient.set(email, agg);
  }

  const buckets = {
    '1 invoice': { count: 0, revenueCAD: 0 },
    '2-5': { count: 0, revenueCAD: 0 },
    '6-10': { count: 0, revenueCAD: 0 },
    '11-20': { count: 0, revenueCAD: 0 },
    '21+': { count: 0, revenueCAD: 0 },
  };

  for (const agg of byClient.values()) {
    let key: keyof typeof buckets;
    if (agg.count === 1) key = '1 invoice';
    else if (agg.count <= 5) key = '2-5';
    else if (agg.count <= 10) key = '6-10';
    else if (agg.count <= 20) key = '11-20';
    else key = '21+';
    buckets[key].count++;
    buckets[key].revenueCAD += agg.revenueCAD;
  }

  return Object.entries(buckets).map(([label, v]) => ({
    label,
    count: v.count,
    revenueCAD: v.revenueCAD,
  }));
}

/**
 * Weekly forecast for the next 4 weeks using a simple moving-average
 * + trend-line extrapolation. Also returns the past 8 weeks for context.
 *
 * Forecast algorithm:
 *   - Compute mean weekly revenue over the last 12 paid weeks
 *   - Compute slope via simple linear regression on those 12 points
 *   - Project next 4 weeks: y = mean + slope * (weekIndex - 5)
 *   - Confidence band: ±1 standard deviation of the 12-week sample
 */
function buildWeeklyForecast(
  paidRecords: StoredInvoice[],
): DashboardForecastPoint[] {
  const weekMap = new Map<string, number>(); // weekStart ISO → revenue
  for (const inv of paidRecords) {
    const d = new Date(inv.paidAt ?? inv.issuedAt);
    const weekStart = getWeekStart(d);
    const key = weekStart.toISOString().slice(0, 10);
    weekMap.set(key, (weekMap.get(key) || 0) + inv.breakdown.totalCAD);
  }

  // Build 12 past weeks (oldest first) ending at current week
  const now = new Date();
  const currentWeekStart = getWeekStart(now);
  const pastWeeks: { weekStart: string; revenue: number }[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() - 7 * i);
    const key = d.toISOString().slice(0, 10);
    pastWeeks.push({ weekStart: key, revenue: weekMap.get(key) || 0 });
  }

  // Compute stats for forecasting
  const revenues = pastWeeks.map((w) => w.revenue);
  const mean = revenues.reduce((a, b) => a + b, 0) / Math.max(1, revenues.length);
  // Simple slope via 2-point through mean of first half vs second half
  const firstHalfMean =
    revenues.slice(0, 6).reduce((a, b) => a + b, 0) / 6;
  const secondHalfMean =
    revenues.slice(6, 12).reduce((a, b) => a + b, 0) / 6;
  const slope = (secondHalfMean - firstHalfMean) / 6;
  // Std dev for confidence band
  const variance =
    revenues.reduce((sum, v) => sum + (v - mean) ** 2, 0) /
    Math.max(1, revenues.length);
  const stdDev = Math.sqrt(variance);

  // Build full 16-week timeline: 12 past + 4 forecast
  const result: DashboardForecastPoint[] = pastWeeks.map((w) => ({
    weekStart: w.weekStart,
    actualCAD: w.revenue,
    forecastCAD: w.revenue,
    confidenceLow: w.revenue,
    confidenceHigh: w.revenue,
  }));

  for (let i = 1; i <= 4; i++) {
    const d = new Date(currentWeekStart);
    d.setDate(d.getDate() + 7 * i);
    const forecast = Math.max(0, mean + slope * i);
    result.push({
      weekStart: d.toISOString().slice(0, 10),
      actualCAD: null,
      forecastCAD: Math.round(forecast),
      confidenceLow: Math.max(0, Math.round(forecast - stdDev)),
      confidenceHigh: Math.round(forecast + stdDev),
    });
  }

  return result;
}

/** Returns the Monday of the week containing the given date (UTC). */
function getWeekStart(date: Date): Date {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayOfWeek = d.getUTCDay(); // 0 = Sunday, 1 = Monday
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  d.setUTCDate(d.getUTCDate() - daysToMonday);
  return d;
}
