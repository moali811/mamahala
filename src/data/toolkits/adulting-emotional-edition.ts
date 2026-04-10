import type { ToolkitMeta } from '@/types/toolkit';

/* ================================================================
   ADULTING 101: THE EMOTIONAL EDITION — Premium Toolkit
   The emotional-skills curriculum nobody taught you in school.

     Part 1: Emotional Literacy        [FREE PREVIEW]
     Part 2: Boundaries Without Guilt  [LOCKED]
     Part 3: Asking for Help           [LOCKED]
     Part 4: Sitting With Discomfort   [LOCKED]
     Part 5: Your Emotional Toolkit    [LOCKED]
   ================================================================ */

const toolkit: ToolkitMeta = {
  slug: 'adulting-emotional-edition',
  titleEn: 'Adulting 101: The Emotional Edition',
  titleAr: 'دَليلُ الكِبار ١٠١: النُّسْخَةُ العاطِفِيَّة',
  subtitleEn: 'The Emotional Skills Nobody Taught You in School',
  subtitleAr: 'المَهاراتُ العاطِفِيَّةُ الَّتي لَمْ يُعَلِّمْها لَكَ أَحَدٌ في المَدْرَسَة',
  descriptionEn:
    'You learned algebra, history, and how to write an essay. But nobody taught you how to sit with uncomfortable emotions, how to set boundaries without guilt, or how to ask for help without feeling like a failure.\n\nThis is the curriculum that was missing from your education. These are the skills that actually determine your quality of life, your relationships, your career satisfaction, and your sense of self.\n\nIf you\'re a brilliant student or young professional who feels lost when it comes to managing your inner world — you\'re not behind. You\'re simply learning something that was never taught.',
  descriptionAr:
    'تَعَلَّمْتَ الجَبْرَ والتّاريخَ وكَيْفَ تَكْتُبُ مَقالاً. لكِنْ لَمْ يُعَلِّمْكَ أَحَدٌ كَيْفَ تَجْلِسُ مَعَ المَشاعِرِ غَيْرِ المُريحَة، أَوْ كَيْفَ تَضَعُ حُدوداً بِلا شُعورٍ بِالذَّنْب، أَوْ كَيْفَ تَطْلُبُ المُساعَدَةَ بِلا شُعورٍ بِأَنَّكَ فاشِل.\n\nهذا هُوَ المَنْهَجُ الَّذي كانَ ناقِصاً مِنْ تَعْليمِك. هذِهِ هي المَهاراتُ الَّتي تُحَدِّدُ فِعْلاً جَوْدَةَ حَياتِك، وعَلاقاتِك، ورِضاكَ المِهَنِيّ، وإِحْساسَكَ بِذاتِك.\n\nإِذا كُنْتَ طالِباً لامِعاً أَوْ مِهَنِيّاً شابّاً يَشْعُرُ بِالضَّياعِ حينَ يَتَعَلَّقُ الأَمْرُ بِإِدارَةِ عالَمِكَ الدّاخِلِيّ — فَأَنْتَ لَسْتَ مُتَأَخِّراً. أَنْتَ فَقَطْ تَتَعَلَّمُ شَيْئاً لَمْ يُعَلَّمْ أَبَداً.',
  author: 'Dr. Hala Ali',
  category: 'adults',
  format: 'guide',
  color: '#5A8B6F',
  heroQuoteEn: "You are not behind. You are simply learning something that was never taught.",
  heroQuoteAr: 'أَنْتَ لَسْتَ مُتَأَخِّراً. أَنْتَ فَقَطْ تَتَعَلَّمُ شَيْئاً لَمْ يُعَلَّمْ أَبَداً.',
  isPremium: true,
  priceCAD: 19,
  freePreviewSectionId: 'emotional-literacy',

  howToUse: [
    {
      iconName: 'brain',
      labelEn: 'Pick ONE part, not all of them',
      labelAr: 'اِخْتَرْ جُزْءاً واحِداً، لا كُلَّها',
      descEn: "Start where you feel most stuck right now. The goal isn't to finish the guide — it's to change one thing about how you handle your inner world.",
      descAr: 'اِبْدَأْ مِنْ حَيْثُ تَشْعُرُ بِأَنَّكَ عالِقٌ أَكْثَر. الهَدَفُ لَيْسَ إِنْهاءَ الدَّليل — بَلْ تَغْييرُ شَيْءٍ واحِدٍ في كَيْفَ تَتَعامَلُ مَعَ عالَمِكَ الدّاخِلِيّ.',
    },
    {
      iconName: 'pen-line',
      labelEn: 'Actually do the exercises',
      labelAr: 'اِفْعَلِ التَّمارينَ فِعْلاً',
      descEn: "Reading about emotional skills doesn't build them. Doing them does. Even 5 minutes a day changes your nervous system over weeks.",
      descAr: 'القِراءَةُ عَنِ المَهاراتِ العاطِفِيَّةِ لا تَبْنيها. فِعْلُها يَبْنيها. حَتّى ٥ دَقائِقَ يَوْمِيّاً تُغَيِّرُ جِهازَكَ العَصَبِيَّ عَلى مَدى أَسابيع.',
    },
    {
      iconName: 'lock',
      labelEn: 'Privacy is non-negotiable',
      labelAr: 'الخُصوصِيَّةُ غَيْرُ قابِلَةٍ لِلتَّفاوُض',
      descEn: "What you write here is for you only. That freedom to be honest with yourself is what makes the practice work.",
      descAr: 'ما تَكْتُبُهُ هُنا لَكَ فَقَط. تِلْكَ الحُرِّيَّةُ لِلصِّدْقِ مَعَ نَفْسِكَ هي ما يَجْعَلُ المُمارَسَةَ تَنْجَح.',
    },
    {
      iconName: 'heart',
      labelEn: 'Your feelings are information, not enemies',
      labelAr: 'مَشاعِرُكَ مَعْلوماتٌ لا أَعْداء',
      descEn: 'Every emotion is telling you something about what you need. Your job is to listen, not to silence it.',
      descAr: 'كُلُّ عاطِفَةٍ تُخْبِرُكَ شَيْئاً عَمّا تَحْتاج. مُهِمَّتُكَ هي الاِسْتِماع، لا الإِسْكات.',
    },
    {
      iconName: 'sparkles',
      labelEn: "Come back when life gets hard",
      labelAr: 'عُدْ حينَ تَصْعُبُ الحَياة',
      descEn: "Reading this once isn't the point. Bookmark it. Come back during breakups, burnout, crisis. That's when the practices do their real work.",
      descAr: 'قِراءَةُ هذا مَرَّةً لَيْسَتِ المَقْصود. ضَعْ إِشارَةً مَرْجِعِيَّة. عُدْ خِلالَ الاِنْفِصالِ، الإِرْهاقِ، الأَزَمات. هُناكَ تَقومُ المُمارَساتُ بِعَمَلِها الحَقيقِيّ.',
    },
  ],

  sections: [
    /* ================================================================
       PART 1: Emotional Literacy — FREE PREVIEW
       ================================================================ */
    {
      id: 'emotional-literacy',
      titleEn: 'Part 1 · Emotional Literacy',
      titleAr: 'الجُزْءُ الأَوَّل · الإِلْمامُ العاطِفِيّ',
      subtitleEn: 'Learning to read yourself',
      subtitleAr: 'تَعَلَّمْ أَنْ تَقْرَأَ نَفْسَك',
      color: '#5A8B6F',
      blocks: [
        {
          kind: 'paragraph',
          id: 's1-intro',
          textEn:
            "Most people operate with about five emotion words: happy, sad, angry, anxious, and fine. But emotional literacy means having a richer vocabulary. Research shows that the more precisely you can name what you feel, the better you can manage it. Psychologists call this \"affect labeling,\" and brain-imaging studies show it actually reduces the intensity of the emotion.",
          textAr:
            'مُعْظَمُ النّاسِ يَعْمَلونَ بِخَمْسِ كَلِماتٍ عاطِفِيَّةٍ تَقْريباً: سَعيد، حَزين، غاضِب، قَلِق، وبِخَيْر. لكِنَّ الإِلْمامَ العاطِفِيَّ يَعْني امْتِلاكَ مُفْرَداتٍ أَغْنى. تُظْهِرُ الأَبْحاثُ أَنَّهُ كُلَّما اسْتَطَعْتَ تَسْمِيَةَ ما تَشْعُرُ بِهِ بِدِقَّةٍ أَكْبَر، كُنْتَ أَفْضَلَ في إِدارَتِه. يُسَمّي عُلَماءُ النَّفْسِ هذا "تَسْمِيَةَ التَّأْثير"، وتُظْهِرُ دِراساتُ التَّصْويرِ الدِّماغِيِّ أَنَّها تُقَلِّلُ فِعْلاً مِنْ شِدَّةِ العاطِفَة.',
          tone: 'lead',
        },
        {
          kind: 'pullquote',
          id: 's1-pullquote',
          textEn: 'The more precisely you can name what you feel, the more choice you have about what to do with it.',
          textAr: 'كُلَّما اسْتَطَعْتَ تَسْمِيَةَ ما تَشْعُرُ بِهِ بِدِقَّةٍ أَكْبَر، كانَ لَدَيْكَ خِيارٌ أَوْسَعُ فيما تَفْعَلُهُ بِه.',
        },

        /* ── The Emotion Spectrum ── */
        {
          kind: 'heading',
          id: 's1-spectrum-heading',
          level: 2,
          textEn: 'The Emotion Spectrum · Beyond "sad, mad, fine"',
          textAr: 'طَيْفُ العَواطِف · أَبْعَدُ مِنْ "حَزين، غاضِب، بِخَيْر"',
        },
        {
          kind: 'tabs',
          id: 's1-spectrum-tabs',
          tabs: [
            {
              labelEn: 'Instead of "sad"',
              labelAr: 'بَدَلاً مِنْ "حَزين"',
              children: [
                {
                  kind: 'checklist',
                  id: 's1-sad',
                  titleEn: 'Try one of these',
                  titleAr: 'جَرِّبْ واحِداً مِنْ هذِهِ',
                  itemsEn: [
                    'Disappointed — you expected something and it didn\'t happen',
                    'Grieving — you\'re processing a loss, even a small one',
                    'Lonely — you\'re surrounded by people but feel disconnected',
                    'Nostalgic — you miss a version of your life that no longer exists',
                    'Hopeless — you can\'t see a path forward right now',
                    'Melancholic — a quiet, low-grade sadness without a clear trigger',
                  ],
                  itemsAr: [
                    'مُحْبَط — تَوَقَّعْتَ شَيْئاً ولَمْ يَحْدُث',
                    'حَزين عَلى فَقْد — تُعالِجُ خَسارَة، حَتّى لَوْ صَغيرَة',
                    'وَحيد — أَنْتَ مُحاطٌ بِالنّاسِ لكِنَّكَ تَشْعُرُ بِالاِنْفِصال',
                    'مُتَحَسِّرٌ عَلى الماضي — تَفْتَقِدُ نُسْخَةً مِنْ حَياتِكَ لَمْ تَعُدْ مَوْجودَة',
                    'يائِس — لا تَرى طَريقاً لِلأَمامِ الآن',
                    'مُكْتَئِبٌ بِشَكْلٍ خَفيف — حُزْنٌ هادِئٌ بِلا مُحَفِّزٍ واضِح',
                  ],
                },
              ],
            },
            {
              labelEn: 'Instead of "angry"',
              labelAr: 'بَدَلاً مِنْ "غاضِب"',
              children: [
                {
                  kind: 'checklist',
                  id: 's1-angry',
                  titleEn: 'Try one of these',
                  titleAr: 'جَرِّبْ واحِداً مِنْ هذِهِ',
                  itemsEn: [
                    'Frustrated — something is blocking your progress',
                    'Resentful — you feel someone has taken advantage of you',
                    'Betrayed — trust was broken',
                    'Disrespected — your dignity was not honored',
                    'Overwhelmed — there\'s too much and you\'re expressing it as anger',
                    'Protective — you\'re angry on behalf of someone you love',
                  ],
                  itemsAr: [
                    'مُحْبَط — شَيْءٌ ما يَسُدُّ طَريقَ تَقَدُّمِك',
                    'مُسْتاء — تَشْعُرُ أَنَّ شَخْصاً اِسْتَغَلَّك',
                    'مَخْدوع — الثِّقَةُ كُسِرَت',
                    'مُهان — كَرامَتُكَ لَمْ تُحْتَرَم',
                    'مُرْهَق — هُناكَ الكَثيرُ وأَنْتَ تُعَبِّرُ عَنْهُ كَغَضَب',
                    'حامٍ — أَنْتَ غاضِبٌ مِنْ أَجْلِ شَخْصٍ تُحِبُّه',
                  ],
                },
              ],
            },
            {
              labelEn: 'Instead of "anxious"',
              labelAr: 'بَدَلاً مِنْ "قَلِق"',
              children: [
                {
                  kind: 'checklist',
                  id: 's1-anxious',
                  titleEn: 'Try one of these',
                  titleAr: 'جَرِّبْ واحِداً مِنْ هذِهِ',
                  itemsEn: [
                    "Uncertain — you don't know what will happen and it scares you",
                    'Pressured — external expectations are weighing on you',
                    'Hypervigilant — you\'re scanning for danger even when you\'re safe',
                    'Anticipatory — you\'re dreading something that hasn\'t happened yet',
                    'Perfectionist — you\'re afraid of not being good enough',
                  ],
                  itemsAr: [
                    'غَيْرُ مُتَأَكِّد — لا تَعْرِفُ ما سَيَحْدُثُ وهذا يُخيفُك',
                    'تَحْتَ ضَغْط — تَوَقُّعاتٌ خارِجِيَّةٌ تُثْقِلُ كاهِلَك',
                    'مُفْرَطُ اليَقَظَة — تَبْحَثُ عَنِ الخَطَرِ حَتّى حينَ تَكونُ آمِناً',
                    'مُتَوَقِّع — تَرْهَبُ شَيْئاً لَمْ يَحْدُثْ بَعْد',
                    'مِثالِيّ — تَخافُ مِنْ أَنْ لا تَكونَ جَيِّداً بِما يَكْفي',
                  ],
                },
              ],
            },
          ],
        },

        /* ── Three-Times Check-In ── */
        {
          kind: 'heading',
          id: 's1-checkin-heading',
          level: 2,
          textEn: 'Daily Practice · The Three-Times Check-In',
          textAr: 'مُمارَسَةٌ يَوْمِيَّة · فَحْصٌ ثَلاثُ مَرّات',
        },
        {
          kind: 'paragraph',
          id: 's1-checkin-intro',
          textEn:
            'Three times a day — morning, afternoon, and before bed — pause and answer three questions. Keep a note on your phone for one week. At the end of the week, look for patterns. You\'ll be surprised at what you discover about yourself.',
          textAr:
            'ثَلاثَ مَرّاتٍ في اليَوْم — صَباحاً، ظَهْراً، وقَبْلَ النَّوْم — تَوَقَّفْ وأَجِبْ عَلى ثَلاثَةِ أَسْئِلَة. اِحْتَفِظْ بِمُلاحَظَةٍ عَلى هاتِفِكَ لِمُدَّةِ أُسْبوع. في نِهايَةِ الأُسْبوع، اِبْحَثْ عَنْ أَنْماط. سَتُفاجَأُ بِما تَكْتَشِفُهُ عَنْ نَفْسِك.',
        },
        {
          kind: 'icon-grid',
          id: 's1-checkin-grid',
          columns: 3,
          items: [
            {
              iconName: 'sun',
              labelEn: 'Morning',
              labelAr: 'الصَّباح',
              descEn: 'What am I feeling? What do I need today? One intention I want to carry.',
              descAr: 'بِماذا أَشْعُر؟ ماذا أَحْتاجُ اليَوْم؟ نِيَّةٌ واحِدَةٌ أُريدُ حَمْلَها.',
            },
            {
              iconName: 'eye',
              labelEn: 'Afternoon',
              labelAr: 'بَعْدَ الظَّهْر',
              descEn: 'What am I feeling now? Where do I feel it in my body? What triggered it?',
              descAr: 'بِماذا أَشْعُرُ الآن؟ أَيْنَ أَشْعُرُ بِهِ في جَسَدي؟ ما الَّذي حَفَّزَه؟',
            },
            {
              iconName: 'moon',
              labelEn: 'Before bed',
              labelAr: 'قَبْلَ النَّوْم',
              descEn: 'What went well? What was hard? What am I grateful for?',
              descAr: 'ما الَّذي سارَ جَيِّداً؟ ما كانَ صَعْباً؟ عَلى ماذا أَنا مُمْتَنّ؟',
            },
          ],
        },
        {
          kind: 'reflection-prompt',
          id: 's1-checkin-practice',
          promptEn: 'Right now · what are you actually feeling? Go beyond "fine." Use a specific word from the spectrum above. Where do you feel it in your body? What triggered it?',
          promptAr: 'الآن · بِماذا تَشْعُرُ فِعْلاً؟ تَجاوَزْ "بِخَيْر". اِسْتَخْدِمْ كَلِمَةً مُحَدَّدَةً مِنَ الطَّيْفِ أَعْلاه. أَيْنَ تَشْعُرُ بِهِ في جَسَدِكَ؟ ما الَّذي حَفَّزَه؟',
          minWords: 40,
        },
      ],
    },

    /* ================================================================
       PART 2: Boundaries Without Guilt — LOCKED
       ================================================================ */
    {
      id: 'boundaries',
      titleEn: 'Part 2 · Boundaries Without Guilt',
      titleAr: 'الجُزْءُ الثّاني · حُدودٌ بِلا شُعورٍ بِالذَّنْب',
      subtitleEn: 'Fences with gates, not walls',
      subtitleAr: 'أَسْوارٌ بِبَوّاباتٍ، لا جُدْران',
      color: '#C8A97D',
      blocks: [
        {
          kind: 'paragraph',
          id: 's2-intro',
          textEn:
            'Boundaries are not walls. They are not punishments. They are not ultimatums. They are guidelines that protect your energy, your time, and your wellbeing. They tell the world how you want to be treated. They are not selfish. They are necessary.',
          textAr:
            'الحُدودُ لَيْسَتْ جُدْراناً. لَيْسَتْ عُقوبات. لَيْسَتْ إِنْذاراتٍ نِهائِيَّة. هي إِرْشاداتٌ تَحْمي طاقَتَكَ، وَقْتَكَ، ورَفاهِيَتَك. تُخْبِرُ العالَمَ كَيْفَ تُريدُ أَنْ تُعامَل. لَيْسَتْ أَنانِيَّة. هي ضَرورِيَّة.',
          tone: 'lead',
        },
        {
          kind: 'pullquote',
          id: 's2-quote',
          textEn:
            'Think of a boundary as a fence with a gate. The fence defines your space. The gate means you choose who enters and when.',
          textAr: 'فَكِّرْ في الحَدِّ كَسورٍ بِبَوّابَة. السّورُ يُعَرِّفُ مِساحَتَك. البَوّابَةُ تَعْني أَنْتَ تَخْتارُ مَنْ يَدْخُلُ ومَتى.',
        },

        {
          kind: 'heading',
          id: 's2-situations-heading',
          level: 2,
          textEn: 'Common Boundary Situations for Young Adults',
          textAr: 'مَواقِفُ الحُدودِ الشّائِعَةُ لِلشَّبابِ البالِغين',
        },
        {
          kind: 'checklist',
          id: 's2-situations',
          titleEn: 'Which of these do YOU struggle with?',
          titleAr: 'أَيٌّ مِنْ هذِهِ تُعاني أَنْتَ مِنْها؟',
          itemsEn: [
            'Saying no to social plans when you need rest, even when FOMO is screaming',
            'Telling a family member you cannot lend them money, even when culture says you should',
            'Setting work hours and not responding to messages at midnight',
            'Declining emotional labor you don\'t have capacity for',
            'Limiting time with people who drain your energy, even if they\'re family',
            'Keeping your grades, salary, or relationship status private when relatives ask',
            'Saying "I need to think about it" instead of automatically saying yes',
          ],
          itemsAr: [
            'قَوْلُ لا لِخُطَطٍ اِجْتِماعِيَّةٍ حينَ تَحْتاجُ الرّاحَة، حَتّى حينَ يَصْرُخُ الخَوْفُ مِنَ الضَّياع',
            'إِخْبارُ فَرْدٍ مِنَ العائِلَةِ أَنَّكَ لا تَسْتَطيعُ إِقْراضَهُمْ مالاً، حَتّى حينَ تَقولُ الثَّقافَةُ أَنَّ عَلَيْكَ ذلِك',
            'تَحْديدُ ساعاتِ العَمَلِ وعَدَمُ الرَّدِّ عَلى الرَّسائِلِ في مُنْتَصَفِ اللَّيْل',
            'رَفْضُ العَمَلِ العاطِفِيِّ الَّذي لَيْسَ لَدَيْكَ القُدْرَةُ عَلَيْه',
            'تَحْديدُ الوَقْتِ مَعَ أُناسٍ يَسْتَنْزِفونَ طاقَتَك، حَتّى لَوْ كانوا عائِلَة',
            'إِبْقاءُ دَرَجاتِك، راتِبِك، أَوْ وَضْعِكَ العاطِفِيِّ خاصّاً حينَ يَسْأَلُ الأَقارِب',
            'قَوْلُ "أَحْتاجُ أَنْ أُفَكِّرَ في الأَمْر" بَدَلاً مِنَ القَوْلِ "نَعَم" تِلْقائِيّاً',
          ],
        },

        /* ── The Boundary Script ── */
        {
          kind: 'heading',
          id: 's2-script-heading',
          level: 2,
          textEn: 'The Boundary Script',
          textAr: 'نَصُّ الحُدود',
        },
        {
          kind: 'callout',
          id: 's2-script-callout',
          variant: 'dr-hala',
          textEn:
            'Use this template: "I care about you, and I need to be honest. [State the boundary clearly]. This is not about you doing something wrong. It is about what I need to be okay."',
          textAr:
            'اِسْتَخْدِمْ هذا القالِب: "أَنا أَهْتَمُّ بِك، وأَحْتاجُ أَنْ أَكونَ صادِقاً. [اِذْكُرِ الحَدَّ بِوُضوح]. هذا لَيْسَ عَنْكَ تَفْعَلُ شَيْئاً خاطِئاً. بَلْ عَمّا أَحْتاجُهُ لِأَكونَ بِخَيْر."',
        },
        {
          kind: 'info-card-pair',
          id: 's2-examples',
          cards: [
            {
              titleEn: 'With money',
              titleAr: 'مَعَ المال',
              bodyEn: '"I care about our friendship, and I need to be honest. I cannot keep lending money. This is not about you doing something wrong. It is about what I need to feel financially safe."',
              bodyAr: '"أَهْتَمُّ بِصَداقَتِنا، وأَحْتاجُ أَنْ أَكونَ صادِقاً. لا أَسْتَطيعُ الاِسْتِمْرارَ في إِقْراضِ المال. هذا لَيْسَ عَنْكَ تَفْعَلُ شَيْئاً خاطِئاً. بَلْ عَمّا أَحْتاجُهُ لِأَشْعُرَ بِالأَمانِ المالِيّ."',
              color: '#5A8B6F',
            },
            {
              titleEn: 'With family time',
              titleAr: 'مَعَ وَقْتِ العائِلَة',
              bodyEn: '"I love our family dinners, and I need Sundays to rest. Can we do every other week instead?"',
              bodyAr: '"أُحِبُّ عَشاءاتِ عائِلَتِنا، وأَحْتاجُ الآحادَ لِلرّاحَة. هَلْ يُمْكِنُنا فِعْلُها كُلَّ أُسْبوعَيْنِ بَدَلاً مِنْ ذلِك؟"',
              color: '#C4878A',
            },
          ],
        },
        {
          kind: 'callout',
          id: 's2-inherited-guilt',
          variant: 'insight',
          textEn:
            "Why it feels so hard: if you grew up in a family where boundaries weren't modeled, setting them as an adult will feel deeply uncomfortable. That discomfort isn't a sign you're doing something wrong — it's a sign you're doing something NEW. The guilt is often inherited. It belongs to the system you grew up in, not to the person you're becoming.",
          textAr:
            'لِماذا يَبْدو الأَمْرُ صَعْباً: إِذا نَشَأْتَ في عائِلَةٍ لَمْ تُقَدَّمْ فيها نَماذِجُ لِلحُدود، فَوَضْعُها كَبالِغٍ سَيَبْدو غَيْرَ مُريحٍ بِعُمْق. ذلِكَ الاِنْزِعاجُ لَيْسَ عَلامَةً أَنَّكَ تَفْعَلُ شَيْئاً خاطِئاً — بَلْ هُوَ عَلامَةٌ أَنَّكَ تَفْعَلُ شَيْئاً جَديداً. الذَّنْبُ غالِباً مَوْروث. يَنْتَمي إِلى النِّظامِ الَّذي نَشَأْتَ فيه، لا إِلى الشَّخْصِ الَّذي تُصْبِحُه.',
        },

        /* ── Boundary audit ── */
        {
          kind: 'heading',
          id: 's2-audit-heading',
          level: 2,
          textEn: 'Weekly Boundary Audit',
          textAr: 'تَدْقيقُ الحُدودِ الأُسْبوعِيّ',
        },
        {
          kind: 'reflection-prompt',
          id: 's2-audit-1',
          promptEn: 'This week, I said yes when I meant no in this situation:',
          promptAr: 'هذا الأُسْبوع، قُلْتُ نَعَم بَيْنَما كُنْتُ أَعْني لا في هذا المَوْقِف:',
        },
        {
          kind: 'reflection-prompt',
          id: 's2-audit-2',
          promptEn: 'The person I find hardest to set boundaries with is:',
          promptAr: 'الشَّخْصُ الَّذي يَصْعُبُ عَلَيَّ وَضْعُ حُدودٍ مَعَهُ أَكْثَرَ هُوَ:',
        },
        {
          kind: 'reflection-prompt',
          id: 's2-audit-3',
          promptEn: 'The emotion I feel most when I try to set a boundary is:',
          promptAr: 'العاطِفَةُ الَّتي أَشْعُرُ بِها أَكْثَرَ حينَ أُحاوِلُ وَضْعَ حَدٍّ هي:',
        },
        {
          kind: 'reflection-prompt',
          id: 's2-audit-4',
          promptEn: 'One small boundary I want to practice next week is:',
          promptAr: 'حَدٌّ صَغيرٌ واحِدٌ أُريدُ مُمارَسَتَهُ الأُسْبوعَ القادِمَ هُوَ:',
        },
      ],
    },

    /* ================================================================
       PART 3: Asking for Help — LOCKED
       ================================================================ */
    {
      id: 'asking-help',
      titleEn: 'Part 3 · Asking for Help (Without Feeling Like a Burden)',
      titleAr: 'الجُزْءُ الثّالِث · طَلَبُ المُساعَدَة (بِدونِ الشُّعورِ بِأَنَّكَ عِبْء)',
      subtitleEn: 'A social skill, not a failure',
      subtitleAr: 'مَهارَةٌ اِجْتِماعِيَّة، لا فَشَل',
      color: '#C4878A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's3-intro',
          textEn:
            "Asking for help can feel like admitting defeat — especially if you grew up being the capable one, the independent one, or the 'you're so strong' one. For children of immigrants, first-generation students, and oldest siblings, it can feel like betraying the sacrifice your family made. If they survived so much without help, who are you to need it?",
          textAr:
            'طَلَبُ المُساعَدَةِ قَدْ يَبْدو كَاعْتِرافٍ بِالهَزيمَة — خاصَّةً إِذا نَشَأْتَ كَالشَّخْصِ القادِر، المُسْتَقِلّ، أَوِ الَّذي "أَنْتَ قَوِيٌّ جِدّاً". لِأَطْفالِ المُهاجِرين، وطُلّابِ الجيلِ الأَوَّل، والإِخْوَةِ الأَكْبَر، قَدْ يَبْدو كَخِيانَةٍ لِتَضْحِيَةِ عائِلَتِك. إِذا نَجَوْا مِنَ الكَثيرِ بِلا مُساعَدَة، فَمَنْ أَنْتَ لِتَحْتاجَها؟',
          tone: 'lead',
        },
        {
          kind: 'pullquote',
          id: 's3-reframe',
          textEn:
            'Asking for help is not a sign of weakness. It is a social skill and a survival strategy. The people who recover fastest from setbacks are not the ones who white-knuckle through alone.',
          textAr: 'طَلَبُ المُساعَدَةِ لَيْسَ عَلامَةَ ضَعْف. هي مَهارَةٌ اِجْتِماعِيَّةٌ واسْتِراتيجِيَّةُ بَقاء. الأَشْخاصُ الَّذينَ يَتَعافَوْنَ أَسْرَعَ مِنَ النَّكَساتِ لَيْسوا الَّذينَ يَتَشَبَّثونَ وَحْدَهُم.',
        },

        {
          kind: 'heading',
          id: 's3-how-heading',
          level: 2,
          textEn: 'How to Ask Well',
          textAr: 'كَيْفَ تَطْلُبُ بِشَكْلٍ جَيِّد',
        },
        {
          kind: 'icon-grid',
          id: 's3-how-grid',
          columns: 1,
          items: [
            {
              iconName: 'target',
              labelEn: '1. Be specific',
              labelAr: '١. كُنْ مُحَدَّداً',
              descEn: 'Instead of "I need help," try "Can you help me review my resume this week?" Vague requests make people anxious.',
              descAr: 'بَدَلاً مِنْ "أَحْتاجُ المُساعَدَة"، جَرِّبْ "هَلْ يُمْكِنُكَ مُساعَدَتي في مُراجَعَةِ سيرَتي الذاتِيَّةِ هذا الأُسْبوع؟" الطَّلَباتُ الغامِضَةُ تُقْلِقُ النّاس.',
            },
            {
              iconName: 'compass',
              labelEn: '2. Choose the right person',
              labelAr: '٢. اِخْتَرِ الشَّخْصَ المُناسِب',
              descEn: 'Not everyone is equipped for every need. Your party friend isn\'t the right person to process grief with.',
              descAr: 'لَيْسَ كُلُّ شَخْصٍ مُجَهَّزاً لِكُلِّ حاجَة. صَديقُ حَفَلاتِكَ لَيْسَ الشَّخْصَ المُناسِبَ لِمُعالَجَةِ الحُزْن.',
            },
            {
              iconName: 'message-circle',
              labelEn: '3. Name what you need',
              labelAr: '٣. سَمِّ ما تَحْتاج',
              descEn: 'Advice? Listening? Practical help? Tell them: "I don\'t need you to fix this. I just need you to listen."',
              descAr: 'نَصيحَة؟ اِسْتِماع؟ مُساعَدَةٌ عَمَلِيَّة؟ أَخْبِرْهُم: "لا أَحْتاجُ مِنْكَ إِصْلاحَ هذا. أَحْتاجُكَ فَقَطْ أَنْ تَسْتَمِعَ."',
            },
            {
              iconName: 'heart',
              labelEn: '4. Accept the help',
              labelAr: '٤. اِقْبَلِ المُساعَدَة',
              descEn: 'When someone shows up, let them. Don\'t minimize it. Don\'t immediately try to pay them back. Just: "thank you, that meant a lot."',
              descAr: 'حينَ يَظْهَرُ شَخْصٌ، دَعْه. لا تُقَلِّلْ مِنَ الأَمْر. لا تُحاوِلِ السَّدادَ فَوْراً. فَقَط: "شُكْراً، كانَ ذلِكَ يَعْني الكَثير."',
            },
            {
              iconName: 'sparkles',
              labelEn: '5. Practice with small asks first',
              labelAr: '٥. تَدَرَّبْ بِطَلَباتٍ صَغيرَةٍ أَوَّلاً',
              descEn: 'Ask a classmate for notes. Ask a friend for a ride. Build the muscle before you need it for something big.',
              descAr: 'اِطْلُبْ مِنْ زَميلٍ مُلاحَظات. اِطْلُبْ مِنْ صَديقٍ تَوْصيلَة. اِبْنِ العَضَلَةَ قَبْلَ أَنْ تَحْتاجَها لِشَيْءٍ كَبير.',
            },
          ],
        },

        /* ── Help Network Map ── */
        {
          kind: 'heading',
          id: 's3-network-heading',
          level: 2,
          textEn: 'Your Help Network Map',
          textAr: 'خَريطَةُ شَبَكَةِ دَعْمِك',
        },
        {
          kind: 'paragraph',
          id: 's3-network-intro',
          textEn:
            'Draw three concentric circles. If your inner circle is empty, that\'s important information, not a personal failure. Start by moving ONE person from your middle circle inward.',
          textAr:
            'اِرْسُمْ ثَلاثَ دَوائِرَ مُتَّحِدَةِ المَرْكَز. إِذا كانَتْ دائِرَتُكَ الدّاخِلِيَّةُ فارِغَة، فَتِلْكَ مَعْلومَةٌ مُهِمَّة، لا فَشَلٌ شَخْصِيّ. اِبْدَأْ بِنَقْلِ شَخْصٍ واحِدٍ مِنْ دائِرَتِكَ الوُسْطى إِلى الدّاخِل.',
        },
        {
          kind: 'fillable-table',
          id: 's3-network-table',
          titleEn: 'Map your circles',
          titleAr: 'اِرْسُمْ خَريطَةَ دَوائِرِك',
          columns: [
            { headerEn: 'Circle', headerAr: 'الدّائِرَة' },
            { headerEn: 'Who belongs here?', headerAr: 'مَنْ يَنْتَمي هُنا؟' },
            { headerEn: 'For what kind of support?', headerAr: 'لِأَيِّ نَوْعٍ مِنَ الدَّعْم؟' },
          ],
          rows: 3,
        },
        {
          kind: 'reflection-prompt',
          id: 's3-one-move',
          promptEn: 'One person I want to move from my middle circle to my inner circle this year is… and the small step that would start that shift is…',
          promptAr: 'شَخْصٌ واحِدٌ أُريدُ نَقْلَهُ مِنْ دائِرَتي الوُسْطى إِلى دائِرَتي الدّاخِلِيَّة هذِهِ السَّنَة هُوَ… والخُطْوَةُ الصَّغيرَةُ الَّتي سَتَبْدَأُ ذلِكَ التَّحَوُّلَ هي…',
        },
      ],
    },

    /* ================================================================
       PART 4: Sitting With Discomfort — LOCKED
       ================================================================ */
    {
      id: 'sitting-discomfort',
      titleEn: 'Part 4 · Sitting With Discomfort',
      titleAr: 'الجُزْءُ الرّابِع · الجُلوسُ مَعَ الاِنْزِعاج',
      subtitleEn: 'Distress tolerance is a life skill',
      subtitleAr: 'تَحَمُّلُ الضّيقِ مَهارَةُ حَياة',
      color: '#D4836A',
      blocks: [
        {
          kind: 'paragraph',
          id: 's4-intro',
          textEn:
            "Most of us spend enormous energy avoiding uncomfortable emotions. We scroll for hours. We binge-watch shows we don't even enjoy. We over-work until we crash. These strategies work — temporarily. But they don't resolve the underlying feeling. Over time, avoidance makes the feeling BIGGER, not smaller.",
          textAr:
            'مُعْظَمُنا يَقْضي طاقَةً هائِلَةً في تَجَنُّبِ المَشاعِرِ غَيْرِ المُريحَة. نَمْرُرُ الشّاشاتِ لِساعات. نُشاهِدُ مُسَلْسَلاتٍ لا نَسْتَمْتِعُ بِها. نَعْمَلُ بِإِفْراطٍ حَتّى نَنْهار. هذِهِ الاِسْتِراتيجِيّاتُ تَعْمَل — مُؤَقَّتاً. لكِنَّها لا تَحُلُّ الشُّعورَ الأَساسِيّ. مَعَ الوَقْت، التَّجَنُّبُ يَجْعَلُ الشُّعورَ أَكْبَر، لا أَصْغَر.',
          tone: 'lead',
        },
        {
          kind: 'pullquote',
          id: 's4-quote',
          textEn: 'The emotion you refuse to feel does not disappear. It waits.',
          textAr: 'العاطِفَةُ الَّتي تَرْفُضُ أَنْ تَشْعُرَ بِها لا تَخْتَفي. إِنَّها تَنْتَظِر.',
        },

        /* ── RAIN Technique ── */
        {
          kind: 'heading',
          id: 's4-rain-heading',
          level: 2,
          textEn: 'The RAIN Technique',
          textAr: 'تِقْنِيَةُ RAIN',
        },
        {
          kind: 'cycle-diagram',
          id: 's4-rain-diagram',
          titleEn: 'Four steps for sitting with a difficult emotion',
          titleAr: 'أَرْبَعُ خُطُواتٍ لِلجُلوسِ مَعَ عاطِفَةٍ صَعْبَة',
          steps: [
            {
              labelEn: 'R · Recognize',
              labelAr: 'R · تَعَرَّفْ',
              descEn: "Name it specifically. 'I am feeling rejected' is more useful than 'I feel bad.'",
              descAr: 'سَمِّها بِدِقَّة. "أَشْعُرُ بِالرَّفْض" أَكْثَرُ فائِدَةً مِنْ "أَشْعُرُ بِالسّوء".',
              color: '#5A8B6F',
            },
            {
              labelEn: 'A · Allow',
              labelAr: 'A · اِسْمَحْ',
              descEn: "Don't push it away. Say: 'This feeling is here. It is allowed to be here.'",
              descAr: 'لا تُبْعِدْها. قُلْ: "هذا الشُّعورُ هُنا. مَسْموحٌ لَهُ أَنْ يَكونَ هُنا."',
              color: '#C8A97D',
            },
            {
              labelEn: 'I · Investigate',
              labelAr: 'I · حَقِّقْ',
              descEn: 'Where do you feel it in your body? What story is your mind telling? What does this feeling need?',
              descAr: 'أَيْنَ تَشْعُرُ بِهِ في جَسَدِك؟ ما القِصَّةُ الَّتي يَرْويها عَقْلُك؟ ماذا يَحْتاجُ هذا الشُّعور؟',
              color: '#C4878A',
            },
            {
              labelEn: 'N · Nurture',
              labelAr: 'N · اِرْعَ',
              descEn: 'What would you say to a friend with this feeling? Say that to yourself. Place a hand on your chest.',
              descAr: 'ماذا كُنْتَ سَتَقولُ لِصَديقٍ لَدَيْهِ هذا الشُّعور؟ قُلْ ذلِكَ لِنَفْسِك. ضَعْ يَداً عَلى صَدْرِك.',
              color: '#7A3B5E',
            },
          ],
        },
        {
          kind: 'callout',
          id: 's4-5min',
          variant: 'dr-hala',
          textEn:
            'The 5-Minute Sit · Set a timer. Sit with whatever you\'re feeling. No phone. No music. No distraction. Just you and the feeling. When the timer goes off, write one sentence about what you noticed. Five minutes is enough. Over time, your capacity grows.',
          textAr:
            'جُلوسُ الخَمْسِ دَقائِقِ · اِضْبِطْ مُؤَقِّتاً. اِجْلِسْ مَعَ ما تَشْعُرُ بِه. لا هاتِف. لا موسيقى. لا إِلْهاء. فَقَطْ أَنْتَ والشُّعور. حينَ يَنْطَلِقُ المُؤَقِّت، اُكْتُبْ جُمْلَةً واحِدَةً عَمّا لاحَظْت. خَمْسُ دَقائِقَ تَكْفي. مَعَ الوَقْت، قُدْرَتُكَ تَنْمو.',
        },
        {
          kind: 'reflection-prompt',
          id: 's4-practice',
          promptEn: 'Try the 5-Minute Sit right now. What emotion came up? Where in your body? What story did your mind tell? What did the feeling actually need?',
          promptAr: 'جَرِّبْ جُلوسَ الخَمْسِ دَقائِقِ الآن. ما العاطِفَةُ الَّتي ظَهَرَت؟ أَيْنَ في جَسَدِك؟ ما القِصَّةُ الَّتي رَواها عَقْلُك؟ ماذا اِحْتاجَ الشُّعورُ فِعْلاً؟',
          minWords: 60,
        },
      ],
    },

    /* ================================================================
       PART 5: Emotional Toolkit — LOCKED
       ================================================================ */
    {
      id: 'emotional-toolkit',
      titleEn: 'Part 5 · Building Your Emotional Toolkit',
      titleAr: 'الجُزْءُ الخامِس · بِناءُ صُنْدوقِ أَدَواتِكَ العاطِفِيَّة',
      subtitleEn: 'A first-aid kit for when emotions are high',
      subtitleAr: 'صُنْدوقُ إِسْعافٍ أَوَّلِيٍّ حينَ تَكونُ العَواطِفُ مُرْتَفِعَة',
      color: '#7A3B5E',
      blocks: [
        {
          kind: 'paragraph',
          id: 's5-intro',
          textEn:
            "When emotions flood, your brain can't think clearly enough to generate options. Having a pre-made list removes that barrier.",
          textAr:
            'حينَ تُغْرِقُكَ العَواطِف، لا يَسْتَطيعُ دِماغُكَ التَّفْكيرَ بِوُضوحٍ كافٍ لِتَوْليدِ خِيارات. وُجودُ قائِمَةٍ جاهِزَةٍ يُزيلُ ذلِكَ الحاجِز.',
          tone: 'lead',
        },
        {
          kind: 'heading',
          id: 's5-kit-heading',
          level: 2,
          textEn: 'Your Emotional First Aid Kit',
          textAr: 'صُنْدوقُ إِسْعافِكَ الأَوَّلِيُّ العاطِفِيّ',
        },
        {
          kind: 'icon-grid',
          id: 's5-kit',
          columns: 1,
          items: [
            {
              iconName: 'shield',
              labelEn: 'Calming',
              labelAr: 'تَهْدِئَة',
              descEn: '5 deep breaths · Cold water on wrists · 10-minute walk · Lavender scent · Slow stretch',
              descAr: '٥ أَنْفاسٍ عَميقَة · ماءٌ بارِدٌ عَلى المِعْصَمَيْن · مَشْيٌ ١٠ دَقائِق · رائِحَةُ اللّافِنْدَر · تَمْديدٌ بَطيء',
            },
            {
              iconName: 'heart',
              labelEn: 'Connecting',
              labelAr: 'تَواصُل',
              descEn: 'Call ONE specific person · Send a voice note · Sit with a friend · Go to a shared space',
              descAr: 'اِتَّصِلْ بِشَخْصٍ واحِدٍ مُحَدَّد · أَرْسِلْ رِسالَةً صَوْتِيَّة · اِجْلِسْ مَعَ صَديق · اِذْهَبْ إِلى مَكانٍ مُشْتَرَك',
            },
            {
              iconName: 'pen-line',
              labelEn: 'Processing',
              labelAr: 'مُعالَجَة',
              descEn: 'Journal for 10 minutes · Use the RAIN technique · Talk to yourself out loud · Voice memo to yourself',
              descAr: 'اُكْتُبْ لِـ ١٠ دَقائِق · اِسْتَخْدِمْ تِقْنِيَةَ RAIN · تَحَدَّثْ إِلى نَفْسِكَ بِصَوْتٍ عالٍ · رِسالَةٌ صَوْتِيَّةٌ لِنَفْسِك',
            },
            {
              iconName: 'flame',
              labelEn: 'Moving',
              labelAr: 'حَرَكَة',
              descEn: 'Dance to ONE song · 20 jumping jacks · 5-minute stretch · Run up stairs',
              descAr: 'اُرْقُصْ عَلى أُغْنِيَةٍ واحِدَة · ٢٠ قَفْزَة · تَمْديدٌ لِـ ٥ دَقائِق · صُعودُ دَرَج',
            },
            {
              iconName: 'compass',
              labelEn: 'Grounding (5-4-3-2-1)',
              labelAr: 'تَأْريض (٥-٤-٣-٢-١)',
              descEn: 'Name 5 things you see · 4 you hear · 3 you touch · 2 you smell · 1 you taste',
              descAr: 'سَمِّ ٥ أَشْياءَ تَراها · ٤ تَسْمَعُها · ٣ تَلْمَسُها · ٢ تَشُمُّها · ١ تَتَذَوَّقُها',
            },
          ],
        },
        {
          kind: 'reflection-prompt',
          id: 's5-my-kit',
          promptEn: 'Write YOUR emotional first aid kit — 5 specific things that actually work for you. Put this on a card in your wallet or as a note on your phone.',
          promptAr: 'اُكْتُبْ صُنْدوقَ إِسْعافِكَ العاطِفِيَّ أَنْتَ — ٥ أَشْياءَ مُحَدَّدَةٍ تَعْمَلُ فِعْلاً مَعَك. ضَعْ هذا عَلى بِطاقَةٍ في مِحْفَظَتِكَ أَوْ كَمُلاحَظَةٍ عَلى هاتِفِك.',
          minWords: 40,
        },

        /* ── When to seek support ── */
        {
          kind: 'heading',
          id: 's5-support-heading',
          level: 2,
          textEn: 'When to Seek Professional Support',
          textAr: 'مَتى تَطْلُبُ دَعْماً مِهَنِيّاً',
        },
        {
          kind: 'callout',
          id: 's5-support-callout',
          variant: 'insight',
          textEn:
            "You don't need to be in crisis to see a counselor. Consider reaching out if you're consistently struggling with regulation, your boundaries are non-existent or so rigid they isolate you, you can't remember the last time you felt genuinely at peace, or you feel like you're performing your life instead of living it.",
          textAr:
            'لَسْتَ مُضْطَرّاً أَنْ تَكونَ في أَزْمَةٍ لِرُؤْيَةِ مُسْتَشار. فَكِّرْ في التَّواصُلِ إِذا كُنْتَ تُكافِحُ بِشَكْلٍ مُسْتَمِرٍّ مَعَ التَّنْظيم، أَوْ حُدودُكَ غَيْرُ مَوْجودَةٍ أَوْ صارِمَةٌ لِدَرَجَةِ عَزْلِك، أَوْ لا تَتَذَكَّرُ آخِرَ مَرَّةٍ شَعَرْتَ فيها بِسَلامٍ حَقيقِيّ، أَوْ تَشْعُرُ أَنَّكَ تُؤَدّي حَياتَكَ بَدَلاً مِنْ أَنْ تَعيشَها.',
        },
        {
          kind: 'pullquote',
          id: 's5-close',
          textEn:
            "You are not behind. You are learning. And the fact that you picked up this guide means you have already started.",
          textAr: 'أَنْتَ لَسْتَ مُتَأَخِّراً. أَنْتَ تَتَعَلَّم. وحَقيقَةُ أَنَّكَ اِلْتَقَطْتَ هذا الدَّليلَ تَعْني أَنَّكَ قَدْ بَدَأْتَ بِالفِعْل.',
        },
      ],
    },
  ],
};

export default toolkit;
