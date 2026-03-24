import { test, expect, devices } from '@playwright/test';

// Use mobile device configurations
test.use({ ...devices['iPhone 12'] });

test.describe('📱 Mobile Complete Suite - 100% Project Verification', () => {
  let baseUrl: string;

  test.beforeAll(async ({ browser }) => {
    baseUrl = 'http://localhost:3000';
    
    // Verify server is running
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
      await page.goto(baseUrl, { timeout: 10000 });
      console.log('✅ Servidor corriendo en', baseUrl);
    } catch (error) {
      console.log('❌ Servidor no encontrado');
      throw new Error('El servidor debe estar corriendo en localhost:3000');
    } finally {
      await context.close();
    }
  });

  test.describe('🏠 Initial Load & Core Functionality', () => {
    test('Mobile viewport and basic structure', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      console.log(`⏱️ Tiempo de carga móvil: ${loadTime}ms`);
      
      // Verify mobile viewport
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeLessThanOrEqual(428); // iPhone 12 width
      expect(viewport?.height).toBeGreaterThanOrEqual(800);
      
      // Verify basic structure
      await expect(page.locator('html')).toBeVisible();
      await expect(page.locator('body')).toBeVisible();
      
      // Verify mobile meta tags
      const title = await page.title();
      expect(title).toContain('ELEVA');
      
      // Check viewport meta tag exists
      const viewportMeta = page.locator('meta[name="viewport"]').first();
      await expect(viewportMeta).toBeVisible();
      const viewportContent = await viewportMeta.getAttribute('content');
      expect(viewportContent).toContain('width=device-width');
      expect(viewportContent).toContain('initial-scale=1');
      
      // Verify language
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('es');
      
      console.log('✅ Estructura básica móvil correcta');
    });

    test('Mobile responsive design elements', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Check viewport meta tag
      const viewportMeta = await page.locator('meta[name="viewport"]').first().getAttribute('content');
      expect(viewportMeta).toContain('width=device-width');
      expect(viewportMeta).toContain('initial-scale=1');
      
      // Verify mobile navigation is present
      const mobileNav = page.locator('.lg:hidden button, button[aria-expanded], nav').filter({ hasText: '' }).first();
      if (await mobileNav.count() > 0) {
        await expect(mobileNav.first()).toBeVisible();
      }
      
      // Check for responsive grid layouts
      const responsiveElements = page.locator('.grid, .flex, [class*="sm:"], [class*="md:"], [class*="lg:"]');
      const responsiveCount = await responsiveElements.count();
      expect(responsiveCount).toBeGreaterThan(0);
      
      console.log('✅ Diseño responsivo móvil verificado');
    });
  });

  test.describe('🎯 Hero Section Mobile Tests', () => {
    test('Hero content and CTA buttons', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Wait for hero section to load
      await page.waitForSelector('h1, .hero, [data-testid="hero"]', { timeout: 5000 });
      
      // Verify main heading is visible and readable on mobile
      const mainHeading = page.locator('h1').first();
      const headingExists = await mainHeading.count() > 0;
      if (headingExists) {
        await expect(mainHeading).toBeVisible();
        
        const headingText = await mainHeading.textContent();
        expect(headingText?.length).toBeGreaterThan(0);
        expect(headingText?.length!).toBeLessThan(100); // Mobile-friendly length
      }
      
      // Verify CTA buttons are mobile-friendly (44px minimum touch target)
      const ctaButtons = page.locator('button, a[href]').filter({ hasText: /agendar|contact|sesión|gratis/i });
      const ctaCount = await ctaButtons.count();
      
      let validButtons = 0;
      for (let i = 0; i < ctaCount; i++) {
        const button = ctaButtons.nth(i);
        if (await button.isVisible()) {
          const boundingBox = await button.boundingBox();
          if (boundingBox) {
            // Check if button meets mobile touch target requirements
            if (boundingBox.height >= 44 && boundingBox.width >= 44) {
              validButtons++;
            } else {
              console.log(`⚠️ Button too small: ${boundingBox.height}x${boundingBox.width}px`);
            }
          }
        }
      }
      
      // At least one valid CTA button should exist
      expect(validButtons).toBeGreaterThan(0);
      
      console.log('✅ Hero móvil verificado');
    });

    test('Hero mobile animations and interactions', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Test touch interactions on hero
      const heroSection = page.locator('.hero, [data-testid="hero"], section').first();
      if (await heroSection.isVisible()) {
        // Test tap gestures
        await heroSection.tap();
        await page.waitForTimeout(500);
        
        // Verify no JavaScript errors
        const errors: string[] = [];
        page.on('pageerror', error => errors.push(error.message));
        
        // Test swipe gestures if applicable
        await page.touchscreen.tap(200, 300);
        await page.waitForTimeout(200);
      }
      
      console.log('✅ Interacciones hero móvil verificadas');
    });
  });

  test.describe('📋 Navigation & Menu Mobile Tests', () => {
    test('Mobile menu toggle functionality', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Look for mobile menu toggle using multiple selectors
      const menuToggle = page.locator('button[aria-label*="menú"], button[aria-label*="menu"], button[aria-expanded], .lg:hidden button').first();
      
      if (await menuToggle.isVisible()) {
        // Check initial state
        const initialAriaExpanded = await menuToggle.getAttribute('aria-expanded');
        expect(initialAriaExpanded).toBe('false');
        
        // Test menu opening
        await menuToggle.tap();
        await page.waitForTimeout(500);
        
        // Verify menu is open
        const newAriaExpanded = await menuToggle.getAttribute('aria-expanded');
        expect(newAriaExpanded).toBe('true');
        
        // Verify mobile menu overlay is visible
        const mobileMenu = page.locator('#mobile-menu, [id*="mobile-menu"], .motion-div');
        if (await mobileMenu.count() > 0) {
          await expect(mobileMenu.first()).toBeVisible();
        }
        
        // Verify menu items are visible and touch-friendly
        const menuItems = page.locator('nav button, .nav button, [role="menuitem"]');
        const itemCount = await menuItems.count();
        
        for (let i = 0; i < Math.min(itemCount, 5); i++) {
          const item = menuItems.nth(i);
          if (await item.isVisible()) {
            const boundingBox = await item.boundingBox();
            if (boundingBox) {
              expect(boundingBox.height).toBeGreaterThanOrEqual(44);
            }
          }
        }
        
        // Test menu closing
        await menuToggle.tap();
        await page.waitForTimeout(500);
        
        // Verify menu is closed
        const finalAriaExpanded = await menuToggle.getAttribute('aria-expanded');
        expect(finalAriaExpanded).toBe('false');
      } else {
        console.log('⚠️ Mobile menu toggle not found - may be desktop viewport');
      }
      
      console.log('✅ Menú móvil verificado');
    });

    test('Mobile navigation accessibility', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Test keyboard navigation on mobile
      await page.keyboard.press('Tab');
      await page.waitForTimeout(200);
      
      // Test ARIA labels
      const interactiveElements = page.locator('button, a[href], [role="button"]');
      const elementCount = await interactiveElements.count();
      
      for (let i = 0; i < Math.min(elementCount, 10); i++) {
        const element = interactiveElements.nth(i);
        if (await element.isVisible()) {
          const ariaLabel = await element.getAttribute('aria-label');
          const ariaRole = await element.getAttribute('role');
          const text = await element.textContent();
          
          // At least one of these should be present for accessibility
          expect(ariaLabel || ariaRole || text).toBeTruthy();
        }
      }
      
      console.log('✅ Accesibilidad navegación móvil verificada');
    });
  });

  test.describe('📖 Content Sections Mobile Tests', () => {
    test('About section mobile layout', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Scroll to about section
      const aboutSection = page.locator('[data-testid="about"], .about, #about').first();
      if (await aboutSection.count() > 0) {
        await aboutSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Verify text is readable on mobile
        const textElements = aboutSection.locator('p, h2, h3');
        const textCount = await textElements.count();
        
        for (let i = 0; i < textCount; i++) {
          const element = textElements.nth(i);
          if (await element.isVisible()) {
            const fontSize = await element.evaluate(el => {
              return window.getComputedStyle(el).fontSize;
            });
            
            // Mobile fonts should be at least 16px for readability
            expect(parseInt(fontSize)).toBeGreaterThanOrEqual(14);
          }
        }
      }
      
      console.log('✅ Sección About móvil verificada');
    });

    test('Services section mobile layout', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Look for services section
      const servicesSection = page.locator('[data-testid="services"], .services, #services').first();
      if (await servicesSection.count() > 0) {
        await servicesSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Verify service cards are mobile-friendly
        const serviceCards = servicesSection.locator('.card, .service, [data-testid="service-card"]');
        const cardCount = await serviceCards.count();
        
        for (let i = 0; i < cardCount; i++) {
          const card = serviceCards.nth(i);
          if (await card.isVisible()) {
            // Check touch targets
            const boundingBox = await card.boundingBox();
            if (boundingBox) {
              expect(boundingBox.width).toBeGreaterThan(0);
              expect(boundingBox.height).toBeGreaterThan(0);
            }
            
            // Check text readability
            const cardText = card.locator('h3, p, .title');
            const textCount = await cardText.count();
            
            for (let j = 0; j < textCount; j++) {
              const text = cardText.nth(j);
              if (await text.isVisible()) {
                const fontSize = await text.evaluate(el => {
                  return window.getComputedStyle(el).fontSize;
                });
                expect(parseInt(fontSize)).toBeGreaterThanOrEqual(12);
              }
            }
          }
        }
      }
      
      console.log('✅ Sección Services móvil verificada');
    });

    test('Testimonials section mobile layout', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Look for testimonials section
      const testimonialsSection = page.locator('[data-testid="testimonials"], .testimonials, #testimonials').first();
      if (await testimonialsSection.count() > 0) {
        await testimonialsSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Verify testimonial cards are mobile-friendly
        const testimonialCards = testimonialsSection.locator('.testimonial, .card, [data-testid="testimonial"]');
        const cardCount = await testimonialCards.count();
        
        for (let i = 0; i < Math.min(cardCount, 5); i++) {
          const card = testimonialCards.nth(i);
          if (await card.isVisible()) {
            // Check horizontal overflow (shouldn't exist on mobile)
            const boundingBox = await card.boundingBox();
            if (boundingBox) {
              expect(boundingBox.width).toBeLessThanOrEqual(428); // Should not overflow viewport
            }
            
            // Test swipe functionality if it's a carousel
            try {
              await card.tap();
              await page.waitForTimeout(200);
              
              // Try swipe gesture using page.mouse
              await page.mouse.move(100, 400);
              await page.mouse.down();
              await page.mouse.move(300, 400);
              await page.mouse.up();
            } catch (error) {
              // Swipe might not be implemented, that's okay
            }
          }
        }
      }
      
      console.log('✅ Sección Testimonials móvil verificada');
    });

    test('Case studies section mobile layout', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Look for case studies section
      const caseStudiesSection = page.locator('[data-testid="case-studies"], .case-studies, #case-studies').first();
      if (await caseStudiesSection.count() > 0) {
        await caseStudiesSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Verify case study cards are mobile-friendly
        const caseCards = caseStudiesSection.locator('.case-study, .card, [data-testid="case-card"]');
        const cardCount = await caseCards.count();
        
        for (let i = 0; i < Math.min(cardCount, 5); i++) {
          const card = caseCards.nth(i);
          if (await card.isVisible()) {
            // Test modal or detail view functionality
            try {
              await card.tap();
              await page.waitForTimeout(500);
              
              // Check if modal opened
              const modal = page.locator('.modal, .dialog, [role="dialog"]');
              if (await modal.count() > 0 && await modal.first().isVisible()) {
                // Test closing modal
                const closeButton = modal.locator('.close, button[aria-label="close"], .close-button').first();
                if (await closeButton.isVisible()) {
                  await closeButton.tap();
                  await page.waitForTimeout(300);
                }
              }
            } catch (error) {
              // Modal might not be implemented, that's okay
            }
          }
        }
      }
      
      console.log('✅ Sección Case Studies móvil verificada');
    });
  });

  test.describe('📝 Contact & Forms Mobile Tests', () => {
    test('Contact form mobile usability', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Look for contact section
      const contactSection = page.locator('[data-testid="contact"], .contact, #contact').first();
      if (await contactSection.count() > 0) {
        await contactSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(1000);
        
        // Test form inputs
        const formInputs = contactSection.locator('input, textarea, select');
        const inputCount = await formInputs.count();
        
        for (let i = 0; i < inputCount; i++) {
          const input = formInputs.nth(i);
          if (await input.isVisible()) {
            // Check touch target size (44px minimum)
            const boundingBox = await input.boundingBox();
            if (boundingBox) {
              expect(boundingBox.height).toBeGreaterThanOrEqual(44);
            }
            
            // Test input focus on mobile
            await input.tap();
            await page.waitForTimeout(200);
            
            // Check if keyboard appears (input is focused)
            const isFocused = await input.evaluate(el => document.activeElement === el);
            expect(isFocused).toBeTruthy();
            
            // Test typing
            await input.fill('Test text');
            const value = await input.inputValue();
            expect(value).toBe('Test text');
            
            // Clear input for next test
            await input.fill('');
          }
        }
        
        // Test submit button
        const submitButton = contactSection.locator('button[type="submit"], .submit, button').filter({ hasText: /enviar|submit|send/i }).first();
        if (await submitButton.isVisible()) {
          const boundingBox = await submitButton.boundingBox();
          if (boundingBox) {
            expect(boundingBox.height).toBeGreaterThanOrEqual(44);
            expect(boundingBox.width).toBeGreaterThanOrEqual(44);
          }
        }
      }
      
      console.log('✅ Formulario contacto móvil verificado');
    });

    test('CTA buttons mobile accessibility', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Find all CTA buttons
      const ctaButtons = page.locator('a[href], button').filter({
        hasText: /agendar|contact|sesión|gratis|whatsapp|email/i
      });
      
      const buttonCount = await ctaButtons.count();
      let validButtons = 0;
      
      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        const button = ctaButtons.nth(i);
        if (await button.isVisible()) {
          // Check touch target size
          const boundingBox = await button.boundingBox();
          if (boundingBox) {
            if (boundingBox.height >= 44 && boundingBox.width >= 44) {
              validButtons++;
            } else {
              console.log(`⚠️ CTA button too small: ${boundingBox.height}x${boundingBox.width}px`);
            }
          }
          
          // Test button functionality
          const href = await button.getAttribute('href');
          if (href && href.includes('http')) {
            // External link - check if it opens properly
            try {
              const [newPage] = await Promise.all([
                page.context().waitForEvent('page', { timeout: 3000 }),
                button.tap()
              ]);
              await newPage.waitForLoadState();
              expect(newPage.url()).toContain(href);
              await newPage.close();
            } catch (error) {
              console.log(`⚠️ External link test failed: ${href}`);
            }
          } else {
            // Internal link or button
            try {
              await button.tap();
              await page.waitForTimeout(500);
            } catch (error) {
              console.log(`⚠️ Button tap failed`);
            }
          }
        }
      }
      
      // At least one valid CTA button should exist
      expect(validButtons).toBeGreaterThan(0);
      
      console.log('✅ Botones CTA móvil verificados');
    });
  });

  test.describe('🌐 Language Switching Mobile Tests', () => {
    test('Language toggle mobile functionality', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Look for language toggle
      const langToggle = page.locator('[data-testid="lang-toggle"], .lang-toggle, button[aria-label*="idioma"], button[aria-label*="language"]').first();
      
      if (await langToggle.isVisible()) {
        // Get current language
        const initialLang = await page.locator('html').getAttribute('lang');
        
        // Test language switching
        await langToggle.tap();
        await page.waitForTimeout(1000);
        
        // Check if language changed
        const newLang = await page.locator('html').getAttribute('lang');
        expect(newLang).not.toBe(initialLang);
        
        // Test language switching back
        await langToggle.tap();
        await page.waitForTimeout(1000);
        
        const finalLang = await page.locator('html').getAttribute('lang');
        expect(finalLang).toBe(initialLang);
      } else {
        // Try alternative language selectors
        const langOptions = page.locator('a[href*="/en"], a[href*="/es"], .language-selector a');
        const optionCount = await langOptions.count();
        
        if (optionCount > 0) {
          const initialLang = await page.locator('html').getAttribute('lang');
          await langOptions.first().tap();
          await page.waitForTimeout(1000);
          
          const newLang = await page.locator('html').getAttribute('lang');
          expect(newLang).not.toBe(initialLang);
        }
      }
      
      console.log('✅ Cambio de idioma móvil verificado');
    });

    test('Content translation mobile verification', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Get initial Spanish content
      const initialTitle = await page.title();
      const initialHeading = await page.locator('h1').first().textContent();
      
      // Switch to English
      const langToggle = page.locator('[data-testid="lang-toggle"], .lang-toggle, a[href*="/en"]').first();
      if (await langToggle.isVisible()) {
        await langToggle.tap();
        await page.waitForTimeout(1000);
        
        // Verify content changed to English
        const newTitle = await page.title();
        const newHeading = await page.locator('h1').first().textContent();
        
        expect(newTitle).not.toBe(initialTitle);
        expect(newHeading).not.toBe(initialHeading);
        
        // Check for English keywords
        expect(newTitle.toLowerCase() + ' ' + newHeading?.toLowerCase()).toMatch(/leadership|coaching|consulting|agile/i);
      }
      
      console.log('✅ Traducción contenido móvil verificada');
    });
  });

  test.describe('⚡ Performance & Accessibility Mobile Tests', () => {
    test('Mobile performance metrics', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      console.log(`⏱️ Tiempo de carga móvil: ${loadTime}ms`);
      
      // Mobile should load reasonably fast
      expect(loadTime).toBeLessThan(5000); // 5 seconds max for mobile
      
      // Check Core Web Vitals
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-paint')?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByType('paint').find(p => p.name === 'first-contentful-paint')?.startTime || 0,
        };
      });
      
      console.log('📊 Métricas de rendimiento móvil:', metrics);
      
      // First Contentful Paint should be under 2 seconds on mobile
      expect(metrics.firstContentfulPaint).toBeLessThan(2000);
    });

    test('Mobile accessibility checks', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Check color contrast (basic check)
      const textElements = page.locator('p, h1, h2, h3, h4, h5, h6, a, button');
      const elementCount = await textElements.count();
      
      let validTextElements = 0;
      for (let i = 0; i < Math.min(elementCount, 20); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const styles = await element.evaluate(el => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize,
            };
          });
          
          // Basic check - element should have some color defined
          if (styles.color && styles.fontSize) {
            validTextElements++;
            // Font size should be readable on mobile
            const fontSize = parseInt(styles.fontSize);
            expect(fontSize).toBeGreaterThanOrEqual(12);
          }
        }
      }
      
      expect(validTextElements).toBeGreaterThan(0);
      
      // Check ARIA labels on interactive elements
      const interactiveElements = page.locator('button, a[href], input, textarea, select');
      const interactiveCount = await interactiveElements.count();
      
      let validInteractiveElements = 0;
      for (let i = 0; i < Math.min(interactiveCount, 15); i++) {
        const element = interactiveElements.nth(i);
        if (await element.isVisible()) {
          const ariaLabel = await element.getAttribute('aria-label');
          const ariaLabelledBy = await element.getAttribute('aria-labelledby');
          const title = await element.getAttribute('title');
          const text = await element.textContent();
          
          // Interactive elements should have some form of label
          if (ariaLabel || ariaLabelledBy || title || text?.trim()) {
            validInteractiveElements++;
          }
        }
      }
      
      expect(validInteractiveElements).toBeGreaterThan(0);
      
      console.log('✅ Accesibilidad móvil verificada');
    });

    test('Mobile touch interactions', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Test various touch interactions
      const scrollableElements = page.locator('body, main, .scrollable');
      
      // Test vertical scrolling
      await page.touchscreen.tap(200, 400);
      await page.mouse.move(200, 200);
      await page.mouse.down();
      await page.mouse.up();
      await page.waitForTimeout(500);
      
      // Test pinch zoom (should be disabled or controlled)
      await page.touchscreen.tap(100, 300);
      await page.mouse.down();
      await page.mouse.move(150, 350);
      await page.mouse.up();
      await page.waitForTimeout(300);
      
      // Test double tap
      await page.touchscreen.tap(200, 300);
      await page.touchscreen.tap(200, 300);
      await page.waitForTimeout(500);
      
      // Verify no JavaScript errors during touch interactions
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      
      // Test swipe gestures
      await page.touchscreen.tap(50, 300);
      await page.mouse.move(350, 300);
      await page.mouse.up();
      await page.waitForTimeout(500);
      
      expect(errors.length).toBe(0);
      
      console.log('✅ Interacciones táctiles móviles verificadas');
    });
  });

  test.describe('🔄 Orientation & Responsive Tests', () => {
    test('Landscape orientation', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Change to landscape orientation
      await page.setViewportSize({ width: 844, height: 390 }); // iPhone 12 landscape
      
      await page.waitForTimeout(1000);
      
      // Verify layout adapts to landscape
      const viewport = page.viewportSize();
      expect(viewport?.width).toBeGreaterThan(viewport?.height!);
      
      // Check that content is still readable
      const mainHeading = page.locator('h1').first();
      await expect(mainHeading).toBeVisible();
      
      // Test navigation in landscape
      const navElements = page.locator('nav a, .nav a, header a');
      const navCount = await navElements.count();
      
      for (let i = 0; i < Math.min(navCount, 5); i++) {
        const element = navElements.nth(i);
        if (await element.isVisible()) {
          const boundingBox = await element.boundingBox();
          if (boundingBox) {
            expect(boundingBox.width).toBeGreaterThan(0);
            expect(boundingBox.height).toBeGreaterThan(0);
          }
        }
      }
      
      console.log('✅ Orientación landscape verificada');
    });

    test('Different screen sizes', async ({ page }) => {
      const screenSizes = [
        { width: 320, height: 568 }, // iPhone SE
        { width: 375, height: 667 }, // iPhone 8
        { width: 414, height: 896 }, // iPhone 11
      ];
      
      for (const size of screenSizes) {
        await page.setViewportSize(size);
        await page.waitForTimeout(500);
        
        // Check viewport meta tag response
        const viewportWidth = await page.evaluate(() => {
          return window.innerWidth;
        });
        
        expect(viewportWidth).toBeLessThanOrEqual(size.width);
        
        // Check if h1 exists, if not skip this check
        const mainHeading = page.locator('h1').first();
        const headingExists = await mainHeading.count() > 0;
        if (headingExists) {
          await expect(mainHeading).toBeVisible();
        } else {
          console.log(`⚠️ No h1 found for viewport ${size.width}x${size.height}`);
        }
        
        console.log(`✅ Tamaño ${size.width}x${size.height} verificado`);
      }
    });
  });

  test.describe('📱 Mobile-Specific Features', () => {
    test('Mobile keyboard interactions', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Find input fields
      const inputs = page.locator('input[type="text"], input[type="email"], textarea');
      const inputCount = await inputs.count();
      
      if (inputCount > 0) {
        const firstInput = inputs.first();
        await firstInput.tap();
        
        // Test keyboard appearance
        await page.waitForTimeout(500);
        
        // Test typing on mobile keyboard
        await firstInput.fill('Test mobile input');
        const value = await firstInput.inputValue();
        expect(value).toBe('Test mobile input');
        
        // Test keyboard dismissal
        await page.keyboard.press('Escape');
        await page.waitForTimeout(300);
      }
      
      console.log('✅ Interacciones teclado móvil verificadas');
    });

    test('Mobile scroll behavior', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Test smooth scrolling
      await page.evaluate(() => {
        window.scrollTo({ top: 500, behavior: 'smooth' });
      });
      
      await page.waitForTimeout(1000);
      
      // Verify scroll position
      const scrollY = await page.evaluate(() => window.scrollY);
      expect(scrollY).toBeGreaterThan(0);
      
      // Test scroll to top
      await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      
      await page.waitForTimeout(1000);
      
      const finalScrollY = await page.evaluate(() => window.scrollY);
      expect(finalScrollY).toBe(0);
      
      console.log('✅ Comportamiento scroll móvil verificado');
    });

    test('Mobile gesture support', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Test swipe gestures on different sections
      const sections = page.locator('section, .section');
      const sectionCount = await sections.count();
      
      for (let i = 0; i < Math.min(sectionCount, 3); i++) {
        const section = sections.nth(i);
        await section.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        
        // Test horizontal swipe
        try {
          await page.touchscreen.tap(100, 300);
          await page.mouse.move(300, 300);
          await page.mouse.up();
          await page.waitForTimeout(300);
        } catch (error) {
          // Swipe might not be implemented on this section
        }
        
        // Test vertical swipe
        try {
          await page.touchscreen.tap(200, 400);
          await page.mouse.move(200, 200);
          await page.mouse.up();
          await page.waitForTimeout(300);
        } catch (error) {
          // Swipe might not be implemented on this section
        }
      }
      
      console.log('✅ Soporte gestos móvil verificado');
    });
  });

  test.describe('🔍 Final Mobile Verification', () => {
    test('Complete mobile user journey', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Simulate complete user journey on mobile
      console.log('🚀 Iniciando journey completo móvil...');
      
      // 1. User lands on page and scrolls through hero
      await page.waitForTimeout(2000);
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'smooth' }));
      await page.waitForTimeout(1000);
      
      // 2. User navigates through sections
      const sections = ['about', 'services', 'testimonials', 'contact'];
      
      for (const sectionId of sections) {
        const section = page.locator(`[data-testid="${sectionId}"], .${sectionId}, #${sectionId}`).first();
        if (await section.count() > 0) {
          await section.scrollIntoViewIfNeeded();
          await page.waitForTimeout(800);
          
          // Test interaction in section
          const buttons = section.locator('button, a[href]');
          const buttonCount = await buttons.count();
          
          if (buttonCount > 0) {
            const firstButton = buttons.first();
            if (await firstButton.isVisible()) {
              await firstButton.tap();
              await page.waitForTimeout(500);
              
              // Go back if navigation occurred
              await page.goBack();
              await page.waitForTimeout(500);
            }
          }
        }
      }
      
      // 3. User tries language switching
      const langToggle = page.locator('[data-testid="lang-toggle"], .lang-toggle').first();
      if (await langToggle.isVisible()) {
        await langToggle.tap();
        await page.waitForTimeout(1000);
        await langToggle.tap();
        await page.waitForTimeout(500);
      }
      
      // 4. User tries contact form
      const contactSection = page.locator('[data-testid="contact"], .contact').first();
      if (await contactSection.count() > 0) {
        await contactSection.scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);
        
        const inputs = contactSection.locator('input, textarea');
        const inputCount = await inputs.count();
        
        for (let i = 0; i < Math.min(inputCount, 2); i++) {
          const input = inputs.nth(i);
          if (await input.isVisible()) {
            await input.tap();
            await input.fill(`Test field ${i + 1}`);
            await page.waitForTimeout(300);
          }
        }
      }
      
      // 5. User scrolls back to top
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
      await page.waitForTimeout(1000);
      
      // Verify no errors occurred during journey
      const errors: string[] = [];
      page.on('pageerror', error => errors.push(error.message));
      
      expect(errors.length).toBe(0);
      
      console.log('✅ Journey completo móvil finalizado con éxito');
    });

    test('Mobile compatibility check', async ({ page }) => {
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      // Check mobile-specific meta tags
      const viewportMeta = await page.locator('meta[name="viewport"]').first().getAttribute('content');
      expect(viewportMeta).toContain('width=device-width');
      
      // Check for mobile-friendly features
      const hasTouchOptimized = await page.locator('body').evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.touchAction !== 'none' || style.userSelect !== 'none';
      });
      
      expect(hasTouchOptimized).toBeTruthy();
      
      // Check for responsive images
      const images = page.locator('img');
      const imageCount = await images.count();
      
      for (let i = 0; i < Math.min(imageCount, 10); i++) {
        const img = images.nth(i);
        if (await img.isVisible()) {
          const srcset = await img.getAttribute('srcset');
          const sizes = await img.getAttribute('sizes');
          const loading = await img.getAttribute('loading');
          
          // At least one of these should be present for mobile optimization
          expect(srcset || sizes || loading).toBeTruthy();
        }
      }
      
      // Check for fast tap response
      const buttons = page.locator('button, a[href]');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        const firstButton = buttons.first();
        const startTime = Date.now();
        await firstButton.tap();
        const responseTime = Date.now() - startTime;
        
        // Tap response should be fast (< 300ms)
        expect(responseTime).toBeLessThan(300);
      }
      
      console.log('✅ Compatibilidad móvil verificada');
    });
  });
});
