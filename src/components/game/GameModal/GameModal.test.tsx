import favoritesReducer from '@/store/favorites/reducer'
import { LightTheme } from '@/styles/theme'
import type { Game } from '@/types/game'
import { configureStore } from '@reduxjs/toolkit'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import GameModal from './index'

jest.mock('react-dom', () => ({
  ...jest.requireActual('react-dom'),
  createPortal: (node: React.ReactNode) => node
}))

jest.mock('./GameDetails', () => ({
  __esModule: true,
  default: ({
    game,
    gameDetails,
    loading,
    error
  }: {
    game: Game
    gameDetails: GameDetails | null
    loading: boolean
    error: string | null
  }) => (
    <div data-testid="game-details">
      <h2>{game.name}</h2>
      {loading && <div data-testid="loading">Carregando...</div>}
      {error && <div data-testid="error">{error}</div>}
      {gameDetails && <div data-testid="details">Detalhes carregados</div>}
    </div>
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

describe('GameModal', () => {
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
    platforms: [],
    genres: [],
    tags: [],
    short_screenshots: [],
    stores: [],
    clip: null
  }

  const mockOnClose = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should not render when modal is closed', () => {
    renderWithProviders(
      <GameModal
        isOpen={false}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    expect(screen.queryByTestId('game-details')).not.toBeInTheDocument()
  })

  it('should not render when game is null', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={null}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    expect(screen.queryByTestId('game-details')).not.toBeInTheDocument()
  })

  it('should render modal when open and game is provided', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByTestId('game-details')).toBeInTheDocument()
    expect(screen.getByText('Test Game')).toBeInTheDocument()
  })

  it('should display loading state', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={true}
        error={null}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByTestId('loading')).toBeInTheDocument()
    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })

  it('should display error state', () => {
    const errorMessage = 'Erro ao carregar detalhes'

    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={errorMessage}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByTestId('error')).toBeInTheDocument()
    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })

  it('should display game details when loaded', () => {
    const mockGameDetails = {
      description: 'Descrição do jogo',
      website: 'https://example.com'
    }

    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={mockGameDetails}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByTestId('details')).toBeInTheDocument()
    expect(screen.getByText('Detalhes carregados')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    const closeButton = screen.getByRole('button', { name: /fechar modal/i })
    fireEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when clicking outside modal', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    const overlay = screen.getByRole('dialog')
    fireEvent.click(overlay)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should not call onClose when clicking inside modal content', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    const modalContent = screen.getByTestId('game-details')
    fireEvent.click(modalContent)

    expect(mockOnClose).not.toHaveBeenCalled()
  })

  it('should handle keyboard events', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })

  it('should handle different game data', () => {
    const differentGame = {
      ...mockGame,
      id: 2,
      name: 'Different Game'
    }

    renderWithProviders(
      <GameModal
        isOpen={true}
        game={differentGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Different Game')).toBeInTheDocument()
  })

  it('should handle empty game details', () => {
    renderWithProviders(
      <GameModal
        isOpen={true}
        game={mockGame}
        gameDetails={null}
        loading={false}
        error={null}
        onClose={mockOnClose}
      />
    )

    expect(screen.getByText('Test Game')).toBeInTheDocument()
    expect(screen.queryByTestId('details')).not.toBeInTheDocument()
  })
})
