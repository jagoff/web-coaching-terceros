import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test.describe('Mobile Full Test Suite', () => {
  const logFile = path.join(__dirname, '../test-results/mobile-test-logs.txt');
  
  test.beforeAll(async () => {
    // Crear directorio de logs si no existe
    const logDir = path.dirname(logFile);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    // Inicializar archivo de logs
    fs.writeFileSync(logFile, `=== Mobile Test Logs - ${new Date().toISOString()} ===\n\n`);
  });

  const log = (message: string) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${message}\n`;
    fs.appendFileSync(logFile, logEntry);
    console.log(message);
  };

  test.beforeEach(async ({ page }) => {
    // Configurar viewport mobile
    await page.setViewportSize({ width: 390, height: 844 });
    
    // Capturar errores de consola
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
        log(`❌ Console Error: ${msg.text()}`);
      }
    });
    
    // Capturar errores de red
    page.on('response', response => {
      if (response.status() >= 400) {
        log(`🌐 Network Error: ${response.url()} - ${response.status()}`);
      }
    });
    
    page.on('pageerror', error => {
      log(`🚨 Page Error: ${error.message}`);
    });
  });

  test('Mobile - Hero Section', async ({ page }) => {
    log('🧪 Testing Hero Section');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verificar visibilidad de elementos principales
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    log('✅ Hero title visible');
    
    // Verificar CTA buttons
    const primaryCTA = page.locator('a[href*="cal.com"]');
    const secondaryCTA = page.locator('a[href*="servicios"]');
    
    await expect(primaryCTA).toBeVisible();
    await expect(secondaryCTA).toBeVisible();
    log('✅ CTA buttons visible');
    
    // Verificar tamaño táctil mínimo (44px)
    const primaryBox = await primaryCTA.boundingBox();
    const secondaryBox = await secondaryCTA.boundingBox();
    
    expect(primaryBox!.height).toBeGreaterThanOrEqual(44);
    expect(secondaryBox!.height).toBeGreaterThanOrEqual(44);
    log('✅ Buttons meet touch target size requirements');
    
    // Verificar que no haya overlap
    const heroSection = page.locator('section[id="hero"]');
    const aboutSection = page.locator('section[id="about"]');
    
    const heroBox = await heroSection.boundingBox();
    const aboutBox = await aboutSection.boundingBox();
    
    expect(heroBox!.y + heroBox!.height).toBeLessThanOrEqual(aboutBox!.y + 10);
    log('✅ No overlap between hero and about sections');
  });

  test('Mobile - Services Section', async ({ page }) => {
    log('🧪 Testing Services Section');
    
    await page.goto('http://localhost:3000#servicios');
    await page.waitForLoadState('networkidle');
    
    // Verificar tarjetas de servicios
    const serviceCards = page.locator('[data-testid^="service-"]');
    await expect(serviceCards).toHaveCount(2);
    log('✅ Service cards visible');
    
    // Verificar contenido de liderazgo
    const liderazgoCard = page.locator('[data-testid="service-liderazgo"]');
    await expect(liderazgoCard).toBeVisible();
    
    const liderazgoTitle = liderazgoCard.locator('h3');
    const titleText = await liderazgoTitle.textContent();
    expect(titleText).toContain('Liderazgo');
    log('✅ Leadership service card has correct title');
    
    // Verificar beneficios (máximo 4 según Ley de Miller)
    const benefits = liderazgoCard.locator('.service-benefits li');
    const benefitCount = await benefits.count();
    expect(benefitCount).toBeLessThanOrEqual(4);
    log(`✅ Leadership service has ${benefitCount} benefits (≤4 per Miller\'s Law)`);
    
    // Verificar CTA de servicio
    const serviceCTA = liderazgoCard.locator('a');
    await expect(serviceCTA).toBeVisible();
    
    const serviceCTABox = await serviceCTA.boundingBox();
    expect(serviceCTABox!.height).toBeGreaterThanOrEqual(44);
    log('✅ Service CTA meets touch requirements');
  });

  test('Mobile - Instagram Carousel', async ({ page }) => {
    log('🧪 Testing Instagram Carousel');
    
    await page.goto('http://localhost:3000');
    await page.waitForSelector('[data-testid="instagram-carousel"]');
    
    // Verificar carousel visible
    const carousel = page.locator('[data-testid="instagram-carousel"]');
    await expect(carousel).toBeVisible();
    log('✅ Instagram carousel visible');
    
    // Verificar imágenes
    const images = carousel.locator('img[src*="insta-"]');
    const imageCount = await images.count();
    expect(imageCount).toBeGreaterThan(0);
    log(`✅ Found ${imageCount} Instagram images`);
    
    // Verificar insta-5 en colores
    let insta5Found = false;
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      if (src?.includes('insta-5')) {
        const filter = await img.evaluate(el => 
          window.getComputedStyle(el).filter
        );
        expect(filter).toBe('none');
        insta5Found = true;
        log('✅ insta-5.png is in color (filter: none)');
        break;
      }
    }
    
    if (!insta5Found) {
      log('⚠️ insta-5.png not found in carousel');
    }
    
    // Verificar navegación del carousel
    const navButtons = carousel.locator('button');
    const navCount = await navButtons.count();
    
    if (navCount > 0) {
      // Verificar tamaño táctil de botones
      for (let i = 0; i < navCount; i++) {
        const btn = navButtons.nth(i);
        const btnBox = await btn.boundingBox();
        expect(btnBox!.height).toBeGreaterThanOrEqual(44);
        expect(btnBox!.width).toBeGreaterThanOrEqual(44);
      }
      log('✅ Carousel navigation buttons meet touch requirements');
    }
  });

  test('Mobile - Contact Form', async ({ page }) => {
    log('🧪 Testing Contact Form');
    
    await page.goto('http://localhost:3000#contacto');
    await page.waitForLoadState('networkidle');
    
    // Verificar formulario
    const form = page.locator('form');
    const formExists = await form.count();
    
    if (formExists > 0) {
      log('✅ Contact form found');
      
      // Verificar campos
      const nameInput = form.locator('input[name*="name"], input[id*="name"]');
      const emailInput = form.locator('input[type="email"], input[name*="email"]');
      const messageInput = form.locator('textarea, input[name*="message"]');
      
      if (await nameInput.count() > 0) {
        await expect(nameInput).toBeVisible();
        log('✅ Name input visible');
      }
      
      if (await emailInput.count() > 0) {
        await expect(emailInput).toBeVisible();
        log('✅ Email input visible');
      }
      
      if (await messageInput.count() > 0) {
        await expect(messageInput).toBeVisible();
        log('✅ Message input visible');
      }
      
      // Verificar botón de envío
      const submitBtn = form.locator('button[type="submit"], input[type="submit"]');
      if (await submitBtn.count() > 0) {
        await expect(submitBtn).toBeVisible();
        
        const submitBox = await submitBtn.boundingBox();
        expect(submitBox!.height).toBeGreaterThanOrEqual(44);
        log('✅ Submit button meets touch requirements');
      }
    } else {
      log('ℹ️ No contact form found on page');
    }
  });

  test('Mobile - Typography & Readability', async ({ page }) => {
    log('🧪 Testing Typography & Readability');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verificar tamaño de fuente en móvil
    const bodyText = page.locator('body');
    const fontSize = await bodyText.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    const fontSizeNum = parseInt(fontSize);
    expect(fontSizeNum).toBeGreaterThanOrEqual(16);
    log(`✅ Base font size: ${fontSizeNum}px (≥16px for mobile)`);
    
    // Verificar contraste del texto principal
    const mainHeading = page.locator('h1');
    const headingColor = await mainHeading.evaluate(el => 
      window.getComputedStyle(el).color
    );
    
    const headingContrast = await mainHeading.evaluate(el => {
      if (!el.parentElement) return 0;
      const style = window.getComputedStyle(el);
      const bgColor = window.getComputedStyle(el.parentElement).backgroundColor;
      
      const getLuminance = (color: string) => {
        const rgb = color.match(/\d+/g)?.map(Number) || [0,0,0];
        return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      };
      
      const textLum = getLuminance(style.color);
      const bgLum = getLuminance(bgColor);
      return (Math.max(textLum, bgLum) + 0.05) / (Math.min(textLum, bgLum) + 0.05);
    });
    
    expect(headingContrast).toBeGreaterThan(4.5);
    log(`✅ Heading contrast: ${headingContrast.toFixed(2)} (≥4.5 WCAG AA)`);
  });

  test('Mobile - Navigation & Interactions', async ({ page }) => {
    log('🧪 Testing Navigation & Interactions');
    
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    // Verificar navegación si existe
    const nav = page.locator('nav');
    const navExists = await nav.count();
    
    if (navExists > 0) {
      log('✅ Navigation found');
      
      // Verificar enlaces de navegación
      const navLinks = nav.locator('a');
      const linkCount = await navLinks.count();
      
      if (linkCount > 0) {
        log(`✅ Found ${linkCount} navigation links`);
        
        // Verificar que los enlaces sean clickeables
        for (let i = 0; i < Math.min(linkCount, 5); i++) {
          const link = navLinks.nth(i);
          const linkBox = await link.boundingBox();
          
          if (linkBox) {
            expect(linkBox.height).toBeGreaterThanOrEqual(44);
          }
        }
        log('✅ Navigation links meet touch requirements');
      }
    }
    
    // Verificar scroll suave
    await page.evaluate(() => {
      return new Promise(resolve => {
        window.scrollTo(0, 500);
        setTimeout(resolve, 500);
      });
    });
    
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
    log('✅ Page scrolling works correctly');
  });

  test('Mobile - Performance', async ({ page }) => {
    log('🧪 Testing Mobile Performance');
    
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    log(`⏱️ Page load time: ${loadTime}ms`);
    
    // Verificar tiempo de carga
    expect(loadTime).toBeLessThan(5000);
    log('✅ Page loads within acceptable time');
    
    // Verificar tamaño de la página
    const performanceMetrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        transferSize: navigation.transferSize
      };
    });
    
    log(`📊 DOM Content Loaded: ${performanceMetrics.domContentLoaded}ms`);
    log(`📊 Load Complete: ${performanceMetrics.loadComplete}ms`);
    log(`📊 Transfer Size: ${(performanceMetrics.transferSize / 1024).toFixed(2)}KB`);
  });

  test.afterAll(async () => {
    log('\n=== Mobile Test Suite Completed ===\n');
  });
});
