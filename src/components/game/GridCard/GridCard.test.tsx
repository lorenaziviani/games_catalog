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

jest.mock('../../common/ui/Text', () => {
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
      slug: 'game-1',
      background_image: 'image1.jpg',
      rating: 4.5,
      rating_top: 5,
      metacritic: 85,
      playtime: 20,
      released: '2023-01-15',
      updated: '2023-01-15T00:00:00',
      tba: false,
      added: 100,
      added_by_status: {
        yet: 10,
        owned: 50,
        beaten: 30,
        toplay: 5,
        dropped: 3,
        playing: 2
      },
      ratings: [
        {
          id: 5,
          title: 'exceptional',
          count: 50,
          percent: 80.0
        }
      ],
      ratings_count: 50,
      reviews_text_count: 5,
      suggestions_count: 10,
      user_game: null,
      reviews_count: 5,
      saturated_color: '0f0f0f',
      dominant_color: '0f0f0f',
      short_screenshots: [],
      clip: null,
      genres: [
        {
          id: 1,
          name: 'Action',
          slug: 'action',
          games_count: 100,
          image_background: 'image1.jpg'
        }
      ],
      platforms: [
        {
          platform: {
            id: 1,
            name: 'PC',
            slug: 'pc',
            image: null,
            year_end: null,
            year_start: null,
            games_count: 100,
            image_background: 'image1.jpg'
          },
          released_at: '2023-01-15',
          requirements_en: {
            minimum: 'Windows 10',
            recommended: 'Windows 11'
          },
          requirements_ru: null
        }
      ],
      stores: [
        {
          id: 1,
          store: {
            id: 1,
            name: 'Steam',
            slug: 'steam',
            domain: 'store.steampowered.com',
            games_count: 100,
            image_background: 'image1.jpg'
          }
        }
      ],
      tags: [
        {
          id: 1,
          name: 'Adventure',
          slug: 'adventure',
          language: 'eng',
          games_count: 100,
          image_background: 'image1.jpg'
        }
      ]
    },
    {
      id: 2,
      name: 'Game 2',
      slug: 'game-2',
      background_image: 'image2.jpg',
      rating: 4.0,
      rating_top: 5,
      metacritic: 80,
      playtime: 15,
      released: '2023-02-20',
      updated: '2023-02-20T00:00:00',
      tba: false,
      added: 80,
      added_by_status: {
        yet: 5,
        owned: 30,
        beaten: 20,
        toplay: 3,
        dropped: 2,
        playing: 1
      },
      ratings: [
        {
          id: 4,
          title: 'recommended',
          count: 30,
          percent: 70.0
        }
      ],
      ratings_count: 30,
      reviews_text_count: 3,
      suggestions_count: 8,
      user_game: null,
      reviews_count: 3,
      saturated_color: '0f0f0f',
      dominant_color: '0f0f0f',
      short_screenshots: [],
      clip: null,
      genres: [
        {
          id: 2,
          name: 'RPG',
          slug: 'rpg',
          games_count: 80,
          image_background: 'image2.jpg'
        }
      ],
      platforms: [
        {
          platform: {
            id: 2,
            name: 'PS5',
            slug: 'ps5',
            image: null,
            year_end: null,
            year_start: null,
            games_count: 80,
            image_background: 'image2.jpg'
          },
          released_at: '2023-02-20',
          requirements_en: {
            minimum: 'PS5',
            recommended: 'PS5'
          },
          requirements_ru: null
        }
      ],
      stores: [
        {
          id: 2,
          store: {
            id: 2,
            name: 'PlayStation Store',
            slug: 'playstation-store',
            domain: 'store.playstation.com',
            games_count: 80,
            image_background: 'image2.jpg'
          }
        }
      ],
      tags: [
        {
          id: 2,
          name: 'RPG',
          slug: 'rpg',
          language: 'eng',
          games_count: 80,
          image_background: 'image2.jpg'
        }
      ]
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
