/* ================================================================
   Pre-Marriage Readiness Check
   A 15-question assessment that evaluates 5 dimensions of
   pre-marital readiness. Gives a personalized score with actionable
   insights. Written in Dr. Hala Ali's warm, evidence-based voice.
   ================================================================ */

export interface PreMarriageQuestion {
  id: string;
  dimension: 'values' | 'conflict' | 'vision' | 'financial' | 'communication';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface PreMarriageDimension {
  key: 'values' | 'conflict' | 'vision' | 'financial' | 'communication';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface PreMarriageTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: PreMarriageDimension[] = [
  { key: 'values', titleEn: 'Values Alignment', titleAr: 'توافقُ القِيَم', iconName: 'Compass', color: '#7A3B5E', maxScore: 15 },
  { key: 'conflict', titleEn: 'Conflict Styles', titleAr: 'أساليبُ حلِّ الخلافات', iconName: 'Shield', color: '#C4878A', maxScore: 15 },
  { key: 'vision', titleEn: 'Life & Family Vision', titleAr: 'رؤيةُ الحياةِ والأسرة', iconName: 'Users', color: '#D4836A', maxScore: 15 },
  { key: 'financial', titleEn: 'Financial Approach', titleAr: 'النهجُ الماليّ', iconName: 'Wallet', color: '#C8A97D', maxScore: 15 },
  { key: 'communication', titleEn: 'Communication Patterns', titleAr: 'أنماطُ التواصل', iconName: 'MessageCircle', color: '#25D366', maxScore: 15 },
];

export const questions: PreMarriageQuestion[] = [
  // ─── VALUES ALIGNMENT (3 questions) ───
  {
    id: 'val-1',
    dimension: 'values',
    textEn: 'We have openly discussed our core beliefs, faith practices, and how they will shape our daily life together.',
    textAr: 'لقد ناقشنا بصراحةٍ معتقداتِنا الجوهريّةَ وممارساتِنا الإيمانيّةَ وكيفَ ستُشكِّلُ حياتَنا اليوميّةَ معًا.',
    options: [
      { value: 1, labelEn: 'Not at all — we have avoided this topic', labelAr: 'لم نفعلْ أبدًا — تجنّبنا هذا الموضوع' },
      { value: 2, labelEn: 'Briefly — surface-level only', labelAr: 'بإيجاز — على السطحِ فقط' },
      { value: 3, labelEn: 'Somewhat — we have touched on it', labelAr: 'إلى حدٍّ ما — تطرّقنا إليه' },
      { value: 4, labelEn: 'Mostly — we understand each other well', labelAr: 'في الغالب — نفهمُ بعضَنا جيّدًا' },
      { value: 5, labelEn: 'Thoroughly — we are aligned and at peace', labelAr: 'بشكلٍ شامل — نحنُ متوافقون ومرتاحون' },
    ],
  },
  {
    id: 'val-2',
    dimension: 'values',
    textEn: 'We share similar priorities when it comes to how we spend our time, energy, and what matters most in life.',
    textAr: 'نتشاركُ أولويّاتٍ متشابهةً فيما يخصُّ كيفَ ننفقُ وقتَنا وطاقتَنا وما يهمُّنا أكثرَ في الحياة.',
    options: [
      { value: 1, labelEn: 'Not at all — our priorities feel very different', labelAr: 'لم نتشارك أبدًا — أولويّاتُنا تبدو مختلفةً جدًّا' },
      { value: 2, labelEn: 'Slightly — we overlap in a few areas', labelAr: 'قليلًا — نتقاطعُ في بضعِ مجالات' },
      { value: 3, labelEn: 'Moderately — some shared, some different', labelAr: 'بشكلٍ معتدل — بعضُها مشتركٌ وبعضُها مختلف' },
      { value: 4, labelEn: 'Mostly — our priorities are well aligned', labelAr: 'في الغالب — أولويّاتُنا متوافقةٌ بشكلٍ جيّد' },
      { value: 5, labelEn: 'Completely — we are on the same page', labelAr: 'تمامًا — نحنُ على نفسِ الصفحة' },
    ],
  },
  {
    id: 'val-3',
    dimension: 'values',
    textEn: 'We have discussed how we will navigate relationships with extended family, in-laws, and cultural expectations.',
    textAr: 'لقد ناقشنا كيفَ سنتعاملُ مع علاقاتِنا مع العائلةِ الممتدّةِ والأصهارِ والتوقّعاتِ الثقافيّة.',
    options: [
      { value: 1, labelEn: 'Not at all — this feels too sensitive', labelAr: 'لم نفعلْ أبدًا — هذا يبدو حسّاسًا جدًّا' },
      { value: 2, labelEn: 'Barely — we have hinted at it', labelAr: 'بالكاد — ألمحنا إليه' },
      { value: 3, labelEn: 'Somewhat — we have started the conversation', labelAr: 'إلى حدٍّ ما — بدأنا المحادثة' },
      { value: 4, labelEn: 'Mostly — we have a shared understanding', labelAr: 'في الغالب — لدينا تفاهمٌ مشترك' },
      { value: 5, labelEn: 'Thoroughly — we have clear boundaries and agreements', labelAr: 'بشكلٍ شامل — لدينا حدودٌ واتّفاقاتٌ واضحة' },
    ],
  },

  // ─── CONFLICT STYLES (3 questions) ───
  {
    id: 'conf-1',
    dimension: 'conflict',
    textEn: 'When we disagree, we are both able to express our feelings without yelling, shutting down, or walking away.',
    textAr: 'عندما نختلف، يستطيعُ كلانا التعبيرَ عن مشاعرِه دونَ صراخٍ أو انسحابٍ أو انغلاق.',
    options: [
      { value: 1, labelEn: 'Rarely — disagreements escalate quickly', labelAr: 'نادرًا — تتصاعدُ الخلافاتُ بسرعة' },
      { value: 2, labelEn: 'Sometimes — one of us tends to shut down', labelAr: 'أحيانًا — أحدُنا يميلُ للانسحاب' },
      { value: 3, labelEn: 'Often — though it is not always easy', labelAr: 'غالبًا — رغمَ أنّه ليسَ سهلًا دائمًا' },
      { value: 4, labelEn: 'Usually — we stay respectful even when upset', labelAr: 'عادةً — نبقى محترمَين حتّى عندَ الانزعاج' },
      { value: 5, labelEn: 'Always — we handle conflict with care', labelAr: 'دائمًا — نتعاملُ مع الخلافِ بعناية' },
    ],
  },
  {
    id: 'conf-2',
    dimension: 'conflict',
    textEn: 'After a disagreement, we are able to repair the connection — apologize, understand each other, and move forward.',
    textAr: 'بعدَ الخلاف، نستطيعُ إصلاحَ العلاقة — الاعتذار وفهمَ بعضِنا والمُضِيَّ قُدُمًا.',
    options: [
      { value: 1, labelEn: 'Rarely — unresolved issues pile up', labelAr: 'نادرًا — تتراكمُ المشكلاتُ دون حلّ' },
      { value: 2, labelEn: 'Sometimes — but it takes a long time', labelAr: 'أحيانًا — لكنّه يستغرقُ وقتًا طويلًا' },
      { value: 3, labelEn: 'Often — we eventually find our way back', labelAr: 'غالبًا — نجدُ طريقَنا للعودةِ في النهاية' },
      { value: 4, labelEn: 'Usually — repair is a natural part of our process', labelAr: 'عادةً — الإصلاحُ جزءٌ طبيعيٌّ من عمليّتِنا' },
      { value: 5, labelEn: 'Always — we reconnect quickly and genuinely', labelAr: 'دائمًا — نتواصلُ مجدّدًا بسرعةٍ وصدق' },
    ],
  },
  {
    id: 'conf-3',
    dimension: 'conflict',
    textEn: 'We have discussed how we will handle major life disagreements — like if we reach a deadlock on an important decision.',
    textAr: 'لقد ناقشنا كيفَ سنتعاملُ مع الخلافاتِ الكبرى — كالوصولِ إلى طريقٍ مسدودٍ في قرارٍ مهمّ.',
    options: [
      { value: 1, labelEn: 'Not at all — we have not thought about this', labelAr: 'لم نفعلْ أبدًا — لم نفكِّرْ في هذا' },
      { value: 2, labelEn: 'Briefly — but without a plan', labelAr: 'بإيجاز — لكن بدونِ خطّة' },
      { value: 3, labelEn: 'Somewhat — we have some ideas', labelAr: 'إلى حدٍّ ما — لدينا بعضُ الأفكار' },
      { value: 4, labelEn: 'Mostly — we have agreed on an approach', labelAr: 'في الغالب — اتّفقنا على نهجٍ معيّن' },
      { value: 5, labelEn: 'Thoroughly — we feel confident in our process', labelAr: 'بشكلٍ شامل — نشعرُ بالثقةِ في عمليّتِنا' },
    ],
  },

  // ─── LIFE & FAMILY VISION (3 questions) ───
  {
    id: 'vis-1',
    dimension: 'vision',
    textEn: 'We have openly discussed our expectations about having children — timing, number, and parenting approach.',
    textAr: 'لقد ناقشنا بصراحةٍ توقّعاتِنا حولَ إنجابِ الأطفال — التوقيتَ والعددَ ومنهجَ التربية.',
    options: [
      { value: 1, labelEn: 'Not at all — we have avoided this topic', labelAr: 'لم نفعلْ أبدًا — تجنّبنا هذا الموضوع' },
      { value: 2, labelEn: 'Vaguely — just general mentions', labelAr: 'بشكلٍ غامض — مجرّدُ إشاراتٍ عامّة' },
      { value: 3, labelEn: 'Somewhat — we have started talking about it', labelAr: 'إلى حدٍّ ما — بدأنا التحدّثَ عنه' },
      { value: 4, labelEn: 'Mostly — we are largely on the same page', labelAr: 'في الغالب — نتّفقُ إلى حدٍّ كبير' },
      { value: 5, labelEn: 'Thoroughly — we have a shared vision', labelAr: 'بشكلٍ شامل — لدينا رؤيةٌ مشتركة' },
    ],
  },
  {
    id: 'vis-2',
    dimension: 'vision',
    textEn: 'We have talked about career goals, who works, work-life balance, and how we will support each other professionally.',
    textAr: 'لقد تحدّثنا عن الأهدافِ المهنيّةِ ومَن يعمل والتوازنِ بينَ العملِ والحياة وكيفَ سندعمُ بعضَنا مهنيًّا.',
    options: [
      { value: 1, labelEn: 'Not at all', labelAr: 'لم نتحدّثْ أبدًا' },
      { value: 2, labelEn: 'Briefly — assumptions more than discussions', labelAr: 'بإيجاز — افتراضاتٌ أكثرُ من نقاشات' },
      { value: 3, labelEn: 'Somewhat — we are figuring it out', labelAr: 'إلى حدٍّ ما — نحنُ في طورِ الاكتشاف' },
      { value: 4, labelEn: 'Mostly — we have a flexible plan', labelAr: 'في الغالب — لدينا خطّةٌ مرنة' },
      { value: 5, labelEn: 'Thoroughly — we are excited about our shared plan', labelAr: 'بشكلٍ شامل — نحنُ متحمِّسون لخطّتِنا المشتركة' },
    ],
  },
  {
    id: 'vis-3',
    dimension: 'vision',
    textEn: 'We have discussed where we want to live, how often we would move, and proximity to family.',
    textAr: 'لقد ناقشنا أينَ نريدُ أن نعيش، وكم مرّةً قد ننتقل، والقربَ من العائلة.',
    options: [
      { value: 1, labelEn: 'Not at all — this has not come up', labelAr: 'لم نفعلْ أبدًا — لم يُطرحْ هذا الموضوع' },
      { value: 2, labelEn: 'Vaguely — general preferences only', labelAr: 'بشكلٍ غامض — تفضيلاتٌ عامّةٌ فقط' },
      { value: 3, labelEn: 'Somewhat — we have explored options', labelAr: 'إلى حدٍّ ما — استكشفنا الخيارات' },
      { value: 4, labelEn: 'Mostly — we have a direction', labelAr: 'في الغالب — لدينا اتّجاه' },
      { value: 5, labelEn: 'Thoroughly — we are aligned on this', labelAr: 'بشكلٍ شامل — نحنُ متوافقون في هذا' },
    ],
  },

  // ─── FINANCIAL APPROACH (3 questions) ───
  {
    id: 'fin-1',
    dimension: 'financial',
    textEn: 'We have been honest with each other about our current financial situation — income, debts, and savings.',
    textAr: 'لقد كنّا صادقَين مع بعضِنا حولَ وضعِنا الماليِّ الحاليّ — الدخلَ والديونَ والمدّخرات.',
    options: [
      { value: 1, labelEn: 'Not at all — finances are a private topic', labelAr: 'لم نفعلْ أبدًا — الأمورُ الماليّةُ موضوعٌ خاصّ' },
      { value: 2, labelEn: 'Slightly — we have shared some numbers', labelAr: 'قليلًا — شاركنا بعضَ الأرقام' },
      { value: 3, labelEn: 'Somewhat — we know the general picture', labelAr: 'إلى حدٍّ ما — نعرفُ الصورةَ العامّة' },
      { value: 4, labelEn: 'Mostly — we are transparent about finances', labelAr: 'في الغالب — نتحلّى بالشفافيّةِ حولَ الأمورِ الماليّة' },
      { value: 5, labelEn: 'Thoroughly — full transparency and no surprises', labelAr: 'بشكلٍ شامل — شفافيّةٌ كاملةٌ ولا مفاجآت' },
    ],
  },
  {
    id: 'fin-2',
    dimension: 'financial',
    textEn: 'We have discussed how we will manage money as a couple — joint accounts, budgets, and spending habits.',
    textAr: 'لقد ناقشنا كيفَ سندير أموالَنا كزوجَين — حساباتٌ مشتركةٌ وميزانيّاتٌ وعاداتُ إنفاق.',
    options: [
      { value: 1, labelEn: 'Not at all — we have not talked about this', labelAr: 'لم نفعلْ أبدًا — لم نتحدّثْ عن هذا' },
      { value: 2, labelEn: 'Briefly — just surface-level', labelAr: 'بإيجاز — على السطحِ فقط' },
      { value: 3, labelEn: 'Somewhat — we have some ideas', labelAr: 'إلى حدٍّ ما — لدينا بعضُ الأفكار' },
      { value: 4, labelEn: 'Mostly — we have a shared approach', labelAr: 'في الغالب — لدينا نهجٌ مشترك' },
      { value: 5, labelEn: 'Thoroughly — we have a clear financial plan', labelAr: 'بشكلٍ شامل — لدينا خطّةٌ ماليّةٌ واضحة' },
    ],
  },
  {
    id: 'fin-3',
    dimension: 'financial',
    textEn: 'We share similar attitudes about saving, giving, and long-term financial goals.',
    textAr: 'نتشاركُ مواقفَ متشابهةً حولَ الادّخارِ والعطاءِ والأهدافِ الماليّةِ طويلةِ المدى.',
    options: [
      { value: 1, labelEn: 'Not at all — we seem very different here', labelAr: 'لم نتشارك أبدًا — نبدو مختلفَين جدًّا هنا' },
      { value: 2, labelEn: 'Slightly — we overlap in some areas', labelAr: 'قليلًا — نتقاطعُ في بعضِ المجالات' },
      { value: 3, labelEn: 'Moderately — some alignment, some gaps', labelAr: 'بشكلٍ معتدل — بعضُ التوافقِ وبعضُ الفجوات' },
      { value: 4, labelEn: 'Mostly — our financial values align', labelAr: 'في الغالب — قيمُنا الماليّةُ متوافقة' },
      { value: 5, labelEn: 'Completely — we are united on this', labelAr: 'تمامًا — نحنُ متّحدون في هذا' },
    ],
  },

  // ─── COMMUNICATION PATTERNS (3 questions) ───
  {
    id: 'comm-1',
    dimension: 'communication',
    textEn: 'I feel comfortable expressing my needs, concerns, and boundaries with my partner — even when it is uncomfortable.',
    textAr: 'أشعرُ بالارتياحِ في التعبيرِ عن احتياجاتي ومخاوفي وحدودي مع شريكي — حتّى عندما يكونُ الأمرُ غيرَ مريح.',
    options: [
      { value: 1, labelEn: 'Rarely — I hold things in to avoid conflict', labelAr: 'نادرًا — أكتمُ الأشياءَ لتجنُّبِ الخلاف' },
      { value: 2, labelEn: 'Sometimes — with certain topics only', labelAr: 'أحيانًا — في مواضيعَ معيّنةٍ فقط' },
      { value: 3, labelEn: 'Often — though I hesitate at times', labelAr: 'غالبًا — رغمَ تردُّدي أحيانًا' },
      { value: 4, labelEn: 'Usually — I feel mostly safe to share', labelAr: 'عادةً — أشعرُ بأمانٍ في الغالبِ للمشاركة' },
      { value: 5, labelEn: 'Always — I can be fully myself', labelAr: 'دائمًا — أستطيعُ أن أكونَ نفسي تمامًا' },
    ],
  },
  {
    id: 'comm-2',
    dimension: 'communication',
    textEn: 'My partner is a good listener — they make me feel heard and understood, not just waiting for their turn to speak.',
    textAr: 'شريكي مستمعٌ جيّد — يجعلُني أشعرُ بأنّني مسموعٌ ومفهوم، لا مجرّدَ انتظارٍ لدورِه في الكلام.',
    options: [
      { value: 1, labelEn: 'Rarely — I often feel unheard', labelAr: 'نادرًا — كثيرًا ما أشعرُ بأنّني غيرُ مسموع' },
      { value: 2, labelEn: 'Sometimes — depends on the situation', labelAr: 'أحيانًا — يعتمدُ على الموقف' },
      { value: 3, labelEn: 'Often — they try, even if imperfectly', labelAr: 'غالبًا — يحاولُ حتّى لو لم يكنْ مثاليًّا' },
      { value: 4, labelEn: 'Usually — I feel valued in conversations', labelAr: 'عادةً — أشعرُ بالتقديرِ في المحادثات' },
      { value: 5, labelEn: 'Always — listening is one of their gifts', labelAr: 'دائمًا — الاستماعُ من مواهبِه' },
    ],
  },
  {
    id: 'comm-3',
    dimension: 'communication',
    textEn: 'We are both comfortable being emotionally open and vulnerable with each other — sharing fears, dreams, and insecurities.',
    textAr: 'كلانا مرتاحٌ في الانفتاحِ العاطفيِّ والهشاشةِ مع الآخر — مشاركةَ المخاوفِ والأحلامِ وعدمِ الأمان.',
    options: [
      { value: 1, labelEn: 'Rarely — we keep things surface-level', labelAr: 'نادرًا — نبقي الأمورَ سطحيّة' },
      { value: 2, labelEn: 'Sometimes — with small things', labelAr: 'أحيانًا — في الأمورِ الصغيرة' },
      { value: 3, labelEn: 'Often — we are working on deeper openness', labelAr: 'غالبًا — نعملُ على انفتاحٍ أعمق' },
      { value: 4, labelEn: 'Usually — our emotional connection is strong', labelAr: 'عادةً — ارتباطُنا العاطفيُّ قويّ' },
      { value: 5, labelEn: 'Always — we share everything authentically', labelAr: 'دائمًا — نتشاركُ كلَّ شيءٍ بصدق' },
    ],
  },
];

export const tiers: PreMarriageTier[] = [
  {
    min: 15,
    max: 32,
    titleEn: 'Important Conversations Ahead',
    titleAr: 'محادثاتٌ مهمّةٌ في الانتظار',
    summaryEn: "Thank you for your honesty — that is already a sign of strength. Your results suggest there are meaningful topics you and your partner have not yet explored deeply. This is completely normal, and the good news is that having these conversations now — before marriage — is one of the most valuable things you can do. Pre-marital education can help you build the foundation you both deserve.",
    summaryAr: 'شكرًا لصدقِكما — هذا بحدِّ ذاتِه علامةُ قوّة. تشيرُ نتائجُكما إلى وجودِ مواضيعَ مهمّةٍ لم تستكشفاها بعمقٍ بعد. هذا طبيعيٌّ تمامًا، والخبرُ الجيّدُ أنّ إجراءَ هذه المحادثاتِ الآن — قبلَ الزواج — من أثمنِ الخطواتِ التي يمكنُكما اتّخاذُها. التثقيفُ ما قبلَ الزواج يمكنُ أن يساعدَكما في بناءِ الأساسِ الذي تستحقّانِه.',
    color: '#C4878A',
    suggestedServices: ['pre-marital-education', 'couples-counseling'],
  },
  {
    min: 33,
    max: 55,
    titleEn: 'A Strong Start — Keep Building',
    titleAr: 'بدايةٌ قويّة — واصِلا البناء',
    summaryEn: "You and your partner have clearly invested in your relationship. There are areas where you are well aligned, and others where deeper conversation could strengthen your foundation even further. Couples in this range often benefit greatly from guided pre-marital sessions — not because something is wrong, but because intentional preparation leads to thriving marriages.",
    summaryAr: 'من الواضحِ أنّكما استثمرتُما في علاقتِكما. هناك مجالاتٌ تتوافقان فيها جيّدًا، وأخرى يمكنُ أن يعزِّزَها حوارٌ أعمق. الأزواجُ في هذا النطاقِ غالبًا ما يستفيدون كثيرًا من جلساتِ ما قبلَ الزواج المُوجَّهة — ليسَ لأنّ هناكَ خطأً، بل لأنّ الإعدادَ المقصودَ يقودُ إلى زيجاتٍ مزدهرة.',
    color: '#C8A97D',
    suggestedServices: ['pre-marital-education', 'relationship-enrichment'],
  },
  {
    min: 56,
    max: 75,
    titleEn: "You're Well-Prepared",
    titleAr: 'أنتما مستعدّان جيّدًا',
    summaryEn: "This is wonderful. You and your partner have done meaningful work together — having the hard conversations, aligning on values, and building a strong communication foundation. Continue nurturing what you have. Even well-prepared couples benefit from enrichment sessions to keep growing together. Your marriage is starting on a beautiful foundation.",
    summaryAr: 'هذا رائع. لقد قمتُما بعملٍ مهمٍّ معًا — إجراءُ المحادثاتِ الصعبةِ والتوافقُ على القِيَم وبناءُ أساسٍ قويٍّ للتواصل. استمرّا في رعايةِ ما لديكما. حتّى الأزواجُ المستعدّون جيّدًا يستفيدون من جلساتِ الإثراءِ لمواصلةِ النموِّ معًا. زواجُكما يبدأُ على أساسٍ جميل.',
    color: '#25D366',
    suggestedServices: ['relationship-enrichment', 'pre-marital-education'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  values: {
    lowEn: 'Values alignment is a critical foundation. Consider having dedicated conversations about beliefs, family expectations, and lifestyle priorities before taking this step — a pre-marital coach can facilitate these beautifully.',
    lowAr: 'توافقُ القِيَم أساسٌ جوهريّ. فكِّرا في إجراءِ محادثاتٍ مخصّصةٍ حولَ المعتقداتِ وتوقّعاتِ الأسرةِ وأولويّاتِ نمطِ الحياة قبلَ اتّخاذِ هذه الخطوة — مرشدُ ما قبلَ الزواج يمكنُه تسهيلَ ذلك بشكلٍ رائع.',
    highEn: 'Your values are well aligned — this gives your relationship a stable compass to navigate life together.',
    highAr: 'قِيَمُكما متوافقةٌ بشكلٍ جيّد — وهذا يمنحُ علاقتَكما بوصلةً مستقرّةً للإبحارِ في الحياة معًا.',
  },
  conflict: {
    lowEn: 'How you handle disagreements now predicts how you will handle them in marriage. Learning healthy conflict skills before the wedding is one of the most impactful investments you can make.',
    lowAr: 'كيفَ تتعاملان مع الخلافاتِ الآن يتنبّأُ بكيفيّةِ تعاملِكما معها في الزواج. تعلُّمُ مهاراتِ الخلافِ الصحّيّةِ قبلَ الزفافِ من أهمِّ الاستثماراتِ التي يمكنُكما القيامُ بها.',
    highEn: 'You navigate conflict with maturity and respect — this is a real strength that will serve your marriage well.',
    highAr: 'تتعاملان مع الخلافِ بنضجٍ واحترام — هذه نقطةُ قوّةٍ حقيقيّةٌ ستخدمُ زواجَكما جيّدًا.',
  },
  vision: {
    lowEn: 'Having a shared life vision reduces surprises and disappointment later. Take time to explore your expectations about children, careers, and where life will take you — together.',
    lowAr: 'امتلاكُ رؤيةٍ مشتركةٍ للحياة يقلِّلُ المفاجآتِ وخيبةَ الأمل لاحقًا. خصِّصا وقتًا لاستكشافِ توقّعاتِكما حولَ الأطفالِ والمهنِ وأينَ ستأخذُكما الحياة — معًا.',
    highEn: 'You share a clear vision for your future together — that alignment is a gift that will guide your decisions as a married couple.',
    highAr: 'تتشاركان رؤيةً واضحةً لمستقبلِكما معًا — هذا التوافقُ هديّةٌ ستوجِّهُ قراراتِكما كزوجَين.',
  },
  financial: {
    lowEn: 'Money is one of the top sources of conflict in marriage. Opening up about finances now — with honesty and without judgment — can prevent major stress later. A financial conversation guide can help.',
    lowAr: 'المالُ من أبرزِ مصادرِ الخلافِ في الزواج. الانفتاحُ على الأمورِ الماليّةِ الآن — بصدقٍ وبدونِ أحكام — يمكنُ أن يمنعَ ضغطًا كبيرًا لاحقًا. دليلُ محادثاتٍ ماليّةٍ يمكنُ أن يساعد.',
    highEn: 'Your financial transparency and alignment are impressive — this kind of openness builds deep trust in a marriage.',
    highAr: 'شفافيّتُكما وتوافقُكما الماليُّ مثيران للإعجاب — هذا النوعُ من الانفتاحِ يبني ثقةً عميقةً في الزواج.',
  },
  communication: {
    lowEn: 'Communication is the lifeline of any marriage. If expressing needs or being vulnerable feels difficult, a pre-marital coach can help you both develop the skills to connect more deeply.',
    lowAr: 'التواصلُ شريانُ حياةِ أيِّ زواج. إذا كانَ التعبيرُ عن الاحتياجاتِ أو الهشاشةُ يبدو صعبًا، يمكنُ لمرشدِ ما قبلَ الزواج مساعدتُكما على تطويرِ مهاراتٍ للتواصلِ بعمقٍ أكبر.',
    highEn: 'Your communication is strong — you listen, share openly, and create emotional safety for each other. Keep nurturing this gift.',
    highAr: 'تواصلُكما قويّ — تستمعان وتتشاركان بانفتاحٍ وتخلقان أمانًا عاطفيًّا لبعضِكما. استمرّا في رعايةِ هذه الهديّة.',
  },
};
