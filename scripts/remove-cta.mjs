import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const TOOLKITS_DIR = join(process.cwd(), 'public', 'toolkits');
const AR_DIR = join(TOOLKITS_DIR, 'ar');

// Matches from the CTA heading to (but not including) the next --- separator
// English: "## Ready for Deeper Support?"
// Arabic variants: "## هل أنتَ مستعدٌّ لدعمٍ شخصيّ؟" / "## هل تحتاجون دعمًا أعمق؟" / "## هل تحتاج دعمًا أعمق؟"
const CTA_REGEX = /\n## (?:Ready for Deeper Support\?|هل أنتَ مستعدٌّ لدعمٍ شخصيّ؟|هل تحتاجون دعمًا أعمق؟|هل تحتاج دعمًا أعمق؟)\n[\s\S]*?(?=\n---)/g;

async function processDir(dir, label) {
  const files = (await readdir(dir)).filter(f => f.endsWith('.md'));
  let changed = 0;

  for (const file of files) {
    const filePath = join(dir, file);
    const original = await readFile(filePath, 'utf-8');

    let cleaned = original.replace(CTA_REGEX, '');
    // Clean up double --- separators left behind
    cleaned = cleaned.replace(/\n---\n\n---/g, '\n---');

    if (cleaned !== original) {
      await writeFile(filePath, cleaned, 'utf-8');
      console.log(`  [UPDATED] ${label}/${file}`);
      changed++;
    } else {
      console.log(`  [no CTA]  ${label}/${file}`);
    }
  }

  return changed;
}

console.log('Removing CTA sections from toolkit markdown files...\n');

const enChanged = await processDir(TOOLKITS_DIR, 'en');
console.log('');
const arChanged = await processDir(AR_DIR, 'ar');

console.log(`\nDone. Updated ${enChanged} English + ${arChanged} Arabic = ${enChanged + arChanged} files total.`);
