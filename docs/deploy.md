# Deploy e CI/CD - Heroes Catalog

## Visão Geral

O Heroes Catalog implementa um pipeline de CI/CD completo e automatizado, garantindo qualidade de código, testes abrangentes e deploy contínuo. O sistema utiliza GitHub Actions para automação e Vercel para deploy.

## Arquitetura de CI/CD

### Pipeline Overview

```
Code Push → Quality Checks → Tests → Build → Deploy → Monitor
```

### Workflows Principais

1. **Quality Check**: Linting, formatting, type checking
2. **Test Suite**: Unit, integration, E2E tests
3. **Security Scan**: Vulnerabilidades e dependências
4. **Performance Audit**: Lighthouse e Core Web Vitals
5. **Build & Deploy**: Build otimizado e deploy automático

## GitHub Actions

### Quality Check Workflow

```yaml
# .github/workflows/quality.yml
name: Quality Check

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Run Prettier check
        run: npm run format:check

      - name: Type check
        run: npm run type-check

      - name: Check for security vulnerabilities
        run: npm audit --audit-level moderate
```

### Test Suite Workflow

```yaml
# .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
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
          flags: unit
          name: unit-coverage

  integration-tests:
    runs-on: ubuntu-latest
    needs: unit-tests

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run integration tests
        run: npm run test:integration

  e2e-tests:
    runs-on: ubuntu-latest
    needs: unit-tests

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
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
    needs: unit-tests

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
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

### Security Workflow

```yaml
# .github/workflows/security.yml
name: Security Scan

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 0 * * 0' # Weekly

jobs:
  security-audit:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run npm audit
        run: npm audit --audit-level moderate

      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high

  dependency-check:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Check for outdated dependencies
        run: npm outdated

      - name: Run dependency check
        run: npm audit --audit-level moderate
```

### Performance Workflow

```yaml
# .github/workflows/performance.yml
name: Performance Audit

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Start server
        run: npm run preview &

      - name: Run Lighthouse CI
        run: |
          npm install -g @lhci/cli@0.12.x
          lhci autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

  bundle-analysis:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build with bundle analysis
        run: npm run build:analyze

      - name: Upload bundle analysis
        uses: actions/upload-artifact@v3
        with:
          name: bundle-analysis
          path: dist/
          retention-days: 7
```

### Deploy Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy-preview:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Deploy to Vercel (Preview)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

  deploy-production:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: [quality, test-suite, security-audit, performance-audit]

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Deploy to Vercel (Production)
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'

      - name: Notify deployment
        run: |
          echo "Deployment completed successfully"
          # Add notification logic here (Slack, Discord, etc.)
```

## Configuração de Ambiente

### Environment Variables

```bash
# .env.production
VITE_API_BASE_URL=https://api.rawg.io/api
VITE_API_KEY=your_api_key_here
VITE_DEFAULT_PAGE_SIZE=20
VITE_CACHE_STALE_TIME=300000
VITE_RETRY_ATTEMPTS=3
VITE_LOGROCKET_APP_ID=your_logrocket_app_id
VITE_VERCEL_ENV=production
```

### Vercel Configuration

```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/favicon.ico",
      "dest": "/favicon.ico"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

## Build Optimization

### Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          styled: ['styled-components']
        }
      }
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 5173,
    host: true
  },
  preview: {
    port: 4173,
    host: true
  }
})
```

### Bundle Analysis

```typescript
// vite.config.analyze.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          styled: ['styled-components']
        }
      }
    }
  }
})
```

## Performance Monitoring

### Lighthouse CI

```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173'],
      numberOfRuns: 3,
      startServerCommand: 'npm run preview',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 10000
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['warn', { maxNumericValue: 300 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
```

### Core Web Vitals Monitoring

```typescript
// src/utils/performance.ts
export const measureCoreWebVitals = () => {
  // LCP (Largest Contentful Paint)
  new PerformanceObserver(list => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]

    if (lastEntry) {
      console.log('LCP:', lastEntry.startTime)
      // Send to analytics
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] })

  // FID (First Input Delay)
  new PerformanceObserver(list => {
    const entries = list.getEntries()

    entries.forEach(entry => {
      console.log('FID:', entry.processingStart - entry.startTime)
      // Send to analytics
    })
  }).observe({ entryTypes: ['first-input'] })

  // CLS (Cumulative Layout Shift)
  let clsValue = 0
  new PerformanceObserver(list => {
    const entries = list.getEntries()

    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value
        console.log('CLS:', clsValue)
        // Send to analytics
      }
    })
  }).observe({ entryTypes: ['layout-shift'] })
}
```

## Observabilidade

### LogRocket Integration

```typescript
// src/services/observability/providers/LogRocketProvider.ts
import LogRocket from 'logrocket'

export class LogRocketProvider implements IObservabilityProvider {
  init(): void {
    LogRocket.init(import.meta.env.VITE_LOGROCKET_APP_ID)
  }

  captureError(error: Error): void {
    LogRocket.captureException(error)
  }

  captureEvent(event: string, data?: any): void {
    LogRocket.track(event, data)
  }

  log(level: string, message: string, data?: any): void {
    LogRocket.log(level, message, data)
  }
}
```

### Error Tracking

```typescript
// src/components/ErrorBoundary.tsx
import React from 'react'
import { ObservabilityService } from '@/services/observability/ObservabilityService'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  private observabilityService: ObservabilityService

  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
    this.observabilityService = new ObservabilityService()
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.observabilityService.captureError(error)
    this.observabilityService.log('error', 'Error caught by boundary', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert" className="error-boundary">
          <h2>Algo deu errado</h2>
          <p>Desculpe pelo inconveniente. Tente recarregar a página.</p>
          <button onClick={() => window.location.reload()}>
            Recarregar Página
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
```

## Deploy Strategy

### Blue-Green Deployment

```yaml
# .github/workflows/blue-green-deploy.yml
name: Blue-Green Deployment

on:
  push:
    branches: [main]

jobs:
  deploy-blue:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Deploy to Blue environment
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod --name blue'

  health-check-blue:
    runs-on: ubuntu-latest
    needs: deploy-blue

    steps:
      - name: Health check Blue environment
        run: |
          curl -f https://blue.heroes-catalog.vercel.app/health || exit 1

  switch-traffic:
    runs-on: ubuntu-latest
    needs: health-check-blue

    steps:
      - name: Switch traffic to Blue
        run: |
          # Switch traffic logic here
          echo "Traffic switched to Blue environment"

  deploy-green:
    runs-on: ubuntu-latest
    if: always()

    steps:
      - name: Deploy to Green environment
        run: |
          # Deploy to green environment
          echo "Green environment updated"
```

### Rollback Strategy

```yaml
# .github/workflows/rollback.yml
name: Rollback

on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to rollback'
        required: true
        default: 'production'
        type: choice
        options:
          - production
          - staging

jobs:
  rollback:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Rollback to previous version
        run: |
          # Rollback logic here
          echo "Rolling back ${{ github.event.inputs.environment }}"

      - name: Health check after rollback
        run: |
          # Health check logic
          echo "Health check completed"
```

## Monitoring e Alertas

### Uptime Monitoring

```typescript
// src/utils/monitoring.ts
export const setupUptimeMonitoring = () => {
  // Monitor page load time
  window.addEventListener('load', () => {
    const loadTime = performance.now()

    if (loadTime > 3000) {
      // Send alert for slow load time
      console.warn('Slow page load detected:', loadTime)
    }
  })

  // Monitor API response times
  const originalFetch = window.fetch
  window.fetch = async (...args) => {
    const startTime = performance.now()

    try {
      const response = await originalFetch(...args)
      const endTime = performance.now()

      if (endTime - startTime > 5000) {
        // Send alert for slow API response
        console.warn('Slow API response detected:', endTime - startTime)
      }

      return response
    } catch (error) {
      // Send alert for API errors
      console.error('API error detected:', error)
      throw error
    }
  }
}
```

### Performance Alerts

```typescript
// src/utils/performance-alerts.ts
export const setupPerformanceAlerts = () => {
  // Monitor Core Web Vitals
  new PerformanceObserver(list => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1]

    if (lastEntry && lastEntry.startTime > 2500) {
      // Send alert for poor LCP
      console.warn('Poor LCP detected:', lastEntry.startTime)
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] })

  // Monitor memory usage
  if ('memory' in performance) {
    setInterval(() => {
      const memory = (performance as any).memory

      if (memory.usedJSHeapSize > 50 * 1024 * 1024) {
        // 50MB
        // Send alert for high memory usage
        console.warn('High memory usage detected:', memory.usedJSHeapSize)
      }
    }, 30000) // Check every 30 seconds
  }
}
```

## Scripts de Deploy

### Package.json Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "build:analyze": "vite build --config vite.config.analyze.ts",
    "preview": "vite preview",
    "deploy:preview": "vercel --prod",
    "deploy:production": "vercel --prod --confirm",
    "deploy:staging": "vercel --prod --target staging",
    "rollback": "vercel rollback",
    "lighthouse": "lhci autorun",
    "bundle:analyze": "npm run build:analyze && open dist/stats.html"
  }
}
```

## Conclusão

O pipeline de CI/CD do Heroes Catalog garante:

- **Automação Completa**: Deploy automatizado em todas as etapas
- **Qualidade de Código**: Checks rigorosos antes do deploy
- **Segurança**: Scans de vulnerabilidades e dependências
- **Performance**: Monitoramento contínuo de métricas
- **Observabilidade**: Tracking completo de erros e performance
- **Rollback Seguro**: Estratégia de reversão em caso de problemas
- **Monitoramento**: Alertas proativos para problemas
