'use client';

/* ================================================================
   CycleDiagramBlock — Interactive circular infographic.

   Nodes orbit a central hub. Click any node to reveal its full
   description in the center. An animated arc traces the cycle
   direction. Auto-rotates until the user interacts.
   ================================================================ */

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { t } from '@/lib/academy-helpers';
import type { CycleDiagramBlock } from '@/types/toolkit';
import type { ToolkitBlockContext } from '../ToolkitBlockRenderer';

/* ── Geometry helpers ─────────────────────────────────────────── */
function nodePosition(index: number, total: number, radius: number) {
  // Start from top (-90°), go clockwise
  const angle = ((index / total) * 360 - 90) * (Math.PI / 180);
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
  };
}

/* ── Animated orbit ring (SVG) ─────────────────────────────── */
function OrbitRing({ radius, color, activeIndex, total }: {
  radius: number; color: string; activeIndex: number; total: number;
}) {
  const circumference = 2 * Math.PI * radius;
  const segmentLength = circumference / total;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox={`${-radius - 60} ${-radius - 60} ${(radius + 60) * 2} ${(radius + 60) * 2}`}
      aria-hidden="true"
    >
      {/* Faint full circle */}
      <circle
        cx={0} cy={0} r={radius}
        fill="none"
        stroke={`${color}15`}
        strokeWidth={2}
      />
      {/* Dashed orbit path */}
      <circle
        cx={0} cy={0} r={radius}
        fill="none"
        stroke={`${color}30`}
        strokeWidth={1.5}
        strokeDasharray="4 8"
      />
      {/* Active arc highlight */}
      <motion.circle
        cx={0} cy={0} r={radius}
        fill="none"
        stroke={color}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={`${segmentLength} ${circumference - segmentLength}`}
        style={{ transformOrigin: '0 0' }}
        animate={{
          strokeDashoffset: -(activeIndex * segmentLength) + circumference * 0.25,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      {/* Small arrow indicator on the ring */}
      {[...Array(total)].map((_, i) => {
        const angle = ((i + 0.5) / total) * 360 - 90;
        const rad = angle * (Math.PI / 180);
        const ax = Math.cos(rad) * radius;
        const ay = Math.sin(rad) * radius;
        // Arrow direction: tangent to circle (clockwise)
        const tangentAngle = angle + 90;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <circle cx={ax} cy={ay} r={4} fill={color} opacity={0.25} />
            <line
              x1={ax}
              y1={ay}
              x2={ax + Math.cos(tangentAngle * Math.PI / 180) * 8}
              y2={ay + Math.sin(tangentAngle * Math.PI / 180) * 8}
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.3}
            />
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ── Main component ───────────────────────────────────────────── */
export default function CycleDiagramBlockView({ block, ctx }: { block: CycleDiagramBlock; ctx: ToolkitBlockContext }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });
  const isRTL = ctx.isRTL;
  const steps = block.steps;
  const title = t(block.titleEn, block.titleAr, isRTL);
  const description = block.descriptionEn ? t(block.descriptionEn, block.descriptionAr || '', isRTL) : null;

  const [active, setActive] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  /* Auto-rotate */
  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % steps.length);
    }, 3500);
  }, [steps.length]);

  useEffect(() => {
    if (inView && !userInteracted) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, userInteracted, startTimer]);

  const handleClick = (i: number) => {
    setUserInteracted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(i);
  };

  const activeStep = steps[active];
  const activeLabel = t(activeStep.labelEn, activeStep.labelAr, isRTL);
  const activeDesc = t(activeStep.descEn, activeStep.descAr, isRTL);

  /* ── Desktop radius / Mobile radius ─────────────────────────── */
  const DESKTOP_RADIUS = 155;
  const MOBILE_RADIUS = 110;

  return (
    <div ref={containerRef} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Title */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-[#2D2A33] mb-1">{title}</h3>
        {description && <p className="text-sm text-[#4A4A5C] leading-relaxed">{description}</p>}
      </div>

      {/* ── Desktop circular layout ──────────────────────────────── */}
      <div className="hidden sm:block">
        <div className="relative mx-auto" style={{ width: 420, height: 420 }}>
          {/* Orbit ring SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <OrbitRing
              radius={DESKTOP_RADIUS}
              color={activeStep.color}
              activeIndex={active}
              total={steps.length}
            />
          </div>

          {/* Center hub — shows active step info */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="w-[180px] h-[180px] rounded-full flex flex-col items-center justify-center text-center px-5"
                style={{
                  background: `radial-gradient(circle, ${activeStep.color}12 0%, ${activeStep.color}04 70%, transparent 100%)`,
                }}
              >
                <motion.span
                  className="text-[10px] font-bold uppercase tracking-widest mb-1"
                  style={{ color: activeStep.color }}
                >
                  {isRTL ? 'الخطوة' : 'Step'} {String(active + 1).padStart(2, '0')}
                </motion.span>
                <motion.p
                  className="text-sm font-semibold text-[#2D2A33] leading-snug mb-1.5"
                >
                  {activeLabel}
                </motion.p>
                <motion.p
                  className="text-[11px] text-[#4A4A5C] leading-relaxed"
                >
                  {activeDesc}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orbital nodes */}
          {steps.map((step, i) => {
            const pos = nodePosition(i, steps.length, DESKTOP_RADIUS);
            const label = t(step.labelEn, step.labelAr, isRTL);
            const isActive = i === active;

            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => handleClick(i)}
                className="absolute flex flex-col items-center justify-center rounded-2xl border-2 cursor-pointer transition-shadow"
                style={{
                  width: 110,
                  height: 72,
                  left: '50%',
                  top: '50%',
                  marginLeft: -55,
                  marginTop: -36,
                  x: pos.x,
                  y: pos.y,
                  borderColor: isActive ? step.color : `${step.color}30`,
                  backgroundColor: isActive ? 'white' : `${step.color}06`,
                  boxShadow: isActive
                    ? `0 4px 20px ${step.color}25, 0 0 0 4px ${step.color}10`
                    : '0 1px 4px rgba(0,0,0,0.04)',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? {
                  opacity: 1,
                  scale: isActive ? 1.1 : 1,
                } : {}}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.5, type: 'spring', stiffness: 300, damping: 20 }}
              >
                {/* Step number */}
                <span
                  className="text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center mb-1"
                  style={{
                    backgroundColor: isActive ? step.color : `${step.color}20`,
                    color: isActive ? 'white' : step.color,
                  }}
                >
                  {i + 1}
                </span>
                {/* Label */}
                <span
                  className="text-xs font-semibold leading-tight text-center px-1"
                  style={{ color: isActive ? '#2D2A33' : '#4A4A5C' }}
                >
                  {label}
                </span>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    className="absolute -bottom-1.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: step.color }}
                    layoutId="cycle-active-dot"
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* "Cycle repeats" hint */}
        <motion.p
          className="text-center text-xs text-[#8E8E9F] mt-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
        >
          <span className="inline-flex items-center gap-1.5">
            <RefreshCw className="w-3 h-3" />
            {isRTL ? 'اضغط على أيّ مرحلة · الدّورة تتكرّر' : 'Click any stage · The cycle repeats'}
          </span>
        </motion.p>
      </div>

      {/* ── Mobile circular layout (compact) ─────────────────────── */}
      <div className="sm:hidden">
        <div className="relative mx-auto" style={{ width: 300, height: 300 }}>
          {/* Orbit ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <OrbitRing
              radius={MOBILE_RADIUS}
              color={activeStep.color}
              activeIndex={active}
              total={steps.length}
            />
          </div>

          {/* Center hub */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.3 }}
                className="w-[120px] h-[120px] rounded-full flex flex-col items-center justify-center text-center px-3"
                style={{
                  background: `radial-gradient(circle, ${activeStep.color}12 0%, transparent 100%)`,
                }}
              >
                <span
                  className="text-[9px] font-bold uppercase tracking-widest mb-0.5"
                  style={{ color: activeStep.color }}
                >
                  {String(active + 1).padStart(2, '0')}
                </span>
                <p className="text-[11px] font-semibold text-[#2D2A33] leading-snug">
                  {activeLabel}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Orbital nodes */}
          {steps.map((step, i) => {
            const pos = nodePosition(i, steps.length, MOBILE_RADIUS);
            const label = t(step.labelEn, step.labelAr, isRTL);
            const isActive = i === active;

            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => handleClick(i)}
                className="absolute flex flex-col items-center justify-center rounded-xl border-2"
                style={{
                  width: 80,
                  height: 52,
                  left: '50%',
                  top: '50%',
                  marginLeft: -40,
                  marginTop: -26,
                  x: pos.x,
                  y: pos.y,
                  borderColor: isActive ? step.color : `${step.color}30`,
                  backgroundColor: isActive ? 'white' : `${step.color}06`,
                  boxShadow: isActive ? `0 2px 12px ${step.color}20` : 'none',
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: isActive ? 1.08 : 1 } : {}}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4, type: 'spring' }}
              >
                <span
                  className="text-[9px] font-bold mb-0.5"
                  style={{ color: step.color }}
                >
                  {i + 1}
                </span>
                <span
                  className="text-[10px] font-semibold text-center leading-tight px-1"
                  style={{ color: isActive ? '#2D2A33' : '#4A4A5C' }}
                >
                  {label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Mobile: expanded description card below */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 mx-auto max-w-[280px] rounded-xl border-2 p-4 text-center"
            style={{
              borderColor: `${activeStep.color}30`,
              backgroundColor: `${activeStep.color}06`,
            }}
          >
            <p className="text-sm font-semibold text-[#2D2A33] mb-1">{activeLabel}</p>
            <p className="text-xs text-[#4A4A5C] leading-relaxed">{activeDesc}</p>
          </motion.div>
        </AnimatePresence>

        <p className="text-center text-[10px] text-[#8E8E9F] mt-3">
          {isRTL ? 'اضغط على أيّ مرحلة' : 'Tap any stage to explore'}
        </p>
      </div>
    </div>
  );
}
