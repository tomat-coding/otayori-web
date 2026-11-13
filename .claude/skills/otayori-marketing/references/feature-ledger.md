# Feature ledger

The facts marketing may state about the app, with the conditions that must travel with them. Copy is phrasing; this file is truth. When the app changes, update this file first, then the copy.

Each fact has a status:

- `shipped`: in the app and switched on, safe to state with its caveat
- `built-off`: in the code but switched off or blocked (a server flag, a missing Apple key); don't promise it, at most "coming"
- `coming`: planned or built but not yet checked; only say "on the way" / 今後対応予定, never give dates unless the user does
- `planned-terms`: pricing and limits decided in code but not live; never publish until the user says they are
- `unverified`: believed true but not confirmed; don't publish until confirmed

**Last reviewed:** 2026-11-13, against the app repo at commit `e9bc7e1` (2026-11-13, "sharing functionality"), plus `docs/release/features.md`.

## Sources

- **App repo:** `/Users/tomaszmatusik/AndroidStudioProjects/Otayori` (Kotlin Multiplatform: iPhone, Android, Mac). Start with:
  - `CLAUDE.md`: roadmap status and how every feature works
  - `docs/PRIVACY.md`: what leaves the device, per feature
  - `docs/release/store-listing.md`: name, store text, tagline, brand
  - `docs/release/README.md`: what's ready and what waits for the Apple Developer account
  - `shared/src/commonMain/composeResources/values{,-en}/strings.xml`: the app's real UI words in Japanese and English
  - `docs/release/features.md`: the app team's per-feature status and draft copy (its 「Not to promote yet」 table)
- **To find what changed since this review:** `git -C /Users/tomaszmatusik/AndroidStudioProjects/Otayori log --stat 908d02e..HEAD`, then read the CLAUDE.md diff. Update this file and the "Last reviewed" line.
- **Screenshots** (real screens, sample data, Japanese UI): `src/assets/screens/` in this repo. They predate the rename, so check they don't show the old name before featuring one.

## Name and brand

- **The app is おたよりん, Otayorin in Latin script everywhere** (store-listing.md, app display names, Mac menu bar). The code, package and app ID stay `otayori`; the plan is おたよりプラス (the English terms call it "Otayori Plus"); the UI uses おたより as the ordinary word for a handout.
- **This website uses おたよりん / Otayorin** since 2026-11-05. Until a domain is bought it's published on GitHub Pages at `https://tomat-coding.github.io/otayori-web/` (`SITE_URL` and `BASE_PATH` in `src/config.ts`); planned domains are `otayorin.com`, `.jp`, `.app` (not confirmed registered).
- **Store names (draft):** App Store ja 「おたよりん｜おたより・プリント管理カレンダー」, subtitle 「撮るだけで予定と持ち物を自動登録」. English: "Otayorin – Family School Assistant". Never write "home assistant" (an existing smart-home product).
- **Tagline:** 「プリント、撮るだけ。」
- **Store category:** Productivity, secondary Education. (The site's JSON-LD keeps `LifestyleApplication`; Google has no productivity value.)
- **Similar name in the same category:** おたよりー (MamaLeaf). Never mention it or compare to it in copy; just keep the spelling おたよりん exact so the two aren't confused.
- **Not trademarked**, by choice. Don't use ® or ™.

## Release status

- Preview, not in the stores yet: TestFlight and the App Store wait for the Apple Developer account; store links in `src/config.ts` are placeholders. Some features below are `built-off` only because of that.
- "Early access" (早期アクセス) on the site describes this period. Keep it until the user says otherwise.
- **Mac ships with the iPhone app in early access** (confirmed by the user, 2026-11-05). The app repo's `docs/release/features.md` says the Mac app comes "with the official release" and lists it under "Not to promote yet"; the user says that's a mistake. Keep the Mac download link and present Mac as part of early access.

## Core functions

The jobs the app does for a parent, roughly in order of importance.

### 1. Read handouts from a photo or file (撮るだけで読み取り)

| Fact                                                                                                                                                                                   | Status          | Caveat to state                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| iPhone: document camera (several pages in one scan become one handout), photo library, Files app, and share from another app (PDFs and images)                                         | shipped         |                                                                                                                                                                                                                                                                                                                                       |
| Android: Google's document scanner (finds, straightens and crops the page; several pages become one handout), photo picker, file chooser, and share from another app (PDFs and images) | shipped         | Scanner since 2026-11-06 (A1). Needs Google Play services, which every phone that installs from Google Play has; it's ML Kit, so it sends Google diagnostics (see Privacy). No camera permission                                                                                                                                      |
| Mac: drag in or choose PDF, JPG, PNG or HEIC files, several at once                                                                                                                    | shipped         | Mac needs sign-in (see Mac)                                                                                                                                                                                                                                                                                                           |
| Pick up to 10 photos at once; they're read one by one                                                                                                                                  | shipped         |                                                                                                                                                                                                                                                                                                                                       |
| Multi-page handouts: PDFs and scans up to 10 pages read as one handout, so a month heading on page 1 applies to page 2                                                                 | shipped         | Beyond 10 pages, the first 10 are read. Free plan reads page 1 once plans start (see Business)                                                                                                                                                                                                                                        |
| Finds four kinds of item: events (行事), things to bring (持ち物), forms to hand in (提出), and payments (集金)                                                                        | shipped         |                                                                                                                                                                                                                                                                                                                                       |
| Payments: amount and method (口座引き落とし, 現金, 振込) when the handout states them, with the pay-by date                                                                            | shipped         | Amount is never guessed; blank if the handout doesn't say                                                                                                                                                                                                                                                                             |
| Forms to hand in also from 確認欄, ご署名, ご記入, お返しください                                                                                                                      | shipped         |                                                                                                                                                                                                                                                                                                                                       |
| Repeating items written on the handout (毎週月曜日, 毎月10日, 毎月第2水曜日) become a series with its period; weekly ones skip national holidays                                       | shipped         | With no end date, runs to the end of term or school year                                                                                                                                                                                                                                                                              |
| Change notices (中止, 延期, 変更, 振り替え): finds the item already saved and offers to move or delete it, keeping its ticks, reminders and notes                                      | shipped         | Parent confirms each change                                                                                                                                                                                                                                                                                                           |
| Rain dates (雨天の場合, 予備日) kept as a note on the event, not a separate item                                                                                                       | shipped         |                                                                                                                                                                                                                                                                                                                                       |
| Reads tables, monthly schedules, two-column newsletters, kanji numerals and Reiwa / 和暦 dates; takes the year from the handout's own date                                             | shipped         |                                                                                                                                                                                                                                                                                                                                       |
| Reads vertical Japanese (縦書き)                                                                                                                                                       | shipped         | **iPhone: iOS 26 or later only.** iOS 17 to 25 read horizontal text only; a vertical handout comes back as "couldn't read any text" with manual entry offered. **Mac: say macOS 26 or later** (tested on macOS 27; macOS 15 to 25 untested and likely not to work). **Android:** reads vertical much less reliably, expect more fixes |
| Horizontal handouts and tables read on every supported OS                                                                                                                              | shipped         | Android reads them about as well as iPhone                                                                                                                                                                                                                                                                                            |
| Reading happens on the device; handouts aren't sent to our servers to be read                                                                                                          | shipped         | Android's reader (Google ML Kit) sends Google diagnostics, not the handout (see Privacy)                                                                                                                                                                                                                                              |
| Does **not** translate. Items keep the handout's Japanese wording                                                                                                                      | shipped (limit) | Say this plainly to English speakers                                                                                                                                                                                                                                                                                                  |

### 2. Check before anything is added (読み取り結果)

| Fact                                                                                                                                              | Status  | Caveat                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------------------- |
| Review screen: items it's unsure of come first, unticked, each with the reason and one-tap fixes (pick the date, "All day is fine", enter a time) | shipped |                           |
| Catches a date and weekday that don't match and offers both                                                                                       | shipped |                           |
| Highlights on the scan show where each item came from; page switcher for multi-page handouts; tap to see full size                                | shipped |                           |
| Only ticked items are added; edit any card first, retake, or add by hand                                                                          | shipped |                           |
| Things to bring, forms and payments get the day-before reminder by default                                                                        | shipped | Setting can turn this off |

Screenshot: `ios-review.png` (a trip notice read into a consent form and a trip with its packing list; not used on the site yet).

### 3. One family calendar and home screen (家族のカレンダー)

| Fact                                                                                                                                           | Status  | Caveat                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every child's items, from school, nursery or anywhere, on one calendar; family-wide items too                                                  | shipped |                                                                                                                                                                                           |
| Each child has a name, class and colour (6 colours); filter to one child on Home and Calendar                                                  | shipped |                                                                                                                                                                                           |
| Month calendar, weeks start on Sunday, Japanese holidays (国民の祝日, 振替休日, 国民の休日) built in                                           | shipped |                                                                                                                                                                                           |
| Home shows this week: today, tomorrow, the rest of the week and next week                                                                      | shipped |                                                                                                                                                                                           |
| The next form or payment due gets its own card at the top of Home, with Handed in / Paid buttons                                               | shipped |                                                                                                                                                                                           |
| "Pack for tomorrow" card with packing progress; list rows show 持ち物 and how many are packed (「持ち物 1/3点 準備済み」, 「✓ 持ち物 準備OK」) | shipped | New on 2026-11-05                                                                                                                                                                         |
| Add items by hand: type, child, date or all day, time, things to bring, place, notes, repeat weekly or monthly                                 | shipped |                                                                                                                                                                                           |
| Delete one day of a repeating item, or that day and all after it                                                                               | shipped |                                                                                                                                                                                           |
| Send an item to your own calendar app                                                                                                          | shipped | iPhone: Apple's add-event screen, no calendar permission, the app never reads your calendar. Android: your calendar app's new-event screen. Mac: an .ics file, also a whole month at once |
| First launch walks through three steps (add children, scan a handout, invite your partner, "later is fine") with a sample                      | shipped |                                                                                                                                                                                           |

Screenshots: `ios-home.png`, `android-home.png`, `desktop-home.png`, `ios-calendar.png`, `android-calendar.png`, `desktop-calendar.png`.

### 4. Reminders and widgets (忘れ物・出し忘れ防止)

| Fact                                                                                                                                                                                         | Status        | Caveat                                                                     |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------- |
| Day-before reminder (default 20:00) and same-day morning reminder (default 7:30); the parent sets both times                                                                                 | shipped       | Times are per device                                                       |
| Several reminders at the same moment arrive as one summary ("3 things for tomorrow")                                                                                                         | shipped       |                                                                            |
| Reminder text shows only the item title, never children's names or notes, because it appears on the lock screen                                                                              | shipped       |                                                                            |
| iPhone widgets: home screen small and medium, lock screen rectangular, inline and circular; show today until 15:00, then tomorrow; medium also shows the next day with plans beside it       | shipped       | Lock screen widgets never show children's names                            |
| Reminders on Mac                                                                                                                                                                             | not available | Reminders come from the phone                                              |
| Android widget 「今日と明日」: one resizable home screen widget with today's items and things to bring, then tomorrow's from 15:00; at 4 × 2 or wider the next day with plans sits beside it | shipped       | Since 2026-11-07 (A2). Home screen only: no lock screen widgets on Android |

### 5. Share with family (家族で共有)

| Fact                                                                                                                                        | Status    | Caveat                                                                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| Accounts are optional on iPhone and Android; everything works signed out, on that device                                                    | shipped   |                                                                                                                    |
| Sign in with Apple or Google on iPhone; Google on Android; the Mac signs in by scanning its QR code with your signed-in phone (no password) | shipped   | No email sign-in                                                                                                   |
| Signing in saves your schedule to your account, so all your own phones and computers show the same schedule, even before you invite anyone  | shipped   | Stored on servers in Tokyo                                                                                         |
| Invite family with a code, link or QR code; codes last 7 days and work once                                                                 | shipped   |                                                                                                                    |
| Up to 6 people in a family (partner, grandparents, anyone who helps)                                                                        | shipped   |                                                                                                                    |
| Everyone sees the same schedule; what one adds appears for the others                                                                       | shipped   | iPhone and Android can mix                                                                                         |
| Each person picks the name the family sees (呼び名); ticks and done marks show who and when                                                 | shipped   |                                                                                                                    |
| Shared: children's names and classes, events, things to bring, forms, payments, and what's been ticked                                      | shipped   |                                                                                                                    |
| Leaving a family keeps your own copy of the schedule                                                                                        | shipped   |                                                                                                                    |
| Reminders aren't shared; each person's phone sets its own                                                                                   | shipped   |                                                                                                                    |
| Handout photos shared with family, one handout at a time, off by default                                                                    | built-off | Switched off for the preview, planned for the official release. Until then: "handout photos aren't shared" is true |
| "Tell my partner when I add items" push notification                                                                                        | built-off | iPhone only; waits for the Apple account. Android later                                                            |

### 6. Find, ask, add (探す・聞く・頼む)

| Fact                                                                                                                                                                                                                                 | Status           | Caveat                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Every original handout is kept (all pages), linked to the items made from it                                                                                                                                                         | shipped          |                                                                                                                                                       |
| Search handouts by title, school, item text and the words inside the handout; shows the matching line                                                                                                                                | shipped          | Kana, width and case don't matter                                                                                                                     |
| Delete a handout with or without its items                                                                                                                                                                                           | shipped          |                                                                                                                                                       |
| 「おたよりに質問」 / "Ask about your handouts": answers from the family's own items and handouts, with links to the sources; suggested questions ("What do we bring tomorrow?", "What's due this week?")                             | shipped          | **Needs Apple Intelligence on iOS 26 or macOS 26** (an eligible device with it turned on)                                                             |
| Ask about one handout (「このおたよりについて質問」)                                                                                                                                                                                 | shipped          | Same requirement                                                                                                                                      |
| Add a plan in words ("Add gym clothes for Friday"); it drafts the item and only "Add" saves it                                                                                                                                       | shipped          | Same requirement                                                                                                                                      |
| Answers are made on the device; questions and answers are never sent or saved                                                                                                                                                        | shipped          | iPhone and Mac. The app warns "AI answers can be wrong. Check the handout too."                                                                       |
| Quick answers on every device (AI3): without a device model, おたよりに質問 answers with rule-based lists of the family's own items and handout lines, and adding items by typing (「明日15時 歯医者」) still works; nothing is sent | built 2026-11-06 | Say free-form questions need Apple Intelligence (iPhone iOS 26+, Mac macOS 26+) and other devices get answers as lists from the schedule and handouts |
| Assistant on Android, with Gemini Nano on supported phones (Pixel 9 and later, recent Galaxy and others)                                                                                                                             | coming           | Built, not yet checked on a real phone. Say "Android support is on the way"                                                                           |

Screenshots: `ios-documents.png`, `mac-ask.png`.

### 7. Handouts sent straight from teachers (先生から届くおたより, S1)

Source: app repo `docs/plans/S1-school-links.md`, `docs/release/features.md` §16 (2026-11-13), strings `links_*` and `received_*`. Checked 2026-11-13 against commit `1f54842` plus the uncommitted S1 plan work.

| Fact                                                                                                                                          | Status        | Caveat                                                                                                               |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| Family → 「プリントの届け先」: make a link and QR code per sender (school, nursery, lessons), named by the parent; 「リンクを送る」 shares it | coming        | Needs sign-in. Built; the website's send page and the prod server setup are pending. Say 今後対応予定 / "on the way" |
| Teachers open the link in any browser and send PDFs or photos (JPG, PNG, HEIC), with an optional name and message; no app, no account         | coming        | 10 MB a file. Never imply schools endorse or use the app; some schools have rules about outside services             |
| Handouts arrive on Home (and the Mac inbox) as 「届いたおたより N件」 with who sent them; 「読み取る」 reads them into the usual review       | coming        | iPhone, Android, Mac                                                                                                 |
| Rename or stop a link any time; stopped links no longer work                                                                                  | coming        |                                                                                                                      |
| Files are deleted from the server once received, or after 14 days                                                                             | coming        | Files pass through the Tokyo server (private storage) until received; this is not on-device only                     |
| "Anyone with the link can send", so parents give links only to people they trust                                                              | coming        | Required wording (features.md)                                                                                       |
| Free plan: 1 link, 5 handouts a month; Plus: up to 20 links, no monthly count                                                                 | planned-terms | Don't publish the numbers. The site may say it "may become partly paid" (added 2026-11-13, see Business terms)       |

## Mac app

| Fact                                                                                                                      | Status        | Caveat                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wide layout: the week as a list (this week, next week, this month), big calendar cells, handouts as a grid with a preview | shipped       |                                                                                                                                                                                                                                                                                                                                                                                                                |
| Import by drag and drop, reviewed beside the full page                                                                    | shipped       |                                                                                                                                                                                                                                                                                                                                                                                                                |
| Sign-in required, by QR code from your phone, so you need the phone app too                                               | shipped       |                                                                                                                                                                                                                                                                                                                                                                                                                |
| Reminders and haptics                                                                                                     | not available |                                                                                                                                                                                                                                                                                                                                                                                                                |
| Windows                                                                                                                   | coming        | Built (D4) but not yet run on a Windows PC, and unsigned. The user confirmed on 2026-11-13 that Windows will be supported: say 今後対応予定 / "on the way", never a date. Same desktop app as the Mac (QR sign-in from the phone, reminders on the phone); reads with Windows' own OCR; no on-device language model, so おたよりに質問 gives quick answers. Planned as part of おたよりプラス with the Mac app |

## Platforms

| Platform      | Minimum   | Notes                                                                                |
| ------------- | --------- | ------------------------------------------------------------------------------------ |
| iPhone        | iOS 17    | Vertical reading on iOS 26+. AI on iOS 26 with Apple Intelligence. Widgets           |
| Android       | Android 9 | Vertical reading much weaker. No AI yet. Home screen widget (no lock screen widgets) |
| Mac           | macOS 14  | Sign-in via phone. Vertical reading: say macOS 26+. AI on macOS 26                   |
| App language  |           | Japanese and English UI, chosen per app                                              |
| Windows       |           | Coming (今後対応予定), no date                                                       |
| Not available |           | Web app, iPad-specific design (unverified), Apple Watch                              |

## Privacy facts

| Fact                                                                                                       | Caveat                                                                                                                                                                                                                                          |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| No ads, no tracking, no analytics or crash-reporting tools of our own                                      | On Android, Google's ML Kit (used for the document scanner, reading and the coming assistant) sends Google diagnostics: device and app info, sizes, error codes, an install ID. Never the handout or questions. Disclosed in the privacy policy |
| Signed out, nothing leaves the device                                                                      |                                                                                                                                                                                                                                                 |
| Signed in, the schedule is stored on Supabase servers in Tokyo, encrypted in transit and at rest           | Not end-to-end encrypted. Never claim it is                                                                                                                                                                                                     |
| No photo library access (system pickers), no camera permission on Android, no calendar permission anywhere |                                                                                                                                                                                                                                                 |
| Delete all data on the device, or the account and all data, from Settings                                  | Deleting the account doesn't cancel a store subscription                                                                                                                                                                                        |
| iPhone data is in the user's own iCloud or computer backup; Android cloud backup is off                    |                                                                                                                                                                                                                                                 |

### Changing phones (機種変更)

Source: the user, 2026-11-13. On the site as an FAQ.

- **Signed in:** signing in on the new phone brings back the children, the schedule, checklist ticks and the handout list from the server. Not restored: handout photos (unless the handout was shared with the family; photo sharing is off in the preview), reminder times and each reminder's on/off (kept per phone; the new phone uses defaults), and a scan still on the review screen.
- **Not signed in:** data is only on the phone. iPhone: moving to a new iPhone or an iCloud/Finder restore brings everything, photos included. Android: a direct phone-to-phone transfer keeps it (Android 12+); cloud backup is off, so a Google Drive restore brings nothing.
- When photo sharing ships, update the FAQ: shared handouts' photos then come back after signing in.

## Business terms

**Now (preview / early access):**

| Fact                                            | Caveat that must travel with it                                       |
| ----------------------------------------------- | --------------------------------------------------------------------- |
| Every feature free on all platforms             | "during early access" / 早期アクセス期間中; may become paid in future |
| No app-side limit on handouts saved             | Device storage still applies                                          |
| No limit on AI questions                        | Needs Apple Intelligence on iOS 26 / macOS 26                         |
| No ads                                          | Also planned to stay so after plans start ("No ads ever")             |
| No account needed to start on iPhone or Android | Needed for sharing and for Mac                                        |

**Approved for the site (2026-11-05):** say that some features may move to a paid plan, おたよりプラス (Otayori Plus), after the official release, and name them, without prices or limits:

- Planned to stay free: reading handouts, the calendar and checklists, reminders, saving and searching handouts, おたよりに質問 (free and unlimited on every plan, decided 2026-11-06), sharing the schedule with your partner.
- May become paid: sharing with more family than your partner (grandparents, a babysitter), multi-page PDFs and scans, widgets (iPhone and Android), sharing handout photos with family (coming with the official release), the desktop app (Mac, and Windows once it comes), and being ad-free. Added 2026-11-13 (not yet confirmed by the user): more teacher links and more handouts from teachers each month, since the free plan will limit both. "One plan per household" may be said as planned.
- **Ads (2026-11-06):** the app is ad-free now, but the free plan may show ads after the official release (the app repo says 2027; don't publish a date). Say "ad-free during early access" or 「いまは広告なし」, and that おたよりプラス is planned to stay ad-free. Never "no ads" without that condition, and never "no ads, ever" / 広告は一切ありません. "No tracking, no analytics" is still true; revisit it if an ad network is ever added.
- **Family size:** up to 6 during early access (server cap). Planned: the free plan covers you and your partner, Plus up to 6. Describe it as "partner free, more family with Plus"; don't publish "2" until plans are live.
- Don't point out what Android lacks or does less well (vertical text, Ask about your handouts) and don't say "on the way": the user plans to ship them (2026-11-06). Name the requirement for the platforms that have the feature ("iOS 26 or macOS 26") and stop there; still never claim Android has it.
- Still never on the site: prices, the trial length, "3 a day", "page 1", "10 a month". The test "shows no prices" in `tests/site.spec.ts` guards the price part.

**Planned, switched off on the server** (`planned-terms`: internal context, don't publish):

- One plan, おたよりプラス, per household: one person pays and the whole family and its Mac apps get it. New families get Plus free for their first 14 days.
- Free tier: reading, schedule, reminders, saved handouts and schedule sharing stay unlimited; 10 handout photo shares a month per family; 3 AI questions a day; only page 1 of a PDF or scan; no Mac app.
- Plus: those limits removed (photo sharing "unlimited" with a fair-use condition) and the Mac app.
- Draft prices ¥480 a month or ¥4,800 a year, with a 1-month free trial. Not created in the stores yet.

When plans go live, the site's "unlimited AI", "Mac" and "10 pages" claims need the plan condition beside them, the 特定商取引法 page must be published, and `TERMS_PUBLISHED` in `src/config.ts` switched on so `/terms/` shows the app's terms.

## Site copy that disagrees with the app

All fixed on 2026-11-05:

1. **Name**: renamed to おたよりん / Otayorin in the copy, titles, JSON-LD, share images, footer, README, the draft privacy pages' first line and the domain placeholders (`otayorin.example`). おたより stays where it means a handout (the `h1` 「学校のおたよりを、」 and similar). The header was tightened so the longer name fits on phones down to 320px.
2. **Vertical text on Mac**: now macOS 26+.
3. **Vertical text on iPhone**: both languages say it's read only on iOS 26+, with manual entry on earlier versions.
4. **Trust section**: says signing in saves the schedule to the account, separately from inviting family; also discloses ML Kit diagnostics on Android.
5. **Mac**: QR sign-in from a signed-in phone, reminders arrive on the phone.
6. **Widgets**: Home Screen widgets on iPhone and Android, Lock Screen widgets on iPhone. Wide widgets show the next day with plans beside today (source: `MediumView` in `OtayoriWidgets.swift`, `Wide` in `NextDayWidget.kt`).
7. **Added**: payments with amounts and method, change notices, repeating items, multi-page PDFs and scans, 明日の持ち物 progress, Mac month export, up to 6 family members, sign-in options; two new FAQ items (payments and change notices; family size).
8. **JSON-LD category** kept as `LifestyleApplication`: Google's supported list has no productivity value, and the app rich result needs real ratings anyway, so the category has no visible effect.

Also done on 2026-11-05: `/privacy/` and `/en/privacy/` now show the app's own policy (last updated 2026-11-05), copied into `src/legal/` by `scripts/sync-legal.mjs` and rendered with the same rules as the app's `tools/site/build_policy_markdown.py`. When the app's policy changes, re-run the script; never edit the copies or restate policy text in marketing copy differently from it. Both pages stay `noindex` until launch.

Updated on 2026-11-13: widgets on iPhone and Android, the document scanner on both phones, Windows as 今後対応予定, and ML Kit named for scanning as well as reading.

Still open:

- **Terms** are synced and rendered the same way (`src/legal/terms_{ja,en}.txt`, last updated 2026-10-27) but held back: they state the free plan's limits and おたよりプラス, which aren't live. `/terms/` shows a placeholder until `TERMS_PUBLISHED` in `src/config.ts` is `true`. A test build with it on matched the app's text line for line.
- **Contact link**: the footer's お問い合わせ still points to the placeholder `hello@otayorin.example`, while the policy names the operator's own email. Decide which address the site should use.
- **Screenshots** predate the latest Home (明日の持ち物 card, 持ち物 progress on rows). They show no app name, so they aren't wrong, just not current.

## Do not claim

- Translation of handouts, or that English speakers can read handouts in English
- AI on Android, or vertical reading on Android as good as on iPhone
- Vertical reading on iOS below 26 or macOS below 26
- Reminders on Mac or Windows, lock screen widgets on Android
- Handout photo sharing or partner push notifications, until switched on
- A web app, a Windows app that's out now (say it's on the way), or school or nursery system integrations (コドモン, 連絡帳アプリ, LINE, Google Classroom, etc.)
- End-to-end encryption, or "nothing ever leaves your device" (true only signed out, and not for ML Kit diagnostics on Android)
- Any user count, rating, review, award, media mention or ranking
- No.1, 業界初, 唯一, 最速, 完全無料, or "forever free"
- That schools, nurseries or local governments endorse or use the app
- Plan prices or limits, until the user says plans are live
- A release date for anything `coming` or `built-off`

## Open questions for the team

- Which otayorin domain will the site use, and is it registered?
- Is vertical reading on macOS 15 to 25 worth testing, or should the site just say macOS 26?
- When is the official release that turns on photo sharing and partner notifications?
- Is there a maximum number of children per family? (6 colours exist; no cap found in code.)
- Do the screenshots in `src/assets/screens/` need retaking for the new name and the newer Home (packing card, 持ち物 progress)?
