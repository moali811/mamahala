'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
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
import WaveDivider from '@/components/ui/WaveDivider';

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

  // Subtle parallax for portrait
  const portraitRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(portraitProgress, [0, 1], [25, -25]);
  const portraitScale = useTransform(portraitProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  return (
    <div className="overflow-hidden">
      {/* ================================================================ */}
      {/*  SECTION 1: HERO                                                */}
      {/* ================================================================ */}
      <section className="relative pt-32 pb-28 lg:pt-40 lg:pb-36 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#E8C4C0] via-[#F0D5CA] to-[#FAF0EC]" />
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
              {isRTL ? 'من نحن' : 'Who We Are'}
            </motion.span>
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? (
                <>الرعاية تبدأ <span className="text-[#7A3B5E] italic">بالفهم</span></>
              ) : (
                <>Care Begins with <span className="text-[#7A3B5E] italic">Understanding</span></>
              )}
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 text-lg lg:text-xl text-[#4A4A5C] max-w-2xl leading-relaxed"
            >
              {isRTL
                ? 'نحن مؤسسة استشارية تركز على الأسرة، مكرسة لتقوية الحياة والعلاقات من خلال الدعم القائم على الأدلة والرحمة.'
                : 'A family-focused consulting organization dedicated to strengthening lives and relationships through evidence-based, compassionate support.'
              }
            </motion.p>
          </motion.div>
        </div>

        <WaveDivider position="bottom" fillColor="#FAF7F2" variant="gentle" />
      </section>

      {/* ================================================================ */}
      {/*  SECTION 2: PERSONAL STORY — Immersive Split                    */}
      {/* ================================================================ */}
      <section className="relative bg-[#FAF7F2] overflow-hidden">
        <div className="container-main py-24 lg:py-0">
          <div className="grid lg:grid-cols-5 items-stretch min-h-[85vh]">

            {/* Image Column — sticky with parallax */}
            <div
              ref={portraitRef}
              className={`lg:col-span-2 relative ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}
            >
              <div className="lg:sticky lg:top-24 py-8 lg:py-24">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Soft glow behind image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C8A97D]/10 via-[#F0D5CA]/20 to-transparent rounded-3xl blur-2xl scale-110" />

                  <motion.div
                    className="relative rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(122,59,94,0.12)]"
                    style={{ y: portraitY, scale: portraitScale }}
                  >
                    <Image
                      src="/images/hala-hero.png"
                      alt="Dr. Hala Ali - Mama Hala"
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                    {/* Subtle gradient overlay at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#2D2A33]/30 to-transparent" />
                  </motion.div>

                  {/* Floating stats chips */}
                  <motion.div
                    className={`absolute -bottom-4 ${isRTL ? 'left-4' : 'right-4'} flex gap-2`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={viewportOnce}
                    transition={{ delay: 0.5, duration: 0.6, ease }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-[#F3EFE8]">
                      <p className="text-lg font-bold text-[#7A3B5E]">500+</p>
                      <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{isRTL ? 'عائلة' : 'Families'}</p>
                    </div>
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-[#F3EFE8]">
                      <p className="text-lg font-bold text-[#C8A97D]">10+</p>
                      <p className="text-[10px] text-[#8E8E9F] uppercase tracking-wider">{isRTL ? 'سنوات' : 'Years'}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-3 ${isRTL ? 'lg:order-1 lg:pl-0 lg:pr-16' : 'lg:order-2 lg:pr-0 lg:pl-16'} flex items-center`}>
              <ScrollReveal direction={isRTL ? 'left' : 'right'} className="py-8 lg:py-28">
                {/* Label + Title */}
                <div className="mb-10">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-[#C8A97D] mb-4">
                    <span className="w-8 h-[2px] bg-[#C8A97D] rounded-full" />
                    {isRTL ? 'قصتنا' : 'Our Story'}
                  </span>
                  <h2
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33] leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? (
                      <>رحلة <span className="text-[#7A3B5E] italic">ماما هالة</span></>
                    ) : (
                      <>The Journey of <span className="text-[#7A3B5E] italic">Mama Hala</span></>
                    )}
                  </h2>
                </div>

                {/* Quote — large and impactful */}
                <motion.div
                  className={`relative mb-8 ${isRTL ? 'pr-8 border-r-[3px]' : 'pl-8 border-l-[3px]'} border-gradient-to-b border-[#C8A97D]`}
                  initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease }}
                >
                  <p className="text-xl lg:text-2xl text-[#2D2A33] leading-relaxed font-medium italic" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL
                      ? 'بصفتي أمًا مخلصة لمراهقَين، وزوجة وفية، ومستشارة عطوفة، كرّست حياتي لتعزيز رفاهية الأسر، مستلهمة من التحوّل العميق داخل عائلتي.'
                      : 'As a dedicated mother of two teenagers, a devoted wife, and a compassionate counselor, I\'ve committed my life to enhancing the well-being of families, drawing from the profound transformation within my own family.'
                    }
                  </p>
                </motion.div>

                {/* Body text with highlight */}
                <div className="space-y-5 mb-10">
                  <p className="text-[#4A4A5C] leading-relaxed text-[17px]">
                    {isRTL
                      ? 'كوني ابنة لوالدَين رائعَين وواحدة من 12 أخًا وأختًا، منحني نسيجًا غنيًا من التجارب، ورؤى عميقة في ديناميكيات الأسرة وتفاصيل العلاقات.'
                      : 'Being the daughter of incredible parents and one of 12 siblings, has provided me with a rich tapestry of experiences, offering deep insights into family dynamics and relationship nuances.'
                    }
                  </p>
                  <p className="text-[#4A4A5C] leading-relaxed text-[17px]">
                    {messages.about.approachText}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
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
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-[#FAF7F2] to-white" />

      {/* ================================================================ */}
      {/*  SECTION 3: MISSION & VISION                                    */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'بوصلتنا' : 'Our Compass'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33] text-balance"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? (
                <>{messages.about.mission} <span className="text-[#7A3B5E] italic">{isRTL ? 'و' : '&'}</span> {messages.about.vision}</>
              ) : (
                <>{messages.about.mission} <span className="text-[#7A3B5E] italic">&</span> {messages.about.vision}</>
              )}
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                Icon: Target,
                titleEn: 'Our Mission',
                titleAr: 'مهمتنا',
                textEn: 'To Nurture Healthier Relationships Through Care, Trust and Understanding.',
                textAr: 'رعاية علاقات أكثر صحة من خلال الاهتمام والثقة والتفاهم.',
                detailEn: [
                  'We recognize the complex emotional challenges families face in today\'s world. Our work begins with compassion and respect\u2014supporting children, youth, couples, and families in building emotional wellbeing, meaningful connection, and long-term relational health.',
                  'We are committed to inclusive, culturally sensitive, and accessible support, honoring diverse lived experiences while promoting care that is sustainable for both families and those who support them.',
                ],
                detailAr: [
                  'نحن ندرك التحديات العاطفية المعقدة التي تواجهها الأسر في عالم اليوم. يبدأ عملنا بالتعاطف والاحترام — دعم الأطفال والشباب والأزواج والأسر في بناء الرفاهية العاطفية والتواصل الهادف والصحة العلائقية طويلة الأمد.',
                  'نحن ملتزمون بتقديم دعم شامل وحساس ثقافيًا ومتاح، نحترم التجارب المتنوعة بينما نعزز الرعاية المستدامة للأسر ولمن يدعمونهم.',
                ],
                gradientFrom: '#FAE8E0',
                gradientTo: '#FDF4F0',
                hoverFrom: '#C4878A',
                hoverTo: '#B07578',
                direction: isRTL ? 'right' : 'left',
                delay: 0.1,
              },
              {
                Icon: Eye,
                titleEn: 'Our Vision',
                titleAr: 'رؤيتنا',
                textEn: "A world where children, youth & families are emotionally healthy and equipped with the tools and knowledge to face life's challenges.",
                textAr: 'عالم يكون فيه الأطفال والشباب والأسر أصحاء عاطفيًا ومجهزين بالأدوات والمعرفة لمواجهة تحديات الحياة.',
                detailEn: [
                  'We envision a future where seeking support is seen as a strength\u2014where individuals and families feel understood, empowered, and supported in building relationships rooted in trust, emotional wellbeing, and mutual respect.',
                  'A world where care, connection, and guidance are accessible, human, and meaningful.',
                ],
                detailAr: [
                  'نتصور مستقبلًا يُنظر فيه إلى طلب الدعم على أنه قوة — حيث يشعر الأفراد والأسر بالفهم والتمكين والدعم في بناء علاقات متجذرة في الثقة والرفاهية العاطفية والاحترام المتبادل.',
                  'عالم تكون فيه الرعاية والتواصل والتوجيه متاحة وإنسانية وذات معنى.',
                ],
                gradientFrom: '#FDE8E0',
                gradientTo: '#FEF2EE',
                hoverFrom: '#7A3B5E',
                hoverTo: '#5E2D48',
                direction: isRTL ? 'left' : 'right',
                delay: 0.2,
              },
            ].map((card, i) => {
              const CardIcon = card.Icon;
              return (
                <ScrollReveal key={i} direction={card.direction as 'left' | 'right'} delay={card.delay}>
                  <div
                    className="group relative h-full rounded-3xl overflow-hidden cursor-default"
                    style={{ perspective: '1200px' }}
                  >
                    {/* === FRONT FACE (peach — default) === */}
                    <div
                      className="relative p-10 lg:p-12 rounded-3xl border border-transparent group-hover:border-[#C8A97D]/20 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95 group-hover:pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${card.gradientFrom}, ${card.gradientTo})` }}
                    >
                      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#C8A97D]/[0.06]" />
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#C8A97D]/[0.04]" />
                      <div className="relative z-10 flex flex-col items-center text-center min-h-[260px] justify-center">
                        <div className="w-14 h-14 rounded-2xl bg-[#C8A97D]/15 flex items-center justify-center mb-6">
                          <CardIcon className="w-7 h-7 text-[#C8A97D]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#2D2A33] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                          {isRTL ? card.titleAr : card.titleEn}
                        </h3>
                        <p className="text-[#4A4A5C] leading-relaxed text-[15px] max-w-sm">
                          {isRTL ? card.textAr : card.textEn}
                        </p>
                        {/* Hover hint */}
                        <div className="mt-6 flex items-center gap-1.5 text-[11px] font-medium text-[#C8A97D]/60 uppercase tracking-wider">
                          <span>{isRTL ? 'مرر للمزيد' : 'Hover to read more'}</span>
                          <ChevronDown className="w-3 h-3 animate-bounce" />
                        </div>
                      </div>
                    </div>

                    {/* === BACK FACE (warm peach — on hover) === */}
                    <div
                      className="absolute inset-0 p-10 lg:p-12 rounded-3xl opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto bg-gradient-to-br from-[#F0D5CA] to-[#E8C4C0]"
                    >
                      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#7A3B5E]/[0.05]" />
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-[#7A3B5E]/[0.03]" />
                      <div className="relative z-10 flex flex-col h-full">
                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/10 flex items-center justify-center">
                            <CardIcon className="w-5 h-5 text-[#7A3B5E]" />
                          </div>
                          <h3 className="text-xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                            {isRTL ? card.titleAr : card.titleEn}
                          </h3>
                        </div>
                        <div className="w-10 h-0.5 bg-[#7A3B5E]/30 rounded-full mb-5" />
                        <div className="space-y-4 flex-1">
                          {(isRTL ? card.detailAr : card.detailEn).map((para, pi) => (
                            <p key={pi} className="text-[#4A4A5C] leading-relaxed text-[14px]">
                              {para}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-white to-[#F3EFE8]" />

      {/* ================================================================ */}
      {/*  SECTION 3.5: WHAT WE STAND FOR — CORE VALUES                   */}
      {/* ================================================================ */}
      <section className="relative py-28 lg:py-36 overflow-hidden">
        {/* Warm light background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3EFE8] via-[#F0D5CA] to-[#E8C4C0]" />
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7A3B5E]/[0.06] rounded-full blur-[120px] pointer-events-none" />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center mb-16 lg:mb-20">
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-[#7A3B5E]/70 block mb-4">
              {isRTL ? 'قيمنا الأساسية' : 'Our Core Values'}
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1]" style={{ fontFamily: 'var(--font-heading)' }}>
              <span className="text-[#2D2A33]">{isRTL ? 'ما ' : 'What We '}</span>
              <span className="text-[#7A3B5E] italic">{isRTL ? 'نؤمن به' : 'Stand For'}</span>
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              {
                titleEn: 'Compassion',
                titleAr: 'التعاطف',
                textEn: 'We lead with empathy, respect, and openness, honoring every experience without judgment.',
                textAr: 'نقود بالتعاطف والاحترام والانفتاح، نحترم كل تجربة دون إصدار أحكام.',
                icon: '♡',
                num: '01',
              },
              {
                titleEn: 'Humancentric',
                titleAr: 'التركيز الإنساني',
                textEn: 'Every story is unique. Our support is thoughtful, personalized, and grounded in real-life needs.',
                textAr: 'كل قصة فريدة. دعمنا مدروس وشخصي ومرتكز على احتياجات الحياة الواقعية.',
                icon: '◎',
                num: '02',
              },
              {
                titleEn: 'Integrity',
                titleAr: 'النزاهة',
                textEn: 'We uphold honesty, confidentiality, and ethical practice, creating safe spaces for meaningful growth.',
                textAr: 'نحافظ على الصدق والسرية والممارسة الأخلاقية، ونخلق مساحات آمنة للنمو الهادف.',
                icon: '◆',
                num: '03',
              },
              {
                titleEn: 'Growth',
                titleAr: 'النمو',
                textEn: 'We commit to continuous learning and reflective, evidence-informed practice that strengthens outcomes.',
                textAr: 'نلتزم بالتعلم المستمر والممارسة التأملية المبنية على الأدلة التي تعزز النتائج.',
                icon: '✦',
                num: '04',
              },
            ].map((val, i) => (
              <StaggerChild key={i}>
                <motion.div
                  className="group relative overflow-hidden rounded-2xl h-full cursor-default"
                  whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                >
                  {/* Card background with gold gradient border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#C8A97D]/30 via-[#D4B88C]/20 to-[#C8A97D]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative bg-white border border-[#C8A97D]/15 group-hover:border-[#C8A97D]/40 rounded-2xl p-8 lg:p-9 h-full transition-all duration-500 group-hover:shadow-[0_20px_60px_rgba(200,169,125,0.15)]">

                    {/* Number watermark */}
                    <span
                      className={`absolute top-4 ${isRTL ? 'left-5' : 'right-5'} text-[72px] font-bold leading-none text-[#C8A97D]/[0.06] group-hover:text-[#C8A97D]/[0.12] transition-all duration-700 select-none`}
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {val.num}
                    </span>

                    {/* Gold icon */}
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#C8A97D]/15 to-[#D4B88C]/10 flex items-center justify-center mb-5 group-hover:from-[#C8A97D]/25 group-hover:to-[#D4B88C]/20 transition-all duration-500"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                    >
                      <span className="text-xl text-[#C8A97D]">{val.icon}</span>
                    </motion.div>

                    {/* Gold accent line */}
                    <div className={`w-8 h-[2px] ${isRTL ? 'bg-gradient-to-l mr-auto' : 'bg-gradient-to-r'} from-[#C8A97D] to-[#C8A97D]/30 mb-4 group-hover:w-12 transition-all duration-500 rounded-full`} />

                    {/* Title */}
                    <h3
                      className="text-xl lg:text-[22px] font-bold mb-4 text-[#2D2A33] group-hover:text-[#7A3B5E] transition-colors duration-500 tracking-wide uppercase"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {isRTL ? val.titleAr : val.titleEn}
                    </h3>

                    {/* Description */}
                    <p className="text-[#6B6580] leading-relaxed text-[14px] group-hover:text-[#4A4A5C] transition-colors duration-500">
                      {isRTL ? val.textAr : val.textEn}
                    </p>
                  </div>
                </motion.div>
              </StaggerChild>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* ================================================================ */}
      {/*  SECTION 4: IMPACT STATS BAR                                     */}
      {/* ================================================================ */}
      <section className="py-10 bg-white border-y border-[#F3EFE8]">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-3">
            {[
              { value: '500+', labelEn: 'Families Transformed', labelAr: 'عائلة تم تحويل حياتها', descEn: 'Across the globe', descAr: 'حول العالم', icon: Heart, color: '#C4878A' },
              { value: '23+', labelEn: 'Specialized Services', labelAr: 'خدمة متخصصة', descEn: 'Youth to couples', descAr: 'من الشباب إلى الأزواج', icon: Sparkles, color: '#C8A97D' },
              { value: '10+', labelEn: 'Years of Impact', labelAr: 'سنوات من التأثير', descEn: 'Evidence-based care', descAr: 'رعاية قائمة على الأدلة', icon: Clock, color: '#7A3B5E' },
              { value: '6', labelEn: 'Elite Certifications', labelAr: 'شهادات عالمية', descEn: 'Yale · UofT · CBT', descAr: 'ييل · تورنتو · CBT', icon: GraduationCap, color: '#C8A97D' },
              { value: '24/7', labelEn: 'Global Availability', labelAr: 'متاح عالمياً', descEn: 'Online & in-person', descAr: 'عبر الإنترنت وحضورياً', icon: Globe, color: '#C4878A' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                className="group flex items-start gap-3 lg:flex-col lg:items-center lg:text-center py-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.08, duration: 0.5, ease }}
              >
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}12` }}
                >
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl lg:text-3xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{stat.value}</p>
                  <p className="text-sm font-medium text-[#4A4A5C]">{isRTL ? stat.labelAr : stat.labelEn}</p>
                  <p className="text-xs text-[#8E8E9F] mt-0.5 hidden lg:block">{isRTL ? stat.descAr : stat.descEn}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-white to-[#FAF7F2]" />

      {/* ================================================================ */}
      {/*  SECTION 5: FOUNDATION OF EXPERTISE                              */}
      {/* ================================================================ */}
      <section className="py-24 lg:py-32 bg-[#FAF7F2]">
        <div className="container-main">
          {/* Section Header */}
          <ScrollReveal className="text-center mb-16">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-3">
              {isRTL ? 'المؤهلات والخبرات' : 'Qualifications & Expertise'}
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D2A33] text-balance"
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

          {/* Yale — Hero Feature Card */}
          <ScrollReveal className="mb-8">
            <motion.div
              className="relative bg-gradient-to-br from-[#F0D5CA] to-[#E8C4C0] rounded-3xl p-10 lg:p-14 overflow-hidden"
              whileHover={{ boxShadow: '0 20px 60px rgba(122,59,94,0.1)' }}
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-[#7A3B5E]/[0.04]" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-[#7A3B5E]/[0.06]" />
              <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
                <div className="w-20 h-20 rounded-2xl bg-[#7A3B5E]/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-10 h-10 text-[#7A3B5E]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#7A3B5E] bg-[#7A3B5E]/10 px-3 py-1 rounded-full">{isRTL ? 'جامعة ييل' : 'Yale University'}</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'دكتوراه مهنية في العلوم الصحية الاجتماعية والسلوكية' : 'Professional Doctorate in Social & Behavioral Health Sciences'}
                  </h3>
                  <p className="text-sm text-[#6B6580] mb-1">{isRTL ? 'تخصص: الطفل والأسرة' : 'Specialization: Child and Family'}</p>
                  <p className="text-[#4A4A5C] leading-relaxed text-[15px] max-w-2xl mt-3">
                    {isRTL
                      ? 'مزودة برؤى ومنهجيات متطورة لدعم الأطفال والأسر بفعالية.'
                      : 'Equipped with cutting-edge insights and methodologies to support children and families effectively.'
                    }
                  </p>
                </div>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Other Credentials — Compact Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { Icon: Brain, titleEn: 'Executive Function Coach', titleAr: 'مدربة وظائف تنفيذية', subtitleEn: 'ADD/ADHD Certified', subtitleAr: 'معتمدة', color: '#7A3B5E' },
              { Icon: Heart, titleEn: 'Art & Science of Parenting', titleAr: 'فن وعلم الأبوة', subtitleEn: 'Specialized', subtitleAr: 'متخصصة', color: '#C8A97D' },
              { Icon: BookOpen, titleEn: 'Counseling Psychology', titleAr: 'علم النفس الإرشادي', subtitleEn: 'University of Toronto', subtitleAr: 'جامعة تورنتو', color: '#C4878A' },
              { Icon: Shield, titleEn: 'Psychological First Aid', titleAr: 'الإسعافات النفسية', subtitleEn: 'Certified', subtitleAr: 'معتمدة', color: '#7A3B5E' },
              { Icon: Sparkles, titleEn: 'CBT Specialist', titleAr: 'متخصصة CBT', subtitleEn: 'Evidence-Based', subtitleAr: 'مبنية على الأدلة', color: '#C8A97D' },
            ].map((cred, i) => (
              <motion.div
                key={i}
                className="group bg-white rounded-xl p-5 border border-[#F3EFE8] hover:border-[#C4878A]/15 transition-all duration-300 text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                whileHover={{ y: -4, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
              >
                <div className="w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: cred.color + '12' }}>
                  <cred.Icon className="w-5 h-5" style={{ color: cred.color }} />
                </div>
                <h4 className="font-bold text-[#2D2A33] text-[13px] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? cred.titleAr : cred.titleEn}
                </h4>
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: cred.color }}>
                  {isRTL ? cred.subtitleAr : cred.subtitleEn}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Closing statement */}
          <ScrollReveal className="text-center mt-12 max-w-3xl mx-auto">
            <p className="text-[#4A4A5C] text-sm leading-relaxed italic">
              <Heart className="w-4 h-4 text-[#7A3B5E] inline-block mr-2 -mt-0.5" />
              {isRTL
                ? 'هذا المزيج من الخبرة الشخصية والمهنية يشكل أساس ممارستي، حيث أسعى لتعزيز المرونة والتفاهم والنمو داخل الأسر.'
                : 'This blend of personal experience and professional expertise forms the foundation of my practice, where I aim to foster resilience, understanding, and growth within families.'
              }
            </p>
          </ScrollReveal>
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
        {/* Warm gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F3EFE8] via-[#F0D5CA] to-[#E8C4C0]" />
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#7A3B5E]/[0.04] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#7A3B5E]/[0.06] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #7A3B5E 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="container-main relative z-10">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <motion.div
              className="inline-flex items-center gap-2 bg-white/60 rounded-full px-5 py-2 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewportOnce}
              transition={{ delay: 0.1, duration: 0.5, ease }}
            >
              <Sparkles className="w-4 h-4 text-[#7A3B5E]" />
              <span className="text-sm text-[#7A3B5E] font-medium">
                {isRTL ? 'ابدأ رحلتك اليوم' : 'Start Your Journey Today'}
              </span>
            </motion.div>

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
                className="!bg-[#7A3B5E] !text-white hover:!bg-[#5E2D48]"
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
                className="!border-[#7A3B5E]/30 !text-[#7A3B5E] hover:!bg-[#7A3B5E]/10"
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
/*  INTERVIEW & MEDIA REQUEST — MULTI-STEP WIZARD                   */
/* ================================================================ */
type FormErrors = Record<string, string>;

const STEPS = [
  { key: 'info', iconEn: 'Contact', iconAr: 'معلوماتك', Icon: User, color: '#C4878A' },
  { key: 'program', iconEn: 'Program', iconAr: 'البرنامج', Icon: FileText, color: '#7A3B5E' },
  { key: 'details', iconEn: 'Details', iconAr: 'التفاصيل', Icon: Calendar, color: '#C8A97D' },
  { key: 'promo', iconEn: 'Promotion', iconAr: 'الترويج', Icon: Sparkles, color: '#C4878A' },
] as const;

/* Extracted form field components — defined outside to prevent remount on every keystroke */
function FormSelect({ name, label, options, value, error, isTouched, isRTL, onChange, onBlur, required = false }: {
  name: string; label: string; value: string; error?: string; isTouched?: boolean; isRTL: boolean;
  options: { value: string; label: string; labelAr: string }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: () => void; required?: boolean;
}) {
  const hasError = isTouched && error;
  return (
    <div>
      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">{label}</label>
      <div className="relative">
        <select
          name={name} value={value} onChange={onChange} onBlur={onBlur} required={required}
          className={`w-full appearance-none bg-[#FAF7F2] border rounded-xl px-4 py-3.5 text-sm transition-all pr-10 focus:outline-none focus:ring-2 ${
            hasError ? 'border-red-400 focus:border-red-400 focus:ring-red-100 text-red-700'
            : value ? 'border-[#C4878A]/30 text-[#2D2A33] focus:border-[#7A3B5E] focus:ring-[#7A3B5E]/10'
            : 'border-[#F3EFE8] text-[#8E8E9F] focus:border-[#7A3B5E] focus:ring-[#7A3B5E]/10'
          }`}
        >
          {options.map(o => (<option key={o.value} value={o.value}>{isRTL ? o.labelAr : o.label}</option>))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9F] pointer-events-none" />
      </div>
      {hasError && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" /> {error}</p>}
    </div>
  );
}

function FormInput({ name, label, value, error, isTouched, type = 'text', onChange, onBlur, required = false, fullWidth = false }: {
  name: string; label: string; value: string; error?: string; isTouched?: boolean; type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void; required?: boolean; fullWidth?: boolean;
}) {
  const hasError = isTouched && error;
  const isValid = isTouched && !error && value.trim();
  return (
    <div className={fullWidth ? 'sm:col-span-2' : ''}>
      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} required={required}
          min={type === 'date' ? new Date().toISOString().split('T')[0] : undefined}
          className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 ${
            hasError ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
            : isValid ? 'border-[#C4878A]/30 focus:border-[#7A3B5E] focus:ring-[#7A3B5E]/10'
            : 'border-[#F3EFE8] focus:border-[#7A3B5E] focus:ring-[#7A3B5E]/10'
          } text-[#2D2A33] ${isValid ? 'pr-10' : ''}`}
        />
        {isValid && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Check className="w-4 h-4 text-[#7A3B5E]" />
          </div>
        )}
      </div>
      {hasError && <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" /> {error}</p>}
    </div>
  );
}

function InterviewSection({ locale, isRTL }: { locale: string; isRTL: boolean }) {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    publication: '', interviewer: '', mediaType: '', audience: '', platforms: '', website: '',
    proposedDate: '', proposedTime: '', topic: '', recordingMethod: '',
    deliverables: '', willMention: '',
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setTouched(prev => ({ ...prev, [name]: true }));
    // Clear error on change
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name as keyof typeof formData]);
  };

  const validateField = (name: string, value: string): string | null => {
    let err: string | null = null;
    const t = (en: string, ar: string) => isRTL ? ar : en;

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) err = t('This field is required', 'هذا الحقل مطلوب');
        else if (value.trim().length < 2) err = t('At least 2 characters', 'حرفان على الأقل');
        break;
      case 'email':
        if (!value.trim()) err = t('Email is required', 'البريد الإلكتروني مطلوب');
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) err = t('Enter a valid email', 'أدخل بريدًا صالحًا');
        break;
      case 'phone':
        if (!value.trim()) err = t('Phone is required', 'رقم الهاتف مطلوب');
        else if (!/^[+]?[\d\s()-]{7,}$/.test(value)) err = t('Enter a valid phone number', 'أدخل رقم هاتف صالح');
        break;
      case 'publication':
        if (!value.trim()) err = t('Publication name is required', 'اسم المنشور مطلوب');
        break;
      case 'interviewer':
        if (!value.trim()) err = t('Interviewer name is required', 'اسم المحاور مطلوب');
        break;
      case 'mediaType':
        if (!value) err = t('Please select a media type', 'يرجى اختيار نوع الإعلام');
        break;
      case 'topic':
        if (!value.trim()) err = t('Topic is required', 'الموضوع مطلوب');
        else if (value.trim().length < 10) err = t('Please provide more detail (10+ chars)', 'يرجى التفصيل أكثر (10+ أحرف)');
        break;
      case 'recordingMethod':
        if (!value) err = t('Please select a recording method', 'يرجى اختيار طريقة التسجيل');
        break;
      case 'deliverables':
        if (!value.trim()) err = t('Deliverables are required', 'المخرجات مطلوبة');
        break;
      case 'proposedDate':
        if (value && new Date(value) < new Date(new Date().toDateString()))
          err = t('Date cannot be in the past', 'لا يمكن أن يكون التاريخ في الماضي');
        break;
    }
    if (err) setErrors(prev => ({ ...prev, [name]: err! }));
    return err;
  };

  // Step-specific required fields
  const stepFields: string[][] = [
    ['firstName', 'lastName', 'email', 'phone'],
    ['publication', 'interviewer', 'mediaType'],
    ['topic', 'recordingMethod'],
    ['deliverables'],
  ];

  const validateStep = (s: number): boolean => {
    const fields = stepFields[s];
    let valid = true;
    const newErrors: FormErrors = {};
    fields.forEach(f => {
      const err = validateField(f, formData[f as keyof typeof formData]);
      if (err) { newErrors[f] = err; valid = false; }
    });
    // Also validate date if provided
    if (s === 2 && formData.proposedDate) {
      const err = validateField('proposedDate', formData.proposedDate);
      if (err) { newErrors['proposedDate'] = err; valid = false; }
    }
    setErrors(prev => ({ ...prev, ...newErrors }));
    // Mark all fields as touched
    const newTouched: Record<string, boolean> = {};
    fields.forEach(f => { newTouched[f] = true; });
    setTouched(prev => ({ ...prev, ...newTouched }));
    return valid;
  };

  const goNext = () => {
    if (validateStep(step)) setStep(s => Math.min(s + 1, 3));
  };
  const goBack = () => setStep(s => Math.max(s - 1, 0));

  // Completion percentage
  const filledRequired = stepFields.flat().filter(f => formData[f as keyof typeof formData].trim()).length;
  const totalRequired = stepFields.flat().length;
  const pct = Math.round((filledRequired / totalRequired) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 2000));
    setSending(false);
    setSent(true);
  };

  return (
    <section className="py-24 lg:py-32 bg-[#FAF7F2] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#7A3B5E]/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#C4878A]/[0.03] blur-[80px] pointer-events-none" />

      <div className="container-main relative z-10">
        {/* Hero Banner */}
        <ScrollReveal className={showForm ? 'mb-10' : ''}>
          <div className="relative bg-gradient-to-br from-[#7A3B5E] via-[#6A3352] to-[#5E2D48] rounded-3xl overflow-hidden shadow-xl shadow-[#7A3B5E]/10">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="grid lg:grid-cols-5 items-stretch relative">
              <div className={`flex flex-col justify-center p-10 lg:p-14 lg:col-span-3 ${isRTL ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 w-fit mb-6">
                  <Mic className="w-4 h-4 text-[#C8A97D]" />
                  <span className="text-xs font-semibold text-white/90 uppercase tracking-wider">
                    {isRTL ? 'طلبات الإعلام' : 'Media Requests'}
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                  <span className="text-white">{isRTL ? 'لن' : "Let's "}</span>
                  <span className="text-[#C8A97D]">{isRTL ? 'تعاون معاً' : 'Collaborate'}</span>
                </h2>
                <p className="text-white/75 leading-relaxed max-w-lg text-[15px]">
                  {isRTL
                    ? 'هل ترغب في استضافة د. هالة علي؟ قدم طلبك للمقابلات أو التغطية الإعلامية أو النقاشات المهنية.'
                    : 'Interested in featuring Dr. Hala Ali? Submit your request for interviews, media features, or professional discussions.'
                  }
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  {[
                    { en: 'Podcasts', ar: 'بودكاست', icon: Mic },
                    { en: 'TV & Radio', ar: 'تلفزيون وراديو', icon: Video },
                    { en: 'Print & Online', ar: 'مطبوعات وإلكتروني', icon: FileText },
                  ].map((tag, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5 text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                      <tag.icon className="w-3.5 h-3.5" /> {isRTL ? tag.ar : tag.en}
                    </span>
                  ))}
                </div>
                <motion.button
                  onClick={() => { setShowForm(!showForm); if (!showForm) setStep(0); }}
                  className="mt-8 inline-flex items-center gap-2.5 bg-white text-[#7A3B5E] hover:bg-[#FAF7F2] font-semibold px-7 py-3.5 rounded-full transition-colors duration-200 shadow-lg shadow-black/10 w-fit"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {showForm ? (
                    <><ChevronDown className="w-4 h-4 rotate-180" /> {isRTL ? 'إغلاق النموذج' : 'Close Form'}</>
                  ) : (
                    <><Send className="w-4 h-4" /> {isRTL ? 'تقديم طلب مقابلة' : 'Submit an Interview Request'}</>
                  )}
                </motion.button>
              </div>
              <div className={`relative lg:col-span-2 min-h-[300px] lg:min-h-full ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}>
                <Image src="/images/hala-office.jpg" alt="Dr. Hala Ali" fill className="object-cover object-center" />
                <div className={`absolute inset-0 ${isRTL ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#7A3B5E] via-[#7A3B5E]/50 to-transparent hidden lg:block`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#7A3B5E]/70 to-transparent lg:hidden" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Multi-Step Form */}
        <AnimatePresence mode="wait">
          {!showForm ? null : sent ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-20 h-20 mx-auto mb-6 bg-[#C4878A]/10 rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-[#7A3B5E]" />
              </motion.div>
              <h3 className="text-2xl font-bold text-[#2D2A33] mb-3" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'تم إرسال طلبك بنجاح!' : 'Request Submitted Successfully!'}
              </h3>
              <p className="text-[#8E8E9F] mb-6">
                {isRTL ? 'شكرًا لاهتمامك. سنراجع طلبك ونتواصل معك خلال 2-3 أيام عمل.' : 'Thank you for your interest. We\'ll review your request and get back to you within 2-3 business days.'}
              </p>
              <Button as="a" href={`/${locale}/contact`} variant="outline" icon={<MessageCircle className="w-4 h-4" />}>
                {isRTL ? 'صفحة التواصل' : 'Contact Page'}
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Progress Bar */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-[#8E8E9F]">
                    {isRTL ? `الخطوة ${step + 1} من 4` : `Step ${step + 1} of 4`}
                  </span>
                  <span className="text-xs font-semibold text-[#7A3B5E]">{pct}%</span>
                </div>
                <div className="h-1.5 bg-[#F3EFE8] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#C4878A] to-[#C8A97D] rounded-full"
                    initial={false}
                    animate={{ width: `${Math.max(((step + 1) / 4) * 100, 5)}%` }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                {/* Step indicators */}
                <div className="flex justify-between mt-4">
                  {STEPS.map((s, i) => {
                    const Icon = s.Icon;
                    const isActive = i === step;
                    const isDone = i < step;
                    return (
                      <button
                        key={s.key}
                        onClick={() => { if (i < step) setStep(i); else if (i === step + 1 && validateStep(step)) setStep(i); }}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                          isActive ? 'bg-white shadow-sm text-[#2D2A33] border border-[#F3EFE8]'
                          : isDone ? 'text-[#7A3B5E] cursor-pointer hover:bg-white/60'
                          : 'text-[#8E8E9F] cursor-default'
                        }`}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isDone ? 'bg-[#7A3B5E] text-white' : isActive ? 'bg-[#C4878A]/10 text-[#7A3B5E]' : 'bg-[#F3EFE8] text-[#8E8E9F]'
                        }`}>
                          {isDone ? <Check className="w-3 h-3" /> : <Icon className="w-3 h-3" />}
                        </div>
                        <span className="hidden sm:inline">{isRTL ? s.iconAr : s.iconEn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Content */}
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="bg-white rounded-2xl border border-[#F3EFE8] shadow-[var(--shadow-card)] p-8 lg:p-10">
                      {/* Step header */}
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ backgroundColor: STEPS[step].color + '15' }}>
                          {(() => { const Icon = STEPS[step].Icon; return <Icon className="w-5 h-5" style={{ color: STEPS[step].color }} />; })()}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#2D2A33] text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                            {step === 0 ? (isRTL ? 'معلوماتك' : 'Your Information')
                            : step === 1 ? (isRTL ? 'معلومات البرنامج' : 'Program Information')
                            : step === 2 ? (isRTL ? 'تفاصيل الطلب' : 'Request Details')
                            : (isRTL ? 'تفاصيل الترويج' : 'Promotion Details')}
                          </h3>
                          <p className="text-xs text-[#8E8E9F]">
                            {step === 0 ? (isRTL ? 'معلومات الاتصال الخاصة بك' : 'Your contact details')
                            : step === 1 ? (isRTL ? 'عن المنشور أو البرنامج' : 'About your publication or program')
                            : step === 2 ? (isRTL ? 'جدولة ومعلومات الموضوع' : 'Scheduling and topic information')
                            : (isRTL ? 'المخرجات والترويج' : 'Deliverables and promotion')}
                          </p>
                        </div>
                      </div>

                      {/* Step 1: Contact */}
                      {step === 0 && (
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormInput name="firstName" label={isRTL ? 'الاسم الأول *' : 'First Name *'} value={formData.firstName} error={errors.firstName} isTouched={touched.firstName} onChange={handleChange} onBlur={() => handleBlur('firstName')} required />
                          <FormInput name="lastName" label={isRTL ? 'اسم العائلة *' : 'Last Name *'} value={formData.lastName} error={errors.lastName} isTouched={touched.lastName} onChange={handleChange} onBlur={() => handleBlur('lastName')} required />
                          <FormInput name="email" label={isRTL ? 'البريد الإلكتروني *' : 'Email *'} type="email" value={formData.email} error={errors.email} isTouched={touched.email} onChange={handleChange} onBlur={() => handleBlur('email')} required />
                          <FormInput name="phone" label={isRTL ? 'الهاتف *' : 'Phone *'} type="tel" value={formData.phone} error={errors.phone} isTouched={touched.phone} onChange={handleChange} onBlur={() => handleBlur('phone')} required />
                        </div>
                      )}

                      {/* Step 2: Program */}
                      {step === 1 && (
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormInput name="publication" label={isRTL ? 'اسم المنشور / البرنامج *' : 'Name of Publication / Program *'} value={formData.publication} error={errors.publication} isTouched={touched.publication} onChange={handleChange} onBlur={() => handleBlur('publication')} required />
                          <FormInput name="interviewer" label={isRTL ? 'اسم المحاور(ين) *' : 'Name of Interviewer(s) *'} value={formData.interviewer} error={errors.interviewer} isTouched={touched.interviewer} onChange={handleChange} onBlur={() => handleBlur('interviewer')} required />
                          <FormSelect name="mediaType" label={isRTL ? 'نوع الوسيلة الإعلامية *' : 'Type of Media *'} options={mediaTypes} value={formData.mediaType} error={errors.mediaType} isTouched={touched.mediaType} isRTL={isRTL} onChange={handleChange} onBlur={() => handleBlur('mediaType')} required />
                          <FormInput name="audience" label={isRTL ? 'من هو جمهورك الأساسي؟' : 'Who is your primary audience?'} value={formData.audience} error={errors.audience} isTouched={touched.audience} onChange={handleChange} onBlur={() => handleBlur('audience')} />
                          <FormInput name="platforms" label={isRTL ? 'على أي منصات تنشر المحتوى؟' : 'On which platforms do you publish?'} value={formData.platforms} error={errors.platforms} isTouched={touched.platforms} onChange={handleChange} onBlur={() => handleBlur('platforms')} />
                          <FormInput name="website" label={isRTL ? 'الموقع الإلكتروني' : 'Website'} type="url" value={formData.website} error={errors.website} isTouched={touched.website} onChange={handleChange} onBlur={() => handleBlur('website')} />
                        </div>
                      )}

                      {/* Step 3: Details */}
                      {step === 2 && (
                        <div className="grid sm:grid-cols-2 gap-5">
                          <FormInput name="proposedDate" label={isRTL ? 'التاريخ المقترح' : 'Proposed Interview Date'} type="date" value={formData.proposedDate} error={errors.proposedDate} isTouched={touched.proposedDate} onChange={handleChange} onBlur={() => handleBlur('proposedDate')} />
                          <FormInput name="proposedTime" label={isRTL ? 'الوقت المقترح' : 'Proposed Time'} type="time" value={formData.proposedTime} error={errors.proposedTime} isTouched={touched.proposedTime} onChange={handleChange} onBlur={() => handleBlur('proposedTime')} />
                          <FormInput name="topic" label={isRTL ? 'موضوع المقابلة المقترح *' : 'Proposed Interview Topic *'} value={formData.topic} error={errors.topic} isTouched={touched.topic} onChange={handleChange} onBlur={() => handleBlur('topic')} required fullWidth />
                          <FormSelect name="recordingMethod" label={isRTL ? 'طريقة التسجيل المفضلة *' : 'Preferred Method of Recording *'} options={recordingMethods} value={formData.recordingMethod} error={errors.recordingMethod} isTouched={touched.recordingMethod} isRTL={isRTL} onChange={handleChange} onBlur={() => handleBlur('recordingMethod')} required />
                        </div>
                      )}

                      {/* Step 4: Promotion */}
                      {step === 3 && (
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                              {isRTL ? 'ما هي المخرجات من هذه الفرصة؟ *' : 'What are the deliverables from this opportunity? *'}
                            </label>
                            <textarea
                              name="deliverables"
                              value={formData.deliverables}
                              onChange={handleChange}
                              onBlur={() => handleBlur('deliverables')}
                              required
                              rows={4}
                              className={`w-full bg-[#FAF7F2] border rounded-xl px-4 py-3.5 text-sm text-[#2D2A33] focus:outline-none focus:ring-2 transition-all resize-none ${
                                touched.deliverables && errors.deliverables
                                  ? 'border-red-400 focus:border-red-400 focus:ring-red-100'
                                  : 'border-[#F3EFE8] focus:border-[#7A3B5E] focus:ring-[#7A3B5E]/10'
                              }`}
                              placeholder={isRTL ? 'صف المخرجات المتوقعة...' : 'Describe the expected deliverables...'}
                            />
                            <div className="flex justify-between mt-1.5">
                              {touched.deliverables && errors.deliverables ? (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-500 flex items-center gap-1">
                                  <span className="w-1 h-1 rounded-full bg-red-400" /> {errors.deliverables}
                                </motion.p>
                              ) : <span />}
                              <span className="text-[10px] text-[#8E8E9F]">{formData.deliverables.length}/500</span>
                            </div>
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
                                  className={`flex items-center gap-2.5 px-6 py-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${
                                    formData.willMention === opt
                                      ? 'bg-[#7A3B5E] text-white border-[#C4878A] shadow-md shadow-[#7A3B5E]/15'
                                      : 'bg-[#FAF7F2] text-[#4A4A5C] border-[#F3EFE8] hover:border-[#C4878A]/30 hover:bg-white'
                                  }`}
                                >
                                  <input type="radio" name="willMention" value={opt} checked={formData.willMention === opt} onChange={handleChange} className="sr-only" />
                                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.willMention === opt ? 'border-white' : 'border-[#C8A97D]'}`}>
                                    {formData.willMention === opt && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                  </div>
                                  <span className="text-sm font-medium">{isRTL ? (opt === 'Yes' ? 'نعم' : 'لا') : opt}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Navigation */}
                <div className="max-w-4xl mx-auto flex items-center justify-between mt-6">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={goBack}
                      className="flex items-center gap-2 text-sm font-medium text-[#8E8E9F] hover:text-[#2D2A33] transition-colors px-4 py-2"
                    >
                      <ChevronDown className={`w-4 h-4 ${isRTL ? '-rotate-90' : 'rotate-90'}`} />
                      {isRTL ? 'السابق' : 'Back'}
                    </button>
                  ) : <div />}
                  {step < 3 ? (
                    <Button type="button" onClick={goNext} icon={<ChevronDown className={`w-4 h-4 ${isRTL ? 'rotate-90' : '-rotate-90'}`} />}>
                      {isRTL ? 'التالي' : 'Continue'}
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      icon={sending ? undefined : <Send className="w-5 h-5" />}
                      disabled={sending}
                      className="min-w-[200px]"
                    >
                      {sending ? (isRTL ? 'جارٍ الإرسال...' : 'Sending...') : (isRTL ? 'أرسل طلبك' : 'Send Your Request')}
                    </Button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
