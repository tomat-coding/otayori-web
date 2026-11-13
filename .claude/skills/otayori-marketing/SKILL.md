---
name: otayori-marketing
description: Plan, write and ship marketing content for the Otayorin (おたよりん, code name Otayori) website so Japanese and English-speaking parents find the app and download it. Covers finding and explaining the app's core features, use-case and feature pages, guides and articles, landing-page sections, FAQ, meta titles and descriptions, keyword research, structured data, SEO audits of the site, and App Store / Google Play listing text. Use this skill whenever the user asks for website copy, new pages, SEO, keywords, "attract users", content ideas, a content plan, feature descriptions, or wants the site to rank or convert better, even if they don't say "marketing" or "SEO".
---

# Otayorin marketing content

Otayorin (おたよりん) turns photos of school and nursery handouts into one shared family calendar. The website (this repo, Astro, static, Japanese at `/`, English at `/en/`) is how most parents will first meet it. This skill's job is to make that site findable for what parents actually search, and convincing once they land, without ever claiming something the app doesn't do.

Three things make content here good, in this order:

1. **True.** Every claim maps to a verified fact in `references/feature-ledger.md`, caveats included. Parents trust the app with their children's schedules; one overclaim ("translates handouts", "AI on Android") costs more than any ranking gain. Japanese advertising law (景品表示法, ステマ規制) also applies to this site.
2. **Useful to a parent with a problem.** A page earns its place by answering a real question better than what currently ranks: how to stop missing 提出物, how to share school schedules with a partner, what an English speaker needs to know about Japanese nursery letters. Feature lists alone don't rank and don't convert.
3. **Findable.** Right query, right page type, clean on-page SEO, internal links, structured data that matches what's visible.

## Reference files

Read only what the task needs:

| File                                | Read when                                                                       |
| ----------------------------------- | ------------------------------------------------------------------------------- |
| `references/feature-ledger.md`      | Always. The facts you may state, their caveats, and what not to claim.          |
| `references/voice.md`               | Writing or editing any copy, in either language.                                |
| `references/seo.md`                 | Choosing what to write, keyword research, titles/meta, structured data, audits. |
| `references/page-types.md`          | Outlining a new page, section or store listing.                                 |
| `references/site-implementation.md` | Putting content into the Astro code, or adding a page.                          |

The team's running plan of pages and target queries lives in `docs/marketing/content-plan.md` (create it from the template in `references/seo.md` the first time). Read it before proposing new pages so two pages never chase the same query.

## Workflow

Work out which job the user is asking for, then follow the steps that apply. If the request is vague ("make our SEO better"), start with the audit, show the plan, and let the user pick what to write first.

### 1. Ground yourself in the facts

- Read `references/feature-ledger.md` and the current copy in `src/i18n/ja.ts` (the source; `en.ts` mirrors it).
- Check the app repo for commits newer than the ledger's "Last reviewed" commit (the command is in the ledger's Sources section). The app moves fast; if anything changed that touches what you're writing, update the ledger before writing.
- If the task touches a feature the ledger doesn't cover, or the user says the app changed, find the truth before writing: the app's source code (path in the ledger's Sources section; if it's unknown, ask the user for it once and record it), release notes, store listings, the screenshots in `src/assets/screens/`, or the user. Add what you learn to the ledger with its source and caveats, and mark anything unconfirmed as `unverified`.
- Never fill a gap with a plausible guess. If a page needs a fact you can't confirm, write around it or ask.

### 2. Find the searcher

For each piece of content, name the person, their situation and the words they'd type, Japanese first. Use `references/seo.md` for the seed keyword clusters and the research method. If a web search tool is available, look at what currently ranks for the target query, because the page type that ranks (app roundup, how-to blog, Q&A, store page) tells you what Google thinks the intent is. Don't invent search volumes or difficulty scores; if you have no data, rank by intent and say so.

### 3. Decide what to make

Pick the page type from `references/page-types.md` that fits the intent: a section change on the landing page, a feature page, a use-case page, a guide, a glossary page for English speakers, or store listing text. One page, one primary query. Check `docs/marketing/content-plan.md` for overlap first.

### 4. Write Japanese first, then English

Write the Japanese as a native writer would for Japanese parents, not as a translation. Then write the English as its own piece for English-speaking parents in Japan, in British English to match the site. The two versions share structure and facts (the copy files must have the same shape), but phrasing, examples and even which questions come first can differ, because the searchers differ. See `references/voice.md`.

### 5. Put it on the site

Follow `references/site-implementation.md`: copy goes in the i18n files or page copy modules, new pages get hreflang pairs, breadcrumbs, their own title and description, and tests. Keep the site's rules: no client JavaScript, one `h1`, trailing slashes, real screenshots with alt text.

### 6. Verify

Check the Japanese you wrote with the `japanese-audit` skill (at least its `scripts/check-ja.mjs` and checklist). Run `npm run format`, then `npm run build`, `npm run lint` and `npm test`. Fix what fails. Then preview (`site` config in `.claude/launch.json`) and check the rendered page: title, description, canonical, hreflang, JSON-LD, headings, internal links, and how it looks at phone width. Run the checklist at the end of `references/seo.md`.

### 7. Report and record

Update `docs/marketing/content-plan.md` with each page's URL, target queries and status. Tell the user, briefly:

- what you wrote and where, with the target query for each page
- any claim you added to the ledger or marked `unverified`, so someone can confirm it
- what you'd write next and why

## Things that are easy to get wrong here

- **The name.** The app and site are おたよりん / Otayorin (renamed from おたより / Otayori on 2026-11-05; see the ledger's Name section). おたより on its own is the common word for a handout, so use it freely as a word, never as the brand. A similar app, おたよりー, exists; spell おたよりん exactly and never mention the other.
- **"Free" and "unlimited" need their conditions.** Free during early access, may become paid. Unlimited means no app-side cap; device storage still applies. AI needs Apple Intelligence on iOS 26 or macOS 26. State the condition next to the claim, as the current site does.
- **English-speaking parents will search for "translate".** Otayorin doesn't translate; items keep the handout's Japanese. Content for them should be honest about that and lead with what does help (dates, reminders, the bilingual app UI, a partner who reads Japanese sharing the calendar).
- **No invented proof.** No testimonials, user counts, ratings, awards, press quotes or "No.1" claims unless the user supplies real, attributable ones. Never add `aggregateRating` or `Review` markup without real reviews.
- **No doorway pages.** Don't generate near-identical pages per city, school or keyword. Each page needs its own substance.
- **Keep the landing page's tests green.** `tests/site.spec.ts` expects exactly `MobileApplication` and `FAQPage` JSON-LD on `/` and `/en/`, store links, one `h1` and no scripts.
