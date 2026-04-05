import { test } from '@playwright/test';

test('verify remaining warnings', async ({ page }) => {
  const warnings: string[] = [];
  const errors: string[] = [];
  const notFoundUrls: string[] = [];

  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
    if (msg.type() === 'warning') warnings.push(msg.text());
  });
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  page.on('response', resp => {
    if (resp.status() === 404) notFoundUrls.push(resp.url());
  });

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);

  // Scroll full page to trigger lazy loads
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  console.log('=== 404s ===');
  notFoundUrls.forEach(u => console.log('404:', u));

  console.log('=== ERRORS ===');
  errors.forEach(e => console.log('ERROR:', e));

  console.log('=== WARNINGS ===');
  warnings.forEach(w => console.log('WARN:', w));

  console.log('Total 404s:', notFoundUrls.length);
  console.log('Total errors:', errors.length);
  console.log('Total warnings:', warnings.length);
});
