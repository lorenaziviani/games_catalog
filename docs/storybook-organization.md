# Organização do Storybook - Heroes Catalog

## Visão Geral

O Heroes Catalog utiliza o Storybook como ferramenta central para documentação, desenvolvimento e testes visuais de componentes. A organização segue uma estrutura hierárquica clara, facilitando a navegação e manutenção dos componentes.

## Estrutura de Organização

### Hierarquia de Pastas

```
Storybook/
├── Common/                    # Componentes reutilizáveis
│   ├── UI/                   # Componentes básicos de UI
│   │   ├── Button/
│   │   ├── Text/
│   │   ├── Image/
│   │   ├── LoadingSpinner/
│   │   ├── Tag/
│   │   └── TagsContainer/
│   ├── Layout/               # Componentes de layout
│   │   ├── Header/
│   │   └── Banner/
│   └── Forms/                # Componentes de formulário
│       ├── Filters/
│       ├── Sort/
│       └── AccessibilityButton/
├── Game/                     # Componentes específicos de jogos
│   ├── Card/
│   ├── GameModal/
│   ├── GameList/
│   ├── MetacriticScore/
│   ├── RatingBadge/
│   └── Stats/
└── Features/                 # Componentes de funcionalidades
    ├── Favorites/
    ├── Navigation/
    └── Theme/
```

### Convenções de Nomenclatura

#### Títulos de Stories

```typescript
// Estrutura: Category/Subcategory/Component
const meta: Meta<typeof Button> = {
  title: 'Common/UI/Button', // Common/UI/ComponentName
  component: Button
  // ...
}
```

#### Nomes de Stories

```typescript
// Padrão: Variant + Description
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button'
  }
}

export const SecondaryWithIcon: Story = {
  args: {
    variant: 'secondary',
    children: (
      <>
        <Icon name="star" />
        Button with Icon
      </>
    )
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button'
  }
}
```

## Configuração do Storybook

### Configuração Principal

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)', '../src/**/*.mdx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-coverage',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-measure',
    '@storybook/addon-outline'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation'
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true
    }
  }
}

export default config
```

### Configuração de Preview

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/styles/theme'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import favoritesReducer from '../src/store/favorites/reducer'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity
    }
  }
})

const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  }
})

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: '#ffffff'
        },
        {
          name: 'dark',
          value: '#1a1a1a'
        },
        {
          name: 'gray',
          value: '#f5f5f5'
        }
      ]
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px'
          }
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px'
          }
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px'
          }
        }
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true
          },
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Story />
          </ThemeProvider>
        </Provider>
      </QueryClientProvider>
    )
  ]
}

export default preview
```

## Estrutura de Stories

### Story Básico

```typescript
// src/components/common/ui/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Common/UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Um componente de botão reutilizável com múltiplas variantes e tamanhos'
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
      options: ['primary', 'secondary', 'outline'],
      description: 'Variante visual do botão'
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Tamanho do botão'
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado'
    },
    children: {
      control: 'text',
      description: 'Conteúdo do botão'
    },
    onClick: {
      action: 'clicked',
      description: 'Callback executado ao clicar'
    }
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof Button>

// Stories básicos
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Primário'
  }
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Botão Secundário'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Botão Outline'
  }
}

// Stories com estados
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Botão Desabilitado'
  }
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Carregando...'
  }
}

// Stories com tamanhos
export const Small: Story = {
  args: {
    size: 'small',
    children: 'Pequeno'
  }
}

export const Large: Story = {
  args: {
    size: 'large',
    children: 'Grande'
  }
}

// Stories com ícones
export const WithIcon: Story = {
  args: {
    variant: 'primary',
    children: (
      <>
        <span>⭐</span>
        Botão com Ícone
      </>
    )
  }
}

// Stories interativos
export const Interactive: Story = {
  args: {
    variant: 'primary',
    children: 'Clique em mim'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    await userEvent.click(button)
  }
}
```

### Story Complexo (Componente com Props Complexas)

```typescript
// src/components/game/Card/Card.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const mockGame = {
  id: 1,
  name: 'The Legend of Zelda: Breath of the Wild',
  background_image: 'https://example.com/zelda.jpg',
  rating: 4.8,
  metacritic: 97,
  released: '2017-03-03',
  genres: [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Adventure' }
  ],
  platforms: [
    { platform: { id: 1, name: 'Nintendo Switch' } }
  ]
}

const meta: Meta<typeof Card> = {
  title: 'Game/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: 'Card de jogo com informações principais e botão de favorito'
      }
    }
  },
  argTypes: {
    game: {
      control: 'object',
      description: 'Dados do jogo'
    },
    isFavorite: {
      control: 'boolean',
      description: 'Se o jogo está nos favoritos'
    },
    onFavoriteToggle: {
      action: 'favorite-toggled',
      description: 'Callback para alternar favorito'
    }
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px', margin: '20px' }}>
        <Story />
      </div>
    )
  ]
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    game: mockGame,
    isFavorite: false,
    onFavoriteToggle: () => {}
  }
}

export const Favorite: Story = {
  args: {
    game: mockGame,
    isFavorite: true,
    onFavoriteToggle: () => {}
  }
}

export const WithoutImage: Story = {
  args: {
    game: {
      ...mockGame,
      background_image: null
    },
    isFavorite: false,
    onFavoriteToggle: () => {}
  }
}

export const HighRating: Story = {
  args: {
    game: {
      ...mockGame,
      rating: 4.9,
      metacritic: 99
    },
    isFavorite: false,
    onFavoriteToggle: () => {}
  }
}

export const MultipleGenres: Story = {
  args: {
    game: {
      ...mockGame,
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Adventure' },
        { id: 3, name: 'RPG' },
        { id: 4, name: 'Strategy' }
      ]
    },
    isFavorite: false,
    onFavoriteToggle: () => {}
  }
}
```

### Story com Interações

```typescript
// src/components/common/forms/Filters/Filters.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { Filters } from './Filters'

const meta: Meta<typeof Filters> = {
  title: 'Common/Forms/Filters',
  component: Filters,
  parameters: {
    docs: {
      description: {
        component: 'Sistema de filtros para busca de jogos'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof Filters>

export const Default: Story = {
  args: {
    filters: {
      genre: '',
      platform: '',
      store: '',
      tag: ''
    },
    onFilterChange: () => {},
    onResetFilters: () => {},
    onClearFilters: () => {},
    activeFiltersCount: 0,
    availableGenres: [
      { id: 1, name: 'Action' },
      { id: 2, name: 'Adventure' },
      { id: 3, name: 'RPG' }
    ],
    availablePlatforms: [
      { id: 1, name: 'PC' },
      { id: 2, name: 'PlayStation' },
      { id: 3, name: 'Xbox' }
    ],
    availableStores: [
      { id: 1, name: 'Steam' },
      { id: 2, name: 'Epic Games' }
    ],
    availableTags: [
      { id: 1, name: 'Open World' },
      { id: 2, name: 'Multiplayer' }
    ]
  }
}

export const WithActiveFilters: Story = {
  args: {
    ...Default.args,
    filters: {
      genre: 'Action',
      platform: 'PC',
      store: '',
      tag: 'Open World'
    },
    activeFiltersCount: 3
  }
}

export const FilterInteraction: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Abrir filtros
    const filtersButton = canvas.getByRole('button', { name: /filtros/i })
    await userEvent.click(filtersButton)

    // Selecionar gênero
    const genreSelect = canvas.getByLabelText(/gênero/i)
    await userEvent.selectOptions(genreSelect, 'Action')

    // Selecionar plataforma
    const platformSelect = canvas.getByLabelText(/plataforma/i)
    await userEvent.selectOptions(platformSelect, 'PC')
  }
}
```

## Documentação Automática

### JSDoc Comments

````typescript
// src/components/common/ui/Button/Button.tsx
interface ButtonProps {
  /** Variante visual do botão */
  variant?: 'primary' | 'secondary' | 'outline'
  /** Tamanho do botão */
  size?: 'small' | 'medium' | 'large'
  /** Estado desabilitado */
  disabled?: boolean
  /** Estado de carregamento */
  loading?: boolean
  /** Conteúdo do botão */
  children: React.ReactNode
  /** Callback executado ao clicar */
  onClick?: () => void
  /** Classes CSS adicionais */
  className?: string
}

/**
 * Componente de botão reutilizável com múltiplas variantes
 *
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Clique aqui
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick,
  className,
  ...props
}) => {
  // Component implementation
}
````

### MDX Documentation

````mdx
// src/components/common/ui/Button/Button.stories.mdx
import { Meta, Story, Canvas, ArgsTable } from '@storybook/addon-docs'
import { Button } from './Button'

<Meta
  title="Common/UI/Button"
  component={Button}
  parameters={{
    docs: {
      description: {
        component:
          'Um componente de botão reutilizável com múltiplas variantes e tamanhos'
      }
    }
  }}
/>

# Button

O componente Button é usado para ações principais na interface.

## Uso

```tsx
import { Button } from '@/components/common/ui/Button'

function MyComponent() {
  return (
    <Button variant="primary" onClick={handleClick}>
      Clique aqui
    </Button>
  )
}
```
````

```

## Variantes

<Canvas>
  <Story name="Primary">
    <Button variant="primary">Botão Primário</Button>
  </Story>
  <Story name="Secondary">
    <Button variant="secondary">Botão Secundário</Button>
  </Story>
  <Story name="Outline">
    <Button variant="outline">Botão Outline</Button>
  </Story>
</Canvas>

## Tamanhos

<Canvas>
  <Story name="Small">
    <Button size="small">Pequeno</Button>
  </Story>
  <Story name="Medium">
    <Button size="medium">Médio</Button>
  </Story>
  <Story name="Large">
    <Button size="large">Grande</Button>
  </Story>
</Canvas>

## Estados

<Canvas>
  <Story name="Disabled">
    <Button disabled>Desabilitado</Button>
  </Story>
  <Story name="Loading">
    <Button loading>Carregando...</Button>
  </Story>
</Canvas>

## Props

<ArgsTable of={Button} />
```

## Testes Visuais

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

### Screenshot Testing

```typescript
// src/components/common/ui/Button/Button.stories.tsx
export const ScreenshotTest: Story = {
  args: {
    variant: 'primary',
    children: 'Test Button'
  },
  parameters: {
    chromatic: {
      viewports: [320, 1200],
      delay: 1000
    }
  }
}
```

## Addons Específicos

### Accessibility Addon

```typescript
// Configuração do addon de acessibilidade
export const AccessibilityStory: Story = {
  args: {
    variant: 'primary',
    children: 'Acessível'
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'button-name',
            enabled: true
          },
          {
            id: 'color-contrast',
            enabled: true
          }
        ]
      }
    }
  }
}
```

### Viewport Addon

```typescript
// Stories responsivos
export const Responsive: Story = {
  args: {
    variant: 'primary',
    children: 'Responsivo'
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile'
    }
  }
}
```

### Backgrounds Addon

```typescript
// Stories com diferentes backgrounds
export const DarkBackground: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Claro'
  },
  parameters: {
    backgrounds: {
      default: 'dark'
    }
  }
}
```

## Organização de Stories por Funcionalidade

### Stories de Estado

```typescript
// Stories focados em estados do componente
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <Button variant="primary">Normal</Button>
      <Button variant="primary" disabled>Desabilitado</Button>
      <Button variant="primary" loading>Carregando</Button>
      <Button variant="primary" size="small">Pequeno</Button>
      <Button variant="primary" size="large">Grande</Button>
    </div>
  )
}
```

### Stories de Interação

```typescript
// Stories focados em interações
export const Interactions: Story = {
  args: {
    variant: 'primary',
    children: 'Clique para testar'
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const button = canvas.getByRole('button')

    // Testar hover
    await userEvent.hover(button)

    // Testar clique
    await userEvent.click(button)

    // Testar foco
    await userEvent.tab()
  }
}
```

### Stories de Acessibilidade

```typescript
// Stories focados em acessibilidade
export const Accessibility: Story = {
  args: {
    variant: 'primary',
    children: 'Botão Acessível',
    'aria-label': 'Botão de ação principal',
    'aria-describedby': 'button-description'
  },
  render: (args) => (
    <div>
      <Button {...args} />
      <div id="button-description" style={{ display: 'none' }}>
        Este botão executa a ação principal da página
      </div>
    </div>
  )
}
```

## Scripts de Storybook

### Package.json Scripts

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook",
    "storybook:coverage": "test-storybook --coverage",
    "storybook:visual": "test-storybook --stories=**/*.visual.stories.tsx"
  }
}
```

## Conclusão

A organização do Storybook no Heroes Catalog garante:

- **Documentação Clara**: Estrutura hierárquica bem definida
- **Desenvolvimento Eficiente**: Componentes isolados e testáveis
- **Acessibilidade**: Testes automáticos de acessibilidade
- **Responsividade**: Testes em múltiplos viewports
- **Interatividade**: Stories com interações complexas
- **Visual Testing**: Regressão visual automatizada
- **Documentação Automática**: JSDoc e MDX integrados
