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
  }
})

