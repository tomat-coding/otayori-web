---
name: japanese-audit
description: Audit, proofread and fix the Japanese text of the Otayorin (おたよりん) website so it is correct, natural, consistent and makes sense, the way a careful native editor would leave it. Checks grammar, particles, kanji and kana spelling, word choice, keigo, punctuation, translation-sounding phrasing, consistency with the app's own UI terms, and whether each sentence says what it means. Use this skill whenever the user asks to check, review, proofread, correct, polish or "native-check" Japanese on the site (日本語チェック, 校正, 校閲, ネイティブチェック, 表記ゆれ, 敬語), asks whether some Japanese sounds natural or is grammatical, mentions TODO(ja-review), or has just written or changed Japanese copy and wants it checked, even if they don't say "audit". Writing new marketing pages is the otayori-marketing skill's job; this skill checks the Japanese it produces.
---

# Japanese audit

The site's Japanese pages (`/`, `/send/`, the legal pages, 404) are the first thing most parents in Japan see of Otayorin. They read every word as natives, so one wrong particle, a sentence that sounds machine-translated, or two names for the same button costs trust the rest of the page has to win back. This skill's job is to find those problems, explain each one plainly, and fix them, without flattening the site's warm voice or changing what the copy claims.

The person you're working for may not be a native Japanese speaker. Write your explanations in English, quote the Japanese exactly, and say why the new version is better in terms they can check ("を marks the object, but できる takes が", "this reads like English 'allow you to'"), so they can trust the change without having to take it on faith.

## What "correct" means here

Check in this order, because an error matters more than a preference:

1. **誤り (error):** wrong grammar, particle, conjugation, kanji or word; typos; broken keigo; a sentence whose subject and predicate don't match; weekdays that don't match the date.
2. **意味 (meaning):** ambiguous, illogical or misleading sentences; who-does-what unclear; the Japanese says something different from the facts in the feature ledger or from the English version.
3. **不統一 (inconsistency):** the same thing written two ways (お子さま / お子様, サインイン / ログイン), or a term that differs from the app's own UI.
4. **不自然 (unnatural):** grammatical but no native writer would put it that way: translation-sounding phrasing, stiff kango where parents use plain words, a run of identical sentence endings, over-long sentences.
5. **好み (polish):** optional improvements. Offer them; don't push them.

## Scope

| Where                                     | What it is                                                                  | Edit here?                                                                                                                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/i18n/ja.ts`                          | All landing-page copy, meta, alt text, FAQ, footer                          | Yes. It is the source; `en.ts` mirrors its shape.                                                                                                                                  |
| `src/i18n/pages/*.ts` (the `ja` export)   | Per-page copy, e.g. the send page teachers use                              | Yes. Comments may say a string comes from the app's spec; flag spec mismatches.                                                                                                    |
| `src/pages/*.astro` (not `src/pages/en/`) | Inline Japanese on small pages (404, terms title)                           | Yes.                                                                                                                                                                               |
| `src/legal/*_ja.*`                        | Privacy policy, terms, account deletion                                     | **No.** Copied from the app repo by `scripts/sync-legal.mjs`. Report findings so they can be fixed in the app repo, then synced. Legal register is formal; judge it as legal text. |
| `src/i18n/en.ts`                          | English copy that quotes Japanese terms (提出物, 保育園)                    | Only to keep a quoted term identical to the Japanese page's term.                                                                                                                  |
| App UI terms                              | `shared/src/commonMain/composeResources/values/strings.xml` in the app repo | Never. Read it to check the site uses the same words the app shows. Path to the app repo is in the marketing skill's `references/feature-ledger.md`, Sources section.              |

Japanese in code comments isn't shown to anyone; ignore it.

## Reference files

| File                                                | Read when                                                                                             |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `references/checklist.md`                           | Every audit. What to look for in each of the five categories, with examples and register rules.       |
| `references/glossary.md`                            | Every audit. The site's chosen terms and notations. Update it when you settle a new term.             |
| `../otayori-marketing/references/voice.md`          | Rewriting a sentence (not just correcting it), so the new wording keeps the site's voice.             |
| `../otayori-marketing/references/feature-ledger.md` | A finding touches a claim (free, unlimited, platforms, privacy). Facts aren't this skill's to change. |

## Workflow

### 1. Decide the scope

A full audit covers everything in the table above. Often the user wants less: one page, one section, the strings they just added, or a pasted paragraph. Audit what they asked for. If they ask for an audit with no scope, do the whole site, starting with the page most people see (`ja.ts`), and say what's left if you stop early.

If the user has uncommitted changes in the files you're about to touch, they're mid-work; mention it, and keep your edits limited to the Japanese you're fixing.

### 2. Run the mechanical checks

```bash
node .claude/skills/japanese-audit/scripts/check-ja.mjs            # whole site
node .claude/skills/japanese-audit/scripts/check-ja.mjs src/i18n/pages/send.ts   # one file
```

It prints hints with `file:line`: half-width punctuation inside Japanese, full-width digits, ら抜き and さ入れ, double keigo, 重言, glossary variants, unbalanced brackets, long sentences, and more. Hints are prompts to look, not verdicts: some will be fine in context (a quoted handout phrase, a legal heading). It cannot judge meaning or naturalness; that's step 3.

### 3. Read every string in context

Read the Japanese the way a parent meets it, not as a list of strings. For each string, know:

- **What it is:** heading, body, bullet, button, error message, alt text, meta description, a mock of a school handout. Each has its own conventions (see the checklist's register section). A bullet ending in a noun is a style, not a mistake.
- **Who reads it:** parents on the landing page; teachers and class staff on `/send/` (an outsider doing the family a favour, so more polite); anyone on legal pages.
- **What it should mean:** the same key in `en.ts` tells you the intent. Use it to catch meaning drift, never as the standard the Japanese must match word for word. The Japanese is the source and is meant to read as native writing, not a translation.
- **What the app calls it:** button names, screen names and feature names should match the app's `strings.xml`.

Then go through `references/checklist.md`, category by category. Read each sentence aloud in your head; awkwardness that survives every rule usually shows up there.

### 4. Report

Give one table per file, most serious first:

| 場所                       | 現在                                 | 修正案                             | 種類   | Why                                                                                              |
| -------------------------- | ------------------------------------ | ---------------------------------- | ------ | ------------------------------------------------------------------------------------------------ |
| `404.astro:9` (page title) | ページが見つかりません \| おたよりん | ページが見つかりません｜おたよりん | 不統一 | Japanese titles on this site use the full-width bar with no spaces, as the home page title does. |

- `場所` is the file and line, plus the copy key or section so it's findable after edits.
- Quote only the part that changes, with enough around it to find it.
- `Why` is one or two plain English sentences. Name the rule.
- After the tables, list what you checked and found fine if the user would wonder (e.g. "weekday/date pairs in the handout mock are all consistent"), anything you're unsure of, and anything that needs a native speaker or a decision from the user.

If the user asked only for a report, stop here and ask which to apply.

### 5. Fix

Unless the user asked for a report only:

- **Apply directly:** 誤り, 不統一, and 不自然 fixes where the better version is clear. Keep the sentence's meaning and the site's voice.
- **Propose, don't apply:** anything that changes meaning or a claim, feature or plan names, the brand name, text quoted from the app's spec, and 好み polish. Ask once, listing them.
- **Legal texts:** never edit `src/legal/`. Give the user the list to fix in the app repo.

When you change a string:

- `en.ts` must keep the same shape (same keys, same array lengths). A pure wording fix needs no English change; a meaning change does.
- Search `tests/` for the old string; tests assert some Japanese (headings, send-page messages). Update them to match.
- If you settle a term or notation, add it to `references/glossary.md` so the next audit enforces it.
- When you've audited a file marked `TODO(ja-review)`, tell the user what you reviewed and ask before removing the marker; they may still want a native speaker to look.

### 6. Verify

Run `npm run format`, then `npm run build`, `npm run lint` and `npm test`, and fix what fails. The build regenerates the heading-font subset from the copy, so a changed kanji shows up as a change to `src/assets/fonts/zen-maru-gothic-subset.woff2`; that's expected. Re-run `check-ja.mjs` on the files you touched. If the change affects layout (much longer heading, title array), preview the page (`site` in `.claude/launch.json`) at phone width.

### 7. Wrap up

Tell the user briefly: how many findings by type, what you fixed, what's waiting on them, and anything for the app repo.

## Things that are easy to get wrong here

- **Don't fix the deliberate.** The site's rhythm uses 、 for pauses in titles (「学校のおたよりを、家族のカレンダーに。」), noun-ending bullets, and short fragments in scenes. Those are style. The handout mock (`steps.paper`) and the quoted handout phrases (`phrases.items[].phrase`) imitate real school letters (保護者の皆様へ, 下記のとおり, full-width spaces), so they should sound like a school, not like the site.
- **Don't over-polish into keigo.** The landing page talks to parents in warm です・ます. Stacking お〜いただく and ございます makes it sound like a bank. The send page talks to teachers and can be a step more polite.
- **Don't translate-check.** If the Japanese reads naturally and says the right thing, it doesn't matter that it isn't a literal rendering of the English.
- **Don't change facts while fixing language.** 「早期アクセス期間中は無料」 keeps its condition; numbers (10枚, 10ページ, 10MB, 14日, 6人) must stay as the ledger says. If a sentence is wrong on the facts, flag it, don't quietly reword it.
- **The brand is おたよりん.** おたより alone is the common word for a handout. A similar app is called おたよりー; never write that.
- **Be honest about confidence.** If two forms are both acceptable and it's a matter of taste, say so rather than calling one an error. Where native speakers disagree (e.g. 「お伺いします」), say that too.
