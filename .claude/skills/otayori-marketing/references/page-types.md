# Page types

Pick the type that matches the searcher's intent, then use its outline as a starting point, not a form to fill. Every type follows the voice and the ledger.

## Landing page section (home)

**When**: improving conversion or category ranking on `/` and `/en/`, adding a FAQ item, refreshing the hero, adding a use case.

- Edit the copy in `src/i18n/ja.ts` and `src/i18n/en.ts`. Arrays (`useCases.items`, `faq.items`, bullets) can grow without code changes; new keys or a new feature row need component work (see `site-implementation.md`).
- Keep the hero to the one core promise. The `h1` currently targets the category (学校のおたよりを、家族のカレンダーに。) and the title targets 学校・保育園のプリント管理アプリ; change them only with a reason recorded in the content plan.
- FAQ items flow into `FAQPage` JSON-LD automatically. Write questions as parents ask them, answers in two or three sentences, conditions included.
- Use cases follow the existing pattern: a title that is the parent's moment, a body that says what Otayorin does about it.

## Feature page `/features/<slug>/`

**When**: one core function from the ledger deserves its own page because people search for that capability (縦書き 読み取り, プリント 写真 カレンダー 登録, 家族 予定 共有).

Outline:

1. `h1`: the capability in the parent's words (「プリントを撮るだけで、予定と持ち物をカレンダーに」)
2. Answer-first lead: what it does, for whom, in two or three sentences, plus the main caveat
3. How it works, step by step, each step with a real screenshot
4. What it handles: the specifics from the ledger (vertical text, tables, Reiwa dates, up to 10 pages…), each with its condition
5. What it doesn't do (honest limits; this builds trust and pre-empts support questions)
6. Two or three short scenes where it helps (link to matching use-case pages)
7. FAQ for this feature (3 to 5 real questions)
8. CTA: store badges or a link to `/#get-the-app`
9. Related features

Length: as long as the specifics need, usually 800 to 1,500 Japanese characters of body copy. Schema: `BreadcrumbList`.

Good first candidates, from the ledger's core functions: reading handouts (`read-handouts`), family calendar (`family-calendar`), reminders (`reminders`), family sharing (`family-sharing`), search and ask (`search-and-ask`).

## Use-case page `/for/<slug>/`

**When**: a type of family or situation searches with its own words (共働き, 兄弟, 祖父母, 保育園).

Outline:

1. `h1`: the situation, not the app (「上の子は小学校、下の子は保育園。予定をひとつにまとめるには」)
2. Lead: name the friction honestly and in detail; show you understand the week they're having
3. How families handle it today and where it breaks (paper on the fridge, photos in the camera roll, a shared calendar someone has to type into)
4. How Otayorin fits, feature by feature, each linked to its feature page, with screenshots
5. A walk through one realistic week (clearly a scenario, not a testimonial)
6. Limits that matter to this family (e.g., Android vertical reading for a mixed-phone family)
7. FAQ, CTA

Schema: `BreadcrumbList`. Candidates: `working-parents`, `siblings`, `nursery`, `grandparents`, `english-speaking-parents` (English only, or both).

## Guide `/guides/<slug>/`

**When**: informational queries where people want to solve a problem, not buy an app (学校 プリント 整理 方法, 提出物 忘れ 防止). These attract the most searchers and build trust; the app is one helpful step, not the whole answer.

Outline:

1. `h1` matching the question
2. The short answer in the first paragraph
3. Practical, app-independent advice first: real methods (a single inbox tray, photographing then discarding, a weekly 10-minute check, what to keep and for how long)
4. Where an app helps, and how Otayorin specifically does that step, with a screenshot and link to the feature page
5. A checklist or table readers can use (e.g., what to keep, what to bin, by type of handout)
6. FAQ, last-updated date, CTA

Rules: the advice must stand on its own even for a reader who never installs the app. Don't state facts about schools or law you can't back up (e.g., how long schools require something to be kept); say "check with your school" where practice varies. Schema: `Article` + `BreadcrumbList`.

## English glossary guide `/en/guides/<slug>/`

**When**: English-speaking parents need to decode Japanese school paperwork. These pages can rank well because few good English resources exist, and they reach exactly the parents who struggle most with handouts.

Outline:

1. `h1`: "Japanese school handouts, explained" or a narrower topic (nursery letters, what to bring, school payments)
2. What these handouts are and how often they come
3. A glossary table: Japanese term, reading, meaning, what you need to do (提出物 teishutsubutsu: forms to hand in, usually by a deadline…)
4. Typical handouts through the school year (入学, 遠足, 運動会, 保護者会, 個人面談, 夏休み…), with what each usually asks of parents
5. Practical tips: ask the teacher or another parent, photo the handout before it disappears, check the deadline first
6. How Otayorin helps, honestly: finds dates and things to bring and puts them on the calendar in an English app UI, but items stay in Japanese and it doesn't translate; pair with a partner or friend who reads Japanese via family sharing
7. FAQ, CTA

Schema: `Article` + `BreadcrumbList`. Usually English only; a Japanese counterpart isn't needed, so no hreflang pair.

## Store listing text

**When**: the user asks for App Store or Google Play copy. Same ledger, same voice, different limits. Count characters; these are hard limits.

| Field                        | App Store                                                                       | Google Play                       |
| ---------------------------- | ------------------------------------------------------------------------------- | --------------------------------- |
| App name / title             | 30                                                                              | 30                                |
| Subtitle / short description | 30 (subtitle)                                                                   | 80                                |
| Keywords                     | 100, comma-separated, not shown; don't repeat words already in name or subtitle | none (the text itself is indexed) |
| Promotional text             | 170, can change without a release                                               | n/a                               |
| Description                  | 4,000                                                                           | 4,000                             |

Write both Japanese and English localisations. Lead the description with the core promise and the three core functions, then the conditions (early access, free for now, OS requirements for AI and vertical reading). The first three lines matter most, because that's what shows before "more".

## Picking between them

- Query wants an app → home or feature page
- Query names a situation → use-case page
- Query asks how to do something → guide
- Query is in English and about Japanese school life → English glossary guide
- Nothing fits and the query is far from what Otayorin does → don't write it
