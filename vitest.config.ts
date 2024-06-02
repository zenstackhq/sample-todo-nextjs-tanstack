import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        setupFiles: './tests/setup.tsx',
        environment: 'jsdom',
        exclude: ['**/node_modules/**', 'e2e'],
    },
});
