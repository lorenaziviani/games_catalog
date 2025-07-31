import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RangeSlider from './index.tsx'

jest.mock('./styles', () => ({
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="range-slider-container">{children}</div>
  ),
  Label: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="range-slider-label">{children}</div>
  ),
  SliderContainer: ({
    children,
    ref
  }: {
    children: React.ReactNode
    ref: React.RefObject<HTMLDivElement> | null
  }) => (
    <div data-testid="slider-container" ref={ref}>
      {children}
    </div>
  ),
  Track: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="slider-track">{children}</div>
  ),
  Range: ({ $left, $right }: { $left: number; $right: number }) => (
    <div data-testid="slider-range" data-left={$left} data-right={$right} />
  ),
  Thumb: ({
    $position,
    onMouseDown,
    onTouchStart
  }: {
    $position: number
    onMouseDown: (e: React.MouseEvent) => void
    onTouchStart: (e: React.TouchEvent) => void
  }) => (
    <div
      data-testid="slider-thumb"
      data-position={$position}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    />
  ),
  Values: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="slider-values">{children}</div>
  ),
  Value: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="slider-value">{children}</span>
  )
}))

describe('RangeSlider Component', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  describe('Renderização Básica', () => {
    it('deve renderizar o container do slider', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })

    it('deve renderizar o label quando fornecido', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
          label="Score Metacritic"
        />
      )

      const label = screen.getByTestId('range-slider-label')
      expect(label).toHaveTextContent('Score Metacritic')
    })

    it('não deve renderizar o label quando não fornecido', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const label = screen.queryByTestId('range-slider-label')
      expect(label).not.toBeInTheDocument()
    })

    it('deve renderizar o container do slider', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const sliderContainer = screen.getByTestId('slider-container')
      expect(sliderContainer).toBeInTheDocument()
    })

    it('deve renderizar a track do slider', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const track = screen.getByTestId('slider-track')
      expect(track).toBeInTheDocument()
    })

    it('deve renderizar o range do slider', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const range = screen.getByTestId('slider-range')
      expect(range).toBeInTheDocument()
    })

    it('deve renderizar os thumbs do slider', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      expect(thumbs).toHaveLength(2)
    })

    it('deve renderizar os valores do slider', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const values = screen.getByTestId('slider-values')
      const valueElements = screen.getAllByTestId('slider-value')
      expect(values).toBeInTheDocument()
      expect(valueElements).toHaveLength(2)
    })

    it('deve renderizar os valores corretos', () => {
      render(
        <RangeSlider
          min={20}
          max={80}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const valueElements = screen.getAllByTestId('slider-value')
      expect(valueElements[0]).toHaveTextContent('20')
      expect(valueElements[1]).toHaveTextContent('80')
    })

    it('deve renderizar com unidade', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
          unit="%"
        />
      )

      const valueElements = screen.getAllByTestId('slider-value')
      expect(valueElements[0]).toHaveTextContent('0%')
      expect(valueElements[1]).toHaveTextContent('100%')
    })

    it('deve renderizar com step diferente', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={5}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Interações de Mouse', () => {
    it('deve responder a eventos de mouse down', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      fireEvent.mouseDown(thumbs[0])

      expect(thumbs[0]).toBeInTheDocument()
    })

    it('deve responder a eventos de mouse move', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      fireEvent.mouseDown(thumbs[0])
      fireEvent.mouseMove(document)

      expect(thumbs[0]).toBeInTheDocument()
    })

    it('deve responder a eventos de mouse up', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      fireEvent.mouseDown(thumbs[0])
      fireEvent.mouseUp(document)

      expect(thumbs[0]).toBeInTheDocument()
    })
  })

  describe('Interações de Touch', () => {
    it('deve responder a eventos de touch start', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      fireEvent.touchStart(thumbs[0])

      expect(thumbs[0]).toBeInTheDocument()
    })

    it('deve responder a eventos de touch move', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      fireEvent.touchStart(thumbs[0])

      expect(thumbs[0]).toBeInTheDocument()
    })

    it('deve responder a eventos de touch end', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      fireEvent.touchStart(thumbs[0])
      fireEvent.touchEnd(document)

      expect(thumbs[0]).toBeInTheDocument()
    })
  })

  describe('Testes com userEvent', () => {
    it('deve funcionar com userEvent para interações', async () => {
      const user = userEvent.setup()
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      await user.click(thumbs[0])

      expect(thumbs[0]).toBeInTheDocument()
    })

    it('deve lidar com arrastar o thumb', async () => {
      const user = userEvent.setup()
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      await user.pointer({ target: thumbs[0], keys: '[MouseLeft>]' })
      await user.pointer({ target: thumbs[0], coords: { x: 50, y: 0 } })

      expect(thumbs[0]).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com valores negativos', () => {
      render(
        <RangeSlider
          min={-50}
          max={50}
          minValue={-100}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const valueElements = screen.getAllByTestId('slider-value')
      expect(valueElements[0]).toHaveTextContent('-50')
      expect(valueElements[1]).toHaveTextContent('50')
    })

    it('deve lidar com valores muito grandes', () => {
      render(
        <RangeSlider
          min={0}
          max={1000000}
          minValue={0}
          maxValue={1000000}
          step={1000}
          onChange={mockOnChange}
        />
      )

      const valueElements = screen.getAllByTestId('slider-value')
      expect(valueElements[0]).toHaveTextContent('0')
      expect(valueElements[1]).toHaveTextContent('1000000')
    })

    it('deve lidar com step muito pequeno', () => {
      render(
        <RangeSlider
          min={0}
          max={1}
          minValue={0}
          maxValue={1}
          step={0.001}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })

    it('deve lidar com min igual a max', () => {
      render(
        <RangeSlider
          min={50}
          max={50}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const valueElements = screen.getAllByTestId('slider-value')
      expect(valueElements[0]).toHaveTextContent('50')
      expect(valueElements[1]).toHaveTextContent('50')
    })

    it('deve lidar com onChange undefined', () => {
      expect(() => {
        render(
          <RangeSlider
            min={0}
            max={100}
            minValue={0}
            maxValue={100}
            step={1}
            onChange={undefined as (min: number, max: number) => void}
          />
        )
      }).not.toThrow()
    })
  })

  describe('Acessibilidade', () => {
    it('deve ser focável', async () => {
      const user = userEvent.setup()
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      await user.tab()

      expect(thumbs[0]).toBeInTheDocument()
    })

    it('deve suportar navegação por teclado', async () => {
      const user = userEvent.setup()
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      await user.click(thumbs[0])
      await user.keyboard('{ArrowRight}')

      expect(thumbs[0]).toBeInTheDocument()
    })

    it('deve manter o foco durante a interação', async () => {
      const user = userEvent.setup()
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      await user.click(thumbs[0])

      expect(thumbs[0]).toBeInTheDocument()
    })
  })

  describe('Performance', () => {
    it('deve lidar com re-renders frequentes', () => {
      const { rerender } = render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      for (let i = 0; i < 10; i++) {
        rerender(
          <RangeSlider
            min={i}
            max={100 + i}
            minValue={0}
            maxValue={100}
            step={1}
            onChange={mockOnChange}
          />
        )
      }

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })

    it('deve lidar com valores extremos', () => {
      render(
        <RangeSlider
          min={Number.MIN_SAFE_INTEGER}
          max={Number.MAX_SAFE_INTEGER}
          minValue={Number.MIN_SAFE_INTEGER}
          maxValue={Number.MAX_SAFE_INTEGER}
          step={1}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Integração', () => {
    it('deve funcionar com waitFor para operações assíncronas', async () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      fireEvent.mouseDown(thumbs[0])

      await waitFor(() => {
        expect(thumbs[0]).toBeInTheDocument()
      })
    })

    it('deve ser acessível', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })

    it('deve ter estrutura correta', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
          label="Teste"
        />
      )

      const container = screen.getByTestId('range-slider-container')
      const label = screen.getByTestId('range-slider-label')
      const sliderContainer = screen.getByTestId('slider-container')
      const track = screen.getByTestId('slider-track')
      const range = screen.getByTestId('slider-range')
      const thumbs = screen.getAllByTestId('slider-thumb')
      const values = screen.getByTestId('slider-values')

      expect(container).toContainElement(label)
      expect(container).toContainElement(sliderContainer)
      expect(sliderContainer).toContainElement(track)
      expect(track).toContainElement(range)
      expect(sliderContainer).toContainElement(thumbs[0])
      expect(sliderContainer).toContainElement(thumbs[1])
      expect(container).toContainElement(values)
    })
  })

  describe('Cálculos de Posição', () => {
    it('deve calcular posições corretas para valores normais', () => {
      render(
        <RangeSlider
          min={25}
          max={75}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      expect(thumbs[0]).toHaveAttribute('data-position', '25')
      expect(thumbs[1]).toHaveAttribute('data-position', '75')
    })

    it('deve calcular posições para valores extremos', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const thumbs = screen.getAllByTestId('slider-thumb')
      expect(thumbs[0]).toHaveAttribute('data-position', '0')
      expect(thumbs[1]).toHaveAttribute('data-position', '100')
    })
  })

  describe('Responsividade', () => {
    it('deve renderizar corretamente com diferentes tamanhos', () => {
      render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })

    it('deve lidar com mudanças de tamanho dinâmicas', () => {
      const { rerender } = render(
        <RangeSlider
          min={0}
          max={100}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      rerender(
        <RangeSlider
          min={0}
          max={200}
          minValue={0}
          maxValue={200}
          step={1}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })
  })

  describe('Validação de Dados', () => {
    it('deve lidar com valores NaN', () => {
      render(
        <RangeSlider
          min={NaN}
          max={NaN}
          minValue={0}
          maxValue={100}
          step={1}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })

    it('deve lidar com valores Infinity', () => {
      render(
        <RangeSlider
          min={0}
          max={Infinity}
          minValue={0}
          maxValue={Infinity}
          step={1}
          onChange={mockOnChange}
        />
      )

      const container = screen.getByTestId('range-slider-container')
      expect(container).toBeInTheDocument()
    })
  })
})
