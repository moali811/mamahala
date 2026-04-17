'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Mail, Instagram, Facebook, Youtube,
  MessageCircle, MapPin, ArrowUp, Clock,
  BookOpen, GraduationCap, CalendarDays, Download, HelpCircle, Sparkles, PenLine,
} from 'lucide-react';
import { SnapchatIcon, TelegramIcon, TiktokIcon } from '@/components/icons/SocialIcons';
import { BUSINESS, getBookingUrl } from '@/config/business';
import type { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
  messages: Record<string, any>;
}

export default function Footer({ locale, messages }: FooterProps) {
  const isRTL = locale === 'ar';
  const pathname = usePathname();

  const footer = messages?.footer ?? {};
  const contact = messages?.contact ?? {};
  const currentYear = new Date().getFullYear();

  // Check if a link matches the current path (including subpages and related routes)
  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    if (pathname.startsWith(href)) return true;
    // Map related routes: e.g. /programs/* → Programs resource link
    const relatedRoutes: Record<string, string[]> = {
      [`/${locale}/resources/programs`]: [`/${locale}/programs`],
    };
    const related = relatedRoutes[href];
    if (related) return related.some(r => pathname.startsWith(r));
    return false;
  };

  const socials = [
    { icon: Instagram, href: 'https://www.instagram.com/mamahala.ca/', label: 'Instagram' },
    { icon: Facebook, href: 'https://www.facebook.com/mamahala.ca', label: 'Facebook' },
    { icon: TelegramIcon, href: 'https://t.me/+Ut1Xms3zRX5jMmNh', label: 'Telegram' },
  ];

  const serviceLinks = [
    { label: isRTL ? 'الناشئة' : 'Youth', href: `/${locale}/services/youth` },
    { label: isRTL ? 'الأُسَر' : 'Families', href: `/${locale}/services/families` },
    { label: isRTL ? 'البالغون' : 'Adults', href: `/${locale}/services/adults` },
    { label: isRTL ? 'الأزواج' : 'Couples', href: `/${locale}/services/couples` },
    { label: isRTL ? 'العلاج التجريبيّ' : 'Experiential', href: `/${locale}/services/experiential` },
  ];

  const resourceLinks = [
    { icon: Sparkles, label: isRTL ? 'تقييماتٌ ذاتيّة' : 'Check-ins', href: `/${locale}/resources/assessments` },
    { icon: BookOpen, label: isRTL ? 'المدوّنة' : 'Blog', href: `/${locale}/resources/blog` },
    { icon: Download, label: isRTL ? 'أدوات مجّانيّة' : 'Free Toolkit', href: `/${locale}/resources/downloads` },
    { icon: CalendarDays, label: isRTL ? 'الفعاليّات' : 'Events', href: `/${locale}/resources/events` },
    { icon: GraduationCap, label: isRTL ? 'البرامج' : 'Programs', href: `/${locale}/resources/programs` },
    { icon: HelpCircle, label: isRTL ? 'الأسئلة الشائعة' : 'FAQs', href: `/${locale}/resources/faqs` },
  ];

  const quickLinks = [
    { label: isRTL ? 'من نحن' : 'About', href: `/${locale}/about` },
    { label: isRTL ? 'تواصل معنا' : 'Contact', href: `/${locale}/contact` },
    { label: isRTL ? 'احجز جلسة' : 'Book a Session', href: getBookingUrl(locale) },
    { label: isRTL ? 'هديّةُ رعاية' : 'Gift of Care', href: `/${locale}/gift` },
    { label: isRTL ? 'اكتشِفْ ما يناسبُك' : 'Find Your Fit', href: `/${locale}/quiz` },
  ];

  // Active link styles — bold only, no dot
  const linkClass = (href: string, base: string = '') =>
    `${base} transition-all duration-200 ${
      isActive(href)
        ? 'text-[#7A3B5E] font-semibold'
        : 'text-[#6B6580] hover:text-[#7A3B5E]'
    }`;

  return (
    <footer dir={isRTL ? 'rtl' : 'ltr'}>

      {/* ═══ MAIN FOOTER ═══ */}
      <div className="bg-[#F5F0EA] pt-14 pb-12">
        <div className="container-main max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 lg:gap-12">

            {/* Col 1: Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href={`/${locale}`} className="inline-flex items-center mb-4">
                <Image src="/images/logo-O.png" alt="Mama Hala Consulting" width={512} height={512} className="h-16 w-16 object-contain" />
              </Link>
              <p className="text-sm text-[#6B6580] leading-relaxed mb-6">
                {isRTL ? `${BUSINESS.taglineAr}.` : `${BUSINESS.tagline}.`}
              </p>
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, href, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    className="w-8 h-8 rounded-full bg-[#D4ADA8]/12 flex items-center justify-center hover:bg-[#7A3B5E] text-[#7A3B5E] hover:text-white transition-all duration-200">
                    <Icon size={14} />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="col-span-1">
              <h4 className="text-xs font-semibold text-[#C8A97D] uppercase tracking-[0.2em] mb-5">
                {isRTL ? 'الخدمات' : 'Services'}
              </h4>
              <div className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    className={linkClass(link.href, 'flex items-center gap-2 text-sm')}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 3: Resources */}
            <div className="col-span-1">
              <h4 className="text-xs font-semibold text-[#C8A97D] uppercase tracking-[0.2em] mb-5">
                {isRTL ? 'الموارد' : 'Resources'}
              </h4>
              <div className="space-y-2.5">
                {resourceLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    className={linkClass(link.href, 'flex items-center gap-2 text-sm')}>
                    <link.icon size={13} className={`shrink-0 ${isActive(link.href) ? 'opacity-100' : 'opacity-60'}`} />
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 4: Quick Links */}
            <div className="col-span-1">
              <h4 className="text-xs font-semibold text-[#C8A97D] uppercase tracking-[0.2em] mb-5">
                {isRTL ? 'روابط سريعة' : 'Quick Links'}
              </h4>
              <div className="space-y-2.5">
                {quickLinks.map((link) => (
                  <Link key={link.href} href={link.href}
                    className={linkClass(link.href, 'flex items-center gap-2 text-sm')}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Col 5: Reach Us */}
            <div className="col-span-1">
              <h4 className="text-xs font-semibold text-[#C8A97D] uppercase tracking-[0.2em] mb-5">
                {isRTL ? 'تواصَلْ' : 'Reach Us'}
              </h4>
              <div className="space-y-3">
                <a href="https://wa.me/16132222104" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group">
                  <MessageCircle size={14} className="text-[#25D366] shrink-0" />
                  <span dir="ltr" className="text-sm text-[#6B6580] group-hover:text-[#7A3B5E] transition-colors">{contact.phone}</span>
                </a>
                <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-2.5 group">
                  <Mail size={14} className="text-[#7A3B5E] shrink-0" />
                  <span className="text-sm text-[#6B6580] group-hover:text-[#7A3B5E] transition-colors">{contact.email}</span>
                </a>
                <a href="https://maps.google.com/?q=430+Hazeldean+Rd+Kanata+ON+K2L+1E8+Canada" target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2.5 group">
                  <MapPin size={14} className="text-[#C8A97D] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#6B6580] group-hover:text-[#7A3B5E] transition-colors leading-relaxed">
                    {isRTL ? '430 Hazeldean Rd, Ontario' : '430 Hazeldean Rd, Ontario'}
                    <br />
                    {isRTL ? 'K2L 1E8 — كندا' : 'K2L 1E8 — Canada'}
                  </span>
                </a>
                <div className="flex items-center gap-2.5">
                  <Clock size={14} className="text-[#8E8E9F] shrink-0" />
                  <span className="text-xs text-[#8E8E9F]">
                    {isRTL ? 'الاثنين – السبت: 9 ص – 8 م' : 'Mon – Sat: 9 AM – 8 PM'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM BAR ═══ */}
      <div className="bg-[#F5F0EA] border-t border-[#D4ADA8]/20">
        <div className="container-main max-w-7xl py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#8E8E9F]">
            &copy; {currentYear} {isRTL ? 'مجموعة ماما هالة للاستشارات' : 'Mama Hala Consulting Group'}. {footer.rights}
          </p>
          <div className="flex items-center gap-5">
            {[
              { label: footer.privacy, href: `/${locale}/privacy-policy` },
              { label: footer.terms, href: `/${locale}/terms-of-service` },
              { label: footer.bookingPolicy, href: `/${locale}/booking-policy` },
            ].map((link) => (
              <Link key={link.href} href={link.href}
                className={`text-[11px] transition-colors ${
                  isActive(link.href)
                    ? 'text-[#7A3B5E] font-semibold'
                    : 'text-[#8E8E9F] hover:text-[#7A3B5E]'
                }`}>
                {link.label}
              </Link>
            ))}
            <span className="hidden sm:block h-3 w-px bg-[#D4ADA8]/30" />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 text-xs font-medium text-[#7A3B5E]/60 hover:text-[#7A3B5E] transition-colors group"
            >
              <span className="w-6 h-6 rounded-full border border-[#7A3B5E]/20 group-hover:border-[#7A3B5E]/40 group-hover:bg-[#7A3B5E]/5 flex items-center justify-center transition-all">
                <ArrowUp size={12} />
              </span>
              {isRTL ? 'العودة للأعلى' : 'Back to Top'}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
