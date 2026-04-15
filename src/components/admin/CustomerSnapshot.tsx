'use client';

/* ================================================================
   CustomerSnapshot — compact relationship summary card
   ================================================================
   Shown on the right side of the ComposeTab when a customer is
   selected. Surfaces aggregate stats, most-used service, and an
   optional AI insight summary. Mobile-friendly (stacks under the
   form on narrow screens).
   ================================================================ */

import { useState } from 'react';
import {
  User,
  Calendar,
  TrendingUp,
  Sparkles,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import type { Customer, StoredInvoice } from '@/lib/invoicing/types';

interface Props {
  customer: Customer | null;
  /** Recent invoices for this customer (optional). Used to compute service history. */
  recentInvoices?: StoredInvoice[];
  bearerHeaders: HeadersInit;
  onInsightUpdated?: (summary: string, tags: string[]) => void;
  locale?: 'en' | 'ar';
}

function fmtCAD(n: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(iso: string | undefined, locale: 'en' | 'ar'): string {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString(
      locale === 'ar' ? 'ar-EG' : 'en-US',
      { year: 'numeric', month: 'short', day: 'numeric' },
    );
  } catch {
    return iso.slice(0, 10);
  }
}

function mostUsedService(invoices: StoredInvoice[]): string | null {
  if (invoices.length === 0) return null;
  const counts = new Map<string, number>();
  for (const inv of invoices) {
    const slug = inv.breakdown.serviceSlug;
    counts.set(slug, (counts.get(slug) || 0) + 1);
  }
  let top: string | null = null;
  let topCount = 0;
  for (const [slug, count] of counts.entries()) {
    if (count > topCount) {
      topCount = count;
      top = slug;
    }
  }
  return top;
}

const SERVICE_NAMES: Record<string, string> = {
  'under-18-counseling': 'Under 18 Counseling',
  'parenting-coaching': 'Parenting Coaching',
  'cbt-youth': 'CBT / DBT',
  'anxiety-counseling': 'Counseling Session',
  'couples-counseling': 'Couples Counseling',
  'family-relationship-strengthening': 'Family Counseling',
  'self-development-coaching': 'Self-Development',
  'anger-management': 'Anger Management',
};

export default function CustomerSnapshot({
  customer,
  recentInvoices = [],
  bearerHeaders,
  onInsightUpdated,
  locale = 'en',
}: Props) {
  const [generatingInsight, setGeneratingInsight] = useState(false);
  const [insightError, setInsightError] = useState<string | null>(null);
  const isRTL = locale === 'ar';

  if (!customer) {
    return (
      <div className="bg-white rounded-xl border border-dashed border-[#E8E4DE] p-4 text-center">
        <User className="w-8 h-8 mx-auto text-[#C8A97D]/40 mb-2" />
        <p className="text-[11px] text-[#8E8E9F]">
          {isRTL
            ? 'اختر عميلاً لرؤية ملف علاقته'
            : 'Select a customer to see their relationship snapshot'}
        </p>
      </div>
    );
  }

  const topServiceSlug = mostUsedService(recentInvoices);
  const topServiceName = topServiceSlug
    ? SERVICE_NAMES[topServiceSlug] || topServiceSlug
    : null;

  const hasInsight = !!customer.aiInsightSummary;

  const handleGenerateInsight = async () => {
    setGeneratingInsight(true);
    setInsightError(null);
    try {
      const res = await fetch('/api/admin/invoices/ai/insights', {
        method: 'POST',
        headers: bearerHeaders,
        body: JSON.stringify({ email: customer.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setInsightError(data.error || 'Failed to generate insight');
        return;
      }
      if (data.summary && onInsightUpdated) {
        onInsightUpdated(data.summary, data.tags || []);
      }
    } catch {
      setInsightError('Network error');
    } finally {
      setGeneratingInsight(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-xl border border-[#E8E4DE] p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-wider text-[#8E8E9F] font-semibold mb-0.5">
            {isRTL ? 'ملخّص العلاقة' : 'Relationship snapshot'}
          </div>
          <div className="text-sm font-bold text-[#2D2A33]">
            {customer.salutation &&
            !/^(Mrs?|Ms|Miss|Mr|Dr|Prof)\.?\s/i.test(customer.name)
              ? `${customer.salutation} `
              : ''}
            {customer.name}
          </div>
        </div>
        {customer.zohoCustomerId && (
          <span
            className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#F3EFE8] text-[#8E8E9F] uppercase tracking-wide"
            title="Imported from Zoho Books"
          >
            Zoho
          </span>
        )}
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-white rounded-lg border border-[#F3EFE8] p-2.5">
          <div className="flex items-center gap-1.5 text-[9px] text-[#8E8E9F] uppercase tracking-wide font-semibold mb-0.5">
            <TrendingUp className="w-3 h-3" />
            {isRTL ? 'إجمالي الفواتير' : 'Total paid'}
          </div>
          <div className="text-sm font-bold text-[#2D2A33] tabular-nums">
            {fmtCAD(customer.totalPaidCAD)}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#F3EFE8] p-2.5">
          <div className="flex items-center gap-1.5 text-[9px] text-[#8E8E9F] uppercase tracking-wide font-semibold mb-0.5">
            <User className="w-3 h-3" />
            {isRTL ? 'عدد الفواتير' : 'Invoices'}
          </div>
          <div className="text-sm font-bold text-[#2D2A33] tabular-nums">
            {customer.totalInvoices}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#F3EFE8] p-2.5">
          <div className="flex items-center gap-1.5 text-[9px] text-[#8E8E9F] uppercase tracking-wide font-semibold mb-0.5">
            <Calendar className="w-3 h-3" />
            {isRTL ? 'آخر فاتورة' : 'Last invoice'}
          </div>
          <div className="text-[10px] font-semibold text-[#4A4A5C]">
            {fmtDate(customer.lastInvoiceAt, locale)}
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[#F3EFE8] p-2.5">
          <div className="flex items-center gap-1.5 text-[9px] text-[#8E8E9F] uppercase tracking-wide font-semibold mb-0.5">
            <Calendar className="w-3 h-3" />
            {isRTL ? 'أوّل فاتورة' : 'First invoice'}
          </div>
          <div className="text-[10px] font-semibold text-[#4A4A5C]">
            {fmtDate(customer.firstInvoiceAt, locale)}
          </div>
        </div>
      </div>

      {/* Outstanding warning if any */}
      {customer.outstandingCAD > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0" />
          <div className="text-[10px] text-amber-900 flex-1">
            {isRTL ? 'مستحقات معلّقة: ' : 'Outstanding: '}
            <span className="font-bold">{fmtCAD(customer.outstandingCAD)}</span>
          </div>
        </div>
      )}

      {/* Top service */}
      {topServiceName && (
        <div className="text-[10px] text-[#8E8E9F]">
          {isRTL ? 'الخدمة الأكثر استخداماً: ' : 'Most-used service: '}
          <span className="font-semibold text-[#4A4A5C]">{topServiceName}</span>
        </div>
      )}

      {/* Initials + sequence preview */}
      {customer.effectiveInitials && (
        <div className="text-[10px] text-[#8E8E9F] flex items-center gap-1.5">
          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
          {isRTL ? 'رقم الفاتورة التالي: ' : 'Next invoice number: '}
          <span className="font-mono font-semibold text-[#7A3B5E]">
            MHC-{new Date().toISOString().slice(0, 7).replace('-', '')}-
            {customer.effectiveInitials}-{customer.nextInvoiceSeq ?? 1}
          </span>
        </div>
      )}

      {/* AI insight */}
      <div className="pt-2 border-t border-[#F3EFE8]">
        {hasInsight ? (
          <div>
            <div className="flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-3 h-3 text-[#C8A97D]" />
              <span className="text-[9px] uppercase tracking-wider text-[#8E8E9F] font-semibold">
                {isRTL ? 'رؤية الذّكاء الاصطناعيّ' : 'AI insight'}
              </span>
            </div>
            <p className="text-[11px] text-[#4A4A5C] leading-relaxed italic">
              {customer.aiInsightSummary}
            </p>
            {customer.aiInsightTags && customer.aiInsightTags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5">
                {customer.aiInsightTags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[9px] text-[#8E8E9F]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <button
              onClick={handleGenerateInsight}
              disabled={generatingInsight}
              className="mt-2 text-[9px] text-[#7A3B5E] hover:text-[#5A2D47] font-semibold disabled:opacity-50"
            >
              {generatingInsight
                ? isRTL
                  ? 'جارٍ التّحديث...'
                  : 'Refreshing…'
                : isRTL
                ? 'تحديث الرّؤية'
                : 'Refresh insight'}
            </button>
          </div>
        ) : (
          <button
            onClick={handleGenerateInsight}
            disabled={generatingInsight || customer.totalInvoices === 0}
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C8A97D]/40 bg-white text-[10px] font-semibold text-[#7A3B5E] hover:bg-[#FAF7F2] disabled:opacity-50"
          >
            {generatingInsight ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Sparkles className="w-3 h-3" />
            )}
            {generatingInsight
              ? isRTL
                ? 'جارٍ التّحليل...'
                : 'Analyzing…'
              : isRTL
              ? 'ولّد رؤية الذّكاء الاصطناعيّ'
              : 'Generate AI insight'}
          </button>
        )}
        {insightError && (
          <p className="mt-1.5 text-[9px] text-rose-600">{insightError}</p>
        )}
      </div>
    </div>
  );
}
