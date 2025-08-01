import favoritesReducer from '@/store/favorites/reducer'
import { LightTheme } from '@/styles/theme'
import type { Game } from '@/types/game'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import Card from './index'

jest.mock('@/services/observability/providers/LogRocketProvider', () => ({
  LogRocketProvider: jest.fn(() => null)
}))

jest.mock('@/config/env', () => import('@/config/env.mock'))
jest.mock(
  '@/services/configService',
  () => import('@/services/configService.mock')
)
jest.mock('@/config/api', () => import('@/config/api.mock'))

jest.mock('../../features/favorites/FavoriteButton', () => ({
  __esModule: true,
  default: ({
    isFavorite,
    onToggle
  }: {
    isFavorite: boolean
    onToggle: () => void
  }) => (
    <button
      onClick={onToggle}
      aria-label={
        isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'
      }
      data-testid="favorite-button"
    >
      ❤️
    </button>
  )
}))

jest.mock('../../common/ui/Text', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  )
}))

jest.mock('../../common/ui/Image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} data-testid="game-image" />
  )
}))

jest.mock('../Info', () => ({
  __esModule: true,
  default: ({ released, playtime }: { released: string; playtime: number }) => (
    <div data-testid="info-component">
      <span>{new Date(released).toLocaleDateString('pt-BR')}</span>
      <span>{playtime}h</span>
    </div>
  )
}))

jest.mock('../../common/ui/TagsContainer', () => ({
  __esModule: true,
  default: ({ items }: { items?: Array<{ id: number; name: string }> }) => (
    <div data-testid="tags-container">
      {items?.map(item => (
        <span key={item.id}>{item.name}</span>
      ))}
    </div>
  )
}))

jest.mock('../MetacriticScore', () => ({
  __esModule: true,
  default: ({ score }: { score?: number }) => (
    <span data-testid="metacritic-score">{score}</span>
  )
}))

jest.mock('../RatingBadge', () => ({
  __esModule: true,
  default: ({ rating }: { rating?: number }) => (
    <span data-testid="rating-badge">{rating}</span>
  )
}))

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer
    },
    preloadedState: {
      favorites: {
        items: [],
        isLoading: false,
        error: null,
        lastUpdated: null,
        ...initialState
      }
    }
  })
}

const renderWithProviders = (ui: React.ReactElement, initialState = {}) => {
  const store = createTestStore(initialState)

  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={LightTheme}>{ui}</ThemeProvider>
      </Provider>
    ),
    store
  }
}

describe('Card', () => {
  const mockGame: Game = {
    id: 1,
    name: 'Test Game',
    slug: 'test-game',
    background_image: 'https://example.com/game-image.jpg',
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
      },
      {
        platform: {
          id: 187,
          name: 'PlayStation',
          slug: 'playstation',
          image: null,
          year_end: null,
          year_start: null,
          games_count: 500,
          image_background: 'https://example.com/platform-bg.jpg'
        },
        released_at: '2023-01-01',
        requirements_en: {
          minimum: 'PS4',
          recommended: 'PS4 Pro'
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
      },
      {
        id: 2,
        name: 'Adventure',
        slug: 'adventure',
        games_count: 80,
        image_background: 'https://example.com/adventure-bg.jpg'
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
    short_screenshots: [],
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

  const gameWithoutMetacritic: Game = {
    ...mockGame,
    metacritic: null
  }

  it('renderiza o card com informações básicas', () => {
    renderWithProviders(<Card game={mockGame} />)

    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByText('Action')).toBeInTheDocument()
    expect(screen.getByText('Adventure')).toBeInTheDocument()
    expect(screen.getByText('PC')).toBeInTheDocument()
    expect(screen.getByText('PlayStation')).toBeInTheDocument()
  })

  it('renderiza a imagem do jogo', () => {
    renderWithProviders(<Card game={mockGame} />)

    const image = screen.getByAltText('Test Game')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/game-image.jpg')
  })

  it('renderiza o botão de favorito', () => {
    renderWithProviders(<Card game={mockGame} />)

    const favoriteButton = screen.getByRole('button', {
      name: /adicionar aos favoritos/i
    })
    expect(favoriteButton).toBeInTheDocument()
  })

  it('renderiza a avaliação do jogo', () => {
    renderWithProviders(<Card game={mockGame} />)

    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('renderiza a pontuação Metacritic quando disponível', () => {
    renderWithProviders(<Card game={mockGame} />)

    expect(screen.getByText('85')).toBeInTheDocument()
  })

  it('não renderiza a pontuação Metacritic quando não disponível', () => {
    renderWithProviders(<Card game={gameWithoutMetacritic} />)

    expect(screen.queryByText('85')).not.toBeInTheDocument()
  })

  it('renderiza a data de lançamento e tempo de jogo', () => {
    renderWithProviders(<Card game={mockGame} />)

    expect(screen.getByText(/31\/12\/2022|01\/01\/2023/)).toBeInTheDocument()
    expect(screen.getByText('20h')).toBeInTheDocument()
  })

  it('deve chamar onGameClick quando o card é clicado', () => {
    const mockOnGameClick = jest.fn()
    renderWithProviders(<Card game={mockGame} onGameClick={mockOnGameClick} />)

    const card = screen.getByTestId('game-card')
    fireEvent.click(card)

    expect(mockOnGameClick).toHaveBeenCalledWith(mockGame)
  })

  it('não deve chamar onGameClick quando não fornecido', () => {
    renderWithProviders(<Card game={mockGame} />)

    const card = screen.getByTestId('game-card')
    expect(() => fireEvent.click(card)).not.toThrow()
  })

  it('deve parar propagação quando o botão de favorito é clicado', () => {
    const mockOnGameClick = jest.fn()
    renderWithProviders(<Card game={mockGame} onGameClick={mockOnGameClick} />)

    const favoriteButton = screen.getByTestId('favorite-button')
    fireEvent.click(favoriteButton)

    expect(mockOnGameClick).not.toHaveBeenCalled()
  })

  it('deve renderizar com jogo sem imagem', () => {
    const gameWithoutImage = {
      ...mockGame,
      background_image: ''
    }

    renderWithProviders(<Card game={gameWithoutImage} />)

    const image = screen.getByTestId('game-image')
    expect(image).toBeInTheDocument()
  })

  it('deve renderizar com jogo com rating zero', () => {
    const gameWithZeroRating = {
      ...mockGame,
      rating: 0
    }

    renderWithProviders(<Card game={gameWithZeroRating} />)

    expect(screen.getByText('0')).toBeInTheDocument()
  })

  it('deve renderizar com jogo com playtime zero', () => {
    const gameWithZeroPlaytime = {
      ...mockGame,
      playtime: 0
    }

    renderWithProviders(<Card game={gameWithZeroPlaytime} />)

    expect(screen.getByText('0h')).toBeInTheDocument()
  })

  it('deve ser acessível com role e aria-label', () => {
    renderWithProviders(<Card game={mockGame} />)

    const card = screen.getByTestId('game-card')
    expect(card).toBeInTheDocument()
  })

  it('deve renderizar múltiplos cards independentemente', () => {
    const game2 = { ...mockGame, id: 2, name: 'Test Game 2' }
    const game3 = { ...mockGame, id: 3, name: 'Test Game 3' }

    renderWithProviders(
      <div>
        <Card game={mockGame} />
        <Card game={game2} />
        <Card game={game3} />
      </div>
    )

    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.getByText('Test Game 2')).toBeInTheDocument()
    expect(screen.getByText('Test Game 3')).toBeInTheDocument()
  })
})
