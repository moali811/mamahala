'use client';

import { useState, useEffect, useRef } from 'react';
import type { Service, ServiceCategory } from '@/types';
import { services as staticServices, serviceCategories, getServicePricingForRegion, getCategoryInfo } from '@/data/services';

let globalServices: Service[] | null = null;
let fetchPromise: Promise<void> | null = null;

function fetchServiceData(): Promise<void> {
  if (fetchPromise) return fetchPromise;
  fetchPromise = fetch('/api/services')
    .then(r => r.json())
    .then(data => {
      if (data.services && Array.isArray(data.services)) {
        globalServices = data.services;
      }
    })
    .catch(() => { /* fall back to static */ })
    .finally(() => { fetchPromise = null; });
  return fetchPromise;
}

export function useServices() {
  const [services, setServices] = useState<Service[]>(() => globalServices || staticServices);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (globalServices) {
      setServices(globalServices);
    } else {
      fetchServiceData().then(() => {
        if (mounted.current && globalServices) setServices(globalServices);
      });
    }
    return () => { mounted.current = false; };
  }, []);

  const getServiceBySlug = (slug: string): Service | undefined =>
    services.find(s => s.slug === slug);

  // Exclude general-purpose services (Free Consultation & Online/Phone Consultation)
  // from category pages — they remain available for booking and admin workflows.
  const generalSlugs = new Set(['initial-consultation', 'online-phone-consultation']);
  const getServicesByCategory = (category: ServiceCategory): Service[] =>
    services.filter(s => s.category === category && !generalSlugs.has(s.slug));

  const getServiceCountByCategory = (category: ServiceCategory): number =>
    services.filter(s => s.category === category).length;

  return {
    services,
    loaded: !!globalServices,
    serviceCategories,
    getServiceBySlug,
    getServicesByCategory,
    getServiceCountByCategory,
    getCategoryInfo,
    getServicePricingForRegion,
  };
}
