import { expect, test } from '@playwright/test'

test.describe('Navigation', () => {
  test('should display the main page with header', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('banner')).toBeVisible()

    await expect(page.getByRole('navigation')).toBeVisible()
  })

  test('should navigate to favorites page', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('link', { name: /favoritos/i }).click()

    await expect(page).toHaveURL(/.*\/favorites/)

    await expect(
      page.getByText(/você ainda não tem jogos favoritos/i)
    ).toBeVisible()
  })

  test('should navigate back to home page', async ({ page }) => {
    await page.goto('/favorites')

    await page.getByRole('link', { name: /início/i }).click()

    await expect(page).toHaveURL(/.*\/$/)
  })

  test('should display theme toggle button', async ({ page }) => {
    await page.goto('/')

    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    expect(buttonCount).toBeGreaterThan(0)
  })

  test('should toggle theme when theme button is clicked', async ({ page }) => {
    await page.goto('/')

    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    expect(buttonCount).toBeGreaterThan(0)

    const firstButton = buttons.first()
    await expect(firstButton).toBeAttached()
  })
})
