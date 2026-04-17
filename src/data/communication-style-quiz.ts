/* ================================================================
   "Are We Speaking the Same Language?"
   A 12-question dimension-based couples assessment that evaluates
   4 dimensions of relationship communication. Self-reported by one
   partner, positively framed (high = healthy). Likert 1-5 scoring.
   Written in Dr. Hala Ali's warm, bilingual counseling voice.
   ================================================================ */

export interface CommunicationStyleQuestion {
  id: string;
  dimension: 'listening' | 'expression' | 'repair' | 'bids';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface CommunicationStyleDimension {
  key: 'listening' | 'expression' | 'repair' | 'bids';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface CommunicationStyleTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: CommunicationStyleDimension[] = [
  { key: 'listening', titleEn: 'Active Listening', titleAr: 'الاستماعُ الفعّال', iconName: 'Ear', color: '#5A7B9E', maxScore: 15 },
  { key: 'expression', titleEn: 'Emotional Expression', titleAr: 'التعبيرُ العاطفيّ', iconName: 'MessageCircle', color: '#D4836A', maxScore: 15 },
  { key: 'repair', titleEn: 'Repair & Recovery', titleAr: 'الإصلاحُ والتعافي', iconName: 'RefreshCw', color: '#25D366', maxScore: 15 },
  { key: 'bids', titleEn: 'Turning Toward', titleAr: 'الاستجابةُ للتواصل', iconName: 'Heart', color: '#7A3B5E', maxScore: 15 },
];

export const questions: CommunicationStyleQuestion[] = [
  // ─── ACTIVE LISTENING (3 questions) ───
  {
    id: 'listen-1',
    dimension: 'listening',
    textEn: 'I give my partner my full attention when they are talking to me.',
    textAr: 'أمنحُ شريكي كاملَ انتباهي عندما يتحدّثُ إليّ.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'listen-2',
    dimension: 'listening',
    textEn: 'I try to understand my partner\'s perspective before responding.',
    textAr: 'أحاولُ فهمَ وجهةِ نظرِ شريكي قبلَ أن أردّ.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'listen-3',
    dimension: 'listening',
    textEn: 'I ask follow-up questions when my partner shares something important.',
    textAr: 'أطرحُ أسئلةً إضافيّةً عندما يُشاركُني شريكي شيئًا مهمًّا.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── EMOTIONAL EXPRESSION (3 questions) ───
  {
    id: 'express-1',
    dimension: 'expression',
    textEn: 'I can tell my partner how I feel without blaming or criticizing.',
    textAr: 'أستطيعُ إخبارَ شريكي بما أشعرُ به دونَ لومٍ أو انتقاد.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'express-2',
    dimension: 'expression',
    textEn: 'I share my needs and desires openly rather than expecting my partner to guess.',
    textAr: 'أشاركُ احتياجاتي ورغباتي بصراحةٍ بدلًا من أن أتوقّعَ من شريكي أن يخمِّن.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'express-3',
    dimension: 'expression',
    textEn: 'I feel safe being emotionally vulnerable with my partner.',
    textAr: 'أشعرُ بالأمانِ عندما أكونُ ضعيفًا عاطفيًّا أمامَ شريكي.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── REPAIR & RECOVERY (3 questions) ───
  {
    id: 'repair-1',
    dimension: 'repair',
    textEn: 'After an argument, I can be the first to reach out and reconnect.',
    textAr: 'بعدَ الخلاف، أستطيعُ أن أكونَ أوّلَ من يمدُّ يدَه ويعيدُ التواصل.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'repair-2',
    dimension: 'repair',
    textEn: 'We can talk about what went wrong in a disagreement without it turning into another fight.',
    textAr: 'نستطيعُ التحدّثَ عمّا حدثَ خطأً في الخلافِ دونَ أن يتحوّلَ إلى شجارٍ آخر.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'repair-3',
    dimension: 'repair',
    textEn: 'I can apologize genuinely when I have hurt my partner.',
    textAr: 'أستطيعُ الاعتذارَ بصدقٍ عندما أجرحُ شريكي.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── TURNING TOWARD (3 questions) ───
  {
    id: 'bids-1',
    dimension: 'bids',
    textEn: 'When my partner tries to connect with me (a touch, a joke, a comment), I respond positively.',
    textAr: 'عندما يحاولُ شريكي التواصلَ معي (لمسة، مزحة، تعليق)، أستجيبُ بإيجابيّة.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'bids-2',
    dimension: 'bids',
    textEn: 'I notice when my partner is seeking my attention or affection.',
    textAr: 'ألاحظُ عندما يبحثُ شريكي عن انتباهي أو عاطفتي.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'bids-3',
    dimension: 'bids',
    textEn: 'I actively create small moments of connection throughout the day.',
    textAr: 'أصنعُ بشكلٍ فعّالٍ لحظاتِ تواصلٍ صغيرةً خلالَ اليوم.',
    options: [
      { value: 1, labelEn: 'Never / Rarely', labelAr: 'نادرًا / أبدًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost Always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
];

export const tiers: CommunicationStyleTier[] = [
  {
    min: 12,
    max: 24,
    titleEn: 'Communication Needs Work',
    titleAr: 'التواصلُ يحتاجُ إلى عمل',
    summaryEn: "Thank you for being honest with yourself — that takes real courage. Many couples find themselves in this space, especially during stressful seasons of life. The good news is that communication is a skill, not a personality trait. With the right guidance, couples can learn to truly hear each other, express needs without blame, and rebuild the emotional bridge between them. You have already taken the first step by being here.",
    summaryAr: 'شكرًا لصدقِك مع نفسِك — هذا يتطلّبُ شجاعةً حقيقيّة. كثيرٌ من الأزواجِ يجدون أنفسَهم في هذا المكان، خاصّةً في فتراتِ الحياةِ المُجهِدة. الخبرُ السعيدُ أنّ التواصلَ مهارةٌ وليسَ سمةً شخصيّة. مع التوجيهِ المناسب، يستطيعُ الأزواجُ تعلُّمَ الاستماعِ الحقيقيِّ لبعضِهم والتعبيرَ عن الاحتياجاتِ دونَ لومٍ وإعادةَ بناءِ الجسرِ العاطفيِّ بينهم. لقد اتّخذتَ الخطوةَ الأولى بوجودِك هنا.',
    color: '#C4878A',
    suggestedServices: ['couples-counseling'],
  },
  {
    min: 25,
    max: 44,
    titleEn: 'Growing Together',
    titleAr: 'تنمُوان معًا',
    summaryEn: "You and your partner have a solid foundation with real room to grow. You are communicating in some areas but may be missing each other in others — and that is completely normal. Couples in this range often benefit from learning specific tools: how to fight fairly, how to listen without fixing, and how to repair after a rupture. A little guidance can turn good into great.",
    summaryAr: 'أنتما تملكان أساسًا متينًا مع مجالٍ حقيقيٍّ للنموّ. تتواصلان في بعضِ المجالاتِ لكن قد تفوتُكما أشياءُ في مجالاتٍ أخرى — وهذا طبيعيٌّ تمامًا. الأزواجُ في هذا النطاقِ غالبًا ما يستفيدون من تعلُّمِ أدواتٍ محدّدة: كيفَ تختلفان بإنصاف، وكيفَ تستمعان دونَ محاولةِ الإصلاح، وكيفَ تُصلحان بعدَ الخلاف. قليلٌ من التوجيهِ يمكنُ أن يحوِّلَ الجيّدَ إلى رائع.',
    color: '#C8A97D',
    suggestedServices: ['couples-counseling', 'relationship-enrichment'],
  },
  {
    min: 45,
    max: 60,
    titleEn: 'Strong Communicators',
    titleAr: 'متواصلان بقوّة',
    summaryEn: "What a beautiful reflection of the effort you both put into your relationship. You listen with intention, express yourselves with care, repair when things go wrong, and turn toward each other consistently. This does not mean your relationship is perfect — it means you have built the skills to navigate imperfection together. Keep nurturing what you have built.",
    summaryAr: 'يا له من انعكاسٍ جميلٍ للجهدِ الذي تبذلانِه في علاقتِكما. تستمعان بنيّةٍ صادقة وتعبِّران عن أنفسِكما بعنايةٍ وتُصلحان عندما تسوءُ الأمور وتستجيبان لبعضِكما باستمرار. هذا لا يعني أنّ علاقتَكما مثاليّة — بل يعني أنّكما بنيتما المهاراتِ للتعاملِ مع عدمِ الكمالِ معًا. استمرّا في رعايةِ ما بنيتُماه.',
    color: '#25D366',
    suggestedServices: ['relationship-enrichment'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  listening: {
    lowEn: 'Active listening is the heartbeat of any relationship. It is not just about being quiet while your partner talks — it is about being present. Try putting your phone down, making eye contact, and reflecting back what you hear before sharing your own thoughts. This simple shift can transform how your partner feels in conversation with you.',
    lowAr: 'الاستماعُ الفعّالُ هو نبضُ أيِّ علاقة. ليسَ مجرّدَ الصمتِ بينما يتحدّثُ شريكُك — بل هو الحضورُ الكامل. جرِّبْ وضعَ هاتفِك جانبًا والتواصلَ بالعينَين وإعادةَ صياغةِ ما تسمعُه قبلَ مشاركةِ أفكارِك. هذا التحوُّلُ البسيطُ يمكنُ أن يغيِّرَ طريقةَ شعورِ شريكِك أثناءَ الحديثِ معك.',
    highEn: 'You are a wonderful listener — your partner likely feels truly heard when they talk to you. This is one of the most powerful gifts you can give in a relationship. Keep creating that space where your partner feels safe to share.',
    highAr: 'أنتَ مستمعٌ رائع — شريكُك على الأرجحِ يشعرُ بأنّه مسموعٌ حقًّا عندما يتحدّثُ إليك. هذه واحدةٌ من أقوى الهداياتِ التي يمكنُك تقديمُها في العلاقة. استمرّ في خلقِ تلك المساحةِ التي يشعرُ فيها شريكُك بالأمانِ للمشاركة.',
  },
  expression: {
    lowEn: 'Expressing your feelings without blame is one of the hardest but most rewarding communication skills. Try starting sentences with "I feel..." instead of "You always..." or "You never...". When you own your feelings, your partner can hear you without becoming defensive — and that opens the door to real understanding.',
    lowAr: 'التعبيرُ عن مشاعرِك دونَ لومٍ هو من أصعبِ مهاراتِ التواصلِ لكنّه من أكثرِها ثمرة. جرِّبْ بدءَ جملِك بـ "أشعرُ أنّ..." بدلًا من "أنتَ دائمًا..." أو "أنتَ لا تفعلُ أبدًا...". عندما تتبنّى مشاعرَك، يستطيعُ شريكُك سماعَك دونَ أن يصبحَ دفاعيًّا — وهذا يفتحُ البابَ لفهمٍ حقيقيّ.',
    highEn: 'You express your emotions with honesty and care — this is a beautiful strength. Your partner knows where you stand without feeling attacked, which creates a foundation of emotional safety in your relationship.',
    highAr: 'تعبِّرُ عن مشاعرِك بصدقٍ وعناية — هذه نقطةُ قوّةٍ جميلة. شريكُك يعرفُ موقفَك دونَ أن يشعرَ بالهجوم، ممّا يخلقُ أساسًا من الأمانِ العاطفيِّ في علاقتِكما.',
  },
  repair: {
    lowEn: 'Every couple fights — what matters most is what happens after. Repair is the ability to come back together after a rupture. It can be as simple as a gentle touch, saying "I am sorry I hurt you," or asking "Can we start over?" Practice reaching out even when your pride says to wait. The one who repairs first is not the one who lost — they are the one who loves the relationship enough to heal it.',
    lowAr: 'كلُّ زوجَين يتشاجران — الأهمُّ هو ما يحدثُ بعد ذلك. الإصلاحُ هو القدرةُ على العودةِ معًا بعدَ الخلاف. يمكنُ أن يكونَ بسيطًا كلمسةٍ حنونة أو قولِ "أنا آسفٌ لأنّني آذيتُك" أو السؤالِ "هل يمكنُنا البدءُ من جديد؟" تدرَّبْ على مدِّ يدِك حتّى عندما يقولُ كبرياؤُك انتظر. الذي يُصلحُ أوّلًا ليسَ الذي خسرَ — بل هو الذي يحبُّ العلاقةَ بما يكفي لشفائِها.',
    highEn: 'You and your partner have a strong repair system — when things go wrong, you find your way back to each other. This is one of the most important predictors of long-term relationship success. Your willingness to apologize and reconnect speaks volumes about your commitment.',
    highAr: 'أنتما تملكان نظامَ إصلاحٍ قويّ — عندما تسوءُ الأمور، تجدان طريقَكما للعودةِ إلى بعضِكما. هذا أحدُ أهمِّ المؤشّراتِ على نجاحِ العلاقةِ طويلةِ الأمد. استعدادُكما للاعتذارِ وإعادةِ التواصلِ يقولُ الكثيرَ عن التزامِكما.',
  },
  bids: {
    lowEn: 'Turning toward your partner\'s bids for connection is the single most important habit in a healthy relationship. A "bid" is any attempt your partner makes to connect — a question, a sigh, a look, a touch. When you notice and respond warmly, you are saying "You matter to me." Start paying attention to the small moments — they are the ones that build lasting love.',
    lowAr: 'الاستجابةُ لمحاولاتِ شريكِك للتواصلِ هي العادةُ الأكثرُ أهمّيّةً في العلاقةِ الصحّيّة. "المحاولة" هي أيُّ جهدٍ يبذلُه شريكُك للتواصل — سؤال، تنهيدة، نظرة، لمسة. عندما تلاحظُ وتستجيبُ بحرارة، فأنتَ تقولُ "أنتَ مهمٌّ لي." ابدأ بالانتباهِ للّحظاتِ الصغيرة — فهي التي تبني الحبَّ الدائم.',
    highEn: 'You are naturally tuned in to your partner\'s bids for connection — you notice, you respond, and you initiate moments of closeness. This is the foundation of deep intimacy and lasting trust. Your partner is lucky to have someone who pays such loving attention.',
    highAr: 'أنتَ متناغمٌ بشكلٍ طبيعيٍّ مع محاولاتِ شريكِك للتواصل — تلاحظُ وتستجيبُ وتبادرُ بلحظاتِ القرب. هذا أساسُ الحميميّةِ العميقةِ والثقةِ الدائمة. شريكُك محظوظٌ بوجودِ شخصٍ يمنحُه هذا الانتباهَ المُحبّ.',
  },
};
