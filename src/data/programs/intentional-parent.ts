import type { AcademyProgram } from '@/types';

export const intentionalParentProgram: AcademyProgram = {
  slug: 'intentional-parent',
  titleEn: 'The Intentional Parent',
  titleAr: 'الوالد الواعي',
  descriptionEn: 'A transformative program designed to help families build deeper emotional connections, set healthy boundaries, and raise confident children rooted in love and understanding.',
  descriptionAr: 'برنامج تحويلي مصمم لمساعدة العائلات على بناء روابط عاطفية أعمق ووضع حدود صحية وتربية أطفال واثقين متجذرين في الحب والتفاهم.',
  longDescriptionEn: `The Intentional Parent is Mama Hala Academy's flagship family program. Across three carefully designed levels, you will move from understanding the emotional foundations of parenting to mastering the art of raising emotionally intelligent, culturally grounded children. Whether you are a new parent or navigating the complexities of growing families, this program meets you where you are and guides you forward with compassion, research-backed strategies, and practical tools you can use today.`,
  longDescriptionAr: '[Arabic translation needed]',
  category: 'families',
  image: '/images/academy/intentional-parent.jpg',
  color: '#7A3B5E',
  icon: 'Heart',
  isFree: false,
  priceCAD: 149,
  totalModules: 15,
  totalDurationHours: 12,
  certificate: {
    titleEn: 'The Intentional Parent - Certificate of Completion',
    titleAr: 'الوالد الواعي - شهادة إتمام',
    signedBy: 'Dr. Hala',
  },
  whoIsThisFor: {
    en: [
      'Parents of children ages 2-12 looking to strengthen emotional bonds',
      'Caregivers who want to move from reactive to intentional parenting',
      'Families navigating cultural identity and modern parenting challenges',
      'Parents who want practical, evidence-based strategies they can use immediately',
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
      'How to decode your child\'s emotional signals and respond with empathy',
      'Boundary-setting techniques that maintain warmth and connection',
      'Daily rituals that build security and trust in your family',
      'Culturally sensitive discipline strategies that preserve dignity',
      'Tools for raising emotionally intelligent, resilient children',
    ],
    ar: [
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
      '[Arabic translation needed]',
    ],
  },
  levels: [
    // ── Level 1: Foundation (Free) ──────────────────────────────
    {
      level: 1,
      titleEn: 'Foundation',
      titleAr: 'الأساس',
      subtitleEn: 'Building Your Parenting Foundation',
      subtitleAr: 'بناء أساس التربية',
      descriptionEn: 'Discover the emotional landscape of your child and learn the core skills of intentional, connected parenting.',
      descriptionAr: '[Arabic translation needed]',
      isFree: true,
      modules: [
        // ── Module 1.1 ──
        {
          slug: 'understanding-childs-emotional-world',
          titleEn: `Understanding Your Child's Emotional World`,
          titleAr: 'فهم عالم طفلك العاطفي',
          durationMinutes: 45,
          lesson: {
            contentEn: `Every child is born with a rich inner emotional life. Long before they can articulate what they feel, children experience the full spectrum of human emotions -- joy, frustration, fear, excitement, sadness, and wonder. As parents, one of the most powerful gifts we can offer is learning to see and honor this emotional world, even when it looks messy or inconvenient from the outside.

Research in developmental psychology consistently shows that children whose emotions are acknowledged and validated develop stronger emotional regulation, better social skills, and higher self-esteem. This does not mean we agree with every behavior -- it means we recognize the feeling behind the behavior. When a toddler throws a toy in frustration, the behavior needs guidance, but the frustration itself is valid and deserves acknowledgment.

Think of your child's emotional world as an iceberg. What you see on the surface -- the tantrum, the defiance, the withdrawal -- is only a small fraction of what is happening underneath. Below the surface are unmet needs, developmental struggles, sensory overload, or simply the exhaustion of learning to be human. When we respond only to the tip of the iceberg, we miss the opportunity to connect with what truly matters.

One of the foundational principles of emotionally attuned parenting is the concept of "emotional coaching." Rather than dismissing, punishing, or ignoring emotions, emotional coaching invites us to sit alongside our children in their big feelings. This looks like getting on their level physically, using a calm and warm tone, and naming the emotion: "I can see you are really frustrated right now. That is hard."

This approach does not come naturally to everyone, especially if we were raised in homes where emotions were minimized or punished. Many of us grew up hearing phrases like "stop crying" or "there is nothing to be afraid of." Unlearning these patterns is a courageous act of love. It means choosing to break a cycle and build something new for your family.

Start by practicing emotional curiosity. When your child is upset, pause before reacting. Ask yourself: "What might they be feeling right now? What need is going unmet?" This small shift from reaction to reflection changes everything. It does not mean you have to be perfect -- it means you are willing to try.

Children do not need perfect parents. They need present parents. Parents who are willing to see them, hear them, and walk alongside them as they learn to navigate the complex world of emotions. This is the beginning of intentional parenting -- and you are already taking the first step.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `In my years of working with families, I have seen that the single most transformative shift a parent can make is learning to pause and wonder about what their child is feeling. It is not about having the right answer -- it is about being curious enough to ask the question.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Children experience a full range of emotions before they can verbalize them`,
              `Acknowledging feelings is different from accepting all behaviors`,
              `Emotional coaching builds regulation, social skills, and self-esteem`,
              `Moving from reaction to curiosity transforms the parent-child relationship`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Think about a recent moment when your child was upset. How did you respond? If you could revisit that moment with emotional curiosity, what might you do differently?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Emotion Check-In',
            titleAr: 'تسجيل المشاعر',
            descriptionEn: `For the next three days, practice naming emotions out loud with your child. When you notice them experiencing a feeling -- happy, frustrated, sad, excited -- gently name it: "It looks like you are feeling really happy right now!" Notice how they respond and journal your observations.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does the "iceberg" metaphor represent in understanding children's emotions?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Children's emotions are cold and distant`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Visible behavior is only a small part of what a child is experiencing underneath`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Children should keep their emotions hidden below the surface`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Only the visible behavior matters in parenting`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is emotional coaching?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Teaching children to suppress difficult emotions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Sitting alongside children in their big feelings and naming the emotion`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Ignoring tantrums until they stop`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Rewarding only positive emotions`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `According to research, what happens when children's emotions are consistently acknowledged?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `They become overly emotional and dependent`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They learn to manipulate their parents`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They develop stronger emotional regulation and social skills`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `They stop experiencing negative emotions`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the recommended first step when your child is upset?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Immediately correct the behavior`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Distract them with something fun`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Tell them there is nothing to worry about`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Pause and wonder what they might be feeling`, labelAr: '[Arabic translation needed]', correct: true },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I was raised in a home where emotions were dismissed? Can I still learn emotional coaching?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Absolutely. Many of the most attuned parents today grew up in homes where emotions were minimized or punished. The fact that you are here learning shows tremendous courage. Emotional coaching is a skill, and like any skill, it improves with practice. Be patient with yourself -- you are rewriting patterns that may be generations old.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `Does acknowledging my child's emotions mean I have to let them do whatever they want?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Not at all. Acknowledging emotions and setting boundaries can happen at the same time. You might say, "I can see you are really angry, and it is not okay to hit. Let us find another way to express that feeling." Validation is about the emotion, not the behavior.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `At what age should I start emotional coaching with my child?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `You can begin from infancy. Even before children understand words, they feel the safety of your calm presence and soothing tone. As they grow into toddlerhood, you can start naming emotions simply. The earlier you begin, the more natural it becomes for your family.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 1.2 ──
        {
          slug: 'active-listening',
          titleEn: 'Active Listening',
          titleAr: 'الاستماع الفعّال',
          durationMinutes: 45,
          lesson: {
            contentEn: `Active listening is one of the most underestimated and powerful tools in a parent's toolkit. It goes far beyond simply hearing words -- it is a practice of full presence, where you give your child the experience of being truly seen and understood. When children feel genuinely heard, they develop trust, emotional security, and the confidence to share their inner world with you.

Most of us listen with the intent to respond. We are already formulating advice, corrections, or reassurances while our child is still speaking. Active listening asks us to slow down and listen with the intent to understand. This means putting down your phone, making eye contact at their level, and giving your full attention -- even if what they are saying seems trivial from an adult perspective.

There are several key components of active listening that transform ordinary conversations into moments of deep connection. The first is reflective listening: repeating back what you have heard in your own words. If your child says, "Nobody wanted to play with me at recess," you might respond, "It sounds like you felt really lonely today." This simple act of reflection tells your child that their experience matters.

The second component is asking open-ended questions. Instead of "Did you have a good day?" try "What was the best part of your day?" or "Tell me about something that made you think today." Open-ended questions invite storytelling and deeper sharing, while closed questions often yield one-word answers.

The third component is validating without fixing. This is perhaps the hardest part for loving parents. When your child shares a struggle, the instinct is to jump in with solutions. But often, what they need most is simply to be heard. Practice saying, "That sounds really tough" before offering any guidance. You may find that sometimes, being heard is all the help they need.

Body language plays a crucial role in active listening. Children are remarkably perceptive to nonverbal cues. When you cross your arms, look at your watch, or continue scrolling while they speak, the message they receive is that their words do not matter. Conversely, when you kneel to their level, nod, and maintain warm eye contact, you communicate safety and respect.

Active listening also means being comfortable with silence. Not every pause needs to be filled. Sometimes children need a moment to gather their thoughts or find the right words. Sitting in that silence with them, without rushing to fill it, is a profound act of patience and love.

One practical strategy is to create a daily "listening ritual." This might be a five-minute window at bedtime, in the car, or during a walk where your child knows they have your undivided attention. Over time, these small moments become the foundation of a relationship built on trust and open communication.

Remember, active listening is not about being a perfect listener every moment of every day. It is about creating enough moments of genuine presence that your child knows, deep in their bones, that they matter to you.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I often tell parents: your child does not need you to fix everything. They need to know that when they speak, someone is truly there. Active listening is how we say "you matter" without using those words.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Active listening means listening to understand, not to respond`,
              `Reflective listening, open-ended questions, and validation are the three core skills`,
              `Body language communicates as much as words during conversations with children`,
              `Creating a daily listening ritual builds long-term trust and openness`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `When was the last time you gave your child five uninterrupted minutes of full attention while they spoke? What did you notice about their response?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Five-Minute Listening Window',
            titleAr: 'نافذة الاستماع لخمس دقائق',
            descriptionEn: `Choose a time each day this week -- bedtime, after school, or during a meal -- where you commit to five minutes of pure listening with your child. Put away all devices, get on their level, and let them lead the conversation. Reflect back what you hear and resist the urge to advise or correct. Journal how it felt for both of you.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the primary difference between hearing and active listening?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Hearing requires eye contact while active listening does not`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Active listening involves full presence and intent to understand`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Hearing is for adults and active listening is for children`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `There is no real difference between the two`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Which of the following is an example of reflective listening?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `"You should not feel that way."`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `"It sounds like you felt really left out today."`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `"Just ignore them and move on."`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `"Did you have fun at school?"`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is it important to validate before offering solutions?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because solutions are never helpful`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because children need to feel heard before they can receive guidance`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because parents should never give advice`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because validation makes the problem go away`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What role does silence play in active listening?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Silence is always uncomfortable and should be avoided`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Silence means the child has nothing to say`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Comfortable silence gives children space to gather their thoughts`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Silence should be filled with questions immediately`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child never wants to talk. How do I get them to open up?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Many children open up more during activities rather than face-to-face conversations. Try talking during a car ride, while drawing together, or on a walk. Also, sharing your own feelings first can model vulnerability and make them feel safer opening up.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I practice active listening when I am stressed or overwhelmed?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `It is okay to be honest with your child. You might say, "I really want to hear about this, and right now I am feeling overwhelmed. Can we talk about it in ten minutes when I can give you my full attention?" This models emotional honesty and self-awareness.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 1.3 ──
        {
          slug: 'setting-boundaries-with-warmth',
          titleEn: 'Setting Boundaries with Warmth',
          titleAr: 'وضع الحدود بدفء',
          durationMinutes: 50,
          lesson: {
            contentEn: `One of the greatest challenges in parenting is finding the balance between being loving and being firm. Many parents feel they must choose between connection and structure -- but the truth is, children thrive when they have both. Boundaries set with warmth create a sense of safety that allows children to explore, grow, and develop self-discipline from the inside out.

Boundaries are not about control. They are about teaching. When we set a limit -- "It is time to turn off the screen now" -- we are helping our child learn about structure, responsibility, and the rhythms of daily life. The way we deliver that boundary determines whether it builds trust or resentment.

Research in child development shows that the most effective parenting style, often called "authoritative parenting," combines high warmth with high expectations. This is different from permissive parenting, which is high on warmth but low on structure, and authoritarian parenting, which is high on control but low on emotional connection. Authoritative parents are both loving and firm -- and their children tend to have better emotional health, academic performance, and social skills.

So what does a warm boundary look like in practice? It starts with empathy before the limit. Before you enforce a rule, acknowledge your child's feelings: "I know you really want to keep playing. It is hard to stop when you are having so much fun." Then state the boundary clearly and simply: "And it is time for dinner now." Notice the word "and" rather than "but" -- this small shift keeps the empathy and the limit connected rather than canceling the empathy out.

Consistency is the backbone of healthy boundaries. Children feel safe when they know what to expect. If bedtime is sometimes eight o'clock and sometimes whenever they finally wear you down, the uncertainty creates anxiety and power struggles. Choose your non-negotiable boundaries wisely, and hold them with calm consistency.

It is equally important to involve your child in boundary-setting when appropriate. This does not mean children get to make all the rules. It means giving them age-appropriate choices within the limits you have set. "Would you like to brush your teeth before or after your story?" This preserves their sense of autonomy while maintaining the structure they need.

When boundaries are crossed -- and they will be -- respond with calm firmness rather than anger. Natural consequences are powerful teachers. If a child refuses to put on their coat, they will feel cold. If they break a toy in anger, the toy is broken. These moments are not punishments -- they are learning opportunities. Your role is to empathize with the outcome while allowing the lesson to land.

Finally, remember that boundaries are an expression of love. When you hold a limit even as your child protests, you are communicating something deeply reassuring: "I am strong enough to handle your big feelings, and I care enough to keep you safe." This is one of the most loving things a parent can do.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I remind families that boundaries and love are not opposites -- they are partners. A child who knows the limits also knows they are held. That holding is where safety lives.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Authoritative parenting combines warmth with clear, consistent structure`,
              `Leading with empathy before stating the boundary builds cooperation`,
              `Using "and" instead of "but" keeps empathy and limits connected`,
              `Natural consequences teach without punishment or shame`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Think about a boundary you struggle to hold consistently. What makes it difficult? What would it look like to hold that boundary with both firmness and warmth?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Empathy-First Boundary',
            titleAr: 'الحد بتعاطف أولاً',
            descriptionEn: `This week, choose one recurring boundary challenge in your home (screen time, bedtime, chores). Practice the empathy-first approach: acknowledge the feeling, then state the boundary using "and." For example: "I know you love this show, and it is time to turn it off now." Track how your child responds compared to your usual approach.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is authoritative parenting?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `High control with little emotional warmth`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `High warmth with no structure or expectations`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `High warmth combined with high expectations and clear structure`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Letting children make all their own decisions`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is using "and" instead of "but" important when setting boundaries?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It makes the sentence grammatically correct`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It keeps the empathy and the limit connected rather than canceling the empathy`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Children do not understand the word "but"`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It eliminates the need for boundaries entirely`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the role of natural consequences in boundary-setting?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `They serve as punishment for bad behavior`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They are learning opportunities that teach without shame`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `They should be avoided because they upset children`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They only work with older children`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is consistency important in boundaries?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It makes parenting easier for the parent`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Children feel safe when they know what to expect`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It prevents children from ever getting upset`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Flexibility is always better than consistency`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What do I do when my partner and I disagree on boundaries?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This is very common. Try to discuss boundaries privately and agree on the core non-negotiables as a team. Children benefit from consistency between caregivers. Where you differ on less critical matters, it is okay for children to learn that different people have different expectations -- as long as the big rules are aligned.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `My child has intense meltdowns when I set limits. Am I doing something wrong?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Meltdowns in response to boundaries are completely normal and often a sign that your child feels safe enough to express their frustration with you. Stay calm, hold the boundary, and offer comfort after the storm passes. Over time, the intensity tends to decrease as they internalize the structure.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 1.4 ──
        {
          slug: 'building-daily-rituals',
          titleEn: 'Building Daily Rituals',
          titleAr: 'بناء الطقوس اليومية',
          durationMinutes: 40,
          lesson: {
            contentEn: `In the rush of daily life -- school drop-offs, homework, dinner, bedtime -- it is easy to feel like parenting has become a series of tasks to manage rather than moments to cherish. Daily rituals are the antidote to this. They are small, predictable moments of connection that anchor your family in love and belonging, no matter how chaotic the day becomes.

Rituals are different from routines. A routine is functional: brush teeth, pack lunch, get dressed. A ritual carries emotional meaning. It is the way you greet your child in the morning with a special phrase, the song you sing together in the car, or the three things you share at dinner that made you grateful today. Rituals say, "We belong to each other."

Child development research consistently highlights the importance of predictability in building emotional security. When a child knows that every night before bed, a parent will read a story, ask about their day, and say a specific goodnight phrase, that predictability becomes a source of deep comfort. It tells the child: "No matter what happened today, this moment of connection is guaranteed."

Rituals do not need to be elaborate or time-consuming. Some of the most powerful family rituals take less than five minutes. A morning hug and a whispered "I believe in you" as your child heads to school. A bedtime question: "What made your heart happy today?" A weekly family movie night with a special snack. These moments accumulate over time into a rich tapestry of family identity and security.

Creating rituals is also an opportunity to honor your cultural heritage. Many families carry beautiful traditions from their cultures of origin -- special greetings, mealtime prayers, storytelling traditions, or seasonal celebrations. Weaving these into your daily and weekly rhythms helps children develop a strong sense of identity and belonging. They learn that they are part of something larger than themselves.

When building new rituals, involve your children in the process. Ask them what moments of the day feel most special. Let them suggest a family handshake or a silly bedtime song. When children co-create rituals, they feel ownership and investment in the family culture you are building together.

Transitions are particularly powerful times for rituals. The moments of hello and goodbye -- dropping off at school, returning from work, bedtime -- are emotional pivot points in a child's day. A consistent, warm ritual at each transition point helps children navigate the feelings of separation and reunion that are a natural part of growing up.

Finally, be gentle with yourself when rituals are missed. Life is unpredictable. The power of a ritual is not in its perfection but in its presence. Even when things fall apart, returning to your family's rituals is a way of saying, "We always come back to each other."`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `Some of the families I work with worry that they need grand gestures to create connection. But the families I have seen thrive are the ones who protect the small moments. A two-minute bedtime ritual done with love is worth more than any expensive outing.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Rituals differ from routines because they carry emotional meaning and connection`,
              `Predictable moments of connection build deep emotional security in children`,
              `Cultural traditions can be woven into daily rituals to strengthen identity`,
              `Transition moments (hello, goodbye, bedtime) are the most impactful times for rituals`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What rituals did you experience growing up? Which ones brought you comfort? Are there any you would like to bring into your own family or create fresh?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'Design Your Family Ritual',
            titleAr: 'صمم طقس عائلتك',
            descriptionEn: `Sit down with your family and choose one transition point (morning, after school, or bedtime) to create a new ritual. It can be as simple as a special greeting, a gratitude question, or a two-minute check-in. Practice it daily for one week and notice how it changes the energy of that transition.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the key difference between a routine and a ritual?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Routines are for mornings and rituals are for bedtime`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Routines are functional while rituals carry emotional meaning`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Rituals take more time than routines`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `There is no real difference between the two`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why are transition moments especially powerful for rituals?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because children are most obedient during transitions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because transitions are emotional pivot points involving separation and reunion`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because parents have the most free time during transitions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because transitions are the only time children pay attention`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How can cultural heritage be incorporated into family rituals?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `By replacing all modern practices with traditional ones`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Cultural traditions are not relevant to daily rituals`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `By weaving cultural greetings, prayers, or storytelling into daily rhythms`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `By only practicing cultural traditions on holidays`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What should you do when rituals are missed due to a busy day?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Abandon the ritual entirely since consistency was broken`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Feel guilty and make up for it with a bigger gesture`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Be gentle with yourself and return to the ritual when you can`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Create a new ritual to replace the old one`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `We are a blended family. How do we create rituals that feel inclusive?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Blended families have a beautiful opportunity to create brand-new rituals that belong to everyone. Involve all family members in brainstorming what feels meaningful. You might also honor rituals from each family of origin while building new shared ones. The goal is for every child to feel they belong.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `My child is resistant to new rituals and says they are "silly." What should I do?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Resistance is normal, especially with older children. Try letting them lead the design of the ritual so they feel ownership. Keep it low-pressure and voluntary at first. Often, children who initially resist come to cherish these moments once they experience the warmth and predictability they bring.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 1.5 ──
        {
          slug: 'emotional-co-regulation',
          titleEn: 'Emotional Co-Regulation',
          titleAr: 'التنظيم العاطفي المشترك',
          durationMinutes: 50,
          lesson: {
            contentEn: `Before children can learn to regulate their own emotions, they need to experience regulation through you. This process is called co-regulation, and it is one of the most important gifts a parent can offer. Co-regulation means that when your child is overwhelmed by big feelings, your calm, steady presence helps their nervous system settle. You become their anchor in the storm.

The science behind co-regulation is rooted in how the brain develops. The prefrontal cortex -- the part of the brain responsible for impulse control, planning, and emotional regulation -- does not fully mature until the mid-twenties. This means that when your five-year-old has a meltdown over a broken cracker, they are not being dramatic. Their brain literally does not yet have the wiring to manage that level of disappointment independently. They need your nervous system to help regulate theirs.

This is why telling a distressed child to "calm down" rarely works. When a child is in the grip of a strong emotion, the logical part of their brain has gone offline. What does work is your regulated presence. A calm voice, a gentle touch, slow breathing that they can unconsciously mirror -- these are the tools of co-regulation. You are not fixing the problem; you are providing the neurological scaffolding they need to return to a calm state.

Co-regulation begins with self-regulation. You cannot be an anchor for your child if your own nervous system is in chaos. This is why parental self-care is not selfish -- it is essential. When you notice yourself becoming activated by your child's distress, pause. Take a deep breath. Place your hand on your heart. Ground yourself before you respond. This might take five seconds or five minutes, and it is always worth the wait.

There are several practical strategies for co-regulation. Physical proximity is powerful -- sitting near your child during a meltdown communicates safety even without words. A warm hand on their back, if they are open to touch, can literally slow their heart rate. Speaking in a low, slow voice activates their parasympathetic nervous system, which is responsible for calming the body.

Naming the emotion also aids co-regulation. When you say, "You are feeling really overwhelmed right now," you help the child move from pure emotional flooding to beginning to process what they feel. This is sometimes called "name it to tame it" -- the act of labeling an emotion helps the brain organize the experience and begin to move through it.

It is important to remember that co-regulation does not mean absorbing your child's emotions. Many parents, especially empathetic ones, take on their child's distress as their own. Healthy co-regulation requires a kind of compassionate detachment -- being present with the emotion without drowning in it. Think of yourself as a lighthouse in a storm: steady, visible, and unmoved by the waves.

Over time, the co-regulation you provide becomes the template for your child's self-regulation. The calm voice you use becomes their inner voice. The breathing strategies you model become their own coping tools. You are literally building the emotional architecture of their brain, one regulated moment at a time.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I like to remind parents that you cannot pour from an empty cup. Your ability to co-regulate with your child starts with how well you care for your own nervous system. This is not a luxury -- it is the foundation of everything we teach in this program.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Children need to experience regulation through a calm adult before they can self-regulate`,
              `The brain's regulatory systems do not fully mature until the mid-twenties`,
              `Co-regulation tools include calm voice, gentle touch, physical proximity, and slow breathing`,
              `Parental self-regulation is the prerequisite for effective co-regulation`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `When your child is in distress, what happens in your own body? Do you tense up, raise your voice, or feel anxious? What is one thing you could do to ground yourself before responding?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Calm Anchor Practice',
            titleAr: 'ممارسة المرساة الهادئة',
            descriptionEn: `The next time your child is having a big emotional moment, practice being a calm anchor. Before you speak or act, take three slow breaths. Then sit near them, lower your voice, and simply say, "I am here with you." Notice what happens in their body and yours. After the moment passes, journal about the experience.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is co-regulation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Teaching children to manage emotions on their own`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Using your calm presence to help a child's nervous system settle`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Telling a child to calm down when they are upset`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Ignoring a child's emotions until they stop on their own`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why does telling a distressed child to "calm down" rarely work?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because children are naturally defiant`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because the logical part of their brain has gone offline during strong emotions`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because they do not understand the words`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because they want attention from their parent`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What does "name it to tame it" mean?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Giving a child a nickname to make them feel better`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Writing the emotion on a piece of paper`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Labeling the emotion helps the brain organize and process the experience`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Telling the child to name three things they see in the room`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is parental self-care essential for co-regulation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because parents deserve time away from their children`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because you cannot anchor a child if your own nervous system is dysregulated`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because children learn to care for themselves by watching parents relax`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Self-care is optional and unrelated to co-regulation`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `What if I lose my temper during my child's meltdown? Have I failed at co-regulation?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Absolutely not. Every parent loses their composure sometimes. What matters most is what you do next. When you calm down, go back to your child and repair: "I got really frustrated earlier, and I am sorry I raised my voice. Let me try that again." This repair process actually teaches your child that relationships can survive conflict -- a powerful lesson.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `My child resists physical touch when they are upset. How can I co-regulate without touch?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Many children, especially those who are sensory-sensitive, do not want to be touched when dysregulated. You can still co-regulate through your calm presence nearby, your soft and slow voice, and by modeling deep breathing. Simply being in the room and saying "I am right here when you are ready" can be incredibly grounding.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `At what age can children start to self-regulate without co-regulation?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Self-regulation develops gradually. Most children begin to show emerging self-regulation skills around ages six to eight, but they still need co-regulation support well into the teen years and sometimes beyond. Think of it as a gradual release -- you provide the scaffolding, and slowly, they take over more of the work themselves.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },
      ],
    },

    // ── Level 2: Growth (Paid) ──────────────────────────────────
    {
      level: 2,
      titleEn: 'Growth',
      titleAr: 'النمو',
      subtitleEn: 'Deepening Your Parenting Practice',
      subtitleAr: 'تعميق ممارسة التربية',
      descriptionEn: 'Tackle the real-world challenges of modern parenting with evidence-based strategies that honor your values and strengthen your family bond.',
      descriptionAr: '[Arabic translation needed]',
      isFree: false,
      modules: [
        // ── Module 2.1 ──
        {
          slug: 'discipline-without-damage',
          titleEn: 'Discipline Without Damage',
          titleAr: 'التأديب دون ضرر',
          durationMinutes: 50,
          lesson: {
            contentEn: `The word "discipline" comes from the Latin word "disciplina," meaning "to teach." Somewhere along the way, our culture confused discipline with punishment. But true discipline is not about making a child suffer for their mistakes -- it is about helping them learn from those mistakes in ways that preserve their dignity, strengthen your relationship, and build the internal compass they will carry into adulthood.

Punitive discipline -- yelling, shaming, spanking, or prolonged isolation -- may produce short-term compliance, but research consistently shows that it damages the parent-child relationship and increases aggression, anxiety, and behavioral problems over time. When a child obeys out of fear, they are not learning right from wrong; they are learning to avoid getting caught.

Effective discipline is rooted in connection. When a child feels securely attached to their parent, they are naturally motivated to cooperate. This does not mean children will always comply -- they are learning beings who need to test limits. But it does mean that a strong relationship is the most powerful discipline tool you have.

There are several pillars of healthy discipline. The first is clarity. Children need to understand what is expected of them. State rules in positive terms: "We use gentle hands" rather than "Do not hit." This gives children a clear picture of what to do, rather than only what to avoid.

The second pillar is calm enforcement. When a rule is broken, respond with calm firmness. Take a breath before reacting. Your tone of voice matters more than your words. A calm "I see you threw your food. Food stays on the table" is far more effective than an angry reaction, which escalates the emotional charge of the moment.

The third pillar is natural and logical consequences. Natural consequences happen on their own: if your child does not wear rain boots, their feet get wet. Logical consequences are parent-created but directly related to the behavior: if your child draws on the wall, they help clean it. Both types of consequences teach accountability without shame.

The fourth pillar is repair. After a disciplinary moment, come back together. This might sound like: "Earlier you were having a hard time, and I helped you stop. I know that was frustrating. I still love you, and tomorrow we get to try again." Repair teaches children that mistakes do not break the relationship -- and that every day is a fresh start.

It is especially important to consider cultural context when thinking about discipline. Many families come from traditions where strict, punitive discipline was the norm. Shifting to a more connected approach does not mean abandoning your culture -- it means evolving the parts that no longer serve your family while honoring the values of respect, responsibility, and community that your heritage holds dear.

Remember: the goal of discipline is not a perfectly behaved child. It is a child who is developing the internal skills to make thoughtful choices, repair their mistakes, and treat others with kindness -- even when no one is watching.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I believe that every disciplinary moment is a fork in the road. One path leads to fear and disconnection. The other leads to learning and closeness. The path you choose shapes not just your child's behavior, but their belief about whether the world is safe.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Discipline means "to teach" -- not to punish`,
              `Punitive approaches produce compliance through fear but damage trust and increase behavioral issues`,
              `The four pillars are clarity, calm enforcement, natural/logical consequences, and repair`,
              `Strong parent-child connection is the most effective foundation for discipline`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What was discipline like in the home you grew up in? Which approaches do you want to carry forward, and which do you want to leave behind?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Repair Conversation',
            titleAr: 'محادثة الإصلاح',
            descriptionEn: `Think of a recent disciplinary moment that did not go the way you wished. Go back to your child and initiate a repair conversation: "I want to talk about what happened earlier. I was feeling frustrated, and I wish I had handled it differently. Here is what I would like us to try next time." Notice how your child responds to this vulnerability.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does the word "discipline" originally mean?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `To punish`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `To control`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `To teach`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `To restrict`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is stating rules in positive terms more effective?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because negative words confuse children`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because it gives children a clear picture of what to do`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because children cannot understand the word "no"`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because positive words are always kinder`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the difference between natural and logical consequences?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Natural consequences are harsher than logical ones`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Natural consequences happen on their own; logical ones are parent-created but related to the behavior`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Logical consequences are punishments and natural consequences are rewards`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `There is no meaningful difference between them`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is repair important after a disciplinary moment?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It teaches children that mistakes break the relationship permanently`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It shows children that the parent was wrong`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It teaches that mistakes do not break the relationship and every day is a fresh start`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It is only necessary after physical discipline`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is it ever okay to raise my voice with my child?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `We are all human, and raising your voice will happen sometimes. The key is that it should not be your primary discipline tool. When it does happen, use it as an opportunity for repair. Over time, as you build new habits, you will find that calm firmness is far more effective and sustainable than volume.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I handle discipline when grandparents use different methods?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This is a common challenge, especially in multigenerational or multicultural homes. Have a respectful conversation with grandparents about your approach, focusing on shared values like wanting the best for the child. Set clear expectations for non-negotiable boundaries while allowing some flexibility in less critical areas.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 2.2 ──
        {
          slug: 'navigating-screen-time',
          titleEn: 'Navigating Screen Time',
          titleAr: 'التعامل مع وقت الشاشة',
          durationMinutes: 45,
          lesson: {
            contentEn: `Screen time is one of the most debated topics in modern parenting, and for good reason. Technology is deeply woven into our lives, and the question is no longer whether children will use screens, but how we can guide them to use technology in healthy, intentional ways. This module is not about guilt or fear -- it is about building a thoughtful family approach to digital life.

The research on screen time is nuanced. Not all screen time is equal. Passive consumption -- endlessly scrolling or watching videos without interaction -- has different effects than active engagement, such as video-calling a grandparent, creating digital art, or using educational apps with a parent. Context, content, and connection matter far more than raw minutes.

That said, there are legitimate concerns. Excessive screen time in young children has been associated with delays in language development, reduced physical activity, disrupted sleep patterns, and difficulties with attention. For older children, social media can impact self-esteem, create pressure around appearance and popularity, and expose them to content they are not emotionally ready to process.

Rather than focusing on rigid time limits alone, consider building a "media ecology" for your family. This means thinking holistically about how screens fit into your daily life. Ask yourself: Is screen time displacing other important activities like outdoor play, creative play, reading, or family connection? Is my child using screens as their primary way to cope with boredom or difficult emotions?

Start by establishing screen-free zones and times. Many families find that keeping meals, bedtime, and car rides screen-free creates natural spaces for conversation and connection. These boundaries are not punitive -- they are protective of the relationships and rhythms that matter most.

When children do use screens, engage with them. Watch what they watch. Play what they play. Ask questions about what they are learning or creating. This transforms screen time from an isolated activity into a shared experience. It also gives you insight into the digital world your child inhabits.

For younger children, co-viewing is especially important. Sitting with a toddler while they watch a show and narrating what is happening builds language skills and helps them process the content. For older children, open conversations about what they encounter online -- including advertising, misinformation, and social comparison -- build critical thinking and digital literacy.

Creating a family media agreement can be a collaborative and empowering process. Involve your children in setting expectations around screen time, device-free zones, and acceptable content. When children help create the rules, they are more likely to respect them. Review and adjust the agreement regularly as your children grow.

Above all, model the relationship with technology that you want your children to have. If you are checking your phone during dinner or scrolling before bed, your children will internalize that those behaviors are normal. Being intentional about your own screen use is one of the most powerful lessons you can teach.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I encourage families to stop thinking of screen time as the enemy and start thinking of it as a conversation. The goal is not zero screens -- it is a family that knows how to use technology without being used by it.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Not all screen time is equal -- context, content, and connection matter most`,
              `Screen-free zones and times protect family relationships and rhythms`,
              `Co-viewing and engaging with your child's digital world builds connection and digital literacy`,
              `Modeling healthy technology use is the most powerful teaching tool`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `How would you describe your own relationship with screens? What patterns do you notice in yourself that you might be unintentionally passing on to your children?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'Family Media Agreement',
            titleAr: 'اتفاقية الإعلام العائلية',
            descriptionEn: `Sit down with your family and create a simple media agreement together. Include screen-free zones, time guidelines, and what to do when screen time is over. Let each family member contribute at least one idea. Post it somewhere visible and revisit it after two weeks to see what is working.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What matters more than the total number of minutes of screen time?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `The brand of the device being used`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The context, content, and level of connection during screen use`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Whether the screen is a phone or a tablet`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The time of day when screens are used`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is a "media ecology" approach to screen time?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Eliminating all screens from the home`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Using only eco-friendly devices`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Thinking holistically about how screens fit into daily family life`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Limiting screen time to educational content only`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is co-viewing important for younger children?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because children cannot operate devices alone`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It builds language skills and helps children process content`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It is not important -- children learn better independently`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because parents need to monitor for inappropriate content at all times`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the most powerful way to teach children healthy technology habits?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Installing parental control software`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Banning all devices until a certain age`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Modeling the relationship with technology you want them to have`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Lecturing them about the dangers of screens`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child has intense tantrums when screen time ends. What can I do?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This is very common. Screens are designed to be engaging, and transitions away from them are genuinely hard. Try giving a clear warning before the transition ("Five more minutes, then we are done"), using a timer so the device itself signals the end, and having a pleasant activity ready to transition into. Over time, consistent boundaries around screen time reduce the intensity of these reactions.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How much screen time is appropriate for my child's age?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `General guidelines suggest avoiding screens for children under 18 months (except video calls), limiting to one hour of high-quality content for ages two to five, and focusing on balance for older children. However, the quality and context of the screen time matters more than exact minutes. Focus on whether screens are displacing sleep, physical activity, and face-to-face connection.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 2.3 ──
        {
          slug: 'sibling-dynamics',
          titleEn: 'Sibling Dynamics',
          titleAr: 'ديناميكيات الإخوة',
          durationMinutes: 45,
          lesson: {
            contentEn: `If you have more than one child, you are already familiar with the complex dance of sibling relationships. Sibling dynamics are one of the most intense relational experiences in childhood. Brothers and sisters can be each other's greatest allies and most frustrating challengers -- sometimes in the same hour. Understanding the forces that shape sibling relationships empowers you to guide them in ways that build lifelong bonds.

Sibling conflict is normal and, when handled well, is actually a powerful developmental opportunity. Through disagreements with siblings, children learn negotiation, perspective-taking, compromise, and conflict resolution -- skills they will use in every relationship throughout their lives. The goal is not to eliminate conflict but to teach children how to navigate it with respect.

One of the most common triggers for sibling tension is perceived fairness. Children are exquisitely sensitive to whether they are being treated equally. However, treating children equally and treating them equitably are different things. Equal means giving each child the same thing. Equitable means giving each child what they need. A child who struggles with reading might need more homework help than their sibling. Explaining this difference openly helps children understand that different needs require different responses.

Avoid comparing siblings, even in well-intentioned ways. Statements like "Why can't you be more like your sister?" or even "You are the artistic one" create fixed roles that limit each child's sense of identity. Instead, celebrate each child's unique strengths and interests without ranking or comparing. Let each child know that there is enough love, attention, and pride in your family for everyone.

When conflict erupts, resist the urge to play judge. Instead of deciding who was right and who was wrong, coach both children through the resolution process. Ask each child to share their perspective. Help them brainstorm solutions together. "It sounds like you both want the same toy. What are some ways you could solve this?" This approach empowers children to become their own problem-solvers.

Special one-on-one time with each child is one of the most effective strategies for reducing sibling rivalry. When each child has dedicated, unshared time with a parent -- even just fifteen minutes -- their need for individual attention is met, which reduces the competition for your love and focus. Make this time predictable and protected, and let the child choose the activity.

Birth order and developmental stage play significant roles in sibling dynamics. Older children may feel burdened by expectations to be "the responsible one." Younger children may feel overshadowed or babied. Middle children may struggle to find their unique place. Be aware of these patterns and actively work to ensure each child feels seen for who they are, not where they fall in the family lineup.

Finally, nurture the sibling relationship itself. Create opportunities for siblings to play cooperatively, work on projects together, and share positive experiences. Celebrate moments of kindness between them. When you catch them being gentle, generous, or supportive with each other, name it: "I noticed how you helped your brother when he was struggling. That was really kind." Positive reinforcement of connection builds a sibling bond that can last a lifetime.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `In my practice, I have seen that the sibling relationship is one of the longest relationships most people will have. Investing in it during childhood pays dividends for decades. Teach them to fight well, and you are teaching them to love well.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Sibling conflict is normal and teaches vital social skills when guided well`,
              `Equitable treatment (meeting individual needs) matters more than equal treatment`,
              `Dedicated one-on-one time with each child reduces rivalry and competition`,
              `Coaching children through conflict resolution builds lifelong problem-solving skills`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `If you have siblings, how did your parents handle conflict between you? What did that teach you about relationships? What would you do the same or differently with your own children?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Sibling Connection Builder',
            titleAr: 'بناء التواصل بين الإخوة',
            descriptionEn: `This week, schedule fifteen minutes of dedicated one-on-one time with each child. Let them choose the activity. Also, create one cooperative family activity (a puzzle, a cooking project, or a game) where siblings must work together. Notice how the energy between them shifts when both individual and shared needs are met.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is the difference between treating children equally and equitably?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Equal means the same for everyone; equitable means giving each child what they need`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `They mean the same thing`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Equitable means favoring one child over another`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Equal treatment is always better than equitable treatment`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why should parents avoid playing judge during sibling conflicts?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because parents are always biased toward one child`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because coaching children to resolve conflicts builds their problem-solving skills`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because sibling conflicts are never serious enough to intervene`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because children should fight without any adult guidance`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How does dedicated one-on-one time reduce sibling rivalry?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It keeps siblings physically separated`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It teaches children to prefer being alone`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It meets each child's need for individual attention, reducing competition`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It does not actually reduce sibling rivalry`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is comparing siblings harmful even when the comparison seems positive?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Comparisons create fixed roles that limit each child's identity`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Positive comparisons are actually helpful for motivation`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Children do not notice when they are being compared`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Comparisons only matter if they are negative`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My older child is always mean to the younger one. What can I do?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Look beneath the behavior. Older children often act out toward younger siblings when they feel displaced or burdened. Make sure your older child has dedicated time with you, acknowledge the challenges of being the eldest, and avoid giving them too much responsibility for the younger child. Also celebrate moments of kindness to reinforce the positive connection.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `Should I intervene every time my children argue?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Not necessarily. Minor disagreements are opportunities for children to practice resolution skills. Intervene when the conflict involves physical aggression, hurtful name-calling, or a significant power imbalance. For lower-level conflicts, try coaching from the sidelines rather than stepping in to resolve it for them.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 2.4 ──
        {
          slug: 'supporting-anxious-children',
          titleEn: 'Supporting Anxious Children',
          titleAr: 'دعم الأطفال القلقين',
          durationMinutes: 50,
          lesson: {
            contentEn: `Anxiety in children is more common than many parents realize. It is a normal part of development -- a certain amount of worry helps children stay safe and prepare for challenges. However, when anxiety becomes persistent, overwhelming, or begins to interfere with daily life, it deserves attention and compassionate support.

Childhood anxiety can look different from adult anxiety. While adults might describe their worry in words, children often express anxiety through their bodies and behaviors. Stomachaches before school, difficulty sleeping, clinginess, irritability, avoidance of new situations, frequent questions about safety, or sudden refusal to participate in activities they once enjoyed -- these can all be signs that anxiety is present.

The first step in supporting an anxious child is to acknowledge their experience without dismissing it. Phrases like "There is nothing to worry about" or "Just be brave" are well-intentioned but can make a child feel that their feelings are wrong. Instead, try: "I can see you are feeling worried. That is a real feeling, and I am here with you." Validation does not reinforce anxiety -- it builds the trust your child needs to face their fears.

It is also important to resist the urge to rescue your child from every anxious situation. When we rush to remove every source of discomfort, we unintentionally send the message: "You cannot handle this." Instead, support your child in gradually approaching the things they fear, one small step at a time. This process, known as "graduated exposure," helps the brain learn that the feared situation is manageable.

Teach your child concrete coping tools. Deep belly breathing, where the child places their hand on their stomach and breathes slowly until they feel it rise, is simple and effective. Progressive muscle relaxation, where they tense and release different muscle groups, helps release physical tension. Grounding exercises, like naming five things they can see, four they can hear, three they can touch, two they can smell, and one they can taste, bring them back to the present moment.

Help your child understand what anxiety feels like in their body. Many children do not realize that their racing heart, sweaty palms, or tight stomach are connected to worry. Creating a "worry map" where they draw or point to where they feel anxiety in their body builds body awareness and gives them language for their experience.

Create a "worry time" ritual. Instead of addressing worries throughout the day, set aside a specific ten-minute window where your child can share all their worries. This teaches them that worries can wait and that there is a safe container for them. Outside of worry time, gently redirect: "That sounds like a worry thought. Let us save it for worry time."

Finally, take care of the basics. Anxiety often worsens with insufficient sleep, poor nutrition, lack of physical activity, and too much screen time. Ensure your child has consistent sleep routines, regular outdoor play, balanced meals, and screen-free wind-down time. These foundations do not eliminate anxiety, but they give your child's nervous system the best chance to function well.

If your child's anxiety is significantly impacting their daily functioning, school attendance, or family life, seek professional support. A child therapist can provide specialized strategies and determine whether additional interventions are needed. Seeking help is not a sign of failure -- it is an act of tremendous love.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `One thing I wish every parent of an anxious child knew: your calm presence is more powerful than any technique. When your child sees that you are not afraid of their anxiety, they begin to believe they do not need to be afraid of it either.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Childhood anxiety often shows up through physical symptoms and behavioral changes`,
              `Validation builds trust; rescuing from all discomfort can reinforce avoidance`,
              `Graduated exposure and concrete coping tools help children face their fears`,
              `Foundational health habits (sleep, nutrition, activity) significantly impact anxiety levels`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `When your child expresses worry, what is your instinctive first response? Is it to fix, dismiss, or sit with the feeling? How might a small shift in your response change the conversation?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Worry Map',
            titleAr: 'خريطة القلق',
            descriptionEn: `With your child, draw an outline of a body together. Ask them to show you where they feel worry in their body (butterflies in the tummy, tight chest, tingly hands). Color those areas together and talk about what the feelings are like. Then brainstorm one coping tool for each body area. Post the worry map somewhere they can see it.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `How does childhood anxiety often differ from adult anxiety?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Children describe their worries in more detail than adults`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Children often express anxiety through physical symptoms and behavioral changes`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Childhood anxiety is never serious`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Adults experience more physical symptoms than children`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is graduated exposure?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Forcing a child to face their biggest fear immediately`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Removing all sources of anxiety from a child's life`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Supporting a child in gradually approaching feared situations one small step at a time`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Exposing children to frightening media to build resilience`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the purpose of a "worry time" ritual?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `To make children worry more by thinking about their fears`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `To create a safe container for worries and teach children that worries can wait`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `To eliminate all worries permanently`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `To prove to children that their worries are not important`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `When should a parent seek professional help for a child's anxiety?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Only if the child asks for help`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `When anxiety significantly impacts daily functioning, school, or family life`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Never -- all childhood anxiety resolves on its own`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Only if the child has a diagnosed anxiety disorder`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `Is my child's anxiety my fault?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `No. Anxiety has many contributing factors including genetics, temperament, and life experiences. Blaming yourself is not helpful and not accurate. What matters most is what you do from here. By learning to support your child with compassion and the right tools, you are making a profound difference in their journey.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `Should I avoid all situations that make my child anxious?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Complete avoidance often makes anxiety worse over time because it reinforces the belief that the situation is dangerous. Instead, support your child in gradually approaching feared situations with your support. Start small, celebrate courage, and let them build confidence one step at a time.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 2.5 ──
        {
          slug: 'culturally-rooted-parenting',
          titleEn: 'Culturally Rooted Parenting',
          titleAr: 'التربية المتجذرة ثقافياً',
          durationMinutes: 50,
          lesson: {
            contentEn: `For many families, parenting does not happen in a cultural vacuum. The values, traditions, and expectations of your heritage shape how you think about raising children in profound ways. Culturally rooted parenting is about honoring the wisdom of your background while adapting to the realities of the environment your children are growing up in. It is about integration, not assimilation -- holding both worlds with grace.

Culture influences nearly every aspect of parenting: how we define respect, how we express affection, how we discipline, what roles family members play, and what we consider milestones of success. In many cultures, family is the central unit of life. Elders are deeply respected. Children are raised collectively by extended family and community. These are beautiful values that provide a strong sense of belonging and identity.

At the same time, children growing up in multicultural societies often navigate between two or more cultural worlds. At home, they may hear one language, eat certain foods, and follow particular customs. At school, they encounter different norms, values, and expectations. This can create an internal tension that, if not acknowledged, leads to confusion, shame, or a feeling of not fully belonging anywhere.

Your role as a parent is to be a cultural bridge. This means helping your children understand and appreciate their heritage while also developing the skills to navigate the broader society they are part of. Talk openly about your culture with your children. Share the stories, traditions, and values that shaped you. Cook traditional meals together. Celebrate cultural holidays. Teach them the language of your ancestors if you can. These acts root children in a sense of identity that protects and sustains them.

It is equally important to give your children permission to question, adapt, and evolve cultural practices. Culture is not static -- it has always been a living, evolving thing. When children bring home new ideas or challenge traditional expectations, it is an opportunity for dialogue, not a threat. Listen to their perspective with genuine curiosity: "Tell me more about why you see it that way." This does not mean abandoning your values. It means inviting your children into a conversation that honors both tradition and growth.

One area where cultural tension often surfaces is discipline. Some cultures emphasize obedience and physical punishment, while modern research points toward connected, emotion-focused discipline. Navigating this does not require rejecting your culture wholesale. It requires discernment: keeping the values of respect, responsibility, and family honor while evolving the methods to ones that research shows support healthy development.

Seek out community. Connecting with other families who share your cultural background and are navigating similar questions can be incredibly affirming. Cultural community groups, faith communities, and online forums can provide the support and belonging that make this journey less isolating.

Remember that the greatest gift you can give your children is a strong sense of who they are and where they come from. Children who know their roots are more resilient, more confident, and better equipped to navigate a complex world. Your culture is not a burden -- it is a foundation. Build on it with pride.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `As someone who has navigated multiple cultural worlds myself, I know firsthand how challenging and rewarding this journey is. I tell families: you do not have to choose between your culture and your child's wellbeing. The best parenting happens when both are honored.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Culturally rooted parenting honors heritage while adapting to the current environment`,
              `Being a cultural bridge means helping children appreciate their roots and navigate broader society`,
              `Giving children permission to question and evolve cultural practices strengthens the family bond`,
              `Children who know their cultural roots are more resilient and confident`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What cultural values and traditions are most important to you? How do you currently share them with your children? Is there anything you are holding onto out of obligation rather than genuine belief?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Cultural Roots Tree',
            titleAr: 'شجرة الجذور الثقافية',
            descriptionEn: `Draw a tree with your family. On the roots, write the cultural values and traditions that form your foundation. On the trunk, write the values you actively practice as a family today. On the branches and leaves, write the new practices your family has adopted in your current environment. Discuss how the roots support everything that grows above.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does it mean to be a "cultural bridge" for your children?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Forcing children to follow only traditional practices`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Helping children appreciate their heritage while navigating broader society`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Abandoning cultural traditions to fit into the new environment`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Keeping children isolated from other cultures`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How should parents respond when children question cultural practices?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `See it as disrespect and shut down the conversation`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Invite dialogue that honors both tradition and growth`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Immediately abandon the practice to keep peace`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Ignore the question and change the subject`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the relationship between cultural identity and resilience in children?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Cultural identity has no impact on resilience`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Strong cultural identity makes children less adaptable`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Children who know their cultural roots tend to be more resilient and confident`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Only one culture should be emphasized to avoid confusion`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What does "integration, not assimilation" mean in the context of culturally rooted parenting?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Completely replacing your cultural identity with the new culture`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Holding both cultural worlds with grace rather than abandoning one for the other`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Rejecting the new culture entirely`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Keeping cultures completely separate with no overlap`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My children are embarrassed by our cultural traditions. How do I handle this?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This is a common experience, especially during the school-age years when fitting in feels crucial. Approach it with empathy rather than frustration. Share your own experiences of navigating two cultures. Find age-appropriate ways to make traditions engaging. Often, children who resist cultural practices in childhood come to deeply value them in adulthood.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I navigate cultural expectations from extended family that I disagree with?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `This requires respectful boundary-setting. You might say: "I deeply respect our traditions and our family. In my home, I am choosing to approach this differently because I believe it supports my children's wellbeing." Focus on shared values (we all want the best for the children) while being clear about your boundaries.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `We are an interfaith or intercultural couple. How do we decide which traditions to follow?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `The beauty of interfaith or intercultural families is the richness of having multiple traditions to draw from. Rather than choosing one over the other, consider how you can honor both. Have open conversations about which values and traditions matter most to each of you, and find creative ways to weave them together into your unique family identity.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },
      ],
    },

    // ── Level 3: Mastery (Paid) ──────────────────────────────────
    {
      level: 3,
      titleEn: 'Mastery',
      titleAr: 'الإتقان',
      subtitleEn: 'The Art of Lifelong Parenting',
      subtitleAr: 'فن التربية مدى الحياة',
      descriptionEn: 'Master the advanced skills of emotionally intelligent parenting that will shape your family legacy for generations to come.',
      descriptionAr: '[Arabic translation needed]',
      isFree: false,
      modules: [
        // ── Module 3.1 ──
        {
          slug: 'raising-emotionally-intelligent-kids',
          titleEn: 'Raising Emotionally Intelligent Kids',
          titleAr: 'تربية أطفال أذكياء عاطفياً',
          durationMinutes: 50,
          lesson: {
            contentEn: `Emotional intelligence -- the ability to recognize, understand, manage, and effectively express emotions -- is one of the strongest predictors of success, wellbeing, and healthy relationships in life. While IQ may open doors, research consistently shows that emotional intelligence determines how well people navigate what lies behind those doors. The good news is that emotional intelligence is not fixed at birth. It is learned, and it is learned primarily at home.

Emotional intelligence in children develops across four key areas. The first is emotional awareness: the ability to recognize and name their own feelings. Children who can say "I feel frustrated" rather than acting out their frustration have taken a crucial first step toward self-management. You build this by regularly naming emotions in your daily interactions -- not just during difficult moments, but during joyful, excited, and calm ones too.

The second area is emotional regulation: the ability to manage big feelings without being overwhelmed by them. This does not mean suppressing emotions. It means developing a repertoire of healthy coping strategies -- deep breathing, taking a break, drawing, talking to someone they trust. Children learn regulation by watching you regulate. When you say, "I am feeling frustrated, so I am going to take a few deep breaths," you are giving them a living example of what emotional management looks like.

The third area is empathy: the ability to understand and share the feelings of others. Empathy is the foundation of compassion, kindness, and strong relationships. You nurture empathy by helping your child notice others\' emotions: "How do you think your friend felt when that happened?" Reading stories together and discussing characters' feelings is another powerful way to build empathic imagination.

The fourth area is social skills: the ability to navigate relationships, resolve conflicts, communicate effectively, and cooperate with others. These skills are honed through play, sibling interactions, and guided practice. Role-playing difficult social scenarios -- "What could you say if someone cuts in line?" -- gives children language and strategies they can use in real situations.

One of the most important things you can do is create an emotionally literate home. This means that emotions are welcomed, discussed, and normalized in your family. It means having a wide emotional vocabulary that goes beyond "happy," "sad," and "angry." Introduce words like frustrated, disappointed, overwhelmed, proud, nervous, excited, grateful, and embarrassed. The more words children have for their feelings, the more precisely they can communicate their inner world.

Be mindful of gendered messages about emotions. Many cultures teach boys to suppress sadness and fear while encouraging girls to suppress anger. These messages are limiting and harmful. Every child deserves the freedom to feel the full range of human emotions without shame.

Finally, celebrate emotional courage. When your child shares a difficult feeling, names an emotion they are struggling with, or shows empathy toward someone else, acknowledge it: "It took a lot of courage to tell me how you really feel. I am proud of you." These moments of recognition reinforce that emotional intelligence is valued in your family.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `If I could give every family one gift, it would be emotional literacy. A child who can name what they feel, sit with discomfort, and show compassion to others has everything they need to build a meaningful life.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Emotional intelligence is learned primarily at home and is a stronger predictor of life success than IQ`,
              `The four pillars are emotional awareness, regulation, empathy, and social skills`,
              `An emotionally literate home normalizes a wide vocabulary for feelings`,
              `Gendered messages about emotions are limiting -- every child deserves full emotional freedom`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `How would you rate the emotional literacy in your home? Which of the four areas of emotional intelligence do you feel strongest in, and which would you like to grow?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Feelings Vocabulary Builder',
            titleAr: 'بناء مفردات المشاعر',
            descriptionEn: `Create an "emotion wall" in your home. Write or draw at least twenty different emotion words (beyond happy, sad, and angry) on cards and post them in a visible place. Each evening, each family member points to or picks the emotion that best describes their day. This builds vocabulary, normalizes emotional sharing, and opens conversations naturally.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What are the four key areas of emotional intelligence in children?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Reading, writing, math, and science`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Obedience, politeness, patience, and gratitude`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Emotional awareness, regulation, empathy, and social skills`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Happiness, calmness, friendliness, and cooperation`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is having a wide emotional vocabulary important for children?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It helps them score better on vocabulary tests`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It allows them to communicate their inner world more precisely`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It is not important -- basic emotion words are sufficient`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It helps them argue more effectively with siblings`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the most effective way for children to learn emotional regulation?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Being told to control their emotions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Watching their parents model regulation strategies`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Attending special classes outside the home`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Reading books about emotions independently`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why should parents be mindful of gendered messages about emotions?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because boys and girls experience different emotions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because gendered messages limit children and every child deserves full emotional freedom`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because only girls need emotional intelligence`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Gendered messages are not a real concern in modern parenting`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child seems to lack empathy. Is this normal?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Empathy develops gradually and at different rates for different children. Young children are naturally egocentric -- this is a normal stage of development, not a character flaw. Continue modeling empathy, pointing out others\' feelings, and reading stories that explore different perspectives. With consistent nurturing, empathy grows over time.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I build emotional intelligence in a child who resists talking about feelings?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Some children are more expressive through art, play, or movement than through words. Offer alternative channels: drawing their feelings, using emotion cards, or acting out scenarios with toys. Also, sharing your own feelings first in a low-pressure way often opens the door for them to share theirs.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 3.2 ──
        {
          slug: 'parenting-through-transitions',
          titleEn: 'Parenting Through Transitions',
          titleAr: 'التربية عبر المراحل الانتقالية',
          durationMinutes: 45,
          lesson: {
            contentEn: `Life is full of transitions -- some expected, some sudden. Moving to a new city, the arrival of a new sibling, starting a new school, divorce, the loss of a loved one, changes in family finances, or even the natural progression from one developmental stage to the next. How families navigate these transitions profoundly shapes children's sense of security, resilience, and trust.

Children often experience transitions differently than adults. While adults have the cognitive tools to understand context -- "We are moving for a better job opportunity" -- children tend to process change through the lens of loss. They may grieve the bedroom they are leaving, the friend they will miss, or the routine that is shifting. Honoring this grief, even when the change is ultimately positive, is essential.

The most important thing you can do during a transition is to maintain emotional availability. Children need to know that even when external circumstances change, the relationship with you remains steady. This means being present for extra conversations, tolerating regression (a child who was sleeping independently may temporarily need more support), and creating space for all feelings -- including anger, sadness, and fear.

Communication is critical. Explain the transition in age-appropriate language. For young children, keep it simple and concrete: "We are going to live in a new house. You will have a new room, and you can bring all your favorite things." For older children, share more context and invite their questions. Always be honest about what you know and what you do not yet know. Children handle uncertainty better when they trust you to be truthful with them.

Maintain as many familiar routines as possible during periods of change. If bedtime rituals, family meals, or weekend traditions can stay consistent, they become anchors of stability in a shifting landscape. These predictable moments reassure children that some things remain the same, even when other things are changing.

Give your child appropriate agency in the transition. When possible, involve them in decisions: "Would you like your new room to be painted blue or green?" or "What is one thing you would like us keep doing in our new home?" Autonomy during a time of change reduces the sense of helplessness and gives children a sense of ownership over their experience.

Watch for signs that your child may need additional support during a transition. Persistent changes in behavior, sleep difficulties lasting more than a few weeks, withdrawal from activities they usually enjoy, increased aggression, or regression in developmental milestones may indicate that they are struggling to process the change and could benefit from professional guidance.

Be honest about your own feelings. Children are perceptive and will sense your stress even if you do not name it. It is healthy to say, "This change is hard for me too, and sometimes I feel nervous about it. But I also know that we are going to be okay because we have each other." This models emotional honesty and teaches children that adults have feelings too -- and that those feelings are manageable.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `I have worked with many families during major transitions, and the children who fare best are not the ones whose transitions went smoothly. They are the ones whose parents stayed emotionally present through the mess. Your presence is the constant your child needs.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Children often experience transitions through the lens of loss, even when the change is positive`,
              `Maintaining emotional availability and familiar routines provides stability during change`,
              `Age-appropriate communication with honesty builds trust through uncertain times`,
              `Giving children appropriate choices during transitions reduces helplessness`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Think about a significant transition in your own childhood. How was it handled by the adults around you? What do you wish they had done differently? What can you carry forward?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Transition Anchor Plan',
            titleAr: 'خطة مرساة الانتقال',
            descriptionEn: `If your family is currently navigating or anticipating a transition, sit down and create a "Transition Anchor Plan." List three routines or rituals that will stay the same, three feelings everyone in the family might experience, and three ways you will support each other through the change. If no transition is happening now, create this plan as a template for the future.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `How do children typically process transitions differently from adults?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Children understand the logical reasons for change better than adults`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Children tend to process change through the lens of loss`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Children are not affected by transitions if they are young enough`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Children and adults process transitions in the same way`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is maintaining familiar routines important during transitions?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because change should be completely avoided for children`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Familiar routines serve as anchors of stability in a shifting landscape`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because children cannot adapt to any new routines`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Routines are not important during transitions`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What should you do when you do not have all the answers about an upcoming change?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Make up answers to keep your child calm`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Avoid discussing the change until you have all the details`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Be honest about what you know and what you do not yet know`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Tell children everything will be perfect`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why is it helpful to share your own feelings about a transition with your child?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `It makes the child responsible for the parent's emotions`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It models emotional honesty and teaches that feelings are manageable`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Parents should always hide their feelings from children`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `It gives children permission to avoid the transition`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My child is regressing during a family transition. Should I be worried?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Regression during transitions is very common and usually temporary. A child who was previously independent might become clingy, or a potty-trained child might have accidents. This is their way of seeking extra security. Respond with patience and compassion. If regression persists for more than a few weeks or is severe, consider consulting a child therapist.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How much should I tell my young child about a family separation or divorce?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Keep explanations simple, honest, and reassuring. Young children need to know: "This is not your fault. Both parents love you very much. Here is what will stay the same." Avoid sharing adult details or speaking negatively about the other parent. Repeat key reassurances as needed -- young children may need to hear them many times.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 3.3 ──
        {
          slug: 'building-family-resilience',
          titleEn: 'Building Family Resilience',
          titleAr: 'بناء مرونة الأسرة',
          durationMinutes: 50,
          lesson: {
            contentEn: `Resilience is not the absence of difficulty -- it is the ability to navigate difficulty and come through it with your sense of self, your relationships, and your hope intact. Family resilience goes one step further: it is the capacity of a family unit to withstand and recover from challenges, growing stronger in the process. Every family will face storms. Resilient families are the ones that learn to dance in the rain together.

Research on family resilience identifies several key protective factors. The first is a shared belief system. Resilient families make meaning out of adversity. They have a shared narrative about who they are and what they stand for. This might sound like: "Our family has been through hard things before, and we always find our way. We stick together." These family stories become a source of strength during future challenges.

The second protective factor is open and collaborative communication. Resilient families talk to each other -- honestly, openly, and regularly. They create space for each family member to share their feelings, concerns, and hopes. They listen without judgment and make decisions together. This kind of communication does not happen by accident; it is a practice that must be cultivated and protected.

The third factor is organizational flexibility. Life demands that families adapt. Sometimes roles shift -- a parent returns to school, a child takes on new responsibilities, grandparents become caregivers. Resilient families embrace these shifts with grace rather than rigidity. They are willing to adjust routines, redistribute responsibilities, and try new approaches when old ones no longer serve them.

The fourth factor is connectedness -- both within the family and to the broader community. Resilient families maintain strong internal bonds while also reaching out for support when needed. They are not islands. They have friendships, extended family connections, faith communities, or neighborhood networks that provide additional layers of strength and belonging.

Building family resilience is an active, ongoing process. One powerful practice is the family meeting -- a regular, structured time when the family gathers to celebrate successes, address challenges, plan ahead, and strengthen their bond. Family meetings teach children that their voice matters, that problems can be solved together, and that the family is a team.

Another practice is intentionally building a positive family identity. This means celebrating your strengths as a family, creating shared traditions, and telling stories about times you overcame challenges together. A positive family identity acts as a reservoir of strength that each member can draw from during hard times.

Teaching children that struggle is a normal and valuable part of life is also essential. When we shield children from all hardship, we rob them of the chance to develop their own resilience. Instead, support them through age-appropriate challenges, celebrate their efforts rather than just their outcomes, and help them see setbacks as learning opportunities rather than failures.

Finally, take care of the family's collective wellbeing. Prioritize rest, play, connection, and joy. Resilient families are not families that never struggle -- they are families that make sure struggle is balanced with restoration and love.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `The most resilient families I have worked with share one thing in common: they have a story about themselves that includes hardship but does not end with it. Help your family write that story together, and you give them an anchor that will hold through any storm.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Family resilience is the capacity to navigate difficulty and grow stronger together`,
              `Key protective factors include shared beliefs, open communication, flexibility, and connectedness`,
              `Regular family meetings strengthen teamwork and give every member a voice`,
              `A positive family identity acts as a reservoir of strength during hard times`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `What is your family's story of resilience? Think of a time your family faced a challenge together. What got you through it? How can you make that story part of your family identity?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Family Resilience Meeting',
            titleAr: 'اجتماع مرونة الأسرة',
            descriptionEn: `Hold your first family meeting this week. Choose a relaxed time, perhaps over a meal or snack. Use this agenda: (1) Each person shares one thing they appreciated about a family member this week. (2) Discuss one challenge the family is facing and brainstorm solutions together. (3) Plan one fun activity for the upcoming week. Keep it under twenty minutes and end on a positive note.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is family resilience?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `The absence of any difficulty in family life`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The capacity to withstand and recover from challenges, growing stronger together`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Being able to avoid all conflict within the family`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Having enough financial resources to solve all problems`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What are the key protective factors of resilient families?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Wealth, education, and social status`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Shared beliefs, open communication, flexibility, and connectedness`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Strict rules, punishment, and obedience`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Avoiding all risk and change`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why are family meetings valuable for building resilience?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `They allow parents to lecture children about behavior`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They teach children that their voice matters and problems can be solved together`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `They are only useful for families in crisis`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `They replace the need for professional help`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Why should parents not shield children from all hardship?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Because children need to suffer to grow`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because shielding from all hardship robs children of the chance to develop resilience`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Because parents should not care about their children's comfort`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Because children are naturally resilient and do not need any support`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `My family is going through a very difficult time right now. How do I build resilience when I am barely coping?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `First, be gentle with yourself. Resilience does not mean handling everything perfectly -- it means getting through it, even imperfectly. Focus on one small thing: maintaining one ritual, having one honest conversation, or asking for one form of help. Reach out to your support network. And remember that seeking professional support during difficult times is itself an act of resilience.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How do I build resilience in a single-parent family?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Single-parent families can be deeply resilient. Focus on the strong bond between you and your children, build a support network of friends, family, or community, and involve your children in age-appropriate ways in running the household. Your resourcefulness and love already model tremendous resilience.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 3.4 ──
        {
          slug: 'repairing-after-conflict',
          titleEn: 'Repairing After Conflict',
          titleAr: 'الإصلاح بعد الخلاف',
          durationMinutes: 45,
          lesson: {
            contentEn: `Conflict is inevitable in every family. No matter how intentional, loving, or skilled you are as a parent, there will be moments when you lose your temper, say something you regret, or handle a situation in a way that falls short of your values. These moments do not define you as a parent. What defines you is what you do next. Repair is the bridge between rupture and reconnection, and it is one of the most important skills in the parenting toolkit.

Research on attachment shows that it is not the absence of conflict that creates secure bonds -- it is the consistent repair after conflict. When a parent returns after a heated moment and says, "I am sorry I yelled. I was overwhelmed, and you deserved better," the child learns something profound: relationships can survive difficulty. People who love you will come back and make things right. Mistakes are not the end of the story.

Repair begins with accountability. This means naming what happened without excuses or blame. It does not sound like, "I am sorry, but you were being impossible." It sounds like, "I am sorry I lost my temper. That was about my stress, not about you. You did not deserve to be spoken to that way." Taking full ownership of your behavior models the kind of accountability you hope your child will practice in their own relationships.

The timing of repair matters. You do not need to repair in the heat of the moment -- in fact, it is often better to wait until both you and your child have calmed down. This might mean saying, "I need a few minutes to settle myself, and then I want to come back and talk about what happened." This models self-regulation while also communicating that the relationship is a priority.

When you initiate repair, get on your child's level. Make eye contact. Use a warm tone. Let them respond in their own way -- some children will cry, some will be angry, some will shrug it off, and some will need time before they are ready to engage. All of these responses are valid. Your job is to open the door to reconnection and let them walk through it at their own pace.

Repair also involves a forward-looking component. After acknowledging what went wrong, share what you plan to do differently: "Next time I am feeling overwhelmed, I am going to take a break before I respond to you." This gives your child hope that things can change and models the process of growth.

It is important to normalize repair in your family culture. When children see that adults can make mistakes, take responsibility, and repair, they learn that imperfection is part of being human. They also learn that they can do the same in their own relationships -- with siblings, friends, and eventually partners. You are not just healing the current moment; you are teaching a life skill.

Some parents worry that apologizing to their child undermines their authority. The opposite is true. A parent who can acknowledge a mistake and genuinely apologize is modeling strength, humility, and integrity. Children do not lose respect for a parent who repairs -- they gain trust.

Remember: no parent gets it right every time. The goal is not perfection. The goal is a relationship where ruptures are noticed, repair is practiced, and love remains the constant thread that holds everything together.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `Repair is the single most underrated parenting skill. In my work, the families that thrive are not the ones that never fight -- they are the ones that always come back to each other. Every repair builds a stronger bridge.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Secure attachment comes from consistent repair after conflict, not the absence of conflict`,
              `Effective repair includes accountability without blame, warm reconnection, and a plan for change`,
              `Apologizing to your child models strength and builds trust, not weakness`,
              `Normalizing repair teaches children a life skill they will use in all relationships`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `Think about the last time there was a rupture between you and your child. Did a repair happen? If so, how did it feel? If not, what might a repair conversation look like now?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'The Repair Script',
            titleAr: 'نص الإصلاح',
            descriptionEn: `Write a repair script for a recent moment you wish you had handled differently. Include: (1) What happened. (2) How you think your child felt. (3) Your apology without excuses. (4) What you plan to do differently next time. Practice saying it aloud. Then, when the time feels right, have the conversation with your child.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What does research show about the relationship between conflict and secure attachment?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Secure attachment requires the complete absence of conflict`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Consistent repair after conflict creates secure attachment`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Conflict always damages attachment permanently`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Attachment is not affected by conflict or repair`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is the difference between a genuine repair and a deflecting apology?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `A genuine repair includes excuses to help the child understand`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `A genuine repair takes full ownership without blame or excuses`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `A deflecting apology is more honest`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `There is no difference between the two`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Does apologizing to your child undermine your authority?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Yes, children lose respect for parents who apologize`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `No, it models strength, humility, and integrity while building trust`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Only if the apology is for something serious`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Parents should only apologize to other adults`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What should a complete repair conversation include?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `An explanation of why the child was wrong`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Accountability, warm reconnection, and a plan for what you will do differently`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `A promise that conflict will never happen again`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `A lecture about the importance of good behavior`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `I was never apologized to as a child. How do I start doing something that feels so unfamiliar?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `It is completely natural for this to feel uncomfortable if it was not modeled for you. Start small. You do not need a long, elaborate apology. Even a simple "I am sorry I snapped at you. You did not deserve that" is a powerful beginning. With practice, it becomes more natural. You are breaking a cycle, and that is courageous.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `What if my child does not seem to care about the repair?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Some children process repair internally. They may shrug, walk away, or seem indifferent. This does not mean it did not land. Trust the process. Over time, consistent repair builds a pattern your child internalizes, even if their outward response is minimal. The important thing is that you showed up.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },

        // ── Module 3.5 ──
        {
          slug: 'your-parenting-legacy',
          titleEn: 'Your Parenting Legacy',
          titleAr: 'إرثك في التربية',
          durationMinutes: 50,
          lesson: {
            contentEn: `As we reach the final module of this program, we turn our attention from the daily practice of parenting to the larger story you are writing with your life. Your parenting legacy is the sum of the values, patterns, emotional skills, and memories you pass on to your children -- and through them, to the generations that follow. It is both a deeply personal reflection and a profound responsibility.

Every family carries a legacy, whether intentional or not. Some legacies are beautiful: traditions of warmth, storytelling, resilience, and generosity. Some are painful: patterns of anger, emotional distance, or harm that were passed down unconsciously. Most families carry a mix of both. The power you hold as a parent is the ability to choose what you keep, what you transform, and what you leave behind.

Begin by reflecting on the legacy you received. What did your parents and grandparents teach you about love, discipline, emotion, and family? What values were spoken, and what messages were communicated through behavior? This is not about blame -- it is about awareness. When you understand the patterns you inherited, you gain the power to consciously shape the ones you pass forward.

Consider the legacy you want to create. If your children were to describe the home they grew up in, what would you want them to say? What values do you hope they carry into adulthood? What emotional skills do you want them to have mastered? What memories do you want to be most vivid? Writing a personal "legacy statement" can crystallize this vision and serve as a compass during difficult parenting moments.

Your daily actions are the building blocks of your legacy. Every bedtime story, every repair after conflict, every moment of genuine listening, every boundary set with warmth -- these are the bricks of the home you are building in your child's heart. Legacy is not created in grand gestures. It is created in the thousands of small, daily choices that accumulate over a childhood.

The concept of "intergenerational healing" is central to this module. Many parents are simultaneously parenting their children and reparenting themselves. As you learn new skills in this program -- emotional coaching, co-regulation, warm discipline, repair -- you are not only giving your children what they need. You are giving your inner child what it needed too. This dual healing is one of the most profound experiences of intentional parenting.

Share your journey with your children in age-appropriate ways. Let them know that you are learning and growing too. Tell them about the changes you are making and why. When they see that growth is a lifelong process, they learn that they do not have to be perfect either -- they just have to keep trying.

As you close this program, know that the work you have done here is significant. You have invested in understanding your child's emotional world, building connection, setting boundaries with love, and developing skills that will serve your family for generations. This is your legacy in action.

The final truth about parenting legacy is this: it is never too late to start. Whether your child is two or twelve or twenty-two, every moment of intentional love, every genuine apology, every act of understanding adds to the story. Your legacy is not finished until your story is. And the story you are writing is a beautiful one.`,
            contentAr: '[Arabic translation needed]',
          },
          drHalaNote: {
            en: `This is the module closest to my heart. When I look at the families I have had the honor of walking alongside, I see legacy in action -- parents who chose to do the brave, often uncomfortable work of breaking old patterns and building new ones. That is what I see in you.`,
            ar: '[Arabic translation needed]',
          },
          keyTakeaways: {
            en: [
              `Your parenting legacy is built through thousands of small daily choices, not grand gestures`,
              `Understanding the patterns you inherited gives you power to shape what you pass forward`,
              `Intentional parenting heals both the child in front of you and the child within you`,
              `It is never too late to begin building the legacy you want to leave`,
            ],
            ar: ['[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]', '[Arabic translation needed]'],
          },
          reflection: {
            promptEn: `If your child wrote a letter describing the home they grew up in, what would you want it to say? What is one legacy pattern you inherited that you are choosing to transform?`,
            promptAr: '[Arabic translation needed]',
          },
          activity: {
            titleEn: 'Write Your Legacy Statement',
            titleAr: 'اكتب بيان إرثك',
            descriptionEn: `Take fifteen quiet minutes to write your personal parenting legacy statement. Begin with: "In my family, I want..." and describe the values, emotional climate, and memories you hope to create. Include what you are keeping from your own upbringing and what you are consciously changing. Keep this statement somewhere you can revisit it during challenging parenting moments.`,
            descriptionAr: '[Arabic translation needed]',
          },
          quiz: {
            passingScore: 75,
            questions: [
              {
                textEn: `What is a parenting legacy?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `The amount of money you leave your children`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The values, patterns, emotional skills, and memories you pass on to future generations`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `The number of accomplishments your children achieve`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `The house and possessions you provide`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `What is intergenerational healing?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Forcing children to follow the same traditions as their grandparents`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Simultaneously parenting your children and giving your inner child what it needed`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Ignoring family history to start completely fresh`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Only healing is possible through professional therapy`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `How is a parenting legacy primarily built?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Through a few grand, unforgettable moments`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Through expensive experiences and gifts`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Through thousands of small, daily intentional choices`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `Through reading parenting books`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
              {
                textEn: `Is it ever too late to start building an intentional parenting legacy?`,
                textAr: '[Arabic translation needed]',
                options: [
                  { labelEn: `Yes, if your child is past the age of five`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `Yes, patterns established in early childhood cannot be changed`, labelAr: '[Arabic translation needed]', correct: false },
                  { labelEn: `No, every moment of intentional love adds to the story at any age`, labelAr: '[Arabic translation needed]', correct: true },
                  { labelEn: `It depends on how much damage has already been done`, labelAr: '[Arabic translation needed]', correct: false },
                ],
              },
            ],
          },
          aiFaq: [
            {
              questionEn: `I carry a lot of guilt about mistakes I have already made as a parent. How do I move forward?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Parenting guilt is one of the heaviest burdens, and it shows how deeply you care. The work you are doing right now -- learning, reflecting, and growing -- is proof that your story is still being written. Guilt is useful only when it motivates change. Let it move you forward, then release it with compassion. Your children need a present parent more than a perfect one.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `How can I continue growing as a parent after this program ends?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Parenting growth is lifelong. Continue journaling, revisit your legacy statement during challenging moments, connect with other intentional parents, and seek professional support when needed. The skills you have built here will continue to deepen with practice. Consider joining a Mama Hala community group or returning to these modules whenever you need a refresh.`,
              answerAr: '[Arabic translation needed]',
            },
            {
              questionEn: `What if my partner is not on the same page about intentional parenting?`,
              questionAr: '[Arabic translation needed]',
              answerEn: `Focus on what you can control: your own responses, your own growth, and the relationship you are building with your child. Over time, your partner may be inspired by the changes they see. Invite them gently, share what you are learning, and model the approach without pressuring them. Even one intentional parent makes a profound difference in a child's life.`,
              answerAr: '[Arabic translation needed]',
            },
          ],
        },
      ],
    },
  ],
};
