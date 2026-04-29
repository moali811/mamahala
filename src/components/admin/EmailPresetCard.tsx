'use client';

/* ================================================================
   EmailPresetCard — Smart "What client receives" segmented control
   ================================================================
   Rendered above InvoiceReviewSheet in NewBookingModal Step 2.
   Single source of truth for the two send-decisions (approval +
   invoice). Surfaces a live one-line preview so admin sees exactly
   what the client will get before pressing Confirm & Send.

   Smart-default is computed by the parent (NewBookingModal) and
   passed in via the `preset` prop on first render. The user can
   override at any time.

   Free sessions hide the invoice-bearing presets (no draft to send).
   ================================================================ */

import { useEffect, useState, useMemo } from 'react';
import { Mail, Receipt, EyeOff, MailPlus } from 'lucide-react';
import type { InvoiceDraft, InvoiceSettings } from '@/lib/invoicing/types';
import { computeRateBreakdown } from '@/lib/invoicing/rate-breakdown';

export type EmailPreset = 'both' | 'approval' | 'invoice' | 'silent';

interface Props {
  preset: EmailPreset;
  onChange: (next: EmailPreset) => void;
  isFreeSession: boolean;
  isRecurring: boolean;
  invoiceMode: 'per-session' | 'bundled';
  recurringCount: number;
  /** True if smart-recognition flagged this email as a new client. Null when unknown. */
  isNewClient: boolean | null;
  clientFirstName: string;
  draft: InvoiceDraft | null;
  locale: 'en' | 'ar';
  password: string;
}

interface PresetRow {
  key: EmailPreset;
  Icon: typeof Mail;
  labelEn: string;
  labelAr: string;
  hintEn: string;
  hintAr: string;
}

const ROWS: PresetRow[] = [
  {
    key: 'both',
    Icon: MailPlus,
    labelEn: 'Approval + Invoice',
    labelAr: 'تأكيد + فاتورة',
    hintEn: 'Send confirmation and invoice together',
    hintAr: 'إرسال التأكيد والفاتورة معًا',
  },
  {
    key: 'approval',
    Icon: Mail,
    labelEn: 'Approval only',
    labelAr: 'تأكيد فقط',
    hintEn: 'Attach invoice later',
    hintAr: 'إرفاق الفاتورة لاحقًا',
  },
  {
    key: 'invoice',
    Icon: Receipt,
    labelEn: 'Invoice only',
    labelAr: 'فاتورة فقط',
    hintEn: 'Client already verbally approved',
    hintAr: 'العميل وافق شفهيًا بالفعل',
  },
  {
    key: 'silent',
    Icon: EyeOff,
    labelEn: 'Save silently',
    labelAr: 'حفظ بصمت',
    hintEn: 'No emails — admin record only',
    hintAr: 'بدون بريد — سجل إداري فقط',
  },
];

export default function EmailPresetCard({
  preset,
  onChange,
  isFreeSession,
  isRecurring,
  invoiceMode,
  recurringCount,
  isNewClient,
  clientFirstName,
  draft,
  locale,
  password,
}: Props) {
  const isAr = locale === 'ar';
  const [settings, setSettings] = useState<InvoiceSettings | null>(null);

  // Fetch settings once for breakdown computation (used by preview line).
  useEffect(() => {
    if (isFreeSession || !draft) return;
    fetch('/api/admin/invoices/settings', {
      headers: { Authorization: `Bearer ${password}` },
    })
      .then(r => r.ok ? r.json() : null)
      .then(d => { if (d?.settings) setSettings(d.settings); })
      .catch(() => { /* preview falls back to amountless copy */ });
  }, [isFreeSession, draft, password]);

  const formattedTotal = useMemo<string | null>(() => {
    if (!draft || !settings || !draft.serviceSlug) return null;
    try {
      const breakdown = computeRateBreakdown(draft, settings);
      return breakdown?.formattedTotal ?? null;
    } catch {
      return null;
    }
  }, [draft, settings]);

  // Hide invoice-bearing presets for free sessions.
  const visibleRows = useMemo(() => {
    if (isFreeSession) return ROWS.filter(r => r.key === 'approval' || r.key === 'silent');
    return ROWS;
  }, [isFreeSession]);

  // First name fallback so the preview always reads naturally.
  const firstName = (clientFirstName || '').trim().split(/\s+/)[0]
    || (isAr ? 'العميل' : 'the client');

  const previewLine = buildPreviewLine({
    preset,
    isAr,
    firstName,
    formattedTotal,
    isFreeSession,
  });

  const hintLine = buildHintLine({
    preset,
    isAr,
    isRecurring,
    invoiceMode,
    recurringCount,
    isNewClient,
    isFreeSession,
  });

  return (
    <div
      className="bg-white rounded-2xl border border-[#F0ECE8] p-4 sm:p-5 space-y-3"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-[#7A3B5E]">
          {isAr ? 'ما سيصل العميل' : 'What client receives'}
        </span>
      </div>

      {/* Preset rows */}
      <div className="space-y-2">
        {visibleRows.map(row => {
          const active = preset === row.key;
          const Icon = row.Icon;
          return (
            <button
              key={row.key}
              type="button"
              onClick={() => onChange(row.key)}
              className={`w-full text-start px-3 py-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                active
                  ? 'border-[#7A3B5E] bg-gradient-to-r from-[#FFFAF5] to-[#FDF6ED] shadow-sm'
                  : 'border-[#F0ECE8] bg-white hover:border-[#C8A97D]/40 hover:bg-[#FFFAF5]/40'
              }`}
            >
              <span
                className={`shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                  active ? 'border-[#7A3B5E]' : 'border-[#C4C0BC]'
                }`}
              >
                {active && <span className="w-2 h-2 rounded-full bg-[#7A3B5E]" />}
              </span>
              <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-[#7A3B5E]' : 'text-[#8E8E9F]'}`} />
              <span className="flex-1 min-w-0">
                <span className={`block text-sm font-semibold ${active ? 'text-[#4A4A5C]' : 'text-[#4A4A5C]'}`}>
                  {isAr ? row.labelAr : row.labelEn}
                </span>
                <span className="block text-[11px] text-[#8E8E9F] mt-0.5">
                  {isAr ? row.hintAr : row.hintEn}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Live preview line */}
      <div className="pt-3 border-t border-[#F0ECE8] space-y-1">
        <p className="text-[13px] leading-relaxed text-[#4A4A5C]">
          {previewLine}
        </p>
        {hintLine && (
          <p className="text-[11px] italic text-[#7A3B5E]/80 leading-relaxed">
            {hintLine}
          </p>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   Preview-line builder
   ────────────────────────────────────────────────────────────── */

function buildPreviewLine({
  preset,
  isAr,
  firstName,
  formattedTotal,
  isFreeSession,
}: {
  preset: EmailPreset;
  isAr: boolean;
  firstName: string;
  formattedTotal: string | null;
  isFreeSession: boolean;
}): string {
  if (preset === 'silent') {
    return isAr
      ? 'لن تُرسل أي رسائل. سيُسجَّل الحجز على تقويم الدكتورة هالة فقط.'
      : "No emails. Booking is logged on Dr. Hala's calendar only.";
  }

  // For free sessions, no invoice content regardless of preset.
  if (isFreeSession || preset === 'approval') {
    return isAr
      ? `سيتلقى ${firstName}: تأكيد الحجز مع رابط Google Meet.`
      : `${firstName} will receive: confirmation with Google Meet link.`;
  }

  if (preset === 'invoice') {
    const amount = formattedTotal
      ? (isAr ? ` (${formattedTotal}، رابط الدفع بالداخل)` : ` (${formattedTotal}, payment link inside)`)
      : (isAr ? ' (رابط الدفع بالداخل)' : ' (payment link inside)');
    return isAr
      ? `سيتلقى ${firstName}: فاتورة${amount}.`
      : `${firstName} will receive: invoice${amount}.`;
  }

  // 'both'
  const amount = formattedTotal
    ? (isAr ? ` (${formattedTotal}، رابط الدفع بالداخل)` : ` (${formattedTotal}, payment link inside)`)
    : (isAr ? ' (رابط الدفع بالداخل)' : ' (payment link inside)');
  return isAr
    ? `سيتلقى ${firstName}: تأكيد الحجز مع رابط Google Meet + فاتورة${amount}.`
    : `${firstName} will receive: confirmation with Google Meet link + invoice${amount}.`;
}

/* ──────────────────────────────────────────────────────────────
   Hint-line builder — context-aware extra detail (italic plum)
   ────────────────────────────────────────────────────────────── */

function buildHintLine({
  preset,
  isAr,
  isRecurring,
  invoiceMode,
  recurringCount,
  isNewClient,
  isFreeSession,
}: {
  preset: EmailPreset;
  isAr: boolean;
  isRecurring: boolean;
  invoiceMode: 'per-session' | 'bundled';
  recurringCount: number;
  isNewClient: boolean | null;
  isFreeSession: boolean;
}): string | null {
  // No hint for silent/approval-only/free.
  if (preset === 'silent') return null;
  if (isFreeSession) return null;
  if (preset === 'approval') return null;

  if (isRecurring && invoiceMode === 'bundled') {
    return isAr
      ? `الفاتورة المجمَّعة تشمل جميع الجلسات الـ${recurringCount}.`
      : `Bundle invoice covers all ${recurringCount} sessions.`;
  }
  if (isRecurring && invoiceMode === 'per-session') {
    return isAr
      ? 'فاتورة الجلسة الأولى الآن. الفواتير القادمة تُرسَل تلقائيًا قبل كل جلسة.'
      : 'First-session invoice now. Future invoices auto-send before each session.';
  }
  if (isNewClient === true) {
    return isAr
      ? 'عميل جديد — الفاتورة تتضمن رابط الدفع.'
      : 'First-time client — invoice includes payment link.';
  }
  return null;
}
