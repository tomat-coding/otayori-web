# SEO for Otayorin

## Contents

1. Who searches, and where
2. Keyword research method
3. Seed keyword clusters
4. On-page rules
5. Structured data
6. Internal linking and site structure
7. Being cited by AI answers
8. Measuring
9. Content plan template
10. Pre-publish checklist

## 1. Who searches, and where

- **Japanese parents** of children at 保育園, 幼稚園, こども園 and 小学校, often both working, often on a phone at night. They search Google or Yahoo! JAPAN (which uses Google's results), and they ask in parenting Q&A sites and apps. Optimising for Google covers both search engines.
- **English-speaking parents in Japan**, who face the same handouts with a language barrier. They search in English but copy Japanese words off the paper.
- **App store searchers**, who never see the website. Store listing text is a separate job; see `page-types.md`.

The app is おたよりん (Otayorin). Close to it: おたより, the common noun for school newsletters (〇〇だより), and おたよりー, a similar app. Searches for おたより mean "the newsletter", so category queries matter more than the brand. Branded demand will show up as おたよりん, おたよりん アプリ or Otayorin; everything else must be won on problem and category queries. The draft store keywords in the app repo's `docs/release/store-listing.md` (園だより, 学年だより, 学級通信…) are a good source of the handout names parents search.

## 2. Keyword research method

Do this for each page you plan, and write the result into the content plan.

1. **Start from a feature in the ledger and the parent's moment.** Example: evening reminder → "the day my child forgot the 体操服".
2. **List the words that parent would type**, in their words, not ours: 体操服 忘れた, 持ち物 忘れ 防止, 前日 リマインダー 子供. Include kana/kanji variants (お便り/おたより, 子供/子ども) and spoken forms.
3. **Check the results page if you can search the web.** Note what ranks: app roundups (まとめ), personal blogs, Q&A threads (Yahoo!知恵袋, ママリ), store pages, news. The dominant type is the intent. A query answered by how-to blogs wants a guide, not a feature page. Note the "他の人はこちらも質問" questions and related searches; they become H2s and FAQ items.
4. **Pick one primary query per page** and a few close variants. If another planned or live page already targets it, merge or differentiate rather than compete.
5. **Be honest about data.** If no keyword tool or Search Console data is available, don't invent search volume or difficulty. Rank candidates by how closely the intent matches what Otayorin does and how weak the current results are, and say that's the basis.

## 3. Seed keyword clusters

Hypotheses to validate with step 3 above, not measured data. The suggested page types refer to `page-types.md`.

| Cluster                       | Example queries                                                                                                                  | Intent                                           | Best page                                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------ |
| Category: an app for handouts | 学校 プリント 管理 アプリ, プリント管理アプリ, おたより 管理 アプリ, お便り アプリ, 保育園 おたより アプリ, 幼稚園 プリント 管理 | Commercial: wants an app now                     | Home page; feature page for reading                    |
| Photo to calendar             | プリント 写真 カレンダー 登録, プリント 読み取り 予定 自動, 写真 から 予定 登録 アプリ, プリント AI 読み取り                     | Commercial, feature-led                          | Feature page: reading handouts                         |
| Vertical and tables           | 縦書き 読み取り アプリ, 縦書き OCR, 年間行事予定表 カレンダー 登録, 月間予定表 取り込み, 和暦 日付                               | Specific capability                              | Feature page or section of the reading page            |
| Organising paper              | 学校 プリント 整理 方法, プリント 整理 小学校, 学校のプリント 保管 いつまで, プリント 多すぎる                                   | Informational: how to                            | Guide                                                  |
| Not forgetting                | 提出物 忘れ 防止, 持ち物 忘れ 対策 子供, 集金 忘れた, 行事 忘れ 防止 アプリ                                                      | Problem, informational with app intent           | Guide + use-case page for reminders                    |
| Family sharing                | 家族 予定 共有 アプリ, 夫婦 予定 共有, 子供の予定 共有, 共働き 学校行事 共有, 祖父母 予定 共有                                   | Commercial, crowded (general calendar apps rank) | Use-case page focused on school, not generic calendars |
| Several children              | 兄弟 予定 管理, 小学校 保育園 予定 バラバラ, 子供 複数 スケジュール 管理                                                         | Problem                                          | Use-case page                                          |
| English: handouts in Japan    | Japanese school handouts, how to read Japanese school letters, Japanese school forms translate, hoikuen letters, otayori meaning | Informational, language barrier                  | English guide / glossary page                          |
| English: specifics            | what to bring Japanese elementary school, mochimono list, teishutsubutsu, Japanese school payments shukin                        | Informational                                    | English glossary page                                  |
| English: app                  | app for Japanese school handouts, Japanese school calendar app, organise school letters Japan                                    | Commercial                                       | English home and feature pages                         |
| Brand                         | おたよりん, おたよりん アプリ, おたよりん 使い方, Otayorin app                                                                   | Navigational                                     | Home; a how-to-use guide later                         |

Note on "translate": English speakers will search for translation. Otayorin doesn't translate. Target these queries only with pages that explain the paperwork itself and say plainly what the app does and doesn't do.

## 4. On-page rules

- **URL**: lowercase ASCII words joined by hyphens, the same slug in both languages, trailing slash: `/features/read-handouts/` and `/en/features/read-handouts/`. Short and stable; never change a published URL without a redirect.
- **Title** (`<title>`): primary query near the front, brand at the end: `学校のプリント整理のコツと保管期間|おたよりん`. Japanese: aim for about 30 full-width characters, since longer gets cut. English: about 50 to 60 characters: `How to read Japanese school handouts | Otayorin`. Unique on every page.
- **Meta description**: a promise and a reason to click, in plain sentences. Japanese: about 80 to 120 characters, with the point in the first 50 because phones cut early. English: about 120 to 155 characters. Unique on every page. Include the main query naturally once.
- **One `h1`** that says what the page is, close to the title but written for people.
- **Answer first.** The first paragraph answers the query directly in two or three sentences. Then the detail. This serves readers, featured snippets and AI answers at once.
- **H2s are the sub-questions** people actually ask (from related searches and Q&A threads), phrased as they'd phrase them.
- **Depth over length.** Cover the topic fully enough that the reader doesn't need to go back to search. No padding to hit a word count.
- **Real screenshots** with descriptive alt text in the page's language, via the site's `Screen` / `PhoneFrame` components so they're responsive and optimised.
- **Dates on guides**: show when it was last updated, and update it only when the content changes.
- **One clear CTA**, plus a contextual link to the relevant feature page where it helps.

## 5. Structured data

JSON-LD only for content that's visible on the page. Current state: `/` and `/en/` carry `MobileApplication` and `FAQPage` (built in `src/components/Landing.astro`, FAQ items come from the copy automatically), and the tests expect exactly those two.

- **Subpages**: `BreadcrumbList` on every subpage (Home › Section › Page).
- **Guides**: `Article` with `headline`, `datePublished`, `dateModified`, `inLanguage`, `author` and `publisher` as the organisation, `image` if there's a share image.
- **Feature and use-case pages**: `BreadcrumbList` is enough. Don't repeat `MobileApplication` on every page.
- **`FAQPage`** is fine where a page has a real visible FAQ, but since August 2023 Google shows FAQ rich results only for well-known government and health sites. Use it for clarity, not for the rich result.
- **`HowTo`** no longer produces rich results. Don't add it for that reason.
- **Never** add `aggregateRating`, `Review` or an `Offer` price that isn't true. Ratings without real reviews break Google's rules and Japan's stealth-marketing rule.

## 6. Internal linking and site structure

Keep it shallow: every page within two clicks of home.

```
/                       home (category + brand)
/features/<slug>/       one page per core function in the ledger
/for/<slug>/            use cases: several children, working parents, sharing with grandparents, nursery
/guides/<slug>/         problem-solving articles
/en/...                 the same tree in English, plus English-only glossary guides where useful
```

- The home page links to each hub (features, use cases, guides) from relevant sections and the footer, so new pages get discovered and inherit authority.
- Each subpage links back to home, to its hub, and to two or three related pages with descriptive anchor text (「家族で予定を共有する方法」, not 「こちら」).
- Guides link to the feature page that solves the problem they describe, at the point where it's relevant, not only at the end.
- A page that exists in only one language has no hreflang pair and no language-switch target other than that language's home.

## 7. Being cited by AI answers

AI search answers (Google AI Overviews, chat assistants) quote pages that state facts clearly.

- Name the entity plainly and consistently once per page: 「おたよりんは、学校や保育園のプリントを撮るだけで、日付・持ち物・提出物を家族のカレンダーにまとめるアプリです。」 / "Otayorin is an app for parents in Japan that turns photos of school and nursery handouts into one family calendar."
- Put precise, checkable facts in text, not only in images: supported OS versions, what's free and until when, what's shared and where it's stored.
- Keep the facts identical across pages, the stores and the FAQ. Contradictions make an answer engine distrust all of them.

## 8. Measuring

The site deliberately ships no client JavaScript and no analytics. Don't add tracking without the user deciding to.

- After launch, verify the domain in Google Search Console (and Bing Webmaster Tools), submit `/sitemap-index.xml`, and use the Performance report for queries, impressions and clicks per page.
- Use App Store Connect and the Google Play Console for store page views and installs from web referrers.
- Review each guide 3 months after publishing: queries it actually gets, position, click-through. Rewrite titles and descriptions for pages with impressions but low clicks.

## 9. Content plan template

Create `docs/marketing/content-plan.md` with this layout the first time, and keep it current.

```markdown
# Content plan

Primary queries are hypotheses until Search Console data says otherwise.

| Page (ja / en) | Type | Primary query (ja)        | Primary query (en)               | Ledger facts used  | Status | Updated    |
| -------------- | ---- | ------------------------- | -------------------------------- | ------------------ | ------ | ---------- |
| / , /en/       | Home | 学校 プリント 管理 アプリ | app for Japanese school handouts | all core functions | live   | 2026-11-05 |

## Ideas not yet planned

- …

## Decisions

- 2026-11-05: … (why a page was merged, dropped or retargeted)
```

## 10. Pre-publish checklist

- [ ] Every claim is in the feature ledger as `shipped`, with its caveat beside it on the page
- [ ] One primary query per page, not targeted by another page in the content plan
- [ ] Unique title and meta description within the length guides, in each language
- [ ] One `h1`; headings readable on their own; first paragraph answers the query
- [ ] Japanese written natively; English in British spelling; Japanese school terms explained for English readers
- [ ] Canonical correct; hreflang pair present and reciprocal when both languages exist; language switch goes to the equivalent page
- [ ] `BreadcrumbList` (and `Article` for guides) valid JSON-LD matching visible content; no ratings
- [ ] Links back to home and hub, two or three related links, descriptive anchors, trailing slashes
- [ ] Real screenshots with alt text; no layout overflow at phone width
- [ ] `npm run build`, `npm run lint` and `npm test` pass
- [ ] Content plan updated
