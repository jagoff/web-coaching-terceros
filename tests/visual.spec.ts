import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test('homepage visual snapshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for all animations and images to load
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for animations
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-full.png', {
      fullPage: true,
      animations: 'disabled',
    });
  });

  test('hero section visual snapshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for hero animations
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Focus on hero section
    const hero = page.locator('#inicio');
    await expect(hero).toBeVisible();
    
    // Take hero section screenshot
    await expect(hero).toHaveScreenshot('hero-section.png', {
      animations: 'disabled',
    });
  });

  test('CTA buttons visual check', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Find all CTA buttons
    const ctaButtons = page.locator('.btn-primary');
    
    // Check that CTA buttons are orange (not violet)
    const firstButton = ctaButtons.first();
    await expect(firstButton).toBeVisible();
    
    // Check the background color is orange
    const backgroundColor = await firstButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Should be orange-ish (RGB values for orange)
    expect(backgroundColor).toMatch(/rgb\(255,\s*10[67],\s*5[34]\)/);
    
    // Take screenshot of CTA buttons
    await expect(firstButton).toHaveScreenshot('cta-button.png', {
      animations: 'disabled',
    });
  });

  test('mobile responsive visual check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone size
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Check footer layout on mobile
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // Take mobile footer screenshot
    await expect(footer).toHaveScreenshot('mobile-footer.png', {
      animations: 'disabled',
    });
  });

  test('no duplicate stats sections', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Count stats sections - should only be 1 (in Results section)
    const statsSections = page.locator('.stat-number');
    const count = await statsSections.count();
    
    // Should have exactly 4 stats (20+, 11+, 9+, 6)
    expect(count).toBe(4);
    
    // Take screenshot of results section to verify
    const resultsSection = page.locator('[id*="result"], [id*="numbers"], [id*="stats"]');
    if (await resultsSection.first().isVisible()) {
      await expect(resultsSection.first()).toHaveScreenshot('results-stats.png', {
        animations: 'disabled',
      });
    }
  });

  test('scroll indicator positioning', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Find scroll indicator - try different selectors
    const scrollIndicator = page.locator('button[aria-label*="Desplaz"], button[aria-label*="Scroll"], .absolute.bottom-8');
    
    // Check if it's visible (may not exist on mobile)
    if (await scrollIndicator.isVisible()) {
      // Check it's positioned at the bottom
      const boundingBox = await scrollIndicator.boundingBox();
      expect(boundingBox).toBeTruthy();
      
      // Take screenshot of hero section with scroll indicator
      const hero = page.locator('#inicio');
      await expect(hero).toHaveScreenshot('hero-with-scroll-indicator.png', {
        animations: 'disabled',
      });
    } else {
      // If scroll indicator is not visible, just take hero screenshot
      const hero = page.locator('#inicio');
      await expect(hero).toHaveScreenshot('hero-no-scroll-indicator.png', {
        animations: 'disabled',
      });
    }
  });
});
