# BOSTA — Landing Site Plan

## Context

BOSTA Sp. z o.o. (Myślenice, est. 1992) manufactures heavy-duty school, kindergarten,
and office furniture, with full in-house production (CNC, edge banding, metalworking,
powder coating). Their real differentiator is **durability / anti-vandal engineering**
and **end-to-end manufacturing** — not the generic "colorful classroom" cliché. The
buyers are Polish: school directors, public-procurement (B2G) officers, and general
contractors equipping new schools.

There is no site today. The repo is greenfield (only `shadcn` installed + shadcn MCP
configured). Goal: a polished, single-page, Polish-language landing site that sells the
durability + manufacturing story to institutional buyers and drives quote requests.

**Locked decisions (from the user):**
- Visual direction: **Editorial showcase** — premium, large furniture/factory
  photography carries the page; the materials (powder-coated steel + beech plywood) are
  the color. Long scroll, deliberate pacing, art-direction per section.
- Language: **Polish only** (full diacritics required of every font).
- Stack: **Astro** (`output: 'static'`) + **Tailwind** + **shadcn/ui** (React islands) + JS.
- Imagery: **verified stock now, swap later** — Unsplash placeholders in fixed slots so
  real BOSTA photos drop in with zero layout change.

## Design system

Following the impeccable brand register (editorial showcase, but grounded in materials —
avoid the display-serif-italic magazine cliché it warns against).

**Color** (OKLCH; "let the materials be the color", restrained UI):
- Canvas: true off-white, ~`oklch(0.975 0.004 250)` — cool-neutral paper. **Not** warm
  cream/sand (the saturated AI default the register bans).
- Ink: graphite near-black, ~`oklch(0.20 0.01 250)`.
- Beech accent: warm tan ~`oklch(0.78 0.07 70)` for small surfaces; the rest of the warmth
  comes from imagery.
- Signal/CTA: one committed deep brick/oxblood ~`oklch(0.45 0.12 30)` for links, CTAs,
  active states. Grounded and confident — deliberately not navy-corporate, not rainbow.
- One art-directed **graphite full-bleed** section (durability/process) for contrast.

**Typography** (avoid the register's reflex-reject list; must support Polish ą/ć/ę/ł/ń/ó/ś/ź/ż):
- Display: **Bricolage Grotesque** (variable) — institutional yet warm, strong Polish glyphs.
- Body/captions: **Spectral** (screen serif, Polish support) for editorial lead paragraphs
  + a neutral sans fallback for dense spec text. Contrast axis = grotesque + serif (not two
  grotesques). Verify diacritics render before committing; swap if any glyph is missing.
- Fluid `clamp()` scale, ≥1.25 ratio, display max ≤ 6rem, letter-spacing ≥ -0.04em.

**Motion**: one orchestrated hero load; scroll reveals that *enhance already-visible*
content (IntersectionObserver, never gate visibility on a class); lightbox for gallery;
optional Lenis smooth-scroll. Ease-out curves, no bounce. Full `prefers-reduced-motion`
fallbacks.

## Page structure (single page, Polish copy)

Editorial = alternating asymmetric image+text rows, **not** identical card grids (banned).

1. **Nav** — `BOSTA` wordmark + anchors (Produkty, Proces, Certyfikaty, O firmie, Kontakt)
   + primary CTA *Zapytaj o wycenę*. Transparent over hero → solid on scroll. Mobile drawer.
2. **Hero** — one decisive full-bleed photo (beech+steel chair / classroom). Display headline
   on the durability + made-end-to-end-since-1992 thesis. Subhead, CTA + *Zobacz produkty*.
3. **Positioning lead** — short editorial paragraph establishing voice; key facts (od 1992,
   2 zakłady, cały kraj) woven in as prose — **not** a 4-up metric grid (hero-metric template
   is banned).
4. **Product segments** — the 4 real categories as large alternating rows: Szkolne i
   edukacyjne, Przedszkolne, Biurowe i gabinetowe, Projekty dedykowane. Each: photo +
   description + key product types (from INFO §3).
5. **Durability thesis** (graphite, art-directed) — anti-vandal reinforced steel profiles,
   safe rounded corners, ISO height system, beech plywood seats. Macro/detail photography
   of joints, edges, powder coat.
6. **Manufacturing process** — genuine end-to-end sequence (so a numbered/typed timeline is
   justified, not reflexive): CNC cięcie → oklejanie krawędzi PCV/ABS → obróbka metalu
   (gięcie/spawanie) → lakiernia proszkowa. Factory imagery.
7. **Certyfikaty i normy** — PN-EN 1729-1:2016, PN-EN 1729-2+A1:2016, atest higieniczny E1.
   Presented as credible specimen, not generic logo soup. Critical for tender buyers.
8. **Jak współpracujemy (B2G)** — public procurement / tenders, cooperation with general
   contractors, own transport base + assembly teams nationwide. Simple flow:
   zapytanie → kalkulacja/projekt → produkcja → dostawa i montaż.
9. **O firmie** — since 1992; two sites (Drogowców 7 — centrum handlowo-logistyczne;
   Polanka 133 — zakład produkcyjny); zarząd (Karol Lenart – Prezes, Stanisław Bajer –
   Wiceprezes). Optional small Myślenice map.
10. **Kontakt / wycena** — *Zapytaj o wycenę* form (imię, instytucja, e-mail, telefon,
    wiadomość) as a shadcn **React island**. Plus address + hours (pn–pt 06:00–15:00).
    Static site → wire form to a service (Web3Forms/Formspree) or `mailto:` fallback.
11. **Footer** — full registry data: pełna nazwa, NIP 6810004062, REGON 351010570,
    KRS 0001208011, kapitał zakładowy 100 000 PLN, both addresses, hours, nav, copyright.

Sections beyond the source info (hero framing, positioning lead, macro-material section,
the B2G flow visualization) exist to carry the editorial feel and use stock imagery in
fixed, swappable slots.

## Build steps

1. **Scaffold Astro** — install astro + `@astrojs/react`, Tailwind v4 (`@tailwindcss/vite`),
   `@astrojs/sitemap`; `output: 'static'` in `astro.config.mjs`. Set up manually to preserve
   existing `DOCS/`, `.claude/`, `.mcp.json`.
2. **shadcn init** — create `components.json`, tsconfig path alias `@/*`, add the React
   components actually used: `button`, `input`, `textarea`, `label`, `dialog`, `sonner`
   (toast). Use the configured **shadcn MCP** to pull/inspect them.
3. **Design tokens + fonts** — `src/styles/global.css` with the OKLCH tokens above and the
   Bricolage Grotesque + Spectral fonts (`@fontsource-variable/*` for offline/static reliability).
4. **Layout shell** — `src/layouts/Base.astro`: `<html lang="pl">`, meta description, Open
   Graph, **JSON-LD `Organization`/`LocalBusiness`** (address, NIP, hours — helps tender
   discoverability), favicon.
5. **Content as data** — `src/data/products.ts`, `process.ts`, `certs.ts` so copy/specs are
   editable without touching markup.
6. **Sections** — one component per section in `src/components/` (`.astro` for static,
   `.tsx` React islands only where interactive: `ContactForm.tsx`, `Lightbox.tsx`). Compose
   in `src/pages/index.astro`.
7. **Imagery** — verified Unsplash photos (factory floor, powder-coat line, steel-frame
   beech chairs, classrooms/labs) into `public/images/` with descriptive Polish alt text.
   **Verify each URL resolves** before referencing — no guessed IDs, no colored-`div` placeholders.
8. **Motion** — IntersectionObserver reveals + hero load choreography; reduced-motion guard.

### Critical files
- `astro.config.mjs`, `components.json`, `tsconfig.json`, Tailwind/global CSS
- `src/styles/global.css` (tokens, fonts)
- `src/layouts/Base.astro`
- `src/pages/index.astro`
- `src/components/*` (Nav, Hero, Lead, ProductSegments, Durability, ProcessTimeline,
  Certifications, HowWeWork, About, ContactForm.tsx, Lightbox.tsx, Footer)
- `src/data/*`

## Verification

1. `npm run dev` → drive with Chrome DevTools / Playwright MCP. Screenshot at **390 / 768 /
   1440** widths; confirm no headline overflow, no clipped dropdowns, image+text rows
   reflow cleanly.
2. **Polish diacritics** render correctly in display + body fonts (ą ć ę ł ń ó ś ź ż).
3. **Contrast**: body text ≥ 4.5:1, large/placeholder text per spec — check against canvas
   and the graphite section.
4. **Images**: every stock URL resolves (no broken placeholders); alt text present.
5. **Motion**: reveals fire on load and on scroll; `prefers-reduced-motion: reduce` gives a
   static/crossfade alternative; content is visible with JS disabled.
6. Contact form submits (service or mailto) and shows success/error toast.
7. `npm run build` → static `dist/`; `npm run preview` to confirm the exported site works.
8. Lighthouse (Chrome DevTools MCP): Performance / A11y / SEO pass; JSON-LD validates.

## Open / deferred
- Contact-form backend choice (Web3Forms vs Formspree vs mailto) — pick during build,
  default to Web3Forms (no server, works with static).
- Real BOSTA photos + any logo asset to replace stock later (fixed slots ready).
