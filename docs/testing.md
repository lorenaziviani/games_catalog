# Guia de Testes - Heroes Catalog

## Visão Geral

O Heroes Catalog implementa uma estratégia de testes abrangente que cobre todos os níveis da aplicação, desde testes unitários até testes end-to-end. A estratégia é baseada na pirâmide de testes e segue as melhores práticas de testing.

## Estratégia de Testes

### Pirâmide de Testes

```
    E2E Tests (Playwright)
         /\
        /  \
   Integration Tests
        /\
       /  \
  Unit Tests (Jest + RTL)
```

### Cobertura de Testes

- **Unit Tests**: 80% de cobertura mínima
- **Integration Tests**: Componentes e hooks
- **E2E Tests**: Fluxos críticos do usuário
- **Visual Tests**: Storybook e screenshots

## Ferramentas de Teste

### Jest + React Testing Library

```json
{
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/src/setupTests.ts"],
    "moduleNameMapping": {
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    "collectCoverageFrom": [
      "src/**/*.{ts,tsx}",
      "!src/**/*.d.ts",
      "!src/main.tsx"
    ],
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": 80
      }
    }
  }
}
```

### Playwright (E2E)

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI
  }
})
```

### Storybook (Visual Testing)

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  }
}

export default config
```

## Testes Unitários

### Component Testing

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import Button from './Button'

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  )
}

describe('Button', () => {
  it('should render with correct text', () => {
    renderWithTheme(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is true', () => {
    renderWithTheme(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('should apply correct variant styles', () => {
    renderWithTheme(<Button variant="secondary">Click me</Button>)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('secondary')
  })

  it('should have correct ARIA attributes', () => {
    renderWithTheme(
      <Button aria-label="Submit form" aria-pressed="false">
        Submit
      </Button>
    )

    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('aria-label', 'Submit form')
    expect(button).toHaveAttribute('aria-pressed', 'false')
  })
})
```

### Hook Testing

```typescript
// useGameData.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGameData } from './useGameData'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity,
      },
    },
  })

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

describe('useGameData', () => {
  it('should return games data', async () => {
    const { result } = renderHook(() => useGameData({}), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.games).toBeDefined()
    expect(Array.isArray(result.current.games)).toBe(true)
  })

  it('should handle error state', async () => {
    const { result } = renderHook(() => useGameData({ invalid: 'params' }), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.error).toBeDefined()
    })
  })

  it('should refetch data when called', async () => {
    const { result } = renderHook(() => useGameData({}), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    const initialGames = result.current.games

    result.current.refetch()

    await waitFor(() => {
      expect(result.current.games).not.toBe(initialGames)
    })
  })
})
```

### Service Testing

```typescript
// GameService.test.ts
import { GameService } from './GameService'
import { ObservabilityService } from './observability/ObservabilityService'

describe('GameService', () => {
  let gameService: GameService
  let mockObservabilityService: jest.Mocked<ObservabilityService>

  beforeEach(() => {
    mockObservabilityService = {
      log: jest.fn(),
      captureError: jest.fn(),
      captureEvent: jest.fn()
    } as any

    gameService = new GameService(mockObservabilityService)
  })

  it('should fetch games successfully', async () => {
    const mockResponse = {
      results: [
        { id: 1, name: 'Game 1' },
        { id: 2, name: 'Game 2' }
      ],
      count: 2
    }

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    })

    const result = await gameService.getGames({})

    expect(result.results).toHaveLength(2)
    expect(result.count).toBe(2)
    expect(mockObservabilityService.log).toHaveBeenCalledWith(
      'info',
      'Games fetched successfully'
    )
  })

  it('should handle API errors', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('API Error'))

    await expect(gameService.getGames({})).rejects.toThrow('API Error')
    expect(mockObservabilityService.captureError).toHaveBeenCalled()
  })

  it('should build correct API URL', async () => {
    const mockResponse = { results: [], count: 0 }
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse
    })

    await gameService.getGames({
      search: 'test',
      page: 2,
      pageSize: 10
    })

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('search=test&page=2&page_size=10')
    )
  })
})
```

### Redux Testing

```typescript
// favoritesSlice.test.ts
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer, {
  toggleFavorite,
  setFavorites,
  clearFavorites
} from './favoritesSlice'

const createTestStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer
    }
  })
}

describe('favoritesSlice', () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    store = createTestStore()
  })

  it('should handle initial state', () => {
    const state = store.getState().favorites
    expect(state.items).toEqual([])
    expect(state.loading).toBe(false)
    expect(state.error).toBeNull()
  })

  it('should handle toggleFavorite', () => {
    const game = { id: 1, name: 'Test Game' }

    // Add favorite
    store.dispatch(toggleFavorite(game))
    expect(store.getState().favorites.items).toContainEqual(game)

    // Remove favorite
    store.dispatch(toggleFavorite(game))
    expect(store.getState().favorites.items).not.toContainEqual(game)
  })

  it('should handle setFavorites', () => {
    const games = [
      { id: 1, name: 'Game 1' },
      { id: 2, name: 'Game 2' }
    ]

    store.dispatch(setFavorites(games))
    expect(store.getState().favorites.items).toEqual(games)
  })

  it('should handle clearFavorites', () => {
    const games = [{ id: 1, name: 'Game 1' }]
    store.dispatch(setFavorites(games))

    store.dispatch(clearFavorites())
    expect(store.getState().favorites.items).toEqual([])
  })
})
```

## Testes de Integração

### Component Integration

```typescript
// GameList.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ThemeProvider } from 'styled-components'
import { theme } from '@/styles/theme'
import favoritesReducer from '@/store/favorites/reducer'
import GameList from './GameList'

const createTestStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer
    }
  })
}

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }
    }
  })
  const store = createTestStore()

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  )
}

describe('GameList Integration', () => {
  it('should render games and handle favorites', async () => {
    const mockGames = [
      { id: 1, name: 'Game 1', rating: 4.5 },
      { id: 2, name: 'Game 2', rating: 3.8 }
    ]

    render(<GameList games={mockGames} loading={false} />, {
      wrapper: createWrapper()
    })

    // Check if games are rendered
    expect(screen.getByText('Game 1')).toBeInTheDocument()
    expect(screen.getByText('Game 2')).toBeInTheDocument()

    // Check if favorite buttons are present
    const favoriteButtons = screen.getAllByRole('button', { name: /favorite/i })
    expect(favoriteButtons).toHaveLength(2)

    // Test favorite functionality
    fireEvent.click(favoriteButtons[0])

    await waitFor(() => {
      expect(favoriteButtons[0]).toHaveAttribute('aria-pressed', 'true')
    })
  })

  it('should handle loading state', () => {
    render(<GameList games={[]} loading={true} />, {
      wrapper: createWrapper()
    })

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should handle error state', () => {
    render(<GameList games={[]} loading={false} error="Failed to load games" />, {
      wrapper: createWrapper()
    })

    expect(screen.getByText('Failed to load games')).toBeInTheDocument()
  })
})
```

### Hook Integration

```typescript
// useFilters.test.ts
import { renderHook, act } from '@testing-library/react'
import { useFilters } from './useFilters'

describe('useFilters Integration', () => {
  it('should manage filter state correctly', () => {
    const { result } = renderHook(() => useFilters())

    // Initial state
    expect(result.current.filters).toEqual({
      genre: '',
      platform: '',
      store: '',
      tag: ''
    })

    // Update filters
    act(() => {
      result.current.handleFilterChange('genre', 'action')
    })

    expect(result.current.filters.genre).toBe('action')

    // Reset filters
    act(() => {
      result.current.resetFilters()
    })

    expect(result.current.filters).toEqual({
      genre: '',
      platform: '',
      store: '',
      tag: ''
    })
  })

  it('should track active filters count', () => {
    const { result } = renderHook(() => useFilters())

    act(() => {
      result.current.handleFilterChange('genre', 'action')
      result.current.handleFilterChange('platform', 'pc')
    })

    expect(result.current.activeFiltersCount).toBe(2)
  })
})
```

## Testes E2E (Playwright)

### Configuração de Testes

```typescript
// e2e/basic.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Basic Functionality', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/')

    // Check if page loads
    await expect(page).toHaveTitle(/Heroes Catalog/)

    // Check if games are loaded
    await expect(page.locator('[data-testid="game-card"]')).toHaveCount(20)
  })

  test('should search for games', async ({ page }) => {
    await page.goto('/')

    // Type in search box
    await page.fill('[data-testid="search-input"]', 'zelda')

    // Wait for search results
    await page.waitForResponse(
      response => response.url().includes('/games') && response.status() === 200
    )

    // Check if results contain "zelda"
    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards.first()).toContainText(/zelda/i)
  })

  test('should filter games', async ({ page }) => {
    await page.goto('/')

    // Open filters
    await page.click('[data-testid="filters-button"]')

    // Select genre filter
    await page.selectOption('[data-testid="genre-select"]', 'action')

    // Wait for filtered results
    await page.waitForResponse(
      response => response.url().includes('/games') && response.status() === 200
    )

    // Check if filters are applied
    await expect(page.locator('[data-testid="active-filters"]')).toContainText(
      'action'
    )
  })

  test('should add game to favorites', async ({ page }) => {
    await page.goto('/')

    // Click favorite button on first game
    const firstGame = page.locator('[data-testid="game-card"]').first()
    await firstGame.locator('[data-testid="favorite-button"]').click()

    // Check if favorite count increased
    await expect(page.locator('[data-testid="favorites-count"]')).toContainText(
      '1'
    )
  })
})
```

### Testes de Acessibilidade

```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('should have proper ARIA labels', async ({ page }) => {
    await page.goto('/')

    // Check for proper ARIA labels
    await expect(page.locator('button[aria-label]')).toHaveCount(
      expect.any(Number)
    )
    await expect(page.locator('img[alt]')).toHaveCount(expect.any(Number))
  })

  test('should be navigable by keyboard', async ({ page }) => {
    await page.goto('/')

    // Navigate with Tab key
    await page.keyboard.press('Tab')
    await expect(page.locator(':focus')).toBeVisible()

    // Navigate through all interactive elements
    let focusCount = 0
    while (focusCount < 10) {
      await page.keyboard.press('Tab')
      await expect(page.locator(':focus')).toBeVisible()
      focusCount++
    }
  })

  test('should support high contrast mode', async ({ page }) => {
    await page.goto('/')

    // Enable high contrast mode
    await page.click('[data-testid="accessibility-button"]')
    await page.click('[data-testid="high-contrast-toggle"]')

    // Check if high contrast styles are applied
    const body = page.locator('body')
    await expect(body).toHaveClass(/high-contrast/)
  })
})
```

### Testes de Performance

```typescript
// e2e/performance.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Performance', () => {
  test('should load within performance budget', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')

    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    // Performance budget: 3 seconds
    expect(loadTime).toBeLessThan(3000)
  })

  test('should have good Core Web Vitals', async ({ page }) => {
    await page.goto('/')

    // Measure LCP (Largest Contentful Paint)
    const lcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries()
          const lastEntry = entries[entries.length - 1]
          resolve(lastEntry.startTime)
        }).observe({ entryTypes: ['largest-contentful-paint'] })
      })
    })

    // LCP should be under 2.5 seconds
    expect(lcp).toBeLessThan(2500)
  })

  test('should handle large datasets efficiently', async ({ page }) => {
    await page.goto('/')

    // Scroll to load more games
    for (let i = 0; i < 5; i++) {
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
      await page.waitForTimeout(1000) // Wait for lazy loading
    }

    // Check if all games are loaded without performance issues
    const gameCards = page.locator('[data-testid="game-card"]')
    await expect(gameCards).toHaveCount(100)

    // Verify smooth scrolling
    await page
      .evaluate(() => {
        return new Promise(resolve => {
          let frameCount = 0
          const startTime = performance.now()

          const countFrames = () => {
            frameCount++
            if (performance.now() - startTime < 1000) {
              requestAnimationFrame(countFrames)
            } else {
              resolve(frameCount)
            }
          }

          requestAnimationFrame(countFrames)
        })
      })
      .then(frameCount => {
        // Should maintain 60fps
        expect(frameCount).toBeGreaterThan(50)
      })
  })
})
```

## Testes Visuais (Storybook)

### Story Configuration

```typescript
// Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Common/UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A reusable button component with multiple variants and sizes'
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true
          }
        ]
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline']
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large']
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <span>⭐</span>
        Button with Icon
      </>
    )
  }
}
```

### Visual Regression Testing

```typescript
// .storybook/test-runner.ts
import { injectAxe, checkA11y } from 'axe-playwright'
import type { TestRunnerConfig } from '@storybook/test-runner'

const config: TestRunnerConfig = {
  async preRender(page) {
    await injectAxe(page)
  },
  async postRender(page) {
    await checkA11y(page, {
      detailedReport: true,
      detailedReportOptions: {
        html: true
      }
    })
  }
}

export default config
```

## Configuração de CI/CD

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30

  visual-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Storybook
        run: npm run build-storybook

      - name: Run visual regression tests
        run: npm run test:visual
```

## Scripts de Teste

### Package.json Scripts

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "test:unit": "jest --testPathPattern=src --testPathIgnorePatterns=e2e",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "test:visual": "storybook test",
    "test:accessibility": "jest --testPathPattern=accessibility",
    "test:all": "npm run test:unit && npm run test:e2e && npm run test:visual"
  }
}
```

## Conclusão

A estratégia de testes do Heroes Catalog garante:

- **Cobertura Abrangente**: Testes em todos os níveis da aplicação
- **Qualidade de Código**: Detecção precoce de bugs e regressões
- **Acessibilidade**: Conformidade com WCAG 2.1
- **Performance**: Monitoramento de métricas de performance
- **Automação**: Integração completa com CI/CD
- **Manutenibilidade**: Testes bem estruturados e documentados
