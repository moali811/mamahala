'use client';

/* ================================================================
   FrameworkVisualizer — Rich, interactive framework diagrams.

   Renders 7 diagram types (iceberg, flowchart, cycle/wheel,
   triangle, spectrum, quadrant) using HTML/CSS + Framer Motion
   for polished visuals. SVG is used only for decorative elements
   (lines, waves, arrows) — never for text.
   ================================================================ */

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import type { FrameworkDiagram } from '@/types';
import { t } from '@/lib/academy-helpers';

interface Props {
  diagram: FrameworkDiagram;
  isRTL: boolean;
  color?: string;
  interactive?: boolean;
  className?: string;
}

/* ── Shared constants ──────────────────────────────────────────── */
const SPRING = { type: 'spring' as const, stiffness: 300, damping: 24 };
const EASE = [0.22, 1, 0.36, 1] as const;

/* ── Geometry helper for circular layouts ──────────────────────── */
function circlePos(index: number, total: number, radius: number) {
  const angle = ((index / total) * 360 - 90) * (Math.PI / 180);
  return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
}

/* ══════════════════════════════════════════════════════════════════
   FLOWCHART — Vertical cascade of cards with animated connectors
   ══════════════════════════════════════════════════════════════════ */
function FlowchartView({ diagram, isRTL, color, selected, onSelect }: {
  diagram: FrameworkDiagram; isRTL: boolean; color: string;
  selected: string | null; onSelect: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex flex-col items-center gap-0 py-2">
      {diagram.nodes.map((node, i) => {
        const nodeColor = node.color || color;
        const isActive = selected === node.id;
        const label = t(node.labelEn, node.labelAr, isRTL);
        const desc = t(node.descriptionEn, node.descriptionAr, isRTL);

        return (
          <div key={node.id} className="flex flex-col items-center w-full max-w-[320px]">
            {/* Connector arrow (skip for first node) */}
            {i > 0 && (
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scaleY: 0 }}
                animate={inView ? { opacity: 1, scaleY: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: EASE }}
                style={{ transformOrigin: 'top' }}
              >
                <div className="w-[2px] h-6" style={{ background: `linear-gradient(to bottom, ${diagram.nodes[i - 1].color || color}40, ${nodeColor}40)` }} />
                <div
                  className="w-0 h-0 border-x-[6px] border-x-transparent border-t-[7px]"
                  style={{ borderTopColor: `${nodeColor}60` }}
                />
              </motion.div>
            )}

            {/* Card */}
            <motion.button
              type="button"
              onClick={() => onSelect(isActive ? null : node.id)}
              className="relative w-full rounded-2xl border-2 px-5 py-3.5 text-center transition-shadow cursor-pointer"
              style={{
                borderColor: isActive ? nodeColor : `${nodeColor}30`,
                backgroundColor: isActive ? `${nodeColor}08` : 'white',
                boxShadow: isActive
                  ? `0 4px 20px ${nodeColor}18, 0 0 0 3px ${nodeColor}10`
                  : '0 1px 4px rgba(0,0,0,0.04)',
              }}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ...SPRING }}
            >
              {/* Step badge */}
              <motion.span
                className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold rounded-full w-6 h-6 flex items-center justify-center"
                style={{
                  backgroundColor: isActive ? nodeColor : `${nodeColor}18`,
                  color: isActive ? 'white' : nodeColor,
                }}
                animate={{ scale: isActive ? 1.15 : 1 }}
                transition={SPRING}
              >
                {i + 1}
              </motion.span>

              <span className="text-sm font-semibold block mt-1" style={{ color: isActive ? '#2D2A33' : '#4A4A5C' }}>
                {label}
              </span>

              {/* Expanded description + insight */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 6 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-[#4A4A5C] leading-relaxed">{desc}</p>
                    {(node.insightEn || node.insightAr) && (
                      <p className="text-[11px] text-[#3A3A4C] leading-snug mt-2 pt-2 border-t" style={{ borderColor: `${nodeColor}18` }}>
                        <span className="font-bold" style={{ color: nodeColor }}>{isRTL ? 'جرّبي: ' : 'Try: '}</span>
                        {t(node.insightEn || '', node.insightAr || '', isRTL)}
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        );
      })}
    </div>
  );
}

/* Auto-close helper for iceberg detail card */
function IcebergAutoClose({ selected, onSelect }: { selected: string | null; onSelect: (id: string | null) => void }) {
  useEffect(() => {
    if (!selected) return;
    const timer = setTimeout(() => onSelect(null), 60000);
    return () => clearTimeout(timer);
  }, [selected, onSelect]);
  return null;
}

/* ══════════════════════════════════════════════════════════════════
   ICEBERG — Modern glassmorphic iceberg with depth layers
   ══════════════════════════════════════════════════════════════════ */
function IcebergView({ diagram, isRTL, color, selected, onSelect }: {
  diagram: FrameworkDiagram; isRTL: boolean; color: string;
  selected: string | null; onSelect: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const above = diagram.nodes.filter(n => n.position.y < 40);
  const below = diagram.nodes.filter(n => n.position.y >= 40);
  const activeNode = diagram.nodes.find(n => n.id === selected);

  // Group below nodes into depth rows
  const depthRows = (() => {
    const rows = new Map<number, typeof below>();
    below.forEach(node => {
      const band = Math.round(node.position.y / 18) * 18;
      if (!rows.has(band)) rows.set(band, []);
      rows.get(band)!.push(node);
    });
    return Array.from(rows.entries()).sort((a, b) => a[0] - b[0]);
  })();

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl" style={{ minHeight: 580 }} onClick={() => { if (selected) onSelect(null); }}>
      {/* Background — dramatic sky to abyss */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(180deg, #E8E0D4 0%, #D4C8B8 12%, #97C8DC 16%, #5CA0C4 20%, #3A7EA8 30%, #1E5E88 45%, #12405E 60%, #0B2A42 78%, #061A2E 100%)',
      }} />

      {/* Atmospheric light shafts */}
      <motion.div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[0.15, 0.38, 0.62, 0.85].map((x, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${x * 100}%`, top: '16%', width: i % 2 === 0 ? 40 : 28, height: '70%',
              background: `linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(120,200,255,0.02) 50%, transparent 100%)`,
              transformOrigin: 'top center',
              filter: 'blur(8px)',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={inView ? {
              opacity: [0.4, 0.7, 0.4],
              scaleY: 1,
              rotate: [i % 2 === 0 ? -2 : 2, i % 2 === 0 ? 2 : -2, i % 2 === 0 ? -2 : 2],
            } : {}}
            transition={{ duration: 8 + i * 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </motion.div>

      {/* Rising bubbles */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {[
          { x: 15, s: 5, d: 8, dl: 0 }, { x: 28, s: 3, d: 10, dl: 2 }, { x: 45, s: 6, d: 7, dl: 1 },
          { x: 58, s: 4, d: 9, dl: 3 }, { x: 72, s: 3, d: 11, dl: 1.5 }, { x: 83, s: 5, d: 8, dl: 4 },
          { x: 35, s: 2, d: 12, dl: 5 }, { x: 65, s: 3, d: 9, dl: 2.5 },
        ].map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${b.x}%`, bottom: '3%', width: b.s, height: b.s,
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
              boxShadow: '0 0 3px rgba(255,255,255,0.15)',
            }}
            animate={inView ? { y: [0, -450], opacity: [0, 0.6, 0.3, 0], scale: [0.3, 1, 0.7] } : {}}
            transition={{ duration: b.d, repeat: Infinity, delay: b.dl, ease: 'easeOut' }}
          />
        ))}
      </div>

      {/* Iceberg SVG — large dramatic crystal shape */}
      <motion.svg
        className="absolute inset-0 w-full h-full z-[2]"
        viewBox="0 0 400 580"
        preserveAspectRatio="xMidYMid meet"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        <defs>
          <linearGradient id="ice-tip" x1="0.3" y1="0" x2="0.7" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#F0EBE4" />
            <stop offset="100%" stopColor="#D8CFBF" />
          </linearGradient>
          <linearGradient id="ice-tip-shade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0D8CC" />
            <stop offset="100%" stopColor="#C8BFB0" />
          </linearGradient>
          <linearGradient id="ice-body" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="rgba(160,210,240,0.35)" />
            <stop offset="30%" stopColor="rgba(100,170,210,0.22)" />
            <stop offset="60%" stopColor="rgba(60,130,180,0.14)" />
            <stop offset="100%" stopColor="rgba(30,80,130,0.08)" />
          </linearGradient>
          <linearGradient id="ice-body-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(180,220,255,0.3)" />
            <stop offset="100%" stopColor="rgba(100,180,230,0.1)" />
          </linearGradient>
          <filter id="ice-glow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
          <filter id="deep-glow">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feComposite in="blur" in2="SourceGraphic" operator="over" />
          </filter>
        </defs>

        {/* Iceberg tip — large faceted crystal above water */}
        <motion.g filter="url(#ice-glow)"
          initial={{ opacity: 0, y: -15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Main tip face */}
          <path d="M200,18 L155,85 L200,78 L245,85 Z" fill="url(#ice-tip)" stroke="rgba(180,170,155,0.35)" strokeWidth={0.6} />
          {/* Left shadow facet */}
          <path d="M155,85 L178,85 L200,78 Z" fill="url(#ice-tip-shade)" opacity={0.7} />
          {/* Right highlight facet */}
          <path d="M200,78 L222,85 L245,85 Z" fill="rgba(255,255,255,0.5)" />
          {/* Reflection shine */}
          <path d="M188,40 L195,62 L200,38 Z" fill="rgba(255,255,255,0.6)" />
        </motion.g>

        {/* Underwater body — massive, multi-faceted */}
        <motion.g
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5 }}
        >
          {/* Main body shape */}
          <path
            d="M145,100 L105,190 L75,305 L90,420 L140,500 L200,530 L260,500 L310,420 L325,305 L295,190 L255,100 Z"
            fill="url(#ice-body)"
            stroke="rgba(150,210,255,0.18)"
            strokeWidth={1.2}
          />
          {/* Left facet panel */}
          <path
            d="M145,100 L105,190 L200,200 Z"
            fill="rgba(130,195,240,0.08)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.5}
          />
          {/* Right facet panel */}
          <path
            d="M255,100 L295,190 L200,200 Z"
            fill="rgba(100,180,230,0.06)"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={0.5}
          />
          {/* Center vertical ridge */}
          <path d="M200,100 L200,530" stroke="rgba(255,255,255,0.07)" strokeWidth={0.5} />
          {/* Horizontal depth lines */}
          <path d="M105,190 L295,190" stroke="rgba(255,255,255,0.05)" strokeWidth={0.5} />
          <path d="M75,305 L325,305" stroke="rgba(255,255,255,0.04)" strokeWidth={0.5} />
          <path d="M90,420 L310,420" stroke="rgba(255,255,255,0.03)" strokeWidth={0.5} />
          {/* Lower left facet */}
          <path d="M105,190 L75,305 L200,310 Z" fill="rgba(80,160,210,0.06)" />
          {/* Lower right facet */}
          <path d="M295,190 L325,305 L200,310 Z" fill="rgba(60,140,195,0.05)" />
          {/* Inner glow at top of body */}
          <ellipse cx="200" cy="130" rx="40" ry="15" fill="rgba(180,220,255,0.1)" />
        </motion.g>
      </motion.svg>

      {/* Animated wave — double layer */}
      <div className="absolute inset-x-0 z-[4]" style={{ top: '14%' }}>
        <motion.svg viewBox="0 0 800 40" className="w-full h-6" preserveAspectRatio="none" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
          <motion.path
            d="M0,20 C40,8 80,32 120,20 C160,8 200,32 240,20 C280,8 320,32 360,20 C400,8 440,32 480,20 C520,8 560,32 600,20 C640,8 680,32 720,20 C760,8 800,20 800,20 L800,40 L0,40 Z"
            fill="rgba(70,140,190,0.4)"
            animate={{ d: [
              'M0,20 C40,8 80,32 120,20 C160,8 200,32 240,20 C280,8 320,32 360,20 C400,8 440,32 480,20 C520,8 560,32 600,20 C640,8 680,32 720,20 C760,8 800,20 800,20 L800,40 L0,40 Z',
              'M0,20 C40,32 80,8 120,20 C160,32 200,8 240,20 C280,32 320,8 360,20 C400,32 440,8 480,20 C520,32 560,8 600,20 C640,32 680,8 720,20 C760,32 800,20 800,20 L800,40 L0,40 Z',
              'M0,20 C40,8 80,32 120,20 C160,8 200,32 240,20 C280,8 320,32 360,20 C400,8 440,32 480,20 C520,8 560,32 600,20 C640,8 680,32 720,20 C760,8 800,20 800,20 L800,40 L0,40 Z',
            ] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.path
            d="M0,22 C50,12 100,30 150,22 C200,14 250,30 300,22 C350,14 400,30 450,22 C500,14 550,30 600,22 C650,14 700,30 750,22 L800,22 L800,40 L0,40 Z"
            fill="rgba(50,120,170,0.3)"
            animate={{ d: [
              'M0,22 C50,12 100,30 150,22 C200,14 250,30 300,22 C350,14 400,30 450,22 C500,14 550,30 600,22 C650,14 700,30 750,22 L800,22 L800,40 L0,40 Z',
              'M0,22 C50,30 100,12 150,22 C200,30 250,12 300,22 C350,30 400,12 450,22 C500,30 550,12 600,22 C650,30 700,12 750,22 L800,22 L800,40 L0,40 Z',
              'M0,22 C50,12 100,30 150,22 C200,14 250,30 300,22 C350,14 400,30 450,22 C500,14 550,30 600,22 C650,14 700,30 750,22 L800,22 L800,40 L0,40 Z',
            ] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
        </motion.svg>
      </div>

      {/* Section labels */}
      <motion.div
        className="absolute z-10 flex items-center gap-1.5"
        style={{ top: '4%', ...(isRTL ? { left: 16 } : { right: 16 }) }}
        initial={{ opacity: 0, x: isRTL ? -10 : 10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.4 }}
      >
        <span className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #D4A84B, #C8A070)' }} />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9A7B55]">
          {isRTL ? 'ما يَراهُ النّاس' : 'What people see'}
        </span>
      </motion.div>
      <motion.div
        className="absolute z-10 flex items-center gap-1.5"
        style={{ top: '19%', ...(isRTL ? { left: 16 } : { right: 16 }) }}
        initial={{ opacity: 0, x: isRTL ? -10 : 10 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6 }}
      >
        <span className="w-2 h-2 rounded-full bg-white/40" />
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/70">
          {isRTL ? 'ما هو مَخْفيّ' : "What's hidden"}
        </span>
      </motion.div>

      {/* Above-water node(s) — floating card with warm glow */}
      <div className="absolute inset-x-0 z-10 flex justify-center" style={{ top: '2%' }}>
        {above.map((node, i) => {
          const nodeColor = node.color || '#7A3B5E';
          const isActive = selected === node.id;
          return (
            <motion.button
              key={node.id} type="button"
              onClick={() => onSelect(isActive ? null : node.id)}
              className="rounded-xl px-5 py-3 cursor-pointer text-center"
              style={{
                background: isActive ? 'white' : 'rgba(255,255,255,0.97)',
                boxShadow: isActive
                  ? `0 8px 32px ${nodeColor}35, 0 0 0 2px ${nodeColor}, 0 2px 8px rgba(0,0,0,0.08)`
                  : '0 4px 24px rgba(0,0,0,0.1), 0 0 0 1px rgba(255,255,255,0.8), 0 1px 3px rgba(0,0,0,0.06)',
                maxWidth: 220,
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ scale: 1.06, y: -4, boxShadow: `0 12px 40px ${nodeColor}25, 0 0 0 2px ${nodeColor}60` }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ...SPRING }}
            >
              <span className="text-xs font-bold block" style={{ color: nodeColor }}>{t(node.labelEn, node.labelAr, isRTL)}</span>
            </motion.button>
          );
        })}
      </div>

      {/* Below-water nodes — glassmorphic depth cards */}
      {(() => {
        let globalIdx = 0;
        const totalRows = depthRows.length;
        return depthRows.map(([, nodes], rowIdx) => {
          const topPct = 24 + (rowIdx / Math.max(totalRows - 1, 1)) * 52;
          return (
            <div key={rowIdx} className="absolute inset-x-0 z-10 flex justify-center gap-4 px-8" style={{ top: `${topPct}%` }}>
              {nodes.map((node) => {
                const isActive = selected === node.id;
                const depth = (node.position.y - 40) / 60;
                const idx = globalIdx++;
                return (
                  <motion.button
                    key={node.id} type="button"
                    onClick={() => onSelect(isActive ? null : node.id)}
                    className="rounded-xl px-5 py-3 cursor-pointer text-center backdrop-blur-lg flex-1 min-w-0"
                    style={{
                      maxWidth: 200,
                      background: isActive
                        ? 'rgba(255,255,255,0.88)'
                        : `rgba(255,255,255,${0.14 - depth * 0.05})`,
                      border: isActive
                        ? '1.5px solid rgba(255,255,255,0.95)'
                        : `1px solid rgba(255,255,255,${0.25 - depth * 0.08})`,
                      boxShadow: isActive
                        ? '0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)'
                        : `0 4px 20px rgba(0,0,0,${0.06 + depth * 0.04}), inset 0 1px 0 rgba(255,255,255,${0.12 - depth * 0.04})`,
                    }}
                    initial={{ opacity: 0, y: 25, scale: 0.95 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    whileHover={{
                      scale: 1.08,
                      boxShadow: `0 12px 36px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)`,
                    }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.6, delay: 0.7 + idx * 0.12, ...SPRING }}
                  >
                    <span className="text-xs font-semibold block" style={{
                      color: isActive ? '#1A2A3A' : `rgba(255,255,255,${0.95 - depth * 0.08})`,
                      textShadow: isActive ? 'none' : '0 1px 3px rgba(0,0,0,0.2)',
                    }}>
                      {t(node.labelEn, node.labelAr, isRTL)}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          );
        });
      })()}

      {/* Auto-dismiss timer */}
      <IcebergAutoClose selected={selected} onSelect={onSelect} />

      {/* Insight card — dead center of the diagram */}
      <AnimatePresence>
        {activeNode && selected && (() => {
          const nodeColor = activeNode.color || color;
          const isAbove = activeNode.position.y < 40;
          const depthPct = isAbove ? 0 : Math.round(((activeNode.position.y - 40) / 60) * 100);
          const depthLabel = isAbove
            ? (isRTL ? 'السطح' : 'Surface')
            : depthPct < 40
              ? (isRTL ? 'تحت السطح' : 'Below Surface')
              : depthPct < 70
                ? (isRTL ? 'عميق' : 'Deep')
                : (isRTL ? 'أعمق نقطة' : 'Deepest');
          const connectedIds = (diagram.connections || [])
            .filter(c => c.from === activeNode.id || c.to === activeNode.id)
            .map(c => c.from === activeNode.id ? c.to : c.from);
          const connectedNodes = diagram.nodes.filter(n => connectedIds.includes(n.id));

          return (
              <div className="absolute inset-0 z-[20] flex items-center justify-center pointer-events-none">
              <motion.div
                key={activeNode.id}
                className="rounded-xl overflow-hidden backdrop-blur-xl pointer-events-auto"
                onClick={e => e.stopPropagation()}
                style={{
                  width: 'min(70%, 260px)',
                  background: 'rgba(255,255,255,0.96)',
                  boxShadow: `0 12px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.3)`,
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ...SPRING }}
              >
                {/* Accent bar */}
                <div style={{ height: 3, background: `linear-gradient(90deg, ${nodeColor}, ${nodeColor}50)` }} />

                <div className="px-3.5 pt-2.5 pb-3" dir={isRTL ? 'rtl' : 'ltr'}>
                  {/* Header */}
                  <div className={`flex items-center justify-between mb-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${nodeColor}15` }}>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          {isAbove ? (
                            <><path d="M1 8s2.5-4 7-4 7 4 7 4-2.5 4-7 4-7-4-7-4z" stroke={nodeColor} strokeWidth="1.5" strokeLinecap="round" /><circle cx="8" cy="8" r="2" stroke={nodeColor} strokeWidth="1.5" /></>
                          ) : (
                            <path d="M8 14s-5.5-3.5-5.5-7A3.5 3.5 0 0 1 8 4.5 3.5 3.5 0 0 1 13.5 7C13.5 10.5 8 14 8 14z" stroke={nodeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          )}
                        </svg>
                      </div>
                      <span className="text-xs font-bold leading-tight" style={{ color: nodeColor }}>
                        {t(activeNode.labelEn, activeNode.labelAr, isRTL)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onSelect(null)}
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[#9A9AB0] hover:text-[#4A4A5C] hover:bg-black/5 transition-colors cursor-pointer flex-shrink-0"
                    >
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M9 3L3 9M3 3l6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[#4A4A5C] leading-snug mb-2">
                    {t(activeNode.descriptionEn, activeNode.descriptionAr, isRTL)}
                  </p>

                  {/* Actionable insight */}
                  {(activeNode.insightEn || activeNode.insightAr) && (
                    <div className="rounded-md px-2.5 py-2 mb-2" style={{ background: `${nodeColor}08`, border: `1px solid ${nodeColor}12` }}>
                      <div className={`flex items-start gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="flex-shrink-0 mt-px">
                          <path d="M7 1a4 4 0 0 1 4 4c0 1.5-.8 2.5-1.5 3.3-.4.4-.5.7-.5 1.2v.5H5v-.5c0-.5-.2-.8-.5-1.2C3.8 7.5 3 6.5 3 5a4 4 0 0 1 4-4z" stroke={nodeColor} strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M5.5 12.5h3M5.5 11h3" stroke={nodeColor} strokeWidth="1.2" strokeLinecap="round" />
                        </svg>
                        <p className="text-[10px] text-[#3A3A4C] leading-snug">
                          <span className="font-bold uppercase" style={{ color: nodeColor }}>{isRTL ? 'جَرِّبي: ' : 'Try: '}</span>
                          {t(activeNode.insightEn || '', activeNode.insightAr || '', isRTL)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Connected nodes */}
                  {connectedNodes.length > 0 && (
                    <div className={`flex items-center gap-1.5 flex-wrap ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {connectedNodes.map(cn => (
                        <button
                          key={cn.id}
                          type="button"
                          onClick={() => onSelect(cn.id)}
                          className="text-[9px] font-semibold px-2 py-0.5 rounded-full cursor-pointer transition-colors"
                          style={{
                            background: `${cn.color || color}10`,
                            color: cn.color || color,
                            border: `1px solid ${cn.color || color}20`,
                          }}
                        >
                          {t(cn.labelEn, cn.labelAr, isRTL)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
              </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   WHEEL / CYCLE — Orbital nodes around a center hub
   (Inspired by CycleDiagramBlock)
   ══════════════════════════════════════════════════════════════════ */
function WheelView({ diagram, isRTL, color, selected, onSelect }: {
  diagram: FrameworkDiagram; isRTL: boolean; color: string;
  selected: string | null; onSelect: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [active, setActive] = useState(0);
  const [userClicked, setUserClicked] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const steps = diagram.nodes;
  const RADIUS_DESKTOP = 140;
  const RADIUS_MOBILE = 105;

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(p => (p + 1) % steps.length);
    }, 3000);
  }, [steps.length]);

  useEffect(() => {
    if (inView && !userClicked) startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [inView, userClicked, startTimer]);

  const handleClick = (i: number) => {
    setUserClicked(true);
    if (timerRef.current) clearInterval(timerRef.current);
    setActive(i);
    onSelect(steps[i].id);
  };

  const activeStep = steps[active];
  const activeColor = activeStep?.color || color;

  // Orbit ring SVG
  const OrbitSVG = ({ radius }: { radius: number }) => {
    const circumference = 2 * Math.PI * radius;
    const segLen = circumference / steps.length;
    return (
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`${-radius - 55} ${-radius - 55} ${(radius + 55) * 2} ${(radius + 55) * 2}`}
      >
        <circle cx={0} cy={0} r={radius} fill="none" stroke={`${activeColor}12`} strokeWidth={2} />
        <circle cx={0} cy={0} r={radius} fill="none" stroke={`${activeColor}25`} strokeWidth={1.5} strokeDasharray="4 8" />
        <motion.circle
          cx={0} cy={0} r={radius} fill="none"
          stroke={activeColor} strokeWidth={3} strokeLinecap="round"
          strokeDasharray={`${segLen} ${circumference - segLen}`}
          style={{ transformOrigin: '0 0' }}
          animate={{ strokeDashoffset: -(active * segLen) + circumference * 0.25 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
    );
  };

  const renderLayout = (radius: number, nodeW: number, nodeH: number, fontSize: string) => (
    <div className="relative mx-auto" style={{ width: (radius + 55) * 2, height: (radius + 55) * 2 }}>
      {/* Orbit ring */}
      <div className="absolute inset-0 flex items-center justify-center">
        <OrbitSVG radius={radius} />
      </div>

      {/* Center hub */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-full flex flex-col items-center justify-center text-center px-4"
            style={{
              width: radius * 0.9,
              height: radius * 0.9,
              background: `radial-gradient(circle, ${activeColor}10 0%, transparent 70%)`,
            }}
          >
            <span className="text-[9px] font-bold uppercase tracking-widest mb-0.5" style={{ color: activeColor }}>
              {String(active + 1).padStart(2, '0')}
            </span>
            <p className="text-xs font-semibold text-[#2D2A33] leading-snug mb-1">
              {t(activeStep.labelEn, activeStep.labelAr, isRTL)}
            </p>
            <p className="text-[10px] text-[#4A4A5C] leading-relaxed">
              {t(activeStep.descriptionEn, activeStep.descriptionAr, isRTL)}
            </p>
            {(activeStep.insightEn || activeStep.insightAr) && (
              <p className="text-[9px] text-[#3A3A4C] leading-snug mt-1.5 pt-1.5 border-t" style={{ borderColor: `${activeColor}20` }}>
                <span className="font-bold" style={{ color: activeColor }}>{isRTL ? 'جرّبي: ' : 'Try: '}</span>
                {t(activeStep.insightEn || '', activeStep.insightAr || '', isRTL)}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Orbital nodes */}
      {steps.map((step, i) => {
        const pos = circlePos(i, steps.length, radius);
        const isActive = i === active;
        const stepColor = step.color || color;

        return (
          <motion.button
            key={i}
            type="button"
            onClick={() => handleClick(i)}
            className="absolute flex flex-col items-center justify-center rounded-xl border-2 cursor-pointer"
            style={{
              width: nodeW,
              height: nodeH,
              left: '50%',
              top: '50%',
              marginLeft: -nodeW / 2,
              marginTop: -nodeH / 2,
              x: pos.x,
              y: pos.y,
              borderColor: isActive ? stepColor : `${stepColor}30`,
              backgroundColor: isActive ? 'white' : `${stepColor}06`,
              boxShadow: isActive
                ? `0 4px 16px ${stepColor}20, 0 0 0 3px ${stepColor}10`
                : '0 1px 3px rgba(0,0,0,0.04)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: isActive ? 1.08 : 1 } : {}}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ...SPRING }}
          >
            <span
              className="text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center mb-0.5"
              style={{ backgroundColor: isActive ? stepColor : `${stepColor}20`, color: isActive ? 'white' : stepColor }}
            >
              {i + 1}
            </span>
            <span className={`${fontSize} font-semibold text-center leading-tight px-1`} style={{ color: isActive ? '#2D2A33' : '#4A4A5C' }}>
              {t(step.labelEn, step.labelAr, isRTL)}
            </span>
          </motion.button>
        );
      })}
    </div>
  );

  return (
    <div ref={ref}>
      {/* Desktop */}
      <div className="hidden sm:block">
        {renderLayout(RADIUS_DESKTOP, 100, 64, 'text-[11px]')}
      </div>
      {/* Mobile */}
      <div className="sm:hidden">
        {renderLayout(RADIUS_MOBILE, 76, 50, 'text-[10px]')}
        {/* Description card below on mobile */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 mx-auto max-w-[260px] rounded-xl border-2 p-3 text-center"
            style={{ borderColor: `${activeColor}30`, backgroundColor: `${activeColor}06` }}
          >
            <p className="text-xs font-semibold text-[#2D2A33] mb-0.5">
              {t(activeStep.labelEn, activeStep.labelAr, isRTL)}
            </p>
            <p className="text-[11px] text-[#4A4A5C] leading-relaxed">
              {t(activeStep.descriptionEn, activeStep.descriptionAr, isRTL)}
            </p>
            {(activeStep.insightEn || activeStep.insightAr) && (
              <p className="text-[10px] text-[#3A3A4C] leading-snug mt-1.5 pt-1.5 border-t" style={{ borderColor: `${activeColor}20` }}>
                <span className="font-bold" style={{ color: activeColor }}>{isRTL ? 'جرّبي: ' : 'Try: '}</span>
                {t(activeStep.insightEn || '', activeStep.insightAr || '', isRTL)}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TRIANGLE — Three cards in triangular formation
   ══════════════════════════════════════════════════════════════════ */
function TriangleView({ diagram, isRTL, color, selected, onSelect }: {
  diagram: FrameworkDiagram; isRTL: boolean; color: string;
  selected: string | null; onSelect: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const nodes = diagram.nodes.slice(0, 3);

  // Positions: top-center, bottom-left, bottom-right
  const positions = [
    'col-span-2 justify-self-center',
    'justify-self-end',
    'justify-self-start',
  ];

  return (
    <div ref={ref}>
      {/* SVG triangle outline */}
      <div className="relative">
        <svg viewBox="0 0 300 260" className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="xMidYMid meet">
          <motion.polygon
            points="150,30 40,230 260,230"
            fill="none"
            stroke={`${color}15`}
            strokeWidth={2}
            strokeDasharray="6 8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </svg>

        <div className="relative z-10 grid grid-cols-2 gap-4 py-6 px-4" style={{ gridAutoRows: '1fr' }}>
          {nodes.map((node, i) => {
            const nodeColor = node.color || color;
            const isActive = selected === node.id;

            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => onSelect(isActive ? null : node.id)}
                className={`rounded-2xl border-2 px-4 py-3 cursor-pointer transition-shadow flex flex-col items-center justify-start ${positions[i]}`}
                style={{
                  minWidth: 130,
                  maxWidth: 180,
                  borderColor: isActive ? nodeColor : `${nodeColor}30`,
                  backgroundColor: isActive ? `${nodeColor}08` : 'white',
                  boxShadow: isActive ? `0 4px 16px ${nodeColor}20` : '0 1px 4px rgba(0,0,0,0.04)',
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.5, ...SPRING }}
              >
                <span
                  className="text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center mx-auto mb-1.5"
                  style={{ backgroundColor: isActive ? nodeColor : `${nodeColor}18`, color: isActive ? 'white' : nodeColor }}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-semibold block text-center" style={{ color: isActive ? '#2D2A33' : '#4A4A5C' }}>
                  {t(node.labelEn, node.labelAr, isRTL)}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel below grid */}
        <AnimatePresence>
          {selected && (() => {
            const node = nodes.find(n => n.id === selected);
            if (!node) return null;
            const nodeColor = node.color || color;
            return (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mx-4 mb-4 rounded-2xl border-2 p-4 text-center"
                style={{ borderColor: nodeColor, backgroundColor: `${nodeColor}08` }}
              >
                <p className="text-xs font-semibold mb-1.5" style={{ color: nodeColor }}>
                  {t(node.labelEn, node.labelAr, isRTL)}
                </p>
                <p className="text-[11px] text-[#4A4A5C] leading-relaxed">
                  {t(node.descriptionEn, node.descriptionAr, isRTL)}
                </p>
                {(node.insightEn || node.insightAr) && (
                  <p className="text-[10px] text-[#3A3A4C] leading-snug mt-2 pt-2 border-t" style={{ borderColor: `${nodeColor}18` }}>
                    <span className="font-bold" style={{ color: nodeColor }}>{isRTL ? 'جرّبي: ' : 'Try: '}</span>
                    {t(node.insightEn || '', node.insightAr || '', isRTL)}
                  </p>
                )}
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   SPECTRUM — Horizontal gradient bar with positioned markers
   ══════════════════════════════════════════════════════════════════ */
function SpectrumView({ diagram, isRTL, color, selected, onSelect }: {
  diagram: FrameworkDiagram; isRTL: boolean; color: string;
  selected: string | null; onSelect: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const count = diagram.nodes.length;

  return (
    <div ref={ref} className="px-2 py-6">
      {/* Gradient bar */}
      <div className="relative mx-auto max-w-[380px]">
        <motion.div
          className="h-2 rounded-full mx-6"
          style={{
            background: `linear-gradient(to right, ${diagram.nodes.map((n, i) =>
              `${n.color || color} ${(i / Math.max(count - 1, 1)) * 100}%`
            ).join(', ')})`,
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        />

        {/* Markers */}
        <div className="relative mt-4 flex justify-between px-2">
          {diagram.nodes.map((node, i) => {
            const nodeColor = node.color || color;
            const isActive = selected === node.id;

            return (
              <motion.button
                key={node.id}
                type="button"
                onClick={() => onSelect(isActive ? null : node.id)}
                className="flex flex-col items-center cursor-pointer group"
                style={{ flex: '1 1 0', maxWidth: `${100 / count}%` }}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ y: -3 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ...SPRING }}
              >
                {/* Dot */}
                <motion.div
                  className="rounded-full mb-2"
                  style={{
                    width: isActive ? 20 : 14,
                    height: isActive ? 20 : 14,
                    backgroundColor: isActive ? nodeColor : `${nodeColor}25`,
                    border: `2px solid ${nodeColor}`,
                    boxShadow: isActive ? `0 0 12px ${nodeColor}30` : 'none',
                  }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={SPRING}
                />
                <span
                  className="text-[10px] font-semibold text-center leading-tight"
                  style={{ color: isActive ? '#2D2A33' : '#4A4A5C' }}
                >
                  {t(node.labelEn, node.labelAr, isRTL)}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Detail panel below spectrum */}
        <AnimatePresence>
          {selected && (() => {
            const node = diagram.nodes.find(n => n.id === selected);
            if (!node) return null;
            const nodeColor = node.color || color;
            return (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-3 rounded-2xl border-2 p-4 text-center"
                style={{ borderColor: nodeColor, backgroundColor: `${nodeColor}08` }}
              >
                <p className="text-xs font-semibold mb-1.5" style={{ color: nodeColor }}>
                  {t(node.labelEn, node.labelAr, isRTL)}
                </p>
                <p className="text-[11px] text-[#4A4A5C] leading-relaxed">
                  {t(node.descriptionEn, node.descriptionAr, isRTL)}
                </p>
                {(node.insightEn || node.insightAr) && (
                  <p className="text-[10px] text-[#3A3A4C] leading-snug mt-2 pt-2 border-t" style={{ borderColor: `${nodeColor}18` }}>
                    <span className="font-bold" style={{ color: nodeColor }}>{isRTL ? 'جرّبي: ' : 'Try: '}</span>
                    {t(node.insightEn || '', node.insightAr || '', isRTL)}
                  </p>
                )}
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   QUADRANT — 2×2 grid with colored backgrounds and axis labels
   ══════════════════════════════════════════════════════════════════ */
function QuadrantView({ diagram, isRTL, color, selected, onSelect }: {
  diagram: FrameworkDiagram; isRTL: boolean; color: string;
  selected: string | null; onSelect: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const nodes = diagram.nodes.slice(0, 4);

  return (
    <div ref={ref} className="relative px-2 py-4">
      {/* Axis lines */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[1px] h-[85%] bg-[#E5E0D8]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="h-[1px] w-[85%] bg-[#E5E0D8]" />
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-3 max-w-[380px] mx-auto" style={{ gridAutoRows: '1fr' }}>
        {nodes.map((node, i) => {
          const nodeColor = node.color || color;
          const isActive = selected === node.id;

          return (
            <motion.button
              key={node.id}
              type="button"
              onClick={() => onSelect(isActive ? null : node.id)}
              className="rounded-2xl border-2 p-3.5 cursor-pointer transition-shadow text-center flex flex-col items-center justify-start"
              style={{
                borderColor: isActive ? nodeColor : `${nodeColor}25`,
                backgroundColor: isActive ? `${nodeColor}10` : `${nodeColor}04`,
                boxShadow: isActive ? `0 4px 16px ${nodeColor}18` : 'none',
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5, ...SPRING }}
            >
              <span
                className="inline-flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold mb-2"
                style={{ backgroundColor: isActive ? nodeColor : `${nodeColor}18`, color: isActive ? 'white' : nodeColor }}
              >
                {i + 1}
              </span>
              <span className="text-xs font-semibold block" style={{ color: isActive ? '#2D2A33' : '#4A4A5C' }}>
                {t(node.labelEn, node.labelAr, isRTL)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Detail panel below grid */}
      <AnimatePresence>
        {selected && (() => {
          const node = nodes.find(n => n.id === selected);
          if (!node) return null;
          const nodeColor = node.color || color;
          return (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mt-3 mx-auto max-w-[380px] rounded-2xl border-2 p-4 text-center"
              style={{
                borderColor: nodeColor,
                backgroundColor: `${nodeColor}08`,
              }}
            >
              <p className="text-xs font-semibold mb-1.5" style={{ color: nodeColor }}>
                {t(node.labelEn, node.labelAr, isRTL)}
              </p>
              <p className="text-[11px] text-[#4A4A5C] leading-relaxed">
                {t(node.descriptionEn, node.descriptionAr, isRTL)}
              </p>
              {(node.insightEn || node.insightAr) && (
                <p className="text-[10px] text-[#3A3A4C] leading-snug mt-2 pt-2 border-t" style={{ borderColor: `${nodeColor}18` }}>
                  <span className="font-bold" style={{ color: nodeColor }}>{isRTL ? 'جرّبي: ' : 'Try: '}</span>
                  {t(node.insightEn || '', node.insightAr || '', isRTL)}
                </p>
              )}
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT — Wraps each type with title + interaction hint
   ══════════════════════════════════════════════════════════════════ */
export default function FrameworkVisualizer({
  diagram,
  isRTL,
  color = '#7A3B5E',
  interactive = true,
  className = '',
}: Props) {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const title = t(diagram.titleEn, diagram.titleAr, isRTL);

  const handleSelect = (id: string | null) => {
    if (interactive) setSelectedNode(id);
  };

  const commonProps = {
    diagram, isRTL, color,
    selected: interactive ? selectedNode : null,
    onSelect: handleSelect,
  };

  const renderers: Record<string, () => React.ReactNode> = {
    flowchart: () => <FlowchartView {...commonProps} />,
    iceberg: () => <IcebergView {...commonProps} />,
    wheel: () => <WheelView {...commonProps} />,
    cycle: () => <WheelView {...commonProps} />,
    triangle: () => <TriangleView {...commonProps} />,
    spectrum: () => <SpectrumView {...commonProps} />,
    quadrant: () => <QuadrantView {...commonProps} />,
  };

  const render = renderers[diagram.type] || renderers.flowchart;

  return (
    <div className={`rounded-2xl border border-[#F3EFE8] bg-white overflow-hidden my-6 ${className}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Title */}
      <div className="px-5 pt-5 pb-2">
        <h4 className="text-sm font-semibold text-[#2D2A33] text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
        </h4>
      </div>

      {/* Diagram */}
      <div className="px-3 pb-2">
        {render!()}
      </div>

      {/* Interaction hint */}
      {interactive && (
        <p className="text-center text-[10px] text-[#8E8E9F] pb-4 px-4">
          {isRTL ? 'اضغط على أي عنصر لمعرفة المزيد' : 'Click any element to learn more'}
        </p>
      )}
    </div>
  );
}
