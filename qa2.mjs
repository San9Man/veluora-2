import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

// open an item modal
await page.evaluate(() => document.getElementById('menu')?.scrollIntoView());
await page.waitForTimeout(500);
const cards = page.locator('article button[aria-label^="View and customise"]');
await cards.nth(6).click();
await page.waitForTimeout(700);
await page.screenshot({ path: 'qa/modal.png' });
await page.getByRole('dialog').getByRole('button', { name: /Add to your box/i }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: 'qa/toast.png' });

// open drawer
await page.getByRole('button', { name: /Open chocolate box/i }).click();
await page.waitForTimeout(800);
await page.screenshot({ path: 'qa/drawer.png' });
await page.getByRole('button', { name: 'Close your box' }).click();

// studio
await page.getByRole('button', { name: 'Instagram Kit' }).first().click();
await page.waitForTimeout(2500);

for (const [id, w, h] of [['feed',1080,1350], ['story',1080,1920], ['nut',1080,1350]]) {
  const el = page.locator(`div[style*="width: ${w}px"]`).nth(id === 'feed' ? 0 : 1);
  // use the offscreen full-size artboards: take the 3rd..5th fixed container children
}
const full = page.locator('div[style*="position: fixed"] > div');
const count = await full.count();
console.log('offscreen artboards', count);
for (let i = 0; i < count; i++) {
  const box = await full.nth(i).boundingBox();
  await full.nth(i).screenshot({ path: `qa/art-${i}.png` });
  console.log(i, box);
}
// download test
const dl = page.waitForEvent('download', { timeout: 30000 }).catch(e => null);
await page.getByRole('button', { name: /Download .* JPG/i }).click();
const download = await dl;
console.log('download', download ? download.suggestedFilename() : 'FAILED');
await page.waitForTimeout(1000);
await page.screenshot({ path: 'qa/studio2.png' });

// mobile menu
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mobile.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(800);
await mobile.evaluate(() => document.getElementById('menu')?.scrollIntoView());
await mobile.waitForTimeout(800);
await mobile.screenshot({ path: 'qa/mobile-menu.png' });
await mobile.getByRole('button', { name: /View and customise/i }).first().click();
await mobile.waitForTimeout(600);
await mobile.screenshot({ path: 'qa/mobile-modal.png' });
console.log('errors', errs);
await browser.close();
