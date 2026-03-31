'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen, Users, Clock, ArrowRight, ArrowLeft, Sparkles,
  GraduationCap, Heart, Sprout, HeartHandshake, Compass, TreePine,
  Star, CheckCircle, Award, Layers,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';
import { programCatalog } from '@/data/programs';
import { t, tArray } from '@/lib/academy-helpers';

const iconMap: Record<string, React.ReactNode> = {
  Heart: <Heart className="w-6 h-6" />,
  Sprout: <Sprout className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Compass: <Compass className="w-6 h-6" />,
  TreePine: <TreePine className="w-6 h-6" />,
};

const categoryLabels: Record<string, { en: string; ar: string }> = {
  families: { en: 'Families', ar: 'العائلات' },
  youth: { en: 'Youth', ar: 'الشباب' },
  couples: { en: 'Couples', ar: 'الأزواج' },
  adults: { en: 'Adults', ar: 'البالغين' },
};

export default function ProgramsPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden gradient-sage">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#7A3B5E]/[0.04] blur-[80px]" />
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
            {/* Academy badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7A3B5E]/8 mb-6">
              <GraduationCap className="w-4 h-4 text-[#7A3B5E]" />
              <span className="text-sm font-semibold text-[#7A3B5E]">
                {isRTL ? 'أكاديمية ماما هالة' : 'Mama Hala Academy'}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? (
                <>تعلّم. انمُ. <span className="text-[#7A3B5E] italic">تحوّل.</span></>
              ) : (
                <>Learn. Grow. <span className="text-[#7A3B5E] italic">Transform.</span></>
              )}
            </h1>
            <p className="mt-5 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed">
              {isRTL
                ? 'برامج تعليمية متعددة المستويات مصممة من قبل الدكتورة هالة علي — مبنية على الأدلة، عملية، ومصممة لتحولات حقيقية.'
                : 'Multi-level educational programs designed by Dr. Hala Ali — evidence-based, practical, and built for real transformation.'}
            </p>

            {/* Quick stats */}
            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#7A3B5E]/10 flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-[#7A3B5E]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#2D2A33]">5</p>
                  <p className="text-xs text-[#8E8E9F]">{isRTL ? 'برامج' : 'Programs'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#C8A97D]/10 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-[#C8A97D]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#2D2A33]">59</p>
                  <p className="text-xs text-[#8E8E9F]">{isRTL ? 'وحدة تعليمية' : 'Modules'}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#3B8A6E]/10 flex items-center justify-center">
                  <Award className="w-4 h-4 text-[#3B8A6E]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-[#2D2A33]">{isRTL ? 'معتمدة' : 'Certified'}</p>
                  <p className="text-xs text-[#8E8E9F]">{isRTL ? 'شهادات إتمام' : 'Completion Certificates'}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'كيف يعمل' : 'How It Works'}
            </span>
            <h2
              className="text-3xl sm:text-4xl text-[#2D2A33] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'رحلة تعلّم مصممة لتحولك' : 'A Learning Journey Designed for Your Growth'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <BookOpen className="w-5 h-5" />, title: isRTL ? 'تعلّم' : 'Learn', desc: isRTL ? 'دروس غنية بالمحتوى مع رؤى الدكتورة هالة' : 'Rich lessons with Dr. Hala\'s insights', color: '#7A3B5E' },
              { icon: <Star className="w-5 h-5" />, title: isRTL ? 'تأمّل' : 'Reflect', desc: isRTL ? 'تمارين تأمل وأنشطة عملية' : 'Guided reflections & practical activities', color: '#C8A97D' },
              { icon: <CheckCircle className="w-5 h-5" />, title: isRTL ? 'اختبر' : 'Assess', desc: isRTL ? 'اختبارات لتعزيز فهمك' : 'Module quizzes to reinforce learning', color: '#C4878A' },
              { icon: <Award className="w-5 h-5" />, title: isRTL ? 'احتفل' : 'Graduate', desc: isRTL ? 'شهادة إتمام موقعة من الدكتورة هالة' : 'Certificate signed by Dr. Hala Ali', color: '#3B8A6E' },
            ].map((step, i) => (
              <StaggerChild key={i}>
                <div className="bg-white rounded-xl border border-[#F3EFE8] p-6 text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${step.color}12` }}>
                    <div style={{ color: step.color }}>{step.icon}</div>
                  </div>
                  <div className="text-xs font-bold text-[#C8A97D] mb-1">{isRTL ? `الخطوة ${i + 1}` : `Step ${i + 1}`}</div>
                  <h3 className="text-lg font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>{step.title}</h3>
                  <p className="text-sm text-[#8E8E9F]">{step.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <ScrollReveal className="mb-12">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'البرامج' : 'Programs'}
            </span>
            <h2
              className="text-3xl sm:text-4xl text-[#2D2A33] leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'اختر رحلتك' : 'Choose Your Journey'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="space-y-8">
            {programCatalog.map((program, index) => {
              const title = t(program.titleEn, program.titleAr, isRTL);
              const desc = t(program.descriptionEn, program.descriptionAr, isRTL);
              const longDesc = t(program.longDescriptionEn, program.longDescriptionAr, isRTL);
              const catLabel = isRTL ? categoryLabels[program.category]?.ar : categoryLabels[program.category]?.en;
              const icon = iconMap[program.icon] || <BookOpen className="w-6 h-6" />;

              return (
                <StaggerChild key={program.slug}>
                  <motion.div
                    className="group relative bg-white rounded-2xl overflow-hidden border border-[#F3EFE8] hover:border-[#C4878A]/20 transition-all duration-300"
                    whileHover={{ y: -4, boxShadow: '0 12px 48px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="flex flex-col lg:flex-row">
                      {/* Left: Visual */}
                      <div
                        className="relative flex-shrink-0 w-full lg:w-[340px] overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${program.color}15, ${program.color}08)` }}
                      >
                        <div
                          className="absolute inset-0 opacity-[0.03]"
                          style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0)',
                            backgroundSize: '24px 24px',
                            color: program.color,
                          }}
                        />
                        <div className="relative flex flex-col items-center justify-center p-8 lg:p-10 h-full min-h-[240px]">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: `${program.color}15` }}>
                            <div style={{ color: program.color }}>{icon}</div>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            {program.isFree ? (
                              <Badge variant="success" size="md">{isRTL ? 'مجاني' : 'Free'}</Badge>
                            ) : (
                              <Badge variant="sand" size="md">CAD ${program.priceCAD}</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-[#8E8E9F]">
                            <span className="inline-flex items-center gap-1"><Layers className="w-3 h-3" /> {program.totalModules} {isRTL ? 'وحدة' : 'modules'}</span>
                            <span className="inline-flex items-center gap-1"><Clock className="w-3 h-3" /> {program.totalDurationHours}h</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Content */}
                      <div className="flex-1 p-6 sm:p-8 lg:p-10 flex flex-col">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="plum" size="sm">{catLabel}</Badge>
                          <Badge variant="neutral" size="sm">
                            <Award className="w-3 h-3 mr-1" />
                            {isRTL ? 'شهادة' : 'Certificate'}
                          </Badge>
                          {!program.isFree && programCatalog.indexOf(program) < 4 && (
                            <Badge variant="success" size="sm">
                              {isRTL ? 'المستوى الأول مجاني' : 'Level 1 Free'}
                            </Badge>
                          )}
                        </div>

                        <h3
                          className="text-xl sm:text-2xl font-bold text-[#2D2A33] mb-3 group-hover:text-[#7A3B5E] transition-colors"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {title}
                        </h3>

                        <p className="text-[#4A4A5C] leading-relaxed mb-4">{longDesc}</p>

                        {/* What you'll learn */}
                        <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 text-sm text-[#8E8E9F]">
                          {tArray(program.whatYouWillLearn.en, program.whatYouWillLearn.ar, isRTL).slice(0, 3).map((item, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#3B8A6E]" /> {item}
                            </span>
                          ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-3 mt-auto">
                          <Button
                            as="a"
                            href={`/${locale}/programs/${program.slug}`}
                            variant="primary"
                            size="md"
                            icon={<ArrowIcon className="w-4 h-4" />}
                            iconPosition="right"
                          >
                            {isRTL ? 'ابدأ الرحلة' : 'Start Your Journey'}
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

      {/* ─── CERTIFICATE PREVIEW ─── */}
      <section className="py-16 lg:py-24 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C8A97D]/10 mb-5">
                <GraduationCap className="w-8 h-8 text-[#C8A97D]" />
              </div>
              <h2
                className="text-3xl sm:text-4xl text-[#2D2A33] leading-tight mb-4"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'احصل على شهادتك' : 'Earn Your Certificate'}
              </h2>
              <p className="text-[#4A4A5C] leading-relaxed mb-8 max-w-lg mx-auto">
                {isRTL
                  ? 'أكمل جميع الوحدات واحصل على شهادة إتمام رسمية موقعة من الدكتورة هالة علي — خبيرة مستشارة أسرية معتمدة.'
                  : 'Complete all modules and receive an official Certificate of Completion signed by Dr. Hala Ali — a certified family counselor with years of clinical experience.'}
              </p>

              {/* Certificate preview card */}
              <div className="bg-white rounded-2xl border-2 border-[#C8A97D]/20 p-8 sm:p-12 relative overflow-hidden max-w-md mx-auto">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#7A3B5E] via-[#C8A97D] to-[#C4878A]" />
                <p className="text-xs text-[#C8A97D] uppercase tracking-[0.3em] mb-4">Mama Hala Academy</p>
                <h3
                  className="text-2xl text-[#2D2A33] mb-2"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  Certificate of Completion
                </h3>
                <p className="text-sm text-[#8E8E9F] mb-6">{isRTL ? 'هذا يشهد بأن' : 'This certifies that'}</p>
                <div className="border-b-2 border-[#C8A97D]/30 w-48 mx-auto mb-2" />
                <p className="text-xs text-[#8E8E9F] italic mb-6">{isRTL ? 'اسمك هنا' : 'Your Name Here'}</p>
                <p className="text-xs text-[#4A4A5C]">{isRTL ? 'أتم بنجاح برنامج' : 'has successfully completed'}</p>
                <p className="text-sm font-bold text-[#7A3B5E] mt-1">{isRTL ? 'الوالد الواعي' : 'The Intentional Parent'}</p>
                <div className="mt-6 pt-4 border-t border-[#F3EFE8]">
                  <p className="text-xs text-[#8E8E9F]" style={{ fontFamily: 'var(--font-heading)' }}>Dr. Hala Ali</p>
                  <p className="text-[10px] text-[#B0B0C0]">Certified Family Counselor</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FinalCTA
        locale={locale}
        fillColorAbove="#FAF7F2"
        headingEn={<>Your Growth Journey <span className="text-[#7A3B5E] italic">Starts Here</span></>}
        headingAr={<>رحلة نموّك <span className="text-[#7A3B5E] italic">تبدأ هنا</span></>}
      />
    </div>
  );
}
