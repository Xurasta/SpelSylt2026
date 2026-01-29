import { defineConfig } from 'vite'

export default defineConfig({
  base: '/SpelSylt2026',
  build: {
    assetsInlineLimit: 0 // Disable inlining assets as base64
  }
})
