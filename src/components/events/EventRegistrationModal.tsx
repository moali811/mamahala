'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, CalendarDays, Clock, MapPin, Loader2, AlertCircle, UserPlus } from 'lucide-react';
import type { SmartEvent } from '@/types';
import Badge from '@/components/ui/Badge';
import AddToCalendar from './AddToCalendar';
import { getFormattedDate, getFormattedTime, getFormattedPrice } from '@/data/events';

interface Props {
  event: SmartEvent;
  locale: string;
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'submitting' | 'success' | 'duplicate' | 'full' | 'error';

export default function EventRegistrationModal({ event, locale, isOpen, onClose }: Props) {
  const isRTL = locale === 'ar';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [registrationId, setRegistrationId] = useState('');
  const [spotsLeft, setSpotsLeft] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  const title = isRTL ? event.titleAr : event.titleEn;
  const location = isRTL ? event.locationNameAr : event.locationNameEn;
  const price = getFormattedPrice(event, isRTL);
  const formattedDate = getFormattedDate(event, locale);
  const formattedTime = getFormattedTime(event, locale);
  const showPhone = event.registrationFields?.phone ?? false;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;

    setStatus('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: event.slug,
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          locale,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setRegistrationId(data.registrationId);
        setSpotsLeft(data.spotsRemaining);
        setStatus(data.waitlisted ? 'full' : 'success');
      } else if (data.error === 'ALREADY_REGISTERED') {
        setStatus('duplicate');
      } else if (data.error === 'EVENT_FULL') {
        setStatus('full');
      } else {
        setErrorMsg(data.message || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStatus('idle');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setErrorMsg('');
    }, 300);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#2D2A33]/40 backdrop-blur-sm"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden max-h-[90vh] overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-[#F3EFE8] flex items-center justify-center text-[#8E8E9F] hover:text-[#2D2A33] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Event Summary Header */}
            <div className="bg-gradient-to-br from-[#7A3B5E]/[0.05] via-[#C4878A]/[0.06] to-[#C8A97D]/[0.04] px-6 pt-6 pb-5">
              <Badge variant={event.isFree ? 'success' : 'sand'} size="sm">
                {price}
              </Badge>
              <h3
                className="text-xl font-bold text-[#2D2A33] mt-3 pr-8"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {title}
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-sm text-[#4A4A5C]">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="w-3.5 h-3.5 text-[#C8A97D]" /> {formattedDate}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C8A97D]" /> {formattedTime}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A97D]" /> {location}
                </span>
              </div>
            </div>

            <div className="p-6">
              {/* ─── FORM STATE ─── */}
              {(status === 'idle' || status === 'error' || status === 'submitting') && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                        {isRTL ? 'الاسم الأول' : 'First Name'} *
                      </label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EFE8] text-[#2D2A33] placeholder:text-[#8E8E9F] focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20 transition-all text-sm"
                        placeholder={isRTL ? 'هالة' : 'Hala'}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                        {isRTL ? 'اسم العائلة' : 'Last Name'} *
                      </label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EFE8] text-[#2D2A33] placeholder:text-[#8E8E9F] focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20 transition-all text-sm"
                        placeholder={isRTL ? 'علي' : 'Ali'}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                      {isRTL ? 'البريد الإلكتروني' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EFE8] text-[#2D2A33] placeholder:text-[#8E8E9F] focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20 transition-all text-sm"
                      placeholder="email@example.com"
                    />
                  </div>

                  {showPhone && (
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A5C] mb-1.5">
                        {isRTL ? 'رقم الهاتف' : 'Phone'} <span className="text-[#8E8E9F] font-normal">({isRTL ? 'اختياري' : 'optional'})</span>
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#F3EFE8] text-[#2D2A33] placeholder:text-[#8E8E9F] focus:outline-none focus:border-[#C4878A] focus:ring-2 focus:ring-[#C4878A]/20 transition-all text-sm"
                        placeholder="+1 (613) 222-2104"
                      />
                    </div>
                  )}

                  {status === 'error' && errorMsg && (
                    <div className="flex items-center gap-2 text-sm text-[#C45B5B] bg-[#C45B5B]/5 px-3 py-2 rounded-lg">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-3 rounded-xl bg-[#7A3B5E] text-white font-semibold text-sm hover:bg-[#5E2D48] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {isRTL ? 'جاري التسجيل...' : 'Registering...'}
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        {event.dateTBD
                          ? (isRTL ? 'أنا مهتمّ' : "I'm Interested")
                          : event.isFree
                            ? (isRTL ? 'سجّل الآن — مجاناً' : "Register — It's Free")
                            : (isRTL ? `سجّل الآن — ${price}` : `Register — ${price}`)}
                      </>
                    )}
                  </button>

                  <p className="text-xs text-center text-[#8E8E9F]">
                    {event.dateTBD
                      ? (isRTL ? 'سنتواصل معك فور تأكيد الموعد والتفاصيل.' : "We'll contact you once the date is confirmed and details are finalized.")
                      : event.isFree
                        ? (isRTL ? 'ستتلقى تأكيداً بالبريد الإلكتروني مع جميع التفاصيل.' : "You'll receive a confirmation email with all the details.")
                        : (isRTL ? 'سجّل الآن وستتلقى رابط الدفع بالبريد الإلكتروني.' : "Register now and you'll receive a payment link by email.")}
                  </p>
                </form>
              )}

              {/* ─── SUCCESS STATE ─── */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <motion.div
                    className="w-16 h-16 rounded-full bg-[#3B8A6E]/10 flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <Check className="w-8 h-8 text-[#3B8A6E]" />
                  </motion.div>

                  <h3
                    className="text-2xl font-bold text-[#2D2A33] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? 'تم تسجيلك بنجاح!' : "You're Registered!"}
                  </h3>
                  <p className="text-[#4A4A5C] mb-1">
                    {isRTL ? 'تحقق من بريدك الإلكتروني للتأكيد.' : 'Check your email for confirmation.'}
                  </p>
                  <p className="text-xs text-[#8E8E9F] mb-6">ID: {registrationId}</p>

                  {spotsLeft !== null && spotsLeft > 0 && (
                    <p className="text-sm text-[#C8A97D] mb-4">
                      {isRTL
                        ? `${new Intl.NumberFormat('ar-SA').format(spotsLeft)} أماكن متبقية`
                        : `${spotsLeft} spots remaining`}
                    </p>
                  )}

                  <div className="flex justify-center mb-4">
                    <AddToCalendar event={event} locale={locale} />
                  </div>

                  <button
                    onClick={handleClose}
                    className="text-sm text-[#7A3B5E] hover:text-[#5E2D48] font-medium"
                  >
                    {isRTL ? 'إغلاق' : 'Close'}
                  </button>
                </motion.div>
              )}

              {/* ─── DUPLICATE STATE ─── */}
              {status === 'duplicate' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C8A97D]/10 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-[#C8A97D]" />
                  </div>
                  <h3
                    className="text-xl font-bold text-[#2D2A33] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? 'أنت مسجل بالفعل!' : "You're Already Registered!"}
                  </h3>
                  <p className="text-[#4A4A5C] mb-6">
                    {isRTL
                      ? 'تحقق من بريدك الإلكتروني للتأكيد الأصلي.'
                      : 'Check your email for the original confirmation.'}
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-sm text-[#7A3B5E] hover:text-[#5E2D48] font-medium"
                  >
                    {isRTL ? 'إغلاق' : 'Close'}
                  </button>
                </motion.div>
              )}

              {/* ─── WAITLIST STATE ─── */}
              {status === 'full' && registrationId && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-[#D49A4E]/10 flex items-center justify-center mx-auto mb-4">
                    <CalendarDays className="w-8 h-8 text-[#D49A4E]" />
                  </div>
                  <h3
                    className="text-xl font-bold text-[#2D2A33] mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {isRTL ? 'أنت على قائمة الانتظار' : "You're on the Waitlist"}
                  </h3>
                  <p className="text-[#4A4A5C] mb-6">
                    {isRTL
                      ? 'سنبلغك فور توفر مكان. تحقق من بريدك الإلكتروني.'
                      : "We'll notify you if a spot opens up. Check your email."}
                  </p>
                  <button
                    onClick={handleClose}
                    className="text-sm text-[#7A3B5E] hover:text-[#5E2D48] font-medium"
                  >
                    {isRTL ? 'إغلاق' : 'Close'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
