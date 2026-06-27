# Flamingo Revolution

`Flamingo Revolution` is a static Astro + TypeScript site with Albanian and English localization. Albanian is the default language at `/`, and the English version lives at `/en/`.

## What’s included

- Astro configured for static site generation
- TypeScript using `astro/tsconfigs/strict`
- Structured localization for Albanian and English
- A branded landing page with light and dark themes
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
- English: `/en/`

Copy is centralized in [src/data/site.ts](src/data/site.ts) so the site can be extended without duplicating content logic.

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

For CLI deploys after the Cloudflare project and credentials are ready:

```bash
pnpm cf:deploy
```

The canonical site URL is configured as `https://flamingorevolution.eu`.
