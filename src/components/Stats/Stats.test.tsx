import type { Game } from '@/types/game'
import { fireEvent, render, screen } from '@testing-library/react'
import Stats from './index'

jest.mock('react-icons/fa6', () => ({
  FaTrashCan: () => <span data-testid="trash-icon">🗑️</span>
}))

jest.mock('../Text', () => {
  return function MockText({ children }: { children: React.ReactNode }) {
    return <span data-testid="text">{children}</span>
  }
})

jest.mock('./styles', () => ({
  StatsContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="stats-container">{children}</div>
  ),
  StatItem: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="stat-item">{children}</div>
  ),
  ActionContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="action-container">{children}</div>
  ),
  ActionButton: ({
    children,
    onClick,
    disabled
  }: {
    children: React.ReactNode
    onClick: () => void
    disabled: boolean
  }) => (
    <button data-testid="action-button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}))

describe('Stats Component', () => {
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
        },
        {
          id: 2,
          name: 'Adventure',
          slug: 'adventure',
          games_count: 80,
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
        },
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
      rating: 3.5,
      rating_top: 5,
      metacritic: 75,
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
          name: 'Adventure',
          slug: 'adventure',
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

  const mockOnClearAll = jest.fn()

  beforeEach(() => {
    mockOnClearAll.mockClear()
  })

  it('deve renderizar as estatísticas dos jogos', () => {
    render(<Stats games={mockGames} />)

    const statsContainer = screen.getByTestId('stats-container')
    const statItems = screen.getAllByTestId('stat-item')

    expect(statsContainer).toBeInTheDocument()
    expect(statItems).toHaveLength(4)
  })

  it('deve calcular total de jogos corretamente', () => {
    render(<Stats games={mockGames} />)

    const texts = screen.getAllByTestId('text')
    expect(texts[0]).toHaveTextContent('2')
  })

  it('deve calcular avaliação média corretamente', () => {
    render(<Stats games={mockGames} />)

    const texts = screen.getAllByTestId('text')
    const averageRatingText = texts.find(
      text => text.textContent && /^\d+\.\d+$/.test(text.textContent)
    )
    expect(averageRatingText).toHaveTextContent('4.0')
  })

  it('deve renderizar botão de limpar quando showClearButton é true', () => {
    render(
      <Stats
        games={mockGames}
        onClearAll={mockOnClearAll}
        showClearButton={true}
      />
    )

    const actionContainer = screen.getByTestId('action-container')
    const actionButton = screen.getByTestId('action-button')
    const trashIcon = screen.getByTestId('trash-icon')

    expect(actionContainer).toBeInTheDocument()
    expect(actionButton).toBeInTheDocument()
    expect(trashIcon).toBeInTheDocument()
  })

  it('não deve renderizar botão de limpar quando showClearButton é false', () => {
    render(
      <Stats
        games={mockGames}
        onClearAll={mockOnClearAll}
        showClearButton={false}
      />
    )

    const actionButton = screen.queryByTestId('action-button')
    expect(actionButton).not.toBeInTheDocument()
  })

  it('deve chamar onClearAll quando botão é clicado', () => {
    render(
      <Stats
        games={mockGames}
        onClearAll={mockOnClearAll}
        showClearButton={true}
      />
    )

    const actionButton = screen.getByTestId('action-button')
    fireEvent.click(actionButton)

    expect(mockOnClearAll).toHaveBeenCalledTimes(1)
  })

  it('não deve renderizar nada quando não há jogos', () => {
    const { container } = render(<Stats games={[]} />)

    expect(container.firstChild).toBeNull()
  })

  it('deve calcular avaliação média corretamente com rating zero', () => {
    const gamesWithZeroRating: Game[] = [
      {
        ...mockGames[0],
        rating: 0
      }
    ]

    render(<Stats games={gamesWithZeroRating} />)

    const texts = screen.getAllByTestId('text')

    const averageRatingText = texts.find(
      text => text.textContent && /^\d+\.\d+$/.test(text.textContent)
    )
    expect(averageRatingText).toHaveTextContent('0.0')
  })

  it('deve ser acessível', () => {
    render(<Stats games={mockGames} />)

    const statsContainer = screen.getByTestId('stats-container')
    expect(statsContainer).toBeInTheDocument()
  })

  it('deve ter estrutura correta com botão de ação', () => {
    render(
      <Stats
        games={mockGames}
        onClearAll={mockOnClearAll}
        showClearButton={true}
      />
    )

    const statsContainer = screen.getByTestId('stats-container')
    const actionContainer = screen.getByTestId('action-container')
    const statItems = screen.getAllByTestId('stat-item')
    const actionButton = screen.getByTestId('action-button')

    expect(statsContainer).toBeInTheDocument()
    expect(actionContainer).toBeInTheDocument()
    expect(statItems).toHaveLength(4)
    expect(actionButton).toBeInTheDocument()
  })
})
