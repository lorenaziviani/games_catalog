import { LoadingMessage } from '@/types/common'
import type { Game } from '@/types/game'
import { render, screen } from '@testing-library/react'
import List from './index'

jest.mock('../GridCard', () => {
  return function MockGridCard({ games }: { games: Game[] }) {
    return (
      <div data-testid="grid-card" data-games-count={games.length}>
        Grid Card
      </div>
    )
  }
})

jest.mock('../LoadingSpinner', () => {
  return function MockLoadingSpinner({ message }: { message: string }) {
    return (
      <div data-testid="loading-spinner" data-message={message}>
        Loading...
      </div>
    )
  }
})

jest.mock('../Pagination', () => {
  return function MockPagination({
    currentPage,
    totalPages
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) {
    return (
      <div
        data-testid="pagination"
        data-current-page={currentPage}
        data-total-pages={totalPages}
      >
        Pagination
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
  Container: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="list-container">{children}</div>
  ),
  ErrorMessage: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="error-message">{children}</div>
  )
}))

describe('List Component', () => {
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
    }
  ]

  const mockOnPageChange = jest.fn()

  beforeEach(() => {
    mockOnPageChange.mockClear()
  })

  it('deve renderizar o loading spinner quando carregando e sem jogos', () => {
    render(
      <List
        games={[]}
        loading={true}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    const loadingSpinner = screen.getByTestId('loading-spinner')
    expect(loadingSpinner).toBeInTheDocument()
    expect(loadingSpinner).toHaveAttribute('data-message', LoadingMessage.GAMES)
  })

  it('deve renderizar mensagem de erro', () => {
    const errorMessage = 'Erro ao carregar jogos'
    render(
      <List
        games={mockGames}
        loading={false}
        error={errorMessage}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    const errorContainer = screen.getByTestId('error-message')
    const text = screen.getByTestId('text')
    expect(errorContainer).toBeInTheDocument()
    expect(text).toHaveTextContent(errorMessage)
  })

  it('deve renderizar o grid card com jogos', () => {
    render(
      <List
        games={mockGames}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    const gridCard = screen.getByTestId('grid-card')
    expect(gridCard).toBeInTheDocument()
    expect(gridCard).toHaveAttribute('data-games-count', '1')
  })

  it('deve renderizar paginação quando há mais de uma página', () => {
    render(
      <List
        games={mockGames}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    )

    const pagination = screen.getByTestId('pagination')
    expect(pagination).toBeInTheDocument()
    expect(pagination).toHaveAttribute('data-current-page', '1')
    expect(pagination).toHaveAttribute('data-total-pages', '3')
  })

  it('não deve renderizar paginação quando há apenas uma página', () => {
    render(
      <List
        games={mockGames}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    const pagination = screen.queryByTestId('pagination')
    expect(pagination).not.toBeInTheDocument()
  })

  it('não deve renderizar paginação quando showPagination é false', () => {
    render(
      <List
        games={mockGames}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
        showPagination={false}
      />
    )

    const pagination = screen.queryByTestId('pagination')
    expect(pagination).not.toBeInTheDocument()
  })

  it('deve renderizar com mensagem customizada de loading', () => {
    const customLoadingMessage = 'Carregando jogos...'
    render(
      <List
        games={[]}
        loading={true}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        loadingMessage={customLoadingMessage}
      />
    )

    const loadingSpinner = screen.getByTestId('loading-spinner')
    expect(loadingSpinner).toHaveAttribute('data-message', customLoadingMessage)
  })

  it('deve renderizar com mensagem customizada de vazio', () => {
    const customEmptyMessage = 'Nenhum resultado encontrado'
    render(
      <List
        games={[]}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
        emptyMessage={customEmptyMessage}
      />
    )

    const gridCard = screen.getByTestId('grid-card')
    expect(gridCard).toHaveAttribute('data-games-count', '0')
  })

  it('deve renderizar sem loading quando há jogos', () => {
    render(
      <List
        games={mockGames}
        loading={true}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    const loadingSpinner = screen.queryByTestId('loading-spinner')
    const gridCard = screen.getByTestId('grid-card')

    expect(loadingSpinner).not.toBeInTheDocument()
    expect(gridCard).toBeInTheDocument()
  })

  it('deve ser acessível', () => {
    render(
      <List
        games={mockGames}
        loading={false}
        error={null}
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />
    )

    const container = screen.getByTestId('list-container')
    expect(container).toBeInTheDocument()
  })

  it('deve ter estrutura correta com todos os elementos', () => {
    render(
      <List
        games={mockGames}
        loading={false}
        error="Erro teste"
        currentPage={1}
        totalPages={3}
        onPageChange={mockOnPageChange}
      />
    )

    const container = screen.getByTestId('list-container')
    const errorMessage = screen.getByTestId('error-message')
    const gridCard = screen.getByTestId('grid-card')
    const pagination = screen.getByTestId('pagination')

    expect(container).toContainElement(errorMessage)
    expect(container).toContainElement(gridCard)
    expect(container).toContainElement(pagination)
  })
})
