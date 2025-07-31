import { MetacriticLabel, MetacriticScoreSize } from '@/types/common'
import { render, screen } from '@testing-library/react'
import MetacriticScore from './index'

jest.mock('../Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <span data-testid="metacritic-text">{children}</span>
  }
})

jest.mock('./styles', () => ({
  MetacriticScore: ({
    children,
    $score,
    $size
  }: {
    children: React.ReactNode
    $score: number
    $size: MetacriticScoreSize
  }) => (
    <div data-testid="metacritic-score" data-score={$score} data-size={$size}>
      {children}
    </div>
  )
}))

describe('MetacriticScore Component', () => {
  it('deve renderizar o score com label', () => {
    render(<MetacriticScore score={85} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toBeInTheDocument()
    expect(scoreElement).toHaveAttribute('data-score', '85')
    expect(texts).toHaveLength(2)
    expect(texts[0]).toHaveTextContent(MetacriticLabel.DEFAULT)
    expect(texts[1]).toHaveTextContent('85')
  })

  it('deve renderizar o score sem label', () => {
    render(<MetacriticScore score={90} showLabel={false} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toBeInTheDocument()
    expect(scoreElement).toHaveAttribute('data-score', '90')
    expect(texts).toHaveLength(1)
    expect(texts[0]).toHaveTextContent('90')
  })

  it('deve renderizar com tamanho padrão', () => {
    render(<MetacriticScore score={85} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    expect(scoreElement).toHaveAttribute(
      'data-size',
      MetacriticScoreSize.MEDIUM
    )
  })

  it('deve renderizar com tamanho customizado', () => {
    render(<MetacriticScore score={85} size={MetacriticScoreSize.LARGE} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    expect(scoreElement).toHaveAttribute('data-size', MetacriticScoreSize.LARGE)
  })

  it('deve renderizar com diferentes scores', () => {
    const { rerender } = render(<MetacriticScore score={95} />)
    expect(screen.getByTestId('metacritic-score')).toHaveAttribute(
      'data-score',
      '95'
    )

    rerender(<MetacriticScore score={75} />)
    expect(screen.getByTestId('metacritic-score')).toHaveAttribute(
      'data-score',
      '75'
    )

    rerender(<MetacriticScore score={60} />)
    expect(screen.getByTestId('metacritic-score')).toHaveAttribute(
      'data-score',
      '60'
    )
  })

  it('deve renderizar com diferentes tamanhos', () => {
    const { rerender } = render(
      <MetacriticScore score={85} size={MetacriticScoreSize.SMALL} />
    )
    expect(screen.getByTestId('metacritic-score')).toHaveAttribute(
      'data-size',
      MetacriticScoreSize.SMALL
    )

    rerender(<MetacriticScore score={85} size={MetacriticScoreSize.MEDIUM} />)
    expect(screen.getByTestId('metacritic-score')).toHaveAttribute(
      'data-size',
      MetacriticScoreSize.MEDIUM
    )

    rerender(<MetacriticScore score={85} size={MetacriticScoreSize.LARGE} />)
    expect(screen.getByTestId('metacritic-score')).toHaveAttribute(
      'data-size',
      MetacriticScoreSize.LARGE
    )
  })

  it('deve combinar todas as props corretamente', () => {
    render(
      <MetacriticScore
        score={88}
        showLabel={true}
        size={MetacriticScoreSize.LARGE}
      />
    )

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '88')
    expect(scoreElement).toHaveAttribute('data-size', MetacriticScoreSize.LARGE)
    expect(texts).toHaveLength(2)
    expect(texts[0]).toHaveTextContent(MetacriticLabel.DEFAULT)
    expect(texts[1]).toHaveTextContent('88')
  })

  it('deve lidar com score zero', () => {
    render(<MetacriticScore score={0} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '0')
    expect(texts[1]).toHaveTextContent('0')
  })

  it('deve lidar com score negativo', () => {
    render(<MetacriticScore score={-5} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '-5')
    expect(texts[1]).toHaveTextContent('-5')
  })

  it('deve ser acessível', () => {
    render(<MetacriticScore score={85} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    expect(scoreElement).toBeInTheDocument()
  })
})
