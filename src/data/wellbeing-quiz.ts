/* ================================================================
   Wellbeing Check-in Quiz Data
   A brief self-assessment that positions Mama Hala as a thought
   leader while gently guiding visitors toward support.
   ================================================================ */

export interface WellbeingQuestion {
  id: string;
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface WellbeingTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  messageEn: string;
  messageAr: string;
  color: string;
  suggestedCategories: string[];
}

export const wellbeingQuestions: WellbeingQuestion[] = [
  {
    id: 'stress',
    textEn: 'How would you rate your stress level lately?',
    textAr: 'كيفَ تُقيِّمُ مستوى التوتُّرِ لديك مؤخَّرًا؟',
    options: [
      { value: 1, labelEn: 'Very low', labelAr: 'منخفضٌ جدًّا' },
      { value: 2, labelEn: 'Manageable', labelAr: 'يمكنُ التعاملُ معه' },
      { value: 3, labelEn: 'Moderate', labelAr: 'متوسّط' },
      { value: 4, labelEn: 'High', labelAr: 'مرتفع' },
      { value: 5, labelEn: 'Overwhelming', labelAr: 'طاغٍ' },
    ],
  },
  {
    id: 'overwhelm',
    textEn: 'How often do you feel emotionally overwhelmed?',
    textAr: 'كم مرّةً تشعرُ بالإرهاقِ العاطفيّ؟',
    options: [
      { value: 1, labelEn: 'Rarely', labelAr: 'نادرًا' },
      { value: 2, labelEn: 'Occasionally', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'A few times a week', labelAr: 'عدّةَ مرّاتٍ أسبوعيًّا' },
      { value: 4, labelEn: 'Most days', labelAr: 'معظمَ الأيّام' },
      { value: 5, labelEn: 'Almost always', labelAr: 'دائمًا تقريبًا' },
    ],
  },
  {
    id: 'relationships',
    textEn: 'How connected do you feel to the people closest to you?',
    textAr: 'ما مدى شعورِك بالتواصلِ مع أقربِ الناسِ إليك؟',
    options: [
      { value: 1, labelEn: 'Very connected', labelAr: 'متواصلٌ جدًّا' },
      { value: 2, labelEn: 'Mostly connected', labelAr: 'متواصلٌ في الغالب' },
      { value: 3, labelEn: 'Somewhat distant', labelAr: 'بعيدٌ نوعًا ما' },
      { value: 4, labelEn: 'Quite disconnected', labelAr: 'منفصلٌ تمامًا' },
      { value: 5, labelEn: 'Very isolated', labelAr: 'معزولٌ جدًّا' },
    ],
  },
  {
    id: 'sleep',
    textEn: 'How would you describe your sleep quality?',
    textAr: 'كيفَ تصفُ جودةَ نومِك؟',
    options: [
      { value: 1, labelEn: 'Great — restful and consistent', labelAr: 'ممتازة — مريحٌ ومنتظم' },
      { value: 2, labelEn: 'Good most nights', labelAr: 'جيّدة معظمَ الليالي' },
      { value: 3, labelEn: 'Inconsistent', labelAr: 'غيرُ منتظمة' },
      { value: 4, labelEn: 'Often disrupted', labelAr: 'مضطربةٌ في الغالب' },
      { value: 5, labelEn: 'Very poor', labelAr: 'سيّئةٌ جدًّا' },
    ],
  },
  {
    id: 'selfcare',
    textEn: 'How often do you make time for yourself?',
    textAr: 'كم مرّةً تخصِّصُ وقتًا لنفسِك؟',
    options: [
      { value: 1, labelEn: 'Regularly', labelAr: 'بانتظام' },
      { value: 2, labelEn: 'A few times a week', labelAr: 'عدّةَ مرّاتٍ أسبوعيًّا' },
      { value: 3, labelEn: 'Occasionally', labelAr: 'أحيانًا' },
      { value: 4, labelEn: 'Rarely', labelAr: 'نادرًا' },
      { value: 5, labelEn: 'Almost never', labelAr: 'تقريبًا أبدًا' },
    ],
  },
];

export const wellbeingTiers: WellbeingTier[] = [
  {
    min: 5,
    max: 10,
    titleEn: "You're doing well",
    titleAr: 'أنتَ بخير',
    messageEn: "It sounds like you're managing life's demands well. Keep nurturing those healthy habits — and remember, checking in with yourself is a sign of strength, not weakness.",
    messageAr: 'يبدو أنّكَ تتعاملُ مع متطلّباتِ الحياةِ بشكلٍ جيّد. استمِرّ في رعايةِ تلك العاداتِ الصحّيّة — وتذكَّرْ أنّ مراجعةَ نفسِك علامةُ قوّة، لا ضعف.',
    color: '#25D366',
    suggestedCategories: ['adults'],
  },
  {
    min: 11,
    max: 17,
    titleEn: 'Some areas could use attention',
    titleAr: 'بعضُ الجوانبِ تحتاجُ اهتمامًا',
    messageEn: "You're carrying more than you might realize. A few areas of your life are asking for attention — and that's completely normal. Sometimes a conversation with the right person can shift everything.",
    messageAr: 'أنتَ تحملُ أكثرَ ممّا قد تدرك. بعضُ جوانبِ حياتِك تطلبُ الاهتمام — وهذا طبيعيٌّ تمامًا. أحيانًا محادثةٌ مع الشخصِ المناسبِ تُغيِّرُ كلَّ شيء.',
    color: '#C8A97D',
    suggestedCategories: ['adults', 'couples'],
  },
  {
    min: 18,
    max: 25,
    titleEn: 'You deserve support',
    titleAr: 'أنتَ تستحقُّ الدّعم',
    messageEn: "What you're going through is real, and it matters. You don't have to navigate this alone. Reaching out isn't a sign of weakness — it's the bravest thing you can do for yourself.",
    messageAr: 'ما تمرُّ به حقيقيٌّ ومُهمّ. لا يجبُ أن تخوضَ هذا وحدَك. طلبُ المساعدةِ ليس ضعفًا — بل هو أشجعُ ما يمكنُك فعلُه لنفسِك.',
    color: '#C4878A',
    suggestedCategories: ['adults', 'families', 'couples'],
  },
];

export function getWellbeingTier(score: number): WellbeingTier {
  return wellbeingTiers.find((t) => score >= t.min && score <= t.max) || wellbeingTiers[2];
}
