/* ================================================================
   Mama Hala's Relationship Compass
   A 16-question assessment that evaluates 4 dimensions of
   relationship health for couples. Gives a personalized score
   with actionable insights. Written in Dr. Hala Ali's warm voice.
   This is Mama Hala's original framework.
   ================================================================ */

export interface RelationshipHealthQuestion {
  id: string;
  dimension: 'communication' | 'differences' | 'connection' | 'vision';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface RelationshipHealthDimension {
  key: 'communication' | 'differences' | 'connection' | 'vision';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface RelationshipHealthTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: RelationshipHealthDimension[] = [
  { key: 'communication', titleEn: 'Communication Quality', titleAr: 'جودةُ التواصل', iconName: 'MessageCircle', color: '#7A3B5E', maxScore: 20 },
  { key: 'differences', titleEn: 'Navigating Differences', titleAr: 'التعاملُ مع الاختلافات', iconName: 'Shield', color: '#C4878A', maxScore: 20 },
  { key: 'connection', titleEn: 'Emotional Connection', titleAr: 'الترابطُ العاطفيّ', iconName: 'Heart', color: '#D4836A', maxScore: 20 },
  { key: 'vision', titleEn: 'Shared Vision', titleAr: 'الرؤيةُ المشتركة', iconName: 'Compass', color: '#C8A97D', maxScore: 20 },
];

export const questions: RelationshipHealthQuestion[] = [
  // ─── COMMUNICATION QUALITY (4 questions) ───
  {
    id: 'comm-1',
    dimension: 'communication',
    textEn: 'When my partner shares something important, I give them my full attention.',
    textAr: 'عندما يُشاركُني شريكي شيئًا مهمًّا، أمنحُه اهتمامي الكامل.',
    options: [
      { value: 1, labelEn: 'Rarely — I am often distracted or multitasking', labelAr: 'نادرًا — غالبًا أكونُ مشتّتًا أو أقومُ بمهامٍّ متعدّدة' },
      { value: 2, labelEn: 'Sometimes — it depends on my mood', labelAr: 'أحيانًا — يعتمدُ على مزاجي' },
      { value: 3, labelEn: 'Often — I try my best to listen', labelAr: 'غالبًا — أبذلُ قصارى جهدي للاستماع' },
      { value: 4, labelEn: 'Usually — I make them a priority', labelAr: 'عادةً — أجعلُهم أولويّة' },
      { value: 5, labelEn: 'Almost always — being present is important to me', labelAr: 'تقريبًا دائمًا — الحضورُ مهمٌّ بالنسبةِ لي' },
    ],
  },
  {
    id: 'comm-2',
    dimension: 'communication',
    textEn: 'I feel safe expressing my needs and feelings to my partner without fear of judgment.',
    textAr: 'أشعرُ بالأمانِ في التعبيرِ عن احتياجاتي ومشاعري لشريكي دونَ خوفٍ من الحُكم.',
    options: [
      { value: 1, labelEn: 'Rarely — I keep most things to myself', labelAr: 'نادرًا — أحتفظُ بمعظمِ الأشياءِ لنفسي' },
      { value: 2, labelEn: 'Sometimes — only when I feel brave', labelAr: 'أحيانًا — فقط عندما أشعرُ بالشجاعة' },
      { value: 3, labelEn: 'Often — though some topics are harder', labelAr: 'غالبًا — رغم أنّ بعضَ المواضيعِ أصعب' },
      { value: 4, labelEn: 'Usually — we have built trust over time', labelAr: 'عادةً — بنينا الثقةَ بمرورِ الوقت' },
      { value: 5, labelEn: 'Almost always — I feel completely safe to be open', labelAr: 'تقريبًا دائمًا — أشعرُ بأمانٍ تامّ لأكونَ منفتحًا' },
    ],
  },
  {
    id: 'comm-3',
    dimension: 'communication',
    textEn: 'During disagreements, we stay respectful and avoid harsh words, name-calling, or sarcasm.',
    textAr: 'خلالَ الخلافات، نبقى محترمَين ونتجنّبُ الكلماتِ القاسيةَ والإهاناتِ والسخرية.',
    options: [
      { value: 1, labelEn: 'Rarely — arguments often turn hurtful', labelAr: 'نادرًا — الشجاراتُ غالبًا تصبحُ مؤذية' },
      { value: 2, labelEn: 'Sometimes — we say things we regret', labelAr: 'أحيانًا — نقولُ أشياءَ نندمُ عليها' },
      { value: 3, labelEn: 'Often — we try but sometimes slip up', labelAr: 'غالبًا — نحاولُ لكن أحيانًا نخطئ' },
      { value: 4, labelEn: 'Usually — we keep it constructive', labelAr: 'عادةً — نبقيه بنّاءً' },
      { value: 5, labelEn: 'Almost always — respect is non-negotiable for us', labelAr: 'تقريبًا دائمًا — الاحترامُ غيرُ قابلٍ للتفاوض' },
    ],
  },
  {
    id: 'comm-4',
    dimension: 'communication',
    textEn: 'When I have a concern, I express it as a request rather than a criticism of my partner.',
    textAr: 'عندما يكونُ لديَّ قلق، أُعبِّرُ عنه كطلبٍ بدلاً من انتقادٍ لشريكي.',
    options: [
      { value: 1, labelEn: 'Rarely — I tend to blame or criticize', labelAr: 'نادرًا — أميلُ إلى اللّومِ أو الانتقاد' },
      { value: 2, labelEn: 'Sometimes — especially when frustrated', labelAr: 'أحيانًا — خاصّةً عندما أكونُ مُحبَطًا' },
      { value: 3, labelEn: 'Often — I am learning to reframe my words', labelAr: 'غالبًا — أتعلّمُ إعادةَ صياغةِ كلماتي' },
      { value: 4, labelEn: 'Usually — I focus on what I need', labelAr: 'عادةً — أركِّزُ على ما أحتاجُه' },
      { value: 5, labelEn: 'Almost always — I communicate with care', labelAr: 'تقريبًا دائمًا — أتواصلُ بعناية' },
    ],
  },

  // ─── NAVIGATING DIFFERENCES (4 questions) ───
  {
    id: 'diff-1',
    dimension: 'differences',
    textEn: 'When we disagree, we work toward a solution rather than trying to "win" the argument.',
    textAr: 'عندما نختلف، نعملُ نحو حلٍّ بدلاً من محاولةِ "الفوز" بالنقاش.',
    options: [
      { value: 1, labelEn: 'Rarely — arguments become a power struggle', labelAr: 'نادرًا — الشجاراتُ تصبحُ صراعَ قوى' },
      { value: 2, labelEn: 'Sometimes — one of us usually gives in', labelAr: 'أحيانًا — أحدُنا عادةً يستسلم' },
      { value: 3, labelEn: 'Often — we try to find middle ground', labelAr: 'غالبًا — نحاولُ إيجادَ أرضيّةٍ وسطى' },
      { value: 4, labelEn: 'Usually — compromise comes naturally to us', labelAr: 'عادةً — التسويةُ تأتي بشكلٍ طبيعيّ' },
      { value: 5, labelEn: 'Almost always — we are on the same team', labelAr: 'تقريبًا دائمًا — نحنُ في نفسِ الفريق' },
    ],
  },
  {
    id: 'diff-2',
    dimension: 'differences',
    textEn: 'After an argument, we make an effort to repair and reconnect rather than letting it linger.',
    textAr: 'بعدَ الشجار، نبذلُ جهدًا للإصلاحِ وإعادةِ التواصلِ بدلاً من تركِه يتراكم.',
    options: [
      { value: 1, labelEn: 'Rarely — we go silent for days', labelAr: 'نادرًا — نصمتُ لأيّام' },
      { value: 2, labelEn: 'Sometimes — one of us eventually breaks the ice', labelAr: 'أحيانًا — أحدُنا يكسرُ الجمودَ في النهاية' },
      { value: 3, labelEn: 'Often — we try to talk it through', labelAr: 'غالبًا — نحاولُ مناقشةَ الأمر' },
      { value: 4, labelEn: 'Usually — we repair quickly and sincerely', labelAr: 'عادةً — نُصلحُ بسرعةٍ وإخلاص' },
      { value: 5, labelEn: 'Almost always — repair is a priority for both of us', labelAr: 'تقريبًا دائمًا — الإصلاحُ أولويّةٌ لكلينا' },
    ],
  },
  {
    id: 'diff-3',
    dimension: 'differences',
    textEn: 'I am willing to be influenced by my partner — their perspective can change my mind.',
    textAr: 'أنا مستعدٌّ لأن أتأثّرَ بشريكي — وجهةُ نظرِه يمكنُ أن تُغيِّرَ رأيي.',
    options: [
      { value: 1, labelEn: 'Rarely — I hold firm to my position', labelAr: 'نادرًا — أتمسّكُ بموقفي' },
      { value: 2, labelEn: 'Sometimes — on small things only', labelAr: 'أحيانًا — في الأمورِ الصغيرةِ فقط' },
      { value: 3, labelEn: 'Often — I try to stay open-minded', labelAr: 'غالبًا — أحاولُ أن أبقى متفتّحَ الذّهن' },
      { value: 4, labelEn: 'Usually — I value their input', labelAr: 'عادةً — أُقدِّرُ مُدخلاتِهم' },
      { value: 5, labelEn: 'Almost always — we shape decisions together', labelAr: 'تقريبًا دائمًا — نُشكِّلُ القراراتِ معًا' },
    ],
  },
  {
    id: 'diff-4',
    dimension: 'differences',
    textEn: 'We can accept that some differences between us will never be fully resolved — and that is okay.',
    textAr: 'نستطيعُ تقبُّلَ أنّ بعضَ الاختلافاتِ بيننا لن تُحَلَّ بالكامل — وهذا لا بأسَ به.',
    options: [
      { value: 1, labelEn: 'Rarely — unresolved issues cause constant friction', labelAr: 'نادرًا — القضايا غيرُ المحلولةِ تُسبّبُ احتكاكًا مستمرًّا' },
      { value: 2, labelEn: 'Sometimes — it is hard to let go', labelAr: 'أحيانًا — من الصعبِ التخلّي' },
      { value: 3, labelEn: 'Often — we are learning to live with some differences', labelAr: 'غالبًا — نتعلّمُ التعايشَ مع بعضِ الاختلافات' },
      { value: 4, labelEn: 'Usually — we respect each other\'s uniqueness', labelAr: 'عادةً — نحترمُ تفرُّدَ كلٍّ منّا' },
      { value: 5, labelEn: 'Almost always — our differences enrich our relationship', labelAr: 'تقريبًا دائمًا — اختلافاتُنا تُثري علاقتَنا' },
    ],
  },

  // ─── EMOTIONAL CONNECTION (4 questions) ───
  {
    id: 'conn-1',
    dimension: 'connection',
    textEn: 'When my partner reaches out to me emotionally — a smile, a touch, a question — I respond warmly.',
    textAr: 'عندما يتواصلُ شريكي معي عاطفيًّا — ابتسامة، لمسة، سؤال — أستجيبُ بدفء.',
    options: [
      { value: 1, labelEn: 'Rarely — I often miss or ignore their bids', labelAr: 'نادرًا — غالبًا أتجاهلُ إشاراتِهم العاطفيّة' },
      { value: 2, labelEn: 'Sometimes — I get caught up in my own world', labelAr: 'أحيانًا — أنغمسُ في عالمي الخاصّ' },
      { value: 3, labelEn: 'Often — I try to be responsive', labelAr: 'غالبًا — أحاولُ أن أكونَ متجاوبًا' },
      { value: 4, labelEn: 'Usually — I enjoy connecting with them', labelAr: 'عادةً — أستمتعُ بالتواصلِ معهم' },
      { value: 5, labelEn: 'Almost always — responding to my partner brings me joy', labelAr: 'تقريبًا دائمًا — الاستجابةُ لشريكي تمنحُني السعادة' },
    ],
  },
  {
    id: 'conn-2',
    dimension: 'connection',
    textEn: 'I feel emotionally safe being vulnerable with my partner — sharing fears, insecurities, or dreams.',
    textAr: 'أشعرُ بالأمانِ العاطفيِّ في إظهارِ ضعفي لشريكي — مشاركةُ المخاوفِ وعدمِ الأمانِ والأحلام.',
    options: [
      { value: 1, labelEn: 'Rarely — vulnerability feels risky with them', labelAr: 'نادرًا — الضعفُ يبدو خطيرًا معهم' },
      { value: 2, labelEn: 'Sometimes — only about certain things', labelAr: 'أحيانًا — فقط بشأنِ أشياءَ معيّنة' },
      { value: 3, labelEn: 'Often — I am opening up more over time', labelAr: 'غالبًا — أنفتحُ أكثرَ بمرورِ الوقت' },
      { value: 4, labelEn: 'Usually — they make me feel accepted', labelAr: 'عادةً — يُشعرونني بالقبول' },
      { value: 5, labelEn: 'Almost always — my partner is my safe haven', labelAr: 'تقريبًا دائمًا — شريكي هو ملاذي الآمن' },
    ],
  },
  {
    id: 'conn-3',
    dimension: 'connection',
    textEn: 'We maintain physical affection and closeness that feels natural and mutual.',
    textAr: 'نحافظُ على المودّةِ الجسديّةِ والقُربِ بشكلٍ طبيعيٍّ ومتبادل.',
    options: [
      { value: 1, labelEn: 'Rarely — physical closeness has faded', labelAr: 'نادرًا — القُربُ الجسديُّ تلاشى' },
      { value: 2, labelEn: 'Sometimes — it feels forced or one-sided', labelAr: 'أحيانًا — يبدو مُتكلَّفًا أو من طرفٍ واحد' },
      { value: 3, labelEn: 'Often — we have our moments', labelAr: 'غالبًا — لدينا لحظاتُنا' },
      { value: 4, labelEn: 'Usually — affection flows naturally', labelAr: 'عادةً — المودّةُ تتدفّقُ بشكلٍ طبيعيّ' },
      { value: 5, labelEn: 'Almost always — we are deeply connected physically and emotionally', labelAr: 'تقريبًا دائمًا — مترابطون بعمقٍ جسديًّا وعاطفيًّا' },
    ],
  },
  {
    id: 'conn-4',
    dimension: 'connection',
    textEn: 'I genuinely know my partner — their current worries, hopes, and what matters most to them right now.',
    textAr: 'أعرفُ شريكي حقًّا — همومُه الحاليّة، وآمالُه، وما يهمُّه أكثرَ الآن.',
    options: [
      { value: 1, labelEn: 'Rarely — we have grown apart', labelAr: 'نادرًا — ابتعدنا عن بعضِنا' },
      { value: 2, labelEn: 'Sometimes — I know the basics', labelAr: 'أحيانًا — أعرفُ الأساسيّات' },
      { value: 3, labelEn: 'Often — I check in but could do more', labelAr: 'غالبًا — أتواصلُ لكن يمكنُني فعلُ المزيد' },
      { value: 4, labelEn: 'Usually — I make an effort to stay current', labelAr: 'عادةً — أبذلُ جهدًا للبقاءِ على اطّلاع' },
      { value: 5, labelEn: 'Almost always — I know their inner world deeply', labelAr: 'تقريبًا دائمًا — أعرفُ عالمَهم الداخليَّ بعمق' },
    ],
  },

  // ─── SHARED VISION (4 questions) ───
  {
    id: 'vis-1',
    dimension: 'vision',
    textEn: 'We share a clear sense of where our relationship is headed — our hopes for the future align.',
    textAr: 'نتشاركُ رؤيةً واضحةً لمسارِ علاقتِنا — آمالُنا للمستقبلِ متوافقة.',
    options: [
      { value: 1, labelEn: 'Rarely — we seem to want different things', labelAr: 'نادرًا — يبدو أنّنا نريدُ أشياءَ مختلفة' },
      { value: 2, labelEn: 'Sometimes — we agree on some things', labelAr: 'أحيانًا — نتّفقُ على بعضِ الأشياء' },
      { value: 3, labelEn: 'Often — we have a general direction', labelAr: 'غالبًا — لدينا اتّجاهٌ عامّ' },
      { value: 4, labelEn: 'Usually — our vision is fairly aligned', labelAr: 'عادةً — رؤيتُنا متوافقةٌ إلى حدٍّ كبير' },
      { value: 5, labelEn: 'Almost always — we dream and plan together', labelAr: 'تقريبًا دائمًا — نحلمُ ونُخطِّطُ معًا' },
    ],
  },
  {
    id: 'vis-2',
    dimension: 'vision',
    textEn: 'We have rituals or traditions that are meaningful to both of us (date nights, morning coffee, annual trips).',
    textAr: 'لدينا طقوسٌ أو تقاليدُ ذاتُ معنًى لكلينا (سهراتٌ رومانسيّة، قهوةُ الصباح، رحلاتٌ سنويّة).',
    options: [
      { value: 1, labelEn: 'Rarely — we have no shared rituals', labelAr: 'نادرًا — ليست لدينا طقوسٌ مشتركة' },
      { value: 2, labelEn: 'Sometimes — we used to but they faded', labelAr: 'أحيانًا — كانت لدينا لكنّها تلاشت' },
      { value: 3, labelEn: 'Often — we have a few that we enjoy', labelAr: 'غالبًا — لدينا بعضٌ نستمتعُ بها' },
      { value: 4, labelEn: 'Usually — our rituals keep us connected', labelAr: 'عادةً — طقوسُنا تُبقينا مترابطَين' },
      { value: 5, labelEn: 'Almost always — our rituals are sacred to us', labelAr: 'تقريبًا دائمًا — طقوسُنا مقدّسةٌ لنا' },
    ],
  },
  {
    id: 'vis-3',
    dimension: 'vision',
    textEn: 'We create meaning together — our relationship has a purpose beyond just being together.',
    textAr: 'نصنعُ معنًى معًا — علاقتُنا لها هدفٌ أبعدُ من مجرّدِ أن نكونَ معًا.',
    options: [
      { value: 1, labelEn: 'Rarely — I am not sure why we are together sometimes', labelAr: 'نادرًا — أحيانًا لستُ متأكّدًا لماذا نحنُ معًا' },
      { value: 2, labelEn: 'Sometimes — we go through the motions', labelAr: 'أحيانًا — نسيرُ مع التيّار' },
      { value: 3, labelEn: 'Often — we are building something meaningful', labelAr: 'غالبًا — نبني شيئًا ذا معنى' },
      { value: 4, labelEn: 'Usually — our partnership has depth and purpose', labelAr: 'عادةً — شراكتُنا لها عمقٌ وهدف' },
      { value: 5, labelEn: 'Almost always — together, we are creating a beautiful life', labelAr: 'تقريبًا دائمًا — معًا نصنعُ حياةً جميلة' },
    ],
  },
  {
    id: 'vis-4',
    dimension: 'vision',
    textEn: 'I actively support my partner\'s individual dreams and they support mine.',
    textAr: 'أدعمُ أحلامَ شريكي الفرديّةَ بنشاطٍ وهو يدعمُ أحلامي.',
    options: [
      { value: 1, labelEn: 'Rarely — we feel like we hold each other back', labelAr: 'نادرًا — نشعرُ أنّنا نُعيقُ بعضَنا' },
      { value: 2, labelEn: 'Sometimes — support is inconsistent', labelAr: 'أحيانًا — الدعمُ غيرُ متّسق' },
      { value: 3, labelEn: 'Often — we encourage each other when we can', labelAr: 'غالبًا — نُشجِّعُ بعضَنا عندما نستطيع' },
      { value: 4, labelEn: 'Usually — we champion each other\'s growth', labelAr: 'عادةً — ندعمُ نموَّ بعضِنا البعض' },
      { value: 5, labelEn: 'Almost always — we are each other\'s biggest cheerleader', labelAr: 'تقريبًا دائمًا — كلٌّ منّا أكبرُ داعمٍ للآخر' },
    ],
  },
];

export const tiers: RelationshipHealthTier[] = [
  {
    min: 16,
    max: 35,
    titleEn: 'Your Relationship Needs Attention',
    titleAr: 'علاقتُكما تحتاجُ اهتمامًا',
    summaryEn: "Thank you for your honesty — it takes real courage to look at your relationship with open eyes. What you are experiencing is more common than you think, and it is not a sign of failure. It is a sign that something needs to shift. Couples in this range often see the most transformative change with professional support. The fact that you are here means you care — and that matters more than any score.",
    summaryAr: 'شكرًا لصدقِكما — يتطلّبُ شجاعةً حقيقيّةً النظرَ إلى علاقتِكما بعيونٍ مفتوحة. ما تمرّان به أكثرُ شيوعًا ممّا تظنّان، وليس علامةَ فشل. بل علامةٌ على أنّ شيئًا ما يحتاجُ تغييرًا. الأزواجُ في هذا النطاقِ غالبًا ما يشهدون أكثرَ التحوُّلاتِ عمقًا مع الدعمِ المهنيّ. حقيقةُ أنّكما هنا تعني أنّكما تهتمّان — وهذا أهمُّ من أيِّ نتيجة.',
    color: '#C4878A',
    suggestedServices: ['couples-counseling'],
  },
  {
    min: 36,
    max: 58,
    titleEn: 'A Good Foundation to Build On',
    titleAr: 'أساسٌ جيّدٌ للبناءِ عليه',
    summaryEn: "Your relationship has real strengths, and there are areas where intentional effort could deepen your connection significantly. Many couples in this range find that a few guided sessions help them move from 'good' to 'great.' You have built something worth investing in — and small, consistent improvements can make all the difference.",
    summaryAr: 'علاقتُكما لها نقاطُ قوّةٍ حقيقيّة، وهناك مجالاتٌ يمكنُ فيها للجهدِ المُوجَّه أن يُعمِّقَ ترابطَكما بشكلٍ كبير. كثيرٌ من الأزواجِ في هذا النطاقِ يجدون أنّ بضعَ جلساتٍ مُوجَّهة تساعدُهم على الانتقالِ من "جيّد" إلى "رائع." لقد بنيتما شيئًا يستحقُّ الاستثمار — والتحسيناتُ الصغيرةُ والمستمرّةُ يمكنُ أن تصنعَ كلَّ الفرق.',
    color: '#C8A97D',
    suggestedServices: ['couples-counseling', 'relationship-enrichment'],
  },
  {
    min: 59,
    max: 80,
    titleEn: 'A Thriving Partnership',
    titleAr: 'شراكةٌ مزدهرة',
    summaryEn: "This is beautiful to see. Your relationship reflects deep communication, mutual respect, emotional closeness, and a shared sense of purpose. Continue nurturing what you have — even thriving partnerships benefit from periodic enrichment and conscious appreciation. What you have built together is something truly special.",
    summaryAr: 'ما أجملَ رؤيةَ هذا. علاقتُكما تعكسُ تواصلاً عميقًا واحترامًا متبادلاً وقُربًا عاطفيًّا وإحساسًا مشتركًا بالهدف. استمرّا في رعايةِ ما لديكما — حتّى الشراكاتُ المزدهرةُ تستفيدُ من الإثراءِ الدوريِّ والتقديرِ الواعي. ما بنيتماه معًا شيءٌ مميّزٌ حقًّا.',
    color: '#25D366',
    suggestedServices: ['relationship-enrichment'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  communication: {
    lowEn: 'Communication is the lifeline of your relationship. Consider setting aside 10 minutes each day for a device-free check-in. Start with "How are you really doing?" and listen without trying to fix anything.',
    lowAr: 'التواصلُ شريانُ حياةِ علاقتِكما. فكِّرا في تخصيصِ 10 دقائقَ كلَّ يومٍ لتواصلٍ بدونِ أجهزة. ابدَآ بـ "كيف حالُك حقًّا؟" واستمعا دونَ محاولةِ إصلاحِ شيء.',
    highEn: 'Your communication is a real strength — you listen, express, and stay respectful even in hard moments. This is the foundation everything else is built on.',
    highAr: 'تواصلُكما نقطةُ قوّةٍ حقيقيّة — تستمعان وتُعبِّران وتبقيان محترمَين حتّى في اللحظاتِ الصعبة. هذا الأساسُ الذي يُبنى عليه كلُّ شيءٍ آخر.',
  },
  differences: {
    lowEn: 'How you navigate conflict matters more than whether you have conflict. Try approaching your next disagreement as teammates solving a puzzle together rather than opponents in a debate.',
    lowAr: 'كيفيّةُ تعاملِكما مع الخلافاتِ أهمُّ من وجودِ الخلافاتِ نفسِها. حاولا أن تتعاملا مع خلافِكما القادمِ كزملاءِ فريقٍ يحلّون لغزًا معًا بدلاً من خصومٍ في مناظرة.',
    highEn: 'You navigate differences with maturity and grace — knowing when to compromise, when to accept, and when to repair. This resilience keeps your bond strong.',
    highAr: 'تتعاملان مع الاختلافاتِ بنضجٍ ورشاقة — تعرفان متى تتنازلان ومتى تتقبّلان ومتى تُصلحان. هذه المرونةُ تُبقي رابطتَكما قويّة.',
  },
  connection: {
    lowEn: 'Emotional connection is built in small, daily moments of turning toward each other. This week, try noticing when your partner makes a small bid for connection — a comment, a glance, a touch — and respond warmly.',
    lowAr: 'الترابطُ العاطفيُّ يُبنى في لحظاتٍ يوميّةٍ صغيرةٍ من التوجّهِ نحو بعضِكما. هذا الأسبوع، حاولا ملاحظةَ عندما يُقدِّمُ شريكُكما إشارةً صغيرةً للتواصل — تعليق، نظرة، لمسة — واستجيبا بدفء.',
    highEn: 'Your emotional connection runs deep — you respond to each other, stay vulnerable, and maintain closeness. This intimacy is what makes your relationship a true partnership.',
    highAr: 'ترابطُكما العاطفيُّ عميق — تستجيبان لبعضِكما وتبقيان منفتحَين وتحافظان على القُرب. هذه الألفةُ هي ما يجعلُ علاقتَكما شراكةً حقيقيّة.',
  },
  vision: {
    lowEn: 'A shared vision gives your relationship direction and meaning. Find time to dream together — ask each other "Where do we want to be in five years?" and really listen to the answer.',
    lowAr: 'الرؤيةُ المشتركةُ تمنحُ علاقتَكما اتّجاهًا ومعنًى. أوجِدا وقتًا للحلمِ معًا — اسألا بعضَكما "أين نريدُ أن نكونَ بعدَ خمسِ سنوات؟" واستمعا حقًّا للإجابة.',
    highEn: 'You share a beautiful vision for your life together — your rituals, dreams, and mutual support create a relationship that is truly greater than the sum of its parts.',
    highAr: 'تتشاركان رؤيةً جميلةً لحياتِكما معًا — طقوسُكما وأحلامُكما ودعمُكما المتبادلُ يخلقان علاقةً أعظمَ حقًّا من مجموعِ أجزائِها.',
  },
};
