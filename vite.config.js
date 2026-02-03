import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // Base path for deployment - set to '/' for local dev or custom domain
  // For GitHub Pages at username.github.io/repo-name, this will be set automatically
  base: process.env.GITHUB_ACTIONS ? '/' : '/',

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