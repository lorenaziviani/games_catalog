import type { Game } from '@/types/game'
import { render, screen } from '@testing-library/react'
import GridCard from './index'

jest.mock('../Card', () => {
  return function MockCard({ game }: { game: Game }) {
    return (
      <div data-testid="card" data-game-id={game.id}>
        {game.name}
      </div>
    )
  }
})

jest.mock('../Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <span data-testid="text">{children}</span>
  }
})

jest.mock('./styles', () => ({
  GridCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="grid-card">{children}</div>
  ),
  EmptyContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="empty-container">{children}</div>
  )
}))

describe('GridCard Component', () => {
  const mockGames: Game[] = [
    {
      id: 1,
      name: 'Game 1',
      background_image: 'image1.jpg',
      rating: 4.5,
      rating_top: 5,
      metacritic: 85,
      released: '2023-01-15',
      playtime: 20,
      genres: [{ id: 1, name: 'Action' }],
      platforms: [{ platform: { id: 1, name: 'PC' } }],
      stores: [{ store: { id: 1, name: 'Steam' } }],
      tags: [{ id: 1, name: 'Adventure' }],
      developers: [{ id: 1, name: 'Developer 1' }]
    },
    {
      id: 2,
      name: 'Game 2',
      background_image: 'image2.jpg',
      rating: 4.0,
      rating_top: 5,
      metacritic: 80,
      released: '2023-02-20',
      playtime: 15,
      genres: [{ id: 2, name: 'RPG' }],
      platforms: [{ platform: { id: 2, name: 'PS5' } }],
      stores: [{ store: { id: 2, name: 'PlayStation Store' } }],
      tags: [{ id: 2, name: 'RPG' }],
      developers: [{ id: 2, name: 'Developer 2' }]
    }
  ]

  it('deve renderizar os cards dos jogos', () => {
    render(<GridCard games={mockGames} />)

    const grid = screen.getByTestId('grid-card')
    const cards = screen.getAllByTestId('card')

    expect(grid).toBeInTheDocument()
    expect(cards).toHaveLength(2)
    expect(cards[0]).toHaveAttribute('data-game-id', '1')
    expect(cards[1]).toHaveAttribute('data-game-id', '2')
  })

  it('deve renderizar mensagem de vazio quando não há jogos', () => {
    render(<GridCard games={[]} />)

    const emptyContainer = screen.getByTestId('empty-container')
    const text = screen.getByTestId('text')

    expect(emptyContainer).toBeInTheDocument()
    expect(text).toHaveTextContent('Nenhum jogo encontrado.')
  })

  it('deve renderizar mensagem customizada de vazio', () => {
    const customMessage = 'Nenhum resultado encontrado.'
    render(<GridCard games={[]} emptyMessage={customMessage} />)

    const text = screen.getByTestId('text')
    expect(text).toHaveTextContent(customMessage)
  })

  it('deve renderizar com array vazio', () => {
    render(<GridCard games={[]} />)

    const emptyContainer = screen.getByTestId('empty-container')
    expect(emptyContainer).toBeInTheDocument()
  })

  it('deve renderizar com um jogo', () => {
    const singleGame = [mockGames[0]]
    render(<GridCard games={singleGame} />)

    const grid = screen.getByTestId('grid-card')
    const cards = screen.getAllByTestId('card')

    expect(grid).toBeInTheDocument()
    expect(cards).toHaveLength(1)
    expect(cards[0]).toHaveAttribute('data-game-id', '1')
  })

  it('deve renderizar com múltiplos jogos', () => {
    render(<GridCard games={mockGames} />)

    const grid = screen.getByTestId('grid-card')
    const cards = screen.getAllByTestId('card')

    expect(grid).toBeInTheDocument()
    expect(cards).toHaveLength(2)
  })

  it('deve ser acessível', () => {
    render(<GridCard games={mockGames} />)

    const grid = screen.getByTestId('grid-card')
    expect(grid).toBeInTheDocument()
  })

  it('deve ter estrutura correta com jogos', () => {
    render(<GridCard games={mockGames} />)

    const grid = screen.getByTestId('grid-card')
    const cards = screen.getAllByTestId('card')

    expect(grid).toContainElement(cards[0])
    expect(grid).toContainElement(cards[1])
  })

  it('deve ter estrutura correta sem jogos', () => {
    render(<GridCard games={[]} />)

    const emptyContainer = screen.getByTestId('empty-container')
    const text = screen.getByTestId('text')

    expect(emptyContainer).toContainElement(text)
  })
})
