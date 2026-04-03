import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    (VitePWA as any)({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'apple-touch-icon.png',
        'Roboto.ttf',
        'Roboto-Italic.ttf',
      ],
      manifest: {
        name: 'Keltis',
        short_name: 'Keltis',
        description: 'Keltis',
        theme_color: '#9a54ae',
        background_color: '#9a54ae',
        display: 'fullscreen',
        orientation: 'portrait',
        start_url: '/keltis-2026/?fullscreen=true',
        scope: '/keltis-2026/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,ttf,woff,woff2}'],
      },
    }),
  ],
  base: '/keltis-2026/',
})
