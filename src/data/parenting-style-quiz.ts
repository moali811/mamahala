/* ================================================================
   Mama Hala's Parenting Compass
   A 16-question scenario-based assessment that identifies a parent's
   dominant parenting style. Each question presents 4 response options
   mapping to 4 branded styles. Scoring: count selections per style.
   ================================================================ */

export type ParentingStyle = 'nurturer' | 'guardian' | 'freedomGiver' | 'observer';

export interface ParentingStyleOption {
  style: ParentingStyle;
  labelEn: string;
  labelAr: string;
}

export interface ParentingStyleQuestion {
  id: string;
  scenarioEn: string;
  scenarioAr: string;
  options: ParentingStyleOption[];
}

export interface ParentingStyleProfile {
  key: ParentingStyle;
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

export const styles: ParentingStyleProfile[] = [
  {
    key: 'nurturer',
    nameEn: 'The Nurturer',
    nameAr: 'نمطُ المُربّي الحنون',
    iconName: 'Heart',
    color: '#25D366',
    strengthsEn: 'You bring a beautiful balance of warmth and structure to your parenting. You communicate openly with your child, set clear expectations with empathy, and use natural consequences rather than punishment. Your child likely feels both loved and secure.',
    strengthsAr: 'تجلبُ توازنًا جميلًا بينَ الدفءِ والبنيةِ في تربيتِك. تتواصلُ بانفتاحٍ مع طفلِك وتضعُ توقّعاتٍ واضحةً بتعاطفٍ وتستخدمُ العواقبَ الطبيعيّةَ بدلًا من العقاب. طفلُك على الأرجحِ يشعرُ بالحبِّ والأمانِ معًا.',
    growthEn: 'You may sometimes overthink your parenting decisions or put your child\'s needs so far ahead that you neglect your own wellbeing. Remember: a well-rested, fulfilled parent is a better parent. Give yourself grace.',
    growthAr: 'قد تبالغُ أحيانًا في التفكيرِ في قراراتِ التربية أو تضعُ احتياجاتِ طفلِك أمامَ احتياجاتِك بشكلٍ كبير. تذكَّرْ: الوالدُ المرتاحُ والراضي والدٌ أفضل. امنحْ نفسَك بعضَ اللطف.',
    suggestedServices: ['parenting-coaching'],
  },
  {
    key: 'guardian',
    nameEn: 'The Guardian',
    nameAr: 'نمطُ الحارسِ الأمين',
    iconName: 'Shield',
    color: '#7A3B5E',
    strengthsEn: 'You provide clear structure, consistent rules, and a strong sense of safety. Your child knows what is expected and feels the stability that comes from firm boundaries. You take your role as protector seriously.',
    strengthsAr: 'توفّرُ بنيةً واضحةً وقواعدَ متّسقةً وإحساسًا قويًّا بالأمان. طفلُك يعرفُ ما هو متوقَّعٌ ويشعرُ بالاستقرارِ الذي يأتي من حدودٍ ثابتة. تأخذُ دورَك كحامٍ على محملِ الجِدّ.',
    growthEn: 'You may benefit from building in more flexibility and actively listening to your child\'s perspective — even when you disagree. Children who feel heard alongside clear rules develop stronger self-regulation and trust.',
    growthAr: 'قد تستفيدُ من إضافةِ مزيدٍ من المرونةِ والاستماعِ بفاعليّةٍ لوجهةِ نظرِ طفلِك — حتّى عندما تختلف. الأطفالُ الذين يشعرون بأنّهم مسموعون إلى جانبِ القواعدِ الواضحة يطوّرون تنظيمًا ذاتيًّا وثقةً أقوى.',
    suggestedServices: ['parenting-coaching', 'tackling-child-tantrums'],
  },
  {
    key: 'freedomGiver',
    nameEn: 'The Freedom-Giver',
    nameAr: 'نمطُ مانحِ الحرّيّة',
    iconName: 'Feather',
    color: '#C8A97D',
    strengthsEn: 'You create a warm, emotionally rich environment where your child feels deeply loved and free to express themselves. You encourage creativity, respect your child\'s voice, and foster a strong emotional bond.',
    strengthsAr: 'تخلقُ بيئةً دافئةً وغنيّةً عاطفيًّا حيثُ يشعرُ طفلُك بحبٍّ عميقٍ وحرّيّةٍ في التعبيرِ عن نفسِه. تشجِّعُ الإبداعَ وتحترمُ صوتَ طفلِك وتعزِّزُ رابطةً عاطفيّةً قويّة.',
    growthEn: 'You may benefit from setting clearer boundaries and following through on limits more consistently. Children thrive when they feel both freedom and structure — the two are not opposites, they are partners.',
    growthAr: 'قد تستفيدُ من وضعِ حدودٍ أوضح ومتابعةِ تطبيقِ القيودِ بشكلٍ أكثرَ اتّساقًا. الأطفالُ يزدهرون عندما يشعرون بالحرّيّةِ والبنيةِ معًا — فهما ليسا نقيضَين بل شريكان.',
    suggestedServices: ['parenting-coaching', 'family-relationship-strengthening'],
  },
  {
    key: 'observer',
    nameEn: 'The Quiet Observer',
    nameAr: 'نمطُ المُراقبِ الهادئ',
    iconName: 'Eye',
    color: '#C4878A',
    strengthsEn: 'You foster independence and trust your child\'s ability to figure things out. You give them space to grow and learn from their own experiences, which can build resilience and self-reliance.',
    strengthsAr: 'تعزِّزُ الاستقلاليّةَ وتثقُ في قدرةِ طفلِك على حلِّ الأمورِ بنفسِه. تمنحُه مساحةً للنموِّ والتعلُّمِ من تجاربِه الخاصّة، ممّا يمكنُ أن يبنيَ المرونةَ والاعتمادَ على الذات.',
    growthEn: 'You may benefit from more active engagement and regular emotional check-ins with your child. Children need to know they are seen and that someone is paying attention — even independent ones still need connection.',
    growthAr: 'قد تستفيدُ من مزيدٍ من المشاركةِ الفاعلةِ والتحقُّقِ العاطفيِّ المنتظمِ مع طفلِك. الأطفالُ بحاجةٍ لمعرفةِ أنّ أحدًا يراهم وينتبهُ لهم — حتّى المستقلّون منهم ما زالوا بحاجةٍ للتواصل.',
    suggestedServices: ['parenting-coaching', 'parental-stress-wellbeing'],
  },
];

export const questions: ParentingStyleQuestion[] = [
  // Q1 — Homework/school
  {
    id: 'ps-1',
    scenarioEn: 'Your 8-year-old refuses to do their homework and starts crying.',
    scenarioAr: 'طفلُك ذو الثمانِ سنواتٍ يرفضُ أداءَ واجبِه المدرسيِّ ويبدأُ بالبكاء.',
    options: [
      { style: 'nurturer', labelEn: 'I sit with them, acknowledge their frustration, and help them break the task into smaller steps.', labelAr: 'أجلسُ معه وأعترفُ بإحباطِه وأساعدُه في تقسيمِ المهمّةِ إلى خطواتٍ أصغر.' },
      { style: 'guardian', labelEn: 'I explain that homework is non-negotiable and they need to complete it before any screen time.', labelAr: 'أوضِّحُ أنّ الواجبَ غيرُ قابلٍ للتفاوضِ ويجبُ إنهاؤه قبلَ أيِّ وقتِ شاشة.' },
      { style: 'freedomGiver', labelEn: 'I let them take a break and come back to it when they feel ready.', labelAr: 'أدعُه يأخذُ استراحةً ويعودُ إليه عندما يشعرُ بالاستعداد.' },
      { style: 'observer', labelEn: 'They know their responsibilities — I trust them to handle it on their own.', labelAr: 'يعرفُ مسؤوليّاتِه — أثقُ في قدرتِه على التعاملِ معها بمفردِه.' },
    ],
  },
  // Q2 — Sibling conflicts
  {
    id: 'ps-2',
    scenarioEn: 'Your two children are fighting over a toy and both are screaming.',
    scenarioAr: 'طفلاك يتشاجران على لعبةٍ وكلاهما يصرخ.',
    options: [
      { style: 'guardian', labelEn: 'I take the toy away and explain they will get it back when they can share calmly.', labelAr: 'آخذُ اللعبةَ وأوضِّحُ أنّهما سيستعيدانِها عندما يتمكّنان من المشاركةِ بهدوء.' },
      { style: 'nurturer', labelEn: 'I kneel down, help each child name their feeling, and guide them to find a solution together.', labelAr: 'أنحني وأساعدُ كلَّ طفلٍ على تسميةِ شعورِه وأوجِّهُهما لإيجادِ حلٍّ معًا.' },
      { style: 'observer', labelEn: 'I let them work it out between themselves — they need to learn to resolve conflicts.', labelAr: 'أدعُهما يحلّان الأمرَ بينهما — يحتاجان لتعلُّمِ حلِّ النزاعات.' },
      { style: 'freedomGiver', labelEn: 'I suggest they each pick a different toy and play their own way for now.', labelAr: 'أقترحُ أن يختارَ كلٌّ منهما لعبةً مختلفةً ويلعبَ بطريقتِه حاليًّا.' },
    ],
  },
  // Q3 — Screen time
  {
    id: 'ps-3',
    scenarioEn: 'Your child has been on their tablet for over two hours and does not want to stop.',
    scenarioAr: 'طفلُك على الجهازِ اللوحيِّ منذُ أكثرَ من ساعتَين ولا يريدُ التوقّف.',
    options: [
      { style: 'freedomGiver', labelEn: 'I mention it gently but do not push too hard — they will eventually get bored.', labelAr: 'أذكرُ ذلك بلطفٍ لكن لا أضغطُ كثيرًا — سيملُّ في النهاية.' },
      { style: 'observer', labelEn: 'I do not usually track their screen time closely — they manage their own activities.', labelAr: 'لا أتتبّعُ وقتَ الشاشةِ بدقّةٍ عادةً — يديرُ أنشطتَه بنفسِه.' },
      { style: 'nurturer', labelEn: 'I give a 5-minute warning, acknowledge it is hard to stop, then offer an exciting alternative activity together.', labelAr: 'أعطيه تنبيهًا بخمسِ دقائق وأعترفُ أنّ التوقّفَ صعبٌ ثمّ أقترحُ نشاطًا بديلًا مثيرًا معًا.' },
      { style: 'guardian', labelEn: 'Screen time is over. I turn it off and remind them of the family rule.', labelAr: 'انتهى وقتُ الشاشة. أطفئُه وأذكِّرُه بقاعدةِ الأسرة.' },
    ],
  },
  // Q4 — Bedtime
  {
    id: 'ps-4',
    scenarioEn: 'It is bedtime, but your child says they are not tired and wants to stay up.',
    scenarioAr: 'حانَ وقتُ النوم لكنّ طفلَك يقولُ إنّه ليسَ متعبًا ويريدُ السهر.',
    options: [
      { style: 'nurturer', labelEn: 'I validate their feeling, offer a quiet wind-down routine like reading, and stay consistent with bedtime.', labelAr: 'أصادقُ شعورَه وأقدِّمُ روتينًا هادئًا للاسترخاءِ كالقراءة وأحافظُ على ثباتِ موعدِ النوم.' },
      { style: 'freedomGiver', labelEn: 'I let them stay up a bit longer — they will fall asleep when they are tired.', labelAr: 'أدعُه يسهرُ قليلًا — سينامُ عندما يتعب.' },
      { style: 'guardian', labelEn: 'Bedtime is bedtime. I walk them to their room and expect them to stay in bed.', labelAr: 'وقتُ النومِ هو وقتُ النوم. أرافقُه إلى غرفتِه وأتوقّعُ منه البقاءَ في السرير.' },
      { style: 'observer', labelEn: 'I remind them once, then let them decide when to go to sleep.', labelAr: 'أذكِّرُه مرّةً واحدة ثمّ أتركُ له القرارَ متى ينام.' },
    ],
  },
  // Q5 — Public meltdowns
  {
    id: 'ps-5',
    scenarioEn: 'Your child has a meltdown in the middle of a grocery store.',
    scenarioAr: 'طفلُك ينهارُ في نوبةِ غضبٍ في وسطِ المتجر.',
    options: [
      { style: 'guardian', labelEn: 'I calmly tell them this behavior is not acceptable and we leave the store immediately.', labelAr: 'أخبرُه بهدوءٍ أنّ هذا السلوكَ غيرُ مقبولٍ ونغادرُ المتجرَ فورًا.' },
      { style: 'observer', labelEn: 'I wait nearby and let the episode pass — they will calm down on their own.', labelAr: 'أنتظرُ بالقربِ وأدعُ النوبةَ تمرّ — سيهدأُ بمفردِه.' },
      { style: 'nurturer', labelEn: 'I get down to their level, speak softly, name their emotion, and help them regulate.', labelAr: 'أنزلُ إلى مستواه وأتحدّثُ بهدوءٍ وأسمّي مشاعرَه وأساعدُه على تنظيمِ نفسِه.' },
      { style: 'freedomGiver', labelEn: 'I try to distract them with something fun or offer a treat to help them feel better.', labelAr: 'أحاولُ تشتيتَ انتباهِه بشيءٍ ممتعٍ أو أقدِّمُ مكافأةً ليشعرَ بالتحسّن.' },
    ],
  },
  // Q6 — Friend conflicts
  {
    id: 'ps-6',
    scenarioEn: 'Your child comes home upset because a friend said something mean to them.',
    scenarioAr: 'يعودُ طفلُك إلى المنزلِ حزينًا لأنّ صديقًا قالَ له شيئًا جارحًا.',
    options: [
      { style: 'freedomGiver', labelEn: 'I comfort them and tell them it is okay to feel hurt — I focus on making them feel loved.', labelAr: 'أواسيه وأقولُ له أنّه لا بأسَ بالشعورِ بالأذى — أركِّزُ على جعلِه يشعرُ بالحبّ.' },
      { style: 'nurturer', labelEn: 'I listen fully, help them process their feelings, and brainstorm how they might respond next time.', labelAr: 'أستمعُ جيّدًا وأساعدُه على معالجةِ مشاعرِه ونتبادلُ الأفكارَ حولَ كيفَ يمكنُ أن يردَّ في المرّةِ القادمة.' },
      { style: 'guardian', labelEn: 'I teach them to stand up for themselves and consider speaking with the friend\'s parents.', labelAr: 'أعلِّمُه أن يدافعَ عن نفسِه وأفكِّرُ في التحدّثِ مع والدَي الصديق.' },
      { style: 'observer', labelEn: 'I tell them these things happen and they will figure out how to handle it.', labelAr: 'أقولُ له إنّ هذه الأمورَ تحدثُ وسيكتشفُ كيفَ يتعاملُ معها.' },
    ],
  },
  // Q7 — Chores
  {
    id: 'ps-7',
    scenarioEn: 'You ask your child to clean their room and they say "later" for the third time.',
    scenarioAr: 'تطلبُ من طفلِك ترتيبَ غرفتِه ويقولُ "لاحقًا" للمرّةِ الثالثة.',
    options: [
      { style: 'observer', labelEn: 'I leave it — their room is their space, they will clean it when it bothers them.', labelAr: 'أتركُ الأمر — غرفتُه مساحتُه الخاصّة وسيرتِّبُها عندما تزعجُه.' },
      { style: 'guardian', labelEn: 'I give a clear deadline with a consequence if it is not done.', labelAr: 'أحدِّدُ موعدًا نهائيًّا واضحًا مع عاقبةٍ إن لم يُنجز.' },
      { style: 'freedomGiver', labelEn: 'I do it myself this time — it is not worth the battle.', labelAr: 'أفعلُها بنفسي هذه المرّة — لا تستحقُّ المعركة.' },
      { style: 'nurturer', labelEn: 'I acknowledge they might not feel like it, offer to start together, and set a timer to make it fun.', labelAr: 'أعترفُ بأنّه قد لا يرغبُ في ذلك وأعرضُ البدءَ معًا وأضعُ مؤقِّتًا لجعلِه ممتعًا.' },
    ],
  },
  // Q8 — Honesty/lying
  {
    id: 'ps-8',
    scenarioEn: 'You discover your child lied about finishing a school project.',
    scenarioAr: 'تكتشفُ أنّ طفلَك كذبَ بشأنِ إنهاءِ مشروعٍ مدرسيّ.',
    options: [
      { style: 'nurturer', labelEn: 'I ask them why they felt they needed to lie, listen without judgment, and work on a plan together.', labelAr: 'أسألُه لماذا شعرَ بأنّه بحاجةٍ للكذبِ وأستمعُ بدونِ حكمٍ ونعملُ على خطّةٍ معًا.' },
      { style: 'guardian', labelEn: 'I explain that dishonesty has consequences, set a clear consequence, and supervise the project completion.', labelAr: 'أوضِّحُ أنّ عدمَ الصدقِ له عواقب وأحدِّدُ عاقبةً واضحةً وأشرفُ على إنهاءِ المشروع.' },
      { style: 'freedomGiver', labelEn: 'I express my disappointment gently and trust them to make it right on their own.', labelAr: 'أعبِّرُ عن خيبةِ أملي بلطفٍ وأثقُ في قدرتِه على تصحيحِ الأمرِ بنفسِه.' },
      { style: 'observer', labelEn: 'I mention it briefly and move on — they probably already feel bad about it.', labelAr: 'أذكرُه بإيجازٍ وأمضي قدمًا — ربّما يشعرُ بالسوءِ بالفعل.' },
    ],
  },
  // Q9 — Food/eating
  {
    id: 'ps-9',
    scenarioEn: 'Your child refuses to eat dinner and asks for snacks instead.',
    scenarioAr: 'طفلُك يرفضُ تناولَ العشاءِ ويطلبُ وجباتٍ خفيفةً بدلًا من ذلك.',
    options: [
      { style: 'guardian', labelEn: 'Dinner is what we are having. If they choose not to eat, there are no snacks until breakfast.', labelAr: 'العشاءُ هو ما لدينا. إذا اختارَ عدمَ الأكل فلا وجباتٍ خفيفةً حتّى الفطور.' },
      { style: 'freedomGiver', labelEn: 'I let them have something they prefer — I do not want mealtime to become a fight.', labelAr: 'أدعُه يتناولُ شيئًا يفضِّلُه — لا أريدُ أن يصبحَ وقتُ الطعامِ معركة.' },
      { style: 'nurturer', labelEn: 'I offer one alternative alongside dinner and involve them in meal planning next time.', labelAr: 'أقدِّمُ بديلًا واحدًا إلى جانبِ العشاء وأشركُه في التخطيطِ للوجبةِ في المرّةِ القادمة.' },
      { style: 'observer', labelEn: 'I do not make a big deal of it — they will eat when they are hungry.', labelAr: 'لا أجعلُها قضيّةً كبيرة — سيأكلُ عندما يجوع.' },
    ],
  },
  // Q10 — Risk-taking
  {
    id: 'ps-10',
    scenarioEn: 'Your child wants to climb a tall tree at the park. You feel it might be unsafe.',
    scenarioAr: 'طفلُك يريدُ تسلُّقَ شجرةٍ عاليةٍ في الحديقة. تشعرُ أنّ ذلك قد يكونُ غيرَ آمن.',
    options: [
      { style: 'observer', labelEn: 'I let them try — falling is how they learn about limits.', labelAr: 'أدعُه يجرِّب — السقوطُ هو كيفَ يتعلّمُ حدودَه.' },
      { style: 'nurturer', labelEn: 'I stand nearby, encourage them to try the lower branches first, and talk through how to stay safe.', labelAr: 'أقفُ بالقربِ وأشجِّعُه على تجربةِ الأغصانِ المنخفضةِ أوّلًا ونتحدّثُ عن كيفَ يبقى آمنًا.' },
      { style: 'guardian', labelEn: 'I tell them that tree is too high and redirect them to a safer climbing structure.', labelAr: 'أخبرُه أنّ تلك الشجرةَ عاليةٌ جدًّا وأوجِّهُه إلى هيكلِ تسلُّقٍ أكثرَ أمانًا.' },
      { style: 'freedomGiver', labelEn: 'I watch from a distance and let them explore — I want them to feel adventurous.', labelAr: 'أراقبُ من بعيدٍ وأدعُه يستكشف — أريدُه أن يشعرَ بروحِ المغامرة.' },
    ],
  },
  // Q11 — Emotional outbursts
  {
    id: 'ps-11',
    scenarioEn: 'Your child slams their door after you say no to something they wanted.',
    scenarioAr: 'طفلُك يصفقُ البابَ بعدَ أن قلتَ لا لشيءٍ أراده.',
    options: [
      { style: 'freedomGiver', labelEn: 'I give them space and time to cool down — they are just frustrated.', labelAr: 'أمنحُه مساحةً ووقتًا ليهدأ — إنّه محبطٌ فقط.' },
      { style: 'guardian', labelEn: 'I address the door-slamming immediately — that behavior is not allowed in our home.', labelAr: 'أعالجُ صفقَ البابِ فورًا — هذا السلوكُ غيرُ مسموحٍ في منزلِنا.' },
      { style: 'nurturer', labelEn: 'I wait a few minutes, then go to them and say I understand they are upset, while holding the boundary.', labelAr: 'أنتظرُ بضعَ دقائقَ ثمّ أذهبُ إليه وأقولُ إنّني أفهمُ أنّه منزعجٌ مع الحفاظِ على الحدّ.' },
      { style: 'observer', labelEn: 'I let it go — they will get over it. I do not take it personally.', labelAr: 'أتركُ الأمرَ يمرّ — سيتجاوزُه. لا آخذُه على محملٍ شخصيّ.' },
    ],
  },
  // Q12 — Grade concerns
  {
    id: 'ps-12',
    scenarioEn: 'Your child brings home a report card with grades lower than expected.',
    scenarioAr: 'يعودُ طفلُك بشهادةِ درجاتٍ أقلَّ من المتوقَّع.',
    options: [
      { style: 'nurturer', labelEn: 'I ask how they feel about it first, then we look at each subject together and make a study plan.', labelAr: 'أسألُه كيفَ يشعرُ حيالَها أوّلًا ثمّ ننظرُ في كلِّ مادّةٍ معًا ونضعُ خطّةً دراسيّة.' },
      { style: 'observer', labelEn: 'Grades are their responsibility — I trust they will try harder next time.', labelAr: 'الدرجاتُ مسؤوليّتُه — أثقُ أنّه سيجتهدُ أكثرَ في المرّةِ القادمة.' },
      { style: 'guardian', labelEn: 'I set new rules — reduced screen time and scheduled study hours until grades improve.', labelAr: 'أضعُ قواعدَ جديدة — تقليلُ وقتِ الشاشةِ وجدولةُ ساعاتِ الدراسة حتّى تتحسّنَ الدرجات.' },
      { style: 'freedomGiver', labelEn: 'I reassure them that grades do not define them and I love them no matter what.', labelAr: 'أطمئنُه أنّ الدرجاتِ لا تحدِّدُ قيمتَه وأنّني أحبُّه مهما كان.' },
    ],
  },
  // Q13 — Social media
  {
    id: 'ps-13',
    scenarioEn: 'Your pre-teen asks for a social media account because all their friends have one.',
    scenarioAr: 'طفلُك في مرحلةِ ما قبلَ المراهقة يطلبُ حسابًا على وسائلِ التواصلِ لأنّ جميعَ أصدقائِه لديهم.',
    options: [
      { style: 'guardian', labelEn: 'I say no — they are not old enough yet. I explain the risks clearly.', labelAr: 'أقولُ لا — ليسَ كبيرًا كفايةً بعد. أشرحُ المخاطرَ بوضوح.' },
      { style: 'nurturer', labelEn: 'I have an open conversation about why they want it, discuss risks together, and set clear guidelines if we agree.', labelAr: 'أجري محادثةً مفتوحةً حولَ لماذا يريدُ ذلك ونناقشُ المخاطرَ معًا ونضعُ إرشاداتٍ واضحةً إن اتّفقنا.' },
      { style: 'freedomGiver', labelEn: 'I let them create one — I do not want them to feel left out from their friend group.', labelAr: 'أسمحُ له بإنشاءِ حساب — لا أريدُه أن يشعرَ بالعزلةِ عن مجموعةِ أصدقائِه.' },
      { style: 'observer', labelEn: 'I leave it up to them — they will figure out social media eventually.', labelAr: 'أتركُ الأمرَ له — سيفهمُ وسائلَ التواصلِ في النهاية.' },
    ],
  },
  // Q14 — Family events
  {
    id: 'ps-14',
    scenarioEn: 'A family gathering is coming up and your child says they do not want to go.',
    scenarioAr: 'اجتماعٌ عائليٌّ قادمٌ وطفلُك يقولُ إنّه لا يريدُ الذهاب.',
    options: [
      { style: 'freedomGiver', labelEn: 'I do not force them — I want them to enjoy social events, not dread them.', labelAr: 'لا أجبرُه — أريدُه أن يستمتعَ بالمناسباتِ الاجتماعيّةِ لا أن يخشاها.' },
      { style: 'nurturer', labelEn: 'I explore why they do not want to go, validate their feelings, and help find a compromise.', labelAr: 'أستكشفُ لماذا لا يريدُ الذهابَ وأصادقُ مشاعرَه وأساعدُ في إيجادِ حلٍّ وسط.' },
      { style: 'observer', labelEn: 'If they do not want to go, that is fine — they can stay home.', labelAr: 'إن لم يردِ الذهابَ فلا بأس — يمكنُه البقاءُ في المنزل.' },
      { style: 'guardian', labelEn: 'Family events are important. They are coming — I explain why it matters.', labelAr: 'المناسباتُ العائليّةُ مهمّة. سيأتي — أشرحُ لماذا هذا مهمّ.' },
    ],
  },
  // Q15 — Morning routines
  {
    id: 'ps-15',
    scenarioEn: 'Every morning is a struggle — your child moves slowly and you are always rushing out the door.',
    scenarioAr: 'كلُّ صباحٍ معركة — طفلُك بطيءُ الحركةِ وأنتَ دائمًا في عجلةٍ للخروج.',
    options: [
      { style: 'nurturer', labelEn: 'I create a visual morning checklist with them and build in extra time so mornings feel calmer.', labelAr: 'أنشئُ قائمةَ مهامٍّ صباحيّةً مرئيّةً معه وأخصِّصُ وقتًا إضافيًّا ليكونَ الصباحُ أهدأ.' },
      { style: 'guardian', labelEn: 'I set strict wake-up times and a clear sequence — if they are not ready, there are consequences.', labelAr: 'أحدِّدُ أوقاتَ استيقاظٍ صارمةً وتسلسلًا واضحًا — إن لم يكن مستعدًّا فهناك عواقب.' },
      { style: 'observer', labelEn: 'I let natural consequences teach them — if they are late, they face it at school.', labelAr: 'أدعُ العواقبَ الطبيعيّةَ تعلِّمُه — إن تأخّرَ فسيواجهُ ذلك في المدرسة.' },
      { style: 'freedomGiver', labelEn: 'I help them get ready myself to avoid the stress — I prefer a peaceful morning.', labelAr: 'أساعدُه في الاستعدادِ بنفسي لتجنُّبِ التوتّر — أفضِّلُ صباحًا هادئًا.' },
    ],
  },
  // Q16 — Money/allowance
  {
    id: 'ps-16',
    scenarioEn: 'Your child asks for money to buy something at the store. They already spent their allowance.',
    scenarioAr: 'طفلُك يطلبُ مالًا لشراءِ شيءٍ من المتجر. لقد أنفقَ مصروفَه بالفعل.',
    options: [
      { style: 'observer', labelEn: 'I tell them to figure it out — managing money is their lesson to learn.', labelAr: 'أقولُ له أن يجدَ حلًّا — إدارةُ المالِ درسٌ يجبُ أن يتعلّمَه.' },
      { style: 'freedomGiver', labelEn: 'I buy it for them this time — I do not want to disappoint them.', labelAr: 'أشتريه له هذه المرّة — لا أريدُ أن أخيِّبَ أملَه.' },
      { style: 'guardian', labelEn: 'I say no — they need to learn to budget. They can save for it next month.', labelAr: 'أقولُ لا — يحتاجُ لتعلُّمِ إدارةِ الميزانيّة. يمكنُه الادّخارُ له الشهرَ القادم.' },
      { style: 'nurturer', labelEn: 'I use it as a teaching moment — we talk about saving, and I offer to match their savings if they wait.', labelAr: 'أستخدمُها كلحظةٍ تعليميّة — نتحدّثُ عن الادّخارِ وأعرضُ مضاعفةَ مدّخراتِه إن انتظر.' },
    ],
  },
];
