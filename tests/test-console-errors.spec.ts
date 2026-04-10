import { test, expect } from '@playwright/test';

test('Revisar errores de consola en el frontend', async ({ page }) => {
  // Capturar errores de consola
  const errors: string[] = [];
  page.on('pageerror', error => {
    errors.push(error.message);
  });
  
  // Capturar errores de JavaScript
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Navegar a la página principal
  await page.goto('http://localhost:3000');
  
  // Esperar a que la página cargue completamente
  await page.waitForLoadState('networkidle');
  
  // Verificar que no haya errores de consola
  expect(errors.length).toBe(0);
  
  // Verificar elementos principales
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('.btn-hero-primary')).toBeVisible();
  
  // Probar navegación a otras páginas
  await page.click('a[href="#servicios"]');
  await page.waitForTimeout(1000);
  
  // Probar página de servicios
  await page.goto('http://localhost:3000/servicios');
  await page.waitForLoadState('networkidle');
  
  // Verificar página de servicios
  await expect(page.locator('h1')).toBeVisible();
  
  console.log('No se encontraron errores de consola');
});
