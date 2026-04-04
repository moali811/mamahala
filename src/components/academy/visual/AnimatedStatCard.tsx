'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { fadeUp, viewportOnce } from '@/lib/animations';

interface AnimatedStatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  source?: string;
  color?: string;
  className?: string;
}

export default function AnimatedStatCard({
  value,
  suffix = '%',
  prefix = '',
  label,
  source,
  color = '#7A3B5E',
  className = '',
}: AnimatedStatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`rounded-2xl border border-[#F3EFE8] p-5 bg-white ${className}`}
    >
      <div className="text-3xl font-bold mb-1" style={{ color }}>
        {prefix}{display}{suffix}
      </div>
      <p className="text-sm text-[#4A4A5C] leading-snug">{label}</p>
      {source && <p className="text-[10px] text-[#B0B0C0] mt-2 italic">{source}</p>}
    </motion.div>
  );
}
