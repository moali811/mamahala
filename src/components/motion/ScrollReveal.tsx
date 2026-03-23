'use client';

import { motion } from 'framer-motion';
import { ease, viewportOnce } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  threshold?: string;
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 20,
  className = '',
  once = true,
  threshold = '-80px',
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: threshold as `${number}px` }}
      transition={{ delay, duration, ease }}
    >
      {children}
    </motion.div>
  );
}

// Stagger wrapper for child animations
export function StaggerReveal({
  children,
  className = '',
  stagger = 0.08,
  delayChildren = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual stagger child
export function StaggerChild({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
