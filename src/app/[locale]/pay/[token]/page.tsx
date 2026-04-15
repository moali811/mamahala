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
  const [loading, setLoading] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/pay/lookup?token=${encodeURIComponent(token)}`);
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          if (!cancelled) setError(body.error ?? 'Invoice not found');
          return;
        }
        const json = (await res.json()) as PayConciergeData;
        if (!cancelled) setData(json);
      } catch (err) {
        if (!cancelled) {
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm border border-[#F0ECE8] text-center">
          <XCircle className="w-12 h-12 text-[#C45B5B] mx-auto mb-3" />
          <h1 className="text-xl font-bold text-[#2D2A33] mb-2">
            {isRTL ? 'لم يتم العثور على الفاتورة' : 'Invoice Not Found'}
          </h1>
          <p className="text-sm text-[#8E8E9F] mb-6">
            {error || (isRTL ? 'قد يكون الرابط منتهي الصلاحية.' : 'This link may have expired.')}
          </p>
          <Link
            href={`/${locale}`}
            className="inline-block px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-colors"
          >
            {isRTL ? 'العودة إلى الرئيسية' : 'Back to Home'}
          </Link>
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
  const hasAnyMethod = data.cardPayUrl || data.eTransfer || data.wire || data.paypalLink;

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
            {/* Method 1: Pay with Card (Stripe) */}
            {data.cardPayUrl && (
              <motion.a
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                href={data.cardPayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white rounded-2xl p-5 shadow-sm border border-[#F0ECE8] hover:border-[#3B8A6E] hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F0FAF5] flex items-center justify-center shrink-0 group-hover:bg-[#3B8A6E]/15 transition-colors">
                    <CreditCard className="w-6 h-6 text-[#3B8A6E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2D2A33] mb-0.5">
                      {isRTL ? 'الدفع بالبطاقة' : 'Pay with Card'}
                    </p>
                    <p className="text-xs text-[#8E8E9F]">
                      {isRTL ? 'فيزا، ماستركارد، أبل باي — عبر Stripe' : 'Visa, Mastercard, Apple Pay — via Stripe'}
                    </p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-[#8E8E9F] group-hover:text-[#3B8A6E] shrink-0" />
                </div>
                {/* Amount + Invoice Number hints — shown when the linked Stripe
                    Payment Link is a "customer chooses what to pay" product with
                    our required custom field. Always shows both even in the
                    dynamic-session case because the copy is short and harmless
                    there (the session pre-fills everything so the hints are
                    just reassuring confirmation). */}
                <div className="mt-3 pt-3 border-t border-dashed border-[#F0ECE8] space-y-1.5">
                  <p className="text-[11px] text-[#8E8E9F] font-medium">
                    {isRTL ? 'عند الدفع على Stripe، أدخل:' : 'On the Stripe page, please enter:'}
                  </p>
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-[#C8A97D] font-bold shrink-0">•</span>
                    <p className="text-[11px] text-[#4A4A5C]">
                      <span className="text-[#8E8E9F]">{isRTL ? 'المبلغ: ' : 'Amount: '}</span>
                      <span className="font-semibold text-[#7A3B5E] font-mono">{data.amount.formatted}</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[11px] text-[#C8A97D] font-bold shrink-0">•</span>
                    <p className="text-[11px] text-[#4A4A5C]">
                      <span className="text-[#8E8E9F]">{isRTL ? 'رقم الفاتورة: ' : 'Invoice Number: '}</span>
                      <span className="font-semibold text-[#7A3B5E] font-mono">{data.invoiceNumber}</span>
                    </p>
                  </div>
                </div>
              </motion.a>
            )}

            {/* Method 2: Interac e-Transfer */}
            {data.eTransfer && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="bg-white rounded-2xl p-5 shadow-sm border border-[#F0ECE8]"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#FFFAF5] flex items-center justify-center shrink-0">
                    <DollarSign className="w-6 h-6 text-[#C8A97D]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#2D2A33] mb-0.5">
                      {isRTL ? 'تحويل Interac (كندا)' : 'Interac e-Transfer (Canada)'}
                    </p>
                    <p className="text-xs text-[#8E8E9F]">
                      {isRTL ? 'الطريقة الأسرع للعملاء الكنديين' : 'Fastest method for Canadian clients'}
                    </p>
                  </div>
                </div>
                <div className="bg-[#FFFAF5] rounded-lg p-3 mb-2">
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-sm font-mono text-[#7A3B5E] font-semibold truncate">
                      {data.eTransfer.email}
                    </code>
                    <button
                      onClick={copyEmail}
                      className="shrink-0 px-2.5 py-1 rounded-md bg-white border border-[#C8A97D]/30 text-xs font-semibold text-[#C8A97D] hover:bg-[#C8A97D]/10 transition-colors flex items-center gap-1"
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
                <p className="text-[11px] text-[#8E8E9F] leading-relaxed">
                  {data.eTransfer.instructions}
                </p>
              </motion.div>
            )}

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
