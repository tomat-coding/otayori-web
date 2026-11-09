import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type Route } from "@playwright/test";
import { SEND_HANDOUT_URLS, withBase } from "../src/config";

// The send page talks to the send-handout function; every test answers for it, so nothing leaves the machine.
const TOKEN = "abcdefghijkmnpqrstu2";
const cors = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };
const pdf = (name: string, bytes = 2048) => ({ name, mimeType: "application/pdf", buffer: Buffer.alloc(bytes, 37) });

type Answer = { status: number; body?: unknown };
type Calls = { gets: string[]; posts: string[] };

/** Answers the function: `look` for the GET, `posts` in turn for each POST (the last one repeats). */
async function mock(page: Page, look: Answer, posts: Answer[] = [{ status: 200, body: { ok: true } }]) {
  const calls: Calls = { gets: [], posts: [] };
  const answer = (route: Route, { status, body }: Answer) =>
    route.fulfill({ status, headers: cors, body: body === undefined ? "" : JSON.stringify(body) });
  for (const url of Object.values(SEND_HANDOUT_URLS)) {
    await page.route(`${url}*`, async (route) => {
      const request = route.request();
      if (request.method() === "GET") {
        calls.gets.push(request.url());
        return answer(route, look);
      }
      calls.posts.push(request.postDataBuffer()?.toString("latin1") ?? "");
      return answer(route, posts[Math.min(calls.posts.length - 1, posts.length - 1)]);
    });
  }
  return calls;
}

const ready = { status: 200, body: { label: "ピアノ教室" } };

for (const { path, lang, heading, other } of [
  { path: withBase("/send/"), lang: "ja", heading: "「ピアノ教室」へおたよりを送る", other: withBase("/en/send/") },
  { path: withBase("/en/send/"), lang: "en", heading: "Send handouts to “ピアノ教室”", other: withBase("/send/") },
]) {
  test.describe(path, () => {
    test("shows who the link is for, privately and accessibly", async ({ page }) => {
      const calls = await mock(page, ready);
      await page.goto(`${path}#${TOKEN}`);
      await expect(page.locator("html")).toHaveAttribute("lang", lang);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(heading);
      expect(calls.gets).toEqual([`${SEND_HANDOUT_URLS.prod}?token=${TOKEN}`]);
      await expect(page.locator("meta[name='robots']")).toHaveAttribute("content", "noindex");
      await expect(page.locator("meta[name='referrer']")).toHaveAttribute("content", "no-referrer");
      await expect(page.locator("[role='status']")).toHaveCount(1);
      await expect(page.locator("#send-files")).toBeAttached();
      expect(await page.evaluate(() => document.cookie)).toBe("");
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations.map((violation) => violation.id)).toEqual([]);
    });

    test("keeps the link when switching language", async ({ page }) => {
      await mock(page, ready);
      await page.goto(`${path}?project=dev#${TOKEN}`);
      await expect(page.locator("header a.switch")).toHaveAttribute("href", `${other}?project=dev#${TOKEN}`);
    });
  });
}

test("loads no third-party scripts and isn't in the sitemap", async ({ page, request }) => {
  await mock(page, ready);
  const hosts = new Set<string>();
  page.on("request", (req) => hosts.add(new URL(req.url()).host));
  await page.goto(`${withBase("/send/")}#${TOKEN}`);
  await expect(page.locator("h1")).toContainText("ピアノ教室");
  expect([...hosts].sort()).toEqual([new URL(page.url()).host, new URL(SEND_HANDOUT_URLS.prod).host].sort());
  const sitemap = await (await request.get(withBase("/sitemap-0.xml"))).text();
  expect(sitemap).not.toContain("/send/");
});

test("uses the dev function only for ?project=dev", async ({ page }) => {
  const calls = await mock(page, ready);
  await page.goto(`${withBase("/send/")}?project=dev#${TOKEN}`);
  await expect(page.locator("h1")).toContainText("ピアノ教室");
  expect(calls.gets).toEqual([`${SEND_HANDOUT_URLS.dev}?token=${TOKEN}`]);
});

for (const address of [`?project=staging#${TOKEN}`, "#short", `#${TOKEN.slice(0, 19)}l`, ""]) {
  test(`refuses ${address || "a missing token"} without calling the function`, async ({ page }) => {
    const calls = await mock(page, ready);
    await page.goto(`${withBase("/send/")}${address}`);
    await expect(page.locator("[role='alert']")).toHaveText(
      "このリンクは使えません。保護者の方に新しいリンクをお尋ねください。",
    );
    await expect(page.locator("form")).toBeHidden();
    expect(calls.gets).toEqual([]);
  });
}

for (const { name, look, message } of [
  {
    name: "a stopped link",
    look: { status: 404, body: { error: "link_not_found" } },
    message: "このリンクは使えません",
  },
  { name: "sending switched off", look: { status: 503, body: { error: "sending_off" } }, message: "ただいま送信を" },
  { name: "a gateway error", look: { status: 502 }, message: "ただいま受け付けできません" },
  { name: "a restricted project", look: { status: 402, body: { error: "x" } }, message: "ただいま受け付けできません" },
]) {
  test(`explains ${name} when opening the link`, async ({ page }) => {
    await mock(page, look);
    await page.goto(`${withBase("/send/")}#${TOKEN}`);
    await expect(page.locator("[role='alert']")).toContainText(message);
    await expect(page.locator("form")).toBeHidden();
  });
}

test("sends each file in its own request, with the name and message", async ({ page }) => {
  const calls = await mock(page, ready);
  await page.goto(`${withBase("/en/send/")}#${TOKEN}`);
  await page.getByLabel("Choose files").setInputFiles([pdf("letter.pdf"), pdf("menu.pdf")]);
  await expect(page.locator("#send-list li")).toHaveCount(2);
  await page.getByLabel("Your name (optional)").fill("Ms Tanaka");
  await page.getByLabel("Message (optional)").fill("For Friday");
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator("[role='status']")).toHaveText("Sent. Thank you.");
  expect(calls.posts).toHaveLength(2);
  for (const [index, name] of ["letter.pdf", "menu.pdf"].entries()) {
    const body = calls.posts[index];
    expect(body).toContain(`name="token"\r\n\r\n${TOKEN}`);
    expect(body).toContain(`name="sender_name"\r\n\r\nMs Tanaka`);
    expect(body).toContain(`name="message"\r\n\r\nFor Friday`);
    expect(body).toContain(`filename="${name}"`);
    expect(body.match(/name="file"/g)).toHaveLength(1);
  }
  await expect(page.locator("#send-list li")).toHaveCount(0);
});

test("refuses files it can't send before sending, and more than 10", async ({ page }) => {
  await mock(page, ready);
  await page.goto(`${withBase("/en/send/")}#${TOKEN}`);
  const picker = page.getByLabel("Choose files");
  await picker.setInputFiles([{ name: "notes.txt", mimeType: "text/plain", buffer: Buffer.from("hi") }]);
  await expect(page.locator("[role='alert']")).toHaveText(
    "notes.txt can't be sent (PDF, JPG, PNG or HEIC, up to 10 MB).",
  );
  await picker.setInputFiles(Array.from({ length: 11 }, (_, i) => pdf(`page-${i}.pdf`)));
  await expect(page.locator("#send-list li")).toHaveCount(10);
  await expect(page.locator("[role='alert']")).toHaveText("You can send up to 10 files at a time.");
});

test("skips a file the function refuses and sends the rest", async ({ page }) => {
  await mock(page, ready, [
    { status: 415, body: { error: "unsupported_file" } },
    { status: 200, body: { ok: true } },
  ]);
  await page.goto(`${withBase("/en/send/")}#${TOKEN}`);
  await page.getByLabel("Choose files").setInputFiles([pdf("fake.pdf"), pdf("real.pdf")]);
  await page.getByRole("button", { name: "Send", exact: true }).click();
  await expect(page.locator("[role='status']")).toHaveText("Sent. Thank you.");
  await expect(page.locator("[role='alert']")).toHaveText(
    "fake.pdf can't be sent (PDF, JPG, PNG or HEIC, up to 10 MB).",
  );
});

for (const { name, answer, message } of [
  { name: "the monthly limit", answer: { status: 503, body: { error: "plan_limit" } }, message: "We can't take files" },
  { name: "too many sends", answer: { status: 429, body: { error: "too_many" } }, message: "Too many sent" },
  { name: "a stopped link", answer: { status: 404, body: { error: "link_not_found" } }, message: "doesn't work" },
  { name: "a retry", answer: { status: 503, body: { error: "retry" } }, message: "Couldn't send. Please try again." },
  { name: "no JSON", answer: { status: 500 }, message: "We can't take files" },
]) {
  test(`stops at ${name} and keeps the files to try again`, async ({ page }) => {
    const calls = await mock(page, ready, [answer]);
    await page.goto(`${withBase("/en/send/")}#${TOKEN}`);
    await page.getByLabel("Choose files").setInputFiles([pdf("a.pdf"), pdf("b.pdf")]);
    await page.getByRole("button", { name: "Send", exact: true }).click();
    await expect(page.locator("[role='alert']")).toContainText(message);
    expect(calls.posts).toHaveLength(1);
    await expect(page.locator("#send-list li")).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Send", exact: true })).toBeEnabled();
  });
}
