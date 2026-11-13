# Glossary

The site's settled terms and notations. The audit enforces them, and `scripts/check-ja.mjs` reads the 用語 table below: every word in the 使わない column is reported where it appears in site copy. Keep the table's three columns; separate several avoided forms with 、.

When you settle a new term, add a row. When the app renames something, change the row and fix the site. The app's own words are in the app repo's `shared/src/commonMain/composeResources/values/strings.xml`; the site matches the app for anything a parent will see in both places.

## 用語

| 使う                | 使わない                               | メモ                                                                                                                                          |
| ------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| おたよりん          | おたよりー、オタヨリン                 | The brand. おたよりー is a different app; never name it. おたより alone is the common word for a handout.                                     |
| ログイン            | サインイン、サインアップ               | The app says ログイン everywhere (「ログインして始める」, 「Appleでログイン中」). Decided 2026-11-13 to match.                                |
| お子さま            | お子様、子ども達                       |                                                                                                                                               |
| すべて              | 全て                                   |                                                                                                                                               |
| ください            | 下さい                                 | Auxiliary after て: 「お試しください」.                                                                                                       |
| いただく            | 頂く、頂き、頂け                       | Auxiliary: 「お使いいただけます」.                                                                                                            |
| できる              | 出来る、出来ます、出来ない、出来ません |                                                                                                                                               |
| こと                | する事、事ができ、事があ、事がない     | Formal noun in kana.                                                                                                                          |
| わかる              | 分かる、判る                           |                                                                                                                                               |
| 1か月               | ヶ月、ヵ月、カ月                       | Also 3か月, 何か月.                                                                                                                           |
| 早期アクセス        | アーリーアクセス、ベータ版             | The site's name for the current phase.                                                                                                        |
| 正式リリース        | 正式版リリース、本リリース             |                                                                                                                                               |
| おたよりプラス      | おたより+、おたよりPlus                | The planned paid plan. Name only; no price or limits until plans are live.                                                                    |
| 「おたよりに質問」  | おたより質問、AIに質問                 | Feature name; in 「」 in running text. Headings and titles may drop the 「」.                                                                 |
| 端末                | デバイス                               | Matches the app (端末 22 times).                                                                                                              |
| 要確認              | 要チェック                             | The review screen's label in the app.                                                                                                         |
| 書類                | ドキュメント                           | The app's tab name.                                                                                                                           |
| 読み取る / 読み取り | スキャンする、読み込む                 | The app's verb for reading a handout. スキャン is fine for a paper scan as a file (「PDFやスキャン」).                                        |
| お問い合わせ        | お問合せ、お問い合せ、問合せ           |                                                                                                                                               |
| パートナー          | 旦那、嫁、ご主人、奥さん               | Fits every family; see voice.md.                                                                                                              |
| 保護者              | ママ、パパ                             | Don't gender the reader.                                                                                                                      |
| 繰り返し            | くり返し                               | Matches the app's 「繰り返し」 setting. Decided 2026-11-13.                                                                                   |
| スマホ              | スマートフォン                         | The app's word and the one parents use. Decided 2026-11-13.                                                                                   |
| Mac版               |                                        | The site says Mac版 because the desktop app is Mac only; the app and the legal texts say パソコン版, which is fine there. Decided 2026-11-13. |
| リマインダー        |                                        | The feature. Where text names an app setting, use the setting's own words (「リマインドの設定」). Decided 2026-11-13.                         |

## Notation

| Thing                         | Rule                                                                         | Example                                                |
| ----------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------ |
| Title separator               | Full-width 「｜」, no spaces                                                 | 学校・保育園のおたより・プリント管理アプリ｜おたよりん |
| Digits and Latin              | Half-width                                                                   | 10枚, iOS 26以降, 10MB                                 |
| Space before a version number | Half-width space between the Latin name and the number, none before Japanese | iOS 26以降, macOS 14以降                               |
| Japanese punctuation          | Full-width 、。「」（）？！：・                                              | 対応OS：iOS 17以降                                     |
| Nested quotes                 | 『』 inside 「」                                                             |                                                        |
| Ellipsis                      | … (U+2026), one                                                              | 確認しています…                                        |
| Lists inside a sentence       | ・ between nouns                                                             | 行事・持ち物・提出物・集金                             |
| Small counts                  | ひとつ, ふたつ, ふたり in prose                                              | ひとつのカレンダー                                     |
| Notification mock             | Copies the app's format 「%1$s ほか%2$d件」, space included                  | 体操服、水筒 ほか1件                                   |
| Wave dash                     | Avoid 〜 as decoration; use it only for ranges if needed                     |                                                        |

## Open decisions

None right now. When a choice comes up that the user should make, list it here, ask, then move the answer into the 用語 table.
