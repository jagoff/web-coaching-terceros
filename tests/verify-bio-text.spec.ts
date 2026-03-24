import { test, expect } from '@playwright/test';

test.describe('Verificación Texto Biográfico Actualizado', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Verificar texto biográfico en sección About', async ({ page }) => {
    // Navegar a la sección About
    await page.locator('a[href="#sobre-mi"]').first().click();
    await page.waitForTimeout(1000);
    
    // Encontrar el elemento que contiene el texto biográfico
    const bioText = page.locator('#sobre-mi .lead-text').first();
    await expect(bioText).toBeVisible();
    
    // Obtener el texto completo
    const actualText = await bioText.textContent();
    
    console.log('📝 Texto encontrado en el sitio:');
    console.log(actualText?.substring(0, 200) + '...');
    
    // Texto esperado completo
    const expectedText = 'Soy Fernando. Más de 20 años en tecnología — desde infraestructura y operaciones hasta liderazgo estratégico y transformación cultural. Pasé por todos los roles: técnico, sysadmin, CIO, Scrum Master, Product Owner, Director de Operaciones. Lideré equipos en empresas de +1000 personas y acompañé startups a escalar sin perder su identidad. Hoy gestiono infraestructura cloud en Avature, co-fundé Nodok.AI, y llevo 11 años como consultor ágil independiente. No te doy frameworks de moda — te acompaño a construir equipos que funcionen sin vos encima, procesos que escalen, y una cultura donde la gente quiera quedarse.';
    
    // Verificar que el texto completo esté presente
    expect(actualText).toBe(expectedText);
    
    // Verificar frases clave específicas
    const keyPhrases = [
      'Soy Fernando',
      'Más de 20 años en tecnología',
      'desde infraestructura y operaciones',
      'hasta liderazgo estratégico y transformación cultural',
      'técnico, sysadmin, CIO, Scrum Master, Product Owner, Director de Operaciones',
      'empresas de +1000 personas',
      'Avature, co-fundé Nodok.AI',
      '11 años como consultor ágil independiente',
      'equipos que funcionen sin vos encima',
      'procesos que escalen',
      'cultura donde la gente quiera quedarse'
    ];
    
    for (const phrase of keyPhrases) {
      expect(actualText).toContain(phrase);
      console.log(`✅ Frase verificada: "${phrase}"`);
    }
    
    console.log('✅ Texto biográfico verificado correctamente');
  });

  test('Verificar que no haya formato HTML en el texto', async ({ page }) => {
    await page.locator('a[href="#sobre-mi"]').first().click();
    await page.waitForTimeout(1000);
    
    const bioText = page.locator('#sobre-mi .lead-text').first();
    const htmlContent = await bioText.innerHTML();
    const textContent = await bioText.textContent();
    
    // Verificar que no haya tags HTML en el contenido
    expect(htmlContent).not.toContain('<strong>');
    expect(htmlContent).not.toContain('</strong>');
    expect(htmlContent).not.toContain('<b>');
    expect(htmlContent).not.toContain('</b>');
    expect(htmlContent).not.toContain('**');
    
    // Verificar que el HTML sea limpio
    expect(htmlContent.trim()).toBe(textContent?.trim());
    
    console.log('✅ Verificado: No hay formato HTML en el texto');
  });

  test('Verificar visibilidad y estilos del texto', async ({ page }) => {
    await page.locator('a[href="#sobre-mi"]').first().click();
    await page.waitForTimeout(1000);
    
    const bioText = page.locator('#sobre-mi .lead-text').first();
    
    // Verificar que sea visible
    await expect(bioText).toBeVisible();
    
    // Verificar estilos CSS importantes
    const fontFamily = await bioText.evaluate(el => 
      window.getComputedStyle(el).fontFamily
    );
    const fontSize = await bioText.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    const lineHeight = await bioText.evaluate(el => 
      window.getComputedStyle(el).lineHeight
    );
    const color = await bioText.evaluate(el => 
      window.getComputedStyle(el).color
    );
    
    console.log('🎨 Estilos del texto biográfico:');
    console.log(`   Font Family: ${fontFamily}`);
    console.log(`   Font Size: ${fontSize}`);
    console.log(`   Line Height: ${lineHeight}`);
    console.log(`   Color: ${color}`);
    
    // Verificar que tenga estilos razonables
    expect(parseFloat(fontSize)).toBeGreaterThan(14);
    expect(parseFloat(lineHeight)).toBeGreaterThan(1.2);
    expect(fontFamily).toBeTruthy();
    expect(color).toBeTruthy();
    
    console.log('✅ Estilos verificados correctamente');
  });

  test('Verificar responsive del texto biográfico', async ({ page }) => {
    // Test en mobile
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:3000');
    await page.locator('a[href="#sobre-mi"]').first().click();
    await page.waitForTimeout(1000);
    
    const bioTextMobile = page.locator('#sobre-mi .lead-text').first();
    await expect(bioTextMobile).toBeVisible();
    
    const mobileFontSize = await bioTextMobile.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    console.log(`📱 Tamaño de fuente en mobile: ${mobileFontSize}`);
    
    // Test en desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.locator('a[href="#sobre-mi"]').first().click();
    await page.waitForTimeout(1000);
    
    const bioTextDesktop = page.locator('#sobre-mi .lead-text').first();
    await expect(bioTextDesktop).toBeVisible();
    
    const desktopFontSize = await bioTextDesktop.evaluate(el => 
      window.getComputedStyle(el).fontSize
    );
    
    console.log(`🖥️ Tamaño de fuente en desktop: ${desktopFontSize}`);
    
    // Verificar que el texto sea el mismo en ambos viewports
    const mobileText = await bioTextMobile.textContent();
    const desktopText = await bioTextDesktop.textContent();
    
    expect(mobileText).toBe(desktopText);
    console.log('✅ Texto consistente entre mobile y desktop');
  });

  test('Verificar posicionamiento en la página', async ({ page }) => {
    await page.locator('a[href="#sobre-mi"]').first().click();
    await page.waitForTimeout(1000);
    
    const aboutSection = page.locator('#sobre-mi');
    const bioText = page.locator('#sobre-mi .lead-text').first();
    
    // Verificar que la sección About sea visible
    await expect(aboutSection).toBeVisible();
    
    // Verificar que el texto esté dentro de la sección
    const aboutBoundingBox = await aboutSection.boundingBox();
    const textBoundingBox = await bioText.boundingBox();
    
    expect(aboutBoundingBox).toBeTruthy();
    expect(textBoundingBox).toBeTruthy();
    
    if (aboutBoundingBox && textBoundingBox) {
      // El texto debe estar dentro de los límites de la sección
      expect(textBoundingBox.y).toBeGreaterThanOrEqual(aboutBoundingBox.y);
      expect(textBoundingBox.y + textBoundingBox.height).toBeLessThanOrEqual(
        aboutBoundingBox.y + aboutBoundingBox.height + 100 // Allow some margin
      );
      
      console.log(`📍 Posición texto: Y=${textBoundingBox.y}, Altura=${textBoundingBox.height}`);
      console.log(`📍 Posición sección: Y=${aboutBoundingBox.y}, Altura=${aboutBoundingBox.height}`);
    }
    
    console.log('✅ Posicionamiento verificado');
  });
});
