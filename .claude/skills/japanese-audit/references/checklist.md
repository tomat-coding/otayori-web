# Japanese checklist

Work through the categories in order. Each item says what to look for and why it matters. Examples are illustrations, not a complete list: the point is to recognise the kind of problem.

## Contents

1. 誤り: errors
2. 意味: meaning
3. 不統一: consistency
4. 不自然: naturalness
5. 好み: polish
6. Register by kind of text

---

## 1. 誤り: errors

**Typos and wrong conversions (変換ミス).** IME errors produce real words that are wrong in context. Watch the common pairs:

| Pair                     | Use                                                            |
| ------------------------ | -------------------------------------------------------------- |
| 以外 / 意外              | except / unexpected                                            |
| 期間 / 期限              | a period / a deadline (提出期限, 早期アクセス期間)             |
| 保証 / 保障 / 補償       | guarantee / protect (security) / compensate                    |
| 対象 / 対称 / 対照       | target / symmetry / contrast                                   |
| 初め / 始め              | the beginning (初めて) / starting something (始める, 使い始め) |
| 変わる / 代わる / 替わる | change / substitute / switch over (切り替わる)                 |
| 納める / 収める          | pay a fee (集金を納める) / store, fit                          |
| 早い / 速い              | early / fast                                                   |
| 合う / 会う              | match (曜日が合う) / meet                                      |
| 追及 / 追求 / 追究       | pursue blame / pursue a goal / pursue truth                    |
| 移動 / 異動              | move (予定を移動) / personnel transfer                         |
| 制作 / 製作 / 作成       | creative work / manufacturing / making a document              |
| 回答 / 解答              | answer to a question / solution to a problem                   |

Also check dropped or doubled characters (をを, のの) and missing small kana (っ, ゃ).

**Particles.** The most common real errors:

- できる, 見える, 必要だ take が for the thing: 「料理ができる」, not 「料理をできる」. With a verb before できる the object keeps を: 「〜を確認できる」 is fine. わかる takes が in careful writing (「予定がわかる」); 「〜をわかっている」 is common in speech and copy, so treat it as a style choice, not an error.
- は vs が: が introduces new or focused information (「明日の持ち物は？」 vs 「何が必要ですか」); a second は in one clause usually means contrast, so check it's intended.
- に vs で: に for destination, target and point in time; で for place of action and means (「端末の中で読み取ります」, 「QRコードで招待」).
- へ vs に: both work for direction; keep one per page where it's a pattern.
- と vs や: と lists everything, や lists examples (often with など). 「PDFや写真」 means "PDFs, photos and the like".

**Conjugation.** ら抜き (見れる → 見られる, 来れる → 来られる), さ入れ (読まさせていただく → 読ませていただく), れ足す (行けれる → 行ける). The site writes standard forms.

**Keigo mistakes.** Errors, not style:

- Humble verb used for the reader's action: 「ご利用できます」 → 「ご利用いただけます」 or 「ご利用になれます」. 「お申し込みできます」 for the reader → 「お申し込みいただけます」.
- Honorific for your own side: 「おたよりんがおっしゃる」.
- Double keigo: 「おっしゃられる」, 「ご覧になられる」, 「お見えになられる」, 「拝見させていただく」. One honorific per verb.
- 「伺ってください」 to the reader (伺う is humble) → 「お尋ねください」 / 「お問い合わせください」.

**Sentence structure.**

- 主述のねじれ: subject and predicate don't fit. 「この機能の特長は、写真を撮るだけで予定になります」 → 「〜特長は、写真を撮るだけで予定になることです」.
- 係り受け: a modifier that could attach to two things. 「白い学校のプリント」: white school, or white handout? Move it next to what it modifies, or add a 、.
- Parallel lists: 「〜たり〜たり」 needs both たり (「追跡したり、入れたりはしていません」). Items in one list share a form (all nouns, or all verbs).

**Fixed expressions misused.** 的を得る → 的を射る, 汚名挽回 → 名誉挽回 / 汚名返上, 足元をすくわれる → 足をすくわれる, 役不足 (means the role is too small for someone).

**重言 (redundancy).** 一番最初, まず最初に, 後で後悔, 必ず必要, 約10枚ほど, 各お子さまごとに, 今現在, 違和感を感じる. Usually drop one half.

**Dates and numbers.** A weekday in brackets must match the date. The site's samples (handout mock, phrases) must be internally consistent, because the app itself flags 曜日が合わない; a mismatch on the site would look careless or, worse, like a bug. Check year-specific claims against the year the page implies. Counts must match across Japanese, English and the feature ledger.

## 2. 意味: meaning

- **Ambiguity.** Who does the action? Japanese drops subjects, which is natural, but on the send page a sentence can be about the teacher, the parent or the app. Read each sentence asking "who?" and "to whom?".
- **Logic.** Does the second half follow from the first? 「〜ので」 and 「〜ため」 claim a cause; make sure it is one.
- **Scope of conditions.** A condition must clearly attach to the claim it limits: 「iOS 26以降のiPhoneとmacOS 26以降のMac」 is clear; 「iOS 26以降のiPhoneとMac」 leaves the Mac's version open.
- **Meaning drift from the English.** Compare with the same key in `en.ts`. If they differ in what they promise (not just in phrasing), flag it, and check the ledger for which is right.
- **Claims.** If a sentence states something about the app, check it against the feature ledger. Language fixes must not change the claim; report a factual problem separately.
- **Overpromise in tone.** 必ず, 絶対, 完全に, すべて can turn a careful claim into a guarantee. 「すべての機能が無料」 is a true, ledger-backed claim; 「完全無料」 isn't.

## 3. 不統一: consistency

Compare against `glossary.md`, the rest of the site, and the app's `strings.xml`.

- **Terms.** One name per thing: feature names (「おたよりに質問」, おたよりプラス, 早期アクセス), screens (ホーム, 書類, 確認画面), statuses (要確認), actions (サインイン). A button the app calls 「読み取る」 shouldn't be 「スキャンする」 on the site.
- **Kanji or kana (漢字の開き).** Auxiliary verbs and formal nouns are written in kana: ください, いただく, できる, こと, とき, もの, ところ, ほか, など, よう, わかる, すべて. Content words stay in kanji (使う, 選ぶ, 予定). Follow `glossary.md`; when it's silent, follow what the site already does most.
- **Okurigana.** One form per word: 読み取り, 取り込む, 引き落とし, 締め切り, 申し込み, 受け付ける (verb) / 受付 (noun, as in 受付時間). Nouns in compact lists may use the short form (振込); keep that as the site has it.
- **お / ご.** Same word, same prefix everywhere: お子さま, ご家族, お問い合わせ, ご意見, ご報告.
- **Numbers.** Half-width digits (10枚, 14日後, iOS 26). Words for small counts written as the site does (ひとつ, ふたり, 1か月). Never full-width digits.
- **Punctuation.** Full-width 、。「」（）？！：・ inside Japanese. 『』 only inside 「」. The title separator is 「｜」 (full-width, no spaces). The ellipsis is …. Avoid 〜 as a decoration. Half-width spaces only between Latin words or between a word and a version number (iOS 26), not between Japanese words.
- **Sentence endings by text type.** Prose ends in です・ます with 。. Bullets, headings and alt text may end in a noun or plain form and have no 。. Buttons use one pattern per page (「送信する」「ファイルを選ぶ」). Mixing patterns within one list is the error.

## 4. 不自然: naturalness

The test: would a careful Japanese writer, writing for parents from scratch, have written this? Common giveaways:

- **Translation-sounding phrasing (翻訳調).**
  - 「あなた」 / 「あなたの」: almost never needed; drop it or use お子さま, ご家族.
  - 「〜することができます」 → 「〜できます」.
  - 「〜を可能にします」, 「〜を提供します」: say what the reader does: 「〜できます」.
  - 「〜を持っています」 for "has": 「〜があります」.
  - Inanimate subjects doing human things: 「このアプリはあなたに安心を与えます」.
  - 「〜によって」 for a passive agent where an active sentence is simpler.
  - Long noun-modifying clauses stacked before a noun (English relative clauses turned inside out). Split into two sentences.
- **Word choice.** Prefer the words parents use (voice.md lists them): 使う not 使用する, 選ぶ not 選択する, 始める not 開始する, in friendly copy. UI terms (削除, 共有, 同期) stay as the app has them.
- **Katakana.** Use katakana words a parent would use (カレンダー, リマインダー, アプリ). Replace jargon (シームレス, ソリューション, エクスペリエンス).
- **Rhythm.** Three sentences in a row ending in 〜ます。 sounds flat; vary with 〜です, a noun ending, or by joining two sentences. Watch repeated words in neighbouring sentences (おたよりを…おたよりの…おたよりに).
- **Sentence length.** Body sentences above about 60 characters usually split well. Legal text is exempt.
- **Too many の.** 「家族の予定の共有の設定」: rephrase (「家族と予定を共有する設定」).
- **Commas.** A 、 belongs after a long subject or topic, between clauses, and to prevent misreading. Not after every particle.
- **Over-politeness.** 〜させていただきます where the reader didn't permit anything, stacked お〜いただく, ございます in casual copy. Each extra layer moves the voice from a friend to a bank.

## 5. 好み: polish

Things that would make a good sentence better but where the current one is acceptable: a livelier verb, a shorter heading, a clearer order of information, a scene detail. Offer these as suggestions with a one-line reason. Don't label them errors.

## 6. Register by kind of text

| Text                                    | Register                                                                                                                                                        |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Landing page prose, FAQ answers         | Warm, plain です・ます. Short sentences. Light humility for limits (〜場合があります, 〜予定です).                                                              |
| Headings, kickers, scene titles         | Noun endings, fragments and 、 for rhythm are fine. No 。 except in a full-sentence heading that has one already.                                               |
| Bullets                                 | Noun or plain ending, no 。, one form per list.                                                                                                                 |
| Alt text                                | Describes what's in the image: 「〜の画面。〜が表示されている」. Plain form is normal here.                                                                     |
| Meta title / description                | Title about 30 full-width characters, 「｜」 before the brand. Description about 80–120 characters, です・ます.                                                 |
| Buttons and labels                      | Short. A verb (「送信する」, 「読み取る」) or a noun (「お問い合わせ」). Same pattern across a page.                                                            |
| Error and status messages               | Say what happened and what to do next. Soften with お手数ですが / しばらくしてから. No blame.                                                                   |
| Send page (read by teachers and staff)  | One step more polite than the landing page: the teacher is doing the family a favour. お〜ください, 〜いただけます. Refer to the family as 保護者の方 / ご家族. |
| Handout mock and quoted handout phrases | Imitate real school letters (保護者の皆様へ, 下記のとおり, ご用意ください). Don't convert to the site's voice.                                                  |
| Legal texts                             | Formal, precise, consistent defined terms. Report only; they're fixed in the app repo.                                                                          |
