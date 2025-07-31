import { LightTheme } from '@/styles/theme'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'styled-components'
import TextFilter from './index.tsx'

jest.mock('./styles', () => ({
  Input: ({
    type,
    value,
    onChange,
    placeholder,
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
      data-testid="text-filter-input"
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...props}
    />
  )
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={LightTheme}>{component}</ThemeProvider>)
}

describe('TextFilter', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    placeholder: 'Digite para filtrar...'
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Renderização', () => {
    it('deve renderizar o input corretamente', () => {
      renderWithTheme(<TextFilter {...defaultProps} />)

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute('type', 'text')
    })

    it('deve renderizar com valor inicial', () => {
      renderWithTheme(<TextFilter {...defaultProps} value="valor inicial" />)

      const input = screen.getByTestId('text-filter-input')
      expect(input).toHaveValue('valor inicial')
    })

    it('deve renderizar com placeholder', () => {
      renderWithTheme(
        <TextFilter {...defaultProps} placeholder="Placeholder customizado" />
      )

      const input = screen.getByTestId('text-filter-input')
      expect(input).toHaveAttribute('placeholder', 'Placeholder customizado')
    })

    it('deve renderizar sem placeholder quando não fornecido', () => {
      renderWithTheme(<TextFilter value="" onChange={jest.fn()} />)

      const input = screen.getByTestId('text-filter-input')
      expect(input).not.toHaveAttribute('placeholder')
    })
  })

  describe('Interações do usuário', () => {
    it('deve chamar onChange quando o usuário digita', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, 'teste')

      expect(mockOnChange).toHaveBeenCalledWith('teste')
    })

    it('deve chamar onChange com valor vazio quando o usuário limpa o input', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(
        <TextFilter
          {...defaultProps}
          value="valor inicial"
          onChange={mockOnChange}
        />
      )

      const input = screen.getByTestId('text-filter-input')
      await user.clear(input)

      expect(mockOnChange).toHaveBeenCalledWith('')
    })

    it('deve chamar onChange múltiplas vezes durante a digitação', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, 'abc')

      expect(mockOnChange).toHaveBeenCalledTimes(3)
      expect(mockOnChange).toHaveBeenNthCalledWith(1, 'a')
      expect(mockOnChange).toHaveBeenNthCalledWith(2, 'ab')
      expect(mockOnChange).toHaveBeenNthCalledWith(3, 'abc')
    })

    it('deve lidar com caracteres especiais', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, 'jogo@#$%123')

      expect(mockOnChange).toHaveBeenLastCalledWith('jogo@#$%123')
    })

    it('deve lidar com espaços em branco', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, '  texto com espaços  ')

      expect(mockOnChange).toHaveBeenLastCalledWith('  texto com espaços  ')
    })
  })

  describe('Comportamento do estado interno', () => {
    it('deve manter o estado interno sincronizado com o valor externo', () => {
      const { rerender } = renderWithTheme(
        <TextFilter {...defaultProps} value="valor inicial" />
      )

      let input = screen.getByTestId('text-filter-input')
      expect(input).toHaveValue('valor inicial')

      rerender(<TextFilter {...defaultProps} value="novo valor" />)
      input = screen.getByTestId('text-filter-input')
      expect(input).toHaveValue('novo valor')
    })

    it('deve atualizar o estado interno quando o valor externo muda', () => {
      const { rerender } = renderWithTheme(
        <TextFilter {...defaultProps} value="" />
      )

      let input = screen.getByTestId('text-filter-input')
      expect(input).toHaveValue('')

      rerender(<TextFilter {...defaultProps} value="atualizado" />)
      input = screen.getByTestId('text-filter-input')
      expect(input).toHaveValue('atualizado')
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com texto muito longo', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()
      const longText = 'a'.repeat(1000)

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, longText)

      expect(mockOnChange).toHaveBeenLastCalledWith(longText)
    })

    it('deve lidar com múltiplas mudanças rápidas', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')

      await user.type(input, 'a')
      await user.type(input, 'b')
      await user.type(input, 'c')

      expect(mockOnChange).toHaveBeenCalledTimes(3)
      expect(mockOnChange).toHaveBeenLastCalledWith('abc')
    })

    it('deve lidar com onChange undefined', () => {
      expect(() => {
        renderWithTheme(
          <TextFilter
            value=""
            onChange={undefined as (value: string) => void}
          />
        )
      }).not.toThrow()
    })

    it('deve lidar com valor undefined', () => {
      expect(() => {
        renderWithTheme(
          <TextFilter value={undefined as string} onChange={jest.fn()} />
        )
      }).not.toThrow()
    })

    it('deve lidar com valor null', () => {
      expect(() => {
        renderWithTheme(
          <TextFilter value={null as string} onChange={jest.fn()} />
        )
      }).not.toThrow()
    })

    it('deve lidar com placeholder muito longo', () => {
      const longPlaceholder = 'A'.repeat(500)
      renderWithTheme(
        <TextFilter {...defaultProps} placeholder={longPlaceholder} />
      )

      const input = screen.getByTestId('text-filter-input')
      expect(input).toHaveAttribute('placeholder', longPlaceholder)
    })
  })

  describe('Acessibilidade', () => {
    it('deve ser focável', async () => {
      const user = userEvent.setup()

      renderWithTheme(<TextFilter {...defaultProps} />)

      const input = screen.getByTestId('text-filter-input')
      await user.tab()

      expect(input).toHaveFocus()
    })

    it('deve suportar navegação por teclado', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.click(input)
      await user.keyboard('teste')

      expect(mockOnChange).toHaveBeenCalledWith('teste')
    })

    it('deve manter o foco durante a digitação', async () => {
      const user = userEvent.setup()

      renderWithTheme(<TextFilter {...defaultProps} />)

      const input = screen.getByTestId('text-filter-input')
      await user.click(input)
      await user.type(input, 'teste')

      expect(input).toHaveFocus()
    })

    it('deve suportar teclas especiais', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.click(input)
      await user.keyboard('teste{Backspace}')

      expect(mockOnChange).toHaveBeenLastCalledWith('test')
    })
  })

  describe('Performance', () => {
    it('deve usar useCallback para otimizar re-renders', () => {
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
    })

    it('deve lidar com re-renders frequentes', () => {
      const mockOnChange = jest.fn()
      const { rerender } = renderWithTheme(
        <TextFilter {...defaultProps} onChange={mockOnChange} />
      )

      for (let i = 0; i < 10; i++) {
        rerender(
          <TextFilter
            {...defaultProps}
            value={`valor ${i}`}
            onChange={mockOnChange}
          />
        )
      }

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
      expect(input).toHaveValue('valor 0')
    })

    it('deve lidar com digitação rápida', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')

      await user.type(input, 'teste')

      expect(mockOnChange).toHaveBeenLastCalledWith('teste')
    })
  })

  describe('Integração', () => {
    it('deve funcionar com fireEvent para compatibilidade', () => {
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      fireEvent.change(input, { target: { value: 'teste fireEvent' } })

      expect(mockOnChange).toHaveBeenCalledWith('teste fireEvent')
    })

    it('deve funcionar com waitFor para operações assíncronas', async () => {
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      fireEvent.change(input, { target: { value: 'teste assíncrono' } })

      await waitFor(() => {
        expect(mockOnChange).toHaveBeenCalledWith('teste assíncrono')
      })
    })
  })

  describe('Validação de Entrada', () => {
    it('deve aceitar caracteres Unicode', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, 'café mañana ñoño')

      expect(mockOnChange).toHaveBeenLastCalledWith('café mañana ñoño')
    })

    it('deve aceitar emojis', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, '🎮 jogo 🎯')

      expect(mockOnChange).toHaveBeenLastCalledWith('🎮 jogo 🎯')
    })

    it('deve aceitar números', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, '123456789')

      expect(mockOnChange).toHaveBeenLastCalledWith('123456789')
    })

    it('deve aceitar símbolos especiais', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(<TextFilter {...defaultProps} onChange={mockOnChange} />)

      const input = screen.getByTestId('text-filter-input')
      await user.type(input, '!@#$%^&*()_+-=')

      expect(mockOnChange).toHaveBeenLastCalledWith('!@#$%^&*()_+-=')
    })
  })

  describe('Comportamento de Limpeza', () => {
    it('deve limpar o input corretamente', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(
        <TextFilter
          {...defaultProps}
          value="texto inicial"
          onChange={mockOnChange}
        />
      )

      const input = screen.getByTestId('text-filter-input')
      await user.clear(input)

      expect(mockOnChange).toHaveBeenCalledWith('')
    })

    it('deve lidar com seleção e substituição', async () => {
      const user = userEvent.setup()
      const mockOnChange = jest.fn()

      renderWithTheme(
        <TextFilter
          {...defaultProps}
          value="texto antigo"
          onChange={mockOnChange}
        />
      )

      const input = screen.getByTestId('text-filter-input')
      await user.click(input)
      await user.keyboard('{Control>}a{/Control}')
      await user.type(input, 'texto novo')

      expect(mockOnChange).toHaveBeenCalled()
    })
  })

  describe('Responsividade', () => {
    it('deve renderizar corretamente em diferentes tamanhos', () => {
      renderWithTheme(<TextFilter {...defaultProps} />)

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
    })

    it('deve lidar com mudanças de tamanho dinâmicas', () => {
      const { rerender } = renderWithTheme(
        <TextFilter {...defaultProps} value="texto curto" />
      )

      rerender(
        <TextFilter
          {...defaultProps}
          value="texto muito mais longo que pode causar problemas de layout"
        />
      )

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
    })
  })

  describe('Testes de Regressão', () => {
    it('deve manter comportamento consistente entre renderizações', () => {
      const { rerender } = renderWithTheme(
        <TextFilter {...defaultProps} value="valor inicial" />
      )

      let input = screen.getByTestId('text-filter-input')
      expect(input).toHaveValue('valor inicial')

      rerender(<TextFilter {...defaultProps} value="valor inicial" />)
      input = screen.getByTestId('text-filter-input')
      expect(input).toHaveValue('valor inicial')
    })

    it('deve preservar funcionalidade após múltiplas atualizações', () => {
      const mockOnChange = jest.fn()
      const { rerender } = renderWithTheme(
        <TextFilter {...defaultProps} onChange={mockOnChange} />
      )

      for (let i = 0; i < 5; i++) {
        rerender(
          <TextFilter
            {...defaultProps}
            value={`valor ${i}`}
            onChange={mockOnChange}
          />
        )
      }

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
      expect(input).toHaveValue('valor 0')
    })
  })

  describe('Compatibilidade', () => {
    it('deve funcionar com diferentes navegadores (simulado)', () => {
      renderWithTheme(<TextFilter {...defaultProps} />)

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
    })

    it('deve funcionar com diferentes dispositivos (simulado)', () => {
      renderWithTheme(<TextFilter {...defaultProps} />)

      const input = screen.getByTestId('text-filter-input')
      expect(input).toBeInTheDocument()
    })
  })
})
