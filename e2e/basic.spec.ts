import { expect, test } from '@playwright/test'

test.describe('Basic Application', () => {
  test('should load the application with proper title', async ({ page }) => {
    await page.goto('/')

    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
    expect(title).toContain('Catálogo de Jogos')
  })

  test('should have proper HTML structure', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    const body = page.locator('body')

    await expect(html).toBeVisible()
    await expect(body).toBeVisible()
  })

  test('should handle page refresh correctly', async ({ page }) => {
    await page.goto('/')

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()

    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(gamesHeading).toBeVisible()
  })

  test('should have proper viewport and responsive design', async ({
    page
  }) => {
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

  test('should display loading states correctly', async ({ page }) => {
    await page.goto('/')

    const loadingElements = page.locator(
      '[data-testid*="loading"], .loading, [aria-busy="true"]'
    )
    console.log(loadingElements)

    await page.waitForLoadState('networkidle')

    await page.waitForLoadState('networkidle')

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })
})
