import { chromium, devices } from 'playwright'

const out = '/opt/cursor/artifacts'
const base = 'http://127.0.0.1:5173'
const errors = []

const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome-stable',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
})

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`))
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console: ${msg.text()}`)
})

async function go(target) {
  await page.goto(base + target, { waitUntil: 'commit', timeout: 60000 })
  await page.waitForTimeout(1200)
}

await go('/')
await page.screenshot({ path: `${out}/oraffa-home-hero-desktop.png` })
await page.evaluate(() => window.scrollTo(0, 1100))
await page.waitForTimeout(800)
await page.screenshot({ path: `${out}/oraffa-home-departments-desktop.png` })

for (const p of ['/courses', '/about', '/instructors', '/blog', '/contact']) {
  await go(p)
}

await go('/courses')
await page.screenshot({ path: `${out}/oraffa-courses-desktop.png` })

await go('/contact')
await page.screenshot({ path: `${out}/oraffa-contact-desktop.png` })
await page.fill('input[name="name"]', 'تست کاربر')
await page.fill('input[name="phone"]', '09120000000')
await page.fill('input[name="email"]', 'test@oraffa.com')
await page.fill('textarea[name="message"]', 'درخواست مشاوره دوره مدیریت')
await page.click('button[type="submit"]')
await page.waitForTimeout(400)
const success = await page.locator('text=پیام شما ثبت شد').isVisible()

const mobile = await browser.newPage({ ...devices['iPhone 13'] })
mobile.on('pageerror', (err) => errors.push(`mobile pageerror: ${err.message}`))
await mobile.goto(base + '/', { waitUntil: 'commit', timeout: 60000 })
await mobile.waitForTimeout(1400)
await mobile.screenshot({ path: `${out}/oraffa-home-hero-mobile.png` })
await mobile.getByRole('button', { name: /منو/ }).click()
await mobile.waitForTimeout(400)
await mobile.screenshot({ path: `${out}/oraffa-home-mobile-menu.png` })

const rtl = await page.evaluate(() => document.documentElement.getAttribute('dir'))

console.log(JSON.stringify({ success, rtl, errors: [...new Set(errors)].slice(0, 40) }, null, 2))
await browser.close()
