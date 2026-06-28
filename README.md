# Revolucioni Flamingo

`Revolucioni Flamingo` eshte nje faqe statike e ndertuar me Astro dhe TypeScript. Shqipja eshte gjuha publike kryesore dhe sherbehet ne rrugen `/`. Kopja dhe komponentet per anglisht ruhen ne kod, por rruget `/en/` jane te caktivizuara per momentin.

## Cfare perfshin projekti

- Astro me konfigurim `static site generation`
- TypeScript me `astro/tsconfigs/strict`
- Kopje e strukturuar per shqip dhe anglisht, me rruget publike anglisht te caktivizuara
- Landing page me light mode dhe dark mode
- Faqe `/projektligje` per dokumente PDF dhe paketa ligjore
- Stilizim i bazuar te logoja flamingo me tone koral dhe bojeqielli.

## Nisja lokale

Ky projekt kerkon `Node.js 22.12+` dhe perdor `pnpm` si package manager kryesor. Ne kete repo eshte shtuar `.node-version` dhe `.nvmrc` me `24.14.0` per ta bere mjedisin me te qarte.

```bash
pnpm install
pnpm dev
```

Faqja lokale hapet zakonisht te `http://localhost:4321`.

Nese mjedisi yt po perdor nje version me te vjeter te Node, kalo fillimisht ne versionin e duhur me menaxherin tend te preferuar te versioneve.

## Skriptet

```bash
pnpm dev
pnpm build
pnpm preview
pnpm cf:preview
pnpm cf:deploy
```

## Struktura kryesore

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

Tekstet ruhen ne [src/data/site.ts](src/data/site.ts) qe te jete e lehte te shtohen seksione ose gjuhe te reja ne te ardhmen.

Faqet Astro te versionit anglisht ruhen te [src/disabled-pages/en](src/disabled-pages/en). Per t'i aktivizuar perseri, zhvendosi ne `src/pages/en/` dhe shto `en` te lista e lokaleve te aktivizuara ne [src/components/LocaleSwitch.astro](src/components/LocaleSwitch.astro).

## Dokumentet PDF

PDF-te e faqes se projektligjeve ruhen ne [public/documents/projektligje](public/documents/projektligje). Te dhenat per kartat, titujt, pershkrimet dhe kategorite ruhen ne [src/data/documents.ts](src/data/documents.ts).

Per Cloudflare Pages, mbaj cdo PDF nen `25 MiB`. Nese nje dokument e kalon kete kufi, mos e shto ne repo; hostoje ne Cloudflare R2 ose ne nje burim tjeter publik dhe vendos linkun ne te dhenat e dokumenteve.

## Branding

Logoja ruhet ne [public/images/flamingo-logo.jpg](public/images/flamingo-logo.jpg). Paleta vizuale perdor:

- koral/roze per thekset kryesore
- blu te hapur per sfondet dhe kontrastin
- tone me te erreta blu per dark mode

## Deploy ne Cloudflare Pages

Repo tani eshte pergatitur per `Cloudflare Pages` pa pasur nevoje per `deploy.sh` ose `GitHub Actions` te detyrueshme.

Ne dashboard-in e Cloudflare Pages perdor:

- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `24.14.0` ose lexoje nga `.node-version`

Skedari [wrangler.jsonc](wrangler.jsonc) mban konfigurimin bazik te projektit per `wrangler pages dev` dhe `wrangler pages deploy`. Nese krijon nje Pages project me emer tjeter, perditeso fushen `name` ne ate skedar.

Per lokal preview ne runtime-in e Pages:

```bash
pnpm cf:preview
```

Per deploy nga CLI pasi te kesh krijuar projektin dhe kredencialet ne Cloudflare:

```bash
pnpm cf:deploy
```

Domeni kryesor ne konfigurim eshte vendosur te `https://flamingorevolution.eu`.

## Dokumentacion ne anglisht

Shiko [README.en.md](README.en.md).
