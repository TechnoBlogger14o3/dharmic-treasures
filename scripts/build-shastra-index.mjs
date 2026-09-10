import { mkdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CHUNK_SIZE = 800
const MIN_DEV_RATIO = 0.18

function normalizeSpace(text) {
  return text.replace(/\s+/g, ' ').trim()
}

function devanagariRatio(text) {
  const chars = [...text].filter((c) => /\p{L}/u.test(c))
  if (!chars.length) return 0
  const dev = chars.filter((c) => {
    const cp = c.codePointAt(0)
    return cp >= 0x0900 && cp <= 0x097f
  }).length
  return dev / chars.length
}

function latinLetterRatio(text) {
  const chars = [...text].filter((c) => /\p{L}/u.test(c))
  if (!chars.length) return 0
  const latin = chars.filter((c) => /\p{Script=Latin}/u.test(c)).length
  return latin / chars.length
}

function isUsableText(text) {
  const cleaned = normalizeSpace(text)
  if (cleaned.length < 40) return false
  const dev = devanagariRatio(cleaned)
  const latin = latinLetterRatio(cleaned)
  if (dev >= MIN_DEV_RATIO) return true
  if (latin >= 0.55 && /[aeiou]{2,}|the |and |of /i.test(cleaned)) return true
  return false
}

function chunkText(text, size = CHUNK_SIZE) {
  const clean = normalizeSpace(text)
  if (clean.length <= size) return [clean]
  const parts = clean.split(/(?<=।)\s+|(?<=[.?!])\s+/)
  const chunks = []
  let buf = ''
  for (const part of parts) {
    if (!part) continue
    if ((buf + ' ' + part).trim().length > size && buf) {
      chunks.push(buf.trim())
      buf = part
    } else {
      buf = buf ? `${buf} ${part}` : part
    }
  }
  if (buf.trim()) chunks.push(buf.trim())
  return chunks
}

function parseGitaJson(source) {
  const pattern = /"verse_number":\s*(\d+),\s*"chapter_number":\s*(\d+),\s*"text":\s*"(.*?)",\s*"transliteration":\s*"(.*?)",\s*"hindi_meaning":\s*"(.*?)",\s*"meaning":\s*"(.*?)"/gs
  const chunks = []
  let match
  while ((match = pattern.exec(source)) !== null) {
    const verse = Number(match[1])
    const chapter = Number(match[2])
    const sanskrit = match[3].replace(/\\n/g, ' ')
    const hindi = match[5].replace(/\\n/g, ' ')
    const english = match[6].replace(/\\n/g, ' ')
    const text = normalizeSpace(`${sanskrit} ${hindi} ${english}`)
    if (!text) continue
    chunks.push({
      id: `gita-${chapter}-${verse}`,
      sourceId: 'gita',
      title: 'Bhagavad Gita',
      chapter,
      verse,
      text,
    })
  }
  return chunks
}

async function extractPdfPages(pdfPath) {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs')
  pdfjs.GlobalWorkerOptions.workerSrc = pathToFileURL(
    path.join(root, 'node_modules/pdfjs-dist/legacy/build/pdf.worker.mjs')
  ).href
  const data = new Uint8Array(await readFile(pdfPath))
  const doc = await pdfjs.getDocument({ data, disableWorker: true, isEvalSupported: false }).promise
  const pages = []
  for (let pageNum = 1; pageNum <= doc.numPages; pageNum += 1) {
    const page = await doc.getPage(pageNum)
    const content = await page.getTextContent()
    const text = normalizeSpace(content.items.map((item) => item.str || '').join(' '))
    pages.push({ page: pageNum, text })
    if (pageNum % 200 === 0) {
      console.log(`  ${path.basename(pdfPath)}: ${pageNum}/${doc.numPages}`)
    }
  }
  return pages
}

async function main() {
  const catalog = JSON.parse(await readFile(path.join(root, 'scripts/shastra-sources.json'), 'utf8'))
  const chunks = []
  const sources = []

  for (const source of catalog.sources) {
    const abs = path.join(root, source.path)
    console.log(`Indexing ${source.id} (${source.kind})...`)
    if (source.kind === 'gita-json') {
      const raw = await readFile(abs, 'utf8')
      const verseChunks = parseGitaJson(raw)
      chunks.push(...verseChunks)
      sources.push({
        id: source.id,
        title: source.title,
        titleHindi: source.titleHindi,
        kind: source.kind,
        chunkCount: verseChunks.length,
      })
      console.log(`  ${verseChunks.length} verses`)
      continue
    }

    if (source.kind === 'pdf' && source.index === false) {
      sources.push({
        id: source.id,
        title: source.title,
        titleHindi: source.titleHindi,
        kind: source.kind,
        chunkCount: 0,
        publicPdf: source.publicPdf,
      })
      console.log('  serve-only, not indexed')
      continue
    }

    if (source.kind === 'pdf') {
      let pages
      try {
        pages = await extractPdfPages(abs)
      } catch (error) {
        if (source.optional) {
          console.warn(`  skip optional ${source.id}: ${error.message}`)
          continue
        }
        throw error
      }
      let kept = 0
      let skipped = 0
      for (const page of pages) {
        if (!isUsableText(page.text)) {
          skipped += 1
          continue
        }
        const pieces = chunkText(page.text)
        for (const [index, piece] of pieces.entries()) {
          chunks.push({
            id: `${source.id}-p${page.page}-${index}`,
            sourceId: source.id,
            title: source.title,
            page: page.page,
            text: piece,
          })
          kept += 1
        }
      }
      sources.push({
        id: source.id,
        title: source.title,
        titleHindi: source.titleHindi,
        kind: source.kind,
        chunkCount: kept,
        skippedPages: skipped,
        publicPdf: source.publicPdf,
      })
      console.log(`  kept ${kept} chunks, skipped ${skipped} pages`)
    }
  }

  const outDir = path.join(root, 'public/rag')
  await mkdir(outDir, { recursive: true })
  const payload = {
    version: 1,
    builtAt: new Date().toISOString(),
    sources,
    chunks,
  }
  const outPath = path.join(outDir, 'shastra-index.json')
  await writeFile(outPath, JSON.stringify(payload))
  const bytes = Buffer.byteLength(JSON.stringify(payload))
  console.log(`Wrote ${outPath} (${(bytes / 1024 / 1024).toFixed(2)} MB, ${chunks.length} chunks)`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
