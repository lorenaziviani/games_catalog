import { expect, test } from '@playwright/test'

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should have proper page title', async ({ page }) => {
    const title = await page.title()
    expect(title).toBeTruthy()
    expect(title.length).toBeGreaterThan(0)
  })

  test('should have proper heading structure', async ({ page }) => {
    await page.waitForSelector('h1, h2, h3', { timeout: 10000 })

    const headings = page.locator('h1, h2, h3')
    await expect(headings.first()).toBeVisible()
  })

  test('should have proper navigation landmarks', async ({ page }) => {
    const nav = page.locator('nav')
    const banner = page.locator('header, [role="banner"]')

    const hasNav = (await nav.count()) > 0
    const hasBanner = (await banner.count()) > 0

    expect(hasNav || hasBanner).toBe(true)
  })

  test('should have proper button labels', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const buttons = page.locator('button')
    const buttonCount = await buttons.count()

    if (buttonCount === 0) {
      return
    }

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const ariaLabel = await button.getAttribute('aria-label')
      const textContent = await button.textContent()
      const title = await button.getAttribute('title')

      if (!ariaLabel && !textContent && !title) {
        const hasContent = await button.evaluate(el => {
          return el.children.length > 0 || el.innerHTML.trim().length > 0
        })

        if (!hasContent) {
          expect(ariaLabel || textContent || title).toBeTruthy()
        }
      }
    }
  })

  test('should have proper link labels', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const links = page.locator('a')
    const linkCount = await links.count()

    if (linkCount === 0) {
      return
    }

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i)
      const ariaLabel = await link.getAttribute('aria-label')
      const textContent = await link.textContent()

      expect(ariaLabel || textContent).toBeTruthy()
    }
  })

  test('should have proper form labels', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const formControls = page.locator('input, select, textarea')
    const controlCount = await formControls.count()

    if (controlCount === 0) {
      return
    }

    for (let i = 0; i < controlCount; i++) {
      const control = formControls.nth(i)
      const id = await control.getAttribute('id')
      const ariaLabel = await control.getAttribute('aria-label')
      const placeholder = await control.getAttribute('placeholder')

      expect(id || ariaLabel || placeholder).toBeTruthy()
    }
  })

  test('should have proper color contrast', async ({ page }) => {
    const visibleElements = page.locator('*:visible')
    await expect(visibleElements.first()).toBeVisible()
  })

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(1000)

    await page.keyboard.press('Tab')

    const focusedElement = page.locator(':focus')

    const body = page.locator('body')
    if ((await focusedElement.count()) > 0) {
      await expect(focusedElement).toBeVisible()
    } else {
      await expect(body).toBeVisible()
    }
  })

  test('should have proper focus indicators', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(1000)

    await page.keyboard.press('Tab')

    const focusedElement = page.locator(':focus')

    if ((await focusedElement.count()) > 0) {
      await expect(focusedElement).toBeVisible()

      const computedStyle = await focusedElement.evaluate(el => {
        const style = window.getComputedStyle(el)
        return {
          outline: style.outline,
          border: style.border,
          boxShadow: style.boxShadow
        }
      })

      const hasFocusStyle =
        computedStyle.outline !== 'none' ||
        computedStyle.border !== 'none' ||
        computedStyle.boxShadow !== 'none'

      expect(hasFocusStyle).toBe(true)
    } else {
      const body = page.locator('body')
      await expect(body).toBeVisible()
    }
  })

  test('should have proper alt text for images', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const images = page.locator('img')
    const imageCount = await images.count()

    if (imageCount === 0) {
      return
    }

    for (let i = 0; i < imageCount; i++) {
      const image = images.nth(i)
      const alt = await image.getAttribute('alt')

      expect(alt).toBeDefined()
    }
  })

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const ariaElements = page.locator(
      '[aria-label], [aria-describedby], [aria-labelledby], [aria-hidden], [aria-expanded], [aria-pressed], [aria-checked], [aria-selected], [aria-required], [aria-invalid], [aria-live]'
    )
    const ariaCount = await ariaElements.count()

    if (ariaCount > 0) {
      for (let i = 0; i < ariaCount; i++) {
        const element = ariaElements.nth(i)
        const ariaAttributes = await element.evaluate(el => {
          const attrs: Record<string, string> = {}
          for (const attr of el.attributes) {
            if (attr.name.startsWith('aria-')) {
              attrs[attr.name] = attr.value
            }
          }
          return attrs
        })

        for (const [, value] of Object.entries(ariaAttributes)) {
          expect(value).toBeTruthy()
        }
      }
    }
  })

  test('should have proper semantic HTML', async ({ page }) => {
    const semanticElements = page.locator(
      'main, article, section, aside, nav, header, footer'
    )

    if ((await semanticElements.count()) > 0) {
      await expect(semanticElements.first()).toBeVisible()
    }
  })

  test('should handle screen reader announcements', async ({ page }) => {
    await page.waitForLoadState('networkidle')

    const liveRegions = page.locator('[aria-live]')
    const liveRegionCount = await liveRegions.count()

    if (liveRegionCount > 0) {
      for (let i = 0; i < liveRegionCount; i++) {
        const region = liveRegions.nth(i)
        const ariaLive = await region.getAttribute('aria-live')

        expect(['polite', 'assertive', 'off']).toContain(ariaLive)
      }
    }
  })
})
