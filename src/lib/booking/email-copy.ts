/* ================================================================
   Booking Email Copy — Localized Strings
   ================================================================
   Centralized EN/AR translations for every client-facing booking
   email. Admin notifications stay English (admins read English).
   Emails branch on `booking.preferredLanguage` captured during the
   wizard; see /[locale]/book/page.tsx where preferredLanguage is
   strictly tied to the site locale the client was browsing.

   Adding a new key: add it to both `en` and `ar` so callers never
   have to do a fallback-or-missing dance. If the Arabic translation
   is pending, use the English string as a placeholder rather than
   leaving the key undefined.
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

  // 1. Confirmation email (pending approval + approved flavors)
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

  // 2. "Approved" notification (admin clicked Approve) — before invoice
  approved: {
    subject: (serviceName: string) => string;
    heading: (firstName: string) => string;
    body: (serviceName: string, dateTime: string) => string;
    invoiceNote: string;
    meetHeading: string;
    meetHint: string;
    meetCta: string;
    onlineFallback: string;
  };

  // 3. Session locked-in email (post-payment)
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

  // 4. Payment confirmation email
  payment: {
    subject: (serviceName: string, dateTime: string) => string;
    heading: string;
    body: string;
    meetCta: string;
    addToCalendar: string;
    manageBooking: string;
  };

  // 5. 24-hour reminder
  reminder24h: {
    subject: string;
    heading: string;
    body: (timeStr: string) => string;
    meetHeading: string;
    meetHint: string;
    meetCta: string;
    addToCalendar: string;
    needReschedule: string;
    questions: string;
  };

  // 6. 1-hour reminder
  reminder1h: {
    subject: string;
    heading: string;
    intro: string;
    modeOnline: string;
    modeInPerson: string;
    encouragement: string;
    readyToJoin: string;
    activeNow: string;
    joinCta: string;
    urgentContact: string;
  };

  // 7. Reschedule email
  reschedule: {
    subject: string;
    heading: string;
    intro: string;
    previousTime: string;
    newTime: string;
    updateCalendar: string;
    manageBooking: string;
  };

  // 8. Cancellation email
  cancellation: {
    subject: string;
    heading: string;
    body: (dateTime: string) => string;
    reasonPrefix: string;
    note: string;
    bookNew: string;
    questions: string;
  };

  // 9. Post-session follow-up
  followUp: {
    subject: (serviceName: string) => string;
    heading: (firstName: string) => string;
    thanks: string;
    care: string;
    signoff: string;
    whatsNext: string;
    bookNextTitle: string;
    bookNextBody: string;
    reflectTitle: string;
    reflectBody: string;
    selfCareTitle: string;
    selfCareBody: string;
    bookNextCta: string;
    viewAccount: string;
    contact: string;
  };

  // 10. Admin → client status change: Confirmed
  statusConfirmed: {
    subject: (serviceName: string, dateTime: string) => string;
    heading: string;
    body: (serviceName: string) => string;
    meetHeading: string;
    meetHint: string;
    meetCta: string;
    onlineFallback: string;
    addToCalendar: string;
    manageBooking: string;
    questions: string;
  };

  // 11. Admin → client status change: Completed
  statusCompleted: {
    subject: (firstName: string) => string;
    heading: string;
    body: (serviceName: string) => string;
    note: string;
    bookNext: string;
    questions: string;
  };

  // 12. Admin → client status change: No-Show
  statusNoShow: {
    subject: (serviceName: string) => string;
    heading: string;
    body: (serviceName: string, dateTime: string) => string;
    note: string;
    reschedule: string;
    contact: string;
  };
}

const en: BookingEmailCopy = {
  greetingPrefix: (firstName) => `Hi ${firstName},`,
  needHelp: 'Need help?',
  whatsappUs: 'WhatsApp us',
  bookingIdLabel: 'Booking ID',

  labels: {
    service: 'Service',
    dateTime: 'Date & Time',
    duration: 'Duration',
    mode: 'Mode',
    minutes: (n) => `${n} minutes`,
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

  approved: {
    subject: (s) => `Great news — your ${s} session is approved!`,
    heading: (firstName) => `Good News, ${firstName}!`,
    body: (s, dt) =>
      `Your session request for <strong>${s}</strong> on <strong>${dt}</strong> has been approved.`,
    invoiceNote:
      'You will receive an invoice with payment details shortly. Once payment is complete, your session is fully confirmed.',
    meetHeading: 'Your Google Meet Link',
    meetHint: 'This link will be active when your session starts.',
    meetCta: 'Open Google Meet',
    onlineFallback:
      'Your video call link will be shared before the session via email and calendar invite.',
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

  payment: {
    subject: (s, dt) => `Payment confirmed — ${s} on ${dt}`,
    heading: 'Payment Received — Session Confirmed!',
    body:
      "Thank you for your payment. Your session is now fully confirmed and we're looking forward to meeting you.",
    meetCta: 'Join via Google Meet',
    addToCalendar: 'Add to Calendar',
    manageBooking: 'Manage Booking',
  },

  reminder24h: {
    subject: 'Reminder: Your counseling session is tomorrow',
    heading: 'Your Session is Tomorrow',
    body: (timeStr) =>
      `This is a friendly reminder that your counseling session is tomorrow at <strong>${timeStr}</strong>.`,
    meetHeading: 'Join Online Session',
    meetHint:
      "Your Google Meet link is ready — save it now so you don't have to hunt for it tomorrow.",
    meetCta: 'Open Google Meet',
    addToCalendar: 'Add to Calendar',
    needReschedule: 'Need to Reschedule?',
    questions: 'Questions?',
  },

  reminder1h: {
    subject: 'Starting soon: Your session in 1 hour',
    heading: 'Starting Soon — 1 Hour',
    intro: 'Your counseling session starts in about 1 hour.',
    modeOnline:
      'Please make sure you are in a quiet, private space with a good internet connection.',
    modeInPerson:
      'The office is located at 430 Hazeldean Rd, Ottawa. Please arrive 5 minutes early.',
    encouragement: 'Take a few deep breaths. You are doing something wonderful for yourself.',
    readyToJoin: 'Ready to Join?',
    activeNow: 'The link is active now.',
    joinCta: 'Join Google Meet',
    urgentContact: 'Need to reach our team urgently?',
  },

  reschedule: {
    subject: 'Session rescheduled — new time confirmed',
    heading: 'Session Rescheduled',
    intro: 'Your session has been successfully rescheduled.',
    previousTime: 'Previous time',
    newTime: 'New time',
    updateCalendar: 'Update Calendar',
    manageBooking: 'Manage Booking',
  },

  cancellation: {
    subject: 'Your session has been cancelled',
    heading: 'Session Cancelled',
    body: (dt) => `Your session on <strong>${dt}</strong> has been cancelled.`,
    reasonPrefix: 'Reason:',
    note: 'We understand that plans change. Whenever you are ready, we would love to see you.',
    bookNew: 'Book a New Session',
    questions: 'Questions?',
  },

  followUp: {
    subject: (s) => `Thank you for your session — ${s}`,
    heading: (firstName) => `Thank You, ${firstName}`,
    thanks:
      'Thank you for your session today. Taking time for yourself is one of the most important investments you can make, and we are honored to be part of your journey.',
    care:
      'If anything comes up between sessions, please do not hesitate to reach out. We are here for you.',
    signoff: 'Warmly,<br/>The Mama Hala Team',
    whatsNext: "What's Next?",
    bookNextTitle: 'Book Your Next Session',
    bookNextBody:
      'Consistency is key to growth. Schedule your next session at a time that works for you.',
    reflectTitle: 'Reflect & Journal',
    reflectBody:
      "Take a few minutes to write down any insights or feelings from today's session.",
    selfCareTitle: 'Practice Self-Care',
    selfCareBody:
      'Be gentle with yourself today. Drink water, rest, and give yourself space to process.',
    bookNextCta: 'Book Next Session',
    viewAccount: 'View My Account',
    contact: 'Questions or need support?',
  },

  statusConfirmed: {
    subject: (s, dt) => `Your session is confirmed — ${s} on ${dt}`,
    heading: 'Your Session is Confirmed!',
    body: (s) =>
      `Great news — your <strong>${s}</strong> session is now confirmed. We're looking forward to meeting you.`,
    meetHeading: 'Join Online Session',
    meetHint: 'Your Google Meet link is ready.',
    meetCta: 'Open Google Meet',
    onlineFallback:
      'Your video call link will be shared before the session via email and calendar invite.',
    addToCalendar: 'Add to Calendar',
    manageBooking: 'Manage Booking',
    questions: 'Questions?',
  },

  statusCompleted: {
    subject: (firstName) => `Session complete — thank you, ${firstName}`,
    heading: 'Session Complete',
    body: (s) =>
      `Your <strong>${s}</strong> session has been marked as complete. Thank you for investing in yourself — we are honored to be part of your journey.`,
    note: 'Take a moment to reflect. Growth happens one step at a time.',
    bookNext: 'Book Next Session',
    questions: 'Questions or need support?',
  },

  statusNoShow: {
    subject: (s) => `We missed you — ${s}`,
    heading: 'We Missed You',
    body: (s, dt) =>
      `We noticed you were unable to attend your <strong>${s}</strong> session on <strong>${dt}</strong>. We hope everything is okay.`,
    note: 'Life gets busy, and we completely understand. Whenever you are ready, we would love to reschedule your session.',
    reschedule: 'Reschedule Session',
    contact: 'Need to talk?',
  },
};

const ar: BookingEmailCopy = {
  greetingPrefix: (firstName) => `أهلاً ${firstName}،`,
  needHelp: 'تحتاج مساعدة؟',
  whatsappUs: 'تواصل معنا عبر واتساب',
  bookingIdLabel: 'رقم الحجز',

  labels: {
    service: 'الخدمة',
    dateTime: 'التاريخ والوقت',
    duration: 'المدّة',
    mode: 'صيغة الجلسة',
    minutes: (n) => `${n} دقيقة`,
    modeOnline: 'أونلاين / مكالمة فيديو',
    modeInPerson: 'حضوريًا — أوتاوا',
  },

  confirmation: {
    subjectPending: (s) => `تم استلام طلبك — ${s}`,
    subjectApproved: (s) => `تم تأكيد جلستك — ${s}`,
    headingPending: 'تم استلام طلبك',
    headingApproved: 'تم تأكيد جلستك',
    statusTextPending: 'شكرًا لتواصلك معنا. سنراجع طلبك ونؤكّده خلال ساعات قليلة.',
    statusTextApproved: 'تم تأكيد جلستك الاستشاريّة. إليك التفاصيل:',
    pendingBannerHeading: 'الخطوات التالية',
    step1: '<strong>فريقنا يراجع طلبك</strong> — عادةً خلال 4 ساعات',
    step2: '<strong>ستصلك فاتورة</strong> بتفاصيل الدفع',
    step3: '<strong>أكمل الدفع</strong> — يتم تأكيد جلستك وإرسال دعوة إلى تقويمك',
    tipsHeading: 'نصائح للتحضير لجلستك',
    meetHeading: 'الانضمام إلى الجلسة أونلاين',
    meetHint: 'رابط Google Meet جاهز. استخدمه عند بدء الجلسة.',
    meetCta: 'فتح Google Meet',
    addToCalendar: 'أضف إلى التقويم',
    manageViewCancel: 'عرض أو إلغاء الطلب',
    manageReschedule: 'إعادة جدولة أو إلغاء',
  },

  approved: {
    subject: (s) => `خبر سعيد — تمّت الموافقة على جلسة ${s}!`,
    heading: (firstName) => `خبر سعيد يا ${firstName}!`,
    body: (s, dt) =>
      `تمّت الموافقة على طلبك لجلسة <strong>${s}</strong> بتاريخ <strong>${dt}</strong>.`,
    invoiceNote:
      'ستصلك فاتورة بتفاصيل الدفع قريبًا. بمجرد إتمام الدفع، تصبح جلستك مؤكَّدة بالكامل.',
    meetHeading: 'رابط Google Meet الخاص بك',
    meetHint: 'سيصبح هذا الرابط فعّالًا عند بدء جلستك.',
    meetCta: 'فتح Google Meet',
    onlineFallback:
      'سيُرسَل رابط مكالمة الفيديو قبل الجلسة عبر البريد الإلكتروني ودعوة التقويم.',
  },

  lockedIn: {
    subject: (s) => `تم تأكيد جلستك — ${s}`,
    heading: 'تم تأكيد جلستك ودَفعها',
    body: 'شكرًا لك! استلمنا دفعتك وجلستك الاستشاريّة مؤكَّدة. إليك التفاصيل:',
    meetHeading: 'رابط Google Meet الخاص بك',
    meetHint: 'احفظ هذا الرابط الآن — ستستخدمه للانضمام إلى جلستك.',
    meetCta: 'فتح Google Meet',
    officeHeading: 'موقع العيادة',
    officeBody:
      '430 Hazeldean Rd, Ottawa, ON K2L 1E8 — كندا. يُرجى الحضور قبل 5 دقائق من الموعد.',
    onlineFallback:
      'سيُرسَل رابط مكالمة الفيديو عبر البريد الإلكتروني ودعوة التقويم قبل الجلسة.',
    tipsHeading: 'نصائح للتحضير لجلستك',
    addToCalendar: 'أضف إلى تقويمك',
    manageReschedule: 'إعادة جدولة أو إلغاء',
    needAnything: 'تحتاج شيئًا قبل جلستك؟',
  },

  payment: {
    subject: (s, dt) => `تم تأكيد الدفع — ${s} بتاريخ ${dt}`,
    heading: 'تم استلام الدفع — جلستك مؤكَّدة!',
    body: 'شكرًا لك على الدفع. جلستك الآن مؤكَّدة بالكامل، ونتطلّع للقائك.',
    meetCta: 'الانضمام عبر Google Meet',
    addToCalendar: 'أضف إلى التقويم',
    manageBooking: 'إدارة الحجز',
  },

  reminder24h: {
    subject: 'تذكير: جلستك الاستشاريّة غدًا',
    heading: 'جلستك غدًا',
    body: (timeStr) => `تذكير وديّ بأنّ جلستك الاستشاريّة غدًا في الساعة <strong>${timeStr}</strong>.`,
    meetHeading: 'الانضمام إلى الجلسة أونلاين',
    meetHint: 'رابط Google Meet جاهز — احفظه الآن لتجنّب البحث عنه غدًا.',
    meetCta: 'فتح Google Meet',
    addToCalendar: 'أضف إلى التقويم',
    needReschedule: 'بحاجة لإعادة الجدولة؟',
    questions: 'أي أسئلة؟',
  },

  reminder1h: {
    subject: 'تبدأ قريبًا: جلستك بعد ساعة',
    heading: 'تبدأ قريبًا — بعد ساعة',
    intro: 'جلستك الاستشاريّة تبدأ بعد ساعة تقريبًا.',
    modeOnline:
      'يُرجى التأكّد من وجودك في مكان هادئ خاصّ بك مع اتصال إنترنت جيّد.',
    modeInPerson:
      'العيادة في 430 Hazeldean Rd, Ottawa. يُرجى الحضور قبل 5 دقائق من الموعد.',
    encouragement: 'خذ بضعة أنفاس عميقة. أنت تفعل شيئًا رائعًا لنفسك.',
    readyToJoin: 'هل أنت جاهز للانضمام؟',
    activeNow: 'الرابط فعّال الآن.',
    joinCta: 'الانضمام إلى Google Meet',
    urgentContact: 'تحتاج الوصول إلى فريقنا بشكل عاجل؟',
  },

  reschedule: {
    subject: 'تم إعادة جدولة الجلسة — الموعد الجديد مؤكَّد',
    heading: 'تم إعادة جدولة الجلسة',
    intro: 'تمّت إعادة جدولة جلستك بنجاح.',
    previousTime: 'الموعد السابق',
    newTime: 'الموعد الجديد',
    updateCalendar: 'تحديث التقويم',
    manageBooking: 'إدارة الحجز',
  },

  cancellation: {
    subject: 'تم إلغاء جلستك',
    heading: 'تم إلغاء الجلسة',
    body: (dt) => `جلستك بتاريخ <strong>${dt}</strong> قد أُلغيت.`,
    reasonPrefix: 'السبب:',
    note:
      'نتفهّم تمامًا أنّ الخطط تتغيّر. متى ما كنت مستعدًّا، يسعدنا استقبالك من جديد.',
    bookNew: 'احجز جلسة جديدة',
    questions: 'أي أسئلة؟',
  },

  followUp: {
    subject: (s) => `شكرًا على جلستك — ${s}`,
    heading: (firstName) => `شكرًا لك يا ${firstName}`,
    thanks:
      'شكرًا لك على جلستك اليوم. منحُ نفسك الوقت هو من أهمّ الاستثمارات، ويشرّفنا أن نكون جزءًا من رحلتك.',
    care:
      'إذا طرأ أي شيء بين الجلسات، لا تتردّد بالتواصل معنا. نحن هنا من أجلك.',
    signoff: 'بِوُدّ،<br/>فريق ماما هالة',
    whatsNext: 'ما الخطوة التالية؟',
    bookNextTitle: 'احجز جلستك التالية',
    bookNextBody:
      'الاستمراريّة مفتاح النموّ. احجز جلستك التالية في وقت يناسبك.',
    reflectTitle: 'تأمّل واكتب',
    reflectBody:
      'خذ بضع دقائق لتدوين أي رؤى أو مشاعر من جلسة اليوم.',
    selfCareTitle: 'اعتنِ بنفسك',
    selfCareBody:
      'كن لطيفًا مع نفسك اليوم. اشرب الماء، استرح، وامنح نفسك مساحة للتأمّل.',
    bookNextCta: 'احجز الجلسة التالية',
    viewAccount: 'عرض حسابي',
    contact: 'أي أسئلة أو تحتاج دعمًا؟',
  },

  statusConfirmed: {
    subject: (s, dt) => `جلستك مؤكَّدة — ${s} بتاريخ ${dt}`,
    heading: 'جلستك مؤكَّدة!',
    body: (s) =>
      `خبر سعيد — جلسة <strong>${s}</strong> الخاصة بك مؤكَّدة الآن. نتطلّع للقائك.`,
    meetHeading: 'الانضمام إلى الجلسة أونلاين',
    meetHint: 'رابط Google Meet جاهز.',
    meetCta: 'فتح Google Meet',
    onlineFallback:
      'سيُرسَل رابط مكالمة الفيديو قبل الجلسة عبر البريد الإلكتروني ودعوة التقويم.',
    addToCalendar: 'أضف إلى التقويم',
    manageBooking: 'إدارة الحجز',
    questions: 'أي أسئلة؟',
  },

  statusCompleted: {
    subject: (firstName) => `اكتملت الجلسة — شكرًا لك يا ${firstName}`,
    heading: 'اكتملت الجلسة',
    body: (s) =>
      `تمّ وسم جلسة <strong>${s}</strong> الخاصة بك كمكتملة. شكرًا لك على استثمارك في نفسك — يشرّفنا أن نكون جزءًا من رحلتك.`,
    note: 'خذ لحظة للتأمّل. النموّ يحدث خطوةً بخطوة.',
    bookNext: 'احجز الجلسة التالية',
    questions: 'أي أسئلة أو تحتاج دعمًا؟',
  },

  statusNoShow: {
    subject: (s) => `افتقدناك — ${s}`,
    heading: 'افتقدناك',
    body: (s, dt) =>
      `لاحظنا أنك لم تتمكّن من حضور جلسة <strong>${s}</strong> بتاريخ <strong>${dt}</strong>. نأمل أن كلّ شيء على ما يرام.`,
    note:
      'الحياة تمضي بسرعة أحيانًا، ونتفهّم ذلك تمامًا. متى ما كنت مستعدًّا، يسعدنا إعادة جدولة جلستك.',
    reschedule: 'إعادة جدولة الجلسة',
    contact: 'تحتاج إلى التحدّث؟',
  },
};

export function emailCopy(locale: EmailLocale | undefined): BookingEmailCopy {
  return locale === 'ar' ? ar : en;
}
