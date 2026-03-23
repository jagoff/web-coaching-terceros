import { test, expect } from '@playwright/test'

test.describe('Case Studies Final Verification', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#casos-de-estudio')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(3000)
  })

  test('mobile cards show limited points with "more" indicator', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()
    const mobileLayout = firstCard.locator('.md\\:hidden')

    // Check ANTES section
    const antesPoints = await mobileLayout.locator('text=ANTES').locator('..').locator('li').count()
    const moreIndicator = await mobileLayout.locator('text=más...').count()

    console.log(`📱 Mobile ANTES points: ${antesPoints}`)
    console.log(`📱 "Más..." indicator: ${moreIndicator > 0}`)

    // Should show limited points
    expect(antesPoints).toBeLessThanOrEqual(3) // 2 points + "más..."
    expect(moreIndicator).toBeGreaterThan(0)

    // Check card height is reasonable
    const boundingBox = await firstCard.boundingBox()
    console.log(`📱 Card height: ${boundingBox?.height}px`)

    if (boundingBox) {
      expect(boundingBox.height).toBeLessThan(500)
    }
  })

  test('modal opens and shows all content', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()
    const ctaButton = firstCard.locator('text=Ver transformación completa')

    // Open modal
    await ctaButton.click()
    await page.waitForTimeout(500)

    // Check modal is visible
    const modal = page.locator('.fixed.inset-0')
    expect(await modal.isVisible()).toBeTruthy()

    // Check modal content
    const modalContent = modal.locator('.glass-card')
    const company = await modalContent.locator('h3').textContent()
    console.log(`🏢 Company in modal: ${company}`)

    // Check all sections are present
    const sections = ['ANTES', 'INTERVENCIÓN', 'RESULTADOS']
    for (const section of sections) {
      const sectionExists = await modalContent.locator(`text=${section}`).count()
      console.log(`📋 Section ${section}: ${sectionExists > 0}`)
      expect(sectionExists).toBeGreaterThan(0)
    }

    // Check modal shows more points than mobile
    const antesPointsInModal = await modalContent
      .locator('text=ANTES')
      .locator('..')
      .locator('li')
      .count()
    console.log(`🔮 Modal ANTES points: ${antesPointsInModal}`)
    expect(antesPointsInModal).toBeGreaterThan(2)
  })

  test('modal closes properly', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()
    const ctaButton = firstCard.locator('text=Ver transformación completa')

    // Open modal
    await ctaButton.click()
    await page.waitForTimeout(500)

    // Close with X button
    const closeButton = page.locator('button').first()
    await closeButton.click()
    await page.waitForTimeout(500)

    // Check modal is closed
    const modal = page.locator('.fixed.inset-0')
    expect(await modal.isVisible()).toBeFalsy()

    // Open modal again
    await ctaButton.click()
    await page.waitForTimeout(500)

    // Close with overlay click
    const overlay = page.locator('.fixed.inset-0')
    await overlay.click({ position: { x: 100, y: 100 } })
    await page.waitForTimeout(500)

    // Check modal is closed
    expect(await overlay.isVisible()).toBeFalsy()
  })

  test('desktop shows 3-column layout', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()

    // Check desktop layout is visible
    const desktopLayout = firstCard.locator('.hidden.md\\:block')
    expect(await desktopLayout.isVisible()).toBeTruthy()

    // Check 3-column grid
    const grid = desktopLayout.locator('.grid.grid-cols-3')
    expect(await grid.isVisible()).toBeTruthy()

    // Check columns
    const columns = await grid.locator('> div').count()
    console.log(`🖥️ Desktop columns: ${columns}`)
    expect(columns).toBe(3)
  })

  test('tablet shows 2 cards side by side', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 })
    await page.waitForTimeout(2000)

    const gridContainer = page.locator('.grid').first()
    const gridClasses = await gridContainer.getAttribute('class')

    console.log(`📱 Tablet grid classes: ${gridClasses}`)

    // Should have md:grid-cols-2
    expect(gridClasses).toContain('md:grid-cols-2')

    // Check we have multiple cards
    const caseCards = await page.locator('.glass-card').count()
    console.log(`📱 Tablet cards: ${caseCards}`)
    expect(caseCards).toBeGreaterThan(1)
  })
})
