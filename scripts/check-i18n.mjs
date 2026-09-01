// Check i18n message files: JSON validity + top-level key parity + array length parity
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.join(__dirname, '..', 'src', 'messages');
const locales = ['en', 'zh', 'el', 'de', 'fr'];

function deepKeys(obj, prefix = '', out = []) {
  for (const key of Object.keys(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (obj[key] && typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      deepKeys(obj[key], full, out);
    } else {
      out.push(full);
    }
  }
  return out;
}

const parsed = {};
for (const locale of locales) {
  const file = path.join(messagesDir, `${locale}.json`);
  try {
    parsed[locale] = JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.error(`✗ ${locale}.json: invalid JSON — ${err.message}`);
    process.exit(1);
  }
}

// 1. Top-level key parity
const topKeys = Object.keys(parsed.en).sort();
let parityOK = true;
for (const locale of locales) {
  const keys = Object.keys(parsed[locale]).sort();
  const missing = topKeys.filter((k) => !keys.includes(k));
  const extra = keys.filter((k) => !topKeys.includes(k));
  if (missing.length || extra.length) {
    parityOK = false;
    console.error(`✗ ${locale}: missing=[${missing.join(', ')}] extra=[${extra.join(', ')}]`);
  }
}
if (parityOK) console.log(`✓ Top-level keys parity OK (${topKeys.length} keys × ${locales.length} locales)`);

// 2. Deep key parity for all nested objects
let deepOK = true;
const enDeep = deepKeys(parsed.en);
for (const locale of locales) {
  if (locale === 'en') continue;
  const deep = deepKeys(parsed[locale]);
  const missing = enDeep.filter((k) => !deep.includes(k));
  const extra = deep.filter((k) => !enDeep.includes(k));
  if (missing.length || extra.length) {
    deepOK = false;
    console.error(`✗ ${locale}: deep missing=[${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '…' : ''}] deep extra=[${extra.slice(0, 10).join(', ')}${extra.length > 10 ? '…' : ''}]`);
  }
}
if (deepOK) console.log(`✓ Deep key parity OK (${enDeep.length} leaf keys)`);

// 3. Array length parity (leaf arrays)
function walkArrays(obj, prefix, cb) {
  for (const [key, value] of Object.entries(obj)) {
    const full = prefix ? `${prefix}.${key}` : key;
    if (Array.isArray(value)) cb(full, value.length);
    else if (value && typeof value === 'object') walkArrays(value, full, cb);
  }
}
let arrOK = true;
const enArrays = {};
walkArrays(parsed.en, '', (full, len) => { enArrays[full] = len; });
for (const locale of locales) {
  if (locale === 'en') continue;
  const local = {};
  walkArrays(parsed[locale], '', (full, len) => { local[full] = len; });
  for (const [full, len] of Object.entries(enArrays)) {
    if (local[full] !== len) {
      arrOK = false;
      console.error(`✗ ${locale}: "${full}" length ${local[full] ?? 'MISSING'} !== en ${len}`);
    }
  }
}
if (arrOK) console.log(`✓ Array length parity OK (${Object.keys(enArrays).length} lists)`);

if (parityOK && deepOK && arrOK) {
  console.log('ALL CHECKS PASSED');
} else {
  console.error('CHECKS FAILED');
  process.exit(1);
}
