# 📚 Organização do Storybook

## 🎯 Visão Geral

O Storybook foi organizado para refletir a arquitetura de pastas do projeto, facilitando a navegação e manutenção dos componentes.

## 📁 Estrutura de Organização

### 🎮 **Game Components**

Componentes específicos para jogos e funcionalidades relacionadas a games.

```
Game/
├── Card/           # Card de jogo individual
├── GridCard/       # Grid de cards de jogos
├── Info/           # Informações do jogo
├── List/           # Lista de jogos
├── MetacriticScore/ # Score do Metacritic
├── RatingBadge/    # Badge de avaliação
├── Stats/          # Estatísticas do jogo
└── GameModal/      # Modal de detalhes do jogo
```

### 🎨 **Common Components**

Componentes reutilizáveis organizados por categoria.

#### **UI Components**

```
Common/UI/
├── AccessibilityButton/  # Botão de acessibilidade
├── Image/               # Componente de imagem
├── LoadingSpinner/      # Spinner de carregamento
├── Tag/                 # Tag individual
├── TagsContainer/       # Container de tags
└── Text/               # Componente de texto
```

#### **Layout Components**

```
Common/Layout/
├── Banner/             # Banner da aplicação
└── Header/             # Cabeçalho da aplicação
```

#### **Forms Components**

```
Common/Forms/
├── Sort/               # Componente de ordenação
└── Filters/            # Componentes de filtros
    ├── DateRangeFilter/
    ├── FilterSection/
    ├── MultiSelectFilter/
    ├── RangeSlider/
    └── TextFilter/
```

### ⚡ **Features Components**

Componentes específicos de funcionalidades.

```
Features/
├── Favorites/
│   └── FavoriteButton/  # Botão de favoritos
├── Navigation/
│   └── Pagination/      # Paginação
└── Theme/
    └── ThemeButton/     # Botão de tema
```

## 🔧 Configuração

### Arquivo de Configuração

```typescript
// .storybook/storybook-organization.ts
export const getStoryTitle = (filePath: string): string => {
  const pathMappings: Record<string, string> = {
    'game/Card': 'Game/Card',
    'common/ui/Text': 'Common/UI/Text',
    'features/favorites/FavoriteButton': 'Features/Favorites/FavoriteButton'
    // ... outros mapeamentos
  }

  return pathMappings[cleanPath] || `Components/${cleanPath}`
}
```

### Script de Atualização

```bash
# Atualizar títulos automaticamente
node scripts/update-storybook-titles.cjs
```

## 📋 Convenções

### Nomenclatura de Títulos

- **Game Components**: `Game/ComponentName`
- **Common UI**: `Common/UI/ComponentName`
- **Common Layout**: `Common/Layout/ComponentName`
- **Common Forms**: `Common/Forms/ComponentName`
- **Features**: `Features/Category/ComponentName`

### Estrutura de Arquivos

```
src/components/
├── game/
│   ├── Card/
│   │   ├── Card.stories.tsx
│   │   └── index.tsx
│   └── ...
├── common/
│   ├── ui/
│   ├── layout/
│   └── forms/
└── features/
    ├── favorites/
    ├── navigation/
    └── theme/
```

## 🚀 Benefícios

### ✅ **Organização Clara**

- Componentes agrupados por funcionalidade
- Fácil localização de componentes
- Hierarquia visual intuitiva

### ✅ **Manutenibilidade**

- Estrutura consistente
- Fácil adição de novos componentes
- Scripts automatizados

### ✅ **Desenvolvimento Eficiente**

- Navegação rápida no Storybook
- Documentação organizada
- Reutilização de componentes

## 📝 Como Adicionar Novos Componentes

### 1. **Criar o Componente**

```bash
mkdir src/components/game/NewComponent
touch src/components/game/NewComponent/index.tsx
touch src/components/game/NewComponent/NewComponent.stories.tsx
```

### 2. **Configurar o Story**

```typescript
// NewComponent.stories.tsx
const meta: Meta<typeof NewComponent> = {
  title: 'Game/NewComponent', // Seguir a convenção
  component: NewComponent
  // ... outras configurações
}
```

### 3. **Atualizar Mapeamento** (se necessário)

```typescript
// .storybook/storybook-organization.ts
const pathMappings = {
  // ... outros mapeamentos
  'game/NewComponent': 'Game/NewComponent'
}
```

## 🎨 Exemplos de Uso

### Game Components

```typescript
// Card.stories.tsx
title: 'Game/Card'

// GameModal.stories.tsx
title: 'Game/GameModal'
```

### Common UI Components

```typescript
// Text.stories.tsx
title: 'Common/UI/Text'

// Tag.stories.tsx
title: 'Common/UI/Tag'
```

### Features Components

```typescript
// FavoriteButton.stories.tsx
title: 'Features/Favorites/FavoriteButton'

// Pagination.stories.tsx
title: 'Features/Navigation/Pagination'
```

## 🔍 Verificação

Para verificar se todos os títulos estão corretos:

```bash
# Executar o script de verificação
node scripts/update-storybook-titles.cjs

# Iniciar o Storybook
npm run storybook
```

## 📊 Status Atual

- ✅ **Game Components**: 8 componentes organizados
- ✅ **Common UI**: 6 componentes organizados
- ✅ **Common Layout**: 2 componentes organizados
- ✅ **Common Forms**: 7 componentes organizados
- ✅ **Features**: 3 componentes organizados

**Total**: 26 componentes organizados no Storybook
