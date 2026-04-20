import * as deepl from "deepl-node";
import { readFileSync, writeFileSync } from "fs";

// ── Paste your DeepL API key here ──────────────────────────────────────────
const DEEPL_API_KEY = "YOUR_DEEPL_API_KEY_HERE";
// ───────────────────────────────────────────────────────────────────────────

const translator = new deepl.Translator(DEEPL_API_KEY);

const en = JSON.parse(readFileSync("src/locales/en.json", "utf8"));

const keys = Object.keys(en);
const values = Object.values(en);

console.log(`Translating ${keys.length} strings to Arabic...`);

const results = await translator.translateText(values, "en", "ar");

const ar = {};
keys.forEach((key, i) => {
  ar[key] = results[i].text;
});

writeFileSync("src/locales/ar.json", JSON.stringify(ar, null, 2), "utf8");
console.log("Done! Arabic translations saved to src/locales/ar.json");
