'use client';

/* ================================================================
   Shared Invoice Components — used by InvoicesModule and
   InvoiceReviewSheet to avoid duplication.
   ================================================================ */

import { motion } from 'framer-motion';
import { Receipt, AlertCircle } from 'lucide-react';
import { generateDraftId } from '@/lib/invoicing/invoice-number';
import type { InvoiceDraft, InvoiceRateBreakdown } from '@/lib/invoicing/types';

// ─── Section wrapper ──────────────────────────────────────────

export function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl border border-[#EDE8DF] p-4">
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-[#7A3B5E]">{icon}</span>}
        <h3 className="text-[11px] uppercase tracking-widest font-semibold text-[#4A4A5C]">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-medium mb-1.5 block">
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Breakdown Card ───────────────────────────────────────────

export function BreakdownCard({ breakdown }: { breakdown: InvoiceRateBreakdown | null }) {
  if (!breakdown) {
    return (
      <div className="bg-gradient-to-br from-[#FAF7F2] to-white rounded-xl border border-[#EDE8DF] p-5 text-center">
        <Receipt className="w-8 h-8 mx-auto text-[#C8A97D] mb-2" />
        <p className="text-sm text-[#8E8E9F]">
          Fill in client + service to see the rate breakdown
        </p>
      </div>
    );
  }

  const parts = [
    { label: 'Base rate', value: breakdown.formattedBase },
    ...(breakdown.complexityPercent > 0
      ? [{ label: `Complexity +${Math.round(breakdown.complexityPercent * 100)}%`, value: '×' }]
      : []),
    ...(breakdown.sessions > 1
      ? [{ label: `${breakdown.sessions} sessions`, value: `×${breakdown.sessions}` }]
      : []),
    ...(breakdown.packageDiscountPercent > 0
      ? [{ label: `Package −${Math.round(breakdown.packageDiscountPercent * 100)}%`, value: '×' }]
      : []),
    ...(breakdown.slidingScalePercent > 0
      ? [{ label: `Sliding scale −${Math.round(breakdown.slidingScalePercent * 100)}%`, value: '×' }]
      : []),
  ];

  return (
    <motion.div
      layout
      className="bg-gradient-to-br from-white to-[#FAF7F2] rounded-xl border border-[#EDE8DF] p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-[#8E8E9F] font-semibold">
          Rate Breakdown
        </span>
        <span className="text-[10px] uppercase font-semibold text-[#7A3B5E] bg-[#7A3B5E]/10 px-2 py-0.5 rounded-full">
          {breakdown.band}
        </span>
      </div>

      <div className="space-y-1.5">
        {parts.map((p, i) => (
          <div key={i} className="flex justify-between text-xs">
            <span className="text-[#4A4A5C]">{p.label}</span>
            <span className="text-[#8E8E9F] font-mono">{p.value}</span>
          </div>
        ))}
      </div>

      <div className="h-px bg-[#EDE8DF]" />

      {breakdown.taxPercent > 0 && (
        <div className="flex justify-between items-baseline">
          <span className="text-[11px] text-[#8E8E9F]">
            HST {Math.round(breakdown.taxPercent * 100)}%
          </span>
        </div>
      )}

      {/* Total */}
      <div className="bg-[#7A3B5E] text-white rounded-lg p-3">
        <div className="text-[10px] uppercase tracking-widest opacity-80">Total</div>
        <div className="text-2xl font-bold tabular-nums mt-0.5">
          {breakdown.formattedTotal}
        </div>
        {breakdown.displayCurrency !== 'CAD' && (
          <div className="text-[11px] opacity-80 italic mt-0.5">
            ≈ {breakdown.formattedTotalCAD}
          </div>
        )}
      </div>

      {/* Formula line */}
      <p className="text-[9px] text-[#8E8E9F] font-mono leading-relaxed">
        {breakdown.formulaLine}
      </p>

      {breakdown.floorApplied && (
        <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
          CAD $60 floor applied
        </div>
      )}

      {breakdown.warning && (
        <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 flex items-start gap-1.5">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{breakdown.warning}</span>
        </div>
      )}
    </motion.div>
  );
}

// ─── Empty draft factory ──────────────────────────────────────

export function makeEmptyDraft(): InvoiceDraft {
  const now = new Date().toISOString();
  return {
    draftId: generateDraftId(),
    client: { name: '', email: '', country: 'CA' },
    serviceSlug: '',
    complexity: { preset: 'standard', percent: 0 },
    package: 'single',
    slidingScalePercent: 0,
    taxMode: 'manual-hst',
    allowETransfer: true,
    daysUntilDue: 7,
    createdAt: now,
    updatedAt: now,
  };
}

// ─── Standard input class ─────────────────────────────────────

export const inputClass =
  'w-full px-3 py-2 rounded-lg border border-[#E8E4DE] text-sm text-[#2D2A33] focus:outline-none focus:ring-2 focus:ring-[#7A3B5E]/20 bg-white';
