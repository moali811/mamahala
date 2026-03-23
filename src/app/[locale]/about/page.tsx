'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
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
  Quote,
  GraduationCap,
  BookOpen,
  Shield,
  Mic,
  Send,
  User,
  Mail,
  Phone,
  FileText,
  Video,
  Clock,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import { fadeUp, staggerContainer, ease, viewportOnce } from '@/lib/animations';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const reasonIcons = [Globe, Brain, MessageCircle, HandHeart];

const mediaTypes = [
  { value: '', label: 'Choose one', labelAr: 'اختر واحدًا' },
  { value: 'podcast', label: 'Podcast', labelAr: 'بودكاست' },
  { value: 'tv', label: 'TV / Broadcast', labelAr: 'تلفزيون / بث' },
  { value: 'radio', label: 'Radio', labelAr: 'راديو' },
  { value: 'print', label: 'Print / Magazine', labelAr: 'مطبوعات / مجلة' },
  { value: 'online', label: 'Online / Blog', labelAr: 'إلكتروني / مدونة' },
  { value: 'social', label: 'Social Media', labelAr: 'وسائل التواصل' },
  { value: 'panel', label: 'Panel / Conference', labelAr: 'ندوة / مؤتمر' },
  { value: 'other', label: 'Other', labelAr: 'أخرى' },
];

const recordingMethods = [
  { value: '', label: 'Choose one', labelAr: 'اختر واحدًا' },
  { value: 'zoom', label: 'Zoom', labelAr: 'زووم' },
  { value: 'teams', label: 'Microsoft Teams', labelAr: 'مايكروسوفت تيمز' },
  { value: 'phone', label: 'Phone Call', labelAr: 'مكالمة هاتفية' },
  { value: 'in-person', label: 'In-Person', labelAr: 'حضوري' },
  { value: 'studio', label: 'Studio Recording', labelAr: 'تسجيل استوديو' },
  { value: 'other', label: 'Other', labelAr: 'أخرى' },
];

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
              <div className="space-y-6">
                {/* Personal quote with accent border */}
                <div className={`relative ${isRTL ? 'pr-6 border-r-4' : 'pl-6 border-l-4'} border-[#C8A97D]`}>
                  <Quote className="absolute top-0 left-0 w-8 h-8 text-[#C8A97D]/20 -translate-x-2 -translate-y-2" />
                  <p className="text-[#1E1E2A] leading-relaxed text-lg italic" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL
                      ? 'بصفتي أمًا مخلصة لمراهقَين، وزوجة وفية، ومستشارة عطوفة، كرّست حياتي لتعزيز رفاهية الأسر، مستلهمة من التحوّل العميق داخل عائلتي.'
                      : 'As a dedicated mother of two teenagers, a devoted wife, and a compassionate counselor, I\'ve committed my life to enhancing the well-being of families, drawing from the profound transformation within my own family.'
                    }
                  </p>
                </div>
                <p className="text-[#4A4A5C] leading-relaxed">
                  {isRTL
                    ? 'كوني ابنة لوالدَين رائعَين وواحدة من 12 أخًا وأختًا، منحني نسيجًا غنيًا من التجارب، ورؤى عميقة في ديناميكيات الأسرة وتفاصيل العلاقات.'
                    : 'Being the daughter of incredible parents and one of 12 siblings, has provided me with a rich tapestry of experiences, offering deep insights into family dynamics and relationship nuances.'
                  }
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
      {/*  SECTION 4: FOUNDATION OF EXPERTISE                              */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="container-main">
          {/* Section Header */}
          <ScrollReveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'المؤهلات والخبرات' : 'Qualifications & Expertise'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1E1E2A] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? 'أساس الخبرة' : 'Foundation of Expertise'}
            </h2>
            <p className="text-[#4A4A5C] max-w-2xl mx-auto mt-4 leading-relaxed">
              {isRTL
                ? 'رحلة مهنية تتميز بالسعي الدؤوب نحو التميز التعليمي وتطوير المهارات'
                : 'A professional journey marked by a relentless pursuit of educational excellence and skill development'
              }
            </p>
          </ScrollReveal>

          {/* Credentials Grid */}
          <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Card 1: Yale Doctorate */}
            {[
              {
                icon: GraduationCap,
                color: 'bg-[#2B5F4E]',
                iconBg: 'bg-[#2B5F4E]/10',
                iconColor: 'text-[#2B5F4E]',
                titleEn: 'Professional Doctorate — Yale University',
                titleAr: 'دكتوراه مهنية — جامعة ييل',
                descEn: 'Professional Doctorate Degree in Social and Behavioral Health Sciences (Child and Family), equipped with cutting-edge insights and methodologies to support children and families effectively.',
                descAr: 'درجة الدكتوراه المهنية في العلوم الصحية الاجتماعية والسلوكية (الطفل والأسرة)، مزودة برؤى ومنهجيات متطورة لدعم الأطفال والأسر بفعالية.',
                badge: 'Yale University',
              },
              {
                icon: Brain,
                color: 'bg-[#7A3B5E]',
                iconBg: 'bg-[#7A3B5E]/10',
                iconColor: 'text-[#7A3B5E]',
                titleEn: 'Executive Function Coach (ADD/ADHD)',
                titleAr: 'مدربة وظائف تنفيذية (ADD/ADHD)',
                descEn: 'Certified Executive Function Coach, developing tailored strategies to help individuals achieve their full potential.',
                descAr: 'مدربة معتمدة في الوظائف التنفيذية، تطور استراتيجيات مخصصة لمساعدة الأفراد على تحقيق إمكاناتهم الكاملة.',
                badge: 'Certified',
              },
              {
                icon: Heart,
                color: 'bg-[#C8A97D]',
                iconBg: 'bg-[#C8A97D]/10',
                iconColor: 'text-[#C8A97D]',
                titleEn: 'Art & Science of Parenting and Relationships',
                titleAr: 'فن وعلم الأبوة والعلاقات',
                descEn: 'A specialized program that honed the ability to nurture healthy family dynamics and strengthen relationship bonds.',
                descAr: 'برنامج متخصص صقل القدرة على رعاية ديناميكيات أسرية صحية وتعزيز روابط العلاقات.',
                badge: 'Specialized',
              },
              {
                icon: BookOpen,
                color: 'bg-[#2B5F4E]',
                iconBg: 'bg-[#2B5F4E]/10',
                iconColor: 'text-[#2B5F4E]',
                titleEn: 'Counseling Psychology — University of Toronto',
                titleAr: 'علم النفس الإرشادي — جامعة تورنتو',
                descEn: 'Completed a Counseling Psychology program at the University of Toronto, deepening understanding of mental health and therapeutic approaches.',
                descAr: 'أكملت برنامج علم النفس الإرشادي في جامعة تورنتو، مما عمّق فهم الصحة النفسية والمناهج العلاجية.',
                badge: 'University of Toronto',
              },
              {
                icon: Shield,
                color: 'bg-[#7A3B5E]',
                iconBg: 'bg-[#7A3B5E]/10',
                iconColor: 'text-[#7A3B5E]',
                titleEn: 'Psychological First Aid',
                titleAr: 'الإسعافات النفسية الأولية',
                descEn: 'Certified in Psychological First Aid, providing immediate and effective support in crisis situations.',
                descAr: 'معتمدة في الإسعافات النفسية الأولية، تقدم دعمًا فوريًا وفعالًا في حالات الأزمات.',
                badge: 'Certified',
              },
              {
                icon: Sparkles,
                color: 'bg-[#C8A97D]',
                iconBg: 'bg-[#C8A97D]/10',
                iconColor: 'text-[#C8A97D]',
                titleEn: 'Cognitive Behavioral Therapy (CBT)',
                titleAr: 'العلاج السلوكي المعرفي (CBT)',
                descEn: 'Certified CBT specialist, employing evidence-based techniques to address a variety of mental health challenges and promote lasting change within individuals and families.',
                descAr: 'متخصصة معتمدة في العلاج السلوكي المعرفي، تستخدم تقنيات قائمة على الأدلة لمعالجة تحديات الصحة النفسية وتعزيز التغيير الدائم.',
                badge: 'Certified',
              },
            ].map((cred, i) => {
              const Icon = cred.icon;
              return (
                <motion.div
                  key={i}
                  className="group bg-white rounded-2xl p-7 border border-[#F3EFE8] hover:border-[#2B5F4E]/15 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ delay: i * 0.08, duration: 0.5, ease }}
                  whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.08)' }}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-xl ${cred.iconBg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-6 h-6 ${cred.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-2">
                        <h3 className="font-bold text-[#1E1E2A] text-[15px]" style={{ fontFamily: 'var(--font-heading)' }}>
                          {isRTL ? cred.titleAr : cred.titleEn}
                        </h3>
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${cred.iconBg} ${cred.iconColor}`}>
                          {cred.badge}
                        </span>
                      </div>
                      <p className="text-sm text-[#8E8E9F] leading-relaxed">
                        {isRTL ? cred.descAr : cred.descEn}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Closing statement */}
          <ScrollReveal className="text-center mt-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-8 py-5 border border-[#F3EFE8] shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <Heart className="w-5 h-5 text-[#7A3B5E] flex-shrink-0" />
              <p className="text-[#4A4A5C] text-sm leading-relaxed italic">
                {isRTL
                  ? 'هذا المزيج من الخبرة الشخصية والمهنية يشكل أساس ممارستي، حيث أسعى لتعزيز المرونة والتفاهم والنمو داخل الأسر.'
                  : 'This blend of personal experience and professional expertise forms the foundation of my practice, where I aim to foster resilience, understanding, and growth within families.'
                }
              </p>
            </div>
          </ScrollReveal>
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
      {/*  SECTION 6: INTERVIEW & MEDIA REQUEST                           */}
      {/* ================================================================ */}
      <InterviewSection locale={locale} isRTL={isRTL} />

      {/* ================================================================ */}
      {/*  SECTION 7: CTA                                                 */}
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

/* ================================================================ */
/*  INTERVIEW & MEDIA REQUEST COMPONENT                             */
/* ================================================================ */
function InterviewSection({ locale, isRTL }: { locale: string; isRTL: boolean }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    publication: '', interviewer: '', mediaType: '', audience: '', platforms: '', website: '',
    proposedDate: '', proposedTime: '', amPm: 'AM', topic: '', recordingMethod: '',
    deliverables: '', willMention: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 2000));
    setSending(false);
    setSent(true);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F2] relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7A3B5E]/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#2B5F4E]/[0.03] blur-[80px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Section Header with Image */}
        <ScrollReveal className="mb-16">
          <div className="relative bg-gradient-to-br from-[#1E1E2A] via-[#2B2B3D] to-[#1E1E2A] rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-5 items-stretch">
              {/* Text Side */}
              <div className={`flex flex-col justify-center p-10 lg:p-14 lg:col-span-3 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 w-fit mb-6">
                  <Mic className="w-4 h-4 text-[#C8A97D]" />
                  <span className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    {isRTL ? 'طلبات الإعلام' : 'Media Requests'}
                  </span>
                </div>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {isRTL ? 'تعرّف على ماما هالة' : 'Meet Mama Hala'}
                </h2>
                <p className="text-white/70 leading-relaxed max-w-lg text-[15px]">
                  {isRTL
                    ? 'دعونا نتواصل ونستكشف كيف يمكننا التعاون ومشاركة الأفكار أو بدء محادثة هادفة. يرجى تقديم طلبك للمقابلات أو المشاركات الإعلامية أو النقاشات المهنية.'
                    : "Let's connect and explore how we can collaborate, share insights, or start a meaningful conversation. Please submit your request for interviews, media features, or professional discussions."
                  }
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  {[
                    { en: 'Podcasts', ar: 'بودكاست', icon: Mic },
                    { en: 'TV & Radio', ar: 'تلفزيون وراديو', icon: Video },
                    { en: 'Print & Online', ar: 'مطبوعات وإلكتروني', icon: FileText },
                  ].map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs text-white/60 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                      <tag.icon className="w-3.5 h-3.5" />
                      {isRTL ? tag.ar : tag.en}
                    </span>
                  ))}
                </div>
              </div>

              {/* Image Side */}
              <div className={`relative lg:col-span-2 min-h-[300px] lg:min-h-full ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                <Image
                  src="/images/hala-office.jpg"
                  alt="Dr. Hala Ali - Interview & Media"
                  fill
                  className="object-cover object-center"
                />
                {/* Gradient overlay blending into dark background */}
                <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#1E1E2A] via-[#1E1E2A]/40 to-transparent hidden lg:block`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1E2A]/60 to-transparent lg:hidden" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Form */}
        <AnimatePresence mode="wait">
          {sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 mx-auto mb-6 bg-[#2B5F4E]/10 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-[#2B5F4E]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#1E1E2A] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'تم إرسال طلبك بنجاح!' : 'Request Submitted Successfully!'}
              </h3>
              <p className="text-[#8E8E9F]">
                {isRTL
                  ? 'شكرًا لاهتمامك. سنراجع طلبك ونتواصل معك في أقرب وقت ممكن.'
                  : 'Thank you for your interest. We\'ll review your request and get back to you as soon as possible.'
                }
              </p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="max-w-4xl mx-auto"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* STEP 1: Your Information */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-8 lg:p-10 mb-6">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-[#2B5F4E]/10 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#2B5F4E]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E1E2A]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL ? 'معلوماتك' : 'Your Information'}
                      </h3>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? 'معلومات الاتصال الخاصة بك' : 'Your contact details'}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label={isRTL ? 'الاسم الأول *' : 'First Name *'} name="firstName" value={formData.firstName} onChange={handleChange} required />
                    <Input label={isRTL ? 'اسم العائلة *' : 'Last Name *'} name="lastName" value={formData.lastName} onChange={handleChange} required />
                    <Input label={isRTL ? 'البريد الإلكتروني *' : 'Email *'} name="email" type="email" value={formData.email} onChange={handleChange} required />
                    <Input label={isRTL ? 'الهاتف *' : 'Phone *'} name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
              </ScrollReveal>

              {/* STEP 2: Program Information */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-8 lg:p-10 mb-6">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#7A3B5E]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E1E2A]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL ? 'معلومات البرنامج' : 'Program Information'}
                      </h3>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? 'عن المنشور أو البرنامج' : 'About your publication or program'}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label={isRTL ? 'اسم المنشور / البرنامج *' : 'Name of Publication / Program *'} name="publication" value={formData.publication} onChange={handleChange} required />
                    <Input label={isRTL ? 'اسم المحاور(ين) *' : 'Name of Interviewer(s) *'} name="interviewer" value={formData.interviewer} onChange={handleChange} required />
                    <div className="relative">
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                        {isRTL ? 'نوع الوسيلة الإعلامية *' : 'Type of Media *'}
                      </label>
                      <div className="relative">
                        <select
                          name="mediaType"
                          value={formData.mediaType}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none bg-[#FAF7F2] border border-[#F3EFE8] rounded-xl px-4 py-3 text-sm text-[#1E1E2A] focus:outline-none focus:border-[#2B5F4E] focus:ring-2 focus:ring-[#2B5F4E]/10 transition-all pr-10"
                        >
                          {mediaTypes.map(mt => (
                            <option key={mt.value} value={mt.value}>{isRTL ? mt.labelAr : mt.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F] pointer-events-none" />
                      </div>
                    </div>
                    <Input label={isRTL ? 'من هو جمهورك الأساسي؟' : 'Who is your primary audience?'} name="audience" value={formData.audience} onChange={handleChange} />
                    <Input label={isRTL ? 'على أي منصات تنشر المحتوى؟' : 'On which platforms do you publish?'} name="platforms" value={formData.platforms} onChange={handleChange} />
                    <Input label={isRTL ? 'الموقع الإلكتروني' : 'Website'} name="website" type="url" value={formData.website} onChange={handleChange} />
                  </div>
                </div>
              </ScrollReveal>

              {/* STEP 3: Request Details */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-8 lg:p-10 mb-6">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-[#C8A97D]/10 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#C8A97D]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E1E2A]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL ? 'تفاصيل الطلب' : 'Request Details'}
                      </h3>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? 'جدولة ومعلومات الموضوع' : 'Scheduling and topic information'}</p>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Input label={isRTL ? 'التاريخ المقترح' : 'Proposed Interview Date'} name="proposedDate" type="date" value={formData.proposedDate} onChange={handleChange} />
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                        {isRTL ? 'الوقت المقترح' : 'Proposed Time'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="time"
                          name="proposedTime"
                          value={formData.proposedTime}
                          onChange={handleChange}
                          className="flex-1 bg-[#FAF7F2] border border-[#F3EFE8] rounded-xl px-4 py-3 text-sm text-[#1E1E2A] focus:outline-none focus:border-[#2B5F4E] focus:ring-2 focus:ring-[#2B5F4E]/10 transition-all"
                        />
                        <select
                          name="amPm"
                          value={formData.amPm}
                          onChange={handleChange}
                          className="bg-[#FAF7F2] border border-[#F3EFE8] rounded-xl px-3 py-3 text-sm text-[#1E1E2A] focus:outline-none focus:border-[#2B5F4E] focus:ring-2 focus:ring-[#2B5F4E]/10 transition-all"
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </select>
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <Input label={isRTL ? 'موضوع المقابلة المقترح *' : 'Proposed Interview Topic *'} name="topic" value={formData.topic} onChange={handleChange} required />
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                        {isRTL ? 'طريقة التسجيل المفضلة *' : 'Preferred Method of Recording *'}
                      </label>
                      <div className="relative">
                        <select
                          name="recordingMethod"
                          value={formData.recordingMethod}
                          onChange={handleChange}
                          required
                          className="w-full appearance-none bg-[#FAF7F2] border border-[#F3EFE8] rounded-xl px-4 py-3 text-sm text-[#1E1E2A] focus:outline-none focus:border-[#2B5F4E] focus:ring-2 focus:ring-[#2B5F4E]/10 transition-all pr-10"
                        >
                          {recordingMethods.map(rm => (
                            <option key={rm.value} value={rm.value}>{isRTL ? rm.labelAr : rm.label}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F] pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* STEP 4: Promotion Details */}
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-subtle)] p-8 lg:p-10 mb-8">
                  <div className="flex items-center gap-3 mb-7">
                    <div className="w-10 h-10 rounded-xl bg-[#2B5F4E]/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-[#2B5F4E]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1E1E2A]" style={{ fontFamily: 'var(--font-heading)' }}>
                        {isRTL ? 'تفاصيل الترويج' : 'Promotion Details'}
                      </h3>
                      <p className="text-xs text-[#8E8E9F]">{isRTL ? 'المخرجات والترويج' : 'Deliverables and promotion'}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                        {isRTL ? 'ما هي المخرجات من هذه الفرصة؟ *' : 'What are the deliverables from this opportunity? *'}
                      </label>
                      <textarea
                        name="deliverables"
                        value={formData.deliverables}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full bg-[#FAF7F2] border border-[#F3EFE8] rounded-xl px-4 py-3 text-sm text-[#1E1E2A] focus:outline-none focus:border-[#2B5F4E] focus:ring-2 focus:ring-[#2B5F4E]/10 transition-all resize-none"
                        placeholder={isRTL ? 'صف المخرجات المتوقعة...' : 'Describe the expected deliverables...'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-3">
                        {isRTL
                          ? 'هل أنت مستعد لذكر د. هالة علي | مجموعة ماما هالة الاستشارية في ترويجك؟'
                          : 'Are you willing to mention Dr. Hala Ali | Mama Hala Consulting Group in your promotion?'
                        }
                      </label>
                      <div className="flex gap-3">
                        {['Yes', 'No'].map(opt => (
                          <label
                            key={opt}
                            className={`flex items-center gap-2 px-5 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                              formData.willMention === opt
                                ? 'bg-[#2B5F4E] text-white border-[#2B5F4E]'
                                : 'bg-[#FAF7F2] text-[#4A4A5C] border-[#F3EFE8] hover:border-[#2B5F4E]/30'
                            }`}
                          >
                            <input
                              type="radio"
                              name="willMention"
                              value={opt}
                              checked={formData.willMention === opt}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                              formData.willMention === opt ? 'border-white' : 'border-[#8E8E9F]'
                            }`}>
                              {formData.willMention === opt && <div className="w-2 h-2 rounded-full bg-white" />}
                            </div>
                            <span className="text-sm font-medium">
                              {isRTL ? (opt === 'Yes' ? 'نعم' : 'لا') : opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Submit Button */}
              <ScrollReveal className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  icon={sending ? undefined : <Send className="w-5 h-5" />}
                  className="min-w-[240px]"
                  disabled={sending}
                >
                  {sending
                    ? (isRTL ? 'جارٍ الإرسال...' : 'Sending...')
                    : (isRTL ? 'أرسل طلبك' : 'Send Your Request')
                  }
                </Button>
                <p className="text-xs text-[#8E8E9F] mt-4">
                  {isRTL
                    ? 'سنرد على طلبك خلال 2-3 أيام عمل.'
                    : 'We typically respond to requests within 2-3 business days.'
                  }
                </p>
              </ScrollReveal>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
