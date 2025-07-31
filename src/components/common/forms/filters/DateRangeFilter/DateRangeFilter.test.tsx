import { fireEvent, render, screen } from '@testing-library/react'
import DateRangeFilter from './index.tsx'

jest.mock('./styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="date-range-container">{children}</div>
  ),
  DateInput: ({
    type,
    value,
    onChange,
    placeholder
  }: {
    type: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder: string
  }) => (
    <input
      data-testid="date-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  ),
  Separator: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="date-separator">{children}</span>
  )
}))

describe('DateRangeFilter Component', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('deve renderizar o container de filtro de data', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const container = screen.getByTestId('date-range-container')
    expect(container).toBeInTheDocument()
  })

  it('deve renderizar os inputs de data', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const inputs = screen.getAllByTestId('date-input')
    expect(inputs).toHaveLength(2)
  })

  it('deve renderizar o separador', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const separator = screen.getByTestId('date-separator')
    expect(separator).toHaveTextContent('até')
  })

  it('deve renderizar com valores iniciais', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const inputs = screen.getAllByTestId('date-input')
    expect(inputs[0]).toHaveValue('2023-01-01')
    expect(inputs[1]).toHaveValue('2023-12-31')
  })

  it('deve chamar onChange quando data inicial é alterada', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const inputs = screen.getAllByTestId('date-input')
    fireEvent.change(inputs[0], { target: { value: '2023-02-01' } })

    expect(mockOnChange).toHaveBeenCalledWith('2023-02-01', '2023-12-31')
  })

  it('deve chamar onChange quando data final é alterada', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const inputs = screen.getAllByTestId('date-input')
    fireEvent.change(inputs[1], { target: { value: '2023-11-30' } })

    expect(mockOnChange).toHaveBeenCalledWith('2023-01-01', '2023-11-30')
  })

  it('deve renderizar com datas vazias', () => {
    render(<DateRangeFilter startDate="" endDate="" onChange={mockOnChange} />)

    const inputs = screen.getAllByTestId('date-input')
    expect(inputs[0]).toHaveValue('')
    expect(inputs[1]).toHaveValue('')
  })

  it('deve chamar onChange com data inicial vazia', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const inputs = screen.getAllByTestId('date-input')
    fireEvent.change(inputs[0], { target: { value: '' } })

    expect(mockOnChange).toHaveBeenCalledWith('', '2023-12-31')
  })

  it('deve chamar onChange com data final vazia', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const inputs = screen.getAllByTestId('date-input')
    fireEvent.change(inputs[1], { target: { value: '' } })

    expect(mockOnChange).toHaveBeenCalledWith('2023-01-01', '')
  })

  it('deve ter placeholders corretos', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const inputs = screen.getAllByTestId('date-input')
    expect(inputs[0]).toHaveAttribute('placeholder', 'Data inicial')
    expect(inputs[1]).toHaveAttribute('placeholder', 'Data final')
  })

  it('deve ser acessível', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const container = screen.getByTestId('date-range-container')
    expect(container).toBeInTheDocument()
  })

  it('deve ter estrutura correta', () => {
    render(
      <DateRangeFilter
        startDate="2023-01-01"
        endDate="2023-12-31"
        onChange={mockOnChange}
      />
    )

    const container = screen.getByTestId('date-range-container')
    const inputs = screen.getAllByTestId('date-input')
    const separator = screen.getByTestId('date-separator')

    expect(container).toContainElement(inputs[0])
    expect(container).toContainElement(separator)
    expect(container).toContainElement(inputs[1])
  })
})
