import { cache } from "react";
import type { Profile, SiteContent } from "@/lib/content-types";

/** Cache tag for everything fetched from the content API; `app/api/revalidate` invalidates it. */
export const CONTENT_TAG = "site-content";

function config() {
  const apiUrl = process.env.CONTENT_API_URL?.replace(/\/$/, "");
  const slug = process.env.SITE_SLUG;
  if (!apiUrl || !slug) {
    throw new Error("Set CONTENT_API_URL and SITE_SLUG in .env.local (see .env.example).");
  }
  return { apiUrl, slug };
}

const EMPTY_PROFILE: Profile = {
  fullName: "",
  shortName: "",
  greeting: "",
  headline: "",
  subHeadline: "",
  heroDescription: "",
  photo: "",
  resumeUrl: "",
  aboutParagraphs: [],
  traits: [],
  stats: [],
  techBadges: [],
  loaderTagline: "",
  footerTagline: "",
  availability: "",
  contact: { email: "", phone: "", location: "", heading: "", blurb: "" },
  socials: [],
  seo: { title: "", description: "" },
};

/**
 * All of this site's content in one request. Cached in the Next data cache under CONTENT_TAG:
 * the backend calls /api/revalidate after every save, and the hourly revalidate is a safety net.
 * Wrapped in React `cache` so metadata and page share one call per render.
 */
export const getSiteContent = cache(async (): Promise<SiteContent> => {
  const { apiUrl, slug } = config();
  const res = await fetch(`${apiUrl}/public/sites/${slug}`, {
    next: { tags: [CONTENT_TAG], revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`Content API returned ${res.status} for site "${slug}" (${apiUrl})`);
  }
  const { data } = (await res.json()) as { data: SiteContent };
  return { ...data, profile: { ...EMPTY_PROFILE, ...data.profile } };
});

/** Where the browser posts the contact form. Passed to the client as a prop. */
export function getContactEndpoint() {
  const { apiUrl, slug } = config();
  return `${apiUrl}/public/sites/${slug}/messages`;
}
