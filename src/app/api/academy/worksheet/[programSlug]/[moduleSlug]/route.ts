import { NextRequest, NextResponse } from 'next/server';
import { jsPDF } from 'jspdf';

// ─── Brand colors as RGB tuples ─────────────────────────────────────────────
const PLUM: [number, number, number] = [122, 59, 94];
const GOLD: [number, number, number] = [200, 169, 125];
const CREAM: [number, number, number] = [250, 247, 242];
const DARK: [number, number, number] = [45, 42, 51];
const TEXT: [number, number, number] = [74, 74, 92];
const LIGHT: [number, number, number] = [243, 239, 232];
const WHITE: [number, number, number] = [255, 255, 255];
const GREEN: [number, number, number] = [59, 138, 110];

// ─── Program data loader ────────────────────────────────────────────────────
async function loadProgram(slug: string) {
  try {
    switch (slug) {
      case 'intentional-parent':
        return (await import('@/data/programs/intentional-parent')).intentionalParentProgram;
      case 'resilient-teens':
        return (await import('@/data/programs/resilient-teens')).resilientTeensProgram;
      case 'stronger-together':
        return (await import('@/data/programs/stronger-together')).strongerTogetherProgram;
      case 'inner-compass':
        return (await import('@/data/programs/inner-compass')).innerCompassProgram;
      default:
        return null;
    }
  } catch {
    return null;
  }
}

// ─── Text helper ─────────────────────────────────────────────────────────────
function t(en: string, ar: string, isRTL: boolean) {
  return isRTL ? ar : en;
}
function tArr(en: string[], ar: string[], isRTL: boolean) {
  return isRTL ? ar : en;
}

// ─── Drawing helpers ──────────────────────────────────────────────────────────
function drawLines(
  doc: jsPDF,
  startY: number,
  count: number,
  marginLeft: number,
  lineWidth: number,
  lineSpacing: number,
): number {
  doc.setDrawColor(...LIGHT);
  doc.setLineWidth(0.2);
  for (let i = 0; i < count; i++) {
    const y = startY + i * lineSpacing;
    doc.line(marginLeft, y, marginLeft + lineWidth, y);
  }
  return startY + count * lineSpacing;
}

function sectionHeader(
  doc: jsPDF,
  label: string,
  y: number,
  marginLeft: number,
  accentColor: [number, number, number],
  contentWidth: number,
): number {
  // Accent bar
  doc.setFillColor(...accentColor);
  doc.rect(marginLeft, y, 3, 5, 'F');
  // Label
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(...accentColor);
  doc.text(label.toUpperCase(), marginLeft + 5, y + 4);
  // Underline
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.4);
  doc.line(marginLeft, y + 6.5, marginLeft + contentWidth, y + 6.5);
  return y + 10;
}

function wrapText(doc: jsPDF, text: string, x: number, startY: number, maxWidth: number, lineHeight: number): number {
  const lines = doc.splitTextToSize(text, maxWidth);
  doc.text(lines, x, startY);
  return startY + lines.length * lineHeight;
}

// ─── PDF Generator ────────────────────────────────────────────────────────────
function generateWorksheetPDF(opts: {
  programTitleEn: string;
  programTitleAr: string;
  programColor: string;
  moduleTitle: string;
  levelName: string;
  moduleNumber: number;
  durationMinutes: number;
  activityTitle: string;
  activityDesc: string;
  reflectionPrompt: string;
  keyTakeaways: string[];
  locale: string;
}): ArrayBuffer {
  const {
    programTitleEn,
    programTitleAr,
    programColor,
    moduleTitle,
    levelName,
    moduleNumber,
    durationMinutes,
    activityTitle,
    activityDesc,
    reflectionPrompt,
    keyTakeaways,
    locale,
  } = opts;

  const isRTL = locale === 'ar';
  const programTitle = isRTL ? programTitleAr : programTitleEn;

  // Parse program color to RGB
  const hex = programColor.replace('#', '');
  const progR = parseInt(hex.substring(0, 2), 16);
  const progG = parseInt(hex.substring(2, 4), 16);
  const progB = parseInt(hex.substring(4, 6), 16);
  const PROG: [number, number, number] = [progR, progG, progB];

  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

  const PAGE_W = 210;
  const PAGE_H = 297;
  const MARGIN = 14;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  let y = 0;

  // ─── HEADER ─────────────────────────────────────────────────────────────
  // Full-width plum background
  doc.setFillColor(...PLUM);
  doc.rect(0, 0, PAGE_W, 38, 'F');

  // Decorative gold stripe
  doc.setFillColor(...GOLD);
  doc.rect(0, 35, PAGE_W, 3, 'F');

  // Mama Hala Academy label (small caps)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(...GOLD);
  doc.text('MAMA HALA ACADEMY', MARGIN, 10);

  // mamahala.ca
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(255, 255, 255);
  doc.text('mamahala.ca', PAGE_W - MARGIN, 10, { align: 'right' });

  // Program name
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...GOLD);
  doc.text(programTitle, MARGIN, 18);

  // Module title (may be long — wrap at ~170mm)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...WHITE);
  const titleLines = doc.splitTextToSize(moduleTitle, CONTENT_W - 20);
  doc.text(titleLines, MARGIN, 27);

  y = 38; // after header gold stripe

  // ─── META BAR ────────────────────────────────────────────────────────────
  doc.setFillColor(...CREAM);
  doc.rect(0, y, PAGE_W, 11, 'F');
  doc.setFillColor(...LIGHT);
  doc.rect(0, y + 10.5, PAGE_W, 0.5, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...TEXT);

  const metaItems = isRTL
    ? [`الوحدة ${moduleNumber}`, levelName, `${durationMinutes} دقيقة`, 'ورقة عمل']
    : [`Module ${moduleNumber}`, levelName, `${durationMinutes} min`, 'Worksheet'];

  let metaX = MARGIN;
  metaItems.forEach((item, i) => {
    if (i > 0) {
      doc.setTextColor(...LIGHT);
      doc.text('|', metaX, y + 7);
      metaX += 5;
    }
    doc.setTextColor(...TEXT);
    doc.text(item, metaX, y + 7);
    metaX += doc.getTextWidth(item) + 6;
  });

  y += 15; // past meta bar + spacing

  // ─── KEY TAKEAWAYS ───────────────────────────────────────────────────────
  y = sectionHeader(doc, isRTL ? 'النقاط الرئيسية' : 'Key Takeaways', y, MARGIN, GOLD, CONTENT_W);
  y += 2;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...DARK);

  keyTakeaways.slice(0, 6).forEach((item) => {
    if (y > PAGE_H - 60) return; // guard overflow

    // Checkbox
    doc.setDrawColor(...LIGHT);
    doc.setFillColor(...WHITE);
    doc.setLineWidth(0.4);
    doc.rect(MARGIN, y - 3.5, 3.5, 3.5);

    // Text
    const itemLines = doc.splitTextToSize(item, CONTENT_W - 8);
    doc.setTextColor(...TEXT);
    doc.text(itemLines, MARGIN + 6, y);
    y += itemLines.length * 5 + 1;
  });

  y += 6;

  // ─── PRACTICAL ACTIVITY ──────────────────────────────────────────────────
  y = sectionHeader(doc, isRTL ? 'النشاط العملي' : 'Practical Activity', y, MARGIN, [212, 131, 106], CONTENT_W);
  y += 2;

  // Activity box
  doc.setFillColor(...CREAM);
  doc.setDrawColor(...LIGHT);
  doc.setLineWidth(0.3);
  doc.roundedRect(MARGIN, y, CONTENT_W, 22, 2, 2, 'FD');

  // Activity title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(...DARK);
  doc.text(activityTitle, MARGIN + 4, y + 7);

  // Activity description
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(...TEXT);
  const descLines = doc.splitTextToSize(activityDesc, CONTENT_W - 8);
  // Show max 2 lines of description in the box
  const visibleDescLines = descLines.slice(0, 2);
  doc.text(visibleDescLines, MARGIN + 4, y + 13);
  if (descLines.length > 2) {
    doc.setTextColor(...GOLD);
    doc.text('…', MARGIN + 4 + doc.getTextWidth(visibleDescLines[visibleDescLines.length - 1]), y + 13 + (visibleDescLines.length - 1) * 4.5);
  }

  y += 26;

  // Writing prompt label
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...GOLD);
  doc.text(isRTL ? 'استخدم المساحة أدناه لتدوين أفكارك:' : 'Use the space below to write your thoughts:', MARGIN, y);
  y += 6;

  // Writing lines for activity (7 lines)
  y = drawLines(doc, y, 7, MARGIN, CONTENT_W, 7);
  y += 6;

  // ─── REFLECTION ──────────────────────────────────────────────────────────
  if (y < PAGE_H - 80) {
    y = sectionHeader(doc, isRTL ? 'تأمّل' : 'Reflection', y, MARGIN, [196, 135, 138], CONTENT_W);
    y += 2;

    // Reflection prompt
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...DARK);
    const promptLines = doc.splitTextToSize(reflectionPrompt, CONTENT_W);
    const maxPromptLines = Math.min(promptLines.length, 3);
    doc.text(promptLines.slice(0, maxPromptLines), MARGIN, y);
    y += maxPromptLines * 5 + 4;

    // Writing lines for reflection (9 lines)
    y = drawLines(doc, y, 9, MARGIN, CONTENT_W, 7);
    y += 6;
  }

  // ─── NOTES SECTION ───────────────────────────────────────────────────────
  if (y < PAGE_H - 55) {
    y = sectionHeader(doc, isRTL ? 'ملاحظاتي' : 'My Notes', y, MARGIN, PLUM, CONTENT_W);
    y += 2;

    // Remaining lines for notes
    const remaining = PAGE_H - 20 - y;
    const lineCount = Math.floor(remaining / 7);
    drawLines(doc, y, Math.max(3, lineCount), MARGIN, CONTENT_W, 7);
  }

  // ─── FOOTER ──────────────────────────────────────────────────────────────
  // Gold bar
  doc.setFillColor(...GOLD);
  doc.rect(0, PAGE_H - 12, PAGE_W, 1, 'F');

  // Plum footer bg
  doc.setFillColor(...PLUM);
  doc.rect(0, PAGE_H - 11, PAGE_W, 11, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(...GOLD);
  doc.text('mamahala.ca', MARGIN, PAGE_H - 5);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...WHITE);
  doc.setFontSize(6.5);
  const footerRight = isRTL
    ? `© ${new Date().getFullYear()} أكاديمية ماما هالة · جميع الحقوق محفوظة`
    : `© ${new Date().getFullYear()} Mama Hala Academy · All rights reserved`;
  doc.text(footerRight, PAGE_W - MARGIN, PAGE_H - 5, { align: 'right' });

  // Program color accent on left
  doc.setFillColor(...PROG);
  doc.rect(0, PAGE_H - 11, 4, 11, 'F');

  return doc.output('arraybuffer');
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ programSlug: string; moduleSlug: string }> },
) {
  const { programSlug, moduleSlug } = await params;
  const locale = request.nextUrl.searchParams.get('locale') || 'en';
  const isRTL = locale === 'ar';

  const program = await loadProgram(programSlug);
  if (!program) {
    return NextResponse.json({ error: 'Program not found' }, { status: 404 });
  }

  const allModules = program.levels.flatMap((l) => l.modules);
  const mod = allModules.find((m) => m.slug === moduleSlug);
  if (!mod) {
    return NextResponse.json({ error: 'Module not found' }, { status: 404 });
  }

  // Module number (1-based)
  const moduleNumber = allModules.findIndex((m) => m.slug === moduleSlug) + 1;

  // Level name
  const moduleLevel = program.levels.find((l) => l.modules.some((m) => m.slug === moduleSlug));
  const levelNamesEN: Record<number, string> = { 1: 'Foundation', 2: 'Growth', 3: 'Mastery' };
  const levelNamesAR: Record<number, string> = { 1: 'الأساس', 2: 'النمو', 3: 'الإتقان' };
  const levelNum = moduleLevel?.level ?? 1;
  const levelName = isRTL ? (levelNamesAR[levelNum] ?? 'الأساس') : (levelNamesEN[levelNum] ?? 'Foundation');

  const pdfBuffer = generateWorksheetPDF({
    programTitleEn: program.titleEn,
    programTitleAr: program.titleAr,
    programColor: program.color,
    moduleTitle: t(mod.titleEn, mod.titleAr, isRTL),
    levelName,
    moduleNumber,
    durationMinutes: mod.durationMinutes,
    activityTitle: t(mod.activity.titleEn, mod.activity.titleAr, isRTL),
    activityDesc: t(mod.activity.descriptionEn, mod.activity.descriptionAr, isRTL),
    reflectionPrompt: t(mod.reflection.promptEn, mod.reflection.promptAr, isRTL),
    keyTakeaways: tArr(mod.keyTakeaways.en, mod.keyTakeaways.ar, isRTL),
    locale,
  });

  const filename = `${moduleSlug}-worksheet-${locale}.pdf`;

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
