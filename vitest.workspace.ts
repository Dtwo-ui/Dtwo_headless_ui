import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  {
    extends: './vite.config.mjs',
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: '../../setupTest.ts',
    },
  },
]);
