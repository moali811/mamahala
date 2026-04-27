'use client';

/* ================================================================
   Payment Concierge Page — /[locale]/pay/[token]
   ================================================================
   Public landing page shown to clients who click "Pay Online" in
   the invoice email. Fetches invoice data via /api/pay/lookup and
   presents payment options:

   1. Pay with Card (Stripe) — if cardPayUrl resolves
   2. Interac e-Transfer — if Canadian + allowETransfer
   3. International Wire — if configured in settings
   4. PayPal — if configured in settings

   Why this page exists: Mo can't currently generate a working
   STRIPE_SECRET_KEY, and the old email CTA pointed directly to a
   static $150 Stripe link. This page lets every invoice link work
   today, and auto-upgrades to dynamic Stripe sessions the moment
   the secret key is added to Vercel.

   Next.js 16: params is a Promise — use React's `use()` in client
   components.
   ================================================================ */

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CreditCard, Mail, Globe, DollarSign, Loader2, ShieldCheck,
  CheckCircle2, XCircle, Copy, ExternalLink, MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { PayConciergeData } from '@/app/api/pay/lookup/route';

export default function PayConciergePage({
  params,
}: {
  params: Promise<{ locale: string; token: string }>;
}) {
  const { locale, token } = use(params);
  const isRTL = locale === 'ar';

  const [data, setData] = useState<PayConciergeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorKind, setErrorKind] = useState<'notfound' | 'cancelled' | 'other'>('other');
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/pay/lookup?token=${encodeURIComponent(token)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          if (!cancelled) {
            // 410 = invoice was voided/cancelled. Show a distinct, clearer
            // message instead of the generic "Invoice Not Found" so the
            // client doesn't wonder if they typed the wrong URL.
            if (res.status === 410) {
              setErrorKind('cancelled');
              setError(body.error ?? 'This invoice has been cancelled');
            } else {
              setErrorKind('notfound');
              setError(body.error ?? 'Invoice not found');
            }
          }
          return;
        }
        const json = (await res.json()) as PayConciergeData;
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
          setErrorKind('other');
          setError(err instanceof Error ? err.message : 'Failed to load invoice');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [token]);

  const copyEmail = async () => {
    if (!data?.eTransfer) return;
    try {
      await navigator.clipboard.writeText(data.eTransfer.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  const copyField = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(key);
      setTimeout(() => setCopiedField(c => (c === key ? null : c)), 2000);
    } catch { /* clipboard unavailable */ }
  };

  // ─── Loading state ─────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-[#7A3B5E] animate-spin mx-auto mb-3" />
          <p className="text-sm text-[#8E8E9F]">
            {isRTL ? 'جارٍ تحميل تفاصيل الفاتورة...' : 'Loading invoice details...'}
          </p>
        </div>
      </div>
    );
  }

  // ─── Error state ───────────────────────────────────────
  if (error || !data) {
    // Different copy for "cancelled" vs "not found" so the client knows
    // whether to contact us or check their URL.
    const isCancelled = errorKind === 'cancelled';
    const titleEn = isCancelled ? 'Invoice Cancelled' : 'Invoice Not Found';
    const titleAr = isCancelled ? 'تم إلغاء الفاتورة' : 'لم يتم العثور على الفاتورة';
    const descriptionEn = isCancelled
      ? 'This invoice is no longer active. If you believe this is a mistake, please contact Mama Hala Consulting.'
      : (error || 'This link may have expired. Please check the URL in your invoice email.');
    const descriptionAr = isCancelled
      ? 'هذه الفاتورة لم تعد فعّالة. إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع ماما هالة للاستشارات.'
      : (error || 'قد يكون الرابط منتهي الصلاحية.');

    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-[#F0ECE8] text-center">
          <XCircle className={`w-12 h-12 mx-auto mb-3 ${isCancelled ? 'text-[#C8A97D]' : 'text-[#C45B5B]'}`} />
          <h1 className="text-xl font-bold text-[#2D2A33] mb-2">
            {isRTL ? titleAr : titleEn}
          </h1>
          <p className="text-sm text-[#8E8E9F] mb-6">
            {isRTL ? descriptionAr : descriptionEn}
          </p>
          {isCancelled ? (
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <a
                href="https://wa.me/16132222104"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 rounded-xl bg-[#3B8A6E] text-white text-sm font-semibold hover:bg-[#2F7A5E] transition-colors"
              >
                {isRTL ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
              </a>
              <a
                href="mailto:admin@mamahala.ca"
                className="inline-block px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-colors"
              >
                {isRTL ? 'بريد إلكتروني' : 'Email Us'}
              </a>
            </div>
          ) : (
            <Link
              href={`/${locale}`}
              className="inline-block px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-colors"
            >
              {isRTL ? 'العودة إلى الرئيسية' : 'Back to Home'}
            </Link>
          )}
        </div>
      </div>
    );
  }

  // ─── Paid state ────────────────────────────────────────
  if (data.status === 'paid') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-[#F0ECE8] text-center">
          <div className="w-16 h-16 rounded-full bg-[#F0FAF5] flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10 text-[#3B8A6E]" />
          </div>
          <h1 className="text-2xl font-bold text-[#2D2A33] mb-2">
            {isRTL ? 'تم الدفع' : 'Already Paid'}
          </h1>
          <p className="text-sm text-[#8E8E9F] mb-6">
            {isRTL
              ? `شكراً لك! تم استلام الدفعة مقابل الفاتورة ${data.invoiceNumber}.`
              : `Thank you! Payment for invoice ${data.invoiceNumber} has been received.`}
          </p>
          <Link
            href={`/${locale}/book/manage`}
            className="inline-block px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-colors"
          >
            {isRTL ? 'إدارة الحجوزات' : 'Manage Bookings'}
          </Link>
        </div>
      </div>
    );
  }

  // ─── Payment options ───────────────────────────────────
  const hasAnyMethod = data.cardPayUrl || data.eTransfer || data.gulfBank || data.wire || data.paypalLink;

  return (
    <div
      className="min-h-screen bg-[#FAF7F2] py-8 sm:py-12 px-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-xs uppercase tracking-widest text-[#C8A97D] font-semibold mb-2">
            {isRTL ? 'مجموعة ماما هالة للاستشارات' : 'Mama Hala Consulting Group'}
          </p>
          <div className="w-10 h-px bg-[#C8A97D] mx-auto" />
        </div>

        {/* Amount card — hero */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#F0ECE8] mb-5 text-center"
        >
          <p className="text-xs uppercase tracking-widest text-[#8E8E9F] font-semibold mb-3">
            {isRTL ? 'المبلغ المستحق' : 'Amount Due'}
          </p>
          <div className="text-4xl sm:text-5xl font-bold text-[#7A3B5E] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            {data.amount.formatted}
          </div>
          {data.amount.currency !== 'CAD' && (
            <p className="text-xs text-[#8E8E9F] italic">
              (≈ {data.amount.formattedCAD})
            </p>
          )}
          <div className="mt-5 pt-5 border-t border-[#F0ECE8] space-y-1.5">
            <p className="text-sm text-[#2D2A33] font-medium">{data.serviceName}</p>
            <p className="text-xs text-[#8E8E9F]">
              {isRTL ? 'فاتورة' : 'Invoice'} <span className="font-mono">{data.invoiceNumber}</span>
            </p>
            <p className="text-xs text-[#8E8E9F]">
              {isRTL ? 'العميل' : 'Billed to'}: {data.clientName}
            </p>
          </div>
        </motion.div>

        {/* Payment methods */}
        {!hasAnyMethod ? (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#F0ECE8] text-center">
            <p className="text-sm text-[#8E8E9F] mb-3">
              {isRTL
                ? 'يرجى التواصل معنا لترتيب الدفع.'
                : 'Please contact us to arrange payment.'}
            </p>
            <a
              href={`mailto:${data.contact.email}`}
              className="inline-block px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold"
            >
              {data.contact.email}
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Gulf bank transfer (Wio AED) — primary for UAE/GCC clients (no Stripe fees, native UX) */}
            {data.gulfBank && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#3B8A6E]/30"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FAF5] flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-[#3B8A6E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2D2A33] mb-0.5">
                      {isRTL
                        ? `حوّل ${data.amount.formatted} عبر التحويل البنكي المحلي`
                        : `Transfer ${data.amount.formatted} via local bank transfer`}
                    </p>
                    <p className="text-xs text-[#3B8A6E] font-medium">
                      {isRTL
                        ? `${data.gulfBank.bankName} · ${data.gulfBank.currency} · بدون رسوم`
                        : `${data.gulfBank.bankName} · ${data.gulfBank.currency} · no fees`}
                    </p>
                  </div>
                </div>

                {/* IBAN — primary copyable field */}
                <div className="bg-[#F0FAF5] rounded-lg p-3 mb-2">
                  <p className="text-[10px] font-semibold text-[#3B8A6E] uppercase tracking-[0.1em] mb-1">IBAN</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm font-mono text-[#2D6E54] font-semibold truncate" dir="ltr">
                      {data.gulfBank.iban}
                    </code>
                    <button
                      type="button"
                      onClick={() => copyField('iban', data.gulfBank!.iban)}
                      className="shrink-0 px-2.5 py-1 rounded-md bg-white border border-[#3B8A6E]/30 text-xs font-semibold text-[#3B8A6E] hover:bg-[#3B8A6E]/10 transition-colors flex items-center gap-1"
                    >
                      {copiedField === 'iban' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          {isRTL ? 'تم النسخ' : 'Copied'}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          {isRTL ? 'نسخ' : 'Copy'}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Account name + reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                  <div className="bg-[#FAF7F2] rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-[#8E8E9F] uppercase tracking-[0.1em] mb-1">
                      {isRTL ? 'اسم الحساب' : 'Account name'}
                    </p>
                    <p className="text-xs text-[#2D2A33] font-semibold">{data.gulfBank.accountName}</p>
                  </div>
                  <div className="bg-[#FAF7F2] rounded-lg p-3">
                    <p className="text-[10px] font-semibold text-[#8E8E9F] uppercase tracking-[0.1em] mb-1">
                      {isRTL ? 'مرجع / مذكّرة' : 'Reference / memo'}
                    </p>
                    <code className="text-xs font-mono text-[#2D2A33] font-semibold">{data.invoiceNumber}</code>
                  </div>
                </div>

                {/* Optional details — collapsed expandable for SWIFT / account number / branch */}
                <details className="bg-[#FAF7F2] rounded-lg overflow-hidden">
                  <summary className="px-3 py-2 text-[11px] font-semibold text-[#7A3B5E] cursor-pointer hover:bg-[#F0ECE8] transition-colors">
                    {isRTL ? 'تفاصيل إضافية (SWIFT، رقم الحساب، الفرع)' : 'More details (SWIFT, account #, branch)'}
                  </summary>
                  <div className="px-3 pb-3 pt-1 space-y-2 text-[11px]">
                    {data.gulfBank.accountNumber && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#8E8E9F]">{isRTL ? 'رقم الحساب' : 'Account #'}</span>
                        <div className="flex items-center gap-1.5">
                          <code className="font-mono text-[#2D2A33]">{data.gulfBank.accountNumber}</code>
                          <button
                            type="button"
                            onClick={() => copyField('account', data.gulfBank!.accountNumber!)}
                            className="text-[#7A3B5E] hover:underline text-[10px]"
                          >
                            {copiedField === 'account' ? (isRTL ? '✓' : '✓') : (isRTL ? 'نسخ' : 'copy')}
                          </button>
                        </div>
                      </div>
                    )}
                    {data.gulfBank.swift && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#8E8E9F]">SWIFT</span>
                        <div className="flex items-center gap-1.5">
                          <code className="font-mono text-[#2D2A33]" dir="ltr">{data.gulfBank.swift}</code>
                          <button
                            type="button"
                            onClick={() => copyField('swift', data.gulfBank!.swift!)}
                            className="text-[#7A3B5E] hover:underline text-[10px]"
                          >
                            {copiedField === 'swift' ? '✓' : (isRTL ? 'نسخ' : 'copy')}
                          </button>
                        </div>
                      </div>
                    )}
                    {data.gulfBank.routingCode && (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[#8E8E9F]">{isRTL ? 'رمز التوجيه' : 'Routing code'}</span>
                        <code className="font-mono text-[#2D2A33]">{data.gulfBank.routingCode}</code>
                      </div>
                    )}
                    {data.gulfBank.branch && (
                      <div className="flex flex-col gap-1">
                        <span className="text-[#8E8E9F]">{isRTL ? 'الفرع' : 'Branch'}</span>
                        <span className="text-[#2D2A33] leading-snug">{data.gulfBank.branch}</span>
                      </div>
                    )}
                  </div>
                </details>

                <p className="text-[10px] text-[#8E8E9F] leading-relaxed mt-2">
                  {isRTL
                    ? `سيستلم البنك التحويل خلال ساعات داخل الإمارات ودول الخليج. يُرجى إضافة رقم الفاتورة في خانة الملاحظات.`
                    : `Most UAE & GCC bank transfers arrive within hours. Please include the invoice number in the memo.`}
                </p>
              </motion.div>
            )}

            {/* Interac e-Transfer — primary for Canadian invoices (no Stripe fees) */}
            {data.eTransfer && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-white rounded-2xl p-5 shadow-sm border-2 border-[#3B8A6E]/30"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FAF5] flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6 text-[#3B8A6E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2D2A33] mb-0.5">
                      {isRTL ? `أرسل ${data.amount.formatted} عبر Interac` : `Send ${data.amount.formatted} by Interac e-Transfer`}
                    </p>
                    <p className="text-xs text-[#3B8A6E] font-medium">
                      {isRTL ? 'إيداع تلقائي · بدون رسوم · الأسرع' : 'Auto-deposit · no fees · fastest'}
                    </p>
                  </div>
                </div>
                <div className="bg-[#F0FAF5] rounded-lg p-3 mb-2">
                  <p className="text-[10px] font-semibold text-[#3B8A6E] uppercase tracking-[0.1em] mb-1">
                    {isRTL ? 'إلى' : 'Send to'}
                  </p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm font-mono text-[#2D6E54] font-semibold truncate">
                      {data.eTransfer.email}
                    </code>
                    <button
                      onClick={copyEmail}
                      className="shrink-0 px-2.5 py-1 rounded-md bg-white border border-[#3B8A6E]/30 text-xs font-semibold text-[#3B8A6E] hover:bg-[#3B8A6E]/10 transition-colors flex items-center gap-1"
                    >
                      {copiedEmail ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          {isRTL ? 'تم النسخ' : 'Copied'}
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          {isRTL ? 'نسخ' : 'Copy'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <div className="bg-[#FAF7F2] rounded-lg p-3 mb-2">
                  <p className="text-[10px] font-semibold text-[#8E8E9F] uppercase tracking-[0.1em] mb-1">
                    {isRTL ? 'مرجع / مذكّرة' : 'Reference / memo'}
                  </p>
                  <code className="text-sm font-mono text-[#2D2A33] font-semibold">
                    {data.invoiceNumber}
                  </code>
                </div>
                <p className="text-[11px] text-[#8E8E9F] leading-relaxed">
                  {data.eTransfer.instructions}
                </p>
              </motion.div>
            )}

            {/* Pay with Card (Stripe) — primary internationally, secondary for CA + Gulf */}
            {data.cardPayUrl && (() => {
              const localPrimary = !!data.eTransfer || !!data.gulfBank;
              return (
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: localPrimary ? 0.15 : 0.1 }}
                href={data.cardPayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block bg-white rounded-2xl overflow-hidden shadow-sm transition-all group ${
                  localPrimary
                    ? 'border border-[#F0ECE8] hover:border-[#7A3B5E]/40 hover:shadow-md'
                    : 'border border-[#F0ECE8] hover:border-[#3B8A6E] hover:shadow-md'
                }`}
              >
                {/* Primary CTA area */}
                <div className="p-5">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      localPrimary ? 'bg-[#FAF7F2] group-hover:bg-[#7A3B5E]/10' : 'bg-[#F0FAF5] group-hover:bg-[#3B8A6E]/15'
                    }`}>
                      <CreditCard className={`w-6 h-6 ${localPrimary ? 'text-[#7A3B5E]' : 'text-[#3B8A6E]'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#2D2A33] mb-0.5">
                        {localPrimary
                          ? (isRTL ? 'أو ادفع بالبطاقة' : 'Or pay by card')
                          : (isRTL ? `ادفع ${data.amount.formatted} بالبطاقة` : `Pay ${data.amount.formatted} with Card`)}
                      </p>
                      <p className="text-xs text-[#8E8E9F]">
                        {isRTL ? 'فيزا، ماستركارد، أبل باي — عبر Stripe' : 'Visa, Mastercard, Apple Pay — via Stripe'}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-[#8E8E9F] group-hover:text-[#3B8A6E] shrink-0" />
                  </div>
                </div>
                {/* Smart helper text — adapts to Stripe tier */}
                <div className="px-5 pb-4 pt-0">
                  {data.cardPayIsCheckoutSession ? (
                    <p className="text-[11px] text-[#3B8A6E] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      {isRTL
                        ? 'المبلغ محمّل تلقائياً — أدخل بيانات البطاقة فقط'
                        : 'Amount pre-filled — just enter your card details'}
                    </p>
                  ) : (
                    <div className="text-[11px] text-[#8E8E9F] bg-[#FFFAF5] rounded-lg p-2.5 space-y-1">
                      <p className="font-medium">
                        {isRTL ? 'إذا طُلب منك، أدخل:' : 'If prompted, enter:'}
                      </p>
                      <p>
                        {isRTL ? 'المبلغ' : 'Amount'}: <span className="font-semibold text-[#7A3B5E] font-mono">{data.amount.formatted}</span>
                      </p>
                      <p>
                        {isRTL ? 'مرجع' : 'Reference'}: <span className="font-semibold text-[#7A3B5E] font-mono">{data.invoiceNumber}</span>
                      </p>
                    </div>
                  )}
                </div>
              </motion.a>
              );
            })()}

            {/* Method 3: International Wire */}
            {data.wire && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0ECE8]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#F5F0EB] flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-[#7A3B5E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2D2A33] mb-0.5">
                      {isRTL ? 'التحويل البنكي الدولي' : 'International Wire Transfer'}
                    </p>
                    <p className="text-xs text-[#8E8E9F]">
                      {isRTL ? 'للعملاء خارج كندا' : 'For clients outside Canada'}
                    </p>
                  </div>
                </div>
                <pre className="text-[11px] bg-[#FAF7F2] rounded-lg p-3 text-[#4A4A5C] whitespace-pre-wrap font-mono leading-relaxed">
                  {data.wire.instructions}
                </pre>
                <p className="text-[11px] text-[#8E8E9F] mt-2">
                  {isRTL ? 'الرجاء الإشارة إلى' : 'Please reference'}:{' '}
                  <span className="font-mono font-semibold">{data.invoiceNumber}</span>
                </p>
              </motion.div>
            )}

            {/* Method 4: PayPal */}
            {data.paypalLink && (
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
                href={data.paypalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl p-5 shadow-sm border border-[#F0ECE8] hover:border-[#0070BA] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0F6FF] flex items-center justify-center shrink-0">
                    <span className="text-xl font-bold text-[#0070BA]">P</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2D2A33] mb-0.5">PayPal</p>
                    <p className="text-xs text-[#8E8E9F]">
                      {isRTL ? 'الدفع عبر PayPal' : 'Pay with your PayPal account'}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#8E8E9F] shrink-0" />
                </div>
              </motion.a>
            )}
          </div>
        )}

        {/* Trust row */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#8E8E9F]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#3B8A6E]" />
          <span>
            {isRTL ? 'جميع وسائل الدفع آمنة ومشفّرة' : 'All payment methods are secure and encrypted'}
          </span>
        </div>

        {/* Help — Call removed per Mo's request; WhatsApp + Email only */}
        <div className="mt-6 bg-white/60 rounded-2xl p-5 border border-[#F0ECE8]">
          <p className="text-[11px] uppercase tracking-widest text-[#8E8E9F] font-semibold mb-3 text-center">
            {isRTL ? 'تحتاج مساعدة؟' : 'Need Help?'}
          </p>
          <div className="flex items-center justify-center gap-4 text-xs">
            <a
              href={data.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#4A4A5C] hover:text-[#3B8A6E] transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp
            </a>
            <span className="w-px h-4 bg-[#E8E0D8]" />
            <a
              href={`mailto:${data.contact.email}`}
              className="flex items-center gap-1.5 text-[#4A4A5C] hover:text-[#7A3B5E] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              {isRTL ? 'البريد' : 'Email'}
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-[10px] text-center text-[#C0B8B0]">
          {isRTL
            ? '© 2026 مجموعة ماما هالة للاستشارات'
            : '© 2026 Mama Hala Consulting Group'}
        </p>
      </div>
    </div>
  );
}
