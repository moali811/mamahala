'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Globe, Phone, Menu, X, Calendar } from 'lucide-react';
import type { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
  messages: Record<string, any>;
}

export default function Header({ locale, messages }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<NodeJS.Timeout | null>(null);

  const isRTL = locale === 'ar';
  const altLocale = locale === 'en' ? 'ar' : 'en';
  const nav = messages?.nav ?? {};

  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
  const langSwitchHref = `/${altLocale}${pathnameWithoutLocale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const servicesItems = [
    { label: isRTL ? 'جميع الخدمات' : 'All Services', href: `/${locale}/services`, desc: isRTL ? 'تصفح جميع خدماتنا' : 'Browse all our services' },
    { label: nav.youth, href: `/${locale}/services/youth`, desc: isRTL ? 'أطفال ومراهقون' : 'Children & teens' },
    { label: nav.families, href: `/${locale}/services/families`, desc: isRTL ? 'بناء روابط أقوى' : 'Building stronger bonds' },
    { label: nav.adults, href: `/${locale}/services/adults`, desc: isRTL ? 'نمو شخصي ورفاهية' : 'Personal growth & wellbeing' },
    { label: nav.couples, href: `/${locale}/services/couples`, desc: isRTL ? 'تعزيز الحب والشراكة' : 'Strengthening love & partnership' },
  ];

  const resourcesItems = [
    { label: nav.blog, href: `/${locale}/resources/blog`, desc: isRTL ? 'مقالات ونصائح' : 'Articles & insights' },
    { label: nav.programs, href: `/${locale}/resources/programs`, desc: isRTL ? 'دورات وبرامج جماعية' : 'Courses & group programs' },
    { label: nav.events, href: `/${locale}/resources/events`, desc: isRTL ? 'ورش عمل وفعاليات' : 'Workshops & events' },
    { label: nav.downloads, href: `/${locale}/resources/downloads`, desc: isRTL ? 'أدوات ومراجع مجانية' : 'Free tools & guides' },
    { label: nav.faqs, href: `/${locale}/resources/faqs`, desc: isRTL ? 'أسئلة شائعة' : 'Common questions' },
  ];

  type NavItem =
    | { label: string; href: string; dropdown?: undefined; items?: undefined }
    | { label: string; href?: undefined; dropdown: string; items: { label: string; href: string; desc?: string }[] };

  const navItems: NavItem[] = [
    { label: nav.about, href: `/${locale}/about` },
    { label: nav.services, dropdown: 'services', items: servicesItems },
    { label: nav.resources, dropdown: 'resources', items: resourcesItems },
    { label: nav.contact, href: `/${locale}/contact` },
  ];

  const handleDropdownEnter = useCallback((key: string) => {
    if (dropdownRef.current) clearTimeout(dropdownRef.current);
    setOpenDropdown(key);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownRef.current = setTimeout(() => setOpenDropdown(null), 120);
  }, []);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  const isDropdownActive = (items: { href: string }[]) => items.some((item) => pathname.startsWith(item.href));

  return (
    <>
      <header
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-subtle)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Mama Hala Consulting"
                width={44}
                height={44}
                className="h-10 w-10 rounded-full object-contain"
              />
              <span
                className="text-sm font-semibold text-[#7A3B5E]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'د. هالة علي | ماما هالة' : 'Dr. Hala Ali | Mama Hala'}
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) =>
                item.dropdown ? (
                  <div
                    key={item.dropdown}
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.dropdown)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`group inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                        isDropdownActive(item.items)
                          ? 'text-[#7A3B5E]'
                          : 'text-[#2D2A33] hover:text-[#7A3B5E] hover:bg-[#7A3B5E]/5'
                      }`}
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`opacity-50 transition-transform duration-200 ${
                          openDropdown === item.dropdown ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isDropdownActive(item.items) && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#7A3B5E]" />
                    )}

                    <AnimatePresence>
                      {openDropdown === item.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.97 }}
                          transition={{ duration: 0.18, ease: 'easeOut' }}
                          className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 min-w-[260px] overflow-hidden rounded-xl border border-[#F3EFE8] bg-white py-2 shadow-[var(--shadow-elevated)]`}
                        >
                          {item.items.map((subItem, idx) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`block px-4 py-2.5 transition-colors duration-150 ${
                                idx === 0 ? 'border-b border-[#F3EFE8] mb-1' : ''
                              } ${
                                isActive(subItem.href)
                                  ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                                  : 'text-[#4A4A5C] hover:bg-[#7A3B5E]/5 hover:text-[#7A3B5E]'
                              }`}
                            >
                              <span className={`block text-sm font-medium ${isActive(subItem.href) ? 'text-[#7A3B5E]' : ''}`}>
                                {subItem.label}
                              </span>
                              {subItem.desc && (
                                <span className="block text-xs text-[#8E8E9F] mt-0.5">{subItem.desc}</span>
                              )}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div key={item.href} className="relative">
                    <Link
                      href={item.href!}
                      className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                        isActive(item.href!)
                          ? 'text-[#7A3B5E]'
                          : 'text-[#2D2A33] hover:text-[#7A3B5E] hover:bg-[#7A3B5E]/5'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {isActive(item.href!) && (
                      <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#7A3B5E]" />
                    )}
                  </div>
                )
              )}
            </nav>

            {/* Desktop Right */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <Link
                href={langSwitchHref}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#F3EFE8] px-3 py-2 text-sm font-medium text-[#4A4A5C] transition-colors hover:border-[#7A3B5E]/20 hover:text-[#7A3B5E]"
              >
                <Globe size={15} className="opacity-60" />
                {locale === 'en' ? 'AR' : 'EN'}
              </Link>

              <Link
                href={`/${locale}/book-a-session`}
                className="inline-flex items-center gap-2 rounded-full bg-[#7A3B5E] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#5E2D48] hover:shadow-[var(--shadow-glow-plum)] active:scale-[0.98]"
              >
                <Calendar size={15} />
                {nav.bookNow}
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="relative z-[60] rounded-lg p-2 text-[#2D2A33] transition-colors hover:bg-[#F3EFE8] lg:hidden"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            dir={isRTL ? 'rtl' : 'ltr'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white lg:hidden"
          >
            <div className="h-20" />
            <div className="flex min-h-[calc(100vh-5rem)] flex-col px-6 pb-10">
              <nav className="flex-1">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.04, duration: 0.3 }}
                  >
                    {item.dropdown ? (
                      <div className="border-b border-[#F3EFE8]">
                        <button
                          onClick={() => setMobileDropdown(mobileDropdown === item.dropdown ? null : item.dropdown)}
                          className={`flex w-full items-center justify-between py-4 text-lg font-medium ${
                            isDropdownActive(item.items) ? 'text-[#7A3B5E]' : 'text-[#2D2A33]'
                          }`}
                        >
                          {item.label}
                          <ChevronDown
                            size={18}
                            className={`opacity-50 transition-transform duration-200 ${
                              mobileDropdown === item.dropdown ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        <AnimatePresence>
                          {mobileDropdown === item.dropdown && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <div className={`pb-3 ${isRTL ? 'pr-3' : 'pl-3'}`}>
                                {item.items.map((subItem) => (
                                  <Link
                                    key={subItem.href}
                                    href={subItem.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`block rounded-lg px-4 py-3 transition-colors ${
                                      isActive(subItem.href)
                                        ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                                        : 'text-[#4A4A5C] hover:bg-[#7A3B5E]/5'
                                    }`}
                                  >
                                    <span className={`block text-[15px] font-medium ${isActive(subItem.href) ? 'text-[#7A3B5E]' : ''}`}>
                                      {subItem.label}
                                    </span>
                                    {subItem.desc && (
                                      <span className="block text-xs text-[#8E8E9F] mt-0.5">{subItem.desc}</span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href!}
                        onClick={() => setMobileOpen(false)}
                        className={`block border-b border-[#F3EFE8] py-4 text-lg font-medium ${
                          isActive(item.href!) ? 'text-[#7A3B5E]' : 'text-[#2D2A33]'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-8 flex flex-col gap-3"
              >
                <Link
                  href={langSwitchHref}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#F3EFE8] py-3.5 text-sm font-medium text-[#4A4A5C]"
                >
                  <Globe size={18} className="opacity-60" />
                  {locale === 'en' ? 'العربية' : 'English'}
                </Link>
                <Link
                  href={`/${locale}/book-a-session`}
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#7A3B5E] py-3.5 text-sm font-semibold text-white"
                >
                  <Calendar size={18} />
                  {nav.bookNow}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
