import { test, expect } from '@playwright/test';

test.describe('Case Studies Debug - 3 Column Layout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#casos-de-estudio');
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(3000);
  });

  test('case studies should show 3-column layout on desktop', async ({ page }) => {
    // Desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(2000);
    
    // Check if we have case study cards
    const caseCards = await page.locator('.glass-card').count();
    console.log(`📊 Found ${caseCards} case study cards`);
    
    expect(caseCards).toBeGreaterThan(0);
    
    // Check the layout structure
    const gridContainer = await page.locator('.grid').first();
    const gridClasses = await gridContainer.getAttribute('class');
    console.log(`🔍 Grid classes: ${gridClasses}`);
    
    // Check if desktop layout (3 columns) is being used
    const hasLgGridCols3 = gridClasses?.includes('lg:grid-cols-3');
    const hasMdGridCols2 = gridClasses?.includes('md:grid-cols-2');
    console.log(`📱 lg:grid-cols-3: ${hasLgGridCols3}, md:grid-cols-2: ${hasMdGridCols2}`);
    
    // Check individual card structure
    const firstCard = page.locator('.glass-card').first();
    
    // Check for 3-column layout inside card (desktop)
    const desktopLayout = await firstCard.locator('.hidden.md\\:grid').count();
    console.log(`🖥️ Desktop 3-column layout found: ${desktopLayout > 0}`);
    
    if (desktopLayout > 0) {
      const columns = await firstCard.locator('.hidden.md\\:grid > div').count();
      console.log(`📊 Desktop layout has ${columns} columns`);
      
      // Check content of each column
      for (let i = 0; i < columns; i++) {
        const column = firstCard.locator('.hidden.md\\:grid > div').nth(i);
        const header = await column.locator('h5').textContent();
        const points = await column.locator('li').count();
        console.log(`📋 Column ${i}: ${header} (${points} points)`);
      }
    }
    
    // Check for mobile layout (swipeable cards)
    const mobileLayout = await firstCard.locator('.md\\:hidden').count();
    console.log(`📱 Mobile swipeable layout found: ${mobileLayout > 0}`);
    
    if (mobileLayout > 0) {
      const swipeCards = await firstCard.locator('.md\\:hidden .flex-shrink-0').count();
      console.log(`📱 Mobile has ${swipeCards} swipeable cards`);
    }
  });

  test('case studies should show proper content structure', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.waitForTimeout(2000);
    
    const firstCard = page.locator('.glass-card').first();
    
    // Check company info
    const companyName = await firstCard.locator('h4').textContent();
    console.log(`🏢 Company: ${companyName}`);
    
    const category = await firstCard.locator('text=Transformación Ágil').count();
    console.log(`📋 Category found: ${category > 0}`);
    
    const whatWasDone = await firstCard.locator('text=Qué se hizo:').count();
    console.log(`🔧 "Qué se hecho:" found: ${whatWasDone > 0}`);
    
    // Check CTA
    const cta = await firstCard.locator('text=Ver transformación completa').count();
    console.log(`🔗 CTA found: ${cta > 0}`);
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/case-studies-debug.png',
      fullPage: false 
    });
  });

  test('tablet should show 2-column layout', async ({ page }) => {
    // Tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(2000);
    
    const caseCards = await page.locator('.glass-card').count();
    console.log(`📱 Tablet - Found ${caseCards} case study cards`);
    
    // Check grid layout on tablet
    const gridContainer = await page.locator('.grid').first();
    const gridClasses = await gridContainer.getAttribute('class');
    console.log(`📱 Tablet grid classes: ${gridClasses}`);
    
    // Should show 2 cards side by side on tablet
    const hasMdGridCols2 = gridClasses?.includes('md:grid-cols-2');
    console.log(`📱 Tablet md:grid-cols-2: ${hasMdGridCols2}`);
  });
});
