import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import {resolve} from "path"; 

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': __dirname, // 设置 @ 别名指向 src 目录
    },
  },
})
