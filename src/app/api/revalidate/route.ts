import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { CONTENT_TAG } from "@/lib/content";

function secretMatches(given: string | null) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Called by portfolio-backend after every content change in the admin dashboard
 * (`POST` with `x-revalidate-secret`). Expires the cached content so the next visit is fresh.
 */
export async function POST(request: NextRequest) {
  if (!secretMatches(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ revalidated: false, message: "Invalid secret" }, { status: 401 });
  }
  // `expire: 0` (not "max"): an external webhook should show the new content on the very next request.
  revalidateTag(CONTENT_TAG, { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
