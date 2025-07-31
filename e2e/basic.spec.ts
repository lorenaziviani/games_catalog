import { expect, test } from '@playwright/test'

test.describe('Basic Application', () => {
  test('should load the application', async ({ page }) => {
    await page.goto('/')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    await expect(body).toBeVisible()
  })

  test('should have a title', async ({ page }) => {
    await page.goto('/')

    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
  })

  test('should have basic HTML structure', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    const body = page.locator('body')

    await expect(html).toBeVisible()
    await expect(body).toBeVisible()
  })

  test('should handle page refresh', async ({ page }) => {
    await page.goto('/')

    await page.reload()

    const body = page.locator('body')
    await expect(body).toBeVisible()
  })

  test('should have proper viewport', async ({ page }) => {
    await page.goto('/')

    const viewport = page.viewportSize()
    expect(viewport).toBeTruthy()
    expect(viewport?.width).toBeGreaterThan(0)
    expect(viewport?.height).toBeGreaterThan(0)
  })
})
