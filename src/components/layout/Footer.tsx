'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Youtube } from 'lucide-react';
import { SnapchatIcon, TelegramIcon, TiktokIcon } from '@/components/icons/SocialIcons';
import type { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
  messages: Record<string, any>;
}

export default function Footer({ locale, messages }: FooterProps) {
  const isRTL = locale === 'ar';
  const nav = messages?.nav ?? {};
  const footer = messages?.footer ?? {};
  const contact = messages?.contact ?? {};
  const newsletter = messages?.newsletter ?? {};

  const currentYear = new Date().getFullYear();

  return (
    <footer
      dir={isRTL ? 'rtl' : 'ltr'}
      className="bg-gradient-to-b from-[#F3EFE8] to-[#EDE6DC]"
    >
      {/* Newsletter Bar */}
      <div className="border-b border-[#D4ADA8]/20">
        <div className="container-main py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3
                className="text-xl font-bold text-[#2D2A33] mb-1"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {newsletter.title}
              </h3>
              <p className="text-sm text-[#6B6580]">{newsletter.subtitle}</p>
            </div>
            <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={newsletter.placeholder}
                className="flex-1 rounded-full bg-white border border-[#D4ADA8]/20 px-5 py-3 text-sm text-[#2D2A33] placeholder-[#8E8E9F] outline-none focus:border-[#7A3B5E]/40 focus:ring-1 focus:ring-[#7A3B5E]/20 transition-all"
              />
              <button
                type="submit"
                className="rounded-full bg-[#7A3B5E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#5E2D48] transition-colors whitespace-nowrap"
              >
                {newsletter.subscribe}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-5">
              <Image
                src="/images/logo.png"
                alt="Mama Hala Consulting"
                width={40}
                height={40}
                className="h-9 w-9 rounded-full object-contain"
              />
              <span
                className="text-sm font-semibold text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting'}
              </span>
            </Link>
            <p className="text-sm text-[#6B6580] leading-relaxed mb-6 max-w-xs">
              {footer.description}
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: 'https://www.instagram.com/mamahala.ca/', label: 'Instagram' },
                { icon: Facebook, href: 'https://www.facebook.com/mamahala.ca', label: 'Facebook' },
                { icon: Youtube, href: 'https://youtube.com/@MamaHala-ca?si=pwg5_hhRIfXt-usP', label: 'YouTube' },
                { icon: TiktokIcon, href: 'https://www.tiktok.com/@mamahala.ca?_t=8jv2H8Tkli2&_r=1', label: 'TikTok' },
                { icon: SnapchatIcon, href: 'https://www.snapchat.com/add/mamahala.ca', label: 'Snapchat' },
                { icon: TelegramIcon, href: 'https://t.me/+Ut1Xms3zRX5jMmNh', label: 'Telegram' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-[#D4ADA8]/15 flex items-center justify-center hover:bg-[#7A3B5E] text-[#7A3B5E] hover:text-white transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#2D2A33] uppercase tracking-wider mb-5">
              {footer.quickLinks}
            </h4>
            <ul className="space-y-3">
              {[
                { label: nav.home, href: `/${locale}` },
                { label: nav.about, href: `/${locale}/about` },
                { label: nav.services, href: `/${locale}/services` },
                { label: nav.resources, href: `/${locale}/resources` },
                { label: nav.contact, href: `/${locale}/contact` },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6580] hover:text-[#7A3B5E] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-[#2D2A33] uppercase tracking-wider mb-5">
              {footer.ourServices}
            </h4>
            <ul className="space-y-3">
              {[
                { label: nav.families, href: `/${locale}/services/families` },
                { label: nav.couples, href: `/${locale}/services/couples` },
                { label: nav.youth, href: `/${locale}/services/youth` },
                { label: nav.adults, href: `/${locale}/services/adults` },
                { label: nav.experiential, href: `/${locale}/services/experiential` },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#6B6580] hover:text-[#7A3B5E] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#2D2A33] uppercase tracking-wider mb-5">
              {footer.contactUs}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#7A3B5E] mt-0.5 flex-shrink-0" />
                <a href="tel:+16132222104" className="text-sm text-[#6B6580] hover:text-[#7A3B5E] transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#7A3B5E] mt-0.5 flex-shrink-0" />
                <a href="mailto:admin@mamahala.ca" className="text-sm text-[#6B6580] hover:text-[#7A3B5E] transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#7A3B5E] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#6B6580]">{contact.location}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={16} className="text-[#7A3B5E] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#6B6580]">{contact.hoursDetail}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#D4ADA8]/20">
        <div className="container-main py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#8E8E9F]">
            &copy; {currentYear} Mama Hala Consulting. {footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`/${locale}/privacy-policy`} className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors">
              {footer.privacy}
            </Link>
            <Link href={`/${locale}/terms-of-service`} className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors">
              {footer.terms}
            </Link>
            <Link href={`/${locale}/booking-policy`} className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] transition-colors">
              {footer.bookingPolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
