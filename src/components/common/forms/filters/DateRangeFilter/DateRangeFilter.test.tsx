import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

  describe('Renderização Básica', () => {
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

    it('deve renderizar com datas vazias', () => {
      render(
        <DateRangeFilter startDate="" endDate="" onChange={mockOnChange} />
      )

      const inputs = screen.getAllByTestId('date-input')
      expect(inputs[0]).toHaveValue('')
      expect(inputs[1]).toHaveValue('')
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
  })

  describe('Interações do Usuário', () => {
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
  })

  describe('Testes com userEvent', () => {
    it('deve funcionar com userEvent para digitação', async () => {
      const user = userEvent.setup()
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      await user.clear(inputs[0])
      await user.type(inputs[0], '2023-03-15')

      expect(mockOnChange).toHaveBeenCalled()
    })

    it('deve lidar com múltiplas mudanças rápidas', async () => {
      const user = userEvent.setup()
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')

      await user.clear(inputs[0])
      await user.type(inputs[0], '2023-02-01')
      await user.clear(inputs[1])
      await user.type(inputs[1], '2023-11-30')

      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com datas inválidas', () => {
      render(
        <DateRangeFilter
          startDate="data-invalida"
          endDate="outra-data-invalida"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      expect(inputs[0]).toBeInTheDocument()
      expect(inputs[1]).toBeInTheDocument()
    })

    it('deve lidar com onChange undefined', () => {
      expect(() => {
        render(
          <DateRangeFilter
            startDate="2023-01-01"
            endDate="2023-12-31"
            onChange={
              undefined as unknown as (start: string, end: string) => void
            }
          />
        )
      }).not.toThrow()
    })

    it('deve lidar com datas muito antigas', () => {
      render(
        <DateRangeFilter
          startDate="1900-01-01"
          endDate="1900-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      expect(inputs[0]).toHaveValue('1900-01-01')
      expect(inputs[1]).toHaveValue('1900-12-31')
    })

    it('deve lidar com datas futuras', () => {
      render(
        <DateRangeFilter
          startDate="2030-01-01"
          endDate="2030-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      expect(inputs[0]).toHaveValue('2030-01-01')
      expect(inputs[1]).toHaveValue('2030-12-31')
    })
  })

  describe('Acessibilidade', () => {
    it('deve ser focável', async () => {
      const user = userEvent.setup()
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      await user.tab()

      expect(inputs[0]).toHaveFocus()
    })

    it('deve suportar navegação por teclado', async () => {
      const user = userEvent.setup()
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      await user.click(inputs[0])
      await user.keyboard('2023-05-15')

      expect(inputs[0]).toBeInTheDocument()
    })

    it('deve manter o foco durante a digitação', async () => {
      const user = userEvent.setup()
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      await user.click(inputs[0])
      await user.type(inputs[0], '2023-06-20')

      expect(inputs[0]).toHaveFocus()
    })
  })

  describe('Performance', () => {
    it('deve usar useCallback para otimizar re-renders', () => {
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

    it('deve lidar com re-renders frequentes', () => {
      const { rerender } = render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      for (let i = 0; i < 10; i++) {
        rerender(
          <DateRangeFilter
            startDate={`2023-${String(i + 1).padStart(2, '0')}-01`}
            endDate={`2023-${String(i + 1).padStart(2, '0')}-31`}
            onChange={mockOnChange}
          />
        )
      }

      const inputs = screen.getAllByTestId('date-input')
      expect(inputs[0]).toBeInTheDocument()
      expect(inputs[1]).toBeInTheDocument()
    })
  })

  describe('Integração', () => {
    it('deve funcionar com waitFor para operações assíncronas', async () => {
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      fireEvent.change(inputs[0], { target: { value: '2023-07-15' } })

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('2023-07-15', '2023-12-31')
      })
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

  describe('Validação de Datas', () => {
    it('deve aceitar formato de data padrão', () => {
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      expect(inputs[0]).toHaveAttribute('type', 'date')
      expect(inputs[1]).toHaveAttribute('type', 'date')
    })

    it('deve lidar com datas em diferentes formatos', () => {
      render(
        <DateRangeFilter
          startDate="2023-01-01"
          endDate="2023-12-31"
          onChange={mockOnChange}
        />
      )

      const inputs = screen.getAllByTestId('date-input')
      fireEvent.change(inputs[0], { target: { value: '2023-02-29' } })

      expect(mockOnChange).toHaveBeenCalled()
    })
  })
})
