'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Video,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  MessageCircle,
  InboxIcon,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';

interface CalendarEvent {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  date: { en: string; ar: string };
  day: string;
  month: { en: string; ar: string };
  year: string;
  time: { en: string; ar: string };
  location: { en: string; ar: string };
  locationType: 'online' | 'in-person';
  price: { en: string; ar: string };
  isFree: boolean;
}

const upcomingEvents: CalendarEvent[] = [
  {
    id: 'parenting-digital-age',
    title: {
      en: 'Parenting in the Digital Age',
      ar: 'الأبوة في العصر الرقمي',
    },
    description: {
      en: 'A free webinar exploring how to set healthy screen boundaries, keep communication open, and protect your child\'s emotional wellbeing in the digital age.',
      ar: 'ندوة مجانية عبر الإنترنت تستكشف كيفية وضع حدود صحية للشاشات والحفاظ على التواصل المفتوح وحماية صحة طفلك العاطفية في العصر الرقمي.',
    },
    date: { en: 'April 15, 2026', ar: '١٥ أبريل ٢٠٢٦' },
    day: '15',
    month: { en: 'APR', ar: 'أبريل' },
    year: '2026',
    time: { en: '7:00 PM EST', ar: '٧:٠٠ مساءً بتوقيت شرق أمريكا' },
    location: { en: 'Online (Zoom)', ar: 'عبر الإنترنت (Zoom)' },
    locationType: 'online',
    price: { en: 'Free', ar: 'مجاني' },
    isFree: true,
  },
  {
    id: 'couples-communication',
    title: {
      en: 'Couples Communication Workshop',
      ar: 'ورشة عمل تواصل الأزواج',
    },
    description: {
      en: 'An interactive workshop for couples looking to improve their communication skills, resolve conflicts constructively, and deepen their connection.',
      ar: 'ورشة عمل تفاعلية للأزواج الذين يتطلعون إلى تحسين مهارات التواصل وحل النزاعات بشكل بناء وتعميق الترابط.',
    },
    date: { en: 'May 3, 2026', ar: '٣ مايو ٢٠٢٦' },
    day: '3',
    month: { en: 'MAY', ar: 'مايو' },
    year: '2026',
    time: { en: '10:00 AM EST', ar: '١٠:٠٠ صباحًا بتوقيت شرق أمريكا' },
    location: { en: 'Online (Zoom)', ar: 'عبر الإنترنت (Zoom)' },
    locationType: 'online',
    price: { en: 'CAD $49/couple', ar: '٤٩ دولار كندي/زوجين' },
    isFree: false,
  },
];

export default function EventsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-28 lg:pt-40 lg:pb-36 overflow-hidden gradient-sage">
        {/* Decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.04] blur-[80px]" />
          <div className="absolute bottom-10 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.06] blur-[60px]" />
        </div>

        <div className="container-main relative z-10">
          <Breadcrumb
            locale={locale}
            items={[
              { label: messages.nav.home, href: `/${locale}` },
              { label: messages.nav.resources, href: `/${locale}/resources` },
              { label: messages.nav.events },
            ]}
          />

          <motion.div
            className="mt-8 max-w-3xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'الفعاليات' : 'Events'}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'ورش عمل وندوات وفعاليات مجتمعية لدعم رحلتك نحو النمو'
                : 'Workshops, webinars, and community events to support your growth journey'}
            </p>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  UPCOMING EVENTS                                                 */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'ما هو قادم' : "What's Coming"}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'الفعاليات القادمة' : 'Upcoming Events'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="space-y-8">
            {upcomingEvents.map((event) => {
              const title = isRTL ? event.title.ar : event.title.en;
              const description = isRTL ? event.description.ar : event.description.en;
              const date = isRTL ? event.date.ar : event.date.en;
              const time = isRTL ? event.time.ar : event.time.en;
              const location = isRTL ? event.location.ar : event.location.en;
              const price = isRTL ? event.price.ar : event.price.en;
              const month = isRTL ? event.month.ar : event.month.en;

              return (
                <StaggerChild key={event.id}>
                  <motion.div
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#F3EFE8] hover:border-[#C4878A]/20 transition-all duration-300"
                    whileHover={{ y: -4, boxShadow: '0 12px 48px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {/* Date badge - prominent left column */}
                      <div className="flex-shrink-0 w-full md:w-40 bg-gradient-to-br from-[#C4878A] to-[#B07578] p-6 md:p-8 flex flex-row md:flex-col items-center justify-center gap-3 md:gap-1 text-white">
                        <span className="text-sm font-semibold uppercase tracking-wider opacity-80">
                          {month}
                        </span>
                        <span
                          className="text-4xl md:text-5xl font-bold"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {event.day}
                        </span>
                        <span className="text-sm opacity-60">{event.year}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 sm:p-8 flex flex-col">
                        {/* Top row: badges */}
                        <div className="flex items-center flex-wrap gap-3 mb-4">
                          <Badge variant={event.isFree ? 'success' : 'sand'} size="md">
                            {price}
                          </Badge>
                          <Badge variant="neutral" size="sm">
                            <Video className="w-3 h-3 mr-1" />
                            {isRTL ? 'عبر الإنترنت' : 'Online'}
                          </Badge>
                        </div>

                        {/* Title */}
                        <h3
                          className="text-xl sm:text-2xl font-bold text-[#2D2A33] mb-3 group-hover:text-[#7A3B5E] transition-colors duration-200"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {title}
                        </h3>

                        {/* Description */}
                        <p className="text-[#4A4A5C] leading-relaxed mb-6 flex-1">
                          {description}
                        </p>

                        {/* Meta info row */}
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#8E8E9F] mb-6">
                          <div className="flex items-center gap-2">
                            <CalendarDays className="w-4 h-4" />
                            <span>{date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{location}</span>
                          </div>
                          {!event.isFree && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{isRTL ? 'للأزواج' : 'Per couple'}</span>
                            </div>
                          )}
                        </div>

                        {/* CTA */}
                        <div>
                          <Button
                            variant="primary"
                            size="md"
                            icon={<ArrowIcon className="w-4 h-4" />}
                            iconPosition="right"
                          >
                            {messages.common.register}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  PAST EVENTS                                                     */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container-main">
          <ScrollReveal className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'أرشيف' : 'Archive'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'الفعاليات السابقة' : 'Past Events'}
            </h2>
          </ScrollReveal>

          {/* Empty state */}
          <ScrollReveal>
            <div className="text-center py-16 rounded-2xl border-2 border-dashed border-[#F3EFE8]">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F3EFE8] mb-5">
                <InboxIcon className="w-7 h-7 text-[#8E8E9F]" />
              </div>
              <p className="text-lg text-[#8E8E9F] font-medium">
                {isRTL ? 'لا توجد فعاليات سابقة بعد' : 'No past events yet'}
              </p>
              <p className="text-sm text-[#8E8E9F]/70 mt-2">
                {isRTL ? 'ترقبوا فعالياتنا القادمة' : 'Stay tuned for upcoming events'}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  CTA                                                             */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 gradient-cta-dark relative overflow-hidden">
        <WaveDivider position="top" fillColor="white" variant="organic" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7A3B5E]/[0.06] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7A3B5E]/[0.04] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-6">
              <Sparkles className="w-7 h-7 text-[#C8A97D]" />
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.cta.ready}
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-[#4A4A5C] leading-relaxed max-w-xl mx-auto">
              {messages.cta.readyDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button
                as="a"
                href={`/${locale}/book-a-session`}
                variant="secondary"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className=""
              >
                {messages.cta.bookNow}
              </Button>
              <Button
                as="a"
                href="https://wa.me/16132222104"
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                className="!border-[#7A3B5E]/20 !text-[#7A3B5E] hover:!bg-[#7A3B5E]/5"
              >
                {messages.cta.whatsapp}
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
