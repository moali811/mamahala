'use client';

import { useParams, useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  Calendar, Clock, User, Check, X,
  Loader2, AlertCircle, RefreshCw, CheckCircle, Timer,
  Video, Building2, ExternalLink, Mail, Phone,
  Heart, BookOpen, Sparkles, ChevronRight,
} from 'lucide-react';
import type { BookingPolicy, TimeSlot } from '@/lib/booking/types';
import MonthCalendar from '@/components/booking/MonthCalendar';
import { BUSINESS } from '@/config/business';

// ─── Status badge mapping ───────────────────────────────────────

const STATUS_MAP: Record<string, { bg: string; text: string; en: string; ar: string }> = {
  pending_approval: { bg: 'bg-[#FFFAF0]', text: 'text-[#D49A4E]', en: 'Pending Approval', ar: 'بانتظار الموافقة' },
  approved: { bg: 'bg-blue-50', text: 'text-blue-600', en: 'Approved', ar: 'تمت الموافقة' },
  confirmed: { bg: 'bg-[#F0FAF5]', text: 'text-[#3B8A6E]', en: 'Confirmed', ar: 'مؤكد' },
  completed: { bg: 'bg-[#F5F0EB]', text: 'text-[#4A4A5C]', en: 'Completed', ar: 'مكتمل' },
  cancelled: { bg: 'bg-red-50', text: 'text-[#C45B5B]', en: 'Cancelled', ar: 'ملغى' },
};

// ─── Google Calendar URL helper ─────────────────────────────────

function getCalendarUrl(booking: any): string {
  const title = encodeURIComponent('Session with Dr. Hala Ali');
  const details = encodeURIComponent(
    `${booking.serviceName || booking.serviceSlug}\nBooking ID: ${booking.bookingId}`,
  );
  const location = encodeURIComponent(
    booking.sessionMode === 'online' ? 'Online' : '430 Hazeldean Rd, Ottawa, ON',
  );
  const start = booking.startTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const end = booking.endTime.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  return `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
}

// ─── Branded Header ─────────────────────────────────────────────

function BrandedHeader({ isRTL }: { isRTL: boolean }) {
  return (
    <div className="text-center mb-6">
      <Image
        src="/images/logo-256.png"
        alt="Mama Hala Consulting"
        width={40}
        height={40}
        className="mx-auto mb-2 rounded-lg"
      />
      <h1
        className="text-lg font-bold text-[#7A3B5E]"
        style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}
      >
        {isRTL ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting'}
      </h1>
      <div className="w-[60px] h-[2px] bg-[#C8A97D] mx-auto mt-2" />
    </div>
  );
}

// ─── Main Inner Component ───────────────────────────────────────

function ManageBookingInner() {
  const params = useParams();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const isRTL = locale === 'ar';
  const token = searchParams.get('token');

  const [booking, setBooking] = useState<any>(null);
  const [policy, setPolicy] = useState<BookingPolicy | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'details' | 'reschedule' | 'cancel' | 'done'>('details');
  const [doneAction, setDoneAction] = useState<'reschedule' | 'cancel' | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  // Reschedule state
  const [selectedDate, setSelectedDate] = useState('');
  const [daySlots, setDaySlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [rescheduling, setRescheduling] = useState(false);

  useEffect(() => {
    if (!token) { setError('Missing token'); setLoading(false); return; }
    fetch(`/api/book/manage?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.error) { setError(data.error); return; }
        setBooking(data.booking);
        setPolicy(data.policy);
      })
      .catch(() => setError('Failed to load booking'))
      .finally(() => setLoading(false));
  }, [token]);

  // Fetch slots when date changes (reschedule)
  useEffect(() => {
    if (!selectedDate || !booking) return;
    setLoadingSlots(true);
    fetch(`/api/book/availability?date=${selectedDate}&duration=${booking.durationMinutes}`)
      .then(r => r.json())
      .then(data => setDaySlots(data.slots ?? []))
      .catch(() => setDaySlots([]))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, booking]);

  const handleCancel = async () => {
    setCancelling(true);
    try {
      const res = await fetch('/api/book/cancel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, reason: cancelReason }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setDoneAction('cancel');
      setView('done');
    } catch { setError('Failed to cancel'); }
    finally { setCancelling(false); }
  };

  const handleReschedule = async (slot: TimeSlot) => {
    setRescheduling(true);
    try {
      const res = await fetch('/api/book/reschedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newStartTime: slot.start, newEndTime: slot.end }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setDoneAction('reschedule');
      setView('done');
    } catch { setError('Failed to reschedule'); }
    finally { setRescheduling(false); }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#C8A97D] animate-spin" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="max-w-md w-full">
          <BrandedHeader isRTL={isRTL} />
          <div className="bg-white rounded-2xl p-8 text-center border border-[#F0ECE8]">
            <AlertCircle className="w-12 h-12 text-[#C45B5B] mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#4A4A5C] mb-2">{isRTL ? 'تعذر تحميل الحجز' : 'Unable to Load Booking'}</h2>
            <p className="text-sm text-[#8E8E9F]">{error || (isRTL ? 'الرابط غير صالح أو منتهي الصلاحية' : 'The link is invalid or expired')}</p>
          </div>
        </div>
      </div>
    );
  }

  const dateStr = new Date(booking.startTime).toLocaleDateString(isRTL ? 'ar' : 'en-US', {
    timeZone: booking.clientTimezone, weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  });
  const timeStr = new Date(booking.startTime).toLocaleTimeString(isRTL ? 'ar' : 'en-US', {
    timeZone: booking.clientTimezone, hour: 'numeric', minute: '2-digit',
  });

  const status = STATUS_MAP[booking.status] || STATUS_MAP.confirmed;

  return (
    <div className="min-h-screen bg-[#FAF7F2] py-10 px-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-lg mx-auto">
        <BrandedHeader isRTL={isRTL} />

        <div className="space-y-5">
          {view === 'done' ? (
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-5">
              {/* Status card */}
              <div className="bg-white rounded-2xl p-8 border border-[#F0ECE8] text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.1 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    doneAction === 'reschedule' ? 'bg-[#3B8A6E]/10' : 'bg-[#8E8E9F]/10'
                  }`}
                >
                  {doneAction === 'reschedule'
                    ? <RefreshCw className="w-8 h-8 text-[#3B8A6E]" />
                    : <X className="w-7 h-7 text-[#8E8E9F]" />
                  }
                </motion.div>
                <h2 className="text-xl font-bold text-[#4A4A5C] mb-1" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                  {doneAction === 'reschedule'
                    ? (isRTL ? 'تمت إعادة الجدولة بنجاح!' : 'Successfully Rescheduled!')
                    : (isRTL ? 'تم إلغاء الحجز' : 'Booking Cancelled')}
                </h2>
                <p className="text-sm text-[#8E8E9F] mb-5">
                  {doneAction === 'reschedule'
                    ? (isRTL ? 'تم تحديث موعدك وإرسال التأكيد إلى بريدك الإلكتروني.' : 'Your appointment has been updated and a confirmation sent to your email.')
                    : (isRTL ? 'تم إرسال تأكيد الإلغاء إلى بريدك الإلكتروني.' : 'A cancellation confirmation has been sent to your email.')}
                </p>
                <a
                  href={`/${locale}/book`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#7A3B5E] text-white text-sm font-semibold hover:bg-[#6A2E4E] transition-all"
                >
                  <Calendar className="w-4 h-4" />
                  {isRTL ? 'حجز جلسة جديدة' : 'Book a New Session'}
                </a>
              </div>

              {/* Warm encouragement card */}
              {doneAction === 'cancel' && (
                <div className="bg-gradient-to-br from-[#7A3B5E]/5 to-[#C8A97D]/8 rounded-2xl p-6 border border-[#C8A97D]/15 text-center">
                  <p className="text-sm text-[#4A4A5C] leading-relaxed">
                    {isRTL
                      ? 'نأملُ أن نراكَ قريبًا. تذكّرْ أنّ الاهتمامَ بنفسِكَ ليسَ ترفًا — بل هو ضرورة.'
                      : "We hope to see you soon. Remember, taking care of yourself isn't a luxury — it's a necessity."}
                  </p>
                </div>
              )}

              {/* Engagement links */}
              <div className="space-y-2">
                <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] px-1">
                  {isRTL ? 'في الأثناء' : 'In the meantime'}
                </p>
                <a href={`/${locale}/resources/assessments`} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 transition-all group">
                  <Heart className="w-4 h-4 text-[#7A3B5E] shrink-0" />
                  <span className="text-sm text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">{isRTL ? 'تقييم ذاتي سريع' : 'Take a Quick Self Check-in'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 text-[#C0B8B0] ml-auto shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
                <a href={`/${locale}/resources/downloads`} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 transition-all group">
                  <BookOpen className="w-4 h-4 text-[#C8A97D] shrink-0" />
                  <span className="text-sm text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">{isRTL ? 'موارد مجانية' : 'Explore Free Resources'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 text-[#C0B8B0] ml-auto shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
                <a href={`/${locale}/resources/blog`} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 transition-all group">
                  <Sparkles className="w-4 h-4 text-[#C4878A] shrink-0" />
                  <span className="text-sm text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">{isRTL ? 'اقرأ من مدوّنتنا' : 'Read Our Blog'}</span>
                  <ChevronRight className={`w-3.5 h-3.5 text-[#C0B8B0] ml-auto shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                </a>
              </div>
            </motion.div>
          ) : (
            <>
              {/* Booking Summary Card */}
              <div className="bg-white rounded-2xl p-6 border border-[#F0ECE8]">
                {/* Status badge */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-[#4A4A5C]" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                    {isRTL ? 'تفاصيل الحجز' : 'Booking Details'}
                  </h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}>
                    {isRTL ? status.ar : status.en}
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#C8A97D] shrink-0" />
                    <span className="text-[#4A4A5C]">{booking.serviceName || booking.serviceSlug}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#C8A97D] shrink-0" />
                    <span className="text-[#4A4A5C]">{dateStr} {isRTL ? 'الساعة' : 'at'} {timeStr}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-[#C8A97D] shrink-0" />
                    <span className="text-[#4A4A5C]">{booking.clientName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {booking.sessionMode === 'online' ? <Video className="w-4 h-4 text-[#C8A97D] shrink-0" /> : <Building2 className="w-4 h-4 text-[#C8A97D] shrink-0" />}
                    <span className="text-[#4A4A5C]">{booking.sessionMode === 'online' ? (isRTL ? 'عبر الإنترنت' : 'Online') : (isRTL ? 'شخصياً' : 'In-Person')}</span>
                  </div>
                </div>

                {/* Add to Calendar link */}
                <div className="mt-4 pt-3 border-t border-[#F0ECE8]">
                  <a
                    href={getCalendarUrl(booking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#7A3B5E] hover:text-[#5E2D48] transition-colors"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {isRTL ? 'أضف إلى التقويم' : 'Add to Calendar'}
                  </a>
                </div>

                {/* Policy message */}
                {policy && (
                  <div className={`mt-3 p-3 rounded-lg text-xs flex items-start gap-2 ${
                    policy.feePercent === 0 ? 'bg-[#F0FAF5] text-[#3B8A6E]' :
                    policy.feePercent < 1 ? 'bg-[#FFFAF0] text-[#D49A4E]' :
                    'bg-[#FFF5F5] text-[#C45B5B]'
                  }`}>
                    {policy.feePercent === 0
                      ? <CheckCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      : <Timer className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                    }
                    <span>{isRTL ? policy.messageAr : policy.message}</span>
                  </div>
                )}
              </div>

              {/* Session Prep Tips */}
              {booking.prepTips?.length > 0 && view === 'details' && (
                <div className="bg-[#FFFAF5] rounded-xl p-4 border-l-[3px] border-[#C8A97D]" style={{ borderLeftStyle: 'solid' }}>
                  <p className="text-xs font-semibold text-[#7A3B5E] mb-2">
                    {isRTL ? 'استعد لجلستك' : 'Prepare for Your Session'}
                  </p>
                  {booking.prepTips.map((tip: string, i: number) => (
                    <p key={i} className="text-xs text-[#4A4A5C] mb-1">&#8226; {tip}</p>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              {view === 'details' && (
                <div className="flex gap-3">
                  {policy?.canReschedule && (
                    <button
                      onClick={() => setView('reschedule')}
                      className="flex-1 py-3 rounded-xl bg-white border border-[#E8E0D8] text-sm font-semibold text-[#4A4A5C] hover:bg-[#F5F0EB] transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      {isRTL ? 'إعادة جدولة' : 'Reschedule'}
                    </button>
                  )}
                  {policy?.canCancel && (
                    <button
                      onClick={() => setView('cancel')}
                      className="flex-1 py-3 rounded-xl bg-white border border-[#E8E0D8] text-sm font-semibold text-[#C45B5B] hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      {isRTL ? 'إلغاء' : 'Cancel'}
                    </button>
                  )}
                </div>
              )}

              {/* Reschedule View — Month Calendar */}
              {view === 'reschedule' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-[#4A4A5C]">{isRTL ? 'اختر وقتاً جديداً' : 'Pick a New Time'}</h3>
                    <button onClick={() => { setView('details'); setSelectedDate(''); setDaySlots([]); }} className="text-xs text-[#8E8E9F] hover:text-[#7A3B5E] underline">
                      {isRTL ? 'تراجع' : 'Go Back'}
                    </button>
                  </div>

                  <MonthCalendar
                    duration={booking.durationMinutes}
                    onSelectDate={setSelectedDate}
                    selectedDate={selectedDate}
                    isRTL={isRTL}
                  />

                  {/* Time slots for selected date */}
                  {selectedDate && (
                    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-5 border border-[#F0ECE8]">
                      <p className="text-xs font-medium text-[#8E8E9F] mb-3">
                        {isRTL ? 'الأوقات المتاحة' : 'Available times'}
                      </p>
                      {loadingSlots ? (
                        <Loader2 className="w-5 h-5 text-[#C8A97D] animate-spin mx-auto" />
                      ) : daySlots.filter(s => s.available).length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {daySlots.filter(s => s.available).map(slot => (
                            <button
                              key={slot.start}
                              onClick={() => handleReschedule(slot)}
                              disabled={rescheduling}
                              className="px-4 py-2 rounded-lg bg-[#F5F0EB] text-sm text-[#4A4A5C] font-medium hover:bg-[#7A3B5E] hover:text-white disabled:opacity-50 transition-all"
                            >
                              {new Date(slot.start).toLocaleTimeString(isRTL ? 'ar' : 'en-US', { timeZone: booking.clientTimezone, hour: 'numeric', minute: '2-digit' })}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#8E8E9F] text-center">
                          {isRTL ? 'لا توجد أوقات متاحة في هذا اليوم.' : 'No available times on this day.'}
                        </p>
                      )}
                    </motion.div>
                  )}
                </div>
              )}

              {/* Cancel View */}
              {view === 'cancel' && (
                <div className="bg-white rounded-2xl p-6 border border-[#F0ECE8] space-y-4">
                  <h3 className="font-semibold text-[#4A4A5C]">{isRTL ? 'هل أنت متأكد؟' : 'Are you sure?'}</h3>
                  <textarea
                    value={cancelReason}
                    onChange={e => setCancelReason(e.target.value)}
                    placeholder={isRTL ? 'سبب الإلغاء (اختياري)...' : 'Reason for cancellation (optional)...'}
                    rows={3}
                    className="w-full px-4 py-2.5 rounded-lg border border-[#E8E0D8] text-sm resize-none focus:outline-none focus:border-[#7A3B5E] focus:ring-1 focus:ring-[#7A3B5E]/20"
                  />
                  <div className="flex gap-3">
                    <button onClick={() => setView('details')} className="flex-1 py-2.5 rounded-xl bg-[#F5F0EB] text-sm font-semibold text-[#4A4A5C]">
                      {isRTL ? 'تراجع' : 'Go Back'}
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={cancelling}
                      className="flex-1 py-2.5 rounded-xl bg-[#C45B5B] text-white text-sm font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {cancelling ? <Loader2 className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
                      {isRTL ? 'تأكيد الإلغاء' : 'Confirm Cancel'}
                    </button>
                  </div>
                </div>
              )}

              {/* ─── While You Wait — Strategic Engagement Section ─── */}
              {view === 'details' && (
                <div className="space-y-3">
                  <p className="text-[10px] font-semibold text-[#C8A97D] uppercase tracking-[0.15em] px-1">
                    {isRTL ? 'أثناء الانتظار' : 'While You Wait'}
                  </p>

                  {/* Quick Self Check-in */}
                  <a
                    href={`/${locale}/resources/assessments`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#7A3B5E]/8 flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 text-[#7A3B5E]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">
                        {isRTL ? 'تقييم ذاتي سريع' : 'Take a Quick Self Check-in'}
                      </p>
                      <p className="text-xs text-[#8E8E9F] mt-0.5">
                        {isRTL ? 'ساعد د. هالة على فهمك بشكل أفضل قبل الجلسة' : 'Help Dr. Hala understand you better before your session'}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[#C0B8B0] group-hover:text-[#7A3B5E] transition-colors shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>

                  {/* Free Resources */}
                  <a
                    href={`/${locale}/resources/downloads`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C8A97D]/10 flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5 text-[#C8A97D]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">
                        {isRTL ? 'استكشف مواردنا المجانية' : 'Explore Free Resources'}
                      </p>
                      <p className="text-xs text-[#8E8E9F] mt-0.5">
                        {isRTL ? 'أدوات ونصائح عملية يمكنك البدء بها الآن' : 'Practical tools and tips you can start using today'}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[#C0B8B0] group-hover:text-[#7A3B5E] transition-colors shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>

                  {/* Blog */}
                  <a
                    href={`/${locale}/resources/blog`}
                    className="flex items-center gap-3 p-4 bg-white rounded-xl border border-[#F0ECE8] hover:border-[#C8A97D]/40 hover:shadow-sm transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#C4878A]/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-[#C4878A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#4A4A5C] group-hover:text-[#7A3B5E] transition-colors">
                        {isRTL ? 'اقرأ من مدوّنتنا' : 'Read Our Blog'}
                      </p>
                      <p className="text-xs text-[#8E8E9F] mt-0.5">
                        {isRTL ? 'مقالات من د. هالة عن النمو الشخصي والعلاقات' : 'Articles from Dr. Hala on growth, relationships & wellbeing'}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[#C0B8B0] group-hover:text-[#7A3B5E] transition-colors shrink-0 ${isRTL ? 'rotate-180' : ''}`} />
                  </a>

                  {/* Contact */}
                  <div className="bg-white rounded-xl p-4 border border-[#F0ECE8]">
                    <p className="text-xs text-[#8E8E9F] mb-2">{isRTL ? 'تحتاج مساعدة؟' : 'Need help?'}</p>
                    <div className="flex items-center gap-4">
                      <a href={BUSINESS.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-[#7A3B5E] hover:underline">
                        <Phone className="w-3 h-3" />
                        WhatsApp
                      </a>
                      <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-1.5 text-xs font-medium text-[#7A3B5E] hover:underline">
                        <Mail className="w-3 h-3" />
                        {BUSINESS.email}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {error && view !== 'done' && (
            <div className="p-3 rounded-xl bg-red-50 text-sm text-red-700">{error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ManageBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center"><Loader2 className="w-8 h-8 text-[#C8A97D] animate-spin" /></div>}>
      <ManageBookingInner />
    </Suspense>
  );
}
