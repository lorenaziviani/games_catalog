# Arquitetura do Sistema - Heroes Catalog

## Visão Geral

O Heroes Catalog implementa uma arquitetura limpa e escalável baseada em princípios de Domain-Driven Design (DDD) e Clean Architecture. O sistema é organizado em camadas bem definidas, com separação clara de responsabilidades.

## Princípios Arquiteturais

### Clean Architecture

- **Independência de Frameworks**: A lógica de negócio é isolada de frameworks externos
- **Testabilidade**: Componentes facilmente testáveis através de inversão de dependência
- **Independência de UI**: A interface pode ser alterada sem afetar a lógica de negócio
- **Independência de Banco de Dados**: A lógica de negócio não depende de detalhes de persistência

### Domain-Driven Design (DDD)

- **Entidades**: `Game`, `GameCollection` - objetos com identidade e ciclo de vida
- **Repositórios**: `IGameRepository`, `IFavoritesRepository` - abstrações para acesso a dados
- **Serviços de Domínio**: `GameDomainService` - lógica de negócio complexa
- **Agregados**: `GameCollection` - grupos de entidades tratadas como uma unidade

### Component-Based Architecture

- **Componentes Atômicos**: UI components reutilizáveis e independentes
- **Composição**: Componentes complexos construídos a partir de componentes simples
- **Props Interface**: Contratos bem definidos entre componentes
- **Custom Hooks**: Lógica de negócio reutilizável

## Estrutura de Camadas

### 1. Presentation Layer (UI)

```
src/components/
├── common/          # Componentes reutilizáveis
│   ├── ui/         # UI components (Button, Text, etc.)
│   ├── layout/     # Layout components (Header, Banner)
│   └── forms/      # Form components (Filters, Sort)
├── game/           # Componentes específicos de jogos
└── features/       # Componentes de funcionalidades
```

**Responsabilidades:**

- Renderização da interface
- Interação com o usuário
- Composição de componentes
- Gerenciamento de estado local

### 2. Application Layer (Hooks)

```
src/hooks/
├── useGameData.ts      # Dados de filtros e metadados
├── useFilters.ts       # Estado e lógica de filtros
├── useGames.ts         # Busca principal de jogos
├── useSearch.ts        # Busca com debounce
├── usePagination.ts    # Paginação
├── useFavorites.ts     # Gerenciamento de favoritos
└── useAccessibility.ts # Configurações de acessibilidade
```

**Responsabilidades:**

- Orquestração de serviços
- Gerenciamento de estado local
- Lógica de apresentação
- Integração entre camadas

### 3. Domain Layer (Entidades e Serviços)

```
src/domain/
├── entities/
│   └── Game.ts         # Entidade principal
├── aggregates/
│   └── GameCollection.ts # Agregado de jogos
├── repositories/
│   ├── IGameRepository.ts
│   └── IFavoritesRepository.ts
└── services/
    └── GameDomainService.ts
```

**Responsabilidades:**

- Lógica de negócio
- Regras de domínio
- Entidades e agregados
- Interfaces de repositórios

### 4. Infrastructure Layer (Serviços e Repositórios)

```
src/infrastructure/
├── container/
│   └── DDDContainer.ts # Injeção de dependências
└── repositories/
    ├── GameRepository.ts
    └── FavoritesRepository.ts
```

**Responsabilidades:**

- Implementação de repositórios
- Acesso a dados externos
- Configuração de serviços
- Persistência de dados

### 5. Services Layer (APIs e Utilitários)

```
src/services/
├── ServiceContainer.ts      # Container de serviços
├── GameService.ts          # API de jogos
├── metadataService.ts      # Dados de filtros
├── observability/
│   ├── ObservabilityService.ts
│   └── providers/
│       ├── ConsoleProvider.ts
│       └── LogRocketProvider.ts
└── interfaces/
    ├── IGameService.ts
    ├── IMetadataService.ts
    └── IObservabilityService.ts
```

**Responsabilidades:**

- Comunicação com APIs externas
- Configuração de serviços
- Observabilidade e monitoramento
- Utilitários e helpers

## Padrões de Design Implementados

### 1. Service Container (Singleton)

```typescript
export class ServiceContainer {
  private static instance: ServiceContainer
  private gameService: IGameService
  private metadataService: IMetadataService
  private favoritesService: FavoritesService
  private observabilityService: ObservabilityService

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer()
    }
    return ServiceContainer.instance
  }
}
```

**Benefícios:**

- Injeção de dependências centralizada
- Facilita testes unitários
- Reduz acoplamento entre componentes
- Configuração única de serviços

### 2. Repository Pattern

```typescript
interface IGameRepository {
  getGames(params: GameSearchParams): Promise<GameResponse>
  getGameById(id: number): Promise<Game>
}

interface IFavoritesRepository {
  saveFavorites(favorites: Game[]): void
  loadFavorites(): Game[]
  clearFavorites(): void
}
```

**Benefícios:**

- Abstração do acesso a dados
- Facilita mudanças na fonte de dados
- Melhora testabilidade
- Separação de responsabilidades

### 3. Custom Hooks Pattern

```typescript
export const useGameData = () => {
  const metadataService = serviceContainer.getMetadataService()
  const [gameData, setGameData] = useState<GameDataState>()

  // Lógica de negócio encapsulada
  return { gameData, loading, error }
}
```

**Benefícios:**

- Reutilização de lógica
- Encapsulamento de estado
- Facilita testes
- Melhora legibilidade

### 4. Redux Toolkit (State Management)

```typescript
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      // Lógica de negócio
    }
  },
  extraReducers: builder => {
    // Async actions
  }
})
```

**Benefícios:**

- Gerenciamento centralizado de estado
- DevTools para debugging
- Imutabilidade automática
- Middleware para side effects

## Fluxo de Dados

### 1. Inicialização da Aplicação

```
App Component
    ↓
Service Container (getInstance)
    ↓
useGameData Hook
    ↓
MetadataService
    ↓
React Query (Cache)
    ↓
API Externa
```

### 2. Busca de Jogos

```
useGames Hook
    ↓
GameService
    ↓
buildApiParams (Utils)
    ↓
API Externa
    ↓
React Query (Cache)
    ↓
Component UI
```

### 3. Gerenciamento de Favoritos

```
useFavorites Hook
    ↓
Redux Action
    ↓
FavoritesService
    ↓
localStorage
    ↓
Redux State
    ↓
Component UI
```

## Configuração de Ambiente

### Variáveis de Ambiente

```typescript
// src/config/env.ts
export const config = {
  API_BASE_URL: getEnvVar('VITE_API_BASE_URL', 'https://api.rawg.io/api'),
  API_KEY: getEnvVar('VITE_API_KEY', ''),
  DEFAULT_PAGE_SIZE: getEnvVar('VITE_DEFAULT_PAGE_SIZE', 20, toNumber),
  CACHE_STALE_TIME: getEnvVar('VITE_CACHE_STALE_TIME', 5 * 60 * 1000, toNumber),
  RETRY_ATTEMPTS: getEnvVar('VITE_RETRY_ATTEMPTS', 3, toNumber)
}
```

### Service Container Configuration

```typescript
// src/services/ServiceContainer.ts
private constructor() {
  this.observabilityService = new ObservabilityService({
    enabled: true,
    providers: [new ConsoleProvider(), new LogRocketProvider()]
  })
  this.metadataService = new MetadataService()
  this.gameService = new GameService(this.observabilityService)
  this.favoritesService = new FavoritesService(
    new LocalStorageFavoritesRepository()
  )
}
```

## Observabilidade

### LogRocket Integration

```typescript
// src/services/observability/providers/LogRocketProvider.ts
export class LogRocketProvider implements IObservabilityProvider {
  init(): void {
    LogRocket.init('your-app-id')
  }

  captureError(error: Error): void {
    LogRocket.captureException(error)
  }
}
```

### Console Provider

```typescript
// src/services/observability/providers/ConsoleProvider.ts
export class ConsoleProvider implements IObservabilityProvider {
  log(level: string, message: string, data?: any): void {
    console[level](message, data)
  }
}
```

## Performance e Otimização

### React Query Configuration

```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000 // 10 minutos
    }
  }
})
```

### Bundle Optimization

- **Code Splitting**: Lazy loading de componentes
- **Tree Shaking**: Eliminação de código não utilizado
- **Dynamic Imports**: Importação dinâmica de módulos
- **Bundle Analysis**: Análise contínua do bundle

## Segurança

### API Key Management

```typescript
// Configuração segura de API key
const API_KEY = getEnvVar('VITE_API_KEY', '')
if (!API_KEY) {
  throw new Error('API key is required')
}
```

### Input Validation

```typescript
// Validação de entrada
const validateGameData = (data: any): Game => {
  if (!data.id || !data.name) {
    throw new Error('Invalid game data')
  }
  return data
}
```

## Testabilidade

### Arquitetura Testável

- **Inversão de Dependência**: Facilita mocks e stubs
- **Separação de Responsabilidades**: Testes isolados
- **Custom Hooks**: Testáveis independentemente
- **Service Container**: Facilita injeção de dependências

### Estratégia de Testes

- **Unit Tests**: Lógica de negócio e utilitários
- **Component Tests**: Comportamento de componentes
- **Integration Tests**: Interação entre camadas
- **E2E Tests**: Fluxos completos do usuário

## Escalabilidade

### Princípios de Escalabilidade

- **Modularidade**: Componentes independentes
- **Reutilização**: Hooks e componentes reutilizáveis
- **Configurabilidade**: Configuração flexível
- **Monitoramento**: Observabilidade contínua

### Estrutura Escalável

- **Feature-based Organization**: Organização por funcionalidade
- **Shared Components**: Componentes compartilhados
- **Service Layer**: Abstração de serviços
- **State Management**: Gerenciamento centralizado

## Conclusão

A arquitetura do Heroes Catalog foi projetada para ser:

- **Manutenível**: Código limpo e bem organizado
- **Testável**: Facilita testes em todas as camadas
- **Escalável**: Suporta crescimento do projeto
- **Performática**: Otimizações em todas as camadas
- **Observável**: Monitoramento contínuo
- **Segura**: Validação e configuração segura
