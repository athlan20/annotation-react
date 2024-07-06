import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve('packages/index.ts'),
      name: 'componentsName',
      fileName: (format) => `componentsName.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'antd'],
      output: {
        globals: {
          react: 'react',
          antd: 'antd',
          'react-dom': 'react-dom',
        },
      },
    },
  },
});
