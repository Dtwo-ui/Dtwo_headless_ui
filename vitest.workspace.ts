import { defineWorkspace } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineWorkspace([
  'packages/*',
  {
    extends: './vite.config.mjs',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: '../../setupTest.ts',
    },
    plugins: [vanillaExtractPlugin()],
  },
]);
