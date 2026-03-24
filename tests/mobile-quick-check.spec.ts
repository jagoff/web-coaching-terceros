import { test, expect, devices } from '@playwright/test';

// Quick mobile verification test
test.use({ ...devices['iPhone 12'] });

test.describe('📱 Mobile Quick Check', () => {
  test('Core mobile functionality verification', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    console.log('🔍 Quick mobile verification started...');
    
    // 1. Basic structure
    await expect(page.locator('h1')).toBeVisible();
    console.log('✅ Main heading visible');
    
    // 2. Mobile viewport
    const viewport = page.viewportSize();
    expect(viewport?.width).toBeLessThanOrEqual(428);
    console.log(`✅ Mobile viewport: ${viewport?.width}x${viewport?.height}`);
    
    // 3. Touch targets (44px minimum)
    const buttons = page.locator('button, a[href]').filter({ hasText: /agendar|contact|sesión/i });
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const boundingBox = await button.boundingBox();
        if (boundingBox) {
          expect(boundingBox.height).toBeGreaterThanOrEqual(44);
          expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        }
      }
    }
    console.log('✅ Touch targets verified');
    
    // 4. Language switching
    const langToggle = page.locator('[data-testid="lang-toggle"], .lang-toggle').first();
    if (await langToggle.isVisible()) {
      const initialLang = await page.locator('html').getAttribute('lang');
      await langToggle.tap();
      await page.waitForTimeout(1000);
      const newLang = await page.locator('html').getAttribute('lang');
      expect(newLang).not.toBe(initialLang);
      console.log('✅ Language switching works');
    }
    
    // 5. Scroll behavior
    await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'smooth' }));
    await page.waitForTimeout(1000);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
    console.log('✅ Scroll behavior works');
    
    // 6. Form inputs
    const inputs = page.locator('input, textarea');
    if (await inputs.count() > 0) {
      const firstInput = inputs.first();
      await firstInput.tap();
      await firstInput.fill('Test mobile input');
      const value = await firstInput.inputValue();
      expect(value).toBe('Test mobile input');
      console.log('✅ Form inputs work');
    }
    
    console.log('🎉 Quick mobile check completed successfully!');
  });
});
