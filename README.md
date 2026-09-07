# Flamingo Revolution

`Flamingo Revolution` is an Albanian civic platform built with Astro, TypeScript, and Svelte and deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/). Content pages are prerendered where possible, while database-backed APIs run on demand in the Worker and store data in Neon Postgres through Prisma.

The public site is currently Albanian-first. English copy and a small set of English pages remain in the codebase, but English routes and the locale switch are disabled until that experience is complete.

## Table of Contents

- [What the Project Includes](#what-the-project-includes)
- [Public Routes](#public-routes)
- [Technology](#technology)
- [Volunteering and Local Development](#volunteering-and-local-development)
- [Environment Variables](#environment-variables)
  - [Flamingo Bot](#flamingo-bot)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Content Management](#content-management)
  - [Blog](#blog)
  - [Referendum](#referendum)
  - [PDF Documents and Flamingo Times](#pdf-documents-and-flamingo-times)
  - [Localization](#localization)
- [Runtime APIs](#runtime-apis)
  - [Flamingo News Reporters](#flamingo-news-reporters)
- [Cloudflare Deployment](#cloudflare-deployment)

## What the Project Includes

- A campaign landing page explaining the movement, its demands, and ways to participate
- A referendum hub for the initiative to repeal Law no. 21/2024, including supporting documents, facts, FAQs, status updates, and newsletter registration
- A protest history, timeline, register, and gallery area
- A searchable draft-law library with PDFs that can be opened or downloaded
- A civic ideas board where visitors can submit ideas, optionally add a display name, sort the feed, and vote from their device
- A searchable **Flamingo Times** archive with six web editions and downloadable newspaper PDFs
- A Markdown-powered blog with typed author references, draft support, and statically generated article pages
- Embedded protest-map and dossier applications, plus a protest-pulse page linking to the full external data platform
- An About page covering the movement, mission, partners, contact details, and social channels
- Placeholder pages for the Diaspora Zbarkon and Reporterët e Diasporës projects
- Shared responsive navigation, light and dark themes, accessible skip links, and mobile layouts
- Canonical URLs, Open Graph and X/Twitter metadata, a generated sitemap, `robots.txt`, `llms.txt`, favicons, and social cards
- Optional Umami analytics, per-client API rate limiting, validation, and device-based vote tracking
- Prisma migrations and seed data for local database development

## Public Routes

| Route | Purpose |
|-------|---------|
| `/` | Main campaign and movement overview |
| `/referendum/` | Referendum initiative, current status, newsletter signup, and supporting content |
| `/protestat/` | Protest history, timeline, register, and gallery |
| `/blog/` | Blog index and published Markdown articles |
| `/projektligje/` | Searchable draft-law and PDF library |
| `/idete-tuaja/` | Submit, browse, sort, and vote on civic ideas |
| `/flamingo-times/` | Latest Flamingo Times edition |
| `/flamingo-times/artikujt/` | Searchable archive of all editions |
| `/harta/` | Embedded interactive protest map |
| `/dosjet/` | Embedded Flamingo dossier application |
| `/pulsi-protestes/` | Protest participation overview and external data link |
| `/rreth-nesh/` | About the movement, partners, contact details, and social links |
| `/diaspora-zbarkon/` | Diaspora Zbarkon project placeholder |
| `/news/` | Published Flamingo News articles, filterable by tag |
| `/news/<slug>/` | A single published article |
| `/redaksia/panel/` | Reporter workspace: login, article dashboard, and editor (noindex, access-key gated) |
| `/reporteret-e-diaspores/` | Diaspora reporters project placeholder |

`/kontakt/` permanently redirects to `/rreth-nesh/#kontakt`. Legacy pulse routes redirect to `/pulsi-protestes/`.

## Technology

- [Astro](https://astro.build/) with the Cloudflare adapter and server output
- TypeScript using Astro's strict configuration
- [Svelte](https://svelte.dev/) for interactive ideas, referendum navigation, FAQs, and newsletter signup
- [Neon Postgres](https://neon.tech/) and [Prisma](https://www.prisma.io/) for ideas, votes, and newsletter registrations
- [Cloudflare Workers](https://workers.cloudflare.com/) for hosting and runtime API routes
- Astro content collections for blog posts, authors, and referendum content
- [Tiptap](https://tiptap.dev/) for the reporter article editor
- Sharp for generating favicon and social-card assets

## Volunteering and Local Development

The project requires Node.js `22.12+` and uses `pnpm`.

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The Astro development server usually opens at `http://localhost:4321`. `pnpm dev` is enough for content and UI work. Use `pnpm cf:preview` when testing Worker runtime behavior or database-backed APIs.

## Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `DIRECT_URL` | Local `.env` or CI | Direct Neon connection used by Prisma CLI commands |
| `DATABASE_URL` | Local `.env` and Cloudflare secret | Pooled Neon connection used by runtime API routes |
| `DISCORD_WEBHOOK_URL` | Local `.env` and Cloudflare secret | Discord incoming webhook notified after a new idea is saved |
| `PUBLIC_UMAMI_SCRIPT` | Local/deployment environment | Optional Umami script URL |
| `PUBLIC_UMAMI_DATA_WEBSITE_ID` | Local/deployment environment | Optional Umami website identifier |
| `PUBLIC_FLAMINGO_BOT_URL` | Local/Cloudflare build environment | Optional public override for the deployed Flamingo Bot service origin; no runtime secret is required |

Copy `.env.example` and replace its placeholders with real values. Neon connection strings should include `?sslmode=require`; use the direct host for `DIRECT_URL` and the pooled host for `DATABASE_URL`.

### Flamingo Bot

The site integrates the independently deployed [`flamingo_bot`](https://github.com/Flamingo-Revolution/flamingo_bot) custom element through `src/components/FlamingoBot.astro`. By default it uses `https://flamingo-bot-949711463853.europe-west3.run.app`; `PUBLIC_FLAMINGO_BOT_URL` can override that origin for local development or another deployment. The component loads `/widget/flamingo-chat.js` from the selected origin and uses the same origin for chat requests.

The component bridges the site's existing design tokens into the widget's open shadow root. Light and dark theme changes therefore update the launcher, dialog surfaces, text, borders, focus rings, and fonts without copying or rebuilding the bot repository. The bot service must allow the site's exact origin through `FLAMINGO_ALLOWED_ORIGINS` as described in its widget integration runbook.

During local development, the site relays only the widget bundle, avatar media, and chat endpoint through `/api/flamingo-bot/`. This keeps the production bot's origin allowlist narrow while allowing the local preview to use the real service. The relay returns `404` in production builds.

## Scripts

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Start the Astro development server |
| `pnpm build` | Generate Prisma Client and create a production build |
| `pnpm preview` | Preview the current Astro build |
| `pnpm cf:preview` | Build and preview in Cloudflare's local `workerd` runtime |
| `pnpm cf:deploy` | Build and deploy the Worker |
| `pnpm assets:generate` | Regenerate PNG icons and the default social card from `public/favicon.svg` |
| `pnpm db:generate` | Regenerate Prisma Client |
| `pnpm db:migrate --name <name>` | Create and apply a development migration |
| `pnpm db:migrate:deploy` | Apply existing migrations in a deployment environment |
| `pnpm db:seed` | Seed the ideas database |
| `pnpm db:studio` | Open Prisma Studio |

## Project Structure

```text
.
├─ prisma/
│  ├─ migrations/          # Database migrations
│  ├─ seed/                # Local seed data
│  └─ schema.prisma        # Ideas, votes, and newsletter models
├─ public/
│  ├─ documents/           # Draft-law, source-law, and Flamingo Times PDFs
│  ├─ images/              # Logos, issue artwork, and QR codes
│  └─ referendum/          # Public referendum documents and media
├─ scripts/                # Asset-generation utilities
├─ src/
│  ├─ components/          # Astro and Svelte UI components
│  ├─ content/blog/        # Markdown blog posts
│  ├─ content/referendum/  # Referendum articles, facts, and supporting assets
│  ├─ data/                # Site copy and structured page metadata
│  ├─ disabled-pages/en/   # English pages not currently published
│  ├─ layouts/             # Shared site and referendum layouts
│  ├─ lib/                 # Database, environment, identity, and API helpers
│  ├─ pages/               # Public pages and API routes
│  ├─ styles/              # Global, prose, newspaper, and referendum styles
│  ├─ content.config.ts    # Content collection schemas
│  └─ middleware.ts        # API rate limiting
├─ astro.config.mjs
├─ prisma.config.ts
└─ wrangler.jsonc
```

## Content Management

Most shared Albanian and English site copy lives in `src/data/site.ts`. Page-specific content and metadata are organized in `src/data/`, including documents, protest history, referendum sections, and Flamingo Times issues.

### Blog

Add each post as an `index.md` file under its own directory in `src/content/blog/`. Frontmatter is validated by `src/content.config.ts`:

```yaml
---
title: Titulli i artikullit
description: Një përmbledhje e shkurtër.
pubDate: 2026-08-13
updatedDate: 2026-08-14 # optional
author: redaksia
draft: false # optional; defaults to false
---
```

Author IDs and profiles are defined in `src/data/authors.json`. Posts marked `draft: true` are excluded from the blog index and generated article routes.

### Referendum

Referendum Markdown and colocated assets live in `src/content/referendum/`. The collection accepts `title`, optional `description`, optional `order`, and an optional `draft` flag. Shared referendum data is stored in `src/data/referendum*.ts`, while reusable UI lives in `src/components/referendum/`.

### PDF Documents and Flamingo Times

Draft laws and related legal documents live under `public/documents/`; add library card data to `src/data/documents.ts`. Flamingo Times PDFs belong in `public/documents/flamingo-times/`, with issue metadata in `src/data/flamingoTimes.ts`.

Keep each static file below Cloudflare Workers' per-asset size limit. Larger documents should be hosted in R2 or another public store and referenced by URL.

### Localization

- Albanian uses unprefixed routes such as `/`, `/projektligje/`, and `/idete-tuaja/`.
- English source pages are kept in `src/disabled-pages/en/` and English copy remains in the data files.
- To restore English, move completed pages into `src/pages/en/` and add `en` to `enabledLocaleCodes` in `src/components/LocaleSwitch.astro`.

## Runtime APIs

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ideas` | `GET` | List visible ideas; accepts optional `fingerprint` and `sort` query parameters |
| `/api/ideas` | `POST` | Create an idea using `content` and `fingerprint` |
| `/api/ideas/[id]` | `PATCH` | Set the submitter's display name using `name` and `fingerprint` |
| `/api/ideas/[id]/vote` | `POST` | Vote `UP` or `DOWN`; repeating the same vote removes it |
| `/api/ideas/[id]/vote` | `DELETE` | Remove the current device's vote |
| `/api/newsletter` | `GET` | Return the signup count for an allowed reason |
| `/api/newsletter` | `POST` | Register an email address for referendum updates |
| `/api/reporter/login` | `POST` | Exchange a reporter access key for an HttpOnly session cookie |
| `/api/reporter/logout` | `POST` | Destroy the current reporter session |
| `/api/reporter/me` | `GET` | Return the authenticated reporter, or 401 |
| `/api/reporter/articles` | `GET` / `POST` | List the reporter's articles / create a new draft |
| `/api/reporter/articles/[id]` | `GET` / `PATCH` / `DELETE` | Load, save, publish (`action: "publish"`), unpublish, or delete an article |
| `/api/reporter/media` | `POST` | Upload an article image (multipart) to the R2 `flamingo-media` bucket |
| `/media/[key]` | `GET` | Publicly serve uploaded article media from R2 with immutable caching |

### Flamingo News Reporters

Article writing is restricted to whitelisted reporters. Create one (or rotate a key) with:

```bash
pnpm reporter:create --name "Emri Mbiemri"
```

The command prints the access key once; only its SHA-256 hash is stored. Reporters sign in at `/redaksia/panel/` and write articles in a Tiptap editor. Content is stored as Tiptap JSON in the `articles` table in Neon.

Published articles appear at `/news/`, rendered server-side from the stored Tiptap JSON by `src/lib/articles/render.ts`, which only emits an allowlisted set of tags, marks and URL schemes. Drafts are never exposed.

Article images upload to the R2 bucket declared in `wrangler.jsonc` (`flamingo-media`) via file picker, paste, or drag-and-drop, and are served through the Worker at `/media/<key>`. Local preview simulates the bucket automatically; in production the bucket must exist in the Cloudflare account (R2 → Create bucket → `flamingo-media`) before deploying. External image URLs are still accepted.

For a local end-to-end check:

```bash
pnpm db:migrate --name local_setup
pnpm db:seed
pnpm cf:preview
```

## Cloudflare Deployment

`wrangler.jsonc` configures the Worker, static asset binding, Node.js compatibility, and observability. Store the pooled database URL and Discord webhook URL as encrypted Worker secrets before deploying:

```bash
pnpm exec wrangler secret put DATABASE_URL
pnpm exec wrangler secret put DISCORD_WEBHOOK_URL
pnpm cf:deploy
```

The configured production site is [flamingorevolution.eu](https://flamingorevolution.eu).

## Zogjtë e Axhituar game

The games hub includes the bundled React game at `/lojerat/zogjte-e-axhituar/`.
See [game setup](games/zogjte-e-axhituar/README.md) for build details and Supabase
leaderboard configuration. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
in the root `.env` and the production build environment to enable online scores.
