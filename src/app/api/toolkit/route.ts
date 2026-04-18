import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

// Category mapping for related toolkit suggestions
const toolkitCategory: Record<string, string> = {
  'family-communication-toolkit': 'families', 'anger-management-worksheet': 'adults',
  'calm-parent-checklist': 'families', 'understanding-your-teen': 'families',
  'self-care-assessment': 'adults', 'complete-parenting-guide': 'families',
  'couples-communication-workbook': 'couples', 'anxiety-recovery-journal': 'adults',
  'social-media-survival-guide': 'teens', 'teen-anger-toolkit': 'teens',
  'teen-identity-map': 'teens', 'friendship-flags-checklist': 'teens',
  'exam-season-emergency-kit': 'teens', 'imposter-syndrome-playbook': 'university',
  'adulting-emotional-edition': 'university', 'student-burnout-recovery': 'university',
  'bicultural-student-guide': 'university', 'student-loneliness-toolkit': 'university',
  'conflict-resolution-playbook': 'couples', 'reconnection-rituals': 'couples',
};

function getRelatedToolkits(toolkitId: string, isAr: boolean): { name: string; url: string }[] {
  const cat = toolkitCategory[toolkitId];
  const related = Object.entries(toolkitCategory)
    .filter(([id, c]) => id !== toolkitId && c === cat)
    .slice(0, 2)
    .map(([id]) => ({
      name: isAr ? (toolkitNames[id]?.ar || id) : (toolkitNames[id]?.en || id),
      url: `https://mamahala.ca/toolkits/pdf/${isAr ? `ar/${id}` : id}.pdf`,
    }));
  return related;
}

const toolkitNames: Record<string, { en: string; ar: string }> = {
  'family-communication-toolkit': { en: 'Family Communication Toolkit', ar: 'مجموعة أدوات التواصل الأسري' },
  'anger-management-worksheet': { en: 'Anger Management Worksheet', ar: 'ورقة عمل إدارة الغضب' },
  'calm-parent-checklist': { en: 'The Calm Parent Checklist', ar: 'قائمة الوالد الهادئ' },
  'understanding-your-teen': { en: "Understanding Your Teen's Inner World", ar: 'فهم العالم الداخلي لمراهقك' },
  'self-care-assessment': { en: 'Self-Care Assessment & Planning Guide', ar: 'دليل تقييم الرعاية الذاتية والتخطيط' },
  'complete-parenting-guide': { en: 'The Intentional Parent: A Complete Guide', ar: 'الوالد الواعي: دليل شامل' },
  'couples-communication-workbook': { en: 'Couples Communication Workbook', ar: 'دفتر عمل التواصل للأزواج' },
  'anxiety-recovery-journal': { en: 'The Anxiety Recovery Journal', ar: 'يوميات التعافي من القلق' },
  // Teen toolkits
  'social-media-survival-guide': { en: 'The Social Media Survival Guide', ar: 'دليل النجاة في وسائل التواصل الاجتماعي' },
  'teen-anger-toolkit': { en: 'Brain on Fire: Your Anger Is Not the Enemy', ar: 'دماغ مشتعل: غضبك ليس عدوك' },
  'teen-identity-map': { en: 'The "Who Am I Actually?" Identity Map', ar: 'خريطة "من أنا فعلاً؟"' },
  'friendship-flags-checklist': { en: 'Friendship Red Flags & Green Flags', ar: 'علامات الصداقة الحمراء والخضراء' },
  'exam-season-emergency-kit': { en: 'Exam Season Emergency Kit', ar: 'حقيبة طوارئ موسم الامتحانات' },
  // University student toolkits
  'imposter-syndrome-playbook': { en: 'The Imposter Syndrome Playbook', ar: 'دليل التعامل مع متلازمة المحتال' },
  'adulting-emotional-edition': { en: 'Adulting 101: The Emotional Edition', ar: 'دليل الكبار 101: النسخة العاطفية' },
  'student-burnout-recovery': { en: 'Burnout Is Not a Badge of Honor', ar: 'الإنهاك ليس وسام شرف' },
  'bicultural-student-guide': { en: "Caught Between Two Worlds: A Bicultural Student's Guide", ar: 'بين عالمين: دليل الطالب ثنائي الثقافة' },
  'student-loneliness-toolkit': { en: 'The Loneliness Toolkit', ar: 'أدوات التغلب على الوحدة' },
  'conflict-resolution-playbook': { en: 'The Conflict Resolution Playbook', ar: 'دليل حل النزاعات' },
  'reconnection-rituals': { en: 'Reconnection Rituals: A Couples Activity Kit', ar: 'طقوس إعادة التواصل' },
};

export async function POST(request: Request) {
  try {
    const { email, toolkitId, locale } = await request.json();

    if (!email || !email.includes('@') || !email.includes('.')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const toolkit = toolkitNames[toolkitId];
    const toolkitName = toolkit ? (locale === 'ar' ? toolkit.ar : toolkit.en) : toolkitId;
    const isAr = locale === 'ar';

    await trackEvent({ type: 'toolkit_download', email, toolkitId, locale, source: 'toolkit-page' });

    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>';

        // 1. Notify admin
        const adminSend = await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: fromEmail,
          to: process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca',
          subject: `Toolkit Download: ${toolkit?.en || toolkitId} — ${email}`,
          html: emailWrapper(`
            <div style="${emailStyles.card}">
              <h3 style="${emailStyles.heading}">New Toolkit Download</h3>
              <p style="color:#2D2A33;font-size:14px;margin:0 0 6px;"><strong>Resource:</strong> ${toolkit?.en || toolkitId}</p>
              <p style="color:#2D2A33;font-size:14px;margin:0 0 6px;"><strong>Email:</strong> ${email}</p>
              <p style="color:#8E8E9F;font-size:12px;margin:0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
            </div>
          `),
        });
        if (adminSend.error) {
          console.error('[EMAIL FAILURE] Toolkit admin notify rejected:', {
            to: process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca', from: fromEmail,
            errorName: (adminSend.error as any).name,
            errorMessage: (adminSend.error as any).message,
          });
        }

        // 2. Send toolkit email to user
        const userSend = await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: fromEmail,
          to: email,
          subject: isAr
            ? `أداتُك جاهزة: ${toolkitName}`
            : `Your toolkit is ready: ${toolkitName}`,
          html: emailWrapper(`
            <div style="${emailStyles.card}">
              <p style="color:#C8A97D;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;text-align:center;font-weight:600;">
                ${isAr ? 'أدواتُك المجّانيّة' : 'Your Free Toolkit'}
              </p>
              <h1 style="${emailStyles.heading};text-align:center;">${toolkitName}</h1>
              <p style="color:#6B6580;font-size:14px;margin:0 0 20px;text-align:center;">
                ${isAr ? 'شكرًا لك — أداتُك في الانتظار.' : 'Thank you — your resource is waiting.'}
              </p>
              <p style="${emailStyles.text};text-align:center;">
                ${isAr
                  ? 'نحنُ سعداءُ بأنّك اتّخذتَ هذه الخطوة. انقُرْ على الزرِّ أدناه لتحميلِ أداتِك فورًا.'
                  : "We're glad you took this step. Click the button below to download your toolkit instantly."}
              </p>
              <div style="text-align:center;margin:0 0 24px;">
                <a href="https://mamahala.ca/toolkits/pdf/${toolkitId}.pdf" style="${emailStyles.button}">
                  ${isAr ? 'حمِّلْ أداتَك الآن' : 'Download Your Toolkit'}
                </a>
              </div>
              <p style="color:#8E8E9F;font-size:12px;margin:0 0 4px;text-align:center;">
                ${isAr ? 'مشكلةٌ في التحميل؟ تواصَلْ معنا.' : 'Having trouble? Contact us.'}
              </p>
              <div style="text-align:center;margin:0 0 20px;">
                <a href="https://wa.me/16132222104?text=${encodeURIComponent(isAr ? `مرحبًا، أحتاج مساعدة في تحميل: ${toolkitName}` : `Hi, I need help downloading: ${toolkitName}`)}" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:99px;text-decoration:none;font-size:13px;font-weight:600;">
                  ${isAr ? 'تواصَلْ معنا' : 'Contact Us'}
                </a>
              </div>
              ${(() => {
                const related = getRelatedToolkits(toolkitId, isAr);
                if (related.length === 0) return '';
                return `<div style="border-top:1px solid #F3EFE8;padding-top:20px;margin-top:8px;">
                  <p style="color:#2D2A33;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;text-align:center;">
                    ${isAr ? 'قد يعجبُك أيضًا' : 'You Might Also Like'}
                  </p>
                  ${related.map(r => `<a href="${r.url}" style="display:block;padding:10px 16px;margin:6px 0;border:1px solid #F3EFE8;border-radius:12px;text-decoration:none;color:#2D2A33;font-size:14px;">${r.name}</a>`).join('')}
                </div>`;
              })()}
              <div style="border-top:1px solid #F3EFE8;padding-top:20px;margin-top:20px;text-align:center;">
                <p style="color:#4A4A5C;font-size:14px;line-height:1.7;margin:0 0 16px;">
                  ${isAr
                    ? 'هل تحتاجُ دعمًا شخصيًّا؟ محادثتُك الأولى مجّانيّة — 30 دقيقة بلا التزام.'
                    : 'Need personalized support? Your first conversation is free — 30 minutes, no commitment.'}
                </p>
                <a href="https://mamahala.ca/${isAr ? 'ar' : 'en'}/book" style="${emailStyles.button}">
                  ${isAr ? 'احجِزْ استشارتَك المجّانيّة' : 'Book Your Free Consultation'}
                </a>
              </div>
            </div>
          `, { locale: isAr ? 'ar' : 'en' }),
        });
        if (userSend.error) {
          console.error('[EMAIL FAILURE] Toolkit user email rejected:', {
            to: email, from: fromEmail,
            errorName: (userSend.error as any).name,
            errorMessage: (userSend.error as any).message,
          });
        }
      } catch (e) {
        console.error('[EMAIL FAILURE] Toolkit threw:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
