import { test, expect } from '@playwright/test';

test.describe('Análisis Completo del Frontend', () => {
  let baseUrl: string;

  test.beforeAll(async ({ browser }) => {
    baseUrl = 'http://localhost:3000';
    
    // Verificar que el servidor esté corriendo
    const context = await browser.newContext();
    const page = await context.newPage();
    
    try {
      await page.goto(baseUrl, { timeout: 10000 });
      console.log('✅ Servidor corriendo en', baseUrl);
    } catch (error) {
      console.log('❌ Servidor no encontrado, iniciándolo...');
      throw new Error('El servidor debe estar corriendo en localhost:3000');
    } finally {
      await context.close();
    }
  });

  test.describe('🎯 Core Functionality', () => {
    test('Carga inicial y estructura básica', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      console.log(`⏱️ Tiempo de carga: ${loadTime}ms`);
      
      // Verificar estructura básica
      await expect(page.locator('html')).toBeVisible();
      await expect(page.locator('body')).toBeVisible();
      
      // Verificar meta tags importantes
      const title = await page.title();
      expect(title).toContain('ELEVA');
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description).toBeTruthy();
      
      // Verificar idioma
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe('es');
      
      console.log('✅ Estructura básica correcta');
    });

    test('Navegación principal', async ({ page }) => {
      await page.goto(baseUrl);
      
      // Verificar enlaces de navegación
      const navLinks = page.locator('nav a[href]');
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);
      
      // Verificar enlaces importantes
      const importantLinks = ['#sobre-mi', '#servicios', '#metodo', '#testimonios', '#precios', '#contacto'];
      
      for (const link of importantLinks) {
        const element = page.locator(`a[href="${link}"]`);
        const count = await element.count();
        if (count > 0) {
          await element.first().click();
          await page.waitForTimeout(500);
          
          // Verificar que scroll a la sección
          const targetSection = page.locator(link);
          if (await targetSection.count() > 0) {
            const boundingBox = await targetSection.first().boundingBox();
            expect(boundingBox?.y).toBeLessThan(1000);
          }
          
          console.log(`✅ Navegación a ${link} funciona`);
        }
      }
    });

    test('Secciones principales presentes', async ({ page }) => {
      await page.goto(baseUrl);
      
      const sections = [
        { id: 'hero', name: 'Hero' },
        { id: 'sobre-mi', name: 'Sobre Mí' },
        { id: 'servicios', name: 'Servicios' },
        { id: 'metodo', name: 'Método' },
        { id: 'testimonios', name: 'Testimonios' },
        { id: 'precios', name: 'Precios' },
        { id: 'contacto', name: 'Contacto' }
      ];
      
      for (const section of sections) {
        const element = page.locator(`#${section.id}`);
        const count = await element.count();
        
        if (count > 0) {
          await expect(element.first()).toBeVisible();
          console.log(`✅ Sección ${section.name} encontrada`);
        } else {
          console.log(`⚠️ Sección ${section.name} no encontrada`);
        }
      }
    });
  });

  test.describe('🎨 UI/UX Analysis', () => {
    test('Tipografía y consistencia visual', async ({ page }) => {
      await page.goto(baseUrl);
      
      // Verificar fuentes cargadas
      const fontFaces = await page.evaluate(() => {
        const fonts = document.fonts;
        const loadedFonts: string[] = [];
        for (const font of fonts) {
          loadedFonts.push(font.family);
        }
        return loadedFonts;
      });
      
      console.log('📝 Fuentes cargadas:', fontFaces);
      
      // Verificar consistencia de headings
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      
      for (let i = 0; i < Math.min(headingCount, 10); i++) {
        const heading = headings.nth(i);
        const tagName = await heading.evaluate(el => el.tagName);
        const fontFamily = await heading.evaluate(el => 
          window.getComputedStyle(el).fontFamily
        );
        const fontSize = await heading.evaluate(el => 
          window.getComputedStyle(el).fontSize
        );
        
        console.log(`📐 ${tagName}: ${fontFamily} - ${fontSize}`);
      }
    });

    test('Colores y contraste', async ({ page }) => {
      await page.goto(baseUrl);
      
      // Analizar paleta de colores
      const colorAnalysis = await page.evaluate(() => {
        const elements = document.querySelectorAll('*');
        const colors = new Set<string>();
        const textColors = new Set<string>();
        const bgColors = new Set<string>();
        
        elements.forEach(el => {
          const style = window.getComputedStyle(el);
          const color = style.color;
          const bg = style.backgroundColor;
          
          if (color && color !== 'rgba(0, 0, 0, 0)' && color !== 'transparent') {
            colors.add(color);
            textColors.add(color);
          }
          if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
            colors.add(bg);
            bgColors.add(bg);
          }
        });
        
        return {
          totalColors: colors.size,
          textColors: Array.from(textColors),
          bgColors: Array.from(bgColors)
        };
      });
      
      console.log(`🎨 Total colores: ${colorAnalysis.totalColors}`);
      console.log('📝 Colores texto:', colorAnalysis.textColors.slice(0, 5));
      console.log('🖼️ Colores fondo:', colorAnalysis.bgColors.slice(0, 5));
      
      // Verificar contraste en elementos importantes
      const importantElements = page.locator('h1, h2, .btn-primary, .btn-secondary');
      const elementCount = await importantElements.count();
      
      for (let i = 0; i < Math.min(elementCount, 5); i++) {
        const element = importantElements.nth(i);
        
        const contrast = await element.evaluate(el => {
          if (!el.parentElement) return 0;
          const style = window.getComputedStyle(el);
          const parentStyle = window.getComputedStyle(el.parentElement);
          
          const getLuminance = (color: string) => {
            const rgb = color.match(/\d+/g)?.map(Number) || [0,0,0];
            return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
          };
          
          const textLum = getLuminance(style.color);
          const bgLum = getLuminance(parentStyle.backgroundColor);
          return textLum > bgLum ? 
            (textLum + 0.05) / (bgLum + 0.05) : 
            (bgLum + 0.05) / (textLum + 0.05);
        });
        
        console.log(`👁️ Contraste elemento ${i+1}: ${contrast.toFixed(2)}`);
        
        if (contrast < 4.5) {
          console.log(`⚠️ Contraste bajo detectado: ${contrast.toFixed(2)}`);
        }
      }
    });

    test('Espaciado y layout', async ({ page }) => {
      await page.goto(baseUrl);
      
      // Verificar viewport y responsive
      const viewport = page.viewportSize();
      console.log(`📱 Viewport actual: ${viewport?.width}x${viewport?.height}`);
      
      // Analizar espaciado entre elementos
      const sections = page.locator('section');
      const sectionCount = await sections.count();
      
      for (let i = 0; i < Math.min(sectionCount, 5); i++) {
        const section = sections.nth(i);
        const boundingBox = await section.boundingBox();
        
        if (boundingBox) {
          const marginTop = await section.evaluate(el => 
            window.getComputedStyle(el).marginTop
          );
          const marginBottom = await section.evaluate(el => 
            window.getComputedStyle(el).marginBottom
          );
          
          console.log(`📏 Sección ${i+1}: ${boundingBox.height}px, margins: ${marginTop} / ${marginBottom}`);
        }
      }
    });
  });

  test.describe('📱 Responsive Design', () => {
    const viewports = [
      { name: 'Mobile', width: 390, height: 844 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ];

    viewports.forEach(({ name, width, height }) => {
      test(`Responsive - ${name} (${width}x${height})`, async ({ page }) => {
        await page.setViewportSize({ width, height });
        await page.goto(baseUrl);
        await page.waitForLoadState('networkidle');
        
        console.log(`📱 Analizando ${name} (${width}x${height})`);
        
        // Verificar overflow horizontal
        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.body.scrollWidth > document.body.clientWidth;
        });
        
        expect(hasHorizontalOverflow).toBe(false);
        console.log(`✅ Sin overflow horizontal en ${name}`);
        
        // Verificar elementos importantes visibles
        const hero = page.locator('#hero');
        await expect(hero).toBeVisible();
        
        // Verificar navegación móvil si aplica
        if (width < 768) {
          const mobileNav = page.locator('.mobile-nav, nav button, .hamburger');
          const mobileNavCount = await mobileNav.count();
          
          if (mobileNavCount > 0) {
            console.log(`📱 Navegación móvil detectada en ${name}`);
          }
        }
        
        // Verificar tamaños de fuente adaptados
        const mainHeading = page.locator('h1').first();
        if (await mainHeading.count() > 0) {
          const fontSize = await mainHeading.evaluate(el => 
            window.getComputedStyle(el).fontSize
          );
          console.log(`📝 H1 size en ${name}: ${fontSize}`);
        }
      });
    });
  });

  test.describe('⚡ Performance', () => {
    test('Performance metrics', async ({ page }) => {
      const startTime = Date.now();
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      console.log(`⏱️ Tiempo total carga: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(5000);
      
      // Métricas de rendimiento
      const metrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        return {
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
          firstContentfulPaint: performance.getEntriesByType('paint')[1]?.startTime || 0
        };
      });
      
      console.log('📊 Métricas de rendimiento:');
      console.log(`   DOM Content Loaded: ${metrics.domContentLoaded}ms`);
      console.log(`   Load Complete: ${metrics.loadComplete}ms`);
      console.log(`   First Paint: ${metrics.firstPaint}ms`);
      console.log(`   First Contentful Paint: ${metrics.firstContentfulPaint}ms`);
      
      // Verificar tamaño del DOM
      const domSize = await page.evaluate(() => {
        return {
          nodes: document.querySelectorAll('*').length,
          depth: getMaxDepth(document.body)
        };
        
        function getMaxDepth(element: Element, depth = 0): number {
          let maxDepth = depth;
          for (const child of element.children) {
            maxDepth = Math.max(maxDepth, getMaxDepth(child, depth + 1));
          }
          return maxDepth;
        }
      });
      
      console.log(`🌳 DOM: ${domSize.nodes} nodos, profundidad: ${domSize.depth}`);
      
      if (domSize.nodes > 1500) {
        console.log(`⚠️ DOM muy grande: ${domSize.nodes} nodos`);
      }
    });

    test('JavaScript errors', async ({ page }) => {
      const errors: string[] = [];
      const warnings: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        } else if (msg.type() === 'warning') {
          warnings.push(msg.text());
        }
      });
      
      page.on('pageerror', error => {
        errors.push(error.message);
      });
      
      await page.goto(baseUrl);
      await page.waitForLoadState('networkidle');
      
      console.log(`🐛 Errores JavaScript: ${errors.length}`);
      console.log(`⚠️ Warnings: ${warnings.length}`);
      
      if (errors.length > 0) {
        console.log('Errores detectados:');
        errors.forEach((error, i) => console.log(`  ${i + 1}. ${error}`));
      }
      
      if (warnings.length > 0) {
        console.log('Warnings detectados:');
        warnings.slice(0, 5).forEach((warning, i) => console.log(`  ${i + 1}. ${warning}`));
      }
      
      expect(errors.length).toBe(0);
    });
  });

  test.describe('♿ Accessibility', () => {
    test('Basic accessibility checks', async ({ page }) => {
      await page.goto(baseUrl);
      
      // Verificar estructura semántica
      const semanticElements = page.locator('header, main, nav, section, article, aside, footer');
      const semanticCount = await semanticElements.count();
      console.log(`🏗️ Elementos semánticos: ${semanticCount}`);
      
      // Verificar atributos alt en imágenes
      const images = page.locator('img');
      const imageCount = await images.count();
      let imagesWithAlt = 0;
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        if (alt) imagesWithAlt++;
      }
      
      const altPercentage = (imagesWithAlt / imageCount) * 100;
      console.log(`🖼️ Imágenes con alt: ${imagesWithAlt}/${imageCount} (${altPercentage.toFixed(1)}%)`);
      
      // Verificar headings structure
      const headings = page.locator('h1, h2, h3, h4, h5, h6');
      const headingCount = await headings.count();
      let hasH1 = false;
      
      for (let i = 0; i < headingCount; i++) {
        const heading = headings.nth(i);
        const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
        if (tagName === 'h1') hasH1 = true;
      }
      
      console.log(`📝 Headings: ${headingCount}, tiene H1: ${hasH1}`);
      expect(hasH1).toBe(true);
      
      // Verificar focus indicators
      const focusableElements = page.locator('button, a, input, select, textarea');
      const focusableCount = await focusableElements.count();
      
      console.log(`🎯 Elementos focusable: ${focusableCount}`);
      
      // Verificar que los botones tengan texto o aria-label
      const buttons = page.locator('button');
      const buttonCount = await buttons.count();
      let buttonsWithText = 0;
      
      for (let i = 0; i < Math.min(buttonCount, 10); i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        
        if (text?.trim() || ariaLabel) {
          buttonsWithText++;
        }
      }
      
      console.log(`🔘 Botones con texto/aria-label: ${buttonsWithText}/${Math.min(buttonCount, 10)}`);
    });
  });

  test.describe('🔍 SEO y Meta Tags', () => {
    test('SEO optimization', async ({ page }) => {
      await page.goto(baseUrl);
      
      // Verificar meta tags básicos
      const title = await page.title();
      console.log(`📄 Título: ${title}`);
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThan(70);
      
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      console.log(`📝 Descripción: ${description?.substring(0, 100)}...`);
      expect(description?.length).toBeGreaterThan(50);
      expect(description?.length).toBeLessThan(160);
      
      // Verificar Open Graph tags
      const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
      const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');
      const ogImage = await page.locator('meta[property="og:image"]').getAttribute('content');
      
      console.log(`🌐 OG Title: ${ogTitle || 'No encontrado'}`);
      console.log(`🌐 OG Description: ${ogDescription ? ogDescription.substring(0, 50) + '...' : 'No encontrado'}`);
      console.log(`🌐 OG Image: ${ogImage || 'No encontrado'}`);
      
      // Verificar estructura de URLs canónicas
      const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
      console.log(`🔗 Canonical: ${canonical || 'No encontrado'}`);
      
      // Verificar lang attribute
      const htmlLang = await page.locator('html').getAttribute('lang');
      console.log(`🌍 Idioma: ${htmlLang}`);
      expect(htmlLang).toBeTruthy();
    });
  });

  test.describe('📝 Content Analysis', () => {
    test('Análisis de contenido', async ({ page }) => {
      await page.goto(baseUrl);
      
      // Analizar longitud y estructura del contenido
      const contentAnalysis = await page.evaluate(() => {
        const textContent = document.body.textContent || '';
        const words = textContent.trim().split(/\s+/).filter(word => word.length > 0);
        
        return {
          totalWords: words.length,
          totalChars: textContent.length,
          readingTime: Math.ceil(words.length / 200) // 200 palabras por minuto
        };
      });
      
      console.log(`📖 Palabras totales: ${contentAnalysis.totalWords}`);
      console.log(`📖 Caracteres: ${contentAnalysis.totalChars}`);
      console.log(`⏱️ Tiempo lectura estimado: ${contentAnalysis.readingTime} min`);
      
      // Verificar contenido de secciones importantes
      const sections = ['hero', 'servicios', 'contacto'];
      
      for (const sectionId of sections) {
        const section = page.locator(`#${sectionId}`);
        if (await section.count() > 0) {
          const textContent = await section.first().textContent();
          const wordCount = textContent?.trim().split(/\s+/).filter(word => word.length > 0).length || 0;
          
          console.log(`📝 Sección ${sectionId}: ${wordCount} palabras`);
          
          if (wordCount < 10) {
            console.log(`⚠️ Sección ${sectionId} con poco contenido`);
          }
        }
      }
    });
  });
});
