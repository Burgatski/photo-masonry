import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc'
import EnvironmentPlugin from 'vite-plugin-environment';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),   EnvironmentPlugin('all')],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './jest.setup.ts',
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  }
})
