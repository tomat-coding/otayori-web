/** Every value still to be replaced before launch lives here. */

/**
 * Where the site is served. For now it's GitHub Pages under the repository's name, so every page sits under
 * /otayori-web/. When the custom domain arrives: set SITE_URL to it, set BASE_PATH to "/", and add public/CNAME.
 */
export const SITE_URL = "https://tomat-coding.github.io";
export const BASE_PATH = "/otayori-web/";

/** Puts a root path such as "/en/" or "/favicon.svg" under BASE_PATH. Use it for every internal link and file. */
export const withBase = (path: string) => `${BASE_PATH.replace(/\/$/, "")}${path}`;
export const APP_STORE_ID = "APP_STORE_ID";

/**
 * The send page's backend, the `send-handout` Edge Function in each Supabase project. /send/ uses prod; debug builds
 * link to /send/?project=dev. The page refuses any other `project` value. Both origins are also allowed by
 * connect-src in public/_headers and in the send page's own Content-Security-Policy.
 */
export const SEND_HANDOUT_URLS = {
  prod: "https://xnjxvzomllwmpxrbkyqh.supabase.co/functions/v1/send-handout",
  dev: "https://pnbqeqfdrprtbvviogol.supabase.co/functions/v1/send-handout",
} as const;

/**
 * The app's terms describe おたよりプラス and the free plan's limits, so /terms/ shows them only once plans are
 * switched on. Until then it shows a placeholder, and the homepage's early-access copy stays true.
 */
export const TERMS_PUBLISHED = false;

export const LINKS = {
  appStore: "#app-store",
  googlePlay: "#google-play",
  macDownload: "#mac-download",
  contact: "mailto:hello@otayorin.example",
} as const;
