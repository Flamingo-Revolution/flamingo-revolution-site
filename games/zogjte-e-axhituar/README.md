# Zogjtë e Axhituar

Imported from https://github.com/Flamingo-Revolution/zogjte-e-axhituar at commit
197189616598ce04bd5fa6d52104bfbd760bee12. Game source and database schema are
preserved; the Vite configuration integrates the build with the hub.

The hub page is `/lojerat/zogjte-e-axhituar/`. Its iframe loads the bundled game
from `/games/zogjte-e-axhituar/index.html`, keeping the game's global styles and
touch handling inside its own document.

Run `pnpm install` at the repository root. Normal `pnpm dev`, `pnpm build`, and
Cloudflare build/deploy scripts build this game first. After changing game code,
run `pnpm game:build` and reload the page (the embedded bundle has no hot reload).

## Online scores

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in the repository root `.env`
or `.env.local`. Use the project's public anon key, never its service-role key.
These public values are embedded at build time; production builds need the same
variables in their build environment, followed by a rebuild and deployment.
Runtime Worker secrets alone do not configure this static game bundle.

Run `supabase/schema.sql` in the intended Supabase project's SQL editor if its
`leaderboard_scores` table and policies have not already been created. The
schema enables row-level security for public leaderboard reads and submissions.
The original game accepts client-reported scores; it does not verify gameplay.

Without these variables, the game remains playable and stores scores locally
in the browser. Online score submission requires the Supabase schema as well
as the environment values.
