import { MetacriticLabel, MetacriticScoreSize } from '@/types/common'
import { render, screen } from '@testing-library/react'
import MetacriticScore from './index'

jest.mock('../../common/ui/Text', () => {
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

  it('deve lidar com score máximo (100)', () => {
    render(<MetacriticScore score={100} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '100')
    expect(texts[1]).toHaveTextContent('100')
  })

  it('deve lidar com score mínimo (-100)', () => {
    render(<MetacriticScore score={-100} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '-100')
    expect(texts[1]).toHaveTextContent('-100')
  })

  it('deve lidar com score decimal', () => {
    render(<MetacriticScore score={85.5} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '85.5')
    expect(texts[1]).toHaveTextContent('85.5')
  })

  it('deve renderizar múltiplos componentes independentemente', () => {
    render(
      <div>
        <MetacriticScore score={85} />
        <MetacriticScore score={90} showLabel={false} />
        <MetacriticScore score={75} size={MetacriticScoreSize.LARGE} />
      </div>
    )

    const scoreElements = screen.getAllByTestId('metacritic-score')
    expect(scoreElements).toHaveLength(3)
    expect(scoreElements[0]).toHaveAttribute('data-score', '85')
    expect(scoreElements[1]).toHaveAttribute('data-score', '90')
    expect(scoreElements[2]).toHaveAttribute('data-score', '75')
  })

  it('deve manter props consistentes após re-renderização', () => {
    const { rerender } = render(
      <MetacriticScore
        score={85}
        showLabel={true}
        size={MetacriticScoreSize.MEDIUM}
      />
    )

    let scoreElement = screen.getByTestId('metacritic-score')
    let texts = screen.getAllByTestId('metacritic-text')
    expect(scoreElement).toHaveAttribute('data-score', '85')
    expect(scoreElement).toHaveAttribute(
      'data-size',
      MetacriticScoreSize.MEDIUM
    )
    expect(texts).toHaveLength(2)

    rerender(
      <MetacriticScore
        score={90}
        showLabel={false}
        size={MetacriticScoreSize.LARGE}
      />
    )

    scoreElement = screen.getByTestId('metacritic-score')
    texts = screen.getAllByTestId('metacritic-text')
    expect(scoreElement).toHaveAttribute('data-score', '90')
    expect(scoreElement).toHaveAttribute('data-size', MetacriticScoreSize.LARGE)
    expect(texts).toHaveLength(1)
  })

  it('deve lidar com score muito alto', () => {
    render(<MetacriticScore score={999} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '999')
    expect(texts[1]).toHaveTextContent('999')
  })

  it('deve lidar com score muito baixo', () => {
    render(<MetacriticScore score={-999} />)

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toHaveAttribute('data-score', '-999')
    expect(texts[1]).toHaveTextContent('-999')
  })

  it('deve renderizar com label customizado quando showLabel é true', () => {
    render(<MetacriticScore score={85} showLabel={true} />)

    const texts = screen.getAllByTestId('metacritic-text')
    expect(texts[0]).toHaveTextContent(MetacriticLabel.DEFAULT)
  })

  it('deve renderizar sem label quando showLabel é false', () => {
    render(<MetacriticScore score={85} showLabel={false} />)

    const texts = screen.getAllByTestId('metacritic-text')
    expect(texts).toHaveLength(1)
    expect(texts[0]).toHaveTextContent('85')
  })

  it('deve ter estrutura correta com todos os elementos', () => {
    render(
      <MetacriticScore
        score={85}
        showLabel={true}
        size={MetacriticScoreSize.MEDIUM}
      />
    )

    const scoreElement = screen.getByTestId('metacritic-score')
    const texts = screen.getAllByTestId('metacritic-text')

    expect(scoreElement).toBeInTheDocument()
    expect(texts).toHaveLength(2)
    expect(scoreElement).toContainElement(texts[0])
    expect(scoreElement).toContainElement(texts[1])
  })
})
