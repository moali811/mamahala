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

  // On mount, check the seen-flag and schedule the welcome if unseen.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let seen = false;
    try {
      seen = window.localStorage.getItem(storageKey) === SEEN_VALUE;
    } catch {
      /* private-mode or storage disabled — treat as unseen, don't persist later */
    }
    if (seen) return;
    const timer = window.setTimeout(() => setPhase('welcome'), welcomeDelayMs);
    return () => window.clearTimeout(timer);
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
