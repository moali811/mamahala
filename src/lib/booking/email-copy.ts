/* ================================================================
   Booking Email Copy — Localized Strings
   ================================================================
   Centralized EN/AR translations for client-facing booking emails.
   Admin notifications stay English (admin reads English). Emails
   branch on `booking.preferredLanguage` captured during the wizard.

   Adding a new key: add it to both `en` and `ar` so the caller
   never has to do a fallback-or-missing dance. If the Arabic
   translation is pending, use the English string as a placeholder
   rather than leaving the key undefined.
   ================================================================ */

export type EmailLocale = 'en' | 'ar';

export interface BookingEmailCopy {
  // Generic
  greetingPrefix: (firstName: string) => string;
  needHelp: string;
  whatsappUs: string;
  bookingIdLabel: string;

  // Session details card
  labels: {
    service: string;
    dateTime: string;
    duration: string;
    mode: string;
    minutes: (n: number) => string;
    modeOnline: string;
    modeInPerson: string;
  };

  // Confirmation email (pending approval + approved flavors)
  confirmation: {
    subjectPending: (serviceName: string) => string;
    subjectApproved: (serviceName: string) => string;
    headingPending: string;
    headingApproved: string;
    statusTextPending: string;
    statusTextApproved: string;
    pendingBannerHeading: string;
    step1: string;
    step2: string;
    step3: string;
    tipsHeading: string;
    meetHeading: string;
    meetHint: string;
    meetCta: string;
    addToCalendar: string;
    manageViewCancel: string;
    manageReschedule: string;
  };

  // Session locked-in email (post-payment)
  lockedIn: {
    subject: (serviceName: string) => string;
    heading: string;
    body: string;
    meetHeading: string;
    meetHint: string;
    meetCta: string;
    officeHeading: string;
    officeBody: string;
    onlineFallback: string;
    tipsHeading: string;
    addToCalendar: string;
    manageReschedule: string;
    needAnything: string;
  };
}

const en: BookingEmailCopy = {
  greetingPrefix: (firstName: string) => `Hi ${firstName},`,
  needHelp: 'Need help?',
  whatsappUs: 'WhatsApp us',
  bookingIdLabel: 'Booking ID',

  labels: {
    service: 'Service',
    dateTime: 'Date & Time',
    duration: 'Duration',
    mode: 'Mode',
    minutes: (n: number) => `${n} minutes`,
    modeOnline: 'Online / Video Call',
    modeInPerson: 'In-Person — Ottawa',
  },

  confirmation: {
    subjectPending: (s) => `Request received — ${s}`,
    subjectApproved: (s) => `Your session is confirmed — ${s}`,
    headingPending: 'Your Request Has Been Received',
    headingApproved: 'Your Session is Confirmed',
    statusTextPending:
      'Thank you for reaching out. We will review your request and confirm within a few hours.',
    statusTextApproved: 'Your counseling session has been confirmed. Here are the details:',
    pendingBannerHeading: 'What Happens Next?',
    step1: '<strong>Our team reviews your request</strong> — usually within 4 hours',
    step2: '<strong>You receive an invoice</strong> with payment details',
    step3:
      '<strong>Complete payment</strong> — your session is confirmed and a calendar invite is sent',
    tipsHeading: 'Prepare for Your Session',
    meetHeading: 'Join Online Session',
    meetHint: 'Your Google Meet link is ready. Use it when the session starts.',
    meetCta: 'Open Google Meet',
    addToCalendar: 'Add to Calendar',
    manageViewCancel: 'View or Cancel Request',
    manageReschedule: 'Reschedule or Cancel',
  },

  lockedIn: {
    subject: (s) => `Your session is locked in — ${s}`,
    heading: 'Your Session is Confirmed & Paid',
    body:
      'Thank you! Your payment has been received and your counseling session is locked in. Here are the details:',
    meetHeading: 'Your Google Meet Link',
    meetHint: "Bookmark this link now — you'll use it to join your session.",
    meetCta: 'Open Google Meet',
    officeHeading: 'Office Location',
    officeBody:
      '430 Hazeldean Rd, Ottawa, ON K2L 1E8 — Canada. Please arrive 5 minutes early.',
    onlineFallback:
      'Your video call link will be shared via email and calendar invite before the session.',
    tipsHeading: 'Prepare for Your Session',
    addToCalendar: 'Add to Your Calendar',
    manageReschedule: 'Reschedule or Cancel',
    needAnything: 'Need anything before your session?',
  },
};

const ar: BookingEmailCopy = {
  greetingPrefix: (firstName: string) => `أهلاً ${firstName}،`,
  needHelp: 'تحتاج مساعدة؟',
  whatsappUs: 'تواصل معنا عبر واتساب',
  bookingIdLabel: 'رقم الحجز',

  labels: {
    service: 'الخدمة',
    dateTime: 'التاريخ والوقت',
    duration: 'المدّة',
    mode: 'صيغة الجلسة',
    minutes: (n: number) => `${n} دقيقة`,
    modeOnline: 'أونلاين / مكالمة فيديو',
    modeInPerson: 'حضوريًا — أوتاوا',
  },

  confirmation: {
    subjectPending: (s) => `تم استلام طلبك — ${s}`,
    subjectApproved: (s) => `تم تأكيد جلستك — ${s}`,
    headingPending: 'تم استلام طلبك',
    headingApproved: 'تم تأكيد جلستك',
    statusTextPending:
      'شكرًا لتواصلك معنا. سنراجع طلبك ونؤكّده خلال ساعات قليلة.',
    statusTextApproved: 'تم تأكيد جلستك الاستشاريّة. إليك التفاصيل:',
    pendingBannerHeading: 'الخطوات التالية',
    step1: '<strong>فريقنا يراجع طلبك</strong> — عادةً خلال 4 ساعات',
    step2: '<strong>ستصلك فاتورة</strong> بتفاصيل الدفع',
    step3:
      '<strong>أكمل الدفع</strong> — يتم تأكيد جلستك وإرسال دعوة إلى تقويمك',
    tipsHeading: 'نصائح للتحضير لجلستك',
    meetHeading: 'الانضمام إلى الجلسة أونلاين',
    meetHint: 'رابط Google Meet جاهز. استخدمه عند بدء الجلسة.',
    meetCta: 'فتح Google Meet',
    addToCalendar: 'أضف إلى التقويم',
    manageViewCancel: 'عرض أو إلغاء الطلب',
    manageReschedule: 'إعادة جدولة أو إلغاء',
  },

  lockedIn: {
    subject: (s) => `تم تأكيد جلستك — ${s}`,
    heading: 'تم تأكيد جلستك ودَفعها',
    body:
      'شكرًا لك! استلمنا دفعتك وجلستك الاستشاريّة مؤكَّدة. إليك التفاصيل:',
    meetHeading: 'رابط Google Meet الخاص بك',
    meetHint: 'احفظ هذا الرابط الآن — ستستخدمه للانضمام إلى جلستك.',
    meetCta: 'فتح Google Meet',
    officeHeading: 'موقع العيادة',
    officeBody:
      '430 Hazeldean Rd, Ottawa, ON K2L 1E8 — كندا. يُرجى الحضور قبل 5 دقائق من الموعد.',
    onlineFallback:
      'سيتم إرسال رابط مكالمة الفيديو عبر البريد الإلكتروني ودعوة التقويم قبل الجلسة.',
    tipsHeading: 'نصائح للتحضير لجلستك',
    addToCalendar: 'أضف إلى تقويمك',
    manageReschedule: 'إعادة جدولة أو إلغاء',
    needAnything: 'تحتاج شيئًا قبل جلستك؟',
  },
};

export function emailCopy(locale: EmailLocale | undefined): BookingEmailCopy {
  return locale === 'ar' ? ar : en;
}
