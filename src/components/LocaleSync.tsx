'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Keeps <html lang> and <html dir> in sync on soft navigations.
 * The inline script in <head> handles initial hard loads (no flash);
 * this component handles subsequent client-side navigations.
 */
export default function LocaleSync() {
  const pathname = usePathname();

  useEffect(() => {
    const isAr = pathname.startsWith('/ar');
    document.documentElement.lang = isAr ? 'ar' : 'en';
    document.documentElement.dir = isAr ? 'rtl' : 'ltr';
  }, [pathname]);

  return null;
}
