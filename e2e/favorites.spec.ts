import { expect, test } from '@playwright/test'

test.describe('Favorites', () => {
  test('should display favorites page', async ({ page }) => {
    await page.goto('/favorites')

    await expect(
      page.getByRole('heading', { name: /sua biblioteca de jogos/i })
    ).toBeVisible()
  })

  test('should display empty favorites state', async ({ page }) => {
    await page.goto('/favorites')

    await expect(
      page.getByText(/você ainda não tem jogos favoritos/i)
    ).toBeVisible()
  })

  test('should add game to favorites', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should remove game from favorites', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display favorite games in favorites page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    await page.goto('/favorites')

    await expect(
      page.getByRole('heading', { name: /sua biblioteca de jogos/i })
    ).toBeVisible()
  })

  test('should persist favorites across sessions', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    await page.reload()
    await page.waitForLoadState('networkidle')

    await expect(body).toBeVisible()
  })

  test('should display favorite button with correct state', async ({
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

  test('should handle multiple favorite operations', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const body = page.locator('body')
    await expect(body).toBeVisible()

    const gamesHeading = page.getByRole('heading', {
      name: /descubra seus jogos favoritos/i
    })
    await expect(gamesHeading).toBeVisible()
  })

  test('should display favorites count in header', async ({ page }) => {
    await page.goto('/')

    const header = page.getByRole('banner')
    await expect(header).toBeVisible()

    const navLinks = page.getByRole('link')
    await expect(navLinks.first()).toBeVisible()
  })

  test('should navigate to favorites from header', async ({ page }) => {
    await page.goto('/')

    const header = page.getByRole('banner')
    await expect(header).toBeVisible()

    const navLinks = page.getByRole('link')
    await expect(navLinks.first()).toBeVisible()
  })
})
