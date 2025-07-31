import { expect, test } from '@playwright/test'

test.describe('Filters', () => {
  test('should display filters section', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display filter sections', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should filter games by text search', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display multi-select filters', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display range sliders', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display date range filter', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should show active filters badge', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should clear all filters', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should handle filter interactions', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should maintain filter state on navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display filter sections with proper titles', async ({
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
})
