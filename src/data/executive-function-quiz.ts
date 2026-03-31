/* ================================================================
   Executive Function Micro-Screener
   A 10-question screening tool for parents concerned about
   their child's executive function skills. Evaluates 5 key domains.
   NOT a diagnosis — a conversation starter with professional guidance.
   Written in Dr. Hala Ali's evidence-based, compassionate voice.
   ================================================================ */

export interface EFQuestion {
  id: string;
  domain: 'organization' | 'timeManagement' | 'emotionalRegulation' | 'workingMemory' | 'flexibility';
  textEn: string;
  textAr: string;
  options: { value: number; labelEn: string; labelAr: string }[];
}

export interface EFDomain {
  key: 'organization' | 'timeManagement' | 'emotionalRegulation' | 'workingMemory' | 'flexibility';
  titleEn: string;
  titleAr: string;
  iconName: string;
  color: string;
  descEn: string;
  descAr: string;
}

export interface EFTier {
  min: number;
  max: number;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  color: string;
  suggestedServices: string[];
}

export const domains: EFDomain[] = [
  {
    key: 'organization',
    titleEn: 'Organization & Planning',
    titleAr: 'التنظيمُ والتخطيط',
    iconName: 'ClipboardList',
    color: '#7A3B5E',
    descEn: 'The ability to create structure, prioritize tasks, and maintain order in daily life.',
    descAr: 'القدرةُ على إنشاءِ هيكلٍ وترتيبِ الأولويّاتِ والحفاظِ على النظامِ في الحياةِ اليوميّة.',
  },
  {
    key: 'timeManagement',
    titleEn: 'Time Awareness',
    titleAr: 'الوعيُ بالوقت',
    iconName: 'Clock',
    color: '#C8A97D',
    descEn: 'Understanding the passage of time, estimating duration, and meeting deadlines.',
    descAr: 'فَهْمُ مرورِ الوقتِ وتقديرُ المدّةِ والالتزامُ بالمواعيدِ النهائيّة.',
  },
  {
    key: 'emotionalRegulation',
    titleEn: 'Emotional Control',
    titleAr: 'التحكُّمُ العاطفيّ',
    iconName: 'Heart',
    color: '#C4878A',
    descEn: 'Managing frustration, controlling impulses, and adapting emotional responses.',
    descAr: 'إدارةُ الإحباطِ والتحكُّمُ في الاندفاعاتِ وتكييفُ الاستجاباتِ العاطفيّة.',
  },
  {
    key: 'workingMemory',
    titleEn: 'Working Memory',
    titleAr: 'الذاكرةُ العاملة',
    iconName: 'Brain',
    color: '#D4836A',
    descEn: 'Holding information in mind while completing tasks, following multi-step instructions.',
    descAr: 'الاحتفاظُ بالمعلوماتِ في الذهنِ أثناءَ إنجازِ المهامِّ واتّباعِ التعليماتِ المتعدِّدةِ الخطوات.',
  },
  {
    key: 'flexibility',
    titleEn: 'Cognitive Flexibility',
    titleAr: 'المرونةُ المعرفيّة',
    iconName: 'RefreshCw',
    color: '#25D366',
    descEn: 'Adapting to changes, shifting between tasks, and tolerating unexpected events.',
    descAr: 'التكيُّفُ مع التغييراتِ والانتقالُ بين المهامِّ وتحمُّلُ الأحداثِ غيرِ المتوقَّعة.',
  },
];

export const questions: EFQuestion[] = [
  // ─── ORGANIZATION (2 questions) ───
  {
    id: 'org-1',
    domain: 'organization',
    textEn: 'Does your child frequently lose or misplace belongings like school supplies, keys, or homework?',
    textAr: 'هل يفقدُ طفلُك أو يُضيّعُ ممتلكاتِه بشكلٍ متكرّرٍ مثلَ لوازمِ المدرسةِ أو المفاتيحِ أو الواجبات؟',
    options: [
      { value: 1, labelEn: 'Rarely — they keep things organized', labelAr: 'نادرًا — يحافظُ على الأشياءِ منظّمة' },
      { value: 2, labelEn: 'Occasionally — normal for their age', labelAr: 'أحيانًا — طبيعيٌّ لسنِّه' },
      { value: 3, labelEn: 'Often — despite reminders', labelAr: 'غالبًا — رغمَ التذكيرات' },
      { value: 4, labelEn: 'Very often — it is a daily issue', labelAr: 'كثيرًا جدًّا — مشكلةٌ يوميّة' },
      { value: 5, labelEn: 'Constantly — significantly impacts their life', labelAr: 'باستمرار — يؤثّرُ بشكلٍ كبيرٍ على حياتِه' },
    ],
  },
  {
    id: 'org-2',
    domain: 'organization',
    textEn: 'How well does your child break down larger tasks (like a school project) into manageable steps?',
    textAr: 'ما مدى قدرةِ طفلِك على تقسيمِ المهامِّ الكبيرة (كمشروعٍ مدرسيّ) إلى خطواتٍ يمكنُ إدارتُها؟',
    options: [
      { value: 1, labelEn: 'Very well — they plan naturally', labelAr: 'جيّدٌ جدًّا — يخطِّطُ بشكلٍ طبيعيّ' },
      { value: 2, labelEn: 'Fairly well with some guidance', labelAr: 'جيّدٌ نوعًا ما مع بعضِ التوجيه' },
      { value: 3, labelEn: 'Struggles — needs significant help', labelAr: 'يعاني — يحتاجُ مساعدةً كبيرة' },
      { value: 4, labelEn: 'Cannot do it without adult support', labelAr: 'لا يستطيعُ دونَ دعمِ الكبار' },
      { value: 5, labelEn: 'Becomes overwhelmed and shuts down', labelAr: 'يشعرُ بالإرهاقِ وينسحب' },
    ],
  },

  // ─── TIME MANAGEMENT (2 questions) ───
  {
    id: 'time-1',
    domain: 'timeManagement',
    textEn: 'Does your child struggle with getting ready on time in the morning or transitioning between activities?',
    textAr: 'هل يعاني طفلُك من الاستعدادِ في الوقتِ المحدَّدِ صباحًا أو الانتقالِ بين الأنشطة؟',
    options: [
      { value: 1, labelEn: 'No — they manage time well', labelAr: 'لا — يديرُ وقتَه جيّدًا' },
      { value: 2, labelEn: 'Sometimes — age-appropriate challenges', labelAr: 'أحيانًا — تحدّياتٌ طبيعيّةٌ لسنِّه' },
      { value: 3, labelEn: 'Often — mornings are a battle', labelAr: 'غالبًا — الصباحاتُ معركة' },
      { value: 4, labelEn: 'Almost always — causes family stress', labelAr: 'تقريبًا دائمًا — يسبِّبُ توتُّرًا عائليًّا' },
      { value: 5, labelEn: 'Constantly — has no sense of time passing', labelAr: 'باستمرار — ليس لديه إحساسٌ بمرورِ الوقت' },
    ],
  },
  {
    id: 'time-2',
    domain: 'timeManagement',
    textEn: 'How does your child handle homework or tasks with deadlines?',
    textAr: 'كيفَ يتعاملُ طفلُك مع الواجباتِ أو المهامِّ ذاتِ المواعيدِ النهائيّة؟',
    options: [
      { value: 1, labelEn: 'Plans ahead and finishes on time', labelAr: 'يخطِّطُ مسبقًا ويُنهي في الوقت' },
      { value: 2, labelEn: 'Usually finishes with some reminders', labelAr: 'عادةً يُنهي مع بعضِ التذكيرات' },
      { value: 3, labelEn: 'Procrastinates and rushes at the last minute', labelAr: 'يماطلُ ويُسرعُ في اللحظةِ الأخيرة' },
      { value: 4, labelEn: 'Frequently misses deadlines', labelAr: 'كثيرًا ما يفوِّتُ المواعيدَ النهائيّة' },
      { value: 5, labelEn: 'Cannot complete tasks without constant supervision', labelAr: 'لا يستطيعُ إنجازَ المهامِّ دونَ إشرافٍ مستمرّ' },
    ],
  },

  // ─── EMOTIONAL REGULATION (2 questions) ───
  {
    id: 'emo-1',
    domain: 'emotionalRegulation',
    textEn: 'How does your child respond when things don\'t go their way — like losing a game, a change in plans, or being told "no"?',
    textAr: 'كيفَ يستجيبُ طفلُك عندما لا تسيرُ الأمورُ كما يريد — كخسارةِ لعبةٍ أو تغييرِ الخططِ أو قولِ "لا"؟',
    options: [
      { value: 1, labelEn: 'Handles it well — may be briefly upset', labelAr: 'يتعاملُ جيّدًا — قد ينزعجُ لفترةٍ قصيرة' },
      { value: 2, labelEn: 'Gets upset but recovers within minutes', labelAr: 'ينزعجُ لكن يتعافى خلالَ دقائق' },
      { value: 3, labelEn: 'Becomes very upset — takes a while to calm', labelAr: 'ينزعجُ جدًّا — يستغرقُ وقتًا للهدوء' },
      { value: 4, labelEn: 'Meltdowns are frequent and intense', labelAr: 'نوباتُ الانهيارِ متكرّرةٌ وشديدة' },
      { value: 5, labelEn: 'Explosive reactions — feels uncontrollable', labelAr: 'ردودُ فعلٍ انفجاريّة — تبدو خارجةً عن السيطرة' },
    ],
  },
  {
    id: 'emo-2',
    domain: 'emotionalRegulation',
    textEn: 'Does your child act impulsively — like interrupting, grabbing things, or saying hurtful things without thinking?',
    textAr: 'هل يتصرّفُ طفلُك باندفاع — كالمقاطعةِ أو انتزاعِ الأشياءِ أو قولِ أشياءَ مؤذيةٍ دونَ تفكير؟',
    options: [
      { value: 1, labelEn: 'Rarely — shows good self-control', labelAr: 'نادرًا — يُظهرُ تحكُّمًا ذاتيًّا جيّدًا' },
      { value: 2, labelEn: 'Occasionally — typical for their age', labelAr: 'أحيانًا — طبيعيٌّ لسنِّه' },
      { value: 3, labelEn: 'Often — despite knowing the rules', labelAr: 'غالبًا — رغمَ معرفتِه بالقواعد' },
      { value: 4, labelEn: 'Very often — gets in trouble at school', labelAr: 'كثيرًا جدًّا — يقعُ في مشاكلَ في المدرسة' },
      { value: 5, labelEn: 'Constantly — creating significant social difficulties', labelAr: 'باستمرار — يسبِّبُ صعوباتٍ اجتماعيّةً كبيرة' },
    ],
  },

  // ─── WORKING MEMORY (2 questions) ───
  {
    id: 'mem-1',
    domain: 'workingMemory',
    textEn: 'Can your child follow multi-step instructions — like "put your bag away, wash your hands, and come to the table"?',
    textAr: 'هل يستطيعُ طفلُك اتّباعَ تعليماتٍ متعدِّدةِ الخطوات — مثل "ضَعْ حقيبتَك، اغسِلْ يديك، وتعالَ إلى الطاولة"؟',
    options: [
      { value: 1, labelEn: 'Yes — handles 3+ steps easily', labelAr: 'نعم — يتعاملُ مع 3 خطواتٍ أو أكثرَ بسهولة' },
      { value: 2, labelEn: 'Usually — may forget the last step', labelAr: 'عادةً — قد ينسى الخطوةَ الأخيرة' },
      { value: 3, labelEn: 'Needs frequent repetition', labelAr: 'يحتاجُ تكرارًا متكرّرًا' },
      { value: 4, labelEn: 'Can only hold one instruction at a time', labelAr: 'يستطيعُ تذكُّرَ تعليمةٍ واحدةٍ فقط في المرّة' },
      { value: 5, labelEn: 'Forgets instructions almost immediately', labelAr: 'ينسى التعليماتِ فورًا تقريبًا' },
    ],
  },
  {
    id: 'mem-2',
    domain: 'workingMemory',
    textEn: 'Does your child frequently forget what they were about to say or do, even mid-task?',
    textAr: 'هل ينسى طفلُك كثيرًا ما كان على وشكِ قولِه أو فعلِه، حتّى في منتصفِ المهمّة؟',
    options: [
      { value: 1, labelEn: 'Rarely', labelAr: 'نادرًا' },
      { value: 2, labelEn: 'Sometimes', labelAr: 'أحيانًا' },
      { value: 3, labelEn: 'Often', labelAr: 'غالبًا' },
      { value: 4, labelEn: 'Very often', labelAr: 'كثيرًا جدًّا' },
      { value: 5, labelEn: 'Constantly — it is a defining struggle', labelAr: 'باستمرار — صراعٌ مُحدِّدٌ لحياتِه' },
    ],
  },

  // ─── FLEXIBILITY (2 questions) ───
  {
    id: 'flex-1',
    domain: 'flexibility',
    textEn: 'How does your child cope with unexpected changes — like a cancelled playdate, a substitute teacher, or a different route to school?',
    textAr: 'كيفَ يتعاملُ طفلُك مع التغييراتِ غيرِ المتوقَّعة — كإلغاءِ موعدِ لعبٍ أو معلّمٍ بديلٍ أو طريقٍ مختلفٍ إلى المدرسة؟',
    options: [
      { value: 1, labelEn: 'Adapts easily', labelAr: 'يتكيّفُ بسهولة' },
      { value: 2, labelEn: 'Minor resistance, then adjusts', labelAr: 'مقاومةٌ بسيطة، ثمّ يتكيّف' },
      { value: 3, labelEn: 'Gets noticeably distressed', labelAr: 'يصبحُ منزعجًا بشكلٍ ملحوظ' },
      { value: 4, labelEn: 'Major distress — may cry or refuse', labelAr: 'ضيقٌ شديد — قد يبكي أو يرفض' },
      { value: 5, labelEn: 'Full shutdown or meltdown', labelAr: 'انهيارٌ أو انسحابٌ تامّ' },
    ],
  },
  {
    id: 'flex-2',
    domain: 'flexibility',
    textEn: 'Can your child see things from another person\'s perspective, or do they get "stuck" on their own viewpoint?',
    textAr: 'هل يستطيعُ طفلُك رؤيةَ الأمورِ من منظورِ شخصٍ آخر، أم يتمسّكُ بوجهةِ نظرِه الخاصّة؟',
    options: [
      { value: 1, labelEn: 'Shows empathy and perspective-taking', labelAr: 'يُظهرُ تعاطفًا واستيعابًا لوجهاتِ النظرِ الأخرى' },
      { value: 2, labelEn: 'Developing — can with guidance', labelAr: 'في طورِ التطوُّر — يستطيعُ مع التوجيه' },
      { value: 3, labelEn: 'Struggles — tends to see only their side', labelAr: 'يعاني — يميلُ لرؤيةِ جانبِه فقط' },
      { value: 4, labelEn: 'Gets very stuck — argues their point relentlessly', labelAr: 'ينحصرُ كثيرًا — يجادلُ في وجهةِ نظرِه بلا هوادة' },
      { value: 5, labelEn: 'Cannot shift perspective — causes constant conflict', labelAr: 'لا يستطيعُ تغييرَ المنظور — يسبِّبُ صراعًا مستمرًّا' },
    ],
  },
];

export const tiers: EFTier[] = [
  {
    min: 10,
    max: 18,
    titleEn: 'Executive Functions Appear Age-Appropriate',
    titleAr: 'الوظائفُ التنفيذيّةُ تبدو مناسبةً للعمر',
    summaryEn: "Based on your responses, your child's executive function skills appear to be developing within the typical range for their age. All children have occasional forgetful moments or emotional reactions — that's normal brain development. Continue supporting their growth with consistent routines and patient guidance.",
    summaryAr: 'بناءً على إجاباتِك، تبدو مهاراتُ الوظائفِ التنفيذيّةِ لطفلِك في طورِ النموِّ ضمنَ النطاقِ الطبيعيِّ لسنِّه. جميعُ الأطفالِ لديهم لحظاتُ نسيانٍ عرضيّةٌ أو ردودُ فعلٍ عاطفيّة — هذا تطوُّرٌ طبيعيٌّ للدماغ. استمرَّ في دعمِ نموِّه بروتينٍ ثابتٍ وتوجيهٍ صبور.',
    color: '#25D366',
    suggestedServices: ['teen-behavioral-coaching', 'parenting-coaching'],
  },
  {
    min: 19,
    max: 32,
    titleEn: 'Some Areas May Benefit From Support',
    titleAr: 'بعضُ المجالاتِ قد تستفيدُ من الدّعم',
    summaryEn: "Your responses suggest that some executive function areas may need additional support. This doesn't mean something is 'wrong' — many bright, capable children struggle with these skills. Executive functions are the last brain systems to fully mature (they develop into the mid-20s!). Targeted coaching can make a significant difference, teaching strategies that work with your child's unique brain, not against it.",
    summaryAr: 'تشيرُ إجاباتُك إلى أنّ بعضَ مجالاتِ الوظائفِ التنفيذيّة قد تحتاجُ دعمًا إضافيًّا. هذا لا يعني أنّ هناك "خطأً" — كثيرٌ من الأطفالِ الأذكياءِ والقادرين يعانون مع هذه المهارات. الوظائفُ التنفيذيّة هي آخرُ أنظمةِ الدماغِ التي تنضجُ بالكامل. التدريبُ المُوجَّه يمكنُ أن يُحدِثَ فرقًا كبيرًا.',
    color: '#C8A97D',
    suggestedServices: ['adhd-executive-function-coaching', 'cbt-youth', 'parenting-coaching'],
  },
  {
    min: 33,
    max: 50,
    titleEn: 'Professional Assessment Recommended',
    titleAr: 'يُوصى بتقييمٍ مهنيّ',
    summaryEn: "Your responses indicate significant challenges across multiple executive function areas. I want you to know: this is not a reflection of your parenting. Executive function difficulties are neurological, not behavioral — they're about brain wiring, not willpower. A professional evaluation can provide clarity and open the door to strategies that genuinely help. Many families tell me that understanding their child's executive function profile was the turning point that changed everything.",
    summaryAr: 'تشيرُ إجاباتُك إلى تحدّياتٍ كبيرةٍ عبرَ مجالاتٍ متعدِّدةٍ من الوظائفِ التنفيذيّة. أريدُك أن تعرفَ: هذا ليس انعكاسًا لتربيتِك. صعوباتُ الوظائفِ التنفيذيّة عصبيّةٌ وليست سلوكيّة — تتعلّقُ بتوصيلاتِ الدماغِ لا بقوّةِ الإرادة. التقييمُ المهنيُّ يمكنُ أن يوفّرَ وضوحًا ويفتحَ البابَ لاستراتيجيّاتٍ تُساعدُ فعلًا.',
    color: '#C4878A',
    suggestedServices: ['adhd-executive-function-coaching', 'under-18-counseling', 'supporting-children-through-change'],
  },
];

// Domain-level insight messages
export const domainInsights: Record<string, { lowEn: string; lowAr: string; highEn: string; highAr: string }> = {
  organization: {
    lowEn: 'Organization is a strength — your child can structure their world effectively.',
    lowAr: 'التنظيمُ نقطةُ قوّة — طفلُك يستطيعُ هيكلةَ عالمِه بفاعليّة.',
    highEn: 'Organization may be a challenge area. Visual checklists, color-coded systems, and a consistent "launch pad" by the door can help significantly.',
    highAr: 'التنظيمُ قد يكونُ مجالَ تحدٍّ. القوائمُ المرئيّة والأنظمةُ الملوّنة و"منصّةُ الانطلاق" الثابتة عند الباب يمكنُ أن تساعدَ بشكلٍ كبير.',
  },
  timeManagement: {
    lowEn: 'Time awareness is developing well — keep reinforcing routines.',
    lowAr: 'الوعيُ بالوقتِ يتطوّرُ جيّدًا — استمرَّ في تعزيزِ الروتين.',
    highEn: 'Time blindness may be present. Use visual timers, "time remaining" clocks, and break tasks into 10-minute chunks. This is one of the most coachable executive function skills.',
    highAr: 'قد يكونُ هناك "عمى زمنيّ." استخدِمِ المؤقِّتاتِ المرئيّة وساعات "الوقت المتبقّي" وقسِّمِ المهامَّ إلى أجزاءٍ مدّتُها 10 دقائق. هذه من أكثرِ مهاراتِ الوظائفِ التنفيذيّة قابليّةً للتدريب.',
  },
  emotionalRegulation: {
    lowEn: 'Emotional regulation is age-appropriate — they are building healthy coping skills.',
    lowAr: 'التنظيمُ العاطفيُّ مناسبٌ للعمر — يبني مهاراتِ تكيُّفٍ صحّيّة.',
    highEn: 'Emotional regulation may need support. Remember: the behavior you see is the tip of the iceberg. Underneath is a child who feels overwhelmed. Co-regulation (staying calm yourself) is the most powerful tool you have.',
    highAr: 'التنظيمُ العاطفيُّ قد يحتاجُ دعمًا. تذكَّرْ: السلوكُ الذي تراه هو قمّةُ جبلِ الجليد. تحتَه طفلٌ يشعرُ بالإرهاق. التنظيمُ المشتركُ (أن تبقى هادئًا أنت) هو أقوى أداةٍ لديك.',
  },
  workingMemory: {
    lowEn: 'Working memory appears strong — your child can hold and use information effectively.',
    lowAr: 'الذاكرةُ العاملةُ تبدو قويّة — طفلُك يستطيعُ الاحتفاظَ بالمعلوماتِ واستخدامَها بفاعليّة.',
    highEn: 'Working memory challenges may be present. External supports like written lists, visual schedules, and "one instruction at a time" approaches can bridge the gap while the brain continues developing.',
    highAr: 'قد تكونُ هناك تحدّياتٌ في الذاكرةِ العاملة. الدعمُ الخارجيُّ كالقوائمِ المكتوبة والجداولِ المرئيّة ونهجِ "تعليمةٌ واحدةٌ في المرّة" يمكنُ أن يسدَّ الفجوةَ أثناءَ استمرارِ نموِّ الدماغ.',
  },
  flexibility: {
    lowEn: 'Cognitive flexibility is developing well — your child can adapt to change.',
    lowAr: 'المرونةُ المعرفيّةُ تتطوّرُ جيّدًا — طفلُك يستطيعُ التكيُّفَ مع التغيير.',
    highEn: 'Flexibility may be a struggle area. Give advance warnings before transitions ("In 5 minutes, we\'ll..."), use visual schedules, and practice small, low-stakes changes to build tolerance gradually.',
    highAr: 'المرونةُ قد تكونُ مجالَ صعوبة. أعطِ تحذيراتٍ مسبقةً قبل الانتقالات ("خلال 5 دقائق سنفعل...")، واستخدِمِ الجداولَ المرئيّة، ومارِسْ تغييراتٍ صغيرةً منخفضةَ المخاطرِ لبناءِ التحمُّلِ تدريجيًّا.',
  },
};
