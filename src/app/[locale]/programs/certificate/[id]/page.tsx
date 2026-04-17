'use client';

/* ================================================================
   Certificate of Completion — "Your Parenting Portrait"
   A personal growth artifact, not a scroll.

   Public data (always shown):
     • Student name, program, date, modules, verification code
   Personal data (only when viewer's localStorage matches):
     • AI-generated summary in Dr. Hala's voice
     • Growth radar (baseline → outcome)
     • Your voice (reflection excerpts)
     • Journey stats
   ================================================================ */

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Award, CheckCircle, Calendar, BookOpen, Loader2, Share2, Copy, Check, Sparkles, Heart, Target, Download } from 'lucide-react';
import GrowthRadar from '@/components/academy/certificate/GrowthRadar';

interface CertificateData {
  certId: string;
  studentName: string;
  studentEmail?: string;
  programSlug: string;
  programTitle: string;
  programTitleAr: string;
  signedBy: string;
  completedAt: string;
  completedModules: number;
}

interface RadarDim {
  label: string;
  before: number;
  after: number;
}

const LEVEL_DIM_KEYS: Record<string, Record<number, string[]>> = {
  'intentional-parent': {
    1: ['Name feelings', 'Pause before reacting', 'Listen to understand', 'Limits with warmth'],
    2: ['Self-regulation', 'Repair with warmth', 'Daily connection', 'Fair sibling response'],
    3: ['Values-led parenting', 'Self-care', 'Cultural transmission', 'Emotional modeling'],
  },
};

export default function CertificatePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const certId = params?.id as string;
  const isRTL = locale === 'ar';

  const [cert, setCert] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<string | null>(null);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [radarDims, setRadarDims] = useState<RadarDim[]>([]);
  const [reflectionExcerpts, setReflectionExcerpts] = useState<string[]>([]);
  const [stats, setStats] = useState({ saved: 0, checkIns: 0, reflectionWords: 0 });
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const isOwnerRef = useRef(false);
  const certCardRef = useRef<HTMLDivElement>(null);
  const pdfCoreRef = useRef<HTMLDivElement>(null);

  // Fetch public cert data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/academy/certificate?email=verify&program=${certId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.certificate) setCert(data.certificate);
        }
      } catch {}
      setLoading(false);
    })();
  }, [certId]);

  // Gather personal journey data (only runs on student's own device)
  useEffect(() => {
    if (!cert) return;
    const email = typeof window !== 'undefined' ? localStorage.getItem('academy_email') : null;
    const isOwner = !!email && email.toLowerCase() === cert.studentEmail?.toLowerCase();
    isOwnerRef.current = isOwner;
    if (!isOwner) return;

    // Pull growth data from LevelAssessment localStorage
    const dims: RadarDim[] = [];
    const dimLabels = LEVEL_DIM_KEYS[cert.programSlug];
    if (dimLabels) {
      [1, 2, 3].forEach(level => {
        const labels = dimLabels[level];
        if (!labels) return;
        try {
          const baseRaw = localStorage.getItem(`academy:assessment:${cert.programSlug}:level-${level}:baseline`);
          const outRaw = localStorage.getItem(`academy:assessment:${cert.programSlug}:level-${level}:outcome`);
          if (baseRaw && outRaw) {
            const base = JSON.parse(baseRaw) as Record<number, number>;
            const out = JSON.parse(outRaw) as Record<number, number>;
            labels.forEach((label, i) => {
              if (base[i] != null && out[i] != null) {
                dims.push({ label, before: base[i], after: out[i] });
              }
            });
          }
        } catch {}
      });
    }
    setRadarDims(dims);

    // Collect reflection excerpts (pick 2-3 longest)
    const allReflections: string[] = [];
    let totalWords = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(`academy:block-reflection:${cert.programSlug}:`) || key === `academy:reflection:${cert.programSlug}:${cert.programSlug}`) {
          const value = localStorage.getItem(key);
          if (value && value.trim().length > 20) {
            allReflections.push(value.trim());
            totalWords += value.trim().split(/\s+/).length;
          }
        }
      }
    } catch {}
    allReflections.sort((a, b) => b.length - a.length);
    setReflectionExcerpts(allReflections.slice(0, 3));

    // Count saved cards + challenge check-ins
    let savedCount = 0;
    let checkInCount = 0;
    try {
      const savedRaw = localStorage.getItem('academy:saved-cards');
      if (savedRaw) {
        const saved = JSON.parse(savedRaw);
        savedCount = saved.filter((c: { programSlug?: string }) => c.programSlug === cert.programSlug).length;
      }
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(`academy:challenge:${cert.programSlug}:`)) {
          const value = localStorage.getItem(key);
          if (value) {
            const data = JSON.parse(value);
            if (data.checkIns) checkInCount += Object.keys(data.checkIns).length;
          }
        }
      }
    } catch {}
    setStats({ saved: savedCount, checkIns: checkInCount, reflectionWords: totalWords });

    // Call AI summary endpoint
    setSummaryLoading(true);
    (async () => {
      try {
        const strongestGrowth = dims.length
          ? dims.reduce((a, b) => (b.after - b.before > a.after - a.before ? b : a)).label
          : undefined;
        const res = await fetch('/api/academy/certificate/personal-summary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            studentName: cert.studentName,
            programTitle: isRTL ? cert.programTitleAr : cert.programTitle,
            locale,
            modulesCompleted: cert.completedModules,
            reflectionExcerpts: allReflections.slice(0, 3),
            assessmentGrowth: dims,
            challengesCompleted: checkInCount,
            savedCards: savedCount,
            strongestGrowthArea: strongestGrowth,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.summary) setSummary(data.summary);
        }
      } catch {}
      setSummaryLoading(false);
    })();
  }, [cert, locale, isRTL]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const shareCertificate = async () => {
    if (!cert) return;
    const title = isRTL ? 'شَهادَةُ إتْمام — ماما هالة' : 'Certificate of Completion — Mama Hala Academy';
    const text = isRTL
      ? `أَتْمَمْتُ ${cert.programTitleAr} من أَكادِيمِيَّةِ ماما هالة!`
      : `I just completed ${cert.programTitle} at Mama Hala Academy!`;
    const url = window.location.href;
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to copy link
      }
    }
    // Fallback: copy link
    await copyLink();
  };

  const downloadPDF = async () => {
    if (!pdfCoreRef.current || !cert) return;
    setDownloading(true);
    try {
      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);
      const node = pdfCoreRef.current;
      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: '#FFFDFA',
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      // A4 landscape: 297 × 210 mm — classic certificate orientation
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4', compress: true });
      pdf.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
      const fname = `${cert.studentName.replace(/[^a-z0-9]+/gi, '_')}_${cert.certId}.pdf`;
      pdf.save(fname);
    } catch (err) {
      console.error('PDF download failed', err);
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" />
      </div>
    );
  }

  if (!cert) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <p className="text-[#8E8E9F]">{isRTL ? 'الشّهادة غَيْرُ مَوْجودَة' : 'Certificate not found'}</p>
      </div>
    );
  }

  const completedDate = new Date(cert.completedAt).toLocaleDateString(isRTL ? 'ar-EG' : 'en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      className="min-h-screen py-20"
      style={{ background: 'linear-gradient(180deg, #FAF5EC 0%, #F5EDDD 100%)' }}
    >
      <div className="container-main max-w-3xl">
        {/* Verified badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] text-xs font-semibold">
            <CheckCircle className="w-3.5 h-3.5" />
            {isRTL ? 'شَهادَةٌ مُوَثَّقَة' : 'Verified Certificate'}
          </span>
        </motion.div>

        {/* ────── The Certificate ────── */}
        <motion.div
          ref={certCardRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl border border-[#EDE3D0] overflow-hidden shadow-[0_4px_32px_-8px_rgba(122,59,94,0.08)]"
          style={{ background: 'linear-gradient(180deg, #FFFDFA 0%, #FDF9F1 100%)' }}
        >
          {/* Top gradient border */}
          <div className="h-2 bg-gradient-to-r from-[#7A3B5E] via-[#C8A97D] to-[#C4878A]" />

          <div className="relative p-8 sm:p-12">
            {/* Decorative corner ornaments */}
            <div
              className="absolute top-0 left-0 w-32 h-32 opacity-[0.05] pointer-events-none"
              style={{ background: 'radial-gradient(circle at top left, #7A3B5E, transparent 70%)' }}
            />
            <div
              className="absolute bottom-0 right-0 w-32 h-32 opacity-[0.05] pointer-events-none"
              style={{ background: 'radial-gradient(circle at bottom right, #C8A97D, transparent 70%)' }}
            />
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-[10px] text-[#C8A97D] uppercase tracking-[0.4em] mb-3">Mama Hala Academy</p>
              <Award className="w-10 h-10 text-[#C8A97D] mx-auto mb-5" />
              <h1 className="text-2xl sm:text-3xl text-[#2D2A33] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'شَهادَةُ إتْمام' : 'Certificate of Completion'}
              </h1>
              <p className="text-xs text-[#8E8E9F] mb-2">{isRTL ? 'هذا يَشْهَدُ بِأَنّ' : 'This certifies that'}</p>
              <h2 className="text-3xl sm:text-4xl text-[#7A3B5E] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                {cert.studentName}
              </h2>
              <p className="text-xs text-[#4A4A5C] mb-2">{isRTL ? 'أَتَمَّ بِنَجاح' : 'has successfully completed'}</p>
              <h3 className="text-lg font-bold text-[#2D2A33] mb-6" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? cert.programTitleAr : cert.programTitle}
              </h3>

              <div className="inline-flex items-center gap-5 text-xs text-[#8E8E9F]">
                <span className="inline-flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {completedDate}</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {cert.completedModules} {isRTL ? 'وِحْدَة' : 'modules'}</span>
              </div>
            </div>

            {/* ────── Personal sections (owner only) ────── */}
            {(summary || summaryLoading) && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-10"
              >
                <div className="flex items-center gap-2.5 mb-4 justify-center">
                  <span className="h-px w-8 bg-[#E8D8C4]" />
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A97D]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8E8E9F]">
                    {isRTL ? 'كَلِمَةٌ شَخْصِيَّةٌ من الدّكتورة هالة' : "A Personal Note From Dr. Hala"}
                  </p>
                  <Sparkles className="w-3.5 h-3.5 text-[#C8A97D]" />
                  <span className="h-px w-8 bg-[#E8D8C4]" />
                </div>
                {summaryLoading ? (
                  <div className="flex items-center justify-center gap-2 text-sm text-[#8E8E9F] italic py-8">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {isRTL ? 'تُكَوِّنُ رِسالَتَكِ…' : 'Writing your note…'}
                  </div>
                ) : summary ? (
                  <div
                    className="relative rounded-2xl px-7 py-8 sm:px-10 sm:py-10"
                    style={{
                      background: 'linear-gradient(180deg, #FEFCF8 0%, #FAF2E6 100%)',
                      border: '1px solid #F0E4D0',
                    }}
                  >
                    <span
                      className={`absolute top-3 ${isRTL ? 'right-5' : 'left-5'} text-[64px] leading-none text-[#C8A97D] opacity-30 select-none`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                      aria-hidden
                    >
                      &ldquo;
                    </span>
                    <p
                      className="relative text-[16px] sm:text-[17px] text-[#2D2A33] leading-[1.85] italic"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {summary}
                    </p>
                    <div className={`flex items-center gap-2 mt-5 ${isRTL ? 'justify-start flex-row-reverse' : 'justify-end'}`}>
                      <span className="h-px w-6 bg-[#C8A97D]" />
                      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7A3B5E]">
                        {isRTL ? 'د. هالة' : 'Dr. Hala'}
                      </span>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}

            {/* Growth Radar (owner only, if data) */}
            {radarDims.length >= 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="border-t border-[#F3EFE8] pt-8 mt-8"
              >
                <div className="flex items-center gap-2 mb-4 justify-center">
                  <Target className="w-4 h-4 text-[#7A3B5E]" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8E8E9F]">
                    {isRTL ? 'خَريطَةُ نُمُوِّك' : 'Your Growth Map'}
                  </p>
                </div>
                <GrowthRadar dimensions={radarDims} color="#7A3B5E" />
                <div className="flex items-center justify-center gap-5 mt-3 text-[10px] text-[#8E8E9F]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-[2px] bg-[#B0B0C0] border-dashed" style={{ borderBottom: '1px dashed #B0B0C0' }} />
                    {isRTL ? 'البِدايَة' : 'Before'}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-3 h-[2px]" style={{ backgroundColor: '#7A3B5E' }} />
                    {isRTL ? 'الآن' : 'After'}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Journey Stats (owner only) */}
            {isOwnerRef.current && (stats.reflectionWords > 0 || stats.checkIns > 0 || stats.saved > 0) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="border-t border-[#F3EFE8] pt-8 mt-8"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8E8E9F] text-center mb-4">
                  {isRTL ? 'رِحْلَتُكِ بِالأَرْقام' : 'Your Journey in Numbers'}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {stats.reflectionWords > 0 && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#7A3B5E]" style={{ fontFamily: 'var(--font-heading)' }}>{stats.reflectionWords}</p>
                      <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{isRTL ? 'كَلِمَةُ تَأَمُّل' : 'reflection words'}</p>
                    </div>
                  )}
                  {stats.checkIns > 0 && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#3B8A6E]" style={{ fontFamily: 'var(--font-heading)' }}>{stats.checkIns}</p>
                      <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{isRTL ? 'مُمارَسَةٌ يَوْميّة' : 'daily check-ins'}</p>
                    </div>
                  )}
                  {stats.saved > 0 && (
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#C8A97D]" style={{ fontFamily: 'var(--font-heading)' }}>{stats.saved}</p>
                      <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{isRTL ? 'بِطاقَةٌ مَحْفوظَة' : 'cards saved'}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Your Voice (owner only) */}
            {reflectionExcerpts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="border-t border-[#F3EFE8] pt-8 mt-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="w-4 h-4 text-[#C4878A]" fill="#C4878A" />
                  <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8E8E9F]">
                    {isRTL ? 'مِنْ كَلِماتِكِ أَنْتِ' : 'Your Own Words'}
                  </p>
                </div>
                <div className="space-y-3">
                  {reflectionExcerpts.slice(0, 2).map((r, i) => (
                    <blockquote
                      key={i}
                      className="border-l-2 border-[#C4878A] pl-4 py-1 text-sm text-[#4A4A5C] italic leading-relaxed"
                    >
                      &ldquo;{r.length > 200 ? r.slice(0, 200) + '…' : r}&rdquo;
                    </blockquote>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Signature */}
            <div className="border-t border-[#F3EFE8] pt-8 mt-8 text-center">
              <p className="text-xl text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{cert.signedBy}</p>
              <p className="text-[10px] text-[#8E8E9F] mt-1">{isRTL ? 'مُؤَسِّسَة · ماما هالة' : 'Founder · Mama Hala Consulting'}</p>
              <p className="text-[9px] text-[#B0B0C0] font-mono mt-4 tracking-wider">{cert.certId}</p>
            </div>
          </div>
        </motion.div>

        {/* Share Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-3 mt-6"
        >
          <button
            onClick={downloadPDF}
            disabled={downloading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-semibold hover:shadow-md transition-all disabled:opacity-60 disabled:cursor-wait"
            style={{ backgroundColor: '#7A3B5E' }}
          >
            {downloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {downloading ? (isRTL ? 'جاري التَّحْميل…' : 'Preparing…') : (isRTL ? 'حَمِّلي PDF' : 'Download PDF')}
          </button>
          <button
            onClick={shareCertificate}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#F3EFE8] text-[#2D2A33] text-xs font-semibold hover:bg-[#FAF7F2] transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            {isRTL ? 'شارِكي' : 'Share'}
          </button>
          <button
            onClick={copyLink}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#F3EFE8] text-[#2D2A33] text-xs font-semibold hover:bg-[#FAF7F2] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#3B8A6E]" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? (isRTL ? 'تَمَّ النَّسْخ' : 'Copied!') : (isRTL ? 'اِنْسَخي الرّابِط' : 'Copy link')}
          </button>
        </motion.div>

        <p className="text-center text-[10px] text-[#B0B0C0] mt-6">
          Mama Hala Consulting · mamahala.ca
        </p>
      </div>

      {/* ────── Hidden landscape certificate — rendered to PDF only ────── */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          left: '-10000px',
          top: 0,
          pointerEvents: 'none',
          width: '1123px',
          height: '794px',
        }}
      >
        <div
          ref={pdfCoreRef}
          dir="ltr"
          style={{
            width: '1123px',
            height: '794px',
            background: '#FFFDF8',
            boxSizing: 'border-box',
            padding: '0',
            fontFamily: "Georgia, 'Times New Roman', serif",
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* ── Background ── */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #FFFEF9 0%, #FAF5EC 60%, #F3EADB 100%)' }} />

          {/* Centered watermark */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-square.png"
            alt=""
            role="presentation"
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '340px', height: '340px',
              opacity: 0.035, pointerEvents: 'none', objectFit: 'contain',
            }}
          />

          {/* Gold border */}
          <div style={{ position: 'absolute', inset: '16px', border: '2px solid #D4B98E', pointerEvents: 'none' }} />
          {/* Inner thin border */}
          <div style={{ position: 'absolute', inset: '22px', border: '0.5px solid rgba(122,59,94,0.15)', pointerEvents: 'none' }} />

          {/* Top accent bar */}
          <div style={{ position: 'absolute', top: '16px', left: '16px', right: '16px', height: '5px', background: 'linear-gradient(90deg, #7A3B5E, #C8A97D, #7A3B5E)' }} />
          {/* Bottom accent bar */}
          <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px', height: '3px', background: 'linear-gradient(90deg, #C8A97D, #7A3B5E, #C8A97D)' }} />

          {/* ── Content: single centered column ── */}
          <div style={{
            position: 'absolute',
            inset: '40px 80px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            textAlign: 'center',
          }}>

            {/* Row 1: Academy name — centered text only */}
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '14px', color: '#7A3B5E', letterSpacing: '0.25em', textTransform: 'uppercase', margin: 0, fontWeight: 700 }}>
                Mama Hala Academy
              </p>
              <p style={{ fontSize: '9px', color: '#8E8E9F', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '4px 0 0', fontWeight: 400 }}>
                Mama Hala Consulting Group
              </p>
            </div>

            {/* Row 2: Title */}
            <div>
              <p style={{ fontSize: '10px', color: '#C8A97D', letterSpacing: '0.35em', textTransform: 'uppercase', margin: '0 0 12px', fontWeight: 600 }}>
                Certificate of Achievement
              </p>
              <h1 style={{
                fontSize: '52px', color: '#2D2A33', margin: 0, fontWeight: 400,
                letterSpacing: '0.02em', lineHeight: 1,
              }}>
                Certificate of Completion
              </h1>
            </div>

            {/* Row 3: Recipient */}
            <div>
              <p style={{ fontSize: '11px', color: '#8E8E9F', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 14px', fontWeight: 500 }}>
                This is proudly presented to
              </p>
              <h2 style={{
                fontSize: '62px', color: '#7A3B5E', margin: 0, fontWeight: 400,
                lineHeight: 1, letterSpacing: '0.01em', fontStyle: 'italic',
              }}>
                {cert.studentName}
              </h2>
              <div style={{ width: '280px', height: '2px', background: 'linear-gradient(90deg, transparent, #C8A97D, transparent)', margin: '24px auto 0' }} />
            </div>

            {/* Row 4: Program details */}
            <div>
              <p style={{ fontSize: '13px', color: '#4A4A5C', margin: '0 0 8px', fontStyle: 'italic' }}>
                for successfully completing the program
              </p>
              <h3 style={{ fontSize: '28px', color: '#2D2A33', margin: 0, fontWeight: 700, letterSpacing: '0.01em' }}>
                {isRTL ? cert.programTitleAr : cert.programTitle}
              </h3>
              <p style={{ fontSize: '11px', color: '#8E8E9F', margin: '8px 0 0' }}>
                {cert.completedModules} modules · {completedDate}
              </p>
            </div>

            {/* Row 5: Signature + Verification */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', gap: '60px' }}>
              {/* Signature */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{
                  fontSize: '32px', color: '#3A2040', margin: '0 0 6px',
                  fontStyle: 'italic', fontWeight: 400,
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  letterSpacing: '0.02em',
                }}>
                  Hala Ali
                </p>
                <div style={{ width: '200px', height: '1px', background: '#2D2A33', margin: '0 auto 6px' }} />
                <p style={{ fontSize: '12px', color: '#2D2A33', margin: 0, fontWeight: 600 }}>Dr. Hala Ali</p>
                <p style={{ fontSize: '8px', color: '#8E8E9F', margin: '2px 0 0', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Founder &amp; Lead Counselor
                </p>
              </div>

              {/* Seal */}
              <div style={{ textAlign: 'center', flex: 0 }}>
                <div style={{
                  width: '70px', height: '70px', borderRadius: '50%',
                  border: '2px solid #C8A97D',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(200,169,125,0.06)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/logo-square.png" alt="Mama Hala Consulting seal" crossOrigin="anonymous" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                </div>
              </div>

              {/* Verification */}
              <div style={{ textAlign: 'center', flex: 1 }}>
                <p style={{ fontSize: '8px', color: '#8E8E9F', margin: 0, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Certificate ID</p>
                <p style={{ fontSize: '10px', color: '#2D2A33', margin: '4px 0 0', fontFamily: "Monaco, 'Courier New', monospace", letterSpacing: '0.05em' }}>
                  {cert.certId}
                </p>
                <p style={{ fontSize: '8px', color: '#8E8E9F', margin: '6px 0 0', letterSpacing: '0.1em' }}>
                  verify at mamahala.ca
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
