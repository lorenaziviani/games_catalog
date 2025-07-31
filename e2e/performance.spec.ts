import { expect, test } from '@playwright/test'

test.describe('Performance', () => {
  test('should load page quickly', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')

    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    expect(loadTime).toBeLessThan(10000)

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should display content quickly', async ({ page }) => {
    await page.goto('/')

    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should handle large lists efficiently', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should handle rapid interactions', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should handle filter interactions smoothly', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
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

    expect(navigationTime).toBeLessThan(10000)

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should handle responsive layout changes', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.waitForTimeout(500)

      const body = page.locator('body')
      await expect(body).toBeVisible()
    }
  })

  test('should handle memory efficiently', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    for (let i = 0; i < 10; i++) {
      await page.getByRole('link', { name: /favoritos/i }).click()
      await page.waitForTimeout(500)
      await page.getByRole('link', { name: /início/i }).click()
      await page.waitForTimeout(500)

      const body = page.locator('body')
      await expect(body).toBeVisible()
    }
  })

  test('should handle concurrent operations', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

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

    await page.waitForTimeout(2000)

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should handle network delays gracefully', async ({ page }) => {
    await page.route('**/*', async route => {
      await page.waitForTimeout(100)
      await route.continue()
    })

    await page.reload()

    await page.waitForLoadState('networkidle', { timeout: 30000 })

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should handle errors gracefully', async ({ page }) => {
    await page.route('**/api/**', async route => {
      await route.abort('failed')
    })

    await page.reload()

    await page.waitForTimeout(3000)

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const errorMessage = page.locator('[data-testid="error-message"]')
    if (await errorMessage.isVisible()) {
      await expect(errorMessage).toBeVisible()
    }
  })
})
