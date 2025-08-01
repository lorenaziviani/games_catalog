import { LightTheme } from '@/styles/theme'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import 'jest-styled-components'
import { ThemeProvider } from 'styled-components'
import GameListWithModal from './index'

jest.mock('@/services/observability/providers/LogRocketProvider', () => ({
  LogRocketProvider: jest.fn(() => null)
}))

jest.mock('@/hooks/useGameModal', () => ({
  useGameModal: () => ({
    isOpen: false,
    selectedGame: null,
    gameDetails: null,
    loading: false,
    error: null,
    openModal: jest.fn(),
    closeModal: jest.fn()
  })
}))

jest.mock('../List', () => ({
  __esModule: true,
  default: ({ games }: { games: import('@/types/game').Game[] }) => (
    <div data-testid="game-list">
      {games.length > 0 ? 'Games loaded' : 'No games'}
    </div>
  )
}))

jest.mock('../GameModal', () => ({
  __esModule: true,
  default: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div data-testid="game-modal">Modal</div> : null
}))

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={LightTheme}>{component}</ThemeProvider>)
}

describe('GameListWithModal', () => {
  it('renderiza a estrutura básica', () => {
    renderWithTheme(
      <GameListWithModal
        games={[]}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={jest.fn()}
      />
    )

    expect(screen.getByTestId('game-list')).toBeInTheDocument()
  })

  it('renderiza quando há jogos', () => {
    const mockGames = [
      {
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
        platforms: [],
        genres: [],
        tags: [],
        short_screenshots: [],
        stores: [],
        clip: null
      }
    ]

    renderWithTheme(
      <GameListWithModal
        games={mockGames}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={jest.fn()}
      />
    )

    expect(screen.getByText('Games loaded')).toBeInTheDocument()
  })

  it('renderiza quando não há jogos', () => {
    renderWithTheme(
      <GameListWithModal
        games={[]}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={jest.fn()}
      />
    )

    expect(screen.getByText('No games')).toBeInTheDocument()
  })
})
