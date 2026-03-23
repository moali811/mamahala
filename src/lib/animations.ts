/* ================================================================
   Shared Framer Motion Animation Variants
   "Calm Confidence" - organic, purposeful, never flashy
   ================================================================ */

import type { Variants, Transition } from 'framer-motion';

// Custom easing - organic, confident feel
export const ease = [0.22, 1, 0.36, 1] as const;
export const easeOut = [0.25, 1, 0.5, 1] as const;

// ---- Base Transitions ----
export const transitionFast: Transition = { duration: 0.3, ease };
export const transitionNormal: Transition = { duration: 0.5, ease };
export const transitionSlow: Transition = { duration: 0.7, ease };

// ---- Fade Variants ----
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease },
  }),
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease },
  }),
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease },
  },
};

// ---- Container Variants ----
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// ---- Scale Variants ----
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease },
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

// ---- Slide Variants ----
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease },
  },
};

// ---- Card Hover ----
export const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: 'easeOut' as const },
};

export const cardTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
};

// ---- Page Transition ----
export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease },
  },
};

// ---- Text Reveal (word by word) ----
export const wordReveal: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};

export const wordRevealChild: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease },
  },
};

// ---- Line Draw ----
export const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease },
  },
};

// ---- Viewport Settings ----
export const viewportOnce = { once: true, margin: '-80px' as const };
export const viewportOnceEarly = { once: true, margin: '-40px' as const };
