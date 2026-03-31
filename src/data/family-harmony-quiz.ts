/* ================================================================
   Family Harmony Assessment
   A 12-question clinical-grade assessment that evaluates 4 dimensions
   of family functioning. Gives a personalized score with actionable
   insights. Written in Dr. Hala Ali's warm, evidence-based voice.
   ================================================================ */

export interface FamilyHarmonyQuestion {
  id: string;
  dimension: 'communication' | 'emotional' | 'boundaries' | 'connection';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface FamilyHarmonyDimension {
  key: 'communication' | 'emotional' | 'boundaries' | 'connection';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface FamilyHarmonyTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: FamilyHarmonyDimension[] = [
  { key: 'communication', titleEn: 'Communication', titleAr: 'التّواصل', iconName: 'MessageCircle', color: '#7A3B5E', maxScore: 15 },
  { key: 'emotional', titleEn: 'Emotional Safety', titleAr: 'الأمانُ العاطفيّ', iconName: 'Heart', color: '#C4878A', maxScore: 15 },
  { key: 'boundaries', titleEn: 'Healthy Boundaries', titleAr: 'الحدودُ الصحّيّة', iconName: 'Shield', color: '#C8A97D', maxScore: 15 },
  { key: 'connection', titleEn: 'Family Connection', titleAr: 'الرّابطةُ الأسريّة', iconName: 'Users', color: '#25D366', maxScore: 15 },
];

export const questions: FamilyHarmonyQuestion[] = [
  // ─── COMMUNICATION (3 questions) ───
  {
    id: 'comm-1',
    dimension: 'communication',
    textEn: 'When someone in your family is upset, how often do others truly listen without interrupting or dismissing?',
    textAr: 'عندما يكونُ أحدُ أفرادِ عائلتِك مُنزعجًا، كم مرّةً يستمعُ الآخرون بصدقٍ دونَ مقاطعةٍ أو تجاهل؟',
    options: [
      { value: 1, labelEn: 'Rarely — we tend to talk over each other', labelAr: 'نادرًا — نميلُ إلى المقاطعة' },
      { value: 2, labelEn: 'Sometimes — depends on the topic', labelAr: 'أحيانًا — يعتمدُ على الموضوع' },
      { value: 3, labelEn: 'Often — we try, even if imperfectly', labelAr: 'غالبًا — نحاولُ حتّى لو لم يكن مثاليًّا' },
      { value: 4, labelEn: 'Usually — listening is a strength for us', labelAr: 'عادةً — الاستماعُ نقطةُ قوّتِنا' },
      { value: 5, labelEn: 'Always — everyone feels heard', labelAr: 'دائمًا — الكلُّ يشعرُ بأنّه مسموع' },
    ],
  },
  {
    id: 'comm-2',
    dimension: 'communication',
    textEn: 'How comfortable is your family with discussing difficult emotions like sadness, fear, or disappointment?',
    textAr: 'ما مدى ارتياحِ عائلتِك في مناقشةِ المشاعرِ الصعبة كالحزنِ والخوفِ وخيبةِ الأمل؟',
    options: [
      { value: 1, labelEn: 'Very uncomfortable — we avoid it', labelAr: 'غيرُ مرتاحين جدًّا — نتجنّبُ ذلك' },
      { value: 2, labelEn: 'Somewhat uncomfortable', labelAr: 'غيرُ مرتاحين إلى حدٍّ ما' },
      { value: 3, labelEn: 'Neutral — it depends on the mood', labelAr: 'محايد — يعتمدُ على المزاج' },
      { value: 4, labelEn: 'Fairly comfortable', labelAr: 'مرتاحون نوعًا ما' },
      { value: 5, labelEn: 'Very comfortable — we share openly', labelAr: 'مرتاحون جدًّا — نتشاركُ بانفتاح' },
    ],
  },
  {
    id: 'comm-3',
    dimension: 'communication',
    textEn: 'When conflicts arise, how does your family typically resolve disagreements?',
    textAr: 'عندما تنشأُ الخلافات، كيفَ تحلُّ عائلتُك الخلافاتِ عادةً؟',
    options: [
      { value: 1, labelEn: 'Arguments escalate — someone shuts down or storms off', labelAr: 'تتصاعدُ الشجارات — ينسحبُ أو ينفجرُ أحدُهم' },
      { value: 2, labelEn: 'We argue but rarely resolve anything', labelAr: 'نتشاجرُ لكن نادرًا ما نحلُّ شيئًا' },
      { value: 3, labelEn: 'We try to talk it out, though it is hard', labelAr: 'نحاولُ الحوارَ رغم صعوبتِه' },
      { value: 4, labelEn: 'We usually find compromises', labelAr: 'عادةً نجدُ حلولًا وسطى' },
      { value: 5, labelEn: 'We resolve conflicts with respect and understanding', labelAr: 'نحلُّ الخلافاتِ باحترامٍ وتفهُّم' },
    ],
  },

  // ─── EMOTIONAL SAFETY (3 questions) ───
  {
    id: 'emo-1',
    dimension: 'emotional',
    textEn: 'Do family members feel safe expressing vulnerability — like admitting mistakes or asking for help?',
    textAr: 'هل يشعرُ أفرادُ الأسرة بالأمانِ في التعبيرِ عن ضعفِهم — كالاعترافِ بالأخطاءِ أو طلبِ المساعدة؟',
    options: [
      { value: 1, labelEn: 'Not at all — vulnerability feels risky', labelAr: 'أبدًا — الضعفُ يبدو خطيرًا' },
      { value: 2, labelEn: 'Rarely — only with certain family members', labelAr: 'نادرًا — فقط مع بعضِ الأفراد' },
      { value: 3, labelEn: 'Sometimes — it is getting better', labelAr: 'أحيانًا — الأمرُ يتحسّن' },
      { value: 4, labelEn: 'Often — most feel comfortable', labelAr: 'غالبًا — معظمُهم يشعرُ بالارتياح' },
      { value: 5, labelEn: 'Always — our home is a safe space', labelAr: 'دائمًا — منزلُنا مساحةٌ آمنة' },
    ],
  },
  {
    id: 'emo-2',
    dimension: 'emotional',
    textEn: 'How often do family members show affection, appreciation, or encouragement to each other?',
    textAr: 'كم مرّةً يُظهرُ أفرادُ الأسرة المودّةَ والتقديرَ والتشجيعَ لبعضِهم البعض؟',
    options: [
      { value: 1, labelEn: 'Almost never', labelAr: 'تقريبًا أبدًا' },
      { value: 2, labelEn: 'Occasionally', labelAr: 'من حينٍ لآخر' },
      { value: 3, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 4, labelEn: 'Frequently', labelAr: 'كثيرًا' },
      { value: 5, labelEn: 'Daily — it is part of who we are', labelAr: 'يوميًّا — هذا جزءٌ من هويّتِنا' },
    ],
  },
  {
    id: 'emo-3',
    dimension: 'emotional',
    textEn: 'When a child or teen in your family is struggling emotionally, how does the family typically respond?',
    textAr: 'عندما يعاني طفلٌ أو مراهقٌ في عائلتِك عاطفيًّا، كيفَ تستجيبُ الأسرةُ عادةً؟',
    options: [
      { value: 1, labelEn: 'Dismiss or minimize their feelings', labelAr: 'نتجاهلُ أو نقلِّلُ من مشاعرِهم' },
      { value: 2, labelEn: 'Try to fix it quickly without understanding', labelAr: 'نحاولُ إصلاحَه بسرعةٍ دون تفهُّم' },
      { value: 3, labelEn: 'Acknowledge but struggle to help', labelAr: 'نعترفُ بالمشكلة لكن نكافحُ لمساعدتِه' },
      { value: 4, labelEn: 'Listen and try to understand their perspective', labelAr: 'نستمعُ ونحاولُ فهمَ وجهةِ نظرِه' },
      { value: 5, labelEn: 'Validate, support, and help them process', labelAr: 'نُصادقُ مشاعرَهم وندعمُهم ونساعدُهم على المعالجة' },
    ],
  },

  // ─── HEALTHY BOUNDARIES (3 questions) ───
  {
    id: 'bound-1',
    dimension: 'boundaries',
    textEn: 'Does your family have clear, consistent rules and expectations that everyone understands?',
    textAr: 'هل لدى عائلتِك قواعدُ وتوقّعاتٌ واضحةٌ ومتّسقةٌ يفهمُها الجميع؟',
    options: [
      { value: 1, labelEn: 'No rules — or rules change unpredictably', labelAr: 'لا قواعد — أو تتغيّرُ بشكلٍ غيرِ متوقّع' },
      { value: 2, labelEn: 'Some rules, but inconsistently enforced', labelAr: 'بعضُ القواعد، لكن تُطبَّقُ بشكلٍ غيرِ متّسق' },
      { value: 3, labelEn: 'Moderate — we are working on consistency', labelAr: 'متوسّط — نعملُ على الاتّساق' },
      { value: 4, labelEn: 'Mostly clear and consistent', labelAr: 'واضحةٌ ومتّسقةٌ في معظمِها' },
      { value: 5, labelEn: 'Very clear, fair, and consistently applied', labelAr: 'واضحةٌ جدًّا وعادلةٌ ومُطبَّقةٌ باتّساق' },
    ],
  },
  {
    id: 'bound-2',
    dimension: 'boundaries',
    textEn: 'How well does your family respect each member\'s need for personal space, privacy, and autonomy?',
    textAr: 'ما مدى احترامِ عائلتِك لحاجةِ كلِّ فردٍ للمساحةِ الشخصيّةِ والخصوصيّةِ والاستقلاليّة؟',
    options: [
      { value: 1, labelEn: 'Poorly — boundaries are often violated', labelAr: 'ضعيف — كثيرًا ما تُنتهكُ الحدود' },
      { value: 2, labelEn: 'Inconsistently', labelAr: 'بشكلٍ غيرِ متّسق' },
      { value: 3, labelEn: 'Moderately well', labelAr: 'بشكلٍ معتدل' },
      { value: 4, labelEn: 'Well — with occasional slip-ups', labelAr: 'جيّد — مع زلّاتٍ عرضيّة' },
      { value: 5, labelEn: 'Very well — we honor each other\'s space', labelAr: 'جيّدٌ جدًّا — نحترمُ مساحةَ بعضِنا' },
    ],
  },
  {
    id: 'bound-3',
    dimension: 'boundaries',
    textEn: 'How does your family handle screen time, social media, and digital boundaries?',
    textAr: 'كيفَ تتعاملُ عائلتُك مع وقتِ الشاشةِ ووسائلِ التواصلِ الاجتماعيِّ والحدودِ الرقميّة؟',
    options: [
      { value: 1, labelEn: 'No boundaries — screens dominate our time', labelAr: 'لا حدود — الشاشاتُ تسيطرُ على وقتِنا' },
      { value: 2, labelEn: 'We try, but it is a constant battle', labelAr: 'نحاولُ، لكنّها معركةٌ مستمرّة' },
      { value: 3, labelEn: 'Some guidelines exist but are hard to enforce', labelAr: 'توجدُ بعضُ الإرشادات لكن يصعبُ تطبيقُها' },
      { value: 4, labelEn: 'We have reasonable limits that mostly work', labelAr: 'لدينا حدودٌ معقولةٌ تنجحُ في معظمِها' },
      { value: 5, labelEn: 'Healthy digital habits are part of our culture', labelAr: 'العاداتُ الرقميّةُ الصحّيّةُ جزءٌ من ثقافتِنا' },
    ],
  },

  // ─── FAMILY CONNECTION (3 questions) ───
  {
    id: 'conn-1',
    dimension: 'connection',
    textEn: 'How often does your family spend quality time together — without screens — doing something everyone enjoys?',
    textAr: 'كم مرّةً تقضي عائلتُك وقتًا نوعيًّا معًا — بدون شاشات — في نشاطٍ يستمتعُ به الجميع؟',
    options: [
      { value: 1, labelEn: 'Almost never', labelAr: 'تقريبًا أبدًا' },
      { value: 2, labelEn: 'Once a month or less', labelAr: 'مرّةً في الشهرِ أو أقلّ' },
      { value: 3, labelEn: 'A few times a month', labelAr: 'عدّةَ مرّاتٍ في الشهر' },
      { value: 4, labelEn: 'Weekly', labelAr: 'أسبوعيًّا' },
      { value: 5, labelEn: 'Several times a week or daily', labelAr: 'عدّةَ مرّاتٍ أسبوعيًّا أو يوميًّا' },
    ],
  },
  {
    id: 'conn-2',
    dimension: 'connection',
    textEn: 'Do your children feel comfortable coming to you when they are in trouble or need guidance?',
    textAr: 'هل يشعرُ أطفالُك بالارتياحِ في اللّجوءِ إليك عندما يكونون في ورطةٍ أو يحتاجون توجيهًا؟',
    options: [
      { value: 1, labelEn: 'No — they hide things from us', labelAr: 'لا — يُخفون الأشياءَ عنّا' },
      { value: 2, labelEn: 'Rarely — they go to friends instead', labelAr: 'نادرًا — يلجأون لأصدقائِهم بدلًا منّا' },
      { value: 3, labelEn: 'Sometimes — depends on the situation', labelAr: 'أحيانًا — يعتمدُ على الموقف' },
      { value: 4, labelEn: 'Often — they trust us with most things', labelAr: 'غالبًا — يثقون بنا في معظمِ الأمور' },
      { value: 5, labelEn: 'Always — we are their safe place', labelAr: 'دائمًا — نحنُ مكانُهم الآمن' },
    ],
  },
  {
    id: 'conn-3',
    dimension: 'connection',
    textEn: 'How would you describe the overall emotional atmosphere in your home most days?',
    textAr: 'كيفَ تصفُ الجوَّ العاطفيَّ العامَّ في منزلِك في معظمِ الأيّام؟',
    options: [
      { value: 1, labelEn: 'Tense and unpredictable', labelAr: 'متوتّرٌ وغيرُ متوقّع' },
      { value: 2, labelEn: 'Stressful with occasional calm', labelAr: 'مُجهِدٌ مع هدوءٍ عرضيّ' },
      { value: 3, labelEn: 'Mixed — good days and hard days', labelAr: 'متنوّع — أيّامٌ جيّدةٌ وأيّامٌ صعبة' },
      { value: 4, labelEn: 'Generally warm and supportive', labelAr: 'دافئٌ وداعمٌ عمومًا' },
      { value: 5, labelEn: 'Warm, loving, and consistently safe', labelAr: 'دافئٌ ومحبٌّ وآمنٌ باستمرار' },
    ],
  },
];

export const tiers: FamilyHarmonyTier[] = [
  {
    min: 12,
    max: 24,
    titleEn: 'Your Family Could Use Some Support',
    titleAr: 'عائلتُكم تستحقُّ بعضَ الدّعم',
    summaryEn: "Thank you for your honesty — it takes courage to look at these areas. The patterns you're experiencing are more common than you might think, and they're very much addressable. Families in this range often benefit significantly from professional guidance to rebuild communication and create a safer emotional environment. The good news? Awareness is the first step to change.",
    summaryAr: 'شكرًا لصدقِك — يتطلّبُ الأمرُ شجاعةً للنظرِ في هذه المجالات. الأنماطُ التي تمرّ بها أكثرُ شيوعًا ممّا قد تظنّ، ويمكنُ معالجتُها بشكلٍ كبير. العائلاتُ في هذا النطاقِ غالبًا ما تستفيدُ بشكلٍ ملحوظ من التوجيهِ المهنيِّ لإعادةِ بناءِ التواصلِ وخلقِ بيئةٍ عاطفيّةٍ أكثرَ أمانًا.',
    color: '#C4878A',
    suggestedServices: ['family-relationship-strengthening', 'parenting-coaching', 'under-18-counseling'],
  },
  {
    min: 25,
    max: 40,
    titleEn: 'You Have a Foundation — Let\'s Strengthen It',
    titleAr: 'لديكم أساسٌ — لنعزِّزْه معًا',
    summaryEn: "Your family has real strengths to build on. There are areas where you're doing well, and others where targeted support could make a meaningful difference. Many families in this range find that even a few guided sessions help them turn their 'good enough' into 'genuinely thriving.' You're closer than you think.",
    summaryAr: 'عائلتُكم لديها نقاطُ قوّةٍ حقيقيّة يمكنُ البناءُ عليها. هناك مجالاتٌ تتفوّقون فيها، وأخرى يمكنُ أن يُحدِثَ فيها الدعمُ المُوجَّه فرقًا ملموسًا. كثيرٌ من العائلاتِ في هذا النطاقِ تجدُ أنّ حتّى بضعَ جلساتٍ مُوجَّهة تساعدُها على التحوُّلِ من "جيّد كفاية" إلى "مزدهرٌ حقًّا."',
    color: '#C8A97D',
    suggestedServices: ['family-relationship-strengthening', 'parenting-coaching', 'tackling-child-tantrums'],
  },
  {
    min: 41,
    max: 60,
    titleEn: 'Your Family is Thriving',
    titleAr: 'عائلتُكم مزدهرة',
    summaryEn: "This is beautiful. Your family has built something genuinely special — a foundation of trust, communication, and emotional safety that many families aspire to. Continue nurturing what you have. Remember that even thriving families benefit from periodic check-ins, especially during transitions like a new school year, relocation, or adolescence.",
    summaryAr: 'هذا جميل. عائلتُكم بنَتْ شيئًا مميّزًا حقًّا — أساسًا من الثقةِ والتواصلِ والأمانِ العاطفيِّ الذي تطمحُ إليه كثيرٌ من العائلات. استمرّوا في رعايةِ ما لديكم. تذكّروا أنّ حتّى العائلاتِ المزدهرة تستفيدُ من المراجعاتِ الدوريّة، خاصّةً خلالَ التحوُّلات.',
    color: '#25D366',
    suggestedServices: ['lifestyle-coaching', 'self-development-coaching'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  communication: {
    lowEn: 'Communication is an area that could use attention. Consider setting aside dedicated family conversation time — even 15 minutes at dinner without screens can begin to shift patterns.',
    lowAr: 'التواصلُ مجالٌ يحتاجُ انتباهًا. فكِّرْ في تخصيصِ وقتٍ مُحدَّدٍ لمحادثاتِ الأسرة — حتّى 15 دقيقة على العشاءِ بدونِ شاشاتٍ يمكنُ أن تبدأَ في تغييرِ الأنماط.',
    highEn: 'Your family communicates well — this is a genuine strength. Keep fostering those open conversations.',
    highAr: 'عائلتُكم تتواصلُ بشكلٍ جيّد — هذه نقطةُ قوّةٍ حقيقيّة. استمرّوا في تعزيزِ تلك المحادثاتِ المفتوحة.',
  },
  emotional: {
    lowEn: 'Emotional safety may need nurturing. Start small: validate one feeling today without trying to fix it. "I can see you\'re upset, and that makes sense" goes a long way.',
    lowAr: 'الأمانُ العاطفيُّ قد يحتاجُ رعاية. ابدأْ بخطوةٍ صغيرة: صادِقْ شعورًا واحدًا اليوم دون محاولةِ إصلاحِه. "أرى أنّك مُنزعج، وهذا منطقيّ" — لها أثرٌ كبير.',
    highEn: 'Your home appears to be an emotionally safe space — that is one of the greatest gifts you can give your family.',
    highAr: 'يبدو أنّ منزلَكم مساحةٌ آمنةٌ عاطفيًّا — وهذه من أعظمِ الهدايا التي يمكنُ أن تقدّمَها لعائلتِك.',
  },
  boundaries: {
    lowEn: 'Boundaries create safety, not restriction. Clear, consistent expectations — communicated with warmth — help children feel secure and develop self-regulation.',
    lowAr: 'الحدودُ تخلقُ أمانًا لا قيودًا. التوقّعاتُ الواضحةُ والمتّسقة — المُوصَلةُ بدفء — تساعدُ الأطفالَ على الشعورِ بالأمانِ وتطويرِ التنظيمِ الذاتيّ.',
    highEn: 'You have established healthy boundaries — this provides the structure your family needs to feel both secure and free.',
    highAr: 'لقد أسّستُم حدودًا صحّيّة — وهذا يوفّرُ الهيكلَ الذي تحتاجُه عائلتُكم للشعورِ بالأمانِ والحرّيّة معًا.',
  },
  connection: {
    lowEn: 'Family connection is built in small, daily moments — not grand gestures. Try one shared meal, one bedtime story, or one walk together this week.',
    lowAr: 'الرابطةُ الأسريّةُ تُبنى في لحظاتٍ يوميّةٍ صغيرة — لا في إيماءاتٍ كبيرة. جرِّبْ وجبةً مشتركةً واحدة، أو قصّةً قبل النوم، أو مشيًا معًا هذا الأسبوع.',
    highEn: 'Your family connection is strong — the time and intention you invest in being together is clearly paying off.',
    highAr: 'رابطتُكم الأسريّةُ قويّة — الوقتُ والنيّةُ التي تستثمرونَها في التواجدِ معًا تؤتي ثمارَها بوضوح.',
  },
};
