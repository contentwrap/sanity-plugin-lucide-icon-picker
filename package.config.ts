import { defineConfig } from '@sanity/pkg-utils';

export default defineConfig({
  dist: 'dist',
  tsconfig: 'tsconfig.dist.json',

  // External dependencies (don't bundle these)
  external: ['react', 'react-dom', 'sanity', '@sanity/ui', '@sanity/icons'],

  // Bundle optimizations
  minify: true,
  sourcemap: false,

  // Tree shaking is enabled by default in modern bundlers
});
