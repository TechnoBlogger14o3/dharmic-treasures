import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Check if we're building for Tauri
  // Tauri sets TAURI_PLATFORM during build, or we can check for TAURI env var
  const isTauri = !!(
    process.env.TAURI_PLATFORM ||
    process.env.TAURI_FAMILY ||
    process.env.TAURI ||
    process.env.TAURI_DEBUG
  )
  
  return {
    plugins: [react()],
    // Use '/' for Tauri (local file system), '/dharmic-treasures/' for web deployment
    base: isTauri ? '/' : '/dharmic-treasures/',
    // Clear screen on restart for better dev experience
    clearScreen: false,
    // Tauri expects a fixed port, fail if that port is not available
    server: {
      port: 5173,
      strictPort: true,
      host: true, // Allow access from network (for mobile devices)
      watch: {
        // Tell vite to ignore watching `src-tauri`
        ignored: ['**/src-tauri/**'],
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Split vendor chunks for better caching
            if (id.includes('node_modules')) {
              // React and React DOM
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor'
              }
              // Three.js and related 3D libraries
              if (id.includes('three') || id.includes('@react-three')) {
                return 'three-vendor'
              }
              // Leaflet and map libraries
              if (id.includes('leaflet') || id.includes('react-leaflet')) {
                return 'map-vendor'
              }
              // PDF libraries
              if (id.includes('pdf') || id.includes('pdfjs')) {
                return 'pdf-vendor'
              }
              // Other vendor code
              return 'vendor'
            }
            // Split data files into separate chunks
            if (id.includes('/data/')) {
              const match = id.match(/data\/([^/]+)\.ts/)
              if (match) {
                return `data-${match[1]}`
              }
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
  }
})

