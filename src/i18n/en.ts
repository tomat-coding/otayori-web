import type { Copy } from "./ja";

export const en: Copy = {
  lang: "en",
  siteName: "Otayorin",
  meta: {
    title: "School handout organiser app for parents in Japan | Otayorin",
    description:
      "Photograph school and nursery handouts. Otayorin finds the dates, things to bring, forms and payments for one family calendar. Free in early access.",
    ogTitle: "Turn school handouts into one family calendar",
    ogImage: "/og-en.png",
    ogLocale: "en_US",
  },
  skip: "Skip to content",
  nav: {
    label: "Main",
    getApp: "Get the app",
    switchLabel: "日本語",
    switchHref: "/",
    switchLang: "ja",
    sections: [
      { href: "#how-it-works", label: "How it works" },
      { href: "#features", label: "Features" },
      { href: "#privacy", label: "Privacy" },
      { href: "#early-access", label: "Pricing" },
      { href: "#faq", label: "FAQ" },
    ],
  },
  badges: {
    appStore: "Download on the App Store",
    googlePlay: "Get it on Google Play",
    mac: "Download for Mac",
  },
  hero: {
    pill: "Early access: every feature free for now",
    kicker: "Just snap the handout.",
    title: ["Turn school handouts", "into one family calendar"],
    lead: "Otayorin is an app for parents in Japan. Photograph a school or nursery handout and it finds the dates, the things to bring, the forms to hand in and the payments, then puts them on one calendar for the whole family.",
    reassure: "Ad-free during early access. No account needed to start.",
    alts: {
      calendar: "Otayorin on Android: the family calendar for November with Japanese holidays",
      home: "Otayorin on iPhone: the next form to hand in at the top, then today's and tomorrow's items",
      desktop: "Otayorin for Mac: the week's school items by day, with progress and recent handouts",
    },
  },
  why: {
    title: "Four things that make Otayorin different",
    items: [
      {
        icon: "phone",
        title: "Read on your phone",
        body: "Handouts are read on your phone or Mac itself. The photos aren't sent anywhere to be read.",
      },
      {
        icon: "vertical",
        title: "Vertical text, too",
        body: "Reads vertical (縦書き) handouts on iPhone with iOS 26 or later, and on Mac with macOS 26 or later.",
      },
      {
        icon: "chat",
        title: "Ask, free on every device",
        body: 'Ask "What do we need tomorrow?" and get the answer from your handouts, with no limit, on any device.',
      },
      {
        icon: "family",
        title: "Shared with your partner",
        body: "Both of you see the same schedule, even with an iPhone and an Android phone. Sharing is free.",
      },
    ],
  },
  useCases: {
    title: "Sound familiar?",
    lead: "Handouts come home from school and nursery almost every week. Here's what Otayorin does in four moments most parents know.",
    solutionLabel: "With Otayorin",
    items: [
      {
        icon: "camera",
        tag: "After school",
        title: "Three crumpled handouts at the bottom of the school bag",
        problem:
          "Events, things to bring and forms to hand in, all packed onto one sheet in small print. Working out what matters puts dinner on hold.",
        bullets: [
          "Pick up to 10 photos at once; they're read one by one",
          "Dates, things to bring, forms and payments sorted into items",
          "Only the unclear ones are marked for you to check",
        ],
        link: { label: "See how it works", href: "#how-it-works" },
      },
      {
        icon: "calendar",
        tag: "Start of term",
        title: "One child at school, one at nursery, two sets of dates",
        problem:
          "The school's yearly events table and the nursery's monthly plan. The more paper on the fridge, the harder it is to see what's on which day.",
        bullets: [
          "Every child's events on one month calendar",
          "A colour and a name for each child",
          "Japanese national and substitute holidays already shown",
        ],
        link: { label: "See the family calendar", href: "#family-calendar" },
      },
      {
        icon: "family",
        tag: "School run",
        title: "One parent reads the paper, the other does the morning run",
        problem:
          '"Do they need gym clothes today?" The handout is in the other bag, so every morning starts with texting photos back and forth.',
        bullets: [
          "Items either of you snaps appear on both phones",
          "The packing list shows who got what ready",
          "Works across iPhone and Android",
        ],
        link: { label: "See family sharing", href: "#family-sharing" },
      },
      {
        icon: "clock",
        tag: "The morning after",
        title: "Found in the school bag: the form that was due yesterday",
        problem:
          "Reply slips, materials fees, forms to sign and return. The things with deadlines are exactly the ones that sink to the bottom of the pile.",
        bullets: [
          "The next form or payment due sits at the top of Home",
          "A reminder the evening before, and on the morning if you like",
          "Mark it handed in or paid in one tap",
        ],
        link: { label: "See reminders", href: "#reminders" },
      },
    ],
  },
  steps: {
    title: "From paper to plan in three steps",
    lead: "Snap it, check it, done. Nothing is added until you've looked at it.",
    paper: {
      label: "A Japanese school trip handout with the date, place, things to bring and a consent form deadline",
      title: "秋の遠足のお知らせ",
      intro: "保護者の皆様へ　下記のとおり遠足を行います。",
      lines: [
        "日時　10月23日（金）8:50 現地集合",
        "場所　中央公園",
        "持ち物　お弁当・水筒・レジャーシート",
        "同意書を10月20日（火）までに担任へ提出してください。",
      ],
    },
    items: [
      {
        title: "Snap it",
        body: "Take a photo, or pick photos or PDFs. The camera finds the edges of the page and straightens it. Handouts that arrive by email go straight in from the Share button.",
      },
      {
        title: "Check it",
        body: "Everything Otayorin finds is shown first. Anything unclear, like a hard-to-read date or a weekday that doesn't match, comes first with a one-tap fix. Only what you tick is added.",
      },
      {
        title: "It's on the calendar",
        body: "Items go on the family calendar with a reminder the evening before, and the original photo is kept so you can look back at it.",
      },
    ],
    alts: {
      review:
        "Otayorin's review screen: a consent form and an autumn trip with its packing list found in a trip notice, with each line highlighted on the scan",
      home: "Otayorin on iPhone: Home with a consent form due tomorrow at the top, then today's and tomorrow's items",
    },
  },
  phrases: {
    title: "It knows how school handouts are written",
    lead: "Japanese school and nursery handouts use the same phrases again and again. Otayorin turns each one into the right kind of item. Items keep the handout's Japanese wording: there's no translation.",
    paperLabel: "On the handout",
    appLabel: "In Otayorin",
    items: [
      {
        phrase: "同意書を10月20日（火）までに提出してください",
        gloss: "Please hand in the consent form by Tue 20 Oct",
        kind: "Hand-in (提出, teishutsu)",
        result: "A form to hand in, with its deadline. It also spots sign-and-return slips",
      },
      {
        phrase: "お弁当・水筒・レジャーシートをご用意ください",
        gloss: "Please bring a packed lunch, water bottle and picnic mat",
        kind: "Things to bring (持ち物, mochimono)",
        result: "A packing checklist on the event",
      },
      {
        phrase: "教材費は11月10日に口座から引き落とします",
        gloss: "The materials fee will be debited from your account on 10 Nov",
        kind: "Payment (集金, shūkin)",
        result: "A payment with its due date, plus the amount and method when the handout gives them",
      },
      {
        phrase: "台風が近づいているため、明日の遠足は中止します",
        gloss: "Tomorrow's trip is cancelled because a typhoon is coming",
        kind: "Cancelled or postponed (中止・延期)",
        result: "Finds the item already on your calendar and offers to move or remove it. You confirm first",
      },
      {
        phrase: "毎週金曜日は、体操服を持たせてください",
        gloss: "Please send gym clothes every Friday",
        kind: "Repeating (毎週・毎月)",
        result: "A weekly item that skips national holidays",
      },
      {
        phrase: "雨天の場合は、10月27日（火）に延期します",
        gloss: "If it rains, it moves to Tue 27 Oct",
        kind: "Rain date (予備日)",
        result: "Kept as a note on the event, not a separate item",
      },
    ],
    alsoTitle: "It also reads",
    also: [
      "Yearly and monthly event tables",
      "Two-column class newsletters",
      "Reiwa years and kanji numerals in dates",
      "PDFs and scans of up to 10 pages, as one handout",
      "Vertical text (縦書き)",
    ],
    note: "Vertical text is read on iPhone with iOS 26 or later and Mac with macOS 26 or later. Earlier versions can't read it, so you'd add those items by hand.",
    alt: "Otayorin on iPhone: a reply slip and a parents' meeting with its date and things to bring, read from a vertical handout",
  },
  features: {
    title: "After the reading, the rest of your week",
    lead: "From packing for tomorrow to sharing with your partner, here's what Otayorin does day to day.",
    paidChip: "May become partly paid later",
    week: {
      title: "This week, at a glance",
      body: "Home shows today, tomorrow and the rest of the week, with the forms and payments that need doing at the top. Mark them handed in or paid in one tap.",
      bullets: [
        "Tomorrow's things to bring, with how much is packed",
        "Mark items done (完了) when they're finished",
        "Filter to one child",
      ],
      alt: "Otayorin on Android: Home with a consent form due tomorrow, then the week's items for each child",
      platforms: ["iPhone", "Android", "Mac"],
    },
    calendar: {
      title: "One calendar for the whole family",
      body: "Brothers' and sisters' events, nursery and school, all in one month view. Weeks start on Sunday, and Japanese national and substitute holidays are shown.",
      bullets: [
        "A colour and a name for each child",
        "Tap a day to see it and add to it",
        "Weekly and monthly repeating items",
      ],
      alt: "Family calendar for November on iPhone, with each child's initial under their busy days",
      platforms: ["iPhone", "Android", "Mac"],
    },
    ask: {
      title: "Ask about your handouts",
      body: 'Ask "What do we need tomorrow?" or "What time do we meet for the trip?" and Otayorin answers from your schedule and your handouts. Type "Add gym clothes for Friday" and it drafts the item for you to confirm.',
      bullets: [
        "Free on every device, with no limit",
        "Answers link to the items and handouts they came from",
        "Answers are made on your device, and questions aren't sent anywhere",
      ],
      note: "On iPhone (iOS 26 or later) and Mac (macOS 26 or later) with Apple Intelligence, you can ask in your own words. On other devices, answers come as quick lists from your schedule and handouts. AI answers can be wrong, so check the handout too.",
      alt: "A question about what to bring on the autumn trip, answered with a link to the item",
      platforms: ["iPhone", "Android", "Mac"],
    },
    documents: {
      title: "Lost the paper? It's still here",
      body: "Every handout you snap is kept in Documents. Search by title or by any word in the handout, and zoom into the original whenever you need it.",
      bullets: [
        "Search the words inside your handouts",
        "Jump from any item back to its handout",
        "Multi-page PDFs stay together as one handout",
      ],
      alt: "Documents screen with a search field and a saved handout",
      platforms: ["iPhone", "Android", "Mac"],
    },
    reminders: {
      title: "A nudge the evening before, and on the morning",
      body: "Things to bring, forms and payments get a reminder the evening before, and you can add one on the morning, at times you choose. Reminders due together arrive as one, and the lock screen never shows your child's name or your notes.",
      platforms: ["iPhone", "Android"],
      mock: {
        label: "Example lock screen notifications: 3 things for tomorrow, and a consent form due tomorrow",
        app: "Otayorin",
        time: "20:00",
        summary: "3 things for tomorrow",
        summaryBody: "体操服, 水筒 and 1 more",
        single: "Tomorrow: 遠足の同意書",
        singleBody: "Due tomorrow",
      },
    },
    teachers: {
      title: "Handouts sent straight from teachers",
      soon: "On the way",
      body: "Give a teacher or a lessons class a link, and they can send handouts (PDFs or photos) straight to the app. They open the link in any browser and choose the file. Nothing to install, no sign-up.",
      bullets: [
        "Handouts arrive on Home, with the teacher's name and message",
        "Read them into the usual check screen, and add them once you've checked",
        "A link and QR code for each sender: school, nursery, lessons",
        "Stop a link any time you no longer need it",
      ],
      note: "Anyone with a link can send through it, so give links only to people you trust. Making a link needs an account. Files are deleted from our server once you've received them, or after 14 days. Whether a teacher can send files this way depends on the school's or nursery's own rules.",
      platforms: ["iPhone", "Android", "Mac"],
      mock: {
        label:
          "Example of handouts received on Home: a school trip notice from Ms Tanaka of Sakura class, and a recital notice from piano lessons",
        title: "Handouts received: 2",
        entries: [
          { sender: "田中 · さくら組", file: "遠足のお知らせ.pdf", message: "“金曜の持ち物も書いてあります”" },
          { sender: "ピアノ教室", file: "発表会のご案内.jpg", message: "" },
        ],
        read: "Read",
      },
    },
    small: [
      {
        icon: "qr",
        title: "Share the schedule with your partner",
        body: "Invite family with a code, link or QR code. New items and every tick show up on everyone's phone, with who ticked what. Sharing with your partner is planned to stay free.",
        platforms: ["iPhone", "Android", "Mac"],
      },
      {
        icon: "calendarPlus",
        title: "Add it to the calendar you already use",
        body: "Send any item to your iPhone or Android calendar in one tap, without giving Otayorin access to your calendar. On the Mac, export a whole month at once.",
        platforms: ["iPhone", "Android", "Mac"],
      },
      {
        icon: "widget",
        title: "Today and tomorrow on your Home Screen",
        body: "Widgets show today's items and what to get ready without opening the app, and switch to tomorrow after 3pm. On iPhone they work on the Lock Screen too.",
        platforms: ["iPhone", "Android"],
      },
    ],
  },
  devices: {
    title: "iPhone, Android and Mac",
    lead: "Sign in and every device shows the same schedule, even if one parent has an iPhone and the other an Android phone.",
    columns: ["iPhone", "Android", "Mac"],
    mac: {
      title: "The Mac app, in early access too",
      body: "See the week, the month and all your handouts on a big screen. Drag PDFs and photos from email straight into the window. Sign in by scanning a QR code with your signed-in phone. Reminders come to your phone. A Windows version is on the way.",
      alt: "Otayorin for Mac: the month calendar, with the selected day's items beside it",
    },
    needsLabel: "Requirements",
    needs: ["iPhone: iOS 17 or later", "Android: Android 9 or later", "Mac: macOS 14 or later", "Windows: on the way"],
    caption: "Real screens with sample data, shown in Japanese. The app also comes in English.",
  },
  trust: {
    title: "Your family's information stays your family's",
    lead: "Handouts are read on your device, and the photos aren't sent anywhere to be read.",
    items: [
      {
        icon: "phone",
        title: "No account needed",
        body: "On iPhone and Android, read handouts, keep your schedule and get reminders without signing in. Signed out, your handouts and schedule stay on your device only.",
      },
      {
        icon: "lock",
        title: "Sign in only to share",
        body: "You sign in only to share with family or to use the Mac. Your schedule is then stored on servers in Tokyo, encrypted in transit and at rest. Handout photos aren't shared.",
      },
      {
        icon: "ban",
        title: "No tracking",
        body: "Nothing in the app tracks what you do, and there are no analytics tools. On Android, Google's ML Kit, which does the scanning and reading, sends Google diagnostics, but never your photos or their text.",
      },
      {
        icon: "trash",
        title: "Delete everything, any time",
        body: "From Settings, delete the data on your device, or your account and all its data.",
      },
    ],
    link: "Read the privacy policy",
  },
  earlyAccess: {
    badge: "Early access",
    title: "Early access: every feature is free for now",
    lead: "Otayorin is in early access on iPhone, Android and Mac, and every feature is free while it lasts. We're still building it, so you may spot some rough edges.",
    freeTitle: "Planned to stay free",
    freeItems: [
      "Reading handouts into your schedule",
      "The family calendar and packing checklists",
      "Reminders",
      "Keeping and searching handouts",
      "Ask about your handouts, with no limit",
      "Sharing the schedule with your partner",
    ],
    paidTitle: "Planned for the paid plan, おたよりプラス (Otayori Plus)",
    paidItems: [
      "Sharing with more family, like grandparents or a babysitter",
      "Reading PDFs and scans with several pages",
      "Widgets on iPhone and Android",
      "Sharing handout photos with family (coming with the official release)",
      "More teacher links, and more handouts from teachers each month (a feature on the way)",
      "The desktop app (Mac, with Windows on the way)",
      "No ads (the free plan may show ads)",
    ],
    footnote:
      "The paid plan is planned to cover the whole household. Prices and details will be announced on this page once they're decided. During early access, there are no ads and everything above is free.",
    feedback: ["Found a problem or have an idea? ", "Get in touch", "."],
  },
  faq: {
    title: "Questions from parents",
    items: [
      {
        q: "Is Otayorin free?",
        a: "Yes. During early access, every feature is free on iPhone, Android and Mac. After the official release, reading handouts, the calendar, reminders, Ask about your handouts and sharing the schedule with your partner are planned to stay free.",
      },
      {
        q: "Which features will become paid?",
        a: "After the official release, sharing with more family than your partner (grandparents or a babysitter, say), reading multi-page PDFs and scans, widgets, sharing handout photos with family, more teacher links and more handouts from teachers each month, and the desktop app (Mac, and Windows once it's out) are planned for the paid plan, おたよりプラス (Otayori Plus). Prices and details will be announced once they're decided.",
      },
      {
        q: "Will there be ads?",
        a: "Not during early access. After the official release, the free plan may show ads. おたよりプラス (Otayori Plus) is planned to stay ad-free.",
      },
      {
        q: "What does early access mean?",
        a: "You can use the app before its official release. Every feature is free, but it's still being built, so some parts may be unstable and some features may change.",
      },
      {
        q: "Can it read vertical Japanese handouts?",
        a: "Yes, on iPhone with iOS 26 or later and Mac with macOS 26 or later. Earlier versions can't read vertical text, so you'd add those items by hand.",
      },
      {
        q: "Does it handle school payments and cancelled events?",
        a: "Yes. For payments (集金), it adds the amount and how to pay (bank debit, cash or transfer) when the handout says, and reminds you the evening before. Photograph a notice that cancels or moves an event, and it finds the item you already have and offers to move or delete it. Nothing changes until you confirm.",
      },
      {
        q: "Does it work for nursery and kindergarten handouts?",
        a: "Yes. It's built for handouts from schools and nurseries, and you can add a class for each child.",
      },
      {
        q: "Are my photos or schedule sent anywhere?",
        a: "Handouts are read on your device, so the photos and their text aren't sent anywhere to be read. If you sign in and share with family, your schedule is stored on servers in Tokyo. On Android, Google's ML Kit, which does the scanning and reading, sends Google diagnostics.",
      },
      {
        q: "Do I need an account?",
        a: "Not on iPhone or Android. You only need to sign in to share with family, sync your own devices, or use the Mac app. Use an Apple or Google account on iPhone, and a Google account on Android. The Mac app signs in when you scan its QR code with your signed-in phone.",
      },
      {
        q: "How many people can share one family?",
        a: "During early access, up to 6 people can join one family. After the official release, sharing with your partner stays free, and adding more family, such as grandparents, is planned for おたよりプラス (Otayori Plus). iPhones and Android phones can mix, and each person sets their own reminder times on their own phone.",
      },
      {
        q: "Are there limits on storage or questions?",
        a: "Ask about your handouts is free on every plan, with no limit. Handouts have no app-side limit either: you can keep as many as your device can hold.",
      },
      {
        q: "Which devices can use Ask about your handouts?",
        a: "iPhone, Android and Mac. With Apple Intelligence (iPhone on iOS 26 or later, Mac on macOS 26 or later) you can ask in your own words; on other devices, answers come as quick lists from your schedule and handouts. Both are free, and what you ask never leaves the device.",
      },
      {
        q: "Does it work on a Windows PC?",
        a: "A Windows version is on the way. For now, the computer app is for Mac (macOS 14 or later), and you start it by scanning a QR code with your signed-in phone. We'll announce it on this page when Windows is ready.",
      },
      {
        q: "Does it translate handouts into English?",
        a: "No. The app comes in Japanese and English, but items keep the Japanese wording from the handout.",
      },
    ],
  },
  getApp: {
    title: "Try it on this week's handouts",
    early: "Every feature is free during early access.",
    earlyLink: "About early access",
  },
  footer: {
    label: "Footer",
    copyright: "© 2026 Otayorin",
    privacy: "Privacy",
    privacyHref: "/en/privacy/",
    terms: "Terms",
    termsHref: "/en/terms/",
    accountDeletion: "Delete your account",
    accountDeletionHref: "/en/account-deletion/",
    contact: "Contact",
    trademarks:
      "Apple, the Apple logo and App Store are trademarks of Apple Inc. Google Play and the Google Play logo are trademarks of Google LLC.",
  },
};
