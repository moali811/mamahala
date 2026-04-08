import puppeteer from 'puppeteer';
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, basename, resolve } from 'path';
import QRCode from 'qrcode';

const ROOT = process.cwd();
const TOOLKITS_DIR = join(ROOT, 'public/toolkits');
const OUTPUT_DIR = join(ROOT, 'public/toolkits/pdf');
const LOGO_PATH = join(ROOT, 'public/images/logo-512.png');

// Brand colors
const B = {
  plum: '#7A3B5E',
  gold: '#C8A97D',
  rose: '#C4878A',
  dark: '#2D2A33',
  muted: '#5A5765',
  cream: '#FAF7F2',
  sand: '#F3EFE8',
  border: '#E8E0D4',
};

// Toolkit metadata — subtitles for cover pages
const META = {
  'family-communication-toolkit': {
    subtitle: 'A practical guide to talking, listening, and connecting as a family',
    category: 'Family Wellness',
  },
  'anger-management-worksheet': {
    subtitle: 'Identify your triggers. Understand your cycle. Practice calm.',
    category: 'Mental Health',
  },
  'calm-parent-checklist': {
    subtitle: '10 daily micro-practices for staying grounded',
    category: 'Parenting',
  },
  'understanding-your-teen': {
    subtitle: "A parent's guide to the teenage brain, decoded",
    category: 'Parenting',
  },
  'self-care-assessment': {
    subtitle: 'Assess, plan, and protect your well-being across six dimensions',
    category: 'Self-Care',
  },
  'complete-parenting-guide': {
    subtitle: 'Attachment, discipline, emotional coaching, screen time & resilience',
    category: 'Parenting',
  },
  'couples-communication-workbook': {
    subtitle: '30 structured exercises to rebuild, repair & deepen your connection',
    category: 'Relationships',
  },
  'anxiety-recovery-journal': {
    subtitle: 'A 90-day guided journal combining CBT, gratitude & cognitive reframing',
    category: 'Mental Health',
  },
  'social-media-survival-guide': {
    subtitle: 'Practical strategies for a healthier relationship with social media',
    category: 'Digital Wellness',
  },
  'teen-anger-toolkit': {
    subtitle: 'Understanding, managing, and channeling anger in healthy ways',
    category: 'Teen Mental Health',
  },
  'teen-identity-map': {
    subtitle: 'A guided exploration of who you are, who you are becoming, and what matters most',
    category: 'Teen Identity',
  },
  'friendship-flags-checklist': {
    subtitle: 'How to recognize healthy friendships, red flags, and everything in between',
    category: 'Relationships',
  },
  'exam-season-emergency-kit': {
    subtitle: 'Practical strategies for managing stress, staying focused, and surviving exam season',
    category: 'Student Wellness',
  },
  'imposter-syndrome-playbook': {
    subtitle: 'Recognizing, reframing, and overcoming the voice that says you do not belong',
    category: 'Mental Health',
  },
  'adulting-emotional-edition': {
    subtitle: 'A guide to the emotional skills nobody taught you in school',
    category: 'Young Adult',
  },
  'student-burnout-recovery': {
    subtitle: 'Identifying burnout, rebuilding energy, and creating sustainable habits',
    category: 'Student Wellness',
  },
  'bicultural-student-guide': {
    subtitle: 'Navigating two worlds without losing yourself',
    category: 'Cultural Identity',
  },
  'student-loneliness-toolkit': {
    subtitle: 'Understanding, managing, and overcoming loneliness as a student',
    category: 'Student Wellness',
  },
};

// ---------------------------------------------------------------------------
// Markdown → HTML parser
// ---------------------------------------------------------------------------

// SVG icons for section headers — matched by keyword
function getSectionIcon(heading) {
  const h = heading.toLowerCase();
  // Communication / talking
  if (h.includes('communicat') || h.includes('conversation') || h.includes('dialogue') || h.includes('talk'))
    return '<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';
  // Listening / hearing
  if (h.includes('listen') || h.includes('hear'))
    return '<svg viewBox="0 0 24 24"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>';
  // Anger / emotion / feeling
  if (h.includes('anger') || h.includes('emotion') || h.includes('feeling') || h.includes('trigger') || h.includes('escalat'))
    return '<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>';
  // Plan / action / strategy
  if (h.includes('plan') || h.includes('action') || h.includes('strateg') || h.includes('practice') || h.includes('step'))
    return '<svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>';
  // Track / progress / journal
  if (h.includes('track') || h.includes('progress') || h.includes('journal') || h.includes('log') || h.includes('record'))
    return '<svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>';
  // Family / parent / child
  if (h.includes('family') || h.includes('parent') || h.includes('child') || h.includes('teen') || h.includes('kid'))
    return '<svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
  // Brain / development / understand
  if (h.includes('brain') || h.includes('develop') || h.includes('understand') || h.includes('decode'))
    return '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
  // Heart / love / compassion / care
  if (h.includes('heart') || h.includes('love') || h.includes('compassion') || h.includes('care') || h.includes('self-care') || h.includes('wellbeing') || h.includes('well-being'))
    return '<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
  // Connect / relation / couple / repair
  if (h.includes('connect') || h.includes('relat') || h.includes('couple') || h.includes('repair') || h.includes('intima'))
    return '<svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
  // Warning / sign / support / help
  if (h.includes('warning') || h.includes('sign') || h.includes('support') || h.includes('help') || h.includes('need'))
    return '<svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  // Assess / score / evaluate
  if (h.includes('assess') || h.includes('score') || h.includes('evaluat') || h.includes('quiz'))
    return '<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>';
  // Resilience / strength / growth
  if (h.includes('resilien') || h.includes('strength') || h.includes('growth') || h.includes('flourish'))
    return '<svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
  // Screen / digital / technology
  if (h.includes('screen') || h.includes('digital') || h.includes('tech') || h.includes('media'))
    return '<svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>';
  // Default: book/document
  return '<svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>';
}

function parseMarkdown(md) {
  // Normalize line endings
  let text = md.replace(/\r\n/g, '\n');

  // Remove the title line (# Title) — it goes on the cover
  text = text.replace(/^# .+\n*/m, '');
  // Remove the subtitle bold line right after (** subtitle **)
  text = text.replace(/^\*\*.+?\*\*\s*\n*/m, '');
  // Remove the "By Dr. Hala" line
  text = text.replace(/^\*By Dr\. Hala Ali.*?\*\s*\n*/m, '');

  const lines = text.split('\n');
  const htmlParts = [];
  let i = 0;

  function isBlank(line) {
    return line.trim() === '';
  }

  while (i < lines.length) {
    const line = lines[i];

    // Skip blank lines
    if (isBlank(line)) {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line.trim())) {
      htmlParts.push('<hr class="section-divider" />');
      i++;
      continue;
    }

    // Headings
    const h3 = line.match(/^### (.+)/);
    if (h3) {
      htmlParts.push(`<h3>${inlineFormat(h3[1])}</h3>`);
      i++;
      continue;
    }
    const h2 = line.match(/^## (.+)/);
    if (h2) {
      htmlParts.push(`<h2>${inlineFormat(h2[1])}</h2>`);
      i++;
      continue;
    }
    const h1 = line.match(/^# (.+)/);
    if (h1) {
      const heading = inlineFormat(h1[1]);
      const icon = getSectionIcon(heading);
      htmlParts.push(`<div class="section-header"><div class="section-icon">${icon}</div><h1>${heading}</h1></div>`);
      i++;
      continue;
    }

    // Blockquote → styled callout
    if (line.startsWith('>')) {
      const quoteLines = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].replace(/^>\s*/, ''));
        i++;
      }
      const content = inlineFormat(quoteLines.join(' '));
      htmlParts.push(`<div class="callout"><div class="callout-icon">💡</div><div><p>${content}</p></div></div>`);
      continue;
    }

    // Code block (``` fenced)
    if (line.trim().startsWith('```')) {
      i++;
      const codeLines = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) i++; // skip closing ```
      htmlParts.push(`<pre class="code-block">${codeLines.join('\n')}</pre>`);
      continue;
    }

    // Table
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1].includes('|') && /\|[\s-:]+\|/.test(lines[i + 1])) {
      const tableLines = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      htmlParts.push(parseTable(tableLines));
      continue;
    }

    // Checkbox list item
    if (/^- \[[ x]\]/.test(line)) {
      const items = [];
      while (i < lines.length && /^- \[[ x]\]/.test(lines[i])) {
        const checked = lines[i].includes('[x]');
        const text = lines[i].replace(/^- \[[ x]\]\s*/, '');
        items.push(`<div class="checkbox-item"><span class="checkbox-box${checked ? ' checked' : ''}"></span><span>${inlineFormat(text)}</span></div>`);
        i++;
      }
      htmlParts.push(`<div class="checkbox-list">${items.join('')}</div>`);
      continue;
    }

    // Unordered list
    if (/^- /.test(line)) {
      const items = [];
      while (i < lines.length && /^- /.test(lines[i])) {
        // Collect continuation lines (indented)
        let itemText = lines[i].replace(/^- /, '');
        i++;
        while (i < lines.length && /^ {2,}/.test(lines[i]) && !isBlank(lines[i])) {
          itemText += ' ' + lines[i].trim();
          i++;
        }
        items.push(`<li>${inlineFormat(itemText)}</li>`);
      }
      htmlParts.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Numbered list
    if (/^\d+\.\s/.test(line)) {
      const items = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        let itemText = lines[i].replace(/^\d+\.\s/, '');
        i++;
        while (i < lines.length && /^ {2,}/.test(lines[i]) && !isBlank(lines[i])) {
          itemText += ' ' + lines[i].trim();
          i++;
        }
        items.push(`<li>${inlineFormat(itemText)}</li>`);
      }
      htmlParts.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Default: paragraph
    const paraLines = [];
    while (i < lines.length && !isBlank(lines[i]) && !/^#{1,3} /.test(lines[i]) && !/^---/.test(lines[i]) && !/^>/.test(lines[i]) && !/^- /.test(lines[i]) && !/^\d+\.\s/.test(lines[i]) && !lines[i].includes('|') && !lines[i].startsWith('```')) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length) {
      htmlParts.push(`<p>${inlineFormat(paraLines.join(' '))}</p>`);
    }
  }

  return htmlParts.join('\n');
}

function parseTable(tableLines) {
  // First line = header, second = separator, rest = data
  const parseRow = (line) =>
    line.split('|').map(c => c.trim()).filter(c => c !== '');

  const headers = parseRow(tableLines[0]);
  const dataRows = tableLines.slice(2).map(parseRow);

  let html = '<table><thead><tr>';
  for (const h of headers) {
    html += `<th>${inlineFormat(h)}</th>`;
  }
  html += '</tr></thead><tbody>';
  for (let r = 0; r < dataRows.length; r++) {
    html += `<tr class="${r % 2 === 1 ? 'alt-row' : ''}">`;
    for (const cell of dataRows[r]) {
      html += `<td>${inlineFormat(cell)}</td>`;
    }
    html += '</tr>';
  }
  html += '</tbody></table>';
  return html;
}

function inlineFormat(str) {
  return str
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\w)\*([^*]+?)\*(?!\w)/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/_{3,}/g, '<span class="fill-blank"></span>');
}

// ---------------------------------------------------------------------------
// HTML template
// ---------------------------------------------------------------------------

function buildFullHtml(title, subtitle, category, bodyHtml, logoDataUri, qrDataUri, lang = 'en') {
  const isRTL = lang === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';
  const fontFamily = isRTL
    ? "'Tajawal', 'Noto Naskh Arabic', 'Amiri', 'Traditional Arabic', 'Simplified Arabic', system-ui, serif"
    : "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const headingFont = isRTL
    ? "'Tajawal', 'Noto Naskh Arabic', 'Amiri', Georgia, serif"
    : "Georgia, 'Times New Roman', serif";

  return `<!DOCTYPE html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="UTF-8">
${isRTL ? `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap" rel="stylesheet">` : ''}
<style>
  /* ============ RESET ============ */
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  /* ============ PAGE SETUP ============ */
  @page {
    size: letter;
    margin: 56px 52px 72px 52px;

    @bottom-center {
      content: counter(page);
      font-family: ${headingFont};
      font-size: 9pt;
      color: ${B.rose};
    }
  }

  @page :first {
    margin: 0;
    @bottom-center { content: none; }
  }

  /* ============ BODY ============ */
  body {
    font-family: ${fontFamily};
    color: ${B.dark};
    font-size: ${isRTL ? '12pt' : '10.5pt'};
    line-height: ${isRTL ? '2.1' : '1.75'};
    ${isRTL ? 'word-spacing: 2px; letter-spacing: 0.01em;' : ''}
    direction: ${dir};
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  a { color: ${B.plum}; text-decoration: none; }

  /* ============ COVER PAGE ============ */
  .cover-page {
    page-break-after: always;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: linear-gradient(160deg, ${B.cream} 0%, #F0E6DC 35%, #E8D5CC 65%, #DDC5BC 100%);
    position: relative;
    padding: 72px;
  }

  .cover-page::before {
    content: '';
    position: absolute;
    top: 36px; left: 36px; right: 36px; bottom: 36px;
    border: 1px solid rgba(122, 59, 94, 0.12);
    border-radius: 16px;
  }

  .cover-logo {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin-bottom: 28px;
    border-radius: 12px;
  }

  .cover-category {
    font-size: 9pt;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: ${B.gold};
    font-weight: 600;
    margin-bottom: 20px;
  }

  .cover-title {
    font-family: ${headingFont};
    font-size: 34pt;
    font-weight: 700;
    color: ${B.dark};
    line-height: 1.18;
    margin-bottom: 0;
    max-width: 520px;
    border: none;
    padding: 0;
  }

  .cover-rule {
    width: 56px;
    height: 3px;
    background: ${B.gold};
    border-radius: 2px;
    margin: 28px auto;
  }

  .cover-subtitle {
    font-family: ${headingFont};
    font-size: 13pt;
    color: ${B.muted};
    max-width: 420px;
    line-height: 1.55;
    font-style: italic;
  }

  .cover-author {
    margin-top: 44px;
    font-size: 10pt;
    color: ${B.plum};
    font-weight: 600;
  }

  .cover-author span {
    display: block;
    font-weight: 400;
    font-size: 9pt;
    color: ${B.muted};
    margin-top: 2px;
  }

  .cover-footer {
    position: absolute;
    bottom: 48px;
    font-size: 8.5pt;
    color: ${B.rose};
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* ============ CONTENT ============ */
  .content {
    padding-top: 8px;
    text-align: ${isRTL ? 'right' : 'left'};
    direction: ${dir};
  }

  /* ============ BRANDED PAGE HEADER ============ */
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0 12px;
    margin-bottom: 24px;
    border-bottom: 1.5px solid ${B.sand};
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }
  .page-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }
  .page-header-logo {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  .page-header-brand {
    font-size: 8pt;
    color: ${B.plum};
    font-weight: 600;
    letter-spacing: 1px;
  }
  .page-header-right {
    font-size: 7.5pt;
    color: ${B.gold};
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  /* ============ SECTION ICON HEADERS ============ */
  .section-header {
    display: flex;
    align-items: center;
    gap: 14px;
    margin: 36px 0 16px;
    page-break-after: avoid;
    ${isRTL ? 'flex-direction: row-reverse;' : ''}
  }
  .section-icon {
    width: 40px;
    height: 40px;
    min-width: 40px;
    background: linear-gradient(135deg, ${B.cream}, ${B.sand});
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${B.border};
  }
  .section-icon svg {
    width: 20px;
    height: 20px;
    stroke: ${B.plum};
    fill: none;
    stroke-width: 1.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  .section-header h1 {
    margin: 0;
    border: none;
    padding: 0;
  }

  /* ============ COLORED SECTION BLOCKS ============ */
  .section-block {
    background: ${B.cream};
    border-radius: 10px;
    padding: 20px 24px;
    margin: 20px 0;
    border: 1px solid ${B.border};
    page-break-inside: avoid;
  }
  .section-block.gold {
    background: linear-gradient(135deg, #FDF6ED, #F9EFE0);
    border-color: ${B.gold}33;
  }
  .section-block.rose {
    background: linear-gradient(135deg, #FDF2F2, #FAE8E8);
    border-color: ${B.rose}33;
  }
  .section-block.sage {
    background: linear-gradient(135deg, #F2F7F4, #E6F0EA);
    border-color: #5A8B6E33;
  }

  /* ============ TIP / NOTE CALLOUTS ============ */
  .callout {
    background: linear-gradient(135deg, #FDF6ED, #F9F0E3);
    ${isRTL ? 'border-right' : 'border-left'}: 4px solid ${B.gold};
    border-radius: ${isRTL ? '10px 0 0 10px' : '0 10px 10px 0'};
    padding: 16px 20px;
    margin: 20px 0;
    page-break-inside: avoid;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    ${isRTL ? 'flex-direction: row-reverse; text-align: right;' : ''}
  }
  .callout-icon {
    font-size: 16pt;
    line-height: 1;
    flex-shrink: 0;
    margin-top: 2px;
  }
  .callout p {
    margin: 0;
    font-size: 10pt;
    color: ${B.muted};
  }
  .callout strong {
    color: ${B.dark};
    display: block;
    margin-bottom: 4px;
    font-size: 10.5pt;
  }

  /* ============ CTA PAGE ============ */
  .cta-page {
    page-break-before: always;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-height: 75vh;
    padding: 60px 40px;
  }
  .cta-divider {
    width: 48px;
    height: 3px;
    background: ${B.gold};
    border-radius: 2px;
    margin-bottom: 28px;
  }
  .cta-title {
    font-family: ${headingFont};
    font-size: 22pt;
    color: ${B.dark};
    font-weight: 700;
    margin-bottom: 14px;
    border: none;
    padding: 0;
  }
  .cta-text {
    font-size: 11pt;
    color: ${B.muted};
    max-width: 440px;
    line-height: 1.7;
    margin-bottom: 28px;
  }
  .cta-button {
    display: inline-block;
    background: ${B.plum};
    color: white;
    padding: 14px 40px;
    border-radius: 30px;
    font-size: 11pt;
    font-weight: 600;
    text-decoration: none;
    margin-bottom: 32px;
  }
  .cta-contact {
    font-size: 9.5pt;
    color: ${B.plum};
    font-weight: 600;
    margin-bottom: 6px;
  }
  .cta-details {
    font-size: 8.5pt;
    color: ${B.muted};
    line-height: 1.6;
  }
  .cta-qr {
    margin-top: 24px;
    padding: 12px;
    background: white;
    border-radius: 8px;
    border: 1px solid ${B.border};
  }
  .cta-qr-label {
    font-size: 7.5pt;
    color: ${B.rose};
    margin-top: 8px;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .cta-copyright {
    margin-top: 40px;
    font-size: 7.5pt;
    color: ${B.rose};
    max-width: 400px;
  }

  /* ============ HEADINGS ============ */
  h1 {
    font-family: ${headingFont};
    font-size: 20pt;
    font-weight: 700;
    color: ${B.plum};
    margin: 32px 0 12px;
    padding-bottom: 6px;
    border-bottom: 2px solid ${B.gold};
    line-height: 1.25;
    page-break-after: avoid;
  }

  h2 {
    font-family: ${headingFont};
    font-size: 14.5pt;
    font-weight: 700;
    color: ${B.dark};
    margin: 28px 0 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid ${B.sand};
    line-height: 1.3;
    page-break-after: avoid;
  }

  h2::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 2.5px;
    background: ${B.gold};
    border-radius: 2px;
    ${isRTL ? 'margin-left' : 'margin-right'}: 10px;
    vertical-align: middle;
    position: relative;
    top: -2px;
  }

  h3 {
    font-family: ${headingFont};
    font-size: 11.5pt;
    font-weight: 700;
    color: ${B.plum};
    margin: 22px 0 8px;
    line-height: 1.35;
    page-break-after: avoid;
  }

  /* ============ TEXT ============ */
  p {
    margin: 8px 0 10px;
    line-height: 1.75;
    orphans: 3;
    widows: 3;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  strong { color: ${B.dark}; font-weight: 600; }
  em { color: ${B.plum}; font-style: italic; }
  code {
    background: ${B.sand};
    padding: 1px 5px;
    border-radius: 3px;
    font-size: 9.5pt;
    font-family: 'SF Mono', Menlo, Consolas, monospace;
  }

  /* ============ BLOCKQUOTES ============ */
  blockquote {
    background: ${B.cream};
    ${isRTL ? 'border-right' : 'border-left'}: 3.5px solid ${B.gold};
    padding: 16px 22px;
    margin: 18px 0;
    border-radius: ${isRTL ? '8px 0 0 8px' : '0 8px 8px 0'};
    font-style: italic;
    font-family: ${headingFont};
    font-size: 11pt;
    color: ${B.muted};
    line-height: 1.65;
    page-break-inside: avoid;
  }

  /* ============ HORIZONTAL RULE ============ */
  hr.section-divider {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${B.border}, transparent);
    margin: 28px 0;
  }

  /* ============ LISTS ============ */
  ul, ol {
    margin: 10px 0 10px ${isRTL ? '0' : '6px'};
    ${isRTL ? 'margin-right: 6px;' : ''}
    ${isRTL ? 'padding-right: 0; padding-left: 0;' : 'padding-left: 0;'}
  }

  ul {
    list-style: none;
  }

  ul > li {
    position: relative;
    ${isRTL ? 'padding-right' : 'padding-left'}: 20px;
    margin: 6px 0;
    line-height: 1.65;
  }

  ul > li::before {
    content: '';
    position: absolute;
    ${isRTL ? 'right' : 'left'}: 0;
    top: 8px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${B.rose};
  }

  ol {
    list-style: none;
    counter-reset: list-counter;
    ${isRTL ? 'padding-right: 0; padding-left: 0;' : 'padding-left: 0;'}
  }

  ol > li {
    counter-increment: list-counter;
    position: relative;
    ${isRTL ? 'padding-right' : 'padding-left'}: 28px;
    margin: 8px 0;
    line-height: 1.65;
  }

  ol > li::before {
    content: counter(list-counter);
    position: absolute;
    ${isRTL ? 'right' : 'left'}: 0;
    top: 0;
    width: 20px;
    height: 20px;
    background: ${B.plum};
    color: white;
    border-radius: 50%;
    font-size: 8.5pt;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  /* ============ CHECKBOXES ============ */
  .checkbox-list {
    margin: 12px 0;
  }

  .checkbox-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 8px 0;
    line-height: 1.6;
    ${isRTL ? 'flex-direction: row-reverse; text-align: right;' : ''}
  }

  .checkbox-box {
    display: inline-block;
    width: 16px;
    height: 16px;
    min-width: 16px;
    border: 1.5px solid ${B.rose};
    border-radius: 3px;
    margin-top: 3px;
    background: white;
  }

  .checkbox-box.checked {
    background: ${B.rose};
  }

  /* ============ FILL-IN BLANKS ============ */
  .fill-blank {
    display: inline-block;
    min-width: 200px;
    border-bottom: 1.5px solid ${B.border};
    margin: 0 2px;
    height: 1.4em;
    vertical-align: bottom;
  }

  /* ============ TABLES ============ */
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 9.5pt;
    page-break-inside: avoid;
  }

  thead {
    background: ${B.plum};
  }

  th {
    color: white;
    font-weight: 600;
    padding: 10px 14px;
    text-align: ${isRTL ? 'right' : 'left'};
    font-size: 9pt;
    letter-spacing: 0.3px;
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid ${B.border};
    vertical-align: top;
    line-height: 1.55;
    text-align: ${isRTL ? 'right' : 'left'};
  }

  tr.alt-row {
    background: ${B.cream};
  }

  /* ============ CODE BLOCKS ============ */
  pre.code-block {
    background: ${B.sand};
    border: 1px solid ${B.border};
    border-radius: 8px;
    padding: 18px 22px;
    font-family: 'SF Mono', Menlo, Consolas, monospace;
    font-size: 9pt;
    line-height: 1.6;
    white-space: pre-wrap;
    margin: 16px 0;
    color: ${B.dark};
    page-break-inside: avoid;
  }

  /* ============ CTA PAGE ============ */
  .cta-page {
    page-break-before: always;
    text-align: center;
    padding: 120px 56px 80px;
    background: ${B.cream};
  }

  .cta-page .cta-rule {
    width: 48px;
    height: 3px;
    background: ${B.gold};
    border-radius: 2px;
    margin: 0 auto 32px;
  }

  .cta-page h2 {
    font-family: ${headingFont};
    font-size: 22pt;
    color: ${B.dark};
    margin-bottom: 14px;
    border: none;
    padding: 0;
  }

  .cta-page h2::before { display: none; }

  .cta-page p {
    font-size: 11pt;
    max-width: 440px;
    margin: 0 auto 24px;
    line-height: 1.7;
    color: ${B.muted};
  }

  .cta-button {
    display: inline-block;
    background: ${B.plum};
    color: white;
    padding: 14px 40px;
    border-radius: 99px;
    text-decoration: none;
    font-weight: 600;
    font-size: 10.5pt;
    letter-spacing: 0.5px;
    margin-bottom: 32px;
  }

  .cta-details {
    font-size: 9pt;
    color: ${B.muted};
    line-height: 1.8;
  }

  .cta-details strong {
    color: ${B.plum};
  }

  /* ============ COPYRIGHT FOOTER ============ */
  .copyright {
    text-align: center;
    font-size: 7.5pt;
    color: ${B.rose};
    margin-top: 48px;
    padding-top: 16px;
    border-top: 0.5px solid ${B.border};
  }
</style>
</head>
<body>

<!-- ===================== COVER PAGE ===================== -->
<div class="cover-page">
  ${logoDataUri ? `<img class="cover-logo" src="${logoDataUri}" alt="Logo" />` : ''}
  <div class="cover-category">${category}</div>
  <h1 class="cover-title">${title}</h1>
  <div class="cover-rule"></div>
  <p class="cover-subtitle">${subtitle}</p>
  <div class="cover-author">${isRTL ? 'د. هالة علي' : 'Dr. Hala Ali'}<span>${isRTL ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting'}</span></div>
  <div class="cover-footer">mamahala.ca</div>
</div>

<!-- ===================== CONTENT ===================== -->
<div class="content">
  <!-- Branded page header -->
  <div class="page-header">
    <div class="page-header-left">
      ${logoDataUri ? `<img class="page-header-logo" src="${logoDataUri}" alt="" />` : ''}
      <span class="page-header-brand">${isRTL ? 'ماما هالة للاستشارات' : 'Mama Hala Consulting'}</span>
    </div>
    <span class="page-header-right">${category}</span>
  </div>

${bodyHtml}
</div>

<!-- ===================== CTA PAGE ===================== -->
<div class="cta-page">
  <div class="cta-divider"></div>
  <div class="cta-title">${isRTL ? 'هل أنتَ مستعدٌّ لدعمٍ شخصيّ؟' : 'Ready for Personalized Support?'}</div>
  <p class="cta-text">${isRTL
    ? 'محادثتُك الأولى مجّانيّة — 30 دقيقة، بلا ضغط. دعنا نستكشفُ معًا كيفَ يمكنُ للاستشاراتِ أن تساعدَك أنتَ وعائلتَك.'
    : 'Your first conversation is free &mdash; 30 minutes, no pressure. Let&rsquo;s explore how counseling can help you and your family thrive.'}</p>
  <a href="https://mamahala.ca/${isRTL ? 'ar' : 'en'}/book-a-session" class="cta-button">${isRTL ? 'احجِزْ استشارتَك المجّانيّة' : 'Book Your Free Consultation'}</a>
  <div class="cta-contact">mamahala.ca &nbsp;&bull;&nbsp; admin@mamahala.ca</div>
  <div class="cta-details">
    ${isRTL ? 'أوتاوا، كندا &nbsp;&bull;&nbsp; دبي، الإمارات' : 'Ottawa, Canada &nbsp;&bull;&nbsp; Dubai, UAE'}<br/>
    ${isRTL ? 'خدماتٌ ثنائيّةُ اللغة بالعربيّةِ والإنجليزيّة' : 'Bilingual services in English &amp; Arabic'}
  </div>
  <!-- Real QR Code linking to booking page -->
  ${qrDataUri ? `<div class="cta-qr"><img src="${qrDataUri}" width="120" height="120" alt="QR Code" style="display:block;" /></div><div class="cta-qr-label">Scan to book a session</div>` : ''}
  <div class="cta-copyright">&copy; ${new Date().getFullYear()} Mama Hala Consulting. For personal use only. Do not reproduce or distribute without permission.</div>
</div>

</body>
</html>`;
}

// ---------------------------------------------------------------------------
// PDF generation
// ---------------------------------------------------------------------------

function getLogoDataUri() {
  if (!existsSync(LOGO_PATH)) {
    console.warn('  Logo not found at', LOGO_PATH, '— cover page will omit logo.');
    return null;
  }
  const buffer = readFileSync(LOGO_PATH);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

async function generatePDF(mdFile, outputPath, logoDataUri, lang = 'en') {
  const md = readFileSync(mdFile, 'utf-8');
  const slug = basename(mdFile, '.md');
  const meta = META[slug] || { subtitle: '', category: 'Resource' };

  // Extract title from the first # heading
  const titleMatch = md.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1] : slug.replace(/-/g, ' ');

  // Parse markdown body into HTML
  const bodyHtml = parseMarkdown(md);

  // Generate real QR code
  const qrDataUri = await QRCode.toDataURL('https://mamahala.ca/en/book-a-session', {
    width: 150,
    margin: 1,
    color: { dark: B.plum, light: '#FFFFFF' },
    errorCorrectionLevel: 'M',
  });

  const fullHtml = buildFullHtml(title, meta.subtitle, meta.category, bodyHtml, logoDataUri, qrDataUri, lang);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  await page.setContent(fullHtml, { waitUntil: 'networkidle0', timeout: 15000 });

  await page.pdf({
    path: outputPath,
    format: 'Letter',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<span></span>',
    footerTemplate: `
      <div style="width:100%; text-align:center; font-size:8px; color:${B.rose}; padding:8px 0;">
        <span class="pageNumber"></span>
      </div>
    `,
    margin: {
      top: '60px',
      right: '52px',
      bottom: '80px',
      left: '52px',
    },
  });

  await browser.close();
  console.log(`  ✓ ${basename(outputPath)}`);
}

async function main() {
  console.log('\n🔖 Mama Hala Consulting — Premium PDF Generator\n');

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const arOutputDir = join(OUTPUT_DIR, 'ar');
  if (!existsSync(arOutputDir)) {
    mkdirSync(arOutputDir, { recursive: true });
  }

  const logoDataUri = getLogoDataUri();

  // Generate English PDFs
  const mdFiles = readdirSync(TOOLKITS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort();

  console.log(`Found ${mdFiles.length} English toolkit files.\n`);

  for (const file of mdFiles) {
    const mdPath = join(TOOLKITS_DIR, file);
    const pdfPath = join(OUTPUT_DIR, file.replace('.md', '.pdf'));
    await generatePDF(mdPath, pdfPath, logoDataUri);
  }

  // Generate Arabic PDFs
  const arDir = join(TOOLKITS_DIR, 'ar');
  if (existsSync(arDir)) {
    const arFiles = readdirSync(arDir)
      .filter(f => f.endsWith('.md'))
      .sort();

    console.log(`\nFound ${arFiles.length} Arabic toolkit files.\n`);

    for (const file of arFiles) {
      const mdPath = join(arDir, file);
      const pdfPath = join(arOutputDir, file.replace('.md', '.pdf'));
      await generatePDF(mdPath, pdfPath, logoDataUri, 'ar');
    }
  } else {
    console.log('\n⚠ No Arabic toolkit directory found at /public/toolkits/ar/\n');
  }

  const totalEn = mdFiles.length;
  const totalAr = existsSync(arDir) ? readdirSync(arDir).filter(f => f.endsWith('.md')).length : 0;
  console.log(`\n✅ Done! ${totalEn} English + ${totalAr} Arabic PDFs generated\n`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
