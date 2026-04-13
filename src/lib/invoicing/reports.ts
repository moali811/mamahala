/* ================================================================
   Invoice Reports Aggregator
   ================================================================
   Pure function — takes a list of StoredInvoice and rolls them up
   into buckets for the Reports tab (by band, by service, by month).
   All amounts are in CAD via the immutable snapshot on each record.
   ================================================================ */

import type { StoredInvoice } from './types';
import type { PricingBand } from '@/config/pricing';

export interface ReportBucket {
  key: string;
  label: string;
  count: number;
  revenueCAD: number;
  percentOfTotal: number;
}

export interface ReportAggregate {
  /* Summary */
  totalInvoices: number;
  totalPaidCAD: number;
  totalOutstandingCAD: number;
  totalVoidCount: number;
  mtdPaidCAD: number;
  topCountry: { country: string; revenueCAD: number } | null;
  /* Detail */
  byBand: ReportBucket[];
  byService: ReportBucket[];
  byMonth: ReportBucket[];
  byCountry: ReportBucket[];
}

const BAND_LABELS: Record<PricingBand, string> = {
  premium: 'Premium markets',
  mid: 'Mid-market',
  emerging: 'Emerging',
  accessible: 'Accessible',
};

function monthKey(iso: string): string {
  return iso.slice(0, 7); // YYYY-MM
}

function monthLabel(ym: string): string {
  try {
    const [y, m] = ym.split('-');
    const d = new Date(Number(y), Number(m) - 1, 1);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return ym;
  }
}

export function aggregateInvoices(
  records: StoredInvoice[],
): ReportAggregate {
  const now = new Date();
  const thisMonthKey = monthKey(now.toISOString());

  let totalPaidCAD = 0;
  let totalOutstandingCAD = 0;
  let totalVoidCount = 0;
  let mtdPaidCAD = 0;

  const byBandMap = new Map<
    string,
    { count: number; revenueCAD: number; label: string }
  >();
  const byServiceMap = new Map<
    string,
    { count: number; revenueCAD: number; label: string }
  >();
  const byMonthMap = new Map<
    string,
    { count: number; revenueCAD: number; label: string }
  >();
  const byCountryMap = new Map<
    string,
    { count: number; revenueCAD: number; label: string }
  >();

  for (const r of records) {
    const bd = r.breakdown;
    const cad = bd.totalCAD;
    const status = r.status;

    if (status === 'paid') {
      totalPaidCAD += cad;
      if (monthKey(r.paidAt ?? r.issuedAt) === thisMonthKey) {
        mtdPaidCAD += cad;
      }
    } else if (status === 'sent' || status === 'overdue') {
      totalOutstandingCAD += cad;
    } else if (status === 'void') {
      totalVoidCount += 1;
    }

    // Buckets only count paid invoices (revenue that actually landed)
    if (status !== 'paid') continue;

    // By band
    const bandKey = bd.band;
    const bandEntry = byBandMap.get(bandKey) ?? {
      count: 0,
      revenueCAD: 0,
      label: BAND_LABELS[bandKey] ?? bandKey,
    };
    bandEntry.count += 1;
    bandEntry.revenueCAD += cad;
    byBandMap.set(bandKey, bandEntry);

    // By service
    const serviceKey = bd.serviceSlug;
    const serviceEntry = byServiceMap.get(serviceKey) ?? {
      count: 0,
      revenueCAD: 0,
      label: serviceKey,
    };
    serviceEntry.count += 1;
    serviceEntry.revenueCAD += cad;
    byServiceMap.set(serviceKey, serviceEntry);

    // By month
    const mk = monthKey(r.paidAt ?? r.issuedAt);
    const monthEntry = byMonthMap.get(mk) ?? {
      count: 0,
      revenueCAD: 0,
      label: monthLabel(mk),
    };
    monthEntry.count += 1;
    monthEntry.revenueCAD += cad;
    byMonthMap.set(mk, monthEntry);

    // By country
    const countryKey = bd.country;
    const countryEntry = byCountryMap.get(countryKey) ?? {
      count: 0,
      revenueCAD: 0,
      label: countryKey,
    };
    countryEntry.count += 1;
    countryEntry.revenueCAD += cad;
    byCountryMap.set(countryKey, countryEntry);
  }

  const toBuckets = (
    map: Map<string, { count: number; revenueCAD: number; label: string }>,
  ): ReportBucket[] => {
    const total = Array.from(map.values()).reduce(
      (acc, v) => acc + v.revenueCAD,
      0,
    );
    return Array.from(map.entries())
      .map(([key, v]) => ({
        key,
        label: v.label,
        count: v.count,
        revenueCAD: v.revenueCAD,
        percentOfTotal: total > 0 ? v.revenueCAD / total : 0,
      }))
      .sort((a, b) => b.revenueCAD - a.revenueCAD);
  };

  const byCountry = toBuckets(byCountryMap);
  const topCountry = byCountry[0]
    ? { country: byCountry[0].key, revenueCAD: byCountry[0].revenueCAD }
    : null;

  return {
    totalInvoices: records.length,
    totalPaidCAD,
    totalOutstandingCAD,
    totalVoidCount,
    mtdPaidCAD,
    topCountry,
    byBand: toBuckets(byBandMap),
    byService: toBuckets(byServiceMap),
    byMonth: toBuckets(byMonthMap).sort((a, b) =>
      a.key.localeCompare(b.key),
    ),
    byCountry,
  };
}
