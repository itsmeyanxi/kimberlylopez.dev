import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

const here = import.meta.dirname;

// Multi-page build. Every case study is its own HTML entry, so each one ships
// real <title>/OpenGraph tags and a real URL without a client-side router.
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        home: resolve(here, 'index.html'),
        nomsuite: resolve(here, 'work/nomsuite/index.html'),
        pmai: resolve(here, 'work/pmai-warehouse/index.html'),
        habi: resolve(here, 'work/habi-moments/index.html'),
        shuhai: resolve(here, 'work/shuhai/index.html'),
      },
    },
  },
});
