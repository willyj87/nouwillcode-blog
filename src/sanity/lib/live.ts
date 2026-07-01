// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive } from "next-sanity/live";
import { client } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // No auth tokens configured: only published content is fetched and live
  // events work without drafts. Set these to token strings to enable draft
  // previewing. `false` silences the missing-token warnings.
  serverToken: false,
  browserToken: false,
});
