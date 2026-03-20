import { test, expect } from '@playwright/test';

test.describe('Depuración de posición de checks - Formulario Contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contacto');
    await page.waitForLoadState('networkidle');
  });

  test('verificar posición exacta del check del nombre', async ({ page }) => {
    const nombreInput = page.locator('input[name="nombre"]');
    
    // Llenar con nombre válido
    await nombreInput.fill('Juan Pérez');
    await nombreInput.blur();
    await page.waitForTimeout(500);
    
    // Obtener el check
    const check = page.locator('input[name="nombre"] + div');
    await expect(check).toBeVisible();
    
    // Obtener posiciones
    const inputBox = await nombreInput.boundingBox();
    const checkBox = await check.boundingBox();
    
    console.log('Input position:', inputBox);
    console.log('Check position:', checkBox);
    
    // Verificar que el check está en la esquina inferior izquierda
    expect(checkBox).toBeTruthy();
    expect(inputBox).toBeTruthy();
    
    if (!checkBox || !inputBox) {
      throw new Error('No se pudieron obtener las posiciones de los elementos');
    }
    
    // El check debería estar cerca del borde izquierdo y inferior del input
    const tolerance = 10; // píxeles de tolerancia
    
    // Verificar que está cerca del borde izquierdo
    expect(Math.abs(checkBox.x - inputBox.x)).toBeLessThan(tolerance + 5); // 5px de padding
    
    // Verificar que está cerca del borde inferior
    const expectedBottom = inputBox.y + inputBox.height;
    const actualBottom = checkBox.y + checkBox.height;
    expect(Math.abs(actualBottom - expectedBottom)).toBeLessThan(tolerance + 5);
    
    await page.screenshot({ path: 'test-results/check-nombre-posicion-detallada.png' });
  });

  test('verificar posición exacta del check del email', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    
    await emailInput.fill('test@ejemplo.com');
    await emailInput.blur();
    await page.waitForTimeout(500);
    
    const check = page.locator('input[name="email"] + div');
    await expect(check).toBeVisible();
    
    const inputBox = await emailInput.boundingBox();
    const checkBox = await check.boundingBox();
    
    console.log('Email Input position:', inputBox);
    console.log('Email Check position:', checkBox);
    
    expect(checkBox).toBeTruthy();
    expect(inputBox).toBeTruthy();
    
    if (!checkBox || !inputBox) {
      throw new Error('No se pudieron obtener las posiciones de los elementos');
    }
    
    const tolerance = 10;
    
    // Verificar esquina inferior izquierda
    expect(Math.abs(checkBox.x - inputBox.x)).toBeLessThan(tolerance + 5);
    
    const expectedBottom = inputBox.y + inputBox.height;
    const actualBottom = checkBox.y + checkBox.height;
    expect(Math.abs(actualBottom - expectedBottom)).toBeLessThan(tolerance + 5);
    
    await page.screenshot({ path: 'test-results/check-email-posicion-detallada.png' });
  });

  test('verificar posición exacta del check del mensaje', async ({ page }) => {
    const mensajeInput = page.locator('textarea[name="mensaje"]');
    
    await mensajeInput.fill('Este es un mensaje de prueba con más de 10 caracteres para validar correctamente.');
    await mensajeInput.blur();
    await page.waitForTimeout(500);
    
    const check = page.locator('textarea[name="mensaje"] + div');
    await expect(check).toBeVisible();
    
    const inputBox = await mensajeInput.boundingBox();
    const checkBox = await check.boundingBox();
    
    console.log('Mensaje Input position:', inputBox);
    console.log('Mensaje Check position:', checkBox);
    
    expect(checkBox).toBeTruthy();
    expect(inputBox).toBeTruthy();
    
    if (!checkBox || !inputBox) {
      throw new Error('No se pudieron obtener las posiciones de los elementos');
    }
    
    const tolerance = 10;
    
    // Verificar esquina inferior izquierda
    expect(Math.abs(checkBox.x - inputBox.x)).toBeLessThan(tolerance + 5);
    
    const expectedBottom = inputBox.y + inputBox.height;
    const actualBottom = checkBox.y + checkBox.height;
    expect(Math.abs(actualBottom - expectedBottom)).toBeLessThan(tolerance + 5);
    
    await page.screenshot({ path: 'test-results/check-mensaje-posicion-detallada.png' });
  });

  test('verificar estilo de los checks', async ({ page }) => {
    // Llenar todos los campos
    await page.locator('input[name="nombre"]').fill('Juan Pérez');
    await page.locator('input[name="nombre"]').blur();
    
    await page.locator('input[name="email"]').fill('test@ejemplo.com');
    await page.locator('input[name="email"]').blur();
    
    await page.locator('textarea[name="mensaje"]').fill('Mensaje de prueba válido con más de 10 caracteres.');
    await page.locator('textarea[name="mensaje"]').blur();
    
    await page.waitForTimeout(1000);
    
    // Verificar estilos de todos los checks
    const checks = page.locator('input + div');
    const count = await checks.count();
    
    console.log(`Número de checks encontrados: ${count}`);
    
    for (let i = 0; i < count; i++) {
      const check = checks.nth(i);
      const isVisible = await check.isVisible();
      const text = await check.textContent();
      const styles = await check.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          background: computed.background,
          color: computed.color,
          fontSize: computed.fontSize,
          padding: computed.padding,
          borderRadius: computed.borderRadius,
          position: computed.position,
          left: computed.left,
          bottom: computed.bottom,
          zIndex: computed.zIndex
        };
      });
      
      console.log(`Check ${i}:`, {
        isVisible,
        text,
        styles
      });
      
      expect(isVisible).toBe(true);
      expect(text).toBe('✓');
      expect(styles.background).toContain('green');
      expect(styles.color).toContain('white');
    }
    
    await page.screenshot({ path: 'test-results/checks-estilos-detallados.png', fullPage: true });
  });
});
