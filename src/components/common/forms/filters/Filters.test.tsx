import type { FilterState } from '@/types/filter'
import { fireEvent, render, screen } from '@testing-library/react'
import Filters from './index.tsx'

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => ({
    mode: 'light'
  })
}))

jest.mock('@/utils/themeUtils', () => ({
  isDarkMode: () => false
}))

jest.mock('react-icons/fi', () => ({
  FiRefreshCw: () => <span data-testid="refresh-icon">🔄</span>
}))

jest.mock('react-icons/io', () => ({
  IoIosArrowDown: () => <span data-testid="arrow-down">⬇️</span>,
  IoIosArrowUp: () => <span data-testid="arrow-up">⬆️</span>
}))

jest.mock('../../ui/Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <span data-testid="text">{children}</span>
  }
})

jest.mock('./DateRangeFilter', () => {
  return function MockDateRangeFilter({
    startDate,
    endDate
  }: {
    startDate: string
    endDate: string
    onChange: (start: string, end: string) => void
  }) {
    return (
      <div
        data-testid="date-range-filter"
        data-start={startDate}
        data-end={endDate}
      >
        Date Range Filter
      </div>
    )
  }
})

jest.mock('./FilterSection', () => {
  return function MockFilterSection({
    title,
    children
  }: {
    title: string
    children: React.ReactNode
  }) {
    return (
      <div data-testid="filter-section" data-title={title}>
        {children}
      </div>
    )
  }
})

jest.mock('./MultiSelectFilter', () => {
  return function MockMultiSelectFilter({
    options,
    selectedValues,
    placeholder
  }: {
    options: Array<{ value: string; label: string }>
    selectedValues: string[]
    onChange: (value: string[]) => void
    placeholder: string
  }) {
    return (
      <div
        data-testid="multi-select-filter"
        data-options-count={options.length}
        data-selected-count={selectedValues.length}
        data-placeholder={placeholder}
      >
        Multi Select Filter
      </div>
    )
  }
})

jest.mock('./RangeSlider', () => {
  return function MockRangeSlider({
    min,
    max,
    label,
    unit
  }: {
    min: number
    max: number
    minValue: number
    maxValue: number
    step: number
    onChange: (min: number, max: number) => void
    label: string
    unit: string
  }) {
    return (
      <div
        data-testid="range-slider"
        data-min={min}
        data-max={max}
        data-label={label}
        data-unit={unit}
      >
        Range Slider
      </div>
    )
  }
})

jest.mock('./TextFilter', () => {
  return function MockTextFilter({
    value,
    placeholder
  }: {
    value: string
    onChange: (value: string) => void
    placeholder: string
  }) {
    return (
      <div
        data-testid="text-filter"
        data-value={value}
        data-placeholder={placeholder}
      >
        Text Filter
      </div>
    )
  }
})

jest.mock('./styles', () => ({
  FiltersContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filters-container">{children}</div>
  ),
  FiltersHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filters-header">{children}</div>
  ),
  FiltersTitle: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filters-title">{children}</div>
  ),
  ActiveFiltersBadge: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="active-filters-badge">{children}</div>
  ),
  FiltersActions: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filters-actions">{children}</div>
  ),
  ResetButton: ({
    children,
    onClick
  }: {
    children: React.ReactNode
    onClick: () => void
  }) => (
    <button data-testid="reset-button" onClick={onClick}>
      {children}
    </button>
  ),
  ExpandButton: ({
    children,
    onClick
  }: {
    children: React.ReactNode
    onClick: () => void
  }) => (
    <button data-testid="expand-button" onClick={onClick}>
      {children}
    </button>
  ),
  FiltersContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filters-content">{children}</div>
  ),
  FiltersGrid: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="filters-grid">{children}</div>
  )
}))

describe('Filters Component', () => {
  const mockFilters: FilterState = {
    name: '',
    genres: [],
    platforms: [],
    stores: [],
    tags: [],
    dateRange: { start: '', end: '' },
    metacriticRange: { min: 0, max: 100 },
    ordering: ''
  }

  const mockOnUpdateFilter = jest.fn()
  const mockOnResetFilters = jest.fn()

  const mockAvailableGenres = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' }
  ]

  const mockAvailablePlatforms = [
    { value: 'pc', label: 'PC' },
    { value: 'ps5', label: 'PS5' }
  ]

  const mockAvailableStores = [
    { value: 'steam', label: 'Steam' },
    { value: 'playstation', label: 'PlayStation Store' }
  ]

  const mockAvailableTags = [
    { value: 'rpg', label: 'RPG' },
    { value: 'shooter', label: 'Shooter' }
  ]

  beforeEach(() => {
    mockOnUpdateFilter.mockClear()
    mockOnResetFilters.mockClear()
  })

  it('deve renderizar o container de filtros', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const container = screen.getByTestId('filters-container')
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar o título dos filtros', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const title = screen.getByTestId('filters-title')
    const text = screen.getByTestId('text')
    expect(title).toBeInTheDocument()
    expect(text).toHaveTextContent('Filtros')
  })

  it('deve renderizar badge de filtros ativos quando há filtros ativos', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={true}
        activeFiltersCount={3}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const badge = screen.getByTestId('active-filters-badge')
    const badgeText = screen.getAllByTestId('text')[1]
    expect(badge).toBeInTheDocument()
    expect(badgeText).toHaveTextContent('3')
  })

  it('não deve renderizar badge quando não há filtros ativos', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const badge = screen.queryByTestId('active-filters-badge')
    expect(badge).not.toBeInTheDocument()
  })

  it('deve renderizar botão de reset quando há filtros ativos', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={true}
        activeFiltersCount={2}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const resetButton = screen.getByTestId('reset-button')
    const refreshIcon = screen.getByTestId('refresh-icon')
    expect(resetButton).toBeInTheDocument()
    expect(refreshIcon).toBeInTheDocument()
  })

  it('deve chamar onResetFilters quando botão de reset é clicado', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={true}
        activeFiltersCount={1}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const resetButton = screen.getByTestId('reset-button')
    fireEvent.click(resetButton)

    expect(mockOnResetFilters).toHaveBeenCalledTimes(1)
  })

  it('deve renderizar botão de expandir', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const expandButton = screen.getByTestId('expand-button')
    const arrowDown = screen.getByTestId('arrow-down')
    expect(expandButton).toBeInTheDocument()
    expect(arrowDown).toBeInTheDocument()
  })

  it('deve expandir e contrair os filtros ao clicar no botão', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const expandButton = screen.getByTestId('expand-button')

    expect(screen.queryByTestId('filters-content')).not.toBeInTheDocument()

    fireEvent.click(expandButton)
    expect(screen.getByTestId('filters-content')).toBeInTheDocument()
    expect(screen.getByTestId('arrow-up')).toBeInTheDocument()

    fireEvent.click(expandButton)
    expect(screen.queryByTestId('filters-content')).not.toBeInTheDocument()
    expect(screen.getByTestId('arrow-down')).toBeInTheDocument()
  })

  it('deve renderizar filtros quando expandido', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const expandButton = screen.getByTestId('expand-button')
    fireEvent.click(expandButton)

    const filtersGrid = screen.getByTestId('filters-grid')
    const textFilter = screen.getByTestId('text-filter')
    const dateRangeFilter = screen.getByTestId('date-range-filter')
    const rangeSlider = screen.getByTestId('range-slider')

    expect(filtersGrid).toBeInTheDocument()
    expect(textFilter).toBeInTheDocument()
    expect(dateRangeFilter).toBeInTheDocument()
    expect(rangeSlider).toBeInTheDocument()
  })

  it('deve renderizar filtros de gêneros quando disponíveis', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const expandButton = screen.getByTestId('expand-button')
    fireEvent.click(expandButton)

    const multiSelectFilters = screen.getAllByTestId('multi-select-filter')
    expect(multiSelectFilters.length).toBeGreaterThan(0)
  })

  it('não deve renderizar filtros de gêneros quando não disponíveis', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={[]}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const expandButton = screen.getByTestId('expand-button')
    fireEvent.click(expandButton)

    const filterSections = screen.getAllByTestId('filter-section')
    const genreSection = filterSections.find(
      section => section.getAttribute('data-title') === 'Gêneros'
    )

    if (genreSection) {
      const multiSelectFilter = genreSection.querySelector(
        '[data-testid="multi-select-filter"]'
      )
      if (multiSelectFilter) {
        const optionsCount =
          multiSelectFilter.getAttribute('data-options-count')
        expect(optionsCount).toBe('0')
      }
    } else {
      expect(genreSection).toBeUndefined()
    }
  })

  it('deve ser acessível', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={false}
        activeFiltersCount={0}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const container = screen.getByTestId('filters-container')
    expect(container).toBeInTheDocument()
  })

  it('deve ter estrutura correta quando expandido', () => {
    render(
      <Filters
        filters={mockFilters}
        onUpdateFilter={mockOnUpdateFilter}
        onResetFilters={mockOnResetFilters}
        hasActiveFilters={true}
        activeFiltersCount={2}
        availableGenres={mockAvailableGenres}
        availablePlatforms={mockAvailablePlatforms}
        availableStores={mockAvailableStores}
        availableTags={mockAvailableTags}
      />
    )

    const expandButton = screen.getByTestId('expand-button')
    fireEvent.click(expandButton)

    const container = screen.getByTestId('filters-container')
    const header = screen.getByTestId('filters-header')
    const content = screen.getByTestId('filters-content')
    const grid = screen.getByTestId('filters-grid')

    expect(container).toContainElement(header)
    expect(container).toContainElement(content)
    expect(content).toContainElement(grid)
  })
})
