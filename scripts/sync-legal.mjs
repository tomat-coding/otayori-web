// Copies the privacy policy, terms and account deletion texts from the app repo into src/legal/, so the site publishes
// exactly what the app shows. Run after the app's legal texts change: `node scripts/sync-legal.mjs <path to the app repo>`.
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const app = process.argv[2];
if (!app) {
  console.error("Usage: node scripts/sync-legal.mjs <path to the app repo>");
  process.exit(1);
}

await mkdir("src/legal", { recursive: true });

/** Writes `text` to `target` and says whether it changed. */
async function save(target, text) {
  const before = await readFile(target, "utf8").catch(() => "");
  await writeFile(target, text);
  console.log(`${target}: ${before === text ? "unchanged" : "updated"}`);
}

const source = join(app, "shared/src/commonMain/composeResources/files/legal");
for (const name of ["privacy_policy_ja.txt", "privacy_policy_en.txt", "terms_ja.txt", "terms_en.txt"]) {
  const target = join("src/legal", name);
  const before = await readFile(target, "utf8").catch(() => "");
  await copyFile(join(source, name), target);
  const after = await readFile(target, "utf8");
  console.log(`${target}: ${before === after ? "unchanged" : "updated"}`);
}

// The account deletion page (Google Play's "Data deletion" link) is one Markdown file with a "## ja" and a "## en"
// section after the notes for the developer. Each section becomes its own Markdown file: its "# …" heading moves to
// the frontmatter (LegalPage shows it as the page's h1), and its "### …" headings become "## …", so they follow the h1.
const deletion = await readFile(join(app, "docs/release/account-deletion.md"), "utf8");
for (const lang of ["ja", "en"]) {
  const section = deletion.split(/^## /m).find((part) => part.startsWith(`${lang}\n`));
  if (!section) throw new Error(`account-deletion.md has no "## ${lang}" section`);
  let body = section
    .slice(lang.length)
    .replace(/^---\s*$/gm, "")
    .trim();
  const title = body.match(/^# (.+)$/m)?.[1].trim();
  if (!title) throw new Error(`account-deletion.md's "## ${lang}" section has no "# …" title`);
  body = body
    .replace(/^# .+\n+/m, "")
    .replace(/^### /gm, "## ")
    .trim();
  // Japanese has no spaces between sentences, so a wrapped line joins the one before it without one.
  if (lang === "ja") body = body.replace(/\n[ \t]+(?![-*+]\s|\d+\.\s)/g, "");
  await save(
    join("src/legal", `account_deletion_${lang}.md`),
    `---\ntitle: ${JSON.stringify(title)}\n---\n\n${body}\n`,
  );
}
