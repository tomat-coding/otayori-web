# Putting content on the site

The site is Astro 7, fully static, Japanese at `/` and English at `/en/`. Read the README for commands. Before adding a page, check whether an earlier page already set a pattern (look in `src/pages/`, `src/i18n/`, `src/content/`); if it did, follow it rather than the sketch below.

## Where copy lives

- `src/i18n/ja.ts` is the source of the landing page copy, and `export type Copy = typeof ja`. `src/i18n/en.ts` must have exactly the same shape, or `astro check` fails the build. Add every key to both.
- Landing sections read their slice of the copy:

| Section                              | Component                             | Copy key                             |
| ------------------------------------ | ------------------------------------- | ------------------------------------ |
| Hero                                 | `Hero.astro`                          | `hero`                               |
| Stats                                | `Stats.astro`                         | `stats`                              |
| Three steps                          | `Steps.astro`                         | `steps`                              |
| Unlimited                            | `Unlimited.astro`                     | `unlimited`                          |
| Features (4 rows, fixed screenshots) | `Features.astro` + `FeatureRow.astro` | `features.reads/calendar/share/find` |
| Use cases                            | `UseCases.astro`                      | `useCases.items`                     |
| Devices                              | `Devices.astro`                       | `devices`                            |
| Trust                                | `Trust.astro`                         | `trust`                              |
| FAQ (also feeds `FAQPage` JSON-LD)   | `Faq.astro`, `Landing.astro`          | `faq.items`                          |
| Get the app                          | `GetApp.astro`                        | `getApp`                             |

- Growing an array (`faq.items`, `useCases.items`, bullets) needs no code. Note `UseCases.astro` colours cards by `nth-child(1–4)`, so a fifth card needs a colour rule.
- A new feature row needs a new key in both copy files, a `FeatureRow` in `Features.astro`, and a screenshot. Rows alternate sides automatically.
- Page title and description for the home page are `meta.title` and `meta.description`.

## Adding a page

### Gaps to close the first time

The layout was built for one page per language. Before the first subpage, fix these, or every subpage will be wrong in ways tests won't catch:

1. **Share titles.** `src/layouts/Base.astro` always uses `copy.meta.ogTitle` and `copy.meta.ogImage`. Add optional `ogTitle` and `ogImage` props (defaulting to the current values, and `ogTitle` falling back to `title`) so each page shares with its own headline.
2. **Language switch.** `Header.astro` links to `copy.nav.switchHref`, which is always the other home page. Add an optional prop for the equivalent page's path, and pass it from pages that have a translation.
3. **Links to the new pages.** Nothing links to subpages yet. Add a hub link from the relevant home section and a footer link (with copy keys in both languages), or the pages won't be found or crawled well.
4. **Font subset.** `scripts/subset-font.mjs` keeps only characters found in `src/{i18n,pages,components}/**/*.{ts,astro}`. Headings use that font. If content lives anywhere else (for example `src/content/**/*.md`), add that path to the glob, or new kanji in headings fall back to the system font.

### Recommended pattern

For a handful of structured pages (features, use cases):

- Copy module per page, for example `src/i18n/pages/read-handouts.ts`, exporting `{ ja, en }` with a shared type so both languages must match. Keep title, description, `h1`, lead, sections, FAQ and image alt text there.
- One shared component per page type (for example `src/components/FeaturePage.astro`) that renders `Base` (with `title`, `description`, `alternates`), `Header`, `main`, `Footer`, and the breadcrumb JSON-LD in the `head` slot.
- Thin route files: `src/pages/features/read-handouts.astro` and `src/pages/en/features/read-handouts.astro`, each passing the right language.

For many long-form guides, use a content collection instead:

- `src/content.config.ts` with `defineCollection` from `astro:content`, the `glob()` loader from `astro/loaders` and `z` from `astro/zod`. Store Markdown at `src/content/guides/ja/<slug>.md` and `src/content/guides/en/<slug>.md` with frontmatter for title, description, published and updated dates.
- Dynamic routes `src/pages/guides/[slug].astro` and `src/pages/en/guides/[slug].astro` with `getStaticPaths`.
- Set `alternates` only when the other language has the same slug.
- Update the font subset glob (gap 4).

### Every new page

- Pass `alternates={{ ja: "/features/x/", en: "/en/features/x/" }}` to `Base` when both languages exist; omit it otherwise. Same slug in both languages also lets `@astrojs/sitemap` pair them.
- Exactly one `h1`. `lang` comes from the copy.
- Breadcrumb JSON-LD in the head slot, built from `SITE_URL`, as the landing page does for its schemas:

```astro
<Fragment slot="head">
  <script is:inline type="application/ld+json" set:html={JSON.stringify(breadcrumbs)} />
</Fragment>
```

- Internal links are root-relative and end in `/` (`trailingSlash: "always"`). Never hard-code the domain; `SITE_URL` is still a placeholder.
- No client JavaScript: the tests fail on any `<script>` that isn't JSON-LD. Use `<details>` for expandable content, as the FAQ does.
- Screenshots go in `src/assets/screens/` and render through `Screen.astro` or `PhoneFrame.astro`, with alt text from the copy.
- The sitemap picks up new pages automatically. Only privacy and terms are filtered out.
- Share images: `public/og-ja.png` and `og-en.png` come from `scripts/make-images.mjs` (Mac only, uses Hiragino). Reuse them, or extend the script for page-specific images.

## Tests

`tests/site.spec.ts` covers `/` and `/en/`. Leave those expectations alone (they assert exactly `MobileApplication` and `FAQPage` JSON-LD). For new pages, add a separate loop that checks: the `lang` attribute, one `h1` with the expected text, no sideways scroll, no client JavaScript, a unique `<title>`, the canonical link, hreflang links when the page has a pair, JSON-LD that parses with the expected `@type`s, and no axe violations. Tests run against `astro preview` at both phone and desktop sizes.

## Verify

```bash
npm run format
```

```bash
npm run build
```

```bash
npm run lint
```

```bash
npm test
```

`npm run build` runs the font subset, `astro check` (catches copy-shape mismatches) and the build. `npm test` needs `npx playwright install chromium` once.

Then look at the real page: start the `site` preview from `.claude/launch.json` (it serves the last build, so build first), open each new or changed page in both languages, and check the title, description, canonical, hreflang, JSON-LD, headings and links in the rendered HTML, plus the layout at phone width.

## Before launch (not this skill's job, but don't break it)

`src/config.ts` holds placeholders for the domain, store IDs and links. Privacy and terms pages stay `noindex` until launch. The privacy policy and terms are the app's own texts in `src/legal/`, refreshed with `scripts/sync-legal.mjs`; never edit them here. The terms stay behind `TERMS_PUBLISHED` until plans go live. Don't remove `noindex` or fill placeholders as part of content work unless the user asks.
