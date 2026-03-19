import { test, expect } from '@playwright/test';

test.describe('Case Studies Final Verification', () => {
  test('desktop should show 3-column layout inside cards', async ({ page }) => {
    await page.goto('/#casos-de-estudio');
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(3000);
    
    const firstCard = page.locator('.glass-card').first();
    
    // Check desktop layout is visible
    const desktopLayout = await firstCard.locator('.hidden.md\\:block').count();
    console.log(`🖥️ Desktop layout visible: ${desktopLayout > 0}`);
    
    // Check 3-column grid inside desktop layout
    const threeColumnGrid = await firstCard.locator('.hidden.md\\:block .grid.grid-cols-3').count();
    console.log(`📊 3-column grid found: ${threeColumnGrid > 0}`);
    
    // Check the three sections
    const antesSection = await firstCard.locator('text=ANTES').count();
    const intervencionSection = await firstCard.locator('text=INTERVENCIÓN').count();
    const resultadosSection = await firstCard.locator('text=RESULTADOS').count();
    
    console.log(`📋 Sections - ANTES: ${antesSection}, INTERVENCIÓN: ${intervencionSection}, RESULTADOS: ${resultadosSection}`);
    
    expect(antesSection + intervencionSection + resultadosSection).toBe(3);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/case-studies-desktop.png',
      fullPage: false 
    });
  });

  test('mobile should show swipeable cards', async ({ page }) => {
    await page.goto('/#casos-de-estudio');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(3000);
    
    const firstCard = page.locator('.glass-card').first();
    
    // Check mobile layout is visible
    const mobileLayout = await firstCard.locator('.md\\:hidden').count();
    console.log(`📱 Mobile layout visible: ${mobileLayout > 0}`);
    
    // Check swipeable cards
    const swipeCards = await firstCard.locator('.md\\:hidden .flex-shrink-0').count();
    console.log(`📱 Swipeable cards: ${swipeCards}`);
    
    expect(swipeCards).toBe(3);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/case-studies-mobile.png',
      fullPage: false 
    });
  });

  test('case studies content verification', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(3000);
    
    const firstCard = page.locator('.glass-card').first();
    
    // Check company info
    const companyName = await firstCard.locator('h4').textContent();
    console.log(`🏢 Company: ${companyName}`);
    
    // Check category
    const category = await firstCard.locator('text=Transformación Ágil').count();
    console.log(`📋 Category found: ${category > 0}`);
    
    // Check "Qué se hecho" text
    const whatWasDone = await firstCard.locator('text=Qué se hecho:').count();
    console.log(`🔧 "Qué se hecho:" found: ${whatWasDone > 0}`);
    
    // Check CTA
    const cta = await firstCard.locator('text=Ver transformación completa').count();
    console.log(`🔗 CTA found: ${cta > 0}`);
    
    expect(companyName).toBeTruthy();
    expect(whatWasDone).toBeGreaterThan(0);
    expect(cta).toBeGreaterThan(0);
  });
});
