import { test, expect } from '@playwright/test';

test('Full page deep audit - console errors and 404s', async ({ page }) => {
  const errors: string[] = [];
  const notFoundUrls: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('response', resp => {
    if (resp.status() === 404) notFoundUrls.push(resp.url());
  });
  
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  console.log('=== 404 URLS ===');
  notFoundUrls.forEach(u => console.log('404:', u));
  
  console.log('=== CONSOLE ERRORS ===');
  errors.forEach(e => console.log('ERROR:', e));
  
  // Check sections IDs
  const sectionIds = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('section[id], div[id]'))
      .map(el => el.id)
      .filter(id => id);
  });
  console.log('=== SECTION IDs ===', sectionIds);
});

test('Subpage audit - /servicios', async ({ page }) => {
  const notFoundUrls: string[] = [];
  page.on('response', resp => {
    if (resp.status() === 404) notFoundUrls.push(resp.url());
  });
  
  await page.goto('http://localhost:3000/servicios');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '/tmp/servicios-page.png', fullPage: true });
  console.log('Servicios 404s:', notFoundUrls);
  
  const footer = await page.locator('footer').count();
  console.log('Footer on /servicios:', footer);
});
