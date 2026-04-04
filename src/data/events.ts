/* ================================================================
   Smart Events Data
   ================================================================
   Edit this file to add/remove/update events.
   Events auto-sort and auto-categorize as upcoming/past based on date.
   ================================================================ */

import type { SmartEvent, EventType } from '@/types';

export const events: SmartEvent[] = [
  /* ── Upcoming / Featured ────────────────────────────────────── */
  {
    slug: 'parenting-digital-age',
    titleEn: 'Parenting in the Digital Age',
    titleAr: 'التّربية في العصرِ الرّقميّ',
    scenarioEn: 'Your teen has stopped talking to you. Dinner is silent. Their phone is their whole world — and you feel like you\'re losing them.',
    scenarioAr: 'ابنُك المراهقُ توقّفَ عن الحديثِ معك. العشاءُ صامت. هاتفُه هو عالمُه بأكملِه — وتشعرُ أنّك تفقدُه.',
    descriptionEn:
      'A free webinar exploring how to set healthy screen boundaries, keep communication open, and protect your child\'s emotional wellbeing in the digital age.',
    descriptionAr:
      'ندوة مجانية عبر الإنترنت تستكشف كيفية وضع حدود صحية للشاشات والحفاظ على التواصل المفتوح وحماية صحة طفلك العاطفية في العصر الرقمي.',
    longDescriptionEn:
      'Screens are everywhere — and so is parental anxiety. In this interactive webinar, Dr. Hala Ali shares practical strategies to help families navigate technology without losing connection. We\'ll cover age-appropriate screen limits, warning signs of problematic use, and how to turn screen time into a conversation starter rather than a battleground.',
    longDescriptionAr:
      'الشاشات في كل مكان — وكذلك قلق الوالدين. في هذه الندوة التفاعلية، تشارك الدكتورة هالة علي استراتيجيات عملية لمساعدة العائلات على التعامل مع التكنولوجيا دون فقدان التواصل. سنغطي حدود الشاشة المناسبة للعمر، وعلامات التحذير من الاستخدام المفرط، وكيفية تحويل وقت الشاشة إلى بداية محادثة بدلاً من ساحة معركة.',
    type: 'webinar',
    audiences: ['families', 'community'],
    relatedServiceSlug: 'parent-coaching',
    date: '2026-04-15',
    startTime: '19:00',
    endTime: '20:30',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: true,
    capacity: 100,
    spotsRemaining: 72,
    registrationStatus: 'open',
    registrationUrl: 'initial-consultation',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    confirmationMessageEn: 'You\'re on the interest list! We\'ll contact you with the confirmed date and details once we have enough registrations.',
    confirmationMessageAr: 'أنت مسجل! تحقق من بريدك الإلكتروني للحصول على رابط Zoom قبل الندوة.',
    featured: true,
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'A quiet space to participate',
      'Questions about your family\'s screen habits',
      'An open mind',
    ],
    whatToBringAr: [
      'مكان هادئ للمشاركة',
      'أسئلة حول عادات الشاشة في عائلتك',
      'عقل منفتح',
    ],
    faqs: [
      {
        questionEn: 'Is this webinar suitable for parents of all ages?',
        questionAr: 'هل هذه الندوة مناسبة لأولياء الأمور بجميع الأعمار؟',
        answerEn: 'Yes! The strategies apply to families with children from toddlers to teenagers.',
        answerAr: 'نعم! الاستراتيجيات تنطبق على العائلات التي لديها أطفال من الأطفال الصغار إلى المراهقين.',
      },
      {
        questionEn: 'Will the recording be available afterwards?',
        questionAr: 'هل سيكون التسجيل متاحاً بعد ذلك؟',
        answerEn: 'Yes, all registered participants will receive the recording within 24 hours.',
        answerAr: 'نعم، سيحصل جميع المشاركين المسجلين على التسجيل خلال 24 ساعة.',
      },
    ],
    outcomesEn: [
      'Identify your child\'s screen triggers and emotional patterns',
      'Build a family media agreement everyone can follow',
      'Learn 3 conversation starters that replace conflict',
      'Understand age-appropriate screen limits backed by research',
    ],
    outcomesAr: [
      'حدِّدْ مُحفّزاتِ طفلِك تجاهَ الشّاشة وأنماطَه العاطفيّة',
      'ابنِ اتّفاقيّةَ إعلامٍ عائليّةً يلتزمُ بها الجميع',
      'تعلَّمْ 3 بداياتٍ للحوارِ تحلُّ محلَّ الصّراع',
      'افهَمْ حدودَ الشّاشةِ المناسبةَ للعمرِ المدعومةَ بالأبحاث',
    ],
    audienceDescEn: 'Parents of children aged 5–17 navigating screens and technology',
    audienceDescAr: 'أولياءُ أمورِ الأطفالِ من 5 إلى 17 عامًا الذين يتعاملونَ مع الشّاشاتِ والتّكنولوجيا',
    feeDisplayEn: 'Free',
    feeDisplayAr: 'مجّانيّ',
    formatDescEn: '90-minute live webinar with Q&A on Google Meet',
    formatDescAr: 'ندوةٌ حيّةٌ مدّتُها 90 دقيقةً مع أسئلةٍ وأجوبة عبر Google Meet',
    tags: ['parenting', 'screen-time', 'digital-wellness'],
  },

  {
    slug: 'couples-communication',
    titleEn: 'Couples Communication Workshop',
    titleAr: 'ورشة عمل تواصل الأزواج',
    scenarioEn: 'You love each other — but the same argument keeps happening. You say one thing, they hear another. The distance is growing.',
    scenarioAr: 'تحبّانِ بعضَكما — لكنّ الخلافَ نفسَه يتكرّر. تقولُ شيئًا ويسمعُ شريكُك شيئًا آخر. المسافةُ تكبُر.',
    descriptionEn:
      'An interactive workshop for couples looking to improve their communication skills, resolve conflicts constructively, and deepen their connection.',
    descriptionAr:
      'ورشة عمل تفاعلية للأزواج الذين يتطلعون إلى تحسين مهارات التواصل وحل النزاعات بشكل بناء وتعميق الترابط.',
    longDescriptionEn:
      'Communication is the foundation of every strong relationship. In this hands-on workshop, couples will learn practical tools from Gottman research and emotionally-focused therapy. You\'ll practice active listening exercises, identify your conflict patterns, and leave with a personalized communication toolkit.',
    longDescriptionAr:
      'التواصل هو أساس كل علاقة قوية. في هذه الورشة العملية، سيتعلم الأزواج أدوات عملية من أبحاث غوتمان والعلاج المركز على العاطفة. ستمارسون تمارين الاستماع الفعّال، وتحديد أنماط الخلاف، والمغادرة بمجموعة أدوات تواصل مخصصة.',
    type: 'workshop',
    audiences: ['couples'],
    relatedServiceSlug: 'couples-counseling',
    date: '2026-05-03',
    startTime: '10:00',
    endTime: '13:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'online',
    locationNameEn: 'Google Meet',
    locationNameAr: 'Google Meet',
    isFree: false,
    priceCAD: 49,
    priceNoteEn: 'per couple',
    priceNoteAr: 'لكل زوجين',
    capacity: 20,
    spotsRemaining: 14,
    registrationStatus: 'open',
    registrationUrl: 'events-couples-communication-workshop',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'Both partners present',
      'Notebook and pen',
      'Willingness to try new approaches',
    ],
    whatToBringAr: [
      'حضور كلا الشريكين',
      'دفتر وقلم',
      'الاستعداد لتجربة أساليب جديدة',
    ],
    outcomesEn: [
      'Understand your own and your partner\'s communication style',
      'Learn the 4 patterns that predict relationship breakdown',
      'Practice active listening exercises you can use at home',
      'Leave with a personalized communication toolkit',
    ],
    outcomesAr: [
      'افهَمْ أسلوبَ تواصلِك وأسلوبَ شريكِك',
      'تعرَّفْ على الأنماطِ الأربعةِ التي تُنبئُ بانهيارِ العلاقة',
      'مارِسْ تمارينَ الاستماعِ الفعّال التي يمكنُك استخدامُها في المنزل',
      'غادِرْ بمجموعةِ أدواتِ تواصلٍ مُخصَّصة',
    ],
    audienceDescEn: 'Couples at any stage — whether newly together or decades in',
    audienceDescAr: 'أزواجٌ في أيّ مرحلة — سواءٌ حديثو العلاقةِ أو منذ عقود',
    feeDisplayEn: '$49 CAD per couple · Sliding scale available',
    feeDisplayAr: '49 دولار كنديّ للزّوجَين · مقياسٌ متدرّجٌ متاح',
    formatDescEn: '3-hour interactive workshop with breakout exercises',
    formatDescAr: 'ورشةُ عملٍ تفاعليّةٌ مدّتُها 3 ساعاتٍ مع تمارينَ جماعيّة',
    tags: ['couples', 'communication', 'relationships'],
  },

  {
    slug: 'mindfulness-cultural-sharing',
    titleEn: 'Mindfulness and Cultural Sharing Afternoon',
    titleAr: 'عصرية اليقظة الذهنية والمشاركة الثقافية',
    scenarioEn: 'You moved across the world for a better life — but some days you feel caught between two cultures, and your kids don\'t understand where you came from.',
    scenarioAr: 'انتقلتَ عبرَ العالمِ لحياةٍ أفضل — لكنّك أحيانًا تشعرُ بأنّك عالقٌ بين ثقافتَين، وأطفالُك لا يفهمونَ من أينَ جئت.',
    descriptionEn:
      'Engage in mindfulness activities and cultural sharing to enhance family well-being, with a focus on promoting mental health in Arab families living abroad.',
    descriptionAr:
      'شاركوا في أنشطة اليقظة الذهنية والمشاركة الثقافية لتعزيز رفاه الأسرة، مع التركيز على تعزيز الصحة النفسية في العائلات العربية المقيمة في الخارج.',
    longDescriptionEn:
      'An afternoon of guided mindfulness practices, cultural connection, and shared stories. This gathering brings together Arab families living abroad to explore how mindfulness traditions from our heritage can support modern family life. Activities include guided meditation, journaling exercises, tea ceremony, and small-group sharing circles.',
    longDescriptionAr:
      'عصرية من ممارسات اليقظة الذهنية الموجّهة والتواصل الثقافي والقصص المشتركة. يجمع هذا اللقاء العائلات العربية المقيمة في الخارج لاستكشاف كيف يمكن لتقاليد اليقظة الذهنية من تراثنا أن تدعم الحياة الأسرية الحديثة.',
    type: 'community-gathering',
    audiences: ['families', 'community', 'adults'],
    date: '2026-05-17',
    startTime: '14:00',
    endTime: '17:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'in-person',
    locationNameEn: 'McNabb Community Centre, Ottawa',
    locationNameAr: 'مركز ماكناب المجتمعي، أوتاوا',
    locationAddress: '180 Percy St, Ottawa, ON K1R 6G2, Canada',
    isFree: true,
    capacity: 40,
    spotsRemaining: 28,
    registrationStatus: 'open',
    registrationUrl: 'initial-consultation',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'Comfortable clothing',
      'A journal or notebook',
      'A cultural item or recipe to share (optional)',
    ],
    whatToBringAr: [
      'ملابس مريحة',
      'دفتر أو مذكرة',
      'عنصر ثقافي أو وصفة للمشاركة (اختياري)',
    ],
    outcomesEn: [
      'Connect with other Arab families navigating life abroad',
      'Learn mindfulness techniques rooted in cultural context',
      'Share stories in a safe, judgment-free space',
      'Build a local support network that understands your experience',
    ],
    outcomesAr: [
      'تواصَلْ مع عائلاتٍ عربيّةٍ أخرى تعيشُ في الخارج',
      'تعلَّمْ تقنيّاتِ اليقظةِ الذّهنيّةِ المتجذّرةِ في السّياقِ الثّقافيّ',
      'شارِكْ قصصَك في مساحةٍ آمنةٍ خاليةٍ من الأحكام',
      'ابنِ شبكةَ دعمٍ محلّيّةً تفهمُ تجربتَك',
    ],
    audienceDescEn: 'Arab families living abroad — all generations welcome',
    audienceDescAr: 'العائلاتُ العربيّةُ المقيمةُ في الخارج — جميعُ الأجيالِ مرحَّبٌ بها',
    feeDisplayEn: 'Free — community gathering',
    feeDisplayAr: 'مجّانيّ — لقاءٌ مجتمعيّ',
    formatDescEn: '2-hour in-person gathering with tea, mindfulness, and sharing circles',
    formatDescAr: 'لقاءٌ حضوريٌّ مدّتُه ساعتان مع شاي ويقظةٍ ذهنيّةٍ وحلقاتِ مشاركة',
    tags: ['mindfulness', 'cultural', 'community', 'arab-families'],
  },

  {
    slug: 'empowering-parents-emotional-growth',
    titleEn: 'Empowering Parents for Emotional Growth',
    titleAr: 'تمكين الوالدين للنمو العاطفي',
    scenarioEn: 'Your child had a meltdown at the store — again. You tried everything. You\'re exhausted, and you\'re starting to wonder if you\'re doing this wrong.',
    scenarioAr: 'طفلُك انهارَ في المتجرِ — مرّةً أخرى. جرّبتَ كلَّ شيء. أنتَ مُنهَك، وبدأتَ تتساءلُ إن كنتَ تفعلُ هذا بشكلٍ خاطئ.',
    descriptionEn:
      'Participate in dynamic sessions designed to empower parents with strategies for nurturing emotional growth and health in children.',
    descriptionAr:
      'شاركوا في جلسات ديناميكية مصممة لتمكين الوالدين باستراتيجيات لتعزيز النمو العاطفي والصحة النفسية لدى الأطفال.',
    longDescriptionEn:
      'This multi-session workshop equips parents with evidence-based strategies to support their children\'s emotional development. Across four sessions, we cover emotional literacy, co-regulation techniques, handling big feelings, and building resilience. Each session includes practical exercises you can implement at home immediately.',
    longDescriptionAr:
      'تزوّد هذه الورشة متعددة الجلسات الوالدين باستراتيجيات مبنية على الأدلة لدعم التطور العاطفي لأطفالهم. عبر أربع جلسات، نغطي الوعي العاطفي، وتقنيات التنظيم المشترك، والتعامل مع المشاعر الكبيرة، وبناء المرونة.',
    type: 'workshop',
    audiences: ['families'],
    relatedServiceSlug: 'parent-coaching',
    date: '2026-06-07',
    startTime: '10:00',
    endTime: '12:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    sessions: [
      { date: '2026-06-07', startTime: '10:00', endTime: '12:00' },
      { date: '2026-06-14', startTime: '10:00', endTime: '12:00' },
      { date: '2026-06-21', startTime: '10:00', endTime: '12:00' },
      { date: '2026-06-28', startTime: '10:00', endTime: '12:00' },
    ],
    locationType: 'hybrid',
    locationNameEn: 'Google Meet + McNabb Community Centre',
    locationNameAr: 'Google Meet + مركز ماكناب المجتمعي',
    locationAddress: '180 Percy St, Ottawa, ON K1R 6G2, Canada',
    isFree: false,
    priceCAD: 120,
    earlyBirdPriceCAD: 89,
    earlyBirdDeadline: '2026-05-24',
    priceNoteEn: 'per parent (4 sessions)',
    priceNoteAr: 'لكل والد (4 جلسات)',
    capacity: 25,
    spotsRemaining: 25,
    registrationStatus: 'open',
    registrationUrl: 'events-empowering-parents',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    facilitator: {
      nameEn: 'Dr. Hala Ali',
      nameAr: 'د. هالة علي',
      titleEn: 'Certified Family Counselor',
      titleAr: 'مستشارة أسرية معتمدة',
    },
    whatToBringEn: [
      'Notebook and pen',
      'Examples of challenging moments with your child',
      'An open heart',
    ],
    whatToBringAr: [
      'دفتر وقلم',
      'أمثلة على لحظات صعبة مع طفلك',
      'قلب منفتح',
    ],
    outcomesEn: [
      'Respond to meltdowns with calm confidence instead of frustration',
      'Understand the brain science behind big emotions in children',
      'Build an emotional vocabulary with your child',
      'Create a "cool down" plan that actually works',
    ],
    outcomesAr: [
      'استجِبْ لنوباتِ الغضبِ بثقةٍ هادئةٍ بدلاً من الإحباط',
      'افهَمْ علمَ الدّماغِ وراءَ المشاعرِ الكبيرةِ لدى الأطفال',
      'ابنِ مفرداتٍ عاطفيّةً مع طفلِك',
      'أنشِئْ خطّةَ "تهدئة" تعملُ فعلاً',
    ],
    audienceDescEn: 'Parents of children aged 3–12 dealing with emotional challenges',
    audienceDescAr: 'أولياءُ أمورِ الأطفالِ من 3 إلى 12 عامًا الذين يواجهونَ تحدّياتٍ عاطفيّة',
    feeDisplayEn: '$149 CAD for the full 4-week program · Pay what you can',
    feeDisplayAr: '149 دولار كنديّ للبرنامجِ الكامل · ادفَعْ ما تستطيع',
    formatDescEn: '4-week program — 1 hour per week, live online with homework exercises',
    formatDescAr: 'برنامجٌ من 4 أسابيع — ساعةٌ أسبوعيًّا، حيّ عبرَ الإنترنت مع تمارينَ منزليّة',
    tags: ['parenting', 'emotional-growth', 'children'],
  },

  {
    slug: 'quiet-strength-anxiety-nature',
    titleEn: 'Quiet Strength: Anxiety Skills in Nature',
    titleAr: 'القوة الهادئة: مهارات التعامل مع القلق في الطبيعة',
    scenarioEn: 'The racing thoughts won\'t stop. Your chest feels tight. You\'ve tried apps and breathing videos — but nothing sticks when the anxiety hits.',
    scenarioAr: 'الأفكارُ المتسارعةُ لا تتوقّف. صدرُك يضيق. جرّبتَ التّطبيقاتِ وفيديوهاتِ التّنفّس — لكن لا شيءَ يَثبُتُ عندما يضربُ القلق.',
    descriptionEn:
      'Learn grounding and anxiety management techniques in a peaceful outdoor setting. Suitable for teens and adults.',
    descriptionAr:
      'تعلّموا تقنيات التأريض وإدارة القلق في بيئة خارجية هادئة. مناسب للمراهقين والبالغين.',
    longDescriptionEn:
      'Nature is one of the most powerful anxiety regulators we have. In this retreat-style session, participants will learn evidence-based grounding techniques, breathing exercises, and mindful walking practices — all in a beautiful outdoor setting. The session blends psychoeducation with experiential learning.',
    longDescriptionAr:
      'الطبيعة هي واحدة من أقوى منظمات القلق التي نملكها. في هذه الجلسة ذات الطابع التراجعي، سيتعلم المشاركون تقنيات التأريض المبنية على الأدلة، وتمارين التنفس، وممارسات المشي اليقظ — كل ذلك في بيئة خارجية جميلة.',
    type: 'retreat',
    audiences: ['youth', 'adults'],
    relatedServiceSlug: 'teen-counseling',
    date: '2026-07-12',
    startTime: '09:00',
    endTime: '14:00',
    timezone: 'America/Toronto',
    dateTBD: true,
    locationType: 'in-person',
    locationNameEn: 'Pink Lake Trail, Gatineau Park',
    locationNameAr: 'مسار البحيرة الوردية، حديقة غاتينو',
    locationAddress: 'Pink Lake Trail, Old Chelsea, QC J9B 1G1, Canada',
    isFree: false,
    priceCAD: 35,
    priceNoteEn: 'per person',
    priceNoteAr: 'للشخص الواحد',
    capacity: 15,
    spotsRemaining: 15,
    registrationStatus: 'open',
    registrationUrl: 'events-quiet-strength',
    registrationType: 'rsvp',
    registrationFields: { phone: true, notes: false },
    whatToBringEn: [
      'Comfortable outdoor clothing and shoes',
      'Water bottle',
      'Sunscreen',
      'A small blanket or mat for sitting',
    ],
    whatToBringAr: [
      'ملابس وأحذية مريحة للهواء الطلق',
      'زجاجة ماء',
      'واقي شمسي',
      'بطانية صغيرة أو حصيرة للجلوس',
    ],
    outcomesEn: [
      'Learn 5 grounding techniques you can use anywhere, anytime',
      'Understand why nature reduces anxiety at a neurological level',
      'Practice mindful walking and sensory awareness exercises',
      'Leave with a personal anxiety toolkit tailored to your needs',
    ],
    outcomesAr: [
      'تعلَّمْ 5 تقنيّاتٍ للتّأريضِ يمكنُك استخدامُها في أيّ مكانٍ وزمان',
      'افهَمْ لماذا تُقلّلُ الطّبيعةُ القلقَ على المستوى العصبيّ',
      'مارِسِ المشيَ اليقِظَ وتمارينَ الوعيِ الحسّيّ',
      'غادِرْ بمجموعةِ أدواتِ قلقٍ شخصيّةٍ مُصمَّمةٍ لاحتياجاتِك',
    ],
    audienceDescEn: 'Teens and adults experiencing anxiety — no prior experience needed',
    audienceDescAr: 'المراهقونَ والبالغونَ الذين يعانونَ من القلق — لا تجربةَ سابقةً مطلوبة',
    feeDisplayEn: '$99 CAD — includes materials and refreshments · Sliding scale available',
    feeDisplayAr: '99 دولار كنديّ — يشملُ الموادَّ والمرطّبات · مقياسٌ متدرّجٌ متاح',
    formatDescEn: 'Half-day outdoor retreat (5 hours) in a peaceful nature setting',
    formatDescAr: 'خلوةٌ في الهواءِ الطّلقِ لنصفِ يوم (5 ساعات) في بيئةٍ طبيعيّةٍ هادئة',
    tags: ['anxiety', 'nature', 'grounding', 'mindfulness'],
  },

  /* ── Past Event ─────────────────────────────────────────────── */
  {
    slug: 'building-resilience-arab-families',
    titleEn: 'Building Resilience in Arab Families Abroad',
    titleAr: 'بناء المرونة في العائلات العربية في الخارج',
    descriptionEn:
      'Join experts to discover effective approaches to building emotional resilience in children and families, tailored for Arab communities abroad.',
    descriptionAr:
      'انضموا إلى الخبراء لاكتشاف أساليب فعالة لبناء المرونة العاطفية لدى الأطفال والعائلات، مصممة خصيصاً للمجتمعات العربية في الخارج.',
    type: 'workshop',
    audiences: ['families', 'community'],
    date: '2026-01-27',
    startTime: '10:00',
    endTime: '15:00',
    timezone: 'America/Toronto',
    locationType: 'in-person',
    locationNameEn: 'Global Family Center, Ottawa',
    locationNameAr: 'مركز الأسرة العالمي، أوتاوا',
    locationAddress: 'Ottawa, ON, Canada',
    isFree: false,
    priceCAD: 25,
    registrationStatus: 'closed',
    registrationType: 'none',
    highlightEn: 'Over 30 families attended this powerful community workshop on cultural resilience.',
    highlightAr: 'حضر أكثر من 30 عائلة هذه الورشة المجتمعية القوية حول المرونة الثقافية.',
    tags: ['resilience', 'arab-families', 'community'],
  },
];

/* ── Helper Functions ─────────────────────────────────────────── */

const today = () => new Date().toISOString().split('T')[0];

export function getUpcomingEvents(): SmartEvent[] {
  const t = today();
  return events
    .filter((e) => e.date >= t)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getPastEvents(): SmartEvent[] {
  const t = today();
  return events
    .filter((e) => e.date < t)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedEvent(): SmartEvent | undefined {
  const upcoming = getUpcomingEvents();
  return upcoming.find((e) => e.featured) ?? upcoming[0];
}

export function getNextEvent(): SmartEvent | undefined {
  return getUpcomingEvents()[0];
}

export function getEventBySlug(slug: string): SmartEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function getEventsByType(type: EventType): SmartEvent[] {
  return getUpcomingEvents().filter((e) => e.type === type);
}

export function getAvailableEventTypes(): EventType[] {
  const upcoming = getUpcomingEvents();
  const types = new Set(upcoming.map((e) => e.type));
  return Array.from(types);
}

/* ── Formatting Helpers ───────────────────────────────────────── */

const eventTypeLabels: Record<EventType, { en: string; ar: string }> = {
  workshop: { en: 'Workshop', ar: 'ورشة عمل' },
  webinar: { en: 'Webinar', ar: 'ندوة عبر الإنترنت' },
  'community-gathering': { en: 'Community', ar: 'مجتمعي' },
  retreat: { en: 'Retreat', ar: 'خلوة' },
  'support-group': { en: 'Support Group', ar: 'مجموعة دعم' },
};

export function getEventTypeLabel(type: EventType, isRTL: boolean): string {
  return isRTL ? eventTypeLabels[type].ar : eventTypeLabels[type].en;
}

export function getFormattedDate(event: SmartEvent, locale: string): string {
  if (event.dateTBD) return locale === 'ar' ? 'سيتم تحديد الموعد' : 'Date TBD';
  const d = new Date(event.date + 'T12:00:00');
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(d);
}

export function getFormattedTime(event: SmartEvent, locale: string): string {
  if (event.dateTBD) return locale === 'ar' ? 'سيتم تحديد الوقت' : 'Time TBD';
  const start = new Date(`${event.date}T${event.startTime}:00`);
  const end = new Date(`${event.date}T${event.endTime}:00`);
  const fmt = (d: Date) =>
    new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }).format(d);
  return `${fmt(start)} – ${fmt(end)}`;
}

export function getFormattedPrice(event: SmartEvent, isRTL: boolean): string {
  if (event.isFree) return isRTL ? 'مجاني' : 'Free';

  const now = today();
  const useEarlyBird =
    event.earlyBirdPriceCAD != null &&
    event.earlyBirdDeadline != null &&
    now <= event.earlyBirdDeadline;

  const price = useEarlyBird ? event.earlyBirdPriceCAD! : event.priceCAD!;
  const formatted = isRTL
    ? `${new Intl.NumberFormat('ar-SA').format(price)} دولار كندي`
    : `CAD $${price}`;

  const note = isRTL ? event.priceNoteAr : event.priceNoteEn;
  return note ? `${formatted} / ${note}` : formatted;
}

export interface CapacityInfo {
  labelEn: string;
  labelAr: string;
  badgeVariant: 'success' | 'sand' | 'terracotta' | 'neutral';
  urgency: 'low' | 'medium' | 'high' | 'full';
}

export function getCapacityInfo(event: SmartEvent): CapacityInfo | null {
  if (event.capacity == null || event.spotsRemaining == null) return null;

  const ratio = event.spotsRemaining / event.capacity;
  const spots = event.spotsRemaining;

  if (event.registrationStatus === 'closed') {
    return {
      labelEn: 'Registration closed',
      labelAr: 'التسجيل مغلق',
      badgeVariant: 'neutral',
      urgency: 'full',
    };
  }
  if (event.registrationStatus === 'waitlist' || spots === 0) {
    return {
      labelEn: 'Waitlist',
      labelAr: 'قائمة الانتظار',
      badgeVariant: 'neutral',
      urgency: 'full',
    };
  }
  if (ratio <= 0.2) {
    return {
      labelEn: `${spots} spots left`,
      labelAr: `${new Intl.NumberFormat('ar-SA').format(spots)} أماكن متبقية`,
      badgeVariant: 'terracotta',
      urgency: 'high',
    };
  }
  if (ratio <= 0.5) {
    return {
      labelEn: 'Filling up',
      labelAr: 'يمتلئ بسرعة',
      badgeVariant: 'sand',
      urgency: 'medium',
    };
  }
  return {
    labelEn: `${spots} spots available`,
    labelAr: `${new Intl.NumberFormat('ar-SA').format(spots)} مكان متاح`,
    badgeVariant: 'success',
    urgency: 'low',
  };
}

export function getDateParts(event: SmartEvent, locale: string) {
  if (event.dateTBD) {
    return {
      day: locale === 'ar' ? '؟' : '?',
      month: locale === 'ar' ? 'قريباً' : 'TBD',
      year: '',
    };
  }
  const d = new Date(event.date + 'T12:00:00');
  const day = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', { day: 'numeric' }).format(d);
  const month = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', { month: 'short' }).format(d).toUpperCase();
  const year = new Intl.DateTimeFormat(locale === 'ar' ? 'ar-EG-u-ca-gregory' : 'en-US', { year: 'numeric' }).format(d);
  return { day, month, year };
}
