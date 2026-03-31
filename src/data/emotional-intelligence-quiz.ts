/* ================================================================
   Child Emotional Intelligence Assessment
   A 12-question parent-reported assessment that evaluates 4 dimensions
   of a child's emotional intelligence (ages 5-17). Gives a personalized
   score with actionable insights. Written in Dr. Hala Ali's warm voice.
   ================================================================ */

export interface EmotionalIntelligenceQuestion {
  id: string;
  dimension: 'awareness' | 'regulation' | 'empathy' | 'social';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface EmotionalIntelligenceDimension {
  key: 'awareness' | 'regulation' | 'empathy' | 'social';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  maxScore: number;
}

export interface EmotionalIntelligenceTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const dimensions: EmotionalIntelligenceDimension[] = [
  { key: 'awareness', titleEn: 'Emotional Awareness', titleAr: 'الوعيُ العاطفيّ', iconName: 'Eye', color: '#D4836A', maxScore: 15 },
  { key: 'regulation', titleEn: 'Emotional Regulation', titleAr: 'التنظيمُ العاطفيّ', iconName: 'Shield', color: '#C4878A', maxScore: 15 },
  { key: 'empathy', titleEn: 'Empathy & Compassion', titleAr: 'التعاطفُ والرّحمة', iconName: 'Heart', color: '#7A3B5E', maxScore: 15 },
  { key: 'social', titleEn: 'Social Skills', titleAr: 'المهاراتُ الاجتماعيّة', iconName: 'Users', color: '#25D366', maxScore: 15 },
];

export const questions: EmotionalIntelligenceQuestion[] = [
  // ─── EMOTIONAL AWARENESS (3 questions) ───
  {
    id: 'aware-1',
    dimension: 'awareness',
    textEn: 'My child can usually name what they are feeling (sad, angry, scared, excited).',
    textAr: 'يستطيعُ طفلي عادةً تسميةَ ما يشعرُ به (حزين، غاضب، خائف، متحمّس).',
    options: [
      { value: 1, labelEn: 'Rarely — they struggle to identify feelings', labelAr: 'نادرًا — يُعاني من تحديدِ مشاعرِه' },
      { value: 2, labelEn: 'Sometimes — only strong emotions', labelAr: 'أحيانًا — فقط المشاعرَ القويّة' },
      { value: 3, labelEn: 'Often — with some guidance', labelAr: 'غالبًا — مع بعضِ التوجيه' },
      { value: 4, labelEn: 'Usually — they have a good emotional vocabulary', labelAr: 'عادةً — لديه مفرداتٌ عاطفيّةٌ جيّدة' },
      { value: 5, labelEn: 'Almost always — they express feelings clearly', labelAr: 'تقريبًا دائمًا — يُعبِّرُ عن مشاعرِه بوضوح' },
    ],
  },
  {
    id: 'aware-2',
    dimension: 'awareness',
    textEn: 'My child notices when someone else is feeling upset, even before being told.',
    textAr: 'يُلاحظُ طفلي عندما يكونُ شخصٌ آخرُ منزعجًا، حتّى قبلَ أن يُخبَر بذلك.',
    options: [
      { value: 1, labelEn: 'Rarely — they seem unaware of others\' emotions', labelAr: 'نادرًا — يبدو غيرَ واعٍ بمشاعرِ الآخرين' },
      { value: 2, labelEn: 'Sometimes — if the emotion is very obvious', labelAr: 'أحيانًا — إذا كان الشعورُ واضحًا جدًّا' },
      { value: 3, labelEn: 'Often — they pick up on mood changes', labelAr: 'غالبًا — يلتقطُ تغيُّراتِ المزاج' },
      { value: 4, labelEn: 'Usually — they are quite perceptive', labelAr: 'عادةً — لديه حسٌّ مرهف' },
      { value: 5, labelEn: 'Almost always — they are very emotionally tuned in', labelAr: 'تقريبًا دائمًا — متّصلٌ عاطفيًّا بعمق' },
    ],
  },
  {
    id: 'aware-3',
    dimension: 'awareness',
    textEn: 'My child can explain why they feel a certain way (not just "I am mad" but "I am mad because...").',
    textAr: 'يستطيعُ طفلي شرحَ سببِ شعورِه بطريقةٍ معيّنة (ليس فقط "أنا غاضب" بل "أنا غاضبٌ لأنّ...").',
    options: [
      { value: 1, labelEn: 'Rarely — they cannot connect feelings to causes', labelAr: 'نادرًا — لا يستطيعُ ربطَ المشاعرِ بالأسباب' },
      { value: 2, labelEn: 'Sometimes — with a lot of prompting', labelAr: 'أحيانًا — مع كثيرٍ من التشجيع' },
      { value: 3, labelEn: 'Often — they are learning to reflect', labelAr: 'غالبًا — يتعلّمُ التأمّل' },
      { value: 4, labelEn: 'Usually — they show good self-insight', labelAr: 'عادةً — يُظهرُ بصيرةً ذاتيّةً جيّدة' },
      { value: 5, labelEn: 'Almost always — they articulate feelings and reasons well', labelAr: 'تقريبًا دائمًا — يُعبِّرُ عن المشاعرِ والأسبابِ بوضوح' },
    ],
  },

  // ─── EMOTIONAL REGULATION (3 questions) ───
  {
    id: 'reg-1',
    dimension: 'regulation',
    textEn: 'When my child gets frustrated, they can calm themselves down without a major meltdown.',
    textAr: 'عندما يشعرُ طفلي بالإحباط، يستطيعُ تهدئةَ نفسِه دونَ انهيارٍ كبير.',
    options: [
      { value: 1, labelEn: 'Rarely — frustration usually leads to a big reaction', labelAr: 'نادرًا — الإحباطُ يؤدّي عادةً إلى ردّةِ فعلٍ كبيرة' },
      { value: 2, labelEn: 'Sometimes — it depends on the situation', labelAr: 'أحيانًا — يعتمدُ على الموقف' },
      { value: 3, labelEn: 'Often — they are getting better at it', labelAr: 'غالبًا — يتحسّنُ في ذلك' },
      { value: 4, labelEn: 'Usually — they have strategies that work', labelAr: 'عادةً — لديه استراتيجيّاتٌ فعّالة' },
      { value: 5, labelEn: 'Almost always — they handle frustration well', labelAr: 'تقريبًا دائمًا — يتعاملُ مع الإحباطِ جيّدًا' },
    ],
  },
  {
    id: 'reg-2',
    dimension: 'regulation',
    textEn: 'My child can transition between activities (stopping play, leaving a friend\'s house) without major resistance.',
    textAr: 'يستطيعُ طفلي الانتقالَ بين الأنشطة (إيقافُ اللعب، مغادرةُ بيتِ صديق) دونَ مقاومةٍ كبيرة.',
    options: [
      { value: 1, labelEn: 'Rarely — transitions are a daily battle', labelAr: 'نادرًا — الانتقالاتُ معركةٌ يوميّة' },
      { value: 2, labelEn: 'Sometimes — with warnings and coaxing', labelAr: 'أحيانًا — مع تحذيراتٍ وإقناع' },
      { value: 3, labelEn: 'Often — some resistance but manageable', labelAr: 'غالبًا — بعضُ المقاومة لكنّها قابلةٌ للإدارة' },
      { value: 4, labelEn: 'Usually — they adapt fairly easily', labelAr: 'عادةً — يتكيّفُ بسهولةٍ نسبيّة' },
      { value: 5, labelEn: 'Almost always — they are flexible and adaptable', labelAr: 'تقريبًا دائمًا — مرنٌ وقابلٌ للتكيُّف' },
    ],
  },
  {
    id: 'reg-3',
    dimension: 'regulation',
    textEn: 'My child can use words to express what they need instead of acting out (hitting, screaming, withdrawing).',
    textAr: 'يستطيعُ طفلي استخدامَ الكلماتِ للتعبيرِ عمّا يحتاجُه بدلاً من التصرُّفِ السلبيِّ (الضرب، الصراخ، الانسحاب).',
    options: [
      { value: 1, labelEn: 'Rarely — they act out more than they talk', labelAr: 'نادرًا — يتصرّفُ أكثرَ ممّا يتحدّث' },
      { value: 2, labelEn: 'Sometimes — especially when very upset', labelAr: 'أحيانًا — خاصّةً عندما يكونُ منزعجًا جدًّا' },
      { value: 3, labelEn: 'Often — they are learning to use words first', labelAr: 'غالبًا — يتعلّمُ استخدامَ الكلماتِ أوّلاً' },
      { value: 4, labelEn: 'Usually — they communicate needs verbally', labelAr: 'عادةً — يُعبِّرُ عن احتياجاتِه لفظيًّا' },
      { value: 5, labelEn: 'Almost always — they express themselves clearly and calmly', labelAr: 'تقريبًا دائمًا — يُعبِّرُ عن نفسِه بوضوحٍ وهدوء' },
    ],
  },

  // ─── EMPATHY & COMPASSION (3 questions) ───
  {
    id: 'emp-1',
    dimension: 'empathy',
    textEn: 'My child shows genuine concern when a friend or family member is sad or hurt.',
    textAr: 'يُظهرُ طفلي اهتمامًا حقيقيًّا عندما يكونُ صديقٌ أو فردٌ من العائلةِ حزينًا أو متألّمًا.',
    options: [
      { value: 1, labelEn: 'Rarely — they seem indifferent to others\' pain', labelAr: 'نادرًا — يبدو غيرَ مبالٍ بألمِ الآخرين' },
      { value: 2, labelEn: 'Sometimes — if directly asked to notice', labelAr: 'أحيانًا — إذا طُلِبَ منه الانتباه' },
      { value: 3, labelEn: 'Often — they notice and offer comfort', labelAr: 'غالبًا — يُلاحظُ ويقدّمُ العزاء' },
      { value: 4, labelEn: 'Usually — they are naturally caring', labelAr: 'عادةً — لديه طبيعةٌ حنونة' },
      { value: 5, labelEn: 'Almost always — compassion comes naturally to them', labelAr: 'تقريبًا دائمًا — التعاطفُ يأتي بشكلٍ طبيعيّ' },
    ],
  },
  {
    id: 'emp-2',
    dimension: 'empathy',
    textEn: 'My child can understand that other people might feel differently about the same situation.',
    textAr: 'يستطيعُ طفلي فهمَ أنّ الآخرين قد يشعرون بشكلٍ مختلفٍ تجاهَ الموقفِ نفسِه.',
    options: [
      { value: 1, labelEn: 'Rarely — they assume everyone feels the same way', labelAr: 'نادرًا — يفترضُ أنّ الجميعَ يشعرون بنفسِ الطريقة' },
      { value: 2, labelEn: 'Sometimes — with explanation and examples', labelAr: 'أحيانًا — مع الشرحِ والأمثلة' },
      { value: 3, labelEn: 'Often — they are developing perspective-taking', labelAr: 'غالبًا — يُطوِّرُ القدرةَ على تبنّي وجهاتِ النظر' },
      { value: 4, labelEn: 'Usually — they understand different viewpoints', labelAr: 'عادةً — يفهمُ وجهاتِ النظرِ المختلفة' },
      { value: 5, labelEn: 'Almost always — they are thoughtful about others\' perspectives', labelAr: 'تقريبًا دائمًا — يتأمّلُ في وجهاتِ نظرِ الآخرين' },
    ],
  },
  {
    id: 'emp-3',
    dimension: 'empathy',
    textEn: 'My child willingly shares, takes turns, or gives up something for someone else.',
    textAr: 'يُشاركُ طفلي عن طيبِ خاطر، ويتبادلُ الأدوار، أو يتنازلُ عن شيءٍ من أجلِ شخصٍ آخر.',
    options: [
      { value: 1, labelEn: 'Rarely — sharing is a major struggle', labelAr: 'نادرًا — المشاركةُ صراعٌ كبير' },
      { value: 2, labelEn: 'Sometimes — only when reminded or pressured', labelAr: 'أحيانًا — فقط عند التذكيرِ أو الضغط' },
      { value: 3, labelEn: 'Often — they try, though it can be hard', labelAr: 'غالبًا — يحاولُ رغم أنّه قد يكونُ صعبًا' },
      { value: 4, labelEn: 'Usually — they are generous by nature', labelAr: 'عادةً — سخيٌّ بطبيعتِه' },
      { value: 5, labelEn: 'Almost always — they share joyfully', labelAr: 'تقريبًا دائمًا — يُشاركُ بفرح' },
    ],
  },

  // ─── SOCIAL SKILLS (3 questions) ───
  {
    id: 'soc-1',
    dimension: 'social',
    textEn: 'My child can make and keep friends with children their age.',
    textAr: 'يستطيعُ طفلي تكوينَ صداقاتٍ مع أطفالٍ في عمرِه والحفاظَ عليها.',
    options: [
      { value: 1, labelEn: 'Rarely — they struggle to connect with peers', labelAr: 'نادرًا — يُعاني من التواصلِ مع أقرانِه' },
      { value: 2, labelEn: 'Sometimes — they have one or two friends', labelAr: 'أحيانًا — لديه صديقٌ أو اثنان' },
      { value: 3, labelEn: 'Often — they have a small but steady group', labelAr: 'غالبًا — لديه مجموعةٌ صغيرةٌ لكنّها ثابتة' },
      { value: 4, labelEn: 'Usually — they are well-liked and included', labelAr: 'عادةً — محبوبٌ ومُدرَجٌ في الأنشطة' },
      { value: 5, labelEn: 'Almost always — they thrive socially', labelAr: 'تقريبًا دائمًا — يزدهرُ اجتماعيًّا' },
    ],
  },
  {
    id: 'soc-2',
    dimension: 'social',
    textEn: 'When my child has a disagreement with a friend, they can work through it without adult intervention.',
    textAr: 'عندما يختلفُ طفلي مع صديق، يستطيعُ حلَّ الأمرِ دونَ تدخُّلِ الكبار.',
    options: [
      { value: 1, labelEn: 'Rarely — conflicts always need adult help', labelAr: 'نادرًا — الخلافاتُ تحتاجُ دائمًا مساعدةَ الكبار' },
      { value: 2, labelEn: 'Sometimes — they need coaching through it', labelAr: 'أحيانًا — يحتاجُ توجيهًا خلالَها' },
      { value: 3, labelEn: 'Often — they try to resolve it first', labelAr: 'غالبًا — يحاولُ حلَّها أوّلاً' },
      { value: 4, labelEn: 'Usually — they negotiate fairly well', labelAr: 'عادةً — يتفاوضُ بشكلٍ جيّد' },
      { value: 5, labelEn: 'Almost always — they resolve conflicts independently', labelAr: 'تقريبًا دائمًا — يحلُّ الخلافاتِ باستقلاليّة' },
    ],
  },
  {
    id: 'soc-3',
    dimension: 'social',
    textEn: 'My child cooperates well in group settings (classroom, sports team, family activities).',
    textAr: 'يتعاونُ طفلي جيّدًا في الأنشطةِ الجماعيّة (الفصل، الفريقُ الرياضيّ، الأنشطةُ العائليّة).',
    options: [
      { value: 1, labelEn: 'Rarely — they prefer to do things their own way', labelAr: 'نادرًا — يُفضِّلُ فعلَ الأشياءِ بطريقتِه' },
      { value: 2, labelEn: 'Sometimes — with structure and guidance', labelAr: 'أحيانًا — مع البنيةِ والتوجيه' },
      { value: 3, labelEn: 'Often — they participate willingly', labelAr: 'غالبًا — يُشاركُ عن طيبِ خاطر' },
      { value: 4, labelEn: 'Usually — they are a good team player', labelAr: 'عادةً — لاعبُ فريقٍ جيّد' },
      { value: 5, labelEn: 'Almost always — they excel in group settings', labelAr: 'تقريبًا دائمًا — يتفوّقُ في الأنشطةِ الجماعيّة' },
    ],
  },
];

export const tiers: EmotionalIntelligenceTier[] = [
  {
    min: 12,
    max: 24,
    titleEn: 'Developing Emotional Skills',
    titleAr: 'تطويرُ المهاراتِ العاطفيّة',
    summaryEn: "Thank you for taking this step for your child — noticing areas for growth is an act of love. Children in this range are still building their emotional toolkit, and that is completely normal. With the right guidance and a safe, patient environment, emotional intelligence can be nurtured at any age. Early support makes a lasting difference.",
    summaryAr: 'شكرًا لاتّخاذِك هذه الخطوة من أجلِ طفلِك — ملاحظةُ مجالاتِ النموِّ هي فعلُ حبّ. الأطفالُ في هذا النطاقِ ما زالوا يبنون أدواتِهم العاطفيّة، وهذا أمرٌ طبيعيٌّ تمامًا. مع التوجيهِ المناسبِ وبيئةٍ آمنةٍ وصبورة، يمكنُ رعايةُ الذكاءِ العاطفيِّ في أيِّ عمر. الدعمُ المبكّرُ يصنعُ فرقًا دائمًا.',
    color: '#C4878A',
    suggestedServices: ['under-18-counseling', 'cbt-youth', 'managing-big-emotions'],
  },
  {
    min: 25,
    max: 40,
    titleEn: 'Growing Emotional Awareness',
    titleAr: 'وعيٌ عاطفيٌّ متنامٍ',
    summaryEn: "Your child has a good foundation of emotional intelligence, with some areas that could benefit from targeted nurturing. Children in this range often respond beautifully to coaching that strengthens specific skills. With your awareness and some guided support, your child can develop even deeper emotional resilience and social confidence.",
    summaryAr: 'طفلُك لديه أساسٌ جيّدٌ من الذكاءِ العاطفيّ، مع بعضِ المجالاتِ التي يمكنُ أن تستفيدَ من الرعايةِ المُوجَّهة. الأطفالُ في هذا النطاقِ غالبًا ما يستجيبون بشكلٍ جميلٍ للتوجيهِ الذي يُعزِّزُ مهاراتٍ محدّدة. مع وعيِك وبعضِ الدعمِ المُوجَّه، يستطيعُ طفلُك تطويرَ مرونةٍ عاطفيّةٍ وثقةٍ اجتماعيّةٍ أعمق.',
    color: '#C8A97D',
    suggestedServices: ['teen-behavioral-coaching', 'social-confidence-friendship'],
  },
  {
    min: 41,
    max: 60,
    titleEn: 'Strong Emotional Intelligence',
    titleAr: 'ذكاءٌ عاطفيٌّ قويّ',
    summaryEn: "What a wonderful reflection of your child and the environment you have created. Your child demonstrates strong emotional awareness, self-regulation, empathy, and social skills. Continue celebrating and reinforcing these strengths. Remember that emotional intelligence is a lifelong journey — and your child has a beautiful head start.",
    summaryAr: 'يا لها من انعكاسٍ رائعٍ لطفلِك والبيئةِ التي خلقتَها. يُظهرُ طفلُك وعيًا عاطفيًّا قويًّا وتنظيمًا ذاتيًّا وتعاطفًا ومهاراتٍ اجتماعيّة. استمرّ في الاحتفاءِ بهذه القوى وتعزيزِها. تذكّرْ أنّ الذكاءَ العاطفيَّ رحلةٌ مدى الحياة — وطفلُك لديه بدايةٌ جميلة.',
    color: '#25D366',
    suggestedServices: ['parenting-coaching'],
  },
];

// Dimension-level insight messages
export const dimensionInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  awareness: {
    lowEn: 'Emotional awareness is the foundation of all other emotional skills. Help your child by naming feelings out loud throughout the day: "It looks like you are feeling frustrated right now." This simple practice builds emotional vocabulary over time.',
    lowAr: 'الوعيُ العاطفيُّ أساسُ جميعِ المهاراتِ العاطفيّةِ الأخرى. ساعدْ طفلَك بتسميةِ المشاعرِ بصوتٍ عالٍ خلالَ اليوم: "يبدو أنّك تشعرُ بالإحباطِ الآن." هذه الممارسةُ البسيطةُ تبني المفرداتِ العاطفيّةَ بمرورِ الوقت.',
    highEn: 'Your child has excellent emotional awareness — they can name and understand their feelings. This is a wonderful strength that supports all other areas of emotional intelligence.',
    highAr: 'طفلُك لديه وعيٌ عاطفيٌّ ممتاز — يستطيعُ تسميةَ مشاعرِه وفهمَها. هذه نقطةُ قوّةٍ رائعةٌ تدعمُ جميعَ مجالاتِ الذكاءِ العاطفيِّ الأخرى.',
  },
  regulation: {
    lowEn: 'Emotional regulation is a skill that develops over time — not something children are born with. Try co-regulating with your child: stay calm, breathe together, and validate their feelings before problem-solving.',
    lowAr: 'التنظيمُ العاطفيُّ مهارةٌ تتطوّرُ بمرورِ الوقت — وليست شيئًا يُولَدُ به الأطفال. جرِّبِ التنظيمَ المشتركَ مع طفلِك: ابقَ هادئًا، وتنفَّسا معًا، وصادِقْ مشاعرَه قبلَ حلِّ المشكلة.',
    highEn: 'Your child shows strong self-regulation — they can manage frustration, navigate transitions, and express needs with words. This resilience will serve them well throughout life.',
    highAr: 'يُظهرُ طفلُك تنظيمًا ذاتيًّا قويًّا — يستطيعُ إدارةَ الإحباطِ والتنقّلَ بين المهامِّ والتعبيرَ عن الاحتياجاتِ بالكلمات. هذه المرونةُ ستخدمُه جيّدًا طوالَ حياتِه.',
  },
  empathy: {
    lowEn: 'Empathy grows through modeling and experience. Share how you feel, point out emotions in stories and movies, and celebrate moments when your child shows kindness. These small seeds grow into deep compassion.',
    lowAr: 'التعاطفُ ينمو من خلالِ القدوةِ والتجربة. شارِكْ كيف تشعر، وأشِرْ إلى المشاعرِ في القصصِ والأفلام، واحتفِ بالّلحظاتِ التي يُظهرُ فيها طفلُك اللّطف. هذه البذورُ الصغيرةُ تنمو لتصبحَ تعاطفًا عميقًا.',
    highEn: 'Your child shows beautiful empathy and compassion — they naturally care about others and can see the world through different eyes. This is a gift that enriches every relationship they will ever have.',
    highAr: 'يُظهرُ طفلُك تعاطفًا ورحمةً جميلَين — يهتمُّ بالآخرين بشكلٍ طبيعيٍّ ويستطيعُ رؤيةَ العالمِ من منظورٍ مختلف. هذه هديّةٌ تُثري كلَّ علاقةٍ سيمتلكُها.',
  },
  social: {
    lowEn: 'Social skills can be practiced and strengthened. Look for low-pressure opportunities for your child to interact with peers — playdates, small group activities, or structured sports. Celebrate every small win.',
    lowAr: 'المهاراتُ الاجتماعيّةُ يمكنُ ممارستُها وتعزيزُها. ابحثْ عن فرصٍ قليلةِ الضغطِ لطفلِك للتفاعلِ مع أقرانِه — لقاءاتُ لعب، أنشطةٌ جماعيّةٌ صغيرة، أو رياضاتٌ منظّمة. احتفِ بكلِّ إنجازٍ صغير.',
    highEn: 'Your child thrives socially — they make friends, cooperate well, and navigate conflicts with maturity. These social strengths are a wonderful foundation for their future.',
    highAr: 'يزدهرُ طفلُك اجتماعيًّا — يُكوِّنُ صداقات، ويتعاونُ جيّدًا، ويتعاملُ مع الخلافاتِ بنضج. هذه القوى الاجتماعيّةُ أساسٌ رائعٌ لمستقبلِه.',
  },
};
