import { NextResponse } from 'next/server';
import { trackEvent } from '@/lib/analytics';

const toolkitNames: Record<string, { en: string; ar: string }> = {
  'family-communication-toolkit': { en: 'Family Communication Toolkit', ar: 'مجموعة أدوات التواصل الأسري' },
  'anger-management-worksheet': { en: 'Anger Management Worksheet', ar: 'ورقة عمل إدارة الغضب' },
  'calm-parent-checklist': { en: 'The Calm Parent Checklist', ar: 'قائمة الوالد الهادئ' },
  'understanding-your-teen': { en: "Understanding Your Teen's Inner World", ar: 'فهم العالم الداخلي لمراهقك' },
  'self-care-assessment': { en: 'Self-Care Assessment & Planning Guide', ar: 'دليل تقييم الرعاية الذاتية والتخطيط' },
  'complete-parenting-guide': { en: 'The Intentional Parent: A Complete Guide', ar: 'الوالد الواعي: دليل شامل' },
  'couples-communication-workbook': { en: 'Couples Communication Workbook', ar: 'دفتر عمل التواصل للأزواج' },
  'anxiety-recovery-journal': { en: 'The Anxiety Recovery Journal', ar: 'يوميات التعافي من القلق' },
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
        await resend.emails.send({
          from: fromEmail,
          to: process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca',
          subject: `Toolkit Download: ${toolkit?.en || toolkitId} — ${email}`,
          html: `
            <div style="font-family:sans-serif;max-width:500px;padding:24px;background:#FAF7F2;border-radius:12px;">
              <h3 style="color:#7A3B5E;margin:0 0 12px;">New Toolkit Download</h3>
              <p style="color:#2D2A33;font-size:14px;margin:0 0 6px;"><strong>Resource:</strong> ${toolkit?.en || toolkitId}</p>
              <p style="color:#2D2A33;font-size:14px;margin:0 0 6px;"><strong>Email:</strong> ${email}</p>
              <p style="color:#8E8E9F;font-size:12px;margin:0;">${new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' })}</p>
            </div>
          `,
        });

        // 2. Send toolkit email to user
        await resend.emails.send({
          from: fromEmail,
          to: email,
          subject: isAr
            ? `أداتُك جاهزة: ${toolkitName}`
            : `Your toolkit is ready: ${toolkitName}`,
          html: `
            <div style="font-family:'Segoe UI',Tahoma,sans-serif;max-width:600px;margin:0 auto;direction:${isAr ? 'rtl' : 'ltr'};">
              <div style="background:linear-gradient(135deg,#F0E0D8,#F5E8E0,#FAF0EC);padding:40px 32px;text-align:center;border-radius:12px 12px 0 0;">
                <p style="color:#C8A97D;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">
                  ${isAr ? 'أدواتُك المجّانيّة' : 'YOUR FREE TOOLKIT'}
                </p>
                <h1 style="color:#7A3B5E;font-size:24px;margin:0 0 8px;">${toolkitName}</h1>
                <p style="color:#6B6580;font-size:14px;margin:0;">
                  ${isAr ? 'شكرًا لك — أداتُك في الانتظار.' : 'Thank you — your resource is waiting.'}
                </p>
              </div>
              <div style="background:#ffffff;padding:32px;border:1px solid #F3EFE8;border-top:none;">
                <p style="color:#2D2A33;font-size:15px;line-height:1.7;margin:0 0 24px;">
                  ${isAr
                    ? 'نحنُ سعداءُ بأنّك اتّخذتَ هذه الخطوة. انقُرْ على الزرِّ أدناه لتحميلِ أداتِك فورًا.'
                    : "We're glad you took this step. Click the button below to download your toolkit instantly."}
                </p>
                <div style="text-align:center;margin:0 0 24px;">
                  <a href="https://mama-hala-website.vercel.app/toolkits/pdf/${toolkitId}.pdf" style="display:inline-block;background:#7A3B5E;color:white;padding:14px 32px;border-radius:99px;text-decoration:none;font-size:15px;font-weight:600;margin-bottom:16px;">
                    ${isAr ? 'حمِّلْ أداتَك الآن' : 'Download Your Toolkit'}
                  </a>
                  <p style="color:#8E8E9F;font-size:12px;margin:16px 0 0;">
                    ${isAr
                      ? 'مشكلةٌ في التحميل؟ تواصَلْ معنا.'
                      : 'Having trouble? Contact us.'}
                  </p>
                  <a href="https://wa.me/16132222104?text=${encodeURIComponent(isAr ? `مرحبًا، أحتاج مساعدة في تحميل: ${toolkitName}` : `Hi, I need help downloading: ${toolkitName}`)}" style="display:inline-block;background:#25D366;color:white;padding:10px 20px;border-radius:99px;text-decoration:none;font-size:13px;font-weight:600;margin-top:8px;">
                    ${isAr ? 'تواصَلْ معنا' : 'Contact Us'}
                  </a>
                </div>
                <div style="border-top:1px solid #F3EFE8;padding-top:24px;margin-top:8px;">
                  <p style="color:#4A4A5C;font-size:14px;line-height:1.7;margin:0 0 16px;">
                    ${isAr
                      ? 'هل تحتاجُ دعمًا شخصيًّا؟ محادثتُك الأولى مجّانيّة — 30 دقيقة بلا التزام.'
                      : 'Need personalized support? Your first conversation is free — 30 minutes, no commitment.'}
                  </p>
                  <a href="https://mama-hala-website.vercel.app/${isAr ? 'ar' : 'en'}/book-a-session" style="display:inline-block;background:#7A3B5E;color:white;padding:12px 24px;border-radius:99px;text-decoration:none;font-size:14px;font-weight:600;">
                    ${isAr ? 'احجِزْ استشارتَك المجّانيّة' : 'Book Your Free Consultation'}
                  </a>
                </div>
              </div>
              <div style="padding:16px 32px;text-align:center;border-radius:0 0 12px 12px;background:#FAF7F2;border:1px solid #F3EFE8;border-top:none;">
                <p style="color:#8E8E9F;font-size:11px;margin:0;">
                  ${isAr ? 'ماما هالة للاستشارات — حيثُ يلتقي النّموُّ بالقلب' : 'Mama Hala Consulting — Where Growth Meets Heart'}
                </p>
              </div>
            </div>
          `,
        });
      } catch (e) {
        console.error('Toolkit email error:', e);
      }
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
