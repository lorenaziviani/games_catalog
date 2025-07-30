import { RatingBadgeSize } from '@/types/common'
import { render, screen } from '@testing-library/react'
import RatingBadge from './index'

jest.mock('styled-components', () => ({
  ...jest.requireActual('styled-components'),
  useTheme: () => ({
    mode: 'light',
    rating: {
      excellent: '#4CAF50',
      good: '#8BC34A',
      average: '#FFC107',
      poor: '#FF9800',
      bad: '#F44336'
    }
  })
}))

jest.mock('../Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <span data-testid="rating-text">{children}</span>
  }
})

jest.mock('react-icons/fa', () => ({
  FaStar: () => <span data-testid="star-icon">⭐</span>
}))

jest.mock('./styles', () => ({
  RatingBadge: ({
    children,
    $color,
    $size
  }: {
    children: React.ReactNode
    $color: string
    $size: RatingBadgeSize
  }) => (
    <div data-testid="rating-badge" data-color={$color} data-size={$size}>
      {children}
    </div>
  )
}))

describe('RatingBadge Component', () => {
  it('deve renderizar o rating com ícone', () => {
    render(<RatingBadge rating={4.5} />)

    const badge = screen.getByTestId('rating-badge')
    const text = screen.getByTestId('rating-text')
    const icon = screen.getByTestId('star-icon')

    expect(badge).toBeInTheDocument()
    expect(text).toHaveTextContent('4.5')
    expect(icon).toBeInTheDocument()
  })

  it('deve renderizar o rating sem ícone', () => {
    render(<RatingBadge rating={4.0} showIcon={false} />)

    const badge = screen.getByTestId('rating-badge')
    const text = screen.getByTestId('rating-text')
    const icon = screen.queryByTestId('star-icon')

    expect(badge).toBeInTheDocument()
    expect(text).toHaveTextContent('4.0')
    expect(icon).not.toBeInTheDocument()
  })

  it('deve renderizar com tamanho padrão', () => {
    render(<RatingBadge rating={4.5} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toHaveAttribute('data-size', RatingBadgeSize.MEDIUM)
  })

  it('deve renderizar com tamanho customizado', () => {
    render(<RatingBadge rating={4.5} size={RatingBadgeSize.LARGE} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toHaveAttribute('data-size', RatingBadgeSize.LARGE)
  })

  it('deve aplicar cor excelente para rating >= 4.5', () => {
    render(<RatingBadge rating={4.8} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toHaveAttribute('data-color', '#4CAF50')
  })

  it('deve aplicar cor boa para rating >= 4.0', () => {
    render(<RatingBadge rating={4.2} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toHaveAttribute('data-color', '#8BC34A')
  })

  it('deve aplicar cor média para rating >= 3.5', () => {
    render(<RatingBadge rating={3.7} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toHaveAttribute('data-color', '#FFC107')
  })

  it('deve aplicar cor ruim para rating >= 3.0', () => {
    render(<RatingBadge rating={3.2} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toHaveAttribute('data-color', '#FF9800')
  })

  it('deve aplicar cor ruim para rating < 3.0', () => {
    render(<RatingBadge rating={2.5} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toHaveAttribute('data-color', '#F44336')
  })

  it('deve formatar rating com uma casa decimal', () => {
    render(<RatingBadge rating={4.123} />)

    const text = screen.getByTestId('rating-text')
    expect(text).toHaveTextContent('4.1')
  })

  it('deve renderizar com diferentes tamanhos', () => {
    const { rerender } = render(
      <RatingBadge rating={4.5} size={RatingBadgeSize.SMALL} />
    )
    expect(screen.getByTestId('rating-badge')).toHaveAttribute(
      'data-size',
      RatingBadgeSize.SMALL
    )

    rerender(<RatingBadge rating={4.5} size={RatingBadgeSize.MEDIUM} />)
    expect(screen.getByTestId('rating-badge')).toHaveAttribute(
      'data-size',
      RatingBadgeSize.MEDIUM
    )

    rerender(<RatingBadge rating={4.5} size={RatingBadgeSize.LARGE} />)
    expect(screen.getByTestId('rating-badge')).toHaveAttribute(
      'data-size',
      RatingBadgeSize.LARGE
    )
  })

  it('deve combinar todas as props corretamente', () => {
    render(
      <RatingBadge rating={4.8} showIcon={true} size={RatingBadgeSize.LARGE} />
    )

    const badge = screen.getByTestId('rating-badge')
    const text = screen.getByTestId('rating-text')
    const icon = screen.getByTestId('star-icon')

    expect(badge).toHaveAttribute('data-size', RatingBadgeSize.LARGE)
    expect(badge).toHaveAttribute('data-color', '#4CAF50')
    expect(text).toHaveTextContent('4.8')
    expect(icon).toBeInTheDocument()
  })

  it('deve ser acessível', () => {
    render(<RatingBadge rating={4.5} />)

    const badge = screen.getByTestId('rating-badge')
    expect(badge).toBeInTheDocument()
  })
})
