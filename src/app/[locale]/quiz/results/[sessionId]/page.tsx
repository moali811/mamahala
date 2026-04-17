'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, MessageCircle, Share2, Check, ArrowRight, ArrowLeft, ExternalLink, Download, Printer } from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { getQuizName } from '@/lib/quiz-share';
import Button from '@/components/ui/Button';
import { getBookingUrl } from '@/config/business';

interface SharedResult {
  name: string;
  email: string;
  quizSlug: string;
  quizName: string;
  sessionId: string;
  score: number;
  maxScore: number;
  tierKey: string;
  tierTitle: string;
  dimensions: Record<string, number> | null;
  dimensionLabels: Record<string, string> | null;
  dominantStyle: string | null;
  locale: string;
  shareUrl: string;
  sharedAt: string;
}

export default function ResultsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const sessionId = params?.sessionId as string;
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [result, setResult] = useState<SharedResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchResult() {
      try {
        const res = await fetch(`/api/quiz-results/${sessionId}`);
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        setResult(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    if (sessionId) fetchResult();
  }, [sessionId]);

  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-[#C8A97D] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-[#8E8E9F]">{isRTL ? 'جارٍ تحميلُ النتائج...' : 'Loading results...'}</p>
        </div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
            {isRTL ? 'النتائجُ غيرُ متاحة' : 'Results Not Available'}
          </h1>
          <p className="text-[#6B6580] mb-6">
            {isRTL
              ? 'قد تكونُ هذه النتائجُ قد انتهت صلاحيّتُها أو الرابطُ غيرُ صحيح.'
              : 'These results may have expired or the link may be incorrect.'}
          </p>
          <Button as="a" href={`/${locale}/resources/assessments`} icon={<ArrowIcon className="w-4 h-4" />}>
            {isRTL ? 'استكشِفْ التقييمات' : 'Explore Assessments'}
          </Button>
        </div>
      </div>
    );
  }

  const pct = result.maxScore > 0 ? Math.round((result.score / result.maxScore) * 100) : 0;
  const date = new Date(result.sharedAt).toLocaleDateString(isRTL ? 'ar-SA' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  const tierColor = result.tierKey === 'thriving' || result.tierKey === 'strong' || result.tierKey === 'well-prepared' || result.tierKey === 'living-with-purpose'
    ? '#25D366'
    : result.tierKey === 'needs-attention' || result.tierKey === 'developing' || result.tierKey === 'time-for-reset'
    ? '#C4878A'
    : '#C8A97D';

  const dimEntries = result.dimensions ? Object.entries(result.dimensions) : [];
  const dimCount = dimEntries.length;

  return (
    <>
      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          /* Hide non-printable elements */
          .no-print, header, footer, nav, .whatsapp-widget { display: none !important; }

          /* Reset background */
          body, html { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          /* Page setup */
          @page {
            size: A4;
            margin: 20mm 15mm;
          }

          /* Force colors */
          .print-card { box-shadow: none !important; border: 1px solid #E8E0D4 !important; break-inside: avoid; }
          .print-header { background: #F0D5CA !important; -webkit-print-color-adjust: exact; }
          .print-bar { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-score-circle { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .print-tier-badge { -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          /* Ensure full width */
          .print-container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
        }
      `}</style>

      <div className="min-h-screen bg-[#FAF7F2]" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header Bar — hidden on print */}
        <div className="bg-white border-b border-[#F3EFE8] no-print">
          <div className="container-main py-4 flex items-center justify-between">
            <Link href={`/${locale}`} className="flex items-center gap-2">
              <Image src="/images/logo-512.png" alt="Mama Hala" width={32} height={32} className="rounded-full" />
              <span className="text-sm font-semibold text-[#7A3B5E]">Mama Hala Consulting</span>
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7A3B5E] text-white text-sm font-medium hover:bg-[#5E2D48] transition-colors"
              >
                <Download className="w-4 h-4" />
                {isRTL ? 'تحميلُ PDF' : 'Download PDF'}
              </button>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAF7F2] border border-[#F3EFE8] text-sm text-[#4A4A5C] hover:bg-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-[#25D366]" /> : <Share2 className="w-4 h-4" />}
                {copied ? (isRTL ? 'تمّ!' : 'Copied!') : (isRTL ? 'نسخ' : 'Copy Link')}
              </button>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="container-main py-12 max-w-2xl mx-auto print-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-elevated)] border border-[#F3EFE8] print-card"
          >
            {/* Gradient Header */}
            <div className="bg-gradient-to-br from-[#F5E8E5] via-[#F8EDE8] to-[#FAF7F2] p-8 sm:p-10 print-header">
              {/* Logo for print */}
              <div className="hidden print:flex items-center justify-center gap-3 mb-4">
                <img src="/images/logo-512.png" alt="Mama Hala Consulting" width={40} height={40} className="rounded-full" />
                <span className="text-sm font-semibold text-[#7A3B5E]">Mama Hala Consulting</span>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C8A97D] mb-3">
                  {isRTL ? 'نتائجُ التقييم' : 'Assessment Results'}
                </p>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-1" style={{ fontFamily: 'Georgia, serif' }}>
                  {result.quizName || getQuizName(result.quizSlug, locale)}
                </h1>
                <p className="text-sm text-[#6B6580]">
                  {result.name} · {date}
                </p>
              </div>
            </div>

            {/* Score */}
            <div className="p-8 sm:p-10 text-center border-b border-[#F3EFE8]">
              <div
                className="inline-flex items-center justify-center w-28 h-28 rounded-full border-[4px] text-4xl font-bold mb-4 print-score-circle"
                style={{ borderColor: tierColor, color: tierColor }}
              >
                {result.dominantStyle ? '★' : `${pct}%`}
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                {result.tierTitle}
              </h2>
              {result.dominantStyle && (
                <p className="text-lg text-[#7A3B5E] font-semibold">{result.dominantStyle}</p>
              )}
              <p className="text-sm text-[#8E8E9F] mt-2">
                {isRTL ? `النتيجة: ${result.score} من ${result.maxScore}` : `Score: ${result.score} / ${result.maxScore}`}
              </p>
            </div>

            {/* Dimension Breakdown */}
            {dimEntries.length > 0 && result.dimensionLabels && (
              <div className="p-8 sm:p-10 border-b border-[#F3EFE8]">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C8A97D] mb-6">
                  {isRTL ? 'التحليلُ التفصيليّ' : 'Detailed Breakdown'}
                </p>
                <div className="space-y-5">
                  {dimEntries.map(([key, val]) => {
                    const label = result.dimensionLabels?.[key] || key;
                    const maxDim = dimCount > 0 ? result.maxScore / dimCount : result.maxScore;
                    const dimPct = maxDim > 0 ? Math.round(((val as number) / maxDim) * 100) : 0;
                    const isStrong = dimPct >= 70;
                    const isWeak = dimPct < 40;
                    return (
                      <div key={key}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-[#2D2A33]">{label}</span>
                          <span className="text-sm font-bold" style={{ color: isStrong ? '#25D366' : isWeak ? '#C4878A' : '#C8A97D' }}>
                            {val as number} <span className="text-[#8E8E9F] font-normal text-xs">/ {Math.round(maxDim)}</span>
                          </span>
                        </div>
                        <div className="h-3 bg-[#F3EFE8] rounded-full overflow-hidden print-bar">
                          <div
                            className="h-full rounded-full print-bar"
                            style={{
                              width: `${dimPct}%`,
                              backgroundColor: isStrong ? '#25D366' : isWeak ? '#C4878A' : '#C8A97D',
                            }}
                          />
                        </div>
                        <p className="text-[11px] text-[#8E8E9F] mt-1">
                          {isStrong
                            ? (isRTL ? 'نقطةُ قوّة — استمِرّ!' : 'Strength — keep it up!')
                            : isWeak
                            ? (isRTL ? 'مجالٌ للتطوير — نحنُ هنا لمُساعدتِك' : 'Area for growth — we\'re here to help')
                            : (isRTL ? 'أساسٌ جيّد — يمكنُ تعزيزُه' : 'Good foundation — can be strengthened')}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Insights Summary */}
            <div className="p-8 sm:p-10 border-b border-[#F3EFE8]">
              <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#C8A97D] mb-4">
                {isRTL ? 'خلاصةُ الرؤى' : 'Key Insights'}
              </p>
              <div className="space-y-3">
                {dimEntries.length > 0 && result.dimensionLabels ? (
                  <>
                    {/* Strongest dimension */}
                    {(() => {
                      const sorted = [...dimEntries].sort(([, a], [, b]) => (b as number) - (a as number));
                      const strongest = sorted[0];
                      const weakest = sorted[sorted.length - 1];
                      const strongLabel = result.dimensionLabels?.[strongest[0]] || strongest[0];
                      const weakLabel = result.dimensionLabels?.[weakest[0]] || weakest[0];
                      return (
                        <>
                          <div className="flex items-start gap-3 p-3 bg-[#25D366]/5 rounded-lg">
                            <span className="text-[#25D366] text-lg mt-0.5">●</span>
                            <div>
                              <p className="text-sm font-semibold text-[#2D2A33]">
                                {isRTL ? `أقوى مجالاتِك: ${strongLabel}` : `Your strongest area: ${strongLabel}`}
                              </p>
                              <p className="text-xs text-[#6B6580] mt-0.5">
                                {isRTL ? 'هذا يُظهرُ وعيًا وجهدًا حقيقيَّين.' : 'This shows real awareness and effort.'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-[#C4878A]/5 rounded-lg">
                            <span className="text-[#C4878A] text-lg mt-0.5">●</span>
                            <div>
                              <p className="text-sm font-semibold text-[#2D2A33]">
                                {isRTL ? `مجالٌ للنموّ: ${weakLabel}` : `Area for growth: ${weakLabel}`}
                              </p>
                              <p className="text-xs text-[#6B6580] mt-0.5">
                                {isRTL ? 'يمكنُ لجلسةٍ مع مستشارٍ أن تُحدثَ فَرقًا كبيرًا هنا.' : 'A session with a counselor can make a real difference here.'}
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </>
                ) : result.dominantStyle ? (
                  <div className="flex items-start gap-3 p-3 bg-[#7A3B5E]/5 rounded-lg">
                    <span className="text-[#7A3B5E] text-lg mt-0.5">★</span>
                    <div>
                      <p className="text-sm font-semibold text-[#2D2A33]">
                        {isRTL ? `نمطُك السائد: ${result.dominantStyle}` : `Your dominant style: ${result.dominantStyle}`}
                      </p>
                      <p className="text-xs text-[#6B6580] mt-0.5">
                        {isRTL ? 'كلُّ نمطٍ له نقاطُ قوّةٍ فريدة.' : 'Every style has unique strengths.'}
                      </p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[#6B6580]">
                    {isRTL ? 'نتائجُك تعكسُ حالتَك الحاليّة — وهي نقطةُ انطلاقٍ قيّمة.' : 'Your results reflect where you are now — a valuable starting point.'}
                  </p>
                )}
              </div>
            </div>

            {/* CTA — hidden on print */}
            <div className="p-8 sm:p-10 text-center bg-[#FAF7F2] no-print">
              <p className="text-sm text-[#6B6580] mb-5">
                {isRTL
                  ? 'هل تودُّ مناقشةَ نتائجِك مع مستشارٍ مؤهَّل؟'
                  : 'Want to discuss your results with a qualified counselor?'}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button as="a" href={getBookingUrl(locale as string)} size="md" icon={<Calendar className="w-4 h-4" />}>
                  {isRTL ? 'احجزْ جلسة' : 'Book a Session'}
                </Button>
                <Button as="a" href="https://wa.me/16132222104" target="_blank" variant="outline" size="md" icon={<MessageCircle className="w-4 h-4" />}>
                  WhatsApp
                </Button>
              </div>
            </div>

            {/* Print CTA — only visible on print */}
            <div className="hidden print:block p-8 text-center bg-[#FAF7F2]">
              <p className="text-sm text-[#6B6580] mb-2">
                {isRTL ? 'لمناقشةِ هذه النتائج:' : 'To discuss these results:'}
              </p>
              <p className="text-sm font-semibold text-[#7A3B5E]">mamahala.ca · admin@mamahala.ca · WhatsApp: +1 613-222-2104</p>
            </div>

            {/* Disclaimer */}
            <div className="px-8 py-5 text-center border-t border-[#F3EFE8]">
              <p className="text-[10px] text-[#B0B0C0] leading-relaxed">
                {isRTL
                  ? 'هذا التقييمُ أداةٌ تعليميّةٌ للتأمُّلِ الذاتيّ وليسَ تشخيصًا سريريًّا أو بديلًا عن الاستشارةِ المهنيّة.'
                  : 'This assessment is an educational self-reflection tool, not a clinical diagnosis or substitute for professional consultation.'}
              </p>
              <p className="text-[10px] text-[#B0B0C0] mt-1">
                Mama Hala Consulting · mamahala.ca · Session: {result.sessionId}
              </p>
            </div>
          </motion.div>

          {/* Take the quiz yourself — hidden on print */}
          <div className="text-center mt-8 no-print">
            <Link
              href={`/${locale}/quiz/${result.quizSlug}`}
              className="inline-flex items-center gap-2 text-sm text-[#7A3B5E] font-medium hover:underline"
            >
              <ExternalLink className="w-4 h-4" />
              {isRTL ? 'خذِ التقييمَ بنفسِك' : 'Take this assessment yourself'}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
