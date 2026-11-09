/**
 * The send page (/send/, /en/send/): a teacher sends handouts straight to one family's app, from a link the parent
 * made in the app. Texts come from the app repo's docs/plans/S1-school-links.md ("Send page spec").
 * TODO(ja-review): the whole page, and especially the texts marked "not in the spec".
 * `%label%`, `%file%`, `%n%` and `%total%` are filled in by src/scripts/send.ts.
 */
export const ja = {
  title: "おたよりを送る｜おたよりん",
  description: "保護者の方へ、PDFや写真のおたよりを送るページです。アプリやアカウントは要りません。",
  heading: "おたよりを送る",
  switchHref: "/en/send/",
  privacyHref: "/privacy/",
  // Texts the script shows.
  text: {
    loading: "確認しています…",
    readyHeading: "「%label%」へおたよりを送る",
    readyBody: "PDFや写真を選ぶか、ここにドロップしてください（1件10MBまで、10件まで）。",
    choose: "ファイルを選ぶ", // not in the spec
    files: "送るファイル", // not in the spec
    remove: "%file%を外す", // not in the spec
    removeShort: "外す", // not in the spec
    sent: "送信済み", // not in the spec
    nameLabel: "お名前（任意）",
    messageLabel: "メッセージ（任意）",
    send: "送信する",
    sending: "送信中…（%n%/%total%）",
    done: "送信しました。ありがとうございました。",
    linkNotFound: "このリンクは使えません。保護者の方に新しいリンクをお尋ねください。",
    fileRejected: "%file%は送れません（PDF・JPG・PNG・HEIC、10MBまで）。",
    noFiles: "送るファイルを選んでください。", // not in the spec
    tooManyFiles: "一度に送れるのは10件までです。", // not in the spec
    sendingOff: "ただいま送信を受け付けていません。しばらくしてからお試しください。",
    cannotReceive: "ただいま受け付けできません。お手数ですが、紙でお渡しいただくか、しばらくしてからお試しください。",
    tooMany: "短い時間に多く送られたため、しばらくしてからお試しください。",
    network: "送信できませんでした。もう一度お試しください。",
    privacyNote: "送ったファイルはこのご家族だけに届き、受け取られた後、または14日後にサーバーから削除されます。",
    privacyLink: "プライバシーポリシー",
    noscript: "このページを使うには、JavaScriptを有効にしてください。", // not in the spec
    kilobytes: "KB",
    megabytes: "MB",
  },
};

export type SendCopy = typeof ja;
export type SendText = SendCopy["text"];

export const en: SendCopy = {
  title: "Send handouts | Otayorin",
  description: "Send PDF or photo handouts to a family that uses Otayorin. No app or account needed.",
  heading: "Send handouts",
  switchHref: "/send/",
  privacyHref: "/en/privacy/",
  text: {
    loading: "Checking…",
    readyHeading: "Send handouts to “%label%”",
    readyBody: "Choose PDFs or photos, or drop them here (up to 10 MB each, 10 at a time).",
    choose: "Choose files",
    files: "Files to send",
    remove: "Remove %file%",
    removeShort: "Remove",
    sent: "Sent",
    nameLabel: "Your name (optional)",
    messageLabel: "Message (optional)",
    send: "Send",
    sending: "Sending… (%n% of %total%)",
    done: "Sent. Thank you.",
    linkNotFound: "This link doesn't work. Please ask the parent for a new one.",
    fileRejected: "%file% can't be sent (PDF, JPG, PNG or HEIC, up to 10 MB).",
    noFiles: "Choose a file to send.",
    tooManyFiles: "You can send up to 10 files at a time.",
    sendingOff: "Sending is paused right now. Please try again later.",
    cannotReceive: "We can't take files right now. Please hand it over on paper, or try again later.",
    tooMany: "Too many sent in a short time. Please try again later.",
    network: "Couldn't send. Please try again.",
    privacyNote:
      "Files go only to this family, and are deleted from our server once they've received them, or after 14 days.",
    privacyLink: "Privacy policy",
    noscript: "Please turn on JavaScript to use this page.",
    kilobytes: "KB",
    megabytes: "MB",
  },
};
