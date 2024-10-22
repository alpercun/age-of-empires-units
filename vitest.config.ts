import { fileURLToPath } from 'node:url';
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        provider: 'v8',
        reporter: ['text', 'html'],
        exclude: [
          '**/vitest.setup.ts',
          '**/*.{test,spec}.{js,ts,jsx,tsx}',
          '**/__tests__/**',
          '**/node_modules/**',
          '**/*.config.{js,ts}',
          '**/env.d.ts',
          '**/dist/**',
          '**/src/main.ts',
        ],
      },
    },
  }),
);
