import type { FAQ } from '@/types';

export const generalFaqs: FAQ[] = [
  {
    question: 'What is a consultation session?',
    questionAr: 'ما هي جلسة الاستشارة؟',
    answer: 'A warm, no-pressure conversation to understand your needs and explore how we can support you. Your first consultation is free — 30 minutes, online.',
    answerAr: 'محادثةٌ دافئةٌ بلا ضغط لفَهْمِ احتياجاتِك واستكشافِ كيفَ نستطيعُ دعمَك. استشارتُك الأولى مجّانيّة — 30 دقيقة، عبر الإنترنت.',
    tag: 'Getting Started', tagAr: 'البداية',
    link: { href: '/book', labelEn: 'Schedule your free consultation', labelAr: 'احجِزْ استشارتَك المجّانيّة' },
  },
  {
    question: 'How long are sessions?',
    questionAr: 'كم تستغرق الجلسات؟',
    answer: 'Initial consultations are 30 minutes. Standard sessions are 50 minutes. Experiential therapy sessions (plant therapy, walk & talk) are 60 minutes.',
    answerAr: 'الاستشاراتُ الأوّليّة 30 دقيقة. الجلساتُ القياسيّة 50 دقيقة. جلساتُ العلاجِ التجريبيّ (العلاجُ بالنباتات، المشيُ والحوار) 60 دقيقة.',
    tag: 'Sessions', tagAr: 'الجلسات',
    link: { href: '/services', labelEn: 'View all services & durations', labelAr: 'عرضُ جميعِ الخدماتِ ومُدَدِها' },
  },
  {
    question: 'Do you offer online sessions?',
    questionAr: 'هل تقدّمون جلساتٍ عبر الإنترنت؟',
    answer: 'Yes — most of our sessions are online via secure video. We also offer in-person sessions in Ottawa, Canada and Dubai, UAE for select services.',
    answerAr: 'نعم — معظمُ جلساتِنا عبر الإنترنت بفيديو مشفَّر. نقدّمُ أيضًا جلساتٍ حضوريّةً في أوتاوا، كندا ودبي، الإمارات لخدماتٍ مختارة.',
    tag: 'Sessions', tagAr: 'الجلسات',
  },
  {
    question: 'What ages do you work with?',
    questionAr: 'ما الفئاتُ العمريّة التي تعملون معها؟',
    answer: 'Children, teens, young adults, adults, couples, and families. Each service is tailored to the appropriate age group.',
    answerAr: 'الأطفال والمراهقون والشباب والبالغون والأزواج والعائلات. كلُّ خدمةٍ مصمّمةٌ لتناسبَ الفئةَ العمريّة المناسبة.',
    tag: 'Services', tagAr: 'الخدمات',
    link: { href: '/services', labelEn: 'Explore services by category', labelAr: 'استكشِفِ الخدماتِ حسبَ الفئة' },
  },
  {
    question: 'Do you offer services in Arabic?',
    questionAr: 'هل تقدّمون خدماتٍ باللّغة العربيّة؟',
    answer: 'Yes — full bilingual support in English and Arabic for all sessions, forms, and communication.',
    answerAr: 'نعم — دعمٌ ثنائيُّ اللّغة بالكامل بالإنجليزيّة والعربيّة لجميعِ الجلساتِ والنماذجِ والتواصل.',
    tag: 'Communication', tagAr: 'التواصل',
  },
  {
    question: 'How do I book a session?',
    questionAr: 'كيفَ أحجزُ جلسة؟',
    answer: 'Through our website (guided booking assistant), via WhatsApp, or through the contact form. The process takes under 2 minutes.',
    answerAr: 'عبر موقعِنا (مساعدُ الحجز الذكيّ)، أو واتساب، أو نموذج الاتّصال. تستغرقُ العمليّة أقلّ من دقيقتين.',
    tag: 'Booking', tagAr: 'الحجز',
    link: { href: '/book', labelEn: 'Start booking now', labelAr: 'ابدأِ الحجزَ الآن' },
  },
  {
    question: 'What is your cancellation policy?',
    questionAr: 'ما سياسةُ الإلغاء؟',
    answer: '24-hour notice required. Late cancellations incur 50% fee. No-shows are charged in full. One free reschedule per booking.',
    answerAr: 'يُشترطُ إشعارٌ قبل 24 ساعة. الإلغاءُ المتأخِّر يُفرَضُ عليه 50%. عدمُ الحضورِ يُحاسَبُ بالكامل. إعادةُ جدولةٍ مجّانيّة واحدة.',
    tag: 'Policy', tagAr: 'السياسات',
    link: { href: '/booking-policy', labelEn: 'Read full booking policy', labelAr: 'اقرأِ السياسةَ الكاملة' },
  },
  {
    question: 'Is everything confidential?',
    questionAr: 'هل كلُّ شيءٍ سرّيّ؟',
    answer: 'Absolutely. All sessions and information are strictly confidential, following professional ethical guidelines and privacy laws.',
    answerAr: 'بالتأكيد. جميعُ الجلساتِ والمعلوماتِ سرّيّةٌ تمامًا، وفقًا للمبادئِ الأخلاقيّةِ المهنيّة وقوانينِ الخصوصيّة.',
    tag: 'Privacy', tagAr: 'الخصوصيّة',
    link: { href: '/privacy-policy', labelEn: 'Read our privacy policy', labelAr: 'اقرأْ سياسةَ الخصوصيّة' },
  },
  {
    question: 'How much do sessions cost?',
    questionAr: 'كم تكلفةُ الجلسات؟',
    answer: 'Your first conversation is completely free. After that, pricing is personalized based on your location, session format, and individual needs. We serve clients in Canada and the UAE/Gulf region. Sliding scale options are available for those who need them.',
    answerAr: 'محادثتُك الأولى مجّانيّةٌ تمامًا. بعد ذلك، يُحدَّدُ التسعيرُ بناءً على موقعِك وصيغةِ الجلسةِ واحتياجاتِك الفرديّة. نخدمُ العملاءَ في كندا ومنطقةِ الإماراتِ والخليج. خياراتُ أسعارٍ مُخفَّضة متاحةٌ لمَنْ يحتاجُها.',
    tag: 'Pricing', tagAr: 'الأسعار',
    link: { href: '/book', labelEn: 'See pricing details', labelAr: 'عرضُ تفاصيلِ الأسعار' },
  },
  {
    question: 'Where are you located?',
    questionAr: 'أين يقعُ مقرُّكم؟',
    answer: 'Dubai, UAE and Ottawa, Canada — but most sessions are online, so we support clients globally.',
    answerAr: 'دبي، الإمارات وأوتاوا، كندا — لكنّ معظمَ الجلساتِ عبر الإنترنت، فنحنُ ندعمُ عملاءَ حولَ العالم.',
    tag: 'Location', tagAr: 'الموقع',
    link: { href: '/contact', labelEn: 'Get in touch', labelAr: 'تواصَلْ معنا' },
  },
];

// ─── Booking-specific FAQs ───
export const bookingFaqs: FAQ[] = [
  {
    question: 'What happens in the first session?',
    questionAr: 'ماذا يحدثُ في الجلسةِ الأولى؟',
    answer: 'A warm, no-pressure 30-minute conversation where we get to know each other, discuss your concerns, and explore how we can best support you. Completely free for new clients.',
    answerAr: 'محادثةٌ دافئةٌ بلا ضغط لمدّة 30 دقيقة نتعرّفُ فيها على بعضِنا، ونناقشُ مخاوفَك، ونستكشفُ كيفَ نستطيعُ دعمَك. مجّانيّةٌ تمامًا للعملاءِ الجُدد.',
    tag: 'Booking', tagAr: 'الحجز',
  },
  {
    question: 'Can I cancel or reschedule?',
    questionAr: 'هل يمكنُني الإلغاءُ أو إعادةُ الجدولة؟',
    answer: 'Yes — 24 hours notice required. One free reschedule per booking. Late cancellations incur 50% fee.',
    answerAr: 'نعم — بإشعارٍ قبل 24 ساعة. إعادةُ جدولةٍ مجّانيّة واحدة. الإلغاءُ المتأخِّر يُفرَضُ عليه 50%.',
    tag: 'Booking', tagAr: 'الحجز',
    link: { href: '/booking-policy', labelEn: 'Full cancellation policy', labelAr: 'سياسةُ الإلغاءِ الكاملة' },
  },
  {
    question: 'How is pricing determined?',
    questionAr: 'كيفَ يُحدَّدُ التسعير؟',
    answer: 'Personalized based on your location, session format, needs, and complexity. Your first session is always free.',
    answerAr: 'بشكلٍ شخصيٍّ بناءً على موقعِك وصيغةِ الجلسة واحتياجاتِك ومستوى التعقيد. جلستُك الأولى مجّانيّةٌ دائمًا.',
    tag: 'Pricing', tagAr: 'الأسعار',
  },
  {
    question: 'How should I prepare?',
    questionAr: 'كيفَ أستعدّ؟',
    answer: 'Find a quiet, private space with stable internet. Be on time. No need to prepare anything specific — just bring yourself.',
    answerAr: 'ابحَثْ عن مكانٍ هادئٍ وخاصٍّ مع إنترنت مستقرّ. كُنْ في الوقت. لا حاجةَ لتحضيرِ شيءٍ — فقط أحضِرْ نفسَك.',
    tag: 'Sessions', tagAr: 'الجلسات',
  },
];

// ─── Contact-specific FAQs ───
export const contactFaqs: FAQ[] = [
  {
    question: 'How quickly will I hear back?',
    questionAr: 'ما مدى سرعةِ الردّ؟',
    answer: 'Within 24 hours on business days. For urgent matters, WhatsApp is fastest.',
    answerAr: 'خلال 24 ساعةً في أيّامِ العمل. للأمورِ العاجلة، واتساب أسرع.',
    tag: 'Communication', tagAr: 'التواصل',
  },
  {
    question: 'What languages do you communicate in?',
    questionAr: 'بأيِّ لغاتٍ تتواصلون؟',
    answer: 'Full bilingual support in English and Arabic — reach out in whichever you prefer.',
    answerAr: 'دعمٌ ثنائيُّ اللّغة بالإنجليزيّة والعربيّة — تواصَلْ بأيِّ لغةٍ تفضّلُها.',
    tag: 'Communication', tagAr: 'التواصل',
  },
  {
    question: 'Is my message confidential?',
    questionAr: 'هل رسالتي سرّيّة؟',
    answer: 'Yes. All information shared is handled with strict confidentiality.',
    answerAr: 'نعم. جميعُ المعلوماتِ تُعامَلُ بسرّيّةٍ تامّة.',
    tag: 'Privacy', tagAr: 'الخصوصيّة',
    link: { href: '/privacy-policy', labelEn: 'Read our privacy policy', labelAr: 'اقرأْ سياسةَ الخصوصيّة' },
  },
];

// ─── Gift of Care FAQs ───
export const giftFaqs: FAQ[] = [
  {
    question: 'How will they receive the gift of care?',
    questionAr: 'كيفَ سيتلقّونَ هديّةَ الرّعاية؟',
    answer: 'They receive a beautiful branded email with your personal message and a direct link to schedule their session with Dr. Hala.',
    answerAr: 'يتلقّونَ بريدًا إلكترونيًّا أنيقًا يحتوي على رسالتِك الشّخصيّة ورابطٍ مباشرٍ لحجزِ جلستِهم مع د. هالة.',
    tag: 'Care Gift', tagAr: 'هديّة رعاية',
  },
  {
    question: 'Is there any cost to sending a gift of care?',
    questionAr: 'هل هناك تكلفةٌ لإرسالِ هديّةِ الرّعاية؟',
    answer: 'Sending the invitation is free. The recipient books and pays for their session directly — you are giving them the connection and the nudge.',
    answerAr: 'إرسالُ الدّعوةِ مجّانيّ. يحجزُ المُستلِمُ ويدفعُ ثمنَ جلستِه مباشرةً — أنتَ تمنحُه التّواصلَ والدّافع.',
    tag: 'Care Gift', tagAr: 'هديّة رعاية',
  },
  {
    question: 'What if they don\'t use the invitation?',
    questionAr: 'ماذا لو لم يستخدِموا الدّعوة؟',
    answer: 'There is no expiration on kindness. The invitation stays in their inbox and they can schedule whenever they are ready.',
    answerAr: 'لا تاريخَ انتهاءٍ للطّف. تبقى الدّعوةُ في بريدِهم ويمكنُهم الحجزُ متى كانوا مستعدّين.',
    tag: 'Care Gift', tagAr: 'هديّة رعاية',
  },
];
