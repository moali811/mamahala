'use client';

import { useState, useEffect } from 'react';
import { generalFaqs as staticFaqs } from '@/data/faqs';
import type { FAQ } from '@/types';

export function useFAQs() {
  const [faqs, setFaqs] = useState<FAQ[]>(staticFaqs);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/faqs')
      .then(r => r.json())
      .then(data => {
        if (!cancelled && data.faqs && Array.isArray(data.faqs)) {
          setFaqs(data.faqs);
        }
      })
      .catch(() => { /* fall back to static */ })
      .finally(() => { if (!cancelled) setLoaded(true); });
    return () => { cancelled = true; };
  }, []);

  return { faqs, loaded };
}
