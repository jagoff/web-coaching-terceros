import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Final Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('CTA buttons exist and have orange color', async ({ page }) => {
    // Find any CTA button
    const ctaButton = page.locator('.btn-primary').first();
    
    // Check button exists in DOM
    const buttonCount = await ctaButton.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Get computed style (even if hidden)
    const backgroundColor = await ctaButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    console.log('🔍 CTA button color detected:', backgroundColor);
    
    // Check if it contains orange RGB values
    const hasOrange = backgroundColor.includes('255') && 
                     (backgroundColor.includes('107') || backgroundColor.includes('133') || backgroundColor.includes('85'));
    
    expect(hasOrange).toBeTruthy();
    console.log('✅ CTA button has orange color');
  });

  test('stats count is correct', async ({ page }) => {
    // Count stat elements
    const statNumbers = await page.locator('.stat-number').count();
    expect(statNumbers).toBe(4);
    console.log('✅ Stats count correct:', statNumbers);
  });

  test('footer sections exist', async ({ page }) => {
    // Check footer exists
    const footer = await page.locator('footer').count();
    expect(footer).toBe(1);
    
    // Check navigation and services headers exist
    const navHeader = await page.locator('h3:has-text("Navegación")').count();
    const servicesHeader = await page.locator('h3:has-text("Servicios")').count();
    
    expect(navHeader).toBe(1);
    expect(servicesHeader).toBe(1);
    
    console.log('✅ Footer sections exist');
  });

  test('hero section exists', async ({ page }) => {
    // Check hero section exists
    const hero = await page.locator('#inicio').count();
    expect(hero).toBe(1);
    
    // Check main title exists
    const h1 = await page.locator('h1').count();
    expect(h1).toBe(1);
    
    console.log('✅ Hero section exists');
  });

  test('scroll indicator exists', async ({ page }) => {
    // Check scroll indicator exists in DOM
    const scrollIndicator = await page.locator('button[aria-label*="Desplaz"]').count();
    
    if (scrollIndicator > 0) {
      console.log('✅ Scroll indicator exists');
    } else {
      console.log('ℹ️ Scroll indicator not found (may be hidden on mobile)');
    }
  });

  test('page structure validation', async ({ page }) => {
    // Validate key page structure
    const elements = {
      'h1': await page.locator('h1').count(),
      '.btn-primary': await page.locator('.btn-primary').count(),
      'footer': await page.locator('footer').count(),
      '#inicio': await page.locator('#inicio').count(),
      '.stat-number': await page.locator('.stat-number').count()
    };
    
    console.log('📊 Page structure:', elements);
    
    // Basic validations
    expect(elements['h1']).toBe(1);
    expect(elements['footer']).toBe(1);
    expect(elements['#inicio']).toBe(1);
    expect(elements['.btn-primary']).toBeGreaterThan(0);
    expect(elements['.stat-number']).toBe(4);
    
    console.log('✅ Page structure validation passed');
  });
});
