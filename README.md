# Revolucioni Flamingo

`Revolucioni Flamingo` eshte nje "site" statik i ndertuar me Astro dhe TypeScript. "Site"-i serviret permes [Cloudflare Pages](https://developers.cloudflare.com/pages/get-started/git-integration/).

Permbajtja e informacionit dhe mekanizmave te lundrimit (navigation) eshte ne shqip. Ekziston dhe nje version ne anglisht (`/en/`), por per momentin eshte i caktivizuar.

## Cfare perfshin projekti

- Astro me konfigurim `static site generation`
- TypeScript me `astro/tsconfigs/strict`
- Tekst i strukturuar ne shqip dhe anglisht, me rruget publike anglisht `/en/` te caktivizuara
- Light mode dhe dark mode
- Faqen `/projektligje` per dokumente PDF dhe paketa ligjore
- Faqen `/idete-tuaja` per dergimin dhe shikimin e ideve qytetare
- Faqen `/kontakt` per ["email"-in zyrtar](mailto:info@flamingorevolution.eu) dhe rrjete sociale: [Discord](https://discord.gg/jzznwrMFc), [Instagram](https://www.instagram.com/flamingotelevision) dhe [YouTube](https://www.youtube.com/@flamingorevolution2026)

## Vullnetarizmi

Ky projekt kerkon `Node.js 22.12+` dhe perdor `pnpm` si package manager.

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
pnpm db:generate
pnpm db:migrate
pnpm db:migrate:deploy
pnpm db:studio
```

## Struktura e projektit

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

Projekti perdor [Neon](https://neon.tech) Postgres dhe Prisma.

| Variabla | Ku | Qellimi |
|----------|----|---------|
| `DIRECT_URL` | `.env` (gitignored) | Prisma CLI (`migrate`, `studio`) — lidhje direkte, pa `-pooler` |
| `DATABASE_URL` | `.env` lokalisht; Cloudflare Pages ne deploy | Pages Functions — lidhje e pool-uar (`-pooler`) |

```bash
cp .env.example .env
```

Pastaj vendos stringjet reale nga Neon dashboard (me `?sslmode=require`). Wrangler lexon `.env` gjate `pnpm cf:preview`.

```bash
pnpm db:migrate --name init_ideas_votes   # CLI me DIRECT_URL
pnpm db:studio                            # shiko tabelat
pnpm cf:preview                           # Functions + DB (jo `astro dev`)
```

`astro dev` nuk ekzekuton Pages Functions dhe nuk lidhet me Neon. Per DB lokale perdor `pnpm cf:preview`.

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

Faqja `/idete-tuaja/` merr idete e publikuara nga Neon Postgres permes Cloudflare Pages Function ne `/api/ideas`.

| Endpoint | Metoda | Qellimi |
|----------|--------|---------|
| `/api/ideas` | `GET` | Lista e ideve te dukshme (`?fingerprint=` opsionale per `userVote`) |
| `/api/ideas` | `POST` | Krijon nje ide (`content` + `fingerprint`) |
| `/api/ideas/[id]` | `PATCH` | Shton emrin e derguesit (`name` + `fingerprint`) |
| `/api/ideas/[id]/vote` | `POST` | Vote `UP`/`DOWN` (e njejta vote perseri e heq) |
| `/api/ideas/[id]/vote` | `DELETE` | Heq voten e pajisjes |

Per lokal preview me Cloudflare, mbaj `DATABASE_URL` (dhe `DIRECT_URL` per Prisma CLI) ne `.env`.

```bash
pnpm cf:deploy
```

Domeni kryesor ne konfigurim eshte vendosur te `https://flamingorevolution.eu`.

## Dokumentacion ne anglisht

Shiko [README.en.md](README.en.md).