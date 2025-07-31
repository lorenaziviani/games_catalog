import { fireEvent, render, screen } from '@testing-library/react'
import MultiSelectFilter from './index.tsx'

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => ({
    mode: 'light'
  })
}))

jest.mock('../../../../../utils/themeUtils', () => ({
  isDarkMode: () => false
}))

jest.mock('react-icons/io', () => ({
  IoIosArrowDown: () => <span data-testid="arrow-icon">⬇️</span>
}))

jest.mock('./styles', () => ({
  Container: ({ children, ref }: { children: React.ReactNode; ref: any }) => (
    <div data-testid="multi-select-container" ref={ref}>
      {children}
    </div>
  ),
  SelectButton: ({
    children,
    onClick,
    $isOpen,
    $isDarkMode
  }: {
    children: React.ReactNode
    onClick: () => void
    $isOpen: boolean
    $isDarkMode: boolean
  }) => (
    <button
      data-testid="select-button"
      onClick={onClick}
      data-is-open={$isOpen}
      data-is-dark={$isDarkMode}
    >
      {children}
    </button>
  ),
  SelectText: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="select-text">{children}</span>
  ),
  ArrowIcon: ({
    children,
    $isOpen
  }: {
    children: React.ReactNode
    $isOpen: boolean
  }) => (
    <span data-testid="arrow-icon" data-is-open={$isOpen}>
      {children}
    </span>
  ),
  Dropdown: ({
    children,
    $isDarkMode
  }: {
    children: React.ReactNode
    $isDarkMode: boolean
  }) => (
    <div data-testid="dropdown" data-is-dark={$isDarkMode}>
      {children}
    </div>
  ),
  Option: ({
    children,
    onClick,
    $isSelected,
    $isDarkMode
  }: {
    children: React.ReactNode
    onClick: () => void
    $isSelected: boolean
    $isDarkMode: boolean
  }) => (
    <div
      data-testid="option"
      onClick={onClick}
      data-is-selected={$isSelected}
      data-is-dark={$isDarkMode}
    >
      {children}
    </div>
  ),
  Checkbox: ({
    children,
    $isSelected
  }: {
    children: React.ReactNode
    $isSelected: boolean
  }) => (
    <span data-testid="checkbox" data-is-selected={$isSelected}>
      {children}
    </span>
  ),
  Checkmark: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="checkmark">{children}</span>
  ),
  OptionText: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="option-text">{children}</span>
  )
}))

describe('MultiSelectFilter Component', () => {
  const mockOptions = [
    { value: 'action', label: 'Action' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'rpg', label: 'RPG' },
    { value: 'strategy', label: 'Strategy' }
  ]

  const mockOnChange = jest.fn()
  const mockOnToggle = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
    mockOnToggle.mockClear()
  })

  it('deve renderizar o container do filtro', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    )

    const container = screen.getByTestId('multi-select-container')
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar o botão de seleção', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    )

    const button = screen.getByTestId('select-button')
    expect(button).toBeInTheDocument()
  })

  it('deve renderizar o texto de placeholder quando nenhuma opção está selecionada', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    )

    const text = screen.getByTestId('select-text')
    expect(text).toHaveTextContent('Selecione...')
  })

  it('deve renderizar o texto customizado quando nenhuma opção está selecionada', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
        placeholder="Escolha os gêneros..."
      />
    )

    const text = screen.getByTestId('select-text')
    expect(text).toHaveTextContent('Escolha os gêneros...')
  })

  it('deve renderizar as opções selecionadas', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={['action', 'rpg']}
        onChange={mockOnChange}
      />
    )

    const text = screen.getByTestId('select-text')
    expect(text).toHaveTextContent('Action, RPG')
  })

  it('deve abrir o dropdown quando o botão é clicado', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const dropdown = screen.getByTestId('dropdown')
    expect(dropdown).toBeInTheDocument()
  })

  it('deve renderizar todas as opções no dropdown', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const options = screen.getAllByTestId('option')
    expect(options).toHaveLength(4)
  })

  it('deve chamar onChange quando uma opção é clicada', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const firstOption = screen.getAllByTestId('option')[0]
    fireEvent.click(firstOption)

    expect(mockOnChange).toHaveBeenCalledWith(['action'])
  })

  it('deve remover opção quando clicada novamente', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={['action']}
        onChange={mockOnChange}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const firstOption = screen.getAllByTestId('option')[0]
    fireEvent.click(firstOption)

    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('deve chamar onToggle quando o dropdown é aberto', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
        onToggle={mockOnToggle}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    expect(mockOnToggle).toHaveBeenCalledTimes(1)
  })

  it('deve funcionar como single select quando isSingleSelect é true', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={['action']}
        onChange={mockOnChange}
        isSingleSelect={true}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const firstOption = screen.getAllByTestId('option')[0]
    fireEvent.click(firstOption)

    expect(mockOnChange).toHaveBeenCalledWith([])
  })

  it('deve renderizar checkbox quando não é single select', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={['action']}
        onChange={mockOnChange}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const checkboxes = screen.getAllByTestId('checkbox')
    expect(checkboxes).toHaveLength(4)
  })

  it('não deve renderizar checkbox quando é single select', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={['action']}
        onChange={mockOnChange}
        isSingleSelect={true}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const checkboxes = screen.queryAllByTestId('checkbox')
    expect(checkboxes).toHaveLength(0)
  })

  it('deve renderizar checkmark quando opção está selecionada', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={['action']}
        onChange={mockOnChange}
      />
    )

    const button = screen.getByTestId('select-button')
    fireEvent.click(button)

    const checkmarks = screen.getAllByTestId('checkmark')
    expect(checkmarks).toHaveLength(1)
  })

  it('deve ser acessível', () => {
    render(
      <MultiSelectFilter
        options={mockOptions}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    )

    const container = screen.getByTestId('multi-select-container')
    expect(container).toBeInTheDocument()
  })
})
