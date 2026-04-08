import { test, expect } from '@playwright/test';
test('Underline position debug', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.waitForTimeout(800);
  await page.evaluate(() => {
    const el = document.getElementById('servicios');
    if (el) window.scrollTo({ top: el.offsetTop + 200, behavior: 'instant' });
  });
  await page.waitForTimeout(600);

  const info = await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('.navbar button.nav-link'));
    return buttons.slice(0,4).map(btn => {
      const rect = btn.getBoundingClientRect();
      const span = btn.querySelector('span');
      const spanRect = span?.getBoundingClientRect();
      const spanStyle = span ? window.getComputedStyle(span) : null;
      return {
        text: btn.textContent?.replace(/\s/g,'').slice(0,12),
        btn: { top: Math.round(rect.top), bottom: Math.round(rect.bottom), h: Math.round(rect.height) },
        span: spanRect ? { top: Math.round(spanRect.top), bottom: Math.round(spanRect.bottom), h: Math.round(spanRect.height) } : null,
        spanOpacity: spanStyle?.opacity,
        spanTransform: spanStyle?.transform,
        spanPosition: spanStyle?.position,
        spanBottom: spanStyle?.bottom,
        overflow: window.getComputedStyle(btn).overflow,
        parentOverflow: btn.parentElement ? window.getComputedStyle(btn.parentElement).overflow : 'n/a',
      };
    });
  });
  console.log(JSON.stringify(info, null, 2));
});
