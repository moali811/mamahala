import type { AcademyProgram } from '@/types';

export const strongerTogetherProgram: AcademyProgram = {
  slug: 'stronger-together',
  titleEn: 'Stronger Together',
  titleAr: 'أقوى معًا',
  descriptionEn: `A transformative program designed for couples who want to deepen their connection, navigate challenges with grace, and build a relationship that truly thrives.`,
  descriptionAr: `[Arabic translation needed]`,
  longDescriptionEn: `Stronger Together is a comprehensive couples program that guides you and your partner through three progressive levels of growth. Beginning with foundational communication skills and emotional awareness, you will move through deeper explorations of navigating differences, building financial harmony, and nurturing intimacy. The mastery level addresses the most challenging aspects of partnership — rebuilding trust, growing through life transitions, and creating a lasting legacy of love. Each module combines evidence-based therapeutic approaches with practical exercises you can do together at home.`,
  longDescriptionAr: `[Arabic translation needed]`,
  category: 'couples',
  image: '/images/academy/stronger-together.jpg',
  color: '#D4836A',
  icon: 'Heart',
  isFree: false,
  priceCAD: 149,
  totalModules: 12,
  totalDurationHours: 12,
  levels: [
    // ────────────────── LEVEL 1: FOUNDATION ──────────────────
    {
      level: 1,
      titleEn: 'Foundation',
      titleAr: 'الأساس',
      subtitleEn: 'Building Your Connection Toolkit',
      subtitleAr: `[Arabic translation needed]`,
      descriptionEn: `Establish the essential skills every couple needs — understanding each other's love languages, mastering the art of listening, transforming conflict into connection, and recognizing the small moments that build lasting love.`,
      descriptionAr: `[Arabic translation needed]`,
      isFree: false,
      modules: [
        {
          slug: 'love-languages-rediscovered',
          titleEn: 'Love Languages Rediscovered',
          titleAr: 'لغات الحب المُعاد اكتشافها',
          durationMinutes: 60,
          lesson: {
            contentEn: `Most of us have heard of love languages, but truly understanding and applying them in a long-term relationship requires going far deeper than simply identifying whether you prefer words of affirmation or acts of service. In this module, we revisit the concept of love languages with fresh eyes and a more nuanced, culturally sensitive perspective.

Love languages are not fixed traits. They evolve as we move through different life stages, experience stress, welcome children, face loss, or navigate cultural expectations. The language you needed when you first fell in love may be very different from what you need now. This is not a sign that something is wrong — it is a sign that your relationship is alive and growing.

Research in couples therapy consistently shows that relationship satisfaction increases when partners actively learn and speak each other's current emotional language. Dr. John Gottman's research at the University of Washington found that couples who regularly update their "love maps" — their understanding of each other's inner world — report significantly higher levels of connection and trust.

Consider this: in many Middle Eastern and South Asian cultures, love is often expressed through acts of service and quality time rather than verbal declarations. A parent who cooks your favorite meal or a partner who quietly handles a stressful errand is speaking volumes. When we only look for love in the ways Western popular culture highlights — grand romantic gestures and verbal affirmations — we risk missing the profound love that is already being expressed around us.

To rediscover your love languages as a couple, start by reflecting on three questions: When do I feel most loved by my partner? When does my partner seem happiest with me? What did love look like in my family growing up, and how has that shaped what I seek today?

Share your answers with each other without judgment. You may discover that your partner feels most loved when you put your phone away during dinner, or when you ask about their day with genuine curiosity. These seemingly small moments are actually the foundation of deep, lasting intimacy.

It is also important to recognize that love languages can be influenced by attachment styles. Someone with an anxious attachment style may crave words of affirmation and physical closeness, while someone with a more avoidant style may feel most comfortable expressing love through practical support. Neither approach is wrong — they are simply different dialects of care.

The goal is not to change who you are but to become bilingual in love. When both partners commit to learning and speaking each other's language — even imperfectly — the relationship transforms. You move from assumptions to understanding, from frustration to compassion, and from distance to genuine closeness.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `In my years of working with couples from diverse cultural backgrounds, I have seen how love languages carry different weight depending on where you grew up. A warm meal, a respectful silence, or showing up without being asked — these are powerful expressions of love that often go unrecognized. I encourage you to look beyond the textbook definitions and discover what love truly sounds like in your relationship.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Love languages evolve over time and are shaped by culture, life stage, and attachment style',
              'Regularly updating your understanding of what makes your partner feel loved strengthens connection',
              'Recognizing non-verbal and culturally influenced expressions of love prevents misunderstandings',
              'Becoming bilingual in love means learning to give love in the way your partner receives it best',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about the last time you felt truly loved by your partner. What did they do or say? Now consider — is that the same thing you would have described five years ago? Write about how your love language has evolved and what you wish your partner knew about how you receive love today.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Love Language Refresh',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Sit together with your partner for 20 minutes without distractions. Each of you writes down three moments from the past month when you felt most connected. Share your lists and look for patterns. Are there love languages being spoken that you had not noticed? Create a simple "love menu" of 5 things each of you can do this week that would feel meaningful to the other.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'Why do love languages change over time in a relationship?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because one partner becomes more demanding', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because life stages, stress, and growth naturally shift emotional needs', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because love fades over time', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because couples stop trying after the honeymoon phase', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What does Dr. Gottman's concept of "love maps" refer to?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A physical map of places you have visited together', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: `A couple's detailed understanding of each other's inner world`, labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A plan for future relationship milestones', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'A therapist-designed treatment plan', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How might cultural background influence the expression of love?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'It has no influence — love is universal', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Cultural values only matter in arranged marriages', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Some cultures emphasize acts of service and quality time over verbal affirmations', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Cultural background only affects the early stages of a relationship', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What does it mean to become "bilingual in love"?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Speaking two languages at home', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Learning to express love in the way your partner best receives it', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Agreeing on one shared love language', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Ignoring your own needs to focus on your partner', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I have completely different love languages?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Having different love languages is extremely common and is not a problem — it is an opportunity. The key is awareness and willingness. When you understand that your partner feels loved through quality time but you naturally default to gift-giving, you can make intentional adjustments. It does not mean abandoning your own style; it means expanding your repertoire to include theirs.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `Can love languages really change, or is that just an excuse?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Love languages genuinely evolve. Research shows that major life events — becoming a parent, career shifts, health challenges, or grief — can significantly alter what makes us feel emotionally safe and valued. Regularly checking in about each other's current needs is a sign of a healthy, adaptive relationship, not an excuse.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'the-art-of-listening',
          titleEn: 'The Art of Listening',
          titleAr: 'فن الإصغاء',
          durationMinutes: 60,
          lesson: {
            contentEn: `Listening is the single most powerful tool in any relationship, yet it is also the most misunderstood. Most of us believe we are good listeners — but true listening goes far beyond hearing the words your partner speaks. It involves hearing the emotions beneath those words, the needs behind those emotions, and the vulnerabilities that your partner may not even know how to articulate.

In couples therapy, one of the most consistent patterns I observe is what I call "listening to respond." Both partners are technically hearing each other, but each is mentally preparing their defense, their counterargument, or their correction while the other is still speaking. This creates a cycle where neither person truly feels heard, and both walk away from conversations feeling more alone than before.

Research by Dr. John Gottman has shown that the quality of listening during conflict is one of the strongest predictors of whether a relationship will last. Couples who practice what he calls "turning toward" — acknowledging and engaging with their partner's emotional bids — have significantly higher relationship satisfaction and longevity than those who "turn away" or "turn against."

Active listening in a relationship context means three things. First, it means physical presence: putting down your phone, making eye contact, and orienting your body toward your partner. These nonverbal cues communicate that what your partner is sharing matters to you. Second, it means emotional attunement: tracking not just the content of what is being said but the feeling tone underneath. When your partner says, "You never help with the dishes," the surface content is about dishes — but the underlying emotion might be loneliness, feeling undervalued, or exhaustion. Third, it means validation before problem-solving. Many of us — especially those socialized in goal-oriented cultures — jump straight to fixing. But your partner often needs to feel understood before they want solutions.

A powerful technique is mirroring: repeating back what you heard in your own words and checking whether you got it right. "It sounds like you are feeling overwhelmed and like you are carrying this alone. Is that right?" This simple practice can transform a heated argument into a moment of genuine connection.

Cultural dynamics also play a role in listening patterns. In some families and cultures, emotional expression is reserved or indirect. A partner from such a background might communicate distress through withdrawal, changes in routine, or brief comments rather than direct statements. Learning to listen to what is not said is just as important as hearing what is.

The art of listening is ultimately an act of love. When you truly listen to your partner, you are saying: "Your experience matters to me. I choose to understand you, even when it is difficult." This is the foundation upon which all other relationship skills are built.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I often tell couples that the most romantic thing you can do is truly listen. Not to fix, not to judge, not to prepare your response — but to be fully present with your partner's experience. In my practice, I have seen relationships transform when just one partner commits to this shift. Listening is not passive; it is one of the most active and generous things you can do.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'True listening involves hearing the emotions and needs beneath the words, not just the words themselves',
              'Validating your partner's feelings before offering solutions builds trust and connection',
              'Mirroring — repeating back what you heard — is a simple but powerful way to show understanding',
              'Cultural backgrounds shape how emotions are expressed, making it essential to listen for what is not said',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Recall a recent conversation with your partner where you felt unheard — or where your partner felt unheard. Without assigning blame, write about what was happening beneath the surface for each of you. What emotions were present? What did each of you truly need in that moment?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The 10-Minute Listening Exchange',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Set a timer for 5 minutes. One partner shares something that has been on their mind — it does not have to be about the relationship. The other partner listens without interrupting, without offering advice, and without planning a response. When the timer ends, the listener mirrors back what they heard: "What I heard you say is..." Then switch roles. Afterward, discuss how it felt to be fully heard.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is "listening to respond" and why is it harmful?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Repeating your partner's words back — it is helpful', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Preparing your rebuttal while your partner is still speaking — it prevents true understanding', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Responding quickly to show you are engaged', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Taking notes during a conversation for later reference', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What does Gottman's concept of "turning toward" mean?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Physically facing your partner during a conversation', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Acknowledging and engaging with your partner's emotional bids for connection', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Turning the conversation toward a positive topic', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Agreeing with everything your partner says to avoid conflict', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What are the three components of active listening described in this module?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Hearing, agreeing, and solving', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Physical presence, emotional attunement, and validation before problem-solving', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Eye contact, nodding, and summarizing', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Silence, patience, and compliance', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is it important to listen for what is NOT said?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because most people lie during arguments', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because in some cultures and families, distress is expressed indirectly through behavior rather than words', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because silence always means agreement', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because nonverbal cues are more honest than words', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I try active listening but my partner does not reciprocate?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Change in a relationship often starts with one person. When you consistently model active listening, your partner will likely begin to feel safer and more open over time. It may not happen overnight, but creating a pattern of genuine attentiveness shifts the emotional climate of the relationship. If you feel stuck, consider working with a couples therapist who can facilitate this process.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do I listen well when I am feeling triggered or defensive?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is one of the hardest aspects of relational listening. When you notice your body tensing or your mind racing to defend, try taking a slow breath and reminding yourself: "I can listen now and share my perspective after." If you are too flooded to listen, it is okay to say, "I want to hear you, but I need a 20-minute break to calm down first." This is not avoidance — it is responsible self-regulation.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `Is it okay to take notes during important conversations?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `In therapeutic settings, some couples find brief notes helpful for remembering key points. However, in everyday conversations, note-taking can feel clinical and may create distance. A better approach is to practice mirroring during the conversation and then journaling afterward about what you learned. This keeps the conversation warm and connected while still preserving important insights.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'conflict-as-connection',
          titleEn: 'Conflict as Connection',
          titleAr: 'الخلاف كوسيلة للتواصل',
          durationMinutes: 60,
          lesson: {
            contentEn: `Conflict in a relationship is not a sign that something is broken. In fact, the absence of conflict is often more concerning than its presence. When two people with different histories, temperaments, cultural backgrounds, and emotional needs come together, disagreement is not only inevitable — it is a healthy sign that both partners feel safe enough to express their authentic selves.

The problem is never conflict itself. The problem is how we engage with it. Research consistently shows that it is not whether couples fight but how they fight that predicts relationship outcomes. Dr. John Gottman identified four communication patterns — criticism, contempt, defensiveness, and stonewalling — which he calls the "Four Horsemen of the Apocalypse" because of their destructive impact on relationships. When these patterns dominate, even small disagreements can escalate into deeply wounding exchanges.

Criticism attacks your partner's character rather than addressing a specific behavior. "You never think about anyone but yourself" is criticism. A healthier alternative is a gentle start-up: "I felt lonely tonight when we did not talk over dinner. Can we set aside some time to connect?" Contempt — eye-rolling, sarcasm, mockery — communicates disgust and is the single strongest predictor of divorce. Defensiveness is a natural response to feeling attacked but blocks resolution because it sends the message, "The problem is not me." Stonewalling — withdrawing completely — often happens when one partner becomes physiologically flooded and shuts down.

To transform conflict into connection, three shifts are essential. First, approach disagreements with curiosity rather than certainty. Instead of assuming you know why your partner acted a certain way, ask. "Help me understand what was going on for you" opens a door that "Why would you do that?" slams shut.

Second, identify the deeper need beneath the complaint. When your partner is upset about you working late, the surface issue is time — but the deeper need might be reassurance that they are your priority. When you respond to the deeper need, the surface issue often resolves itself.

Third, learn to repair. Every couple has conflict. What distinguishes thriving couples from struggling ones is their ability to repair — to reach out during or after a disagreement with humor, affection, acknowledgment, or a simple apology. Repair attempts do not require grand gestures. "I am sorry I raised my voice. Can we try again?" can shift the entire trajectory of an argument.

In many cultures, direct confrontation is considered disrespectful, which means partners may suppress their needs until they reach a breaking point. Learning to express disagreement respectfully and early — before resentment accumulates — is a skill that honors both your cultural values and your emotional health.

Conflict, when handled with care, actually deepens intimacy. It shows both partners that the relationship is strong enough to hold difficult truths and that love does not require perfection — it requires honesty and effort.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I always remind the couples I work with: if you are having conflict, it means you both still care. The opposite of love is not anger — it is indifference. The couples who worry me most are the ones who have stopped arguing because they have stopped investing. Learning to fight well is one of the greatest gifts you can give your relationship.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              `Conflict is a natural part of healthy relationships — it is how you handle it that matters`,
              `Gottman's "Four Horsemen" (criticism, contempt, defensiveness, stonewalling) are the most destructive conflict patterns`,
              'Approaching disagreements with curiosity and identifying deeper needs transforms arguments into opportunities for closeness',
              'Repair attempts — small gestures of reconnection during or after conflict — are the hallmark of thriving couples',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about a recent disagreement with your partner. Can you identify which of the "Four Horsemen" showed up? What was the deeper need underneath the argument for each of you? How might the conversation have gone differently if you had approached with curiosity and made a repair attempt?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Repair Toolkit',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Together with your partner, create a personalized "repair toolkit." Each of you writes down 3-5 things the other person could say or do during a disagreement that would help you feel reconnected. Examples might include: a gentle touch on the hand, saying "I love you even when we disagree," using humor, or asking for a short break. Keep this list somewhere accessible and practice using these repair attempts during your next disagreement.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `Which of Gottman's "Four Horsemen" is the single strongest predictor of relationship dissolution?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Criticism', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Contempt', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Defensiveness', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Stonewalling', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is a "gentle start-up" in the context of conflict?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Starting a conversation very slowly and quietly', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Addressing a specific behavior and your feelings rather than attacking character', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Letting your partner speak first in every argument', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Bringing up issues only in therapy sessions', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is the absence of conflict sometimes more concerning than its presence?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because arguing builds character', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because it may indicate that partners have stopped investing in the relationship', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because all healthy couples fight daily', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because suppressed anger causes physical illness', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is a repair attempt?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A formal apology letter written after every argument', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Fixing the problem that caused the argument', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Any gesture — verbal or nonverbal — that de-escalates tension and reconnects partners during or after conflict', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Going to couples therapy after a serious fight', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner stonewalls and refuses to engage during conflict?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Stonewalling often happens when someone becomes physiologically overwhelmed — their heart rate spikes, thinking becomes foggy, and shutting down feels like the only option. Rather than pushing harder, try saying, "I can see this is overwhelming. Let us take a 20-30 minute break and come back to this." During the break, both partners should do something calming rather than rehearsing arguments. This approach respects the stonewaller's nervous system while keeping the issue on the table.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we address conflict when our cultural backgrounds handle disagreements very differently?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is a very common challenge in cross-cultural or bicultural relationships. Start by sharing how conflict was handled in each of your families growing up — without judging either approach. Then collaboratively create "our way" of handling disagreements that honors both backgrounds. You might agree that direct expression is valued, but that raising voices is off-limits. The key is making it a shared decision rather than defaulting to one cultural norm.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'emotional-bids-and-responses',
          titleEn: 'Emotional Bids and Responses',
          titleAr: 'العروض العاطفية والاستجابات',
          durationMinutes: 60,
          lesson: {
            contentEn: `Every day, in dozens of small moments, you and your partner are making what relationship researchers call "emotional bids." An emotional bid is any attempt — large or small, verbal or nonverbal — to connect with your partner. It might be a sigh, a comment about the weather, showing your partner something on your phone, reaching for their hand, or asking about their day. These bids are the building blocks of emotional intimacy.

Dr. John Gottman's extensive research found that the way couples respond to each other's bids is one of the most reliable predictors of relationship success. In his landmark study, he observed newlywed couples and tracked their bid-response patterns. Six years later, couples who were still together had "turned toward" each other's bids 86 percent of the time. Couples who had divorced had only turned toward 33 percent of the time.

There are three ways to respond to a bid. Turning toward means acknowledging the bid and engaging with it. If your partner says, "Look at this beautiful sunset," turning toward might be pausing what you are doing, looking out the window, and saying, "That is gorgeous." Turning away means missing or ignoring the bid — staying absorbed in your phone without responding. Turning against means responding with irritation or hostility: "Can you not see I am busy?"

The impact of these micro-moments is cumulative. No single ignored bid will end a relationship. But over weeks, months, and years, a pattern of turning away or against erodes the emotional bank account that sustains a partnership through difficult times. Conversely, consistently turning toward — even in small ways — builds a reservoir of trust and goodwill that makes the relationship resilient.

Many bids are easy to miss because they are subtle. A partner who mentions a stressful meeting is not just sharing information — they may be bidding for empathy. A partner who suggests watching a movie together is bidding for quality time. A partner who complains about a household task might be bidding for teamwork and acknowledgment.

Cultural and gender dynamics also influence bidding patterns. In some cultural contexts, direct emotional expression is discouraged, so bids may come in indirect forms — making your partner's favorite tea, adjusting the air conditioning without being asked, or sitting nearby in companionable silence. Partners who learn to recognize these culturally shaped bids are better equipped to respond with warmth.

The most transformative skill you can develop as a couple is not learning to have fewer conflicts or more romantic dates — it is learning to see and respond to the hundreds of tiny bids your partner makes every day. Each time you turn toward a bid, you are strengthening the foundation of your love. Each time, you are saying: "I see you. You matter to me. We are in this together."`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `One of the most powerful exercises I give couples is simply this: for one week, try to notice every time your partner makes a bid for connection, and respond to it — even briefly. Couples come back astonished by how many bids they had been missing. This awareness alone can shift the entire emotional climate of a relationship.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Emotional bids are any attempt to connect — from a sigh to a question to a touch — and they happen dozens of times daily',
              'Couples who stay together turn toward bids about 86% of the time; those who separate turn toward only about 33%',
              'Turning toward does not require grand gestures — brief, genuine acknowledgment is enough',
              'Bids can be culturally subtle; learning to recognize indirect bids is key to cross-cultural connection',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Over the past 24 hours, can you identify three bids you made to your partner and three bids your partner made to you? How were they received? Were any missed or turned against? How did it feel in each case?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Bid Tracker',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `For one full day, each partner keeps a small notebook or phone note and tracks: (1) bids they made toward their partner, (2) bids they received from their partner, and (3) how each bid was responded to (turned toward, away, or against). At the end of the day, compare notes. Discuss what surprised you, what patterns you notice, and one thing you each want to improve.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What is an emotional bid?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A formal request for your partner to do something', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Any attempt — verbal or nonverbal — to connect with your partner', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A compliment given during a romantic moment', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'An argument about unmet needs', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `In Gottman's research, what percentage of the time did couples who stayed together "turn toward" bids?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: '50%', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: '33%', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: '86%', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: '100%', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does "turning away" from a bid look like?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Responding with irritation or hostility', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Ignoring or missing the bid entirely, often due to distraction', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Saying "I need a minute" and coming back to it later', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Physically leaving the room', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why are emotional bids sometimes hard to recognize across cultural contexts?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because some cultures do not have emotional bids', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because bids are only verbal', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because in some cultures, bids are expressed indirectly through actions rather than words', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because cultural differences make connection impossible', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I realize I have been turning away from my partner's bids for years?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Awareness is the first and most important step. Rather than dwelling on guilt, focus on what you can do starting today. Begin noticing and turning toward even the smallest bids. Your partner will likely feel the shift. You might also share what you have learned — saying something like, "I have realized I have been missing a lot of your attempts to connect, and I want to change that" can be profoundly healing.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `Does turning toward a bid mean I always have to drop what I am doing?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Not at all. Turning toward can be as simple as a brief verbal acknowledgment: "That sounds interesting — can you tell me more in five minutes when I finish this?" The key is that your partner knows their bid was received and valued, not ignored. Even a small response is far better than silence.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 2: GROWTH ──────────────────
    {
      level: 2,
      titleEn: 'Growth',
      titleAr: 'النمو',
      subtitleEn: 'Deepening Your Partnership',
      subtitleAr: `[Arabic translation needed]`,
      descriptionEn: `Move beyond the basics into the real-life complexities that every couple faces — navigating differences, building financial harmony, nurturing intimacy in all its forms, and co-parenting as a united team.`,
      descriptionAr: `[Arabic translation needed]`,
      isFree: false,
      modules: [
        {
          slug: 'navigating-differences',
          titleEn: 'Navigating Differences',
          titleAr: 'التعامل مع الاختلافات',
          durationMinutes: 60,
          lesson: {
            contentEn: `When the excitement of early love settles into the rhythm of daily life, differences that once seemed charming can begin to feel frustrating. Perhaps one of you is spontaneous while the other needs to plan. One may process emotions by talking while the other needs silence. One grew up in a family that expressed affection openly while the other comes from a home where love was shown through actions rather than words.

These differences are not flaws — they are the natural result of two unique individuals choosing to share a life. Research in couples therapy consistently shows that approximately 69 percent of relationship conflicts are perpetual. This means most disagreements are not problems to solve but differences to manage with understanding and grace.

The first step in navigating differences is recognizing the difference between a solvable problem and a perpetual one. Solvable problems have a clear resolution — dividing household tasks, deciding where to spend the holidays this year. Perpetual problems are rooted in fundamental personality or value differences — one partner is more social while the other is introverted, or one values saving while the other prioritizes experiences.

With perpetual problems, the goal shifts from resolution to dialogue. The question is not "How do we fix this?" but "How do we live with this difference in a way that honors both of us?" This requires moving from positional thinking ("My way is right") to relational thinking ("How do we find a path that works for our partnership?").

Cultural differences add another important layer. When partners come from different ethnic, religious, or cultural backgrounds, the differences can touch on deeply held values around family roles, child-rearing, money, food, holidays, and gender expectations. These are not trivial differences — they connect to identity and belonging. Navigating them requires extra care, mutual respect, and genuine curiosity about your partner's worldview.

A powerful framework for navigating differences is the "two circles" exercise. Draw two overlapping circles. In each outer section, each partner writes their non-negotiable needs. In the overlapping center, you identify the areas of flexibility where compromise is possible. This visual makes it clear that honoring differences does not mean erasing your own needs — it means finding creative ways to hold space for both.

Acceptance is the cornerstone of navigating differences. This does not mean resigning yourself to unhappiness. It means choosing to love your whole partner — including the parts that are different from you — rather than loving only an idealized version you wish they could become. Paradoxically, when people feel accepted as they are, they often become more willing to stretch and grow.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `In my work with couples from diverse backgrounds, the biggest shift happens when partners stop trying to change each other and start trying to understand each other. Your differences are not obstacles to overcome — they are invitations to grow. The strongest couples I have seen are not the most similar. They are the ones who have learned to hold their differences with respect and even appreciation.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'About 69% of couple conflicts are perpetual — they require ongoing dialogue, not one-time solutions',
              'Distinguishing between solvable problems and perpetual differences changes how you approach conflict',
              'Cultural differences connect to identity and require extra care, curiosity, and mutual respect',
              'Acceptance of your whole partner — not just the easy parts — is the foundation for navigating differences',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Identify one perpetual difference between you and your partner. Write about the story behind your position — why does this matter to you? What values or experiences shape your stance? Then imagine what your partner might write about their position. What can you learn from seeing both stories side by side?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Two Circles Exercise',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Draw two overlapping circles on a large piece of paper. Choose one area where you consistently disagree (spending habits, socializing, parenting approaches, etc.). Each partner writes their non-negotiable needs in their outer circle. Then together, fill in the overlapping area with compromises you can both live with. Discuss how it feels to see your needs side by side and identify one small step you can take this week.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What percentage of couple conflicts are considered perpetual according to research?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'About 30%', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'About 50%', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'About 69%', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'About 90%', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is the goal when dealing with a perpetual problem?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Finding a permanent solution', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Getting your partner to change their position', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Maintaining ongoing dialogue that honors both perspectives', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Agreeing to never discuss the topic again', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What do the outer sections of the "two circles" exercise represent?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Things you dislike about your partner', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Each partner's non-negotiable needs', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Shared goals for the future', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Areas where you agree completely', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why does acceptance often lead to more willingness to change?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because accepted people feel guilty and try to improve', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because when people feel accepted as they are, they feel safer to stretch and grow', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because acceptance is a form of manipulation', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'It does not — acceptance means giving up on growth', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if a difference feels like a dealbreaker?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Not all differences can be navigated, and that is an important truth to honor. If a difference involves core values — such as whether to have children, how to handle finances fundamentally, or deeply mismatched life goals — it may require deeper exploration in couples therapy to determine whether creative compromise is possible or whether the difference is truly incompatible.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we handle differences when extended family gets involved?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Family involvement is especially common in collectivist cultures. The key is for the couple to present a united front, even when they are still working things out privately. Agree together on what boundaries to set with extended family, and support each other publicly. Each partner should take the lead in managing their own family of origin to reduce conflict and protect the relationship.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'financial-harmony',
          titleEn: 'Financial Harmony',
          titleAr: 'الانسجام المالي',
          durationMinutes: 60,
          lesson: {
            contentEn: `Money is one of the most common sources of tension in relationships — not because of the numbers themselves, but because of what money represents. For one person, money means security. For another, it represents freedom. For yet another, it is tied to family obligation or cultural expectations of generosity and hospitality. When two people with different money stories come together, financial disagreements are rarely about the budget — they are about values, fears, and identity.

Research from the American Psychological Association consistently ranks money as a top stressor in relationships. Yet most couples avoid talking about finances in depth, either because it feels uncomfortable, because one partner controls the finances, or because cultural norms discourage open financial discussion — particularly around women having financial autonomy.

The first step toward financial harmony is understanding your money story. Every person carries beliefs about money that were shaped in childhood. Did your family talk about money openly, or was it a taboo subject? Were you raised with scarcity or abundance? Was money used as a tool of control or as a shared resource? These early experiences create unconscious patterns that show up in how you spend, save, give, and argue about money today.

Sharing your money stories with your partner is a powerful intimacy exercise. When your partner understands that your need to save comes from growing up with financial instability, their frustration softens into compassion. When you understand that your partner's spending reflects a deep need to create joy and connection — perhaps because their family showed love through generosity — you can appreciate what drives them rather than judging it.

Creating financial harmony involves three practical foundations. First, establish transparency. Both partners should have full visibility into the household finances, including income, debts, savings, and spending. Financial secrecy erodes trust. Second, create a shared financial plan that reflects both partners' values. This is not about one person creating a budget the other must follow — it is a collaborative process where both voices carry equal weight. Third, maintain individual financial autonomy within the shared framework. Each partner having some personal spending money — no questions asked — preserves dignity and reduces resentment.

For immigrant and bicultural families, finances often carry the additional weight of remittances to family abroad, expectations around supporting extended family, and the stress of building a new life in an unfamiliar economic system. These pressures are real and valid, and they deserve dedicated conversation rather than being swept under the rug.

Financial harmony is not about having the same financial personality. It is about understanding each other's relationship with money, creating shared goals, and building a system that allows both partners to feel safe, heard, and respected.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `In my experience, money arguments are almost never really about money. They are about safety, control, values, and sometimes unresolved family dynamics. When I help couples explore their "money stories," the shift is immediate — suddenly the argument about a purchase becomes a conversation about what each person needs to feel secure. That is where healing begins.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Financial disagreements are usually about values, fears, and identity — not the numbers themselves',
              'Understanding your personal "money story" from childhood reveals the patterns driving current behavior',
              'Financial transparency, shared planning with equal voice, and individual autonomy form the foundation of financial harmony',
              'Bicultural families often carry additional financial pressures (remittances, family support) that deserve dedicated conversation',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Write about your earliest memory related to money. What messages did you receive about money growing up — both spoken and unspoken? How do you see those messages showing up in your current relationship? What would you like your partner to understand about your relationship with money?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'Money Stories Exchange',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Each partner independently writes a one-page "money autobiography" covering: how money was discussed (or not) in your family, your earliest money memory, what money means to you emotionally, and your biggest financial fear. Then share these with each other over a calm, uninterrupted meal. The goal is not to solve anything — it is to understand each other. Follow up by identifying three shared financial values that can guide your joint decisions.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'Why are financial disagreements rarely about the actual numbers?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because most people are bad at math', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because money represents deeper values, fears, and identity for each person', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because couples do not actually track their spending', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because one partner always controls the money', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What is a "money story"?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A financial plan for the future', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The beliefs and patterns about money formed from childhood experiences', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A record of all financial transactions', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'A story you tell yourself to justify spending', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Which of the following is NOT one of the three foundations of financial harmony described?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Financial transparency between partners', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'One partner managing all finances for efficiency', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A shared financial plan reflecting both values', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Individual autonomy with personal spending', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why do bicultural families often face additional financial pressures?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because they spend more on travel', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because of remittances, extended family support expectations, and navigating unfamiliar economic systems', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because they have higher incomes', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because they avoid discussing money entirely', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if one partner earns significantly more than the other?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Income disparity is common and can create uncomfortable power dynamics if not addressed openly. Many couples find that contributing proportionally (based on income percentage rather than equal dollar amounts) feels more equitable. What matters most is that both partners have equal voice in financial decisions regardless of who earns more. The relationship is a partnership, not a transaction.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we handle pressure from family to send money abroad?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is a deeply personal and cultural decision. The key is for the couple to discuss and agree on an amount that feels sustainable — one that honors family obligations without creating resentment or financial strain at home. Building this into your shared budget as a line item (rather than it being a source of surprise) creates predictability and shared ownership of the decision.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'intimacy-beyond-physical',
          titleEn: 'Intimacy Beyond Physical',
          titleAr: 'الألفة ما وراء الجسدية',
          durationMinutes: 60,
          lesson: {
            contentEn: `When most people hear the word "intimacy," they think of physical closeness. But true intimacy in a partnership is a multi-layered experience that encompasses emotional, intellectual, spiritual, and experiential dimensions — each one essential for a relationship that truly thrives.

Emotional intimacy is the feeling that you can share your innermost thoughts, fears, and dreams with your partner without fear of judgment. It is built through vulnerability — letting your partner see the parts of you that are uncertain, messy, or still forming. Research by Dr. Brene Brown has shown that vulnerability is not weakness; it is the birthplace of connection, creativity, and belonging. Yet many people — particularly those raised in cultures that value stoicism or emotional restraint — find vulnerability deeply uncomfortable.

Intellectual intimacy involves sharing ideas, curiosity, and stimulating conversation. Couples who maintain intellectual connection report higher satisfaction over time. This means continuing to ask each other questions, sharing articles or podcasts that excited you, debating ideas respectfully, and remaining curious about your partner's evolving worldview. When intellectual intimacy fades, partners often describe feeling like "roommates" — coexisting but not truly connecting.

Spiritual intimacy does not require shared religious belief. It means connecting on questions of meaning, purpose, and values. What do you both believe matters most in life? How do you make sense of suffering? What gives you hope? Couples who explore these questions together often find a depth of connection that transcends daily logistics.

Experiential intimacy is built through shared adventures — trying new restaurants, traveling, learning a skill together, or even navigating a crisis as a team. Novel experiences activate the brain's reward system and can reignite feelings of excitement and attraction that naturally diminish with familiarity.

Physical intimacy, of course, remains important. But it functions best when it rests on the foundation of these other dimensions. Couples who feel emotionally safe, intellectually engaged, spiritually aligned, and experientially connected naturally find their physical connection more satisfying and meaningful.

One of the greatest threats to intimacy is the assumption that it should happen naturally. In reality, intimacy requires intentional nurturing — especially during busy seasons of life like early parenthood, career transitions, or caregiving. Scheduling connection time is not unromantic; it is a commitment to keeping your relationship at the center of your life.

Cultural expectations can also shape intimacy patterns. In some traditions, emotional openness between spouses is not modeled, making it unfamiliar territory. Recognize that building new intimacy patterns is a shared learning process, and extend patience and encouragement to both yourself and your partner as you grow.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I often tell couples that physical intimacy is the tip of the iceberg — what lies beneath is emotional safety, intellectual curiosity, and shared meaning. When couples come to me saying the "spark" has faded, we almost always find that one or more of these deeper dimensions of intimacy has been neglected. Rekindling the spark rarely starts in the bedroom. It starts with a real conversation over coffee.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'True intimacy has five dimensions: emotional, intellectual, spiritual, experiential, and physical',
              'Vulnerability is the foundation of emotional intimacy and requires feeling safe from judgment',
              'Physical intimacy thrives when it rests on a foundation of the other four dimensions',
              'Intimacy requires intentional nurturing — especially during demanding life stages',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Consider the five dimensions of intimacy: emotional, intellectual, spiritual, experiential, and physical. Which feels strongest in your relationship right now? Which feels most neglected? What is one thing you could do this week to nurture the dimension that needs the most attention?`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Intimacy Inventory',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Each partner independently rates each of the five dimensions of intimacy on a scale from 1 to 10 (emotional, intellectual, spiritual, experiential, physical). Then compare your ratings. Where do you agree? Where do your perceptions differ? Choose one dimension to focus on together this month and plan three specific actions to nurture it — for example, for intellectual intimacy: read the same book and discuss it, for experiential: try a new activity together each weekend.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What are the five dimensions of intimacy described in this module?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Physical, romantic, financial, social, and creative', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Emotional, intellectual, spiritual, experiential, and physical', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Trust, communication, respect, passion, and commitment', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Verbal, nonverbal, digital, written, and physical', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `According to Dr. Brene Brown's research, what is vulnerability?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'A sign of weakness in relationships', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Something to avoid to protect yourself', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The birthplace of connection, creativity, and belonging', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Only appropriate in therapy settings', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What do couples often describe when intellectual intimacy fades?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Feeling like business partners', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Feeling like roommates — coexisting but not connecting', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Feeling more attracted to each other', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Feeling ready to have children', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is scheduling connection time considered important rather than unromantic?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because therapists recommend it', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because it shows commitment to keeping the relationship a priority during busy life stages', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because spontaneity is overrated', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because most couples have nothing else to do', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner is not comfortable with emotional vulnerability?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Comfort with vulnerability exists on a spectrum and is heavily influenced by upbringing and culture. Instead of pushing, model vulnerability yourself by sharing something personal and giving your partner space to respond at their own pace. Create safety by responding with warmth when they do open up. Over time, as trust builds, most people become more comfortable with deeper emotional sharing.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we maintain intimacy when we have young children and are exhausted?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is one of the most common challenges couples face. Start small and realistic — even ten minutes of focused conversation after the children are in bed counts. Consider "micro-dates" like cooking together after bedtime, or sending each other thoughtful messages during the day. The goal is consistent small connections rather than rare grand gestures. Acknowledge to each other that this season is hard, and commit to protecting your connection within it.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'co-parenting-as-a-team',
          titleEn: 'Co-Parenting as a Team',
          titleAr: 'التربية المشتركة كفريق',
          durationMinutes: 60,
          lesson: {
            contentEn: `When children enter a relationship, the dynamic shifts in profound ways. Suddenly, two people who have been focused on each other must now share their attention, energy, and emotional bandwidth with one or more small humans who need constant care. This transition — while beautiful — is also one of the most challenging periods in any partnership.

Research by the Gottman Institute found that approximately 67 percent of couples experience a significant decline in relationship satisfaction within the first three years of their first child's birth. This decline is not inevitable, but preventing it requires intentional effort and a shared approach to parenting.

The foundation of effective co-parenting is presenting a united front. This does not mean agreeing on everything — that would be unrealistic. It means having difficult conversations about parenting values, discipline approaches, and expectations in private, and then supporting each other publicly. When children sense division between their parents, they feel unsafe and may learn to play one parent against the other — not out of malice, but out of a natural desire to get their needs met.

Cultural backgrounds heavily influence parenting styles. In many Middle Eastern, South Asian, and African cultures, parenting is a collective endeavor involving grandparents, aunts, uncles, and community elders. In Western settings, the nuclear family model often means two parents carry the entire load alone. When partners come from different cultural models, tensions can arise: one partner may welcome family involvement while the other feels it is intrusive. Neither perspective is wrong — but finding your shared approach requires open, respectful dialogue.

Gender expectations also play a significant role. Despite progress toward equality, research consistently shows that mothers in heterosexual partnerships still carry a disproportionate share of childcare and household management — what sociologists call "the mental load." This imbalance breeds resentment and exhaustion. Addressing it requires honest conversation about role expectations and a willingness to redistribute responsibilities based on capacity rather than tradition alone.

Effective co-parenting also means protecting the couple relationship within the family. Children benefit most from parents who genuinely enjoy each other's company. Modeling a healthy, respectful, affectionate partnership teaches children what love looks like far more effectively than any parenting book. Making time for your relationship — even in small ways — is not selfish. It is one of the best things you can do for your children.

When disagreements arise about parenting — and they will — return to the communication skills from earlier modules: listen with curiosity, identify the deeper value behind each position, and seek solutions that honor both perspectives. Remember that you are on the same team, and the goal is your child's wellbeing and your family's strength.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I have seen many couples arrive in my office having forgotten that they are partners first and parents second. The most effective parents I have worked with are those who protect their relationship alongside their children's needs. Your children do not need perfect parents — they need parents who love and respect each other. That security is the greatest gift you can give them.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'About 67% of couples experience a decline in relationship satisfaction after their first child — but it is preventable with intentional effort',
              'Presenting a united front does not mean agreeing on everything; it means supporting each other publicly and discussing differences privately',
              'Cultural backgrounds and gender expectations significantly shape co-parenting dynamics and deserve open conversation',
              'Protecting the couple relationship within the family is one of the best things parents can do for their children',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about the parenting you received growing up. What aspects do you want to carry forward with your own children? What would you like to do differently? How do your answers compare with your partner's? Write about the kind of parenting team you want to be.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Parenting Values Map',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Each partner independently writes their top 5 parenting values (e.g., independence, respect for elders, creativity, academic achievement, emotional expression, faith, resilience). Compare your lists. Where do you align? Where do you differ? For areas of difference, have a curious conversation about the cultural or personal experience behind each value. Then create a shared "Family Values Statement" of 5-7 values you both commit to guiding your parenting.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What percentage of couples experience a decline in satisfaction after their first child?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'About 25%', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'About 50%', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'About 67%', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'About 90%', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: `What is "the mental load" in the context of parenting?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'The stress of helping children with homework', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The invisible work of managing household logistics, schedules, and childcare planning', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'The emotional impact of having a difficult child', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The financial burden of raising children', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is protecting the couple relationship important for children?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'So children learn that their needs come second', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because it models a healthy, respectful partnership and provides emotional security', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because children do not need attention from their parents', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'So parents can avoid dealing with parenting stress', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does "presenting a united front" in co-parenting mean?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Never disagreeing about parenting', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'One parent always deferring to the other', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Discussing differences privately and supporting each other in front of children', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Hiding all emotions from children', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I have fundamentally different discipline approaches?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is very common, especially when partners come from different cultural backgrounds. Start by understanding the values behind each approach — one parent may value respect and structure while the other prioritizes autonomy and self-expression. Look for overlap and create shared guidelines you both commit to. When in doubt, err on the side of consistency — children thrive with predictable expectations. A family therapist can help you develop a unified approach.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we handle conflicting advice from grandparents and extended family?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Extended family involvement in parenting is a reality for many families — and it can be a wonderful resource when boundaries are clear. The couple should first agree on core parenting decisions, then communicate these boundaries kindly but firmly to extended family. You might say, "We appreciate your experience and love for our children. Here is how we have decided to handle this." Acknowledging their care while maintaining your autonomy preserves relationships without compromising your parenting approach.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
      ],
    },

    // ────────────────── LEVEL 3: MASTERY ──────────────────
    {
      level: 3,
      titleEn: 'Mastery',
      titleAr: 'الإتقان',
      subtitleEn: 'Building a Lasting Legacy',
      subtitleAr: `[Arabic translation needed]`,
      descriptionEn: `Address the most profound challenges and aspirations in partnership — rebuilding trust after betrayal, growing through major life transitions, creating shared meaning, and designing the relationship legacy you want to leave behind.`,
      descriptionAr: `[Arabic translation needed]`,
      isFree: false,
      modules: [
        {
          slug: 'rebuilding-trust',
          titleEn: 'Rebuilding Trust',
          titleAr: 'إعادة بناء الثقة',
          durationMinutes: 60,
          lesson: {
            contentEn: `Trust is the invisible architecture of every relationship. When it is intact, you rarely think about it — it simply holds everything together. But when trust is broken, whether through infidelity, deception, financial betrayal, or broken promises, the entire structure shakes. Rebuilding it is one of the most difficult and courageous things a couple can do.

Trust breaks come in many forms and degrees. At one end, there are small trust erosions — repeatedly forgetting commitments, sharing private information with others, or dismissing your partner's concerns. At the other end are major betrayals — affairs, hidden debts, or significant lies. While the severity differs, the emotional impact follows a similar pattern: shock, pain, questioning of reality, and a deep sense of vulnerability.

Research by Dr. John Gottman and Dr. Julie Schwartz Gottman on trust and betrayal identifies three phases of rebuilding: Atone, Attune, and Attach. In the Atonement phase, the partner who broke trust must fully acknowledge the harm done — without minimizing, deflecting blame, or rushing past the pain. The betrayed partner needs space to express their hurt as many times as necessary. This phase cannot be rushed; attempting to skip it is one of the most common reasons trust repair fails.

In the Attunement phase, both partners work to rebuild emotional connection through the skills explored in earlier modules — active listening, emotional bids, and vulnerability. The partner who broke trust demonstrates consistent behavioral change over time, not just remorse in the moment. Trust is rebuilt not through words alone but through reliable, predictable actions that accumulate day after day.

The Attachment phase represents a renewed commitment — a conscious choice to build a new version of the relationship that is informed by the past but not defined by it. This phase often includes creating new relationship agreements, establishing transparent practices (such as open access to phones or accounts, if mutually agreed), and developing a shared narrative of what happened, why, and how you have grown.

It is important to acknowledge that trust can be rebuilt — but the relationship will not return to what it was before. It becomes something different. Many couples report that their rebuilt relationship is actually deeper and more honest than the original, precisely because they have been forced to confront difficult truths and choose each other consciously.

Cultural and religious contexts significantly shape how betrayal and forgiveness are processed. Some traditions emphasize forgiveness as a spiritual duty; others prioritize family preservation above individual grievances. Honor these frameworks while also ensuring that both partners' emotional needs are genuinely addressed — not just suppressed in service of cultural expectation.

Rebuilding trust is not a linear process. There will be setbacks, triggers, and days when the pain feels fresh again. This is normal. What matters is the overall trajectory — a gradual, imperfect movement toward safety, honesty, and renewed connection.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `Trust repair is some of the most sacred work I do with couples. When both partners are willing to face the pain honestly and commit to rebuilding, the transformation can be remarkable. I always say: the fact that you are here, trying, is itself an act of love. Not every relationship can or should be saved after a betrayal — but when both partners choose to rebuild, the new relationship can be stronger than what existed before.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Trust rebuilding follows three phases: Atone (acknowledge harm), Attune (rebuild emotional connection), and Attach (renew commitment)',
              'The atonement phase cannot be rushed — the betrayed partner needs space to express their pain fully',
              'Trust is rebuilt through consistent, reliable actions over time — not through words alone',
              'The rebuilt relationship becomes something new and can be deeper than the original',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about trust in your relationship. Has there been a moment — large or small — where trust was tested or broken? Without judgment toward yourself or your partner, write about what happened, how it affected you, and what you would need to feel safe again. If trust is strong in your relationship, write about what practices help maintain it.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Trust Inventory',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Together, create a "trust inventory" by each completing these sentences independently: "I feel most trusting of you when..." (list 3 situations), "My trust feels shaky when..." (list 3 situations), and "One thing that would strengthen my trust is..." (list 1 action). Share your responses with compassion and curiosity. Then each commit to one specific, observable action you will take this week to actively build trust.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the three phases of trust rebuilding according to the Gottmans' research?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Apologize, Forget, Move On', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Atone, Attune, Attach', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Confess, Commit, Change', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Accept, Adapt, Advance', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why does attempting to skip the atonement phase often cause trust repair to fail?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because the betrayed partner needs external validation first', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because the betrayed partner needs full acknowledgment of harm and space to express their pain', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because atonement requires a formal ceremony', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because therapists insist on a specific timeline', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How is trust primarily rebuilt over time?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Through one sincere apology', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Through consistent, reliable actions that accumulate day after day', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Through avoiding the topic entirely', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Through monitoring your partner constantly', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What do many couples report about their relationship after successfully rebuilding trust?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'That it returned to exactly how it was before', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That it became something new — often deeper and more honest than the original', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'That they wish they had ended the relationship instead', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That they no longer experience any conflict', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `How long does it take to rebuild trust after a major betrayal?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `There is no fixed timeline, but research and clinical experience suggest that meaningful trust repair after a significant betrayal typically takes one to two years of consistent effort. Healing is not linear — there will be good days and hard days. The key markers of progress are not the absence of pain but the presence of increasing safety, transparency, and reconnection over time.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `Is it possible to rebuild trust without professional help?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `While some couples do navigate minor trust breaks independently, major betrayals strongly benefit from professional guidance. A therapist provides a safe, structured space for both partners to process their emotions, prevents harmful communication patterns from derailing the process, and helps the couple develop practical strategies for rebuilding. Think of it as having a skilled guide for one of the most difficult journeys you will ever take.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'growing-together-through-change',
          titleEn: 'Growing Together Through Change',
          titleAr: 'النمو معًا عبر التغيير',
          durationMinutes: 60,
          lesson: {
            contentEn: `Life is constant change, and no relationship is exempt from it. Career shifts, immigration, health challenges, aging parents, children growing up and leaving, financial ups and downs, spiritual evolution — each transition reshapes the landscape of your partnership and requires you to find each other again within new terrain.

The couples who thrive through change are not those who avoid difficulty. They are those who face it together with flexibility, communication, and a shared commitment to adapting. Relationship researcher Dr. Sue Johnson describes this as "hold me tight" — the fundamental human need to know that your partner will be there for you, especially when life feels uncertain.

One of the biggest risks during major transitions is that partners change at different paces or in different directions. One partner might embrace a new country enthusiastically while the other mourns the life they left behind. One might undergo a profound spiritual or personal transformation while the other feels left behind. These divergences are normal, but they require deliberate attention to prevent growing apart.

The key skill for navigating change together is what therapists call "co-regulation." This means using your relationship as a safe base from which to face the world. When one partner is struggling, the other provides steady, calming presence — not by fixing the problem, but by saying through their actions: "I am here. We will figure this out." When both partners need support simultaneously, they take turns being the anchor.

Immigration is a particularly significant transition that many Mama Hala families navigate. Moving to a new country involves grieving the familiar while building something new. It reshapes identity, social networks, language, career trajectories, and family roles. Couples who navigate immigration well are those who create space for both the grief and the excitement, who acknowledge that each partner's adjustment timeline is different, and who actively build new shared experiences in their adopted home.

Health challenges — whether physical illness, mental health struggles, or disability — test a partnership in profound ways. The healthy partner may take on a caregiving role that shifts the power dynamic. The unwell partner may feel guilty, frustrated, or isolated. Maintaining equality, emotional connection, and honest communication during health challenges requires extra intentionality and often the support of a therapist or counselor.

Through all changes, two anchors keep couples grounded. First, returning regularly to your shared values and vision — what matters most to both of you remains your compass even when the landscape shifts. Second, maintaining rituals of connection: the morning coffee together, the weekend walk, the way you say goodnight. These small, consistent rituals create stability amid chaos.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `I have walked alongside many families through immigration, illness, and life transitions, and I have seen how change can either pull a couple apart or forge them closer together. The difference almost always comes down to one thing: whether both partners feel they are facing the change as a team. You do not need to have all the answers. You need to hold hands while you search for them.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Thriving through change requires flexibility, communication, and commitment to adapting together',
              'Co-regulation — using your relationship as a safe base — is essential during major life transitions',
              'Partners often change at different paces; acknowledging different timelines prevents growing apart',
              'Rituals of connection and shared values serve as anchors that provide stability amid change',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Think about the biggest change or transition you and your partner have navigated together. What helped you get through it? What would you do differently? How did the experience change your relationship? If you are currently in a transition, write about what you need most from your partner right now.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Change Timeline',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Together, draw a timeline of your relationship and mark the major transitions you have experienced (moves, career changes, births, losses, immigration, health events, etc.). For each one, discuss: How did we handle this? What brought us closer? What pushed us apart? What did we learn? Then look ahead — what changes do you anticipate in the next five years? How can you prepare to face them as a team?`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is "co-regulation" in a relationship context?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Both partners controlling each other's behavior', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Using the relationship as a safe base and providing calming presence for each other during stress', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Following the same daily schedule', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Regulating finances together', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What is the biggest risk during major transitions?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'That the transition itself is too difficult', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That financial stress will be overwhelming', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'That partners change at different paces or in different directions without deliberate attention', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'That extended family will interfere', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What two anchors help couples stay grounded through change?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Financial security and social support', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Returning to shared values/vision and maintaining rituals of connection', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Avoiding the topic and staying positive', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Individual therapy and separate vacations', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why does immigration pose a unique challenge for couples?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because it only affects one partner', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because it reshapes identity, social networks, career, and family roles simultaneously', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because it always improves relationships', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because it is a short-term disruption', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I are growing in completely different directions?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Growing in different directions does not automatically mean growing apart — many strong couples have distinct individual paths that enrich the partnership. The critical question is whether you are still emotionally connected and committed to your shared life. Regular check-ins about where each of you is heading, what matters to you now, and how your individual growth can complement rather than compete will help you stay connected through evolution.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we support each other when we are both struggling at the same time?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `This is one of the hardest situations in a partnership. The key is taking turns — even within a single day. You might agree that mornings are when one partner leans on the other, and evenings reverse. Also, recognize that external support (friends, family, therapists, community) is not a failure of the relationship — it is wisdom. No one person can meet all of another's needs, and seeking support elsewhere relieves pressure on the partnership.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'creating-shared-meaning',
          titleEn: 'Creating Shared Meaning',
          titleAr: 'خلق معنى مشترك',
          durationMinutes: 60,
          lesson: {
            contentEn: `At the highest level of relationship development lies what Dr. John Gottman calls the "shared meaning system" — the values, rituals, goals, and narratives that give a partnership its unique identity and purpose. This is the level where a relationship transcends daily logistics and becomes something deeper: a shared life that is greater than the sum of its two parts.

Every couple, whether they realize it or not, is creating shared meaning through the stories they tell about their relationship, the traditions they establish, the dreams they nurture, and the values they embody in daily life. When this process is conscious and intentional, it becomes one of the most powerful sources of relationship satisfaction and resilience.

Shared meaning is built through four pillars. The first is rituals of connection. These are the predictable, meaningful practices that define your life together — how you greet each other, how you celebrate birthdays, how you spend Sunday mornings, or how you mark the arrival of a new season. Rituals need not be elaborate. A nightly walk, a weekly movie night, or a morning cup of coffee shared in comfortable silence can anchor your partnership in joy and familiarity.

The second pillar is shared goals. What are you building together? Perhaps it is creating a warm, stable home for your children. Perhaps it is growing a business, contributing to your community, or saving for a dream trip. Shared goals give the relationship direction and a sense of forward movement. They also provide natural opportunities for collaboration and celebration.

The third pillar is shared values. What matters most to both of you? Integrity, family, faith, adventure, education, service, creativity? When couples articulate their shared values, decision-making becomes clearer — because choices can be measured against what you both agree is most important. Values also provide a compass during times of conflict or uncertainty.

The fourth pillar is shared narratives. How do you tell the story of your relationship? Couples who tell their story with warmth, humor, and a sense of "we-ness" — emphasizing what they have overcome together rather than what has gone wrong — have stronger, more resilient partnerships. The narrative you create about your relationship shapes how you experience it.

Cultural and family heritage plays a powerful role in shared meaning. Many families draw deeply from religious traditions, cultural celebrations, ancestral stories, and community practices. Integrating these into your partnership — especially when you come from different backgrounds — creates a rich tapestry of shared meaning that honors both of your histories while building something new.

Creating shared meaning is not a one-time conversation. It is an ongoing, evolving process that deepens as your relationship matures. The couples who invest in this dimension report feeling that their partnership has genuine purpose — that together, they are building something beautiful and lasting.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `When I ask long-married couples what has kept them together, the answer is rarely about communication skills or conflict resolution — though those matter. The most common answer is a sense of shared purpose: "We are building something together." That feeling of being partners in a meaningful life project is what carries couples through the hardest times. I encourage you to dream together, not just manage life together.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Shared meaning is built through four pillars: rituals of connection, shared goals, shared values, and shared narratives',
              'Rituals need not be elaborate — small, consistent practices anchor a partnership in joy',
              'Couples who tell their relationship story with warmth and "we-ness" have more resilient partnerships',
              'Cultural and family heritage enriches shared meaning, especially when both backgrounds are honored',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `If you were to describe the "mission statement" of your relationship in 2-3 sentences, what would it say? What are you building together that matters most? Share your answer with your partner and see how your visions align.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'The Shared Meaning Map',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Create a large poster or document with four quadrants: Rituals, Goals, Values, Narratives. Together, fill in each section. Under Rituals, list the ones you currently have and ones you would like to create. Under Goals, write your shared dreams for the next 1, 5, and 10 years. Under Values, list the principles that guide your family. Under Narratives, write a brief, warm version of "our story" — how you met, what you have overcome, and where you are headed. Display this somewhere you can both see it regularly.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the four pillars of Gottman's shared meaning system?`,
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Communication, respect, passion, and commitment', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Rituals of connection, shared goals, shared values, and shared narratives', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Trust, intimacy, conflict resolution, and friendship', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Financial planning, parenting, career growth, and leisure', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What role do shared narratives play in relationship resilience?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'They help couples remember facts about their relationship history', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Couples who tell their story with warmth and "we-ness" have stronger partnerships', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Narratives are only important for couples in therapy', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Shared narratives are a form of denial about relationship problems', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why are rituals of connection important even when they are small?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Because grand rituals are too expensive', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because they create predictable, meaningful practices that anchor the partnership in familiarity and joy', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because research requires couples to have exactly five rituals', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because children need routine more than adults', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How does cultural heritage contribute to shared meaning?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'It creates conflict between partners from different backgrounds', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Cultural heritage is irrelevant in modern relationships', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Integrating cultural traditions creates a rich tapestry that honors both histories while building something new', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'One partner should adopt the other's cultural traditions entirely', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if my partner and I have very different visions for the future?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Different visions are an invitation to co-create something neither of you would have imagined alone. Start by sharing your individual dreams without criticism. Then look for the values underneath those dreams — you may find more alignment than you expect. The goal is not identical visions but compatible ones that can coexist and enrich each other. A therapist can help facilitate this conversation if it feels too charged.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we create shared meaning when we come from very different cultural backgrounds?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Cross-cultural couples have a unique opportunity to build incredibly rich shared meaning by drawing from both traditions. Start by each sharing the traditions, celebrations, and values that matter most to you. Then co-create new traditions that blend elements from both cultures — perhaps a holiday meal that combines dishes from both backgrounds, or a family gathering that incorporates both languages. The key is approaching both cultures with equal respect and genuine curiosity.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
        {
          slug: 'your-relationship-legacy',
          titleEn: 'Your Relationship Legacy',
          titleAr: 'إرث علاقتكما',
          durationMinutes: 60,
          lesson: {
            contentEn: `Every relationship leaves a legacy — a lasting imprint on the people within it, the children who witness it, the families it touches, and the communities it serves. In this final module, we step back from the skills and strategies of earlier lessons and consider the bigger picture: What kind of relationship are you building? What will it teach your children, your extended family, and your community about love, partnership, and resilience?

Legacy is not about perfection. No relationship is free of struggle, misunderstanding, or seasons of disconnection. Legacy is about the overall pattern — the predominant tone of your partnership. Is it one of respect and kindness, even during disagreements? Is it one of mutual support, where each partner helps the other grow? Is it one of authenticity, where both people feel free to be themselves?

Consider the legacy you inherited from your own parents and families. Perhaps you witnessed a marriage of deep devotion that endured hardship. Perhaps you saw a partnership that struggled with communication but expressed love through sacrifice. Perhaps the relationship modeled for you was one you want to do differently. Understanding your inherited relationship legacy is the first step in consciously creating the one you want to leave behind.

Children are exquisitely sensitive observers of their parents' relationship. Research on attachment and family systems shows that children develop their understanding of love, conflict, and emotional safety primarily through watching their parents interact. A child who sees their parents repair after arguments learns that conflict is not the end of the world. A child who witnesses respect and affection learns that love is safe. These lessons shape their future relationships more powerfully than any words.

Your relationship legacy also extends to your community. In many cultures, couples serve as models and mentors for younger families. Your commitment to growth, your willingness to seek help when needed, and your honest engagement with the challenges of partnership give others permission to do the same. When you invest in your relationship, you are investing in your community's relational health.

To consciously create your legacy, begin with three questions. First: What do we want our children to learn about love from watching us? Second: What values do we want to embody in how we treat each other daily? Third: If our relationship had a "purpose statement," what would it say?

As you complete this program, remember that the work of building a great partnership is never finished — it is a lifelong practice. The skills, insights, and reflections from these modules are not one-time lessons but tools you will return to again and again as your relationship grows, faces challenges, and deepens. You have invested in something profoundly worthwhile: the health and vitality of the most important partnership in your life.

Congratulations on completing Stronger Together. Dr. Hala and the entire Mama Hala team are honored to have walked this path with you. May your relationship continue to be a source of strength, joy, and meaning for years to come.`,
            contentAr: `[Arabic translation needed]`,
          },
          drHalaNote: {
            en: `As you complete this journey, I want you to know how deeply I admire your commitment to each other. Investing in your relationship is one of the bravest and most loving things you can do. You are not just building a better partnership — you are shaping the future for your children, your family, and your community. I am honored to have been part of this journey with you.`,
            ar: `[Arabic translation needed]`,
          },
          keyTakeaways: {
            en: [
              'Every relationship leaves a legacy — an imprint on children, family, and community',
              'Children learn about love primarily by watching their parents interact, not through instruction',
              'Understanding your inherited relationship legacy helps you consciously choose the one you create',
              'A relationship with purpose — guided by shared values and intentional practice — creates lasting positive impact',
            ],
            ar: [
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
              '[Arabic translation needed]',
            ],
          },
          reflection: {
            promptEn: `Imagine your children or grandchildren describing your relationship to someone. What would you want them to say? Write a brief "letter to the future" about the relationship legacy you want to leave — the values, the warmth, and the lessons you hope your partnership will teach those who come after you.`,
            promptAr: `[Arabic translation needed]`,
          },
          activity: {
            titleEn: 'Your Legacy Letter',
            titleAr: `[Arabic translation needed]`,
            descriptionEn: `Together, write a "Relationship Legacy Letter" addressed to your future selves — or to your children. In this letter, describe the relationship you are committed to building: the values that guide you, the way you want to treat each other, and the love you want to model. Include what you have learned from this program and one commitment each of you makes going forward. Seal the letter and set a date one year from now to reopen and reflect on it together.`,
            descriptionAr: `[Arabic translation needed]`,
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: 'What is a relationship legacy?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'The financial assets a couple passes to their children', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The lasting imprint a relationship leaves on children, family, and community', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'A couple's social media presence', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'The length of a marriage', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'How do children primarily learn about love and relationships?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Through direct instruction from parents', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Through school programs about relationships', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'By observing how their parents interact with each other', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Through books and media', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'Why is understanding your inherited relationship legacy important?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'So you can blame your parents for your problems', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Because it helps you consciously choose what to continue and what to change', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Because you must replicate your parents' relationship', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'It is not important — only the present matters', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
              {
                textEn: 'What does the module describe as the best approach to building a great partnership?',
                textAr: `[Arabic translation needed]`,
                options: [
                  { labelEn: 'Completing one program and never looking back', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Achieving perfection in all areas of the relationship', labelAr: `[Arabic translation needed]`, correct: false },
                  { labelEn: 'Treating it as a lifelong practice with tools you return to again and again', labelAr: `[Arabic translation needed]`, correct: true },
                  { labelEn: 'Relying entirely on a therapist for guidance', labelAr: `[Arabic translation needed]`, correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if the legacy I inherited from my parents was harmful?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Many people carry painful relationship legacies from their families of origin. The powerful truth is that you are not destined to repeat what you witnessed. By becoming aware of the patterns you inherited, developing new skills (like the ones in this program), and potentially working with a therapist to heal old wounds, you can consciously create a different legacy. Breaking a negative cycle is one of the most courageous and impactful things a person can do.`,
              answerAr: `[Arabic translation needed]`,
            },
            {
              questionEn: `How do we maintain the growth from this program long-term?`,
              questionAr: `[Arabic translation needed]`,
              answerEn: `Think of this program as a foundation, not a finish line. Schedule regular "relationship check-ins" — perhaps monthly — where you revisit the skills and reflections from these modules. Practice the activities periodically. Return to specific modules during relevant life transitions. And consider ongoing support through couples therapy, workshops, or relationship retreats. Growth is not a destination — it is a practice you choose every day.`,
              answerAr: `[Arabic translation needed]`,
            },
          ],
        },
      ],
    },
  ],
  certificate: {
    titleEn: 'Stronger Together — Couples Program Completion',
    titleAr: 'أقوى معًا — إتمام برنامج الأزواج',
    signedBy: 'Dr. Hala Borno',
  },
  whoIsThisFor: {
    en: [
      'Couples who want to deepen their emotional connection and communication',
      'Partners navigating cultural differences or bicultural family dynamics',
      'Couples preparing for or adjusting to major life transitions',
      'Partners who want to rebuild trust and strengthen their foundation',
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
      'Evidence-based communication skills that transform how you connect',
      'How to navigate conflict, differences, and major life changes as a team',
      'Tools for building financial harmony, nurturing intimacy, and co-parenting effectively',
      'How to rebuild trust, create shared meaning, and design your relationship legacy',
    ],
    ar: [
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
    ],
  },
};
