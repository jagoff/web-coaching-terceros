import { test, expect } from '@playwright/test';

test.describe('Formulario de Contacto', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contacto');
    await page.waitForLoadState('networkidle');
  });

  test('debería mostrar el formulario de contacto', async ({ page }) => {
    // Esperar a que la sección de contacto sea visible
    await expect(page.locator('#contacto')).toBeVisible();
    
    // Verificar que los campos del formulario existen
    await expect(page.locator('input[name="nombre"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('textarea[name="mensaje"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('debería mostrar check de validación en nombre completo cuando es válido', async ({ page }) => {
    const nombreInput = page.locator('input[name="nombre"]');
    
    // Llenar el campo con un nombre válido
    await nombreInput.fill('Juan Pérez');
    await nombreInput.blur(); // Disparar el evento blur
    
    // Esperar a que aparezca el check
    await page.waitForTimeout(500);
    
    // Verificar que el check existe y está visible
    const check = page.locator('input[name="nombre"] + div');
    await expect(check).toBeVisible();
    
    // Verificar el contenido del check
    await expect(check).toContainText('✓');
    
    // Verificar la posición (debería estar en la esquina inferior izquierda)
    const boundingBox = await check.boundingBox();
    expect(boundingBox).toBeTruthy();
    
    // Tomar screenshot para depuración
    await page.screenshot({ path: 'test-results/contacto-nombre-valido.png' });
  });

  test('debería mostrar check de validación en email cuando es válido', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');
    
    // Llenar el campo con un email válido
    await emailInput.fill('juan@ejemplo.com');
    await emailInput.blur();
    
    // Esperar a que aparezca el check
    await page.waitForTimeout(500);
    
    // Verificar que el check existe y está visible
    const check = page.locator('input[name="email"] + div');
    await expect(check).toBeVisible();
    
    // Verificar el contenido del check
    await expect(check).toContainText('✓');
    
    // Tomar screenshot para depuración
    await page.screenshot({ path: 'test-results/contacto-email-valido.png' });
  });

  test('debería mostrar check de validación en mensaje cuando es válido', async ({ page }) => {
    const mensajeInput = page.locator('textarea[name="mensaje"]');
    
    // Llenar el campo con un mensaje válido
    await mensajeInput.fill('Este es un mensaje de prueba con más de 10 caracteres para cumplir con la validación mínima requerida.');
    await mensajeInput.blur();
    
    // Esperar a que aparezca el check
    await page.waitForTimeout(500);
    
    // Verificar que el check existe y está visible
    const check = page.locator('textarea[name="mensaje"] + div');
    await expect(check).toBeVisible();
    
    // Verificar el contenido del check
    await expect(check).toContainText('✓');
    
    // Tomar screenshot para depuración
    await page.screenshot({ path: 'test-results/contacto-mensaje-valido.png' });
  });

  test('debería mostrar checks en la posición correcta (esquina inferior izquierda)', async ({ page }) => {
    // Llenar todos los campos válidos
    await page.locator('input[name="nombre"]').fill('Juan Pérez');
    await page.locator('input[name="nombre"]').blur();
    
    await page.locator('input[name="email"]').fill('juan@ejemplo.com');
    await page.locator('input[name="email"]').blur();
    
    await page.locator('textarea[name="mensaje"]').fill('Este es un mensaje de prueba con más de 10 caracteres.');
    await page.locator('textarea[name="mensaje"]').blur();
    
    // Esperar a que aparezcan todos los checks
    await page.waitForTimeout(1000);
    
    // Tomar screenshot general para ver la posición de todos los checks
    await page.screenshot({ path: 'test-results/contacto-todos-los-checks.png', fullPage: true });
    
    // Verificar que todos los checks son visibles
    const nombreCheck = page.locator('input[name="nombre"] + div');
    const emailCheck = page.locator('input[name="email"] + div');
    const mensajeCheck = page.locator('textarea[name="mensaje"] + div');
    
    await expect(nombreCheck).toBeVisible();
    await expect(emailCheck).toBeVisible();
    await expect(mensajeCheck).toBeVisible();
    
    // Verificar que todos tienen el texto ✓
    await expect(nombreCheck).toContainText('✓');
    await expect(emailCheck).toContainText('✓');
    await expect(mensajeCheck).toContainText('✓');
  });

  test('debería mostrar errores de validación cuando los campos son inválidos', async ({ page }) => {
    // Llenar con datos inválidos
    await page.locator('input[name="nombre"]').fill('A'); // Muy corto
    await page.locator('input[name="nombre"]').blur();
    
    await page.locator('input[name="email"]').fill('email-invalido'); // Email inválido
    await page.locator('input[name="email"]').blur();
    
    await page.locator('textarea[name="mensaje"]').fill('Corto'); // Muy corto
    await page.locator('textarea[name="mensaje"]').blur();
    
    // Esperar a que aparezcan los errores
    await page.waitForTimeout(500);
    
    // Verificar que los mensajes de error aparecen
    await expect(page.locator('text=El nombre debe tener al menos 2 caracteres')).toBeVisible();
    await expect(page.locator('text=Introduce un email válido')).toBeVisible();
    await expect(page.locator('text=Cuéntanos más (mínimo 10 caracteres)')).toBeVisible();
    
    // Tomar screenshot para depuración
    await page.screenshot({ path: 'test-results/contacto-errores-validacion.png', fullPage: true });
  });

  test('debería habilitar el botón de envío cuando todos los campos son válidos', async ({ page }) => {
    // Llenar todos los campos válidos
    await page.locator('input[name="nombre"]').fill('Juan Pérez');
    await page.locator('input[name="nombre"]').blur();
    
    await page.locator('input[name="email"]').fill('juan@ejemplo.com');
    await page.locator('input[name="email"]').blur();
    
    await page.locator('textarea[name="mensaje"]').fill('Este es un mensaje de prueba con más de 10 caracteres.');
    await page.locator('textarea[name="mensaje"]').blur();
    
    // Esperar a que se complete la validación
    await page.waitForTimeout(1000);
    
    // Verificar que el botón de envío está habilitado
    const submitButton = page.locator('button[type="submit"]');
    await expect(submitButton).toBeEnabled();
    
    // Tomar screenshot final
    await page.screenshot({ path: 'test-results/contacto-formulario-completo.png', fullPage: true });
  });
});
