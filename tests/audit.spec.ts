import { test, expect } from '@playwright/test';

test('Full page visual audit and console errors', async ({ page }) => {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
    if (msg.type() === 'warning') warnings.push(msg.text());
  });
  
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  // Full page screenshot
  await page.screenshot({ path: '/tmp/full-page-desktop.png', fullPage: true });
  
  console.log('=== CONSOLE ERRORS ===');
  errors.forEach(e => console.log('ERROR:', e));
  
  console.log('=== CONSOLE WARNINGS ===');
  warnings.forEach(w => console.log('WARN:', w));
  
  // Check all sections exist
  const sections = ['#inicio', '#clientes', '#para-quien', '#servicios', '#sobre-mi', '#proceso', '#resultados', '#testimonios', '#precios', '#faq', '#contacto'];
  for (const s of sections) {
    const count = await page.locator(s).count();
    console.log(`Section ${s}: ${count > 0 ? 'OK' : 'MISSING'}`);
  }
  
  // Check accessibility
  const h1Count = await page.locator('h1').count();
  const h2Count = await page.locator('h2').count();
  const imgNoAlt = await page.locator('img:not([alt])').count();
  const brokenLinks = [];
  
  console.log(`h1: ${h1Count}, h2: ${h2Count}, imgs-without-alt: ${imgNoAlt}`);
  
  // Check viewport widths
  const overflowElements = await page.evaluate(() => {
    const bodyWidth = document.body.scrollWidth;
    const windowWidth = window.innerWidth;
    return { bodyWidth, windowWidth, hasOverflow: bodyWidth > windowWidth };
  });
  console.log('Horizontal overflow:', overflowElements);
  
  expect(errors.length).toBe(0);
});

test('Mobile visual audit', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(`PAGE ERROR: ${err.message}`));
  
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(3000);
  
  await page.screenshot({ path: '/tmp/full-page-mobile.png', fullPage: true });
  
  // Check mobile overflow
  const overflow = await page.evaluate(() => {
    return {
      bodyScrollWidth: document.body.scrollWidth,
      windowWidth: window.innerWidth,
      hasHorizontalOverflow: document.body.scrollWidth > window.innerWidth
    };
  });
  console.log('Mobile overflow:', overflow);
  console.log('Mobile errors:', errors);
});

test('English page audit', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  
  await page.goto('http://localhost:3000/en');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(2000);
  
  await page.screenshot({ path: '/tmp/full-page-en.png', fullPage: true });
  console.log('EN page errors:', errors);
  
  const h1 = await page.locator('h1').count();
  console.log('EN h1 count:', h1);
});
