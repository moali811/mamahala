'use client';

import { useState, useEffect, useRef } from 'react';
import { testimonials as staticTestimonials } from '@/data/testimonials';

interface Testimonial {
  id?: string;
  name: string;
  text: string;
  textAr?: string;
  role: string;
  roleAr?: string;
  category: string;
  rating: number;
  featured?: boolean;
  source?: 'cms' | 'static';
}

let globalTestimonials: Testimonial[] | null = null;
let fetchPromise: Promise<void> | null = null;

function fetchTestimonialData(): Promise<void> {
  if (fetchPromise) return fetchPromise;
  fetchPromise = fetch('/api/testimonials')
    .then(r => r.json())
    .then(data => {
      if (data.testimonials && Array.isArray(data.testimonials)) {
        globalTestimonials = data.testimonials;
      }
    })
    .catch(() => { /* fall back to static */ })
    .finally(() => { fetchPromise = null; });
  return fetchPromise;
}

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => globalTestimonials || staticTestimonials);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (globalTestimonials) {
      setTestimonials(globalTestimonials);
    } else {
      fetchTestimonialData().then(() => {
        if (mounted.current && globalTestimonials) setTestimonials(globalTestimonials);
      });
    }
    return () => { mounted.current = false; };
  }, []);

  const getTestimonialsByCategory = (category: string) =>
    testimonials.filter(t => t.category === category);

  const getFeaturedTestimonials = () =>
    testimonials.filter(t => t.featured);

  return { testimonials, loaded: !!globalTestimonials, getTestimonialsByCategory, getFeaturedTestimonials };
}
