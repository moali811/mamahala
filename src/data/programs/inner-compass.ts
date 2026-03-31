import type { AcademyProgram } from '@/types';

export const innerCompassProgram: AcademyProgram = {
  slug: 'inner-compass',
  titleEn: 'Inner Compass',
  titleAr: 'البوصلة الداخلية',
  descriptionEn: `A guided journey of self-discovery for adults who want to understand themselves more deeply, manage anxiety and stress, and build a life aligned with their authentic values.`,
  descriptionAr: `[Arabic translation needed]`,
  longDescriptionEn: `Inner Compass is a three-level personal growth program designed to help adults navigate the complexities of modern life with greater self-awareness, resilience, and purpose. Beginning with a free foundational level that explores identity, anxiety, emotional patterns, and self-compassion, the program progresses into breaking unhelpful cycles, navigating transitions, and setting healthy boundaries. The mastery level guides you toward finding your purpose, cultivating nourishing relationships, building daily resilience, and living authentically. Each module integrates evidence-based therapeutic approaches with practical tools and culturally sensitive perspectives.`,
  longDescriptionAr: `[Arabic translation needed]`,
  category: 'adults',
  image: '/images/academy/inner-compass.jpg',
  color: '#C8A97D',
  icon: 'Compass',
  isFree: false,
  priceCAD: 99,
  totalModules: 12,
  totalDurationHours: 12,
  levels: [
    // ────────────────── LEVEL 1: FOUNDATION (FREE) ──────────────────
    {
      level: 1,
      titleEn: 'Foundation',
      titleAr: 'الأساس',
      subtitleEn: 'Understanding Your Inner World',
      subtitleAr: `[Arabic translation needed]`,
      descriptionEn: `Begin your journey of self-discovery by exploring the fundamental questions of identity, understanding your relationship with anxiety, recognizing your emotional patterns, and embracing the transformative power of self-compassion.`,
      descriptionAr: `[Arabic translation needed]`,
      isFree: true,
      modules: [
        {
          slug: 'who-am-i-really',
          titleEn: 'Who Am I Really?',
          titleAr: 'من أنا حقًا؟',
          durationMinutes: 60,
          lesson: {
            contentEn: `The question "Who am I?" seems simple, yet it is one of the most profound questions a human being can ask. For many adults, identity is something that was defined by others — parents, culture, religion, career expectations — before we had the chance to explore it ourselves. The journey of self-discovery is not about rejecting who you have been. It is about consciously choosing who you want to become.

Identity is multi-layered. There is the identity you were given — your name, culture, language, family position, and the expectations attached to these. There is the identity you performed — the roles you took on to fit in, please others, or survive. And there is your authentic identity — the person you are when you feel safest, most free, and most aligned with your values.

For many people, particularly those from collectivist cultures or immigrant families, the tension between given identity and authentic identity is acute. You may have been raised to prioritize family harmony over personal desires, to value community reputation over individual expression, or to follow a career path chosen for its stability rather than its meaning. These are not inherently wrong values — but they can create an internal conflict when your inner compass points in a different direction.

Psychologist Carl Rogers introduced the concept of the "real self" versus the "ideal self." The real self is who you actually are — your genuine thoughts, feelings, and desires. The ideal self is who you believe you should be — based on social conditioning, family expectations, and cultural norms. When the gap between these two selves is large, we experience what Rogers called incongruence, which manifests as anxiety, depression, or a persistent sense that something is missing.

The path toward knowing yourself begins with honest self-inquiry. What brings you alive? What makes you lose track of time? What values feel non-negotiable, even when they are inconvenient? What aspects of your life feel authentically chosen versus inherited by default?

It also requires examining the stories you tell yourself about who you are. "I am the responsible one." "I am not creative." "I am not the kind of person who..." These narratives were often formed in childhood and reinforced over decades. They may no longer be true — but they continue to shape your behavior until you consciously examine and update them.

Self-discovery is not a destination. It is a continuous process of peeling back layers, questioning assumptions, and giving yourself permission to evolve. You are not the same person you were at twenty, and you will not be the same person at sixty. Honoring this ongoing evolution — rather than clinging to a fixed version of yourself — is the essence of authentic living.

The courage to ask "Who am I, really?" is the first step on this journey. And the beautiful truth is: you get to decide the answer.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I see so many adults in my practice who are living someone else's version of their life — not out of weakness, but out of love, duty, and cultural respect. The work of self-discovery is not about rebellion. It is about integration — honoring where you come from while giving yourself permission to choose where you are going. That is true strength.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Identity has multiple layers: given, performed, and authentic — understanding all three is key',
              `The gap between your "real self" and "ideal self" can create anxiety and a sense of something missing`,
              'Self-narratives formed in childhood continue to shape behavior until consciously examined and updated',
              'Self-discovery is a lifelong process of evolution, not a one-time event',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Complete this sentence three times, each time going deeper: "I am..." First, write what you would tell a stranger. Second, write what your closest friend knows about you. Third, write what only you know to be true about who you really are. Notice the differences between these three layers.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Identity Wheel',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Draw a circle and divide it into 8 segments representing different aspects of your identity (e.g., cultural background, career, family role, values, passions, beliefs, personality traits, dreams). For each segment, write what was given to you and what you have chosen. Circle the segments where given and chosen are in alignment. Star the segments where they feel in tension. This visual map helps you see where you are living authentically and where you might want to explore change.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is Rogers' concept of "incongruence"?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Disagreeing with your family', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The gap between your real self and who you believe you should be', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Being inconsistent in your behavior', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'A conflict between two friends', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What are the three layers of identity described in the module?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Public, private, and secret', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Given, performed, and authentic', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Past, present, and future', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Social, professional, and personal', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why might the question of identity be especially complex for people from collectivist cultures?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because collectivist cultures do not value individuality', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because there can be tension between family/community expectations and personal authenticity', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because they have fewer identity options', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because identity is not important in these cultures', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does the module say about self-discovery being a destination?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'You should reach a final answer by age 30', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Self-discovery ends when you complete therapy', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'It is a continuous, lifelong process of evolution', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'It only matters during major life crises', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if exploring my identity feels disloyal to my family or culture?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is a very common feeling, especially in cultures where family loyalty and collective identity are deeply valued. Self-discovery does not require rejecting your roots. It means understanding them more deeply and consciously choosing which aspects to carry forward. Many people find that this process actually deepens their appreciation for their heritage while giving them freedom to integrate it with their personal growth.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `I am in my 40s/50s — is it too late for self-discovery?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Absolutely not. In fact, midlife is one of the most powerful times for self-discovery. With decades of experience, you have a rich foundation of self-knowledge to draw from. Many people find that the urgency of earlier life — building careers, raising children — gave way to deeper questions about meaning and authenticity. There is no expiration date on becoming more fully yourself.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'understanding-your-anxiety',
          titleEn: 'Understanding Your Anxiety',
          titleAr: 'فهم قلقك',
          durationMinutes: 60,
          lesson: {
            contentEn: `Anxiety is one of the most common human experiences, yet it remains one of the most misunderstood. If you live with anxiety, you are not broken, weak, or overly sensitive. You are a human being with a nervous system that is working hard — sometimes too hard — to keep you safe.

At its core, anxiety is your brain's threat detection system in action. When functioning well, this system helps you avoid danger, prepare for challenges, and respond to genuine threats. But for many people, the system becomes overactive — interpreting ambiguity as danger, scanning for worst-case scenarios, and keeping the body in a state of high alert even when no real threat is present.

Understanding the physiology of anxiety helps reduce its power. When your brain perceives a threat — real or imagined — it activates the sympathetic nervous system, triggering the "fight, flight, or freeze" response. Your heart races, muscles tense, breathing quickens, and digestion slows. These sensations are deeply uncomfortable, but they are not dangerous. They are your body doing exactly what it was designed to do. The problem is that the alarm is going off when there is no fire.

There are many forms anxiety can take. Generalized anxiety involves persistent worry about multiple areas of life. Social anxiety centers on fear of judgment in social situations. Health anxiety fixates on bodily sensations and illness fears. Performance anxiety affects work, academics, or creative expression. Existential anxiety arises from deeper questions about meaning, mortality, and purpose. Understanding which form your anxiety takes helps you address it more precisely.

Cultural factors significantly shape the experience and expression of anxiety. In some cultures, anxiety is expressed primarily through physical symptoms — headaches, stomach problems, fatigue — rather than the emotional language of "worry" or "fear." This is sometimes called somatization, and it is a valid way the body communicates distress. Additionally, immigration, acculturation stress, discrimination, and the pressure of code-switching between cultural contexts can all contribute to chronic anxiety.

One of the most important shifts in understanding anxiety is moving from "What is wrong with me?" to "What happened to me?" and "What is my nervous system trying to protect me from?" Anxiety often has roots in earlier experiences — a childhood marked by unpredictability, a family culture of perfectionism, experiences of loss or displacement, or environments where emotional expression was not safe.

Anxiety is manageable. Evidence-based approaches including cognitive behavioral therapy (CBT), mindfulness-based stress reduction, and somatic experiencing offer powerful tools for calming the nervous system and changing your relationship with anxious thoughts. You do not need to eliminate anxiety entirely — the goal is to understand it, reduce its grip, and reclaim your ability to live fully despite its presence.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `When clients come to me saying "I just want to get rid of my anxiety," I gently reframe: your anxiety is not your enemy. It is a messenger. Our work together is not to silence it but to understand what it is trying to tell you and teach your nervous system that you are safe. When you befriend your anxiety rather than fighting it, something remarkable happens — it loosens its grip.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Anxiety is your brain\'s threat detection system working overtime — not a sign of weakness',
              'Understanding the physiology (fight/flight/freeze) reduces anxiety\'s power over you',
              'Cultural factors shape how anxiety is experienced and expressed, including through physical symptoms',
              'Moving from "What is wrong with me?" to "What is my nervous system protecting me from?" is transformative',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Describe your anxiety as if it were a character. What does it look like? What does it say to you most often? What is it trying to protect you from? Write a brief letter to your anxiety, acknowledging its purpose while setting a boundary: "I hear you, and I am safe."`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Anxiety Map',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Create a simple map of your anxiety by answering these four questions: (1) When does my anxiety show up most? (time of day, situations, triggers), (2) Where do I feel it in my body? (chest, stomach, shoulders, jaw), (3) What thoughts accompany it? (what-ifs, worst-case scenarios, self-criticism), (4) What do I usually do in response? (avoid, overwork, seek reassurance, withdraw). This map gives you a clear picture of your anxiety pattern — and awareness is the first step toward change.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the "fight, flight, or freeze" response?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A conscious decision about how to handle a problem', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: `The body's automatic survival response when the brain perceives a threat`, labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A therapy technique for managing anxiety', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'A type of anxiety disorder', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is somatization in the context of anxiety?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Imagining physical symptoms that do not exist', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Expressing emotional distress primarily through physical symptoms like headaches or stomach problems', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A medical condition unrelated to anxiety', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Exercising to manage stress', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What transformative shift does the module recommend for understanding anxiety?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'From "I need medication" to "I need willpower"', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'From "What is wrong with me?" to "What is my nervous system trying to protect me from?"', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'From "I have anxiety" to "I am fine"', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'From self-focus to focusing on others', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is the goal of managing anxiety according to this module?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'To eliminate anxiety completely', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'To never feel uncomfortable again', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'To understand it, reduce its grip, and live fully despite its presence', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'To replace anxiety with constant happiness', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `When should I seek professional help for anxiety?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Consider professional support if your anxiety is interfering with daily functioning — affecting sleep, work performance, relationships, or your ability to enjoy life. Also seek help if you experience panic attacks, find yourself avoiding more and more situations, or if self-help strategies are not providing relief. A therapist can offer personalized strategies and, if appropriate, coordinate with a physician regarding medication options.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `Is anxiety hereditary?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Research suggests that anxiety has both genetic and environmental components. Having a family member with anxiety increases your predisposition, but it does not determine your destiny. Environmental factors — your upbringing, life experiences, coping skills, and support system — play an equally important role. Even with a genetic predisposition, effective management strategies can significantly reduce anxiety's impact on your life.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'emotional-patterns',
          titleEn: 'Emotional Patterns',
          titleAr: 'الأنماط العاطفية',
          durationMinutes: 60,
          lesson: {
            contentEn: `Every one of us has emotional patterns — recurring ways we respond to stress, conflict, vulnerability, and joy. These patterns were formed early in life and have been refined through years of repetition until they feel as natural as breathing. Understanding your emotional patterns is one of the most powerful steps you can take toward personal growth, because you cannot change what you cannot see.

Emotional patterns typically develop in childhood as adaptive responses to our environment. A child who learned that expressing anger led to punishment may develop a pattern of suppressing emotions and people-pleasing as an adult. A child whose needs were inconsistently met may develop a pattern of hypervigilance and anxiety. A child who was praised only for achievement may develop a pattern of perfectionism and self-worth tied to productivity. These patterns were once survival strategies — they helped you navigate your early world. But as an adult, they may no longer serve you.

Cognitive behavioral therapy (CBT) identifies common thinking patterns — called cognitive distortions — that fuel emotional responses. These include all-or-nothing thinking ("If it is not perfect, it is a failure"), catastrophizing ("If this goes wrong, everything is ruined"), mind-reading ("They must think I am incompetent"), and should statements ("I should be further along by now"). Recognizing these patterns is the first step to loosening their hold.

Attachment theory offers another lens for understanding emotional patterns. Your attachment style — formed in your earliest relationships — shapes how you approach closeness, handle conflict, and manage emotional needs in adulthood. Securely attached individuals generally feel comfortable with intimacy and independence. Anxiously attached individuals crave closeness but fear abandonment. Avoidantly attached individuals value independence but may struggle with vulnerability. Understanding your attachment style helps you make sense of patterns that might otherwise feel confusing or frustrating.

Cultural context also shapes emotional patterns. In many cultures, emotional restraint is valued and seen as a sign of strength. Boys and men in particular are often socialized to suppress sadness and vulnerability, channeling distress into anger or withdrawal instead. Women may be socialized to prioritize others\' emotions over their own, leading to patterns of over-functioning and burnout. Recognizing these culturally conditioned patterns does not mean rejecting your culture — it means gaining the freedom to choose how you express and process emotions.

To begin shifting an unhelpful pattern, start with awareness. When you notice a strong emotional reaction, pause and ask: "Is this about what is happening right now, or does this remind me of something from my past?" Often, our strongest reactions are echoes of earlier experiences replaying in the present.

The goal is not to become emotionless or to control every response. It is to expand your range — to have more choices about how you respond rather than being on autopilot. When you understand your patterns, you gain the freedom to act intentionally rather than reactively. That is the beginning of true emotional intelligence.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I often tell my clients: the patterns that protected you as a child may be imprisoning you as an adult. There is no shame in having developed them — they were brilliant survival strategies. But as an adult, you have the capacity to examine these patterns with compassion and to build new, healthier ways of responding. The first step is always gentle curiosity, never harsh self-judgment.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Emotional patterns are recurring responses formed in childhood that once served as survival strategies',
              'Cognitive distortions — all-or-nothing thinking, catastrophizing, mind-reading — fuel unhelpful emotional responses',
              'Your attachment style (secure, anxious, avoidant) shapes how you approach relationships and emotional needs',
              'The goal is not to eliminate emotions but to expand your range of choices in how you respond',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about a recent situation where you had a strong emotional reaction that felt disproportionate to the event. Write about what happened, what you felt, and then ask yourself: "When have I felt this way before? What does this remind me of?" See if you can trace the current reaction back to an earlier experience or pattern.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Pattern Tracker',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `For one week, keep a simple "pattern journal." Each time you have a strong emotional reaction, write down: (1) What happened (the trigger), (2) What I felt (the emotion), (3) What I did (the behavior), (4) What I was thinking (the thought behind it). At the end of the week, look for recurring themes. Do you notice similar triggers, emotions, or behaviors appearing multiple times? These are your patterns — and naming them is the first step toward changing them.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'How do emotional patterns typically develop?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'They are genetically determined and cannot be changed', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'They form in childhood as adaptive responses to the environment', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'They develop only during adolescence', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'They are chosen consciously in adulthood', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is "catastrophizing" in cognitive behavioral therapy?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Preparing for a natural disaster', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Assuming the worst possible outcome will happen', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A helpful planning strategy', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Crying during stressful situations', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What characterizes an anxious attachment style?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Comfort with both closeness and independence', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Craving closeness but fearing abandonment', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Preference for emotional distance', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Indifference to relationships entirely', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What question helps determine whether a reaction is about the present or the past?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: '"Who is to blame for this?"', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: '"Is this about right now, or does it remind me of something from my past?"', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: '"Am I overreacting?"', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: '"What would a normal person feel?"', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Can emotional patterns really change, or are we stuck with them?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Emotional patterns can absolutely change. The brain's neuroplasticity — its ability to form new neural pathways — means that with consistent practice, you can build new, healthier response patterns. It takes time and patience; old patterns do not disappear overnight. But with awareness, intention, and often the support of therapy, you can develop responses that better serve your current life rather than repeating strategies from your childhood.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `What if I recognize a pattern but cannot seem to stop it?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Awareness is the first step, but it is not always sufficient on its own — especially for deeply entrenched patterns. This is where therapeutic support becomes valuable. A therapist can help you understand the roots of the pattern, process the emotions driving it, and practice new responses in a safe environment. Self-compassion during this process is essential. Change is not about perfection; it is about gradual progress.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do I know which attachment style I have?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `You can explore your attachment style through self-reflection, validated questionnaires, or working with a therapist. Key questions to consider: Do I feel comfortable relying on others? Do I worry about being abandoned? Do I find it easy to get close to people? Do I value independence to the point of pushing people away? Most people are not purely one style — you may have a primary style with elements of others, and your style can evolve with awareness and secure relationships.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'the-power-of-self-compassion',
          titleEn: 'The Power of Self-Compassion',
          titleAr: 'قوة التعاطف مع الذات',
          durationMinutes: 60,
          lesson: {
            contentEn: `If someone you loved was going through a difficult time — struggling, failing, feeling inadequate — you would likely respond with kindness, understanding, and encouragement. Now consider: do you extend that same compassion to yourself? For most people, the honest answer is no.

Self-compassion, as defined by researcher Dr. Kristin Neff, has three core components. First, self-kindness versus self-judgment: treating yourself with warmth and understanding when you suffer or fail, rather than harsh criticism. Second, common humanity versus isolation: recognizing that suffering and imperfection are part of the shared human experience, rather than feeling like you are the only one struggling. Third, mindfulness versus over-identification: holding your painful experiences in balanced awareness rather than suppressing them or drowning in them.

Research on self-compassion has produced remarkable findings. Studies consistently show that self-compassionate individuals have lower levels of anxiety, depression, and stress. They demonstrate greater emotional resilience, stronger motivation to grow after setbacks, and healthier relationships. Contrary to the common fear that self-compassion leads to complacency, research shows it actually increases motivation — because people who treat themselves kindly are more willing to take risks, learn from mistakes, and try again.

The inner critic is perhaps the most universal human experience. That voice that says "You should have done better," "What is wrong with you?" or "Everyone else has it figured out" feels like it is protecting you from failure. In reality, chronic self-criticism activates the brain's threat system, flooding you with cortisol and putting you in a constant state of fight-or-flight against yourself. This is exhausting and counterproductive.

Cultural context plays an important role in self-compassion. In many cultures, self-sacrifice is celebrated and self-care is viewed as selfish. The belief that you must put everyone else first — your family, your community, your employer — before attending to your own needs leads to chronic depletion. But as the well-known airplane oxygen mask metaphor reminds us: you cannot pour from an empty cup. Taking care of yourself is not selfish — it is essential for sustaining your ability to care for others.

Practicing self-compassion begins with noticing how you speak to yourself. When you catch your inner critic, pause and ask: "Would I say this to someone I love?" If the answer is no, try rephrasing with the kindness you would offer a dear friend. "I am struggling right now, and that is okay. This is hard, and I am doing my best."

Self-compassion is not about lowering your standards or avoiding accountability. It is about meeting yourself with the same grace you offer others — especially during the moments when you need it most. It is one of the most transformative practices available to you, and it costs nothing but a willingness to be gentle with yourself.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `Self-compassion is the practice I most consistently recommend to every client I work with, regardless of their presenting concern. I have seen it transform the inner landscape of people who have spent decades at war with themselves. The shift from self-criticism to self-compassion is not instant — it is a practice. But even small moments of self-kindness accumulate into profound change over time.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Self-compassion has three components: self-kindness, common humanity, and mindfulness',
              'Research shows self-compassion increases motivation and resilience, not complacency',
              'Chronic self-criticism activates the brain\'s threat system, creating exhaustion and anxiety',
              'Self-compassion is not selfish — it is essential for sustaining your capacity to care for others',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Write a letter to yourself from the perspective of your most compassionate friend — someone who sees your struggles clearly but responds with unconditional kindness. What would they say to you right now about what you are going through? Let the words be as warm and understanding as you would offer someone you deeply love.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Self-Compassion Break',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Practice Dr. Kristin Neff's Self-Compassion Break the next time you notice self-criticism arising. Three steps: (1) Mindfulness — acknowledge the difficulty: "This is a moment of suffering." (2) Common humanity — connect to shared experience: "Suffering is part of being human. I am not alone in this." (3) Self-kindness — offer yourself comfort: Place your hand on your heart and say, "May I be kind to myself in this moment." Practice this daily for one week and note how it shifts your inner dialogue.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the three components of self-compassion according to Dr. Kristin Neff?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Self-esteem, positivity, and confidence', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Self-kindness, common humanity, and mindfulness', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Relaxation, meditation, and exercise', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Forgiveness, gratitude, and optimism', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does research say about self-compassion and motivation?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Self-compassion reduces motivation', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Self-compassion has no effect on motivation', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Self-compassion actually increases motivation by making people more willing to take risks and try again', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Only self-criticism effectively drives motivation', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What happens in the brain when chronic self-criticism is present?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'It activates the reward center', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'It activates the threat system, flooding the body with cortisol', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'It improves focus and productivity', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'It has no measurable neurological effect', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What does "common humanity" mean in the self-compassion framework?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'That everyone should be treated equally', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That suffering and imperfection are shared human experiences, not isolating ones', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'That humans are naturally compassionate', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That you should compare yourself to others to feel better', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is self-compassion the same as self-esteem?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `No. Self-esteem depends on evaluation — it requires feeling "good enough" based on achievements, comparisons, or external validation. It fluctuates with success and failure. Self-compassion, by contrast, is unconditional — it is present regardless of whether you succeed or fail. It does not require you to be special or above average. It simply requires you to be human and to treat yourself with the kindness you deserve.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `What if being kind to myself feels fake or uncomfortable?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is very common, especially if self-criticism has been your default mode for years. Self-compassion can feel unfamiliar, even unsafe at first. Start small — you do not need to believe the kind words immediately. Simply practice saying them and notice what happens in your body. Over time, with repetition, self-compassion begins to feel more natural. Think of it as learning a new language: it feels awkward at first but becomes more fluent with practice.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 2: GROWTH (PAID) ──────────────────
    {
      level: 2,
      titleEn: 'Growth',
      titleAr: 'النمو',
      subtitleEn: 'Building Your Toolkit for Change',
      subtitleAr: `[Arabic translation needed]`,
      descriptionEn: `Apply your self-awareness to active transformation — breaking unhelpful cycles, navigating life transitions with grace, converting stress into strength, and establishing boundaries that liberate rather than isolate.`,
      descriptionAr: `[Arabic translation needed]`,
      isFree: false,
      modules: [
        {
          slug: 'breaking-unhelpful-cycles',
          titleEn: 'Breaking Unhelpful Cycles',
          titleAr: 'كسر الدورات غير المفيدة',
          durationMinutes: 60,
          lesson: {
            contentEn: `We all have cycles we repeat — patterns of behavior that, despite our best intentions, seem to play out again and again. The relationship that starts well but ends the same way. The career opportunity sabotaged by the same fears. The promise to prioritize health that dissolves under the same pressures. Understanding why these cycles persist is the key to finally breaking them.

Unhelpful cycles operate through a feedback loop of triggers, thoughts, emotions, and behaviors. A trigger activates a familiar thought pattern, which generates an emotional response, which drives a behavioral reaction — and the behavior often reinforces the original trigger. For example: a perceived slight (trigger) leads to the thought "They do not respect me" (cognition), which produces anger and hurt (emotion), which results in withdrawal or aggression (behavior), which damages the relationship and increases the likelihood of future slights. The cycle feeds itself.

Understanding this loop — often called the CBT cycle or cognitive behavioral model — gives you multiple points of intervention. You can challenge the thought: "Is this definitely about disrespect, or could there be another explanation?" You can regulate the emotion: "I am feeling triggered. Let me take a breath before I react." You can choose a different behavior: "Instead of withdrawing, I will express my feeling calmly."

Deep-rooted cycles often connect to what psychologists call core beliefs — fundamental assumptions about yourself, others, and the world that were formed early in life. Common core beliefs include "I am not good enough," "People will leave me," "The world is unsafe," or "I must be perfect to be loved." These beliefs operate beneath conscious awareness, quietly shaping decisions, reactions, and the stories you tell yourself.

Breaking a cycle requires both insight and action. Insight alone — understanding why you do something — is necessary but insufficient. You also need to practice new behaviors consistently, even when the old pattern feels more comfortable. This is where the concept of "opposite action" from dialectical behavior therapy (DBT) is valuable: when your emotional urge pulls you toward the familiar unhelpful behavior, deliberately choose the opposite action that aligns with your values.

It is important to approach this work with compassion rather than frustration. These cycles are not evidence of weakness — they are deeply embedded neural pathways that take time and patience to rewire. Every time you notice a pattern, you are already making progress. Every time you choose differently, even imperfectly, you are laying down a new neural pathway. Change is not about eliminating the old pattern — it is about building a new one that gradually becomes stronger.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `Breaking cycles is some of the most rewarding work I do with clients. The moment someone sees — truly sees — the pattern they have been repeating, everything shifts. Suddenly, what felt like mysterious bad luck or personal failure reveals itself as a learnable, changeable pattern. I remind my clients: you are not broken. You are running an outdated program that you now have the power to update.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Unhelpful cycles operate through feedback loops of triggers, thoughts, emotions, and behaviors',
              'Core beliefs formed in childhood silently drive many recurring patterns',
              `"Opposite action" — deliberately choosing the behavior opposite to your emotional urge — helps break cycles`,
              'Every time you notice a pattern or choose differently, you are building new neural pathways',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Identify one cycle you keep repeating in your life — whether in relationships, work, health, or self-care. Map out the trigger, the thought, the emotion, and the behavior. Then write about the core belief that might be fueling this cycle. What would you need to believe instead to break it?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Cycle Breaker Worksheet',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Draw the CBT cycle as a circle with four points: Trigger, Thought, Emotion, Behavior. Fill it in for one recurring pattern in your life. Then, at each point, write an alternative: a new way to interpret the trigger, a more balanced thought, a regulation strategy for the emotion, and a different behavioral choice. Practice using one of these alternatives the next time the cycle activates. Track what happens.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What are the four components of the CBT cycle?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Thought, feeling, memory, action', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Trigger, thought, emotion, behavior', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Past, present, future, reflection', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Problem, analysis, solution, review', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What are "core beliefs"?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Religious or spiritual convictions', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Fundamental assumptions about self, others, and the world formed early in life', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Beliefs shared by all members of a culture', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Consciously chosen values', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What is "opposite action" in DBT?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Doing the opposite of what your therapist recommends', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Deliberately choosing the behavior opposite to your emotional urge, aligned with your values', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Arguing with your inner critic', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Reversing a decision you made yesterday', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is insight alone not enough to break a cycle?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because insight is usually wrong', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because old patterns are deeply embedded neural pathways that require consistent practice of new behaviors', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because only medication can change behavior', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because cycles are genetically fixed', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How long does it take to break a long-standing pattern?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `There is no universal timeline. Simple behavioral habits might shift in weeks, while deeply rooted emotional patterns connected to core beliefs can take months or longer. The key is consistency, not speed. Expect setbacks — they are a normal part of change, not evidence of failure. Each attempt at a new behavior strengthens the new neural pathway, even if the old pattern still activates sometimes.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `What if my unhelpful cycle involves another person?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `When cycles involve interpersonal dynamics, you can only change your part. Focus on your triggers, thoughts, and behavioral choices. Often, when one person in a relational pattern changes their response, the entire dynamic shifts. The other person may initially resist the change — because the old pattern was familiar — but over time, new dynamics can emerge. If the other person's behavior is harmful, professional support or boundary-setting may be necessary.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'life-transitions-with-grace',
          titleEn: 'Life Transitions with Grace',
          titleAr: 'التحولات الحياتية بسلاسة',
          durationMinutes: 60,
          lesson: {
            contentEn: `Life transitions — whether chosen or imposed — are among the most challenging experiences we face. A new country, a career change, becoming a parent, losing a loved one, an empty nest, retirement, divorce, a health diagnosis — each one requires letting go of one version of your life and stepping into another. This in-between space, while uncomfortable, is also where the deepest growth occurs.

Psychologist William Bridges distinguished between "change" and "transition." Change is external — the event itself. Transition is internal — the psychological process of adapting to the new reality. A person can experience a change (like immigrating to a new country) without having completed the transition (emotionally processing the loss and building a new sense of belonging). When the internal transition lags behind the external change, people often feel stuck, anxious, or lost.

Bridges identified three phases of transition. The first is Ending — acknowledging what you are losing. This might be a home, a role, an identity, a community, or a way of life. Grief during endings is natural and necessary, even when the change is positive. The second phase is the Neutral Zone — the disorienting in-between period where the old is gone but the new has not fully formed. This phase feels messy and uncertain, but it is actually fertile ground for creativity and new possibilities. The third phase is New Beginning — when you start to integrate the change into a new sense of self and move forward with renewed clarity.

Cultural and family expectations shape how we navigate transitions. In some cultures, rapid adaptation is expected — "be grateful for the opportunity" — leaving little space for grief or uncertainty. In others, transitions are collective events processed through community rituals and support. Neither approach is right or wrong, but having access to both — community support and personal processing time — leads to healthier outcomes.

The transition of immigration deserves special attention. Moving between cultures involves what researchers call "acculturative stress" — the strain of navigating a new language, social norms, employment systems, and identity. This stress affects not just the individual but the entire family system. Children may adapt quickly (sometimes too quickly, losing cultural connections), while parents may struggle longer. Acknowledging these different timelines with compassion prevents family tension.

Key strategies for navigating transitions include: allowing yourself to grieve what was lost (even if others minimize it), finding or creating rituals that mark the passage, seeking support from people who have navigated similar transitions, maintaining the parts of your routine and identity that ground you, and giving yourself permission to not have everything figured out immediately. The neutral zone is not a failure — it is a necessary part of becoming.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `One of the most healing things I can say to someone in transition is: "It makes sense that you are struggling." Too often, people judge themselves for finding change difficult — especially when the change was their choice or is seen as an "opportunity." But every transition involves loss, and loss deserves to be acknowledged. Give yourself the grace to grieve, to feel uncertain, and to take the time you need.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Bridges distinguishes between external change (the event) and internal transition (the psychological adaptation)',
              'Transitions move through three phases: Ending, Neutral Zone, and New Beginning',
              'The Neutral Zone — while uncomfortable — is fertile ground for growth and new possibilities',
              'Immigration involves acculturative stress that affects each family member differently',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about a transition you are currently experiencing or have recently gone through. Which phase are you in — Ending, Neutral Zone, or New Beginning? What have you lost that deserves to be grieved? What new possibilities are beginning to emerge? Write about where you are in the process and what you need to move forward.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Transition Map',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Draw three columns labeled Ending, Neutral Zone, and New Beginning. In the Ending column, list everything you are leaving behind or have lost in your current transition. In the Neutral Zone, write about what feels uncertain and what unexpected opportunities have appeared. In the New Beginning column, write about what is starting to take shape — new skills, relationships, perspectives, or identities. This visual helps normalize where you are and shows that progress is happening, even if it does not feel like it.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the difference between "change" and "transition" according to William Bridges?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'They are the same thing', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Change is external (the event); transition is internal (the psychological adaptation)', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Change is voluntary; transition is involuntary', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Change is sudden; transition is gradual', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What is the "Neutral Zone" in Bridges' transition model?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A period of stability and calm', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The disorienting in-between phase where the old is gone but the new has not fully formed', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A state of emotional neutrality', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The final phase of successful adaptation', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What is "acculturative stress"?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Stress caused by academic pressure', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The strain of navigating a new culture, language, and social norms', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Stress from accumulating possessions', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The stress of becoming too comfortable', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is grief important even during positive transitions?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because positive transitions are actually negative', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because every transition involves losing something — a role, identity, or way of life — that deserves acknowledgment', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because grief speeds up the transition process', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Grief is not appropriate during positive transitions', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I support my children through a major family transition like immigration?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Children need honest, age-appropriate information about what is happening and permission to have their own feelings about it. Maintain familiar routines where possible, as these provide emotional anchoring during upheaval. Acknowledge that their adaptation timeline may differ from yours — children often adapt faster socially but may carry hidden grief. Create space for them to talk about what they miss while also celebrating what is new.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `What if I have been stuck in the Neutral Zone for a long time?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Extended time in the Neutral Zone is common and not a sign of failure. However, if you feel truly stuck — unable to move forward, experiencing persistent depression or anxiety, or avoiding necessary decisions — this may indicate unprocessed grief or fear that could benefit from therapeutic support. Sometimes we need help identifying what we are holding onto before we can step into what is next.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'stress-to-strength',
          titleEn: 'Stress to Strength',
          titleAr: 'من الضغط إلى القوة',
          durationMinutes: 60,
          lesson: {
            contentEn: `Stress is not the enemy. While chronic, unmanaged stress damages physical and mental health, the right relationship with stress can actually build resilience, sharpen performance, and foster growth. The key lies not in eliminating stress — which is impossible — but in transforming your relationship with it.

Health psychologist Dr. Kelly McGonigal's research challenged the long-held assumption that all stress is harmful. Her findings suggest that your beliefs about stress significantly influence its impact on your health. People who view stress as harmful experience worse health outcomes than those who view stress as their body's way of rising to a challenge. This does not mean stress is harmless — it means that your mindset about stress matters enormously.

Understanding the stress response helps you work with it rather than against it. When you face a challenge, your body releases cortisol and adrenaline, increasing heart rate, sharpening focus, and mobilizing energy. This is the same response that helps an athlete perform at their peak or a parent summon extraordinary strength in an emergency. The physiological experience of stress and excitement are nearly identical — the difference is in how your mind labels them.

The concept of the "stress continuum" is helpful here. At one end is healthy stress (eustress) — the kind that motivates you to prepare for an exam, meet a deadline, or rise to an occasion. In the middle is tolerable stress — significant challenges that are manageable with adequate support and coping skills. At the far end is toxic stress — chronic, overwhelming stress without adequate support, which damages the body and mind over time.

Your goal is not to avoid all stress but to (1) build your capacity to handle it, (2) ensure you have adequate recovery, and (3) convert stress into fuel for growth. This is what researchers call "stress inoculation" — regular exposure to manageable challenges that gradually builds resilience, much like physical exercise builds muscle.

Practical stress management involves both proactive and reactive strategies. Proactive strategies include regular physical movement, adequate sleep, social connection, and meaningful engagement. These build your baseline resilience so that when stress arrives, you have reserves to draw from. Reactive strategies include deep breathing, grounding techniques, progressive muscle relaxation, and cognitive reframing — tools you deploy in the moment of stress.

For immigrant communities, stress often carries additional layers: the stress of navigating systems in a second language, of maintaining cultural identity while adapting, of financial uncertainty in a new country, and of separation from extended family support networks. These stressors are real, cumulative, and deserve to be acknowledged — not minimized with platitudes about "gratitude" or "opportunity."

Building stress resilience is a skill, not a trait. It can be developed at any age through consistent practice. Every time you face a challenge, manage it effectively, and recover — you are training your nervous system that you can handle difficulty. That accumulation of competence is the foundation of genuine confidence.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I have worked with many clients who believe they should not feel stressed — as though stress is a personal failing. I help them see that stress is information: it tells you something matters to you. The goal is not a stress-free life but a life where you have the tools and support to meet stress with confidence. You are more resilient than you know.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Your mindset about stress significantly influences its impact on your health and performance',
              'The stress continuum ranges from healthy eustress to toxic chronic stress — the goal is to manage, not eliminate',
              'Stress inoculation — regular exposure to manageable challenges — builds resilience like exercise builds muscle',
              'Both proactive strategies (sleep, exercise, connection) and reactive tools (breathing, grounding) are essential',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about a time when stress brought out the best in you — when pressure helped you rise to an occasion or grow in a way you would not have otherwise. What made the difference between that experience and times when stress felt overwhelming? What resources, support, or mindset helped you transform stress into strength?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'Your Stress Resilience Plan',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Create a personalized stress resilience plan with three sections. (1) My Proactive Foundation: list 3-5 things you will do regularly to build baseline resilience (e.g., daily walk, 7+ hours sleep, weekly friend catch-up). (2) My Reactive Toolkit: list 3-5 strategies you will use when stress hits in the moment (e.g., box breathing, grounding exercise, calling a trusted person). (3) My Recovery Rituals: list 2-3 things you do to recover after stressful periods (e.g., nature time, journaling, a long bath). Keep this plan visible and review it weekly.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What did Dr. Kelly McGonigal's research find about stress beliefs?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'All stress is equally harmful regardless of beliefs', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Viewing stress as harmful leads to worse health outcomes than viewing it as a challenge response', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Only positive thinking can eliminate stress', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Stress beliefs have no measurable health impact', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What is "eustress"?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Stress caused by European cultures', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Healthy, motivating stress that helps you rise to a challenge', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Stress caused by too many positive events', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'A clinical diagnosis of extreme stress', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What is "stress inoculation"?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A vaccination against stress', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Avoiding all stressful situations', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Regular exposure to manageable challenges that builds resilience over time', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Taking medication before stressful events', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is the difference between proactive and reactive stress management?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'There is no meaningful difference', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Proactive builds baseline resilience; reactive provides in-the-moment tools', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Proactive is for mild stress; reactive is for severe stress', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Proactive involves medication; reactive involves therapy', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is it possible to have too little stress?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Yes. Without any challenge or stimulation, people often experience boredom, apathy, and a lack of purpose — sometimes called "rust-out" as opposed to burnout. Humans need a certain level of challenge to feel engaged and growing. The ideal is finding the "sweet spot" between too little and too much stress, where you feel challenged but capable.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do I know if my stress has become toxic?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Warning signs of toxic stress include: persistent sleep difficulties, chronic fatigue despite rest, frequent illness, difficulty concentrating, emotional numbness or irritability, withdrawal from activities you used to enjoy, physical symptoms like headaches or digestive issues, and a sense of hopelessness. If you are experiencing several of these, it is important to seek professional support and examine what changes are needed in your life circumstances and coping strategies.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'boundaries-that-free-you',
          titleEn: 'Boundaries That Free You',
          titleAr: 'حدود تحررك',
          durationMinutes: 60,
          lesson: {
            contentEn: `Boundaries are one of the most misunderstood concepts in personal development. Many people think of boundaries as walls — rigid barriers that keep others out. In reality, healthy boundaries are more like doors: they allow you to choose what comes in and what stays out, protecting your energy, dignity, and emotional wellbeing while still maintaining connection.

A boundary is simply a clear expression of what you will and will not accept. It is not about controlling others — it is about clarifying your own limits. "I am not available to take calls after 9 PM" is a boundary. "You are not allowed to call me" is an attempt to control. The difference is crucial: boundaries define your space; they do not attempt to define another person's behavior.

There are several types of boundaries. Physical boundaries relate to your body, personal space, and physical needs. Emotional boundaries protect your right to have your own feelings without taking on others\' emotional burdens. Time boundaries honor your schedule and energy. Digital boundaries manage your availability through technology. Financial boundaries protect your resources. And intellectual boundaries respect your right to your own thoughts and opinions.

For many people — especially those from enmeshed family systems or cultures that prioritize collectivism — setting boundaries can feel deeply uncomfortable. When you have been socialized to believe that your worth comes from what you give, saying "no" can trigger guilt, fear of abandonment, or accusations of selfishness. Understanding that this discomfort is a conditioned response — not evidence that you are doing something wrong — is essential.

Psychologist Dr. Henry Cloud describes boundaries as defining "where I end and you begin." Without this clarity, relationships become confusing and draining. You may find yourself over-committing, resentful, exhausted, or feeling taken advantage of — not because others are intentionally exploiting you, but because you have not communicated your limits.

Setting boundaries is a skill that improves with practice. Start with the DEAR MAN framework from dialectical behavior therapy: Describe the situation objectively, Express your feelings, Assert your need clearly, Reinforce the positive outcome, stay Mindful of your goal, Appear confident, and Negotiate if appropriate. For example: "When I receive work calls during dinner (describe), I feel stressed and disconnected from my family (express). I need to set my phone to do-not-disturb from 6-8 PM (assert). This will help me be more present with my family and more focused at work (reinforce)."

Remember: people who react negatively to your boundaries are often the ones who benefited most from your lack of them. Healthy people respect boundaries. This is not always easy to hear, especially when the person resisting your boundary is a parent, partner, or close friend — but it remains true. Your boundaries are not a rejection of others; they are an expression of self-respect. And from a foundation of self-respect, you are actually able to give more generously, because your giving comes from choice rather than obligation.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I often see clients who come in exhausted, resentful, and overwhelmed — and when we dig deeper, the common thread is a pattern of absent or weak boundaries. Learning to set boundaries can feel like learning to speak a new language, especially for those raised in cultures where the self is expected to be secondary. But I have never seen a client regret becoming more boundaried. What they regret is all the years they spent without them.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Boundaries are not walls — they are doors that allow you to choose what enters your life',
              'Setting boundaries defines your limits, not others\' behavior — it is about self-clarity, not control',
              'Cultural conditioning and enmeshed family systems can make boundary-setting feel like betrayal — this discomfort is learned, not truth',
              'People who react negatively to boundaries often benefited most from your lack of them',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Where in your life do you most need a boundary right now? What has prevented you from setting it? Write about the fear or guilt that comes up when you imagine saying "no" — and then write about what would become possible in your life if that boundary were in place.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Boundary Audit',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Review six areas of your life: physical, emotional, time, digital, financial, and intellectual. For each, rate your current boundary strength from 1 (very weak) to 5 (very strong). For the two weakest areas, write one specific boundary you will set this week using the format: "I will [specific action] because [reason]." Practice saying it out loud. Then, when the situation arises, follow through — and notice how it feels afterward.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What is the difference between a boundary and an attempt to control?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'There is no difference', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Boundaries define your own limits; control attempts to define another person\'s behavior', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Boundaries are for weak people; control is for strong people', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Boundaries are permanent; control is temporary', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why might boundary-setting feel especially difficult for people from collectivist cultures?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because collectivist cultures do not have boundaries', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because they may have been socialized to believe their worth comes from what they give', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because boundary-setting is a Western concept', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because they do not experience boundary violations', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does the DEAR MAN framework stand for?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Defend, Explain, Argue, Reject, Manage, Avoid, Negotiate', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Describe, Express, Assert, Reinforce, Mindful, Appear confident, Negotiate', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Define, Evaluate, Act, Review, Monitor, Adjust, Notify', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Demand, Enforce, Accept, Restrict, Motivate, Assign, Name', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does the module say about people who react negatively to your boundaries?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'They are right — your boundaries are too strict', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'They are often the ones who benefited most from your lack of boundaries', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Their reaction proves you should not have set the boundary', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'You should always change your boundary if someone objects', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I set boundaries with my parents without being disrespectful?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Boundaries with parents can be set with both firmness and respect. Lead with love: "I value our relationship, and I need to share something that will help me be a better [son/daughter] to you." Be specific about the behavior and its impact on you, rather than criticizing their character. Acknowledge their perspective while holding your ground. In many cultures, this is about finding respectful language that honors the relationship while still protecting your wellbeing.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `What if setting a boundary ends a relationship?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is a real fear, and sometimes boundaries do change the dynamics of a relationship. If a relationship can only survive when you have no limits, that tells you something important about the nature of that relationship. Healthy relationships adjust to accommodate reasonable boundaries. If someone leaves because you expressed a need, the loss — while painful — may ultimately be a necessary step in your growth.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 3: MASTERY (PAID) ──────────────────
    {
      level: 3,
      titleEn: 'Mastery',
      titleAr: 'الإتقان',
      subtitleEn: 'Living with Purpose and Authenticity',
      subtitleAr: `[Arabic translation needed]`,
      descriptionEn: `Integrate everything you have learned into a life of purpose, nourishing relationships, daily resilience, and authentic self-expression — becoming the person you were always meant to be.`,
      descriptionAr: `[Arabic translation needed]`,
      isFree: false,
      modules: [
        {
          slug: 'finding-your-purpose',
          titleEn: 'Finding Your Purpose',
          titleAr: 'إيجاد هدفك',
          durationMinutes: 60,
          lesson: {
            contentEn: `Purpose is not a luxury reserved for philosophers and poets. Research consistently shows that having a sense of purpose is associated with longer life, better physical health, greater resilience, reduced risk of cognitive decline, and higher levels of life satisfaction. Purpose is not a nice-to-have — it is a fundamental human need.

Yet many adults struggle with purpose, particularly during midlife or after major transitions. The question "What is my purpose?" can feel overwhelming and even paralyzing. Part of the difficulty is the expectation that purpose must be one grand, singular calling. In reality, purpose is often multiple, evolving, and expressed through ordinary daily choices as much as through extraordinary achievements.

Viktor Frankl, the psychiatrist and Holocaust survivor, argued that meaning is not something we find — it is something we create. In his therapeutic approach, logotherapy, he identified three pathways to meaning: through what we give to the world (creation), through what we experience and receive (connection, beauty, love), and through the attitude we take toward unavoidable suffering (courage and dignity in difficulty).

The Japanese concept of ikigai offers another helpful framework. Ikigai exists at the intersection of four elements: what you love, what you are good at, what the world needs, and what you can be paid for. While not every element needs to be present in every activity, reflecting on these four dimensions can help clarify where your sense of purpose might live.

Cultural context significantly shapes what purpose looks like. In individualistic societies, purpose is often framed as personal achievement and self-actualization. In collectivist cultures, purpose may center on family, community service, spiritual devotion, or preserving cultural heritage. Neither framing is more valid — purpose is personal and culturally embedded.

For immigrants and bicultural individuals, purpose often involves a unique tension: honoring the sacrifices of those who came before while also pursuing your own authentic path. Many find deep purpose in bridging cultures — serving as translators (literally and figuratively) between worlds, mentoring others on a similar journey, or integrating the wisdom of their heritage with the opportunities of their new home.

Purpose does not require a dramatic life overhaul. It begins with small, consistent choices that reflect your values. Cooking a meaningful meal for your family, mentoring a younger person, doing your work with excellence, creating something beautiful, or simply being fully present with someone who needs you — these are all expressions of purpose.

The question is not "What is my one grand purpose?" but rather "What makes me come alive, and how can I bring more of that into my daily life?" When you live in alignment with your values, engage your strengths, and contribute to something beyond yourself — purpose is already present.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I have found that purpose anxiety — the pressure to find your "one true calling" — can be just as paralyzing as purposelessness itself. I encourage my clients to think of purpose not as a destination but as a compass heading. It guides your direction without demanding a fixed endpoint. When you are living in alignment with your values and contributing to something that matters to you, you are already living with purpose.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Purpose is linked to longer life, better health, and greater resilience — it is a fundamental need',
              `Frankl's three pathways to meaning: creation, connection/experience, and courageous attitude toward suffering`,
              'Purpose is often multiple, evolving, and expressed through ordinary choices — not one grand calling',
              'Cultural context shapes what purpose looks like; both individual and collective forms are valid',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Reflect on the ikigai framework: What do you love? What are you good at? What does the world need? What can you be sustained by financially? Write your answers and look for overlaps. Where do you see purpose emerging? What would you do more of if fear and obligation were not factors?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Purpose Inventory',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Complete these five sentence stems without overthinking: (1) "I feel most alive when..." (2) "People come to me when they need..." (3) "If money were no obstacle, I would spend my time..." (4) "The problem in the world that bothers me most is..." (5) "At the end of my life, I want to be remembered for..." Review your answers and identify the themes. These themes are clues to your purpose. Choose one small action you can take this week that aligns with one of these themes.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are Frankl's three pathways to meaning?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Wealth, fame, and power', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Creation, connection/experience, and courageous attitude toward suffering', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Career, family, and spirituality', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Happiness, success, and influence', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What are the four elements of the ikigai framework?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Mind, body, spirit, and community', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'What you love, what you are good at, what the world needs, and what you can be paid for', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Past, present, future, and eternity', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Health, wealth, relationships, and achievements', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why can "purpose anxiety" be counterproductive?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because purpose does not actually exist', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because the pressure to find one grand calling can be as paralyzing as purposelessness', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because only certain people deserve to have purpose', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because anxiety always leads to better decisions', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How does the module suggest thinking about purpose?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'As a fixed destination you must reach by a certain age', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'As a compass heading that guides your direction without demanding a fixed endpoint', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'As something only found through career success', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'As something that requires quitting your current life to discover', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I feel like I do not have a purpose?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Feeling purposeless is more common than you might think, and it does not mean something is wrong with you. Often, purpose has been present all along but obscured by the demands of daily survival, cultural expectations, or the busyness of modern life. Start by noticing what naturally draws your attention, what activities make time disappear, and what injustices make you upset. These are all clues. Purpose often reveals itself gradually through experimentation and reflection rather than arriving in a sudden revelation.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `Can my purpose change over the course of my life?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Absolutely. Purpose evolves as you do. A young parent may find deep purpose in raising children, while that same person in their fifties may find purpose shifting toward mentoring, community leadership, or creative expression. This evolution is natural and healthy. Clinging to a purpose that no longer resonates can be just as unfulfilling as having no purpose at all. Give yourself permission to grow.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'relationships-that-nourish',
          titleEn: 'Relationships That Nourish',
          titleAr: 'علاقات تغذي الروح',
          durationMinutes: 60,
          lesson: {
            contentEn: `The quality of your relationships is one of the strongest predictors of your overall health and happiness. The Harvard Study of Adult Development — the longest-running study on human wellbeing, spanning over 85 years — found that the single most important factor for a long, healthy life is not wealth, career success, or exercise. It is the quality of your close relationships.

Yet many adults find themselves in relationship patterns that drain rather than nourish. Over-giving in friendships, maintaining connections out of obligation rather than genuine affection, tolerating disrespect because of shared history, or isolating themselves due to past hurt — these patterns are common and understandable. Understanding what makes a relationship nourishing versus depleting is essential for your wellbeing.

Nourishing relationships share several qualities. They are reciprocal — both people invest effort and care. They are safe — you can be authentic without fear of judgment or punishment. They are growth-oriented — both people encourage each other to evolve. They are boundaried — each person respects the other's limits and individuality. And they are reliable — you trust that the person will show up when it matters.

Depleting relationships, by contrast, tend to be one-sided, conditional, controlling, or consistently critical. They may involve subtle manipulation, guilt-tripping, or patterns where your needs are consistently deprioritized. It is important to note that depleting relationships are not always overtly toxic — sometimes they simply no longer align with who you are becoming.

Attachment theory helps explain why we are drawn to certain relationship patterns. If you grew up with caregivers who were inconsistently available, you may gravitate toward relationships that recreate that dynamic — pursuing unavailable people or tolerating crumbs of affection because they feel familiar. Awareness of your attachment patterns allows you to make more conscious choices about who you invest in.

For people from immigrant or bicultural backgrounds, social networks may have been disrupted by relocation, creating a unique challenge: the support system you relied on is thousands of miles away, and building new connections in a different cultural context can feel overwhelming. Prioritizing community-building — through cultural organizations, faith communities, parent groups, or online networks — is not optional; it is vital for mental health.

Curating your relational world is an act of self-care. This does not mean cutting people off impulsively, but it does mean being intentional about where you invest your limited emotional energy. Spend more time with people who leave you feeling uplifted and less time with those who consistently leave you drained. Invest deeply in a few close relationships rather than spreading yourself thin across many superficial ones. And remember: the relationship you have with yourself sets the template for every other relationship in your life.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I always tell my clients: look at the five people you spend the most time with. Do they reflect who you want to become? Relationships are mirrors — they show us who we are and who we are becoming. Choosing nourishing relationships is not selfish; it is one of the wisest investments you can make in your mental health and your future.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'The Harvard Study found that close relationship quality is the strongest predictor of long-term health and happiness',
              'Nourishing relationships are reciprocal, safe, growth-oriented, boundaried, and reliable',
              'Attachment patterns from childhood influence who we are drawn to and tolerate in adulthood',
              'For immigrants, intentionally rebuilding social networks is vital for mental health',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `List the five people you interact with most frequently. For each, write one word that describes how you feel after spending time with them. Are most of these words positive (energized, supported, valued) or negative (drained, anxious, small)? What does this tell you about where you might need to make changes?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Relationship Circles',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Draw three concentric circles. In the innermost circle, write the names of 2-4 people who deeply nourish you — your inner circle. In the middle circle, write the names of people you enjoy and maintain regular contact with. In the outer circle, write acquaintances and connections you maintain. Now look at where your time and energy actually go. Are you investing most in your innermost circle? If not, identify one action you can take this week to redirect energy toward the relationships that matter most.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What did the Harvard Study of Adult Development find is the strongest predictor of a long, healthy life?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Regular exercise and healthy diet', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Financial security and career success', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The quality of close relationships', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Genetic factors and family history', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Which of these is a quality of nourishing relationships?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'One person gives and the other receives', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Both people invest effort and feel safe being authentic', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Conflict is completely avoided', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The relationship has lasted the longest', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How might attachment patterns influence adult relationships?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'They have no influence after childhood', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'People may gravitate toward dynamics that recreate familiar patterns from childhood', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'They only affect romantic relationships', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'They determine who your friends will be', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is community-building especially important for immigrant families?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because immigrants have more free time', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because relocation disrupts existing support networks, and rebuilding is vital for mental health', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because immigrant cultures are more social', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'It is not more important — all people need community equally', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How do I distance myself from a depleting relationship without causing drama?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Gradual distancing often works better than dramatic confrontation. Slowly reduce the frequency of contact, decline invitations without over-explaining, and redirect your energy toward nourishing relationships. If confronted, you can say something like, "I am going through some changes and need to focus on myself right now." Not every relationship requires a formal breakup — sometimes a natural fade is the kindest option for both people.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `What if my family relationships are the depleting ones?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Family relationships are the most complex because they carry layers of obligation, history, and cultural expectation. Complete disconnection is not always necessary or desirable. Instead, consider strategic boundaries — limiting the topics you discuss, the frequency of contact, or the contexts in which you interact. You can love your family while still protecting your emotional health. A therapist can help you navigate this delicate balance.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'building-daily-resilience',
          titleEn: 'Building Daily Resilience',
          titleAr: 'بناء المرونة اليومية',
          durationMinutes: 60,
          lesson: {
            contentEn: `Resilience is often described as the ability to bounce back from adversity. But a more accurate and empowering definition is the ability to move through difficulty while maintaining your core sense of self and growing from the experience. Resilience is not about returning to who you were before — it is about becoming who you are next.

The misconception that resilience is an innate trait — something you either have or do not have — has been thoroughly debunked by research. Resilience is a set of skills, habits, and perspectives that can be developed and strengthened at any age. Like a muscle, it grows with regular use and atrophies with neglect.

Dr. Ann Masten, a leading resilience researcher, describes resilience as "ordinary magic" — the product of basic human systems functioning well: secure relationships, positive self-image, self-regulation skills, hope, and access to community resources. This means resilience is not about extraordinary toughness — it is about tending to the ordinary foundations of your daily life.

Daily resilience is built through five key practices. First, emotional regulation: the ability to experience strong emotions without being overwhelmed by them. This does not mean suppressing feelings — it means developing the capacity to feel them fully while choosing how to respond. Techniques include mindful breathing, naming your emotions, and using the RAIN method (Recognize, Allow, Investigate, Nurture).

Second, cognitive flexibility: the ability to see situations from multiple perspectives and adapt your thinking when circumstances change. Rigid thinking — "It must be this way or everything is ruined" — amplifies stress. Flexible thinking — "This is not what I planned, but what options do I have?" — opens doors.

Third, social connection: maintaining and drawing upon your relationships during difficult times. Asking for help is not weakness — it is one of the strongest resilience strategies available. Humans are wired for co-regulation; we literally calm our nervous systems through safe connection with others.

Fourth, meaning-making: finding or creating significance in your experiences, especially difficult ones. This does not mean toxic positivity or pretending everything happens for a reason. It means asking, "What can I learn from this? How might this experience shape who I am becoming?"

Fifth, physical foundation: adequate sleep, regular movement, proper nutrition, and time in nature. These are not luxuries — they are the biological infrastructure of resilience. Neglecting them is like trying to run a demanding software program on a depleted battery.

The compound effect of these daily practices is powerful. Each small act of resilience — choosing to breathe instead of react, reaching out to a friend, going for a walk when you feel overwhelmed, reframing a setback as a learning opportunity — builds your capacity for the next challenge. Over time, you develop what researchers call "stress hardiness": a reliable confidence in your ability to handle whatever life brings.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I often remind my clients that resilience is not about being strong all the time — it is about knowing how to return to yourself when life knocks you off balance. The most resilient people I know are not those who never fall. They are those who have built such a solid foundation of daily habits, relationships, and self-awareness that they always find their way back. That foundation is available to you, starting today.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Resilience is not an innate trait — it is a set of developable skills, habits, and perspectives',
              'Five key daily practices build resilience: emotional regulation, cognitive flexibility, social connection, meaning-making, and physical foundation',
              'The RAIN method (Recognize, Allow, Investigate, Nurture) is a practical tool for emotional regulation',
              'Small daily acts of resilience create compound growth in your capacity to handle adversity',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about a difficult experience you have already navigated in your life. What helped you get through it? Which of the five resilience practices — emotional regulation, cognitive flexibility, social connection, meaning-making, or physical foundation — played the biggest role? How can you strengthen that practice for future challenges?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Daily Resilience Check-In',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Create a simple daily check-in practice using the five resilience foundations. Each evening for one week, rate each on a scale of 1-5: (1) Emotional regulation — How well did I manage my emotions today? (2) Cognitive flexibility — Did I adapt when things did not go as planned? (3) Social connection — Did I meaningfully connect with someone? (4) Meaning-making — Did I find purpose or learning in my day? (5) Physical foundation — Did I care for my body (sleep, movement, nutrition)? Notice which areas need the most attention and set one small intention for the next day.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does Dr. Ann Masten mean by resilience as "ordinary magic"?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'That resilience requires magical thinking', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That resilience comes from basic human systems functioning well — relationships, self-regulation, hope', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'That only extraordinary people are resilient', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That resilience happens magically without effort', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does RAIN stand for in the context of emotional regulation?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Recognize, Allow, Investigate, Nurture', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Regulate, Accept, Improve, Neutralize', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Reflect, Analyze, Integrate, Navigate', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'React, Avoid, Ignore, Numb', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is asking for help considered a resilience strength rather than a weakness?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because other people always know better', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because humans are wired for co-regulation — we literally calm our nervous systems through safe connection', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because independent people are less resilient', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'It is actually a weakness that should be avoided', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is cognitive flexibility?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Being indecisive about everything', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The ability to see situations from multiple perspectives and adapt your thinking', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Agreeing with everyone to avoid conflict', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Changing your values to fit the situation', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I have experienced trauma — can I still build resilience?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Absolutely. Trauma does not prevent resilience — but it does require trauma-informed approaches. Working with a therapist who specializes in trauma (EMDR, somatic experiencing, or trauma-focused CBT) can help you process past experiences while building resilience skills. Many people who have experienced significant adversity develop profound resilience — not despite their experiences, but through the careful, supported process of healing from them.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do I build resilience when I am already overwhelmed?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Start extremely small — even one micro-practice counts. Take three deep breaths before bed. Text one friend a brief message. Walk around the block once. Drink an extra glass of water. These tiny acts may seem insignificant, but they begin to rebuild your foundation. When you are overwhelmed, the priority is stabilization, not transformation. Be gentle with yourself and build gradually.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'living-authentically',
          titleEn: 'Living Authentically',
          titleAr: 'العيش بأصالة',
          durationMinutes: 60,
          lesson: {
            contentEn: `This final module brings together everything you have explored in the Inner Compass program — identity, anxiety, emotional patterns, self-compassion, cycles, transitions, stress, boundaries, purpose, relationships, and resilience — into a unified vision: living authentically. This is both your starting point and your lifelong practice.

Living authentically means aligning your external life — your choices, relationships, career, and daily actions — with your internal truth: your values, passions, needs, and sense of purpose. It means showing up as yourself rather than as the person you think you should be, and doing so consistently, even when it is uncomfortable.

Authenticity researcher Dr. Michael Kernis describes psychological authenticity as having four components. Awareness — knowing your values, emotions, and motivations. Unbiased processing — seeing yourself honestly, without exaggerating strengths or minimizing weaknesses. Behavior — acting in alignment with your true self, even under social pressure. Relational orientation — being genuine in relationships rather than performing a version of yourself to gain approval.

For many people, the biggest barrier to authentic living is fear. Fear of judgment. Fear of rejection. Fear of disappointing people you love. Fear that your authentic self is somehow not enough. These fears are usually rooted in early experiences where being yourself was unsafe — where authenticity was met with criticism, rejection, or conditional love.

The path to authenticity does not require dramatic reinvention. It begins with small, consistent acts of alignment. Speaking your true opinion in a meeting. Pursuing a hobby that genuinely interests you rather than one that impresses others. Setting a boundary with kindness and conviction. Making a life decision based on your values rather than external expectations. Each act of alignment strengthens your authentic muscles.

Cultural navigation adds complexity to authenticity. Bicultural individuals often face a particular tension: "Which self am I supposed to be?" The answer is not choosing one identity over another — it is integrating them. You can be deeply rooted in your cultural heritage and authentically engaged with your adopted culture. You can honor family values while also honoring your individual path. Integration, not fragmentation, is the goal.

Authentic living also requires accepting imperfection. You will not always live in perfect alignment with your values. You will sometimes choose comfort over courage, please others at the expense of yourself, or fall back into old patterns. This is not failure — it is being human. Authenticity is not a state of perfection. It is a direction of travel — a consistent movement toward greater alignment, guided by self-awareness and fueled by self-compassion.

As you complete the Inner Compass program, know that the most important compass you will ever need is already within you. You have always known your true north — the program has simply helped you clear away the noise so you can hear it more clearly. Trust yourself. Live bravely. Be kind to yourself along the way. And know that Dr. Hala and the Mama Hala team are cheering for you every step of the way.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `Of all the things I help my clients with, the moment that moves me most is when someone gives themselves permission to be who they really are. That moment — when the mask comes off and the real person shines through — is breathtaking. I want you to know: who you really are is enough. It has always been enough. The world needs your authentic self, not a polished performance. Go live your truth.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Authentic living means aligning your external choices with your internal truth — values, passions, and purpose',
              `Kernis' four components of authenticity: awareness, unbiased processing, aligned behavior, and relational genuineness`,
              'For bicultural individuals, authenticity is about integration of identities, not choosing one over another',
              'Authenticity is not perfection — it is a direction of travel guided by self-awareness and self-compassion',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Looking back at your journey through the Inner Compass program, what is the most important thing you have learned about yourself? Write a letter to your future self — one year from now — describing the authentic life you are committed to building. What choices will you make differently? What will you let go of? What will you embrace?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'Your Authenticity Manifesto',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Create a personal "Authenticity Manifesto" — a one-page document that captures who you truly are and how you want to live. Include: your top 5 values, 3 non-negotiable boundaries, your purpose statement, the kind of relationships you want, and one commitment to yourself. Write it in your own voice, in language that resonates with you. Keep it somewhere visible and return to it whenever you feel disconnected from yourself.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the four components of psychological authenticity according to Dr. Kernis?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Confidence, assertiveness, independence, and success', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Awareness, unbiased processing, aligned behavior, and relational genuineness', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Honesty, loyalty, courage, and wisdom', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Self-esteem, resilience, purpose, and connection', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is the biggest barrier to authentic living for most people?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Lack of time', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Fear of judgment, rejection, and not being enough', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Financial constraints', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Lack of education', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How should bicultural individuals approach authenticity?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Choose one cultural identity and reject the other', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Integrate both identities rather than fragmenting into separate selves', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Adopt the dominant culture completely', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Avoid situations that highlight cultural differences', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How does the module define authenticity?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A permanent state of perfection', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Never compromising on anything', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'A direction of travel — consistent movement toward greater alignment, not a state of perfection', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Always saying exactly what you think regardless of consequences', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if living authentically means disappointing people I love?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is one of the most painful aspects of authentic living — especially in close-knit families and communities. The truth is, you cannot control how others react to your authenticity. What you can do is communicate your choices with love, acknowledge their feelings, and remain open to dialogue. Most of the time, the people who truly love you will adjust — even if it takes time. And the freedom and integrity you gain from living authentically ultimately benefits every relationship in your life.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do I maintain authenticity in professional settings where I need to "fit in"?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Authenticity in professional settings does not mean sharing every personal thought or ignoring social norms. It means bringing your genuine skills, perspectives, and values to your work rather than performing a false persona. Find the aspects of your authentic self that are assets in your professional context — your cultural perspective, your unique experiences, your honest communication style. Authenticity and professionalism are not opposites; the most respected professionals are those who are both competent and genuine.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
      ],
    },
  ],
  certificate: {
    titleEn: 'Inner Compass — Personal Growth Program Completion',
    titleAr: 'البوصلة الداخلية — إتمام برنامج النمو الشخصي',
    signedBy: 'Dr. Hala Borno',
  },
  whoIsThisFor: {
    en: [
      'Adults seeking deeper self-understanding and personal growth',
      'People navigating anxiety, stress, or major life transitions',
      'Individuals from immigrant or bicultural backgrounds exploring identity',
      'Anyone who wants to break unhelpful patterns and live more authentically',
    ],
    ar: [
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
    ],
  },
  whatYouWillLearn: {
    en: [
      'Evidence-based tools for understanding and managing anxiety, stress, and emotional patterns',
      'How to break unhelpful cycles, set healthy boundaries, and navigate life transitions with grace',
      'Practical frameworks for finding purpose and building nourishing relationships',
      'Daily resilience practices and a path toward living with greater authenticity and self-compassion',
    ],
    ar: [
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
    ],
  },
};
