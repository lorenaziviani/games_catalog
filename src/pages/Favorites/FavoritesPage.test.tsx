import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import FavoritesPage from './index'

jest.mock('@/types/common', () => ({
  DEFAULT_SORT: 'name-asc',
  ElementType: {
    TITLE: 'h1',
    P: 'p'
  },
  TextVariant: {
    PRIMARY: 'primary',
    TERTIARY: 'tertiary'
  }
}))

jest.mock('@hooks/useFavorites', () => ({
  useFavorites: () => ({
    favorites: [],
    filterDataFromFavorites: jest.fn(() => ({
      genres: [],
      platforms: [],
      stores: [],
      tags: []
    })),
    clearAllFavorites: jest.fn()
  })
}))

jest.mock('@hooks/useFilters', () => ({
  useFilters: () => ({
    filters: {},
    hasActiveFilters: false,
    activeFiltersCount: 0,
    handleFilterChange: jest.fn(),
    handleResetFilters: jest.fn()
  })
}))

jest.mock('@hooks/useSort', () => ({
  useSort: () => ({
    sortedGames: [],
    currentSort: 'name-asc',
    handleSortChange: jest.fn()
  })
}))

jest.mock('@/utils/gameUtils', () => ({
  extractGameGenresIds: jest.fn(() => []),
  extractGamePlatformsIds: jest.fn(() => []),
  extractGameStoresIds: jest.fn(() => []),
  extractGameTagsIds: jest.fn(() => []),
  isGameMatchingFilterIds: jest.fn(() => true)
}))

jest.mock('@/utils/scrollUtils', () => ({
  scrollToTop: jest.fn()
}))

jest.mock('@/config/env', () => ({
  env: {
    DEFAULT_PAGE_SIZE: 20
  }
}))

jest.mock('react-icons/fa', () => ({
  FaHeart: () => <div>Heart Icon</div>
}))

jest.mock('@components/common/forms/filters', () => {
  return function MockFilters() {
    return <div data-testid="filters">Filters Component</div>
  }
})

jest.mock('@components/common/forms/Sort', () => {
  return function MockSort() {
    return <div data-testid="sort">Sort Component</div>
  }
})

jest.mock('@components/game/GameListWithModal', () => {
  return function MockGameListWithModal() {
    return <div data-testid="game-list">GameList Component</div>
  }
})

jest.mock('@components/common/layout/Banner', () => {
  return function MockBanner({ children }: { children: React.ReactNode }) {
    return <div data-testid="banner">{children}</div>
  }
})

jest.mock('@components/common/ui/Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>
  }
})

jest.mock('@components/game/Stats', () => {
  return function MockStats() {
    return <div data-testid="stats">Stats Component</div>
  }
})

describe('FavoritesPage', () => {
  it('deve renderizar todos os componentes principais', () => {
    render(<FavoritesPage />)

    expect(screen.getByTestId('banner')).toBeInTheDocument()
    expect(screen.getByTestId('stats')).toBeInTheDocument()
    expect(screen.getByTestId('filters')).toBeInTheDocument()
    expect(screen.getByTestId('sort')).toBeInTheDocument()
    expect(screen.getByTestId('game-list')).toBeInTheDocument()
  })

  it('deve renderizar o conteúdo do banner', () => {
    render(<FavoritesPage />)

    expect(screen.getByText('Sua Biblioteca de Jogos')).toBeInTheDocument()
    expect(
      screen.getByText(/Gerencie seus jogos favoritos/)
    ).toBeInTheDocument()
  })
})
