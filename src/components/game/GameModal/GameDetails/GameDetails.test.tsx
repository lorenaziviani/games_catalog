import { LightTheme } from '@/styles/theme'
import type { Game } from '@/types/game'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import GameDetails from './index'
jest.mock('@/services/observability/providers/LogRocketProvider', () => ({
  LogRocketProvider: jest.fn(() => null)
}))

jest.mock('@/hooks/useFavorites', () => ({
  useIsFavorite: () => ({
    isFavorite: false,
    toggleFavorite: jest.fn()
  })
}))

jest.mock('@/components/common/ui/Image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="game-image" />
  )
}))

jest.mock('@/components/common/ui/Text', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  )
}))

jest.mock('@/components/common/ui/TagsContainer', () => ({
  __esModule: true,
  default: ({ items }: { items?: Array<{ id: number; name: string }> }) => (
    <div data-testid="tags-container">
      {items?.map((item: { id: number; name: string }) => (
        <span key={item.id}>{item.name}</span>
      ))}
    </div>
  )
}))

jest.mock('@/components/features/favorites/FavoriteButton', () => ({
  __esModule: true,
  default: ({ isFavorite }: { isFavorite: boolean }) => (
    <button data-testid="favorite-button">{isFavorite ? '❤️' : '🤍'}</button>
  )
}))

jest.mock('@/components/game/Info', () => ({
  __esModule: true,
  default: ({ released, playtime }: { released: string; playtime: number }) => (
    <div data-testid="info-component">
      <span>{released}</span>
      <span>{playtime}h</span>
    </div>
  )
}))

jest.mock('@/components/game/MetacriticScore', () => ({
  __esModule: true,
  default: ({ score }: { score?: number }) => (
    <span data-testid="metacritic-score">{score}</span>
  )
}))

jest.mock('@/components/game/RatingBadge', () => ({
  __esModule: true,
  default: ({ rating }: { rating?: number }) => (
    <span data-testid="rating-badge">{rating}</span>
  )
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={LightTheme}>{component}</ThemeProvider>)
}

const mockGame: Game = {
  id: 1,
  name: 'Test Game',
  slug: 'test-game',
  background_image: 'https://example.com/image.jpg',
  rating: 4.5,
  rating_top: 5,
  metacritic: 85,
  playtime: 20,
  released: '2023-01-01',
  updated: '2023-01-01T00:00:00',
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
  ratings: [],
  ratings_count: 50,
  reviews_text_count: 5,
  suggestions_count: 10,
  user_game: null,
  reviews_count: 5,
  saturated_color: '0f0f0f',
  dominant_color: '0f0f0f',
  platforms: [
    {
      platform: {
        id: 4,
        name: 'PC',
        slug: 'pc',
        image: null,
        year_end: null,
        year_start: null,
        games_count: 1000,
        image_background: 'https://example.com/platform-bg.jpg'
      },
      released_at: '2023-01-01',
      requirements_en: {
        minimum: 'Windows 10',
        recommended: 'Windows 10, 8GB RAM'
      },
      requirements_ru: null
    }
  ],
  genres: [
    {
      id: 1,
      name: 'Action',
      slug: 'action',
      games_count: 100,
      image_background: 'https://example.com/genre-bg.jpg'
    }
  ],
  tags: [
    {
      id: 1,
      name: 'Open World',
      slug: 'open-world',
      language: 'eng',
      games_count: 50,
      image_background: 'https://example.com/tag-bg.jpg'
    }
  ],
  short_screenshots: [
    {
      id: 1,
      image: 'https://example.com/screenshot.jpg'
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
        games_count: 10000,
        image_background: 'https://example.com/store-bg.jpg'
      }
    }
  ],
  clip: null
}

const mockGameDetails = {
  id: 1,
  name: 'Test Game',
  slug: 'test-game',
  background_image: 'https://example.com/image.jpg',
  rating: 4.5,
  rating_top: 5,
  metacritic: 85,
  playtime: 20,
  released: '2023-01-01',
  updated: '2023-01-01T00:00:00',
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
  user_game: 'test',
  reviews_count: 5,
  saturated_color: '0f0f0f',
  dominant_color: '0f0f0f',
  platforms: [],
  stores: [],
  developers: [],
  genres: [],
  tags: [],
  short_screenshots: [],
  clip: 'test-clip',
  description: 'This is a test game description',
  website: 'https://example.com',
  reddit_url: 'https://reddit.com/r/test',
  reddit_name: 'test',
  reddit_description: 'Test game subreddit',
  reddit_logo: 'https://example.com/logo.jpg',
  screenshots_count: 10,
  movies_count: 5,
  creators_count: 3,
  achievements_count: 50,
  parent_achievements: 'parent',
  metacritic_url: 'https://example.com/metacritic',
  parents_count: 0,
  additions_count: 0,
  game_series_count: 0,
  user_reviews: [],
  publishers: [],
  esrb_rating: undefined,
  clips: {
    clip: 'test-clip',
    clips: {
      320: 'test-320',
      640: 'test-640',
      full: 'test-full'
    },
    video: 'test-video',
    preview: 'test-preview'
  },
  requirements: {
    minimum: 'Minimum requirements',
    recommended: 'Recommended requirements'
  },
  description_raw: 'This is a test game description'
}

describe('GameDetails', () => {
  it('renderiza as informações básicas do jogo', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
      />
    )

    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getAllByTestId('game-image')[0]).toBeInTheDocument()
    expect(screen.getByTestId('favorite-button')).toBeInTheDocument()
    expect(screen.getByTestId('rating-badge')).toBeInTheDocument()
  })

  it('renderiza a descrição quando disponível', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
      />
    )

    expect(screen.getByText('Descrição')).toBeInTheDocument()
    expect(screen.getByTestId('game-description')).toBeInTheDocument()
  })

  it('renderiza loading quando está carregando', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={null}
        loading={true}
        error={null}
      />
    )

    expect(
      screen.getByText('Carregando detalhes do jogo...')
    ).toBeInTheDocument()
  })

  it('renderiza erro quando há erro', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={null}
        loading={false}
        error="Erro ao carregar detalhes"
      />
    )

    expect(screen.getByText(/erro ao carregar detalhes/i)).toBeInTheDocument()
  })

  it('renderiza gêneros quando disponíveis', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
      />
    )

    expect(screen.getByText('Gêneros')).toBeInTheDocument()
  })

  it('renderiza plataformas quando disponíveis', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
      />
    )

    expect(screen.getByText('Plataformas')).toBeInTheDocument()
  })

  it('renderiza tags quando disponíveis', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
      />
    )

    expect(screen.getByText('Tags')).toBeInTheDocument()
  })

  it('renderiza screenshots quando disponíveis', () => {
    renderWithTheme(
      <GameDetails
        game={mockGame}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
      />
    )

    expect(screen.getByText('Screenshots')).toBeInTheDocument()
  })

  it('não renderiza seções opcionais quando não há dados', () => {
    const gameWithoutOptionalData = {
      ...mockGame,
      tags: [],
      short_screenshots: []
    }

    renderWithTheme(
      <GameDetails
        game={gameWithoutOptionalData}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
      />
    )

    expect(screen.queryByText('Tags')).not.toBeInTheDocument()
    expect(screen.queryByText('Screenshots')).not.toBeInTheDocument()
  })
})
