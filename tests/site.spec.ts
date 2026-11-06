import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", lang: "ja", other: "/en/", heading: "学校のおたよりを、" },
  { path: "/en/", lang: "en", other: "/", heading: "Turn school handouts" },
];

for (const { path, lang, other, heading } of pages) {
  test.describe(path, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(path);
    });

    test("renders the page in its language with one main heading", async ({ page }) => {
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toContainText(heading);
    });

    test("doesn't scroll sideways", async ({ page }) => {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("ships no client JavaScript", async ({ page }) => {
      await expect(page.locator("script:not([type='application/ld+json'])")).toHaveCount(0);
    });

    test("links to both stores and the Mac app", async ({ page }) => {
      await expect(page.locator("a[href='#app-store']").first()).toBeVisible();
      await expect(page.locator("a[href='#google-play']").first()).toBeVisible();
      await expect(page.locator("a[href='#mac-download']").first()).toBeVisible();
    });

    test("switches language", async ({ page }) => {
      await page.locator(`header a[href='${other}']`).last().click();
      await expect(page).toHaveURL(new RegExp(`${other}$`));
    });

    test("declares language alternates and valid structured data", async ({ page }) => {
      await expect(page.locator("link[hreflang='ja']")).toHaveCount(1);
      await expect(page.locator("link[hreflang='en']")).toHaveCount(1);
      await expect(page.locator("link[hreflang='x-default']")).toHaveAttribute("href", /\/$/);
      const blocks = await page.locator("script[type='application/ld+json']").allTextContents();
      const types = blocks.map((block) => JSON.parse(block)["@type"]);
      expect(types).toEqual(["MobileApplication", "FAQPage"]);
    });

    test("has no accessibility violations", async ({ page }) => {
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    });

    test("has every section, and the header's jump links reach them", async ({ page }) => {
      for (const id of ["why", "how-it-works", "reading", "features", "devices", "privacy", "early-access", "faq"]) {
        await expect(page.locator(`section#${id} h2`)).toHaveCount(1);
      }
      const hrefs = await page
        .locator("header nav .sections a")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
      expect(hrefs.length).toBeGreaterThan(0);
      for (const href of hrefs) {
        expect(href).toMatch(new RegExp(`^${path}#`));
        await expect(page.locator(href.slice(href.indexOf("#")))).toHaveCount(1);
      }
    });

    test("links each scene to a part of the page that exists", async ({ page }) => {
      const hrefs = await page
        .locator("#use-cases a")
        .evaluateAll((links) => links.map((link) => link.getAttribute("href") ?? ""));
      expect(hrefs).toHaveLength(4);
      for (const href of hrefs) {
        expect(href).toMatch(/^#[a-z-]+$/);
        await expect(page.locator(href)).toHaveCount(1);
      }
    });

    test("lists the same questions in the FAQ and its structured data", async ({ page }) => {
      const blocks = await page.locator("script[type='application/ld+json']").allTextContents();
      const faq = blocks.map((block) => JSON.parse(block)).find((data) => data["@type"] === "FAQPage");
      await expect(page.locator("#faq details")).toHaveCount(faq.mainEntity.length);
    });

    // Plan prices aren't public until plans are switched on (see the feature ledger).
    test("shows no prices", async ({ page }) => {
      const text = await page.locator("body").innerText();
      expect(text).not.toMatch(/[¥￥]\s?\d|\d[\d,]*\s?円|JPY\s?\d/);
    });
  });
}

test("legal pages aren't indexed before launch", async ({ page }) => {
  await page.goto("/privacy/");
  await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", "noindex");
});

for (const { path, heading } of [
  { path: "/privacy/", heading: "プライバシーポリシー" },
  { path: "/en/privacy/", heading: "Privacy Policy" },
]) {
  test(`${path} shows the app's privacy policy`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText(heading);
    expect(await page.locator("main h2").count()).toBeGreaterThanOrEqual(10);
    await expect(page.locator("main a[href^='mailto:']")).toHaveCount(1);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.map((violation) => violation.id)).toEqual([]);
  });
}
