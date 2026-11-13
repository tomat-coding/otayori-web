// Mechanical checks for the site's Japanese copy. Prints hints with file:line for a person (or Claude) to judge;
// it can't tell whether a sentence is natural or true, only where to look. Run from the repo root:
//   node .claude/skills/japanese-audit/scripts/check-ja.mjs [file ...]
// With no files it checks the whole site: src/i18n/ja.ts, the `ja` export of src/i18n/pages/*.ts, Japanese
// .astro pages and components, and src/legal/*_ja.* (synced from the app repo, so report those, don't edit them).
import { existsSync, globSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const JP = "\\u3040-\\u30ff\\u3400-\\u9fff\\uff66-\\uff9f々〆";
const jp = new RegExp(`[${JP}]`);

// --- What to check -------------------------------------------------------------------------------------------------

const defaultFiles = [
  "src/i18n/ja.ts",
  ...globSync("src/i18n/pages/*.ts"),
  ...globSync("src/pages/**/*.astro").filter((file) => !file.includes("/en/")),
  ...globSync("src/components/*.astro"),
  ...globSync("src/legal/*_ja.*"),
].sort();

const files = process.argv.length > 2 ? process.argv.slice(2) : defaultFiles;

// --- Glossary ------------------------------------------------------------------------------------------------------

/** Reads the 用語 table of references/glossary.md: [preferred, [avoided forms]]. */
function readGlossary() {
  const path = join(here, "../references/glossary.md");
  if (!existsSync(path)) return [];
  const section = readFileSync(path, "utf8")
    .split(/^## /m)
    .find((part) => part.startsWith("用語"));
  if (!section) return [];
  return section
    .split("\n")
    .filter((line) => line.startsWith("|") && !/^\|\s*-/.test(line) && !line.includes("使わない"))
    .map((line) => line.split("|").map((cell) => cell.trim()))
    .map(([, use, avoid]) => [
      use,
      avoid
        .split("、")
        .map((word) => word.trim())
        .filter(Boolean),
    ])
    .filter(([, avoid]) => avoid.length > 0);
}

// --- Checks --------------------------------------------------------------------------------------------------------

const rarenukiStems = [
  "見",
  "来",
  "出",
  "寝",
  "着",
  "居",
  "食べ",
  "決め",
  "考え",
  "起き",
  "借り",
  "受け",
  "調べ",
  "覚え",
  "変え",
  "止め",
  "始め",
  "続け",
  "見つけ",
  "届け",
  "分け",
  "答え",
  "確かめ",
  "集め",
  "並べ",
  "比べ",
  "伝え",
  "教え",
  "迎え",
  "預け",
  "避け",
  "付け",
  "閉じ",
  "信じ",
  "感じ",
  "生き",
];
const rarenuki = new RegExp(`(${rarenukiStems.join("|")})れ(る|ます|ません|ない|なかっ|た|て)`);

const doubleKeigo =
  /おっしゃられ|ご覧になられ|お見えになられ|お越しになられ|お帰りになられ|拝見させていただ|お伺いさせていただ|[おご][^\s、。「」]{1,5}になられ/;
const humbleForReader = /ご(利用|使用|登録|確認|参加|購入|入力|返信)(でき|出来)/;
const jugen =
  /一番最初|一番最後|まず最初|最初に始め|後で後悔|あとで後悔|必ず必要|今現在|違和感を感じ|被害を被|返事を返|過半数を超え|頭痛が痛|約[0-9一二三四五六七八九十百]+[^、。]{0,4}(程度|ほど|くらい|ぐらい)|各[^、。]{1,6}ごと|最大[0-9一二三四五六七八九十]+[^、。]{0,3}まで|第[0-9一二三四五六七八九十]+[^、。]{0,3}目/;
const sairere = /[かがさたなばまらわ]させ(て|る|ます|ません|ない|た)/;
const translationese = /あなた|することができ|ことが可能|を可能に|を提供し|を持っています/;
const doubleParticle = /をを|がが|にに|はは|のの|、、|。。/; // not でで: 「までです」
const manyNo = new RegExp(`の[^、。の]{1,6}の[^、。の]{1,6}の[^、。の]{1,6}の`);
const tari = /[しいきぎちにびみりれけせてねべめえげ]たり|(?<![ぴばゆ])ったり|[んい]だり/g;
const halfPunct = new RegExp(`[${JP}][,.!?;()]|[,!?;()][${JP}]|[${JP}]:|:[${JP}]`);
const fullAlnum = /[Ａ-Ｚａ-ｚ０-９]/;
const halfKana = /[\uff66-\uff9f]/;
const spaceBetweenJp = new RegExp(`[${JP}] +[${JP}]`);
const spaceLatinJp = new RegExp(`[A-Za-z] [${JP}]|[${JP}] [A-Za-z]`);
const asciiBar = new RegExp(`[${JP}]\\s*\\|\\s*\\S|\\S\\s*\\|\\s*[${JP}]`);
const kutenInQuote = /。」/;

/** Weekday check for dates like 10月23日（金）: true if no year makes them all agree, from the copy's year onward. */
const weekdays = "日月火水木金土";
const dateWithDay = /(\d{1,2})月(\d{1,2})日[（(]([日月火水木金土])[）)]/g;

// --- Reading files -------------------------------------------------------------------------------------------------

/** The lines of a file that are shown to readers, with comments removed. Returns [lineNumber, text][]. */
function visibleLines(file) {
  const lines = readFileSync(file, "utf8").split(/\r?\n/);
  const isPageCopy = /src\/i18n\/pages\//.test(file);
  const isCode = /\.(ts|mjs|js|astro)$/.test(file);
  let inBlock = false;
  let inJa = !isPageCopy;
  const out = [];
  lines.forEach((raw, index) => {
    let line = raw;
    if (isPageCopy && /^export const /.test(line)) inJa = /^export const ja\b/.test(line);
    if (!inJa) return;
    if (isCode) {
      if (inBlock) {
        const end = line.indexOf("*/");
        if (end === -1) return;
        line = line.slice(end + 2);
        inBlock = false;
      }
      line = line.replace(/\/\*.*?\*\//g, "").replace(/<!--.*?-->/g, "");
      const start = line.search(/\/\*|<!--/);
      if (start !== -1) {
        inBlock = true;
        line = line.slice(0, start);
      }
      line = line.replace(/(^|\s)\/\/.*$/, "");
    }
    if (jp.test(line)) out.push([index + 1, line]);
  });
  return out;
}

/** The text of a line a reader sees: string literals in code, the whole line otherwise. */
function textOf(file, line) {
  if (!/\.(ts|mjs|js)$/.test(file)) return line.trim();
  const strings = [...line.matchAll(/"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g)].map((m) => m[1] ?? m[2]);
  return strings.length ? strings.join(" / ") : line.trim();
}

// --- Run -----------------------------------------------------------------------------------------------------------

const glossary = readGlossary();
const results = new Map();
let total = 0;
let lineCount = 0;

function hint(file, lineNumber, kind, message, text, match) {
  const at = match ? Math.max(0, text.indexOf(match) - 12) : 0;
  const snippet = text.slice(at, at + 48);
  if (!results.has(file)) results.set(file, []);
  results.get(file).push(`  ${String(lineNumber).padStart(4)}  [${kind}] ${message}\n        ${snippet}`);
  total += 1;
}

for (const file of files) {
  if (!existsSync(file)) {
    console.error(`Not found: ${file}`);
    continue;
  }
  const legal = file.startsWith("src/legal/");
  let exclamations = 0;
  const dates = [];

  for (const [n, line] of visibleLines(file)) {
    // File names (遠足のお知らせ.pdf) aren't punctuation.
    const text = textOf(file, line).replace(/\.(pdf|jpe?g|png|heic|txt|md)\b/gi, "");
    if (!jp.test(text)) continue;
    lineCount += 1;
    const first = (regex) => text.match(regex)?.[0];

    for (const [use, avoid] of glossary) {
      for (const word of avoid) {
        if (text.includes(word)) hint(file, n, "用語", `「${word}」→「${use}」 (glossary)`, text, word);
      }
    }
    let m;
    if ((m = first(rarenuki))) hint(file, n, "ら抜き", `「${m}」: use the 〜られる form`, text, m);
    if ((m = first(sairere)))
      hint(file, n, "さ入れ?", `「${m}」: check for an extra さ (読ませて, not 読まさせて)`, text, m);
    if ((m = first(doubleKeigo))) hint(file, n, "二重敬語", `「${m}」: one honorific per verb`, text, m);
    if ((m = first(humbleForReader)))
      hint(file, n, "敬語", `「${m}」: for the reader's action use 〜いただけます / 〜になれます`, text, m);
    if ((m = first(jugen))) hint(file, n, "重言", `「${m}」: says the same thing twice`, text, m);
    if ((m = first(doubleParticle))) hint(file, n, "重複", `「${m}」: doubled character`, text, m);
    if ((m = first(fullAlnum))) hint(file, n, "全角英数", `「${m}」: use half-width letters and digits`, text, m);
    if ((m = first(halfKana))) hint(file, n, "半角カナ", `「${m}」: use full-width katakana`, text, m);
    if ((m = first(kutenInQuote))) hint(file, n, "句読点", "「。」」: no 。 before a closing 」", text, m);
    if (!legal || !/^\(\d+\)/.test(text)) {
      if ((m = first(halfPunct)) && !/^Inc\.|\d:\d/.test(m))
        hint(file, n, "記号", `「${m}」: half-width punctuation next to Japanese`, text, m);
    }
    if ((m = first(spaceBetweenJp))) hint(file, n, "空白", "half-width space between Japanese words", text, m);
    if ((m = first(spaceLatinJp)))
      hint(file, n, "空白", `「${m}」: no space between Latin words and Japanese`, text, m);
    if ((m = first(asciiBar))) hint(file, n, "記号", "「|」: titles use the full-width 「｜」 with no spaces", text, m);
    if (text.includes("〜") || text.includes("～")) hint(file, n, "記号", "〜: avoid as decoration", text, "〜");

    if (!legal) {
      if ((m = first(translationese))) hint(file, n, "翻訳調?", `「${m}」: often reads as translated`, text, m);
      if ((m = first(manyNo))) hint(file, n, "の連続", `「${m}」: four の close together`, text, m);
      for (const sentence of text.split(/[。！？]/)) {
        const count = (sentence.match(tari) ?? []).length;
        if (count === 1)
          hint(file, n, "たり", "one 〜たり without its pair (〜たり〜たり)", text, sentence.slice(0, 10));
        const jpLength = [...sentence].filter((c) => jp.test(c)).length;
        if (jpLength > 60)
          hint(
            file,
            n,
            "長文",
            `sentence of ${jpLength} Japanese characters: consider splitting`,
            text,
            sentence.slice(0, 10),
          );
      }
      exclamations += (text.match(/！/g) ?? []).length;
    }

    for (const [, month, day, weekday] of text.matchAll(dateWithDay)) dates.push([n, +month, +day, weekday]);

    const opens = (text.match(/「/g) ?? []).length;
    const closes = (text.match(/」/g) ?? []).length;
    if (opens !== closes) hint(file, n, "括弧", `「 ${opens} vs 」 ${closes} on this line`, text, "");
  }

  if (exclamations > 1)
    hint(file, 0, "！", `${exclamations} full-width ！ in this file; the voice allows one per page`, "", "");

  // Dates with weekdays: find a year (this one or the next few) in which all of them are right.
  if (dates.length) {
    const thisYear = new Date().getFullYear();
    const years = [thisYear - 1, thisYear, thisYear + 1, thisYear + 2];
    const fits = (year) =>
      dates.every(([, month, day, weekday]) => weekdays[new Date(year, month - 1, day).getDay()] === weekday);
    const good = years.filter(fits);
    if (good.length === 0) {
      for (const [n, month, day, weekday] of dates) {
        const ok = years.filter((year) => weekdays[new Date(year, month - 1, day).getDay()] === weekday);
        hint(
          file,
          n,
          "曜日",
          `${month}月${day}日（${weekday}）is right in ${ok.join(", ") || `none of ${years.join(", ")}`}`,
          "",
          "",
        );
      }
    } else {
      console.log(`${file}: ${dates.length} dates with weekdays all fit ${good.join(" / ")}`);
    }
  }
}

console.log(`\nJapanese check: ${files.length} files, ${lineCount} lines with Japanese, ${total} hints`);
console.log("Hints are prompts to look, not verdicts. src/legal/ is synced from the app repo: report, don't edit.\n");
for (const [file, list] of results) {
  console.log(file);
  console.log(list.join("\n"));
  console.log("");
}
