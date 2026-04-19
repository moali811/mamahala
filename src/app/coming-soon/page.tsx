import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Mail,
  MessageCircle,
  Instagram,
  Facebook,
  Youtube,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { BUSINESS } from '@/config/business';

/* ================================================================
   Coming-Soon Landing Page
   ================================================================
   Standalone bilingual page, rendered OUTSIDE of /[locale]/ so it
   skips Header/Footer and shows a clean launch message.
   Language is driven by ?lang=en|ar search param, set by proxy.ts
   based on the original request path.

   Remove this page + proxy.ts at full launch.
   ================================================================ */

export const metadata: Metadata = {
  title: 'Coming Soon — Mama Hala',
  description:
    "Our new home is almost ready. Warm, wise counsel for families in every season of life.",
  robots: { index: false, follow: false },
};

type Lang = 'en' | 'ar';

type Mode = 'coming-soon' | 'maintenance';

interface CopySet {
  eyebrow: string;
  headline: string;
  body: string;
  contactLabel: string;
  whatsapp: string;
  email: string;
  followUs: string;
  copyright: string;
  switchTo: string;
  switchToLabel: string;
}

const COPY: Record<Mode, Record<Lang, CopySet>> = {
  'coming-soon': {
    en: {
      eyebrow: 'Coming Soon',
      headline: 'Our new home is almost ready',
      body: "Warm, wise counsel for families in every season of life. We're putting the finishing touches on something beautiful — please check back soon.",
      contactLabel: 'In the meantime, reach us here',
      whatsapp: 'WhatsApp',
      email: 'Email',
      followUs: 'Follow us',
      copyright: '© 2026 Mama Hala',
      switchTo: 'ar',
      switchToLabel: 'العربية',
    },
    ar: {
      eyebrow: 'قريباً',
      headline: 'منصّتنا الجديدة على وشك الوصول',
      body: 'رعايةٌ دافئةٌ وحكيمةٌ للعائلات في كلّ فصول الحياة. نعمل على اللمسات الأخيرة لشيءٍ جميل — نلتقي قريباً.',
      contactLabel: 'تواصلوا معنا في هذه الأثناء',
      whatsapp: 'واتساب',
      email: 'البريد',
      followUs: 'تابعونا',
      copyright: '© 2026 مجموعة ماما هالة للاستشارات',
      switchTo: 'en',
      switchToLabel: 'English',
    },
  },
  maintenance: {
    en: {
      eyebrow: 'Be Right Back',
      headline: "We're making things even better",
      body: "Our site is briefly down for a quick update. Everything is safe — we'll be back shortly. Thank you for your patience.",
      contactLabel: 'You can still reach us',
      whatsapp: 'WhatsApp',
      email: 'Email',
      followUs: 'Follow us',
      copyright: '© 2026 Mama Hala',
      switchTo: 'ar',
      switchToLabel: 'العربية',
    },
    ar: {
      eyebrow: 'نعود حالاً',
      headline: 'نعمل على تحسينات سريعة',
      body: 'الموقعُ متوقّفٌ لفترةٍ قصيرةٍ لتحديثٍ سريع. كلّ شيءٍ بأمان — سنعودُ قريباً. شكراً لصبركم.',
      contactLabel: 'يمكنكم التواصل معنا',
      whatsapp: 'واتساب',
      email: 'البريد',
      followUs: 'تابعونا',
      copyright: '© 2026 مجموعة ماما هالة للاستشارات',
      switchTo: 'en',
      switchToLabel: 'English',
    },
  },
};

export default async function ComingSoonPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; mode?: string }>;
}) {
  const { lang: rawLang, mode: rawMode } = await searchParams;
  const lang: Lang = rawLang === 'ar' ? 'ar' : 'en';
  const mode: Mode = rawMode === 'maintenance' ? 'maintenance' : 'coming-soon';
  const t = COPY[mode][lang];
  const isRTL = lang === 'ar';
  const serifFont = lang === 'ar' ? 'var(--font-tajawal)' : 'var(--font-dm-serif)';
  const bodyFont = lang === 'ar' ? 'var(--font-tajawal)' : 'var(--font-plus-jakarta)';

  return (
    <div
      dir={isRTL ? 'rtl' : 'ltr'}
      lang={lang}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background:
          'linear-gradient(180deg, #FAF7F2 0%, #F9E8E2 55%, #F3EFE8 100%)',
        color: 'var(--color-charcoal, #2D2A33)',
        fontFamily: bodyFont,
      }}
    >
      {/* Top bar — language toggle */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          padding: '20px 24px 0',
        }}
      >
        <Link
          href={`/coming-soon?lang=${t.switchTo}${mode === 'maintenance' ? '&mode=maintenance' : ''}`}
          style={{
            fontSize: '13px',
            fontWeight: 600,
            color: 'var(--color-plum, #7A3B5E)',
            textDecoration: 'none',
            padding: '8px 14px',
            border: '1px solid rgba(122, 59, 94, 0.18)',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(6px)',
            letterSpacing: '0.02em',
          }}
        >
          {t.switchToLabel}
        </Link>
      </header>

      {/* Center block */}
      <main
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          padding: '32px 24px',
          maxWidth: '640px',
          margin: '0 auto',
          width: '100%',
        }}
      >
        {/* Sparkle mark */}
        <div
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px',
            borderRadius: '999px',
            background: 'rgba(200, 169, 125, 0.15)',
            color: 'var(--color-sand, #C8A97D)',
            marginBottom: '20px',
          }}
        >
          {mode === 'maintenance' ? <Wrench size={24} strokeWidth={1.5} /> : <Sparkles size={24} strokeWidth={1.5} />}
        </div>

        {/* Wordmark */}
        <h1
          style={{
            fontFamily: serifFont,
            fontWeight: lang === 'ar' ? 700 : 400,
            fontSize: 'clamp(32px, 6vw, 48px)',
            lineHeight: 1.1,
            color: 'var(--color-plum, #7A3B5E)',
            margin: '0 0 6px',
            letterSpacing: lang === 'ar' ? 0 : '0.01em',
          }}
        >
          {lang === 'ar' ? 'ماما هالة' : 'Mama Hala'}
        </h1>
        <p
          style={{
            fontSize: '13px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-sand-dark, #B08D5E)',
            margin: '0 0 36px',
            fontWeight: 600,
          }}
        >
          {lang === 'ar' ? 'للاستشارات' : 'Consulting'}
        </p>

        {/* Eyebrow + headline */}
        <div
          aria-hidden
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '14px',
          }}
        >
          <span
            style={{
              display: 'inline-block',
              width: '32px',
              height: '1px',
              background: 'var(--color-rose, #C4878A)',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-rose-dark, #B07578)',
              fontWeight: 600,
            }}
          >
            {t.eyebrow}
          </span>
          <span
            style={{
              display: 'inline-block',
              width: '32px',
              height: '1px',
              background: 'var(--color-rose, #C4878A)',
            }}
          />
        </div>
        <h2
          style={{
            fontFamily: serifFont,
            fontWeight: lang === 'ar' ? 600 : 500,
            fontSize: 'clamp(22px, 4vw, 30px)',
            lineHeight: 1.35,
            color: 'var(--color-charcoal, #2D2A33)',
            margin: '0 0 16px',
            maxWidth: '520px',
          }}
        >
          {t.headline}
        </h2>
        <p
          style={{
            fontSize: 'clamp(15px, 1.8vw, 16px)',
            lineHeight: 1.75,
            color: 'var(--color-slate, #4A4A5C)',
            margin: '0 0 40px',
            maxWidth: '520px',
          }}
        >
          {t.body}
        </p>

        {/* Contact row */}
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-mist, #6B6580)',
            margin: '0 0 16px',
            fontWeight: 600,
          }}
        >
          {t.contactLabel}
        </p>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '36px',
          }}
        >
          <ContactButton
            href={BUSINESS.whatsappUrl}
            icon={<MessageCircle size={16} strokeWidth={1.75} />}
            label={t.whatsapp}
            external
          />
          <ContactButton
            href={`mailto:${BUSINESS.email}`}
            icon={<Mail size={16} strokeWidth={1.75} />}
            label={t.email}
          />
        </div>

        {/* Social */}
        <p
          style={{
            fontSize: '11px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--color-mist, #6B6580)',
            margin: '0 0 12px',
            fontWeight: 600,
          }}
        >
          {t.followUs}
        </p>
        <div
          style={{
            display: 'flex',
            gap: '14px',
            justifyContent: 'center',
          }}
        >
          <SocialIcon href={BUSINESS.social.instagram} label="Instagram">
            <Instagram size={18} strokeWidth={1.5} />
          </SocialIcon>
          <SocialIcon href={BUSINESS.social.facebook} label="Facebook">
            <Facebook size={18} strokeWidth={1.5} />
          </SocialIcon>
          <SocialIcon href={BUSINESS.social.youtube} label="YouTube">
            <Youtube size={18} strokeWidth={1.5} />
          </SocialIcon>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          textAlign: 'center',
          padding: '24px 24px 32px',
          fontSize: '12px',
          color: 'var(--color-mist, #6B6580)',
          letterSpacing: '0.05em',
        }}
      >
        {t.copyright}
      </footer>
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function ContactButton({
  href,
  icon,
  label,
  external,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '11px 20px',
        borderRadius: '999px',
        background: 'var(--color-plum, #7A3B5E)',
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.01em',
        boxShadow: '0 4px 14px rgba(122, 59, 94, 0.18)',
      }}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '38px',
        height: '38px',
        borderRadius: '999px',
        background: 'rgba(255, 255, 255, 0.6)',
        border: '1px solid rgba(122, 59, 94, 0.15)',
        color: 'var(--color-plum, #7A3B5E)',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}
