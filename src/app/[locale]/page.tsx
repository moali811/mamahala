'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  MessageCircle,
  Sparkles,
  Calendar,
  GraduationCap,
  Users,
  User,
  Heart,
  Leaf,
  BookOpen,
  Star,
  Quote,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { serviceCategories } from '@/data/services';
import { testimonials } from '@/data/testimonials';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import TextReveal from '@/components/motion/TextReveal';
import AnimatedCounter from '@/components/motion/AnimatedCounter';
import ParallaxImage from '@/components/motion/ParallaxImage';
import HookCarousel from '@/components/motion/HookCarousel';
import Button from '@/components/ui/Button';
import WaveDivider from '@/components/ui/WaveDivider';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GraduationCap, Users, User, Heart, Leaf, Sparkles: Sparkles,
};

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  // Subtle parallax for About preview photo
  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ['start end', 'end start'],
  });
  const aboutY = useTransform(aboutProgress, [0, 1], [30, -30]);
  const aboutScale = useTransform(aboutProgress, [0, 0.5, 1], [0.97, 1, 0.97]);

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  SECTION 1: HERO                                                */}
      {/* ================================================================ */}
      <section className="relative min-h-[90vh] flex items-center bg-[#FAF7F2] overflow-hidden">
        {/* Decorative gradient mesh */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full bg-[#C4878A]/5 blur-[100px]" />
          <div className="absolute bottom-20 left-[10%] w-[400px] h-[400px] rounded-full bg-[#7A3B5E]/5 blur-[100px]" />
        </div>

        <div className="container-main relative z-10">
          <div className={`grid lg:grid-cols-2 gap-8 items-center min-h-[80vh]`}>
            {/* Text */}
            <motion.div
              className={`flex flex-col gap-6 py-20 lg:py-0 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.span
                variants={fadeUp}
                custom={0}
                className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D]"
              >
                {messages.hero.badge}
              </motion.span>

              <motion.h1
                variants={fadeUp}
                custom={1}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <span className="block text-[#2D2A33]">{messages.hero.title}</span>
                <span className="block text-[#7A3B5E] italic mt-1">{messages.hero.titleLine2}</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                custom={2}
                className="text-lg text-[#4A4A5C] max-w-md leading-relaxed"
              >
                {messages.hero.subtitle}
              </motion.p>

              <motion.div
                variants={fadeUp}
                custom={3}
                className="flex flex-wrap gap-3 pt-2"
              >
                <Button
                  as="a"
                  href={`/${locale}/book-a-session`}
                  size="lg"
                  icon={<Calendar className="w-5 h-5" />}
                >
                  {messages.hero.cta1}
                </Button>
                <Button
                  as="a"
                  href={`/${locale}/quiz`}
                  variant="outline"
                  size="lg"
                  icon={<Sparkles className="w-5 h-5" />}
                >
                  {messages.hero.cta2}
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
            >
              <div className="relative h-[520px] lg:h-[640px]">
                {/* Blob mask */}
                <div className="absolute inset-0 blob bg-[#C4878A]/10" />
                <div className="absolute -inset-2 lg:inset-0 blob overflow-hidden">
                  <Image
                    src="/images/hala-confident.png"
                    alt="Dr. Hala Ali - Mama Hala"
                    fill
                    priority
                    className="object-cover object-[70%_15%] scale-110"
                  />
                </div>
                {/* Decorative floating elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-[#C8A97D]/20 blur-sm"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-[#7A3B5E]/15 blur-sm"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>

          {/* Trust Bar */}
          <motion.div
            className="mt-10 py-8 border-t border-[#F3EFE8]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6, ease }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
              {[
                {
                  icon: Heart,
                  value: '500+',
                  label: isRTL ? 'عائلة تم دعمها' : 'Families Supported',
                  desc: isRTL ? 'عبر دبي وكندا' : 'Across Dubai & Canada',
                  color: '#C4878A',
                },
                {
                  icon: GraduationCap,
                  value: isRTL ? 'ييل' : 'Yale',
                  label: isRTL ? 'دكتوراه مهنية' : 'Professional Doctorate',
                  desc: isRTL ? 'صحة الطفل والأسرة' : 'Child & Family Health',
                  color: '#7A3B5E',
                },
                {
                  icon: Users,
                  value: '23+',
                  label: isRTL ? 'خدمة متخصصة' : 'Specialized Services',
                  desc: isRTL ? 'للأفراد والأسر والأزواج' : 'Individuals, families & couples',
                  color: '#C8A97D',
                },
                {
                  icon: MessageCircle,
                  value: isRTL ? 'ثنائي' : 'Bilingual',
                  label: isRTL ? 'عربي / English' : 'English / عربي',
                  desc: isRTL ? 'دعم بلغتين' : 'Culturally sensitive support',
                  color: '#C4878A',
                },
                {
                  icon: Calendar,
                  value: isRTL ? 'عبر الإنترنت' : 'Online',
                  label: isRTL ? 'وحضوري' : '& In-Person',
                  desc: isRTL ? 'جلسات مرنة عالمياً' : 'Flexible sessions worldwide',
                  color: '#7A3B5E',
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={i}
                    className="group flex items-start gap-3 lg:flex-col lg:items-center lg:text-center"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                  >
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundColor: `${stat.color}12` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: stat.color }} />
                    </div>
                    <div>
                      <div
                        className="text-xl lg:text-2xl font-bold text-[#2D2A33]"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-[#4A4A5C]">{stat.label}</div>
                      <div className="text-xs text-[#8E8E9F] mt-0.5 hidden lg:block">{stat.desc}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 2: SERVICE SHOWCASE                                    */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-main">
          <ScrollReveal className={`mb-16 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {messages.services.sectionTitle}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.services.subtitle}
            </h2>
          </ScrollReveal>

          {(() => {
            const cards = [
              {
                key: 'youth',
                icon: Sparkles,
                gradient: 'from-[#F0D5CA] via-[#F5E1D8] to-[#FAF0EC]',
                accentColor: '#C4878A',
                decorCircle: 'bg-[#C4878A]/10',
                patternOpacity: '0.04',
              },
              {
                key: 'families',
                icon: Users,
                gradient: 'from-[#E8D5E0] via-[#F0DFE8] to-[#F8EEF3]',
                accentColor: '#7A3B5E',
                decorCircle: 'bg-[#7A3B5E]/10',
                patternOpacity: '0.03',
              },
              {
                key: 'adults',
                icon: User,
                gradient: 'from-[#E8E0D0] via-[#F0E8DC] to-[#FAF5ED]',
                accentColor: '#C8A97D',
                decorCircle: 'bg-[#C8A97D]/10',
                patternOpacity: '0.04',
              },
              {
                key: 'couples',
                icon: Heart,
                gradient: 'from-[#E8C4C0] via-[#F2D5D0] to-[#FAF0EC]',
                accentColor: '#C4878A',
                decorCircle: 'bg-[#C4878A]/10',
                patternOpacity: '0.03',
              },
            ];
            return (
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                {cards.map((card) => {
                  const cat = serviceCategories.find((c) => c.key === card.key);
                  if (!cat) return null;
                  const name = isRTL ? cat.nameAr : cat.name;
                  const subtitle = isRTL ? cat.subtitleAr : cat.subtitle;
                  const Icon = card.icon;

                  return (
                    <StaggerChild key={card.key}>
                      <Link href={`/${locale}/services/${card.key}`}>
                        <motion.div
                          className={`group relative rounded-3xl overflow-hidden bg-gradient-to-br ${card.gradient} p-8 md:p-10 min-h-[260px] flex flex-col justify-between cursor-pointer`}
                          whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(0,0,0,0.08)' }}
                          transition={{ duration: 0.3 }}
                        >
                          {/* Decorative elements */}
                          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/20 blur-3xl -translate-y-1/2 translate-x-1/4" />
                          <div className={`absolute bottom-0 left-0 w-32 h-32 rounded-full ${card.decorCircle} blur-2xl translate-y-1/3 -translate-x-1/4`} />
                          <div
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 0.5px, transparent 0)',
                              backgroundSize: '30px 30px',
                              opacity: card.patternOpacity,
                              color: card.accentColor,
                            }}
                          />

                          {/* Large background icon */}
                          <div className="absolute top-6 right-6 opacity-[0.06] group-hover:opacity-[0.1] transition-opacity duration-500">
                            <Icon className="w-32 h-32" style={{ color: card.accentColor }} />
                          </div>

                          {/* Content */}
                          <div className="relative z-10">
                            <div
                              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 shadow-sm"
                              style={{ backgroundColor: `${card.accentColor}15` }}
                            >
                              <Icon className="w-7 h-7" style={{ color: card.accentColor }} />
                            </div>
                            <h3
                              className="text-xl md:text-2xl font-bold text-[#2D2A33] mb-2 group-hover:text-[#7A3B5E] transition-colors"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {name}
                            </h3>
                            <p className="text-sm text-[#4A4A5C] leading-relaxed max-w-xs">{subtitle}</p>
                          </div>

                          {/* Bottom arrow */}
                          <div className="relative z-10 flex items-center gap-2 mt-6 text-[#7A3B5E] text-sm font-semibold group-hover:gap-3 transition-all duration-300">
                            {messages.services.learnMore}
                            <ArrowIcon className="w-4 h-4" />
                          </div>
                        </motion.div>
                      </Link>
                    </StaggerChild>
                  );
                })}
              </StaggerReveal>
            );
          })()}


          {/* Help Me Choose CTA */}
          <ScrollReveal className="mt-12 text-center" delay={0.2}>
            <Link
              href={`/${locale}/quiz`}
              className="inline-flex items-center justify-center w-full max-w-2xl px-8 py-4 rounded-full border-2 border-[#2D2A33] text-[#2D2A33] font-semibold hover:bg-[#2D2A33] hover:text-white transition-all duration-300 text-[15px] gap-2"
            >
              <Sparkles className="w-5 h-5" />
              {isRTL ? 'ساعدني في اختيار الدعم المناسب' : 'Help Me Choose The Right Support'}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3: HOOK CAROUSEL                                        */}
      {/* ================================================================ */}
      <HookCarousel locale={locale} isRTL={isRTL} />

      {/* ================================================================ */}
      {/*  SECTION 4: PROCESS STEPS                                       */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 gradient-warm">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {messages.method.sectionTitle}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-[#2D2A33] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.method.subtitle}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {messages.method.steps.map(
              (step: { title: string; description: string }, index: number) => (
                <StaggerChild key={index}>
                  <div className="bg-white rounded-2xl p-8 text-center shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-card)] transition-shadow duration-300 h-full">
                    <span
                      className="block text-4xl font-bold mb-4 text-[#C8A97D]"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <h3
                      className="text-xl font-bold text-[#2D2A33] mb-3"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#8E8E9F] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </StaggerChild>
              )
            )}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 5: ABOUT PREVIEW                                       */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal
              direction={isRTL ? 'right' : 'left'}
              className={isRTL ? 'lg:order-2' : 'lg:order-1'}
            >
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8E8E9F] block mb-3">
                {messages.about.sectionLabel}
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33] leading-tight mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.about.sectionTitle}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4 items-start">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7A3B5E] mt-2 flex-shrink-0" />
                  <p className="text-[#4A4A5C] leading-relaxed">{messages.about.description}</p>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#7A3B5E] mt-2 flex-shrink-0" />
                  <p className="text-[#4A4A5C] leading-relaxed">{messages.about.story}</p>
                </div>
              </div>

              <Button as="a" href={`/${locale}/about`} variant="secondary" icon={<ArrowIcon className="w-4 h-4" />} iconPosition="right">
                {isRTL ? 'تعرف علينا أكثر' : 'Learn More About Us'}
              </Button>
            </ScrollReveal>

            <div
              ref={aboutRef}
              className={isRTL ? 'lg:order-1' : 'lg:order-2'}
            >
              <motion.div
                style={{ y: aboutY, scale: aboutScale }}
                className="relative rounded-2xl overflow-hidden shadow-[var(--shadow-card)]"
              >
                <Image
                  src="/images/hala-group.png"
                  alt="Dr. Hala leading a group consultation"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 6: TESTIMONIALS                                         */}
      {/* ================================================================ */}
      <TestimonialsSection locale={locale} isRTL={isRTL} messages={messages} />

      {/* ================================================================ */}
      {/*  SECTION 7: BLOG PREVIEW                                         */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-main">
          <ScrollReveal className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
                {messages.resources.blog}
              </span>
              <h2
                className="text-3xl sm:text-4xl text-[#2D2A33]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'أحدث المقالات' : 'Latest Insights'}
              </h2>
            </div>
            <Link
              href={`/${locale}/resources/blog`}
              className="hidden md:flex items-center gap-1.5 text-[#7A3B5E] font-semibold text-sm hover:gap-2.5 transition-all"
            >
              {messages.common.viewAll}
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </ScrollReveal>

          <StaggerReveal className="grid md:grid-cols-3 gap-6">
            {[
              { title: '5 Signs Your Child Needs Emotional Support', titleAr: '5 علامات أن طفلك يحتاج إلى دعم عاطفي', cat: 'Youth', time: '5 min' },
              { title: 'Communication Techniques That Transform Relationships', titleAr: 'تقنيات التواصل التي تحول العلاقات', cat: 'Couples', time: '7 min' },
              { title: 'Managing Parental Burnout: A Practical Guide', titleAr: 'إدارة إرهاق الوالدين: دليل عملي', cat: 'Families', time: '6 min' },
            ].map((post, i) => (
              <StaggerChild key={i}>
                <Link href={`/${locale}/resources/blog`}>
                  <div className="group bg-[#FAF7F2] rounded-2xl overflow-hidden hover:shadow-[var(--shadow-card)] transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-[#C4878A]/10 to-[#7A3B5E]/10 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-[#7A3B5E]/30" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#C4878A]/10 text-[#7A3B5E]">
                          {post.cat}
                        </span>
                        <span className="text-xs text-[#8E8E9F]">{post.time} {isRTL ? 'دقيقة' : 'read'}</span>
                      </div>
                      <h3 className="font-bold text-[#2D2A33] group-hover:text-[#7A3B5E] transition-colors leading-snug" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL ? post.titleAr : post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </StaggerChild>
            ))}
          </StaggerReveal>

          <div className="mt-8 text-center md:hidden">
            <Link href={`/${locale}/resources/blog`} className="text-[#7A3B5E] font-semibold text-sm">
              {messages.common.viewAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 8: NEWSLETTER                                           */}
      {/* ================================================================ */}
      <section className="relative py-20 bg-[#F3EFE8]">
        <WaveDivider position="top" fillColor="#FFFFFF" variant="gentle" />
        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="soft" flip />
        <div className="container-main">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#2D2A33] mb-3"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.newsletter.title}
            </h2>
            <p className="text-[#4A4A5C] mb-2">{messages.newsletter.subtitle}</p>
            <p className="text-sm text-[#C8A97D] font-medium mb-8">{messages.newsletter.leadMagnet}</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={messages.newsletter.placeholder}
                className="flex-1 rounded-full border border-[#C4878A]/20 px-5 py-3 text-sm bg-white outline-none focus:border-[#7A3B5E] focus:ring-2 focus:ring-[#7A3B5E]/10 transition-all"
              />
              <Button type="submit">{messages.newsletter.subscribe}</Button>
            </form>
            <p className="text-xs text-[#8E8E9F] mt-4">{messages.newsletter.privacy}</p>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 9: FINAL CTA                                            */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 gradient-cta-dark relative overflow-hidden">
        <WaveDivider position="top" fillColor="#FAF7F2" variant="organic" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7A3B5E]/[0.06] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7A3B5E]/[0.04] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
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

/* ================================================================ */
/*  TESTIMONIALS CAROUSEL                                            */
/* ================================================================ */
function TestimonialsSection({
  locale,
  isRTL,
  messages,
}: {
  locale: string;
  isRTL: boolean;
  messages: ReturnType<typeof getMessages>;
}) {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const t = testimonials[current];

  return (
    <section className="py-28 lg:py-40 bg-[#FAF7F2] relative overflow-hidden">
      {/* Decorative quotes */}
      <div className="absolute top-16 right-16 pointer-events-none opacity-[0.05]">
        <Quote size={200} />
      </div>

      <div className="container-main">
        <ScrollReveal className="text-center mb-16">
          <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
            {isRTL ? 'شهادات' : 'Testimonials'}
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {messages.testimonials.sectionTitle}
          </h2>
          <p className="mt-4 text-lg text-[#8E8E9F] max-w-2xl mx-auto">
            {messages.testimonials.subtitle}
          </p>
        </ScrollReveal>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 30 : -30 }}
                transition={{ duration: 0.4, ease }}
                className="glass-card rounded-3xl p-10 lg:p-14 text-center w-full"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#C8A97D] text-[#C8A97D]" />
                  ))}
                </div>

                <p className="text-lg lg:text-xl text-[#2D2A33] leading-relaxed italic mb-8 max-w-2xl mx-auto">
                  &ldquo;{isRTL ? t.textAr : t.text}&rdquo;
                </p>

                <div>
                  <p className="font-bold text-[#7A3B5E] text-lg">{t.name}</p>
                  <p className="text-sm text-[#8E8E9F] mt-0.5">{isRTL ? t.roleAr : t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-5 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full bg-white shadow-[var(--shadow-subtle)] flex items-center justify-center hover:bg-[#7A3B5E] hover:text-white text-[#7A3B5E] transition-all duration-200"
            >
              {isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === current ? 'bg-[#7A3B5E] w-8 h-2.5' : 'bg-[#C8A97D]/25 hover:bg-[#C8A97D]/50 w-2.5 h-2.5'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full bg-white shadow-[var(--shadow-subtle)] flex items-center justify-center hover:bg-[#7A3B5E] hover:text-white text-[#7A3B5E] transition-all duration-200"
            >
              {isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
