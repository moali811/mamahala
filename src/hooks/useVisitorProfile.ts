'use client';

import { useState, useEffect, useCallback } from 'react';
import type { ServiceCategory, EventAudience } from '@/types';

/* ================================================================
   Visitor Profile Hook
   ================================================================
   Tracks visitor interests in localStorage to power personalized
   event recommendations. No privacy concerns — purely client-side.
   ================================================================ */

export interface VisitorEventProfile {
  /** Service categories the visitor has viewed */
  viewedCategories: ServiceCategory[];
  /** Event slugs the visitor has voted on (pulse) */
  votedEvents: string[];
  /** Quiz slugs the visitor has completed */
  quizSlugs: string[];
  /** Inferred audience segments based on activity */
  inferredAudiences: EventAudience[];
  /** Total site visits */
  visitCount: number;
  /** Whether there's enough data to personalize */
  hasProfile: boolean;
}

const STORAGE_KEY = 'mhc:visitor-profile';

interface StoredProfile {
  viewedCategories: string[];
  votedEvents: string[];
  quizSlugs: string[];
  visitCount: number;
  lastVisit: string;
}

function getStored(): StoredProfile {
  if (typeof window === 'undefined') return defaultProfile();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProfile();
    return JSON.parse(raw);
  } catch {
    return defaultProfile();
  }
}

function defaultProfile(): StoredProfile {
  return {
    viewedCategories: [],
    votedEvents: [],
    quizSlugs: [],
    visitCount: 0,
    lastVisit: '',
  };
}

function save(profile: StoredProfile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch { /* quota exceeded — silent */ }
}

/** Map service categories to event audiences */
const categoryToAudience: Record<string, EventAudience[]> = {
  youth: ['youth'],
  families: ['families'],
  adults: ['adults'],
  couples: ['couples'],
  experiential: ['adults', 'community'],
};

function inferAudiences(categories: string[]): EventAudience[] {
  const set = new Set<EventAudience>();
  for (const cat of categories) {
    const audiences = categoryToAudience[cat];
    if (audiences) audiences.forEach((a) => set.add(a));
  }
  return Array.from(set);
}

export function useVisitorProfile(): VisitorEventProfile & {
  trackCategory: (category: ServiceCategory) => void;
  trackQuiz: (quizSlug: string) => void;
} {
  const [profile, setProfile] = useState<StoredProfile>(defaultProfile);

  // Load profile on mount + increment visit count
  useEffect(() => {
    const stored = getStored();
    const today = new Date().toISOString().split('T')[0];

    // Increment visit count once per day
    if (stored.lastVisit !== today) {
      stored.visitCount += 1;
      stored.lastVisit = today;
      save(stored);
    }

    // Collect pulse votes from individual localStorage keys
    const votedEvents = new Set(stored.votedEvents);
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('pulse:') && localStorage.getItem(key) === '1') {
        votedEvents.add(key.replace('pulse:', ''));
      }
    }
    stored.votedEvents = Array.from(votedEvents);
    save(stored);

    setProfile(stored);
  }, []);

  const trackCategory = useCallback((category: ServiceCategory) => {
    setProfile((prev) => {
      if (prev.viewedCategories.includes(category)) return prev;
      const updated = { ...prev, viewedCategories: [...prev.viewedCategories, category] };
      save(updated);
      return updated;
    });
  }, []);

  const trackQuiz = useCallback((quizSlug: string) => {
    setProfile((prev) => {
      if (prev.quizSlugs.includes(quizSlug)) return prev;
      const updated = { ...prev, quizSlugs: [...prev.quizSlugs, quizSlug] };
      save(updated);
      return updated;
    });
  }, []);

  const inferredAudiences = inferAudiences(profile.viewedCategories);
  const hasProfile = profile.votedEvents.length > 0 || profile.viewedCategories.length > 0 || profile.quizSlugs.length > 0;

  return {
    viewedCategories: profile.viewedCategories as ServiceCategory[],
    votedEvents: profile.votedEvents,
    quizSlugs: profile.quizSlugs,
    inferredAudiences,
    visitCount: profile.visitCount,
    hasProfile,
    trackCategory,
    trackQuiz,
  };
}
