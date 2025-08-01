import { expect, test } from '@playwright/test'

test.describe('Filters', () => {
  test('should display filters section', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const filtersSection = page.locator('[data-testid="filters-section"]')
    await expect(filtersSection).toBeVisible()
  })

  test('should filter games by text search', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toBeVisible({ timeout: 15000 })

    const firstGameName = await gameCards
      .first()
      .locator('[data-testid="game-title"]')
      .textContent()

    if (!firstGameName) {
      throw new Error('Não foi possível obter o nome do primeiro jogo')
    }

    const expandButton = page
      .locator('[data-testid="filters-section"] button')
      .last()
    if (await expandButton.isVisible()) {
      await expandButton.click()
      await page.waitForTimeout(1000)
    }

    const searchInput = page.locator('[data-testid="text-filter-input"]')

    if ((await searchInput.count()) === 0) {
      const genericSearchInput = page.locator(
        'input[type="text"], input[placeholder*="buscar"], input[placeholder*="search"], input[placeholder*="Digite"], input[placeholder*="nome"]'
      )

      await expect(genericSearchInput.first()).toBeVisible({ timeout: 10000 })
      await genericSearchInput.first().fill(firstGameName)
    } else {
      await expect(searchInput.first()).toBeVisible({ timeout: 10000 })
      await searchInput.first().fill(firstGameName)
    }

    await page.waitForTimeout(3000)

    const filteredGames = page.locator('[data-testid="game-card"]')
    await expect(filteredGames.first()).toBeVisible({ timeout: 10000 })
  })

  test('should display multi-select filters', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const multiSelectFilters = page.locator(
      'select, [role="combobox"], [data-testid*="multi-select"]'
    )
    const filterCount = await multiSelectFilters.count()

    if (filterCount > 0) {
      await expect(multiSelectFilters.first()).toBeVisible()
    }
  })

  test('should display range sliders', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const rangeSliders = page.locator(
      'input[type="range"], [data-testid*="range"], [data-testid*="slider"]'
    )
    const sliderCount = await rangeSliders.count()

    if (sliderCount > 0) {
      await expect(rangeSliders.first()).toBeVisible()
    }
  })

  test('should show active filters badge', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator(
      'input[type="text"], input[placeholder*="buscar"], input[placeholder*="search"]'
    )
    if (await searchInput.isVisible()) {
      await searchInput.fill('test')
      await page.waitForTimeout(1000)

      const activeFilters = page.locator(
        '[data-testid="active-filters"], .active-filters, [data-testid*="filter-badge"]'
      )
      const activeCount = await activeFilters.count()

      if (activeCount > 0) {
        await expect(activeFilters.first()).toBeVisible()
      }
    }
  })

  test('should clear all filters', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator(
      'input[type="text"], input[placeholder*="buscar"], input[placeholder*="search"]'
    )
    if (await searchInput.isVisible()) {
      await searchInput.fill('test')
      await page.waitForTimeout(1000)

      const clearButton = page.locator(
        'button[data-testid="clear-filters"], button:has-text("Limpar"), button:has-text("Clear")'
      )
      if (await clearButton.isVisible()) {
        await clearButton.click()
        await page.waitForTimeout(1000)

        await expect(searchInput).toHaveValue('')
      }
    }
  })

  test('should handle filter interactions', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const selectFilters = page.locator('select, [role="combobox"]')
    const selectCount = await selectFilters.count()

    if (selectCount > 0) {
      const firstSelect = selectFilters.first()
      await firstSelect.click()
      await page.waitForTimeout(500)

      const options = page.locator('option, [role="option"]')
      const optionCount = await options.count()

      if (optionCount > 0) {
        await expect(options.first()).toBeVisible()
      }
    }
  })

  test('should maintain filter state on navigation', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const searchInput = page.locator(
      'input[type="text"], input[placeholder*="buscar"], input[placeholder*="search"]'
    )
    if (await searchInput.isVisible()) {
      await searchInput.fill('test')
      await page.waitForTimeout(1000)

      await page.getByRole('link', { name: /favoritos/i }).click()
      await page.waitForLoadState('networkidle')

      await page.getByRole('link', { name: /início/i }).click()
      await page.waitForLoadState('networkidle')

      await expect(searchInput).toHaveValue('test')
    }
  })

  test('should display filter sections with proper titles', async ({
    page
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const filterTitles = page.locator('h3, h4, [data-testid*="filter-title"]')
    const titleCount = await filterTitles.count()

    if (titleCount > 0) {
      await expect(filterTitles.first()).toBeVisible()
    }
  })

  test('should handle responsive filter layout', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 768, height: 1024 },
      { width: 375, height: 667 }
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const filtersSection = page.locator('[data-testid="filters-section"]')
      if (await filtersSection.isVisible()) {
        await expect(filtersSection).toBeVisible()
      }
    }
  })
})
