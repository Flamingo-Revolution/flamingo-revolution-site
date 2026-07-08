# Revolucioni Flamingo

`Revolucioni Flamingo` eshte nje "site" statik i ndertuar me Astro dhe TypeScript. "Site"-i serviret permes [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/git-integration/).

Permbajtja e informacionit dhe mekanizmave te lundrimit (navigation) eshte ne shqip. Ekziston dhe nje version ne anglisht (`/en/`), por per momentin eshte i caktivizuar.

## Cfare perfshin projekti

- Astro me konfigurim `static site generation`
- TypeScript me `astro/tsconfigs/strict`
- Tekst i strukturuar ne shqip dhe anglisht, me rruget publike anglisht `/en/` te caktivizuara
- Light mode dhe dark mode
- Faqen `/projektligje` per dokumente PDF dhe paketa ligjore
- Faqen `/idete-tuaja` per stampimin e ideve te mbledhura permes [Google Forms](https://docs.google.com/forms/d/e/1FAIpQLSf10Lhvh55HT0iN5TSkqagKdVXVVNxquXsUweDSffp2dMjuWw/viewform)
- Faqen `/kontakt` per ["email"-in zyrtar](mailto:info@flamingorevolution.eu) dhe rrjete sociale: [Discord](https://discord.gg/jzznwrMFc), [Instagram](https://www.instagram.com/flamingotelevision) dhe [YouTube](https://www.youtube.com/@flamingorevolution2026)

## Vullnetarizmi

Ky projekt kerkon `Node.js 24.14.0` dhe perdor `pnpm` si package manager.

```bash
pnpm install
pnpm dev
```

Serveri lokal hapet zakonisht ne `http://localhost:4321`.

## Skriptet

```bash
pnpm dev
pnpm build
pnpm preview
pnpm cf:preview
pnpm cf:deploy
```

## Struktura e projektit

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

## Lokalizimi

- Shqip: `/`
- Projektligje shqip: `/projektligje/`
- Idete tuaja shqip: `/idete-tuaja/`
- Kontakt: `/kontakt/`

Tekstet ruhen ne [src/data/site.ts](src/data/site.ts) per te lehtesuar shtimin e seksioneve apo gjuheve te tjera ne te ardhmen.

Faqet anglisht ruhen te [src/disabled-pages/en](src/disabled-pages/en). Per t'i aktivizuar, zhvendosi ne `src/pages/en/` dhe shto `en` te lista e lokaleve te aktivizuara ne [src/components/LocaleSwitch.astro](src/components/LocaleSwitch.astro).

## Dokumentet PDF

PDF-te e faqes se projektligjeve ruhen ne [public/documents/projektligje](public/documents/projektligje). Te dhenat per kartat, titujt, pershkrimet dhe kategorite ruhen ne [src/data/documents.ts](src/data/documents.ts).

Per Cloudflare Pages, mbaj cdo PDF nen `25 MiB`. Nese nje dokument e kalon kete kufi, mos e shto ne repo; hostoje ne Cloudflare R2 ose ne nje burim tjeter publik dhe vendos linkun ne dokumentacion.

## Deploy ne Cloudflare Pages

"Repository" serviret permes `Cloudflare Pages` pa pasur nevoje per `deploy.sh` ose `GitHub Actions`.

Deploy ne production ndodh automatikisht nga Cloudflare Pages sa here behet `push` ne degen `main`. Pra, rrjedha normale e punes eshte:

```bash
git push origin main
```

Pas push-it, Cloudflare merr commit-in e fundit, ekzekuton `pnpm build` dhe publikon permbajtjen nga `dist`. `pnpm cf:deploy` perdoret vetem per deploy manual nga CLI.

Ne dashboard-in e Cloudflare Pages perdor:

- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `24.14.0` ose lexoje nga `.node-version`

Skedari [wrangler.jsonc](wrangler.jsonc) mban konfigurimin bazik te projektit per `wrangler pages dev` dhe `wrangler pages deploy`. Nese krijon nje Pages project me emer tjeter, perditeso fushen `name` ne ate skedar.

Per lokal preview ne runtime-in e Pages:

```bash
pnpm cf:preview
```

## Idete tuaja

Faqja `/idete-tuaja/` merr idete e miratuara nga nje Cloudflare Pages Function ne
`/api/ideas`. Function-i lexon URL-ne e Google Apps Script nga environment variable:

```text
APPS_SCRIPT_API_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Per lokal preview me Cloudflare, kopjo `.dev.vars.example` ne `.dev.vars` dhe vendos URL-ne reale.

Per deploy nga CLI pasi te kesh krijuar projektin dhe kredencialet ne Cloudflare:

```bash
pnpm cf:deploy
```

Domeni kryesor ne konfigurim eshte vendosur te `https://flamingorevolution.eu`.

## Dokumentacion ne anglisht

Shiko [README.en.md](README.en.md).
