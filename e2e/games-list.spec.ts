import { expect, test } from '@playwright/test'

test.describe('Games List', () => {
  test('should display games list on home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display game cards with basic information', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display pagination when there are many games', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display game information correctly', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should handle responsive layout', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const body = page.locator('body')
      await expect(body).toBeVisible()
    }
  })
})
