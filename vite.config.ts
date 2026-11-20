import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { seo } from './seo/plugin.ts';

export default defineConfig({
  server: { port: 5174 },
  plugins: [tsconfigPaths(), tailwindcss(), viteReact(), seo()],
});
