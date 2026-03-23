'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Check,
  Target,
  Eye,
  Globe,
  Heart,
  Brain,
  HandHeart,
  Sparkles,
  Calendar,
  MessageCircle,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';

const reasonIcons = [Globe, Brain, MessageCircle, HandHeart];

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  SECTION 1: HERO                                                */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B5F4E] via-[#2B5F4E] to-[#1E4A3B]" />
        {/* Decorative orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-[15%] w-[400px] h-[400px] rounded-full bg-white/[0.04] blur-[80px]" />
          <div className="absolute bottom-0 left-[10%] w-[350px] h-[350px] rounded-full bg-[#C8A97D]/[0.08] blur-[80px]" />
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

        <div className="container-main relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Breadcrumb
              items={[
                { label: messages.nav.home, href: `/${locale}` },
                { label: messages.nav.about },
              ]}
              locale={locale}
              light
            />
          </motion.div>

          <motion.div
            className="mt-10 max-w-3xl"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              custom={0}
              className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-4"
            >
              {messages.about.sectionLabel}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.about.pageTitle}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg lg:text-xl text-white/75 max-w-2xl leading-relaxed"
            >
              {messages.about.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block"
            preserveAspectRatio="none"
          >
            <path
              d="M0 60V30C360 0 720 0 1080 30C1260 45 1380 55 1440 60V60H0Z"
              fill="#FAF7F2"
            />
          </svg>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 2: PERSONAL STORY                                      */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <ScrollReveal
              direction={isRTL ? 'right' : 'left'}
              className={isRTL ? 'lg:order-2' : 'lg:order-1'}
            >
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border-2 border-[#C8A97D]/20" />
                <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                  <Image
                    src="/images/hala-confident.png"
                    alt="Dr. Hala Ali - Mama Hala"
                    width={600}
                    height={700}
                    className="w-full h-auto object-cover"
                  />
                </div>
                {/* Floating accent */}
                <motion.div
                  className="absolute -bottom-6 -right-6 bg-[#2B5F4E] text-white rounded-2xl p-5 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={viewportOnce}
                  transition={{ delay: 0.4, duration: 0.5, ease }}
                >
                  <Heart className="w-6 h-6 mb-1" />
                  <p className="text-sm font-semibold">500+</p>
                  <p className="text-xs text-white/70">
                    {isRTL ? 'عائلة' : 'Families'}
                  </p>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Text content */}
            <ScrollReveal
              direction={isRTL ? 'left' : 'right'}
              className={isRTL ? 'lg:order-1' : 'lg:order-2'}
            >
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8E8E9F] block mb-3">
                {isRTL ? 'قصتنا' : 'Our Story'}
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E2A] leading-tight mb-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.about.sectionTitle}
              </h2>
              <div className="space-y-5">
                <p className="text-[#4A4A5C] leading-relaxed text-lg">
                  {messages.about.story}
                </p>
                <p className="text-[#4A4A5C] leading-relaxed">
                  {messages.about.approachText}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  as="a"
                  href={`/${locale}/book-a-session`}
                  icon={<Calendar className="w-5 h-5" />}
                >
                  {messages.cta.bookNow}
                </Button>
                <Button
                  as="a"
                  href={`/${locale}/contact`}
                  variant="outline"
                  icon={<MessageCircle className="w-5 h-5" />}
                >
                  {messages.cta.whatsapp}
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3: MISSION & VISION                                    */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'ما نؤمن به' : 'What We Stand For'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E2A] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.about.mission} & {messages.about.vision}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <ScrollReveal direction={isRTL ? 'right' : 'left'} delay={0.1}>
              <div className="relative h-full bg-gradient-to-br from-[#2B5F4E] to-[#1E4A3B] rounded-3xl p-10 lg:p-12 text-white overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/[0.06]" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <Target className="w-7 h-7 text-[#C8A97D]" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {messages.about.mission}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-[15px]">
                    {messages.about.missionText}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Vision Card */}
            <ScrollReveal direction={isRTL ? 'left' : 'right'} delay={0.2}>
              <div className="relative h-full bg-gradient-to-br from-[#7A3B5E] to-[#5E2D48] rounded-3xl p-10 lg:p-12 text-white overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/[0.06]" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7 text-[#C8A97D]" />
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {messages.about.vision}
                  </h3>
                  <p className="text-white/80 leading-relaxed text-[15px]">
                    {messages.about.visionText}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 3.5: FULL-WIDTH PHOTO REVEAL                           */}
      {/* ================================================================ */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 items-stretch min-h-[500px]">
            {/* Text Column */}
            <ScrollReveal
              direction={isRTL ? 'right' : 'left'}
              className={`flex flex-col justify-center py-16 lg:py-24 lg:col-span-2 ${isRTL ? 'lg:order-2 lg:pl-12' : 'lg:order-1 lg:pr-12'}`}
            >
              <div className="w-12 h-1 bg-[#C8A97D] rounded-full mb-6" />
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#1E1E2A] leading-tight mb-6"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {isRTL ? 'دعم مهني بدفء إنساني' : 'Professional Care with a Personal Touch'}
              </h2>
              <p className="text-[#4A4A5C] leading-relaxed mb-6">
                {isRTL
                  ? 'تقدم د. هالة علي نهجًا فريدًا يجمع بين الخبرة المهنية والدفء الإنساني. مع خلفية ثقافية غنية وسنوات من الخبرة، تفهم التحديات التي تواجه العائلات والأفراد في عالمنا المعاصر.'
                  : 'Dr. Hala Ali brings a unique approach that combines professional expertise with genuine warmth. With a rich cultural background and years of experience, she understands the challenges families and individuals face in our modern world.'
                }
              </p>
              <div className="space-y-3">
                {[
                  { en: 'Evidence-based therapeutic methods', ar: 'أساليب علاجية مبنية على الأدلة' },
                  { en: 'Culturally sensitive approach', ar: 'نهج حساس ثقافيًا' },
                  { en: 'Bilingual support (English & Arabic)', ar: 'دعم ثنائي اللغة (عربي وإنجليزي)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#2B5F4E]/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#2B5F4E]" />
                    </div>
                    <span className="text-sm text-[#1E1E2A] font-medium">{isRTL ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Image Column */}
            <motion.div
              className={`relative lg:col-span-3 min-h-[400px] lg:min-h-full ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease }}
            >
              <Image
                src="/images/hala-hero.png"
                alt="Dr. Hala Ali - Professional Counselor"
                fill
                className="object-cover object-top"
              />
              {/* Soft gradient fade into text column */}
              <div className={`absolute inset-y-0 ${isRTL ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'} from-white via-white/60 to-transparent w-24 hidden lg:block`} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 4: CREDENTIALS                                         */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Credentials list */}
            <ScrollReveal
              direction={isRTL ? 'right' : 'left'}
              className={isRTL ? 'lg:order-2' : 'lg:order-1'}
            >
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-[#8E8E9F] block mb-3">
                {isRTL ? 'المؤهلات' : 'Qualifications'}
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#1E1E2A] leading-tight mb-10"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {messages.about.credentials}
              </h2>

              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                  },
                }}
              >
                {messages.about.credentialsList.map(
                  (credential: string, index: number) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#F3EFE8]"
                      variants={{
                        hidden: { opacity: 0, x: isRTL ? 20 : -20 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: { duration: 0.5, ease },
                        },
                      }}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#2B5F4E]/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4.5 h-4.5 text-[#2B5F4E]" />
                      </div>
                      <span className="text-[#1E1E2A] font-medium text-[15px]">
                        {credential}
                      </span>
                    </motion.div>
                  )
                )}
              </motion.div>
            </ScrollReveal>

            {/* Image */}
            <ScrollReveal
              direction={isRTL ? 'left' : 'right'}
              className={isRTL ? 'lg:order-1' : 'lg:order-2'}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
                <Image
                  src="/images/hala-group.png"
                  alt="Mama Hala Consulting Group"
                  width={600}
                  height={450}
                  className="w-full h-auto object-cover"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2A]/20 to-transparent" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 5: WHY CHOOSE US                                       */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'لماذا نحن' : 'Why Us'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E2A] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.about.whyChoose}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {messages.about.reasons.map(
              (reason: { title: string; desc: string }, index: number) => {
                const IconComponent = reasonIcons[index] || Sparkles;
                return (
                  <StaggerChild key={index}>
                    <motion.div
                      className="group relative bg-[#FAF7F2] rounded-2xl p-8 h-full border border-transparent hover:border-[#2B5F4E]/10 transition-all duration-300"
                      whileHover={{
                        y: -4,
                        boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                      }}
                    >
                      {/* Icon */}
                      <div className="w-14 h-14 rounded-2xl bg-[#2B5F4E]/10 flex items-center justify-center mb-6 group-hover:bg-[#2B5F4E] transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-[#2B5F4E] group-hover:text-white transition-colors duration-300" />
                      </div>
                      {/* Number accent */}
                      <span className="absolute top-6 right-6 text-5xl font-bold text-[#2B5F4E]/[0.04]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3
                        className="text-lg font-bold text-[#1E1E2A] mb-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                      >
                        {reason.title}
                      </h3>
                      <p className="text-sm text-[#8E8E9F] leading-relaxed">
                        {reason.desc}
                      </p>
                    </motion.div>
                  </StaggerChild>
                );
              }
            )}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 6: CTA                                                 */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-36 relative overflow-hidden">
        {/* Deep sage gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2B5F4E] via-[#234F40] to-[#1A3D30]" />
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#C8A97D]/[0.08] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <Sparkles className="w-4 h-4 text-[#C8A97D]" />
              <span className="text-sm text-white/80 font-medium">
                {isRTL ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today'}
              </span>
            </motion.div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {messages.cta.ready}
            </h2>
            <p className="mt-6 text-lg lg:text-xl text-white/80 leading-relaxed max-w-xl mx-auto">
              {messages.cta.readyDesc}
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button
                as="a"
                href={`/${locale}/book-a-session`}
                variant="secondary"
                size="lg"
                icon={<Calendar className="w-5 h-5" />}
                className="!bg-white !text-[#2B5F4E] hover:!bg-[#F3EFE8]"
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
                className="!border-white/30 !text-white hover:!bg-white/10"
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
