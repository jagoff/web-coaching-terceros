import { test, expect } from '@playwright/test'

test.describe('Case Studies Modal Debug', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#casos-de-estudio')
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(3000)
  })

  test('mobile cards should not show all points', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()
    const mobileLayout = firstCard.locator('.md\\:hidden')

    // Count points in mobile ANTES section
    const antesPoints = await mobileLayout.locator('text=ANTES').locator('..').locator('li').count()
    console.log(`📱 Mobile ANTES points: ${antesPoints}`)

    // Should not show all points, should be limited
    expect(antesPoints).toBeLessThan(10) // Reasonable limit for mobile

    // Check if cards are too tall
    const cardHeight = await firstCard.evaluate(el => el.offsetHeight)
    console.log(`📱 Card height: ${cardHeight}px`)

    // Mobile cards should be reasonable height
    expect(cardHeight).toBeLessThan(600)
  })

  test('modal should open and close correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()
    const ctaButton = firstCard.locator('text=Ver transformación completa')

    // Click to open modal
    await ctaButton.click()
    await page.waitForTimeout(500)

    // Check modal is open
    const modal = page.locator('.fixed.inset-0').first()
    const modalVisible = await modal.isVisible()
    console.log(`🔮 Modal visible: ${modalVisible}`)

    expect(modalVisible).toBeTruthy()

    // Check modal content
    const modalContent = modal.locator('.glass-card').first()
    const companyInModal = await modalContent.locator('h3').textContent()
    console.log(`🏢 Company in modal: ${companyInModal}`)

    // Check 3 sections in modal
    const antesSection = await modalContent.locator('text=ANTES').count()
    const intervencionSection = await modalContent.locator('text=INTERVENCIÓN').count()
    const resultadosSection = await modalContent.locator('text=RESULTADOS').count()

    console.log(
      `📋 Modal sections - ANTES: ${antesSection}, INTERVENCIÓN: ${intervencionSection}, RESULTADOS: ${resultadosSection}`
    )

    expect(antesSection + intervencionSection + resultadosSection).toBe(3)

    // Check close button
    const closeButton = modal.locator('button').first()
    const closeButtonVisible = await closeButton.isVisible()
    console.log(`❌ Close button visible: ${closeButtonVisible}`)

    // Click to close modal
    await closeButton.click()
    await page.waitForTimeout(500)

    // Check modal is closed
    const modalClosed = await modal.isVisible()
    console.log(`🔮 Modal closed: ${!modalClosed}`)

    expect(modalClosed).toBeFalsy()
  })

  test('modal should show all points (not limited)', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()
    const ctaButton = firstCard.locator('text=Ver transformación completa')

    await ctaButton.click()
    await page.waitForTimeout(500)

    const modal = page.locator('.fixed.inset-0').first()
    const modalContent = modal.locator('.glass-card').first()

    // Count all points in modal ANTES section
    const antesPointsInModal = await modalContent
      .locator('text=ANTES')
      .locator('..')
      .locator('li')
      .count()
    console.log(`🔮 Modal ANTES points: ${antesPointsInModal}`)

    // Modal should show more points than mobile cards
    expect(antesPointsInModal).toBeGreaterThan(3)

    // Check modal height
    const modalHeight = await modalContent.evaluate(el => el.offsetHeight)
    console.log(`🔮 Modal height: ${modalHeight}px`)

    // Modal should be tall enough for all content
    expect(modalHeight).toBeGreaterThan(400)
  })

  test('modal overlay click should close', async ({ page }) => {
    await page.setViewportSize({ width: 1200, height: 800 })
    await page.waitForTimeout(2000)

    const firstCard = page.locator('.glass-card').first()
    const ctaButton = firstCard.locator('text=Ver transformación completa')

    await ctaButton.click()
    await page.waitForTimeout(500)

    // Click on overlay (outside modal content)
    const overlay = page.locator('.fixed.inset-0').first()
    await overlay.click({ position: { x: 100, y: 100 } })
    await page.waitForTimeout(500)

    // Check modal is closed
    const modalVisible = await overlay.isVisible()
    console.log(`🔮 Modal closed by overlay: ${!modalVisible}`)

    expect(modalVisible).toBeFalsy()
  })
})
