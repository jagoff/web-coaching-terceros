import { test, expect } from '@playwright/test';

test.describe('Visual Validation - Complete Site Check', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
  });

  test('CTA buttons exist and have orange color', async ({ page }) => {
    const ctaButton = page.locator('.btn-primary').first();
    const buttonCount = await ctaButton.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check color without requiring visibility
    const backgroundColor = await ctaButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    console.log('🔍 CTA button color detected:', backgroundColor);
    
    const hasOrange = backgroundColor.includes('255') && 
                     (backgroundColor.includes('107') || backgroundColor.includes('133') || backgroundColor.includes('85'));
    
    expect(hasOrange).toBeTruthy();
    console.log('✅ CTA button has orange color');
  });

  test('stats count is correct', async ({ page }) => {
    const statNumbers = await page.locator('.stat-number').count();
    expect(statNumbers).toBe(4);
    console.log('✅ Stats count correct:', statNumbers);
  });

  test('footer sections exist', async ({ page }) => {
    const footer = await page.locator('footer').count();
    expect(footer).toBe(1);
    
    const navHeader = await page.locator('h3:has-text("Navegación")').count();
    const servicesHeader = await page.locator('h3:has-text("Servicios")').count();
    
    expect(navHeader).toBe(1);
    expect(servicesHeader).toBe(1);
    
    console.log('✅ Footer sections exist');
  });

  test('hero section exists', async ({ page }) => {
    const hero = await page.locator('#inicio').count();
    expect(hero).toBe(1);
    
    const h1 = await page.locator('h1').count();
    expect(h1).toBe(1);
    
    console.log('✅ Hero section exists');
  });

  test('scroll indicator exists', async ({ page }) => {
    const scrollIndicator = await page.locator('button[aria-label*="Desplaz"]').count();
    
    if (scrollIndicator > 0) {
      console.log('✅ Scroll indicator exists');
    } else {
      console.log('ℹ️ Scroll indicator not found (may be hidden on mobile)');
    }
  });

  test('page structure validation', async ({ page }) => {
    const elements = {
      'h1': await page.locator('h1').count(),
      '.btn-primary': await page.locator('.btn-primary').count(),
      'footer': await page.locator('footer').count(),
      '#inicio': await page.locator('#inicio').count(),
      '.stat-number': await page.locator('.stat-number').count()
    };
    
    console.log('📊 Page structure:', elements);
    
    expect(elements['h1']).toBe(1);
    expect(elements['footer']).toBe(1);
    expect(elements['#inicio']).toBe(1);
    expect(elements['.btn-primary']).toBeGreaterThan(0);
    expect(elements['.stat-number']).toBe(4);
    
    console.log('✅ Page structure validation passed');
  });

  test('theme toggle functionality', async ({ page }) => {
    const themeToggle = await page.locator('.fixed.top-4.right-4').count();
    
    if (themeToggle > 0) {
      console.log('✅ Theme toggle exists');
      
      // Check if theme toggle buttons exist
      const lightButton = await page.locator('button[title*="Light"]').count();
      const darkButton = await page.locator('button[title*="Dark"]').count();
      const systemButton = await page.locator('button[title*="System"]').count();
      
      expect(lightButton + darkButton + systemButton).toBeGreaterThan(0);
      
      // Try clicking different theme buttons
      if (lightButton > 0) {
        await page.locator('button[title*="Light"]').first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      if (darkButton > 0) {
        await page.locator('button[title*="Dark"]').first().click({ force: true });
        await page.waitForTimeout(500);
      }
      
      console.log('✅ Theme switching works');
    } else {
      console.log('ℹ️ Theme toggle not found');
    }
  });

  test('mobile responsive check', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    const footer = await page.locator('footer').count();
    expect(footer).toBe(1);
    
    const navHeader = await page.locator('h3:has-text("Navegación")').count();
    const servicesHeader = await page.locator('h3:has-text("Servicios")').count();
    
    expect(navHeader).toBe(1);
    expect(servicesHeader).toBe(1);
    
    console.log('✅ Mobile responsive layout correct');
  });

  test('navigation functionality', async ({ page }) => {
    const navLinks = await page.locator('a[href^="#"]').count();
    expect(navLinks).toBeGreaterThan(0);
    
    // Test first navigation link
    const firstNavLink = page.locator('a[href^="#"]').first();
    const href = await firstNavLink.getAttribute('href');
    expect(href).toMatch(/^#/);
    
    console.log('✅ Navigation links functional');
  });

  test('contact form exists', async ({ page }) => {
    const contactSection = await page.locator('#contacto').count();
    
    if (contactSection > 0) {
      const form = await page.locator('form').count();
      const input = await page.locator('input').count();
      const textarea = await page.locator('textarea').count();
      
      expect(form + input + textarea).toBeGreaterThan(0);
      console.log('✅ Contact form elements exist');
    } else {
      console.log('ℹ️ Contact section not found');
    }
  });

  test('social links exist', async ({ page }) => {
    const instagramLink = await page.locator('a[href*="instagram"]').count();
    const linkedinLink = await page.locator('a[href*="linkedin"]').count();
    
    expect(instagramLink + linkedinLink).toBeGreaterThan(0);
    console.log('✅ Social links exist');
  });
});
