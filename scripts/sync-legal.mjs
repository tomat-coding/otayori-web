// Copies the privacy policy and terms texts from the app repo into src/legal/, so the site publishes exactly what the
// app shows. Run after the app's legal texts change: `node scripts/sync-legal.mjs <path to the app repo>`.
import { copyFile, mkdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const app = process.argv[2];
if (!app) {
  console.error("Usage: node scripts/sync-legal.mjs <path to the app repo>");
  process.exit(1);
}

const source = join(app, "shared/src/commonMain/composeResources/files/legal");
await mkdir("src/legal", { recursive: true });
for (const name of ["privacy_policy_ja.txt", "privacy_policy_en.txt", "terms_ja.txt", "terms_en.txt"]) {
  const target = join("src/legal", name);
  const before = await readFile(target, "utf8").catch(() => "");
  await copyFile(join(source, name), target);
  const after = await readFile(target, "utf8");
  console.log(`${name}: ${before === after ? "unchanged" : "updated"}`);
}
