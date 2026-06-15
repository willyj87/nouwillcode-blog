# nouwillcode — Blog tech

Blog tech & personal branding au style « feed LinkedIn », 100 % front-end (SSG / ISR),
sans base de données ni backend custom. Le contenu vit entièrement dans **Sanity**.

## Stack

- **Next.js 16** (App Router) · **React 19** · **TypeScript** strict
- **Tailwind CSS v4** + composants façon **shadcn/ui**
- **Sanity v5** — Studio embarqué sur [`/studio`](http://localhost:3000/studio)
- **GROQ** pour le requêtage · **@portabletext/react** pour le rendu riche
- **@sanity/code-input** + **Shiki** pour les blocs de code colorés
- Déploiement cible : **Dokploy**

## Démarrer

```bash
pnpm install
pnpm dev
```

- Front : http://localhost:3000
- Sanity Studio : http://localhost:3000/studio

Crée d'abord un **Auteur**, quelques **Tags**, puis des **Articles** dans le Studio.

## Variables d'environnement

Copier `.env.local.example` → `.env.local` (déjà généré par `sanity init`) :

```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
```

## Architecture

```
src/
├─ app/
│  ├─ (site)/                  # Site public (header + feed/sidebar)
│  │  ├─ layout.tsx
│  │  ├─ page.tsx              # Feed des articles (ISR 60s)
│  │  └─ posts/[slug]/page.tsx # Article (SSG + ISR)
│  ├─ studio/[[...tool]]/      # Sanity Studio embarqué
│  └─ layout.tsx               # Root layout (fonts, metadata)
├─ components/
│  ├─ ui/                      # Primitives (card, button, badge, avatar…)
│  ├─ feed/post-card.tsx
│  ├─ layout/                  # site-header, profile-sidebar, tag-list
│  ├─ portable/                # PortableText + CodeBlock (Shiki)
│  └─ icons/brand-icons.tsx
├─ lib/                        # utils (cn), format (date, reading time)
└─ sanity/
   ├─ env.ts
   ├─ lib/                     # client, image (urlFor), queries (GROQ), highlight
   ├─ schemaTypes/             # post, author, category, blockContent
   └─ structure.ts
```

## Scripts

```bash
pnpm dev      # serveur de dev
pnpm build    # build de production
pnpm start    # serveur de production
pnpm lint     # ESLint
```

## Déploiement (Dokploy)

Build standard Next.js. Renseigner les 3 variables `NEXT_PUBLIC_SANITY_*`
dans Dokploy. (Étape suivante : ajouter un `Dockerfile` + `output: 'standalone'`
dans `next.config.ts`.)
