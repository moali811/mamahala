/* ================================================================
   Life Balance & Fulfillment Assessment
   A 12-question assessment that evaluates 6 dimensions of adult
   life balance. Gives a personalized score with actionable
   insights. Written in Dr. Hala Ali's warm, evidence-based voice.
   ================================================================ */

export interface LifeBalanceQuestion {
  id: string;
  dimension: 'career' | 'relationships' | 'health' | 'emotional' | 'growth' | 'financial';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface LifeBalanceDimension {
  key: 'career' | 'relationships' | 'health' | 'emotional' | 'growth' | 'financial';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface LifeBalanceTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: LifeBalanceDimension[] = [
  { key: 'career', titleEn: 'Career & Purpose', titleAr: 'المهنةُ والهدف', iconName: 'Briefcase', color: '#7A3B5E', maxScore: 10 },
  { key: 'relationships', titleEn: 'Relationships', titleAr: 'العلاقات', iconName: 'Heart', color: '#C4878A', maxScore: 10 },
  { key: 'health', titleEn: 'Physical Health', titleAr: 'الصّحّةُ الجسديّة', iconName: 'Activity', color: '#25D366', maxScore: 10 },
  { key: 'emotional', titleEn: 'Emotional Wellbeing', titleAr: 'الرّفاهيةُ العاطفيّة', iconName: 'Brain', color: '#D4836A', maxScore: 10 },
  { key: 'growth', titleEn: 'Personal Growth', titleAr: 'النموُّ الشخصيّ', iconName: 'Sprout', color: '#C8A97D', maxScore: 10 },
  { key: 'financial', titleEn: 'Financial Security', titleAr: 'الأمانُ الماليّ', iconName: 'Shield', color: '#8B7355', maxScore: 10 },
];

export const questions: LifeBalanceQuestion[] = [
  // ─── CAREER & PURPOSE (2 questions) ───
  {
    id: 'career-1',
    dimension: 'career',
    textEn: 'How fulfilled do you feel in your daily work or main occupation?',
    textAr: 'ما مدى شعورِك بالرّضا في عملِك اليوميّ أو مهنتِك الرئيسيّة؟',
    options: [
      { value: 1, labelEn: 'Not at all — I feel stuck or drained', labelAr: 'أبدًا — أشعرُ بالجمودِ أو الإرهاق' },
      { value: 2, labelEn: 'Rarely — most days feel like a grind', labelAr: 'نادرًا — معظمُ الأيّامِ تبدو مُرهِقة' },
      { value: 3, labelEn: 'Sometimes — I have good and bad days', labelAr: 'أحيانًا — لديَّ أيّامٌ جيّدةٌ وأخرى سيّئة' },
      { value: 4, labelEn: 'Often — I find meaning in what I do', labelAr: 'غالبًا — أجدُ معنًى فيما أفعل' },
      { value: 5, labelEn: 'Deeply fulfilled — my work aligns with my purpose', labelAr: 'رضا عميق — عملي يتوافقُ مع هدفي' },
    ],
  },
  {
    id: 'career-2',
    dimension: 'career',
    textEn: 'Do you feel you are growing professionally and moving toward meaningful goals?',
    textAr: 'هل تشعرُ أنّك تنمو مهنيًّا وتتّجهُ نحو أهدافٍ ذاتِ معنى؟',
    options: [
      { value: 1, labelEn: 'Not at all — I feel stagnant', labelAr: 'أبدًا — أشعرُ بالركود' },
      { value: 2, labelEn: 'Rarely — growth feels out of reach', labelAr: 'نادرًا — النموُّ يبدو بعيدَ المنال' },
      { value: 3, labelEn: 'Somewhat — I am making slow progress', labelAr: 'إلى حدٍّ ما — أُحرزُ تقدُّمًا بطيئًا' },
      { value: 4, labelEn: 'Yes — I see clear progress', labelAr: 'نعم — أرى تقدُّمًا واضحًا' },
      { value: 5, labelEn: 'Absolutely — I am on a path that excites me', labelAr: 'بالتأكيد — أسيرُ في مسارٍ يُلهمُني' },
    ],
  },

  // ─── RELATIONSHIPS (2 questions) ───
  {
    id: 'rel-1',
    dimension: 'relationships',
    textEn: 'How satisfied are you with the quality of your closest relationships?',
    textAr: 'ما مدى رضاك عن جودةِ علاقاتِك الأقرب؟',
    options: [
      { value: 1, labelEn: 'Very unsatisfied — I feel lonely or disconnected', labelAr: 'غيرُ راضٍ أبدًا — أشعرُ بالوحدةِ أو الانفصال' },
      { value: 2, labelEn: 'Somewhat unsatisfied — relationships feel strained', labelAr: 'غيرُ راضٍ إلى حدٍّ ما — العلاقاتُ تبدو متوتّرة' },
      { value: 3, labelEn: 'Neutral — some are good, others need work', labelAr: 'محايد — بعضُها جيّد وبعضُها يحتاجُ جهدًا' },
      { value: 4, labelEn: 'Satisfied — I feel supported and connected', labelAr: 'راضٍ — أشعرُ بالدعمِ والترابط' },
      { value: 5, labelEn: 'Very satisfied — my relationships bring me joy', labelAr: 'راضٍ جدًّا — علاقاتي تمنحُني السعادة' },
    ],
  },
  {
    id: 'rel-2',
    dimension: 'relationships',
    textEn: 'Do you make time to nurture and invest in the people who matter most to you?',
    textAr: 'هل تُخصِّصُ وقتًا لرعايةِ الأشخاصِ الأكثرِ أهمّيّةً في حياتِك والاستثمارِ فيهم؟',
    options: [
      { value: 1, labelEn: 'Almost never — life gets in the way', labelAr: 'تقريبًا أبدًا — الحياةُ تقفُ في الطريق' },
      { value: 2, labelEn: 'Rarely — I know I should do more', labelAr: 'نادرًا — أعلمُ أنّني يجبُ أن أفعلَ المزيد' },
      { value: 3, labelEn: 'Sometimes — when I remember to', labelAr: 'أحيانًا — عندما أتذكّر' },
      { value: 4, labelEn: 'Often — I prioritize my loved ones', labelAr: 'غالبًا — أُعطي الأولويّةَ لأحبّائي' },
      { value: 5, labelEn: 'Always — relationships are my anchor', labelAr: 'دائمًا — العلاقاتُ مرساتي' },
    ],
  },

  // ─── PHYSICAL HEALTH (2 questions) ───
  {
    id: 'health-1',
    dimension: 'health',
    textEn: 'How would you rate your energy levels and physical vitality on most days?',
    textAr: 'كيف تُقيِّمُ مستوياتِ طاقتِك وحيويّتِك الجسديّةَ في معظمِ الأيّام؟',
    options: [
      { value: 1, labelEn: 'Very low — I feel exhausted most of the time', labelAr: 'منخفضةٌ جدًّا — أشعرُ بالإرهاقِ معظمَ الوقت' },
      { value: 2, labelEn: 'Low — I struggle to get through the day', labelAr: 'منخفضة — أكافحُ لإنهاءِ اليوم' },
      { value: 3, labelEn: 'Moderate — some good days, some sluggish', labelAr: 'متوسّطة — بعضُ الأيّامِ جيّدةٌ وبعضُها خاملة' },
      { value: 4, labelEn: 'Good — I generally feel energized', labelAr: 'جيّدة — أشعرُ بالنشاطِ عمومًا' },
      { value: 5, labelEn: 'Excellent — I feel strong and vibrant', labelAr: 'ممتازة — أشعرُ بالقوّةِ والحيويّة' },
    ],
  },
  {
    id: 'health-2',
    dimension: 'health',
    textEn: 'Do you consistently take care of your body through movement, sleep, and nourishment?',
    textAr: 'هل تعتني بجسدِك باستمرارٍ من خلالِ الحركةِ والنومِ والتغذيةِ السليمة؟',
    options: [
      { value: 1, labelEn: 'Not at all — self-care feels impossible right now', labelAr: 'أبدًا — العنايةُ بالذاتِ تبدو مستحيلةً الآن' },
      { value: 2, labelEn: 'Rarely — I know my habits need improvement', labelAr: 'نادرًا — أعلمُ أنّ عاداتي تحتاجُ تحسينًا' },
      { value: 3, labelEn: 'Sometimes — I go through phases', labelAr: 'أحيانًا — أمرُّ بفتراتٍ متقطّعة' },
      { value: 4, labelEn: 'Usually — I have a routine that works', labelAr: 'عادةً — لديَّ روتينٌ فعّال' },
      { value: 5, labelEn: 'Consistently — health is a priority for me', labelAr: 'باستمرار — الصحّةُ أولويّةٌ بالنسبةِ لي' },
    ],
  },

  // ─── EMOTIONAL WELLBEING (2 questions) ───
  {
    id: 'emo-1',
    dimension: 'emotional',
    textEn: 'How well do you manage stress, anxiety, or overwhelming emotions in your daily life?',
    textAr: 'ما مدى قدرتِك على إدارةِ التوتُّرِ أو القلقِ أو المشاعرِ الطاغيةِ في حياتِك اليوميّة؟',
    options: [
      { value: 1, labelEn: 'Very poorly — I feel overwhelmed most of the time', labelAr: 'ضعيفةٌ جدًّا — أشعرُ بالإرهاقِ معظمَ الوقت' },
      { value: 2, labelEn: 'Not well — stress often takes over', labelAr: 'ليست جيّدة — التوتُّرُ غالبًا يسيطرُ عليّ' },
      { value: 3, labelEn: 'Moderately — I cope but it is hard', labelAr: 'بشكلٍ متوسّط — أتأقلمُ لكنّه صعب' },
      { value: 4, labelEn: 'Well — I have strategies that help', labelAr: 'جيّدة — لديَّ استراتيجيّاتٌ تُساعدُني' },
      { value: 5, labelEn: 'Very well — I feel emotionally balanced', labelAr: 'جيّدةٌ جدًّا — أشعرُ بالتوازنِ العاطفيّ' },
    ],
  },
  {
    id: 'emo-2',
    dimension: 'emotional',
    textEn: 'Do you feel at peace with yourself — accepting of who you are, including your imperfections?',
    textAr: 'هل تشعرُ بالسلامِ مع ذاتِك — متقبّلًا لِمَنْ أنت، بما في ذلك نقاط ضعفِك؟',
    options: [
      { value: 1, labelEn: 'Not at all — I am very hard on myself', labelAr: 'أبدًا — أنا قاسٍ جدًّا على نفسي' },
      { value: 2, labelEn: 'Rarely — self-criticism is constant', labelAr: 'نادرًا — النقدُ الذاتيُّ مستمرّ' },
      { value: 3, labelEn: 'Sometimes — I am working on self-compassion', labelAr: 'أحيانًا — أعملُ على التعاطفِ مع الذات' },
      { value: 4, labelEn: 'Often — I have learned to be kinder to myself', labelAr: 'غالبًا — تعلّمتُ أن أكونَ ألطفَ مع نفسي' },
      { value: 5, labelEn: 'Yes — I embrace my whole self with grace', labelAr: 'نعم — أتقبّلُ ذاتي كاملةً بلطفٍ ورحمة' },
    ],
  },

  // ─── PERSONAL GROWTH (2 questions) ───
  {
    id: 'growth-1',
    dimension: 'growth',
    textEn: 'Are you actively learning, exploring new interests, or working toward personal goals?',
    textAr: 'هل تتعلّمُ بنشاطٍ أو تستكشفُ اهتماماتٍ جديدةً أو تعملُ نحو أهدافٍ شخصيّة؟',
    options: [
      { value: 1, labelEn: 'Not at all — I feel stuck in a rut', labelAr: 'أبدًا — أشعرُ بأنّني عالقٌ في روتين' },
      { value: 2, labelEn: 'Rarely — I want to but cannot find the time', labelAr: 'نادرًا — أرغبُ لكنّني لا أجدُ الوقت' },
      { value: 3, labelEn: 'Occasionally — when inspiration strikes', labelAr: 'من حينٍ لآخر — عندما يأتي الإلهام' },
      { value: 4, labelEn: 'Often — I make room for growth', labelAr: 'غالبًا — أُفسحُ مجالًا للنموّ' },
      { value: 5, labelEn: 'Always — growth is a way of life for me', labelAr: 'دائمًا — النموُّ أسلوبُ حياةٍ بالنسبةِ لي' },
    ],
  },
  {
    id: 'growth-2',
    dimension: 'growth',
    textEn: 'Do you feel a sense of progress and forward momentum in your life overall?',
    textAr: 'هل تشعرُ بإحساسٍ بالتقدُّمِ والزخمِ في حياتِك بشكلٍ عام؟',
    options: [
      { value: 1, labelEn: 'Not at all — life feels like it is standing still', labelAr: 'أبدًا — الحياةُ تبدو وكأنّها متوقّفة' },
      { value: 2, labelEn: 'Rarely — I feel like I am falling behind', labelAr: 'نادرًا — أشعرُ أنّني أتخلّفُ عن الرَّكب' },
      { value: 3, labelEn: 'Sometimes — progress is slow but present', labelAr: 'أحيانًا — التقدُّمُ بطيءٌ لكنّه موجود' },
      { value: 4, labelEn: 'Often — I can see how far I have come', labelAr: 'غالبًا — أستطيعُ رؤيةَ كمْ تقدّمتُ' },
      { value: 5, labelEn: 'Absolutely — I am moving forward with intention', labelAr: 'بالتأكيد — أتقدّمُ بنيّةٍ واضحة' },
    ],
  },

  // ─── FINANCIAL SECURITY (2 questions) ───
  {
    id: 'fin-1',
    dimension: 'financial',
    textEn: 'How comfortable do you feel about your current financial situation?',
    textAr: 'ما مدى ارتياحِك بشأنِ وضعِك الماليِّ الحاليّ؟',
    options: [
      { value: 1, labelEn: 'Very stressed — money is a constant worry', labelAr: 'متوتّرٌ جدًّا — المالُ قلقٌ دائم' },
      { value: 2, labelEn: 'Uncomfortable — I live paycheck to paycheck', labelAr: 'غيرُ مرتاح — أعيشُ من راتبٍ لراتب' },
      { value: 3, labelEn: 'Managing — I get by but with little cushion', labelAr: 'أتدبّرُ الأمر — لكن بهامشٍ ضيّق' },
      { value: 4, labelEn: 'Comfortable — I feel financially stable', labelAr: 'مرتاح — أشعرُ بالاستقرارِ الماليّ' },
      { value: 5, labelEn: 'Very secure — I feel confident about my future', labelAr: 'آمنٌ جدًّا — أشعرُ بالثقةِ بشأنِ مستقبلي' },
    ],
  },
  {
    id: 'fin-2',
    dimension: 'financial',
    textEn: 'Do you have a plan for your financial future that gives you peace of mind?',
    textAr: 'هل لديك خطّةٌ لمستقبلِك الماليِّ تمنحُك راحةَ البال؟',
    options: [
      { value: 1, labelEn: 'No plan at all — I avoid thinking about it', labelAr: 'لا خطّةَ أبدًا — أتجنّبُ التفكيرَ في ذلك' },
      { value: 2, labelEn: 'Vague ideas — but nothing concrete', labelAr: 'أفكارٌ غامضة — لكن لا شيءَ ملموس' },
      { value: 3, labelEn: 'Some plans — I am starting to figure it out', labelAr: 'بعضُ الخطط — بدأتُ في ترتيبِ الأمور' },
      { value: 4, labelEn: 'Good plan — I feel mostly prepared', labelAr: 'خطّةٌ جيّدة — أشعرُ بالاستعدادِ غالبًا' },
      { value: 5, labelEn: 'Solid plan — I feel secure and intentional', labelAr: 'خطّةٌ متينة — أشعرُ بالأمانِ والوعي' },
    ],
  },
];

export const tiers: LifeBalanceTier[] = [
  {
    min: 12,
    max: 24,
    titleEn: 'Time for a Reset',
    titleAr: 'حانَ وقتُ التجديد',
    summaryEn: "Thank you for being honest with yourself — that is the first step toward meaningful change. The areas you are struggling with are not a reflection of failure; they are an invitation to realign. Many people in this range discover that professional support helps them identify what truly matters and create a roadmap forward. You deserve to feel more alive.",
    summaryAr: 'شكرًا لصدقِك مع نفسِك — هذه الخطوةُ الأولى نحو تغييرٍ حقيقيّ. المجالاتُ التي تعاني فيها ليست انعكاسًا للفشل؛ بل هي دعوةٌ لإعادةِ التوازن. كثيرٌ من الأشخاصِ في هذا النطاقِ يكتشفون أنّ الدعمَ المهنيَّ يساعدُهم في تحديدِ ما يهمُّ حقًّا ورسمِ خريطةِ طريقٍ للمُضيّ قُدُمًا. أنت تستحقُّ أن تشعرَ بالحيويّة.',
    color: '#C4878A',
    suggestedServices: ['anxiety-counseling', 'lifestyle-coaching', 'life-coaching'],
  },
  {
    min: 25,
    max: 40,
    titleEn: 'Room to Grow',
    titleAr: 'مساحةٌ للنّموّ',
    summaryEn: "You have a foundation of strengths, and some areas are calling for more attention. This is a wonderful place to be — aware, reflective, and ready for the next level. Targeted coaching or counseling in the areas that scored lower can unlock a deeper sense of fulfillment. You are already on the path.",
    summaryAr: 'لديك أساسٌ من نقاطِ القوّة، وبعضُ المجالاتِ تُنادي بمزيدٍ من الاهتمام. هذا مكانٌ رائعٌ لتكونَ فيه — واعيًا ومتأمّلًا ومستعدًّا للمستوى التالي. التوجيهُ أو الاستشارةُ المُوجَّهة في المجالاتِ الأقلِّ درجةً يمكنُ أن تُطلقَ إحساسًا أعمقَ بالرّضا. أنت بالفعلِ على الطريق.',
    color: '#C8A97D',
    suggestedServices: ['self-development-coaching', 'lifestyle-coaching'],
  },
  {
    min: 41,
    max: 60,
    titleEn: 'Living with Purpose',
    titleAr: 'حياةٌ بهدفٍ واضح',
    summaryEn: "This is inspiring. You have built a life that reflects balance, intention, and self-awareness. Continue honoring what you have cultivated — and remember that even those who thrive benefit from periodic reflection and recalibration. Life changes, and your ability to adapt with grace is your greatest asset.",
    summaryAr: 'هذا مُلهِم. لقد بنيتَ حياةً تعكسُ التوازنَ والنيّةَ والوعيَ بالذات. استمرّ في تقديرِ ما زرعتَه — وتذكّرْ أنّ حتّى المُزدهرين يستفيدون من التأمّلِ الدوريِّ وإعادةِ المُعايَرة. الحياةُ تتغيّر، وقدرتُك على التكيُّفِ برشاقةٍ هي أعظمُ أصولِك.',
    color: '#25D366',
    suggestedServices: ['life-coaching'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  career: {
    lowEn: 'Your sense of purpose at work may need attention. Consider exploring what truly motivates you — sometimes even small shifts in how you approach your role can reignite meaning.',
    lowAr: 'إحساسُك بالهدفِ في العملِ قد يحتاجُ اهتمامًا. فكِّرْ في استكشافِ ما يُحفِّزُك حقًّا — أحيانًا حتّى التحوُّلاتُ الصغيرةُ في طريقةِ تعاملِك مع دورِك يمكنُ أن تُعيدَ إشعالَ المعنى.',
    highEn: 'You have a strong connection to your work and purpose — this is a powerful source of fulfillment. Keep nurturing it.',
    highAr: 'لديك ارتباطٌ قويٌّ بعملِك وهدفِك — هذا مصدرُ رضًا قويّ. استمرّ في رعايتِه.',
  },
  relationships: {
    lowEn: 'Your relationships may need more intentional investment. Start with one small gesture this week — a heartfelt message, a shared meal, or simply being fully present with someone you love.',
    lowAr: 'علاقاتُك قد تحتاجُ استثمارًا أكثرَ وعيًا. ابدأْ بلفتةٍ صغيرةٍ هذا الأسبوع — رسالةٌ صادقة، أو وجبةٌ مشتركة، أو ببساطةٍ التواجدُ الكاملُ مع شخصٍ تحبُّه.',
    highEn: 'Your relationships are a source of strength and joy — the love you invest is clearly returning to you. Cherish these connections.',
    highAr: 'علاقاتُك مصدرُ قوّةٍ وفرح — الحبُّ الذي تستثمرُه يعودُ إليك بوضوح. اعتنِ بهذه الروابط.',
  },
  health: {
    lowEn: 'Your physical wellbeing is calling for attention. Remember that your body is the foundation everything else is built on. Even 10 minutes of movement or one hour of extra sleep can start to shift how you feel.',
    lowAr: 'رفاهيّتُك الجسديّةُ تُنادي بالاهتمام. تذكّرْ أنّ جسدَك هو الأساسُ الذي يُبنى عليه كلُّ شيءٍ آخر. حتّى 10 دقائقَ من الحركةِ أو ساعةٌ إضافيّةٌ من النومِ يمكنُ أن تبدأَ في تغييرِ شعورِك.',
    highEn: 'You are taking excellent care of your body — this vitality fuels every other area of your life. Keep honoring your health.',
    highAr: 'أنت تعتني بجسدِك بشكلٍ ممتاز — هذه الحيويّةُ تُغذّي كلَّ مجالٍ آخرَ في حياتِك. استمرّ في تقديرِ صحّتِك.',
  },
  emotional: {
    lowEn: 'Your emotional wellbeing deserves more care. Consider talking to someone you trust or exploring counseling — you do not have to carry everything alone. Even naming your feelings is a step toward healing.',
    lowAr: 'رفاهيّتُك العاطفيّةُ تستحقُّ المزيدَ من الرعاية. فكِّرْ في التحدُّثِ مع شخصٍ تثقُ به أو استكشافِ الاستشارة — ليس عليك أن تحملَ كلَّ شيءٍ وحدَك. حتّى تسميةُ مشاعرِك خطوةٌ نحو الشفاء.',
    highEn: 'You have developed strong emotional resilience and self-awareness — this is a gift that touches every area of your life.',
    highAr: 'لقد طوّرتَ مرونةً عاطفيّةً قويّةً ووعيًا بالذات — هذه هديّةٌ تلمسُ كلَّ مجالٍ في حياتِك.',
  },
  growth: {
    lowEn: 'Personal growth may have taken a back seat recently. That is okay — but reconnecting with curiosity and intention can reignite your sense of possibility. What is one thing you have always wanted to learn?',
    lowAr: 'النموُّ الشخصيُّ ربّما تراجعَ مؤخّرًا. لا بأس — لكنّ إعادةَ التواصلِ مع الفضولِ والنيّةِ يمكنُ أن يُعيدَ إشعالَ إحساسِك بالإمكانيّات. ما الشيءُ الذي طالما أردتَ تعلُّمَه؟',
    highEn: 'Your commitment to personal growth is evident — you are someone who believes in becoming the best version of yourself. That mindset is powerful.',
    highAr: 'التزامُك بالنموِّ الشخصيِّ واضح — أنت شخصٌ يؤمنُ بأن يصبحَ أفضلَ نسخةٍ من نفسِه. هذه العقليّةُ قويّة.',
  },
  financial: {
    lowEn: 'Financial stress affects every part of life. You do not need to solve it all at once — but having even a simple plan can reduce anxiety. Consider talking to a coach who can help you create clarity.',
    lowAr: 'الضغطُ الماليُّ يؤثّرُ على كلِّ جزءٍ من الحياة. لستَ بحاجةٍ لحلِّ كلِّ شيءٍ دفعةً واحدة — لكنّ وجودَ خطّةٍ بسيطةٍ حتّى يمكنُ أن يُقلِّلَ القلق. فكِّرْ في التحدُّثِ مع موجِّهٍ يساعدُك في خلقِ الوضوح.',
    highEn: 'You have created a sense of financial security that gives you freedom and peace of mind — this stability is a wonderful foundation for the life you want.',
    highAr: 'لقد خلقتَ إحساسًا بالأمانِ الماليِّ يمنحُك الحرّيّةَ وراحةَ البال — هذا الاستقرارُ أساسٌ رائعٌ للحياةِ التي تُريدُها.',
  },
};
