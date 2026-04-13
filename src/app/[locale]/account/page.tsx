'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
  Calendar, Clock, User, Mail, Phone, LogOut, ChevronRight,
  Loader2, AlertCircle, Sparkles, Check, X, RefreshCw, Download,
  FileText, Globe, Video, Building2, ExternalLink,
} from 'lucide-react';
import type { Booking } from '@/lib/booking/types';
import Breadcrumb from '@/components/layout/Breadcrumb';

type Tab = 'upcoming' | 'history' | 'receipts';

function AccountInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>('upcoming');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSent, setLoginSent] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Booking data
  const [upcoming, setUpcoming] = useState<any[]>([]);
  const [past, setPast] = useState<any[]>([]);
  const [receipts, setReceipts] = useState<any[]>([]);
  const [dataLoading, setDataLoading] = useState(false);

  // Check session on mount
  useEffect(() => {
    fetch('/api/account/session')
      .then(r => r.json())
      .then(data => {
        if (data.authenticated) {
          setAuthenticated(true);
          setUser({ email: data.email, name: data.name });
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (!authenticated) return;
    setDataLoading(true);
    Promise.all([
      fetch('/api/account/bookings').then(r => r.json()),
      fetch('/api/account/receipts').then(r => r.json()),
    ]).then(([bookingsData, receiptsData]) => {
      setUpcoming(bookingsData.upcoming ?? []);
      setPast(bookingsData.past ?? []);
      setReceipts(receiptsData.invoices ?? []);
    }).catch(() => {}).finally(() => setDataLoading(false));
  }, [authenticated]);

  const handleLogin = async () => {
    if (!loginEmail.includes('@')) { setLoginError(isRTL ? 'بريد إلكتروني صالح مطلوب' : 'Valid email required'); return; }
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch('/api/account/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail }),
      });
      const data = await res.json();
      if (!res.ok) { setLoginError(data.error); return; }
      setLoginSent(true);
    } catch { setLoginError('Something went wrong'); }
    finally { setLoginLoading(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C8A97D] animate-spin" />
      </div>
    );
  }

  // Login Screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-sm w-full space-y-6">
          <div className="text-center space-y-3">
            <Image
              src="/images/logo-256.png"
              alt="Mama Hala Consulting"
              width={48}
              height={48}
              className="mx-auto rounded-lg"
            />
            <h1 className="text-2xl font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
              {isRTL ? 'حسابي' : 'My Account'}
            </h1>
            <div className="w-[60px] h-[2px] bg-[#C8A97D] mx-auto" />
            <p className="text-sm text-[#8E8E9F]">
              {isRTL ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط تسجيل الدخول.' : 'Enter your email and we\'ll send you a login link.'}
            </p>
          </div>

          {loginSent ? (
            <div className="bg-white rounded-2xl p-6 border border-[#F0ECE8] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#3B8A6E]/10 flex items-center justify-center mx-auto">
                <Mail className="w-6 h-6 text-[#3B8A6E]" />
              </div>
              <p className="text-sm font-semibold text-[#4A4A5C]">{isRTL ? 'تحقق من بريدك الإلكتروني!' : 'Check Your Email!'}</p>
              <p className="text-xs text-[#8E8E9F]">{isRTL ? 'أرسلنا رابط تسجيل الدخول إلى' : 'We sent a login link to'} <strong>{loginEmail}</strong></p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-[#F0ECE8] space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C0B8B0]" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  placeholder="email@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#E8E0D8] text-sm text-[#4A4A5C] placeholder-[#C0B8B0] focus:border-[#7A3B5E] focus:ring-1 focus:ring-[#7A3B5E] outline-none"
                  dir="ltr"
                />
              </div>
              {loginError && <p className="text-xs text-red-500">{loginError}</p>}
              <button
                onClick={handleLogin}
                disabled={loginLoading}
                className="w-full py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                {isRTL ? 'أرسل رابط الدخول' : 'Send Login Link'}
              </button>
            </div>
          )}

          <p className="text-center text-xs text-[#C0B8B0]">
            {isRTL ? 'ليس لديك حساب؟' : 'No account yet?'}{' '}
            <a href={`/${locale}/book`} className="text-[#7A3B5E] underline">{isRTL ? 'احجز جلسة' : 'Book a session'}</a>
          </p>
        </motion.div>
      </div>
    );
  }

  // Authenticated Portal
  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'upcoming', label: isRTL ? 'القادمة' : 'Upcoming', icon: <Calendar className="w-4 h-4" /> },
    { key: 'history', label: isRTL ? 'السابقة' : 'History', icon: <Clock className="w-4 h-4" /> },
    { key: 'receipts', label: isRTL ? 'الإيصالات' : 'Receipts', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] pb-16" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="max-w-2xl mx-auto px-4 pt-6">
        <Breadcrumb items={[
          { label: isRTL ? 'الرئيسية' : 'Home', href: `/${locale}` },
          { label: isRTL ? 'حسابي' : 'My Account' },
        ]} locale={locale} />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, serif' }}>
              {isRTL ? `مرحباً${user?.name ? `، ${user.name}` : ''}` : `Welcome${user?.name ? `, ${user.name}` : ''}`}
            </h1>
            <p className="text-xs text-[#8E8E9F] mt-0.5">{user?.email}</p>
          </div>
          <a href={`/${locale}/book`} className="px-4 py-2 rounded-lg bg-[#7A3B5E] text-white text-xs font-semibold hover:bg-[#6A2E4E] transition-all">
            {isRTL ? 'حجز جلسة' : 'Book Session'}
          </a>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#F0ECE8]">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                tab === t.key ? 'bg-[#7A3B5E] text-white' : 'text-[#8E8E9F] hover:bg-[#F5F0EB]'
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {dataLoading ? (
          <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[#C8A97D] animate-spin" /></div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {tab === 'upcoming' && (
                <div className="space-y-3">
                  {upcoming.length === 0 ? (
                    <EmptyState isRTL={isRTL} message={isRTL ? 'لا توجد جلسات قادمة' : 'No upcoming sessions'} locale={locale} type="upcoming" />
                  ) : (
                    upcoming.map(b => <BookingCard key={b.bookingId} booking={b} isRTL={isRTL} locale={locale} />)
                  )}
                </div>
              )}
              {tab === 'history' && (
                <div className="space-y-3">
                  {past.length === 0 ? (
                    <EmptyState isRTL={isRTL} message={isRTL ? 'لا توجد جلسات سابقة' : 'No past sessions'} locale={locale} type="history" />
                  ) : (
                    past.map(b => <BookingCard key={b.bookingId} booking={b} isRTL={isRTL} locale={locale} isPast />)
                  )}
                </div>
              )}
              {tab === 'receipts' && (
                <div className="space-y-3">
                  {receipts.length === 0 ? (
                    <EmptyState isRTL={isRTL} message={isRTL ? 'لا توجد إيصالات' : 'No receipts yet'} locale={locale} type="receipts" />
                  ) : (
                    receipts.map((r: any) => (
                      <div key={r.invoiceId} className="bg-white rounded-xl p-4 border border-[#F0ECE8]">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-[#4A4A5C]">{r.invoiceNumber}</p>
                              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                r.status === 'paid' ? 'bg-[#F0FAF5] text-[#3B8A6E]' :
                                r.status === 'sent' ? 'bg-[#F0F4FF] text-[#5B8AC4]' :
                                'bg-[#F5F0EB] text-[#8E8E9F]'
                              }`}>{r.status}</span>
                            </div>
                            <p className="text-xs text-[#4A4A5C]">{r.serviceName}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[#8E8E9F]">
                              <span>{r.currency} {r.totalLocal ?? r.totalCAD ?? '—'}</span>
                              <span>{r.issuedAt ? new Date(r.issuedAt).toLocaleDateString(isRTL ? 'ar' : 'en-US') : ''}</span>
                            </div>
                          </div>
                          {r.status === 'paid' && r.invoiceId && (
                            <a
                              href={`/api/account/receipts?id=${r.invoiceId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#F5F0EB] text-xs font-medium text-[#7A3B5E] hover:bg-[#EDE8DF] transition-colors"
                            >
                              <Download className="w-3 h-3" />
                              PDF
                            </a>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

function BookingCard({ booking, isRTL, locale, isPast }: { booking: any; isRTL: boolean; locale: string; isPast?: boolean }) {
  const d = new Date(booking.startTime);
  const dayNum = d.toLocaleDateString(isRTL ? 'ar' : 'en-US', { timeZone: booking.clientTimezone, day: 'numeric' });
  const monthAbbr = d.toLocaleDateString(isRTL ? 'ar' : 'en-US', { timeZone: booking.clientTimezone, month: 'short' }).toUpperCase();
  const timeStr = d.toLocaleTimeString(isRTL ? 'ar' : 'en-US', { timeZone: booking.clientTimezone, hour: 'numeric', minute: '2-digit' });
  const weekday = d.toLocaleDateString(isRTL ? 'ar' : 'en-US', { timeZone: booking.clientTimezone, weekday: 'short' });

  const statusConfig: Record<string, { bg: string; text: string; border: string }> = {
    confirmed: { bg: 'bg-[#F0FAF5]', text: 'text-[#3B8A6E]', border: 'border-l-[#3B8A6E]' },
    pending_approval: { bg: 'bg-[#FFFAF0]', text: 'text-[#D49A4E]', border: 'border-l-[#D49A4E]' },
    approved: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-l-blue-500' },
    completed: { bg: 'bg-[#F0F4FF]', text: 'text-[#5B8AC4]', border: 'border-l-[#5B8AC4]' },
    cancelled: { bg: 'bg-[#FFF5F5]', text: 'text-[#C45B5B]', border: 'border-l-[#C45B5B]' },
    rescheduled: { bg: 'bg-[#FFFAF0]', text: 'text-[#D49A4E]', border: 'border-l-[#D49A4E]' },
    'no-show': { bg: 'bg-[#F5F0EB]', text: 'text-[#8E8E9F]', border: 'border-l-[#C0B8B0]' },
  };
  const sc = statusConfig[booking.status] ?? statusConfig.confirmed;

  // Countdown for upcoming bookings
  const daysUntil = !isPast ? Math.ceil((d.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0;
  const countdownText = daysUntil === 0 ? (isRTL ? 'اليوم' : 'Today')
    : daysUntil === 1 ? (isRTL ? 'غدًا' : 'Tomorrow')
    : daysUntil > 1 ? (isRTL ? `بعد ${daysUntil} أيام` : `In ${daysUntil} days`)
    : null;

  return (
    <div className={`bg-white rounded-xl border border-[#F0ECE8] border-l-[3px] ${sc.border} overflow-hidden`}>
      <div className="flex">
        {/* Date block */}
        <div className="w-16 shrink-0 flex flex-col items-center justify-center py-3 bg-[#FEFCFA]">
          <span className="text-lg font-bold text-[#7A3B5E] leading-none">{dayNum}</span>
          <span className="text-[10px] font-medium text-[#8E8E9F] mt-0.5">{monthAbbr}</span>
        </div>

        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-[#4A4A5C] truncate">{booking.serviceName || booking.serviceSlug}</p>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${sc.bg} ${sc.text}`}>
              {booking.status?.replace('_', ' ')}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8E8E9F]">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{weekday} {timeStr}</span>
            <span className="flex items-center gap-1">
              {booking.sessionMode === 'online' ? <Video className="w-3 h-3" /> : <Building2 className="w-3 h-3" />}
              {booking.sessionMode === 'online' ? (isRTL ? 'أونلاين' : 'Online') : (isRTL ? 'شخصياً' : 'In-Person')}
            </span>
            {countdownText && !isPast && (
              <span className="text-[#7A3B5E] font-medium">{countdownText}</span>
            )}
          </div>

          {/* Actions */}
          {(!isPast && booking.status === 'confirmed' && booking.manageToken) && (
            <div className="mt-2 flex items-center gap-3">
              <a href={`/${locale}/book/manage?token=${booking.manageToken}`} className="text-xs text-[#7A3B5E] font-medium hover:underline flex items-center gap-1">
                <ExternalLink className="w-3 h-3" />
                {isRTL ? 'إدارة' : 'Manage'}
              </a>
            </div>
          )}
          {isPast && booking.status === 'completed' && (
            <div className="mt-2">
              <a href={`/${locale}/book?service=${booking.serviceSlug}`} className="text-xs text-[#7A3B5E] font-medium hover:underline flex items-center gap-1">
                <RefreshCw className="w-3 h-3" />
                {isRTL ? 'احجز مرة أخرى' : 'Book Again'}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ isRTL, message, locale, type }: { isRTL: boolean; message: string; locale: string; type?: 'upcoming' | 'history' | 'receipts' }) {
  const subtitles: Record<string, { en: string; ar: string }> = {
    upcoming: { en: 'Your next session is just a booking away.', ar: 'جلستك القادمة على بعد حجز واحد.' },
    history: { en: 'Your journey hasn\'t started yet.', ar: 'رحلتك لم تبدأ بعد.' },
    receipts: { en: 'Receipts will appear here after your first paid session.', ar: 'ستظهر الإيصالات هنا بعد أول جلسة مدفوعة.' },
  };
  const sub = type ? subtitles[type] : null;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
      <div className="w-14 h-14 rounded-2xl bg-[#7A3B5E]/5 flex items-center justify-center mx-auto mb-4">
        {type === 'receipts' ? <FileText className="w-7 h-7 text-[#C8A97D]" /> : <Calendar className="w-7 h-7 text-[#C8A97D]" />}
      </div>
      <p className="text-sm font-medium text-[#4A4A5C] mb-1">{message}</p>
      {sub && <p className="text-xs text-[#8E8E9F] mb-5">{isRTL ? sub.ar : sub.en}</p>}
      {type !== 'receipts' && (
        <a href={`/${locale}/book`} className="inline-block px-6 py-2.5 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-all">
          {isRTL ? 'احجز جلسة' : 'Book a Session'}
        </a>
      )}
    </motion.div>
  );
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center"><Loader2 className="w-8 h-8 text-[#C8A97D] animate-spin" /></div>}>
      <AccountInner />
    </Suspense>
  );
}
