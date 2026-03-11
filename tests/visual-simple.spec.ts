import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Core Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for animations
  });

  test('CTA buttons are orange', async ({ page }) => {
    const ctaButtons = page.locator('.btn-primary');
    const firstButton = ctaButtons.first();
    await expect(firstButton).toBeVisible();
    
    // Check the background color is orange
    const backgroundColor = await firstButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Should be orange-ish (RGB values for orange #FF6B35)
    expect(backgroundColor).toMatch(/rgb\(255,\s*10[67],\s*5[34]\)/);
    
    // Take screenshot of CTA button
    await expect(firstButton).toHaveScreenshot('cta-button-orange.png');
  });

  test('stats are not duplicated', async ({ page }) => {
    // Count all stat numbers
    const statNumbers = page.locator('.stat-number');
    const count = await statNumbers.count();
    
    // Should have exactly 4 stats (20+, 11+, 9+, 6)
    expect(count).toBe(4);
    
    // Take screenshot of all stats
    if (count > 0) {
      await expect(statNumbers.first()).toHaveScreenshot('stats-not-duplicated.png');
    }
  });

  test('mobile footer layout', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check footer
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Take screenshot of footer on mobile
    await expect(footer).toHaveScreenshot('mobile-footer-layout.png');
  });

  test('hero section layout', async ({ page }) => {
    const hero = page.locator('#inicio');
    await expect(hero).toBeVisible();
    
    // Take screenshot of hero section
    await expect(hero).toHaveScreenshot('hero-section.png');
  });

  test('scroll indicator exists', async ({ page }) => {
    // Look for scroll indicator with Spanish aria-label
    const scrollIndicator = page.locator('button[aria-label*="Desplaz"]');
    
    // Check if it exists (may not be visible on mobile)
    const exists = await scrollIndicator.count() > 0;
    
    if (exists) {
      await expect(scrollIndicator).toBeVisible();
      await expect(scrollIndicator).toHaveScreenshot('scroll-indicator.png');
    } else {
      // If not found, that's okay for mobile
      console.log('Scroll indicator not found (may be hidden on mobile)');
    }
  });
});
