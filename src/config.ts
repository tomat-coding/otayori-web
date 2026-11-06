/** Every value still to be replaced before launch lives here. */
export const SITE_URL = "https://otayorin.example";
export const APP_STORE_ID = "APP_STORE_ID";

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
