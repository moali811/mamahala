'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, BookOpen, Play, Award, Mail, Loader2, LogOut,
  Heart, Sprout, HeartHandshake, Compass, CheckCircle, AlertCircle,
  ArrowRight, ArrowLeft, Clock, Layers,
} from 'lucide-react';
import { getMessages, type Locale } from '@/lib/i18n';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/layout/Breadcrumb';

/* ── Program metadata (static, no need to import full data) ── */
const programMeta: Record<string, { titleEn: string; titleAr: string; icon: React.ReactNode; color: string; totalModules: number; isFree: boolean; price: number; firstModule: string }> = {
  'intentional-parent': { titleEn: 'The Intentional Parent', titleAr: 'الوالد الواعي', icon: <Heart className="w-6 h-6" />, color: '#7A3B5E', totalModules: 15, isFree: false, price: 9, firstModule: 'understanding-childs-emotional-world' },
  'resilient-teens': { titleEn: 'Raising Resilient Teens', titleAr: 'تربية مراهقين أقوياء', icon: <Sprout className="w-6 h-6" />, color: '#C4878A', totalModules: 12, isFree: false, price: 9, firstModule: 'understanding-the-teen-brain' },
  'stronger-together': { titleEn: 'Stronger Together', titleAr: 'أقوى معاً', icon: <HeartHandshake className="w-6 h-6" />, color: '#D4836A', totalModules: 12, isFree: false, price: 9, firstModule: 'love-languages-rediscovered' },
  'inner-compass': { titleEn: 'Inner Compass', titleAr: 'البوصلة الداخلية', icon: <Compass className="w-6 h-6" />, color: '#C8A97D', totalModules: 12, isFree: false, price: 9, firstModule: 'who-am-i-really' },
};

interface ProgramProgress {
  slug: string;
  completedModules: string[];
  currentModule: string | null;
  startedAt: string | null;
  lastActivity: string | null;
  hasCertificate: boolean;
  certId?: string;
  paymentStatus: string;
}

interface DashboardData {
  student: { email: string; name: string; enrolledAt: string };
  programs: ProgramProgress[];
}

export default function DashboardPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]"><Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" /></div>}>
      <DashboardPage />
    </Suspense>
  );
}

function DashboardPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const messages = getMessages(locale as Locale);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const [loginEmail, setLoginEmail] = useState('');
  const [loginState, setLoginState] = useState<'idle' | 'sending' | 'sent' | 'error' | 'notEnrolled'>('idle');
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const urlError = searchParams.get('error');

  // Check session on mount
  useEffect(() => {
    fetch('/api/academy/dashboard')
      .then(r => r.json())
      .then(d => {
        if (d.student) setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.includes('@')) return;
    setLoginState('sending');
    try {
      const res = await fetch('/api/academy/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail }),
      });
      if (res.ok) {
        setLoginState('sent');
      } else {
        const data = await res.json().catch(() => ({}));
        setLoginState(data.notEnrolled ? 'notEnrolled' : 'error');
      }
    } catch {
      setLoginState('error');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/academy/dashboard', { method: 'DELETE' });
    setData(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <Loader2 className="w-8 h-8 animate-spin text-[#7A3B5E]" />
      </div>
    );
  }

  // ─── LOGIN GATE ───
  if (!data) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="container-main pt-28 pb-20 lg:pt-36">
          <Breadcrumb locale={locale} items={[
            { label: messages.nav.home, href: `/${locale}` },
            { label: isRTL ? 'لوحة التحكّم' : 'Dashboard' },
          ]} />

          <div className="max-w-md mx-auto mt-12">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-[#7A3B5E]/10 flex items-center justify-center mx-auto mb-5">
                <GraduationCap className="w-8 h-8 text-[#7A3B5E]" />
              </div>
              <h1 className="text-3xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                {isRTL ? 'لوحة التعلّم' : 'Learning Dashboard'}
              </h1>
              <p className="text-[#8E8E9F]">
                {isRTL ? 'أدخل بريدك الإلكتروني لتلقّي رابط الدخول.' : 'Enter your email to receive a login link.'}
              </p>
            </div>

            {urlError === 'expired' && (
              <div className="mb-6 p-3 rounded-xl bg-[#D4836A]/10 text-[#D4836A] text-sm text-center">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                {isRTL ? 'انتهت صلاحية الرابط. أرسل رابطاً جديداً.' : 'Link expired. Request a new one.'}
              </div>
            )}

            <AnimatePresence mode="wait">
              {loginState === 'sent' ? (
                <motion.div key="sent" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border border-[#F3EFE8] p-8 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#3B8A6E]/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7 text-[#3B8A6E]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#2D2A33] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                    {isRTL ? 'تحقّق من بريدك' : 'Check Your Email'}
                  </h2>
                  <p className="text-sm text-[#4A4A5C]">
                    {isRTL
                      ? `أرسلنا رابط دخول إلى ${loginEmail}. ينتهي خلال 15 دقيقة.`
                      : `We sent a login link to ${loginEmail}. It expires in 15 minutes.`}
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSendMagicLink} className="bg-white rounded-2xl border border-[#F3EFE8] p-6 space-y-4">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder={isRTL ? 'بريدك الإلكتروني' : 'Your email address'}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm focus:outline-none focus:border-[#7A3B5E] focus:ring-2 focus:ring-[#7A3B5E]/10"
                  />
                  <button
                    type="submit"
                    disabled={loginState === 'sending'}
                    className="w-full py-3.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {loginState === 'sending' ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> {isRTL ? 'جاري الإرسال...' : 'Sending...'}</>
                    ) : (
                      <><Mail className="w-4 h-4" /> {isRTL ? 'أرسلْ رابط الدخول' : 'Send Login Link'}</>
                    )}
                  </button>
                  {loginState === 'error' && (
                    <p className="text-sm text-[#C45B5B] text-center">{isRTL ? 'حدث خطأ. حاول مرة أخرى.' : 'Something went wrong. Try again.'}</p>
                  )}
                  {loginState === 'notEnrolled' && (
                    <div className="text-center p-4 rounded-xl bg-[#D49A4E]/8 border border-[#D49A4E]/20">
                      <p className="text-sm text-[#D49A4E] mb-2 font-medium">
                        {isRTL ? 'لم نعثر على حساب بهذا البريد الإلكتروني' : 'No account found with this email'}
                      </p>
                      <p className="text-xs text-[#6B6580] mb-3">
                        {isRTL ? 'يرجى التسجيل في برنامج أولاً.' : 'Please enroll in a program first.'}
                      </p>
                      <a
                        href={`/${locale}/resources/programs`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#7A3B5E] hover:text-[#5E2D48]"
                      >
                        {isRTL ? 'تصفّح البرامج' : 'Browse Programs'} <ArrowIcon className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            <p className="text-xs text-[#8E8E9F] text-center mt-6">
              {isRTL ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
              <a href={`/${locale}/resources/programs`} className="text-[#7A3B5E] hover:underline">
                {isRTL ? 'تصفّح البرامج' : 'Browse programs'}
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ─── DASHBOARD ───
  const { student, programs } = data;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="container-main pt-28 pb-20 lg:pt-36">
        <Breadcrumb locale={locale} items={[
          { label: messages.nav.home, href: `/${locale}` },
          { label: isRTL ? 'لوحة التحكّم' : 'Dashboard' },
        ]} />

        {/* Header */}
        <div className="flex items-center justify-between mt-8 mb-10">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
              {isRTL ? `مرحباً، ${student.name || 'متعلّم'}` : `Welcome, ${student.name || 'Learner'}`}
            </h1>
            <p className="text-sm text-[#8E8E9F] mt-1">{student.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#F3EFE8] text-sm text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-white transition-colors">
            <LogOut className="w-4 h-4" />
            {isRTL ? 'خروج' : 'Sign Out'}
          </button>
        </div>

        {/* Programs Grid */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>
            <BookOpen className="w-5 h-5 inline mr-2 text-[#C8A97D]" />
            {isRTL ? 'برامجي' : 'My Programs'}
          </h2>

          {programs.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#F3EFE8] p-12 text-center">
              <GraduationCap className="w-10 h-10 text-[#8E8E9F] mx-auto mb-4" />
              <p className="text-[#8E8E9F] mb-4">{isRTL ? 'لم تسجّل في أي برنامج بعد.' : "You haven't enrolled in any programs yet."}</p>
              <a href={`/${locale}/resources/programs`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#5E2D48] transition-colors">
                {isRTL ? 'تصفّح البرامج' : 'Browse Programs'}
                <ArrowIcon className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {programs.map((prog) => {
                const meta = programMeta[prog.slug];
                if (!meta) return null;

                const title = isRTL ? meta.titleAr : meta.titleEn;
                const completed = prog.completedModules.length;
                const total = meta.totalModules;
                const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
                const isComplete = completed >= total;
                const hasStarted = completed > 0;

                return (
                  <motion.div
                    key={prog.slug}
                    className="bg-white rounded-2xl border border-[#F3EFE8] overflow-hidden hover:shadow-md transition-shadow"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    {/* Color strip */}
                    <div className="h-1.5" style={{ backgroundColor: meta.color }} />

                    <div className="p-6">
                      {/* Icon + title */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${meta.color}12` }}>
                          <div style={{ color: meta.color }}>{meta.icon}</div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-[#2D2A33]" style={{ fontFamily: 'var(--font-heading)' }}>{title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={isComplete ? 'success' : 'neutral'} size="sm">
                              {isComplete
                                ? (isRTL ? 'مكتمل' : 'Completed')
                                : hasStarted
                                  ? (isRTL ? 'قيد التقدّم' : 'In Progress')
                                  : (isRTL ? 'جديد' : 'Not Started')}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-[#8E8E9F]">{isRTL ? 'التقدّم' : 'Progress'}</span>
                          <span className="text-xs font-semibold" style={{ color: meta.color }}>{completed}/{total} {isRTL ? 'وحدة' : 'modules'}</span>
                        </div>
                        <div className="h-2 bg-[#F3EFE8] rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%`, backgroundColor: meta.color }} />
                        </div>
                      </div>

                      {/* Action */}
                      <div className="flex items-center gap-3">
                        {isComplete && prog.hasCertificate ? (
                          <a
                            href={`/${locale}/programs/certificate/${prog.certId}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-colors"
                            style={{ backgroundColor: `${meta.color}10`, color: meta.color }}
                          >
                            <Award className="w-4 h-4" />
                            {isRTL ? 'عرض الشهادة' : 'View Certificate'}
                          </a>
                        ) : (
                          <a
                            href={`/${locale}/programs/${prog.slug}/${hasStarted ? (prog.currentModule || meta.firstModule) : meta.firstModule}`}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
                            style={{ backgroundColor: meta.color }}
                          >
                            <Play className="w-4 h-4" />
                            {hasStarted ? (isRTL ? 'واصلِ التعلّم' : 'Continue') : (isRTL ? 'ابدأ' : 'Start')}
                          </a>
                        )}

                        <a
                          href={`/${locale}/programs/${prog.slug}`}
                          className="px-4 py-3 rounded-xl border border-[#F3EFE8] text-sm text-[#8E8E9F] hover:text-[#7A3B5E] hover:bg-[#FAF7F2] transition-colors"
                        >
                          <Layers className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Last activity */}
                      {prog.lastActivity && (
                        <p className="text-[11px] text-[#B0B0C0] mt-3 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {isRTL ? 'آخر نشاط: ' : 'Last active: '}{new Date(prog.lastActivity).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Browse more programs */}
        <div className="mt-12 text-center">
          <a href={`/${locale}/resources/programs`} className="text-sm text-[#7A3B5E] hover:underline font-medium">
            {isRTL ? 'تصفّح المزيد من البرامج →' : 'Browse more programs →'}
          </a>
        </div>
      </div>
    </div>
  );
}
