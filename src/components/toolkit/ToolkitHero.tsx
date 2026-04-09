'use client';

/* ================================================================
   ToolkitHero — dramatic hero section for toolkit landing pages.
   Full-width gradient, title, subtitle, optional quote, author
   badge, CTA buttons, and a decorative SVG illustration.
   ================================================================ */

import { motion } from 'framer-motion';
import { t } from '@/lib/academy-helpers';

interface Props {
  titleEn: string;
  titleAr: string;
  subtitleEn: string;
  subtitleAr: string;
  quoteEn?: string;
  quoteAr?: string;
  author: string;
  format: string; // 'journal' | 'workbook' | 'guide' | 'checklist'
  color: string;
  locale: string;
  isRTL: boolean;
  onStart?: () => void;
}

/* ── Decorative SVG ───────────────────────────────────────────── */
function DecorativeSVG({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full max-w-[360px] mx-auto"
      aria-hidden="true"
    >
      {/* Outer soft ring */}
      <circle cx="200" cy="200" r="180" stroke={color} strokeWidth="1.5" opacity="0.15" />
      <circle cx="200" cy="200" r="150" stroke={color} strokeWidth="1" opacity="0.12" />

      {/* Concentric filled circles */}
      <circle cx="200" cy="200" r="110" fill={color} opacity="0.06" />
      <circle cx="200" cy="200" r="75" fill={color} opacity="0.10" />
      <circle cx="200" cy="200" r="40" fill={color} opacity="0.18" />

      {/* Calming wave paths */}
      <path
        d="M40 220 Q100 180, 200 210 T360 200"
        stroke={color}
        strokeWidth="2"
        opacity="0.18"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M60 250 Q140 210, 220 245 T380 230"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.13"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M30 280 Q120 240, 210 275 T390 260"
        stroke={color}
        strokeWidth="1"
        opacity="0.10"
        fill="none"
        strokeLinecap="round"
      />

      {/* Accent dots */}
      <circle cx="130" cy="130" r="6" fill={color} opacity="0.20" />
      <circle cx="280" cy="150" r="4" fill={color} opacity="0.16" />
      <circle cx="170" cy="310" r="5" fill={color} opacity="0.14" />
      <circle cx="300" cy="290" r="3.5" fill={color} opacity="0.18" />

      {/* Petal / leaf shapes */}
      <ellipse
        cx="200"
        cy="200"
        rx="60"
        ry="20"
        transform="rotate(30 200 200)"
        stroke={color}
        strokeWidth="1"
        fill={color}
        opacity="0.06"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="60"
        ry="20"
        transform="rotate(-30 200 200)"
        stroke={color}
        strokeWidth="1"
        fill={color}
        opacity="0.06"
      />
      <ellipse
        cx="200"
        cy="200"
        rx="60"
        ry="20"
        transform="rotate(90 200 200)"
        stroke={color}
        strokeWidth="1"
        fill={color}
        opacity="0.06"
      />
    </svg>
  );
}

/* ── Format badge label ───────────────────────────────────────── */
function formatLabel(format: string, isRTL: boolean): string {
  const labels: Record<string, [string, string]> = {
    journal: ['Journal', '\u062f\u0641\u062a\u0631 \u064a\u0648\u0645\u064a\u0627\u062a'],
    workbook: ['Workbook', '\u0643\u0631\u0627\u0633\u0629 \u0639\u0645\u0644'],
    guide: ['Guide', '\u062f\u0644\u064a\u0644'],
    checklist: ['Checklist', '\u0642\u0627\u0626\u0645\u0629 \u0645\u0631\u0627\u062c\u0639\u0629'],
  };
  const pair = labels[format] ?? ['Toolkit', '\u0645\u062c\u0645\u0648\u0639\u0629 \u0623\u062f\u0648\u0627\u062a'];
  return isRTL ? pair[1] : pair[0];
}

/* ── Component ────────────────────────────────────────────────── */
export default function ToolkitHero({
  titleEn,
  titleAr,
  subtitleEn,
  subtitleAr,
  quoteEn,
  quoteAr,
  author,
  format,
  color,
  locale,
  isRTL,
  onStart,
}: Props) {
  const title = t(titleEn, titleAr, isRTL);
  const subtitle = t(subtitleEn, subtitleAr, isRTL);
  const quote =
    quoteEn && quoteAr ? t(quoteEn, quoteAr, isRTL) : quoteEn ?? null;

  const pdfHref = isRTL
    ? `/toolkits/pdf/ar/${locale}.pdf`
    : `/toolkits/pdf/${locale}.pdf`;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const },
    }),
  };

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative w-full overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}10 0%, ${color}06 40%, #FAF7F200 100%)`,
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* ── Text column ──────────────────────────────────── */}
          <motion.div
            className="flex flex-col gap-5"
            initial="hidden"
            animate="visible"
          >
            {/* Format badge */}
            <motion.span
              custom={0}
              variants={fadeUp}
              className="inline-block self-start rounded-full px-3.5 py-1 text-xs font-medium tracking-wide uppercase"
              style={{ backgroundColor: `${color}18`, color }}
            >
              {formatLabel(format, isRTL)}
            </motion.span>

            {/* Title */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-[#2D2A33]"
            >
              {title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={2}
              variants={fadeUp}
              className="text-base sm:text-lg text-[#4A4A5C] max-w-lg leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* Quote */}
            {quote && (
              <motion.blockquote
                custom={3}
                variants={fadeUp}
                className="relative mt-2 pl-5 rtl:pl-0 rtl:pr-5 border-l-2 rtl:border-l-0 rtl:border-r-2 italic text-[#4A4A5C]/80 text-sm sm:text-base leading-relaxed"
                style={{ borderColor: `${color}50` }}
              >
                <span
                  className="absolute -top-3 text-4xl font-serif leading-none select-none"
                  style={{ color: `${color}30`, left: isRTL ? 'auto' : '-2px', right: isRTL ? '-2px' : 'auto' }}
                  aria-hidden="true"
                >
                  {isRTL ? '\u201D' : '\u201C'}
                </span>
                {quote}
              </motion.blockquote>
            )}

            {/* Author badge */}
            <motion.div
              custom={4}
              variants={fadeUp}
              className="flex items-center gap-2 mt-1"
            >
              <span
                className="inline-flex items-center justify-center w-7 h-7 rounded-full text-white text-xs font-bold"
                style={{ backgroundColor: color }}
              >
                H
              </span>
              <span className="text-sm text-[#4A4A5C] font-medium">{author}</span>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              custom={5}
              variants={fadeUp}
              className="flex flex-wrap items-center gap-3 mt-3"
            >
              <button
                type="button"
                onClick={onStart}
                className="rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
                style={{ backgroundColor: '#7A3B5E' }}
              >
                {t('Start Your Journey', '\u0627\u0628\u062f\u0623 \u0631\u062d\u0644\u062a\u0643', isRTL)}
              </button>

              <a
                href={pdfHref}
                download
                className="rounded-lg border-2 px-6 py-3 text-sm font-semibold transition-colors hover:bg-[#FAF7F2]"
                style={{ borderColor: `${color}60`, color }}
              >
                {t('Download PDF', '\u062a\u062d\u0645\u064a\u0644 PDF', isRTL)}
              </a>
            </motion.div>
          </motion.div>

          {/* ── Illustration column ──────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            className="hidden md:flex items-center justify-center"
          >
            <DecorativeSVG color={color} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
