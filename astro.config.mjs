import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import playformCompress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  experimental: {
    env: {},
  },
  integrations: [
    playformCompress(), // Added last for best optimization
  ],
  output: 'server',
});
