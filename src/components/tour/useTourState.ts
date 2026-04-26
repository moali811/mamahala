'use client';

import { useCallback, useEffect, useState } from 'react';

type TourPhase = 'idle' | 'welcome' | 'running' | 'complete';

export interface UseTourStateOptions {
  /** Unique key for localStorage — different tours use different keys. */
  storageKey: string;
  /** Number of tour steps (excluding welcome + complete). */
  stepCount: number;
  /** Delay (ms) before showing the welcome prompt on first visit. */
  welcomeDelayMs?: number;
}

export interface TourState {
  phase: TourPhase;
  stepIndex: number;
  /** Begin a fresh run (used by the replay link). Ignores seen-flag. */
  start: () => void;
  /** User accepted the welcome prompt. */
  acceptWelcome: () => void;
  /** User dismissed the welcome prompt or pressed Escape mid-run. */
  dismiss: () => void;
  next: () => void;
  prev: () => void;
  complete: () => void;
}

const SEEN_VALUE = '1';

/**
 * Headless tour state. Shows the welcome prompt once per browser, then
 * advances through steps. Persists a "seen" flag in localStorage so repeat
 * visitors aren't pestered. The returned `start()` bypasses the flag for
 * replay links.
 */
export function useTourState(options: UseTourStateOptions): TourState {
  const { storageKey, stepCount, welcomeDelayMs = 1200 } = options;
  const [phase, setPhase] = useState<TourPhase>('idle');
  const [stepIndex, setStepIndex] = useState(0);

  // On mount, check the seen-flag and arm a scroll-trigger for the welcome.
  // We wait until the user scrolls DOWN past a small threshold from their
  // starting position before showing the tour prompt — this keeps the page
  // calm on first paint and only invites the tour once the user has chosen
  // to engage with the content. `welcomeDelayMs` becomes a small settle delay
  // applied after the scroll threshold is crossed, so the modal doesn't
  // appear in the middle of an active scroll gesture.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(storageKey) === SEEN_VALUE;
    } catch {
      /* private-mode or storage disabled — treat as unseen, don't persist later */
    }
    if (seen) return;

    const SCROLL_DOWN_THRESHOLD = 80; // px from initial scroll position
    const initialY = window.scrollY;
    let settleTimer: number | null = null;

    const onScroll = () => {
      if (window.scrollY - initialY < SCROLL_DOWN_THRESHOLD) return;
      window.removeEventListener('scroll', onScroll);
      settleTimer = window.setTimeout(() => setPhase('welcome'), welcomeDelayMs);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (settleTimer != null) window.clearTimeout(settleTimer);
    };
  }, [storageKey, welcomeDelayMs]);

  const markSeen = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(storageKey, SEEN_VALUE);
    } catch {
      /* ignore — tour will just re-show on next visit, no harm done */
    }
  }, [storageKey]);

  const start = useCallback(() => {
    setStepIndex(0);
    setPhase('running');
  }, []);

  const acceptWelcome = useCallback(() => {
    setStepIndex(0);
    setPhase('running');
  }, []);

  const dismiss = useCallback(() => {
    markSeen();
    setPhase('idle');
  }, [markSeen]);

  const complete = useCallback(() => {
    markSeen();
    setPhase('complete');
    // Auto-hide the "Tour complete" affordance after a beat.
    window.setTimeout(() => setPhase('idle'), 2200);
  }, [markSeen]);

  const next = useCallback(() => {
    setStepIndex(prev => {
      const nextIdx = prev + 1;
      if (nextIdx >= stepCount) {
        // Done — mark seen and flip to complete via microtask so state flows
        // cleanly (complete() both persists and auto-hides).
        queueMicrotask(() => complete());
        return prev;
      }
      return nextIdx;
    });
  }, [stepCount, complete]);

  const prev = useCallback(() => {
    setStepIndex(i => Math.max(0, i - 1));
  }, []);

  // Escape key = dismiss (from anywhere in running/welcome phases).
  useEffect(() => {
    if (phase !== 'running' && phase !== 'welcome') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, dismiss]);

  return { phase, stepIndex, start, acceptWelcome, dismiss, next, prev, complete };
}
