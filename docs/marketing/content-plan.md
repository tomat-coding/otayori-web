# Content plan

Primary queries are hypotheses until Search Console data says otherwise. Facts come from `.claude/skills/otayori-marketing/references/feature-ledger.md`.

## Pages

| Page (ja / en) | Type | Primary query (ja)                                    | Primary query (en)               | Ledger facts used                                          | Status                   | Updated    |
| -------------- | ---- | ----------------------------------------------------- | -------------------------------- | ---------------------------------------------------------- | ------------------------ | ---------- |
| `/` , `/en/`   | Home | 学校 プリント 管理 アプリ (also おたより 管理 アプリ) | app for Japanese school handouts | all core functions, early access and planned paid features | redesigned, not deployed | 2026-11-05 |

## Next pages, in priority order

Ranked by how well the intent fits what the app does, how weak the current results are, and effort. Search-result notes come from one web search per query on 2026-11-05 with a US-based search tool, so Google Japan may differ; no search volumes were available.

| #   | Page                                                           | Type                   | Primary query                                                 | Why now                                                                                                                                                                                                      | Effort                            |
| --- | -------------------------------------------------------------- | ---------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------- |
| 1   | `/en/guides/japanese-school-handouts/` (English only)          | English glossary guide | how to read Japanese school handouts; Japanese school letters | Results are research papers, city PDFs and a few general expat articles; almost no practical guide. Clear, unmet need from exactly the parents who struggle most. Must say plainly the app doesn't translate | Medium, plus first-subpage set-up |
| 2   | `/features/read-handouts/` , `/en/features/read-handouts/`     | Feature page           | プリント 写真 カレンダー 登録; 縦書き 読み取り アプリ         | The app's most distinctive facts (縦書き on iOS 26+, change notices updating saved items, 集金 with amounts, repeating items, 10-page PDFs) have no page of their own. Uses the unused `ios-review.png`      | Medium, plus first-subpage set-up |
| 3   | `/for/sharing-with-partner/` , `/en/for/sharing-with-partner/` | Use-case page          | 夫婦 予定 共有 学校行事                                       | Results recommend general calendars (Google Calendar, TimeTree) and roundups. Angle they miss: someone still has to type the handout in                                                                      | Medium                            |
| 4   | `/guides/organise-school-handouts/`                            | Guide (Japanese)       | 学校 プリント 整理 方法                                       | Real, common intent, but large parenting and stationery publishers rank (HugKum, ITmedia, ScanSnap). Worth it once the site has a few pages                                                                  | Medium-high                       |
| 5   | `/guides/forms-and-payments/`                                  | Guide (Japanese)       | 提出物 忘れ 防止; 集金 忘れ                                   | Parenting media rank with advice on children's habits; a parent-side angle (deadlines, 集金, the evening before) is less covered                                                                             | Medium                            |

## Audit, 2026-11-05

**Technical.** Lighthouse (mobile): `/` 99 performance, 100 accessibility, 100 best practices, 100 SEO; `/en/` 100 on all four. LCP 2.0 s / 1.8 s, no layout shift, about 150 KB per page. One `h1`, canonical, hreflang pairs, sitemap, robots, valid JSON-LD and alt text are all in place.

- Render-blocking CSS (about 260 ms) is deliberate: the CSP in `public/_headers` allows only stylesheet files (`style-src 'self'`). Leave it.
- The HTML declares `hreflang="ja"`, the sitemap `ja-JP`. Both are valid; aligning them (`ja` in `astro.config.mjs`) is a small tidy-up, not a problem.
- Launch blockers, already known: the real domain in `src/config.ts`, then Search Console and the sitemap.

**Content.** Only two indexable pages, both home pages, so the site can rank for its brand and the broad category at best. Every problem, how-to and English query has no page to land on. That's the main gap, and the plan above fills it.

**Category queries are a store-page game.** For 学校 プリント 管理 アプリ and 保育園 おたより アプリ the results were mostly App Store pages of similar apps, plus affiliate roundups (appmatch). Several describe the same basics: photo, AI extraction of dates and things to bring, a colour per child, on-device storage. Implications:

- The store listing (draft in the app repo's `docs/release/store-listing.md`) matters more than the website for these queries. Review it with this skill before submission.
- On the site, lead with what's distinctive in the ledger rather than the basics everyone lists: 縦書き, change notices that update saved items, 集金 with amounts, a Mac app, iPhone and Android in one family with who-ticked-what.
- Several app names sit very close to おたよりん in these results. Keep the name exact everywhere; never compare to or name other apps in copy.

## Ideas not yet planned

- Use-case page for school payments and change notices: 集金 忘れ, 行事 延期 予定 変更 (could fold into #5)
- Use-case page for families with a child at school and one at nursery: 兄弟 予定 管理
- Hub links: once #1 and #2 exist, link them from the home page's features section and the footer

## Decisions

- 2026-11-05: Redesigned the home page as the only page per language (the user asked for a one-page site), so the "Next pages" above stay deferred. New sections: why (4 points), scenes, how it works (paper → review → Home), handout wording → item (`#reading`), feature bento, iPhone/Android/Mac table, privacy, early access and planned paid features, FAQ. Removed the "unlimited" sections, which no longer fit a page that says some features may become paid.
- 2026-11-05: Home title now ends with the brand, as `references/seo.md` says: 「学校・保育園のおたより・プリント管理アプリ｜おたよりん」 / "School handout organiser app for parents in Japan | Otayorin". Descriptions now mention early access.
- 2026-11-05: The page names which features may become paid (おたよりプラス) but never prices or limits, per the user. See the ledger's Business terms.
- 2026-11-06: Removed the iPhone/Android/Mac availability table and every "less reliable on Android" / "on the way" note, per the user; features are described by what they need on iPhone and Mac, without Android caveats. Minimum OS versions stay as a short line in `#devices`.
- 2026-11-05: Sitemap locale changed from `ja-JP` to `ja`, matching the HTML `hreflang`.

- 2026-11-05: Renamed the site to おたよりん / Otayorin to match the app. Home title now 「おたよりん|学校・保育園のおたより・プリント管理アプリ」 so it also carries おたより, the word parents search with.
- 2026-11-05: Kept JSON-LD `applicationCategory` as `LifestyleApplication`, because Google has no productivity value.
- 2026-11-05: Kept CSS as files rather than inlined, because the CSP forbids inline styles.
