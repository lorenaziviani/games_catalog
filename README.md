# 🎮 Games Catalog - Sistema de Catálogo de Jogos

## Visão Geral

O **Games Catalog** é uma aplicação React TypeScript de nível empresarial que demonstra as melhores práticas de desenvolvimento frontend, incluindo arquitetura limpa, performance otimizada, testes abrangentes e ferramentas profissionais.

## Arquitetura do Sistema

### **Diagrama da Arquitetura**

![Diagrama da Arquitetura do Sistema](./docs/architecture.drawio.png)

### **Stack Tecnológica Principal**

- **React 19** - Framework de UI moderno
- **TypeScript** - Segurança de tipos rigorosa
- **Vite** - Build tool e dev server otimizado
- **Styled Components** - CSS-in-JS com tema dinâmico

### **Gerenciamento de Estado Avançado**

- **React Query (TanStack Query)** - Gerenciamento de estado do servidor
- **Cache Inteligente** - Estratégia de cache otimizada
- **Retry Logic** - Lógica de retry inteligente
- **Optimistic Updates** - Atualizações otimistas para melhor UX
- **Background Refetching** - Atualização em background

### **Qualidade de Código e Padrões**

- **ESLint** - Análise estática de código
- **Prettier** - Formatação automática
- **Husky** - Git hooks para qualidade
- **Lint-Staged** - Validação pré-commit
- **TypeScript Strict Mode** - Configuração rigorosa de tipos

### **Testes Abrangentes**

- **Storybook** - Documentação e teste de componentes
- **Jest** - Framework de testes unitários
- **React Testing Library** - Testes de componentes
- **Playwright** - Testes end-to-end
- **Cobertura de Testes** - Relatórios de cobertura

### **Otimização de Performance**

- **Cache Inteligente** - Cache de requisições otimizado
- **Debounce de Busca** - Otimização de busca em tempo real
- **Pré-busca de Dados** - Carregamento antecipado
- **Cancelamento de Requisições** - AbortController para requisições
- **React.memo** - Otimização de re-renderização

### **Segurança e Ambiente**

- **Variáveis de Ambiente** - Configuração segura
- **Validação de Entrada** - Sanitização de dados
- **Configuração CORS** - Cross-origin resource sharing
- **Gerenciamento Seguro de API Key** - Chaves protegidas
- **HTTPS Enforcement** - Forçar conexões seguras

### **Arquitetura Limpa**

- **Clean Code Principles** - Código limpo e legível
- **SOLID Principles** - Princípios de design orientado a objetos
- **Separação de Responsabilidades** - Organização modular
- **Type Safety** - Enums e interfaces tipadas
- **Custom Hooks Pattern** - Reutilização de lógica

### **Estratégia Avançada de API**

- **React Query Senior Level** - Configuração avançada
- **Error Handling** - Tratamento robusto de erros
- **URL Construction** - Construção inteligente de URLs
- **Custom Headers** - Headers personalizados
- **Timeout Handling** - Tratamento de timeouts

### **Sistema de Design**

- **Tema Claro/Escuro** - Sistema de tema dinâmico
- **Design Tokens** - Tokens de design centralizados
- **Design Responsivo** - Adaptação a diferentes telas
- **Acessibilidade** - Recursos de acessibilidade
- **Componentes Reutilizáveis** - Biblioteca de componentes

### **Workflow de Desenvolvimento**

- **Git Version Control** - Controle de versão
- **Feature Branches** - Estratégia de branches
- **CI/CD Pipeline** - Integração e deploy contínuos
- **Deploy Automatizado** - Deploy automático
- **Performance Monitoring** - Monitoramento de performance

### **Observabilidade e Monitoramento**

- **LogRocket Integration** - Captura de erros, performance e analytics
- **Error Tracking** - Stack traces detalhados e relatórios
- **Performance Monitoring** - Métricas de Core Web Vitals
- **User Analytics** - Tracking de eventos e comportamento
- **API Monitoring** - Monitoramento de chamadas de API
- **Real-time Alerts** - Alertas em tempo real

![Observabilidade](./docs/logRocket.png)

## 🚀 CI/CD Pipeline

### **Pipeline Completo**

O projeto possui um pipeline de CI/CD robusto configurado com GitHub Actions:

#### **Workflows Disponíveis:**

1. **CI/CD Principal** (`ci-cd.yml`)
   - Code Quality (ESLint, Prettier, TypeScript)
   - Unit Tests (Jest com cobertura)
   - Build (Vite)
   - E2E Tests (Playwright)
   - Deploy (GitHub Pages)

2. **Security & Dependencies** (`security.yml`)
   - Security Audit (npm audit)
   - Dependency Review
   - Weekly automated checks

3. **Performance & Bundle** (`performance.yml`)
   - Bundle Analysis
   - Lighthouse Performance Tests

4. **Playwright Tests** (`playwright.yml`)
   - Dedicated E2E testing

#### **Execução Local:**

```bash
# Executar pipeline completo localmente
npm run test:all

# Executar apenas testes CI
npm run test:ci

# Verificar segurança
npm run security:audit
npm run security:outdated
```

#### **Configuração:**

- **Node.js**: v20
- **Cache**: npm dependencies
- **Artifacts**: 30 dias de retenção
- **Timeout**: 10-60 minutos por job

#### **Deploy Automático:**

- **Trigger**: Push para `main`/`master`
- **Platform**: GitHub Pages
- **Branch**: `gh-pages`
- **Custom Domain**: Configurável via secret `CNAME`

#### **Monitoramento:**

- **Cobertura**: Mínimo 80%
- **Performance**: Score mínimo 0.8
- **Acessibilidade**: Score mínimo 0.9
- **Build Time**: Máximo 10 minutos

**Documentação Completa**: [docs/CI-CD.md](./docs/CI-CD.md)

## Husky - Git Hooks

### **O que é o Husky?**

O **Husky** é uma ferramenta que permite executar scripts Git hooks de forma fácil e confiável. Ele garante que certas ações sejam executadas automaticamente antes de commits, pushes e outros eventos Git.

### **Configuração no Projeto**

```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
      "pre-push": "npm run test"
    }
  }
}
```

### **Hooks Implementados**

#### **Pre-commit Hook**

- **Função**: Executa antes de cada commit
- **Ações**:
  - **Lint-staged**: Executa ESLint e Prettier apenas nos arquivos modificados
  - **TypeScript Check**: Verifica tipos TypeScript
  - **Testes Unitários**: Executa testes básicos
  - **Build Check**: Verifica se o projeto compila

#### **Commit-msg Hook**

- **Função**: Valida a mensagem do commit
- **Ações**:
  - **Commitlint**: Verifica formato da mensagem
  - **Conventional Commits**: Padrão de commits semânticos
  - **Tamanho da Mensagem**: Limita tamanho da mensagem

#### **Pre-push Hook**

- **Função**: Executa antes de cada push
- **Ações**:
  - **Testes Completos**: Executa toda a suíte de testes
  - **Build de Produção**: Verifica build para produção
  - **Cobertura de Testes**: Verifica cobertura mínima

## Estrutura do Projeto

```
heroes_catalog/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Banner/         # Componente de banner com badge
│   │   ├── Card/           # Card de jogo
│   │   ├── FavoriteButton/ # Botão de favoritar
│   │   ├── Filters/        # Sistema de filtros
│   │   │   ├── DateRangeFilter/    # Filtro de data
│   │   │   ├── MultiSelectFilter/  # Filtro de seleção múltipla
│   │   │   ├── TextFilter/         # Filtro de texto
│   │   │   ├── RangeSlider/        # Slider de range
│   │   │   └── FilterSection/      # Seção de filtros
│   │   ├── GameGrid/       # Grid de jogos
│   │   ├── GamesList/      # Lista de jogos
│   │   ├── Header/         # Cabeçalho
│   │   ├── Image/          # Componente de imagem
│   │   ├── Info/           # Informações
│   │   ├── List/           # Lista reutilizável (home/favoritos)
│   │   ├── LoadingSpinner/ # Spinner de carregamento
│   │   ├── MetacriticScore/ # Score do Metacritic
│   │   ├── Pagination/     # Paginação
│   │   ├── RatingBadge/    # Badge de rating
│   │   ├── SearchBar/      # Barra de busca
│   │   ├── Sort/           # Componente de ordenação
│   │   ├── Stats/          # Componente de estatísticas
│   │   ├── Tag/            # Tag
│   │   ├── TagsContainer/  # Container de tags
│   │   ├── Text/           # Componente de texto
│   │   ├── ThemeButton/    # Botão de tema
│   │   ├── AccessibilityButton/ # Sistema de acessibilidade
│   │   │   ├── index.tsx   # Componente principal
│   │   │   ├── styles.ts   # Estilos styled-components
│   │   │   ├── AccessibilityButton.test.tsx # Testes unitários
│   │   │   └── AccessibilityButton.stories.tsx # Storybook
│   │   └── index.ts        # Exportações
│   ├── config/             # Configurações
│   │   ├── api.ts          # Configuração de API
│   │   └── env.ts          # Variáveis de ambiente
│   ├── hooks/              # Custom hooks
│   │   ├── useFavorites.ts # Hook para favoritos
│   │   ├── useGameData.ts  # Hook para dados de jogos
│   │   ├── useFilters.ts   # Hook para filtros
│   │   ├── useGames.ts     # Hook para jogos
│   │   ├── useSort.ts      # Hook para ordenação
│   │   ├── useAccessibility.ts # Hook para acessibilidade
│   │   └── useTheme.ts     # Hook para gerenciamento de temas
│   ├── pages/              # Páginas
│   │   ├── Favorites/      # Página de favoritos
│   │   └── Home/           # Página inicial
│   ├── routes/             # Rotas
│   │   └── index.tsx       # Configuração de rotas
│   ├── services/           # Serviços
│   │   └── gamesApi.ts     # API de jogos
│   ├── store/              # Redux Store
│   │   ├── favorites/      # Slice de favoritos
│   │   │   ├── actions.ts  # Actions assíncronas
│   │   │   ├── index.ts    # Exportações
│   │   │   ├── reducer.ts  # Reducer síncrono
│   │   │   ├── selectors.ts # Seletores memoizados
│   │   │   ├── types.ts    # Tipos do slice
│   │   │   └── utils.ts    # Utilitários do localStorage
│   │   └── index.ts        # Configuração do store
│   ├── styles/             # Estilos
│   │   ├── breakpoint.ts   # Breakpoints responsivos
│   │   ├── fontSize.ts     # Tamanhos de fonte
│   │   ├── global.ts       # Estilos globais (incluindo acessibilidade)
│   │   ├── size.ts         # Sistema de tamanhos
│   │   └── theme.ts        # Temas (incluindo temas de acessibilidade)
│   ├── types/              # Tipos TypeScript
│   │   ├── common.ts       # Tipos comuns (enums, constantes, acessibilidade)
│   │   ├── filter.ts       # Tipos de filtros
│   │   ├── game.ts         # Tipos de jogo
│   │   └── theme.d.ts      # Tipos de tema
│   ├── utils/              # Utilitários
│   │   ├── api.ts          # Utilitários de API
│   │   ├── scrollUtils.ts  # Utilitários de scroll
│   │   ├── test-utils.tsx  # Utilitários de teste
│   │   └── themeUtils.ts   # Utilitários de tema
│   ├── App.tsx             # Componente principal
│   └── main.tsx            # Entry point
├── docs/                   # Documentação
│   ├── architecture.drawio.png # Diagrama de arquitetura
│   ├── favorite-flow.drawio.png # Diagrama do fluxo de favoritos
│   └── filter-flow.md      # Fluxo do sistema de filtros
├── e2e/                    # Testes end-to-end
├── public/                 # Arquivos públicos
└── tests-examples/         # Exemplos de testes
```

## Funcionalidades Implementadas

### **Funcionalidades Atuais**

#### **Catálogo de Jogos**

- **Listagem de Jogos**: Exibição de jogos populares da API RAWG
- **Busca em Tempo Real**: Busca otimizada com debounce
- **Paginação**: Navegação entre páginas com scroll automático
- **Filtros Avançados**: Filtros por gênero, plataforma, rating
- **Ordenação**: Ordenação por nome, rating, data de lançamento
- **Detalhes do Jogo**: Informações completas de cada jogo
- **Responsividade**: Design adaptativo para diferentes telas

#### **Sistema de Filtros Avançado**

O sistema de filtros foi desenvolvido de forma centralizada, oferecendo uma experiência robusta e consistente de filtragem de jogos.

##### **Funcionalidades Principais:**

- **Filtros Múltiplos**: Gêneros, plataformas, lojas, tags
- **Filtro de Data**: Range de datas de lançamento
- **Filtro de Rating**: Range de avaliação Metacritic
- **Filtro de Texto**: Busca por nome do jogo
- **Persistência Local**: Filtros salvos automaticamente
- **Reset de Filtros**: Limpeza fácil de todos os filtros
- **Contadores Ativos**: Indicadores de filtros ativos
- **Componentes Reutilizáveis**: Filtros modulares e testáveis

##### **Componentes de Filtro:**

- **DateRangeFilter**: Filtro de range de datas
- **MultiSelectFilter**: Filtro de seleção múltipla
- **TextFilter**: Filtro de texto
- **RangeSlider**: Slider de range para ratings
- **FilterSection**: Seção organizadora de filtros

##### **Arquitetura do Sistema de Filtros:**

![Diagrama do Fluxo de Filtros](./docs/filter-flow.drawio.png)

O diagrama ilustra o fluxo completo do sistema de filtros, incluindo:

1. **Inicialização**: Carregamento de dados e filtros salvos
2. **Aplicação de Filtros**: Processamento de filtros ativos
3. **Busca na API**: Construção de parâmetros de busca
4. **Cache e Performance**: Otimização de requisições
5. **Interface do Usuário**: Feedback visual e interação

##### **Tecnologias Utilizadas:**

- **React Query**: Cache inteligente e sincronização
- **TypeScript Enums**: Tipos centralizados em `common.ts`
- **Custom Hooks**: useFilters, useGameData, useGames
- **Styled Components**: Design responsivo e tema dinâmico
- **localStorage**: Persistência de filtros

##### **Constantes Centralizadas:**

```typescript
// Filtros
export const FILTER_FIELDS = {
  GENRES: 'genres',
  PLATFORMS: 'platforms',
  STORES: 'stores',
  TAGS: 'tags'
} as const

// Datas
export const DATE_RANGE_DEFAULTS = {
  START: '1960-01-01',
  END: '2030-12-31'
} as const

// API
export const API_QUERY_PARAMS = {
  SEARCH: 'search',
  GENRES: 'genres',
  PLATFORMS: 'platforms',
  STORES: 'stores',
  TAGS: 'tags',
  DATES: 'dates',
  METACRITIC: 'metacritic'
} as const
```

#### **Sistema de Favoritos Completo**

O sistema de favoritos foi implementado com Redux Toolkit e localStorage para persistência de dados, oferecendo uma experiência completa de gerenciamento de jogos favoritos.

##### **Funcionalidades Principais:**

- **Página de Favoritos Dedicada**: Interface completa para gerenciar favoritos
- **Redux State Management**: Gerenciamento de estado centralizado com Redux Toolkit
- **Persistência Local**: Dados salvos automaticamente no localStorage
- **Paginação Inteligente**: Paginação local com scroll automático ao topo
- **Sistema de Ordenação**: Ordenação por nome, avaliação, data de lançamento, data de adição
- **Estatísticas em Tempo Real**: Contadores de total de jogos, avaliação média, gêneros únicos, plataformas únicas
- **Funcionalidade "Limpar Todos"**: Botão para limpar todos os favoritos com confirmação
- **Componentes Reutilizáveis**: Banner, Sort, Stats, List adaptados para favoritos

##### **Componentes Específicos:**

- **Banner Component**: Componente reutilizável com badge personalizável e conteúdo flexível
- **Sort Component**: Sistema de ordenação com enum centralizado em `common.ts`
- **Stats Component**: Exibição de estatísticas dos favoritos (total, média, gêneros, plataformas)
- **List Component**: Lista reutilizável para home e favoritos com configurações específicas

##### **Arquitetura do Sistema de Favoritos:**

![Diagrama do Fluxo de Favoritos](./docs/favorite-flow.drawio.png)

O diagrama ilustra o fluxo completo do sistema de favoritos, incluindo:

1. **Favoritar um Jogo**: Interação do usuário → Hook → Redux Action → Reducer → localStorage
2. **Carregar Favoritos**: App → Hook → Async Thunk → Reducer → localStorage → State
3. **Filtrar Favoritos**: Selector Memoizado → Filtros específicos → Componente
4. **Ordenar Favoritos**: Selector Memoizado → Ordenação → Componente

##### **Tecnologias Utilizadas:**

- **Redux Toolkit**: Gerenciamento de estado com createSlice, createAsyncThunk
- **localStorage**: Persistência de dados no navegador
- **TypeScript Enums**: Tipos centralizados em `common.ts` (SortOption, SORT_OPTIONS, DEFAULT_SORT)
- **Custom Hooks**: useFavorites, useIsFavorite, useFavoritesStats, useSort
- **Styled Components**: Design responsivo e tema dinâmico
- **React Query**: Integração com cache para otimização

##### **Configuração de Ambiente:**

O sistema utiliza variáveis de ambiente para configuração flexível:

```typescript
// src/config/env.ts
DEFAULT_PAGE_SIZE: getEnvVar('VITE_DEFAULT_PAGE_SIZE', 20, toNumber)
```

##### **Estrutura de Dados:**

```typescript
// src/store/favorites/types.ts
interface FavoritesState {
  favorites: Game[]
  isLoading: boolean
  error: string | null
}
```

##### **Hooks Personalizados:**

- **useFavorites**: Hook principal para gerenciar favoritos
- **useIsFavorite**: Hook para verificar se um jogo é favorito
- **useFavoritesStats**: Hook para calcular estatísticas
- **useSort**: Hook para ordenação de jogos

##### **Utilitários:**

- **scrollToTop**: Utilitário para scroll automático ao topo
- **favoritesStorage**: Utilitários para localStorage
- **selectors**: Seletores memoizados para performance

#### **Sistema de Design**

- **Tema Claro/Escuro** - Sistema de tema dinâmico
- **Design Tokens** - Tokens de design centralizados
- **Design Responsivo** - Adaptação a diferentes telas
- **Componentes Reutilizáveis** - Biblioteca de componentes

#### **Sistema de Acessibilidade Avançado**

O projeto implementa um sistema completo de acessibilidade com múltiplas funcionalidades para garantir uma experiência inclusiva para todos os usuários.

##### **Funcionalidades de Acessibilidade:**

- **Modos de Cor Adaptativos**
  - **Modo Normal**: Cores padrão do design system
  - **Modo Daltonismo**: Paleta de cores otimizada para deuteranopia
  - **Modo Alto Contraste**: Cores de alto contraste para melhor visibilidade

- **Ajustes de Texto**
  - **Tamanho Normal**: Fonte padrão do sistema
  - **Tamanho Grande**: Aumento de 20% no tamanho da fonte
  - **Tamanho Extra Grande**: Aumento de 40% no tamanho da fonte

- **Redução de Movimento**
  - **Animações Reduzidas**: Para usuários sensíveis a movimento
  - **Transições Suaves**: Mantém funcionalidade sem causar desconforto

- **Interface Adaptativa**
  - **Botão de Acessibilidade**: Menu centralizado com todas as opções
  - **Persistência Local**: Configurações salvas automaticamente
  - **Integração com Tema**: Modos de acessibilidade integrados ao sistema de temas

##### **Componentes de Acessibilidade:**

- **AccessibilityButton**: Botão principal com menu dropdown
  - Localização: `src/components/common/ui/AccessibilityButton/`
  - Funcionalidades: Modos de cor, tamanho de fonte, redução de movimento
  - Testes: Jest unit tests e Storybook stories
  - Documentação: Componentes isolados e interativos

##### **Arquitetura do Sistema de Acessibilidade:**

```typescript
// Tipos centralizados
export enum AccessibilityMode {
  NORMAL = 'normal',
  COLORBLIND = 'colorblind',
  HIGH_CONTRAST = 'highContrast'
}

export enum FontSize {
  NORMAL = 'normal',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large'
}

// Hook principal
export const useAccessibility = () => {
  // Gerencia configurações de acessibilidade
  // Persiste no localStorage
  // Aplica CSS classes dinamicamente
}

// Integração com tema
const { setTheme } = useTheme()
const handleModeChange = (mode: AccessibilityMode) => {
  setMode(mode)
  if (setTheme) {
    setTheme(ThemeMode.COLORBLIND) // Aplica tema imediatamente
  }
}
```

##### **Como Usar:**

1. **Acesse** o botão de acessibilidade (ícone de cadeira de rodas) no header
2. **Selecione** o modo desejado:
   - **Normal**: Cores padrão
   - **Amigável para Daltonismo**: Cores adaptadas
   - **Alto Contraste**: Alto contraste
3. **Ajuste** o tamanho da fonte se necessário
4. **Ative** redução de movimento se sensível a animações
5. **Use** "Restaurar Padrão" para voltar às configurações iniciais

## 📋 TODO List - Funcionalidades Pendentes

### **Visualização de Jogo**

- [ ] **Página de Detalhes**
  - [ ] Informações completas do jogo
- [ ] **Galeria de Mídia**
  - [ ] Carrossel de screenshots
  - [ ] Vídeos de gameplay
  - [ ] Zoom em imagens
  - [ ] Lightbox para visualização

## Como Executar

### **Pré-requisitos**

- Node.js 18+
- npm ou yarn

### **Instalação**

```bash
# Clone o repositório
git clone https://github.com/lorenaziviani/heroes-catalog.git
cd heroes-catalog

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### **Desenvolvimento**

```bash
# Inicie o servidor de desenvolvimento
npm run dev

# Abra http://localhost:5173
```

### **Build**

```bash
# Build para produção
npm run build

# Preview da build
npm run preview
```

### **Testes**

```bash
# Testes unitários
npm run test

# Testes com coverage
npm run test:coverage

# Testes e2e
npm run test:e2e

# Storybook
npm run storybook
```

### **Testando Acessibilidade**

```bash
# Testes específicos de acessibilidade
npm test -- src/components/common/ui/AccessibilityButton/

# Storybook para visualizar componentes de acessibilidade
npm run storybook
# Acesse: http://localhost:6006
# Navegue para: Common/UI/AccessibilityButton
```

#### **Como Testar Manualmente:**

1. **Modos de Cor:**
   - Clique no botão de acessibilidade (ícone de cadeira de rodas)
   - Teste "Amigável para Daltonismo" - cores devem mudar imediatamente
   - Teste "Alto Contraste" - interface deve ficar com alto contraste
   - Verifique se o botão de dark mode desaparece durante modos de acessibilidade

2. **Tamanho de Fonte:**
   - Selecione "Grande" ou "Extra Grande"
   - Verifique se o texto aumenta em toda a aplicação
   - Teste a persistência recarregando a página

3. **Redução de Movimento:**
   - Ative "Reduzir Movimento"
   - Verifique se as animações ficam mais suaves
   - Teste hover e transições de componentes

4. **Persistência:**
   - Configure diferentes opções
   - Recarregue a página
   - Verifique se as configurações foram mantidas

### **Qualidade de Código**

```bash
# Lint
npm run lint

# Lint com fix
npm run lint:fix

# Type check
npm run type-check
```

## Documentação

- [Arquitetura do Sistema](./docs/architecture.md)
- [Guia de Componentes](./docs/components.md)
- [Padrões de Código](./docs/coding-standards.md)
- [Guia de Testes](./docs/testing.md)
- [Deploy e CI/CD](./docs/deployment.md)

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
