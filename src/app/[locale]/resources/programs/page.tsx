'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  GraduationCap, BookOpen, Award, Layers, Clock,
  Heart, Sprout, HeartHandshake, Compass, TreePine,
  Bell, Loader2, CheckCircle, Star, ArrowRight, ArrowLeft,
  Sparkles, Users, Mail,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import ScrollReveal, { StaggerReveal, StaggerChild } from '@/components/motion/ScrollReveal';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import WaveDivider from '@/components/ui/WaveDivider';
import FinalCTA from '@/components/shared/FinalCTA';

const programs = [
  { icon: <Heart className="w-7 h-7" />, color: '#7A3B5E', titleEn: 'The Intentional Parent', titleAr: 'الوالد الواعي', descEn: 'Master emotionally intelligent parenting with 15 evidence-based modules.', category: 'Families', modules: 15 },
  { icon: <Sprout className="w-7 h-7" />, color: '#C4878A', titleEn: 'Raising Resilient Teens', titleAr: 'تربية مراهقين أقوياء', descEn: 'Navigate the teen years with confidence — communication, digital wellness, anxiety tools.', category: 'Youth', modules: 12 },
  { icon: <HeartHandshake className="w-7 h-7" />, color: '#D4836A', titleEn: 'Stronger Together', titleAr: 'أقوى معاً', descEn: 'Deepen your connection, transform conflict into growth, build lasting partnership.', category: 'Couples', modules: 12 },
  { icon: <Compass className="w-7 h-7" />, color: '#C8A97D', titleEn: 'Inner Compass', titleAr: 'البوصلة الداخلية', descEn: 'Discover your authentic self, manage anxiety, and live aligned with your values.', category: 'Adults', modules: 12 },
  { icon: <TreePine className="w-7 h-7" />, color: '#3B8A6E', titleEn: 'Cultural Roots, Modern Wings', titleAr: 'جذور ثقافية، أجنحة حديثة', descEn: 'Celebrate heritage while thriving abroad — a guide for multicultural families.', category: 'Community', modules: 8 },
];

export default function ProgramsComingSoonPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('loading');
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), source: 'academy-waitlist' }),
      });
      setStatus('success');
    } catch { setStatus('success'); }
  };

  return (
    <div className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section className="relative pt-28 pb-24 lg:pt-36 lg:pb-32 overflow-hidden gradient-sage">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-[15%] w-[400px] h-[400px] rounded-full bg-[#7A3B5E]/[0.04] blur-[80px]" />
          <div className="absolute bottom-10 left-[10%] w-[300px] h-[300px] rounded-full bg-[#C8A97D]/[0.06] blur-[60px]" />
        </div>

        <div className="container-main relative z-10">
          <Breadcrumb locale={locale} items={[
            { label: messages.nav.home, href: `/${locale}` },
            { label: messages.nav.resources, href: `/${locale}/resources` },
            { label: messages.nav.programs },
          ]} />

          <motion.div
            className="mt-8 max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#7A3B5E]/8 mb-6">
              <GraduationCap className="w-5 h-5 text-[#7A3B5E]" />
              <span className="text-sm font-semibold text-[#7A3B5E]">
                {isRTL ? 'أكاديمية ماما هالة' : 'Mama Hala Academy'}
              </span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2D2A33] leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {isRTL ? (
                <>برامج تعليمية <span className="text-[#7A3B5E] italic">قريباً</span></>
              ) : (
                <>Premium Programs <span className="text-[#7A3B5E] italic">Coming Soon</span></>
              )}
            </h1>

            <p className="text-lg lg:text-xl text-[#4A4A5C] max-w-2xl mx-auto leading-relaxed mb-8">
              {isRTL
                ? 'برامج تعليمية متعددة المستويات مصممة من قبل الدكتورة هالة علي — مع دروس تفاعلية واختبارات وشهادات إتمام.'
                : 'Multi-level educational programs designed by Dr. Hala Ali — with interactive lessons, quizzes, reflections, and completion certificates.'}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center gap-8 mb-10">
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2D2A33]">5</p>
                <p className="text-xs text-[#8E8E9F]">{isRTL ? 'برامج' : 'Programs'}</p>
              </div>
              <div className="w-px h-10 bg-[#F3EFE8]" />
              <div className="text-center">
                <p className="text-3xl font-bold text-[#2D2A33]">59</p>
                <p className="text-xs text-[#8E8E9F]">{isRTL ? 'وحدة تعليمية' : 'Modules'}</p>
              </div>
              <div className="w-px h-10 bg-[#F3EFE8]" />
              <div className="text-center">
                <Award className="w-7 h-7 text-[#C8A97D] mx-auto" />
                <p className="text-xs text-[#8E8E9F]">{isRTL ? 'شهادات' : 'Certificates'}</p>
              </div>
            </div>

            {/* Notify form */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#3B8A6E]/10 text-[#3B8A6E] font-medium"
              >
                <CheckCircle className="w-5 h-5" />
                {isRTL ? 'سنبلغك فور الإطلاق!' : "We'll notify you at launch!"}
              </motion.div>
            ) : (
              <form onSubmit={handleNotify} className="flex gap-2 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email'}
                  required
                  className="flex-1 px-4 py-3 rounded-xl border border-[#F3EFE8] bg-white text-sm focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] transition-colors disabled:opacity-60 flex items-center gap-2 flex-shrink-0"
                >
                  {status === 'loading' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Bell className="w-4 h-4" />}
                  {isRTL ? 'أبلغني' : 'Notify Me'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
        <WaveDivider position="bottom" fillColor="#ffffff" variant="gentle" />
      </section>

      {/* ─── PROGRAM PREVIEW CARDS ─── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-[#C8A97D] block mb-2">
              {isRTL ? 'ما نبنيه لك' : 'What We\'re Building'}
            </span>
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? '5 برامج مصممة لتحولك' : '5 Programs Designed for Your Growth'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {programs.map((prog, i) => (
              <StaggerChild key={i}>
                <div className="bg-white rounded-2xl border border-[#F3EFE8] p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${prog.color}12` }}>
                    <div style={{ color: prog.color }}>{prog.icon}</div>
                  </div>
                  <Badge variant="neutral" size="sm" className="mb-3">{prog.category}</Badge>
                  <h3 className="text-lg font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? prog.titleAr : prog.titleEn}
                  </h3>
                  <p className="text-sm text-[#4A4A5C] leading-relaxed mb-3">{prog.descEn}</p>
                  <div className="flex items-center gap-3 text-xs text-[#8E8E9F]">
                    <span className="inline-flex items-center gap-1"><Layers className="w-3 h-3" /> {prog.modules} {isRTL ? 'وحدة' : 'modules'}</span>
                    <span className="inline-flex items-center gap-1"><Award className="w-3 h-3" /> {isRTL ? 'شهادة' : 'Certificate'}</span>
                  </div>
                </div>
              </StaggerChild>
            ))}

            {/* Coming soon card */}
            <StaggerChild>
              <div className="bg-[#FAF7F2] rounded-2xl border-2 border-dashed border-[#F3EFE8] p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
                <Sparkles className="w-8 h-8 text-[#C8A97D] mb-3" />
                <p className="font-semibold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
                  {isRTL ? 'المزيد قريباً' : 'More Coming'}
                </p>
                <p className="text-sm text-[#8E8E9F] mt-1">
                  {isRTL ? 'نعمل على برامج إضافية' : 'We\'re working on more programs'}
                </p>
              </div>
            </StaggerChild>
          </StaggerReveal>
        </div>
      </section>

      {/* ─── WHAT TO EXPECT ─── */}
      <section className="py-16 lg:py-20 bg-[#FAF7F2]">
        <div className="container-main">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? 'ماذا ستجد في كل برنامج' : 'What Each Program Includes'}
            </h2>
          </ScrollReveal>

          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: <BookOpen className="w-5 h-5" />, label: isRTL ? 'دروس تفاعلية' : 'Interactive Lessons', desc: isRTL ? 'محتوى غني من الدكتورة هالة' : 'Rich content by Dr. Hala', color: '#7A3B5E' },
              { icon: <Star className="w-5 h-5" />, label: isRTL ? 'تأمل وتمارين' : 'Reflections & Activities', desc: isRTL ? 'تمارين عملية للتطبيق' : 'Practical exercises to apply', color: '#C8A97D' },
              { icon: <CheckCircle className="w-5 h-5" />, label: isRTL ? 'اختبارات' : 'Module Quizzes', desc: isRTL ? 'اختبر فهمك' : 'Test your understanding', color: '#C4878A' },
              { icon: <Award className="w-5 h-5" />, label: isRTL ? 'شهادة إتمام' : 'Certificate', desc: isRTL ? 'موقعة من الدكتورة هالة' : 'Signed by Dr. Hala Ali', color: '#3B8A6E' },
            ].map((item, i) => (
              <StaggerChild key={i}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: `${item.color}12` }}>
                    <div style={{ color: item.color }}>{item.icon}</div>
                  </div>
                  <h3 className="font-bold text-[#2D2A33] mb-1">{item.label}</h3>
                  <p className="text-sm text-[#8E8E9F]">{item.desc}</p>
                </div>
              </StaggerChild>
            ))}
          </StaggerReveal>
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
