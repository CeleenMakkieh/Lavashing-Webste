/**
 * Translates src/locales/en.json → src/locales/ar.json using DeepL API Free
 * Run: node scripts/translate.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEEPL_KEY = "6d923d30-6b0d-4620-a16f-b20cec4cb634:fx";
const API = "https://api-free.deepl.com/v2/translate";

const en = JSON.parse(readFileSync(join(__dirname, "../src/locales/en.json"), "utf8"));

// Keep these exactly as-is
const SKIP = new Set(["lang.welcome", "lang.chooseSub"]);

async function translateBatch(texts) {
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Authorization": `DeepL-Auth-Key ${DEEPL_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: texts, target_lang: "AR" }),
  });
  if (!res.ok) throw new Error(`DeepL error: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.translations.map(t => t.text);
}

async function main() {
  const keys = Object.keys(en);
  const toTranslateKeys = [];
  const toTranslate = [];

  for (const key of keys) {
    if (SKIP.has(key)) continue;
    toTranslateKeys.push(key);
    toTranslate.push(en[key]);
  }

  console.log(`Translating ${toTranslate.length} strings to Arabic...`);

  const BATCH = 50;
  const translated = [];
  for (let i = 0; i < toTranslate.length; i += BATCH) {
    const batch = toTranslate.slice(i, i + BATCH);
    console.log(`  Batch ${Math.floor(i / BATCH) + 1} of ${Math.ceil(toTranslate.length / BATCH)}...`);
    const results = await translateBatch(batch);
    translated.push(...results);
  }

  const ar = { ...en };
  for (let i = 0; i < toTranslateKeys.length; i++) {
    ar[toTranslateKeys[i]] = translated[i];
  }

  const outPath = join(__dirname, "../src/locales/ar.json");
  writeFileSync(outPath, JSON.stringify(ar, null, 2), "utf8");
  console.log(`\nDone! ar.json saved.`);
}

main().catch(err => { console.error(err); process.exit(1); });
