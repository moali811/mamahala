/* ================================================================
   The Adulting Reality Check
   A 15-question self-reported assessment for university students
   that evaluates 5 dimensions of young adult wellness. Gives a
   personalized score with actionable insights. Written in
   Dr. Hala Ali's warm voice.
   ================================================================ */

export interface AdultingCheckQuestion {
  id: string;
  dimension: 'academicStress' | 'imposter' | 'connection' | 'independence' | 'burnout';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface AdultingCheckDimension {
  key: 'academicStress' | 'imposter' | 'connection' | 'independence' | 'burnout';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface AdultingCheckTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: AdultingCheckDimension[] = [
  { key: 'academicStress', titleEn: 'Academic Pressure', titleAr: 'الضَّغطُ الأكادِيمِيّ', iconName: 'BookOpen', color: '#C4878A', maxScore: 15 },
  { key: 'imposter', titleEn: 'Confidence & Imposter Feelings', titleAr: 'الثِّقَةُ ومَشاعِرُ المُحتال', iconName: 'Shield', color: '#7A3B5E', maxScore: 15 },
  { key: 'connection', titleEn: 'Social Connection', titleAr: 'التَّواصُلُ الاجتِماعِيّ', iconName: 'Users', color: '#4A8B6E', maxScore: 15 },
  { key: 'independence', titleEn: 'Adulting Skills', titleAr: 'مَهاراتُ الاستِقلالِيَّة', iconName: 'Key', color: '#C8A97D', maxScore: 15 },
  { key: 'burnout', titleEn: 'Burnout & Energy', titleAr: 'الإرهاقُ والطَّاقَة', iconName: 'Battery', color: '#D4836A', maxScore: 15 },
];

export const questions: AdultingCheckQuestion[] = [
  // ─── ACADEMIC PRESSURE (3 questions) ───
  {
    id: 'acad-1',
    dimension: 'academicStress',
    textEn: 'I feel confident in my ability to manage my workload.',
    textAr: 'أشعُرُ بالثِّقَةِ في قُدرَتي عَلى إدارَةِ عِبءِ عَمَلي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'acad-2',
    dimension: 'academicStress',
    textEn: 'I can handle academic setbacks without spiraling into self-doubt.',
    textAr: 'أستَطيعُ التَّعامُلَ مَعَ الانتِكاساتِ الأكادِيمِيَّةِ دونَ أن أدخُلَ في دَوَّامَةِ الشَّكِّ بالذَّات.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'acad-3',
    dimension: 'academicStress',
    textEn: 'I have healthy ways to cope with exam pressure.',
    textAr: 'لَدَيَّ طُرُقٌ صِحِّيَّةٌ لِلتَّعامُلِ مَعَ ضَغطِ الامتِحانات.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── CONFIDENCE & IMPOSTER FEELINGS (3 questions) ───
  {
    id: 'imp-1',
    dimension: 'imposter',
    textEn: 'I believe I deserve to be where I am academically.',
    textAr: 'أؤمِنُ بِأنَّني أستَحِقُّ أن أكونَ حَيثُ أنا أكادِيمِيًّا.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'imp-2',
    dimension: 'imposter',
    textEn: 'I can accept compliments about my work without dismissing them.',
    textAr: 'أستَطيعُ قَبولَ المَديحِ عَلى عَمَلي دونَ أن أرفُضَهُ أو أُقَلِّلَ مِنه.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'imp-3',
    dimension: 'imposter',
    textEn: 'I feel confident speaking up in class or group discussions.',
    textAr: 'أشعُرُ بالثِّقَةِ عِندَ التَّحَدُّثِ في الصَّفِّ أو في النِّقاشاتِ الجَماعِيَّة.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── SOCIAL CONNECTION (3 questions) ───
  {
    id: 'conn-1',
    dimension: 'connection',
    textEn: 'I have meaningful friendships at university.',
    textAr: 'لَدَيَّ صَداقاتٌ ذاتُ مَعنى في الجامِعَة.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'conn-2',
    dimension: 'connection',
    textEn: 'I feel connected to a community or group on campus.',
    textAr: 'أشعُرُ بالانتِماءِ إلى مُجتَمَعٍ أو مَجموعَةٍ في الحَرَمِ الجامِعِيّ.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'conn-3',
    dimension: 'connection',
    textEn: 'I can reach out for help when I need it without feeling like a burden.',
    textAr: 'أستَطيعُ طَلَبَ المُساعَدَةِ عِندَما أحتاجُها دونَ أن أشعُرَ بِأنَّني عِبءٌ عَلى أحَد.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── ADULTING SKILLS (3 questions) ───
  {
    id: 'indep-1',
    dimension: 'independence',
    textEn: 'I can manage my daily responsibilities (meals, laundry, finances) without falling apart.',
    textAr: 'أستَطيعُ إدارَةَ مَسؤولِيَّاتي اليَومِيَّةِ (الوَجَبات، الغَسيل، المالِيَّات) دونَ أن أنهار.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'indep-2',
    dimension: 'independence',
    textEn: 'I can set boundaries with family while maintaining a loving relationship.',
    textAr: 'أستَطيعُ وَضعَ حُدودٍ مَعَ عائِلَتي مَعَ الحِفاظِ عَلى عَلاقَةٍ مَحَبَّة.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'indep-3',
    dimension: 'independence',
    textEn: 'I feel equipped to handle unexpected challenges on my own.',
    textAr: 'أشعُرُ بِأنَّني مُجَهَّزٌ لِلتَّعامُلِ مَعَ التَّحَدِّياتِ غَيرِ المُتَوَقَّعَةِ بِمُفرَدي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── BURNOUT & ENERGY (3 questions) ───
  {
    id: 'burn-1',
    dimension: 'burnout',
    textEn: 'I get enough rest and downtime between commitments.',
    textAr: 'أحصُلُ عَلى قِسطٍ كافٍ مِنَ الرَّاحَةِ والوَقتِ الخاصِّ بَينَ الالتِزامات.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'burn-2',
    dimension: 'burnout',
    textEn: 'I can say no to things without feeling guilty.',
    textAr: 'أستَطيعُ أن أقولَ "لا" لِلأشياءِ دونَ أن أشعُرَ بالذَّنب.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'burn-3',
    dimension: 'burnout',
    textEn: 'I have activities that genuinely recharge me, not just scrolling or numbing out.',
    textAr: 'لَدَيَّ أنشِطَةٌ تُعيدُ شَحنَ طاقَتي فِعلًا، وَلَيسَ مُجَرَّدَ تَصَفُّحٍ أو تَخديرٍ لِلذَّات.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
];

export const tiers: AdultingCheckTier[] = [
  {
    min: 15,
    max: 30,
    titleEn: 'Running on Empty',
    titleAr: 'تَسيرُ عَلى احتِياطِيّ',
    summaryEn: "The fact that you took this quiz tells me something important — part of you knows you need support, and that part of you is right. University life can feel overwhelming, especially when you are juggling academics, independence, social pressure, and figuring out who you are all at once. You do not have to do this alone. Reaching out is not weakness; it is the smartest thing you can do for yourself right now.",
    summaryAr: 'حَقيقَةُ أنَّكَ أجرَيتَ هذا الاختِبارَ تُخبِرُني بِشَيءٍ مُهِمّ — جُزءٌ مِنكَ يَعرِفُ أنَّكَ تَحتاجُ دَعمًا، وهذا الجُزءُ مُحِقّ. الحَياةُ الجامِعِيَّةُ قَد تَبدو مُرهِقَة، خاصَّةً عِندَما تُوازِنُ بَينَ الدِّراسَةِ والاستِقلالِيَّةِ والضَّغطِ الاجتِماعِيِّ واكتِشافِ مَن أنتَ في آنٍ واحِد. لا يَجِبُ أن تَفعَلَ هذا بِمُفرَدِك. طَلَبُ المُساعَدَةِ لَيسَ ضَعفًا؛ إنَّهُ أذكى شَيءٍ يُمكِنُكَ فِعلُهُ لِنَفسِكَ الآن.',
    color: '#C4878A',
    suggestedServices: ['anxiety-counseling', 'self-development-coaching'],
  },
  {
    min: 31,
    max: 55,
    titleEn: 'Finding Your Balance',
    titleAr: 'إيجادُ تَوازُنِك',
    summaryEn: "You are navigating the transition to adulthood with a mix of strengths and growing edges — and that is exactly where most university students are. Some areas of your life feel steady, while others could use some attention. Think of this as an invitation to fine-tune, not an alarm. With a bit of intentional support, you can build the confidence and resilience to thrive, not just survive.",
    summaryAr: 'أنتَ تُبحِرُ في مَرحَلَةِ الانتِقالِ إلى البُلوغِ بِمَزيجٍ مِنَ القُوى وجَوانِبِ النُّمُوّ — وهذا بالضَّبطِ أينَ يَكونُ مُعظَمُ طُلَّابِ الجامِعَة. بَعضُ جَوانِبِ حَياتِكَ تَبدو مُستَقِرَّة، بَينَما أُخرى تَحتاجُ بَعضَ الاهتِمام. فَكِّر في هذا كَدَعوَةٍ لِلتَّحسين، وَلَيسَ كَجَرَسِ إنذار. مَعَ قَليلٍ مِنَ الدَّعمِ المَقصود، يُمكِنُكَ بِناءُ الثِّقَةِ والمُرونَةِ لِتَزدَهِر، وَلَيسَ فَقَط لِتَنجو.',
    color: '#C8A97D',
    suggestedServices: ['self-development-coaching', 'life-coaching'],
  },
  {
    min: 56,
    max: 75,
    titleEn: 'Thriving in Adulthood',
    titleAr: 'مُزدَهِرٌ في مَرحَلَةِ البُلوغ',
    summaryEn: "You are doing something remarkable — you are not just surviving university, you are thriving. You manage your responsibilities, maintain meaningful connections, take care of your energy, and believe in yourself. That does not happen by accident; it reflects real emotional maturity and self-awareness. Keep going, and remember that even people who are thriving benefit from checking in with themselves.",
    summaryAr: 'أنتَ تَفعَلُ شَيئًا رائِعًا — أنتَ لا تَنجو فَقَط في الجامِعَة، بَل تَزدَهِر. تُديرُ مَسؤولِيَّاتِك، وتُحافِظُ عَلى عَلاقاتٍ ذاتِ مَعنى، وتَعتَني بِطاقَتِك، وتُؤمِنُ بِنَفسِك. هذا لا يَحدُثُ بالصُّدفَة؛ إنَّهُ يَعكِسُ نُضجًا عاطِفِيًّا حَقيقِيًّا ووَعيًا ذاتِيًّا. استَمِرّ، وتَذَكَّر أنَّ حَتَّى المُزدَهِرينَ يَستَفيدونَ مِن مُراجَعَةِ أنفُسِهِم.',
    color: '#25D366',
    suggestedServices: ['life-coaching'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  academicStress: {
    lowEn: 'Academic pressure can feel crushing, especially when your identity feels tied to your grades. Remember: a bad mark is information, not a verdict on your worth. Building healthy study habits and learning to bounce back from setbacks are skills that will serve you far beyond university.',
    lowAr: 'الضَّغطُ الأكادِيمِيُّ قَد يَبدو ساحِقًا، خاصَّةً عِندَما تَشعُرُ بِأنَّ هُوِيَّتَكَ مُرتَبِطَةٌ بِدَرَجاتِك. تَذَكَّر: الدَّرَجَةُ السَّيِّئَةُ مَعلومَة، وَلَيسَت حُكمًا عَلى قيمَتِك. بِناءُ عاداتِ دِراسَةٍ صِحِّيَّةٍ وتَعَلُّمُ التَّعافي مِنَ الانتِكاساتِ مَهاراتٌ سَتَخدُمُكَ أبعَدَ بِكَثيرٍ مِنَ الجامِعَة.',
    highEn: 'You handle academic pressure with confidence and resilience. You know how to manage your workload, cope with exam stress, and bounce back from setbacks. That emotional steadiness is a real asset.',
    highAr: 'تَتَعامَلُ مَعَ الضَّغطِ الأكادِيمِيِّ بِثِقَةٍ ومُرونَة. تَعرِفُ كَيفَ تُديرُ عِبءَ عَمَلِك، وتَتَعامَلُ مَعَ ضَغطِ الامتِحانات، وتَنهَضُ مِنَ الانتِكاسات. هذا الاستِقرارُ العاطِفِيُّ قُوَّةٌ حَقيقِيَّة.',
  },
  imposter: {
    lowEn: 'Imposter syndrome is incredibly common among university students — especially high-achieving ones. That voice telling you that you do not belong or that you fooled everyone? It is lying. You earned your place. Try keeping a "proof file" — a list of accomplishments, positive feedback, and moments you are proud of. Read it when doubt creeps in.',
    lowAr: 'مُتَلازِمَةُ المُحتالِ شائِعَةٌ بِشَكلٍ لا يُصَدَّقُ بَينَ طُلَّابِ الجامِعَة — خاصَّةً المُتَفَوِّقينَ مِنهُم. ذلِكَ الصَّوتُ الَّذي يُخبِرُكَ بِأنَّكَ لا تَنتَمي أو أنَّكَ خَدَعتَ الجَميع؟ إنَّهُ يَكذِب. أنتَ استَحقَقتَ مَكانَك. جَرِّب الاحتِفاظَ بِـ"مِلَفِّ إثبات" — قائِمَةٌ بِالإنجازاتِ والتَّعليقاتِ الإيجابِيَّةِ واللَّحَظاتِ الَّتي تَفتَخِرُ بِها. اقرَأها عِندَما يَتَسَلَّلُ الشَّكّ.',
    highEn: 'You own your achievements with grace. You know you belong, you can receive positive feedback without brushing it off, and you speak up with confidence. That inner belief in yourself is powerful.',
    highAr: 'تَمتَلِكُ إنجازاتِكَ بِرَشاقَة. تَعرِفُ أنَّكَ تَنتَمي، وتَستَطيعُ تَقَبُّلَ المَديحِ دونَ رَفضِه، وتَتَحَدَّثُ بِثِقَة. هذا الإيمانُ الدَّاخِلِيُّ بِنَفسِكَ قُوَّةٌ عَظيمَة.',
  },
  connection: {
    lowEn: 'Feeling disconnected at university is more common than you think. Many students feel lonely even in crowded lecture halls. Connection does not have to start big — it can begin with one honest conversation, one study group, or one campus event. You are not a burden for needing people. Needing people is human.',
    lowAr: 'الشُّعورُ بالانفِصالِ في الجامِعَةِ أكثَرُ شُيوعًا مِمَّا تَظُنّ. كَثيرٌ مِنَ الطُّلَّابِ يَشعُرونَ بالوَحدَةِ حَتَّى في قاعاتِ المُحاضَراتِ المُزدَحِمَة. التَّواصُلُ لا يَجِبُ أن يَبدَأَ كَبيرًا — يُمكِنُ أن يَبدَأَ بِمُحادَثَةٍ صادِقَةٍ واحِدَة، أو مَجموعَةِ دِراسَة، أو حَدَثٍ جامِعِيّ. أنتَ لَستَ عِبئًا لِأنَّكَ تَحتاجُ النَّاس. الاحتِياجُ لِلنَّاسِ إنسانِيّ.',
    highEn: 'You have built meaningful connections and feel part of a community. You can ask for help without shame, and you invest in the people around you. Social connection is one of the strongest shields against burnout and loneliness.',
    highAr: 'لَقَد بَنَيتَ عَلاقاتٍ ذاتَ مَعنى وتَشعُرُ بِأنَّكَ جُزءٌ مِن مُجتَمَع. تَستَطيعُ طَلَبَ المُساعَدَةِ دونَ خَجَل، وتَستَثمِرُ في النَّاسِ مِن حَولِك. التَّواصُلُ الاجتِماعِيُّ مِن أقوى الدُّروعِ ضِدَّ الإرهاقِ والوَحدَة.',
  },
  independence: {
    lowEn: 'Adulting is hard — and nobody really teaches you how to do it. If daily responsibilities feel overwhelming, know that this is a learning curve, not a character flaw. Start with one system: a meal plan, a simple budget, or a weekly routine. Small structures create big stability.',
    lowAr: 'الاستِقلالِيَّةُ صَعبَة — ولا أحَدَ يُعَلِّمُكَ فِعلًا كَيفَ تَفعَلُها. إذا كانَتِ المَسؤولِيَّاتُ اليَومِيَّةُ تَبدو مُرهِقَة، اعلَم أنَّ هذا مُنحَنى تَعَلُّم، وَلَيسَ عَيبًا في الشَّخصِيَّة. ابدَأ بِنِظامٍ واحِد: خُطَّةُ وَجَبات، أو مِيزانِيَّةٌ بَسيطَة، أو رَوتينٌ أُسبوعِيّ. الهَياكِلُ الصَّغيرَةُ تَصنَعُ استِقرارًا كَبيرًا.',
    highEn: 'You are navigating independence with real competence — managing responsibilities, setting boundaries with family, and handling the unexpected. These life skills are the foundation of a confident, self-sufficient adult life.',
    highAr: 'تُبحِرُ في الاستِقلالِيَّةِ بِكَفاءَةٍ حَقيقِيَّة — تُديرُ المَسؤولِيَّات، وتَضَعُ حُدودًا مَعَ العائِلَة، وتَتَعامَلُ مَعَ غَيرِ المُتَوَقَّع. مَهاراتُ الحَياةِ هذِهِ أساسُ حَياةٍ بالِغَةٍ واثِقَةٍ ومُستَقِلَّة.',
  },
  burnout: {
    lowEn: 'Running on empty is not a badge of honor — it is a warning sign. Your brain and body need real rest, not just distraction. Try identifying one thing you can drop this week, and replace screen-numbing time with something that actually fills your cup: a walk, a conversation, cooking, or simply doing nothing on purpose.',
    lowAr: 'السَّيرُ عَلى احتِياطِيٍّ لَيسَ وِسامَ شَرَف — إنَّهُ عَلامَةُ تَحذير. عَقلُكَ وجِسمُكَ يَحتاجانِ راحَةً حَقيقِيَّة، وَلَيسَ مُجَرَّدَ إلهاء. جَرِّب تَحديدَ شَيءٍ واحِدٍ يُمكِنُكَ التَّخَلِّي عَنهُ هذا الأُسبوع، واستَبدِل وَقتَ التَّخديرِ بالشَّاشَةِ بِشَيءٍ يَملأُ كوبَكَ فِعلًا: مَشيَة، مُحادَثَة، طَبخ، أو بِبَساطَةٍ لا شَيءَ عَن قَصد.',
    highEn: 'You know how to protect your energy and recharge in ways that actually work. Being able to say no, rest without guilt, and engage in activities that genuinely fill you up — that is mature self-care in action.',
    highAr: 'تَعرِفُ كَيفَ تَحمي طاقَتَكَ وتُعيدُ شَحنَها بِطُرُقٍ ناجِعَةٍ فِعلًا. القُدرَةُ عَلى قَولِ "لا"، والرَّاحَةُ دونَ ذَنب، والانخِراطُ في أنشِطَةٍ تَملأُكَ حَقًّا — هذِهِ عِنايَةٌ ذاتِيَّةٌ ناضِجَةٌ في التَّطبيق.',
  },
};
