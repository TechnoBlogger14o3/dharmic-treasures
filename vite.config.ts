import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, createReadStream, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))

type PdfSource = {
  path: string
  publicPdf?: string
  kind: string
}

function loadPdfSources(): PdfSource[] {
  const catalog = JSON.parse(readFileSync(path.join(root, 'scripts/shastra-sources.json'), 'utf8')) as {
    sources: PdfSource[]
  }
  return catalog.sources.filter((source) => source.kind === 'pdf' && source.publicPdf)
}

function copyShastraPdfs(distRoot?: string) {
  for (const source of loadPdfSources()) {
    const src = path.join(root, source.path)
    if (!existsSync(src) || !source.publicPdf) continue
    const dest = path.join(distRoot ?? root, distRoot ? source.publicPdf : path.join('public', source.publicPdf))
    mkdirSync(path.dirname(dest), { recursive: true })
    if (existsSync(dest) && statSync(dest).mtimeMs >= statSync(src).mtimeMs) continue
    copyFileSync(src, dest)
  }
}

function serveShastraPdfs(req: { url?: string; headers: { range?: string } }, res: any, next: () => void) {
  const url = req.url?.split('?')[0]
  const source = loadPdfSources().find((item) => item.publicPdf && (url === `/${item.publicPdf}` || url === `/${item.publicPdf}/`))
  if (!source) {
    next()
    return
  }
  const src = path.join(root, source.path)
  if (!existsSync(src)) {
    next()
    return
  }
  const size = statSync(src).size
  const range = req.headers.range
  res.setHeader('Content-Type', 'application/pdf')
  res.setHeader('Accept-Ranges', 'bytes')
  if (range) {
    const match = /bytes=(\d+)-(\d*)/.exec(range)
    if (match) {
      const start = Number(match[1])
      const end = match[2] ? Number(match[2]) : size - 1
      res.statusCode = 206
      res.setHeader('Content-Range', `bytes ${start}-${end}/${size}`)
      res.setHeader('Content-Length', String(end - start + 1))
      createReadStream(src, { start, end }).pipe(res)
      return
    }
  }
  res.setHeader('Content-Length', String(size))
  createReadStream(src).pipe(res)
}

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
  
  // Web: default '/' for custom domain / Hostinger root. For GitHub Pages under a subpath, run:
  //   VITE_BASE=/dharmic-treasures/ npm run build
  const webBase = (process.env.VITE_BASE ?? '/').replace(/\/?$/, '/')

  return {
    plugins: [
      react(),
      {
        name: 'copy-shastra-pdfs',
        configureServer(server) {
          server.middlewares.use(serveShastraPdfs)
        },
        buildStart() {
          copyShastraPdfs()
        },
        closeBundle() {
          copyShastraPdfs(path.join(root, 'dist'))
        },
      },
    ],
    base: isTauri ? '/' : webBase,
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
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.includes('pdf.worker')) {
              return 'assets/pdf.worker-[hash].js'
            }
            return 'assets/[name]-[hash][extname]'
          },
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
