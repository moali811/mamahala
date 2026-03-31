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
import { services as allServices, serviceCategories } from '@/data/services';
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
  const pathname = usePathname();
  const dropdownRef = useRef<NodeJS.Timeout | null>(null);

  const isRTL = locale === 'ar';
  const altLocale = locale === 'en' ? 'ar' : 'en';
  const nav = messages?.nav ?? {};

  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, '') || '/';
  const langSwitchHref = `/${altLocale}${pathnameWithoutLocale}`;

  // Save scroll position before language switch, restore after
  const handleLangSwitch = useCallback(() => {
    sessionStorage.setItem('mh_scroll_y', String(window.scrollY));
  }, []);

  useEffect(() => {
    const savedY = sessionStorage.getItem('mh_scroll_y');
    if (savedY) {
      sessionStorage.removeItem('mh_scroll_y');
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedY, 10));
      });
    }
  }, []);

  /* ── Build services mega-menu data ───────── */
  const serviceCategoryData = serviceCategories.map((cat) => ({
    key: cat.key,
    label: isRTL ? cat.nameAr : cat.name,
    href: `/${locale}/services/${cat.key}`,
    services: allServices
      .filter((s) => s.category === cat.key)
      .map((s) => ({
        label: isRTL ? s.nameAr : s.name,
        href: `/${locale}/services/${cat.key}/${s.slug}`,
      })),
  }));

  /* ── Resources items with icons ───────── */
  const resourcesItems = [
    { key: 'blog', label: nav.blog, href: `/${locale}/resources/blog`, desc: isRTL ? 'مقالات ونصائح' : 'Articles & insights' },
    { key: 'programs', label: nav.programs, href: `/${locale}/resources/programs`, desc: isRTL ? 'دورات وبرامج جماعية' : 'Courses & group programs' },
    { key: 'events', label: nav.events, href: `/${locale}/resources/events`, desc: isRTL ? 'ورش عمل وفعاليات' : 'Workshops & events' },
    { key: 'downloads', label: nav.downloads, href: `/${locale}/resources/downloads`, desc: isRTL ? 'أدوات ومراجع مجانية' : 'Free tools & guides' },
    { key: 'assessments', label: isRTL ? 'تقييماتٌ ذاتيّة' : 'Self-Assessments', href: `/${locale}/resources/assessments`, desc: isRTL ? 'اكتشِفْ نفسَك وعائلتَك' : 'Understand yourself & family' },
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
  }, []);

  const handleDropdownLeave = useCallback(() => {
    dropdownRef.current = setTimeout(() => setOpenDropdown(null), 150);
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
            ? 'bg-white shadow-[var(--shadow-subtle)] lg:bg-white/95 lg:backdrop-blur-md'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex shrink-0 items-center gap-3">
              <Image
                src="/images/logo-512.png"
                alt="Mama Hala Consulting"
                width={256}
                height={256}
                className="h-11 w-11 rounded-full object-cover"
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
                      className={`absolute top-full ${isRTL ? 'right-0' : 'left-1/2 -translate-x-1/2'} mt-2 w-[740px] overflow-hidden rounded-2xl border border-[#F3EFE8] bg-white shadow-[var(--shadow-elevated)]`}
                    >
                      {/* All Services - top banner */}
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

                      {/* Category columns */}
                      <div className="grid grid-cols-3 gap-0 p-2">
                        {serviceCategoryData.map((cat) => (
                            <div key={cat.key} className="p-2">
                              <Link
                                href={cat.href}
                                className="mb-1.5 flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors text-[#2D2A33] hover:bg-[#F9F7F3]"
                              >
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#F3EFE8] text-[#7A3B5E]">
                                  {categoryIcons[cat.key]}
                                </span>
                                {cat.label}
                                <ChevronRight size={12} className={`${isRTL ? 'rotate-180' : ''} opacity-40 ${isRTL ? 'mr-auto' : 'ml-auto'}`} />
                              </Link>
                              <div className="space-y-0.5">
                                {cat.services.map((svc) => (
                                  <Link
                                    key={svc.href}
                                    href={svc.href}
                                    className={`block rounded-md px-3 py-1.5 text-[12.5px] leading-snug transition-colors ${
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
                          ))}
                      </div>

                      {/* Divider */}
                      <div className="border-t border-[#F3EFE8]" />
                      {/* Quiz hint */}
                      <div className="bg-[#FDFCFA] px-5 py-2.5">
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
              <Link
                href={langSwitchHref}
                onClick={handleLangSwitch}
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
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
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
              {/* Close header */}
              <div className="flex h-20 items-center justify-between px-5">
                <Link href={`/${locale}`} onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <Image
                    src="/images/logo-512.png"
                    alt="Mama Hala"
                    width={128}
                    height={128}
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <span className="text-sm font-semibold text-[#7A3B5E]" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'ماما هالة' : 'Mama Hala'}
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3EFE8] text-[#2D2A33] transition-colors hover:bg-[#E8E2D8]"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="flex flex-col h-[calc(100vh-5rem)] overflow-y-auto">
                <nav className="flex-1 px-4 pb-4">

                  {/* About */}
                  <div>
                    <Link
                      href={`/${locale}/about`}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
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
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
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
                      className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
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
                      className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                        isActive(`/${locale}/contact`)
                          ? 'bg-[#7A3B5E]/5 text-[#7A3B5E]'
                          : 'text-[#2D2A33] hover:bg-[#F9F7F3]'
                      }`}
                    >
                      {nav.contact}
                    </Link>
                  </div>
                </nav>

                {/* Bottom actions */}
                <div className="border-t border-[#F3EFE8] px-4 py-5 space-y-3">
                  <Link
                    href={`/${locale}/book-a-session`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-[#7A3B5E] py-3.5 text-sm font-semibold text-white active:scale-[0.98] transition-transform"
                  >
                    <Calendar size={16} />
                    {nav.bookNow}
                  </Link>

                  <Link
                    href={langSwitchHref}
                    onClick={() => { handleLangSwitch(); setMobileOpen(false); }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#F3EFE8] py-3 text-sm font-medium text-[#4A4A5C] hover:border-[#7A3B5E]/20"
                  >
                    <Globe size={16} className="opacity-60" />
                    {locale === 'en' ? 'العربية' : 'English'}
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
