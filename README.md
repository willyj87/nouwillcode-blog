# nouwillcode — Tech blog

LinkedIn-style tech blog and personal branding site, fully frontend (SSG / ISR) with no custom backend. Content is fully managed in **Sanity**.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** strict mode
- **Tailwind CSS v4** + **shadcn/ui**-style components
- **Sanity v5** with embedded Studio at [`/studio`](http://localhost:3000/studio)
- **GROQ** for querying and **@portabletext/react** for rich content rendering
- **@sanity/code-input** + **Shiki** for syntax-highlighted code blocks
- Deployment target: **Vercel**

## Start locally

```bash
pnpm install
pnpm dev
```

- Site: http://localhost:3000
- Sanity Studio: http://localhost:3000/studio

Create an **Author**, a few **Tags**, and then **Posts** in Studio.

## Environment variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Required variables:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

## Architecture

```text
src/
├─ app/
│  ├─ (site)/                  # Public site (header + feed/sidebar)
│  │  ├─ layout.tsx
│  │  ├─ page.tsx              # Post feed (ISR 60s)
│  │  └─ posts/[slug]/page.tsx # Post page (SSG + ISR)
│  ├─ studio/[[...tool]]/      # Embedded Sanity Studio
│  └─ layout.tsx               # Root layout (fonts, metadata)
├─ components/
│  ├─ ui/                      # Primitives (card, button, badge, avatar...)
│  ├─ feed/post-card.tsx
│  ├─ layout/                  # site-header, profile-sidebar, tag-list
│  ├─ portable/                # PortableText + CodeBlock (Shiki)
│  └─ icons/brand-icons.tsx
├─ lib/                        # Helpers (cn), formatting (date, reading time)
└─ sanity/
   ├─ env.ts
   ├─ lib/                     # client, image (urlFor), queries (GROQ), highlight
   ├─ schemaTypes/             # post, author, category, blockContent
   └─ structure.ts
```

## Scripts

```bash
pnpm dev      # development server
pnpm build    # production build
pnpm start    # production server
pnpm lint     # ESLint
```

## CI/CD to Vercel

This repository now includes `.github/workflows/vercel-cicd.yml`:

1. Runs lint + build on `pull_request` and `push` to `main`
2. Deploys a **preview** build to Vercel after successful CI

Set these GitHub repository secrets before deployment:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Generate values from your Vercel account:

1. `VERCEL_TOKEN`: create a token in Vercel account settings
2. `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: run `vercel link`, then read `.vercel/project.json`
