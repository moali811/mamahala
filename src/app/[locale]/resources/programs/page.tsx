'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Users,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  GraduationCap,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';

interface ProgramModule {
  en: string;
  ar: string;
}

interface Program {
  id: string;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  type: 'course' | 'group';
  duration: { en: string; ar: string };
  status: 'coming-soon' | 'enrolling';
  price?: string;
  modules: ProgramModule[];
}

const programs: Program[] = [
  {
    id: 'confident-parenting',
    title: {
      en: 'Confident Parenting Masterclass',
      ar: 'ماستركلاس الأبوة الواثقة',
    },
    description: {
      en: 'A comprehensive program designed to help parents build confidence, improve communication with their children, and create a harmonious home environment.',
      ar: 'برنامج شامل مصمم لمساعدة الآباء على بناء الثقة وتحسين التواصل مع أطفالهم وخلق بيئة منزلية متناغمة.',
    },
    type: 'course',
    duration: { en: '6 weeks', ar: '٦ أسابيع' },
    status: 'coming-soon',
    modules: [
      { en: 'Understanding Your Parenting Style', ar: 'فهم أسلوبك في التربية' },
      { en: 'Communication That Connects', ar: 'التواصل الذي يربط' },
      { en: 'Setting Boundaries With Love', ar: 'وضع الحدود بمحبة' },
      { en: 'Building Lasting Family Habits', ar: 'بناء عادات أسرية دائمة' },
    ],
  },
  {
    id: 'pre-marriage',
    title: {
      en: 'Pre-Marriage Readiness Program',
      ar: 'برنامج الاستعداد للزواج',
    },
    description: {
      en: 'Prepare for a strong marriage foundation with communication skills, conflict resolution, and shared vision building.',
      ar: 'استعد لأساس زواج قوي مع مهارات التواصل وحل النزاعات وبناء رؤية مشتركة.',
    },
    type: 'group',
    duration: { en: '4 weeks', ar: '٤ أسابيع' },
    status: 'enrolling',
    price: 'CAD $299',
    modules: [
      { en: 'Communication Foundations', ar: 'أسس التواصل' },
      { en: 'Conflict Resolution Skills', ar: 'مهارات حل النزاعات' },
      { en: 'Financial Planning Together', ar: 'التخطيط المالي معًا' },
      { en: 'Building Your Shared Vision', ar: 'بناء رؤيتكم المشتركة' },
    ],
  },
];

export default function ProgramsPage() {
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
              { label: messages.nav.programs },
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
              {isRTL ? 'البرامج' : 'Programs'}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'دورات منظمة ومصممة لتحقيق النمو المستدام والتطور الشخصي والأسري'
                : 'Structured courses designed for sustained growth and personal and family development'}
            </p>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  PROGRAMS GRID                                                   */}
      {/* ================================================================ */}
      <section className="py-20 lg:py-28 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className={`mb-14 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'استكشف' : 'Explore'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'برامجنا المتاحة' : 'Our Available Programs'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {programs.map((program) => {
              const title = isRTL ? program.title.ar : program.title.en;
              const description = isRTL ? program.description.ar : program.description.en;
              const duration = isRTL ? program.duration.ar : program.duration.en;
              const isEnrolling = program.status === 'enrolling';
              const TypeIcon = program.type === 'course' ? GraduationCap : Users;

              return (
                <StaggerChild key={program.id}>
                  <motion.div
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#F3EFE8] hover:border-[#C4878A]/20 transition-all duration-300 h-full flex flex-col"
                    whileHover={{ y: -6, boxShadow: '0 12px 48px rgba(0,0,0,0.1)' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Gradient accent top */}
                    <div className="h-1.5 bg-gradient-to-r from-[#C4878A] via-[#C8A97D] to-[#7A3B5E]" />

                    <div className="p-8 flex-1 flex flex-col">
                      {/* Header: type badge + status badge */}
                      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                        <Badge variant={program.type === 'course' ? 'sage' : 'plum'} size="md">
                          <TypeIcon className="w-3.5 h-3.5 mr-1.5" />
                          {program.type === 'course'
                            ? isRTL ? 'دورة' : 'Course'
                            : isRTL ? 'مجموعة' : 'Group'}
                        </Badge>

                        <Badge
                          variant={isEnrolling ? 'success' : 'sand'}
                          size="md"
                        >
                          <span className={`w-2 h-2 rounded-full ${isEnrolling ? 'bg-[#3B8A6E]' : 'bg-[#C8A97D]'} mr-1.5`} />
                          {isEnrolling ? messages.common.enrollNow : messages.common.comingSoon}
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
                      <p className="text-[#4A4A5C] leading-relaxed mb-6">
                        {description}
                      </p>

                      {/* Duration */}
                      <div className="flex items-center gap-2 text-sm text-[#8E8E9F] mb-6">
                        <Clock className="w-4 h-4" />
                        <span>{duration}</span>
                      </div>

                      {/* Modules */}
                      <div className="mb-8 flex-1">
                        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#8E8E9F] mb-3">
                          {isRTL ? 'المحاور' : 'Modules'}
                        </p>
                        <div className="space-y-2.5">
                          {program.modules.map((mod, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 text-sm text-[#4A4A5C]"
                            >
                              <div className="w-6 h-6 rounded-full bg-[#C4878A]/10 flex items-center justify-center flex-shrink-0">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#7A3B5E]" />
                              </div>
                              <span>{isRTL ? mod.ar : mod.en}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer: price + CTA */}
                      <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-[#F3EFE8]">
                        {program.price && (
                          <span className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                            {program.price}
                          </span>
                        )}

                        <Button
                          variant={isEnrolling ? 'primary' : 'outline'}
                          size="md"
                          icon={<ArrowIcon className="w-4 h-4" />}
                          iconPosition="right"
                          className={!program.price ? 'ml-auto' : ''}
                        >
                          {isEnrolling ? messages.common.enrollNow : messages.common.joinWaitlist}
                        </Button>
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
      {/*  CTA                                                             */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 gradient-cta-dark relative overflow-hidden">
        <WaveDivider position="top" fillColor="#FAF7F2" variant="organic" />
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
