/* ================================================================
   Who Am I Becoming?
   A 12-question self-reported assessment for teens that evaluates
   4 dimensions of identity development. Gives a personalized score
   with actionable insights. Written in Dr. Hala Ali's warm voice.
   ================================================================ */

export interface IdentityCompassQuestion {
  id: string;
  dimension: 'selfConcept' | 'belonging' | 'culturalIdentity' | 'futureVision';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface IdentityCompassDimension {
  key: 'selfConcept' | 'belonging' | 'culturalIdentity' | 'futureVision';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface IdentityCompassTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: IdentityCompassDimension[] = [
  { key: 'selfConcept', titleEn: 'Self-Understanding', titleAr: 'فَهمُ الذَّات', iconName: 'Compass', color: '#9B6B9E', maxScore: 15 },
  { key: 'belonging', titleEn: 'Belonging & Friendship', titleAr: 'الانتِماءُ والصَّداقَة', iconName: 'Users', color: '#25D366', maxScore: 15 },
  { key: 'culturalIdentity', titleEn: 'Cultural Identity', titleAr: 'الهُوِيَّةُ الثَّقافِيَّة', iconName: 'Globe', color: '#C8A97D', maxScore: 15 },
  { key: 'futureVision', titleEn: 'Future Vision', titleAr: 'رُؤيَةُ المُستَقبَل', iconName: 'Sparkles', color: '#D4836A', maxScore: 15 },
];

export const questions: IdentityCompassQuestion[] = [
  // ─── SELF-UNDERSTANDING (3 questions) ───
  {
    id: 'self-1',
    dimension: 'selfConcept',
    textEn: 'I have a good sense of who I am and what makes me, me.',
    textAr: 'لَدَيَّ إحساسٌ جَيِّدٌ بِمَن أكونُ وما الَّذي يَجعَلُني أنا.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'self-2',
    dimension: 'selfConcept',
    textEn: 'I know what matters to me and what my values are.',
    textAr: 'أعرِفُ ما يُهِمُّني وما هِيَ قِيَمي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'self-3',
    dimension: 'selfConcept',
    textEn: 'I feel comfortable being myself around other people.',
    textAr: 'أشعُرُ بالرَّاحَةِ في أن أكونَ نَفسي حَولَ الآخَرين.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── BELONGING & FRIENDSHIP (3 questions) ───
  {
    id: 'belong-1',
    dimension: 'belonging',
    textEn: 'I have at least one person I can talk to about anything.',
    textAr: 'لَدَيَّ شَخصٌ واحِدٌ عَلى الأقَلِّ يُمكِنُني التَّحَدُّثُ مَعَهُ عَن أيِّ شَيء.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'belong-2',
    dimension: 'belonging',
    textEn: 'I feel like I truly belong in my friend group.',
    textAr: 'أشعُرُ بِأنَّني أنتَمي حَقًّا إلى مَجموعَةِ أصدِقائي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'belong-3',
    dimension: 'belonging',
    textEn: 'I feel accepted for who I really am, not just who others want me to be.',
    textAr: 'أشعُرُ بالقَبولِ لِمَن أكونُ فِعلًا، وَلَيسَ فَقَط لِمَن يُريدُني الآخَرونَ أن أكون.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── CULTURAL IDENTITY (3 questions) ───
  {
    id: 'culture-1',
    dimension: 'culturalIdentity',
    textEn: 'I feel proud of my family\'s cultural background.',
    textAr: 'أشعُرُ بالفَخرِ بِالخَلفِيَّةِ الثَّقافِيَّةِ لِعائِلَتي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'culture-2',
    dimension: 'culturalIdentity',
    textEn: 'I can navigate between my home culture and my social or school culture without losing myself.',
    textAr: 'أستَطيعُ التَّنَقُّلَ بَينَ ثَقافَةِ بَيتي وثَقافَةِ مُجتَمَعي أو مَدرَسَتي دونَ أن أفقِدَ نَفسي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'culture-3',
    dimension: 'culturalIdentity',
    textEn: 'I feel comfortable talking about my cultural identity with friends.',
    textAr: 'أشعُرُ بالرَّاحَةِ عِندَ التَّحَدُّثِ عَن هُوِيَّتي الثَّقافِيَّةِ مَعَ أصدِقائي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },

  // ─── FUTURE VISION (3 questions) ───
  {
    id: 'future-1',
    dimension: 'futureVision',
    textEn: 'I feel hopeful about my future.',
    textAr: 'أشعُرُ بالأمَلِ تِجاهَ مُستَقبَلي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'future-2',
    dimension: 'futureVision',
    textEn: 'I have goals or dreams that genuinely excite me.',
    textAr: 'لَدَيَّ أهدافٌ أو أحلامٌ تُثيرُ حَماسي فِعلًا.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
  {
    id: 'future-3',
    dimension: 'futureVision',
    textEn: 'I believe I can handle whatever challenges come my way.',
    textAr: 'أؤمِنُ بِأنَّني أستَطيعُ التَّعامُلَ مَعَ أيِّ تَحَدِّياتٍ تَأتي في طَريقي.',
    options: [
      { value: 1, labelEn: 'Never/Rarely', labelAr: 'أبدًا / نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Usually', labelAr: 'عادةً' },
      { value: 5, labelEn: 'Almost always', labelAr: 'تقريبًا دائمًا' },
    ],
  },
];

export const tiers: IdentityCompassTier[] = [
  {
    min: 12,
    max: 24,
    titleEn: 'Discovering Your Path',
    titleAr: 'اكتِشافُ طَريقِك',
    summaryEn: "If you feel a little lost right now, please know that this is one of the most normal things in the world. Figuring out who you are is not a straight line — it is a winding journey, and the fact that you are asking the question means you are already on it. You do not need to have everything figured out. With some support and space to explore, you will find your footing.",
    summaryAr: 'إذا كُنتَ تَشعُرُ بِالضَّياعِ قَليلًا الآن، فَاعلَم أنَّ هذا مِن أكثَرِ الأشياءِ طَبيعِيَّةً في العالَم. اكتِشافُ مَن أنتَ لَيسَ خَطًّا مُستَقيمًا — إنَّهُ رِحلَةٌ مُتَعَرِّجَة، وحَقيقَةُ أنَّكَ تَطرَحُ السُّؤالَ تَعني أنَّكَ بالفِعلِ في طَريقِك. لا تَحتاجُ أن يَكونَ كُلُّ شَيءٍ واضِحًا. مَعَ بَعضِ الدَّعمِ والمِساحَةِ لِلاستِكشاف، سَتَجِدُ مَوطِئَ قَدَمِك.',
    color: '#C4878A',
    suggestedServices: ['under-18-counseling', 'social-confidence-friendship'],
  },
  {
    min: 25,
    max: 44,
    titleEn: 'Growing Into Yourself',
    titleAr: 'النُّمُوُّ نَحوَ ذاتِك',
    summaryEn: "You are in the beautiful, sometimes messy middle of becoming who you are. Some parts of your identity feel clear, while others are still forming — and that is perfectly okay. This is the season of growth, of trying things on and seeing what fits. Keep leaning into the parts of yourself that feel real, and give yourself grace where you are still figuring things out.",
    summaryAr: 'أنتَ في المَرحَلَةِ الجَميلَة، وأحيانًا الفَوضَوِيَّة، مِن رِحلَةِ أن تُصبِحَ مَن أنت. بَعضُ أجزاءِ هُوِيَّتِكَ تَبدو واضِحَة، بَينَما أُخرى لا تَزالُ تَتَشَكَّل — وهذا طَبيعِيٌّ تَمامًا. هذا مَوسِمُ النُّمُوّ، مَوسِمُ تَجرِبَةِ الأشياءِ ومَعرِفَةِ ما يُناسِبُك. استَمِرَّ في الاتِّجاهِ نَحوَ الأجزاءِ الَّتي تَشعُرُ بِأنَّها حَقيقِيَّة، وامنَح نَفسَكَ اللُّطفَ فيما لا تَزالُ تَكتَشِفُه.',
    color: '#C8A97D',
    suggestedServices: ['teen-behavioral-coaching', 'social-confidence-friendship'],
  },
  {
    min: 45,
    max: 60,
    titleEn: 'Strong Sense of Self',
    titleAr: 'إحساسٌ قَوِيٌّ بالذَّات',
    summaryEn: "You have a strong sense of who you are, where you belong, and where you are headed. That does not mean everything is perfect — but it means you have a solid inner compass guiding you. You know your values, you feel connected to the people and culture around you, and you face the future with hope. Keep trusting yourself.",
    summaryAr: 'لَدَيكَ إحساسٌ قَوِيٌّ بِمَن أنت، وأينَ تَنتَمي، وإلى أينَ تَتَّجِه. هذا لا يَعني أنَّ كُلَّ شَيءٍ مِثالِيّ — لكِنَّهُ يَعني أنَّ لَدَيكَ بوصَلَةً داخِلِيَّةً قَوِيَّةً تُرشِدُك. أنتَ تَعرِفُ قِيَمَك، وتَشعُرُ بالارتِباطِ بالنَّاسِ والثَّقافَةِ مِن حَولِك، وتُواجِهُ المُستَقبَلَ بِأمَل. استَمِرَّ في الثِّقَةِ بِنَفسِك.',
    color: '#25D366',
    suggestedServices: ['teen-behavioral-coaching'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  selfConcept: {
    lowEn: 'Feeling unsure about who you are is not a flaw — it is part of growing up. The teen years are when identity takes shape, and that process can feel confusing. Try exploring what you enjoy, what you stand for, and what feels authentic. You do not need all the answers right now.',
    lowAr: 'الشُّعورُ بِعَدَمِ اليَقينِ حَولَ مَن أنتَ لَيسَ عَيبًا — إنَّهُ جُزءٌ مِنَ النُّمُوّ. سَنَواتُ المُراهَقَةِ هِيَ عِندَما تَتَشَكَّلُ الهُوِيَّة، وهذِهِ العَمَلِيَّةُ قَد تَبدو مُحَيِّرَة. جَرِّب استِكشافَ ما تَستَمتِعُ بِه، وما تُؤمِنُ بِه، وما يَبدو حَقيقِيًّا. لا تَحتاجُ كُلَّ الأجوِبَةِ الآن.',
    highEn: 'You have a strong sense of self — you know who you are, what you value, and you feel comfortable in your own skin. That kind of self-awareness is a gift that will guide you through every chapter of life.',
    highAr: 'لَدَيكَ إحساسٌ قَوِيٌّ بِذاتِك — تَعرِفُ مَن أنت، وما تُقَدِّرُه، وتَشعُرُ بالرَّاحَةِ في جِلدِك. هذا النَّوعُ مِنَ الوَعيِ الذَّاتِيِّ هَدِيَّةٌ سَتُرشِدُكَ في كُلِّ فَصلٍ مِن حَياتِك.',
  },
  belonging: {
    lowEn: 'Feeling like you do not belong can be one of the loneliest experiences. But connection is a skill that can be built. Start by being honest with one person about how you feel. You deserve friendships where you are seen, heard, and valued for exactly who you are.',
    lowAr: 'الشُّعورُ بِأنَّكَ لا تَنتَمي قَد يَكونُ مِن أكثَرِ التَّجارِبِ وَحدَة. لكِنَّ التَّواصُلَ مَهارَةٌ يُمكِنُ بِناؤُها. ابدَأ بِأن تَكونَ صادِقًا مَعَ شَخصٍ واحِدٍ حَولَ ما تَشعُرُ بِه. أنتَ تَستَحِقُّ صَداقاتٍ يُرى فيها وَيُسمَعُ ويُقَدَّرُ لِمَن أنتَ بالضَّبط.',
    highEn: 'You feel connected, accepted, and like you truly belong. Those meaningful friendships are one of the most protective factors for mental health. Keep investing in the people who see the real you.',
    highAr: 'تَشعُرُ بالتَّواصُلِ والقَبولِ وبِأنَّكَ تَنتَمي حَقًّا. تِلكَ الصَّداقاتُ المَعنَوِيَّةُ مِن أهَمِّ عَوامِلِ الحِمايَةِ لِلصِّحَّةِ النَّفسِيَّة. استَمِرَّ في الاستِثمارِ في الأشخاصِ الَّذينَ يَرَونَ حَقيقَتَك.',
  },
  culturalIdentity: {
    lowEn: 'Navigating between cultures can feel like you do not fully belong anywhere. That tension is real, and it is something many teens with multicultural backgrounds experience. Your culture is not a burden — it is a superpower. Finding spaces where both sides of you are celebrated can make a big difference.',
    lowAr: 'التَّنَقُّلُ بَينَ الثَّقافاتِ قَد يَجعَلُكَ تَشعُرُ بِأنَّكَ لا تَنتَمي بالكامِلِ لِأيِّ مَكان. هذا التَّوَتُّرُ حَقيقِيّ، وهُوَ شَيءٌ يَختَبِرُهُ كَثيرٌ مِنَ المُراهِقينَ ذَوي الخَلفِيَّاتِ المُتَعَدِّدَةِ الثَّقافات. ثَقافَتُكَ لَيسَت عِبئًا — إنَّها قُوَّةٌ خارِقَة. إيجادُ مَساحاتٍ يُحتَفى فيها بِجانِبَيكَ يُمكِنُ أن يَصنَعَ فَرقًا كَبيرًا.',
    highEn: 'You embrace your cultural roots and move between different worlds with grace. That ability to honor where you come from while being fully present where you are is a rare and beautiful strength.',
    highAr: 'أنتَ تَحتَضِنُ جُذورَكَ الثَّقافِيَّةَ وتَتَنَقَّلُ بَينَ عَوالِمَ مُختَلِفَةٍ بِرَشاقَة. تِلكَ القُدرَةُ عَلى تَكريمِ مَصدَرِكَ مَعَ الحُضورِ الكامِلِ أينَما كُنتَ هِيَ قُوَّةٌ نادِرَةٌ وجَميلَة.',
  },
  futureVision: {
    lowEn: 'If the future feels unclear or even scary, you are not alone. Many teens feel pressure to have it all figured out, but you do not. What matters right now is finding small things that light you up — curiosity, not certainty, is what moves you forward.',
    lowAr: 'إذا كانَ المُستَقبَلُ يَبدو غَيرَ واضِحٍ أو حَتَّى مُخيفًا، فَأنتَ لَستَ وَحدَك. كَثيرٌ مِنَ المُراهِقينَ يَشعُرونَ بالضَّغطِ لِيَكونَ كُلُّ شَيءٍ واضِحًا، لكِنَّكَ لا تَحتاجُ لِذلِك. ما يُهِمُّ الآنَ هُوَ إيجادُ أشياءَ صَغيرَةٍ تُشعِلُ حَماسَك — الفُضولُ وَلَيسَ اليَقينُ هُوَ ما يُحَرِّكُكَ لِلأمام.',
    highEn: 'You look at the future with excitement and confidence. Having goals that excite you and the belief that you can handle challenges is a powerful combination. Keep dreaming big — you have what it takes.',
    highAr: 'تَنظُرُ إلى المُستَقبَلِ بِحَماسٍ وثِقَة. امتِلاكُ أهدافٍ تُثيرُكَ والإيمانُ بِأنَّكَ تَستَطيعُ التَّعامُلَ مَعَ التَّحَدِّياتِ مَزيجٌ قَوِيّ. استَمِرَّ في الحُلمِ الكَبير — لَدَيكَ ما يَلزَمُ لِتَحقيقِه.',
  },
};
