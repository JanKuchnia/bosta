# Graph Report - .  (2026-06-20)

## Corpus Check
- Corpus is ~16,602 words - fits in a single context window. You may not need a graph.

## Summary
- 246 nodes · 303 edges · 23 communities (19 shown, 4 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 38 edges (avg confidence: 0.9)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_UI Dependencies & Layout|UI Dependencies & Layout]]
- [[_COMMUNITY_Contact Form & UI|Contact Form & UI]]
- [[_COMMUNITY_Astro Content Types|Astro Content Types]]
- [[_COMMUNITY_Project Dependencies|Project Dependencies]]
- [[_COMMUNITY_Brand & Business Strategy|Brand & Business Strategy]]
- [[_COMMUNITY_Component Structure Config|Component Structure Config]]
- [[_COMMUNITY_Design System & Audit|Design System & Audit]]
- [[_COMMUNITY_Build Scripts & Dev Tools|Build Scripts & Dev Tools]]
- [[_COMMUNITY_Logo Visual Elements|Logo Visual Elements]]
- [[_COMMUNITY_TypeScript Configuration|TypeScript Configuration]]
- [[_COMMUNITY_Brand Visual Identity|Brand Visual Identity]]
- [[_COMMUNITY_Favicon & Browser Icon|Favicon & Browser Icon]]
- [[_COMMUNITY_App Icon Design|App Icon Design]]
- [[_COMMUNITY_App Icon Assets|App Icon Assets]]
- [[_COMMUNITY_MCP Server Config|MCP Server Config]]
- [[_COMMUNITY_Claude AI Settings|Claude AI Settings]]
- [[_COMMUNITY_Local Settings|Local Settings]]
- [[_COMMUNITY_Certifications Data|Certifications Data]]
- [[_COMMUNITY_Products Data|Products Data]]
- [[_COMMUNITY_Manufacturing Process Data|Manufacturing Process Data]]

## God Nodes (most connected - your core abstractions)
1. `BOSTA Landing Site Plan` - 14 edges
2. `@/layouts/Base.astro` - 10 edges
3. `BOSTA Technical Audit Report (19/20)` - 9 edges
4. `BOSTA Design Patterns Reference Guide` - 9 edges
5. `cn()` - 8 edges
6. `BOSTA Audit Action Plan` - 8 edges
7. `BOSTA Company Knowledge Profile (Polish)` - 8 edges
8. `tailwind` - 6 edges
9. `aliases` - 6 edges
10. `BOSTA Product Brief` - 6 edges

## Surprising Connections (you probably didn't know these)
- `cn()` --calls--> `clsx`  [INFERRED]
  src/lib/utils.ts → package.json
- `BOSTA Brand Principles (Industrial Precision, Specificity, No Slop)` --rationale_for--> `BOSTA Design System (OKLCH tokens, typography, motion)`  [INFERRED]
  PRODUCT.md → PLAN.md
- `Hero Section Component` --conceptually_related_to--> `Unsplash Placeholder Image Strategy (Swappable Fixed Slots)`  [INFERRED]
  AUDIT_PATTERNS.md → PLAN.md
- `Polish Institutional B2G Buyers (Target Audience)` --conceptually_related_to--> `B2G Sales Model (Public Tenders, General Contractors, Own Logistics)`  [INFERRED]
  PRODUCT.md → DOCS/INFO.MD
- `JSON-LD Organization/LocalBusiness SEO Schema` --rationale_for--> `Polish Institutional B2G Buyers (Target Audience)`  [INFERRED]
  PLAN.md → PRODUCT.md

## Hyperedges (group relationships)
- **Three WCAG Audit Issues Requiring Action** — bosta_ink_muted_contrast_issue, bosta_lightbox_a11y_issue, bosta_hamburger_touch_target_issue [EXTRACTED 0.95]
- **Manufacturing Credibility Core: Process + Certifications + Durability** — bosta_manufacturing_process, bosta_certifications, bosta_durability_thesis [INFERRED 0.85]
- **Design System Foundations: Color + Typography + Motion** — bosta_color_token_system, bosta_fluid_typography, bosta_animation_system [EXTRACTED 0.95]

## Communities (23 total, 4 thin omitted)

### Community 0 - "UI Dependencies & Layout"
Cohesion: 0.06
Nodes (22): @fontsource/spectral/400.css, @fontsource/spectral/400-italic.css, @fontsource/spectral/600.css, @fontsource/spectral/700.css, lucide-react, @fontsource-variable/bricolage-grotesque, navLinks, year (+14 more)

### Community 1 - "Contact Form & UI"
Cohesion: 0.09
Nodes (22): clsx, emptyForm, FormState, cn(), Button, ButtonProps, buttonVariants, DropdownMenuCheckboxItem (+14 more)

### Community 2 - "Astro Content Types"
Cohesion: 0.08
Nodes (24): AllValuesOf, CollectionEntry, CollectionKey, ContentConfig, DataEntryMap, ExtractCollectionFilterType, ExtractDataType, ExtractEntryFilterType (+16 more)

### Community 3 - "Project Dependencies"
Cohesion: 0.11
Nodes (18): dependencies, astro, @astrojs/react, @astrojs/sitemap, class-variance-authority, @fontsource/spectral, @fontsource-variable/bricolage-grotesque, lenis (+10 more)

### Community 4 - "Brand & Business Strategy"
Cohesion: 0.19
Nodes (19): Astro + Tailwind v4 + shadcn/ui + React Stack, Polish Institutional B2G Buyers (Target Audience), B2G Sales Model (Public Tenders, General Contractors, Own Logistics), BOSTA Brand Principles (Industrial Precision, Specificity, No Slop), PN-EN 1729-1:2016 and PN-EN 1729-2+A1:2016 Certifications + E1 Atest, BOSTA Sp. z o.o. (Furniture Manufacturer, est. 1992), Company Structure (Zarząd: Lenart+Bajer, 2 Sites Myslenice), Anti-Vandal Durability Engineering Thesis (+11 more)

### Community 5 - "Component Structure Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 6 - "Design System & Audit"
Cohesion: 0.26
Nodes (17): Scroll-Reveal + Staggered Delay Animation System, BOSTA Audit Action Plan, BOSTA Design Patterns Reference Guide, BOSTA Technical Audit Report (19/20), OKLCH Semantic Color Token System, Contact Form (React Island, shadcn), BOSTA Design System (OKLCH tokens, typography, motion), Fluid Typography with clamp() Scale (Bricolage Grotesque + Spectral) (+9 more)

### Community 7 - "Build Scripts & Dev Tools"
Cohesion: 0.20
Nodes (9): devDependencies, shadcn, name, scripts, astro, build, dev, preview (+1 more)

### Community 8 - "Logo Visual Elements"
Cohesion: 0.39
Nodes (8): Bosta Brand Identity, Dark Near-Black Text Color (#090102), Diagonal Stripe Hatching Effect, Gold Gradient Fill Style, Bosta Icon / Monogram Mark, Bosta Logo (New), Producer / Subtitle Tagline Text, Bosta Wordmark Text

### Community 9 - "TypeScript Configuration"
Cohesion: 0.25
Nodes (7): compilerOptions, baseUrl, jsx, jsxImportSource, paths, extends, @/*

### Community 10 - "Brand Visual Identity"
Cohesion: 0.46
Nodes (8): Bosta Brand Identity, Dark Near-Black Text Color, Diagonal Stroke Visual Effect, Gold Gradient Color Scheme, Bosta Monogram Icon, Serif Typography Style, Bosta Logo New SVG, Bosta Wordmark Typography

### Community 11 - "Favicon & Browser Icon"
Cohesion: 0.43
Nodes (7): Dark Background Rectangle, Bosta Brand Identity, Browser Tab Icon, Dark Navy Color (oklch 0.14 0.01 250), White Text Color, Letter B (favicon glyph), Favicon SVG

### Community 12 - "App Icon Design"
Cohesion: 0.29
Nodes (6): Brand Icon, Circular Shape, Red Color, White Color, Favicon / App Icon, Lettermark B

### Community 13 - "App Icon Assets"
Cohesion: 0.53
Nodes (6): Bosta App Icon, Bosta Brand Logo, Red Color (#E8000F approx), White Color, Letter B Letterform, Circular Shape Background

### Community 14 - "MCP Server Config"
Cohesion: 0.40
Nodes (4): mcpServers, shadcn, args, command

### Community 15 - "Claude AI Settings"
Cohesion: 0.40
Nodes (4): enableAllProjectMcpServers, enabledMcpjsonServers, permissions, allow

## Knowledge Gaps
- **115 isolated node(s):** `command`, `args`, `$schema`, `style`, `rsc` (+110 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Project Dependencies` to `UI Dependencies & Layout`, `Contact Form & UI`, `Build Scripts & Dev Tools`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `UI Dependencies & Layout` to `Project Dependencies`?**
  _High betweenness centrality (0.035) - this node is a cross-community bridge._
- **Why does `@/layouts/Base.astro` connect `UI Dependencies & Layout` to `Project Dependencies`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `BOSTA Landing Site Plan` (e.g. with `BOSTA Product Brief` and `BOSTA Company Knowledge Profile (Polish)`) actually correct?**
  _`BOSTA Landing Site Plan` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `BOSTA Technical Audit Report (19/20)` (e.g. with `BOSTA Audit Action Plan` and `BOSTA Design Patterns Reference Guide`) actually correct?**
  _`BOSTA Technical Audit Report (19/20)` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `command`, `args`, `$schema` to the rest of the system?**
  _115 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `UI Dependencies & Layout` be split into smaller, more focused modules?**
  _Cohesion score 0.059743954480796585 - nodes in this community are weakly interconnected._