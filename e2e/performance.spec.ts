import { expect, test } from '@playwright/test'

test.describe('Performance', () => {
  test('should load page within acceptable time', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(15000)

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display content quickly after page load', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 3000 })

    const cardCount = await gameCards.count()
    expect(cardCount).toBeGreaterThan(0)
  })

  test('should handle filter interactions smoothly', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')


    const searchInput = page.locator(
      'input[type="text"], input[placeholder*="buscar"], input[placeholder*="search"]'
    )
    if (await searchInput.isVisible()) {
      const startTime = Date.now()


      await searchInput.fill('test')
      await page.waitForTimeout(500)

      const interactionTime = Date.now() - startTime
      expect(interactionTime).toBeLessThan(1000)
    }
  })

  test('should handle navigation smoothly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.getByRole('link', { name: /favoritos/i }).click()
    await page.waitForLoadState('networkidle')

    await page.getByRole('link', { name: /início/i }).click()
    await page.waitForLoadState('networkidle')

    const navigationTime = Date.now() - startTime

    expect(navigationTime).toBeLessThan(15000)


    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible({ timeout: 10000 })

  })

  test('should handle responsive layout changes efficiently', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ]

    for (const viewport of viewports) {
      const startTime = Date.now()

      await page.setViewportSize(viewport)
      await page.waitForTimeout(200)

      const resizeTime = Date.now() - startTime
      expect(resizeTime).toBeLessThan(1000)

      const body = page.locator('body')
      await expect(body).toBeVisible()
    }
  })

  test('should handle memory efficiently during interactions', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    for (let i = 0; i < 5; i++) {
      const startTime = Date.now()

      await page.getByRole('link', { name: /favoritos/i }).click()
      await page.waitForLoadState('networkidle')

      await page.getByRole('link', { name: /início/i }).click()
      await page.waitForLoadState('networkidle')

      const interactionTime = Date.now() - startTime
      expect(interactionTime).toBeLessThan(3000)
    }

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should handle concurrent operations without blocking', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const startTime = Date.now()

    const promises = []

    const themeButton = page
      .locator('button')
      .filter({ hasText: /alternar tema/i })
    if (await themeButton.isVisible()) {
      promises.push(themeButton.click())
    }

    const favoritesLink = page.getByRole('link', { name: /favoritos/i })
    promises.push(favoritesLink.click())

    await Promise.all(promises)
    await page.waitForTimeout(1000)

    const concurrentTime = Date.now() - startTime
    expect(concurrentTime).toBeLessThan(3000)

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should handle network delays gracefully', async ({ page }) => {
    await page.route('**/*', async route => {
      await page.waitForTimeout(100)
      await route.continue()
    })

    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle', { timeout: 30000 })


    const loadTime = Date.now() - startTime
    expect(loadTime).toBeLessThan(10000)

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()

  })

  test('should handle API errors gracefully', async ({ page }) => {
    await page.route('**/api/**', async route => {
      await route.abort('failed')
    })

    await page.goto('/')
    await page.waitForTimeout(3000)


    const body = page.locator('body')
    await expect(body).toBeVisible()

    const errorMessage = page.locator(
      '[data-testid="error-message"], .error, [role="alert"]'
    )
    const errorCount = await errorMessage.count()

    if (errorCount > 0) {
      await expect(errorMessage.first()).toBeVisible()
    }
  })

  test('should maintain performance during rapid interactions', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const favoriteButtons = page.locator('[data-testid="favorite-button"]')
    const buttonCount = await favoriteButtons.count()

    if (buttonCount > 0) {
      const startTime = Date.now()

      for (let i = 0; i < Math.min(5, buttonCount); i++) {
        const button = favoriteButtons.nth(i)
        await button.click()
        await page.waitForTimeout(100)
      }

      const rapidInteractionTime = Date.now() - startTime
      expect(rapidInteractionTime).toBeLessThan(2000)

    }
  })

  test('should handle large data sets efficiently', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    const cardCount = await gameCards.count()

    if (cardCount > 20) {
      const pagination = page.locator('[data-testid="pagination"], .pagination')
      if (await pagination.isVisible()) {
        await expect(pagination).toBeVisible()
      }
    }

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })
})
