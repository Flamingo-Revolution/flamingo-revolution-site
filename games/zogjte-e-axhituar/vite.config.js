import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  base: '/games/zogjte-e-axhituar/',
  envDir: fileURLToPath(new URL('../../', import.meta.url)),
  build: {
    outDir: '../../public/games/zogjte-e-axhituar',
    emptyOutDir: true,
  },
});
