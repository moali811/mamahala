'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity, CalendarCheck, Sparkles, History, Heart, Flame, Compass } from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { categorizeEvents } from '@/lib/event-lifecycle';
import { getSeasonalTheme } from '@/lib/seasonal-themes';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import PulseCarousel from '@/components/events/PulseCarousel';
import EventCard from '@/components/events/EventCard';
import PastEventCard from '@/components/events/PastEventCard';
import EventUrgencyBadge from '@/components/events/EventUrgencyBadge';
import EventReminderSignup from '@/components/events/EventReminderSignup';
import EventFilters, { type Filters } from '@/components/events/EventFilters';
import MobileCarousel from '@/components/ui/MobileCarousel';
import { Sprout } from 'lucide-react';
import ForYouSection from '@/components/events/ForYouSection';
import { useVisitorProfile } from '@/hooks/useVisitorProfile';
import type { SmartEvent } from '@/types';

export default function EventsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const seasonal = getSeasonalTheme();
  const profile = useVisitorProfile();
  const [allEvents, setAllEvents] = useState<SmartEvent[]>([]);
  const [pulseCounts, setPulseCounts] = useState<Record<string, number>>({});
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [filters, setFilters] = useState<Filters>({ audience: 'all', format: 'all', price: 'all' });
  const [loading, setLoading] = useState(true);

  // Fetch events with KV overrides applied
  useEffect(() => {
    Promise.all([
      fetch('/api/events/data').then((r) => r.json()).catch(() => ({ events: [] })),
    ]).then(([eventData]) => {
      const events: SmartEvent[] = eventData.events || [];
      setAllEvents(events);

      // Fetch pulse counts
      const slugs = events.map((e) => e.slug).join(',');
      if (slugs) {
        fetch(`/api/events/pulse?slugs=${slugs}`)
          .then((r) => r.json())
          .then((d) => { if (d.counts) setPulseCounts(d.counts); })
          .catch(() => {});
      }
      setLoading(false);
    });
  }, []);

  const handleResonate = useCallback(async (slug: string) => {
    setPulseCounts((prev) => ({ ...prev, [slug]: (prev[slug] || 0) + 1 }));
    try {
      await fetch('/api/events/pulse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action: 'resonate' }),
      });
    } catch { /* silent — optimistic update already applied */ }
  }, []);

  // Categorize events by lifecycle
  const { upcoming, pulse, past } = categorizeEvents(allEvents, pulseCounts);

  // Apply filters to pulse + upcoming sections
  const filterEvent = (event: SmartEvent) => {
    if (filters.audience !== 'all' && !event.audiences?.includes(filters.audience)) return false;
    if (filters.format !== 'all' && event.locationType !== filters.format) return false;
    if (filters.price === 'free' && !event.isFree) return false;
    if (filters.price === 'paid' && event.isFree) return false;
    return true;
  };

  const filteredUpcoming = upcoming.filter(filterEvent);
  const filteredPulse = pulse.filter(filterEvent);
  const hasActiveFilters = filters.audience !== 'all' || filters.format !== 'all' || filters.price !== 'all';

  // Featured events — extracted from both upcoming and pulse sections so they
  // appear at the top of the page regardless of lifecycle state. Currently
  // used for the Summer 2026 Flagship Programs (girls + boys).
  const featuredUpcoming = filteredUpcoming.filter((e) => e.featured === true);
  const featuredPulse = filteredPulse.filter((e) => e.featured === true);
  const featuredEvents = [...featuredUpcoming, ...featuredPulse];
  const regularUpcoming = filteredUpcoming.filter((e) => e.featured !== true);
  const regularPulse = filteredPulse.filter((e) => e.featured !== true);

  const hasFeatured = featuredEvents.length > 0;
  const hasUpcoming = regularUpcoming.length > 0;
  const hasPulse = regularPulse.length > 0;
  const hasPast = past.length > 0;
  const totalTopics = upcoming.length + pulse.length;

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

        {/* Decorative stacked event cards — desktop only, purely visual */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 hidden lg:block pointer-events-none ${isRTL ? 'left-[8%]' : 'right-[8%]'}`}
          aria-hidden="true"
        >
          <div className="relative w-[280px] h-[320px]">
            {/* Back card — slightly rotated */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -8 }}
              animate={{ opacity: 1, y: 0, rotate: -6 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-2 left-6 w-[220px] rounded-2xl bg-white/80 backdrop-blur-sm border border-[#F3EFE8] p-4 shadow-[0_8px_30px_rgba(122,59,94,0.08)]"
              style={{ transformOrigin: 'center' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#C8A97D]/20 flex items-center justify-center">
                  <Compass className="w-3.5 h-3.5 text-[#C8A97D]" />
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#C8A97D]">Summer Program</div>
              </div>
              <div className="text-[11px] font-semibold text-[#2D2A33] leading-tight mb-2">The Balance Compass</div>
              <div className="h-1 bg-[#F3EFE8] rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-gradient-to-r from-[#C4878A] to-[#7A3B5E] rounded-full" style={{ width: '42%' }} />
              </div>
              <div className="text-[9px] text-[#8E8E9F]">8 girls resonate</div>
            </motion.div>

            {/* Middle card — slight opposite rotation */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: 6 }}
              animate={{ opacity: 1, y: 0, rotate: 4 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-16 right-0 w-[220px] rounded-2xl bg-white/90 backdrop-blur-sm border border-[#F3EFE8] p-4 shadow-[0_8px_30px_rgba(122,59,94,0.1)]"
              style={{ transformOrigin: 'center' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#5A8B6F]/18 flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5 text-[#5A8B6F]" />
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#5A8B6F]">Summer Program</div>
              </div>
              <div className="text-[11px] font-semibold text-[#2D2A33] leading-tight mb-2">Path of Strength</div>
              <div className="h-1 bg-[#F3EFE8] rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-gradient-to-r from-[#5A8B6F] to-[#3B8A6E] rounded-full" style={{ width: '58%' }} />
              </div>
              <div className="text-[9px] text-[#8E8E9F]">11 boys resonate</div>
            </motion.div>

            {/* Front card — slight tilt */}
            <motion.div
              initial={{ opacity: 0, y: 20, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-[140px] left-4 w-[220px] rounded-2xl bg-white border border-[#F3EFE8] p-4 shadow-[0_12px_40px_rgba(122,59,94,0.12)]"
              style={{ transformOrigin: 'center' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#C4878A]/18 flex items-center justify-center">
                  <Heart className="w-3.5 h-3.5 text-[#C4878A] fill-[#C4878A]/20" />
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-[#C4878A]">This Resonates</div>
              </div>
              <div className="text-[11px] font-semibold text-[#2D2A33] leading-tight mb-2">Your voice shapes what's next</div>
              <div className="text-[9px] text-[#8E8E9F] leading-relaxed">Tap hearts on topics that speak to you.</div>
            </motion.div>
          </div>
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
            <div className="flex items-center gap-2 mb-5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4878A] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#7A3B5E]" />
              </span>
              <span className="text-sm font-semibold tracking-[0.18em] uppercase text-[#7A3B5E]">
                {isRTL ? 'صَوِّتي · انْضَمّي · اِجْتَمِعي' : 'Vote · Join · Gather'}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL
                ? <>فَعالِيّاتٌ{' '}<span className="text-[#7A3B5E] italic">تَصْنَعونَها مَعَنا</span></>
                : <>Events You{' '}<span className="text-[#7A3B5E] italic">Help Us Build</span></>}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'تَصَفَّحوا الأَفْكار. اِضْغَطوا "هذا يَعْنيني" على ما يَتَرَدَّدُ صَداهُ مَعَكُم. نَسْتَضيفُ الفَعاليّاتِ الّتي تَظْهَرونَ فيها.'
                : "Browse the ideas. Tap 'This Resonates' on what speaks to you. We host the ones you show up for."}
            </p>

            {!loading && (
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[#8E8E9F]">
                {hasUpcoming && (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarCheck className="w-4 h-4 text-[#3B8A6E]" />
                    {isRTL
                      ? `${upcoming.length} ${upcoming.length <= 2 ? 'مَوْعِدٌ مُؤَكَّد' : upcoming.length <= 10 ? 'مَواعيدُ مُؤَكَّدَة' : 'مَوْعِداً مُؤَكَّداً'}`
                      : `${upcoming.length} confirmed date${upcoming.length !== 1 ? 's' : ''}`}
                  </span>
                )}
                {hasPulse && (
                  <span className="inline-flex items-center gap-1.5">
                    {/* Live pulsing dot — signals the number is real and active */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8A97D] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8A97D]" />
                    </span>
                    <Activity className="w-4 h-4 text-[#C8A97D]" />
                    {isRTL
                      ? `${pulse.length} ${pulse.length <= 2 ? 'فِكْرَةٌ مَفْتوحَة' : pulse.length <= 10 ? 'أَفْكارٌ مَفْتوحَة' : 'فِكْرَةً مَفْتوحَة'} لِلتَّصْويت`
                      : `${pulse.length} idea${pulse.length !== 1 ? 's' : ''} open for your vote`}
                  </span>
                )}
                {hasPast && (
                  <a
                    href="#past-events"
                    className="inline-flex items-center gap-1.5 hover:text-[#7A3B5E] transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('past-events')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                  >
                    <History className="w-4 h-4 text-[#B08B6E]" />
                    {isRTL
                      ? `${past.length} ${past.length <= 2 ? 'فَعاليَّةٌ مُنْعَقِدَة' : past.length <= 10 ? 'فَعاليّاتٌ مُنْعَقِدَة' : 'فَعاليَّةً مُنْعَقِدَة'}`
                      : `${past.length} event${past.length !== 1 ? 's' : ''} already held`}
                    <span className="text-[10px] opacity-60 ms-0.5">↓</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  FOR YOU — Personalized recommendations (only with profile)     */}
      {/* ================================================================ */}
      {!loading && profile.hasProfile && (
        <ForYouSection
          events={[...upcoming, ...pulse]}
          pulseCounts={pulseCounts}
          profile={profile}
          locale={locale}
        />
      )}

      {/* ================================================================ */}
      {/*  FILTERS — audience, format, price                              */}
      {/* ================================================================ */}
      {!loading && totalTopics > 3 && (
        <section className="sticky top-16 z-30 pt-3 pb-3 bg-[#FAF7F2]/92 backdrop-blur-md border-b border-[#F0E8D8]">
          <div className="container-main">
            <EventFilters
              filters={filters}
              onFiltersChange={setFilters}
              locale={locale}
            />
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  FEATURED: SUMMER 2026 FLAGSHIP PROGRAMS                         */}
      {/*  Extracted from upcoming + pulse when event.featured === true    */}
      {/* ================================================================ */}
      {hasFeatured && (
        <section className="pt-10 lg:pt-14 pb-10 lg:pb-12 bg-[#FAF7F2]">
          <div className="container-main">
            <ScrollReveal className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#C8A97D]/15 to-[#B08D57]/15 border border-[#C8A97D]/25">
                <Sparkles className="w-3.5 h-3.5 text-[#B08D57]" />
                <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#B08D57]">
                  {isRTL ? 'صَيْفُ ٢٠٢٦ · بَرامِجُ رائِدَة' : 'Summer 2026 · Flagship Programs'}
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight max-w-2xl mx-auto"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? (
                  <>طَريقان.{' '}<span className="text-[#7A3B5E] italic">صَيْفٌ واحِد.</span></>
                ) : (
                  <>Two Paths.{' '}<span className="text-[#7A3B5E] italic">One Summer.</span></>
                )}
              </h2>
              <p className="mt-4 text-base text-[#6B6580] max-w-2xl mx-auto leading-relaxed">
                {isRTL
                  ? 'بَرْنامَجانِ مُصَمَّمانِ خِصّيصاً لِلمُراهِقينَ — دَوائِرُ صَغيرَةٌ، قِيادَةُ د. هالَة، وعَمَلٌ حَقيقِيٌّ عَلى ما يُشَكِّلُ مَنْ يُصْبِحون.'
                  : 'Two programs designed specifically for teens — small circles, Dr. Hala in the room, and real work on what actually shapes who they become.'}
              </p>
            </ScrollReveal>

            <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
              {featuredEvents.map((event) => (
                <motion.div
                  key={event.slug}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl border-2 border-[#C8A97D]/30 overflow-hidden bg-white shadow-[0_8px_40px_rgba(176,141,87,0.08)]"
                >
                  {/* Gold accent stripe at top */}
                  <div className="h-1.5 bg-gradient-to-r from-[#C8A97D] via-[#B08D57] to-[#7A3B5E]" />
                  {/* Featured badge overlay */}
                  <div className={`absolute top-5 ${isRTL ? 'left-5' : 'right-5'} z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#B08D57] to-[#7A3B5E] shadow-md`}>
                    <Sparkles className="w-2.5 h-2.5" />
                    {isRTL ? 'مُمَيَّز' : 'Featured'}
                  </div>
                  <EventCard
                    event={event}
                    locale={locale}
                    isExpanded={expandedSlug === event.slug}
                    onToggleExpand={() =>
                      setExpandedSlug(expandedSlug === event.slug ? null : event.slug)
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  SECTION 1: COMING UP — Scheduled events with dates              */}
      {/* ================================================================ */}
      {hasUpcoming && (
        <section className={`${hasFeatured ? 'pt-8 lg:pt-12' : 'pt-10 lg:pt-14'} pb-16 lg:pb-24 bg-[#FAF7F2]`}>
          <div className="container-main">
            <ScrollReveal className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <CalendarCheck className="w-5 h-5 text-[#3B8A6E]" />
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#3B8A6E]">
                  {isRTL ? 'قادمة' : 'Coming Up'}
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl text-[#2D2A33] leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'فعاليّاتٌ مفتوحةُ التّسجيل' : 'Events Open for Registration'}
              </h2>
              <p className="mt-3 text-sm text-[#6B6580] max-w-xl">
                {isRTL
                  ? 'سجّلْ الآنَ لتضمنَ مكانَك — الأماكنُ محدودة.'
                  : 'Register now to secure your spot — spaces are limited.'}
              </p>
            </ScrollReveal>

            <StaggerReveal className="space-y-6">
              {regularUpcoming.map((event) => (
                <StaggerChild key={event.slug}>
                  <div className="relative rounded-2xl border border-[#F3EFE8] overflow-hidden bg-white">
                    {/* Urgency badge */}
                    {event.lifecycle.badgeLabelEn && event.lifecycle.urgency !== 'none' && (
                      <div className={`absolute top-4 ${isRTL ? 'left-4' : 'right-4'} z-10`}>
                        <EventUrgencyBadge lifecycle={event.lifecycle} locale={locale} />
                      </div>
                    )}
                    <EventCard
                      event={event}
                      locale={locale}
                      isExpanded={expandedSlug === event.slug}
                      onToggleExpand={() =>
                        setExpandedSlug(expandedSlug === event.slug ? null : event.slug)
                      }
                    />
                  </div>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  SECTION 2: SHAPE WHAT'S NEXT — Pulse / concept voting           */}
      {/* ================================================================ */}
      {hasPulse && (
        <section className={`py-16 lg:py-24 ${hasUpcoming || hasFeatured ? 'bg-white' : 'bg-[#FAF7F2]'}`}>
          <div className="container-main">
            <ScrollReveal className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C4878A] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#C8A97D]" />
                </span>
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]">
                  {isRTL ? 'نبضُ المجتمع' : 'Community Pulse'}
                </span>
              </div>
              <h2
                className="text-3xl sm:text-4xl text-[#2D2A33] leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'شارِكْ في صناعةِ ما هو قادم' : 'Shape What Happens Next'}
              </h2>
              <p className="mt-3 text-sm text-[#6B6580] max-w-xl">
                {isRTL
                  ? 'اضغَطْ "هذا يعنيني" على أيّ موضوعٍ يتردّدُ صداه معك. كلّما زادَ الاهتمام، اقتربنا من تحويلِه إلى فعاليّةٍ حقيقيّة.'
                  : 'Tap "This Resonates" on any topic that speaks to you. The more interest, the closer we are to making it a real event.'}
              </p>
            </ScrollReveal>

            <PulseCarousel
              events={regularPulse}
              pulseCounts={pulseCounts}
              locale={locale}
              onResonate={handleResonate}
              expandedSlug={expandedSlug}
              onToggleExpand={(slug) => setExpandedSlug(expandedSlug === slug ? null : slug)}
            />
          </div>
        </section>
      )}

      {/* No results message when filters exclude everything */}
      {hasActiveFilters && !hasFeatured && !hasUpcoming && !hasPulse && (
        <section className="py-16 bg-[#FAF7F2]">
          <div className="container-main text-center">
            <p className="text-[#8E8E9F] text-sm">
              {isRTL ? 'لا توجدُ فعاليّاتٌ تطابقُ الفلاتر. جرِّبْ تعديلَها.' : 'No events match your filters. Try adjusting them.'}
            </p>
          </div>
        </section>
      )}

      {/* ================================================================ */}
      {/*  SECTION 3: PAST EVENTS                                          */}
      {/* ================================================================ */}
      {hasPast && (() => {
        // Count series instances via seriesId (data-driven — adds new rounds automatically)
        const seriesCounts = past.reduce<Record<string, number>>((acc, e) => {
          if (e.seriesId) acc[e.seriesId] = (acc[e.seriesId] || 0) + 1;
          return acc;
        }, {});
        const growWithMeCount = seriesCounts['grow-with-me'] || 0;

        // Defensive: once we pass ~8 past events, trim the homepage section and show a "view all" link.
        // Below 8, show everything (current behavior for 6 events).
        const HOMEPAGE_LIMIT = 8;
        const visiblePast = past.slice(0, HOMEPAGE_LIMIT);
        const hiddenCount = Math.max(0, past.length - HOMEPAGE_LIMIT);

        return (
        <section id="past-events" className="py-16 lg:py-24 bg-[#FAF7F2] scroll-mt-24">
          <div className="container-main">
            <ScrollReveal className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <History className="w-4 h-4 text-[#8E8E9F]" />
                <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#8E8E9F]">
                  {isRTL ? 'فعاليّاتٌ سابقة' : 'Past Events'}
                </span>
              </div>
              <h2
                className="text-2xl sm:text-3xl text-[#2D2A33]/70 leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'لحظاتٌ جمعتـنا' : "What We've Done Together"}
              </h2>
              <p className="mt-3 text-sm text-[#6B6580] max-w-xl">
                {isRTL
                  ? `${past.length} ${past.length <= 2 ? 'فَعاليَّةٌ عَقَدْناها' : 'فَعاليّاتٌ عَقَدْناها'} مع الأُمَّهاتِ وَالعائِلاتِ — مِنْ غُرْفَةِ الجُلوسِ إلى الحَديقَةِ إلى Google Meet.`
                  : `${past.length} gatherings we've held with mothers and families — from the living room to the garden to Google Meet.`}
              </p>
            </ScrollReveal>

            {/* Grow With Me series callout — activates once 2+ rounds exist */}
            {growWithMeCount >= 2 && (
              <ScrollReveal className="mb-8">
                <div className="rounded-2xl p-5 sm:p-6 border border-[#6B9A5B]/20 bg-gradient-to-br from-[#EEF5E8] via-[#F5F9EE] to-[#FAFCF5] flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm border border-[#6B9A5B]/20">
                    <Sprout className="w-5 h-5 text-[#6B9A5B]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#6B9A5B]">
                        {isRTL ? 'سِلْسِلَةٌ مُسْتَمِرَّة' : 'Ongoing Series'}
                      </p>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[9px] font-bold uppercase tracking-[0.1em] text-[#6B9A5B] border border-[#6B9A5B]/20">
                        {growWithMeCount} {isRTL ? 'جَوْلات' : 'rounds'}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#2D2A33] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                      {isRTL ? 'اِنْمو مَعي' : 'Grow With Me'}
                    </h3>
                    <p className="text-sm text-[#4A4A5C] leading-relaxed">
                      {isRTL
                        ? 'دَوْرَةٌ مَوْسِميَّةٌ مِنَ العِلاجِ بِالنَّباتِ اِفْتِراضيّاً. الأُمَّهاتُ وَالمُراهِقونَ يَزْرَعونَ مَعاً، وَيُسَمّونَ ما يَحْتاجُ إلى ماءٍ في حَياتِهِم. الجَوْلَةُ القادِمَةُ رَبيع ٢٠٢٦.'
                        : "A seasonal virtual plant-therapy practice. Mothers and teens plant together, naming what in their lives needs water. Next round: spring 2026."}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            )}

            <MobileCarousel desktopGrid="md:grid-cols-2" gap={24} mobileWidth="85vw">
              {visiblePast.map((event) => (
                <PastEventCard key={event.slug} event={event} locale={locale} />
              ))}
            </MobileCarousel>

            {/* "View all" link — appears once past events exceed HOMEPAGE_LIMIT */}
            {hiddenCount > 0 && (
              <ScrollReveal className="mt-8 text-center">
                <p className="text-[11px] text-[#8E8E9F] mb-3">
                  {isRTL
                    ? `يَظْهَرُ هُنا آخِرُ ${HOMEPAGE_LIMIT} فَعاليّات — لَدَيْنا ${past.length} إِجْمالاً.`
                    : `Showing the most recent ${HOMEPAGE_LIMIT} of ${past.length} past gatherings.`}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#7A3B5E] opacity-70">
                  {isRTL
                    ? `تَصَفَّحي الأَرْشيفَ الكامِل (${past.length}) — قريباً`
                    : `Browse the full archive (${past.length}) — coming soon`}
                </span>
              </ScrollReveal>
            )}
          </div>
        </section>
        );
      })()}

      {/* ================================================================ */}
      {/*  REMINDER SIGNUP                                                 */}
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

      <FinalCTA
        locale={locale}
        fillColorAbove="#ffffff"
        headingEn={<>Growth Happens in{' '}<span className="text-[#7A3B5E] italic">Community</span></>}
        headingAr={<>النّموُّ يحدثُ في{' '}<span className="text-[#7A3B5E] italic">الجماعة</span></>}
        descEn="Can't find a topic that fits? Let's talk about what support looks like for you."
        descAr="لم تجدْ موضوعًا مناسبًا؟ دعنا نتحدّثْ عن الدّعمِ الأنسبِ لك."
        primaryTextEn="Book a Free Consultation"
        primaryTextAr="احجزْ استشارةً مجّانيّة"
        secondaryTextEn="Let's Talk"
        secondaryTextAr="لنتحدّثْ"
      />
    </div>
  );
}
