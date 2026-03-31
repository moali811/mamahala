/* ================================================================
   Gift Card Email Template
   Beautiful branded HTML email for Mama Hala gift sessions.
   Table-based layout for maximum email client compatibility.
   ================================================================ */

export interface GiftEmailParams {
  recipientName: string;
  gifterName: string;
  serviceName: string;
  serviceNameAr: string;
  serviceDuration: string;
  occasion: string;
  occasionAr: string;
  personalMessage?: string;
  schedulingUrl: string;
  amount?: number;
  locale: 'en' | 'ar';
}

export function generateGiftEmail(params: GiftEmailParams): string {
  const {
    recipientName,
    gifterName,
    serviceName,
    serviceNameAr,
    serviceDuration,
    occasion,
    occasionAr,
    personalMessage,
    schedulingUrl,
    locale,
  } = params;

  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';
  const align = isAr ? 'right' : 'left';
  const fontFamily = isAr
    ? "'Noto Sans Arabic', 'Segoe UI', Tahoma, sans-serif"
    : "Georgia, 'Times New Roman', serif";
  const sansFont = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";

  const svcName = isAr ? serviceNameAr : serviceName;
  const occ = isAr ? occasionAr : occasion;

  const t = {
    giftForYou: isAr ? 'هديّةٌ لك' : 'A Gift For You',
    from: isAr ? 'مِن' : 'From',
    occasion: isAr ? 'المناسبة' : 'Occasion',
    personalMessage: isAr ? 'رسالةٌ شخصيّة' : 'A Personal Message',
    sessionDetails: isAr ? 'تفاصيلُ الجلسة' : 'Session Details',
    service: isAr ? 'الخدمة' : 'Service',
    duration: isAr ? 'المدّة' : 'Duration',
    scheduleBtn: isAr ? 'احجِزْ جلستَك الآن' : 'Schedule Your Session',
    validNote: isAr
      ? 'هذه الهديّة صالحةٌ لمدّة 6 أشهر من تاريخِ الإرسال.'
      : 'This gift is valid for 6 months from the date of this email.',
    sentBecause: isAr
      ? `تلقّيتَ هذا البريدَ لأنّ ${gifterName} أهداك جلسةً عبر ماما هالة للاستشارات.`
      : `You received this email because ${gifterName} gifted you a session through Mama Hala Consulting.`,
    brandName: isAr ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting',
    tagline: isAr ? 'حيثُ يلتقي النّموُّ بالقلب' : 'Where Growth Meets Heart',
  };

  return `<!DOCTYPE html>
<html lang="${locale}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.giftForYou}</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF7F2;font-family:${sansFont};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF7F2;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <p style="margin:0;font-family:${fontFamily};font-size:22px;font-weight:700;color:#7A3B5E;letter-spacing:0.5px;">
                ${t.brandName}
              </p>
              <p style="margin:4px 0 0;font-family:${sansFont};font-size:12px;color:#C8A97D;letter-spacing:2px;text-transform:uppercase;">
                ${t.tagline}
              </p>
              <div style="width:60px;height:2px;background-color:#C8A97D;margin:16px auto 0;"></div>
            </td>
          </tr>

          <!-- Gift Card -->
          <tr>
            <td>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F0E0D8;border-radius:16px;overflow:hidden;">
                <tr>
                  <td style="padding:48px 40px;text-align:center;">
                    <!-- Gift icon -->
                    <div style="width:56px;height:56px;margin:0 auto 20px;background-color:rgba(122,59,94,0.1);border-radius:50%;line-height:56px;font-size:28px;">
                      &#127873;
                    </div>

                    <p style="margin:0;font-family:${sansFont};font-size:13px;color:#C8A97D;text-transform:uppercase;letter-spacing:3px;font-weight:600;">
                      ${t.giftForYou}
                    </p>

                    <h1 style="margin:12px 0 0;font-family:${fontFamily};font-size:36px;color:#2D2A33;font-weight:700;line-height:1.2;">
                      ${recipientName}
                    </h1>

                    <div style="width:40px;height:2px;background-color:#C8A97D;margin:20px auto;"></div>

                    <p style="margin:0;font-family:${sansFont};font-size:15px;color:#6B6580;">
                      ${t.from} <strong style="color:#2D2A33;">${gifterName}</strong>
                    </p>

                    ${occ ? `
                    <div style="display:inline-block;margin-top:12px;padding:6px 16px;background-color:rgba(200,169,125,0.15);border-radius:20px;">
                      <span style="font-family:${sansFont};font-size:12px;color:#C8A97D;font-weight:600;">${occ}</span>
                    </div>
                    ` : ''}
                  </td>
                </tr>

                ${personalMessage ? `
                <!-- Personal Message -->
                <tr>
                  <td style="padding:0 40px 40px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:rgba(250,247,242,0.7);border-radius:12px;border-${isAr ? 'right' : 'left'}:3px solid #C8A97D;">
                      <tr>
                        <td style="padding:20px 24px;">
                          <p style="margin:0 0 8px;font-family:${sansFont};font-size:11px;color:#C8A97D;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;text-align:${align};">
                            ${t.personalMessage}
                          </p>
                          <p style="margin:0;font-family:${fontFamily};font-size:16px;color:#2D2A33;line-height:1.7;font-style:italic;text-align:${align};">
                            &ldquo;${personalMessage}&rdquo;
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                ` : ''}
              </table>
            </td>
          </tr>

          <!-- Session Details -->
          <tr>
            <td style="padding:32px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;border-radius:12px;border:1px solid #F3EFE8;">
                <tr>
                  <td style="padding:24px 32px;">
                    <p style="margin:0 0 12px;font-family:${sansFont};font-size:11px;color:#C8A97D;text-transform:uppercase;letter-spacing:1.5px;font-weight:600;text-align:${align};">
                      ${t.sessionDetails}
                    </p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:8px 0;font-family:${sansFont};font-size:13px;color:#8E8E9F;text-align:${align};">
                          ${t.service}
                        </td>
                        <td style="padding:8px 0;font-family:${sansFont};font-size:14px;color:#2D2A33;font-weight:600;text-align:${isAr ? 'left' : 'right'};">
                          ${svcName}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;font-family:${sansFont};font-size:13px;color:#8E8E9F;text-align:${align};">
                          ${t.duration}
                        </td>
                        <td style="padding:8px 0;font-family:${sansFont};font-size:14px;color:#2D2A33;font-weight:600;text-align:${isAr ? 'left' : 'right'};">
                          ${serviceDuration}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:8px 0 40px;">
              <a href="${schedulingUrl}" target="_blank" style="display:inline-block;padding:16px 40px;background-color:#7A3B5E;color:#FFFFFF;font-family:${sansFont};font-size:16px;font-weight:600;text-decoration:none;border-radius:50px;letter-spacing:0.3px;">
                ${t.scheduleBtn}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 0;border-top:1px solid #F3EFE8;">
              <p style="margin:0 0 8px;font-family:${sansFont};font-size:12px;color:#8E8E9F;text-align:center;line-height:1.6;">
                ${t.validNote}
              </p>
              <p style="margin:0;font-family:${sansFont};font-size:11px;color:#C4C0BC;text-align:center;line-height:1.6;">
                ${t.sentBecause}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
