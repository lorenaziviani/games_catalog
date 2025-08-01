# Guia de Componentes - Heroes Catalog

## Visão Geral

O Heroes Catalog utiliza uma arquitetura de componentes baseada em princípios de design system, com foco em reutilização, acessibilidade e performance. Os componentes são organizados em categorias bem definidas e seguem padrões consistentes.

## Organização dos Componentes

### Estrutura de Pastas

```
src/components/
├── common/              # Componentes reutilizáveis
│   ├── ui/             # UI components básicos
│   ├── layout/         # Componentes de layout
│   └── forms/          # Componentes de formulário
├── game/               # Componentes específicos de jogos
└── features/           # Componentes de funcionalidades
```

## Common Components

### UI Components (`src/components/common/ui/`)

#### AccessibilityButton

```typescript
interface AccessibilityButtonProps {
  onModeChange: (mode: AccessibilityMode) => void
  onFontSizeChange: (size: FontSize) => void
  onReduceMotionChange: (reduce: boolean) => void
  currentMode: AccessibilityMode
  currentFontSize: FontSize
  reduceMotion: boolean
}
```

**Responsabilidades:**

- Gerenciamento de configurações de acessibilidade
- Modos de cor (Normal, Daltonismo, Alto Contraste)
- Tamanhos de fonte (Normal, Grande, Extra Grande)
- Redução de movimento

**Uso:**

```typescript
<AccessibilityButton
  onModeChange={handleModeChange}
  onFontSizeChange={handleFontSizeChange}
  onReduceMotionChange={handleReduceMotionChange}
  currentMode={accessibilityMode}
  currentFontSize={fontSize}
  reduceMotion={reduceMotion}
/>
```

#### Image

```typescript
interface ImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  loading?: 'lazy' | 'eager'
  fallback?: string
}
```

**Responsabilidades:**

- Renderização otimizada de imagens
- Lazy loading
- Fallback para imagens quebradas
- Acessibilidade (alt text)

#### LoadingSpinner

```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
  text?: string
}
```

**Responsabilidades:**

- Indicador de carregamento
- Tamanhos configuráveis
- Texto opcional
- Animações suaves

#### Tag

```typescript
interface TagProps {
  label: string
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  size?: 'small' | 'medium' | 'large'
  onClick?: () => void
  removable?: boolean
  onRemove?: () => void
}
```

**Responsabilidades:**

- Exibição de tags/labels
- Cores temáticas
- Interação (clique, remoção)
- Acessibilidade

#### Text

```typescript
interface TextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption'
  color?: string
  weight?: 'normal' | 'medium' | 'bold'
  align?: 'left' | 'center' | 'right'
  children: React.ReactNode
}
```

**Responsabilidades:**

- Tipografia consistente
- Variantes de texto
- Alinhamento e peso
- Design tokens

### Layout Components (`src/components/common/layout/`)

#### Header

```typescript
interface HeaderProps {
  title: string
  favoritesCount?: number
  onThemeToggle?: () => void
  currentTheme?: ThemeMode
}
```

**Responsabilidades:**

- Cabeçalho da aplicação
- Navegação principal
- Contador de favoritos
- Toggle de tema

#### Banner

```typescript
interface BannerProps {
  title: string
  subtitle?: string
  badge?: string
  children?: React.ReactNode
}
```

**Responsabilidades:**

- Banner informativo
- Badge opcional
- Conteúdo flexível
- Design responsivo

### Form Components (`src/components/common/forms/`)

#### Filters

```typescript
interface FiltersProps {
  filters: FilterState
  onFilterChange: (type: FilterType, value: FilterValue) => void
  onResetFilters: () => void
  onClearFilters: () => void
  activeFiltersCount: number
  availableGenres: FilterOption[]
  availablePlatforms: FilterOption[]
  availableStores: FilterOption[]
  availableTags: FilterOption[]
}
```

**Responsabilidades:**

- Sistema de filtros completo
- Múltiplos tipos de filtro
- Contadores ativos
- Reset e limpeza

#### Sort

```typescript
interface SortProps {
  currentSort: SortOption
  onSortChange: (sort: SortOption) => void
  options: SortOption[]
}
```

**Responsabilidades:**

- Ordenação de dados
- Opções configuráveis
- Estado atual
- Callback de mudança

## Game Components (`src/components/game/`)

### Card

```typescript
interface CardProps {
  game: Game
  onFavoriteToggle: (gameId: number) => void
  isFavorite: boolean
  showFavoriteButton?: boolean
}
```

**Responsabilidades:**

- Exibição de jogo individual
- Informações principais
- Botão de favorito
- Interação do usuário

### GameModal

```typescript
interface GameModalProps {
  game: Game | null
  isOpen: boolean
  onClose: () => void
}
```

**Responsabilidades:**

- Modal de detalhes do jogo
- Informações completas
- Galeria de imagens
- Controles de fechamento

### GameList

```typescript
interface GameListProps {
  games: Game[]
  loading: boolean
  error?: string
  onLoadMore?: () => void
  hasMore?: boolean
}
```

**Responsabilidades:**

- Lista de jogos
- Estado de carregamento
- Tratamento de erros
- Paginação infinita

### MetacriticScore

```typescript
interface MetacriticScoreProps {
  score: number
  size?: 'small' | 'medium' | 'large'
  showLabel?: boolean
}
```

**Responsabilidades:**

- Exibição de score Metacritic
- Cores baseadas no score
- Tamanhos configuráveis
- Acessibilidade

### RatingBadge

```typescript
interface RatingBadgeProps {
  rating: string
  color?: string
  size?: 'small' | 'medium' | 'large'
}
```

**Responsabilidades:**

- Badge de rating
- Cores temáticas
- Tamanhos variáveis
- Design consistente

## Features Components (`src/components/features/`)

### Favorites

```typescript
interface FavoriteButtonProps {
  gameId: number
  isFavorite: boolean
  onToggle: (gameId: number) => void
  size?: 'small' | 'medium' | 'large'
}
```

**Responsabilidades:**

- Botão de favorito
- Estado visual
- Interação do usuário
- Integração com Redux

### Navigation

```typescript
interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
}
```

**Responsabilidades:**

- Paginação
- Navegação entre páginas
- Indicadores visuais
- Acessibilidade

### Theme

```typescript
interface ThemeButtonProps {
  currentTheme: ThemeMode
  onThemeChange: (theme: ThemeMode) => void
  size?: 'small' | 'medium' | 'large'
}
```

**Responsabilidades:**

- Toggle de tema
- Estados visuais
- Integração com contexto
- Ícones temáticos

## Padrões de Design

### 1. Props Interface

```typescript
// Sempre definir interface para props
interface ComponentProps {
  // Props obrigatórias primeiro
  required: string

  // Props opcionais depois
  optional?: string

  // Callbacks por último
  onAction?: () => void
}
```

### 2. Default Props

```typescript
// Usar default parameters
const Component = ({
  size = 'medium',
  color = 'primary',
  onAction = () => {}
}: ComponentProps) => {
  // Component logic
}
```

### 3. Children Pattern

```typescript
// Suportar children quando apropriado
interface ContainerProps {
  children: React.ReactNode
  className?: string
}

const Container = ({ children, className }: ContainerProps) => (
  <div className={className}>
    {children}
  </div>
)
```

### 4. Forwarding Refs

```typescript
// Usar forwardRef para componentes que precisam de ref
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = 'text', ...props }, ref) => (
    <input ref={ref} type={type} {...props} />
  )
)
```

## Styled Components

### Theme Integration

```typescript
// Usar tema para estilos
const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`
```

### Responsive Design

```typescript
// Breakpoints responsivos
const ResponsiveContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};

  ${({ theme }) => theme.breakpoints.md} {
    padding: ${({ theme }) => theme.spacing.md};
  }

  ${({ theme }) => theme.breakpoints.lg} {
    padding: ${({ theme }) => theme.spacing.lg};
  }
`
```

### Variants Pattern

```typescript
// Variantes de componente
const Button = styled.button<ButtonProps>`
  // Base styles
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  // Variant styles
  ${({ variant, theme }) => {
    switch (variant) {
      case 'primary':
        return `
          background-color: ${theme.colors.primary};
          color: ${theme.colors.white};
        `
      case 'secondary':
        return `
          background-color: ${theme.colors.secondary};
          color: ${theme.colors.white};
        `
      default:
        return ''
    }
  }}
`
```

## Acessibilidade

### ARIA Attributes

```typescript
// Sempre incluir atributos ARIA apropriados
const Button = ({ children, ...props }: ButtonProps) => (
  <button
    role="button"
    aria-label={props['aria-label']}
    aria-pressed={props['aria-pressed']}
    {...props}
  >
    {children}
  </button>
)
```

### Keyboard Navigation

```typescript
// Suportar navegação por teclado
const Modal = ({ isOpen, onClose }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  // Modal content
}
```

### Focus Management

```typescript
// Gerenciar foco adequadamente
const useFocusTrap = (ref: RefObject<HTMLElement>) => {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement

    const handleTab = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    element.addEventListener('keydown', handleTab)
    return () => element.removeEventListener('keydown', handleTab)
  }, [ref])
}
```

## Performance

### React.memo

```typescript
// Memoizar componentes que recebem props estáveis
const ExpensiveComponent = React.memo(({ data }: ExpensiveComponentProps) => {
  // Component logic
})
```

### useMemo e useCallback

```typescript
// Memoizar valores e funções caros
const Component = ({ items }: ComponentProps) => {
  const sortedItems = useMemo(() =>
    items.sort((a, b) => a.name.localeCompare(b.name)),
    [items]
  )

  const handleItemClick = useCallback((id: number) => {
    // Handle click
  }, [])

  return (
    <div>
      {sortedItems.map(item => (
        <Item key={item.id} item={item} onClick={handleItemClick} />
      ))}
    </div>
  )
}
```

### Lazy Loading

```typescript
// Lazy load de componentes pesados
const HeavyComponent = lazy(() => import('./HeavyComponent'))

const App = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <HeavyComponent />
  </Suspense>
)
```

## Testes

### Component Testing

```typescript
// Testes de componente com React Testing Library
describe('Button', () => {
  it('should render with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Accessibility Testing

```typescript
// Testes de acessibilidade
describe('Modal', () => {
  it('should be accessible', () => {
    render(<Modal isOpen={true} onClose={jest.fn()}>Content</Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should close on escape key', () => {
    const onClose = jest.fn()
    render(<Modal isOpen={true} onClose={onClose}>Content</Modal>)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalled()
  })
})
```

## Storybook

### Story Configuration

```typescript
// Configuração de stories
const meta: Meta<typeof Button> = {
  title: 'Common/UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A reusable button component with multiple variants'
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
    }
  }
}

export default meta
```

### Story Examples

```typescript
// Exemplos de stories
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

export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <Icon name="star" />
        Button with Icon
      </>
    )
  }
}
```

## Conclusão

O sistema de componentes do Heroes Catalog foi projetado para ser:

- **Reutilizável**: Componentes modulares e flexíveis
- **Acessível**: Conformidade com WCAG 2.1
- **Performático**: Otimizações de renderização
- **Testável**: Facilita testes unitários e de integração
- **Documentado**: Stories completos no Storybook
- **Consistente**: Design tokens e padrões uniformes
