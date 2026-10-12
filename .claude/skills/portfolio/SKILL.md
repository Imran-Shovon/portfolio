---
name: portfolio
description: Conventions for Md Shovon Biswas's Next.js 16 + Tailwind v4 + GSAP portfolio, whose content comes from the portfolio-backend API and is edited in the portfolio-admin dashboard. Use when adding or editing a section (Hero, About, Skills, Experience, Projects, Education, Research, Contact), changing how content is fetched or rendered, the contact form, revalidation, theme colors/tokens, or animations in this repo.
---

# Portfolio project guide

A personal portfolio: the home page (`src/app/page.tsx`) stacks section components, and `/projects` lists every project. **All content comes from the content API** (`../portfolio-backend`, site slug `shovon`) and is edited in the admin dashboard (`../portfolio-admin`). Components hold no content, only markup and animation. There are no tests in this repo.

## How content flows

1. `src/lib/content.ts` → `getSiteContent()` fetches `GET ${CONTENT_API_URL}/public/sites/${SITE_SLUG}` on the server, cached with tag `site-content` (hourly fallback revalidation). Wrapped in React `cache`, so metadata and page share one request.
2. Server pages (`app/page.tsx`, `app/projects/page.tsx`) and `generateMetadata` in `layout.tsx` call it and pass slices to the `"use client"` section components as props.
3. A section whose `site.sections[key]` is `false` isn't rendered, and `getNavLinks(sections)` (`src/lib/navigation.ts`) drops its navbar/footer link. `/projects` 404s when projects are off.
4. After every save in the dashboard, the backend `POST`s `/api/revalidate` with `x-revalidate-secret`. `app/api/revalidate/route.ts` checks it against `REVALIDATE_SECRET` and calls `revalidateTag("site-content", { expire: 0 })`.
5. The Contact form `POST`s from the browser to `${CONTENT_API_URL}/public/sites/${SITE_SLUG}/messages` (the URL is passed down as the `endpoint` prop). The API only accepts origins listed in the site's **Allowed origins** (dashboard → Site settings); messages appear under Messages in the dashboard.
6. `app/error.tsx` shows "Content is unavailable" if the API can't be reached. **`npm run build` needs the API running**, because pages are prerendered from it.

Env (`.env.local`, template in `.env.example`): `CONTENT_API_URL`, `SITE_SLUG`, `REVALIDATE_SECRET`. Types for the payload live in `src/lib/content-types.ts`; change them together with the backend.

## Stack

- **Next.js 16.2 (App Router), React 19.2, TypeScript (strict).** This Next.js version has breaking changes. Before using any Next API (routing, metadata, `next/image`, `next/font`, config), read the matching guide in `node_modules/next/dist/docs/01-app/`.
- **Tailwind CSS v4**, configured CSS-first in `src/app/globals.css` (`@import "tailwindcss"`, `@theme`, `@utility`). There is **no `tailwind.config.*` file**, so don't create one.
- **GSAP 3 + ScrollTrigger** for all motion. `@gsap/react` is installed but not used.
- **lucide-react v1** for icons. v1 dropped brand icons, so GitHub and LinkedIn are inline SVGs in `src/components/icons.tsx`. Add new brand icons there.
- `cn()` in `src/lib/utils.ts` (clsx + tailwind-merge) exists but is currently unused.
- Fonts: `Inter` → `--font-inter` (body) and `Sora` → `--font-sora` (headings), set up in `src/app/layout.tsx`.
- Path alias: `@/*` → `src/*`.

## File map

| File | Role |
|---|---|
| `src/app/layout.tsx` | html/body, fonts, `generateMetadata` (from the profile's SEO fields), wraps children in `ThemeProvider`. `<html data-theme="dark">` is the SSR default. |
| `src/app/page.tsx` | Async server component: fetches content, composes `PageLoader`, `BackToTop`, `Navbar`, the enabled sections, then `Footer`. |
| `src/app/projects/page.tsx` | All projects (`<Projects>` without `limit`). |
| `src/app/api/revalidate/route.ts` | Revalidation webhook for the backend. |
| `src/lib/content.ts` / `content-types.ts` | API fetch + payload types. |
| `src/lib/navigation.ts` | `getNavLinks(sections)`: the single list of navbar/footer links. |
| `src/lib/icons.ts` | Icon name → lucide component for skill categories and About stats. Must match `portfolio-admin/src/lib/icons.ts`. |
| `src/components/BrandName.tsx` | Logo text ("S" accent + rest + cyan dot) from `profile.shortName`. |
| `src/components/SocialIcon.tsx` | Icon and hover color per social platform. |
| `src/app/globals.css` | Design tokens (dark and light), glass utilities, tech ticker CSS, light-mode overrides, keyframes. |
| `src/components/ThemeProvider.tsx` | `useTheme()` returns `{ theme, setTheme }`, with `"dark" \| "light" \| "system"`. Persists to `localStorage["portfolio-theme"]` and sets `data-theme` on `<html>`. |
| `src/components/ScrollReveal.tsx` | `ScrollReveal` (fade/slide wrapper) and `TextReveal` (clip-path heading reveal). |
| `src/components/Navbar.tsx` | Fixed header, `links`/`brand` props, scroll-spy active state, theme dropdown (desktop and mobile copies), Resume link. |
| `src/components/Footer.tsx` | Brand, tagline, socials, quick links, contact snippet (all from props). |
| `src/components/<Section>.tsx` | One file per section. Receives its data as props; no hardcoded content. |
| `public/image/` | Seeded images: `shovon.jpeg`, `project/*.png`, `paper/*.png`. Content may point here with root-relative paths; images uploaded in the dashboard are served by the API (`next.config.ts` allows its `/uploads/**`). |

## Where content lives

Content is edited in the **admin dashboard** (http://localhost:3001), not in code:

| On the site | Dashboard |
|---|---|
| Hero greeting, headline, sub-headline, description, photo, loader tagline | Profile → Hero |
| Bio paragraphs, traits, stats; name used in logo/footer | Profile → About |
| Skills ticker words | Profile → Skills ticker |
| Contact heading/blurb, email, phone, location, socials, footer tagline, availability | Profile → Contact & socials |
| Resume button | Profile → Resume (empty hides the button) |
| Page title / description | Profile → SEO |
| Skill bars, jobs, projects, degrees, papers | Skills / Experience / Projects / Education / Publications (reorder, hide, edit) |
| Which sections exist | Site settings → Visibility |

Section headings ("Who I Am", "My Work", …) and layout are still code.

## Component conventions

Match these when writing new code:

- Every component starts with `"use client"` and uses a **named export** (`export function Research()`). Don't use default exports, except for the app route files.
- **No content in components.** Take data as props typed from `@/lib/content-types`. Server pages fetch with `getSiteContent()` and pass slices down. Key lists by the item's `id`, and include the data prop in the GSAP `useEffect` deps so animations re-bind when content changes.
- Optional content must degrade: hide a button or block when its value is `""` (resume, live/GitHub links, paper URL, ResearchGate, contact items), never render an empty link.
- Imports go through `@/components/...`.
- **Colors come from CSS variables in inline `style={{}}`**, not from Tailwind color classes. For example: `style={{ color: "var(--color-accent-blue)" }}`, `style={{ background: "var(--tag-bg)", border: "1px solid var(--border)" }}`. Tailwind handles layout, spacing, typography and radius.
- **Hover effects mutate inline styles** in `onMouseEnter`/`onMouseLeave` handlers, then reset to the token on leave:
  ```tsx
  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accent}40`)}
  onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
  ```
- Cards use the `glass-card` utility with `rounded-2xl` and `p-6` (or `p-8`).
- Tinted chips and icon backgrounds use the hex-alpha suffix trick: `${accent}15` for backgrounds, `${accent}25` for borders, `${accent}40` for hover borders, `${accent}60` for glows. **This only works when `accent` is a hex value** (see Gotchas).
- Images use `next/image` with `fill`, a `sizes` value, and a `relative` sized parent. Put files under `public/image/`.
- Modals follow the pattern in `Research.tsx`: a `selected` state, `role="dialog" aria-modal`, closing on Escape and backdrop click, and `document.body.style.overflow = "hidden"` while open.

## Section template

Every section shares this skeleton. Copy it for a new one:

```tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/ScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const items = [/* ... */];

export function NewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current?.children ? Array.from(cardsRef.current.children) : [],
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="newsection" ref={sectionRef} className="py-24 relative" style={{ backgroundColor: "var(--color-surface)" }}>
      {/* Ambient blob */}
      <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[140px] opacity-10" style={{ backgroundColor: "var(--color-accent-purple)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <TextReveal className="flex flex-col items-center mb-16">
          <span className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: "var(--color-accent-blue)" }}>Eyebrow</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center" style={{ fontFamily: "var(--font-sora)" }}>
            Plain <span style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Gradient</span>
          </h2>
          <div className="w-16 h-1 rounded-full" style={{ background: "linear-gradient(90deg, var(--color-accent-blue), var(--color-accent-purple))" }} />
        </TextReveal>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* cards: className="p-6 rounded-2xl transition-all duration-300 glass-card" */}
        </div>
      </div>
    </section>
  );
}
```

**When you add a section:**
1. Create `src/components/NewSection.tsx` taking its data as props.
2. Render it in `src/app/page.tsx` in the right position (behind its `sections` flag if it can be switched off).
3. Add `{ name, href: "/#id", section? }` to `ALL_LINKS` in `src/lib/navigation.ts` (navbar and footer both use it).
4. If it has editable content, it needs a model and endpoint in `portfolio-backend` and a form in `portfolio-admin` first (see their skills), plus a type in `content-types.ts`.

The `id` must match the `href`, because the navbar scroll-spy finds sections by `document.getElementById`.

Section backgrounds roughly alternate between `var(--color-base)` and `var(--color-surface)`. The current order is Hero base, About base, Skills surface, Experience base, Projects surface, Education base, Research surface, Contact base. Pick the background that contrasts with the section's neighbours.

## Theming

- There are three brand accents, defined in `@theme`: `--color-accent-blue` (#3b82f6), `--color-accent-purple` (#8b5cf6) and `--color-accent-cyan` (#06b6d4). Extra per-item accents are raw hex values: amber `#F59E0B`, rose `#F43F5E`, emerald `#10B981`.
- Surface and text tokens: `--color-base`, `--color-surface`, `--color-text`, `--card-bg`, `--card-solid`, `--border`, `--border-alt`, `--border-hover`, `--text-muted`, `--text-dim`, `--text-dimmer`, `--tag-bg`, `--tag-border`, `--input-bg`, `--input-border`, `--overlay-bg`, `--nav-bg`, plus `--ticker-*`.
- **A new token must be defined twice**: once in the `:root, [data-theme="dark"]` block and once in the `html[data-theme="light"]` block.
- Light mode flips some Tailwind classes through overrides in `globals.css`. Inside a `<section>`, `.text-white` becomes dark, **except on `a`, `button`, or elements with a `bg-*` class**. `text-gray-300` through `text-gray-600` are also remapped. So:
  - Use `text-white` for headings and `text-gray-400` for body copy. Both adapt automatically.
  - Use `text-white` on buttons and links that sit on a colored or gradient fill. It stays white.
  - Hardcoded `rgba(255,255,255,…)` backgrounds or borders **do not** adapt. Use `var(--tag-bg)` or `var(--border)` instead.
- Utilities available: `glass`, `glass-card`, `text-glow`, `icon-glow`, `gradient-text` (animated shimmer).

## Animation rules

- Call `gsap.registerPlugin(ScrollTrigger)` at module scope in every file that uses ScrollTrigger.
- Scroll animations go inside `gsap.context(() => {...}, sectionRef)` in a `useEffect` that returns `() => ctx.revert()`. This keeps them safe under StrictMode and HMR.
- House style: `fromTo` with `{ y: 40–60, opacity: 0 }`, `ease: "power3.out"`, duration 0.7–0.9, stagger 0.12–0.2, ScrollTrigger `start: "top 80%"`. For side entrances, use `x: ±50–60`.
- For simple one-off reveals, prefer wrapping in `<ScrollReveal direction="up|left|right|fade" stagger={0.15}>` or `<TextReveal>` rather than writing new GSAP code.
- Load timing: `PageLoader` covers the screen for about 2.6s. The Hero timeline starts with `delay: 0.6` and the Navbar enters with `delay: 0.2`. Keep new above-the-fold animations in step with this.
- Pure CSS loops (the ticker, the spinning rings in Hero) use keyframes in `globals.css` or Tailwind arbitrary `animate-[...]` values.

## Verifying changes

```bash
npm run lint    # eslint (next core-web-vitals + typescript)
npm run build   # type-check and production build
npm run dev     # http://localhost:3000
```

Start the API first (`cd ../portfolio-backend && npm run dev`, MongoDB on :27017). There is no test suite. After a visual change, check the page in **both dark and light themes** (use the navbar theme toggle) and at mobile width (below 768px, where the hamburger menu shows).

## Gotchas and known issues

- **Hex-alpha on CSS vars is invalid.** `${accent}40` only works when `accent` is hex. Content accents from the API are always 6-digit hex (the dashboard enforces it), but the fixed per-platform colors in `SocialIcon.tsx` and Contact's info items are CSS vars, so their hover tints are silently ignored. Use `color-mix(in srgb, ${color} 25%, transparent)` if you touch them.
- The Navbar and Hero Resume buttons use `profile.resumeUrl` and are hidden when it's empty. The seeded value `/resume.pdf` doesn't exist in `public/` yet, so upload a PDF under Profile → Resume.
- The Contact form has a hidden honeypot field `website`. Keep it, since the API silently drops submissions where it's filled. If you serve the site from a new domain, add that origin under Site settings → Allowed origins, or the form gets 403.
- Project `liveUrl` and `githubUrl` may be `""`. The card hides that button; the API rejects `"#"`.
- About paragraphs are plain text. The owner's `fullName` is bolded automatically where it appears; other inline highlights aren't supported.
- Next 16 blocks optimizing images from local IPs; `next.config.ts` sets `dangerouslyAllowLocalIP` only when `CONTENT_API_URL` points at localhost.
- Tailwind has no `opacity-8` class. Where it appears, the actual value comes from the inline `style={{ opacity: ... }}`.
- `README.md` is the unchanged create-next-app boilerplate and says the font is Geist, which is wrong.
- Commented-out blocks in `Hero.tsx` (Contact button, social icons, scroll indicator) were disabled on purpose. Leave them unless asked.
