import { jest } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import HomePage from './index'

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

jest.mock('@hooks/useGames', () => ({
  useGames: () => ({
    games: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    handlePageChange: jest.fn(),
    filters: {},
    availableGenres: [],
    availablePlatforms: [],
    availableStores: [],
    availableTags: [],
    handleFilterChange: jest.fn(),
    handleResetFilters: jest.fn(),
    hasActiveFilters: false,
    activeFiltersCount: 0
  })
}))

jest.mock('@hooks/useSort', () => ({
  useSort: () => ({
    sortedGames: [],
    currentSort: 'name-asc',
    handleSortChange: jest.fn()
  })
}))

jest.mock('react-icons/bi', () => ({
  BiSolidJoystick: () => <div>Joystick Icon</div>
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

describe('HomePage', () => {
  it('deve renderizar todos os componentes principais', () => {
    render(<HomePage />)

    expect(screen.getByTestId('banner')).toBeInTheDocument()
    expect(screen.getByTestId('filters')).toBeInTheDocument()
    expect(screen.getByTestId('sort')).toBeInTheDocument()
    expect(screen.getByTestId('game-list')).toBeInTheDocument()
  })

  it('deve renderizar o conteúdo do banner', () => {
    render(<HomePage />)

    expect(
      screen.getByText('Descubra Seus Jogos Favoritos')
    ).toBeInTheDocument()
    expect(screen.getByText(/Explore milhares de títulos/)).toBeInTheDocument()
  })
})
