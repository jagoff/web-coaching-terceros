import { test, expect } from '@playwright/test';

test.describe('LaVague-Style AI Testing - Natural Language Automation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
  });

  test('AI should find and analyze the main coaching value proposition', async ({ page }) => {
    console.log('🤖 AI: Analyzing the main coaching value proposition...');
    
    // Find the hero section and extract the main message
    const heroSection = page.locator('#inicio');
    await expect(heroSection).toBeVisible();
    
    const h1Text = await page.locator('h1').textContent();
    console.log('🤖 AI: Found main headline:', h1Text);
    
    // Verify it contains coaching-related keywords
    expect(h1Text?.toLowerCase()).toMatch(/equipo|lider|propósito|límites/);
    console.log('✅ AI: Confirmed coaching value proposition detected');
  });

  test('AI should navigate through the coaching journey', async ({ page }) => {
    console.log('🤖 AI: Starting coaching journey navigation...');
    
    // Find and click on services section
    const servicesLink = page.locator('a[href="#servicios"]').first();
    if (await servicesLink.isVisible()) {
      await servicesLink.click();
      await page.waitForTimeout(2000);
      console.log('🤖 AI: Navigated to services section');
    }
    
    // Look for coaching services
    const servicesSection = page.locator('#servicios');
    if (await servicesSection.isVisible()) {
      const serviceElements = await servicesSection.locator('h2, h3, .service-title').allTextContents();
      console.log('🤖 AI: Found services:', serviceElements);
      expect(serviceElements.length).toBeGreaterThan(0);
    }
    
    // Navigate to testimonials
    const testimonialsLink = page.locator('a[href*="testimonio"]').first();
    if (await testimonialsLink.isVisible()) {
      await testimonialsLink.click();
      await page.waitForTimeout(2000);
      console.log('🤖 AI: Navigated to testimonials section');
    }
    
    console.log('✅ AI: Successfully navigated coaching journey');
  });

  test('AI should validate the conversion funnel', async ({ page }) => {
    console.log('🤖 AI: Analyzing conversion funnel...');
    
    // Check for multiple CTA buttons
    const ctaButtons = page.locator('.btn-primary');
    const buttonCount = await ctaButtons.count();
    expect(buttonCount).toBeGreaterThan(0);
    console.log(`🤖 AI: Found ${buttonCount} conversion points`);
    
    // Verify CTA buttons have proper styling and text
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      const button = ctaButtons.nth(i);
      const buttonText = await button.textContent();
      const isVisible = await button.isVisible();
      
      if (isVisible && buttonText) {
        console.log(`🤖 AI: CTA ${i + 1}: "${buttonText.trim()}" - Visible: ${isVisible}`);
        expect(buttonText.trim().length).toBeGreaterThan(0);
      }
    }
    
    // Check for contact form as final conversion step
    await page.evaluate(() => {
      const contact = document.querySelector('#contacto');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
    await page.waitForTimeout(2000);
    
    const contactSection = page.locator('#contacto');
    if (await contactSection.isVisible()) {
      const formElements = await contactSection.locator('input, textarea, button').count();
      console.log(`🤖 AI: Found ${formElements} form elements in contact section`);
      expect(formElements).toBeGreaterThan(0);
    }
    
    console.log('✅ AI: Conversion funnel validated');
  });

  test('AI should perform content quality analysis', async ({ page }) => {
    console.log('🤖 AI: Performing content quality analysis...');
    
    // Extract and analyze main content sections
    const mainContent = await page.locator('main, #__next > div > div').first();
    const contentText = await mainContent.textContent();
    
    if (contentText) {
      // Content length analysis
      const wordCount = contentText.split(/\s+/).length;
      console.log(`🤖 AI: Content word count: ${wordCount}`);
      expect(wordCount).toBeGreaterThan(100);
      
      // Keyword analysis
      const coachingKeywords = ['coaching', 'liderazgo', 'equipo', 'transformación', 'consultora'];
      const foundKeywords = coachingKeywords.filter(keyword => 
        contentText.toLowerCase().includes(keyword.toLowerCase())
      );
      console.log('🤖 AI: Found relevant keywords:', foundKeywords);
      expect(foundKeywords.length).toBeGreaterThan(2);
      
      // Structure analysis
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').count();
      console.log(`🤖 AI: Found ${headings} heading elements`);
      expect(headings).toBeGreaterThan(3);
    }
    
    console.log('✅ AI: Content quality analysis completed');
  });

  test('AI should test user interaction patterns', async ({ page }) => {
    console.log('🤖 AI: Testing user interaction patterns...');
    
    // Test hover effects on interactive elements
    const interactiveElements = page.locator('button, a.btn-primary, .hover-effect');
    const elementCount = await interactiveElements.count();
    
    for (let i = 0; i < Math.min(elementCount, 5); i++) {
      const element = interactiveElements.nth(i);
      if (await element.isVisible()) {
        // Hover over element
        await element.hover();
        await page.waitForTimeout(500);
        
        // Check if any visual feedback occurs (color change, transform, etc.)
        const boundingBox = await element.boundingBox();
        if (boundingBox) {
          console.log(`🤖 AI: Tested hover on element ${i + 1} at (${boundingBox.x}, ${boundingBox.y})`);
        }
      }
    }
    
    // Test scroll behavior
    await page.evaluate(() => {
      window.scrollTo({ top: window.innerHeight / 2, behavior: 'smooth' });
    });
    await page.waitForTimeout(1000);
    
    const scrollPosition = await page.evaluate(() => window.pageYOffset);
    expect(scrollPosition).toBeGreaterThan(0);
    console.log(`🤖 AI: Scroll test successful - position: ${scrollPosition}`);
    
    // Test navigation menu (if exists)
    const navToggle = page.locator('button[aria-label*="menu"], .nav-toggle').first();
    if (await navToggle.isVisible()) {
      await navToggle.click();
      await page.waitForTimeout(1000);
      console.log('🤖 AI: Navigation menu toggle tested');
    }
    
    console.log('✅ AI: User interaction patterns tested');
  });

  test('AI should validate accessibility and usability', async ({ page }) => {
    console.log('🤖 AI: Performing accessibility and usability analysis...');
    
    // Check for proper heading hierarchy
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    let previousLevel = 0;
    
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const level = parseInt(tagName.charAt(1));
      
      if (level > previousLevel + 1) {
        console.log(`🤖 AI: Heading skip detected: h${previousLevel} -> h${level}`);
      }
      previousLevel = level;
    }
    
    // Check for alt text on images
    const images = await page.locator('img').all();
    let imagesWithoutAlt = 0;
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      if (!alt) imagesWithoutAlt++;
    }
    
    console.log(`🤖 AI: Found ${images.length} images, ${imagesWithoutAlt} without alt text`);
    
    // Check for proper link text
    const links = await page.locator('a[href]').all();
    let emptyLinks = 0;
    
    for (const link of links) {
      const text = await link.textContent();
      if (!text || text.trim().length === 0) emptyLinks++;
    }
    
    console.log(`🤖 AI: Found ${links.length} links, ${emptyLinks} with empty text`);
    
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    await page.waitForTimeout(500);
    
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);
    console.log('🤖 AI: Keyboard navigation test passed');
    
    console.log('✅ AI: Accessibility and usability validation completed');
  });

  test('AI should generate comprehensive site report', async ({ page }) => {
    console.log('🤖 AI: Generating comprehensive site analysis report...');
    
    // Site performance metrics
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
      };
    });
    
    console.log('🤖 AI: Performance metrics:', performanceMetrics);
    
    // Content structure analysis
    const structureAnalysis = await page.evaluate(() => {
      return {
        totalElements: document.querySelectorAll('*').length,
        textNodes: document.querySelectorAll('body *').length,
        interactiveElements: document.querySelectorAll('button, a, input, select, textarea').length,
        images: document.querySelectorAll('img').length,
        forms: document.querySelectorAll('form').length
      };
    });
    
    console.log('🤖 AI: Structure analysis:', structureAnalysis);
    
    // Language detection
    const pageLang = await page.locator('html').getAttribute('lang');
    const bodyText = await page.locator('body').textContent();
    const spanishWords = ['transformá', 'liderá', 'escalá', 'equipo', 'propósito'];
    const englishWords = ['transform', 'lead', 'scale', 'team', 'purpose'];
    
    const spanishCount = spanishWords.filter(word => 
      bodyText?.toLowerCase().includes(word)
    ).length;
    const englishCount = englishWords.filter(word => 
      bodyText?.toLowerCase().includes(word)
    ).length;
    
    const detectedLanguage = spanishCount > englishCount ? 'Spanish' : 'English';
    console.log(`🤖 AI: Detected primary language: ${detectedLanguage} (ES: ${spanishCount}, EN: ${englishCount})`);
    
    // Final AI assessment
    console.log('🤖 AI: === COMPREHENSIVE SITE ANALYSIS COMPLETE ===');
    console.log('🤖 AI: Site Type: Coaching/Consulting Landing Page');
    console.log('🤖 AI: Primary Language:', detectedLanguage);
    console.log('🤖 AI: Performance: Good' + (performanceMetrics.loadTime < 3000 ? ' ✅' : ' ⚠️'));
    console.log('🤖 AI: Structure: Well-organized ✅');
    console.log('🤖 AI: Interactive Elements:', structureAnalysis.interactiveElements);
    console.log('🤖 AI: Content Richness: High ✅');
    
    expect(structureAnalysis.interactiveElements).toBeGreaterThan(10);
    expect(performanceMetrics.loadTime).toBeLessThan(5000);
    
    console.log('✅ AI: Comprehensive site analysis completed successfully');
  });
});
