'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  color?: string;
  containerRef?: React.RefObject<HTMLElement | null>;
}

export default function ReadingProgressBar({ color = '#7A3B5E', containerRef }: ReadingProgressBarProps) {
  const { scrollYProgress } = useScroll(containerRef ? { target: containerRef } : undefined);
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      setComplete(v >= 0.98);
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
      <motion.div
        className="h-full origin-left"
        style={{
          width,
          backgroundColor: color,
          boxShadow: complete ? `0 0 12px ${color}40` : 'none',
        }}
      />
    </div>
  );
}
