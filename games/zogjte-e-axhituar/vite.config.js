import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'development' ? '/games/zogjte-dev/' : '/games/zogjte-e-axhituar/',
  envDir: fileURLToPath(new URL('../../', import.meta.url)),
  build: {
    outDir: mode === 'development' ? '../../public/games/zogjte-dev' : '../../public/games/zogjte-e-axhituar',
    rollupOptions: mode === 'development' ? { output: { entryFileNames: 'assets/[name].js', chunkFileNames: 'assets/[name].js', assetFileNames: 'assets/[name][extname]' } } : undefined,
    emptyOutDir: true,
  },
}));
