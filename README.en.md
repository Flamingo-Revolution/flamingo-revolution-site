# Flamingo Revolution

`Flamingo Revolution` is a static site built with Astro and TypeScript. The site is served through [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/git-integration/).

The site content and navigation are in Albanian. An English version (`/en/`) exists in the codebase, but it is currently disabled.

## What The Project Includes

- Astro configured for `static site generation`
- TypeScript with `astro/tsconfigs/strict`
- Structured Albanian and English text, with public English `/en/` routes disabled
- Light mode and dark mode
- The `/projektligje` page for PDF documents and legal packages
- The `/idete-tuaja` page for publishing ideas collected through [Google Forms](https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform)
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
```

## Project Structure

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
- Albanian draft laws: `/projektligje/`
- Albanian ideas: `/idete-tuaja/`
- Contact: `/kontakt/`

Text is stored in [src/data/site.ts](src/data/site.ts) to make it easier to add new sections or languages in the future.

English pages are stored in [src/disabled-pages/en](src/disabled-pages/en). To enable them, move them to `src/pages/en/` and add `en` to the enabled locale list in [src/components/LocaleSwitch.astro](src/components/LocaleSwitch.astro).

## PDF Documents

PDFs for the draft-law page are stored in [public/documents/projektligje](public/documents/projektligje). The card data, titles, descriptions, and categories are stored in [src/data/documents.ts](src/data/documents.ts).

For Cloudflare Pages, keep each PDF under `25 MiB`. If a document is larger than that, do not add it to the repo; host it in Cloudflare R2 or another public source and add the link to the document data.

## Cloudflare Pages Deploy

The repository is served through `Cloudflare Pages` without needing `deploy.sh` or `GitHub Actions`.

Production deploys happen automatically in Cloudflare Pages every time a commit is pushed to the `main` branch. The normal workflow is:

```bash
git push origin main
```

After the push, Cloudflare picks up the latest commit, runs `pnpm build`, and publishes the generated `dist` output. `pnpm cf:deploy` is only used for manual CLI deploys.

Use these settings in the Cloudflare Pages dashboard:

- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `24.14.0` or read it from `.node-version`

The [wrangler.jsonc](wrangler.jsonc) file keeps the basic project configuration for `wrangler pages dev` and `wrangler pages deploy`. If you create a Pages project with a different name, update the `name` field in that file.

For local preview in the Pages runtime:

```bash
pnpm cf:preview
```

## Your Ideas

The `/idete-tuaja/` page gets approved ideas from a Cloudflare Pages Function at `/api/ideas`. The function reads the Google Apps Script URL from this environment variable:

```text
APPS_SCRIPT_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

For local preview with Cloudflare, copy `.dev.vars.example` to `.dev.vars` and set the real URL.

For CLI deploys after creating the Cloudflare project and credentials:

```bash
pnpm cf:deploy
```

The main domain in the configuration is set to `https://flamingorevolution.eu`.
