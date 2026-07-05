/** Canonical production site URL, used for sitemap, robots, and absolute OG URLs. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://nouwillcode.com").replace(
  /\/$/,
  "",
)
