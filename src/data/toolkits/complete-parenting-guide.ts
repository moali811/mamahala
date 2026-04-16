import type { ToolkitMeta } from '@/types/toolkit';

/* ================================================================
   THE INTENTIONAL PARENT: A COMPLETE GUIDE — Premium Toolkit
   6 parts based on attachment theory, discipline science, emotional
   coaching, screen time research, resilience frameworks, and
   hands-on worksheets.

     Part 1: Attachment-Based Parenting    [FREE PREVIEW]
     Part 2: Discipline Without Damage     [LOCKED]
     Part 3: Emotional Coaching            [LOCKED]
     Part 4: Screen Time Strategies        [LOCKED]
     Part 5: Building Resilient Children   [LOCKED]
     Part 6: Worksheets & Reflection       [LOCKED]
   ================================================================ */

const toolkit: ToolkitMeta = {
  slug: 'complete-parenting-guide',
  titleEn: 'The Intentional Parent: A Complete Guide',
  titleAr: 'الوالِدُ الواعي: دَليلٌ شامِل',
  subtitleEn: 'Attachment · Discipline · Emotional Coaching · Screens · Resilience',
  subtitleAr: 'التَّعَلُّق · الاِنْضِباط · التَّدْريبُ العاطِفِيّ · الشّاشات · المُرونَة',
  descriptionEn:
    "Your children don't need you to be perfect. They need you to be present, connected, and willing to grow alongside them.\n\nThis guide is built on principles grounded in attachment research, cognitive-behavioral approaches, emotional intelligence science, and the practical wisdom that comes from sitting with hundreds of families as they navigate the hardest and most rewarding job in the world.\n\nYou won't agree with everything in here — and that's fine. Take what resonates. Adapt what needs adapting. The goal isn't to follow a script. The goal is to parent with awareness, warmth, and intention.",
  descriptionAr:
    'لا يَحْتاجُ أَطْفالُكَ أَنْ تَكونَ مِثالِيًّا. يَحْتاجونَ مِنْكَ أَنْ تَكونَ حاضِرًا، مُتَواصِلًا، ومُسْتَعِدًّا لِلنُّمُوِّ بِجانِبِهِم.\n\nهذا الدَّليلُ مَبْنِيٌّ عَلى مَبادِئَ مُرْتَكِزَةٍ عَلى أَبْحاثِ التَّعَلُّق، والمُقارَباتِ المَعْرِفِيَّةِ السُّلوكِيَّة، وعُلومِ الذَّكاءِ العاطِفِيّ، والحِكْمَةِ العَمَلِيَّةِ النّابِعَةِ مِنَ الجُلوسِ مَعَ مِئاتِ العائِلاتِ وَهُمْ يَتَنَقَّلونَ في أَصْعَبِ وأَكْثَرِ الوَظائِفِ مُكافَأَةً في العالَم.\n\nلَنْ تَتَّفِقَ مَعَ كُلِّ شَيْءٍ هُنا — وَهذا جَيِّد. خُذْ ما يَتَرَدَّدُ صَداهُ. كَيِّفْ ما يَحْتاجُ تَكْييفاً. الهَدَفُ لَيْسَ اِتِّباعَ نَصّ. الهَدَفُ هُوَ التَّرْبِيَةُ بِوَعْيٍ، ودِفْء، ونِيَّة.',
  author: 'Dr. Hala Ali',
  category: 'families',
  format: 'guide',
  color: '#7A3B5E',
  heroQuoteEn: "Your children don't need you to be perfect. They need you to be present.",
  heroQuoteAr: 'لا يَحْتاجُ أَطْفالُكَ أَنْ تَكونَ مِثالِيًّا. يَحْتاجونَ مِنْكَ أَنْ تَكونَ حاضِرًا.',
  isPremium: true,
  priceCAD: 7,
  freePreviewSectionId: 'attachment',

  howToUse: [
    {
      iconName: 'heart',
      labelEn: 'Read slowly, not linearly',
      labelAr: 'اِقْرَأْ بِبُطْء، لا بِتَسَلْسُل',
      descEn: 'Start wherever you are. If tantrums are your pain point today, jump to Discipline. Come back to Attachment later.',
      descAr: 'اِبْدَأْ مِنْ حَيْثُ أَنْتَ. إِذا كانَتْ نَوْباتُ الغَضَبِ هي نُقْطَةَ أَلَمِكَ اليَوْم، اِقْفِزْ إِلى الاِنْضِباط. عُدْ إِلى التَّعَلُّقِ لاحِقاً.',
    },
    {
      iconName: 'pen-line',
      labelEn: 'The worksheets are the magic',
      labelAr: 'الأَوْراقُ العَمَلِيَّةُ هي السِّحْر',
      descEn: "Reading alone changes nothing. The worksheets in Part 6 are where insight becomes action. Don't skip them.",
      descAr: 'القِراءَةُ وَحْدَها لا تُغَيِّرُ شَيْئاً. الأَوْراقُ العَمَلِيَّةُ في الجُزْءِ السّادِسِ هي حَيْثُ تُصْبِحُ الرُّؤْيَةُ عَمَلاً. لا تَتَجاوَزْها.',
    },
    {
      iconName: 'shield',
      labelEn: 'Repair matters more than perfection',
      labelAr: 'الإِصْلاحُ أَهَمُّ مِنَ الكَمال',
      descEn: "You will mess up. That's not the question. The question is: will you come back, own it, and repair?",
      descAr: 'سَتَرْتَكِبُ أَخْطاء. هذا لَيْسَ السُّؤال. السُّؤالُ هُوَ: هَلْ سَتَعودُ، وتَعْتَرِفُ، وتُصْلِحُ؟',
    },
    {
      iconName: 'compass',
      labelEn: 'Your values first, my advice second',
      labelAr: 'قِيَمُكَ أَوَّلاً، نَصيحَتي ثانِياً',
      descEn: "If something in this guide conflicts with a value that matters deeply to you, trust your value and adapt the advice.",
      descAr: 'إِذا كانَ شَيْءٌ في هذا الدَّليلِ يَتَعارَضُ مَعَ قيمَةٍ تَهُمُّكَ بِعُمْق، ثِقْ بِقيمَتِكَ وكَيِّفِ النَّصيحَة.',
    },
    {
      iconName: 'sparkles',
      labelEn: 'You are not doing this alone',
      labelAr: 'أَنْتَ لا تَفْعَلُ هذا وَحْدَكَ',
      descEn: "No parent figures this out in isolation. Every chapter here was shaped by other parents' struggles and breakthroughs.",
      descAr: 'لا يَكْتَشِفُ أَيُّ والِدٍ هذا بِمَعْزِل. كُلُّ فَصْلٍ هُنا شَكَّلَتْهُ نِضالاتُ وَفَتَحاتُ والِدينَ آخَرين.',
    },
  ],

  sections: [
    /* ================================================================
       PART 1: Attachment-Based Parenting — FREE PREVIEW
       ================================================================ */
    {
      id: 'attachment',
      titleEn: 'Part 1 · Attachment-Based Parenting',
      titleAr: 'الجُزْءُ الأَوَّل · التَّرْبِيَةُ القائِمَةُ عَلى التَّعَلُّق',
      subtitleEn: 'The foundation of every relationship your child will ever have',
      subtitleAr: 'أَساسُ كُلِّ عَلاقَةٍ سَيَعيشُها طِفْلُكَ يَوْماً',
      color: '#C4878A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's1-intro',
          textEn:
            "Attachment is the emotional bond between a child and their primary caregivers. It's not about how much you love your child — every parent reading this loves their child. It's about how your child experiences that love. Do they feel safe? Do they trust that when they're scared, sad, or overwhelmed, someone will be there?",
          textAr:
            'التَّعَلُّقُ هُوَ الرّابِطُ العاطِفِيُّ بَيْنَ الطِّفْلِ وَمُقَدِّمي الرِّعايَةِ الأَساسِيّين. لَيْسَ الأَمْرُ عَنْ مِقْدارِ حُبِّكَ لِطِفْلِكَ — كُلُّ والِدٍ يَقْرَأُ هذا يُحِبُّ طِفْلَه. الأَمْرُ عَنْ كَيْفَ يَخْتَبِرُ طِفْلُكَ ذلِكَ الحُبّ. هَلْ يَشْعُرُ بِالأَمان؟ هَلْ يَثِقُ أَنَّهُ حينَ يَخافُ، أَوْ يَحْزَن، أَوْ يُرْهَق، سَيَكونُ شَخْصٌ هُناك؟',
          tone: 'lead',
        },
        {
          kind: 'pullquote',
          id: 's1-pullquote',
          textEn: 'That felt sense of safety — that\'s attachment. And it shapes everything.',
          textAr: 'ذلِكَ الإِحْساسُ المَلْموسُ بِالأَمان — ذلِكَ هُوَ التَّعَلُّق. وهُوَ يُشَكِّلُ كُلَّ شَيْء.',
        },
        {
          kind: 'callout',
          id: 's1-why',
          variant: 'insight',
          textEn:
            'Children with secure attachment tend to have healthier relationships throughout life, manage stress and emotions more effectively, perform better academically (not because they\'re smarter, but because they can regulate themselves enough to learn), develop stronger empathy, and show greater resilience when life gets hard.',
          textAr:
            'الأَطْفالُ ذَوو التَّعَلُّقِ الآمِنِ يَميلونَ إِلى عَلاقاتٍ أَصَحَّ طَوالَ الحَياة، وإِدارَةِ التَّوَتُّرِ والمَشاعِرِ بِفَعّالِيَّةٍ أَكْبَر، وأَداءٍ أَكاديمِيٍّ أَفْضَل (لَيْسَ لِأَنَّهُمْ أَذْكى، بَلْ لِأَنَّهُمْ يَسْتَطيعونَ تَنْظيمَ أَنْفُسِهِم بِما يَكْفي لِلتَّعَلُّم)، وتَعاطُفٍ أَقْوى، ومُرونَةٍ أَكْبَرَ حينَ تَصْعُبُ الحَياة.',
        },

        /* ── The 4 Attachment Styles ── */
        {
          kind: 'heading',
          id: 's1-styles-heading',
          level: 2,
          textEn: 'The 4 Attachment Styles — Explained Simply',
          textAr: 'أَنْماطُ التَّعَلُّقِ الأَرْبَعَة — بِبَساطَة',
        },
        {
          kind: 'paragraph',
          id: 's1-styles-intro',
          textEn:
            'Attachment research has identified four main patterns. These aren\'t permanent labels — they\'re descriptions of relational patterns that can shift with awareness and effort.',
          textAr:
            'حَدَّدَتْ أَبْحاثُ التَّعَلُّقِ أَرْبَعَةَ أَنْماطٍ رَئيسِيَّة. هذِهِ لَيْسَتْ تَسْمِياتٍ دائِمَة — هي أَوْصافٌ لِأَنْماطٍ عَلائِقِيَّةٍ يُمْكِنُ أَنْ تَتَحَوَّلَ مَعَ الوَعْيِ والجُهْد.',
        },
        {
          kind: 'icon-grid',
          id: 's1-styles-grid',
          columns: 2,
          items: [
            {
              iconName: 'heart',
              labelEn: 'Secure',
              labelAr: 'الآمِن',
              descEn: '"When I need you, you\'re there. I can trust you." Formed through consistent, responsive care — not perfect, consistent.',
              descAr: '"حينَ أَحْتاجُكَ، أَنْتَ هُناك. يُمْكِنُني أَنْ أَثِقَ بِكَ." يَتَكَوَّنُ مِنْ رِعايَةٍ ثابِتَةٍ ومُسْتَجيبَة — لَيْسَ مِثالِيَّة، بَلْ ثابِتَة.',
            },
            {
              iconName: 'flame',
              labelEn: 'Anxious / Ambivalent',
              labelAr: 'القَلِق / المُتَأَرْجِح',
              descEn: '"Sometimes you\'re there, sometimes not. I need to cling." Formed through inconsistent caregiving — warm sometimes, distracted other times.',
              descAr: '"أَحْياناً أَنْتَ هُناك، أَحْياناً لا. أَحْتاجُ أَنْ أَتَشَبَّث." يَتَكَوَّنُ مِنْ رِعايَةٍ غَيْرِ ثابِتَة — دافِئَةٌ أَحْياناً، مُشَتَّتَةٌ أَحْياناً أُخْرى.',
            },
            {
              iconName: 'shield',
              labelEn: 'Avoidant',
              labelAr: 'المُتَجَنِّب',
              descEn: '"When I show my needs, you pull away. Safer not to need." Formed through caregivers uncomfortable with emotion, or encouraging independence too early.',
              descAr: '"حينَ أُظْهِرُ اِحْتِياجاتي، تَبْتَعِدُ. أَكْثَرُ أَماناً أَنْ لا أَحْتاج." يَتَكَوَّنُ مِنْ مُقَدِّمي رِعايَةٍ غَيْرِ مُرْتاحينَ لِلعاطِفَة، أَوْ يُشَجِّعونَ الاِسْتِقْلالَ باكِراً.',
            },
            {
              iconName: 'brain',
              labelEn: 'Disorganized',
              labelAr: 'المُضْطَرِب',
              descEn: '"The person who protects me also scares me. I don\'t know what to do." Often formed around frightening or unpredictable caregivers.',
              descAr: '"الشَّخْصُ الَّذي يَحْميني يُخيفُني أَيْضاً. لا أَعْرِفُ ماذا أَفْعَل." غالِباً يَتَكَوَّنُ حَوْلَ مُقَدِّمي رِعايَةٍ مُخيفينَ أَوْ لا يُمْكِنُ التَّنَبُّؤُ بِهِم.',
            },
          ],
        },
        {
          kind: 'callout',
          id: 's1-not-indictment',
          variant: 'dr-hala',
          textEn:
            "A note: if you recognize yourself or your child in the insecure patterns, this is not an indictment. Most adults carry some insecure attachment from their own childhoods. The fact that you're reading this — learning, reflecting, wanting to do differently — is itself a powerful step toward change.",
          textAr:
            'مُلاحَظَة: إِذا تَعَرَّفْتَ عَلى نَفْسِكَ أَوْ عَلى طِفْلِكَ في الأَنْماطِ غَيْرِ الآمِنَة، هذا لَيْسَ اِتِّهاماً. مُعْظَمُ البالِغينَ يَحْمِلونَ بَعْضَ التَّعَلُّقِ غَيْرِ الآمِنِ مِنْ طُفولَتِهِم. حَقيقَةُ أَنَّكَ تَقْرَأُ هذا — تَتَعَلَّمُ، تَتَأَمَّلُ، تُريدُ فِعْلَ شَيْءٍ مُخْتَلِف — هي في حَدِّ ذاتِها خُطْوَةٌ قَوِيَّةٌ نَحْوَ التَّغْيير.',
        },

        /* ── Strengthen by Age ── */
        {
          kind: 'heading',
          id: 's1-strengthen-heading',
          level: 2,
          textEn: 'How to Strengthen Attachment at Any Age',
          textAr: 'كَيْفَ تُقَوّي التَّعَلُّقَ في أَيِّ عُمْر',
        },
        {
          kind: 'paragraph',
          id: 's1-strengthen-intro',
          textEn:
            'Attachment isn\'t only formed in infancy. You can strengthen the bond with your child at any stage.',
          textAr:
            'التَّعَلُّقُ لا يَتَكَوَّنُ فَقَطْ في الطُّفولَةِ المُبَكِّرَة. يُمْكِنُكَ تَقْوِيَةُ الرّابِطِ مَعَ طِفْلِكَ في أَيِّ مَرْحَلَة.',
        },
        {
          kind: 'tabs',
          id: 's1-strengthen-tabs',
          tabs: [
            {
              labelEn: 'Infants 0–3',
              labelAr: 'الرُّضَّع ٠–٣',
              children: [
                {
                  kind: 'checklist',
                  id: 's1-infants',
                  titleEn: 'For babies & toddlers',
                  titleAr: 'لِلرُّضَّعِ والأَطْفالِ الصِّغار',
                  itemsEn: [
                    'Respond to crying promptly and warmly — you cannot spoil a baby',
                    'Make eye contact during feeding, changing, and play',
                    'Narrate your actions: "I\'m going to pick you up now. I can see you\'re upset."',
                    'Follow their lead during play — let them direct, you follow',
                    'Practice skin-to-skin contact and physical closeness',
                    'Be predictable: consistent routines create safety',
                  ],
                  itemsAr: [
                    'اِسْتَجِبْ لِلبُكاءِ بِسُرْعَةٍ ودِفْء — لا يُمْكِنُكَ تَدْليلُ الرَّضيع',
                    'تَواصَلْ بِالعُيونِ خِلالَ الإِطْعامِ والتَّغْييرِ واللَّعِب',
                    'اِسْرُدْ أَفْعالَكَ: "سَأَحْمِلُكَ الآن. أَرى أَنَّكَ مُنْزَعِج."',
                    'اِتْبَعْ قِيادَتَهُ خِلالَ اللَّعِب — دَعْهُ يَقودُ وأَنْتَ تَتْبَعُ',
                    'مارِسْ التَّلامُسَ الجِلْدِيَّ والقُرْبَ الجَسَدِيّ',
                    'كُنْ مُتَوَقَّعًا: الرّوتينُ الثّابِتُ يَخْلُقُ الأَمان',
                  ],
                },
              ],
            },
            {
              labelEn: 'Young 3–7',
              labelAr: 'الصِّغار ٣–٧',
              children: [
                {
                  kind: 'checklist',
                  id: 's1-young',
                  titleEn: 'For young children',
                  titleAr: 'لِلأَطْفالِ الصِّغار',
                  itemsEn: [
                    'Spend 15–20 minutes daily in child-led play (no teaching, no correcting)',
                    'Name their emotions: "It looks like you\'re feeling frustrated."',
                    'Validate before redirecting: "I understand you\'re angry. AND it\'s not okay to hit."',
                    'Be consistent with boundaries — children feel safer when limits are clear',
                    'Repair after conflict: "I\'m sorry I yelled. That wasn\'t okay. How are you feeling?"',
                  ],
                  itemsAr: [
                    'اِقْضِ ١٥–٢٠ دَقيقَةً يَوْمِيّاً في لَعِبٍ يَقودُهُ الطِّفْل (بِدونِ تَعْليمٍ أَوْ تَصْحيح)',
                    'سَمِّ مَشاعِرَهُم: "يَبْدو أَنَّكَ تَشْعُرُ بِالإِحْباط."',
                    'صادِقْ قَبْلَ التَّوْجيه: "أَفْهَمُ أَنَّكَ غاضِب. وفي الوَقْتِ نَفْسِهِ لا يُمْكِنُ الضَّرْب."',
                    'كُنْ ثابِتًا في الحُدود — يَشْعُرُ الأَطْفالُ بِأَمانٍ أَكْبَرَ حينَ تَكونُ الحُدودُ واضِحَة',
                    'أَصْلِحْ بَعْدَ الخِلاف: "آسِف لِأَنَّني صَرَخْت. لَمْ يَكُنْ ذلِكَ مَقْبولاً. كَيْفَ تَشْعُر؟"',
                  ],
                },
              ],
            },
            {
              labelEn: 'School 7–12',
              labelAr: 'المَدْرَسَة ٧–١٢',
              children: [
                {
                  kind: 'checklist',
                  id: 's1-school',
                  titleEn: 'For school-age children',
                  titleAr: 'لِأَطْفالِ المَدْرَسَة',
                  itemsEn: [
                    'Show up for what matters to them (the soccer game, the school play)',
                    'Ask open-ended questions: "What was the best part of your day?" not "How was school?"',
                    'Respect their growing need for privacy while staying connected',
                    'Create rituals: bedtime talks, weekend adventures, weekly one-on-one outings',
                    'Let them see you manage your own emotions well',
                  ],
                  itemsAr: [
                    'اُحْضُرْ لِما يَهُمُّهُم (مُباراةُ كُرَةِ القَدَم، المَسْرَحِيَّةُ المَدْرَسِيَّة)',
                    'اِسْأَلْ أَسْئِلَةً مَفْتوحَة: "ما كانَ أَفْضَلُ جُزْءٍ مِنْ يَوْمِكَ؟" لَيْسَ "كَيْفَ كانَتِ المَدْرَسَة؟"',
                    'اِحْتَرِمْ حاجَتَهُم المُتَنامِيَةَ لِلخُصوصِيَّة مَعَ البَقاءِ مُتَواصِلًا',
                    'اِخْلُقْ طُقوساً: أَحاديثُ قَبْلَ النَّوْم، مُغامَراتُ عُطْلَةِ نِهايَةِ الأُسْبوع، نُزْهاتٌ أُسْبوعِيَّة',
                    'دَعْهُم يَرَوْنَكَ تُديرُ عَواطِفَكَ جَيِّداً',
                  ],
                },
              ],
            },
            {
              labelEn: 'Teens 13–18',
              labelAr: 'المُراهَقَة ١٣–١٨',
              children: [
                {
                  kind: 'checklist',
                  id: 's1-teens',
                  titleEn: 'For teenagers',
                  titleAr: 'لِلمُراهِقين',
                  itemsEn: [
                    "Keep showing up, even when they push you away — they need you more than they'll admit",
                    'Listen more than you lecture — they can tell the difference',
                    'Respect their autonomy while holding firm on safety',
                    'Share your own struggles (age-appropriately) — it builds trust',
                    "Stay curious about their world: their music, their friends, their interests",
                    'Repair conversations matter even more: "I handled that badly. Can we talk about it?"',
                  ],
                  itemsAr: [
                    'اِسْتَمِرَّ في الحُضور، حَتّى حينَ يُبْعِدونَكَ — يَحْتاجونَكَ أَكْثَرَ مِمّا يَعْتَرِفون',
                    'اِسْتَمِعْ أَكْثَرَ مِمّا تُحاضِرُ — يَعْرِفونَ الفَرْق',
                    'اِحْتَرِمْ اِسْتِقْلالِيَّتَهُم مَعَ الحَزْمِ في قَضايا السَّلامَة',
                    'شارِكْ نِضالاتِكَ أَنْتَ (بِطَريقَةٍ مُناسِبَةٍ لِلعُمْر) — يَبْني ذلِكَ الثِّقَة',
                    'اِبْقَ فُضولِيًّا حَوْلَ عالَمِهِم: موسيقاهُم، أَصْدِقاؤُهُم، اِهْتِماماتُهُم',
                    'مُحادَثاتُ الإِصْلاحِ تَهُمُّ أَكْثَر: "تَعامَلْتُ مَعَ ذلِكَ بِشَكْلٍ سَيِّئ. هَلْ يُمْكِنُنا التَّحَدُّث؟"',
                  ],
                },
              ],
            },
          ],
        },

        /* ── The Power of Repair ── */
        {
          kind: 'heading',
          id: 's1-repair-heading',
          level: 2,
          textEn: 'The Power of Repair',
          textAr: 'قُوَّةُ الإِصْلاح',
        },
        {
          kind: 'pullquote',
          id: 's1-repair-quote',
          textEn:
            "It's not about getting it right every time. It's about what you do after you get it wrong.",
          textAr: 'لَيْسَ الأَمْرُ عَنْ فِعْلِ الأَمْرِ بِشَكْلٍ صَحيحٍ في كُلِّ مَرَّة. بَلْ عَمّا تَفْعَلُهُ بَعْدَ أَنْ تُخْطِئَ.',
        },
        {
          kind: 'info-card-pair',
          id: 's1-repair-cards',
          cards: [
            {
              titleEn: 'What repair looks like',
              titleAr: 'كَيْفَ يَبْدو الإِصْلاح',
              bodyEn: '• Coming back after you\'ve calmed down\n• Acknowledging your child\'s experience\n• Taking responsibility without excuses\n• Asking what they need right now',
              bodyAr: '• العَوْدَةُ بَعْدَ أَنْ تَهْدَأَ\n• الاِعْتِرافُ بِتَجْرِبَةِ طِفْلِكَ\n• تَحَمُّلُ المَسْؤولِيَّةِ بِلا أَعْذار\n• السُّؤالُ ماذا يَحْتاجونَ الآن',
              color: '#5A8B6F',
            },
            {
              titleEn: 'What repair teaches',
              titleAr: 'ماذا يُعَلِّمُ الإِصْلاح',
              bodyEn: 'That relationships can survive conflict. That people who love you will come back. That it\'s safe to be imperfect. That everyone is worth the effort of repair — including them.',
              bodyAr: 'أَنَّ العَلاقاتِ يُمْكِنُ أَنْ تَنْجوَ مِنَ الخِلاف. أَنَّ الأَشْخاصَ الَّذينَ يُحِبّونَكَ سَيَعودون. أَنَّهُ مِنَ الآمِنِ أَنْ تَكونَ غَيْرَ مِثالِيّ. أَنَّ الجَميعَ يَسْتَحِقُّ جُهْدَ الإِصْلاح — بِما في ذلِكَ هُم.',
              color: '#C4878A',
            },
          ],
        },
        {
          kind: 'reflection-prompt',
          id: 's1-repair-reflection',
          promptEn:
            'Think of a recent moment when you lost your temper, dismissed your child\'s feelings, or got it wrong. What repair would that moment deserve? Write the exact words you\'d say.',
          promptAr:
            'فَكِّرْ في لَحْظَةٍ قَريبَةٍ فَقَدْتَ فيها أَعْصابَكَ، أَوْ رَفَضْتَ مَشاعِرَ طِفْلِكَ، أَوْ أَخْطَأْتَ. ما الإِصْلاحُ الَّذي تَسْتَحِقُّهُ تِلْكَ اللَّحْظَة؟ اِكْتُبْ الكَلِماتِ بِالضَّبْطِ كَما تَقولُها.',
          minWords: 50,
        },
      ],
    },

    /* ================================================================
       PART 2: Discipline Without Damage — LOCKED
       ================================================================ */
    {
      id: 'discipline',
      titleEn: 'Part 2 · Discipline Without Damage',
      titleAr: 'الجُزْءُ الثّاني · الاِنْضِباطُ بِلا أَذى',
      subtitleEn: 'Why punishment backfires — and what to do instead',
      subtitleAr: 'لِماذا تَرْتَدُّ العُقوبَةُ سَلْبِيّاً — وماذا تَفْعَلُ بَدَلاً مِنْ ذلِك',
      color: '#D4836A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's2-intro',
          textEn:
            "Let's be clear: discipline is necessary. Children need boundaries, limits, and guidance. Without them, children feel anxious, not free. But discipline and punishment are not the same thing.",
          textAr:
            'لِنَكُنْ واضِحين: الاِنْضِباطُ ضَرورِيّ. يَحْتاجُ الأَطْفالُ إِلى حُدودٍ ومَعالِمَ وإِرْشاد. بِدونِها، يَشْعُرُ الأَطْفالُ بِالقَلَق، لا بِالحُرِّيَّة. لكِنَّ الاِنْضِباطَ والعُقوبَةَ لَيْسا الشَّيْءَ نَفْسَه.',
          tone: 'lead',
        },
        {
          kind: 'info-card-pair',
          id: 's2-vs',
          cards: [
            {
              titleEn: 'Punishment',
              titleAr: 'العُقوبَة',
              bodyEn: "Making a child pay for what they did. Relies on fear, pain, or shame. Might stop the behavior short-term but doesn't teach anything useful.",
              bodyAr: 'جَعْلُ الطِّفْلِ يَدْفَعُ ثَمَنَ ما فَعَلَه. تَعْتَمِدُ عَلى الخَوْفِ أَوِ الأَلَمِ أَوِ العار. قَدْ تُوقِفُ السُّلوكَ عَلى المَدى القَصيرِ لكِنَّها لا تُعَلِّمُ شَيْئاً مُفيداً.',
              color: '#C85A4A',
            },
            {
              titleEn: 'Discipline',
              titleAr: 'الاِنْضِباط',
              bodyEn: 'From the Latin "disciplina" — to teach. Helps the child understand what went wrong, develops their internal moral compass, and preserves the relationship.',
              bodyAr: 'مِنَ اللّاتينِيَّةِ "disciplina" — أَيْ يُعَلِّم. يُساعِدُ الطِّفْلَ عَلى فَهْمِ ما حَدَثَ بِشَكْلٍ خاطِئ، ويُطَوِّرُ بَوْصَلَتَهُ الأَخْلاقِيَّةَ الدّاخِلِيَّة، ويَحْفَظُ العَلاقَة.',
              color: '#5A8B6F',
            },
          ],
        },
        {
          kind: 'callout',
          id: 's2-punishment-backfires',
          variant: 'warning',
          textEn:
            'Why punishment backfires: it damages trust, teaches avoidance (not better choices), escalates over time, models the very behavior you\'re trying to stop, and ignores the root cause.',
          textAr:
            'لِماذا تَرْتَدُّ العُقوبَةُ سَلْبِيّاً: تُدَمِّرُ الثِّقَة، تُعَلِّمُ التَّجَنُّبَ (لا الاِخْتِياراتِ الأَفْضَل)، تَتَصاعَدُ مَعَ الوَقْت، تُحاكي السُّلوكَ الَّذي تُحاوِلُ إِيقافَهُ، وتَتَجاهَلُ السَّبَبَ الجَذْرِيّ.',
        },

        /* ── Natural vs Logical Consequences ── */
        {
          kind: 'heading',
          id: 's2-consequences-heading',
          level: 2,
          textEn: 'Natural vs. Logical Consequences',
          textAr: 'العَواقِبُ الطَّبيعِيَّةُ مُقابِلَ المَنْطِقِيَّة',
        },
        {
          kind: 'info-card-pair',
          id: 's2-consequences',
          cards: [
            {
              titleEn: 'Natural consequences',
              titleAr: 'العَواقِبُ الطَّبيعِيَّة',
              bodyEn: 'Happen on their own. You don\'t create them; you allow them (as long as the child is safe). Child refuses coat → feels cold. Your role: resist rescuing. Be empathetic, not punitive.',
              bodyAr: 'تَحْدُثُ بِنَفْسِها. لا تَخْلُقُها؛ تَسْمَحُ بِها (طالَما الطِّفْلُ آمِن). الطِّفْلُ يَرْفُضُ المِعْطَف ← يَشْعُرُ بِالبَرْد. دَوْرُكَ: قاوِمْ الإِنْقاذ. كُنْ مُتَعاطِفًا، لا عِقابِيًّا.',
              color: '#C8A97D',
            },
            {
              titleEn: 'Logical consequences',
              titleAr: 'العَواقِبُ المَنْطِقِيَّة',
              bodyEn: 'Created by the parent, but directly connected to the behavior. Child throws a toy → toy removed for a set time. Must pass the 4R test: Related, Respectful, Reasonable, Revealed in advance.',
              bodyAr: 'يَخْلُقُها الوالِد، لكِنَّها مُرْتَبِطَةٌ مُباشَرَةً بِالسُّلوك. الطِّفْلُ يَرْمي لُعْبَة ← تُنْزَعُ اللُّعْبَةُ لِفَتْرَةٍ مُحَدَّدَة. يَجِبُ أَنْ تَمُرَّ بِاِخْتِبارِ الأَرْبَعَةِ R: مُرْتَبِطَة، مُحْتَرِمَة، مَعْقولَة، مَكْشوفَةٌ مُسْبَقاً.',
              color: '#5A8B6F',
            },
          ],
        },
        {
          kind: 'checklist',
          id: 's2-4r-test',
          titleEn: 'The 4R test for a good logical consequence',
          titleAr: 'اِخْتِبارُ الأَرْبَعَةِ R لِعاقِبَةٍ مَنْطِقِيَّةٍ جَيِّدَة',
          itemsEn: [
            'Related · Is it connected to the behavior?',
            'Respectful · Does it avoid shaming?',
            'Reasonable · Is it proportional?',
            'Revealed in advance · Did the child know the boundary?',
          ],
          itemsAr: [
            'مُرْتَبِطَة · هَلْ هي مُرْتَبِطَةٌ بِالسُّلوك؟',
            'مُحْتَرِمَة · هَلْ تَتَجَنَّبُ العار؟',
            'مَعْقولَة · هَلْ هي مُتَناسِبَة؟',
            'مَكْشوفَةٌ مُسْبَقاً · هَلْ كانَ الطِّفْلُ يَعْرِفُ الحَدّ؟',
          ],
        },

        /* ── ABC Model ── */
        {
          kind: 'heading',
          id: 's2-abc-heading',
          level: 2,
          textEn: 'The ABC Model · Antecedent → Behavior → Consequence',
          textAr: 'نَموذَجُ ABC · المُقَدِّمَة ← السُّلوك ← العاقِبَة',
        },
        {
          kind: 'cycle-diagram',
          id: 's2-abc-diagram',
          titleEn: 'Behavior is communication. Look at the full picture.',
          titleAr: 'السُّلوكُ تَواصُل. اُنْظُرْ إِلى الصّورَةِ الكامِلَة.',
          steps: [
            {
              labelEn: 'A · Antecedent',
              labelAr: 'A · المُقَدِّمَة',
              descEn: 'What happened before? Hungry, tired, overstimulated, unclear expectations?',
              descAr: 'ماذا حَدَثَ قَبْلَ ذلِك؟ جائِع، مُتْعَب، مُثارٌ بِإِفْراط، تَوَقُّعاتٌ غَيْرُ واضِحَة؟',
              color: '#C8A97D',
            },
            {
              labelEn: 'B · Behavior',
              labelAr: 'B · السُّلوك',
              descEn: 'What exactly happened? Describe specifically, not judgmentally.',
              descAr: 'ماذا حَدَثَ بِالضَّبْط؟ صِفْهُ بِدِقَّة، لا بِحُكْم.',
              color: '#C4878A',
            },
            {
              labelEn: 'C · Consequence',
              labelAr: 'C · العاقِبَة',
              descEn: 'What happened after? Did the consequence teach, or just punish?',
              descAr: 'ماذا حَدَثَ بَعْدَها؟ هَلْ عَلَّمَتِ العاقِبَة، أَمْ عاقَبَتْ فَقَط؟',
              color: '#7A3B5E',
            },
          ],
        },

        /* ── Scripts ── */
        {
          kind: 'heading',
          id: 's2-scripts-heading',
          level: 2,
          textEn: 'Scripts for Common Situations',
          textAr: 'نُصوصٌ لِلمَواقِفِ الشّائِعَة',
        },
        {
          kind: 'tabs',
          id: 's2-scripts-tabs',
          tabs: [
            {
              labelEn: 'Tantrums (2–6)',
              labelAr: 'نَوْباتُ الغَضَب (٢–٦)',
              children: [
                {
                  kind: 'paragraph',
                  id: 's2-tantrum-intro',
                  textEn: "What's happening: the child is overwhelmed by emotion and doesn't have the brain development to manage it yet. This isn't manipulation — it's a nervous system overloaded.",
                  textAr: 'ما يَحْدُث: الطِّفْلُ مُغْرَقٌ بِالعاطِفَة ولَيْسَ لَدَيْهِ نُمُوُّ الدِّماغِ الكافي لِإِدارَتِها بَعْد. هذا لَيْسَ تَلاعُباً — بَلْ جِهازٌ عَصَبِيٌّ مُثْقَل.',
                },
                {
                  kind: 'checklist',
                  id: 's2-tantrum-say',
                  titleEn: 'What to say',
                  titleAr: 'ما تَقولُ',
                  itemsEn: [
                    '"I can see you\'re really upset. I\'m going to stay right here with you."',
                    '"It\'s okay to feel angry. It\'s not okay to throw things. I\'ll help you when you\'re ready."',
                    '"You wanted that toy and the answer was no. That\'s really frustrating."',
                  ],
                  itemsAr: [
                    '"أَرى أَنَّكَ مُنْزَعِجٌ حَقّاً. سَأَبْقى هُنا مَعَك."',
                    '"لا بَأْسَ أَنْ تَشْعُرَ بِالغَضَب. لَيْسَ مِنَ المَقْبولِ رَمْيُ الأَشْياء. سَأُساعِدُكَ حينَ تَكونُ مُسْتَعِدّاً."',
                    '"أَرَدْتَ تِلْكَ اللُّعْبَةَ وكانَتِ الإِجابَةُ لا. هذا مُحْبِطٌ حَقّاً."',
                  ],
                },
              ],
            },
            {
              labelEn: 'Lying (4–10)',
              labelAr: 'الكَذِب (٤–١٠)',
              children: [
                {
                  kind: 'paragraph',
                  id: 's2-lying-intro',
                  textEn: "What's happening: young children lie from imagination, wish-thinking, or fear of punishment. Older children lie to avoid consequences or fit in.",
                  textAr: 'ما يَحْدُث: الأَطْفالُ الصِّغارُ يَكْذِبونَ مِنَ الخَيال، التَّمَنّي، أَوِ الخَوْفِ مِنَ العِقاب. الأَطْفالُ الأَكْبَرُ يَكْذِبونَ لِتَجَنُّبِ العَواقِبِ أَوِ الاِنْدِماج.',
                },
                {
                  kind: 'checklist',
                  id: 's2-lying-say',
                  titleEn: 'What to say',
                  titleAr: 'ما تَقولُ',
                  itemsEn: [
                    '"I already know what happened. I\'m giving you a chance to tell me the truth."',
                    '"In this family, we can handle the truth. You won\'t get in trouble for being honest."',
                    '"Thank you for telling me the truth. I know that was hard."',
                  ],
                  itemsAr: [
                    '"أَنا أَعْرِفُ ما حَدَث. أُعْطيكَ فُرْصَةً لِتَقولَ الحَقيقَة."',
                    '"في هذِهِ العائِلَة، نَسْتَطيعُ التَّعامُلَ مَعَ الحَقيقَة. لَنْ تَقَعَ في مَشاكِلَ بِسَبَبِ صِدْقِك."',
                    '"شُكْراً لِأَنَّكَ أَخْبَرْتَني بِالحَقيقَة. أَعْرِفُ أَنَّ ذلِكَ كانَ صَعْباً."',
                  ],
                },
              ],
            },
            {
              labelEn: 'Sibling conflict',
              labelAr: 'خِلافُ الإِخْوَة',
              children: [
                {
                  kind: 'checklist',
                  id: 's2-sibling',
                  titleEn: 'Your approach',
                  titleAr: 'مُقارَبَتُكَ',
                  itemsEn: [
                    'Avoid taking sides or playing judge',
                    'Teach conflict resolution skills rather than solving it for them',
                    'Give each child individual attention',
                    'Don\'t compare siblings — ever',
                    'Say: "It sounds like you both want the same thing. How can we figure this out?"',
                  ],
                  itemsAr: [
                    'تَجَنَّبْ الاِنْحِيازَ أَوْ لَعِبَ دَوْرِ القاضي',
                    'عَلِّمْهُم مَهاراتِ حَلِّ الخِلافِ بَدَلاً مِنْ حَلِّهِ لَهُم',
                    'أَعْطِ كُلَّ طِفْلٍ اِهْتِماماً فَرْدِيّاً',
                    'لا تُقارِنْ بَيْنَ الإِخْوَة — أَبَداً',
                    'قُلْ: "يَبْدو أَنَّ كِلَيْكُما يُريدُ الشَّيْءَ نَفْسَه. كَيْفَ يُمْكِنُ أَنْ نَحُلَّ هذا؟"',
                  ],
                },
              ],
            },
            {
              labelEn: 'Defiance (6–16)',
              labelAr: 'التَّحَدّي (٦–١٦)',
              children: [
                {
                  kind: 'checklist',
                  id: 's2-defiance',
                  titleEn: 'What works',
                  titleAr: 'ما يَنْجَح',
                  itemsEn: [
                    'Pick your battles — not every act of defiance needs a confrontation',
                    'Offer choices within limits: "Would you like to do homework before or after dinner?"',
                    'Acknowledge their feelings without caving on the boundary',
                    'Say: "You can be angry about the rule. The rule still stands."',
                    'Check your own tone — are you inviting cooperation or demanding compliance?',
                  ],
                  itemsAr: [
                    'اِخْتَرْ مَعارِكَكَ — لَيْسَ كُلُّ فِعْلِ تَحَدٍّ يَحْتاجُ مُواجَهَة',
                    'قَدِّمْ اِخْتِياراتٍ ضِمْنَ الحُدود: "هَلْ تُريدُ عَمَلَ الواجِبِ قَبْلَ أَوْ بَعْدَ العَشاء؟"',
                    'اِعْتَرِفْ بِمَشاعِرِهِم دونَ التَّنازُلِ عَنِ الحَدّ',
                    'قُلْ: "يُمْكِنُكَ أَنْ تَكونَ غاضِباً مِنَ القاعِدَة. القاعِدَةُ ما زالَتْ قائِمَة."',
                    'اِفْحَصْ نَبْرَتَكَ — هَلْ تَدْعو إِلى التَّعاونِ أَمْ تَطْلُبُ الاِمْتِثال؟',
                  ],
                },
              ],
            },
          ],
        },
      ],
    },

    /* ================================================================
       PART 3: Emotional Coaching — LOCKED
       ================================================================ */
    {
      id: 'emotional-coaching',
      titleEn: 'Part 3 · Emotional Coaching',
      titleAr: 'الجُزْءُ الثّالِث · التَّدْريبُ العاطِفِيّ',
      subtitleEn: 'Teaching your child the language of feelings',
      subtitleAr: 'تَعْليمُ طِفْلِكَ لُغَةَ المَشاعِر',
      color: '#C8A97D',
      blocks: [
        {
          kind: 'paragraph',
          id: 's3-intro',
          textEn:
            "A child who can name their emotions, understand what triggers them, and express them appropriately has a superpower. They're better equipped for friendships, school, romantic relationships, and careers. And here's the encouraging part: emotional intelligence isn't something children are born with or without. It's something they learn — primarily from you.",
          textAr:
            'الطِّفْلُ الَّذي يُمْكِنُهُ تَسْمِيَةُ مَشاعِرِهِ، وفَهْمُ ما يُحَفِّزُها، والتَّعْبيرُ عَنْها بِشَكْلٍ مُناسِب، لَدَيْهِ قُوَّةٌ عَظيمَة. هُوَ أَكْثَرُ اِسْتِعْداداً لِلصَّداقاتِ والمَدْرَسَةِ والعَلاقاتِ العاطِفِيَّةِ والمَسيرَةِ المِهَنِيَّة. وإِلَيْكَ الجُزْءَ المُشَجِّع: الذَّكاءُ العاطِفِيُّ لَيْسَ شَيْئاً يَوْلَدُ بِهِ الأَطْفالُ أَوْ لا. إِنَّهُ شَيْءٌ يَتَعَلَّمونَه — بِشَكْلٍ أَساسِيٍّ مِنْكَ.',
          tone: 'lead',
        },

        /* ── 5-Step Emotion Coaching ── */
        {
          kind: 'heading',
          id: 's3-5step-heading',
          level: 2,
          textEn: 'The Emotion Coaching 5-Step Process',
          textAr: 'العَمَلِيَّةُ المُكَوَّنَةُ مِنْ خَمْسِ خُطُواتٍ لِلتَّدْريبِ العاطِفِيّ',
        },
        {
          kind: 'cycle-diagram',
          id: 's3-5step-diagram',
          titleEn: 'Five steps from noticing to teaching',
          titleAr: 'خَمْسُ خُطُواتٍ مِنَ المُلاحَظَةِ إِلى التَّعْليم',
          steps: [
            {
              labelEn: '1 · Notice',
              labelAr: '١ · اُلْحُظْ',
              descEn: 'Pay attention to subtle signals. Don\'t wait for a meltdown.',
              descAr: 'اِنْتَبِهْ لِلإِشاراتِ الخَفِيَّة. لا تَنْتَظِرِ الاِنْهِيار.',
              color: '#5A8B6F',
            },
            {
              labelEn: '2 · Opportunity',
              labelAr: '٢ · الفُرْصَة',
              descEn: 'See the upset as a teaching moment, not a problem to fix.',
              descAr: 'اُنْظُرْ إِلى الاِنْزِعاجِ كَلَحْظَةِ تَعْليم، لا كَمُشْكِلَةٍ لِلحَلّ.',
              color: '#C8A97D',
            },
            {
              labelEn: '3 · Validate',
              labelAr: '٣ · صادِقْ',
              descEn: '"I can see you\'re really sad about this." Validation is not agreement.',
              descAr: '"أَرى أَنَّكِ حَزينَةٌ حَقّاً بِسَبَبِ هذا." المُصادَقَةُ لَيْسَتْ مُوافَقَة.',
              color: '#C4878A',
            },
            {
              labelEn: '4 · Name it',
              labelAr: '٤ · سَمِّها',
              descEn: '"It sounds like you\'re feeling disappointed." Naming moves feelings from emotional brain to thinking brain.',
              descAr: '"يَبْدو أَنَّكَ تَشْعُرُ بِخَيْبَةِ الأَمَل." التَّسْمِيَةُ تَنْقُلُ المَشاعِرَ مِنْ دِماغِ العاطِفَةِ إِلى دِماغِ التَّفْكير.',
              color: '#D4836A',
            },
            {
              labelEn: '5 · Set limits & solve',
              labelAr: '٥ · ضَعْ حُدودًا وحُلولًا',
              descEn: '"It\'s okay to feel angry. It\'s not okay to hit. What else could you do?"',
              descAr: '"لا بَأْسَ بِالغَضَب. لَيْسَ مَقْبولاً الضَّرْب. ماذا يُمْكِنُكَ أَنْ تَفْعَلَ غَيْرَ ذلِك؟"',
              color: '#7A3B5E',
            },
          ],
        },

        /* ── Validating vs Permitting ── */
        {
          kind: 'heading',
          id: 's3-validate-heading',
          level: 2,
          textEn: 'Validating ≠ Permitting',
          textAr: 'المُصادَقَةُ ≠ الإِباحَة',
        },
        {
          kind: 'callout',
          id: 's3-validate-callout',
          variant: 'dr-hala',
          textEn:
            'The single most misunderstood concept in emotional coaching. Validating = acknowledging the feeling is real. Permitting = allowing the behavior. You can do the first without the second. In fact, you must. The formula: "I understand you feel [emotion]. AND [the boundary still holds]."',
          textAr:
            'المَفْهومُ الأَكْثَرُ سوءَ فَهْمٍ في التَّدْريبِ العاطِفِيّ. المُصادَقَةُ = الاِعْتِرافُ بِأَنَّ الشُّعورَ حَقيقِيّ. الإِباحَةُ = السَّماحُ بِالسُّلوك. يُمْكِنُكَ فِعْلُ الأَوَّلِ دونَ الثّاني. في الحَقيقَة، يَجِبُ ذلِك. الصيغَة: "أَفْهَمُ أَنَّكَ تَشْعُرُ بِـ[الشُّعور]. وفي الوَقْتِ نَفْسِهِ [الحَدُّ ما زالَ قائِماً]."',
        },
        {
          kind: 'info-card-pair',
          id: 's3-and-vs-but',
          cards: [
            {
              titleEn: 'The word "BUT" erases',
              titleAr: 'كَلِمَةُ "لكِنْ" تَمْحو',
              bodyEn: '"I understand you\'re upset BUT you need to stop crying." The child hears: my feelings don\'t count.',
              bodyAr: '"أَفْهَمُ أَنَّكِ مُنْزَعِجَةٌ لكِنْ عَلَيْكِ التَّوَقُّفُ عَنِ البُكاء." الطِّفْلُ يَسْمَع: مَشاعِري لا تُحْسَب.',
              color: '#C85A4A',
            },
            {
              titleEn: 'The word "AND" holds both',
              titleAr: 'كَلِمَةُ "وفي الوَقْتِ نَفْسِهِ" تَحْمِلُ كِلَيْهِما',
              bodyEn: '"I understand you\'re upset AND I can\'t let you hit your brother." Both truths live side by side.',
              bodyAr: '"أَفْهَمُ أَنَّكِ مُنْزَعِجَةٌ وفي الوَقْتِ نَفْسِهِ لا يُمْكِنُني السَّماحُ بِضَرْبِ أَخيكِ." كِلْتا الحَقيقَتَيْنِ تَعيشانِ جَنْباً إِلى جَنْب.',
              color: '#5A8B6F',
            },
          ],
        },

        /* ── Age-appropriate vocabulary ── */
        {
          kind: 'heading',
          id: 's3-vocab-heading',
          level: 2,
          textEn: 'Age-Appropriate Emotional Vocabulary',
          textAr: 'مُفْرَداتٌ عاطِفِيَّةٌ مُناسِبَةٌ لِلعُمْر',
        },
        {
          kind: 'fillable-table',
          id: 's3-vocab-table',
          titleEn: 'Words to teach at each age',
          titleAr: 'كَلِماتٌ لِتَعْليمِها في كُلِّ عُمْر',
          columns: [
            { headerEn: 'Age', headerAr: 'العُمْر' },
            { headerEn: 'Emotional vocabulary', headerAr: 'المُفْرَداتُ العاطِفِيَّة' },
            { headerEn: 'Practice activity', headerAr: 'نَشاطُ المُمارَسَة' },
          ],
          rows: 4,
        },
        {
          kind: 'reflection-prompt',
          id: 's3-vocab-reflection',
          promptEn: "Which emotion words does your child already know? Which ones would you like to teach next? Write out a plan for how you'll introduce them (books, games, real moments).",
          promptAr: 'أَيُّ كَلِماتٍ عاطِفِيَّةٍ يَعْرِفُها طِفْلُكَ بِالفِعْل؟ أَيُّها تُريدُ تَعْليمَها لَه بَعْدَ ذلِك؟ اُكْتُبْ خُطَّةً لِكَيْفِيَّةِ تَقْديمِها (كُتُب، أَلْعاب، لَحَظاتٌ حَقيقِيَّة).',
          minWords: 40,
        },
      ],
    },

    /* ================================================================
       PART 4: Screen Time Strategies — LOCKED
       ================================================================ */
    {
      id: 'screen-time',
      titleEn: 'Part 4 · Screen Time Strategies',
      titleAr: 'الجُزْءُ الرّابِع · اِسْتِراتيجِيّاتُ وَقْتِ الشّاشَة',
      subtitleEn: 'Evidence-based approaches that actually work',
      subtitleAr: 'مُقارَباتٌ مَبْنِيَّةٌ عَلى الأَدِلَّة تَنْجَحُ فِعْلاً',
      color: '#5A8B6F',
      blocks: [
        {
          kind: 'paragraph',
          id: 's4-intro',
          textEn:
            "Screens are not going away. Your child will grow up in a digital world. The question isn't whether they'll use technology — it's whether they'll use it wisely. The goal isn't elimination — it's intentional, guided use.",
          textAr:
            'الشّاشاتُ لَنْ تَخْتَفي. سَيَكْبُرُ طِفْلُكَ في عالَمٍ رَقْمِيّ. السُّؤالُ لَيْسَ ما إِذا كانَ سَيَسْتَخْدِمُ التِّكْنولوجْيا — بَلْ ما إِذا كانَ سَيَسْتَخْدِمُها بِحِكْمَة. الهَدَفُ لَيْسَ الإِقْصاء — بَلِ الاِسْتِخْدامُ المَقْصودُ والمُوَجَّه.',
          tone: 'lead',
        },
        {
          kind: 'icon-grid',
          id: 's4-guidelines',
          titleEn: 'Evidence-based guidelines by age',
          titleAr: 'إِرْشاداتٌ مَبْنِيَّةٌ عَلى الأَدِلَّةِ حَسَبَ العُمْر',
          columns: 2,
          items: [
            {
              iconName: 'shield',
              labelEn: 'Under 18 months',
              labelAr: 'تَحْتَ ١٨ شَهْراً',
              descEn: 'Avoid screens except for video calls with family. Babies learn from real-world interaction.',
              descAr: 'تَجَنَّبِ الشّاشاتِ إِلّا لِمُكالَماتِ الفيديو مَعَ العائِلَة. الرُّضَّعُ يَتَعَلَّمونَ مِنَ التَّفاعُلِ الحَقيقِيّ.',
            },
            {
              iconName: 'eye',
              labelEn: '18 months – 2 years',
              labelAr: '١٨ شَهْراً – سَنَتَيْن',
              descEn: 'If introducing screens, choose high-quality, slow-paced, educational content. Watch together and talk about it.',
              descAr: 'إِذا قَدَّمْتَ الشّاشات، اِخْتَرْ مُحْتَوىً عالِيَ الجَوْدَة، بَطيءَ الإِيقاع، تَعْليمِيّاً. شاهِدا مَعاً وتَحَدَّثا عَنْه.',
            },
            {
              iconName: 'clock',
              labelEn: '2–5 years',
              labelAr: '٢–٥ سَنَوات',
              descEn: 'Max 1 hour per day of high-quality programming. Co-view when possible. No screens in the hour before bedtime.',
              descAr: 'حَدٌّ أَقْصى ساعَةٌ واحِدَةٌ يَوْمِيّاً مِنَ البَرامِجِ عالِيَةِ الجَوْدَة. شاهِدا مَعاً حينَ يُمْكِن. لا شاشاتٍ في السّاعَةِ قَبْلَ النَّوْم.',
            },
            {
              iconName: 'target',
              labelEn: '6–12 years',
              labelAr: '٦–١٢ سَنَة',
              descEn: 'Consistent limits. Balance — screens shouldn\'t crowd out physical activity, homework, family time, or sleep.',
              descAr: 'حُدودٌ ثابِتَة. التَّوازُن — لا يَجِبُ أَنْ تُزاحِمَ الشّاشاتُ النَّشاطَ البَدَنِيّ، الواجِبات، وَقْتَ العائِلَة، أَوِ النَّوْم.',
            },
            {
              iconName: 'message-circle',
              labelEn: '13–18 years',
              labelAr: '١٣–١٨ سَنَة',
              descEn: 'Negotiate limits together — teens respond better to collaboration than control. Monitor social media and mood. No devices in bedrooms at night.',
              descAr: 'تَفاوَضا عَلى الحُدودِ مَعاً — يَسْتَجيبُ المُراهِقونَ لِلتَّعاوُنِ أَفْضَلَ مِنَ التَّحَكُّم. راقِبِ التَّواصُلَ الاِجْتِماعِيَّ والمِزاج. لا أَجْهِزَةَ في غُرَفِ النَّوْمِ لَيْلاً.',
            },
            {
              iconName: 'heart',
              labelEn: 'All ages',
              labelAr: 'كُلُّ الأَعْمار',
              descEn: 'Model what you\'re asking. If you\'re on your phone during dinner, the family media agreement means nothing.',
              descAr: 'كُنْ قُدْوَةً لِما تَطْلُبُ. إِذا كُنْتَ عَلى هاتِفِكَ خِلالَ العَشاء، فَاِتِّفاقُ إِعْلامِ العائِلَةِ لا يَعْني شَيْئاً.',
            },
          ],
        },

        /* ── Family Media Agreement ── */
        {
          kind: 'heading',
          id: 's4-agreement-heading',
          level: 2,
          textEn: 'The Family Media Agreement',
          textAr: 'اِتِّفاقُ إِعْلامِ العائِلَة',
        },
        {
          kind: 'paragraph',
          id: 's4-agreement-intro',
          textEn:
            'Complete this together as a family. Everyone signs — including parents.',
          textAr:
            'أَكْمِلوا هذا مَعاً كَعائِلَة. الجَميعُ يُوَقِّع — بِما في ذلِكَ الوالِدان.',
        },
        {
          kind: 'fillable-table',
          id: 's4-agreement-limits',
          titleEn: 'Daily screen time limits per family member',
          titleAr: 'حُدودُ وَقْتِ الشّاشَةِ اليَوْمِيَّةِ لِكُلِّ فَرْدٍ مِنَ العائِلَة',
          columns: [
            { headerEn: 'Family Member', headerAr: 'فَرْدُ العائِلَة' },
            { headerEn: 'Weekday limit', headerAr: 'حَدُّ يَوْمِ الدِّراسَة' },
            { headerEn: 'Weekend limit', headerAr: 'حَدُّ عُطْلَةِ الأُسْبوع' },
          ],
          rows: 5,
        },
        {
          kind: 'checklist',
          id: 's4-zones',
          titleEn: 'Screen-free zones & times we agree on',
          titleAr: 'مَناطِقُ وأَوْقاتُ خالِيَةٌ مِنَ الشّاشاتِ نَتَّفِقُ عَلَيْها',
          itemsEn: [
            'Dinner table',
            'Bedrooms',
            'During homework',
            'First 60 minutes after school',
            'Last 60 minutes before bed',
            'During family rituals (weekly walk, game night, etc.)',
          ],
          itemsAr: [
            'طاوِلَةُ العَشاء',
            'غُرَفُ النَّوْم',
            'خِلالَ الواجِباتِ المَدْرَسِيَّة',
            'أَوَّلُ ٦٠ دَقيقَةً بَعْدَ المَدْرَسَة',
            'آخِرُ ٦٠ دَقيقَةً قَبْلَ النَّوْم',
            'خِلالَ طُقوسِ العائِلَة (مَشْيٌ أُسْبوعِيّ، لَيْلَةُ أَلْعاب، إلخ.)',
          ],
        },
        {
          kind: 'reflection-prompt',
          id: 's4-replace',
          promptEn: 'What 3 activities will your family do instead of screens this week? Make them specific and realistic.',
          promptAr: 'ما ثَلاثَةُ أَنْشِطَةٍ سَتَقومُ بِها عائِلَتُكَ بَدَلاً مِنَ الشّاشاتِ هذا الأُسْبوع؟ اِجْعَلْها مُحَدَّدَةً وواقِعِيَّة.',
        },
      ],
    },

    /* ================================================================
       PART 5: Building Resilient Children — LOCKED
       ================================================================ */
    {
      id: 'resilience',
      titleEn: "Part 5 · Building Resilient Children",
      titleAr: 'الجُزْءُ الخامِس · بِناءُ أَطْفالٍ مُرِنين',
      subtitleEn: "The 7 C's of Resilience",
      subtitleAr: 'الـ C السَّبْعَة لِلمُرونَة',
      color: '#7A3B5E',
      blocks: [
        {
          kind: 'paragraph',
          id: 's5-intro',
          textEn:
            "Resilience isn't about toughness. It's not about teaching children to 'suck it up' or 'deal with it.' True resilience is the ability to bend without breaking, to recover from setbacks, and to grow through adversity — not despite the hard things, but because of how they learned to navigate them.",
          textAr:
            'المُرونَةُ لَيْسَتْ عَنِ الصَّلابَة. لَيْسَتْ عَنْ تَعْليمِ الأَطْفالِ "اِبْتَلِعِ الأَمْر" أَوْ "تَعامَلْ مَعَه." المُرونَةُ الحَقيقِيَّةُ هي القُدْرَةُ عَلى الاِنْحِناءِ دونَ كَسْر، والتَّعافي مِنَ النَّكَسات، والنُّمُوِّ مِنْ خِلالِ الشَّدائِد — لَيْسَ بِالرَّغْمِ مِنَ الأُمورِ الصَّعْبَة، بَلْ بِسَبَبِ كَيْفِيَّةِ تَعَلُّمِهِمِ التَّنَقُّلَ فيها.',
          tone: 'lead',
        },
        {
          kind: 'icon-grid',
          id: 's5-7cs',
          titleEn: "The 7 C's framework",
          titleAr: 'إِطارُ الـ C السَّبْعَة',
          columns: 2,
          items: [
            { iconName: 'target', labelEn: 'Competence', labelAr: 'الكَفاءَة', descEn: 'Effort over outcome. Let them do it themselves. Tolerate their discomfort.', descAr: 'الجُهْدُ فَوْقَ النَّتيجَة. دَعْهُم يَفْعَلونَها بِأَنْفُسِهِم. تَحَمَّلْ اِنْزِعاجَهُم.' },
            { iconName: 'sparkles', labelEn: 'Confidence', labelAr: 'الثِّقَة', descEn: 'Specific praise, not empty praise. Let them try and fail.', descAr: 'مَدْحٌ مُحَدَّد، لا مَدْحٌ فارِغ. دَعْهُم يُحاوِلونَ ويَفْشَلون.' },
            { iconName: 'heart', labelEn: 'Connection', labelAr: 'التَّواصُل', descEn: 'One-on-one time. Know their friends. Family rituals.', descAr: 'وَقْتٌ فَرْدِيّ. اِعْرِفْ أَصْدِقاءَهُم. طُقوسُ العائِلَة.' },
            { iconName: 'shield', labelEn: 'Character', labelAr: 'الشَّخْصِيَّة', descEn: 'Talk about values explicitly. Model integrity. Name courage when you see it.', descAr: 'تَحَدَّثْ عَنِ القِيَمِ صَراحَةً. كُنْ قُدْوَةً لِلنَّزاهَة. سَمِّ الشَّجاعَةَ حينَ تَراها.' },
            { iconName: 'sparkles', labelEn: 'Contribution', labelAr: 'المُساهَمَة', descEn: 'Meaningful family roles. Acts of service. Purpose talk.', descAr: 'أَدْوارٌ عائِلِيَّةٌ ذاتُ مَعْنى. أَعْمالُ خِدْمَة. حَديثٌ عَنِ الهَدَف.' },
            { iconName: 'flame', labelEn: 'Coping', labelAr: 'التَّكَيُّف', descEn: 'Teach specific strategies. Build a coping toolbox. Don\'t eliminate all stress.', descAr: 'عَلِّمْ اِسْتِراتيجِيّاتٍ مُحَدَّدَة. اِبْنِ صُنْدوقَ أَدَواتِ تَكَيُّف. لا تُلْغِ كُلَّ التَّوَتُّر.' },
            { iconName: 'compass', labelEn: 'Control', labelAr: 'التَّحَكُّم', descEn: 'Give choices. Link actions to outcomes. "What\'s one thing you CAN control?"', descAr: 'قَدِّمْ اِخْتِيارات. اِرْبُطِ الأَفْعالَ بِالنَّتائِج. "ما الشَّيْءُ الواحِدُ الَّذي يُمْكِنُكَ التَّحَكُّمُ فيه؟"' },
          ],
        },
        {
          kind: 'fillable-table',
          id: 's5-action-plan',
          titleEn: "Rate your child 1–5 on each C and choose ONE action for each",
          titleAr: 'قَيِّمْ طِفْلَكَ مِنْ ١ إِلى ٥ في كُلِّ C واخْتَرْ فِعْلاً واحِداً لِكُلِّ مِنْها',
          columns: [
            { headerEn: 'C', headerAr: 'C' },
            { headerEn: 'Current strength (1-5)', headerAr: 'القُوَّةُ الحالِيَّة (١-٥)' },
            { headerEn: 'One thing I\'ll do this month', headerAr: 'شَيْءٌ واحِدٌ سَأَفْعَلُهُ هذا الشَّهْر' },
          ],
          rows: 7,
        },
        {
          kind: 'reflection-prompt',
          id: 's5-coping-toolbox',
          promptEn: "Write down 5 healthy coping strategies you want your child to know they have access to. These become their coping toolbox.",
          promptAr: 'اُكْتُبْ ٥ اِسْتِراتيجِيّاتِ تَكَيُّفٍ صِحِّيَّة تُريدُ لِطِفْلِكَ أَنْ يَعْرِفَ أَنَّ لَدَيْهِ وُصولاً إِلَيْها. هذِهِ تُصْبِحُ صُنْدوقَ أَدَواتِ تَكَيُّفِه.',
          minWords: 40,
        },
      ],
    },

    /* ================================================================
       PART 6: Worksheets — LOCKED
       ================================================================ */
    {
      id: 'worksheets',
      titleEn: 'Part 6 · Worksheets & Reflection',
      titleAr: 'الجُزْءُ السّادِس · أَوْراقُ العَمَلِ والتَّأَمُّل',
      subtitleEn: 'Where insight becomes action',
      subtitleAr: 'حَيْثُ تُصْبِحُ الرُّؤْيَةُ عَمَلاً',
      color: '#C4878A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's6-intro',
          textEn:
            "Reading alone doesn't change parenting. These worksheets are where the insight of the previous five parts becomes actual practice. Fill them in honestly — nobody is grading you.",
          textAr:
            'القِراءَةُ وَحْدَها لا تُغَيِّرُ التَّرْبِيَة. أَوْراقُ العَمَلِ هذِهِ هي حَيْثُ تُصْبِحُ رُؤْيَةُ الأَجْزاءِ الخَمْسَةِ السّابِقَةِ مُمارَسَةً فِعْلِيَّة. اِمْلَأْها بِصِدْق — لا أَحَدَ يُقَيِّمُكَ.',
          tone: 'lead',
        },

        /* ── Worksheet 1: Parenting Values ── */
        {
          kind: 'heading',
          id: 's6-w1-heading',
          level: 2,
          textEn: 'Worksheet 1 · Parenting Values Reflection',
          textAr: 'وَرَقَةُ العَمَلِ ١ · تَأَمُّلُ قِيَمِ التَّرْبِيَة',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w1-kind',
          promptEn: 'The kind of parent I want to be, in 3–5 words:',
          promptAr: 'نَوْعُ الوالِدِ الَّذي أُريدُ أَنْ أَكونَه، في ٣–٥ كَلِمات:',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w1-values',
          promptEn: 'The top 5 values I want to pass on to my children:',
          promptAr: 'أَعْلى ٥ قِيَمٍ أُريدُ تَمْريرَها لِأَطْفالي:',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w1-raised',
          promptEn: 'What I want to KEEP from how I was raised:',
          promptAr: 'ما أُريدُ الاِحْتِفاظَ بِهِ مِنَ الطَّريقَةِ الَّتي رُبِّيتُ بِها:',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w1-differently',
          promptEn: 'What I want to do DIFFERENTLY:',
          promptAr: 'ما أُريدُ فِعْلَهُ بِشَكْلٍ مُخْتَلِف:',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w1-best',
          promptEn: 'When I\'m at my best as a parent, I am…',
          promptAr: 'حينَ أَكونُ في أَفْضَلِ حالاتي كَوالِدٍ، أَكونُ…',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w1-worst',
          promptEn: 'When I\'m at my worst, I am… (the trigger that brings this out is…)',
          promptAr: 'حينَ أَكونُ في أَسْوَأِ حالاتي، أَكونُ… (المُحَفِّزُ الَّذي يُخْرِجُ هذا هُوَ…)',
        },

        /* ── Worksheet 2: Weekly Connection Planner ── */
        {
          kind: 'heading',
          id: 's6-w2-heading',
          level: 2,
          textEn: 'Worksheet 2 · Weekly Connection Planner',
          textAr: 'وَرَقَةُ العَمَلِ ٢ · مُخَطِّطُ التَّواصُلِ الأُسْبوعِيّ',
        },
        {
          kind: 'paragraph',
          id: 's6-w2-intro',
          textEn: 'Use this weekly. Plan one intentional connection moment with each child.',
          textAr: 'اِسْتَخْدِمْهُ أُسْبوعِيّاً. خَطِّطْ لِلَحْظَةِ تَواصُلٍ مَقْصودَةٍ مَعَ كُلِّ طِفْل.',
        },
        {
          kind: 'fillable-table',
          id: 's6-w2-table',
          titleEn: 'This week\'s connection plan',
          titleAr: 'خُطَّةُ التَّواصُلِ لِهذا الأُسْبوع',
          columns: [
            { headerEn: "Child's name", headerAr: 'اِسْمُ الطِّفْل' },
            { headerEn: 'Connection activity', headerAr: 'نَشاطُ التَّواصُل' },
            { headerEn: 'When', headerAr: 'مَتى' },
            { headerEn: 'How it went', headerAr: 'كَيْفَ سارَتِ الأُمور' },
          ],
          rows: 4,
        },

        /* ── Worksheet 3: Discipline Decision Tree ── */
        {
          kind: 'heading',
          id: 's6-w3-heading',
          level: 2,
          textEn: 'Worksheet 3 · Discipline Decision Tree',
          textAr: 'وَرَقَةُ العَمَلِ ٣ · شَجَرَةُ قَرارِ الاِنْضِباط',
        },
        {
          kind: 'paragraph',
          id: 's6-w3-intro',
          textEn:
            "When your child's behavior is challenging, walk through each step before responding.",
          textAr:
            'حينَ يَكونُ سُلوكُ طِفْلِكَ صَعْباً، مُرَّ بِكُلِّ خُطْوَةٍ قَبْلَ الاِسْتِجابَة.',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w3-step1',
          promptEn: 'Step 1 · What happened? (Describe the behavior specifically.)',
          promptAr: 'الخُطْوَةُ ١ · ماذا حَدَث؟ (صِفِ السُّلوكَ بِدِقَّة.)',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w3-step2',
          promptEn: 'Step 2 · What came before? (Was the child tired, hungry, overwhelmed, provoked?)',
          promptAr: 'الخُطْوَةُ ٢ · ماذا جاءَ قَبْلَ ذلِك؟ (هَلْ كانَ الطِّفْلُ مُتْعَباً، جائِعاً، مُرْهَقاً، مُسْتَفَزّاً؟)',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w3-step3',
          promptEn: 'Step 3 · What is the child trying to communicate? (Attention, autonomy, unmet need, overwhelm?)',
          promptAr: 'الخُطْوَةُ ٣ · ماذا يُحاوِلُ الطِّفْلُ أَنْ يوصِل؟ (اِنْتِباه، اِسْتِقْلال، حاجَةٌ غَيْرُ مُلَبّاة، إِرْهاق؟)',
        },
        {
          kind: 'checklist',
          id: 's6-w3-step5',
          titleEn: 'Step 5 · What response will TEACH something?',
          titleAr: 'الخُطْوَةُ ٥ · أَيُّ اِسْتِجابَةٍ سَتُعَلِّمُ شَيْئاً؟',
          itemsEn: [
            'Natural consequence (let reality be the teacher)',
            'Logical consequence (related, respectful, reasonable)',
            'Emotional coaching (validate, name, set limits, problem-solve)',
            'Redirect (offer an alternative behavior)',
            'Take a break (both of you) and come back to it',
          ],
          itemsAr: [
            'عاقِبَةٌ طَبيعِيَّة (دَعِ الواقِعَ يَكونُ المُعَلِّم)',
            'عاقِبَةٌ مَنْطِقِيَّة (مُرْتَبِطَة، مُحْتَرِمَة، مَعْقولَة)',
            'تَدْريبٌ عاطِفِيّ (صادِقْ، سَمِّ، ضَعْ حُدودًا، حُلَّ)',
            'إِعادَةُ تَوْجيه (قَدِّمْ سُلوكاً بَديلاً)',
            'خُذا اِسْتِراحَة (كِلاكُما) وعودا إِلَيْها',
          ],
        },

        /* ── Worksheet 5: Resilience Plan ── */
        {
          kind: 'heading',
          id: 's6-w5-heading',
          level: 2,
          textEn: 'Worksheet 5 · Resilience Building Action Plan',
          textAr: 'وَرَقَةُ العَمَلِ ٥ · خُطَّةُ عَمَلِ بِناءِ المُرونَة',
        },
        {
          kind: 'paragraph',
          id: 's6-w5-intro',
          textEn: "For each of the 7 C's, identify where your child is strong and where they need support.",
          textAr: 'لِكُلِّ C مِنَ السَّبْعَة، حَدِّدْ أَيْنَ طِفْلُكَ قَوِيّ وأَيْنَ يَحْتاجُ الدَّعْم.',
        },
        {
          kind: 'reflection-prompt',
          id: 's6-w5-plan',
          promptEn: 'Your 30-day plan — one focused thing per week for the next 4 weeks:',
          promptAr: 'خُطَّتُكَ لِلثَّلاثينَ يَوْماً — شَيْءٌ واحِدٌ مُرَكَّزٌ كُلَّ أُسْبوعٍ لِلأَسابيعِ الأَرْبَعَةِ القادِمَة:',
          minWords: 60,
        },

        /* ── Final note ── */
        {
          kind: 'pullquote',
          id: 's6-final',
          textEn:
            "Parenting is the only job where you're expected to be an expert from day one with no training, no manual, and a tiny human who didn't read any of the same books you did. You will mess up. You will lose your patience. You will wonder if you're doing it all wrong. And then you'll repair. You'll try again. That's intentional parenting. And you're already doing it.",
          textAr:
            'التَّرْبِيَةُ هي الوَظيفَةُ الوَحيدَةُ الَّتي يُتَوَقَّعُ مِنْكَ فيها أَنْ تَكونَ خَبيرًا مِنَ اليَوْمِ الأَوَّلِ بِلا تَدْريب، بِلا دَليل، ومَعَ إِنْسانٍ صَغيرٍ لَمْ يَقْرَأْ أَيّاً مِنَ الكُتُبِ الَّتي قَرَأْتَها أَنْتَ. سَتَرْتَكِبُ أَخْطاء. سَتَفْقِدُ صَبْرَكَ. سَتَتَساءَلُ إِذا كُنْتَ تَفْعَلُ كُلَّ شَيْءٍ بِشَكْلٍ خاطِئ. ثُمَّ سَتُصْلِحُ. سَتُحاوِلُ مَرَّةً أُخْرى. هذِهِ هي التَّرْبِيَةُ الواعِيَة. وأَنْتَ تَفْعَلُها بِالفِعْل.',
        },
      ],
    },
  ],
};

export default toolkit;
