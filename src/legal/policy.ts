/**
 * Reads the app's legal texts (`src/legal/*.txt`, copied by `scripts/sync-legal.mjs`) with the same rules as the
 * app's `tools/site/build_policy_markdown.py`: the title on line 1, 「最終更新日：…」/「Last updated: …」, numbered
 * sections (「1. …」), sub-headings (「(1) …」), list lines (「・…」 / 「- …」) and one paragraph per other line.
 * One difference: a 「(1) …」 line that ends a sentence (。 or .) is a numbered clause, as in the terms, so it stays
 * a paragraph. The privacy policy's sub-headings don't end that way, so it reads the same as the app's script.
 */

/** A run of text, or a link when `href` is set. */
export interface Inline {
  text: string;
  href?: string;
}

export type Block =
  | { kind: "section"; text: string }
  | { kind: "subsection"; text: string }
  | { kind: "paragraph"; parts: Inline[] }
  | { kind: "list"; items: Inline[][] };

export interface Policy {
  title: string;
  updated?: string;
  blocks: Block[];
}

const SECTION = /^\d+\.\s/;
const SUBSECTION = /^\(\d+\)\s/;
const UPDATED = /^(最終更新日|Last updated)/;
const LIST_ITEM = /^(・|- )/;
// URLs stop at brackets, ASCII or full-width, so 「（https://…）」 and "(https://…)." link only the address.
const LINK = /https?:\/\/[A-Za-z0-9\-._~:/?#@!$&'*+,;=%]+|[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;

/** Bare URLs and email addresses become links, as GitHub does for the app's Markdown copy. */
export function linkify(text: string): Inline[] {
  const parts: Inline[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const link = match[0].replace(/[.,;:!?]+$/, "");
    if (match.index > last) parts.push({ text: text.slice(last, match.index) });
    parts.push({ text: link, href: link.startsWith("http") ? link : `mailto:${link}` });
    last = match.index + link.length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

export function parsePolicy(text: string): Policy {
  const [title = "", ...lines] = text.trim().split(/\r?\n/);
  const policy: Policy = { title: title.trim(), blocks: [] };
  let list: Inline[][] | undefined;
  for (const raw of lines) {
    const line = raw.trim();
    if (LIST_ITEM.test(line)) {
      const item = linkify(line.replace(LIST_ITEM, "").trim());
      if (list) {
        list.push(item);
      } else {
        list = [item];
        policy.blocks.push({ kind: "list", items: list });
      }
      continue;
    }
    list = undefined;
    if (!line) continue;
    if (SECTION.test(line)) {
      policy.blocks.push({ kind: "section", text: line });
    } else if (SUBSECTION.test(line) && !/[。.]$/.test(line)) {
      policy.blocks.push({ kind: "subsection", text: line });
    } else if (UPDATED.test(line) && policy.updated === undefined) {
      policy.updated = line;
    } else {
      policy.blocks.push({ kind: "paragraph", parts: linkify(line) });
    }
  }
  return policy;
}
