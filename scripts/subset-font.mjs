// Cuts the heading font down to the characters the site uses, so Japanese pages load one small
// file instead of dozens of slices. Runs before every build. A character added later only
// falls back to the system font until the next build.
import { globSync, readFileSync, writeFileSync } from "node:fs";
import subsetFont from "subset-font";

const source = readFileSync("src/assets/fonts/ZenMaruGothic-Bold.ttf");
const files = globSync("src/{i18n,pages,components}/**/*.{ts,astro}");
// Only the legal texts' title and numbered sections are headings (src/legal/policy.ts); the rest is body text, and
// taking all of it would add hundreds of kanji to a font every page loads.
const legalHeadings = globSync("src/legal/*.txt").flatMap((file) =>
  readFileSync(file, "utf8")
    .split(/\r?\n/)
    .filter((line, index) => index === 0 || /^\d+\.\s/.test(line)),
);
const text = files.map((file) => readFileSync(file, "utf8")).join("") + legalHeadings.join("");
const ascii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("");
const characters = [...new Set(text + ascii)].filter((char) => char.codePointAt(0) >= 32).join("");

const subset = await subsetFont(source, characters, { targetFormat: "woff2" });
writeFileSync("src/assets/fonts/zen-maru-gothic-subset.woff2", subset);
console.log(`Heading font: ${[...characters].length} characters, ${Math.round(subset.length / 1024)} KB`);
