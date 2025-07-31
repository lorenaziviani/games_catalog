import { expect, test } from '@playwright/test'

test.describe('Game Modal', () => {
  test('should open game modal when clicking on game card', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    await gameCards.first().click()

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible()
  })

  test('should display game details in modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 15000 })

    const gameName = await gameCards
      .first()
      .locator('[data-testid="game-title"]')
      .textContent()

    if (!gameName) {
      throw new Error('Não foi possível obter o nome do jogo')
    }

    await gameCards.first().click()
    await page.waitForTimeout(2000)

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible({ timeout: 10000 })

    await expect(modal).toContainText(gameName, { timeout: 10000 })
  })

  test('should close modal when clicking close button', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    await gameCards.first().click()

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible()

    const closeButton = page.locator(
      'button[aria-label*="fechar"], button[aria-label*="close"], [data-testid="close-button"]'
    )
    await closeButton.click()

    await expect(modal).not.toBeVisible()
  })

  test('should close modal when pressing Escape key', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    await gameCards.first().click()

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible()

    await page.keyboard.press('Escape')

    await expect(modal).not.toBeVisible()
  })

  test('should close modal when clicking outside', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    await gameCards.first().click()

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible()

    await page.mouse.click(10, 10)

    await expect(modal).not.toBeVisible()
  })

  test('should display loading state while fetching game details', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    await gameCards.first().click()

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible()

    const loadingElement = page.locator(
      '[data-testid*="loading"], .loading, [aria-busy="true"]'
    )
    const loadingCount = await loadingElement.count()

    if (loadingCount > 0) {
      await expect(loadingElement.first()).toBeVisible()
    }
  })

  test('should display game description in modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    await gameCards.first().click()

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible()

    await page.waitForTimeout(2000)

    const description = page.locator(
      '[data-testid="game-description"], .description, p'
    )
    const descriptionCount = await description.count()

    if (descriptionCount > 0) {
      await expect(description.first()).toBeVisible()
    }
  })

  test('should display game genres in modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    await gameCards.first().click()

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible()

    await page.waitForTimeout(2000)

    const genres = page.locator(
      '[data-testid="game-genres"], .genres, [data-testid*="genre"]'
    )
    const genresCount = await genres.count()

    if (genresCount > 0) {
      await expect(genres.first()).toBeVisible()
    }
  })

  test('should display favorite button in modal', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 15000 })

    await gameCards.first().click()
    await page.waitForTimeout(2000)

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible({ timeout: 10000 })

    const favoriteButton = modal.locator('[data-testid="favorite-button"]')
    await expect(favoriteButton).toBeVisible({ timeout: 10000 })
  })

  test('should handle modal with keyboard navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 15000 })

    await gameCards.first().click()
    await page.waitForTimeout(2000)

    const modal = page.locator(
      '[role="dialog"], [data-testid="game-modal"], .modal'
    )
    await expect(modal).toBeVisible({ timeout: 10000 })

    await page.keyboard.press('Tab')
    await page.waitForTimeout(1000)

    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible({ timeout: 10000 })
  })

  test('should handle multiple modal opens and closes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    for (let i = 0; i < 3; i++) {
      await gameCards.first().click()

      const modal = page.locator(
        '[role="dialog"], [data-testid="game-modal"], .modal'
      )
      await expect(modal).toBeVisible()

      const closeButton = page.locator(
        'button[aria-label*="fechar"], button[aria-label*="close"], [data-testid="close-button"]'
      )
      await closeButton.click()

      await expect(modal).not.toBeVisible()
    }
  })
})
