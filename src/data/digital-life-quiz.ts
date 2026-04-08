/* ================================================================
   My Digital Life Check-in
   A 12-question self-reported assessment for teens that evaluates
   4 dimensions of digital wellness. Gives a personalized score
   with actionable insights. Written in Dr. Hala Ali's warm voice.
   ================================================================ */

export interface DigitalLifeQuestion {
  id: string;
  dimension: 'comparison' | 'boundaries' | 'mood' | 'sleep';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface DigitalLifeDimension {
  key: 'comparison' | 'boundaries' | 'mood' | 'sleep';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface DigitalLifeTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: DigitalLifeDimension[] = [
  { key: 'comparison', titleEn: 'Social Comparison', titleAr: 'المُقارَنَةُ الاجتِماعِيَّة', iconName: 'Scale', color: '#6C7BD4', maxScore: 15 },
  { key: 'boundaries', titleEn: 'Digital Boundaries', titleAr: 'الحُدودُ الرَّقمِيَّة', iconName: 'Shield', color: '#C4878A', maxScore: 15 },
  { key: 'mood', titleEn: 'Mood & Self-Worth', titleAr: 'المِزاجُ وتَقدِيرُ الذَّات', iconName: 'Heart', color: '#D4836A', maxScore: 15 },
  { key: 'sleep', titleEn: 'Sleep & Rest', titleAr: 'النَّومُ والرَّاحَة', iconName: 'Moon', color: '#7A3B5E', maxScore: 15 },
];

export const questions: DigitalLifeQuestion[] = [
  // ─── SOCIAL COMPARISON (3 questions, positive-framed) ───
  {
    id: 'comp-1',
    dimension: 'comparison',
    textEn: 'I feel good about myself regardless of what I see on social media.',
    textAr: 'أشعُرُ بالرِّضا عَن نَفسِي بِغَضِّ النَّظَرِ عَمَّا أراهُ عَلى وَسائِلِ التَّواصُلِ الاجتِماعِيّ.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'comp-2',
    dimension: 'comparison',
    textEn: 'When I see other people\'s posts, I can appreciate their lives without feeling like I\'m not doing enough.',
    textAr: 'عِندَما أرى مَنشوراتِ الآخَرين، أستَطيعُ تَقدِيرَ حَياتِهِم دونَ أن أشعُرَ بِأنَّني لا أفعَلُ ما يَكفي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'comp-3',
    dimension: 'comparison',
    textEn: 'I feel confident about my appearance even after scrolling through social media.',
    textAr: 'أشعُرُ بالثِّقَةِ في مَظهَرِي حَتَّى بَعدَ تَصَفُّحِ وَسائِلِ التَّواصُلِ الاجتِماعِيّ.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── DIGITAL BOUNDARIES (3 questions) ───
  {
    id: 'bound-1',
    dimension: 'boundaries',
    textEn: 'I can put my phone away during meals or conversations without feeling anxious.',
    textAr: 'أستَطيعُ وَضعَ هاتِفي جانِبًا أثناءَ الوَجَباتِ أوِ المُحادَثاتِ دونَ أن أشعُرَ بالقَلَق.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'bound-2',
    dimension: 'boundaries',
    textEn: 'I set time limits on my screen time and actually stick to them.',
    textAr: 'أضَعُ حُدودًا زَمَنِيَّةً لِوَقتِ الشَّاشَةِ وألتَزِمُ بِها فِعلًا.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'bound-3',
    dimension: 'boundaries',
    textEn: 'I can go a full day without checking social media if I choose to.',
    textAr: 'أستَطيعُ قَضاءَ يَومٍ كامِلٍ دونَ تَفَقُّدِ وَسائِلِ التَّواصُلِ الاجتِماعِيِّ إذا أرَدتُ ذلِك.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── MOOD & SELF-WORTH (3 questions, positive-framed) ───
  {
    id: 'mood-1',
    dimension: 'mood',
    textEn: 'My mood stays steady regardless of how many likes or comments I get on a post.',
    textAr: 'يَبقى مِزاجي مُستَقِرًّا بِغَضِّ النَّظَرِ عَن عَدَدِ الإعجاباتِ أوِ التَّعلِيقاتِ الَّتي أحصُلُ عَلَيها.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'mood-2',
    dimension: 'mood',
    textEn: 'I feel calm and at ease even when I haven\'t checked my phone in a while.',
    textAr: 'أشعُرُ بالهُدوءِ والرَّاحَةِ حَتَّى عِندَما لا أتَفَقَّدُ هاتِفي لِفَترَة.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'mood-3',
    dimension: 'mood',
    textEn: 'I share things online because I genuinely want to, not because I need validation.',
    textAr: 'أُشارِكُ الأشياءَ عَبرَ الإنتِرنِت لِأنَّني أُريدُ ذلِكَ فِعلًا، وَلَيسَ لِأنَّني أحتاجُ لِلتَّأكيدِ مِنَ الآخَرين.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── SLEEP & REST (3 questions, positive-framed) ───
  {
    id: 'sleep-1',
    dimension: 'sleep',
    textEn: 'I put my phone away at least 30 minutes before going to bed.',
    textAr: 'أضَعُ هاتِفي جانِبًا قَبلَ النَّومِ بِثَلاثينَ دَقيقَةً عَلى الأقَلّ.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'sleep-2',
    dimension: 'sleep',
    textEn: 'I get enough sleep on school nights (8 or more hours).',
    textAr: 'أحصُلُ عَلى قِسطٍ كافٍ مِنَ النَّومِ في لَيالي المَدرَسَةِ (٨ ساعاتٍ أو أكثَر).',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'sleep-3',
    dimension: 'sleep',
    textEn: 'I wake up feeling rested and ready for the day, not groggy from late-night scrolling.',
    textAr: 'أستَيقِظُ وأنا أشعُرُ بالنَّشاطِ والاستِعدادِ لِليَوم، وَلَيسَ بالخُمولِ بِسَبَبِ التَّصَفُّحِ اللَّيلِيّ.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
];

export const tiers: DigitalLifeTier[] = [
  {
    min: 12,
    max: 24,
    titleEn: 'Your Digital Life Needs Attention',
    titleAr: 'حَياتُكَ الرَّقمِيَّةُ تَحتاجُ اهتِمامًا',
    summaryEn: "It takes real courage to be honest with yourself — and that is exactly what you just did. Your answers suggest that your digital habits might be affecting your mood, sleep, or sense of self more than you realize. This is not about blame; screens are designed to pull us in. The good news is that with the right support, you can build a healthier relationship with technology and feel more like yourself again.",
    summaryAr: 'يَتَطَلَّبُ الأمرُ شَجاعَةً حَقيقِيَّةً لِتَكونَ صادِقًا مَعَ نَفسِك — وهذا بالضَّبطِ ما فَعَلتَه. تُشيرُ إجاباتُكَ إلى أنَّ عاداتِكَ الرَّقمِيَّةَ قَد تُؤَثِّرُ عَلى مِزاجِكَ أو نَومِكَ أو إحساسِكَ بِذاتِكَ أكثَرَ مِمَّا تُدرِك. هذا لَيسَ عَن اللَّوم؛ الشَّاشاتُ مُصَمَّمَةٌ لِجَذبِنا. الخَبَرُ السَّارُّ أنَّهُ مَعَ الدَّعمِ المُناسِب، يُمكِنُكَ بِناءُ عَلاقَةٍ أصَحَّ مَعَ التِّكنولوجيا والشُّعورُ بِأنَّكَ أنتَ مِن جَديد.',
    color: '#C4878A',
    suggestedServices: ['under-18-counseling', 'cbt-youth'],
  },
  {
    min: 25,
    max: 44,
    titleEn: 'Building Digital Balance',
    titleAr: 'بِناءُ التَّوازُنِ الرَّقمِيّ',
    summaryEn: "You are aware of the role technology plays in your life, and that awareness is a real strength. There are some areas where your digital habits are working well, and others where a little more intention could make a big difference. Think of this as fine-tuning, not fixing. With some small, consistent changes, you can feel more in control of your screen time and how it affects you.",
    summaryAr: 'أنتَ واعٍ بالدَّورِ الَّذي تَلعَبُهُ التِّكنولوجيا في حَياتِك، وهذا الوَعيُ قُوَّةٌ حَقيقِيَّة. هُناكَ مَجالاتٌ تَعمَلُ فيها عاداتُكَ الرَّقمِيَّةُ بِشَكلٍ جَيِّد، وأُخرى يُمكِنُ أن يُحدِثَ فيها القَليلُ مِنَ الوَعيِ فَرقًا كَبيرًا. فَكِّر في هذا كَتَحسينٍ دَقيق، وَلَيسَ إصلاحًا. مَعَ بَعضِ التَّغييراتِ الصَّغيرَةِ والمُستَمِرَّة، يُمكِنُكَ أن تَشعُرَ بِمَزيدٍ مِنَ السَّيطَرَةِ عَلى وَقتِ الشَّاشَة.',
    color: '#C8A97D',
    suggestedServices: ['teen-behavioral-coaching'],
  },
  {
    min: 45,
    max: 60,
    titleEn: 'Healthy Digital Habits',
    titleAr: 'عاداتٌ رَقمِيَّةٌ صِحِّيَّة',
    summaryEn: "This is wonderful to see. You have built a healthy relationship with technology — you use it without letting it use you. You protect your sleep, your self-worth, and your boundaries, and that takes real maturity. Keep doing what you are doing, and remember that it is okay to check in with yourself from time to time as things change.",
    summaryAr: 'هذا رائِعٌ حَقًّا. لَقَد بَنَيتَ عَلاقَةً صِحِّيَّةً مَعَ التِّكنولوجيا — تَستَخدِمُها دونَ أن تَستَخدِمَك. أنتَ تَحمي نَومَكَ وتَقديرَكَ لِذاتِكَ وحُدودَك، وهذا يَتَطَلَّبُ نُضجًا حَقيقِيًّا. استَمِرَّ فيما تَفعَلُه، وتَذَكَّر أنَّهُ لا بأسَ بِمُراجَعَةِ نَفسِكَ مِن وَقتٍ لِآخَرَ مَعَ تَغَيُّرِ الأمور.',
    color: '#25D366',
    suggestedServices: ['parenting-coaching'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  comparison: {
    lowEn: 'Social media can quietly shape how we see ourselves. When you notice yourself comparing, try pausing and asking: "Is this real life, or a highlight reel?" Unfollowing accounts that make you feel bad about yourself is not weakness — it is self-care.',
    lowAr: 'يُمكِنُ لِوَسائِلِ التَّواصُلِ الاجتِماعِيِّ أن تُشَكِّلَ بِهُدوءٍ طَريقَةَ رُؤيَتِنا لِأنفُسِنا. عِندَما تُلاحِظُ أنَّكَ تُقارِنُ نَفسَك، حاوِل أن تَتَوَقَّفَ وتَسألَ: "هَل هذِهِ الحَياةُ الحَقيقِيَّة، أم لَحَظاتٌ مُختارَة؟" إلغاءُ مُتابَعَةِ الحِساباتِ الَّتي تَجعَلُكَ تَشعُرُ بالسُّوءِ تِجاهَ نَفسِكَ لَيسَ ضَعفًا — بَل عِنايَةٌ بالذَّات.',
    highEn: 'You have a healthy relationship with social media — you can enjoy it without letting it shake your confidence or self-image. That is a strength that many people, even adults, struggle with.',
    highAr: 'لَدَيكَ عَلاقَةٌ صِحِّيَّةٌ مَعَ وَسائِلِ التَّواصُلِ الاجتِماعِيّ — يُمكِنُكَ الاستِمتاعُ بِها دونَ أن تَهُزَّ ثِقَتَكَ أو صورَتَكَ الذَّاتِيَّة. هذِهِ قُوَّةٌ يُعاني مِنها كَثيرونَ حَتَّى مِنَ البالِغين.',
  },
  boundaries: {
    lowEn: 'Setting digital boundaries is a skill, and like any skill, it gets easier with practice. Start small: try one phone-free hour a day, or leave your phone in another room during meals. You are training your brain to be present.',
    lowAr: 'وَضعُ الحُدودِ الرَّقمِيَّةِ مَهارَة، ومِثلُ أيِّ مَهارَة، تُصبِحُ أسهَلَ مَعَ المُمارَسَة. ابدَأ بِخُطواتٍ صَغيرَة: جَرِّب ساعَةً واحِدَةً بِدونِ هاتِفٍ في اليَوم، أو اترُك هاتِفَكَ في غُرفَةٍ أُخرى أثناءَ الوَجَبات. أنتَ تُدَرِّبُ عَقلَكَ عَلى أن يَكونَ حاضِرًا.',
    highEn: 'You have great control over your screen time and digital habits. Being able to disconnect by choice shows real emotional maturity and self-discipline.',
    highAr: 'لَدَيكَ سَيطَرَةٌ رائِعَةٌ عَلى وَقتِ الشَّاشَةِ وعاداتِكَ الرَّقمِيَّة. القُدرَةُ عَلى الانفِصالِ بِاختِيارِكَ تُظهِرُ نُضجًا عاطِفِيًّا وانضِباطًا ذاتِيًّا حَقيقِيًّا.',
  },
  mood: {
    lowEn: 'When your mood starts depending on likes and comments, it is a sign that your self-worth has become tied to external validation. You are so much more than a number on a screen. Try journaling about what makes you feel good offline — those are your real sources of confidence.',
    lowAr: 'عِندَما يَبدَأُ مِزاجُكَ بالاعتِمادِ عَلى الإعجاباتِ والتَّعليقات، فَهذِهِ عَلامَةٌ عَلى أنَّ تَقديرَكَ لِذاتِكَ أصبَحَ مُرتَبِطًا بالتَّأكيدِ الخارِجِيّ. أنتَ أكثَرُ بِكَثيرٍ مِن رَقمٍ عَلى شاشَة. جَرِّب كِتابَةَ يَومِيَّاتٍ عَمَّا يَجعَلُكَ تَشعُرُ بالرِّضا خارِجَ الإنتِرنِت — تِلكَ هِيَ مَصادِرُ ثِقَتِكَ الحَقيقِيَّة.',
    highEn: 'Your sense of self-worth comes from within, not from a screen. You do not need likes to feel good about who you are, and that is a powerful place to be.',
    highAr: 'إحساسُكَ بِقيمَتِكَ يَأتي مِن داخِلِك، وَلَيسَ مِن شاشَة. لا تَحتاجُ لِلإعجاباتِ لِتَشعُرَ بالرِّضا عَن نَفسِك، وهذا مَكانٌ قَوِيٌّ لِتَكونَ فيه.',
  },
  sleep: {
    lowEn: 'Sleep is when your brain processes emotions, consolidates memories, and recharges. Late-night scrolling steals that from you. Try charging your phone outside your bedroom and replacing screen time with something calming like reading or stretching.',
    lowAr: 'النَّومُ هُوَ الوَقتُ الَّذي يُعالِجُ فيهِ دِماغُكَ المَشاعِرَ ويُعَزِّزُ الذَّاكِرَةَ ويُعيدُ شَحنَ طاقَتِك. التَّصَفُّحُ اللَّيلِيُّ يَسرِقُ ذلِكَ مِنك. جَرِّب شَحنَ هاتِفِكَ خارِجَ غُرفَةِ نَومِكَ واستِبدالَ وَقتِ الشَّاشَةِ بِشَيءٍ مُهَدِّئٍ كالقِراءَةِ أوِ التَّمَدُّد.',
    highEn: 'You are protecting your sleep, and that is one of the best things you can do for your mental health. Waking up rested means you start the day with a clearer mind and steadier emotions.',
    highAr: 'أنتَ تَحمي نَومَك، وهذا مِن أفضَلِ الأشياءِ الَّتي يُمكِنُكَ فِعلُها لِصِحَّتِكَ النَّفسِيَّة. الاستيقاظُ مُرتاحًا يَعني أنَّكَ تَبدَأُ اليَومَ بِعَقلٍ أوضَحَ ومَشاعِرَ أكثَرَ استِقرارًا.',
  },
};
