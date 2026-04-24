'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TourSpotlightProps {
  /** Data-tour attribute value of the element to highlight. */
  targetKey: string;
  /** Tooltip heading. */
  title: string;
  /** Tooltip body. */
  body: string;
  /** Primary (Next) button label. */
  nextLabel: string;
  /** Back button label. Hidden when `showBack` is false. */
  backLabel: string;
  /** Dismiss link label (small, below buttons). */
  dismissLabel: string;
  /** Step N of M indicator, pre-formatted (e.g. "2 / 5"). */
  stepLabel: string;
  /** Writing direction. Flips tooltip side + button order. */
  isRTL: boolean;
  /** Show the Back button (false on step 1). */
  showBack: boolean;
  onNext: () => void;
  onBack: () => void;
  onDismiss: () => void;
}

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

const TOOLTIP_WIDTH = 320;
const TOOLTIP_GAP = 12;
const VIEWPORT_MARGIN = 12;
// Below this viewport width we switch to a bottom-sheet tooltip so the
// spotlight has room to breathe above. On a 390px iPhone the old
// "float next to target" placement crammed a 320px tooltip into the
// middle of the screen, disconnected from its target, and produced
// the "4 / 3" bidi artifact in RTL (fixed by wrapping the step
// counter in dir="ltr" regardless of viewport).
const MOBILE_BREAKPOINT = 560;

/**
 * Overlay + spotlight hole + tooltip anchored next to the highlighted element.
 * Recomputes position on resize, scroll, and target mutation. RTL-aware:
 * in RTL the tooltip prefers the LEFT side of the target (reading flow).
 * On mobile (viewport < MOBILE_BREAKPOINT) renders as a bottom-sheet.
 */
export default function TourSpotlight({
  targetKey, title, body, nextLabel, backLabel, dismissLabel, stepLabel,
  isRTL, showBack, onNext, onBack, onDismiss,
}: TourSpotlightProps) {
  const [rect, setRect] = useState<Rect | null>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const measure = useCallback(() => {
    // Multiple elements can share a data-tour key — the program grid
    // renders 4 cards on the same page, each with identical data-tour
    // attributes, and on mobile the carousel zero-sizes the inactive
    // cards. Pick the first non-zero-sized match so the spotlight
    // highlights the visible instance.
    const all = document.querySelectorAll<HTMLElement>(`[data-tour="${targetKey}"]`);
    let chosen: HTMLElement | null = null;
    for (const el of Array.from(all)) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) { chosen = el; break; }
    }
    if (!chosen) { setRect(null); return; }
    const r = chosen.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    setViewport({ w: window.innerWidth, h: window.innerHeight });
  }, [targetKey]);

  // Measure on mount + target change. Scrolling into view is handled by the
  // parent (ProgramsTour) before rendering the spotlight — here we only
  // measure the current position.
  useEffect(() => {
    measure();
  }, [targetKey, measure]);

  // Track resize + scroll for position updates.
  useEffect(() => {
    const onChange = () => measure();
    window.addEventListener('resize', onChange);
    window.addEventListener('scroll', onChange, { passive: true, capture: true });
    return () => {
      window.removeEventListener('resize', onChange);
      window.removeEventListener('scroll', onChange, { capture: true });
    };
  }, [measure]);

  // Focus the Next button when step enters for keyboard users.
  useEffect(() => {
    const el = tooltipRef.current?.querySelector<HTMLButtonElement>('[data-tour-next]');
    el?.focus();
  }, [targetKey]);

  // Respect reduced motion.
  const reducedMotion = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  if (!rect) return null;

  const isMobile = viewport.w < MOBILE_BREAKPOINT;

  // On mobile, sidestep the float-near-target dance entirely — pin the
  // tooltip to the bottom of the viewport as a sheet. The spotlight
  // stays above, so the target → tooltip visual connection works via
  // the glow ring rather than physical proximity.
  let tipTop: number;
  let tipLeft: number;
  let tipWidth: number;

  if (isMobile) {
    tipWidth = viewport.w - VIEWPORT_MARGIN * 2;
    tipLeft = VIEWPORT_MARGIN;
    tipTop = viewport.h - 220 - VIEWPORT_MARGIN;
  } else {
    tipWidth = TOOLTIP_WIDTH;

    // Choose tooltip side. In RTL, prefer LEFT of the target (reading flow).
    // In LTR, prefer RIGHT. If not enough horizontal room, fall back to below.
    const rightSpace = viewport.w - (rect.left + rect.width);
    const leftSpace = rect.left;
    const canPlaceRight = rightSpace >= tipWidth + TOOLTIP_GAP + VIEWPORT_MARGIN;
    const canPlaceLeft = leftSpace >= tipWidth + TOOLTIP_GAP + VIEWPORT_MARGIN;

    let placement: 'right' | 'left' | 'bottom' = 'bottom';
    if (isRTL) placement = canPlaceLeft ? 'left' : canPlaceRight ? 'right' : 'bottom';
    else placement = canPlaceRight ? 'right' : canPlaceLeft ? 'left' : 'bottom';

    tipTop = rect.top;
    tipLeft = 0;
    if (placement === 'right') tipLeft = rect.left + rect.width + TOOLTIP_GAP;
    else if (placement === 'left') tipLeft = rect.left - tipWidth - TOOLTIP_GAP;
    else {
      tipTop = rect.top + rect.height + TOOLTIP_GAP;
      tipLeft = Math.max(VIEWPORT_MARGIN, Math.min(
        rect.left + rect.width / 2 - tipWidth / 2,
        viewport.w - tipWidth - VIEWPORT_MARGIN,
      ));
    }
    tipTop = Math.max(VIEWPORT_MARGIN, Math.min(tipTop, viewport.h - 220));
  }

  // Spotlight geometry (add a little padding around the target).
  const PAD = 6;
  const holeTop = rect.top - PAD;
  const holeLeft = rect.left - PAD;
  const holeW = rect.width + PAD * 2;
  const holeH = rect.height + PAD * 2;

  const motionProps = reducedMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.96 },
      transition: { duration: 0.22 },
    };

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" aria-live="polite">
      {/* Four dimmed quadrants around the spotlight — leaves the target tappable. */}
      <div className="pointer-events-auto">
        {/* top */}
        <div
          onClick={onDismiss}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, height: Math.max(0, holeTop), background: 'rgba(20,15,25,0.55)' }}
        />
        {/* bottom */}
        <div
          onClick={onDismiss}
          style={{ position: 'fixed', top: holeTop + holeH, left: 0, right: 0, bottom: 0, background: 'rgba(20,15,25,0.55)' }}
        />
        {/* left */}
        <div
          onClick={onDismiss}
          style={{ position: 'fixed', top: holeTop, left: 0, width: Math.max(0, holeLeft), height: holeH, background: 'rgba(20,15,25,0.55)' }}
        />
        {/* right */}
        <div
          onClick={onDismiss}
          style={{ position: 'fixed', top: holeTop, left: holeLeft + holeW, right: 0, height: holeH, background: 'rgba(20,15,25,0.55)' }}
        />
      </div>

      {/* Soft glow ring around the spotlight (decorative, non-interactive). */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          top: holeTop, left: holeLeft,
          width: holeW, height: holeH,
          borderRadius: 12,
          boxShadow: '0 0 0 2px rgba(200,169,125,0.9), 0 0 0 9999px rgba(0,0,0,0) inset, 0 10px 32px -12px rgba(122,59,94,0.35)',
          pointerEvents: 'none',
        }}
      />

      {/* Tooltip */}
      <AnimatePresence mode="wait">
        <motion.div
          key={targetKey}
          ref={tooltipRef}
          {...motionProps}
          dir={isRTL ? 'rtl' : 'ltr'}
          role="dialog"
          aria-modal="true"
          aria-labelledby="tour-tip-title"
          className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-[#F0ECE8]"
          style={{
            position: 'fixed',
            top: tipTop,
            left: tipLeft,
            width: tipWidth,
            padding: '18px 20px',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            {/* dir="ltr" wrap: in RTL, "3 / 4" would otherwise render as
                "4 / 3" because the slash is a neutral bidi character and
                flips with surrounding text. LTR wrap forces the digits
                and slash to read as a single LTR number expression. */}
            <span dir="ltr" className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#C8A97D]">
              {stepLabel}
            </span>
            <button
              type="button"
              onClick={onDismiss}
              aria-label={dismissLabel}
              className="text-[#B8B2AA] hover:text-[#4A4A5C] text-xl leading-none w-6 h-6 flex items-center justify-center rounded-full hover:bg-[#F5F0EB] transition-colors"
            >
              ×
            </button>
          </div>
          <h3 id="tour-tip-title" className="text-base font-bold text-[#2D2A33] mb-1.5">
            {title}
          </h3>
          <p className={`text-sm text-[#4A4A5C] leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
            {body}
          </p>
          <div className="mt-4 flex items-center gap-2">
            {showBack && (
              <button
                type="button"
                onClick={onBack}
                className="px-3 py-1.5 rounded-lg text-sm font-semibold text-[#7A3B5E] hover:bg-[#F5F0EB] transition-colors"
              >
                {backLabel}
              </button>
            )}
            <div className="flex-1" />
            <button
              type="button"
              data-tour-next
              onClick={onNext}
              className="px-4 py-2 rounded-lg bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-colors"
            >
              {nextLabel}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
