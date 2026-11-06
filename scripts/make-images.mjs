// Makes the favicon set and share images into public/. Run with `node scripts/make-images.mjs`
// after changing the logo or the headlines. Relies on Hiragino for the headline text, so run it on a Mac.
import { copyFile, mkdir, readFile } from "node:fs/promises";
import sharp from "sharp";

const logo = await readFile("otayori-logo.svg");
await mkdir("public", { recursive: true });
await copyFile("otayori-logo.svg", "public/favicon.svg");
await sharp(logo, { density: 400 }).resize(32, 32).png().toFile("public/favicon-32.png");
await sharp(logo, { density: 400 })
  .resize(180, 180)
  .flatten({ background: "#0b5a53" })
  .png()
  .toFile("public/apple-touch-icon.png");

const phone = await sharp("src/assets/screens/ios-home.png")
  .resize(360)
  .extract({ left: 0, top: 0, width: 360, height: 560 })
  .composite([
    {
      input: Buffer.from(`<svg width="360" height="560"><rect width="360" height="640" rx="36" fill="#fff"/></svg>`),
      blend: "dest-in",
    },
  ])
  .png()
  .toBuffer();

async function share(file, lines, size, siteName) {
  const text = lines
    .map(
      (line, i) =>
        `<text x="72" y="${270 + i * size * 1.3}" font-family="Hiragino Maru Gothic ProN, Hiragino Sans" font-weight="700" font-size="${size}" fill="#fff">${line}</text>`,
    )
    .join("");
  const background = Buffer.from(`<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#0f766e"/>
    <circle cx="1120" cy="90" r="110" fill="none" stroke="#1b8a81" stroke-width="40"/>
    <text x="172" y="124" font-family="Hiragino Maru Gothic ProN, Hiragino Sans" font-weight="700" font-size="38" fill="#fff">${siteName}</text>
    ${text}
  </svg>`);
  const mark = await sharp(logo, { density: 400 }).resize(80, 80).png().toBuffer();
  await sharp(background)
    .composite([
      { input: mark, left: 72, top: 70 },
      { input: phone, left: 780, top: 70 },
    ])
    .png()
    .toFile(file);
}

await share("public/og-ja.png", ["学校のおたよりを、", "家族のカレンダーに。"], 66, "おたよりん");
await share("public/og-en.png", ["Turn school handouts", "into one family", "calendar"], 64, "Otayorin");
