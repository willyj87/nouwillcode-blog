# Product

## Register

brand

## Users

Two overlapping audiences visit nouwillcode:

- **Developer peers** who arrive from a link (post shared in a community, search, or social) and want to read something substantial. They judge credibility fast, skim for depth, and stay only if the writing and the reading experience respect their time.
- **Recruiters and potential clients** doing due diligence on the person behind the work. They aren't here to read every article — they're forming an impression of taste, rigor, and range in under a minute.

The job to be done is the same for both: *understand who this engineer is and whether their thinking is worth trusting.* The blog is the proof, and the surface itself is part of the argument.

## Product Purpose

nouwillcode is a personal tech blog and branding surface — a "LinkedIn-feed-style" front-end (SSG/ISR) with content authored in Sanity. It exists to publish tech articles, lessons learned, and engineering notes, and to package them so the reading experience *is* the credential. Success is: a peer reads to the end and remembers the author; a recruiter leaves convinced this person has sharp, opinionated technical judgment. The site should feel authored, not templated.

## Brand Personality

**Sharp, technical, opinionated.** The voice has a point of view and isn't afraid to take a stance. Confident without being loud; precise without being cold. Reading-first, in the spirit of Stripe's documentation — typography and focus carry the experience, and nothing on the page competes with the words. Tone is direct, first-person, and expert. The emotional goal: a reader thinks *"this person knows what they're talking about, and I want to keep reading."*

## Anti-references

- **Generic Medium / template blogs.** Interchangeable card grids, no authorial voice, the same layout every other blog ships. If a section could be lifted onto anyone else's blog unchanged, it has failed.
- Cluttered reading surfaces — ad slots, widget sidebars, popups, engagement bait around the content.
- Corporate/sterile SaaS-marketing gloss where the person disappears behind a brand system.

## Design Principles

1. **Reading is the product.** Every decision on an article page defends the words — measure, rhythm, contrast, and focus come before ornament. When in doubt, remove what competes with the text.
2. **Authored, not templated.** The site must read as one specific person's voice. Prefer distinctive typographic and layout decisions over safe defaults; a samey card grid is a failure state, not a starting point.
3. **Opinion earns attention.** Match the sharp/opinionated voice with decisive design — committed hierarchy, confident contrast, no hedging. Restraint is a choice, not a reflex.
4. **Credibility in the details.** Peers and recruiters both read the craft. Code blocks, spacing, motion, and states should feel engineered — polish is the proof of the claim.
5. **Fast and frictionless.** SSG/ISR, no heavy client runtime where it isn't needed. Performance is part of the reading experience.

## Accessibility & Inclusion

- **WCAG 2.1 AA** as the baseline: body text ≥ 4.5:1 contrast (large text ≥ 3:1), full keyboard navigation, visible focus states, semantic landmarks and heading order.
- Light and dark themes must both pass contrast — verify the muted/foreground pairings, which are the usual failure point.
- Respect `prefers-reduced-motion` for every animation (crossfade or instant fallback).
- `<html lang="en">`; all UI and content in English per project convention.
