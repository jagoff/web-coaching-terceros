import { test, expect } from '@playwright/test';

test.describe('Frontend Automation Debug', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Verificar imagen insta-5 siempre en colores', async ({ page }) => {
    // Esperar a que cargue el carousel
    await page.waitForSelector('[data-testid="instagram-carousel"]');
    
    // Encontrar todas las imágenes de Instagram
    const images = await page.locator('img[src*="insta-"]').all();
    
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src?.includes('insta-5')) {
        // Verificar que tenga estilo filter: none
        const filter = await img.evaluate(el => 
          window.getComputedStyle(el).filter
        );
        
        expect(filter).toBe('none');
        console.log('✅ insta-5.png está en colores');
      }
    }
  });

  test('Verificar tipografía Roboto en servicios', async ({ page }) => {
    await page.goto('http://localhost:3000#servicios');
    
    // Verificar servicio de liderazgo
    const liderazgoCard = page.locator('[data-testid="service-liderazgo"]');
    await expect(liderazgoCard).toBeVisible();
    
    // Verificar que el texto descriptivo use Roboto
    const description = liderazgoCard.locator('.service-description');
    const fontFamily = await description.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    );
    
    expect(fontFamily).toContain('Roboto');
    console.log('✅ Servicio liderazgo usa Roboto');
  });

  test('Verificar responsive design mobile', async ({ page }) => {
    // Simular iPhone 14
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000');
    
    // Verificar que no haya overlap de elementos
    const hero = page.locator('section[id="hero"]');
    const services = page.locator('section[id="servicios"]');
    
    const heroBox = await hero.boundingBox();
    const servicesBox = await services.boundingBox();
    
    expect(heroBox!.y + heroBox!.height).toBeLessThan(servicesBox!.y);
    console.log('✅ No hay overlap en mobile');
  });

  test('Verificar colores y contraste', async ({ page }) => {
    const primaryText = page.locator('h1');
    const color = await primaryText.evaluate(el => 
      window.getComputedStyle(el).color
    );
    
    // Convertir RGB a hex para verificar
    const rgbToHex = (rgb: string) => {
      const values = rgb.match(/\d+/g);
      if (!values) return '';
      return '#' + values.slice(0, 3).map(x => 
        parseInt(x).toString(16).padStart(2, '0')
      ).join('');
    };
    
    const hexColor = rgbToHex(color);
    console.log(`✅ Color primario: ${hexColor}`);
    
    // Verificar contraste mínimo
    const contrast = await primaryText.evaluate(el => {
      if (!el.parentElement) return 0;
      const style = window.getComputedStyle(el);
      const bgColor = window.getComputedStyle(el.parentElement).backgroundColor;
      
      // Función simple de contraste
      const getLuminance = (color: string) => {
        const rgb = color.match(/\d+/g)?.map(Number) || [0,0,0];
        return (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
      };
      
      const textLum = getLuminance(style.color);
      const bgLum = getLuminance(bgColor);
      return (Math.max(textLum, bgLum) + 0.05) / (Math.min(textLum, bgLum) + 0.05);
    });
    
    expect(contrast).toBeGreaterThan(4.5); // WCAG AA standard
    console.log(`✅ Contraste: ${contrast.toFixed(2)} (mínimo 4.5)`);
  });

  test('Performance audit', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`⏱️ Tiempo de carga: ${loadTime}ms`);
    
    // Verificar que cargue en menos de 3 segundos
    expect(loadTime).toBeLessThan(3000);
    
    // Verificar que no haya errores en consola
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    
    await page.reload();
    expect(errors.length).toBe(0);
    console.log('✅ Sin errores de JavaScript');
  });
});
