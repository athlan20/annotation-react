import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const path = require("path");

const resolvePath = (str: string) => path.resolve(__dirname, str);

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolvePath("packages/index.ts"),
      name: "componentsName",
      fileName: format => `componentsName.${format}.js`,
    },
    rollupOptions: {
        external: ["react", "react-dom", "antd"],
        output: {
          globals: {
            react: "react",
            antd: "antd",
            "react-dom": "react-dom",
          },
        },      
    },
  },
})