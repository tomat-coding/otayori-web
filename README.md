# おたよりん website

Static marketing site for the Otayorin (おたよりん) app. Japanese at `/`, English at `/en/`. Built with Astro; ships no client JavaScript and no analytics.

Needs Node 24 (`.nvmrc`).

```bash
npm install
npm run dev
```

```bash
npm run build
```

```bash
npm run lint
```

```bash
npx playwright install chromium && npm test
```

- **Publishing:** GitHub Pages serves the `gh-pages` branch. Run `npm run lint && npm test`, then `npm run deploy` (builds and pushes `dist/` to `gh-pages`). `public/.nojekyll` must stay, or Pages hides the `_astro/` folder.
- **Address:** the site lives at `https://tomat-coding.github.io/otayori-web/`, so every internal link goes through `withBase()` in `src/config.ts`. When the custom domain arrives, set `SITE_URL` to it and `BASE_PATH` to `"/"`, add `public/CNAME` containing the domain, and set the domain in the repo's Settings → Pages.
- **Before launch:** replace the placeholders in `src/config.ts`. The privacy and terms pages stay `noindex` until `noindex` is removed from `src/components/LegalPage.astro`.
- **Privacy policy and terms:** the app's own texts, in `src/legal/`. After the app's legal texts change, copy them again with `node scripts/sync-legal.mjs <path to the app repo>`. Don't edit the copies by hand.
- **Terms go live with the paid plan:** they describe おたよりプラス and the free plan's limits, so `/terms/` shows a placeholder until `TERMS_PUBLISHED` in `src/config.ts` is set to `true`. Do that when plans are switched on, together with the homepage's early-access copy (the `earlyAccess` section and FAQ in `src/i18n/`).
- **Tests and a running dev server:** `npm test` reuses whatever holds port 4321. If `npm run dev` is running there, stop it first, or the tests can't connect.
- **Copy:** `src/i18n/ja.ts` is the source. `en.ts` must match its shape, or the build fails.
- **Heading font:** `scripts/subset-font.mjs` runs before each build and keeps only the characters the site uses.
- **Icons and share images:** `node scripts/make-images.mjs`, on a Mac.
- **Hosting:** the `dist/` folder suits any static host. `public/_headers` sets security headers on Cloudflare Pages and Netlify.
