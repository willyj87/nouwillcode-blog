---
name: nouwillcode
description: A sharp, reading-first personal tech blog — The Engineer's Notebook.
colors:
  brand-indigo: "oklch(0.54 0.21 277)"
  brand-indigo-dark: "oklch(0.7 0.16 277)"
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  muted: "oklch(0.97 0.004 277)"
  muted-foreground: "oklch(0.49 0.01 277)"
  accent: "oklch(0.96 0.02 277)"
  accent-foreground: "oklch(0.4 0.16 277)"
  secondary: "oklch(0.97 0 0)"
  border: "oklch(0.922 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  dark-background: "oklch(0.145 0 0)"
  dark-foreground: "oklch(0.985 0 0)"
  dark-card: "oklch(0.205 0 0)"
  dark-muted-foreground: "oklch(0.72 0.012 277)"
typography:
  display:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "normal"
  body:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Outfit, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.85rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
rounded:
  sm: "0.375rem"
  md: "0.5rem"
  lg: "0.75rem"
  xl: "0.875rem"
  full: "9999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  section: "clamp(4rem, 8vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.brand-indigo}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    typography: "{typography.label}"
    height: "2.25rem"
    padding: "0 0.625rem"
  button-primary-hover:
    backgroundColor: "oklch(0.54 0.21 277 / 0.8)"
    textColor: "{colors.background}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    typography: "{typography.label}"
    height: "2rem"
    padding: "0 0.625rem"
  button-ghost-hover:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
  badge-default:
    backgroundColor: "{colors.brand-indigo}"
    textColor: "{colors.background}"
    rounded: "{rounded.full}"
    typography: "{typography.label}"
    height: "1.25rem"
    padding: "0.125rem 0.5rem"
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.xl}"
    padding: "1rem"
  code-block:
    backgroundColor: "{colors.dark-card}"
    textColor: "{colors.dark-foreground}"
    typography: "{typography.code}"
    rounded: "{rounded.md}"
    padding: "1rem 1.15rem"
---

# nouwillcode Design System

## Overview

**The Engineer's Notebook.** nouwillcode is a personal tech blog where the reading experience *is* the credential. The system is clean, precise, and ink-on-paper focused: a near-white (or near-black) canvas, high-contrast neutral ink, and a single deliberate indigo signal that never turns the page noisy. Nothing on the page competes with the words.

The mood is **sharp, technical, opinionated** — confident hierarchy, decisive contrast, no hedging. It should read as one specific engineer's voice, never as a template. The visual system serves the writing: generous line-height, a capped measure, and code blocks that feel engineered rather than bolted on.

**It should NOT feel like** a generic Medium/template blog — interchangeable card grids, timid gray-on-gray text, or a cluttered surface with widgets and sidebars fighting the content. Restraint here is a choice in service of focus, not an absence of decisions.

The system is built on Tailwind CSS v4 with shadcn-style primitives, themed entirely through CSS custom properties (single source of truth in `globals.css`). Light and dark are first-class; both must pass contrast.

## Colors

The palette is **monochrome ink on a clean canvas, with one committed indigo signal.** Neutrals carry the structure; hue appears only where it means something — primary actions, links, focus rings, and the featured "signal" dot. This is the discipline that keeps the page reading-first.

- **Ink & canvas (neutral):** `foreground` `oklch(0.145 0 0)` on `background` `oklch(1 0 0)` in light; inverted to `oklch(0.985 0 0)` on `oklch(0.145 0 0)` in dark. These carry all body text and structure.
- **Brand indigo (the signal):** `brand-indigo` `oklch(0.54 0.21 277)` in light, lifted to `oklch(0.7 0.16 277)` in dark so it carries on dark ink. Used for primary buttons, links, `ring` (focus), and the featured accent — never as decorative fill.
- **Muted / accent:** neutrals with a whisper of the indigo hue (chroma ≤ 0.02) for surfaces, secondary text, and hover states, so tinting stays coherent with the brand rather than drifting warm.
- **Destructive:** `oklch(0.577 0.245 27.325)` for errors, used at low-opacity tints for badges/buttons.

**Contrast is non-negotiable (WCAG 2.1 AA).** Body text hits ≥ 4.5:1; the usual risk is `muted-foreground` on tinted surfaces — verify it in both themes before shipping. Never drop body copy to a light gray "for elegance."

## Typography

Two families on a clear contrast axis, no reflexive pairing:

- **Outfit** (geometric sans) for everything structural — display, headings, titles, body, and labels. Body runs at `1.125rem / 1.7` for comfortable long-form reading; measure is capped at **65–75ch**.
- **JetBrains Mono** for code only. Mono is reserved for what is literally code — never as decorative "developer" costume in UI chrome.

Headings use a committed modular scale with fluid `clamp()`, tight tracking (`-0.02em` on display, easing toward `normal` at body sizes), and `text-wrap: balance` on h1–h3. Display max stays ≤ `3.75rem` — confident, not shouting. Prose uses `text-wrap: pretty` to reduce orphans. On dark backgrounds, add 0.05–0.1 to line-height to compensate for lighter-reading type.

> Note: `--font-heading` currently maps to the same family as `--font-sans` (Outfit). If a display face is ever introduced for headings, it belongs here — pair on a real contrast axis (serif + this geometric sans), never two similar sans-serifs.

## Elevation

**Flat, ring-based, tonal.** The system avoids drop-shadow elevation almost entirely. Depth comes from:

- **Hairline rings and borders:** cards use a `ring-1 ring-foreground/10`; the global border is a single low-contrast neutral. Structure is drawn, not floated.
- **Tonal layering:** surfaces separate by lightness (`background` → `card` → `muted`), not by shadow. Card footers sit on a `muted/50` tint with a top border.
- **Focus is the one loud state:** a 3px `ring-ring/50` in the brand indigo. It must always be visible for keyboard users.

Reserve any real shadow for genuinely floating layers (dropdowns, dialogs, toasts) via the semantic z-index scale. Decorative shadows are off-brand.

## Components

- **Button.** shadcn/CVA-based. Primary = solid indigo, `rounded-full` for hero/marketing CTAs (default variant is `rounded-lg` at small sizes). Variants: `default`, `outline`, `secondary`, `ghost`, `destructive` (low-opacity tint), `link`. Hover dims primary to 80%; `active` nudges `translate-y-px` for tactile feedback.
- **Badge.** Pill (`rounded-4xl`), `h-5`, used for categories/tags. `secondary` (neutral) is the default reading-surface choice; `default` (solid indigo) for emphasis.
- **Card.** `rounded-xl`, `ring-1 ring-foreground/10`, `--card-spacing` token (4, or 3 at `sm`). Images bleed to the card edges (rounded top/bottom). **Use cards only when they're the right affordance** — the homepage feed favors an editorial timeline over a samey card grid. Never nest cards.
- **Code block.** Shiki-highlighted, dark surface in both themes, `rounded-md`, JetBrains Mono at `0.85rem / 1.6`. This is a signature detail — it should feel precise and engineered.
- **Navbar / Footer / Portable Text.** Layout chrome stays quiet; portable-text rendering carries the article body and must honor the capped measure and body scale above.

Every base UI component is generated via the shadcn CLI and composed with the `cn()` utility. Don't hand-roll primitives that shadcn provides.

## Do's and Don'ts

**Do**
- Defend the words: body ≥ 4.5:1 contrast, capped 65–75ch measure, generous line-height.
- Keep indigo as a deliberate signal (actions, links, focus) — let neutrals do the structural work.
- Use tonal layering + hairline rings for depth; keep the surface flat and calm.
- Reserve JetBrains Mono strictly for code.
- Make every animation respect `prefers-reduced-motion`; keep entrance motion intentional and per-element, not a uniform fade-on-scroll reflex.
- Verify headings and copy at every breakpoint — the viewport is part of the design.

**Don't**
- Ship a generic card grid where each card is icon + heading + text repeated — that's the anti-reference.
- Drop body copy to light gray "for elegance," or let `muted-foreground` fail contrast on tinted surfaces.
- Add side-stripe borders, gradient text, glassmorphism, or hero-metric templates (shared absolute bans).
- Put a tiny uppercase tracked eyebrow or `01 / 02 / 03` marker above every section.
- Use mono for non-code UI chrome as "developer" flavor.
- Let decorative shadows or nested cards creep in.
