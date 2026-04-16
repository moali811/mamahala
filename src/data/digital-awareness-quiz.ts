/* ================================================================
   The Digital Self-Awareness Profile
   An 18-question self-assessment for adults that evaluates
   6 dimensions of digital psychological well-being. Inspired by
   Dr. Julie Smith's approach to translating clinical psychology
   into accessible insight, Dr. Nicole LePera's attachment-informed
   self-awareness framework, and Creators 4 Mental Health's
   research on the creator economy's psychological impact.

   Written in Dr. Hala Ali's warm, incisive clinical voice —
   no judgment, no lectures, just clarity.

   ── CLINICAL & ETHICAL NOTES ──
   • This is an EDUCATIONAL self-reflection tool, NOT a diagnostic
     instrument. It does not screen for or diagnose any mental
     health condition (including Internet Gaming Disorder, ICD-11).
   • All items are positive-framed: higher scores = healthier
     relationship with technology. Dimension names reflect the
     positive pole (e.g. "Digital Autonomy" not "Digital Dependency").
   • Tier messaging is strengths-based and non-pathologizing.
     Lowest tier includes safety-aware language acknowledging that
     digital overwhelm can coexist with clinical conditions.
   • Culturally adapted for bilingual EN/AR audiences including
     Gulf/MENA collectivist contexts where digital privacy norms
     differ from Western individualist assumptions.
   ================================================================ */

export type DigitalAwarenessDimensionKey =
  | 'autonomy'
  | 'comparison'
  | 'boundaries'
  | 'authenticity'
  | 'regulation'
  | 'intentionality';

export interface DigitalAwarenessQuestion {
  id: string;
  dimension: DigitalAwarenessDimensionKey;
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface DigitalAwarenessDimension {
  key: DigitalAwarenessDimensionKey;
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface DigitalAwarenessTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

/* ── Dimensions ──────────────────────────────────────────────── */

export const dimensions: DigitalAwarenessDimension[] = [
  {
    key: 'autonomy',
    titleEn: 'Digital Autonomy',
    titleAr: 'الاستِقلالِيَّةُ الرَّقمِيَّة',
    iconName: 'Smartphone',
    color: '#C4878A',
    maxScore: 15,
  },
  {
    key: 'comparison',
    titleEn: 'Comparison Vulnerability',
    titleAr: 'التَّأَثُّرُ بالمُقارَنَة',
    iconName: 'Scale',
    color: '#7A3B5E',
    maxScore: 15,
  },
  {
    key: 'boundaries',
    titleEn: 'Digital Boundaries',
    titleAr: 'الحُدودُ الرَّقمِيَّة',
    iconName: 'Shield',
    color: '#5A8B6F',
    maxScore: 15,
  },
  {
    key: 'authenticity',
    titleEn: 'Online Authenticity',
    titleAr: 'الأَصالَةُ الرَّقمِيَّة',
    iconName: 'Fingerprint',
    color: '#C8A97D',
    maxScore: 15,
  },
  {
    key: 'regulation',
    titleEn: 'Emotional Regulation Online',
    titleAr: 'التَّنظيمُ العاطِفِيُّ الرَّقمِيّ',
    iconName: 'Heart',
    color: '#D4836A',
    maxScore: 15,
  },
  {
    key: 'intentionality',
    titleEn: 'Digital Intentionality',
    titleAr: 'القَصْدِيَّةُ الرَّقمِيَّة',
    iconName: 'Target',
    color: '#6C7BD4',
    maxScore: 15,
  },
];

/* ── Questions (18 total — 3 per dimension, positive-framed) ─ */

const likertOptions: DigitalAwarenessQuestion['options'] = [
  { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبَدًا / نادِرًا' },
  { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
  { value: 3, labelEn: 'Often', labelAr: 'غالِبًا' },
  { value: 4, labelEn: 'Usually', labelAr: 'عادَةً' },
  { value: 5, labelEn: 'Almost always', labelAr: 'تَقريبًا دائِمًا' },
];

export const questions: DigitalAwarenessQuestion[] = [
  // ─── DIGITAL DEPENDENCY (3 questions) ───
  {
    id: 'dep-1',
    dimension: 'autonomy',
    textEn:
      'I can leave my phone in another room for an hour without feeling compelled to check it.',
    textAr:
      'أستَطيعُ تَركَ هاتِفي في غُرفَةٍ أُخرى لِمُدَّةِ ساعَةٍ دونَ أن أشعُرَ بِاندِفاعٍ لِتَفَقُّدِه.',
    options: likertOptions,
  },
  {
    id: 'dep-2',
    dimension: 'autonomy',
    textEn:
      'When I catch myself reaching for my phone out of habit, I can pause and consciously choose whether to pick it up.',
    textAr:
      'عِندَما أجِدُ نَفسي أمُدُّ يَدي إلى هاتِفي بِدافِعِ العادَة، أستَطيعُ التَّوَقُّفَ والاختِيارَ الواعيَ بَينَ أن أتَناوَلَهُ أو لا.',
    options: likertOptions,
  },
  {
    id: 'dep-3',
    dimension: 'autonomy',
    textEn:
      'I go through my day without needing to document or share what I am doing online.',
    textAr:
      'أعيشُ يَومي دونَ الحاجَةِ إلى تَوثيقِ أو مُشارَكَةِ ما أفعَلُهُ عَلى الإنتِرنِت.',
    options: likertOptions,
  },

  // ─── COMPARISON VULNERABILITY (3 questions) ───
  {
    id: 'comp-1',
    dimension: 'comparison',
    textEn:
      "When I see someone's career milestone or lifestyle post, I can feel genuinely happy for them without questioning my own path.",
    textAr:
      'عِندَما أرى مُنجَزًا مِهنِيًّا أو مَنشورًا عَن أسلوبِ حَياةِ شَخصٍ ما، أستَطيعُ أن أفرَحَ لَهُ بِصِدقٍ دونَ أن أُشَكِّكَ في مَساري.',
    options: likertOptions,
  },
  {
    id: 'comp-2',
    dimension: 'comparison',
    textEn:
      'When I notice curated content online, I can remind myself it is a highlight reel and move on without it affecting my mood.',
    textAr:
      'حينَ أُلاحِظُ مُحتَوىً مُنتَقىً عَلى الإنتِرنِت، أستَطيعُ تَذكيرَ نَفسي بِأنَّهُ لَحَظاتٌ مُختارَةٌ والمُضِيَّ قُدُمًا دونَ أن يُؤَثِّرَ عَلى مِزاجي.',
    options: likertOptions,
  },
  {
    id: 'comp-3',
    dimension: 'comparison',
    textEn:
      'My sense of professional or personal success is defined by my own values, not by what gets attention online.',
    textAr:
      'إحساسي بالنَّجاحِ المِهنِيِّ أوِ الشَّخصِيِّ يُحَدِّدُهُ قِيَمي الخاصَّة، وَلَيسَ ما يَحظى بالاهتِمامِ عَلى الإنتِرنِت.',
    options: likertOptions,
  },

  // ─── DIGITAL BOUNDARIES (3 questions) ───
  {
    id: 'bound-1',
    dimension: 'boundaries',
    textEn:
      'I have clear times in my day when I am fully present — no scrolling, no checking, no background noise from notifications.',
    textAr:
      'لَدَيَّ أوقاتٌ واضِحَةٌ في يَومي أكونُ فيها حاضِرًا تَمامًا — بِلا تَصَفُّح، بِلا تَفَقُّد، بِلا ضَجيجِ إشعاراتٍ في الخَلفِيَّة.',
    options: likertOptions,
  },
  {
    id: 'bound-2',
    dimension: 'boundaries',
    textEn:
      'I can decline to respond to non-urgent messages without guilt or anxiety about what the other person might think.',
    textAr:
      'أستَطيعُ تَأجيلَ الرَّدِّ عَلى الرَّسائِلِ غَيرِ العاجِلَةِ دونَ شُعورٍ بالذَّنبِ أو القَلَقِ بِشَأنِ ما قَد يَظُنُّهُ الآخَرون.',
    options: likertOptions,
  },
  {
    id: 'bound-3',
    dimension: 'boundaries',
    textEn:
      'I protect my mornings or evenings from screen time because I understand how it affects my nervous system.',
    textAr:
      'أحمي أوقاتَ صَباحي أو مَسائي مِن وَقتِ الشَّاشَةِ لِأنَّني أفهَمُ كَيفَ يُؤَثِّرُ ذلِكَ عَلى جِهازيَ العَصَبِيّ.',
    options: likertOptions,
  },

  // ─── ONLINE AUTHENTICITY (3 questions) ───
  {
    id: 'auth-1',
    dimension: 'authenticity',
    textEn:
      'What I share online reflects who I actually am, not a version of myself I think others want to see.',
    textAr:
      'ما أُشارِكُهُ عَلى الإنتِرنِت يَعكِسُ مَن أنا حَقًّا، وَلَيسَ نُسخَةً مِنّي أعتَقِدُ أنَّ الآخَرينَ يُريدونَ رُؤيَتَها.',
    options: likertOptions,
  },
  {
    id: 'auth-2',
    dimension: 'authenticity',
    textEn:
      'I feel comfortable not posting about significant moments in my life — they do not need external validation to feel meaningful.',
    textAr:
      'أشعُرُ بالارتِياحِ لِعَدَمِ نَشرِ لَحَظاتٍ مُهِمَّةٍ مِن حَياتي — فَهيَ لا تَحتاجُ لِتَأكيدٍ خارِجِيٍّ لِتَكونَ ذاتَ مَعنى.',
    options: likertOptions,
  },
  {
    id: 'auth-3',
    dimension: 'authenticity',
    textEn:
      'I can express a genuine opinion online even when I know it might not be popular or get engagement.',
    textAr:
      'أستَطيعُ التَّعبيرَ عَن رَأيٍ صادِقٍ عَلى الإنتِرنِت حَتَّى عِندَما أعلَمُ أنَّهُ قَد لا يَكونُ شائِعًا أو يَحظى بِتَفاعُل.',
    options: likertOptions,
  },

  // ─── EMOTIONAL REGULATION ONLINE (3 questions) ───
  {
    id: 'reg-1',
    dimension: 'regulation',
    textEn:
      'When I encounter upsetting content, I can notice my emotional response and choose how to engage rather than reacting impulsively.',
    textAr:
      'عِندَما أُصادِفُ مُحتَوىً مُزعِجًا، أستَطيعُ مُلاحَظَةَ استِجابَتي العاطِفِيَّةِ واختِيارَ كَيفِيَّةِ التَّفاعُلِ بَدَلاً مِنَ الاندِفاع.',
    options: likertOptions,
  },
  {
    id: 'reg-2',
    dimension: 'regulation',
    textEn:
      'When difficult emotions arise, I can sit with them without reaching for my phone as a distraction.',
    textAr:
      'حينَ تَظهَرُ مَشاعِرُ صَعبَة، أستَطيعُ الجُلوسَ مَعَها دونَ الوُصولِ إلى هاتِفي كَإلهاء.',
    options: likertOptions,
  },
  {
    id: 'reg-3',
    dimension: 'regulation',
    textEn:
      'After spending time on social media, I generally feel the same or better — not drained, anxious, or irritable.',
    textAr:
      'بَعدَ قَضاءِ وَقتٍ عَلى وَسائِلِ التَّواصُلِ الاجتِماعِيّ، أشعُرُ عُمومًا بالشَّيءِ نَفسِهِ أو أفضَل — لا أشعُرُ بالاستِنزافِ أو القَلَقِ أوِ الانزِعاج.',
    options: likertOptions,
  },

  // ─── DIGITAL INTENTIONALITY (3 questions) ───
  {
    id: 'intent-1',
    dimension: 'intentionality',
    textEn:
      'Before opening a social media app, I usually have a clear purpose — not just filling time or seeking stimulation.',
    textAr:
      'قَبلَ فَتحِ تَطبيقِ تَواصُلٍ اجتِماعِيّ، عادَةً ما يَكونُ لَدَيَّ هَدَفٌ واضِح — لَيسَ فَقَط لِمَلءِ الوَقتِ أوِ البَحثِ عَن إثارَة.',
    options: likertOptions,
  },
  {
    id: 'intent-2',
    dimension: 'intentionality',
    textEn:
      'I regularly review which accounts I follow and whether they align with the person I want to become.',
    textAr:
      'أُراجِعُ بانتِظامٍ الحِساباتِ الَّتي أتابِعُها وما إذا كانَت تَتَوافَقُ مَعَ الشَّخصِ الَّذي أُريدُ أن أُصبِحَه.',
    options: likertOptions,
  },
  {
    id: 'intent-3',
    dimension: 'intentionality',
    textEn:
      'I spend more time creating, learning, or connecting meaningfully online than passively consuming content.',
    textAr:
      'أقضي وَقتًا أكثَرَ في الإبداعِ أوِ التَّعَلُّمِ أوِ التَّواصُلِ الهادِفِ عَلى الإنتِرنِت مِمَّا أقضيهِ في الاستِهلاكِ السَّلبِيِّ لِلمُحتَوى.',
    options: likertOptions,
  },
];

/* ── Tiers (4 tiers, score range 18-90) ──────────────────────── */

export const tiers: DigitalAwarenessTier[] = [
  {
    min: 18,
    max: 36,
    titleEn: 'Digital Overwhelm',
    titleAr: 'الإرهاقُ الرَّقمِيّ',
    summaryEn:
      "Your answers suggest that your digital life may be running on autopilot — and it is costing you more than you realize. This is not a character flaw. It is the predictable outcome of platforms designed to capture your attention at the expense of your well-being. The dopamine loops, the variable rewards, the social comparison engines — these are engineering decisions, not personal failures. The fact that you completed this assessment means something important: you are ready to look at this honestly. That is where real change begins.\n\nA note of care: sometimes heavy digital use is a way of coping with something deeper — anxiety, depression, grief, loneliness, or a major life transition. If your relationship with your phone feels less like a habit and more like a lifeline, or if you notice persistent low mood, withdrawal from people, or difficulty functioning in daily life, please consider reaching out to a qualified mental health professional. You deserve support, not just strategies.",
    summaryAr:
      'تُشيرُ إجاباتُكَ إلى أنَّ حَياتَكَ الرَّقمِيَّةَ قَد تَسيرُ عَلى الطَّيَّارِ الآلِيّ — وهِيَ تُكَلِّفُكَ أكثَرَ مِمَّا تُدرِك. هذا لَيسَ عَيبًا في شَخصِيَّتِك. إنَّهُ النَّتيجَةُ المُتَوَقَّعَةُ لِمِنَصَّاتٍ مُصَمَّمَةٍ لِلاستِحواذِ عَلى انتِباهِكَ عَلى حِسابِ سَلامَتِك. حَلَقاتُ الدّوبامين، المُكافَآتُ المُتَغَيِّرَة، مُحَرِّكاتُ المُقارَنَةِ الاجتِماعِيَّة — هذِهِ قَراراتٌ هَندَسِيَّة، وَلَيسَت إخفاقاتٍ شَخصِيَّة. حَقيقَةُ أنَّكَ أتمَمتَ هذا التَّقييمَ تَعني شَيئًا مُهِمًّا: أنتَ مُستَعِدٌّ لِلنَّظَرِ في هذا بِصِدق. هُناكَ يَبدَأُ التَّغييرُ الحَقيقِيّ.\n\nمُلاحَظَةُ عِنايَة: أحيانًا يَكونُ الاستِخدامُ الرَّقمِيُّ المُكَثَّفُ طَريقَةً لِلتَّعامُلِ مَعَ شَيءٍ أعمَق — قَلَق، اكتِئاب، حُزن، وَحدَة، أو مَرحَلَةٌ انتِقالِيَّةٌ كَبيرَةٌ في الحَياة. إذا كانَت عَلاقَتُكَ بِهاتِفِكَ تَبدو أقَلَّ كَعادَةٍ وأكثَرَ كَطَوقِ نَجاة، أو إذا لاحَظتَ انخِفاضًا مُستَمِرًّا في المِزاج، أو انسِحابًا مِنَ النَّاس، أو صُعوبَةً في أداءِ مَهامِّ الحَياةِ اليَومِيَّة، يُرجى التَّواصُلُ مَعَ مُختَصٍّ مُؤَهَّلٍ في الصِّحَّةِ النَّفسِيَّة. أنتَ تَستَحِقُّ الدَّعم، لا الاستِراتيجِيَّاتِ فَقَط.',
    color: '#C4878A',
    suggestedServices: ['individual-counseling', 'cbt-adults'],
  },
  {
    min: 37,
    max: 54,
    titleEn: 'Developing Digital Awareness',
    titleAr: 'الوَعيُ الرَّقمِيُّ النَّامي',
    summaryEn:
      "You are beginning to see the patterns — and that awareness is the first and hardest step. Some dimensions of your digital life are working for you, while others may be quietly shaping your mood, your self-image, or your relationships in ways you haven't fully examined. This is the stage where most people get stuck, because awareness without action can feel worse than not noticing at all. The key now is to pick one area that resonated most and build a single, sustainable habit around it. Not a digital detox. Not a dramatic overhaul. Just one deliberate shift.",
    summaryAr:
      'بَدَأتَ تَرى الأنماط — وهذا الوَعيُ هُوَ الخُطوَةُ الأُولى والأصعَب. بَعضُ أبعادِ حَياتِكَ الرَّقمِيَّةِ تَعمَلُ لِصالِحِك، بَينَما أبعادٌ أُخرى قَد تُشَكِّلُ بِهُدوءٍ مِزاجَكَ أو صورَتَكَ الذَّاتِيَّةَ أو عَلاقاتِكَ بِطُرُقٍ لَمْ تَفحَصْها بالكامِل. هذِهِ هي المَرحَلَةُ الَّتي يَعلَقُ فيها مُعظَمُ النَّاس، لِأنَّ الوَعيَ بِدونِ فِعلٍ قَد يَبدو أسوَأَ مِن عَدَمِ المُلاحَظَة. المِفتاحُ الآنَ هُوَ اختِيارُ مَجالٍ واحِدٍ كانَ لَهُ الأثَرُ الأكبَرُ وبِناءُ عادَةٍ واحِدَةٍ مُستَدامَةٍ حَولَه. لَيسَ حِميَةً رَقمِيَّة. لَيسَ إصلاحًا جَذرِيًّا. فَقَط تَحَوُّلٌ واحِدٌ مَقصود.',
    color: '#C8A97D',
    suggestedServices: ['individual-counseling', 'life-coaching'],
  },
  {
    min: 55,
    max: 72,
    titleEn: 'Digitally Conscious',
    titleAr: 'الوَعيُ الرَّقمِيُّ الرَّاسِخ',
    summaryEn:
      "You have built real agency over your digital life. You use technology with intention rather than compulsion, and you have developed the self-awareness to notice when a platform is pulling you away from your values. This is not a small thing — in an economy designed to hijack attention, maintaining this level of consciousness is an active skill. The areas where you scored lower are worth gentle attention, not alarm. They likely reflect the places where old patterns still have a foothold, and a little intentional work there could make the difference between a good relationship with technology and an excellent one.",
    summaryAr:
      'لَقَد بَنَيتَ قُدرَةً حَقيقِيَّةً عَلى التَّحَكُّمِ في حَياتِكَ الرَّقمِيَّة. تَستَخدِمُ التِّكنولوجيا بِقَصدٍ وَلَيسَ بِقَهر، وقَد طَوَّرتَ الوَعيَ الذَّاتِيَّ لِمُلاحَظَةِ مَتى تَسحَبُكَ مِنَصَّةٌ ما بَعيدًا عَن قِيَمِك. هذا لَيسَ أمرًا بَسيطًا — في اقتِصادٍ مُصَمَّمٍ لِاختِطافِ الانتِباه، الحِفاظُ عَلى هذا المُستَوى مِنَ الوَعيِ مَهارَةٌ فَعَّالَة. المَجالاتُ الَّتي حَصَلتَ فيها عَلى دَرَجاتٍ أقَلَّ تَستَحِقُّ انتِباهًا لَطيفًا لا قَلَقًا. غالِبًا ما تَعكِسُ الأماكِنَ الَّتي لا تَزالُ الأنماطُ القَديمَةُ تَحتَفِظُ فيها بِمَوطِئِ قَدَم.',
    color: '#5A8B6F',
    suggestedServices: ['life-coaching'],
  },
  {
    min: 73,
    max: 90,
    titleEn: 'Digital Mastery',
    titleAr: 'الإتقانُ الرَّقمِيّ',
    summaryEn:
      "This is rare — and it is worth acknowledging. Your screen time genuinely serves your life rather than consuming it. You have done the internal work of understanding why you reach for your phone, what you need from digital spaces, and what you are willing to give up. You likely model healthy digital behavior for the people around you, whether you realize it or not. The one thing to watch: mastery can quietly erode during major life transitions — stress, grief, career changes. Check in with yourself during those seasons, because the pull of old patterns tends to resurface when your nervous system is dysregulated.",
    summaryAr:
      'هذا نادِر — ويَستَحِقُّ الاعتِراف. وَقتُ شاشَتِكَ يَخدِمُ حَياتَكَ حَقًّا بَدَلاً مِن أن يَستَهلِكَها. لَقَد قُمتَ بالعَمَلِ الدَّاخِلِيِّ لِفَهمِ لِماذا تَمتَدُّ يَدُكَ إلى هاتِفِك، وماذا تَحتاجُ مِنَ الفَضاءاتِ الرَّقمِيَّة، وما الَّذي تَرضى بالتَّخَلِّي عَنه. أنتَ عَلى الأرجَحِ تَكونُ قُدوَةً في السُّلوكِ الرَّقمِيِّ الصِّحِّيِّ لِمَن حَولَك، سَواءَ أدرَكتَ ذلِكَ أم لا. الشَّيءُ الوَحيدُ الَّذي يَجِبُ مُراقَبَتُه: الإتقانُ قَد يَتَآكَلُ بِهُدوءٍ خِلالَ التَّحَوُّلاتِ الكَبيرَة — التَّوَتُّر، الحُزن، تَغَيُّراتُ المَسيرَة. راجِعْ نَفسَكَ في تِلكَ المَواسِم.',
    color: '#25D366',
    suggestedServices: [],
  },
];

/* ── Dimension Insights (low ≤ 7 / high > 7, out of 15) ──── */

export const dimensionInsights: Record<
  DigitalAwarenessDimensionKey,
  { lowEn: string; lowAr: string; highEn: string; highAr: string }
> = {
  autonomy: {
    lowEn:
      'Your relationship with your phone may have crossed from convenience into compulsion. This is not about willpower — the variable reward schedule of notifications works on the same neurological pathways as slot machines. Your brain is doing exactly what it was designed to do when exposed to intermittent reinforcement. The way forward is not white-knuckling through it, but understanding the trigger-routine-reward cycle and building intentional friction between the urge and the action.',
    lowAr:
      'عَلاقَتُكَ بِهاتِفِكَ قَد تَكونُ تَجاوَزَت مِنَ الرَّاحَةِ إلى القَهر. هذا لا يَتَعَلَّقُ بِقُوَّةِ الإرادَة — جَدوَلُ المُكافَآتِ المُتَغَيِّرَةِ لِلإشعاراتِ يَعمَلُ عَلى نَفسِ المَساراتِ العَصَبِيَّةِ لِآلاتِ القِمار. دِماغُكَ يَفعَلُ بالضَّبطِ ما صُمِّمَ لِفِعلِهِ عِندَ التَّعَرُّضِ لِلتَّعزيزِ المُتَقَطِّع. الطَّريقُ لِلأمامِ لَيسَ المُقاوَمَةَ بِالقُوَّة، بَلْ فَهمُ دَورَةِ المُثير-العادَة-المُكافَأَةِ وبِناءُ احتِكاكٍ مَقصودٍ بَينَ الدَّافِعِ والفِعل.',
    highEn:
      'You have a healthy degree of autonomy from your devices. You use your phone because you choose to, not because something inside you cannot stop. This self-regulation is a genuine psychological strength that many adults never develop.',
    highAr:
      'لَدَيكَ دَرَجَةٌ صِحِّيَّةٌ مِنَ الاستِقلالِيَّةِ عَن أجهِزَتِك. تَستَخدِمُ هاتِفَكَ لِأنَّكَ تَختارُ ذلِك، وَلَيسَ لِأنَّ شَيئًا بِداخِلِكَ لا يَستَطيعُ التَّوَقُّف. هذا التَّنظيمُ الذَّاتِيُّ قُوَّةٌ نَفسِيَّةٌ حَقيقِيَّةٌ لا يُطَوِّرُها كَثيرٌ مِنَ البالِغين.',
  },
  comparison: {
    lowEn:
      "Social comparison is hardwired into the human brain — it predates social media by millennia. But platforms have weaponized it. The algorithm shows you precisely the content most likely to trigger your insecurity, because engagement born from inadequacy is still engagement. The antidote is not avoiding other people's success — it is building a clear internal definition of what success means to you, so that someone else's highlight reel becomes information rather than a threat.",
    lowAr:
      'المُقارَنَةُ الاجتِماعِيَّةُ مَطبوعَةٌ في الدِّماغِ البَشَرِيّ — سَبَقَت وَسائِلَ التَّواصُلِ الاجتِماعِيِّ بِآلافِ السِّنين. لكِنَّ المِنَصَّاتِ حَوَّلَتها إلى سِلاح. الخَوارِزمِيَّةُ تُريكَ بالضَّبطِ المُحتَوى الأكثَرَ قُدرَةً عَلى إثارَةِ انعِدامِ أمانِك، لِأنَّ التَّفاعُلَ النَّابِعَ مِنَ الشُّعورِ بالنَّقصِ يَبقى تَفاعُلاً. التِّرياقُ لَيسَ تَجَنُّبَ نَجاحِ الآخَرين — بَلْ بِناءُ تَعريفٍ داخِلِيٍّ واضِحٍ لِما يَعنيهِ النَّجاحُ لَك.',
    highEn:
      "You have developed a resilient sense of self that doesn't bend under the weight of other people's curated lives. This psychological immunity to social comparison is one of the strongest predictors of long-term well-being in the digital age.",
    highAr:
      'لَقَد طَوَّرتَ إحساسًا مَتينًا بالذَّاتِ لا يَنحَني تَحتَ ثِقَلِ حَياةِ الآخَرينَ المُنتَقاة. هذِهِ المَناعَةُ النَّفسِيَّةُ ضِدَّ المُقارَنَةِ الاجتِماعِيَّةِ مِن أقوى مُؤَشِّراتِ الرَّفاهِيَّةِ طَويلَةِ المَدى في العَصرِ الرَّقمِيّ.',
  },
  boundaries: {
    lowEn:
      'Digital boundaries are not about discipline — they are about nervous system regulation. When you cannot disconnect, it is often because your brain has learned to associate the absence of stimulation with a threat signal. The constant checking is not information-seeking; it is anxiety management. Start by creating just one screen-free boundary that feels manageable, and notice what comes up emotionally when you sit in that quiet. That is the real conversation.',
    lowAr:
      'الحُدودُ الرَّقمِيَّةُ لَيسَت عَنِ الانضِباط — بَلْ عَنْ تَنظيمِ الجِهازِ العَصَبِيّ. عِندَما لا تَستَطيعُ الانفِصال، غالِبًا ما يَكونُ ذلِكَ لِأنَّ دِماغَكَ تَعَلَّمَ أن يَربِطَ غِيابَ التَّحفيزِ بِإشارَةِ تَهديد. التَّفَقُّدُ المُستَمِرُّ لَيسَ بَحثًا عَنْ مَعلومات؛ بَلْ إدارَةٌ لِلقَلَق. ابدَأ بِإنشاءِ حَدٍّ واحِدٍ فَقَط خالٍ مِنَ الشَّاشَةِ يَبدو قابِلاً لِلتَّطبيق، ولاحِظْ ما يَظهَرُ عاطِفِيًّا عِندَما تَجلِسُ في ذلِكَ الهُدوء. تِلكَ هيَ المُحادَثَةُ الحَقيقِيَّة.',
    highEn:
      'You have the ability to create and maintain real space between yourself and your devices. This is not merely a habit — it is a form of emotional self-care that protects your nervous system, your relationships, and your capacity for deep work.',
    highAr:
      'لَدَيكَ القُدرَةُ عَلى خَلقِ مَسافَةٍ حَقيقِيَّةٍ بَينَكَ وبَينَ أجهِزَتِكَ والحِفاظِ عَلَيها. هذِهِ لَيسَت مُجَرَّدَ عادَة — بَلْ شَكلٌ مِنَ الرِّعايَةِ الذَّاتِيَّةِ العاطِفِيَّةِ الَّتي تَحمي جِهازَكَ العَصَبِيَّ وعَلاقاتِكَ وقُدرَتِكَ عَلى العَمَلِ العَميق.',
  },
  authenticity: {
    lowEn:
      "When the version of yourself you present online diverges from who you actually are, it creates what psychologists call self-discrepancy — a gap between the real self and the ideal self. Over time, maintaining that gap becomes exhausting and isolating, because even positive feedback lands on the curated version rather than the real you. Authenticity online does not mean oversharing — choosing privacy is healthy, especially in cultures that value discretion as wisdom. But there is a difference between choosing not to share and feeling like you cannot be yourself if you did. The question is whether your silence is a boundary or a mask.",
    lowAr:
      'عِندَما تَختَلِفُ نُسخَتُكَ عَلى الإنتِرنِت عَمَّن أنتَ فِعلاً، يَخلُقُ ذلِكَ ما يُسَمِّيهِ عُلَماءُ النَّفسِ "التَّبايُنَ الذَّاتِيّ" — فَجوَةٌ بَينَ الذَّاتِ الحَقيقِيَّةِ والذَّاتِ المِثالِيَّة. مَعَ الوَقت، يُصبِحُ الحِفاظُ عَلى هذِهِ الفَجوَةِ مُرهِقًا ومُعزِلاً، لِأنَّ حَتَّى الثَّناءَ الإيجابِيَّ يَقَعُ عَلى النُّسخَةِ المُنتَقاةِ لا الحَقيقِيَّة. الأصالَةُ عَلى الإنتِرنِت لا تَعني الإفراطَ في المُشارَكَة — اختِيارُ الخُصوصِيَّةِ صِحِّيّ، خاصَّةً في الثَّقافاتِ الَّتي تُقَدِّرُ التَّحَفُّظَ كَحِكمَة. لكِنْ هُناكَ فَرقٌ بَينَ اختِيارِ عَدَمِ المُشارَكَة، والشُّعورِ بِأنَّكَ لا تَستَطيعُ أن تَكونَ نَفسَكَ لَو فَعَلت. السُّؤالُ هُوَ: هَل صَمتُكَ حَدٌّ أم قِناع؟',
    highEn:
      "You show up online as yourself, and that takes more courage than most people realize. In a culture that rewards performance, choosing authenticity is an act of psychological strength. The consistency between your online and offline self protects you from the exhaustion of maintaining a persona.",
    highAr:
      'تَظهَرُ عَلى الإنتِرنِت كَما أنت، وهذا يَتَطَلَّبُ شَجاعَةً أكثَرَ مِمَّا يُدرِكُ مُعظَمُ النَّاس. في ثَقافَةٍ تُكافِئُ الأداء، اختِيارُ الأصالَةِ هُوَ فِعلُ قُوَّةٍ نَفسِيَّة. الاتِّساقُ بَينَ ذاتِكَ عَلى الإنتِرنِتِ وخارِجَهُ يَحميكَ مِن إرهاقِ الحِفاظِ عَلى شَخصِيَّةٍ مُصطَنَعَة.',
  },
  regulation: {
    lowEn:
      "Using scrolling to regulate difficult emotions — what clinicians call digital emotional avoidance — is one of the most common patterns in modern adult life. It works in the short term, which is precisely why it is so hard to stop. But it prevents you from developing the internal capacity to sit with discomfort, which is the foundation of all emotional resilience. The question is not whether you feel difficult things. It is whether you let yourself feel them, or whether you reach for your phone instead.",
    lowAr:
      'استِخدامُ التَّصَفُّحِ لِتَنظيمِ المَشاعِرِ الصَّعبَة — ما يُسَمِّيهِ المُختَصُّونَ "التَّجَنُّبَ العاطِفِيَّ الرَّقمِيّ" — هُوَ أحَدُ أكثَرِ الأنماطِ شُيوعًا في حَياةِ البالِغينَ المُعاصِرَة. يَنجَحُ عَلى المَدى القَصير، وهذا بالضَّبطِ لِماذا يَصعُبُ التَّوَقُّفُ عَنه. لكِنَّهُ يَمنَعُكَ مِن تَطويرِ القُدرَةِ الدَّاخِلِيَّةِ عَلى الجُلوسِ مَعَ عَدَمِ الرَّاحَة، وهُوَ أساسُ كُلِّ مُرونَةٍ عاطِفِيَّة. السُّؤالُ لَيسَ ما إذا كُنتَ تَشعُرُ بِأشياءَ صَعبَة. بَلْ ما إذا كُنتَ تَسمَحُ لِنَفسِكَ بِأن تَشعُرَ بِها، أم تَمتَدُّ يَدُكَ إلى هاتِفِكَ بَدَلاً مِن ذلِك.',
    highEn:
      "You have the capacity to encounter difficult content and difficult emotions online without being hijacked by them. This emotional regulation is a skill that protects not only your mental health but your relationships and decision-making in every area of life.",
    highAr:
      'لَدَيكَ القُدرَةُ عَلى مُواجَهَةِ المُحتَوى الصَّعبِ والمَشاعِرِ الصَّعبَةِ عَلى الإنتِرنِت دونَ أن تَختَطِفَك. هذا التَّنظيمُ العاطِفِيُّ مَهارَةٌ تَحمي لَيسَ فَقَط صِحَّتَكَ النَّفسِيَّة، بَلْ عَلاقاتِكَ وقُدرَتِكَ عَلى اتِّخاذِ القَراراتِ في كُلِّ مَجالٍ مِنَ الحَياة.',
  },
  intentionality: {
    lowEn:
      "Most people open social media without knowing why — and that is by design. The absence of intention is the presence of manipulation. When you scroll without purpose, the algorithm fills the vacuum with whatever maximizes your time on the platform, not whatever serves your growth. Intentionality does not mean making every moment productive. It means knowing the difference between choosing to relax with your phone and defaulting to your phone because you cannot tolerate stillness.",
    lowAr:
      'مُعظَمُ النَّاسِ يَفتَحونَ وَسائِلَ التَّواصُلِ الاجتِماعِيِّ دونَ مَعرِفَةِ السَّبَب — وهذا مَقصود. غِيابُ القَصدِيَّةِ هُوَ حُضورُ التَّلاعُب. عِندَما تَتَصَفَّحُ بِلا هَدَف، تَملَأُ الخَوارِزمِيَّةُ الفَراغَ بِما يُزيدُ وَقتَكَ عَلى المِنَصَّة، لا بِما يَخدِمُ نُمُوَّك. القَصدِيَّةُ لا تَعني جَعلَ كُلِّ لَحظَةٍ مُنتِجَة. بَلْ تَعني مَعرِفَةَ الفَرقِ بَينَ أن تَختارَ الاستِرخاءَ مَعَ هاتِفِكَ، وأن تَلجَأَ إلى هاتِفِكَ لِأنَّكَ لا تَحتَمِلُ السُّكون.',
    highEn:
      "You approach your digital life with purpose rather than default. This intentionality is what separates people who use technology as a tool from people who are used by it. You have reclaimed something that the attention economy works very hard to take: your agency.",
    highAr:
      'تَتَعامَلُ مَعَ حَياتِكَ الرَّقمِيَّةِ بِقَصدٍ وَلَيسَ بِشَكلٍ تِلقائِيّ. هذِهِ القَصدِيَّةُ هيَ ما يَفصِلُ النَّاسَ الَّذينَ يَستَخدِمونَ التِّكنولوجيا كَأداةٍ عَنِ النَّاسِ الَّذينَ تَستَخدِمُهُمُ التِّكنولوجيا. لَقَد استَعَدتَ شَيئًا يَعمَلُ اقتِصادُ الانتِباهِ بِجِدٍّ عَلى أخذِه: إرادَتُكَ الحُرَّة.',
  },
};
