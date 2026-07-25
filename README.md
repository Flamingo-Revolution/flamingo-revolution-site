# Revolucioni Flamingo

`Revolucioni Flamingo` eshte nje "site" Astro dhe TypeScript i deploy-uar ne [Cloudflare Workers](https://developers.cloudflare.com/workers/framework-guides/web-apps/astro/). Faqet publike prerenderohen, ndersa API-ja e ideve ekzekutohet ne Worker.

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
| `DATABASE_URL` | `.env` lokalisht; Cloudflare Worker secret ne deploy | API routes — lidhje e pool-uar (`-pooler`) |

```bash
cp .env.example .env
```

Pastaj vendos stringjet reale nga Neon dashboard (me `?sslmode=require`). Wrangler lexon `.env` gjate `pnpm cf:preview`.

```bash
pnpm db:migrate --name init_ideas_votes   # CLI me DIRECT_URL
pnpm db:studio                            # shiko tabelat
pnpm cf:preview                           # Functions + DB (jo `astro dev`)
```

Perdor `pnpm cf:preview` per ta ndertuar dhe ekzekutuar faqen ne runtime-in lokal `workerd` te Cloudflare.

## Lokalizimi

- Shqip: `/`
- Projektligje shqip: `/projektligje/`
- Idete tuaja shqip: `/idete-tuaja/`
- Kontakt: `/kontakt/`

Tekstet ruhen ne [src/data/site.ts](src/data/site.ts) per te lehtesuar shtimin e seksioneve apo gjuheve te tjera ne te ardhmen.

Faqet anglisht ruhen te [src/disabled-pages/en](src/disabled-pages/en). Per t'i aktivizuar, zhvendosi ne `src/pages/en/` dhe shto `en` te lista e lokaleve te aktivizuara ne [src/components/LocaleSwitch.astro](src/components/LocaleSwitch.astro).

## Dokumentet PDF

PDF-te e faqes se projektligjeve ruhen ne [public/documents/projektligje](public/documents/projektligje). Te dhenat per kartat, titujt, pershkrimet dhe kategorite ruhen ne [src/data/documents.ts](src/data/documents.ts).

Mbaj cdo PDF statik nen kufirin e madhesise per asset te Cloudflare Workers. Nese nje dokument e kalon kufirin, hostoje ne Cloudflare R2 ose ne nje burim tjeter publik dhe vendos linkun ne dokumentacion.

## Deploy ne Cloudflare Workers

Skedari [wrangler.jsonc](wrangler.jsonc) konfiguron aplikacionin Astro per Cloudflare Workers. Ruaj `DATABASE_URL` si secret te enkriptuar dhe pastaj bej deploy:

```bash
pnpm exec wrangler secret put DATABASE_URL
pnpm cf:deploy
```

Deploy-i hapet fillimisht ne nje URL `workers.dev`. Per preview lokal ne runtime-in `workerd` te Cloudflare, perdor `pnpm cf:preview`.

## Idete tuaja

Faqja `/idete-tuaja/` merr idete e publikuara nga Neon Postgres permes Astro API routes ne Cloudflare Workers.

| Endpoint | Metoda | Qellimi |
|----------|--------|---------|
| `/api/ideas` | `GET` | Lista e ideve te dukshme (`?fingerprint=` opsionale per `userVote`) |
| `/api/ideas` | `POST` | Krijon nje ide (`content` + `fingerprint`) |
| `/api/ideas/[id]` | `PATCH` | Shton emrin e derguesit (`name` + `fingerprint`) |
| `/api/ideas/[id]/vote` | `POST` | Vote `UP`/`DOWN` (e njejta vote perseri e heq) |
| `/api/ideas/[id]/vote` | `DELETE` | Heq voten e pajisjes |

Per preview lokal me Cloudflare, mbaj `DATABASE_URL` dhe `DIRECT_URL` ne `.env`. Ne production, ruaj URL-ne pooled me `wrangler secret put DATABASE_URL`; `DIRECT_URL` duhet te mbetet vetem ne ambientin lokal ose CI.

```bash
pnpm cf:deploy
```

Domeni kryesor ne konfigurim eshte vendosur te `https://flamingorevolution.eu`.

## Dokumentacion ne anglisht

Shiko [README.en.md](README.en.md).
