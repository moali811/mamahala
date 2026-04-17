/* ================================================================
   "How Do We Fight?"
   A 16-question scenario-based couples assessment that identifies a
   person's dominant conflict style. Each question presents a conflict
   scenario with 4 response options mapping to 4 branded styles.
   Scoring: count selections per style. Written in Dr. Hala Ali's
   warm, bilingual counseling voice.
   ================================================================ */

export type ConflictStyle = 'collaborator' | 'protector' | 'peacekeeper' | 'reactor';

export interface ConflictStyleOption {
  style: ConflictStyle;
  labelEn: string;
  labelAr: string;
}

export interface ConflictStyleQuestion {
  id: string;
  scenarioEn: string;
  scenarioAr: string;
  options: ConflictStyleOption[];
}

export interface ConflictStyleProfile {
  key: ConflictStyle;
  nameEn: string;
  nameAr: string;
  iconName: string;
  color: string;
  strengthsEn: string;
  strengthsAr: string;
  growthEn: string;
  growthAr: string;
  suggestedServices: string[];
}

export const styles: ConflictStyleProfile[] = [
  {
    key: 'collaborator',
    nameEn: 'The Collaborator',
    nameAr: 'نمطُ المُتعاوِن',
    iconName: 'Handshake',
    color: '#25D366',
    strengthsEn: 'You seek resolution through honest dialogue and value fairness in every disagreement. You believe that every conflict has a solution if both people are willing to listen and work together. Your partner likely feels respected during difficult conversations because you prioritize understanding over winning.',
    strengthsAr: 'تسعى لحلِّ الخلافاتِ من خلالِ الحوارِ الصادقِ وتقدِّرُ العدالةَ في كلِّ خلاف. تؤمنُ أنّ لكلِّ نزاعٍ حلًّا إذا كانَ كلا الطرفَين مستعدَّين للاستماعِ والعملِ معًا. شريكُك على الأرجحِ يشعرُ بالاحترامِ خلالَ المحادثاتِ الصعبة لأنّك تعطي الأولويّةَ للفهمِ على الانتصار.',
    growthEn: 'Sometimes you jump into problem-solving mode before your partner has finished feeling heard. Not every conversation needs a solution right away — sometimes your partner just needs you to sit with them in the discomfort before moving toward resolution. Practice pausing and asking: "Do you want me to listen, or help fix this?"',
    growthAr: 'أحيانًا تقفزُ إلى وضعِ حلِّ المشكلاتِ قبلَ أن يشعرَ شريكُك بأنّه مسموع. ليسَ كلُّ محادثةٍ تحتاجُ حلًّا فوريًّا — أحيانًا يحتاجُ شريكُك فقط أن تجلسَ معه في الضيقِ قبلَ التحرُّكِ نحوَ الحلّ. تدرَّبْ على التوقّفِ والسؤال: "هل تريدُني أن أستمعَ أم أساعدَ في الحلّ؟"',
    suggestedServices: ['relationship-enrichment', 'couples-counseling'],
  },
  {
    key: 'protector',
    nameEn: 'The Protector',
    nameAr: 'نمطُ الحامي',
    iconName: 'Shield',
    color: '#7A3B5E',
    strengthsEn: 'You stand firm on your boundaries and are fiercely protective of what matters to you — your values, your family, your sense of fairness. You do not shy away from hard conversations and your partner always knows where you stand. This clarity can be deeply reassuring.',
    strengthsAr: 'تقفُ بثباتٍ عندَ حدودِك وتحمي بشراسةٍ ما يهمُّك — قيمُك، عائلتُك، إحساسُك بالعدالة. لا تتهرّبُ من المحادثاتِ الصعبة وشريكُك يعرفُ دائمًا أينَ تقف. هذا الوضوحُ يمكنُ أن يكونَ مُطَمئنًا بعمق.',
    growthEn: 'Your strength can sometimes feel like a wall to your partner. When you lead with firmness, your partner may hear criticism instead of care. Try softening your approach — share the feeling beneath the boundary. Instead of "This is not acceptable," try "This hurts me because..." Vulnerability is not weakness; it is the bridge to deeper connection.',
    growthAr: 'قوّتُك قد تبدو أحيانًا كجدارٍ لشريكِك. عندما تبدأُ بالحزمِ قد يسمعُ شريكُك انتقادًا بدلًا من الاهتمام. جرِّبْ تليينَ أسلوبِك — شارِكِ الشعورَ الكامنَ وراءَ الحدّ. بدلًا من "هذا غيرُ مقبول" جرِّبْ "هذا يؤلمُني لأنّ..." الضعفُ ليسَ وهنًا بل هو الجسرُ نحوَ تواصلٍ أعمق.',
    suggestedServices: ['couples-counseling'],
  },
  {
    key: 'peacekeeper',
    nameEn: 'The Peacekeeper',
    nameAr: 'نمطُ صانعِ السلام',
    iconName: 'Feather',
    color: '#C8A97D',
    strengthsEn: 'You value harmony and bring a naturally diplomatic energy to your relationship. You are skilled at reading the room and knowing when to let small things go. Your partner likely appreciates your calm presence and the sense of safety you create by not turning every issue into a battle.',
    strengthsAr: 'تقدِّرُ الانسجامَ وتجلبُ طاقةً دبلوماسيّةً طبيعيّةً لعلاقتِك. أنتَ ماهرٌ في قراءةِ الأجواءِ ومعرفةِ متى تتجاوزُ الأمورَ الصغيرة. شريكُك على الأرجحِ يقدِّرُ حضورَك الهادئ والشعورَ بالأمانِ الذي تخلقُه بعدمِ تحويلِ كلِّ مسألةٍ إلى معركة.',
    growthEn: 'Your love for peace can sometimes come at the cost of your own needs. When you consistently avoid conflict, unspoken frustrations can quietly build into resentment. Learning to speak up — even when it feels uncomfortable — is an act of love for both yourself and your relationship. Your voice matters, even when it trembles.',
    growthAr: 'حبُّك للسلامِ قد يأتي أحيانًا على حسابِ احتياجاتِك. عندما تتجنّبُ الخلافَ باستمرار، يمكنُ أن تتراكمَ الإحباطاتُ المكبوتةُ بهدوءٍ لتصبحَ استياءً. تعلُّمُ التحدّثِ — حتّى عندما يبدو غيرَ مريح — هو فعلُ حبٍّ لنفسِك ولعلاقتِك. صوتُك مهمٌّ حتّى عندما يرتجف.',
    suggestedServices: ['couples-counseling', 'relationship-enrichment'],
  },
  {
    key: 'reactor',
    nameEn: 'The Reactor',
    nameAr: 'نمطُ المُندفِع',
    iconName: 'Flame',
    color: '#B85C4A',
    strengthsEn: 'You are passionate, transparent, and your partner never has to guess how you feel. You bring emotional intensity and honesty to your relationship, and you do not let things fester. Your willingness to engage — even when emotions run high — shows that you care deeply.',
    strengthsAr: 'أنتَ شغوفٌ وشفّافٌ ولا يحتاجُ شريكُك أبدًا لتخمينِ مشاعرِك. تجلبُ حدّةً عاطفيّةً وصدقًا لعلاقتِك ولا تتركُ الأمورَ تتقيَّح. استعدادُك للمشاركةِ — حتّى عندما تكونُ المشاعرُ عالية — يُظهرُ أنّك تهتمُّ بعمق.',
    growthEn: 'Your emotional intensity, while honest, can sometimes overwhelm your partner and shut down the very conversation you are trying to have. Try building in a pause before you respond — even thirty seconds of deep breathing can shift the entire tone of a disagreement. Regulation is not about suppressing your feelings; it is about choosing how and when to express them.',
    growthAr: 'حدّتُك العاطفيّة، رغمَ صدقِها، قد تُثقلُ أحيانًا على شريكِك وتُغلقُ المحادثةَ التي تحاولُ خوضَها. جرِّبْ بناءَ وقفةٍ قبلَ أن تردّ — حتّى ثلاثون ثانيةً من التنفُّسِ العميقِ يمكنُ أن تغيِّرَ نبرةَ الخلافِ بالكامل. التنظيمُ ليسَ كبتَ مشاعرِك بل هو اختيارُ كيفَ ومتى تعبِّرُ عنها.',
    suggestedServices: ['couples-counseling'],
  },
];

export const questions: ConflictStyleQuestion[] = [
  // Q1 — Forgotten plans
  {
    id: 'cs-1',
    scenarioEn: 'Your partner forgot something important to you. You...',
    scenarioAr: 'نسيَ شريكُك شيئًا مهمًّا بالنسبةِ لك. أنتَ...',
    options: [
      { style: 'collaborator', labelEn: 'Bring it up calmly and explain why it mattered to you.', labelAr: 'تطرحُ الموضوعَ بهدوءٍ وتشرحُ لماذا كانَ مهمًّا لك.' },
      { style: 'protector', labelEn: 'Feel hurt and set a clear boundary about expectations.', labelAr: 'تشعرُ بالأذى وتضعُ حدًّا واضحًا بشأنِ التوقّعات.' },
      { style: 'peacekeeper', labelEn: 'Let it go — it is not worth a fight.', labelAr: 'تتجاوزُ الأمر — لا يستحقُّ الشجار.' },
      { style: 'reactor', labelEn: 'Feel a surge of frustration and let them know right away how upset you are.', labelAr: 'تشعرُ بموجةِ إحباطٍ وتُخبرُه فورًا كم أنتَ منزعج.' },
    ],
  },
  // Q2 — Spending disagreements
  {
    id: 'cs-2',
    scenarioEn: 'You discover your partner made a large purchase without discussing it with you first.',
    scenarioAr: 'تكتشفُ أنّ شريكَك أجرى عمليّةَ شراءٍ كبيرةً دونَ مناقشتِك أوّلًا.',
    options: [
      { style: 'reactor', labelEn: 'You feel blindsided and confront them immediately about it.', labelAr: 'تشعرُ بالصدمةِ وتواجهُه فورًا بشأنِ ذلك.' },
      { style: 'collaborator', labelEn: 'You sit down together and suggest creating a shared spending agreement.', labelAr: 'تجلسان معًا وتقترحُ وضعَ اتّفاقيّةِ إنفاقٍ مشتركة.' },
      { style: 'protector', labelEn: 'You tell them clearly that this crosses a line and should not happen again.', labelAr: 'تخبرُه بوضوحٍ أنّ هذا يتجاوزُ الخطَّ ولا يجبُ أن يتكرّر.' },
      { style: 'peacekeeper', labelEn: 'You feel uneasy but decide not to bring it up to avoid tension.', labelAr: 'تشعرُ بعدمِ الارتياحِ لكن تقرِّرُ عدمَ إثارتِه لتجنُّبِ التوتّر.' },
    ],
  },
  // Q3 — In-law tensions
  {
    id: 'cs-3',
    scenarioEn: 'Your partner\'s family makes a comment that feels disrespectful toward you.',
    scenarioAr: 'عائلةُ شريكِك تُدلي بتعليقٍ يبدو غيرَ محترمٍ تجاهَك.',
    options: [
      { style: 'protector', labelEn: 'You tell your partner they need to stand up for you — this is a firm boundary.', labelAr: 'تخبرُ شريكَك أنّه يجبُ أن يدافعَ عنك — هذا حدٌّ لا يُناقَش.' },
      { style: 'peacekeeper', labelEn: 'You smile through it and process your feelings later, alone.', labelAr: 'تبتسمُ وتتعاملُ مع مشاعرِك لاحقًا بمفردِك.' },
      { style: 'collaborator', labelEn: 'You talk to your partner privately about how it made you feel and plan how to handle it together.', labelAr: 'تتحدّثُ مع شريكِك على انفرادٍ عن شعورِك وتخطِّطان لكيفيّةِ التعاملِ معه معًا.' },
      { style: 'reactor', labelEn: 'You respond in the moment — you are not going to sit there and take it.', labelAr: 'تردُّ في اللحظة — لن تجلسَ وتتقبَّلَ ذلك.' },
    ],
  },
  // Q4 — Household chores
  {
    id: 'cs-4',
    scenarioEn: 'You feel like you are doing most of the housework and your partner does not seem to notice.',
    scenarioAr: 'تشعرُ أنّك تقومُ بمعظمِ أعمالِ المنزلِ وشريكُك لا يبدو أنّه يلاحظ.',
    options: [
      { style: 'peacekeeper', labelEn: 'You keep doing it — bringing it up feels petty.', labelAr: 'تستمرُّ في العمل — إثارةُ الموضوعِ تبدو تافهة.' },
      { style: 'reactor', labelEn: 'You snap one evening when you are exhausted and let them know exactly how unfair this is.', labelAr: 'تنفجرُ ذاتَ مساءٍ عندما تكونُ مُنهَكًا وتُخبرُه تمامًا كم أنّ هذا غيرُ عادل.' },
      { style: 'collaborator', labelEn: 'You pick a calm moment to share how you feel and propose splitting tasks fairly.', labelAr: 'تختارُ لحظةً هادئةً لمشاركةِ شعورِك واقتراحِ تقسيمِ المهامِّ بعدل.' },
      { style: 'protector', labelEn: 'You stop doing their share and let them face the consequences.', labelAr: 'تتوقّفُ عن فعلِ حصّتِهم وتدعُهم يواجهون العواقب.' },
    ],
  },
  // Q5 — Feeling unheard
  {
    id: 'cs-5',
    scenarioEn: 'You are trying to share something that matters to you, but your partner seems distracted.',
    scenarioAr: 'تحاولُ مشاركةَ شيءٍ مهمٍّ لك لكنّ شريكَك يبدو مشتَّتًا.',
    options: [
      { style: 'collaborator', labelEn: 'You pause and say, "I need your full attention for this — can we try again?"', labelAr: 'تتوقّفُ وتقول: "أحتاجُ انتباهَك الكاملَ لهذا — هل يمكنُنا المحاولةُ مرّةً أخرى؟"' },
      { style: 'reactor', labelEn: 'You feel a flash of anger and say, "You never listen to me!"', labelAr: 'تشعرُ بومضةِ غضبٍ وتقول: "أنتَ لا تستمعُ إليَّ أبدًا!"' },
      { style: 'peacekeeper', labelEn: 'You stop talking and decide it was not that important anyway.', labelAr: 'تتوقّفُ عن الحديثِ وتقرِّرُ أنّه لم يكن بتلك الأهمّيّة.' },
      { style: 'protector', labelEn: 'You put your phone down, look at them directly, and say, "This is important to me."', labelAr: 'تضعُ هاتفَك وتنظرُ إليه مباشرةً وتقول: "هذا مهمٌّ لي."' },
    ],
  },
  // Q6 — Social media boundaries
  {
    id: 'cs-6',
    scenarioEn: 'You see something on your partner\'s phone that makes you uncomfortable — a message from someone you do not know.',
    scenarioAr: 'ترى شيئًا على هاتفِ شريكِك يجعلُك غيرَ مرتاح — رسالةً من شخصٍ لا تعرفُه.',
    options: [
      { style: 'reactor', labelEn: 'Your stomach drops and you demand an explanation right then and there.', labelAr: 'تشعرُ بانقباضٍ في معدتِك وتطالبُ بتفسيرٍ فورًا.' },
      { style: 'protector', labelEn: 'You bring it up firmly — transparency is non-negotiable in your relationship.', labelAr: 'تطرحُ الأمرَ بحزمٍ — الشفافيّةُ غيرُ قابلةٍ للتفاوضِ في علاقتِكما.' },
      { style: 'peacekeeper', labelEn: 'You feel anxious but convince yourself it is probably nothing.', labelAr: 'تشعرُ بالقلقِ لكنّك تقنعُ نفسَك أنّه على الأرجحِ لا شيء.' },
      { style: 'collaborator', labelEn: 'You wait until you are calm, then share what you saw and how it made you feel without accusing.', labelAr: 'تنتظرُ حتّى تهدأَ ثمّ تُشاركُ ما رأيتَ وكيفَ أشعرَك دونَ اتّهام.' },
    ],
  },
  // Q7 — Different parenting approaches
  {
    id: 'cs-7',
    scenarioEn: 'You and your partner disagree about how to discipline your child after they misbehaved.',
    scenarioAr: 'تختلفان أنتَ وشريكُك حولَ كيفيّةِ تأديبِ طفلِكما بعدَ سوءِ تصرُّفِه.',
    options: [
      { style: 'peacekeeper', labelEn: 'You go along with your partner\'s approach to avoid an argument in front of the child.', labelAr: 'تتماشى مع أسلوبِ شريكِك لتجنُّبِ الجدالِ أمامَ الطفل.' },
      { style: 'protector', labelEn: 'You hold your ground — you believe strongly in your approach and will not budge.', labelAr: 'تتمسّكُ بموقفِك — تؤمنُ بقوّةٍ بأسلوبِك ولن تتراجع.' },
      { style: 'collaborator', labelEn: 'You agree to discuss it privately later and come up with a united plan.', labelAr: 'تتّفقان على مناقشتِه على انفرادٍ لاحقًا ووضعِ خطّةٍ موحَّدة.' },
      { style: 'reactor', labelEn: 'You correct your partner in the moment because you feel they are handling it wrong.', labelAr: 'تصحِّحُ شريكَك في اللحظةِ لأنّك تشعرُ أنّه يتعاملُ مع الأمرِ بشكلٍ خاطئ.' },
    ],
  },
  // Q8 — Time together vs. time apart
  {
    id: 'cs-8',
    scenarioEn: 'Your partner wants to spend the weekend with friends, but you were hoping for quality time together.',
    scenarioAr: 'يريدُ شريكُك قضاءَ عطلةِ نهايةِ الأسبوعِ مع الأصدقاء، لكنّك كنتَ تأملُ بوقتٍ نوعيٍّ معًا.',
    options: [
      { style: 'collaborator', labelEn: 'You suggest a compromise — some time with friends and some time just for the two of you.', labelAr: 'تقترحُ حلًّا وسطًا — بعضُ الوقتِ مع الأصدقاءِ وبعضُه لكما وحدَكما.' },
      { style: 'peacekeeper', labelEn: 'You say "go ahead" even though you feel disappointed inside.', labelAr: 'تقولُ "اذهبْ" رغمَ أنّك تشعرُ بخيبةِ أملٍ في داخلِك.' },
      { style: 'reactor', labelEn: 'You feel rejected and let them know you are upset about their priorities.', labelAr: 'تشعرُ بالرفضِ وتُخبرُه أنّك منزعجٌ من أولويّاتِه.' },
      { style: 'protector', labelEn: 'You tell them directly that you need this weekend together and it is important.', labelAr: 'تخبرُه مباشرةً أنّك تحتاجُ عطلةَ نهايةِ الأسبوعِ معًا وأنّها مهمّة.' },
    ],
  },
  // Q9 — Jealousy
  {
    id: 'cs-9',
    scenarioEn: 'Your partner is being very friendly with someone at a social event and you feel a pang of jealousy.',
    scenarioAr: 'شريكُك ودودٌ جدًّا مع شخصٍ ما في مناسبةٍ اجتماعيّة وتشعرُ بوخزةِ غَيرة.',
    options: [
      { style: 'peacekeeper', labelEn: 'You ignore the feeling and tell yourself you are overreacting.', labelAr: 'تتجاهلُ الشعورَ وتقولُ لنفسِك إنّك تبالغ.' },
      { style: 'reactor', labelEn: 'You pull your partner aside and let them know you are uncomfortable — right now.', labelAr: 'تسحبُ شريكَك جانبًا وتُخبرُه أنّك غيرُ مرتاح — الآن.' },
      { style: 'collaborator', labelEn: 'You mention it on the way home in a non-accusatory way and share how you felt.', labelAr: 'تذكرُه في طريقِ العودةِ بطريقةٍ غيرِ اتّهاميّةٍ وتُشاركُ شعورَك.' },
      { style: 'protector', labelEn: 'You make it clear that certain behaviors cross a line for you.', labelAr: 'توضِّحُ أنّ سلوكيّاتٍ معيّنةً تتجاوزُ حدودَك.' },
    ],
  },
  // Q10 — Career decisions
  {
    id: 'cs-10',
    scenarioEn: 'Your partner is considering a career change that would significantly impact your family\'s finances.',
    scenarioAr: 'يفكِّرُ شريكُك في تغييرٍ مهنيٍّ سيؤثِّرُ بشكلٍ كبيرٍ على ماليّةِ عائلتِكما.',
    options: [
      { style: 'collaborator', labelEn: 'You listen to their reasons, share your concerns, and work together on a realistic plan.', labelAr: 'تستمعُ لأسبابِه وتُشاركُ مخاوفَك وتعملان معًا على خطّةٍ واقعيّة.' },
      { style: 'protector', labelEn: 'You lay out the financial risks clearly and insist on a safety net before any changes.', labelAr: 'تعرضُ المخاطرَ الماليّةَ بوضوحٍ وتصرُّ على وجودِ شبكةِ أمانٍ قبلَ أيِّ تغيير.' },
      { style: 'peacekeeper', labelEn: 'You support their dream even though you are quietly terrified about the money.', labelAr: 'تدعمُ حلمَه رغمَ أنّك مرعوبٌ بهدوءٍ بشأنِ المال.' },
      { style: 'reactor', labelEn: 'You react with worry and tell them this is not the right time — you cannot afford the risk.', labelAr: 'تتفاعلُ بقلقٍ وتخبرُه أنّ هذا ليسَ الوقتَ المناسب — لا تستطيعون تحمُّلَ المخاطرة.' },
    ],
  },
  // Q11 — Emotional needs
  {
    id: 'cs-11',
    scenarioEn: 'You have been feeling emotionally disconnected from your partner for a few weeks.',
    scenarioAr: 'تشعرُ بالانفصالِ العاطفيِّ عن شريكِك منذُ بضعةِ أسابيع.',
    options: [
      { style: 'reactor', labelEn: 'You express your frustration emotionally — "We never connect anymore! What happened to us?"', labelAr: 'تعبِّرُ عن إحباطِك بعاطفيّة — "لم نعدْ نتواصلُ أبدًا! ماذا حدثَ لنا؟"' },
      { style: 'peacekeeper', labelEn: 'You wait and hope it passes on its own — maybe you are just going through a phase.', labelAr: 'تنتظرُ وتأملُ أن يمرَّ من تلقاءِ نفسِه — ربّما تمرّان فقط بمرحلة.' },
      { style: 'collaborator', labelEn: 'You plan a quiet evening together and gently share that you have been missing your connection.', labelAr: 'تخطِّطُ لأمسيةٍ هادئةٍ معًا وتُشاركُ بلطفٍ أنّك تفتقدُ تواصلَكما.' },
      { style: 'protector', labelEn: 'You tell them directly: "I need more from this relationship right now."', labelAr: 'تخبرُه مباشرةً: "أحتاجُ المزيدَ من هذه العلاقةِ الآن."' },
    ],
  },
  // Q12 — Cultural differences
  {
    id: 'cs-12',
    scenarioEn: 'You and your partner disagree about a cultural or religious tradition that is important to one of you.',
    scenarioAr: 'تختلفان أنتَ وشريكُك حولَ تقليدٍ ثقافيٍّ أو دينيٍّ مهمٍّ لأحدِكما.',
    options: [
      { style: 'protector', labelEn: 'You hold firm — this tradition is part of who you are and it is not negotiable.', labelAr: 'تتمسّكُ بثبات — هذا التقليدُ جزءٌ من هويّتِك وهو غيرُ قابلٍ للتفاوض.' },
      { style: 'collaborator', labelEn: 'You explore each other\'s perspectives and find a way to honor both traditions.', labelAr: 'تستكشفان وجهاتِ نظرِ بعضِكما وتجدان طريقةً لتكريمِ كلا التقليدَين.' },
      { style: 'reactor', labelEn: 'You feel deeply hurt that they do not value what matters to you and express it passionately.', labelAr: 'تشعرُ بأذىً عميقٍ لأنّه لا يقدِّرُ ما يهمُّك وتعبِّرُ عنه بحماس.' },
      { style: 'peacekeeper', labelEn: 'You give in to keep the peace, even though it stings.', labelAr: 'تتنازلُ لحفظِ السلام رغمَ أنّه يؤلم.' },
    ],
  },
  // Q13 — Big life decisions
  {
    id: 'cs-13',
    scenarioEn: 'You and your partner cannot agree on where to live — city or suburbs, close to family or far away.',
    scenarioAr: 'لا تستطيعان الاتّفاقَ على مكانِ العيش — المدينةُ أم الضاحية، قريبًا من العائلةِ أم بعيدًا.',
    options: [
      { style: 'collaborator', labelEn: 'You make a pros-and-cons list together and try to find a solution that honors both visions.', labelAr: 'تضعان قائمةَ إيجابيّاتٍ وسلبيّاتٍ معًا وتحاولان إيجادَ حلٍّ يحترمُ كلتا الرؤيتَين.' },
      { style: 'peacekeeper', labelEn: 'You defer to your partner\'s preference — their happiness matters more to you.', labelAr: 'تنصاعُ لتفضيلِ شريكِك — سعادتُه تهمُّك أكثر.' },
      { style: 'protector', labelEn: 'You are clear about what you need and will not compromise on something this important.', labelAr: 'أنتَ واضحٌ بشأنِ ما تحتاجُه ولن تتنازلَ في أمرٍ بهذه الأهمّيّة.' },
      { style: 'reactor', labelEn: 'The conversation gets heated because you both feel so strongly — you cannot help raising your voice.', labelAr: 'تحتدُّ المحادثةُ لأنّكما تشعران بقوّة — لا تستطيعُ منعَ نفسِك من رفعِ صوتِك.' },
    ],
  },
  // Q14 — Intimacy
  {
    id: 'cs-14',
    scenarioEn: 'You feel your physical intimacy has decreased and you miss the closeness.',
    scenarioAr: 'تشعرُ أنّ الحميميّةَ الجسديّةَ قد تراجعت وتفتقدُ القرب.',
    options: [
      { style: 'peacekeeper', labelEn: 'You say nothing — you do not want to make your partner feel pressured or guilty.', labelAr: 'لا تقولُ شيئًا — لا تريدُ أن يشعرَ شريكُك بالضغطِ أو الذنب.' },
      { style: 'collaborator', labelEn: 'You bring it up gently, share what you miss, and ask what closeness looks like for them right now.', labelAr: 'تطرحُ الموضوعَ بلطفٍ وتُشاركُ ما تفتقدُه وتسألُ كيفَ يبدو القربُ بالنسبةِ لهم الآن.' },
      { style: 'reactor', labelEn: 'You express your frustration — it feels like rejection and it is hard not to take it personally.', labelAr: 'تعبِّرُ عن إحباطِك — يبدو كالرفضِ ومن الصعبِ ألّا تأخذَه بشكلٍ شخصيّ.' },
      { style: 'protector', labelEn: 'You make it clear that physical connection is a need, not a luxury, in your relationship.', labelAr: 'توضِّحُ أنّ التواصلَ الجسديَّ حاجةٌ وليسَ رفاهيّةً في علاقتِكما.' },
    ],
  },
  // Q15 — Communication breakdown
  {
    id: 'cs-15',
    scenarioEn: 'You and your partner are in the middle of a disagreement and they suddenly shut down and stop talking.',
    scenarioAr: 'أنتما في وسطِ خلافٍ وفجأةً يصمتُ شريكُك ويتوقّفُ عن الحديث.',
    options: [
      { style: 'reactor', labelEn: 'You feel frustrated by the silence and push harder to keep the conversation going.', labelAr: 'تشعرُ بالإحباطِ من الصمتِ وتضغطُ أكثرَ لإبقاءِ المحادثةِ مستمرّة.' },
      { style: 'collaborator', labelEn: 'You say, "I can see you need a moment. Let us come back to this when we are both ready."', labelAr: 'تقول: "أرى أنّك تحتاجُ لحظة. لنعدْ إلى هذا عندما نكونُ مستعدَّين."' },
      { style: 'peacekeeper', labelEn: 'You back off completely — if they do not want to talk, you will not force it.', labelAr: 'تنسحبُ تمامًا — إن لم يردِ الحديثَ فلن تُجبرَه.' },
      { style: 'protector', labelEn: 'You tell them that shutting down is not fair and you deserve a response.', labelAr: 'تخبرُه أنّ الصمتَ ليسَ عادلًا وأنّك تستحقُّ ردًّا.' },
    ],
  },
  // Q16 — Trust
  {
    id: 'cs-16',
    scenarioEn: 'Your partner broke a promise they made to you — not for the first time.',
    scenarioAr: 'أخلَّ شريكُك بوعدٍ قطعَه لك — ليسَ للمرّةِ الأولى.',
    options: [
      { style: 'protector', labelEn: 'You draw a firm line: "I need to see real change, or we have a serious problem."', labelAr: 'ترسمُ خطًّا حازمًا: "أحتاجُ أن أرى تغييرًا حقيقيًّا وإلّا لدينا مشكلةٌ جدّيّة."' },
      { style: 'collaborator', labelEn: 'You express your disappointment and suggest working together to understand why this keeps happening.', labelAr: 'تعبِّرُ عن خيبةِ أملِك وتقترحُ العملَ معًا لفهمِ لماذا يستمرُّ هذا في الحدوث.' },
      { style: 'reactor', labelEn: 'You feel a wave of anger and let them know this pattern is breaking your trust.', labelAr: 'تشعرُ بموجةِ غضبٍ وتُخبرُه أنّ هذا النمطَ يكسرُ ثقتَك.' },
      { style: 'peacekeeper', labelEn: 'You accept their apology again and hope this time will be different.', labelAr: 'تقبلُ اعتذارَه مرّةً أخرى وتأملُ أن تكونَ هذه المرّةُ مختلفة.' },
    ],
  },
];
