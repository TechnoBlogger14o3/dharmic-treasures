import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { pipeline } from '@huggingface/transformers'
import { chunkPages } from '../src/utils/ragChunk.ts'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const MODEL = 'onnx-community/all-MiniLM-L6-v2-ONNX'
const BATCH = 8

const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(
  path.join(root, 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs'),
).href

const catalog = JSON.parse(await readFile(path.join(root, 'scripts/shastra-sources.json'), 'utf8'))
const sources = catalog.sources.filter((source) => source.kind === 'pdf' && source.path)

async function extractPages(pdfPath) {
  const data = new Uint8Array(await readFile(pdfPath))
  const doc = await pdfjs.getDocument({ data, disableWorker: true, isEvalSupported: false }).promise
  const pages = []
  for (let n = 1; n <= doc.numPages; n++) {
    const page = await doc.getPage(n)
    const content = await page.getTextContent()
    const text = content.items
      .map((item) => ('str' in item ? item.str : ''))
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim()
    pages.push({ page: n, text })
    if (n % 400 === 0 || n === doc.numPages) {
      console.log(`  extracted ${n}/${doc.numPages}`)
    }
  }
  return pages
}

function toVector(output) {
  if (output && typeof output.tolist === 'function') {
    const list = output.tolist()
    return Array.isArray(list[0]) ? list[0] : list
  }
  const data = output?.data ?? output?.[0]?.data ?? output
  return Array.from(data)
}

console.log('loading embedder', MODEL)
const extractor = await pipeline('feature-extraction', MODEL)
const chunks = []

for (const source of sources) {
  const fromData = path.join(root, source.path)
  const fromPublic = source.publicPdf ? path.join(root, 'public', source.publicPdf) : ''
  const pdfPath = existsSync(fromData) ? fromData : fromPublic
  if (!existsSync(pdfPath)) {
    console.warn('missing', source.id, source.path)
    continue
  }
  console.log('chunking', source.id)
  const pages = await extractPages(pdfPath)
  const made = chunkPages(pages, { book: source.id, title: source.title })
  console.log('  chunks', made.length)
  chunks.push(...made)
}

if (!chunks.length) {
  throw new Error('No chunks extracted. Check the PDFs in data/ or public/pdfs/.')
}

console.log('embedding', chunks.length, 'chunks')
const dimsProbe = toVector(
  await extractor(chunks[0]?.text || 'scripture', { pooling: 'mean', normalize: true }),
)
const dims = dimsProbe.length
const embeddings = new Float32Array(chunks.length * dims)

for (let i = 0; i < chunks.length; i += BATCH) {
  const batch = chunks.slice(i, i + BATCH)
  for (let b = 0; b < batch.length; b++) {
    const vector = toVector(await extractor(batch[b].text, { pooling: 'mean', normalize: true }))
    embeddings.set(vector, (i + b) * dims)
  }
  if (i % 64 === 0 || i + BATCH >= chunks.length) {
    console.log(`  embedded ${Math.min(i + BATCH, chunks.length)}/${chunks.length}`)
  }
}

const outDir = path.join(root, 'public/rag')
await mkdir(outDir, { recursive: true })
await writeFile(
  path.join(outDir, 'shastra-meta.json'),
  JSON.stringify({ model: MODEL, dims, count: chunks.length }),
)
await writeFile(
  path.join(outDir, 'shastra-chunks.json'),
  JSON.stringify(chunks.map(({ book, title, page, text }) => ({ book, title, page, text }))),
)
await writeFile(path.join(outDir, 'shastra-embeddings.bin'), Buffer.from(embeddings.buffer))
await extractor.dispose?.()
console.log('wrote', outDir, 'chunks', chunks.length, 'dims', dims)
