import { expect, test } from '@playwright/test'

test.describe('Favorites', () => {
  test('should display favorites page with empty state', async ({ page }) => {
    await page.goto('/favorites')

    await expect(
      page.getByRole('heading', { name: /sua biblioteca de jogos/i })
    ).toBeVisible()

    await expect(
      page.getByText(/você ainda não tem jogos favoritos/i)
    ).toBeVisible()
  })

  test('should add and remove game from favorites', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 10000 })

    const firstFavoriteButton = page
      .locator('[data-testid="favorite-button"]')
      .first()
    await firstFavoriteButton.click()

    await expect(firstFavoriteButton).toHaveAttribute(
      'aria-label',
      /remover dos favoritos/i
    )

    await page.getByRole('link', { name: /favoritos/i }).click()
    await expect(page).toHaveURL(/.*\/favorites/)

    const favoriteGames = page.locator('[data-testid="game-card"]')
    await expect(favoriteGames.first()).toBeVisible()

    await page.getByRole('link', { name: /início/i }).click()
    await page.waitForLoadState('networkidle')

    const favoriteButton = page
      .locator('[data-testid="favorite-button"]')
      .first()
    await favoriteButton.click()

    await expect(favoriteButton).toHaveAttribute(
      'aria-label',
      /adicionar aos favoritos/i
    )
  })

  test('should display favorite games in favorites page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const favoriteButtons = page.locator('[data-testid="favorite-button"]')
    const buttonCount = await favoriteButtons.count()

    for (let i = 0; i < Math.min(3, buttonCount); i++) {
      const button = favoriteButtons.nth(i)
      await button.click()
      await page.waitForTimeout(500)
    }

    await page.getByRole('link', { name: /favoritos/i }).click()
    await expect(page).toHaveURL(/.*\/favorites/)

    const favoriteGames = page.locator('[data-testid="game-card"]')
    const favoriteCount = await favoriteGames.count()
    expect(favoriteCount).toBeGreaterThan(0)
  })

  test('should persist favorites across sessions', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const firstFavoriteButton = page
      .locator('[data-testid="favorite-button"]')
      .first()
    await firstFavoriteButton.click()

    await expect(firstFavoriteButton).toHaveAttribute(
      'aria-label',
      /remover dos favoritos/i
    )

    await page.reload()
    await page.waitForLoadState('networkidle')

    const favoriteButton = page
      .locator('[data-testid="favorite-button"]')
      .first()
    await expect(favoriteButton).toHaveAttribute(
      'aria-label',
      /remover dos favoritos/i
    )
  })

  test('should display favorites count in header', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const favoritesLink = page.getByRole('link', { name: /favoritos/i })
    await expect(favoritesLink).toBeVisible()

    const firstFavoriteButton = page
      .locator('[data-testid="favorite-button"]')
      .first()
    await firstFavoriteButton.click()

    await expect(favoritesLink).toBeVisible()
  })

  test('should handle multiple favorite operations', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const favoriteButtons = page.locator('[data-testid="favorite-button"]')
    const buttonCount = await favoriteButtons.count()

    for (let i = 0; i < Math.min(5, buttonCount); i++) {
      const button = favoriteButtons.nth(i)

      await button.click()
      await page.waitForTimeout(200)

      await expect(button).toHaveAttribute(
        'aria-label',
        /remover dos favoritos/i
      )

      await button.click()
      await page.waitForTimeout(200)

      await expect(button).toHaveAttribute(
        'aria-label',
        /adicionar aos favoritos/i
      )
    }
  })

  test('should clear all favorites', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 15000 })

    const favoriteButtons = page.locator('[data-testid="favorite-button"]')
    const buttonCount = await favoriteButtons.count()

    for (let i = 0; i < Math.min(3, buttonCount); i++) {
      const button = favoriteButtons.nth(i)
      await button.click()
      await page.waitForTimeout(1000)
    }

    await page.getByRole('link', { name: /favoritos/i }).click()
    await page.waitForLoadState('networkidle')

    const favoriteGames = page.locator('[data-testid="game-card"]')
    await expect(favoriteGames.first()).toBeVisible({ timeout: 10000 })
    const initialCount = await favoriteGames.count()
    expect(initialCount).toBeGreaterThan(0)

    const removeButtons = page.locator('[data-testid="favorite-button"]')
    const removeCount = await removeButtons.count()

    for (let i = 0; i < removeCount; i++) {
      const button = removeButtons.first()
      await button.click()
      await page.waitForTimeout(2000)
    }

    await page.waitForTimeout(3000)

    await expect(
      page.getByText(/você ainda não tem jogos favoritos/i)
    ).toBeVisible({ timeout: 10000 })
  })
})
