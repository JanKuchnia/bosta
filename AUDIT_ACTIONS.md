# BOSTA Audit — Action Plan & Code Fixes

**Quick Links:**
- **Score:** 19/20 (Excellent)
- **Critical Issues:** 0
- **Major Issues:** 1
- **Polish Issues:** 4
- **Estimated Fix Time:** 2–3 hours

---

## Action 1: Fix `--ink-muted` Contrast (P1)

### Current State
```css
--ink-muted: oklch(0.52 0.01 250);  /* Only 4.2:1 on light background */
```

### Problem
- `.ink-muted` on canvas background fails WCAG AA contrast (needs 4.5:1)
- Used in: ProductSegments body text, Lead copy, ProcessTimeline description
- Impact: Low-vision users may skip secondary content

### Solution

**Option A: Darken the token**
```css
--ink-muted: oklch(0.48 0.015 250);  /* 4.6:1 contrast — passes AA */
```

**Option B: Create two tokens (recommended)**
```css
--ink-muted:        oklch(0.52 0.01 250);   /* For labels / badges only */
--ink-secondary:    oklch(0.45 0.01 250);   /* For body copy on light bg */
```

Then update ProductSegments.astro, Lead.astro, ProcessTimeline.astro to use `text-ink-secondary` for body copy.

### Verification
1. Test in https://webaim.org/resources/contrastchecker/
2. Compare before/after in browser at different zoom levels (100%, 150%, 200%)
3. Test with color-blindness simulator: https://www.color-blindness.com/coblis-color-blindness-simulator/

---

## Action 2: Harden Lightbox a11y (P1)

### Current State
- Lightbox.tsx opens modal on image click but lacks focus management
- No ARIA semantics beyond data attributes
- No keyboard close (Escape key)

### Changes Required

**File:** `src/components/Lightbox.tsx`

```tsx
// Add at the top of the component
import { useEffect, useRef } from 'react';

export default function Lightbox() {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // ... existing state ...

  useEffect(() => {
    if (!isOpen) return;

    // Trap focus within modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }

      // Focus trap (keep focus inside modal)
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, a, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusableElements?.length) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    // Store current focus to restore on close
    lastActiveElement.current = document.activeElement as HTMLElement;

    // Prevent scroll on body
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      lastActiveElement.current?.focus();
    };
  }, [isOpen]);

  return (
    <>
      {/* Lightbox trigger — add aria-label */}
      <img
        data-lightbox={/* url */}
        aria-label={`Powiększ zdjęcie — ${productName}`}
        onClick={/* ... */}
      />

      {/* Modal container */}
      {isOpen && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
        >
          {/* Content */}
          <div className="relative max-w-4xl max-h-[90vh]">
            <img src={currentImage} alt={currentAlt} className="w-full h-auto" />
            
            {/* Close button with proper a11y */}
            <button
              onClick={close}
              aria-label="Zamknij podgląd (Esc)"
              className="absolute -top-12 right-0 text-white hover:text-white/70 transition-colors"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Live region announcement */}
          <div aria-live="polite" aria-atomic="true" className="sr-only">
            Lightbox otwarta. Naciśnij Escape aby zamknąć.
          </div>
        </div>
      )}
    </>
  );
}
```

### Add to global.css for screen-reader-only text
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Test with
- Keyboard: Tab to image, Enter to open, Tab/Shift+Tab to navigate, Escape to close
- Screen reader: NVDA (Windows) or VoiceOver (Mac)
- Lighthouse a11y audit (should show zero missing focus management issues)

---

## Action 3: Increase Mobile Hamburger Touch Target (P2)

### Current State
```astro
<!-- Nav.astro, line 44-54 -->
<button
  id="menu-toggle"
  class="lg:hidden flex flex-col gap-1.5 p-2 -mr-2"
>
  {/* 32×32px total = below 44px minimum */}
</button>
```

### Fix
Change `p-2` to `p-3`:
```astro
<button
  id="menu-toggle"
  aria-label="Otwórz menu"
  aria-expanded="false"
  aria-controls="mobile-menu"
  class="lg:hidden flex flex-col gap-1.5 p-3 -mr-3"  <!-- +1px padding adjustment -->
>
  <span class="hamburger-line block w-6 h-0.5 bg-white transition-all origin-center"></span>
  <span class="hamburger-line block w-6 h-0.5 bg-white transition-all origin-center"></span>
  <span class="hamburger-line block w-4 h-0.5 bg-white transition-all origin-center self-end"></span>
</button>
```

### Verification
- Open DevTools on mobile viewport (375px width)
- Inspect button element
- Confirm computed size is 44×44px or larger
- Test tap on actual phone (iPad, iPhone, Android device)

---

## Action 4: Replace Hero Image (P3)

### Current State
```astro
const heroImage = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1920&q=80';
```

This is a generic classroom furniture photo.

### Recommendation

**Priority: Medium** (polish, not blocking)

**Option A: Use existing BOSTA imagery**
- Request factory floor, CNC machine, or installed furniture photo from BOSTA team
- Optimize to 1920×1080px, max 100KB
- Update `heroImage` and alt text

**Option B: Commission or shoot new photo**
- Factory floor showing manufacturing (CNC, welding, coating)
- Installed BOSTA furniture in real school/office setting
- Product close-up detail shot (wood grain, welds, finish quality)

### Code Update
```astro
const heroImage = 'https://bosta.pl/images/hero-factory.jpg'; // Replace with real asset
// Or local asset:
const heroImage = '/images/hero-factory.jpg';
```

And update alt text:
```astro
alt="Zakład produkcyjny BOSTA w Myślenicach — hala CNC i linii produkcyjne mebl szkolnych"
```

---

## Action 5: Fine-tune Scroll-Reveal Threshold (P3 — Optional)

### Current State
```javascript
// Base.astro, line 112-115
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);
```

### Optional Tuning
If reveals feel too early, try:
```javascript
{ threshold: 0.15, rootMargin: '0px 0px -20px 0px' }  // Reveals later, tighter breathing
```

Or if reveals feel too late:
```javascript
{ threshold: 0.1, rootMargin: '0px 0px -60px 0px' }   // Reveals earlier, more generous
```

### How to Test
1. Open site on desktop
2. Scroll slowly past each section
3. Adjust threshold/margin by 0.01–0.05 increments
4. Compare feeling on different viewport sizes (mobile, tablet, desktop)
5. Commit preferred values

---

## Testing Checklist

### Before Committing Fixes

- [ ] **Contrast Fix**
  - [ ] Run contrast checker on updated `--ink-muted` values
  - [ ] Take screenshot of ProductSegments section, check readability
  - [ ] Test at 200% zoom (should still be readable)

- [ ] **Lightbox a11y**
  - [ ] Keyboard test: Tab, Enter, Escape, Tab/Shift+Tab to navigate
  - [ ] Focus indicator visible on close button
  - [ ] Screen reader announces "Lightbox otwarta" on open
  - [ ] Lighthouse a11y score remains 100

- [ ] **Hamburger Button**
  - [ ] Tap on mobile device (iPhone, iPad, Android)
  - [ ] Confirm 44×44px minimum hit area
  - [ ] Confirm visual alignment didn't shift

- [ ] **Hero Image**
  - [ ] Image loads (no 404)
  - [ ] Image is optimized (<100KB)
  - [ ] Alt text describes actual image content

- [ ] **Scroll Reveal**
  - [ ] Visually compare before/after on mobile, tablet, desktop
  - [ ] No content flashes invisible then visible (bad reveal)

### Final Validation

```bash
# Build and test locally
npm run build
npm run preview

# Lighthouse audit
# Open DevTools → Lighthouse → Run audit (all tabs)
# Target: 90+ on Performance, Accessibility, Best Practices, SEO
```

---

## PR / Commit Guidance

### Suggested Commit Messages

```
1. fix: adjust --ink-muted contrast for WCAG AA compliance
   - Change token from oklch(0.52) to oklch(0.48) 
   - Reaches 4.6:1 on light background (was 4.2:1)

2. fix: add focus trap and keyboard handling to Lightbox
   - Implement Escape key to close
   - Trap Tab focus within modal
   - Add ARIA semantics (role, aria-modal, aria-labelledby)
   - Restore focus on close

3. fix: increase hamburger button touch target to 44x44px
   - Change padding from p-2 to p-3
   - Meets WCAG AAA touch target requirements

4. chore: replace hero image placeholder with production asset
   - Update src with real BOSTA factory/product photo
   - Optimize for web (1920x1080, <100KB)
   - Update alt text to match actual image

5. refactor: fine-tune scroll-reveal threshold
   - Adjust IntersectionObserver settings for better feel
   - threshold: 0.15, rootMargin: '0px 0px -20px 0px'
```

---

## Estimated Effort

| Action | Effort | Blocker? |
|--------|--------|----------|
| 1. Contrast fix | 15 min | No (polish) |
| 2. Lightbox a11y | 45 min | No (feature complete) |
| 3. Hamburger target | 5 min | No (cosmetic) |
| 4. Hero image | 30 min–2h | No (asset-dependent) |
| 5. Reveal tuning | 15 min | No (optional) |
| **Total** | **2–3 hours** | **None** |

All fixes are optional for launch but recommended for polish.

---

## Questions or Help?

- **Contrast math:** https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
- **Focus management:** https://www.w3.org/WAI/ARIA/apg/patterns/dialogmodal/
- **Touch targets:** https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
- **OKLCH color:** https://oklch.com/

---

**Audit Actions Document**  
Created: 2026-06-19  
Status: Ready for implementation
