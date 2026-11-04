import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Instagram Kit' }).first().click();
await page.waitForTimeout(2200);
const tabs = [0, 1, 2];
for (const i of tabs) {
  await page.locator('button[aria-pressed]').filter({ hasText: /1080/ }).nth(i).click();
  await page.waitForTimeout(500);
  await page.getByRole('button', { name: /^Download .* JPG$/ }).click();
  const dl = await page.waitForEvent('download');
  await dl.saveAs(`downloads-${i}.jpg`);
  console.log('saved', i);
  await page.waitForTimeout(1200);
}
await browser.close();
