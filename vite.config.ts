import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: resolve('packages/index.ts'),
      name: 'annotation-react',
      fileName: (format) => `annotation-react.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'react',
          'react-dom': 'react-dom',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages'),
    },
  },
});
