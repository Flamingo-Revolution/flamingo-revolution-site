# Flamingo Revolution

`Flamingo Revolution` is a static Astro + TypeScript site. Albanian is the active public language at `/`. English copy and components remain in the codebase, but `/en/` routes are disabled for now.

## What’s included

- Astro configured for static site generation
- TypeScript using `astro/tsconfigs/strict`
- Structured Albanian and English copy, with public English routes currently disabled
- A branded landing page with light and dark themes
- A `/projektligje` PDF library for legal packages and draft-law documents
- Styling derived from the flamingo logo with coral and sky-blue accents

## Local development

This project requires `Node.js 22.12+` and uses `pnpm` as the primary package manager. The repo includes both `.node-version` and `.nvmrc` set to `24.14.0` to make the expected runtime explicit.

```bash
pnpm install
pnpm dev
```

The local site will usually be available at `http://localhost:4321`.

If your environment is still using an older Node release, switch to the project version first with your preferred version manager.

## Scripts

```bash
pnpm dev
pnpm build
pnpm preview
pnpm cf:preview
pnpm cf:deploy
```

## Main structure

```text
.
├─ public/
│  ├─ documents/
│  └─ images/
├─ src/
│  ├─ components/
│  ├─ data/
│  ├─ layouts/
│  ├─ pages/
│  │  └─ en/
│  └─ styles/
├─ README.md
└─ README.en.md
```

## Localization

- Albanian: `/`
- Albanian draft-law library: `/projektligje/`
- Albanian ideas: `/idete-tuaja/`

Copy is centralized in [src/data/site.ts](src/data/site.ts) so the site can be extended without duplicating content logic.

The disabled English Astro pages live in [src/disabled-pages/en](src/disabled-pages/en). To enable them again, move them back into `src/pages/en/` and add `en` to the enabled locale list in [src/components/LocaleSwitch.astro](src/components/LocaleSwitch.astro).

## PDF documents

PDFs for the draft-law library live in [public/documents/projektligje](public/documents/projektligje). Card data, titles, summaries and categories live in [src/data/documents.ts](src/data/documents.ts).

For Cloudflare Pages, keep each PDF under `25 MiB`. If a document is larger than that, do not commit it to the repo; host it in Cloudflare R2 or another public source and point the document data to that URL.

## Branding

The logo is stored at [public/images/flamingo-logo.jpg](public/images/flamingo-logo.jpg). The design palette uses:

- coral/pink for primary accents
- airy blues for light backgrounds
- deeper navy-blues for dark mode contrast

## Cloudflare Pages deployment

The repo is now prepared for `Cloudflare Pages` without requiring a mandatory `deploy.sh` or `GitHub Actions` workflow.

Use these settings in the Cloudflare Pages dashboard:

- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `24.14.0` or let Pages read `.node-version`

The base Pages configuration lives in [wrangler.jsonc](wrangler.jsonc) for `wrangler pages dev` and `wrangler pages deploy`. If you create the Pages project under a different name, update the `name` field in that file.

For local preview in the Pages runtime:

```bash
pnpm cf:preview
```

## Your Ideas

The `/idete-tuaja/` page loads approved ideas through a Cloudflare Pages Function
at `/api/ideas`. The function reads the Google Apps Script URL from this
environment variable:

```text
APPS_SCRIPT_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

For local Cloudflare preview, copy `.dev.vars.example` to `.dev.vars` and set the
real URL. Do not commit `.dev.vars`.

For CLI deploys after the Cloudflare project and credentials are ready:

```bash
pnpm cf:deploy
```

The canonical site URL is configured as `https://flamingorevolution.eu`.
