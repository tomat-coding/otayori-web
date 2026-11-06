# Voice

Otayorin talks like a calm, organised friend who has been through the school-bag chaos too. It names the real moment (three crumpled handouts at the bottom of the bag), says what the app does about it, and states the limits in the same breath. It never shouts, never hypes, and never makes a parent feel bad for forgetting something.

The live site already has this voice. When in doubt, read `src/i18n/ja.ts` and `src/i18n/en.ts` and match them.

## Japanese (the primary language)

- **です・ます調**, warm and plain. Short sentences. One idea per sentence.
- **Talk about scenes, not features.** 「かばんの底から、くしゃくしゃのプリントが3枚」 lands harder than 「複数枚の一括読み取りに対応」. Lead with the scene, then the feature that solves it.
- **Use the words parents use.** Mix them naturally rather than repeating one: プリント, おたより, お便り, お知らせ, 配布物, 学校からの手紙. 持ち物, 提出物, 集金, 行事, 保護者会, 遠足, 運動会, 参観日, 個人面談, 年間行事予定表, 月間予定表. 保育園, 幼稚園, こども園, 小学校. Parents say プリント more than おたより; schools title them おたより or 〇〇だより.
- **Address the reader gently.** お子さま (as the site does), パートナー (not 夫/妻, so it fits every family), 家族みんな, 祖父母.
- **Punctuation and numbers.** Full-width 、。「」？！ and ・. Half-width digits and Latin (iOS 26, 10枚). Use 「|」(full-width bar) as the separator in titles, matching the home page.
- **Avoid**: カタカナ jargon a parent wouldn't use (シームレス, ソリューション, DX, エンパワー), 〜 overuse, ！ more than once per page, 煽り (今すぐ！, 絶対, 必見, 神アプリ), and anything that blames the parent (うっかりママ, ズボラ). Avoid gendering the reader: not every reader is a mother.
- **Keep the humility the site uses** for limits and future pricing: 「〜場合がございます」「〜が得意です」「手直しが多くなることがあります」.
- **Write it, don't translate it.** If a Japanese sentence reads like English underneath (「〜することを可能にします」「あなたの〜」 everywhere), rewrite it.

## English

The English pages serve English-speaking parents living in Japan: expats, international families, and Japanese parents more comfortable in English. They're often the parent who struggles most with the handouts, so the English copy should be especially concrete about what Otayorin does and doesn't do for someone who can't read Japanese well.

- **British English**, matching the site: organiser, colour, favourite, programme, enrol. Sentence case for headings.
- **Plain and specific.** "Pick up to 10 photos at once while dinner cooks." Not "Effortlessly digitise your paperwork."
- **Explain Japanese school terms the first time**, with the Japanese in brackets when it helps parents match the word on the paper: forms to hand in (提出物), things to bring (持ち物), school payments (集金), nursery (保育園, hoikuen). This is also good SEO, because these parents search for the Japanese words they see.
- **Be honest about language.** The app UI is in English, but items keep the handout's Japanese wording, and there is no translation. Say so where an English reader would wonder.
- **Avoid**: seamless, effortless, revolutionary, game-changer, powerful, supercharge, unlock, leverage, cutting-edge, AI-powered as a headline, exclamation marks, and "simply" / "just" when the step isn't simple.

## Both languages

- **Claim, then condition.** Put the caveat right beside the claim, as the site does: "Needs Apple Intelligence on iOS 26 or macOS 26. Android support is on the way." Don't hide conditions in a footnote far from the claim.
- **Show, with real screens.** Point to the actual screenshot that proves the claim and describe it in the alt text.
- **Calls to action** are invitations, tied to the reader's week: 「今週のおたよりで、試してみませんか？」 / "Try it on this week's handouts". One primary CTA per page, to the store badges or `/#get-the-app` (`/en/#get-the-app`).
- **Headings answer or name the problem.** A parent scanning only the headings should understand the page.

## Legal guardrails (Japan)

These come from 景品表示法 (misleading representations), the stealth-marketing rule (ステマ規制, in force since October 2023) and store trademark rules. They're why the site is careful, so keep it that way.

- **No unsupported superlatives or firsts**: No.1, 日本初, 業界初, 唯一, 最速, 最高精度, 完全, 100%. Use them only with a cited, current, verifiable source the user provides.
- **"Free" carries its condition**: 早期アクセス期間中は無料 / free during early access, and the may-become-paid note on any page that leads with price. Never 永久無料, 完全無料, "free forever".
- **"Unlimited" carries its condition**: no app-side cap; device storage still applies.
- **No fake or unlabelled endorsements**: no invented testimonials, quotes, parent personas presented as real users, ratings, or "as seen in". Clearly labelled hypothetical scenes (like the use-case cards) are fine.
- **Trademarks**: iPhone, Mac, Apple Intelligence, App Store, Android, Google Play are written exactly so. Use the official badge files in `src/assets/badges/`. Don't imply Apple or Google endorse the app.
- **Privacy claims** must match the ledger and, once published, the privacy policy word for word in substance.
