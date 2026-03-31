'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { InboxIcon } from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import type { EventType } from '@/types';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';

import FeaturedEvent from '@/components/events/FeaturedEvent';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import PastEventCard from '@/components/events/PastEventCard';
import EventDetailExpansion from '@/components/events/EventDetailExpansion';
import EventReminderSignup from '@/components/events/EventReminderSignup';

import {
  getUpcomingEvents,
  getPastEvents,
  getFeaturedEvent,
  getEventsByType,
  getAvailableEventTypes,
} from '@/data/events';

export default function EventsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  // Data
  const featured = getFeaturedEvent();
  const allUpcoming = getUpcomingEvents();
  const pastEvents = getPastEvents();
  const availableTypes = getAvailableEventTypes();

  // Filter upcoming (exclude featured from the list)
  const filteredUpcoming =
    activeFilter === 'all'
      ? allUpcoming.filter((e) => e.slug !== featured?.slug)
      : getEventsByType(activeFilter as EventType).filter(
          (e) => e.slug !== featured?.slug,
        );

  const upcomingCount = allUpcoming.length;

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden gradient-sage">
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
            {upcomingCount > 0 && (
              <p className="mt-3 text-sm text-[#C8A97D] font-medium">
                {isRTL
                  ? `${new Intl.NumberFormat('ar-SA').format(upcomingCount)} فعاليات قادمة`
                  : `${upcomingCount} upcoming event${upcomingCount > 1 ? 's' : ''}`}
              </p>
            )}
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  FEATURED EVENT                                                  */}
      {/* ================================================================ */}
      {featured && (
        <section className="py-12 lg:py-16 bg-[#FAF7F2]">
          <div className="container-main">
            <FeaturedEvent event={featured} locale={locale} />
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  UPCOMING EVENTS                                                 */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="container-main">
          {/* Section header + Filters */}
          <ScrollReveal className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div>
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
                  {isRTL ? 'قادمة' : 'Upcoming'}
                </span>
                <h2
                  className="text-3xl sm:text-4xl text-[#2D2A33] leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isRTL ? 'الفعاليات القادمة' : 'More Events'}
                </h2>
              </div>
            </div>

            {availableTypes.length > 1 && (
              <EventFilters
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                availableTypes={availableTypes}
                locale={locale}
              />
            )}
          </ScrollReveal>

          {/* Event Cards */}
          {filteredUpcoming.length > 0 ? (
            <StaggerReveal className="space-y-6">
              {filteredUpcoming.map((event) => (
                <StaggerChild key={event.slug}>
                  <EventCard
                    event={event}
                    locale={locale}
                    isExpanded={expandedEvent === event.slug}
                    onToggleExpand={() =>
                      setExpandedEvent(
                        expandedEvent === event.slug ? null : event.slug,
                      )
                    }
                  />
                  <EventDetailExpansion
                    event={event}
                    locale={locale}
                    isOpen={expandedEvent === event.slug}
                  />
                </StaggerChild>
              ))}
            </StaggerReveal>
          ) : (
            <ScrollReveal>
              <div className="text-center py-16 rounded-2xl border-2 border-dashed border-[#F3EFE8]">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F3EFE8] mb-5">
                  <InboxIcon className="w-7 h-7 text-[#8E8E9F]" />
                </div>
                <p className="text-lg text-[#8E8E9F] font-medium">
                  {activeFilter !== 'all'
                    ? (isRTL ? 'لا توجد فعاليات في هذه الفئة حالياً' : 'No events in this category yet')
                    : (isRTL ? 'لا توجد فعاليات إضافية في الوقت الحالي' : 'No additional events at the moment')}
                </p>
                <p className="text-sm text-[#8E8E9F]/70 mt-2">
                  {isRTL ? 'ترقبوا فعالياتنا القادمة' : 'Stay tuned for upcoming events'}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ================================================================ */}
      {/*  EVENT REMINDER SIGNUP                                           */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <ScrollReveal>
            <div className="py-12 px-8 rounded-3xl bg-[#FAF7F2] border border-[#F3EFE8]">
              <EventReminderSignup locale={locale} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  PAST EVENTS                                                     */}
      {/* ================================================================ */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <ScrollReveal className={`mb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'أرشيف' : 'Archive'}
            </span>
            <h2
              className="text-3xl sm:text-4xl text-[#2D2A33] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'الفعاليات السابقة' : 'Past Events'}
            </h2>
          </ScrollReveal>

          {pastEvents.length > 0 ? (
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <StaggerChild key={event.slug}>
                  <PastEventCard event={event} locale={locale} />
                </StaggerChild>
              ))}
            </StaggerReveal>
          ) : (
            <ScrollReveal>
              <div className="text-center py-16 rounded-2xl border-2 border-dashed border-[#F3EFE8]">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#F3EFE8] mb-5">
                  <InboxIcon className="w-7 h-7 text-[#8E8E9F]" />
                </div>
                <p className="text-lg text-[#8E8E9F] font-medium">
                  {isRTL ? 'لا توجد فعاليات سابقة بعد' : 'No past events yet'}
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#ffffff"
        headingEn={
          <>
            Growth Happens in{' '}
            <span className="text-[#7A3B5E] italic">Community</span>
          </>
        }
        headingAr={
          <>
            النّموُّ يحدثُ في{' '}
            <span className="text-[#7A3B5E] italic">الجماعة</span>
          </>
        }
      />
    </div>
  );
}
