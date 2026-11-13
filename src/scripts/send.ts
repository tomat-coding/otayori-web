// The send page's behaviour: read the link from the address, ask the send-handout function who it's for, then send
// the chosen files one request at a time. The API is in the app repo's docs/plans/S1-school-links.md.
import { SEND_HANDOUT_URLS } from "../config";
import type { SendText } from "../i18n/pages/send";

/** 20 characters from abcdefghijkmnpqrstuvwxyz23456789 (no l, o, 0 or 1). */
const TOKEN = /^[a-kmnp-z2-9]{20}$/;
const MAX_BYTES = 10 * 1024 * 1024;
const MAX_FILES = 10;
const TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/heic", "image/heif"]);
// Some browsers give HEIC photos no type; the function checks every file's first bytes anyway.
const EXTENSIONS = /\.(pdf|jpe?g|png|heic|heif)$/i;
const LOOKUP_TIMEOUT_MS = 20_000;
const UPLOAD_TIMEOUT_MS = 5 * 60_000;

type Item = { file: File; state: "waiting" | "sending" | "sent" | "rejected"; progress: number };
/** The function's JSON answer, when there is one. */
type Reply = { label?: unknown; ok?: unknown; error?: unknown } | null;
/** What a send's answer means: carry on with the next file, or stop the send and say why. */
type Outcome = { kind: "sent" } | { kind: "rejected" } | { kind: "stop"; message: keyof SendText };

const text = JSON.parse(document.getElementById("send-text")!.textContent!) as SendText;
const forLine = document.getElementById("send-for")!;
const status = document.getElementById("send-status")!;
const alert = document.getElementById("send-alert")!;
const form = document.getElementById("send-form") as HTMLFormElement;
const drop = document.getElementById("send-drop")!;
const picker = document.getElementById("send-files") as HTMLInputElement;
const list = document.getElementById("send-list")!;
const nameField = document.getElementById("send-name") as HTMLInputElement;
const messageField = document.getElementById("send-message") as HTMLTextAreaElement;
const button = document.getElementById("send-button") as HTMLButtonElement;

let items: Item[] = [];
let sending = false;

const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/%(\w+)%/g, (whole, key: string) => (key in values ? String(values[key]) : whole));

function say(message: string, done = false) {
  status.textContent = message;
  status.classList.toggle("done", done);
}

function warn(message: string) {
  alert.textContent = message;
}

/** The link can't be used at all: say why and leave only the message. */
function fail(message: keyof SendText) {
  say("");
  warn(text[message]);
  form.hidden = true;
}

function functionUrl(): string | null {
  const project = new URLSearchParams(location.search).get("project");
  if (project === null) return SEND_HANDOUT_URLS.prod;
  if (project === "dev") return SEND_HANDOUT_URLS.dev;
  return null;
}

// The language switch keeps the link, so the other language opens the same send page.
for (const link of document.querySelectorAll<HTMLAnchorElement>("header a.switch")) {
  link.href = link.pathname + location.search + location.hash;
}
// Opening another family's link in this tab starts again with that link.
window.addEventListener("hashchange", () => location.reload());

const url = functionUrl();
const token = location.hash.slice(1);
if (!url || !TOKEN.test(token)) {
  fail("linkNotFound");
} else {
  void lookUp(url, token);
}

async function lookUp(url: string, token: string) {
  say(text.loading);
  const answer = await call(`${url}?token=${encodeURIComponent(token)}`);
  const label = typeof answer?.body?.label === "string" ? answer.body.label.trim() : "";
  if (answer?.status === 200 && label) {
    forLine.textContent = fill(text.readyFor, { label });
    say("");
    form.hidden = false;
    setUp(url, token);
  } else if (answer?.status === 404) {
    fail("linkNotFound");
  } else if (answer?.status === 503 && answer.body?.error === "sending_off") {
    fail("sendingOff");
  } else {
    fail("cannotReceive");
  }
}

/** A GET with no cookies or referrer; null when there's no answer. */
async function call(url: string): Promise<{ status: number; body: Reply } | null> {
  try {
    const response = await fetch(url, {
      credentials: "omit",
      referrerPolicy: "no-referrer",
      cache: "no-store",
      signal: AbortSignal.timeout(LOOKUP_TIMEOUT_MS),
    });
    return { status: response.status, body: (await response.json().catch(() => null)) as Reply };
  } catch {
    return null;
  }
}

function setUp(url: string, token: string) {
  picker.addEventListener("change", () => {
    add(picker.files);
    picker.value = "";
  });

  // A file dropped anywhere on the page counts, so a near miss doesn't open the file in place of the page.
  window.addEventListener("dragover", (event) => {
    event.preventDefault();
    drop.classList.add("over");
  });
  window.addEventListener("dragleave", (event) => {
    if (!event.relatedTarget) drop.classList.remove("over");
  });
  window.addEventListener("drop", (event) => {
    event.preventDefault();
    drop.classList.remove("over");
    if (!sending) add(event.dataTransfer?.files ?? null);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!sending) void sendAll(url, token);
  });
}

function acceptable(file: File) {
  return file.size > 0 && file.size <= MAX_BYTES && (TYPES.has(file.type) || EXTENSIONS.test(file.name));
}

function add(files: FileList | null) {
  if (!files?.length) return;
  // A new choice after a send starts a new list.
  items = items.filter((item) => item.state === "waiting");
  say("");
  const problems: string[] = [];
  let full = false;
  for (const file of files) {
    if (!acceptable(file)) {
      problems.push(fill(text.fileRejected, { file: file.name }));
    } else if (
      items.some(
        (item) =>
          item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified,
      )
    ) {
      continue;
    } else if (items.length >= MAX_FILES) {
      full = true;
    } else {
      items.push({ file, state: "waiting", progress: 0 });
    }
  }
  if (full) problems.push(text.tooManyFiles);
  warn(problems.join("\n"));
  render();
}

function size(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} ${text.kilobytes}`
    : `${(bytes / (1024 * 1024)).toFixed(1)} ${text.megabytes}`;
}

function render() {
  list.replaceChildren(
    ...items.map((item, index) => {
      const row = document.createElement("li");
      row.className = item.state;
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = item.file.name;
      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent =
        item.state === "sent"
          ? text.sent
          : item.state === "rejected"
            ? fill(text.fileRejected, { file: item.file.name })
            : size(item.file.size);
      row.append(name, meta);
      if (item.state === "sending") {
        const bar = document.createElement("progress");
        bar.max = 100;
        bar.value = item.progress;
        bar.setAttribute("aria-label", item.file.name);
        row.append(bar);
      }
      if (item.state === "waiting" && !sending) {
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = text.removeShort;
        remove.setAttribute("aria-label", fill(text.remove, { file: item.file.name }));
        remove.addEventListener("click", () => {
          items.splice(index, 1);
          render();
          picker.focus();
        });
        row.append(remove);
      }
      return row;
    }),
  );
}

function lock(locked: boolean) {
  sending = locked;
  for (const control of [picker, nameField, messageField, button]) control.disabled = locked;
  button.setAttribute("aria-busy", String(locked));
}

async function sendAll(url: string, token: string) {
  const queue = items.filter((item) => item.state === "waiting");
  if (!queue.length) {
    warn(text.noFiles);
    return;
  }
  warn("");
  lock(true);
  let stop: keyof SendText | null = null;
  for (const [index, item] of queue.entries()) {
    say(fill(text.sending, { n: index + 1, total: queue.length }));
    item.state = "sending";
    item.progress = 0;
    render();
    const outcome = await upload(url, token, item);
    if (outcome.kind === "stop") {
      item.state = "waiting";
      stop = outcome.message;
      break;
    }
    item.state = outcome.kind;
  }
  lock(false);
  render();

  const sent = queue.filter((item) => item.state === "sent").length;
  const rejected = queue.filter((item) => item.state === "rejected");
  if (stop) {
    say("");
    warn(text[stop]);
  } else {
    say(sent ? text.done : "", sent > 0);
    warn(rejected.map((item) => fill(text.fileRejected, { file: item.file.name })).join("\n"));
    if (!rejected.length) {
      // Everything arrived: clear the list and the message, and keep the name for the next send.
      items = [];
      messageField.value = "";
      render();
    }
  }
}

/** Sends one file with XMLHttpRequest, which reports upload progress (fetch doesn't). */
function upload(url: string, token: string, item: Item): Promise<Outcome> {
  const body = new FormData();
  body.append("token", token);
  const name = nameField.value.trim();
  const message = messageField.value.trim();
  if (name) body.append("sender_name", name);
  if (message) body.append("message", message);
  body.append("file", item.file, item.file.name);

  return new Promise((resolve) => {
    const request = new XMLHttpRequest();
    request.open("POST", url);
    request.timeout = UPLOAD_TIMEOUT_MS;
    request.responseType = "text";
    let shown = -1;
    request.upload.addEventListener("progress", (event) => {
      if (!event.lengthComputable) return;
      item.progress = Math.round((event.loaded / event.total) * 100);
      if (item.progress !== shown) {
        shown = item.progress;
        list.querySelector<HTMLProgressElement>("li.sending progress")?.setAttribute("value", String(item.progress));
      }
    });
    request.addEventListener("load", () => resolve(outcome(request.status, parse(request.responseText))));
    // No answer: a dropped connection, a timeout, or a gateway error without CORS headers, which looks the same here.
    const noAnswer = () => resolve({ kind: "stop", message: navigator.onLine ? "cannotReceive" : "network" });
    request.addEventListener("error", noAnswer);
    request.addEventListener("timeout", noAnswer);
    request.addEventListener("abort", noAnswer);
    request.send(body);
  });
}

function parse(body: string): Reply {
  try {
    return JSON.parse(body) as Reply;
  } catch {
    return null;
  }
}

function outcome(status: number, body: Reply): Outcome {
  if (status === 200 && body?.ok === true) return { kind: "sent" };
  if (status === 413 || status === 415) return { kind: "rejected" };
  if (status === 404) return { kind: "stop", message: "linkNotFound" };
  if (status === 429) return { kind: "stop", message: "tooMany" };
  if (status === 503 && body?.error === "sending_off") return { kind: "stop", message: "sendingOff" };
  if (status === 503 && body?.error === "retry") return { kind: "stop", message: "network" };
  // plan_limit, cannot_receive, and anything the page doesn't expect.
  return { kind: "stop", message: "cannotReceive" };
}
