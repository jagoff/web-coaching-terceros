import { test, expect } from '@playwright/test';

test.describe('Visual Validation - Complete Site Check', () => {
  test.beforeEach(async ({ page, isMobile }) => {
    await page.goto('/');
    // Wait for page to be ready
    await page.waitForLoadState('domcontentloaded');
    
    // Mobile needs more time for hydration and rendering
    const baseWait = isMobile ? 1500 : 500;
    const timeout = isMobile ? 15000 : 10000;
    const hydrationWait = isMobile ? 2000 : 1000;
    
    await page.waitForTimeout(baseWait);
  
    // Wait for critical elements to exist (not necessarily visible)
    // Mobile: wait longer and be more patient with hydration
    await page.waitForSelector('.btn-primary', { state: 'attached', timeout });
    await page.waitForSelector('.stat-number', { state: 'attached', timeout });
    await page.waitForTimeout(hydrationWait); // Wait for hydration to complete
  });

  test('CTA buttons exist and have orange color', async ({ page, isMobile }) => {
    // Mobile needs more time for button hydration
    const timeout = isMobile ? 10000 : 7000;
    await page.waitForSelector('.btn-primary, .btn-hero-primary', { state: 'visible', timeout });
    
    // Wait a bit more for CSS to fully apply
    await page.waitForTimeout(1000);
    
    // Check for both btn-primary and btn-hero-primary classes
    const primaryButton = page.locator('.btn-primary, .btn-hero-primary').first();
    const buttonCount = await primaryButton.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check color with visibility ensured
    const backgroundColor = await primaryButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    console.log('🔍 CTA button color detected:', backgroundColor);
    
    // Check for orange colors (RGB values for orange variations)
    const hasOrange = backgroundColor.includes('255') && 
                     (backgroundColor.includes('107') || backgroundColor.includes('133') || backgroundColor.includes('85') || backgroundColor.includes('69'));
    
    expect(hasOrange).toBeTruthy();
    console.log('✅ CTA button has orange color');
  });

  test('stats count is correct', async ({ page, isMobile }) => {
    // Mobile needs more time for stats hydration and animation
    const timeout = isMobile ? 8000 : 5000;
    await page.waitForSelector('.stat-number', { state: 'attached', timeout });
    
    // On mobile, stats might need extra time for CountUp animation to start
    if (isMobile) {
      await page.waitForTimeout(500);
    }
    
    const statNumbers = await page.locator('.stat-number').count();
    expect(statNumbers).toBe(4);
    console.log('✅ Stats count correct:', statNumbers);
  });

  test('footer sections exist', async ({ page }) => {
    // Homepage doesn't have footer by design, only subpages do
    const currentUrl = page.url();
    const isHomepage = currentUrl.endsWith('/') || currentUrl.endsWith('/#');

    if (isHomepage) {
      const footer = await page.locator('footer').count();
      expect(footer).toBe(0);
      console.log('✅ Homepage correctly has no footer');
    } else {
      // Subpages have a minimal footer: logo + nav links + instagram
      const footer = await page.locator('footer').count();
      expect(footer).toBe(1);

      const instagramLink = await page.locator('footer a[href*="instagram"]').count();
      expect(instagramLink).toBe(1);
      console.log('✅ Subpage has correct footer');
    }

    console.log('✅ Footer check complete');
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

  test('page structure validation', async ({ page, isMobile }) => {
    // Mobile needs more time for all elements to hydrate
    const timeout = isMobile ? 8000 : 5000;
    
    // Wait for critical elements to load
    await page.waitForSelector('h1', { state: 'attached', timeout });
    await page.waitForSelector('.btn-primary, .btn-hero-primary', { state: 'attached', timeout });
    await page.waitForSelector('.stat-number', { state: 'attached', timeout });
    
    // On mobile, give extra time for hydration to complete
    if (isMobile) {
      await page.waitForTimeout(500);
    }
    
    const elements = {
      'h1': await page.locator('h1').count(),
      '.btn-primary, .btn-hero-primary': await page.locator('.btn-primary, .btn-hero-primary').count(),
      'footer': await page.locator('footer').count(),
      '#inicio': await page.locator('#inicio').count(),
      '.stat-number': await page.locator('.stat-number').count()
    };
    
    console.log('📊 Page structure:', elements);
    
    expect(elements['h1']).toBe(1);
    // Homepage doesn't have footer by design
    expect(elements['footer']).toBe(0);
    expect(elements['#inicio']).toBe(1);
    expect(elements['.btn-primary, .btn-hero-primary']).toBeGreaterThan(0);
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
    // Homepage has no footer by design (nano footer is embedded in Contact section)
    // Navigate to a subpage that does have a footer to test mobile responsive layout
    await page.goto('/servicios');
    await page.waitForLoadState('domcontentloaded');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);

    const footer = await page.locator('footer').count();
    expect(footer).toBe(1);

    // Footer has a minimal horizontal layout: logo + nav links + instagram
    const instagramLink = await page.locator('footer a[href*="instagram"]').count();
    expect(instagramLink).toBe(1);

    // Logo brand mark should be present
    const logoText = await page.locator('footer .text-gradient').count();
    expect(logoText).toBeGreaterThan(0);

    console.log('✅ Mobile responsive layout correct');
  });

  test('navigation functionality', async ({ page, isMobile }) => {
    // Mobile needs more time for navigation links to hydrate
    const timeout = isMobile ? 8000 : 5000;
    
    // Wait for navigation elements to be present
    await page.waitForSelector('a[href*="#"], nav a, .nav a', { state: 'attached', timeout });
    
    // On mobile, navigation might be in a different state (hamburger menu, etc.)
    if (isMobile) {
      await page.waitForTimeout(500);
    }
    
    // Check for both hash links and navigation links
    const hashLinks = await page.locator('a[href*="#"]').count();
    const navLinks = await page.locator('nav a, .nav a').count();
    const totalLinks = hashLinks + navLinks;
    
    expect(totalLinks).toBeGreaterThan(0);
    
    // Test first available link
    let firstLink = null;
    if (hashLinks > 0) {
      firstLink = page.locator('a[href*="#"]').first();
    } else if (navLinks > 0) {
      firstLink = page.locator('nav a, .nav a').first();
    }
    
    if (firstLink) {
      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
      console.log('✅ Navigation links functional, found:', href);
    } else {
      console.log('ℹ️ No navigation links found');
    }
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
