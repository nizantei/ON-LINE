import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Base path for deployment - set to '/' for local dev or custom domain
  // For GitHub Pages at username.github.io/ON-LINE, use /ON-LINE/
  base: process.env.GITHUB_ACTIONS ? '/ON-LINE/' : '/',

  logLevel: 'error', // Suppress warnings, only show errors

  plugins: [
    react(),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});