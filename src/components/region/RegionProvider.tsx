'use client';

/* ================================================================
   RegionProvider — client context for pricing region + country
   ================================================================
   Holds three pieces of state:
   - `region`: in-person office toggle (CAD or AED) — sticky via localStorage
   - `country`: visitor's ISO country code (from Vercel geo header,
                defaults to 'CA' if unknown) — not user-changeable
   - `preferredCurrency`: optional currency override for the online price
                display — sticky via localStorage, cannot change the band

   Initial values come from the server to match SSR. After mount, the
   provider reconciles with localStorage for sticky preferences.
   ================================================================ */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { DEFAULT_REGION, type Region } from '@/config/pricing';

const STORAGE_KEY_REGION = 'mh_pricing_region';
const STORAGE_KEY_CURRENCY = 'mh_pricing_currency';

interface RegionContextValue {
  /** In-person office toggle — CAD (Canada) or AED (UAE). */
  region: Region;
  setRegion: (r: Region) => void;
  /** Visitor country (ISO-3166-alpha2). Server-detected, not user-changeable. */
  country: string;
  /**
   * Optional currency override for display of online prices.
   * null = use the country's native currency from the lookup.
   * Changing this does NOT affect the pricing band — only display.
   */
  preferredCurrency: string | null;
  setPreferredCurrency: (c: string | null) => void;
  /** True once the client has read localStorage. */
  hydrated: boolean;
}

const RegionContext = createContext<RegionContextValue | null>(null);

export function RegionProvider({
  initialRegion,
  initialCountry,
  children,
}: {
  initialRegion: Region;
  initialCountry: string;
  children: ReactNode;
}) {
  // Always render first paint with the SSR-safe initial values.
  const [region, setRegionState] = useState<Region>(initialRegion);
  const [country] = useState<string>(initialCountry);
  const [preferredCurrency, setPreferredCurrencyState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // After mount, reconcile sticky prefs with localStorage.
  useEffect(() => {
    try {
      const storedRegion = window.localStorage.getItem(STORAGE_KEY_REGION);
      if (storedRegion === 'CAD' || storedRegion === 'AED') {
        if (storedRegion !== region) setRegionState(storedRegion);
      }
      const storedCurrency = window.localStorage.getItem(STORAGE_KEY_CURRENCY);
      if (storedCurrency && /^[A-Z]{3}$/.test(storedCurrency)) {
        setPreferredCurrencyState(storedCurrency);
      }
    } catch {
      // ignore (private mode, disabled storage, etc.)
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setRegion = (r: Region) => {
    setRegionState(r);
    try {
      window.localStorage.setItem(STORAGE_KEY_REGION, r);
    } catch {
      // ignore
    }
  };

  const setPreferredCurrency = (c: string | null) => {
    setPreferredCurrencyState(c);
    try {
      if (c == null) window.localStorage.removeItem(STORAGE_KEY_CURRENCY);
      else window.localStorage.setItem(STORAGE_KEY_CURRENCY, c);
    } catch {
      // ignore
    }
  };

  return (
    <RegionContext.Provider
      value={{ region, setRegion, country, preferredCurrency, setPreferredCurrency, hydrated }}
    >
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const ctx = useContext(RegionContext);
  if (!ctx) throw new Error('useRegion must be used within <RegionProvider>');
  return ctx;
}

export { DEFAULT_REGION };
