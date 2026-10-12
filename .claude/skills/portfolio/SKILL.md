---
name: portfolio
description: Conventions for Md Shovon Biswas's single-page Next.js 16 + Tailwind v4 + GSAP portfolio. Use when adding or editing a section (Hero, About, Skills, Experience, Projects, Education, Research, Contact), updating portfolio content (jobs, projects, papers, skills, contact info), changing theme colors/tokens, or adding animations in this repo.
---

# Portfolio project guide

A single-page personal portfolio. Everything renders from `src/app/page.tsx`, which stacks section components in order. There is no backend, no CMS and no tests. Content is hardcoded in each component file.

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
| `src/app/layout.tsx` | html/body, fonts, `metadata`, wraps children in `ThemeProvider`. `<html data-theme="dark">` is the SSR default. |
| `src/app/page.tsx` | Composes `PageLoader`, `BackToTop`, `Navbar`, then the sections, then `Footer`. |
| `src/app/globals.css` | Design tokens (dark and light), glass utilities, tech ticker CSS, light-mode overrides, keyframes. |
| `src/components/ThemeProvider.tsx` | `useTheme()` returns `{ theme, setTheme }`, with `"dark" \| "light" \| "system"`. Persists to `localStorage["portfolio-theme"]` and sets `data-theme` on `<html>`. |
| `src/components/ScrollReveal.tsx` | `ScrollReveal` (fade/slide wrapper) and `TextReveal` (clip-path heading reveal). |
| `src/components/Navbar.tsx` | Fixed header, `navLinks` array, scroll-spy active state, theme dropdown (desktop and mobile copies), Resume link. |
| `src/components/Footer.tsx` | Brand, a duplicate `quickLinks` array, contact snippet. |
| `src/components/<Section>.tsx` | One file per section, each with its data array at the top. |
| `public/image/` | `shovon.jpeg` (hero photo); `paper/*.png` (research thumbnails). |

## Where content lives

| To change… | Edit |
|---|---|
| Hero headline, tagline, CTA | `Hero.tsx` (JSX, no data array) |
| Bio paragraphs, trait tags, stats | `About.tsx`: `stats` array plus JSX |
| Skill bars / ticker words | `Skills.tsx`: `skillCategories`, `techBadges` |
| Jobs | `Experience.tsx`: `experiences` (`role, company, duration, type, accent, responsibilities[], tech[]`) |
| Projects | `Projects.tsx`: `projects` (`title, duration, image, description, tech[], accent, live, github`) |
| Degrees | `Education.tsx`: `educationData` |
| Papers | `Research.tsx`: `papers` (`title, duration, image, description, tags[], profile, paper`). Link URLs are constants at the top of the file. |
| Email, phone, location, socials | **Both** `Contact.tsx` **and** `Footer.tsx`, since they're duplicated |
| Page title / SEO description | `metadata` in `layout.tsx` |
| Loader tagline | `PageLoader.tsx` |

## Component conventions

Match these when writing new code:

- Every component starts with `"use client"` and uses a **named export** (`export function Research()`). Don't use default exports, except for the app route files.
- Keep static data as a `const` array above the component in the same file. Derive types with `type Paper = (typeof papers)[number];` instead of writing interfaces.
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

**When you add a section, update all four places:**
1. Create `src/components/NewSection.tsx`.
2. Render it in `src/app/page.tsx` in the right position.
3. Add `{ name, href: "#id" }` to `navLinks` in `Navbar.tsx`.
4. Add the same entry to `quickLinks` in `Footer.tsx`.

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

There is no test suite. After a visual change, check the page in **both dark and light themes** (use the navbar theme toggle) and at mobile width (below 768px, where the hamburger menu shows).

## Gotchas and known issues

- **Hex-alpha on CSS vars is invalid.** In `Experience.tsx` and `Skills.tsx`, `accent`/`color` is sometimes `"var(--color-accent-blue)"`. That makes `${accent}40` produce `var(--color-accent-blue)40`, which the browser silently ignores. The tinted backgrounds, hover borders and glows only work for the raw-hex accents. For new code, use hex accents, or `color-mix(in srgb, ${accent} 25%, transparent)`, which works with both.
- **`/resume.pdf` is linked** from the Navbar and Hero, but `public/resume.pdf` doesn't exist yet.
- **The Contact form is a demo.** `handleSubmit` only toggles a "sent" state for 4s and nothing is sent. Wiring it up needs a Route Handler or Server Action (read the Next 16 docs first) or a third-party form service.
- Project `live` and `github` may be `""`. The card hides that button, so never use `"#"` as a placeholder. Screenshots live in `public/image/project/`.
- `Navbar.navLinks` and `Footer.quickLinks` are separate copies, and contact details appear in both `Contact.tsx` and `Footer.tsx`. Keep them in sync.
- Tailwind has no `opacity-8` class. Where it appears, the actual value comes from the inline `style={{ opacity: ... }}`.
- `README.md` is the unchanged create-next-app boilerplate and says the font is Geist, which is wrong.
- Commented-out blocks in `Hero.tsx` (Contact button, social icons, scroll indicator) were disabled on purpose. Leave them unless asked.
