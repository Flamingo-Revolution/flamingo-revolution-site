# Revolucioni Flamingo

`Revolucioni Flamingo` eshte nje faqe statike e ndertuar me Astro dhe TypeScript, me lokalizim ne shqip dhe anglisht. Shqipja eshte gjuha kryesore dhe sherbehet ne rrugen `/`, ndersa versioni anglisht ne `/en/`.

## Cfare perfshin projekti

- Astro me konfigurim `static site generation`
- TypeScript me `astro/tsconfigs/strict`
- Lokalizim i strukturuar per shqip dhe anglisht
- Landing page me light mode dhe dark mode
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
- Anglisht: `/en/`

Tekstet ruhen ne [src/data/site.ts](src/data/site.ts) qe te jete e lehte te shtohen seksione ose gjuhe te reja ne te ardhmen.

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
