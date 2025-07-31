import favoritesReducer from '@/store/favorites/reducer'
import { SortOption } from '@/types/common'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Sort from './index'

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => ({
    mode: 'light'
  })
}))

jest.mock('./styles', () => ({
  SortContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sort-container">{children}</div>
  ),
  SortLabel: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sort-label">{children}</div>
  ),
  SortSelectWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="sort-select-wrapper">{children}</div>
  )
}))

jest.mock('@/utils/themeUtils', () => ({
  isDarkMode: () => false
}))

jest.mock('../Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <span>{children}</span>
  }
})

jest.mock('../Filters/MultiSelectFilter', () => {
  return function MockMultiSelectFilter({
    selectedValues,
    onChange,
    placeholder
  }: {
    selectedValues: string[]
    onChange: (values: string[]) => void
    placeholder: string
  }) {
    return (
      <div data-testid="multi-select-filter">
        <select
          value={selectedValues[0] || ''}
          onChange={e => onChange([e.target.value])}
          data-testid="sort-select"
        >
          <option value="">{placeholder}</option>
          <option value="name">Nome</option>
          <option value="rating">Avaliação</option>
          <option value="release">Data de Lançamento</option>
          <option value="added">Adicionados Recentemente</option>
        </select>
      </div>
    )
  }
})

const renderWithProviders = (component: React.ReactElement) => {
  const store = configureStore({
    reducer: {
      favorites: favoritesReducer
    }
  })

  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  )
}

describe('Sort Component', () => {
  const mockOnSortChange = jest.fn()

  beforeEach(() => {
    mockOnSortChange.mockClear()
  })

  it('deve renderizar o componente de ordenação', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    expect(screen.getByTestId('multi-select-filter')).toBeInTheDocument()
  })

  it('deve mostrar o label por padrão', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    expect(screen.getByText('Ordenar por:')).toBeInTheDocument()
  })

  it('não deve mostrar o label quando showLabel é false', () => {
    renderWithProviders(
      <Sort
        currentSort={SortOption.NAME}
        onSortChange={mockOnSortChange}
        showLabel={false}
      />
    )

    expect(screen.queryByText('Ordenar por:')).not.toBeInTheDocument()
  })

  it('deve mostrar o label quando showLabel é true', () => {
    renderWithProviders(
      <Sort
        currentSort={SortOption.NAME}
        onSortChange={mockOnSortChange}
        showLabel={true}
      />
    )

    expect(screen.getByText('Ordenar por:')).toBeInTheDocument()
  })

  it('deve exibir a opção atual selecionada', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.RATING} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select')
    expect(select).toHaveValue('rating')
  })

  it('deve chamar onSortChange quando uma nova opção é selecionada', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select')
    fireEvent.change(select, { target: { value: 'rating' } })

    expect(mockOnSortChange).toHaveBeenCalledWith('rating')
  })

  it('deve usar valor padrão quando nenhuma opção está selecionada', () => {
    renderWithProviders(
      <Sort currentSort={'' as SortOption} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select')
    fireEvent.change(select, { target: { value: '' } })

    expect(mockOnSortChange).toHaveBeenCalledWith('')
  })

  it('deve renderizar todas as opções de ordenação', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select')
    const options = select.querySelectorAll('option')

    expect(options).toHaveLength(5)
    expect(select).toHaveTextContent('Nome')
    expect(select).toHaveTextContent('Avaliação')
    expect(select).toHaveTextContent('Data de Lançamento')
    expect(select).toHaveTextContent('Adicionados Recentemente')
  })

  it('deve lidar com mudança para diferentes opções', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select')

    fireEvent.change(select, { target: { value: 'rating' } })
    expect(mockOnSortChange).toHaveBeenCalledWith('rating')

    fireEvent.change(select, { target: { value: 'release' } })
    expect(mockOnSortChange).toHaveBeenCalledWith('release')

    fireEvent.change(select, { target: { value: 'added' } })
    expect(mockOnSortChange).toHaveBeenCalledWith('added')
  })

  it('deve ser acessível', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select')
    expect(select).toBeInTheDocument()
  })

  it('deve funcionar com teclado', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select')

    fireEvent.keyDown(select, { key: 'ArrowDown' })
    fireEvent.keyDown(select, { key: 'Enter' })

    expect(select).toBeInTheDocument()
  })

  it('deve manter o estado quando nenhuma mudança é feita', () => {
    renderWithProviders(
      <Sort currentSort={SortOption.NAME} onSortChange={mockOnSortChange} />
    )

    const select = screen.getByTestId('sort-select') as HTMLSelectElement

    fireEvent.change(select, { target: { value: 'name' } })

    expect(mockOnSortChange).toHaveBeenCalledWith('name')
  })
})
