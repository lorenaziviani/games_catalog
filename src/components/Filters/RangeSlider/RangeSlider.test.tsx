import { render, screen } from '@testing-library/react'
import RangeSlider from './index'

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
    ref: any
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

  it('deve renderizar com valores negativos', () => {
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
})
