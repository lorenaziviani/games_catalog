# Padrões de Código - Heroes Catalog

## Visão Geral

Este documento define os padrões de código utilizados no Heroes Catalog, garantindo consistência, legibilidade e manutenibilidade. Os padrões seguem as melhores práticas de desenvolvimento frontend e são baseados em princípios SOLID e Clean Code.

## Estrutura de Arquivos

### Nomenclatura

```
// Arquivos de componente
ComponentName.tsx          # Componente principal
ComponentName.styles.ts    # Estilos do componente
ComponentName.test.tsx     # Testes do componente
ComponentName.stories.tsx  # Stories do Storybook

// Arquivos de hook
useHookName.ts            # Custom hook

// Arquivos de serviço
ServiceName.ts            # Implementação do serviço
IServiceName.ts           # Interface do serviço

// Arquivos de tipo
types.ts                  # Tipos compartilhados
types.d.ts                # Declarações de tipo
```

### Organização de Pastas

```
src/
├── components/           # Componentes React
│   ├── common/          # Componentes reutilizáveis
│   ├── game/            # Componentes específicos
│   └── features/        # Componentes de funcionalidades
├── hooks/               # Custom hooks
├── services/            # Serviços e APIs
├── domain/              # Lógica de negócio
├── infrastructure/      # Implementações concretas
├── utils/               # Utilitários
├── types/               # Tipos TypeScript
└── styles/              # Estilos globais
```

## TypeScript

### Configuração

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Tipos e Interfaces

#### Nomenclatura

```typescript
// Interfaces para props de componente
interface ComponentNameProps {
  required: string
  optional?: string
  onAction?: () => void
}

// Interfaces para dados
interface GameData {
  id: number
  name: string
  description: string
}

// Tipos para unions
type FilterType = 'genre' | 'platform' | 'store' | 'tag'
type SortOption = 'name' | 'rating' | 'release_date'

// Enums para valores constantes
enum AccessibilityMode {
  NORMAL = 'normal',
  COLORBLIND = 'colorblind',
  HIGH_CONTRAST = 'high-contrast'
}
```

#### Uso de Generics

```typescript
// Componentes genéricos
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

// Hooks genéricos
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
```

### Type Guards

```typescript
// Type guards para validação
function isGame(data: any): data is Game {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.name === 'string'
  )
}

// Type guards para arrays
function isGameArray(data: any): data is Game[] {
  return Array.isArray(data) && data.every(isGame)
}
```

## React

### Componentes Funcionais

```typescript
// Componente funcional com TypeScript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  disabled?: boolean
  className?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  disabled = false,
  className,
  ...props
}) => {
  const handleClick = useCallback(() => {
    if (!disabled && onClick) {
      onClick()
    }
  }, [disabled, onClick])

  return (
    <button
      className={cn(styles.button, styles[variant], styles[size], className)}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
```

### Hooks Customizados

```typescript
// Hook customizado com TypeScript
interface UseGameDataReturn {
  games: Game[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useGameData = (params: GameSearchParams): UseGameDataReturn => {
  const queryClient = useQueryClient()
  const gameService = useMemo(() => serviceContainer.getGameService(), [])

  const {
    data: games = [],
    isLoading: loading,
    error,
    refetch
  } = useQuery({
    queryKey: ['games', params],
    queryFn: () => gameService.getGames(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 3
  })

  return {
    games,
    loading,
    error: error?.message || null,
    refetch
  }
}
```

### Context API

```typescript
// Context com TypeScript
interface ThemeContextType {
  theme: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeMode>('light')

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme])

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

## Styled Components

### Definição de Estilos

```typescript
// Estilos com TypeScript
interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'outline'
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ size, theme }) => {
    switch (size) {
      case 'small':
        return `
          padding: ${theme.spacing.xs} ${theme.spacing.sm};
          font-size: ${theme.fontSize.sm};
        `
      case 'large':
        return `
          padding: ${theme.spacing.md} ${theme.spacing.lg};
          font-size: ${theme.fontSize.lg};
        `
      default:
        return `
          padding: ${theme.spacing.sm} ${theme.spacing.md};
          font-size: ${theme.fontSize.md};
        `
    }
  }}

  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primaryDark};
          }
        `
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.secondaryDark};
          }
        `
      case 'outline':
        return `
          background-color: transparent;
          color: ${theme.colors.primary};
          border: 1px solid ${theme.colors.primary};
          &:hover:not(:disabled) {
            background-color: ${theme.colors.primary};
            color: ${theme.colors.white};
          }
        `
    }
  }}

  ${({ disabled, theme }) =>
    disabled &&
    `
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  `}
`
```

### Theme Integration

```typescript
// Definição do tema
interface Theme {
  colors: {
    primary: string
    secondary: string
    background: string
    text: string
    border: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  fontSize: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
  }
  borderRadius: {
    sm: string
    md: string
    lg: string
  }
  breakpoints: {
    sm: string
    md: string
    lg: string
    xl: string
  }
}

// Uso do tema
const Container = styled.div`
  max-width: ${({ theme }) => theme.breakpoints.lg};
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};

  ${({ theme }) => theme.breakpoints.md} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`
```

## Estado e Gerenciamento

### Redux Toolkit

```typescript
// Slice com TypeScript
interface FavoritesState {
  items: Game[]
  loading: boolean
  error: string | null
}

const initialState: FavoritesState = {
  items: [],
  loading: false,
  error: null
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Game>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index >= 0) {
        state.items.splice(index, 1)
      } else {
        state.items.push(action.payload)
      }
    },
    setFavorites: (state, action: PayloadAction<Game[]>) => {
      state.items = action.payload
    },
    clearFavorites: state => {
      state.items = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavoritesFromStorage.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loadFavoritesFromStorage.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
      })
      .addCase(loadFavoritesFromStorage.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to load favorites'
      })
  }
})
```

### React Query

```typescript
// Query com TypeScript
interface UseGamesParams {
  search?: string
  filters?: FilterState
  page?: number
  pageSize?: number
  sort?: SortOption
}

export const useGames = (params: UseGamesParams) => {
  const gameService = useMemo(() => serviceContainer.getGameService(), [])

  return useQuery({
    queryKey: ['games', params],
    queryFn: () => gameService.getGames(params),
    staleTime: 5 * 60 * 1000,
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000)
  })
}
```

## Testes

### Jest Configuration

```javascript
// jest.config.cjs
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}
```

### Testes de Componente

```typescript
// Component.test.tsx
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
})
```

### Testes de Hook

```typescript
// useGameData.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGameData } from './useGameData'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false
      }
    }
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
    // Mock error scenario
    const { result } = renderHook(() => useGameData({ invalid: 'params' }), {
      wrapper: createWrapper()
    })

    await waitFor(() => {
      expect(result.current.error).toBeDefined()
    })
  })
})
```

## Performance

### React.memo

```typescript
// Memoização de componentes
interface ExpensiveComponentProps {
  data: Game[]
  onItemClick: (id: number) => void
}

const ExpensiveComponent = React.memo<ExpensiveComponentProps>(({ data, onItemClick }) => {
  return (
    <div>
      {data.map(game => (
        <GameCard
          key={game.id}
          game={game}
          onClick={() => onItemClick(game.id)}
        />
      ))}
    </div>
  )
})

ExpensiveComponent.displayName = 'ExpensiveComponent'
```

### useMemo e useCallback

```typescript
// Otimização de performance
const GameList: React.FC<GameListProps> = ({ games, filters, onGameClick }) => {
  // Memoizar filtros aplicados
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      if (filters.genre && game.genres.includes(filters.genre)) return false
      if (filters.platform && game.platforms.includes(filters.platform)) return false
      return true
    })
  }, [games, filters])

  // Memoizar callback
  const handleGameClick = useCallback((gameId: number) => {
    onGameClick(gameId)
  }, [onGameClick])

  // Memoizar componente de renderização
  const renderGame = useCallback((game: Game) => (
    <GameCard
      key={game.id}
      game={game}
      onClick={handleGameClick}
    />
  ), [handleGameClick])

  return (
    <div>
      {filteredGames.map(renderGame)}
    </div>
  )
}
```

### Lazy Loading

```typescript
// Lazy loading de componentes
const GameModal = lazy(() => import('./GameModal'))
const FavoritesPage = lazy(() => import('./FavoritesPage'))

const App: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </Suspense>
  )
}
```

## Acessibilidade

### ARIA Attributes

```typescript
// Componente acessível
interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      ref={modalRef}
    >
      <div role="document">
        <h2 id="modal-title">{title}</h2>
        <button
          aria-label="Close modal"
          onClick={onClose}
        >
          ×
        </button>
        {children}
      </div>
    </div>
  )
}
```

## Error Handling

### Error Boundaries

```typescript
// Error boundary com TypeScript
interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Log to observability service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div role="alert">
          <h2>Something went wrong</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
```

### Async Error Handling

```typescript
// Hook para tratamento de erros assíncronos
const useAsyncError = () => {
  const [, setError] = useState()
  return useCallback((e: Error) => {
    setError(() => {
      throw e
    })
  }, [])
}

// Uso em componentes
const Component = () => {
  const throwError = useAsyncError()

  const handleAsyncOperation = async () => {
    try {
      await someAsyncOperation()
    } catch (error) {
      throwError(error as Error)
    }
  }

  return <button onClick={handleAsyncOperation}>Execute</button>
}
```

## Conclusão

Os padrões de código do Heroes Catalog garantem:

- **Consistência**: Código uniforme e previsível
- **Legibilidade**: Fácil compreensão e manutenção
- **Performance**: Otimizações adequadas
- **Acessibilidade**: Conformidade com WCAG 2.1
- **Testabilidade**: Facilita testes unitários e de integração
- **Escalabilidade**: Suporta crescimento do projeto
- **Manutenibilidade**: Código limpo e bem documentado
