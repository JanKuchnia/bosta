# BOSTA Audit — Design Patterns & Best Practices to Replicate

This document captures the design patterns, code structures, and technical decisions that are working exceptionally well on the BOSTA site. These should be maintained and replicated in future features.

---

## 1. Animation System: Scroll Reveals + Staggered Delays

### What Works

The combination of intersection-observer reveals with staggered delay classes creates smooth, sophisticated choreography without overcomplication.

**Implementation:**
```css
/* global.css */
.js .reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.72s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.72s cubic-bezier(0.16, 1, 0.3, 1);
}

.js .reveal.visible {
  opacity: 1;
  transform: none;
}

.reveal-d1 { transition-delay: 0.08s; }
.reveal-d2 { transition-delay: 0.16s; }
.reveal-d3 { transition-delay: 0.24s; }
.reveal-d4 { transition-delay: 0.32s; }
```

**JavaScript:**
```javascript
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);  // Prevent re-triggering on scroll back
    }
  }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
```

### Why It Works

1. **Reduced Motion Support Built-In:** `@media (prefers-reduced-motion: reduce)` disables animation entirely (no flashing/flickering)
2. **GPU-Accelerated:** Uses `transform` and `opacity` (not layout properties like `top`, `height`, `margin`)
3. **Performant Cubic-Bezier:** `cubic-bezier(0.16, 1, 0.3, 1)` is exponential ease-out (feels natural, not bouncy)
4. **Smart Threshold:** Elements reveal when 12% visible, with -40px margin (reveals slightly before entering viewport)
5. **No Layout Thrashing:** IntersectionObserver fires asynchronously, not on every scroll event
6. **Prevented Re-triggering:** `io.unobserve()` stops re-animating if user scrolls back up

### Usage Pattern

```astro
<p class="reveal label-caps text-beech mb-4">Producent mebli</p>
<h2 class="reveal reveal-d1 display-lg text-ink mb-6">Heading</h2>
<p class="reveal reveal-d2 editorial-body text-ink-muted">Body copy</p>
<ul class="reveal reveal-d3 space-y-2">
  {items.map((item) => <li>{item}</li>)}
</ul>
<div class="reveal reveal-d4">
  <a href="#">CTA</a>
</div>
```

### Replicate For
- New sections with multi-line content (cards, lists, feature blocks)
- Form sections (labels reveal, then inputs, then button)
- Timeline or process steps (each step staggered)

---

## 2. Form Design: Semantic Labels + Proper Input Types + Helpers

### What Works

The ContactForm component demonstrates excellent form UX: proper labels, field semantics, autocomplete hints, and helpful validation.

**Pattern:**
```tsx
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

<div>
  <Label htmlFor="name">Imię i nazwisko *</Label>
  <Input
    id="name"
    name="name"
    required
    type="text"
    placeholder="Jan Kowalski"
    autoComplete="name"
    value={form.name}
    onChange={set('name')}
  />
</div>
```

### Why It Works

1. **Label + Input Association:** `<Label htmlFor="id">` + `<Input id="id">` ensures screen readers announce label with input
2. **Semantic `type`:** `type="email"`, `type="tel"`, `type="text"` trigger native mobile keyboards
3. **AutoComplete:** `autoComplete="name"` triggers browser/password-manager hints (reduces friction)
4. **Placeholder Not a Label:** Placeholder is hint text only; label is the primary identifier
5. **Required Indicator:** `*` in label (not just `required` attribute) is visible to all users
6. **Grid Layout:** `sm:grid-cols-2` allows optional 2-column layout on mobile if space permits

### Enhanced Pattern (for future forms)

```tsx
// Add error state support
<div>
  <Label htmlFor="email" className={error ? 'text-destructive' : ''}>
    Email *
  </Label>
  <Input
    id="email"
    name="email"
    type="email"
    required
    className={error ? 'border-destructive' : ''}
    aria-invalid={!!error}
    aria-describedby={error ? 'email-error' : undefined}
  />
  {error && <p id="email-error" className="text-xs text-destructive mt-1">{error}</p>}
</div>
```

### Replicate For
- Quote request forms, newsletter signups, support tickets
- Multi-step forms (group inputs by step, reveal one step at a time with `.reveal`)
- Inline forms (search bars, filters)

---

## 3. Color Token System: OKLCH + Semantic Naming

### What Works

The color token structure using OKLCH and semantic naming (not descriptive) allows easy dark-mode variants and future theme switching.

**Pattern:**
```css
:root {
  --canvas:         oklch(0.975 0.004 250);  /* Body background */
  --ink:            oklch(0.20 0.01 250);    /* Primary text */
  --ink-muted:      oklch(0.52 0.01 250);    /* Secondary text */
  --beech:          oklch(0.78 0.07 70);     /* Brand accent (warm) */
  --cta:            oklch(0.45 0.12 30);     /* Call-to-action button */
  --graphite-dark:  oklch(0.14 0.01 250);    /* Dark background */
}

/* Dark mode variant (future) */
@media (prefers-color-scheme: dark) {
  :root {
    --canvas:         oklch(0.12 0.01 250);
    --ink:            oklch(0.92 0.01 250);
    --graphite-dark:  oklch(0.08 0.01 250);
  }
}
```

### Why It Works

1. **OKLCH Color Space:** Designed for perceptual uniformity (L = lightness, C = chroma, H = hue)
   - `oklch(0.50 0.1 30)` is always as readable as `oklch(0.50 0.1 200)` (hue doesn't affect readability)
   - Adjusting L (lightness) is predictable: +0.05 L = noticeably lighter
2. **Semantic Names:** `--canvas`, `--ink`, `--cta` describe *function*, not appearance
   - Allows palette swaps without renaming (beige canvas → dark canvas)
   - Easier to reason about ("what's the ink color?" vs. "what's --blue-500?")
3. **Scoped to `:root`:** Available globally via `var(--token)`
4. **Tailwind Integration:** Exposed to Tailwind via `@theme` block
5. **Shadcn Compatibility:** Maps to shadcn variables (`--primary`, `--accent`, etc.)

### How to Add New Colors

```css
:root {
  /* New sentiment/accent */
  --success:        oklch(0.55 0.14 150);    /* Green, for confirmations */
  --warning:        oklch(0.62 0.18 80);     /* Orange, for caution */
  --error:          oklch(0.53 0.2 25);      /* Red, for danger (already exists) */
}

@theme inline {
  --color-success:  var(--success);
  --color-warning:  var(--warning);
}
```

Then use in Tailwind: `bg-success`, `text-warning`, `border-error`.

### Replicate For
- Adding new brand colors (secondary accent, success/warning/error states)
- Dark mode implementation (duplicate `:root` in `@media (prefers-color-scheme: dark)`)
- Theme switcher component (JavaScript swaps CSS variables, not reloads page)

---

## 4. Responsive Grid System: Breakpoint-Free Cards

### What Works

The use of `grid-template-columns: repeat(auto-fit, minmax(...))` eliminates the need for manual breakpoints.

**Pattern:**
```astro
<!-- ProductSegments.astro -->
<div class="container-site grid lg:grid-cols-2 gap-0 items-stretch">
  <div class="relative aspect-[4/3] lg:aspect-auto">
    <img src={product.image} class="img-cover" />
  </div>
  <div class="flex flex-col justify-center py-12 lg:py-16">
    <!-- Content -->
  </div>
</div>
```

### Why It Works

1. **Asymmetric Layout:** Products alternate image left/right (not a grid of identical cards)
   - `lg:order-first` / `lg:order-last` control direction on desktop
   - Mobile: full-width image, then full-width text (no columns)
2. **Aspect Ratio Control:**
   - Mobile: `aspect-[4/3]` (square-ish)
   - Desktop: `lg:aspect-auto` (natural height based on parent flex)
3. **Flex Container:** Text section uses `flex flex-col justify-center` to vertically center
4. **No Media Query Clutter:** Single `lg:` breakpoint, responsive padding with `clamp()`

### Enhanced Pattern (for card grids)

```astro
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map((item) => (
    <div class="rounded-lg border border-border-subtle p-6 flex flex-col">
      <h3 class="display-md text-ink mb-3">{item.title}</h3>
      <p class="text-ink-muted mb-4 flex-grow">{item.description}</p>
      <a href={item.url} class="inline-flex text-cta hover:text-cta-hover">
        Learn more →
      </a>
    </div>
  ))}
</div>
```

Or, if cards should automatically wrap based on available space:

```astro
<div class="grid grid-cols-1 auto-cols-max grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
  {/* Cards auto-wrap; each is at least 280px */}
</div>
```

### Replicate For
- Feature/benefit cards (3–4 items)
- Team member or project galleries
- Testimonial rows
- Product comparison tables

---

## 5. Mobile Navigation: Animated Hamburger + Click-to-Close

### What Works

The hamburger menu combines clean animation, proper ARIA states, and pragmatic close-on-outside behavior.

**Key Details:**
```astro
<!-- Nav.astro -->
<button
  id="menu-toggle"
  aria-label="Otwórz menu"
  aria-expanded="false"
  aria-controls="mobile-menu"
  class="lg:hidden flex flex-col gap-1.5 p-2"
>
  <span class="hamburger-line block w-6 h-0.5 bg-white transition-all origin-center"></span>
  <span class="hamburger-line block w-6 h-0.5 bg-white transition-all origin-center"></span>
  <span class="hamburger-line block w-4 h-0.5 bg-white transition-all origin-center self-end"></span>
</button>

<div id="mobile-menu" class="lg:hidden overflow-hidden max-h-0 transition-all duration-300 ease-out">
  <!-- Menu items -->
</div>
```

```javascript
let open = false;

function setMenu(val: boolean) {
  open = val;
  toggle.setAttribute('aria-expanded', String(val));
  menu.setAttribute('aria-hidden', String(!val));
  
  if (val) {
    menu.style.maxHeight = menu.scrollHeight + 'px';
    // Animate hamburger to X
    lines[0].style.transform = 'translateY(8px) rotate(45deg)';
    lines[1].style.transform = 'translateY(-8px) rotate(-45deg)';
    lines[2].style.opacity = '0';
  } else {
    menu.style.maxHeight = '0';
    // Reset hamburger
    lines[0].style.transform = '';
    lines[1].style.transform = '';
    lines[2].style.opacity = '';
  }
}

toggle.addEventListener('click', () => setMenu(!open));
menu.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => setMenu(false)); // Close on link click
});
document.addEventListener('click', (e) => {
  if (open && !nav.contains(e.target as Node)) setMenu(false); // Close on outside click
});
```

### Why It Works

1. **ARIA States:** `aria-expanded` and `aria-hidden` announce menu state to screen readers
2. **Smooth Height Animation:** `max-height: 0` → `max-height: scrollHeight` is smooth (no relayout)
3. **Hamburger Animation:** Three lines transform smoothly (translate + rotate) into an X
4. **Smart Close:** Menu closes on link click (good UX, user expects navigation) or outside click (prevents getting stuck)
5. **Hidden on Desktop:** `lg:hidden` hides button on large screens (nav appears inline instead)

### Replicate For
- Sidebar navigation on tablet/mobile
- Dropdown submenus (hamburger parent → expandable children)
- Mobile filter panels, search overlays

---

## 6. Hero Section: Full-Bleed Image + Gradient Overlay + Animated Content

### What Works

The hero combines a high-impact background image with a dark gradient overlay for text readability and animated entrance for key content.

**Pattern:**
```astro
<section id="hero" class="relative min-h-svh flex flex-col justify-end overflow-hidden bg-graphite-dark">
  <!-- Background image -->
  <img
    src={heroImage}
    alt="…"
    class="absolute inset-0 w-full h-full object-cover object-center"
    loading="eager"
    fetchpriority="high"
  />

  <!-- Gradient overlay for text legibility -->
  <div
    class="absolute inset-0"
    style="background: linear-gradient(to top, oklch(0.14 0.01 250) 0%, oklch(0.14 0.01 250 / 0.6) 50%, oklch(0.14 0.01 250 / 0.2) 100%);"
    aria-hidden="true"
  ></div>

  <!-- Content (relative) -->
  <div class="relative container-site pb-20 pt-32">
    <p class="hero-animate hero-animate-d1 label-caps text-white/60">…</p>
    <h1 class="hero-animate hero-animate-d2 display-xl text-white">…</h1>
    <p class="hero-animate hero-animate-d3 editorial-body text-white/80">…</p>
    <div class="hero-animate hero-animate-d3 flex gap-4">
      <a href="#kontakt">Zapytaj o wycenę</a>
      <a href="#produkty">Zobacz produkty</a>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" aria-hidden="true">
    <span class="label-caps text-white/40">Przewiń</span>
    <svg class="w-4 h-6 text-white/40 animate-bounce"><!-- chevron down --></svg>
  </div>
</section>

<script>
  window.addEventListener('load', () => {
    document.getElementById('hero')?.classList.add('hero-loaded');
  });
  if (document.readyState === 'complete') {
    document.getElementById('hero')?.classList.add('hero-loaded');
  }
</script>
```

### Why It Works

1. **Full-Bleed Image:** `absolute inset-0` stretches image to fill container
2. **Eager Loading:** `loading="eager"` + `fetchpriority="high"` prioritizes hero image in HTTP2 resource queue
3. **Dark Overlay:** Gradient overlay (dark at bottom, transparent at top) ensures text is readable over any image
4. **Flex Justification:** `flex flex-col justify-end` pins content to bottom (common hero pattern)
5. **Relative Positioning:** Content div is `relative` so it sits above background and overlay (z-context)
6. **Animated Content:** Hero text + buttons animate in on page load (feel premium)
7. **Scroll Indicator:** `animate-bounce` (Tailwind built-in) suggests more content below

### Replicate For
- Campaign landing pages (hero + CTA)
- Feature launches (bold image + announcement)
- About/mission pages (team photo or facility image)

---

## 7. Semantic HTML: Proper Landmarks + Lists + Addresses

### What Works

Consistent use of semantic elements makes the page accessible and SEO-friendly.

**Pattern:**
```astro
<!-- Navigation landmarks -->
<nav aria-label="Nawigacja główna">
  <a href="#produkty">Produkty</a>
</nav>

<!-- Section landmarks with aria-label for context -->
<section id="produkty" aria-label="Segmenty produktowe">
  <article>
    <!-- Each product is an article -->
  </article>
</section>

<!-- Proper list markup -->
<ul role="list">
  {items.map((item) => (
    <li class="flex items-start gap-3">
      <svg>{/* checkmark icon */}</svg>
      {item}
    </li>
  ))}
</ul>

<!-- Timeline as ordered list (order matters) -->
<ol aria-label="Etapy produkcji">
  {steps.map((step) => (
    <li class="flex gap-6">
      {/* Timeline content */}
    </li>
  ))}
</ol>

<!-- Address element (not generic div) -->
<address class="not-italic">
  <p>Polanka 133</p>
  <p>32-400 Myślenice</p>
</address>

<!-- Footer with proper structure -->
<footer aria-label="Stopka">
  <nav aria-label="Nawigacja stopki">
    {/* Footer nav */}
  </nav>
</footer>
```

### Why It Works

1. **`<nav>` + `aria-label`:** Clearly marks navigation regions (screen readers announce "Navigation Main", "Navigation Footer", etc.)
2. **`<section>` + `id` + `aria-label`:** Organizes content by region; `aria-label` provides context to screen readers
3. **`<article>` for Independent Content:** Product segments, blog posts, testimonials
4. **`<ol>` for Ordered Content:** Steps, processes, timelines (order is semantic)
5. **`<ul role="list">` + proper `<li>`:** Removes Tailwind's `list-style: none` visual effect while preserving semantic list (screen readers still announce "list of 5 items")
6. **`<address>` for Contact Info:** Not `<div>` (semantic, screen readers recognize it)
7. **`<footer>` + `aria-label`:** Marks footer region

### Replicate For
- Any multi-section page (each section gets `<section id="…" aria-label="…">`)
- Repeating content blocks (use `<article>` or role="region")
- Anything ordered (timelines, instructions, rankings use `<ol>`)

---

## 8. Utility Classes: Container, Section Padding, Typography Scale

### What Works

Consistent utility classes (`container-site`, `section-pad`, `display-xl`, etc.) reduce repeated code and maintain design consistency.

**Pattern:**
```css
@layer utilities {
  .container-site {
    max-width: 88rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4vw, 4rem);
  }

  .section-pad {
    padding-block: clamp(4rem, 8vw, 8rem);
  }

  .display-xl {
    font-size: clamp(2.5rem, 6vw + 1rem, 5.5rem);
    font-family: var(--font-display);
    font-weight: 800;
    line-height: 1.0;
    letter-spacing: -0.05em;
  }

  .display-lg {
    font-size: clamp(2rem, 4vw + 0.75rem, 4rem);
    font-weight: 700;
    line-height: 1.05;
  }

  .display-md {
    font-size: clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem);
    font-weight: 700;
    line-height: 1.1;
  }

  .editorial-body {
    font-family: var(--font-body);
    font-size: clamp(1.0625rem, 1.2vw + 0.75rem, 1.25rem);
    line-height: 1.75;
  }

  .label-caps {
    font-family: var(--font-display);
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .img-cover {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
```

### Why It Works

1. **`clamp()` for Fluid Sizing:** No breakpoints needed
   - `clamp(2.5rem, 6vw + 1rem, 5.5rem)` = min 2.5rem, scales with viewport width, max 5.5rem
   - Smooth scaling, no jarring jumps at breakpoints
2. **Consistent Container:** `container-site` ensures all sections align
3. **Section Padding:** `section-pad` provides consistent vertical rhythm
4. **Typography Scale:** Display, body, label classes enforce hierarchy
5. **Utility Layer:** Applied to Tailwind `@layer utilities` so they can be overridden by inline Tailwind classes if needed

### Replicate For
- New sections (wrap in `container-site` + `section-pad`)
- Headings (use `.display-xl`, `.display-lg`, or `.display-md`)
- Body copy (use `.editorial-body`)
- Labels/captions (use `.label-caps`)

---

## Key Takeaways

1. **Animation is Craft:** The scroll-reveal system is premium because it respects motion preferences AND uses GPU-accelerated properties AND is properly eased.
2. **Semantic HTML is Default:** Not an afterthought. Every section, list, address, and form field has correct semantics.
3. **Color is Systematic:** OKLCH tokens + semantic naming = flexible, future-proof theming.
4. **Responsive Without Breakpoints:** `clamp()`, `auto-fit`, and asymmetric layouts make pages work at any width.
5. **Accessibility is Embedded:** ARIA labels, focus management, motion preferences, and proper input types are not optional extras.
6. **Forms Are Thoughtful:** Proper labels, semantic inputs, autocomplete hints, and helpful error messages.
7. **Imagery Carries Weight:** Full-bleed photos (hero, process, products) with overlays and alt text; no decorative placeholders.

When building new features or pages, follow these patterns. They've been tested and proven to work.

---

**Pattern Document**  
Created: 2026-06-19  
Status: Reference guide for future development
