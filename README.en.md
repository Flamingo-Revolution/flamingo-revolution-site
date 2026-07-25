# Flamingo Revolution

`Flamingo Revolution` is an Astro and TypeScript site deployed to [Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/). Public pages are prerendered, while the ideas API runs on demand in the Worker.

The site content and navigation are in Albanian. An English version (`/en/`) exists in the codebase, but it is currently disabled.

## What The Project Includes

- Astro configured for `static site generation`
- TypeScript with `astro/tsconfigs/strict`
- Structured Albanian and English text, with public English `/en/` routes disabled
- Light mode and dark mode
- The `/projektligje` page for PDF documents and legal packages
- The `/idete-tuaja` page for submitting and browsing civic ideas
- The `/kontakt` page for the [official email](mailto:info@flamingorevolution.eu) and social links: [Discord](https://discord.gg/jzznwrMFc), [Instagram](https://www.instagram.com/flamingotelevision), and [YouTube](https://www.youtube.com/@flamingorevolution2026)

## Volunteering

This project requires `Node.js 22.12+` and uses `pnpm` as the package manager.

```bash
pnpm install
pnpm dev
```

The local server usually opens at `http://localhost:4321`.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm cf:preview
pnpm cf:deploy
pnpm db:generate
pnpm db:migrate
pnpm db:migrate:deploy
pnpm db:studio
```

## Project Structure

```text
.
├─ public/
│  ├─ documents/
│  └─ images/
├─ prisma/
│  ├─ schema.prisma
│  └─ migrations/
├─ functions/
│  ├─ api/
│  └─ lib/
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ layouts/
│  ├─ pages/
│  │  └─ en/
│  └─ styles/
├─ prisma.config.ts
├─ README.md
└─ README.en.md
```

## Database (Neon + Prisma)

The project uses [Neon](https://neon.tech) Postgres with Prisma.

| Variable | Where | Purpose |
|----------|-------|---------|
| `DIRECT_URL` | `.env` (gitignored) | Prisma CLI (`migrate`, `studio`) — direct host, no `-pooler` |
| `DATABASE_URL` | `.env` locally; Cloudflare Worker secret in deploy | Runtime API routes — pooled (`-pooler`) host |

```bash
cp .env.example .env
```

Then paste the real strings from the Neon dashboard (include `?sslmode=require`). Wrangler reads `.env` during `pnpm cf:preview`.

```bash
pnpm db:migrate --name init_ideas_votes   # CLI uses DIRECT_URL
pnpm db:studio                            # inspect tables
pnpm cf:preview                           # Functions + DB (not `astro dev`)
curl http://127.0.0.1:8788/api/health/db
```

Use `pnpm cf:preview` to build and run the site in Cloudflare's local `workerd` runtime.

## Localization

- Albanian: `/`
- Albanian draft laws: `/projektligje/`
- Albanian ideas: `/idete-tuaja/`
- Contact: `/kontakt/`

Text is stored in [src/data/site.ts](src/data/site.ts) to make it easier to add new sections or languages in the future.

English pages are stored in [src/disabled-pages/en](src/disabled-pages/en). To enable them, move them to `src/pages/en/` and add `en` to the enabled locale list in [src/components/LocaleSwitch.astro](src/components/LocaleSwitch.astro).

## PDF Documents

PDFs for the draft-law page are stored in [public/documents/projektligje](public/documents/projektligje). The card data, titles, descriptions, and categories are stored in [src/data/documents.ts](src/data/documents.ts).

Keep each static PDF under Cloudflare Workers' per-asset size limit. If a document is larger, host it in Cloudflare R2 or another public source and add the link to the document data.

## Cloudflare Workers Deploy

The [wrangler.jsonc](wrangler.jsonc) file configures the Astro application for Cloudflare Workers. Store `DATABASE_URL` as an encrypted Worker secret, then deploy:

```bash
pnpm exec wrangler secret put DATABASE_URL
pnpm cf:deploy
```

The deployment is first available on a `workers.dev` URL. Use `pnpm cf:preview` for a local preview in Cloudflare's `workerd` runtime.

## Your Ideas

The `/idete-tuaja/` page loads published ideas from Neon Postgres via Astro API routes running in Cloudflare Workers.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ideas` | `GET` | Visible ideas (`?fingerprint=` optional for `userVote`) |
| `/api/ideas` | `POST` | Create an idea (`content` + `fingerprint`) |
| `/api/ideas/[id]` | `PATCH` | Set submitter name (`name` + `fingerprint`) |
| `/api/ideas/[id]/vote` | `POST` | Vote `UP`/`DOWN` (same vote again removes it) |
| `/api/ideas/[id]/vote` | `DELETE` | Remove this device's vote |

For local Cloudflare preview, keep `DATABASE_URL` and `DIRECT_URL` in `.env`. In production, store the pooled `DATABASE_URL` with `wrangler secret put DATABASE_URL`; keep `DIRECT_URL` only in the local or CI build environment.

```bash
pnpm cf:deploy
```

The main domain in the configuration is set to `https://flamingorevolution.eu`.
