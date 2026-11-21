import puppeteer from 'puppeteer-core'
import { createServer } from 'node:http'
import { readFileSync, existsSync, statSync } from 'node:fs'
import { dirname, join, extname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const htmlName = 'oraffa-business-plan.html'
const htmlPath = join(__dirname, htmlName)
const outPath = join(__dirname, 'oraffa-business-plan.pdf')
const chrome =
  process.env.CHROME_PATH ||
  ['/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].find((p) =>
    existsSync(p),
  )

if (!chrome) {
  console.error('Chrome not found')
  process.exit(1)
}

const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.woff2': 'font/woff2',
}

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1')
  const file =
    url.pathname === '/' ? htmlPath : join(__dirname, decodeURIComponent(url.pathname))
  if (!file.startsWith(__dirname) || !existsSync(file)) {
    res.writeHead(404)
    res.end('Not found')
    return
  }
  res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' })
  res.end(readFileSync(file))
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address()
const target = `http://127.0.0.1:${port}/${htmlName}`

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--font-render-hinting=none'],
})

try {
  const page = await browser.newPage()
  await page.goto(target, { waitUntil: 'networkidle0', timeout: 60000 })
  await page.evaluateHandle('document.fonts.ready')
  await new Promise((r) => setTimeout(r, 600))
  await page.pdf({
    path: outPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '12mm', right: '12mm', bottom: '14mm', left: '12mm' },
  })
  console.log(`Wrote ${outPath} (${Math.round(statSync(outPath).size / 1024)} KB)`)
} finally {
  await browser.close()
  server.close()
}
