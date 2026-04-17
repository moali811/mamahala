import type { ToolkitMeta } from '@/types/toolkit';

/* ================================================================
   THE DIGITAL MIRROR — Premium Interactive Workbook
   What Your Screen Time Reveals About Your Inner World.

   Inspired by:
   • Dr. Julie Smith — translating clinical psychology into
     interactive "checks" and accessible neuroscience
   • Dr. Nicole LePera — childhood attachment patterns mapped to
     adult digital behavior ("Self-Healer" framework)
   • Creators 4 Mental Health — creator economy burnout,
     parasocial relationships, and performance anxiety

   Section 1: The Algorithm Knows You          [FREE PREVIEW]
   Section 2: The 5 Digital Archetypes         [LOCKED]
   Section 3: From Childhood to Digital Habits [LOCKED]
   Section 4: The Creator's Paradox            [LOCKED]
   Section 5: The 21-Day Digital Reset         [LOCKED]
   ================================================================ */

const toolkit: ToolkitMeta = {
  slug: 'digital-mirror-workbook',
  titleEn: 'The Digital Mirror',
  titleAr: 'المِرآةُ الرَّقمِيَّة',
  subtitleEn: 'What Your Screen Time Reveals About Your Inner World',
  subtitleAr: 'ماذا يَكشِفُ وَقتُ شاشَتِكَ عَن عالَمِكَ الدَّاخِلِيّ',
  descriptionEn:
    "You already know you spend too much time on your phone. You don't need another app to tell you that.\n\nWhat you might not know is why. Why you reach for your phone the moment you feel bored. Why certain people's posts make you feel hollow. Why you scroll when you're anxious, argue in comments when you're hurt, and curate a life online that doesn't match the one you're living.\n\nThis workbook won't ask you to do a digital detox. It will ask you something harder: to look honestly at the relationship between your screen time and your inner world — your attachment patterns, your unmet needs, your childhood wounds, your nervous system.\n\nThe algorithm didn't create your patterns. It just learned to exploit them.\n\nThis workbook will teach you to see what the algorithm sees — and choose differently.",
  descriptionAr:
    'أنتَ تَعلَمُ أنَّكَ تَقضي وَقتًا طَويلًا عَلى هاتِفِك. لا تَحتاجُ لِتَطبيقٍ آخَرَ لِيُخبِرَكَ بِذلِك.\n\nما قَد لا تَعلَمُهُ هُوَ لِماذا. لِماذا تَمتَدُّ يَدُكَ إلى هاتِفِكَ لَحظَةَ شُعورِكَ بالمَلَل. لِماذا مَنشوراتُ أشخاصٍ مُعَيَّنينَ تَجعَلُكَ تَشعُرُ بالفَراغ. لِماذا تَتَصَفَّحُ حينَ تَقلَق، وتُجادِلُ في التَّعليقاتِ حينَ تَتَأَلَّم، وتَصنَعُ حَياةً عَلى الإنتِرنِت لا تُشبِهُ الَّتي تَعيشُها.\n\nهذا الدَّفتَرُ لَن يَطلُبَ مِنكَ حِميَةً رَقمِيَّة. سَيَطلُبُ مِنكَ شَيئًا أصعَب: أن تَنظُرَ بِصِدقٍ إلى العَلاقَةِ بَينَ وَقتِ شاشَتِكَ وعالَمِكَ الدَّاخِلِيّ — أنماطُ تَعَلُّقِك، واحتِياجاتُكَ غَيرُ المُلَبَّاة، وجُروحُ طُفولَتِك، وجِهازُكَ العَصَبِيّ.\n\nالخَوارِزمِيَّةُ لَم تَخلُقْ أنماطَك. فَقَط تَعَلَّمَت أن تَستَغِلَّها.\n\nهذا الدَّفتَرُ سَيُعَلِّمُكَ أن تَرى ما تَراهُ الخَوارِزمِيَّة — وأن تَختارَ بِشَكلٍ مُختَلِف.',
  author: 'Dr. Hala Ali',
  category: 'adults',
  format: 'workbook',
  color: '#7A5B8A',
  heroQuoteEn: "The algorithm didn't create your patterns. It just learned to exploit them.",
  heroQuoteAr: 'الخَوارِزمِيَّةُ لَم تَخلُقْ أنماطَك. فَقَط تَعَلَّمَت أن تَستَغِلَّها.',
  isPremium: true,
  priceCAD: 7,
  freePreviewSectionId: 'algorithm-knows-you',

  howToUse: [
    {
      iconName: 'eye',
      labelEn: 'Observe before you judge',
      labelAr: 'لاحِظْ قَبلَ أن تَحكُم',
      descEn: "This is not about shame. It is about clarity. The exercises ask you to notice, not to fix. Understanding comes first.",
      descAr: 'هذا لَيسَ عَنِ الخَجَل. بَلْ عَنِ الوُضوح. التَّمارينُ تَطلُبُ مِنكَ أن تُلاحِظ، لا أن تُصلِح. الفَهمُ يَأتي أوَّلًا.',
    },
    {
      iconName: 'brain',
      labelEn: 'One section at a time',
      labelAr: 'قِسمٌ واحِدٌ في كُلِّ مَرَّة',
      descEn: "Do not rush. Each section is a psychological layer. Sit with what comes up before moving to the next.",
      descAr: 'لا تَتَعَجَّل. كُلُّ قِسمٍ طَبَقَةٌ نَفسِيَّة. اجلِسْ مَعَ ما يَظهَرُ قَبلَ الانتِقالِ لِلتّالي.',
    },
    {
      iconName: 'lock',
      labelEn: 'Total honesty, total privacy',
      labelAr: 'صِدقٌ مُطلَق، خُصوصِيَّةٌ مُطلَقَة',
      descEn: "What you write here is for you only. The exercises work because you are the only audience.",
      descAr: 'ما تَكتُبُهُ هُنا لَكَ فَقَط. التَّمارينُ تَنجَحُ لِأنَّكَ الجُمهورُ الوَحيد.',
    },
    {
      iconName: 'heart',
      labelEn: 'This is not a detox — it is a mirror',
      labelAr: 'هذِهِ لَيسَت حِميَة — بَلْ مِرآة',
      descEn: "We are not asking you to delete your apps. We are asking you to understand why you use them the way you do.",
      descAr: 'لا نَطلُبُ مِنكَ حَذفَ تَطبيقاتِك. نَطلُبُ مِنكَ فَهمَ لِماذا تَستَخدِمُها بالطَّريقَةِ الَّتي تَستَخدِمُها.',
    },
    {
      iconName: 'sparkles',
      labelEn: 'Take the quiz first',
      labelAr: 'أَجرِ الاختِبارَ أوَّلًا',
      descEn: 'Start with The Digital Self-Awareness Profile quiz — it will give you a baseline to compare your progress.',
      descAr: 'اِبدَأ بِاختِبارِ مِلَفِّ الوعيِ الرَّقمِيِّ الذَّاتِيّ — سَيُعطيكَ خَطَّ أساسٍ لِمُقارَنَةِ تَقَدُّمِك.',
    },
  ],

  sections: [
    /* ================================================================
       SECTION 1: The Algorithm Knows You — FREE PREVIEW
       ================================================================ */
    {
      id: 'algorithm-knows-you',
      titleEn: 'Part 1 · The Algorithm Knows You Better Than You Know Yourself',
      titleAr: 'الجُزءُ الأوَّل · الخَوارِزمِيَّةُ تَعرِفُكَ أفضَلَ مِمَّا تَعرِفُ نَفسَك',
      subtitleEn: 'How platforms exploit your psychology',
      subtitleAr: 'كَيفَ تَستَغِلُّ المِنَصَّاتُ عِلمَ نَفسِك',
      color: '#7A5B8A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's1-intro',
          textEn:
            "Every time you pick up your phone, you are entering a negotiation you didn't agree to. On one side: you, with your needs, your emotions, your unfinished business from the day. On the other side: teams of engineers, behavioral psychologists, and machine learning systems whose sole job is to keep you engaged for as long as possible. They are not evil. But their success is measured in your attention, and they have studied human psychology more carefully than most therapists. The first step to reclaiming your digital life is understanding exactly how it was taken from you.",
          textAr:
            'في كُلِّ مَرَّةٍ تَلتَقِطُ فيها هاتِفَك، أنتَ تَدخُلُ في مُفاوَضَةٍ لَم تُوافِقْ عَلَيها. عَلى جانِب: أنتَ، بِاحتِياجاتِكَ ومَشاعِرِكَ وأُمورِكَ غَيرِ المُنتَهِيَةِ مِنَ اليَوم. عَلى الجانِبِ الآخَر: فِرَقٌ مِنَ المُهَندِسينَ وعُلَماءِ النَّفسِ السُّلوكِيّينَ وأنظِمَةِ التَّعَلُّمِ الآلِيِّ هَدَفُها الوَحيدُ إبقاؤُكَ مُنخَرِطًا أطوَلَ وَقتٍ مُمكِن. لَيسوا أشرارًا. لكِنَّ نَجاحَهُم يُقاسُ بانتِباهِك، ولَقَد دَرَسوا عِلمَ النَّفسِ البَشَرِيِّ بِعِنايَةٍ أكبَرَ مِن مُعظَمِ المُعالِجين. الخُطوَةُ الأُولى لاستِعادَةِ حَياتِكَ الرَّقمِيَّةِ هِيَ فَهمُ كَيفَ سُلِبَت مِنكَ بالضَّبط.',
          tone: 'lead',
        },
        {
          kind: 'pullquote',
          id: 's1-pullquote',
          textEn: "The algorithm didn't create your patterns. It just learned to exploit them.",
          textAr: 'الخَوارِزمِيَّةُ لَم تَخلُقْ أنماطَك. فَقَط تَعَلَّمَت أن تَستَغِلَّها.',
        },

        /* ── The Attention Economy Cycle ── */
        {
          kind: 'cycle-diagram',
          id: 's1-attention-cycle',
          titleEn: 'The Attention Economy Cycle',
          titleAr: 'دَورَةُ اقتِصادِ الانتِباه',
          descriptionEn: 'This is the loop that keeps you scrolling. Understanding it is the first step to breaking it.',
          descriptionAr: 'هذِهِ هِيَ الحَلَقَةُ الَّتي تُبقيكَ تَتَصَفَّح. فَهمُها هُوَ الخُطوَةُ الأُولى لِكَسرِها.',
          steps: [
            {
              labelEn: 'Trigger',
              labelAr: 'المُحَفِّز',
              descEn: 'Boredom, loneliness, anxiety, or a notification pulls you to your phone',
              descAr: 'المَلَل أو الوَحدَة أو القَلَق أو إشعارٌ يَسحَبُكَ إلى هاتِفِك',
              color: '#C4878A',
            },
            {
              labelEn: 'Scroll',
              labelAr: 'التَّصَفُّح',
              descEn: 'The infinite feed delivers variable rewards — some interesting, some not',
              descAr: 'التَّغذِيَةُ اللّانِهائِيَّةُ تُقَدِّمُ مُكافَآتٍ مُتَغَيِّرَة — بَعضُها مُثير، بَعضُها لا',
              color: '#D4836A',
            },
            {
              labelEn: 'Dopamine Hit',
              labelAr: 'جُرعَةُ الدّوبامين',
              descEn: 'A like, a funny video, outrage content — your brain releases a small reward',
              descAr: 'إعجاب أو فيديو مُضحِك أو مُحتَوى مُثير — دِماغُكَ يُفرِزُ مُكافَأَةً صَغيرَة',
              color: '#C8A97D',
            },
            {
              labelEn: 'Tolerance',
              labelAr: 'التَّحَمُّل',
              descEn: 'The reward fades faster each time — you need more scrolling for the same effect',
              descAr: 'المُكافَأَةُ تَتَلاشى أسرَعَ في كُلِّ مَرَّة — تَحتاجُ تَصَفُّحًا أكثَرَ لِنَفسِ الأثَر',
              color: '#7A3B5E',
            },
            {
              labelEn: 'Emptiness',
              labelAr: 'الفَراغ',
              descEn: 'You put the phone down feeling worse — but the original trigger is still unaddressed',
              descAr: 'تَضَعُ الهاتِفَ وتَشعُرُ بالأسوَأ — لكِنَّ المُحَفِّزَ الأصلِيَّ لا يَزالُ دونَ مُعالَجَة',
              color: '#5A8B6F',
            },
          ],
        },

        /* ── 6 Psychological Exploits ── */
        {
          kind: 'heading',
          id: 's1-exploits-heading',
          level: 2,
          textEn: '6 Psychological Exploits Platforms Use on You',
          textAr: '٦ استِغلالاتٍ نَفسِيَّةٍ تَستَخدِمُها المِنَصَّاتُ عَلَيك',
        },
        {
          kind: 'icon-grid',
          id: 's1-exploits-grid',
          columns: 3,
          items: [
            {
              iconName: 'dice',
              labelEn: 'Variable Reward',
              labelAr: 'المُكافَأَةُ المُتَغَيِّرَة',
              descEn: 'Like a slot machine — the unpredictability of what comes next keeps you pulling the lever.',
              descAr: 'كَآلَةِ القِمار — عَدَمُ التَّوَقُّعِ لِما سَيَأتي يُبقيكَ تَسحَبُ الرّافِعَة.',
            },
            {
              iconName: 'users',
              labelEn: 'Social Comparison',
              labelAr: 'المُقارَنَةُ الاجتِماعِيَّة',
              descEn: 'Your brain compares automatically. The algorithm feeds you precisely the content that triggers it.',
              descAr: 'دِماغُكَ يُقارِنُ تِلقائِيًّا. الخَوارِزمِيَّةُ تُقَدِّمُ لَكَ بالضَّبطِ المُحتَوى الَّذي يُثيرُ ذلِك.',
            },
            {
              iconName: 'shield-alert',
              labelEn: 'Loss Aversion',
              labelAr: 'النُّفورُ مِنَ الخَسارَة',
              descEn: 'FOMO is engineered. "You might miss something" keeps you checking even when nothing is happening.',
              descAr: 'الخَوفُ مِنَ الفَوات مُهَندَس. "قَد تُفَوِّتُ شَيئًا" يُبقيكَ تَتَفَقَّدُ حَتَّى حينَ لا شَيءَ يَحدُث.',
            },
            {
              iconName: 'clock',
              labelEn: 'Sunk Cost',
              labelAr: 'التَّكلِفَةُ الغارِقَة',
              descEn: '"I\'ve already been scrolling for 20 minutes, I might as well keep going."',
              descAr: '"لَقَد تَصَفَّحتُ ٢٠ دَقيقَة، قَد أُكمِلُ أيضًا."',
            },
            {
              iconName: 'repeat',
              labelEn: 'Reciprocity',
              labelAr: 'المُعامَلَةُ بالمِثل',
              descEn: 'They liked your photo, now you feel obligated to engage with theirs. A social contract you never signed.',
              descAr: 'أعجَبوا بِصورَتِك، فَتَشعُرُ بالالتِزامِ بالتَّفاعُلِ مَعَ صُوَرِهِم. عَقدٌ اجتِماعِيٌّ لَم تُوَقِّعْهُ أبَدًا.',
            },
            {
              iconName: 'fingerprint',
              labelEn: 'Identity Reinforcement',
              labelAr: 'تَعزيزُ الهُوِيَّة',
              descEn: 'The algorithm builds a model of who you are and feeds it back to you, narrowing your world.',
              descAr: 'الخَوارِزمِيَّةُ تَبني نَموذَجًا لِمَن أنتَ وتُعيدُهُ إلَيك، مُضَيِّقَةً عالَمَك.',
            },
          ],
        },

        /* ── What the Platform Sees vs What's Inside ── */
        {
          kind: 'info-card-pair',
          id: 's1-platform-vs-you',
          cards: [
            {
              titleEn: 'What the Platform Sees',
              titleAr: 'ما تَراهُ المِنَصَّة',
              bodyEn: 'Engagement metrics: time on app, scroll depth, click-through rate, content dwell time, share frequency, return visits, notification response time.',
              bodyAr: 'مَقاييسُ التَّفاعُل: الوَقتُ عَلى التَّطبيق، عُمقُ التَّصَفُّح، مُعَدَّلُ النَّقر، وَقتُ البَقاءِ عَلى المُحتَوى، تَكرارُ المُشارَكَة، الزِّياراتُ المُتَكَرِّرَة، وَقتُ الاستِجابَةِ لِلإشعارات.',
              icon: 'monitor',
              color: '#C4878A',
            },
            {
              titleEn: "What's Actually Happening Inside You",
              titleAr: 'ما يَحدُثُ فِعلًا بِداخِلِك',
              bodyEn: "Loneliness disguised as connection-seeking. Anxiety managed through distraction. Self-worth tied to external validation. Boredom you haven't learned to tolerate. Grief you're avoiding. A nervous system that doesn't know how to rest.",
              bodyAr: 'وَحدَةٌ مُتَنَكِّرَةٌ في بَحثٍ عَنِ التَّواصُل. قَلَقٌ يُدارُ بالإلهاء. تَقديرُ ذاتٍ مُرتَبِطٌ بِتَأكيدٍ خارِجِيّ. مَلَلٌ لَم تَتَعَلَّمْ تَحَمُّلَه. حُزنٌ تَتَجَنَّبُه. جِهازٌ عَصَبِيٌّ لا يَعرِفُ كَيفَ يَرتاح.',
              icon: 'heart',
              color: '#5A8B6F',
            },
          ],
        },

        /* ── The 60-Second Self-Check ── */
        {
          kind: 'heading',
          id: 's1-selfcheck-heading',
          level: 2,
          textEn: 'The 60-Second Self-Check',
          textAr: 'الفَحصُ الذَّاتِيُّ في ٦٠ ثانِيَة',
        },
        {
          kind: 'paragraph',
          id: 's1-selfcheck-intro',
          textEn: 'Before going further, answer these honestly. No score, no judgment — just a mirror. Check every statement that is true for you right now.',
          textAr: 'قَبلَ المُتابَعَة، أجِبْ عَن هذِهِ بِصِدق. بِدونِ نَتيجَة، بِدونِ حُكم — فَقَط مِرآة. ضَعْ عَلامَةً عَلى كُلِّ عِبارَةٍ صَحيحَةٍ بالنِّسبَةِ لَكَ الآن.',
        },
        {
          kind: 'checklist',
          id: 's1-selfcheck',
          titleEn: 'How many of these are true for you?',
          titleAr: 'كَم مِن هذِهِ صَحيحَةٌ بالنِّسبَةِ لَك؟',
          itemsEn: [
            'I check my phone within 5 minutes of waking up — before I even get out of bed',
            'I have opened an app, closed it, and opened the same app again within 30 seconds',
            'I have felt a phantom vibration — my phone buzzing when it actually did not',
            'I have composed a caption or response in my head during a real-life conversation',
            'I have scrolled past my intended stop point because "just one more" turned into thirty minutes',
            'I know more about what an online stranger had for lunch than what my partner felt today',
            'I have felt genuine anxiety when my phone battery drops below 20%',
            'I have picked up my phone to check the time and put it down 15 minutes later, still not knowing the time',
          ],
          itemsAr: [
            'أتَفَقَّدُ هاتِفي خِلالَ ٥ دَقائِقَ مِنَ الاستيقاظ — قَبلَ أن أنهَضَ مِنَ السَّرير',
            'فَتَحتُ تَطبيقًا، أغلَقتُه، وفَتَحتُ نَفسَ التَّطبيقِ مَرَّةً أُخرى خِلالَ ٣٠ ثانِيَة',
            'شَعَرتُ بِاهتِزازٍ وَهمِيّ — هاتِفي يَهتَزُّ حينَ لَم يَكُنْ كَذلِكَ فِعلًا',
            'صِغتُ تَعليقًا أو رَدًّا في رَأسي أثناءَ مُحادَثَةٍ حَقيقِيَّةٍ وَجهًا لِوَجه',
            'تَجاوَزتُ نُقطَةَ تَوَقُّفي المَقصودَة لِأنَّ "واحِدَةً أُخرى فَقَط" تَحَوَّلَت إلى ثَلاثينَ دَقيقَة',
            'أعرِفُ عَن غَداءِ شَخصٍ غَريبٍ عَلى الإنتِرنِت أكثَرَ مِمَّا أعرِفُ عَمَّا شَعَرَ بِهِ شَريكي اليَوم',
            'شَعَرتُ بِقَلَقٍ حَقيقِيٍّ حينَ انخَفَضَت بَطَّارِيَّةُ هاتِفي عَن ٢٠٪',
            'التَقَطتُ هاتِفي لِأتَفَقَّدَ الوَقت ووَضَعتُهُ بَعدَ ١٥ دَقيقَةً ولا أزالُ لا أعرِفُ الوَقت',
          ],
        },
        {
          kind: 'callout',
          id: 's1-selfcheck-result',
          variant: 'insight',
          textEn: 'If you checked 3 or more, your phone is not a tool — it is a relationship. And like any relationship, it deserves to be examined. That is what the rest of this workbook is for.',
          textAr: 'إذا وَضَعتَ عَلامَةً عَلى ٣ أو أكثَر، فَهاتِفُكَ لَيسَ أداة — إنَّهُ عَلاقَة. ومِثلُ أيِّ عَلاقَة، يَستَحِقُّ أن يُفحَص. هذا ما بَقِيَّةُ هذا الدَّفتَرِ مِن أجلِه.',
        },

        /* ── Your Digital Persona vs Your Real Self ── */
        {
          kind: 'heading',
          id: 's1-persona-heading',
          level: 2,
          textEn: 'A Quick Experiment: Your Digital Persona vs Your Real Self',
          textAr: 'تَجرِبَةٌ سَريعَة: شَخصِيَّتُكَ الرَّقمِيَّة مُقابِلَ ذاتِكَ الحَقيقِيَّة',
        },
        {
          kind: 'comparison',
          id: 's1-persona-vs-real',
          titleEn: 'Two Versions of You',
          titleAr: 'نُسخَتانِ مِنك',
          left: {
            labelEn: 'What Your Feed Says About You',
            labelAr: 'ما تَقولُهُ تَغذِيَتُكَ عَنك',
            pointsEn: [
              'You are always doing interesting things',
              'Your relationships are effortless and warm',
              'You have strong opinions and clear values',
              'You are thriving in your career',
              'You are well-read, well-traveled, well-connected',
            ],
            pointsAr: [
              'أنتَ دائِمًا تَفعَلُ أشياءَ مُثيرَة',
              'عَلاقاتُكَ سَلِسَةٌ ودافِئَة',
              'لَدَيكَ آراءٌ قَوِيَّةٌ وقِيَمٌ واضِحَة',
              'أنتَ مُزدَهِرٌ في مَسيرَتِك',
              'أنتَ مُثَقَّف ومُسافِر ومُتَّصِل',
            ],
          },
          right: {
            labelEn: 'What Is Actually True Right Now',
            labelAr: 'ما هُوَ صَحيحٌ فِعلًا الآن',
            pointsEn: [
              'You spent last Sunday on the couch doom-scrolling for 3 hours',
              'You had an argument with your partner that you have not resolved',
              'You are not sure what you believe about most things anymore',
              'You are exhausted and quietly questioning everything',
              'You feel alone in a room full of "connections"',
            ],
            pointsAr: [
              'قَضَيتَ الأحَدَ الماضي عَلى الأريكَةِ تَتَصَفَّحُ الكَوارِثَ لِمُدَّةِ ٣ ساعات',
              'تَشاجَرتَ مَعَ شَريكِكَ ولَم تَحُلَّ الأمرَ بَعد',
              'لَستَ مُتَأَكِّدًا مِمَّا تُؤمِنُ بِهِ بَعدَ الآن في مُعظَمِ الأشياء',
              'أنتَ مُنهَكٌ وتُساءِلُ كُلَّ شَيءٍ بِهُدوء',
              'تَشعُرُ بالوَحدَةِ في غُرفَةٍ مَليئَةٍ بـ"الاتِّصالات"',
            ],
          },
        },
        {
          kind: 'paragraph',
          id: 's1-gap-insight',
          textEn: 'The gap between these two columns is not hypocrisy. It is the cost of performing your life instead of living it. And the wider that gap gets, the lonelier you feel — because the version of you that receives love and approval online is not the real you. In Part 3 of this workbook, we will trace exactly where that gap began.',
          textAr: 'الفَجوَةُ بَينَ هذَينِ العَمودَينِ لَيسَت نِفاقًا. إنَّها ثَمَنُ أداءِ حَياتِكَ بَدَلاً مِن عَيشِها. وكُلَّما اتَّسَعَت تِلكَ الفَجوَة، كُلَّما شَعَرتَ بِمَزيدٍ مِنَ الوَحدَة — لِأنَّ النُّسخَةَ مِنكَ الَّتي تَتَلَقَّى الحُبَّ والقَبولَ عَلى الإنتِرنِت لَيسَت أنتَ الحَقيقِيّ. في الجُزءِ الثَّالِثِ مِن هذا الدَّفتَر، سَنَتَتَبَّعُ بالضَّبطِ أينَ بَدَأَت تِلكَ الفَجوَة.',
        },

        /* ── Reflection + Screen Time Audit ── */
        {
          kind: 'heading',
          id: 's1-reflection-heading',
          level: 2,
          textEn: 'The First Honest Question',
          textAr: 'السُّؤالُ الصَّادِقُ الأوَّل',
        },
        {
          kind: 'reflection-prompt',
          id: 's1-before-phone',
          promptEn: "Close your eyes for ten seconds. Then answer honestly: What emotion do you feel RIGHT BEFORE you pick up your phone? Not during, not after — before. Name it. Is it boredom? Anxiety? Loneliness? Restlessness? The need to check if you're missing something? Write whatever comes up. There is no wrong answer — only an honest one.",
          promptAr: 'أغلِقْ عَينَيكَ لِعَشرِ ثَوانٍ. ثُمَّ أجِبْ بِصِدق: ما العاطِفَةُ الَّتي تَشعُرُ بِها قَبلَ أن تَلتَقِطَ هاتِفَك مُباشَرَةً؟ لَيسَ أثناء، وَلَيسَ بَعد — قَبل. سَمِّها. هَل هِيَ مَلَل؟ قَلَق؟ وَحدَة؟ عَدَمُ ارتِياح؟ الحاجَةُ لِلتَّحَقُّقِ مِمَّا إذا كُنتَ تُفَوِّتُ شَيئًا؟ اكتُبْ كُلَّ ما يَظهَر. لا إجابَةَ خاطِئَة — فَقَط إجابَةٌ صادِقَة.',
          minWords: 30,
        },
        {
          kind: 'heading',
          id: 's1-audit-heading',
          level: 2,
          textEn: 'Your Screen Time Audit',
          textAr: 'مُراجَعَةُ وَقتِ شاشَتِك',
        },
        {
          kind: 'paragraph',
          id: 's1-audit-intro',
          textEn: 'For the next three days, track every time you pick up your phone. Not to shame yourself — to see what your phone is actually for in your life. Most people discover that less than 20% of their screen time is intentional.',
          textAr: 'خِلالَ الأيَّامِ الثَّلاثَةِ القادِمَة، تَتَبَّعْ كُلَّ مَرَّةٍ تَلتَقِطُ فيها هاتِفَك. لَيسَ لِتَخجَلَ مِن نَفسِك — لِتَرى ما هُوَ دَورُ هاتِفِكَ فِعلاً في حَياتِك. مُعظَمُ النَّاسِ يَكتَشِفونَ أنَّ أقَلَّ مِن ٢٠٪ مِن وَقتِ شاشَتِهِم مَقصود.',
        },
        {
          kind: 'fillable-table',
          id: 's1-audit-table',
          titleEn: 'Screen Time Audit Log',
          titleAr: 'سِجِلُّ مُراجَعَةِ وَقتِ الشَّاشَة',
          columns: [
            { headerEn: 'Time of Day', headerAr: 'وَقتُ اليَوم', width: '15%' },
            { headerEn: 'App', headerAr: 'التَّطبيق', width: '15%' },
            { headerEn: 'Feeling Before', headerAr: 'الشُّعورُ قَبل', width: '20%' },
            { headerEn: 'Feeling After', headerAr: 'الشُّعورُ بَعد', width: '20%' },
            { headerEn: 'Duration', headerAr: 'المُدَّة', width: '10%' },
            { headerEn: 'Intentional?', headerAr: 'مَقصود؟', width: '10%' },
          ],
          rows: 8,
        },

        /* ── What Comes Next (teaser for locked sections) ── */
        {
          kind: 'callout',
          id: 's1-teaser',
          variant: 'insight',
          textEn: 'You have just seen how the algorithm works on you. But here is the deeper question this workbook will answer: Why does it work so well on YOU specifically? In Part 2, you will discover which of the 5 Digital Archetypes you are. In Part 3, you will trace how your childhood attachment patterns became the algorithm\'s cheat code. In Part 4, you will understand the creator\'s paradox — why the more you share, the emptier you feel. And in Part 5, you will spend 21 days rebuilding your relationship with technology from the inside out. This free preview showed you the problem. The rest of the workbook gives you the tools.',
          textAr: 'لَقَد رَأَيتَ لِلتَّوّ كَيفَ تَعمَلُ الخَوارِزمِيَّةُ عَلَيك. لكِنْ هُنا السُّؤالُ الأعمَقُ الَّذي سَيُجيبُ عَنهُ هذا الدَّفتَر: لِماذا تَعمَلُ بِهذِهِ الفَعَّالِيَّةِ عَلَيكَ أنتَ بالذَّات؟ في الجُزءِ الثَّاني، ستَكتَشِفُ أيَّ الأنماطِ الرَّقمِيَّةِ الخَمسَةِ أنت. في الجُزءِ الثَّالِث، ستَتَتَبَّعُ كَيفَ أصبَحَت أنماطُ تَعَلُّقِ طُفولَتِكَ الشِّفرَةَ السِّرِّيَّةَ لِلخَوارِزمِيَّة. في الجُزءِ الرَّابِع، ستَفهَمُ مُفارَقَةَ المُبدِع — لِماذا كُلَّما شارَكتَ أكثَر، شَعَرتَ بالفَراغِ أكثَر. وفي الجُزءِ الخامِس، ستَقضي ٢١ يَومًا تُعيدُ بِناءَ عَلاقَتِكَ بالتِّكنولوجيا مِنَ الدَّاخِل. هذِهِ المُعايَنَةُ المَجَّانِيَّةُ أظهَرَت لَكَ المُشكِلَة. بَقِيَّةُ الدَّفتَرِ تُعطيكَ الأدَوات.',
        },
      ],
    },

    /* ================================================================
       SECTION 2: The 5 Digital Archetypes — LOCKED
       ================================================================ */
    {
      id: 'digital-archetypes',
      titleEn: 'Part 2 · The 5 Digital Archetypes',
      titleAr: 'الجُزءُ الثّاني · الأنماطُ الرَّقمِيَّةُ الخَمسَة',
      subtitleEn: 'Which one are you?',
      subtitleAr: 'أيُّها أنت؟',
      color: '#C4878A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's2-intro',
          textEn:
            "You don't use social media randomly. You use it in patterns — and those patterns reveal something about what you need, what you fear, and what you're avoiding. These five archetypes are not boxes. Most people recognize themselves in two or three. The point is not to label yourself, but to notice: when does each pattern show up, and what is it trying to protect you from?",
          textAr:
            'أنتَ لا تَستَخدِمُ وَسائِلَ التَّواصُلِ الاجتِماعِيِّ عَشوائِيًّا. تَستَخدِمُها في أنماط — وهذِهِ الأنماطُ تَكشِفُ شَيئًا عَمَّا تَحتاج، وما تَخاف، وما تَتَجَنَّب. هذِهِ الأنماطُ الخَمسَةُ لَيسَت صَناديق. مُعظَمُ النَّاسِ يَتَعَرَّفونَ عَلى أنفُسِهِم في نَمَطَينِ أو ثَلاثَة. المَقصودُ لَيسَ أن تُصَنِّفَ نَفسَك، بَلْ أن تُلاحِظ: مَتى يَظهَرُ كُلُّ نَمَط، ومِمَّ يُحاوِلُ حِمايَتَك؟',
          tone: 'lead',
        },
        {
          kind: 'tabs',
          id: 's2-archetypes-tabs',
          tabs: [
            {
              labelEn: 'The Performer',
              labelAr: 'المُؤَدِّي',
              children: [
                {
                  kind: 'paragraph',
                  id: 's2-performer-desc',
                  textEn: 'You curate your life for an audience. Every experience is filtered through the lens of "how will this look online?" Your self-worth is entangled with engagement metrics — likes, comments, shares. You rehearse captions in your head before the moment even happens. The performance is exhausting, but stopping it feels like disappearing.',
                  textAr: 'تَصنَعُ حَياتَكَ لِجُمهور. كُلُّ تَجرِبَةٍ تُصَفّى عَبرَ عَدَسَةِ "كَيفَ سَيَبدو هذا عَلى الإنتِرنِت؟" تَقديرُكَ لِذاتِكَ مُتَشابِكٌ مَعَ مَقاييسِ التَّفاعُل — إعجابات، تَعليقات، مُشارَكات. تَتَمَرَّنُ عَلى التَّعليقاتِ في رَأسِكَ قَبلَ أن تَحدُثَ اللَّحظَةُ حَتَّى. الأداءُ مُرهِق، لكِنَّ التَّوَقُّفَ عَنهُ يَبدو كالاختِفاء.',
                },
                {
                  kind: 'checklist',
                  id: 's2-performer-signs',
                  titleEn: 'Signs you might be The Performer',
                  titleAr: 'عَلاماتُ أنَّكَ قَد تَكونُ المُؤَدِّي',
                  itemsEn: [
                    'You delete posts that don\'t get enough engagement',
                    'You feel anxious when you haven\'t posted in a while',
                    'You experience a mood dip when a post underperforms',
                    'You take multiple photos of the same moment before choosing the "best" one',
                    'You compare your engagement to peers\' and feel inadequate',
                  ],
                  itemsAr: [
                    'تَحذِفُ المَنشوراتِ الَّتي لا تَحصُلُ عَلى تَفاعُلٍ كافٍ',
                    'تَشعُرُ بالقَلَقِ حينَ لا تَنشُرُ لِفَترَة',
                    'تَشعُرُ بانخِفاضِ المِزاجِ حينَ يَكونُ أداءُ مَنشورٍ ما ضَعيفًا',
                    'تَلتَقِطُ صُوَرًا مُتَعَدِّدَةً لِنَفسِ اللَّحظَةِ قَبلَ اختِيارِ "الأفضَل"',
                    'تُقارِنُ تَفاعُلَكَ بِتَفاعُلِ أقرانِكَ وتَشعُرُ بالنَّقص',
                  ],
                },
              ],
            },
            {
              labelEn: 'The Lurker',
              labelAr: 'المُراقِب',
              children: [
                {
                  kind: 'paragraph',
                  id: 's2-lurker-desc',
                  textEn: "You consume without participating. You watch other people's lives unfold from a safe distance, absorbing their content while revealing nothing about yourself. Scrolling feels safe because it requires no vulnerability. But it is also a form of emotional avoidance — you stay connected enough to feel like you belong, without taking the risk of actually showing up.",
                  textAr: 'تَستَهلِكُ دونَ مُشارَكَة. تُشاهِدُ حَياةَ الآخَرينَ تَتَكَشَّفُ مِن مَسافَةٍ آمِنَة، تَمتَصُّ مُحتَواهُم دونَ الكَشفِ عَن شَيءٍ عَن نَفسِك. التَّصَفُّحُ يَبدو آمِنًا لِأنَّهُ لا يَتَطَلَّبُ ضَعفًا. لكِنَّهُ أيضًا شَكلٌ مِنَ التَّجَنُّبِ العاطِفِيّ — تَبقى مُتَّصِلاً بِما يَكفي لِتَشعُرَ بالانتِماء، دونَ المُخاطَرَةِ بالظُّهورِ فِعلاً.',
                },
                {
                  kind: 'checklist',
                  id: 's2-lurker-signs',
                  titleEn: 'Signs you might be The Lurker',
                  titleAr: 'عَلاماتُ أنَّكَ قَد تَكونُ المُراقِب',
                  itemsEn: [
                    'You spend hours scrolling but rarely post, comment, or react',
                    'You know details about people\'s lives that they don\'t know you know',
                    'You feel disconnected despite being "connected" to hundreds of people',
                    'You use scrolling as your primary form of relaxation or wind-down',
                    'You feel like you know people online but they have no idea who you are',
                  ],
                  itemsAr: [
                    'تَقضي ساعاتٍ في التَّصَفُّحِ لكِن نادِرًا ما تَنشُرُ أو تُعَلِّقُ أو تَتَفاعَل',
                    'تَعرِفُ تَفاصيلَ عَن حَياةِ أشخاصٍ لا يَعلَمونَ أنَّكَ تَعرِفُها',
                    'تَشعُرُ بالانفِصالِ رَغمَ أنَّكَ "مُتَّصِل" بِمِئاتِ الأشخاص',
                    'تَستَخدِمُ التَّصَفُّحَ كَشَكلِكَ الأساسِيِّ لِلاستِرخاءِ أوِ الاستِرخاء',
                    'تَشعُرُ أنَّكَ تَعرِفُ أشخاصًا عَلى الإنتِرنِت لكِنَّهُم لا يَعرِفونَ مَن أنت',
                  ],
                },
              ],
            },
            {
              labelEn: 'The Doom-Scroller',
              labelAr: 'مُتَصَفِّحُ الكَوارِث',
              children: [
                {
                  kind: 'paragraph',
                  id: 's2-doomscroller-desc',
                  textEn: "You are drawn to bad news, outrage, and catastrophe. Your nervous system is stuck in a threat-scanning mode, and the algorithm has learned that anxiety-provoking content keeps you engaged longer than anything else. You scroll through crises, conflicts, and worst-case scenarios not because you enjoy them — but because your anxious brain believes that staying informed is the same as staying safe. It isn't.",
                  textAr: 'أنتَ مُنجَذِبٌ لِلأخبارِ السَّيِّئَةِ والغَضَبِ والكَوارِث. جِهازُكَ العَصَبِيُّ عالِقٌ في وَضعِ مَسحِ التَّهديدات، والخَوارِزمِيَّةُ تَعَلَّمَت أنَّ المُحتَوى المُثيرَ لِلقَلَقِ يُبقيكَ مُنخَرِطًا أطوَلَ مِن أيِّ شَيءٍ آخَر. تَتَصَفَّحُ الأزَماتِ والنِّزاعاتِ وأسوَأَ السِّيناريوهاتِ لَيسَ لِأنَّكَ تَستَمتِع — بَلْ لِأنَّ دِماغَكَ القَلِقَ يَعتَقِدُ أنَّ البَقاءَ عَلى اطِّلاعٍ هُوَ نَفسُ البَقاءِ آمِنًا. لَيسَ كَذلِك.',
                },
                {
                  kind: 'checklist',
                  id: 's2-doomscroller-signs',
                  titleEn: 'Signs you might be The Doom-Scroller',
                  titleAr: 'عَلاماتُ أنَّكَ قَد تَكونُ مُتَصَفِّحَ الكَوارِث',
                  itemsEn: [
                    'You feel compelled to keep reading bad news even when it makes you feel worse',
                    'You check the news or social media first thing in the morning',
                    'You feel a strange combination of anxiety and inability to stop scrolling',
                    'You catastrophize about events you have no control over',
                    'You feel guilty for not "staying informed" even when it harms your mental health',
                  ],
                  itemsAr: [
                    'تَشعُرُ بالاندِفاعِ لِمُواصَلَةِ قِراءَةِ الأخبارِ السَّيِّئَةِ حَتَّى حينَ تَجعَلُكَ تَشعُرُ بالأسوَأ',
                    'تَتَفَقَّدُ الأخبارَ أو وَسائِلَ التَّواصُلِ أوَّلَ شَيءٍ في الصَّباح',
                    'تَشعُرُ بِمَزيجٍ غَريبٍ مِنَ القَلَقِ وعَدَمِ القُدرَةِ عَلى التَّوَقُّفِ عَنِ التَّصَفُّح',
                    'تُفَكِّرُ بالأسوَأِ بِشَأنِ أحداثٍ لا سَيطَرَةَ لَكَ عَلَيها',
                    'تَشعُرُ بالذَّنبِ لِعَدَمِ "البَقاءِ عَلى اطِّلاع" حَتَّى حينَ يَضُرُّ بِصِحَّتِكَ النَّفسِيَّة',
                  ],
                },
              ],
            },
            {
              labelEn: 'The Comparer',
              labelAr: 'المُقارِن',
              children: [
                {
                  kind: 'paragraph',
                  id: 's2-comparer-desc',
                  textEn: "You measure your life against other people's highlight reels — and you always come up short. Their career, their relationship, their body, their home, their children, their vacation. Rationally, you know it is not the full picture. But comparison doesn't happen in the rational part of your brain. It happens before you even notice, in the limbic system, where emotions live and logic cannot reach in time.",
                  textAr: 'تَقيسُ حَياتَكَ عَلى لَحَظاتِ الآخَرينَ المُختارَة — وتَجِدُ نَفسَكَ دائِمًا أقَلّ. مَسيرَتُهُم، عَلاقَتُهُم، أجسادُهُم، بُيوتُهُم، أطفالُهُم، إجازاتُهُم. عَقلانِيًّا تَعلَمُ أنَّها لَيسَتِ الصّورَةَ الكامِلَة. لكِنَّ المُقارَنَةَ لا تَحدُثُ في الجُزءِ العَقلانِيِّ مِن دِماغِك. تَحدُثُ قَبلَ أن تُلاحِظَ حَتَّى، في الجِهازِ الحَوفِيّ، حَيثُ تَعيشُ العَواطِفُ ولا يَصِلُ المَنطِقُ في الوَقتِ المُناسِب.',
                },
                {
                  kind: 'checklist',
                  id: 's2-comparer-signs',
                  titleEn: 'Signs you might be The Comparer',
                  titleAr: 'عَلاماتُ أنَّكَ قَد تَكونُ المُقارِن',
                  itemsEn: [
                    'You feel worse about yourself after scrolling, especially on Instagram or LinkedIn',
                    'You find yourself thinking "they have it all figured out" about people you barely know',
                    'You mentally calculate where you "should" be at your age based on others\' posts',
                    'You feel a pang of envy even when something good happens to a friend',
                    'You downplay your own achievements because they don\'t look impressive enough online',
                  ],
                  itemsAr: [
                    'تَشعُرُ بالأسوَأِ عَن نَفسِكَ بَعدَ التَّصَفُّح، خاصَّةً عَلى إنستغرام أو لِينكدإن',
                    'تَجِدُ نَفسَكَ تَعتَقِدُ أنَّ "لَدَيهِمُ الأُمورُ واضِحَة" عَن أشخاصٍ بالكادِ تَعرِفُهُم',
                    'تَحسِبُ ذِهنِيًّا أينَ "يَجِبُ" أن تَكونَ في عُمرِكَ بِناءً عَلى مَنشوراتِ الآخَرين',
                    'تَشعُرُ بِوَخزَةِ حَسَدٍ حَتَّى حينَ يَحدُثُ شَيءٌ جَيِّدٌ لِصَديق',
                    'تُقَلِّلُ مِن إنجازاتِكَ لِأنَّها لا تَبدو مُثيرَةً لِلإعجابِ بِما يَكفي عَلى الإنتِرنِت',
                  ],
                },
              ],
            },
            {
              labelEn: 'The Fixer',
              labelAr: 'المُصلِح',
              children: [
                {
                  kind: 'paragraph',
                  id: 's2-fixer-desc',
                  textEn: "You over-function online. You respond to every message, comment on every post, manage every group chat, mediate every conflict. Your phone is an extension of your need to be needed. If you stop being available, you fear the connection will disappear — because deep down, you believe people stay because of what you do for them, not because of who you are.",
                  textAr: 'تُفرِطُ في الأداءِ عَلى الإنتِرنِت. تَرُدُّ عَلى كُلِّ رِسالَة، تُعَلِّقُ عَلى كُلِّ مَنشور، تُديرُ كُلَّ مَجموعَةِ مُحادَثَة، تَتَوَسَّطُ في كُلِّ خِلاف. هاتِفُكَ امتِدادٌ لِحاجَتِكَ لأن تَكونَ مَحتاجًا. إذا تَوَقَّفتَ عَنِ التَّواجُد، تَخشى أنَّ الاتِّصالَ سَيَختَفي — لِأنَّكَ في أعماقِكَ تَعتَقِدُ أنَّ النَّاسَ يَبقَونَ بِسَبَبِ ما تَفعَلُهُ لَهُم، لا بِسَبَبِ مَن أنت.',
                },
                {
                  kind: 'checklist',
                  id: 's2-fixer-signs',
                  titleEn: 'Signs you might be The Fixer',
                  titleAr: 'عَلاماتُ أنَّكَ قَد تَكونُ المُصلِح',
                  itemsEn: [
                    'You feel anxious if you haven\'t responded to a message within minutes',
                    'You are the one who keeps group chats alive and organized',
                    'You feel responsible for other people\'s emotional experiences online',
                    'You experience guilt when you set your phone to "Do Not Disturb"',
                    'You burn out from digital emotional labor but don\'t know how to stop',
                  ],
                  itemsAr: [
                    'تَشعُرُ بالقَلَقِ إذا لَم تَرُدَّ عَلى رِسالَةٍ خِلالَ دَقائِق',
                    'أنتَ مَن يُبقي مَجموعاتِ المُحادَثَةِ حَيَّةً ومُنَظَّمَة',
                    'تَشعُرُ بالمَسؤولِيَّةِ عَن تَجارِبِ الآخَرينَ العاطِفِيَّةِ عَلى الإنتِرنِت',
                    'تَشعُرُ بالذَّنبِ حينَ تَضَعُ هاتِفَكَ عَلى "عَدَمِ الإزعاج"',
                    'تَحتَرِقُ مِنَ العَمَلِ العاطِفِيِّ الرَّقمِيِّ لكِنَّكَ لا تَعرِفُ كَيفَ تَتَوَقَّف',
                  ],
                },
              ],
            },
          ],
        },

        /* ── Archetype Fluidity Reminder ── */
        {
          kind: 'callout',
          id: 's2-fluidity-note',
          variant: 'insight',
          textEn: 'Remember: these archetypes are not fixed identities. They are patterns that shift with your mood, your life stage, and your current stressors. You may be The Performer at work and The Lurker on weekends. You may have been The Doom-Scroller during a crisis and The Comparer during a career transition. The point is not to find your label — it is to notice which pattern is active right now, and what it is asking for.',
          textAr: 'تَذَكَّر: هذِهِ الأنماطُ لَيسَت هُوِيَّاتٍ ثابِتَة. إنَّها أنماطٌ تَتَغَيَّرُ مَعَ مِزاجِك، ومَرحَلَةِ حَياتِك، وضُغوطِكَ الحالِيَّة. قَد تَكونُ المُؤَدِّيَ في العَمَلِ والمُراقِبَ في عُطلَةِ نِهايَةِ الأُسبوع. قَد تَكونُ مُتَصَفِّحَ الكَوارِثِ أثناءَ أزمَةٍ والمُقارِنَ خِلالَ تَحَوُّلٍ مِهنِيّ. المَقصودُ لَيسَ إيجادَ تَصنيفِك — بَلْ مُلاحَظَةُ أيُّ نَمَطٍ نَشِطٌ الآن، وماذا يَطلُب.',
        },

        /* ── Archetype Thought Record ── */
        {
          kind: 'thought-record',
          id: 's2-archetype-record',
          titleEn: 'My Dominant Archetype',
          titleAr: 'نَمَطيَ السَّائِد',
          fields: [
            { labelEn: 'Which archetype(s) do I most identify with?', labelAr: 'أيُّ الأنماطِ أُعَرِّفُ نَفسي بِها أكثَر؟', placeholder: { en: 'Name one or two...', ar: 'سَمِّ واحِدًا أو اثنَين...' } },
            { labelEn: 'When does this pattern show up most strongly?', labelAr: 'مَتى يَظهَرُ هذا النَّمَطُ بِأقوى شَكل؟', placeholder: { en: 'Morning? After conflict? When alone?', ar: 'صَباحًا؟ بَعدَ خِلاف؟ حينَ أكونُ وَحدي؟' } },
            { labelEn: 'What emotional need is this archetype trying to meet?', labelAr: 'ما الحاجَةُ العاطِفِيَّةُ الَّتي يُحاوِلُ هذا النَّمَطُ تَلبِيَتَها؟', placeholder: { en: 'Connection? Validation? Safety? Control?', ar: 'تَواصُل؟ تَأكيد؟ أمان؟ سَيطَرَة؟' } },
            { labelEn: 'What would meeting that need look like WITHOUT a screen?', labelAr: 'كَيفَ سَتَبدو تَلبِيَةُ تِلكَ الحاجَةِ بِدونِ شاشَة؟', placeholder: { en: 'Be specific...', ar: 'كُن مُحَدَّدًا...' } },
          ],
        },

        /* ── Archetype Mapping Table ── */
        {
          kind: 'fillable-table',
          id: 's2-archetype-map',
          titleEn: 'Archetype Frequency Map',
          titleAr: 'خَريطَةُ تَكرارِ الأنماط',
          columns: [
            { headerEn: 'Archetype', headerAr: 'النَّمَط', width: '20%' },
            { headerEn: 'Frequency (1-10)', headerAr: 'التَّكرار (١-١٠)', width: '15%' },
            { headerEn: 'When It Shows Up', headerAr: 'مَتى يَظهَر', width: '30%' },
            { headerEn: 'What Need It Meets', headerAr: 'الحاجَةُ الَّتي يُلَبِّيها', width: '35%' },
          ],
          rows: 5,
        },

        /* ── Serving vs Controlling ── */
        {
          kind: 'comparison',
          id: 's2-serving-vs-controlling',
          titleEn: 'Serving You vs Controlling You',
          titleAr: 'يَخدِمُكَ مُقابِلَ يَتَحَكَّمُ بِك',
          left: {
            labelEn: 'The Archetype Serving You',
            labelAr: 'النَّمَطُ الَّذي يَخدِمُك',
            pointsEn: [
              'You share online because you genuinely want to connect',
              'You can stop scrolling when you decide to',
              'You notice comparison happening and choose not to engage',
              'You check messages because someone needs you, not because you need to be needed',
              'You stay informed without losing sleep',
            ],
            pointsAr: [
              'تُشارِكُ عَلى الإنتِرنِت لِأنَّكَ تُريدُ التَّواصُلَ فِعلًا',
              'تَستَطيعُ التَّوَقُّفَ عَنِ التَّصَفُّحِ حينَ تُقَرِّر',
              'تُلاحِظُ المُقارَنَةَ تَحدُثُ وتَختارُ عَدَمَ الانخِراط',
              'تَتَفَقَّدُ الرَّسائِلَ لِأنَّ شَخصًا يَحتاجُك، لا لِأنَّكَ تَحتاجُ أن تَكونَ مَحتاجًا',
              'تَبقى عَلى اطِّلاعٍ دونَ أن تَفقِدَ النَّوم',
            ],
          },
          right: {
            labelEn: 'The Archetype Controlling You',
            labelAr: 'النَّمَطُ الَّذي يَتَحَكَّمُ بِك',
            pointsEn: [
              'You share because you need the validation to feel okay about yourself',
              'You intend to scroll for 5 minutes and lose an hour',
              'Comparison hijacks your mood before you even notice it',
              'You check messages compulsively because silence feels threatening',
              'You doom-scroll until your nervous system is overwhelmed',
            ],
            pointsAr: [
              'تُشارِكُ لِأنَّكَ تَحتاجُ التَّأكيدَ لِتَشعُرَ بالرِّضا عَن نَفسِك',
              'تَنوي التَّصَفُّحَ ٥ دَقائِقَ وتَفقِدُ ساعَة',
              'المُقارَنَةُ تَختَطِفُ مِزاجَكَ قَبلَ أن تُلاحِظَها',
              'تَتَفَقَّدُ الرَّسائِلَ قَهرِيًّا لِأنَّ الصَّمتَ يَبدو مُهَدِّدًا',
              'تَتَصَفَّحُ الكَوارِثَ حَتَّى يَنهَكَ جِهازُكَ العَصَبِيّ',
            ],
          },
        },
      ],
    },

    /* ================================================================
       SECTION 3: From Childhood Patterns to Digital Habits — LOCKED
       ================================================================ */
    {
      id: 'childhood-to-digital',
      titleEn: 'Part 3 · From Childhood Patterns to Digital Habits',
      titleAr: 'الجُزءُ الثَّالِث · مِن أنماطِ الطُّفولَةِ إلى العاداتِ الرَّقمِيَّة',
      subtitleEn: 'How your attachment style shows up on your phone',
      subtitleAr: 'كَيفَ يَظهَرُ نَمَطُ تَعَلُّقِكَ عَلى هاتِفِك',
      color: '#C8A97D',
      blocks: [
        {
          kind: 'paragraph',
          id: 's3-intro',
          textEn:
            "The way you relate to your phone is not random. It is shaped by the same patterns that were formed in your earliest relationships. If you grew up needing to earn love through performance, you may find yourself curating your online life for approval. If you learned that people leave, you may check your phone obsessively for reassurance. If closeness felt unsafe, you may scroll endlessly as a way to feel connected without being vulnerable. Your phone didn't create these patterns. But it has become the most efficient delivery system for them.",
          textAr:
            'الطَّريقَةُ الَّتي تَتَعامَلُ بِها مَعَ هاتِفِكَ لَيسَت عَشوائِيَّة. تَتَشَكَّلُ بِنَفسِ الأنماطِ الَّتي تَكَوَّنَت في أوائِلِ عَلاقاتِك. إذا نَشَأتَ تَحتاجُ لِكَسبِ الحُبِّ عَبرَ الأداء، قَد تَجِدُ نَفسَكَ تَصنَعُ حَياتَكَ عَلى الإنتِرنِت لِلحُصولِ عَلى القَبول. إذا تَعَلَّمتَ أنَّ النَّاسَ يُغادِرون، قَد تَتَفَقَّدُ هاتِفَكَ بِهَوَسٍ لِلطَّمأنينَة. إذا كانَ القُربُ يَبدو غَيرَ آمِن، قَد تَتَصَفَّحُ إلى ما لا نِهايَةٍ كَوَسيلَةٍ لِلشُّعورِ بالاتِّصالِ دونَ أن تَكونَ ضَعيفًا. هاتِفُكَ لَم يَخلُقْ هذِهِ الأنماط. لكِنَّهُ أصبَحَ أكفَأَ نِظامِ تَوصيلٍ لَها.',
          tone: 'lead',
        },
        {
          kind: 'callout',
          id: 's3-safety-callout',
          variant: 'warning',
          textEn: 'A moment before you begin: This section invites you to explore early relationship patterns and how they show up in your digital life. For some people, this may bring up difficult memories or strong emotions. That is normal — and it is also okay to stop. If at any point you feel overwhelmed, please use this grounding exercise: name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste. You are safe. You are in control of how deep you go. If this section activates something that feels too big to hold alone, please reach out to a qualified therapist. This workbook is a mirror, not a treatment plan.',
          textAr: 'لَحظَةٌ قَبلَ أن تَبدَأ: هذا القِسمُ يَدعوكَ لاستِكشافِ أنماطِ العَلاقاتِ المُبَكِّرَةِ وكَيفَ تَظهَرُ في حَياتِكَ الرَّقمِيَّة. بالنِّسبَةِ لِبَعضِ الأشخاص، قَد يُثيرُ هذا ذِكرَياتٍ صَعبَةً أو مَشاعِرَ قَوِيَّة. هذا طَبيعِيّ — ولا بَأسَ أيضًا بالتَّوَقُّف. إذا شَعَرتَ في أيِّ لَحظَةٍ بالإرهاق، يُرجى استِخدامُ هذا التَّمرينِ لِلتَّهدِئَة: سَمِّ ٥ أشياءَ تَراها، ٤ يُمكِنُكَ لَمسُها، ٣ تَسمَعُها، ٢ تَشُمُّها، و١ تَتَذَوَّقُها. أنتَ بِأمان. أنتَ تَتَحَكَّمُ في عُمقِ ما تَستَكشِفُه. إذا أثارَ هذا القِسمُ شَيئًا يَبدو أكبَرَ مِن أن تَحمِلَهُ وَحدَك، يُرجى التَّواصُلُ مَعَ مُعالِجٍ مُؤَهَّل. هذا الدَّفتَرُ مِرآة، لا خُطَّةَ عِلاج.',
        },
        {
          kind: 'callout',
          id: 's3-attachment-callout',
          variant: 'insight',
          textEn: 'Attachment theory teaches us that the way we bonded with our primary caregivers creates a template for how we seek connection for the rest of our lives. Social media has become the most powerful amplifier of those templates ever created.',
          textAr: 'تُعَلِّمُنا نَظَرِيَّةُ التَّعَلُّقِ أنَّ طَريقَةَ ارتِباطِنا بِمُقَدِّمي الرِّعايَةِ الأساسِيِّينَ تَخلُقُ قالِبًا لِكَيفِيَّةِ بَحثِنا عَنِ التَّواصُلِ طَوالَ حَياتِنا. أصبَحَت وَسائِلُ التَّواصُلِ الاجتِماعِيِّ أقوى مُضَخِّمٍ لِتِلكَ القَوالِبِ عَلى الإطلاق.',
        },

        /* ── Anxious vs Avoidant Online ── */
        {
          kind: 'info-card-pair',
          id: 's3-anxious-vs-avoidant',
          cards: [
            {
              titleEn: 'Anxious Attachment Online',
              titleAr: 'التَّعَلُّقُ القَلِقُ عَلى الإنتِرنِت',
              bodyEn: 'Over-checking messages for replies. Reading into response times. Needing constant digital reassurance. Posting and immediately watching for reactions. Feeling abandoned when someone doesn\'t respond quickly enough.',
              bodyAr: 'التَّفَقُّدُ المُفرِطُ لِلرَّسائِلِ لِلرُّدود. قِراءَةُ ما بَينَ السُّطورِ في أوقاتِ الاستِجابَة. الحاجَةُ لِطَمأنَةٍ رَقمِيَّةٍ مُستَمِرَّة. النَّشرُ ومُراقَبَةُ ردودِ الفِعلِ فَورًا. الشُّعورُ بالتَّخَلِّي حينَ لا يَرُدُّ شَخصٌ بِسُرعَةٍ كافِيَة.',
              icon: 'phone-incoming',
              color: '#C4878A',
            },
            {
              titleEn: 'Avoidant Attachment Online',
              titleAr: 'التَّعَلُّقُ التَّجَنُّبِيُّ عَلى الإنتِرنِت',
              bodyEn: 'Lurking without engaging. Keeping profiles vague or private. Leaving messages on read. Using scrolling as emotional distance. Ghosting when conversations become too real. Feeling overwhelmed by direct messages.',
              bodyAr: 'المُراقَبَةُ دونَ مُشارَكَة. إبقاءُ المَلَفَّاتِ غامِضَةً أو خاصَّة. تَركُ الرَّسائِلِ مَقروءَةً دونَ رَدّ. استِخدامُ التَّصَفُّحِ كَمَسافَةٍ عاطِفِيَّة. الاختِفاءُ حينَ تُصبِحُ المُحادَثاتُ عَميقَةً جِدًّا. الشُّعورُ بالإرهاقِ مِنَ الرَّسائِلِ المُباشِرَة.',
              icon: 'phone-off',
              color: '#6C7BD4',
            },
          ],
        },

        /* ── Disorganized Attachment Note ── */
        {
          kind: 'callout',
          id: 's3-disorganized-note',
          variant: 'insight',
          textEn: 'There is a third pattern: disorganized attachment — when your earliest relationships were both a source of comfort and a source of fear. Online, this can look like rapid cycling between oversharing and withdrawing, craving connection and pushing it away, or feeling simultaneously drawn to and threatened by intimacy in digital spaces. If this resonates with you, it often reflects early experiences that were confusing or frightening. This pattern responds best to professional support — not because something is wrong with you, but because you deserve a safe space to untangle what was never yours to carry alone.',
          textAr: 'هُناكَ نَمَطٌ ثالِث: التَّعَلُّقُ المُضطَرِب — حينَ كانَت عَلاقاتُكَ الأُولى مَصدَرًا لِلرَّاحَةِ ومَصدَرًا لِلخَوفِ في آنٍ واحِد. عَلى الإنتِرنِت، قَد يَبدو هذا كَتَناوُبٍ سَريعٍ بَينَ الإفراطِ في المُشارَكَةِ والانسِحاب، اشتِياقِ التَّواصُلِ ودَفعِهِ بَعيدًا، أوِ الشُّعورِ بالانجِذابِ والتَّهديدِ مِنَ القُربِ في الفَضاءاتِ الرَّقمِيَّةِ في الوَقتِ نَفسِه. إذا كانَ هذا يَتَرَدَّدُ صَداهُ لَدَيك، فَغالِبًا ما يَعكِسُ تَجارِبَ مُبَكِّرَةً كانَت مُربِكَةً أو مُخيفَة. هذا النَّمَطُ يَستَجيبُ أفضَلَ لِلدَّعمِ المِهنِيّ — لَيسَ لِأنَّ شَيئًا خاطِئٌ فيك، بَلْ لِأنَّكَ تَستَحِقُّ مَكانًا آمِنًا لِفَكِّ ما لَم يَكُنْ لَكَ أن تَحمِلَهُ وَحدَك.',
        },

        /* ── Childhood → Digital Mapping ── */
        {
          kind: 'thought-record',
          id: 's3-childhood-record',
          titleEn: 'Connecting the Dots',
          titleAr: 'رَبطُ النِّقاط',
          fields: [
            { labelEn: 'My earliest memory of seeking approval or validation:', labelAr: 'أوَّلُ ذِكرى لَدَيَّ عَنِ البَحثِ عَنِ القَبولِ أوِ التَّأكيد:', placeholder: { en: 'What did you do to earn love or attention?', ar: 'ماذا كُنتَ تَفعَلُ لِكَسبِ الحُبِّ أوِ الانتِباه؟' } },
            { labelEn: 'How that same pattern shows up in my digital life today:', labelAr: 'كَيفَ يَظهَرُ نَفسُ النَّمَطِ في حَياتيَ الرَّقمِيَّةِ اليَوم:', placeholder: { en: 'Do you see the echo?', ar: 'هَل تَرى الصَّدى؟' } },
            { labelEn: 'What I actually needed then — and what I actually need now:', labelAr: 'ما كُنتُ أحتاجُهُ فِعلًا حينَها — وما أحتاجُهُ فِعلًا الآن:', placeholder: { en: 'Name the real need behind the digital behavior.', ar: 'سَمِّ الحاجَةَ الحَقيقِيَّةَ وَراءَ السُّلوكِ الرَّقمِيّ.' } },
          ],
        },

        /* ── Pattern Mapping Table ── */
        {
          kind: 'fillable-table',
          id: 's3-pattern-map',
          titleEn: 'Childhood Pattern → Digital Behavior Map',
          titleAr: 'خَريطَةُ نَمَطِ الطُّفولَة → السُّلوكِ الرَّقمِيّ',
          columns: [
            { headerEn: 'Childhood Pattern', headerAr: 'نَمَطُ الطُّفولَة', width: '25%' },
            { headerEn: 'How It Showed Up Growing Up', headerAr: 'كَيفَ ظَهَرَ أثناءَ النُّمُوّ', width: '25%' },
            { headerEn: 'How It Shows Up Online', headerAr: 'كَيفَ يَظهَرُ عَلى الإنتِرنِت', width: '25%' },
            { headerEn: 'What I Actually Need', headerAr: 'ما أحتاجُهُ فِعلًا', width: '25%' },
          ],
          rows: 4,
        },
      ],
    },

    /* ================================================================
       SECTION 4: The Creator's Paradox — LOCKED
       ================================================================ */
    {
      id: 'creators-paradox',
      titleEn: "Part 4 · The Creator's Paradox",
      titleAr: 'الجُزءُ الرَّابِع · مُفارَقَةُ المُبدِع',
      subtitleEn: 'When your creativity becomes your cage',
      subtitleAr: 'حينَ يُصبِحُ إبداعُكَ قَفَصَك',
      color: '#D4836A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's4-intro',
          textEn:
            "This section is for anyone who creates content — whether you have ten followers or ten thousand. The paradox is simple: creating should be an act of expression, but the platform turns it into a performance. You start sharing what matters to you, and slowly, imperceptibly, you start sharing what gets attention. The distance between those two things is where creator burnout lives.",
          textAr:
            'هذا القِسمُ لِأيِّ شَخصٍ يَصنَعُ مُحتَوى — سَواءَ كانَ لَدَيكَ عَشرَةُ مُتابِعينَ أو عَشرَةُ آلاف. المُفارَقَةُ بَسيطَة: الإبداعُ يَجِبُ أن يَكونَ فِعلَ تَعبير، لكِنَّ المِنَصَّةَ تُحَوِّلُهُ إلى أداء. تَبدَأُ بِمُشارَكَةِ ما يَهُمُّك، وبِبُطءٍ وبِشَكلٍ غَيرِ مَحسوس، تَبدَأُ بِمُشارَكَةِ ما يَحصُلُ عَلى الانتِباه. المَسافَةُ بَينَ هذَينِ الشَّيئَينِ هِيَ حَيثُ يَعيشُ احتِراقُ المُبدِع.',
          tone: 'lead',
        },
        {
          kind: 'callout',
          id: 's4-opt-out',
          variant: 'insight',
          textEn: 'Not a content creator? This section is optional. If you primarily consume rather than create, you may find more value in jumping to Part 5: The 21-Day Digital Reset. However, the parasocial relationship section below may still resonate — many consumers develop one-sided emotional bonds with creators without realizing it.',
          textAr: 'لَستَ صانِعَ مُحتَوى؟ هذا القِسمُ اختِيارِيّ. إذا كُنتَ تَستَهلِكُ المُحتَوى بِشَكلٍ أساسِيٍّ بَدَلاً مِن إنشائِه، قَد تَجِدُ قيمَةً أكبَرَ في الانتِقالِ إلى الجُزءِ الخامِس: إعادَةُ الضَّبطِ الرَّقمِيّ. لكِنَّ قِسمَ العَلاقاتِ شِبهِ الاجتِماعِيَّةِ أدناهُ قَد يَتَرَدَّدُ صَداهُ — كَثيرٌ مِنَ المُستَهلِكينَ يُطَوِّرونَ رَوابِطَ عاطِفِيَّةً أحادِيَّةَ الاتِّجاهِ مَعَ صُنَّاعِ المُحتَوى دونَ أن يُدرِكوا.',
        },

        /* ── Creator Burnout Cycle ── */
        {
          kind: 'cycle-diagram',
          id: 's4-burnout-cycle',
          titleEn: 'The Creator Burnout Cycle',
          titleAr: 'دَورَةُ احتِراقِ المُبدِع',
          steps: [
            { labelEn: 'Create', labelAr: 'اِصنَعْ', descEn: 'You make something that feels authentic and meaningful', descAr: 'تَصنَعُ شَيئًا يَبدو أصيلًا وذا مَعنى', color: '#5A8B6F' },
            { labelEn: 'Post', labelAr: 'اِنشُرْ', descEn: 'You share it publicly, which takes vulnerability', descAr: 'تُشارِكُهُ عَلَنًا، وهذا يَتَطَلَّبُ ضَعفًا', color: '#C8A97D' },
            { labelEn: 'Check Metrics', labelAr: 'تَفَقَّدِ الأرقام', descEn: 'You watch the likes, comments, shares — your worth gets tied to numbers', descAr: 'تُراقِبُ الإعجاباتِ والتَّعليقاتِ والمُشارَكات — قيمَتُكَ تَرتَبِطُ بالأرقام', color: '#D4836A' },
            { labelEn: 'Adjust', labelAr: 'عَدِّلْ', descEn: 'You start creating for the algorithm instead of yourself', descAr: 'تَبدَأُ بالإبداعِ لِلخَوارِزمِيَّةِ بَدَلًا مِن نَفسِك', color: '#C4878A' },
            { labelEn: 'Burnout', labelAr: 'الاحتِراق', descEn: 'Creativity drains because it is no longer yours — it belongs to the audience', descAr: 'الإبداعُ يَستَنزِفُ لِأنَّهُ لَم يَعُدْ لَك — أصبَحَ مِلكًا لِلجُمهور', color: '#7A3B5E' },
          ],
        },

        /* ── Authenticity vs Validation ── */
        {
          kind: 'comparison',
          id: 's4-authenticity-vs-validation',
          titleEn: 'Authenticity vs Validation',
          titleAr: 'الأصالَة مُقابِلَ التَّأكيد',
          left: {
            labelEn: 'Creating from Authenticity',
            labelAr: 'الإبداعُ مِنَ الأصالَة',
            pointsEn: [
              'You create because the idea excites you',
              'You post when you have something to share',
              'You measure success by personal satisfaction',
              'You can leave a post alone after publishing',
              'Low engagement does not change how you feel about the work',
            ],
            pointsAr: [
              'تَصنَعُ لِأنَّ الفِكرَةَ تُثيرُك',
              'تَنشُرُ حينَ يَكونُ لَدَيكَ شَيءٌ لِمُشارَكَتِه',
              'تَقيسُ النَّجاحَ بالرِّضا الشَّخصِيّ',
              'تَستَطيعُ تَركَ المَنشورِ بَعدَ النَّشر',
              'التَّفاعُلُ المُنخَفِضُ لا يُغَيِّرُ شُعورَكَ تِجاهَ العَمَل',
            ],
          },
          right: {
            labelEn: 'Creating for Validation',
            labelAr: 'الإبداعُ مِن أجلِ التَّأكيد',
            pointsEn: [
              'You create because you need the engagement to feel seen',
              'You feel pressure to maintain a posting schedule',
              'You measure success by likes, shares, and follower growth',
              'You check metrics compulsively after posting',
              'Low engagement feels like personal rejection',
            ],
            pointsAr: [
              'تَصنَعُ لِأنَّكَ تَحتاجُ التَّفاعُلَ لِتَشعُرَ بالظُّهور',
              'تَشعُرُ بالضَّغطِ لِلحِفاظِ عَلى جَدوَلِ نَشر',
              'تَقيسُ النَّجاحَ بالإعجاباتِ والمُشارَكاتِ ونُمُوِّ المُتابِعين',
              'تَتَفَقَّدُ الأرقامَ قَهرِيًّا بَعدَ النَّشر',
              'التَّفاعُلُ المُنخَفِضُ يَبدو كَرَفضٍ شَخصِيّ',
            ],
          },
        },

        /* ── Parasocial Warning Signs ── */
        {
          kind: 'checklist',
          id: 's4-parasocial',
          titleEn: 'Parasocial Relationship Warning Signs',
          titleAr: 'عَلاماتُ تَحذيرِ العَلاقاتِ شِبهِ الاجتِماعِيَّة',
          itemsEn: [
            'You feel personally hurt when a creator you follow does something you disagree with',
            'You share details about a public figure\'s life as if you know them personally',
            'You feel emotionally invested in someone who has no idea you exist',
            'You defend a creator online as if defending a close friend',
            'You feel a sense of loss or betrayal when a creator changes their content direction',
          ],
          itemsAr: [
            'تَشعُرُ بِأذىً شَخصِيٍّ حينَ يَفعَلُ صانِعُ مُحتَوىً تَتَبِعُهُ شَيئًا لا تَتَّفِقُ مَعَه',
            'تُشارِكُ تَفاصيلَ عَن حَياةِ شَخصِيَّةٍ عامَّةٍ كَأنَّكَ تَعرِفُها شَخصِيًّا',
            'تَشعُرُ بالاستِثمارِ العاطِفِيِّ في شَخصٍ لا يَعلَمُ بِوُجودِك',
            'تُدافِعُ عَن صانِعِ مُحتَوىً عَلى الإنتِرنِت كَأنَّكَ تُدافِعُ عَن صَديقٍ مُقَرَّب',
            'تَشعُرُ بالخَسارَةِ أوِ الخِيانَةِ حينَ يُغَيِّرُ صانِعُ مُحتَوىً اتِّجاهَ مُحتَواه',
          ],
        },

        /* ── Why I Create ── */
        {
          kind: 'reflection-prompt',
          id: 's4-why-create',
          promptEn: "If no one ever saw this — if there were zero likes, zero comments, zero shares, and the post disappeared after 24 hours — would you still make it? If the answer is no, what does that tell you about your relationship with creation?",
          promptAr: 'لَو لَم يَرَ أحَدٌ هذا أبَدًا — صِفرُ إعجابات، صِفرُ تَعليقات، صِفرُ مُشارَكات، والمَنشورُ يَختَفي بَعدَ ٢٤ ساعَة — هَل كُنتَ ستَصنَعُهُ؟ إذا كانَتِ الإجابَةُ لا، ما الَّذي يُخبِرُكَ عَن عَلاقَتِكَ بالإبداع؟',
          minWords: 40,
        },

        /* ── Content Audit Table ── */
        {
          kind: 'fillable-table',
          id: 's4-content-audit',
          titleEn: 'Content Audit',
          titleAr: 'مُراجَعَةُ المُحتَوى',
          columns: [
            { headerEn: 'What I Post', headerAr: 'ما أنشُرُه', width: '25%' },
            { headerEn: 'Why I Think I Post It', headerAr: 'لِماذا أعتَقِدُ أنَّني أنشُرُه', width: '25%' },
            { headerEn: 'The Real Reason', headerAr: 'السَّبَبُ الحَقيقِيّ', width: '25%' },
            { headerEn: 'How It Makes Me Feel', headerAr: 'كَيفَ يَجعَلُني أشعُر', width: '25%' },
          ],
          rows: 5,
        },
      ],
    },

    /* ================================================================
       SECTION 5: The 21-Day Digital Reset — LOCKED
       ================================================================ */
    {
      id: 'digital-reset',
      titleEn: 'Part 5 · The 21-Day Digital Reset',
      titleAr: 'الجُزءُ الخامِس · إعادَةُ الضَّبطِ الرَّقمِيِّ لِمُدَّةِ ٢١ يَومًا',
      subtitleEn: 'Not a detox — a conscious re-engagement',
      subtitleAr: 'لَيسَت حِميَة — بَلْ إعادَةُ انخِراطٍ واعِيَة',
      dateRangeEn: 'Days 1-21',
      dateRangeAr: 'الأيَّام ١-٢١',
      color: '#5A8B6F',
      blocks: [
        {
          kind: 'paragraph',
          id: 's5-intro',
          textEn:
            "This is not a digital detox. Detoxes imply something toxic that needs to be eliminated. This is a reset — a structured 21-day practice of bringing intention to your digital life. Three weeks. Three phases. Week 1 is about awareness. Week 2 is about interruption. Week 3 is about integration. By the end, you won't have deleted any apps. But you will have fundamentally changed your relationship with them.",
          textAr:
            'هذِهِ لَيسَت حِميَةً رَقمِيَّة. الحِميَةُ تَعني شَيئًا سامًّا يَحتاجُ لِلإزالَة. هذِهِ إعادَةُ ضَبط — مُمارَسَةٌ مُنَظَّمَةٌ لِمُدَّةِ ٢١ يَومًا لِجَلبِ القَصدِيَّةِ إلى حَياتِكَ الرَّقمِيَّة. ثَلاثَةُ أسابيع. ثَلاثُ مَراحِل. الأُسبوعُ الأوَّلُ عَنِ الوَعي. الأُسبوعُ الثَّاني عَنِ المُقاطَعَة. الأُسبوعُ الثَّالِثُ عَنِ التَّكامُل. في النِّهايَة، لَن تَكونَ قَد حَذَفتَ أيَّ تَطبيقات. لكِنَّكَ ستَكونُ قَد غَيَّرتَ عَلاقَتَكَ بِها جَذرِيًّا.',
          tone: 'lead',
        },

        /* ── WEEK 1: AWARENESS (Days 1-7) ── */
        {
          kind: 'heading',
          id: 's5-week1-heading',
          level: 2,
          textEn: 'Week 1 · Awareness',
          textAr: 'الأُسبوعُ الأوَّل · الوَعي',
        },
        { kind: 'journal-day', id: 's5-day1', dayNumber: 1, titleEn: 'The Morning Audit', titleAr: 'مُراجَعَةُ الصَّباح', introEn: 'Today, do not touch your phone for the first 30 minutes after waking. Notice what comes up — restlessness, anxiety, boredom, the pull of habit.', introAr: 'اليَوم، لا تَلمِسْ هاتِفَكَ لِمُدَّةِ ٣٠ دَقيقَةً بَعدَ الاستيقاظ. لاحِظْ ما يَظهَر — عَدَمُ ارتِياح، قَلَق، مَلَل، جاذِبِيَّةُ العادَة.', intentionEn: 'Today I will notice what I reach for first.', intentionAr: 'اليَومَ سَأُلاحِظُ ما أمُدُّ يَدي إلَيهِ أوَّلًا.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'What did I feel during those 30 phone-free minutes?', labelAr: 'بِماذا شَعَرتُ خِلالَ تِلكَ الـ٣٠ دَقيقَة بِدونِ هاتِف؟', type: 'text' }, { labelEn: 'How many times did I check my phone today?', labelAr: 'كَم مَرَّةً تَفَقَّدتُ هاتِفي اليَوم؟', type: 'scale', options: [{ en: '0-10', ar: '٠-١٠' }, { en: '11-25', ar: '١١-٢٥' }, { en: '26-50', ar: '٢٦-٥٠' }, { en: '50+', ar: '+٥٠' }] }] },
        { kind: 'journal-day', id: 's5-day2', dayNumber: 2, titleEn: 'The Trigger Map', titleAr: 'خَريطَةُ المُحَفِّزات', introEn: 'Every time you pick up your phone today, pause for 2 seconds and name the emotion driving it.', introAr: 'في كُلِّ مَرَّةٍ تَلتَقِطُ فيها هاتِفَكَ اليَوم، تَوَقَّفْ لِثانِيَتَينِ وسَمِّ العاطِفَةَ الَّتي تَدفَعُك.', intentionEn: 'Today I will name the emotion before the scroll.', intentionAr: 'اليَومَ سَأُسَمِّي العاطِفَةَ قَبلَ التَّصَفُّح.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'The top 3 emotions that triggered me to reach for my phone:', labelAr: 'أهَمُّ ٣ عَواطِفَ حَفَّزَتني لِلوُصولِ إلى هاتِفي:', type: 'text' }, { labelEn: 'Was I aware of the trigger before or after picking up the phone?', labelAr: 'هَل كُنتُ واعِيًا بالمُحَفِّزِ قَبلَ أو بَعدَ التَقاطِ الهاتِف؟', type: 'checklist', options: [{ en: 'Before (aware)', ar: 'قَبل (واعٍ)' }, { en: 'After (autopilot)', ar: 'بَعد (آلي)' }] }] },
        { kind: 'journal-day', id: 's5-day3', dayNumber: 3, titleEn: 'The Body Scan While Scrolling', titleAr: 'المَسحُ الجَسَدِيُّ أثناءَ التَّصَفُّح', introEn: 'While you scroll today, check in with your body every 5 minutes. Where is the tension? Are your shoulders lifted? Is your jaw clenched?', introAr: 'أثناءَ تَصَفُّحِكَ اليَوم، تَفَقَّد جَسَدَكَ كُلَّ ٥ دَقائِق. أينَ التَّوَتُّر؟ هَل كَتِفاكَ مَرفوعان؟ هَل فَكُّكَ مَشدود؟', intentionEn: 'Today I will listen to what my body says about my scrolling.', intentionAr: 'اليَومَ سَأستَمِعُ لِما يَقولُهُ جَسَدي عَن تَصَفُّحي.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'What did my body tell me while I was scrolling?', labelAr: 'ماذا أخبَرَني جَسَدي أثناءَ التَّصَفُّح؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day4', dayNumber: 4, titleEn: 'The Comparison Audit', titleAr: 'مُراجَعَةُ المُقارَنَة', introEn: 'Today, every time you notice yourself comparing your life to someone else\'s online, write it down. No judgment — just data collection.', introAr: 'اليَوم، في كُلِّ مَرَّةٍ تُلاحِظُ فيها نَفسَكَ تُقارِنُ حَياتَكَ بِحَياةِ شَخصٍ آخَرَ عَلى الإنتِرنِت، اكتُبْها. بِدونِ حُكم — فَقَط جَمعُ بَيانات.', intentionEn: 'Today I will catch comparison in action.', intentionAr: 'اليَومَ سَأمسِكُ بالمُقارَنَةِ وَهِيَ تَحدُث.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'How many comparison moments did I catch?', labelAr: 'كَم لَحظَةَ مُقارَنَةٍ أمسَكتُ بِها؟', type: 'scale', options: [{ en: '0', ar: '٠' }, { en: '1-3', ar: '١-٣' }, { en: '4-7', ar: '٤-٧' }, { en: '8+', ar: '+٨' }] }, { labelEn: 'What did the comparison do to my mood?', labelAr: 'ماذا فَعَلَتِ المُقارَنَةُ بِمِزاجي؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day5', dayNumber: 5, titleEn: 'The Notification Inventory', titleAr: 'جَردُ الإشعارات', introEn: 'Count how many notifications you received today. How many were truly important? How many just pulled you back into an app?', introAr: 'اِحسِبْ كَم إشعارًا تَلَقَّيتَ اليَوم. كَم كانَ مُهِمًّا فِعلًا؟ كَم فَقَط سَحَبَكَ مَرَّةً أُخرى إلى تَطبيق؟', intentionEn: 'Today I will separate signal from noise.', intentionAr: 'اليَومَ سَأفصِلُ الإشارَةَ عَنِ الضَّوضاء.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'How many notifications were genuinely useful today?', labelAr: 'كَم إشعارًا كانَ مُفيدًا فِعلًا اليَوم؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day6', dayNumber: 6, titleEn: 'The Scroll Replacement', titleAr: 'بَديلُ التَّصَفُّح', introEn: 'Choose one moment today where you would normally scroll — and do something else instead. Read, walk, stretch, sit in silence. Notice the discomfort.', introAr: 'اِختَرْ لَحظَةً واحِدَةً اليَومَ حَيثُ كُنتَ عادَةً تَتَصَفَّح — وافعَلْ شَيئًا آخَرَ بَدَلًا مِن ذلِك. اِقرَأ، اِمشِ، تَمَدَّد، اِجلِسْ في صَمت. لاحِظِ الانزِعاج.', intentionEn: 'Today I will choose presence over scrolling once.', intentionAr: 'اليَومَ سَأختارُ الحُضورَ بَدَلَ التَّصَفُّحِ مَرَّةً واحِدَة.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'What did I do instead of scrolling, and how did it feel?', labelAr: 'ماذا فَعَلتُ بَدَلَ التَّصَفُّح، وكَيفَ شَعَرت؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day7', dayNumber: 7, titleEn: 'Week 1 Reflection', titleAr: 'تَأَمُّلُ الأُسبوعِ الأوَّل', introEn: 'You have spent a full week watching yourself without judgment. Today, look back at what you learned.', introAr: 'قَضَيتَ أُسبوعًا كامِلًا تُراقِبُ نَفسَكَ بِدونِ حُكم. اليَوم، انظُرْ إلى ما تَعَلَّمتَه.', intentionEn: 'Today I honor what I discovered.', intentionAr: 'اليَومَ أُكَرِّمُ ما اكتَشَفتُه.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'The biggest insight from this week was:', labelAr: 'أكبَرُ رُؤيَةٍ مِن هذا الأُسبوعِ كانَت:', type: 'text' }, { labelEn: 'One pattern I am now aware of that I was blind to before:', labelAr: 'نَمَطٌ واحِدٌ أصبَحتُ واعِيًا بِهِ وكُنتُ أعمى عَنهُ قَبلاً:', type: 'text' }] },

        /* ── Week 1 Summary ── */
        {
          kind: 'progress-summary',
          id: 's5-week1-summary',
          titleEn: 'Week 1 Summary',
          titleAr: 'مُلَخَّصُ الأُسبوعِ الأوَّل',
          fields: [
            { labelEn: 'My primary digital trigger is:', labelAr: 'مُحَفِّزيَ الرَّقمِيُّ الأساسِيُّ هُوَ:', type: 'text' },
            { labelEn: 'My dominant archetype this week was:', labelAr: 'نَمَطيَ السَّائِدُ هذا الأُسبوعَ كان:', type: 'text' },
            { labelEn: 'Awareness level (1-10):', labelAr: 'مُستَوى الوَعي (١-١٠):', type: 'scale', options: [{ en: '1-3 Low', ar: '١-٣ مُنخَفِض' }, { en: '4-6 Growing', ar: '٤-٦ نامٍ' }, { en: '7-10 Strong', ar: '٧-١٠ قَوِيّ' }] },
          ],
        },

        /* ── WEEK 2: INTERRUPTION (Days 8-14) ── */
        {
          kind: 'heading',
          id: 's5-week2-heading',
          level: 2,
          textEn: 'Week 2 · Interruption',
          textAr: 'الأُسبوعُ الثَّاني · المُقاطَعَة',
        },
        { kind: 'journal-day', id: 's5-day8', dayNumber: 8, titleEn: 'The Notification Detox', titleAr: 'تَنظيفُ الإشعارات', introEn: 'Turn off all non-essential notifications. Keep only phone calls and messages from your close circle. Notice the silence.', introAr: 'أطفِئْ كُلَّ الإشعاراتِ غَيرِ الضَّرورِيَّة. أبقِ فَقَط المُكالَماتِ والرَّسائِلَ مِن دائِرَتِكَ القَريبَة. لاحِظِ الصَّمت.', intentionEn: 'Today I reclaim my attention.', intentionAr: 'اليَومَ أستَعيدُ انتِباهي.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'How did the silence feel?', labelAr: 'كَيفَ شَعَرتُ بالصَّمت؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day9', dayNumber: 9, titleEn: 'The 5-Minute Rule', titleAr: 'قاعِدَةُ الخَمسِ دَقائِق', introEn: 'Before opening any social media app, wait 5 minutes. During that pause, ask: "What am I actually looking for right now?"', introAr: 'قَبلَ فَتحِ أيِّ تَطبيقِ تَواصُلٍ اجتِماعِيّ، انتَظِرْ ٥ دَقائِق. خِلالَ تِلكَ الوَقفَة، اسأل: "ما الَّذي أبحَثُ عَنهُ فِعلًا الآن؟"', intentionEn: 'Today I pause before I scroll.', intentionAr: 'اليَومَ أتَوَقَّفُ قَبلَ أن أتَصَفَّح.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'How many times did the 5-minute pause change my behavior?', labelAr: 'كَم مَرَّةً غَيَّرَت وَقفَةُ الخَمسِ دَقائِقَ سُلوكي؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day10', dayNumber: 10, titleEn: 'The Unfollow Experiment', titleAr: 'تَجرِبَةُ إلغاءِ المُتابَعَة', introEn: 'Unfollow or mute 5 accounts that consistently make you feel worse about yourself. This is not unkind — it is self-care.', introAr: 'ألغِ مُتابَعَةَ أو كَتِّمْ ٥ حِساباتٍ تَجعَلُكَ باستِمرارٍ تَشعُرُ بالأسوَأِ عَن نَفسِك. هذا لَيسَ قاسِيًا — بَلْ رِعايَةُ ذاتِيَّة.', intentionEn: 'Today I curate my feed to serve my well-being.', intentionAr: 'اليَومَ أُنَسِّقُ تَغذِيَتي لِتَخدِمَ رَفاهِيَتي.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'Which accounts did I unfollow/mute and why?', labelAr: 'أيُّ الحِساباتِ ألغَيتُ مُتابَعَتَها/كَتَّمتُها ولِماذا؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day11', dayNumber: 11, titleEn: 'The Phone-Free Hour', titleAr: 'السَّاعَةُ بِدونِ هاتِف', introEn: 'Choose one hour today — not during sleep — to put your phone in another room. Do something analog. Cook, read, walk, draw.', introAr: 'اِختَرْ ساعَةً واحِدَةً اليَوم — لَيسَ أثناءَ النَّوم — لِوَضعِ هاتِفِكَ في غُرفَةٍ أُخرى. اِفعَلْ شَيئًا بِدونِ شاشَة.', intentionEn: 'Today I practice being unreachable.', intentionAr: 'اليَومَ أُمارِسُ أن أكونَ غَيرَ مُتاح.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'What did I discover during my phone-free hour?', labelAr: 'ماذا اكتَشَفتُ خِلالَ ساعَتي بِدونِ هاتِف؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day12', dayNumber: 12, titleEn: 'The Intentional Post', titleAr: 'المَنشورُ المَقصود', introEn: 'If you post today, post something real. Not curated, not filtered, not rehearsed. Something that represents who you actually are, not who you want to appear to be.', introAr: 'إذا نَشَرتَ اليَوم، انشُرْ شَيئًا حَقيقِيًّا. غَيرَ مُنتَقى، غَيرَ مُفَلتَر، غَيرَ مُتَمَرَّنٍ عَلَيه.', intentionEn: 'Today I practice authenticity online.', intentionAr: 'اليَومَ أُمارِسُ الأصالَةَ عَلى الإنتِرنِت.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'Did I post? If so, how did it feel to share something real?', labelAr: 'هَل نَشَرت؟ إذا نَعَم، كَيفَ شَعَرتُ بِمُشارَكَةِ شَيءٍ حَقيقِيّ؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day13', dayNumber: 13, titleEn: 'The Boundary Practice', titleAr: 'مُمارَسَةُ الحُدود', introEn: 'Today, set one digital boundary you have been avoiding. Turn off a group chat. Set Do Not Disturb after 9 PM. Leave a message on read without guilt.', introAr: 'اليَوم، ضَعْ حَدًّا رَقمِيًّا واحِدًا كُنتَ تَتَجَنَّبُه. أطفِئْ مَجموعَةَ مُحادَثَة. ضَعْ عَدَمَ الإزعاجِ بَعدَ التَّاسِعَةِ مَساءً. اترُكْ رِسالَةً مَقروءَةً بِدونِ ذَنب.', intentionEn: 'Today I honor my limits.', intentionAr: 'اليَومَ أُكَرِّمُ حُدودي.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'What boundary did I set, and what came up emotionally?', labelAr: 'ما الحَدُّ الَّذي وَضَعتُه، وما ظَهَرَ عاطِفِيًّا؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day14', dayNumber: 14, titleEn: 'Week 2 Reflection', titleAr: 'تَأَمُّلُ الأُسبوعِ الثَّاني', introEn: 'You have spent a week interrupting old patterns. What changed? What resisted change?', introAr: 'قَضَيتَ أُسبوعًا تَقطَعُ أنماطًا قَديمَة. ما الَّذي تَغَيَّر؟ ما الَّذي قاوَمَ التَّغيير؟', intentionEn: 'Today I celebrate my progress and accept what is still hard.', intentionAr: 'اليَومَ أحتَفِلُ بِتَقَدُّمي وأقبَلُ ما لا يَزالُ صَعبًا.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'The hardest interruption was:', labelAr: 'أصعَبُ مُقاطَعَةٍ كانَت:', type: 'text' }, { labelEn: 'One habit that already feels different:', labelAr: 'عادَةٌ واحِدَةٌ تَبدو مُختَلِفَةً بالفِعل:', type: 'text' }] },

        /* ── Week 2 Summary ── */
        {
          kind: 'progress-summary',
          id: 's5-week2-summary',
          titleEn: 'Week 2 Summary',
          titleAr: 'مُلَخَّصُ الأُسبوعِ الثَّاني',
          fields: [
            { labelEn: 'The boundary I am proudest of setting:', labelAr: 'الحَدُّ الَّذي أفخَرُ بِوَضعِهِ أكثَر:', type: 'text' },
            { labelEn: 'Screen time change from Week 1:', labelAr: 'تَغَيُّرُ وَقتِ الشَّاشَةِ مِنَ الأُسبوعِ الأوَّل:', type: 'scale', options: [{ en: 'Increased', ar: 'زادَ' }, { en: 'Same', ar: 'نَفسُه' }, { en: 'Decreased slightly', ar: 'انخَفَضَ قَليلًا' }, { en: 'Decreased significantly', ar: 'انخَفَضَ بِشَكلٍ ملحوظ' }] },
          ],
        },

        /* ── WEEK 3: INTEGRATION (Days 15-21) ── */
        {
          kind: 'heading',
          id: 's5-week3-heading',
          level: 2,
          textEn: 'Week 3 · Integration',
          textAr: 'الأُسبوعُ الثَّالِث · التَّكامُل',
        },
        { kind: 'journal-day', id: 's5-day15', dayNumber: 15, titleEn: 'The Values Alignment Check', titleAr: 'فَحصُ التَّوافُقِ مَعَ القِيَم', introEn: 'Write down 3 things that matter most to you. Then look at your screen time report. How much of your digital life serves those values?', introAr: 'اكتُبْ ٣ أشياءَ تَهُمُّكَ أكثَرَ مِن غَيرِها. ثُمَّ انظُرْ إلى تَقريرِ وَقتِ شاشَتِك. كَم مِن حَياتِكَ الرَّقمِيَّةِ يَخدِمُ تِلكَ القِيَم؟', intentionEn: 'Today I align my screen time with my values.', intentionAr: 'اليَومَ أُوائِمُ وَقتَ شاشَتي مَعَ قِيَمي.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'My 3 core values and how my screen time serves (or doesn\'t serve) each:', labelAr: 'قِيَمي الثَّلاثُ الأساسِيَّةُ وكَيفَ يَخدِمُ (أو لا يَخدِمُ) وَقتُ شاشَتي كُلًّا مِنها:', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day16', dayNumber: 16, titleEn: 'The Relationship Audit', titleAr: 'مُراجَعَةُ العَلاقات', introEn: 'How many of the people you interact with online would you call in a crisis? The gap between your online "network" and your real support system is worth examining.', introAr: 'كَم مِنَ الأشخاصِ الَّذينَ تَتَفاعَلُ مَعَهُم عَلى الإنتِرنِت ستَتَّصِلُ بِهِم في أزمَة؟ الفَجوَةُ بَينَ "شَبَكَتِكَ" عَلى الإنتِرنِت ونِظامِ دَعمِكَ الحَقيقِيِّ تَستَحِقُّ الفَحص.', intentionEn: 'Today I distinguish connection from contact.', intentionAr: 'اليَومَ أُمَيِّزُ بَينَ التَّواصُلِ الحَقيقِيِّ والاتِّصالِ السَّطحِيّ.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'People I would call in a crisis vs. people I follow:', labelAr: 'أشخاصٌ سَأتَّصِلُ بِهِم في أزمَة مُقابِلَ أشخاصٌ أُتابِعُهُم:', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day17', dayNumber: 17, titleEn: 'The Creation Day', titleAr: 'يَومُ الإبداع', introEn: 'Spend 30 minutes creating something today — writing, drawing, cooking, building — that you will NOT share online. Feel what creation is like when the audience is just you.', introAr: 'اقضِ ٣٠ دَقيقَةً في صُنعِ شَيءٍ اليَوم — كِتابَة، رَسم، طَبخ، بِناء — لَن تُشارِكَهُ عَلى الإنتِرنِت. اِشعُرْ كَيفَ يَبدو الإبداعُ حينَ يَكونُ الجُمهورُ أنتَ فَقَط.', intentionEn: 'Today I create for myself alone.', intentionAr: 'اليَومَ أبدِعُ لِنَفسي فَقَط.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'What did I create, and how did it feel to keep it private?', labelAr: 'ماذا صَنَعت، وكَيفَ شَعَرتُ بِإبقائِهِ خاصًّا؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day18', dayNumber: 18, titleEn: 'The Replacement Ritual', titleAr: 'طَقسُ الاستِبدال', introEn: 'Design one replacement ritual for your most common scroll trigger. If it is boredom — what will you do instead? If it is anxiety — what will you do instead? Write it down as a prescription.', introAr: 'صَمِّمْ طَقسَ استِبدالٍ واحِدًا لِأكثَرِ مُحَفِّزاتِ التَّصَفُّحِ شُيوعًا لَدَيك. إذا كانَ المَلَل — ماذا ستَفعَلُ بَدَلًا مِن ذلِك؟ إذا كانَ القَلَق — ماذا ستَفعَلُ بَدَلًا مِن ذلِك؟', intentionEn: 'Today I build my alternative.', intentionAr: 'اليَومَ أبني بَديلي.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'My replacement ritual:', labelAr: 'طَقسُ الاستِبدالِ الخاصُّ بي:', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day19', dayNumber: 19, titleEn: 'The Digital Sabbath', titleAr: 'السَّبتُ الرَّقمِيّ', introEn: 'Today is your practice run: 6 hours without your phone (not during sleep). An entire morning or afternoon of being fully present in your physical life.', introAr: 'اليَومُ هُوَ تَجرُبَتُك: ٦ ساعاتٍ بِدونِ هاتِفِك (لَيسَ أثناءَ النَّوم). صَباحٌ أو مَساءٌ كامِلٌ مِنَ الحُضورِ الكامِلِ في حَياتِكَ الجَسَدِيَّة.', intentionEn: 'Today I practice a full half-day without my phone.', intentionAr: 'اليَومَ أُمارِسُ نِصفَ يَومٍ كامِلٍ بِدونِ هاتِفي.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'What was the hardest moment, and what did I learn from it?', labelAr: 'ما كانَت أصعَبُ لَحظَة، وماذا تَعَلَّمتُ مِنها؟', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day20', dayNumber: 20, titleEn: 'The Sustainable Plan', titleAr: 'الخُطَّةُ المُستَدامَة', introEn: 'Based on everything you have learned, design your sustainable digital life. Not perfect — sustainable. What boundaries will you keep? What habits are worth maintaining?', introAr: 'بِناءً عَلى كُلِّ ما تَعَلَّمتَه، صَمِّمْ حَياتَكَ الرَّقمِيَّةَ المُستَدامَة. لَيسَت مِثالِيَّة — مُستَدامَة. أيُّ الحُدودِ ستُبقيها؟ أيُّ العاداتِ تَستَحِقُّ الحِفاظَ عَلَيها؟', intentionEn: 'Today I write my digital life manifesto.', intentionAr: 'اليَومَ أكتُبُ بَيانَ حَياتيَ الرَّقمِيَّة.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'My 3 non-negotiable digital boundaries going forward:', labelAr: 'حُدودي الرَّقمِيَّةُ الثَّلاثَةُ غَيرُ القابِلَةِ لِلتَّفاوُضِ مِنَ الآن:', type: 'text' }] },
        { kind: 'journal-day', id: 's5-day21', dayNumber: 21, titleEn: 'The Mirror Clears', titleAr: 'المِرآةُ تَتَّضِح', introEn: 'Day 21. You have looked honestly at your digital life for three weeks. The mirror is clearer now. What do you see?', introAr: 'اليَومُ ٢١. نَظَرتَ بِصِدقٍ إلى حَياتِكَ الرَّقمِيَّةِ لِثَلاثَةِ أسابيع. المِرآةُ أوضَحُ الآن. ماذا تَرى؟', intentionEn: 'Today I see myself clearly — and I choose differently.', intentionAr: 'اليَومَ أرى نَفسي بِوُضوح — وأختارُ بِشَكلٍ مُختَلِف.', gratitudeCount: 3, eveningPrompts: [{ labelEn: 'The person I was 21 days ago vs. the person I am now:', labelAr: 'الشَّخصُ الَّذي كُنتُهُ قَبلَ ٢١ يَومًا مُقابِلَ الشَّخصِ الَّذي أنا عَلَيهِ الآن:', type: 'text' }, { labelEn: 'One thing I will carry forward from this experience:', labelAr: 'شَيءٌ واحِدٌ سَأحمِلُهُ مَعي مِن هذِهِ التَّجرِبَة:', type: 'text' }] },

        /* ── Final Summary ── */
        {
          kind: 'progress-summary',
          id: 's5-final-summary',
          titleEn: '21-Day Reset · Final Summary',
          titleAr: 'إعادَةُ الضَّبطِ لِمُدَّةِ ٢١ يَومًا · المُلَخَّصُ النِّهائِيّ',
          fields: [
            { labelEn: 'The biggest shift in my digital habits:', labelAr: 'أكبَرُ تَحَوُّلٍ في عاداتيَ الرَّقمِيَّة:', type: 'text' },
            { labelEn: 'What I now understand about why I use my phone:', labelAr: 'ما أفهَمُهُ الآنَ عَن سَبَبِ استِخدامي لِهاتِفي:', type: 'text' },
            { labelEn: 'My confidence in maintaining these changes:', labelAr: 'ثِقَتي في الحِفاظِ عَلى هذِهِ التَّغييرات:', type: 'scale', options: [{ en: 'Not confident yet', ar: 'لَستُ واثِقًا بَعد' }, { en: 'Somewhat confident', ar: 'واثِقٌ إلى حَدٍّ ما' }, { en: 'Very confident', ar: 'واثِقٌ جِدًّا' }] },
          ],
        },

        /* ── Letter to Future Self ── */
        {
          kind: 'letter-prompt',
          id: 's5-letter',
          titleEn: 'Letter to My Future Digital Self',
          titleAr: 'رِسالَةٌ إلى ذاتيَ الرَّقمِيَّةِ المُستَقبَلِيَّة',
          salutationEn: 'Dear future me,',
          salutationAr: 'عَزيزيَ أنا المُستَقبَلِيّ،',
          descriptionEn: 'Write to the version of yourself who might slip back into old patterns. Remind them of what you discovered, what changed, and what is worth protecting.',
          descriptionAr: 'اكتُبْ لِلنُّسخَةِ مِنكَ الَّتي قَد تَنزَلِقُ مَرَّةً أُخرى إلى الأنماطِ القَديمَة. ذَكِّرها بِما اكتَشَفتَه، وما تَغَيَّر، وما يَستَحِقُّ الحِمايَة.',
          lines: 15,
        },
      ],
    },
  ],
};

export default toolkit;
