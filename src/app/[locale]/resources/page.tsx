'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  CalendarDays,
  Download,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import HeroDecorCluster from '@/components/ui/HeroDecorCluster';
import FinalCTA from '@/components/shared/FinalCTA';
import PageTracker from '@/components/analytics/PageTracker';

/*
 * Strategic order based on visitor psychology:
 *
 * 1. QUIZZES — Lowest friction, highest curiosity. Interactive = instant engagement.
 *    "What kind of parent am I?" pulls people in before they commit to reading.
 *
 * 2. FREE TOOLKITS — Immediate value with zero cost. Builds trust + captures email.
 *    After the quiz sparks curiosity, a free download feels like a natural next step.
 *
 * 3. BLOG — Establishes expertise. Now that they trust you (quiz + freebie),
 *    they'll invest time reading. Builds the "this person knows what they're talking about" feeling.
 *
 * 4. EVENTS — Social proof + urgency. "Other people attend these" + limited spots.
 *    By now they see you as an expert and want to connect in person/live.
 *
 * 5. PROGRAMS — Highest commitment. Only shown after trust is built through
 *    the above touchpoints. Coming Soon creates anticipation, not pressure.
 *
 * 6. FAQS — Safety net. Catches anyone with remaining doubts or questions.
 *    Always last because it serves people who are almost ready to act.
 */
/*
 * Final strategic order — hybrid of AIDA + counseling journey:
 *
 * 1. ASSESS (Quizzes) — Start with self-discovery. Mental health is personal.
 *    Identify their specific need before they get overwhelmed by content.
 *
 * 2. READ (Blog) — Now they have a "score" or focus area, they're primed
 *    to read relevant articles with purpose — not random browsing.
 *
 * 3. DOWNLOAD (Toolkits) — Tangible takeaway they can keep offline.
 *    Provides a "win" + captures their email. Trust is now established.
 *
 * 4. ATTEND (Events) — Transition from solo learning to community.
 *    Workshops, webinars, live sessions with Dr. Hala.
 *
 * 5. LEARN (Programs) — Highest commitment. Deep-dive courses where
 *    all the above culminates into structured, long-term growth.
 *
 * 6. ASK (FAQs) — Safety net. After seeing everything available,
 *    catches anyone with remaining doubts before they take action.
 */
const resourceTypes = [
  { key: 'quiz', icon: Sparkles, color: '#8B5CF6', bgColor: '#8B5CF6', tag: { en: 'Assess', ar: 'قيِّمْ' } },
  { key: 'blog', icon: BookOpen, color: '#C4878A', bgColor: '#C4878A', tag: { en: 'Read', ar: 'اقرأ' } },
  { key: 'downloads', icon: Download, color: '#5A8B6E', bgColor: '#5A8B6E', tag: { en: 'Download', ar: 'حمِّلْ' } },
  { key: 'events', icon: CalendarDays, color: '#C8A97D', bgColor: '#C8A97D', tag: { en: 'Attend', ar: 'شارِكْ' } },
  { key: 'programs', icon: GraduationCap, color: '#7A3B5E', bgColor: '#7A3B5E', tag: { en: 'Learn', ar: 'تعلَّمْ' } },
  { key: 'faqs', icon: HelpCircle, color: '#D4836A', bgColor: '#D4836A', tag: { en: 'Ask', ar: 'اسأل' } },
] as const;

export default function ResourcesPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const descKeys: Record<string, string> = {
    blog: messages.resources.blogDesc,
    programs: messages.resources.programsDesc,
    events: messages.resources.eventsDesc,
    downloads: messages.resources.downloadsDesc,
    faqs: messages.resources.faqsDesc,
    quiz: isRTL ? 'تقييماتٌ ذاتيّةٌ سريعة لفهمِ نفسِك وعائلتِك بشكلٍ أعمق.' : 'Quick self-assessments to understand yourself and your family better.',
  };

  const titleKeys: Record<string, string> = {
    blog: messages.resources.blog,
    programs: messages.resources.programs,
    events: messages.resources.events,
    downloads: messages.resources.downloads,
    faqs: messages.resources.faqs,
    quiz: isRTL ? 'تقييماتٌ ذاتيّة' : 'Self-Assessments',
  };

  return (
    <div className="overflow-hidden">
      <PageTracker type="page_view" source="resources" locale={locale as string} />
      {/* ================================================================ */}
      {/*  HERO                                                            */}
      {/* ================================================================ */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E8E5] via-[#F8EDE8] to-[#FAF7F2]" />
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-[#C4878A]/[0.08] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.12] blur-[80px]" />
        </div>
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Decorative stacked card cluster — desktop only */}
        <HeroDecorCluster
          locale={locale}
          cards={[
            {
              icon: Sparkles,
              color: '#8B5CF6',
              eyebrowEn: 'Self-Assessment',
              eyebrowAr: 'تَقْييمٌ ذاتِيّ',
              titleEn: 'Know yourself in 5 min',
              titleAr: 'اِعْرِفي نَفْسَكِ في ٥ دقائِق',
              accent: { type: 'caption', textEn: 'Free · Instant insights', textAr: 'مَجّانِيّ · رُؤى فَوْرِيَّة' },
            },
            {
              icon: BookOpen,
              color: '#C4878A',
              eyebrowEn: 'Insight Article',
              eyebrowAr: 'مَقالَة',
              titleEn: 'Reads that change things',
              titleAr: 'قِراءاتٌ تَصْنَعُ فَرْقاً',
              accent: { type: 'caption', textEn: '5–10 min reads · Weekly', textAr: '٥–١٠ دَقائِق · أُسْبوعِيَّة' },
            },
            {
              icon: Download,
              color: '#5A8B6E',
              eyebrowEn: 'Free Toolkit',
              eyebrowAr: 'أَداةٌ مَجّانِيَّة',
              titleEn: 'Print, fill, repeat',
              titleAr: 'اِطْبَعي، اِمْلَئي، كَرِّري',
              accent: { type: 'caption', textEn: 'Bilingual EN/AR', textAr: 'ثُنائِيَّةُ اللُّغَة' },
            },
          ]}
        />

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.resources.pageTitle },
              ]}
              locale={locale}
            />
          </motion.div>

          <motion.div
            className={`mt-10 max-w-3xl ${isRTL ? 'text-right' : ''}`}
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-4"
            >
              {isRTL ? 'مكتبة الموارد' : 'Resource Library'}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.resources.pageTitle}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed"
            >
              {messages.resources.subtitle}
            </motion.p>
          </motion.div>
        </div>

        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  RESOURCE TYPE CARDS                                             */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <StaggerReveal className="flex flex-wrap justify-center gap-6">
            {resourceTypes.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <StaggerChild key={resource.key} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                  <Link href={resource.key === 'quiz' ? `/${locale}/resources/assessments` : `/${locale}/resources/${resource.key}`}>
                    <motion.div
                      className="group relative bg-white rounded-2xl h-full border border-[#F3EFE8] overflow-hidden transition-all duration-300 cursor-pointer"
                      whileHover={{ y: -4, boxShadow: '0 16px 44px rgba(0,0,0,0.07)' }}
                    >
                      {/* Accent top bar */}
                      <div className="h-1 rounded-t-2xl" style={{ backgroundColor: resource.color }} />

                      <div className="p-7 flex flex-col h-full">
                        {/* Tag + Icon Row */}
                        <div className="flex items-center justify-between mb-5">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundColor: `${resource.color}12` }}
                          >
                            <IconComponent
                              className="w-6 h-6"
                              style={{ color: resource.color }}
                            />
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full"
                            style={{ backgroundColor: `${resource.color}10`, color: resource.color }}
                          >
                            {isRTL ? resource.tag.ar : resource.tag.en}
                          </span>
                        </div>

                        <h3
                          className="text-xl font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {titleKeys[resource.key]}
                        </h3>
                        <p className="text-sm text-[#8E8E9F] leading-relaxed flex-1 mb-5">
                          {descKeys[resource.key]}
                        </p>

                        {/* CTA */}
                        <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: resource.color }}>
                          <span>{isRTL ? 'استكشِفْ' : 'Explore'}</span>
                          <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </StaggerChild>
              );
            })}
          </StaggerReveal>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>Every Heart Deserves to Be <span className="text-[#7A3B5E] italic">Heard</span></>}
        headingAr={<>كلُّ قلبٍ يستحقُّ أن <span className="text-[#7A3B5E] italic">يُسمَع</span></>}
        primaryTextEn="Start a Conversation"
        primaryTextAr="ابدأ محادثة"
        secondaryTextEn="Browse Services"
        secondaryTextAr="تصفّح الخدمات"
        secondaryHref={`/${locale}/services`}
      />
    </div>
  );
}
