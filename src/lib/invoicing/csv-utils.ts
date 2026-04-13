/* ================================================================
   CSV Parser + Serializer (RFC 4180-compliant)
   ================================================================
   Pure JS, zero dependencies. Handles:
   - Quoted fields (including embedded commas, newlines, quotes)
   - Different line endings (\r\n, \n)
   - Empty fields
   - Trailing newlines
   - Header row
   ================================================================ */

/**
 * Parse a CSV string into an array of row objects keyed by header.
 * The first non-empty row is treated as the header row.
 * All keys are lowercased and trimmed for case-insensitive lookup.
 */
export function parseCSV(text: string): Record<string, string>[] {
  if (!text || !text.trim()) return [];

  const rows = parseRows(text);
  if (rows.length === 0) return [];

  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const result: Record<string, string>[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (row.length === 1 && row[0] === '') continue; // skip empty lines
    const obj: Record<string, string> = {};
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = (row[j] ?? '').trim();
    }
    result.push(obj);
  }

  return result;
}

/**
 * Tokenize CSV text into a 2D array of strings.
 * Handles quoted fields with embedded commas, newlines, and escaped quotes.
 */
function parseRows(text: string): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const c = text[i];

    if (inQuotes) {
      if (c === '"') {
        // Check for escaped quote ""
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else {
      if (c === '"') {
        inQuotes = true;
      } else if (c === ',') {
        current.push(field);
        field = '';
      } else if (c === '\n' || c === '\r') {
        // End of row
        current.push(field);
        rows.push(current);
        current = [];
        field = '';
        // Skip \r\n
        if (c === '\r' && text[i + 1] === '\n') i++;
      } else {
        field += c;
      }
    }
  }

  // Push the last field/row if non-empty
  if (field !== '' || current.length > 0) {
    current.push(field);
    rows.push(current);
  }

  return rows;
}

/**
 * Serialize an array of row objects to a CSV string.
 * Header row is generated from the union of all keys, in the order they
 * first appear (or use `headers` to force a specific column order).
 */
export function serializeCSV(
  rows: Record<string, string | number | undefined | null>[],
  headers?: string[],
): string {
  if (rows.length === 0) return headers ? headers.join(',') + '\n' : '';

  const cols = headers ?? unionKeys(rows);
  const lines: string[] = [];
  lines.push(cols.map(escapeField).join(','));

  for (const row of rows) {
    const values = cols.map((col) => {
      const v = row[col];
      if (v == null) return '';
      return escapeField(String(v));
    });
    lines.push(values.join(','));
  }

  return lines.join('\n') + '\n';
}

function unionKeys(
  rows: Record<string, unknown>[],
): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const row of rows) {
    for (const key of Object.keys(row)) {
      if (!seen.has(key)) {
        seen.add(key);
        result.push(key);
      }
    }
  }
  return result;
}

/**
 * Quote a field if it contains commas, quotes, or newlines.
 * Escape embedded quotes by doubling them.
 */
function escapeField(value: string): string {
  if (value === '') return '';
  if (
    value.includes(',') ||
    value.includes('"') ||
    value.includes('\n') ||
    value.includes('\r')
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
