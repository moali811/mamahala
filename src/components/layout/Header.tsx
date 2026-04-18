'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, ChevronRight, Globe, Menu, X, Calendar,
  BookOpen, GraduationCap, CalendarDays, Download, HelpCircle, Layers, Sparkles, PenLine, LayoutGrid,
  Sprout, Users, User, Heart, TreePine,
} from 'lucide-react';
import { serviceCategories } from '@/data/services';
import { useServices } from '@/hooks/useServices';
import { getBookingUrl } from '@/config/business';
import type { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
  messages: Record<string, any>;
}

/* ── Category icons ─────────────────────────────────── */
const categoryIcons: Record<string, React.ReactNode> = {
  youth:        <Sprout size={16} />,
  families:     <Users size={16} />,
  adults:       <User size={16} />,
  couples:      <Heart size={16} />,
  experiential: <TreePine size={16} />,
};

/* ── Resource icons ─────────────────────────────────────────── */
const resourceIcons: Record<string, React.ReactNode> = {
  blog:      <BookOpen size={16} />,
  programs:  <GraduationCap size={16} />,
  events:    <CalendarDays size={16} />,
  downloads: <Download size={16} />,
  faqs:      <HelpCircle size={16} />,
  assessments: <Sparkles size={16} />,
};

export default function Header({ locale, messages }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [mobileServiceCategory, setMobileServiceCategory] = useState<string | null>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<NodeJS.Timeout | null>(null);

  const { services: allServices } = useServices();
  const isRTL = locale === 'ar';
  const altLocale = locale === 'en' ? 'ar' : 'en';
  const nav = messages?.nav ?? {};

  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
  const langSwitchHref = `/${altLocale}${pathnameWithoutLocale}`;

  // Save scroll position before language switch, preserve search params
  const handleLangSwitch = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    sessionStorage.setItem('mh_scroll_y', String(window.scrollY));
    window.location.href = `/${altLocale}${pathnameWithoutLocale}${window.location.search}`;
  }, [altLocale, pathnameWithoutLocale]);

  useEffect(() => {
    const savedY = sessionStorage.getItem('mh_scroll_y');
    if (savedY) {
      sessionStorage.removeItem('mh_scroll_y');
      const y = parseInt(savedY, 10);
      // Wait for content to render before restoring scroll
      const restore = () => window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
      // Try multiple times as content loads
      restore();
      requestAnimationFrame(restore);
      setTimeout(restore, 100);
      setTimeout(restore, 300);
    }
  }, []);

  /* ── Build services mega-menu data ───────── */
  const generalSlugs = new Set(['initial-consultation', 'online-phone-consultation']);
  const serviceCategoryData = serviceCategories.map((cat) => ({
    key: cat.key,
    label: nav[cat.key] || (isRTL ? cat.nameAr : cat.name),
    href: `/${locale}/services/${cat.key}`,
    services: allServices
      .filter((s) => s.category === cat.key && !generalSlugs.has(s.slug))
      .map((s) => ({
        label: isRTL ? s.nameAr : s.name,
        href: `/${locale}/services/${cat.key}/${s.slug}`,
      })),
  }));

  /* ── Resources items with icons ───────── */
  const resourcesItems = [
    { key: 'assessments', label: isRTL ? 'تقييماتٌ ذاتيّة' : 'Check-ins', href: `/${locale}/resources/assessments`, desc: isRTL ? 'اكتشِفْ نفسَك وعائلتَك' : 'Understand yourself & family' },
    { key: 'blog', label: nav.blog, href: `/${locale}/resources/blog`, desc: isRTL ? 'مقالات ونصائح' : 'Articles & insights' },
    { key: 'downloads', label: nav.downloads, href: `/${locale}/resources/downloads`, desc: isRTL ? 'أدوات ومراجع مجانية' : 'Free tools & guides' },
    { key: 'events', label: nav.events, href: `/${locale}/resources/events`, desc: isRTL ? 'ورش عمل وفعاليات' : 'Workshops & events' },
    { key: 'programs', label: nav.programs, href: `/${locale}/resources/programs`, desc: isRTL ? 'دورات وبرامج جماعية' : 'Courses & group programs' },
    { key: 'faqs', label: nav.faqs, href: `/${locale}/resources/faqs`, desc: isRTL ? 'أسئلة شائعة' : 'Common questions' },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileDropdown(null);
    setMobileServiceCategory(null);
  }, [pathname]);

  const handleDropdownEnter = useCallback((key: string) => {
    if (dropdownRef.current) clearTimeout(dropdownRef.current);
    setOpenDropdown(key);
    if (key === 'services' && serviceCategoryData.length > 0) {
      const activeCategory = serviceCategoryData.find(c => pathname.startsWith(c.href));
      setHoveredCategory(activeCategory?.key ?? serviceCategoryData[0].key);
    }
  }, [serviceCategoryData, pathname]);

  const handleDropdownLeave = useCallback(() => {
    dropdownRef.current = setTimeout(() => setOpenDropdown(null), 350);
  }, []);

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === `/${locale}` || pathname === `/${locale}/`;
    return pathname.startsWith(href);
  };

  const isServicesActive = () => pathname.startsWith(`/${locale}/services`);
  const isResourcesActive = () => pathname.startsWith(`/${locale}/resources`);

  return (
    <>
      <header
        dir={isRTL ? 'rtl' : 'ltr'}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/60 shadow-[var(--shadow-subtle)] backdrop-blur-xl'
            : 'bg-white/30 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
              <Image
                src="/images/logo-new.png"
                alt="Mama Hala Consulting"
                width={512}
                height={512}
                className="h-11 w-11 rounded-full object-cover scale-[1.15] ring-1 ring-[#D4ADA8]/25"
                priority
              />
              <span
                className="text-sm font-semibold text-[#7A3B5E]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'د. هالة علي | ماما هالة' : 'Dr. Hala Ali | Mama Hala'}
              </span>
            </Link>

            {/* ═══════════════ Desktop Nav ═══════════════ */}
            <nav className="hidden items-center gap-0.5 lg:flex">
              {/* About */}
              <div className="relative">
                <Link
                  href={`/${locale}/about`}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(`/${locale}/about`)
                      ? 'text-[#7A3B5E]'
                      : 'text-[#2D2A33] hover:text-[#7A3B5E] hover:bg-[#7A3B5E]/5'
                  }`}
                >
                  {nav.about}
                </Link>
                {isActive(`/${locale}/about`) && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#7A3B5E]" />
                )}
              </div>

              {/* ── Services Mega Menu ── */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`group inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isServicesActive()
                      ? 'text-[#7A3B5E]'
                      : 'text-[#2D2A33] hover:text-[#7A3B5E] hover:bg-[#7A3B5E]/5'
                  }`}
                >
                  {nav.services}
                  <ChevronDown
                    size={14}
                    className={`opacity-50 transition-transform duration-200 ${
                      openDropdown === 'services' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isServicesActive() && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#7A3B5E]" />
                )}

                <AnimatePresence>
                  {openDropdown === 'services' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className={`absolute top-full ${isRTL ? 'right-0' : 'left-1/2 -translate-x-1/2'} mt-2 w-[520px] overflow-hidden rounded-2xl border border-[#F3EFE8] bg-white shadow-[var(--shadow-elevated)]`}
                      onMouseLeave={() => setHoveredCategory(null)}
                    >
                      {/* All Services banner */}
                      <Link
                        href={`/${locale}/services`}
                        className="group flex items-center justify-between bg-gradient-to-r from-[#7A3B5E]/[0.06] to-[#C8A97D]/[0.08] px-5 py-3 transition-all hover:from-[#7A3B5E]/[0.10] hover:to-[#C8A97D]/[0.12]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7A3B5E]/10">
                            <Layers size={14} className="text-[#7A3B5E]" />
                          </span>
                          <span className="text-[13px] font-semibold text-[#7A3B5E]" style={{ fontFamily: 'var(--font-heading)' }}>
                            {isRTL ? 'جميع الخدمات' : 'All Services'}
                          </span>
                        </div>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#7A3B5E]/10 transition-transform ${isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}>
                          <ChevronRight size={12} className={`text-[#7A3B5E] ${isRTL ? 'rotate-180' : ''}`} />
                        </span>
                      </Link>

                      {/* Two-level: Categories (left) + Services (right) */}
                      <div className="flex min-h-[280px]">
                        {/* Level 1: Category list */}
                        <div className={`w-[200px] border-${isRTL ? 'l' : 'r'} border-[#F3EFE8] p-1.5`}>
                          {serviceCategoryData.map((cat) => (
                            <Link
                              key={cat.key}
                              href={cat.href}
                              onMouseEnter={() => setHoveredCategory(cat.key)}
                              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
                                hoveredCategory === cat.key
                                  ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                                  : 'text-[#2D2A33] hover:bg-[#F9F7F3]'
                              }`}
                            >
                              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                hoveredCategory === cat.key ? 'bg-[#7A3B5E]/10 text-[#7A3B5E]' : 'bg-[#F3EFE8] text-[#7A3B5E]'
                              }`}>
                                {categoryIcons[cat.key]}
                              </span>
                              <span className="flex-1">{cat.label}</span>
                              <span className="text-[10px] text-[#8E8E9F] bg-[#F3EFE8] px-1.5 py-0.5 rounded-full">{cat.services.length}</span>
                              <ChevronRight size={11} className={`opacity-30 ${isRTL ? 'rotate-180' : ''}`} />
                            </Link>
                          ))}
                        </div>

                        {/* Level 2: Services for hovered category */}
                        <div className="flex-1 p-2">
                          <div className="space-y-0.5">
                            {serviceCategoryData.find(c => c.key === hoveredCategory)?.services.map((svc) => (
                              <Link
                                key={svc.href}
                                href={svc.href}
                                className={`block rounded-lg px-3 py-2 text-[12.5px] leading-snug transition-colors ${
                                  isActive(svc.href)
                                    ? 'bg-[#7A3B5E]/5 text-[#7A3B5E] font-medium'
                                    : 'text-[#4A4A5C] hover:bg-[#F9F7F3] hover:text-[#2D2A33]'
                                }`}
                              >
                                {svc.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Quiz hint */}
                      <div className="border-t border-[#F3EFE8] bg-[#FDFCFA] px-5 py-2.5">
                        <Link
                          href={`/${locale}/quiz`}
                          className="inline-flex items-center gap-2 text-[11px] font-medium text-[#8E8E9F] transition-colors hover:text-[#7A3B5E]"
                        >
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7A3B5E]/8 text-[9px] text-[#7A3B5E]">?</span>
                          {isRTL ? 'لست متأكدًا؟ خذ اختبارنا السريع' : 'Not sure? Take our quick quiz'}
                          <ChevronRight size={10} className={isRTL ? 'rotate-180' : ''} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Resources Dropdown ── */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('resources')}
                onMouseLeave={handleDropdownLeave}
              >
                <button
                  className={`group inline-flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isResourcesActive()
                      ? 'text-[#7A3B5E]'
                      : 'text-[#2D2A33] hover:text-[#7A3B5E] hover:bg-[#7A3B5E]/5'
                  }`}
                >
                  {nav.resources}
                  <ChevronDown
                    size={14}
                    className={`opacity-50 transition-transform duration-200 ${
                      openDropdown === 'resources' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isResourcesActive() && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#7A3B5E]" />
                )}

                <AnimatePresence>
                  {openDropdown === 'resources' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-2 w-[300px] overflow-hidden rounded-2xl border border-[#F3EFE8] bg-white shadow-[var(--shadow-elevated)]`}
                    >
                      {/* All Resources - top banner */}
                      <Link
                        href={`/${locale}/resources`}
                        className="group flex items-center justify-between bg-gradient-to-r from-[#7A3B5E]/[0.06] to-[#C8A97D]/[0.08] px-5 py-3 transition-all hover:from-[#7A3B5E]/[0.10] hover:to-[#C8A97D]/[0.12]"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#7A3B5E]/10">
                            <LayoutGrid size={14} className="text-[#7A3B5E]" />
                          </span>
                          <span className="text-[13px] font-semibold text-[#7A3B5E]" style={{ fontFamily: 'var(--font-heading)' }}>
                            {isRTL ? 'جميع الموارد' : 'All Resources'}
                          </span>
                        </div>
                        <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-[#7A3B5E]/10 transition-transform ${isRTL ? 'group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}>
                          <ChevronRight size={12} className={`text-[#7A3B5E] ${isRTL ? 'rotate-180' : ''}`} />
                        </span>
                      </Link>

                      <div className="p-2">
                        {resourcesItems.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 ${
                              isActive(subItem.href)
                                ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                                : 'text-[#4A4A5C] hover:bg-[#F9F7F3] hover:text-[#2D2A33]'
                            }`}
                          >
                            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                              isActive(subItem.href) ? 'bg-[#7A3B5E]/10 text-[#7A3B5E]' : 'bg-[#F3EFE8] text-[#8E8E9F]'
                            }`}>
                              {resourceIcons[subItem.key]}
                            </span>
                            <div className="min-w-0">
                              <span className={`block text-[13px] font-medium leading-tight ${isActive(subItem.href) ? 'text-[#7A3B5E]' : ''}`}>
                                {subItem.label}
                              </span>
                              {subItem.desc && (
                                <span className="block text-[11px] text-[#8E8E9F] mt-0.5 leading-tight">{subItem.desc}</span>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <div className="relative">
                <Link
                  href={`/${locale}/contact`}
                  className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive(`/${locale}/contact`)
                      ? 'text-[#7A3B5E]'
                      : 'text-[#2D2A33] hover:text-[#7A3B5E] hover:bg-[#7A3B5E]/5'
                  }`}
                >
                  {nav.contact}
                </Link>
                {isActive(`/${locale}/contact`) && (
                  <span className="absolute bottom-0 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#7A3B5E]" />
                )}
              </div>
            </nav>

            {/* Desktop Right */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <a
                href={langSwitchHref}
                onClick={handleLangSwitch}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#F3EFE8] px-2.5 py-1.5 text-xs font-medium text-[#4A4A5C] transition-colors hover:border-[#7A3B5E]/20 hover:text-[#7A3B5E]"
              >
                <Globe size={14} className="opacity-60" />
                {locale === 'en' ? 'AR' : 'EN'}
              </a>

              <Link
                href={getBookingUrl(locale as string)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#7A3B5E] px-4 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-[#5E2D48] hover:shadow-[var(--shadow-elevated)] active:scale-[0.98]"
              >
                <Calendar size={14} />
                {nav.bookNow}
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="relative z-[60] rounded-lg p-2 text-[#2D2A33] transition-colors hover:bg-[#F3EFE8] lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════════ Mobile Menu ═══════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            dir={isRTL ? 'rtl' : 'ltr'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={`absolute top-0 bottom-0 ${isRTL ? 'left-0' : 'right-0'} w-[85vw] max-w-[380px] bg-white shadow-2xl`}
            >
              {/* Compact header */}
              <div className="flex h-14 items-center justify-between px-4 border-b border-[#F3EFE8]">
                <Link href={`/${locale}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <Image src="/images/logo-new.png" alt="Mama Hala" width={512} height={512} className="h-10 w-10 rounded-full object-cover scale-[1.15] ring-1 ring-[#D4ADA8]/25" />
                  <span className="text-sm font-semibold text-[#7A3B5E]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'د. هالة علي | ماما هالة' : 'Dr. Hala Ali | Mama Hala'}
                  </span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3EFE8] text-[#4A4A5C]" aria-label="Close">
                  <X size={16} />
                </button>
              </div>

              {/* Content + pinned bottom — safe area aware */}
              <div className="flex flex-col" style={{ height: 'calc(100dvh - 3.5rem)' }}>
                <nav className="flex-1 overflow-y-auto px-3 py-2">

                  {/* About */}
                  <div>
                    <Link
                      href={`/${locale}/about`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        isActive(`/${locale}/about`)
                          ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                          : 'text-[#2D2A33] hover:bg-[#F9F7F3]'
                      }`}
                    >
                      {nav.about}
                    </Link>
                  </div>

                  {/* ── Services ── */}
                  <div>
                    <button
                      onClick={() => {
                        setMobileDropdown(mobileDropdown === 'services' ? null : 'services');
                        if (mobileDropdown !== 'services') setMobileServiceCategory(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        isServicesActive() ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]' : 'text-[#2D2A33] hover:bg-[#F9F7F3]'
                      }`}
                    >
                      {nav.services}
                      <ChevronDown
                        size={16}
                        className={`opacity-40 transition-transform duration-200 ${
                          mobileDropdown === 'services' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileDropdown === 'services' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className={`py-1 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                            {/* All Services card */}
                            <Link
                              href={`/${locale}/services`}
                              onClick={() => setMobileOpen(false)}
                              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                                pathname === `/${locale}/services`
                                  ? 'bg-gradient-to-r from-[#7A3B5E]/12 to-[#C8A97D]/10 ring-1 ring-[#7A3B5E]/15'
                                  : 'bg-gradient-to-r from-[#7A3B5E]/[0.06] to-[#C8A97D]/[0.06] hover:from-[#7A3B5E]/10 hover:to-[#C8A97D]/10'
                              }`}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7A3B5E]/10">
                                <Layers size={15} className="text-[#7A3B5E]" />
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="block text-[13px] font-semibold text-[#7A3B5E]">
                                  {isRTL ? 'جميع الخدمات' : 'All Services'}
                                </span>
                                <span className="block text-[11px] text-[#8E8E9F]">
                                  {isRTL ? 'تصفّح كامل خدماتنا' : 'Browse all counseling services'}
                                </span>
                              </div>
                              <ChevronRight size={14} className={`text-[#7A3B5E] opacity-40 ${isRTL ? 'rotate-180' : ''}`} />
                            </Link>

                            {/* Category items with icons */}
                            {serviceCategoryData.map((cat) => {
                              const isCatOpen = mobileServiceCategory === cat.key;
                              return (
                                <div key={cat.key} className="mb-0.5">
                                  <button
                                    onClick={() => setMobileServiceCategory(isCatOpen ? null : cat.key)}
                                    className={`flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5 text-[13px] font-semibold transition-colors ${isCatOpen ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]' : 'text-[#2D2A33] hover:bg-[#F9F7F3]'}`}
                                  >
                                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${isCatOpen ? 'bg-[#7A3B5E]/10 text-[#7A3B5E]' : 'bg-[#F3EFE8] text-[#8E8E9F]'}`}>
                                      {categoryIcons[cat.key]}
                                    </span>
                                    <span className="flex-1 text-start">{cat.label}</span>
                                    <ChevronDown
                                      size={14}
                                      className={`opacity-40 transition-transform duration-200 ${isCatOpen ? 'rotate-180' : ''}`}
                                    />
                                  </button>

                                  <AnimatePresence>
                                    {isCatOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                      >
                                        <div className={`py-1 ${isRTL ? 'pr-3' : 'pl-3'}`}>
                                          <Link
                                            href={cat.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`mb-0.5 block rounded-md px-3 py-2 text-[12px] font-medium transition-colors ${
                                              pathname === cat.href
                                                ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                                                : 'text-[#7A3B5E] hover:bg-[#F9F7F3]'
                                            }`}
                                          >
                                            {isRTL ? `عرض كل ${cat.label}` : `View All ${cat.label}`} →
                                          </Link>
                                          {cat.services.map((svc) => (
                                            <Link
                                              key={svc.href}
                                              href={svc.href}
                                              onClick={() => setMobileOpen(false)}
                                              className={`block rounded-md px-3 py-2 text-[12px] transition-colors ${
                                                isActive(svc.href)
                                                  ? 'bg-[#7A3B5E]/5 text-[#7A3B5E] font-medium'
                                                  : 'text-[#4A4A5C] hover:bg-[#F9F7F3]'
                                              }`}
                                            >
                                              {svc.label}
                                            </Link>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}

                            {/* Quiz CTA */}
                            <Link
                              href={`/${locale}/quiz`}
                              onClick={() => setMobileOpen(false)}
                              className="mt-1 flex items-center gap-2 rounded-lg bg-[#7A3B5E]/5 px-4 py-2.5 text-[12px] font-medium text-[#7A3B5E]"
                            >
                              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7A3B5E]/10 text-[10px]">?</span>
                              {isRTL ? 'خذ اختبارنا السريع' : 'Take our quick quiz'}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* ── Resources ── */}
                  <div>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === 'resources' ? null : 'resources')}
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        isResourcesActive() ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]' : 'text-[#2D2A33] hover:bg-[#F9F7F3]'
                      }`}
                    >
                      {nav.resources}
                      <ChevronDown
                        size={16}
                        className={`opacity-40 transition-transform duration-200 ${
                          mobileDropdown === 'resources' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {mobileDropdown === 'resources' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className={`py-1 ${isRTL ? 'pr-2' : 'pl-2'}`}>
                            {/* All Resources card */}
                            <Link
                              href={`/${locale}/resources`}
                              onClick={() => setMobileOpen(false)}
                              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                                pathname === `/${locale}/resources`
                                  ? 'bg-gradient-to-r from-[#7A3B5E]/12 to-[#C8A97D]/10 ring-1 ring-[#7A3B5E]/15'
                                  : 'bg-gradient-to-r from-[#7A3B5E]/[0.06] to-[#C8A97D]/[0.06] hover:from-[#7A3B5E]/10 hover:to-[#C8A97D]/10'
                              }`}
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7A3B5E]/10">
                                <LayoutGrid size={15} className="text-[#7A3B5E]" />
                              </span>
                              <div className="flex-1 min-w-0">
                                <span className="block text-[13px] font-semibold text-[#7A3B5E]">
                                  {isRTL ? 'جميع الموارد' : 'All Resources'}
                                </span>
                                <span className="block text-[11px] text-[#8E8E9F]">
                                  {isRTL ? 'أدوات ومقالات وبرامج' : 'Tools, articles & programs'}
                                </span>
                              </div>
                              <ChevronRight size={14} className={`text-[#7A3B5E] opacity-40 ${isRTL ? 'rotate-180' : ''}`} />
                            </Link>

                            {/* Resource items with icons */}
                            {resourcesItems.map((subItem) => (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors ${
                                  isActive(subItem.href)
                                    ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                                    : 'text-[#4A4A5C] hover:bg-[#F9F7F3]'
                                }`}
                              >
                                <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                                  isActive(subItem.href) ? 'bg-[#7A3B5E]/10 text-[#7A3B5E]' : 'bg-[#F3EFE8] text-[#8E8E9F]'
                                }`}>
                                  {resourceIcons[subItem.key]}
                                </span>
                                <div className="min-w-0">
                                  <span className={`block text-[13px] font-medium leading-tight ${isActive(subItem.href) ? 'text-[#7A3B5E]' : ''}`}>
                                    {subItem.label}
                                  </span>
                                  <span className="block text-[11px] text-[#8E8E9F] mt-0.5 leading-tight">{subItem.desc}</span>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Contact */}
                  <div>
                    <Link
                      href={`/${locale}/contact`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                        isActive(`/${locale}/contact`)
                          ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                          : 'text-[#2D2A33] hover:bg-[#F9F7F3]'
                      }`}
                    >
                      {nav.contact}
                    </Link>
                  </div>
                </nav>

                {/* Pinned bottom — safe area aware */}
                <div className="flex-shrink-0 border-t border-[#F3EFE8] px-4 pt-3 bg-white" style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}>
                  <div className="flex items-center gap-2">
                    {/* Book CTA — takes most space */}
                    <Link
                      href={getBookingUrl(locale as string)}
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#7A3B5E] py-3 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
                    >
                      <Calendar size={15} />
                      {nav.bookNow}
                    </Link>

                    {/* Language toggle — compact square */}
                    <a
                      href={langSwitchHref}
                      onClick={(e) => { handleLangSwitch(e); setMobileOpen(false); }}
                      className="flex-shrink-0 flex items-center justify-center gap-1.5 rounded-xl border border-[#F3EFE8] bg-[#FAF7F2] px-3 py-3 text-xs font-semibold text-[#4A4A5C] active:scale-[0.97] transition-transform"
                    >
                      <Globe size={14} className="text-[#8E8E9F]" />
                      {locale === 'en' ? 'AR' : 'EN'}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
