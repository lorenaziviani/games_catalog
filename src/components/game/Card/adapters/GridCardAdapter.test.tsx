import type { Game } from '@/types/game'
import { render, screen } from '@testing-library/react'
import type { CardRendererProps } from '../types'
import GridCardAdapter from './GridCardAdapter'

const mockOnGameClick = jest.fn()
const mockGridCard = jest.fn()

jest.mock('@/components/game/GridCard', () => {
  return function MockGridCard(props: import('../types').CardRendererProps) {
    mockGridCard(props)
    return <div data-testid="grid-card">Mock Grid Card</div>
  }
})

const mockGame: Game = {
  id: 1,
  name: 'Test Game',
  slug: 'test-game',
  background_image: 'test-image.jpg',
  rating: 4.5,
  rating_top: 5,
  metacritic: 85,
  playtime: 120,
  released: '2023-01-01',
  updated: '2023-01-01',
  tba: false,
  added: 100,
  added_by_status: {
    yet: 10,
    owned: 50,
    beaten: 20,
    toplay: 15,
    dropped: 5,
    playing: 10
  },
  ratings: [
    {
      id: 1,
      title: 'Exceptional',
      count: 100,
      percent: 80
    }
  ],
  ratings_count: 100,
  reviews_text_count: 50,
  suggestions_count: 10,
  user_game: null,
  reviews_count: 25,
  saturated_color: '#000000',
  dominant_color: '#ffffff',
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
        image_background: 'pc-bg.jpg'
      },
      released_at: '2023-01-01',
      requirements_en: {
        minimum: 'Windows 10',
        recommended: 'Windows 11'
      },
      requirements_ru: null
    }
  ],
  genres: [
    {
      id: 1,
      name: 'Action',
      slug: 'action',
      games_count: 500,
      image_background: 'action-bg.jpg'
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
        games_count: 1000,
        image_background: 'steam-bg.jpg'
      }
    }
  ],
  tags: [
    {
      id: 1,
      name: 'Adventure',
      slug: 'adventure',
      language: 'eng',
      games_count: 300,
      image_background: 'adventure-bg.jpg'
    }
  ],
  esrb_rating: {
    id: 1,
    name: 'Teen',
    slug: 'teen'
  },
  short_screenshots: [
    {
      id: 1,
      image: 'screenshot1.jpg'
    }
  ],
  clip: null
}

describe('GridCardAdapter', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Renderização Básica', () => {
    it('deve renderizar o GridCard com props corretas', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      expect(mockGridCard).toHaveBeenCalledWith({
        games: [mockGame],
        onGameClick: expect.any(Function),
        emptyMessage: 'Nenhum jogo encontrado'
      })
    })

    it('deve renderizar com game único no array', () => {
      const props: CardRendererProps = {
        game: mockGame
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.games).toEqual([mockGame])
      expect(callArgs.games).toHaveLength(1)
    })

    it('deve renderizar sem onGameClick', () => {
      const props: CardRendererProps = {
        game: mockGame
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.onGameClick).toBeDefined()
      expect(typeof callArgs.onGameClick).toBe('function')
    })
  })

  describe('Props e Configuração', () => {
    it('deve passar games como array com um elemento', () => {
      const props: CardRendererProps = {
        game: mockGame
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(Array.isArray(callArgs.games)).toBe(true)
      expect(callArgs.games[0]).toBe(mockGame)
    })

    it('deve definir emptyMessage padrão', () => {
      const props: CardRendererProps = {
        game: mockGame
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.emptyMessage).toBe('Nenhum jogo encontrado')
    })

    it('deve criar função handleGameClick', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(typeof callArgs.onGameClick).toBe('function')
    })
  })

  describe('Callbacks e Interações', () => {
    it('deve chamar onGameClick quando handleGameClick é executada', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      const handleGameClick = callArgs.onGameClick

      handleGameClick(mockGame)

      expect(mockOnGameClick).toHaveBeenCalledWith(mockGame)
    })

    it('deve chamar onGameClick com jogo correto', () => {
      const differentGame: Game = {
        ...mockGame,
        id: 2,
        name: 'Different Game'
      }

      const props: CardRendererProps = {
        game: differentGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      const handleGameClick = callArgs.onGameClick

      handleGameClick(differentGame)

      expect(mockOnGameClick).toHaveBeenCalledWith(differentGame)
    })

    it('deve lidar com onGameClick undefined', () => {
      const props: CardRendererProps = {
        game: mockGame
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      const handleGameClick = callArgs.onGameClick

      expect(() => handleGameClick(mockGame)).not.toThrow()
    })

    it('deve lidar com múltiplos cliques', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      const handleGameClick = callArgs.onGameClick

      handleGameClick(mockGame)
      handleGameClick(mockGame)
      handleGameClick(mockGame)

      expect(mockOnGameClick).toHaveBeenCalledTimes(3)
    })
  })

  describe('Edge Cases', () => {
    it('deve lidar com game null', () => {
      const props: CardRendererProps = {
        game: null as unknown as Game
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.games).toEqual([null])
    })

    it('deve lidar com game undefined', () => {
      const props: CardRendererProps = {
        game: undefined as unknown as Game
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.games).toEqual([undefined])
    })

    it('deve lidar com game com propriedades mínimas', () => {
      const minimalGame = {
        id: 1,
        name: 'Minimal Game'
      }

      const props: CardRendererProps = {
        game: minimalGame as unknown as Game
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.games).toEqual([minimalGame])
    })

    it('deve lidar com onGameClick que retorna valor', () => {
      const mockOnGameClickWithReturn = jest.fn().mockReturnValue('test')

      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClickWithReturn
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      const handleGameClick = callArgs.onGameClick

      const result = handleGameClick(mockGame)
      expect(result).toBeUndefined()
    })
  })

  describe('Integração', () => {
    it('deve integrar com GridCard corretamente', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      expect(screen.getByTestId('grid-card')).toBeInTheDocument()
    })

    it('deve manter referência estável do handleGameClick', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      const { rerender } = render(<GridCardAdapter {...props} />)

      const firstCallArgs = mockGridCard.mock.calls[0][0]
      const firstHandleGameClick = firstCallArgs.onGameClick

      rerender(<GridCardAdapter {...props} />)

      const secondCallArgs = mockGridCard.mock.calls[1][0]
      const secondHandleGameClick = secondCallArgs.onGameClick

      expect(firstHandleGameClick).toBeDefined()
      expect(secondHandleGameClick).toBeDefined()
      expect(typeof firstHandleGameClick).toBe('function')
      expect(typeof secondHandleGameClick).toBe('function')
    })

    it('deve funcionar com diferentes tipos de games', () => {
      const games = [
        mockGame,
        { ...mockGame, id: 2, name: 'Game 2' },
        { ...mockGame, id: 3, name: 'Game 3' }
      ]

      games.forEach(game => {
        const props: CardRendererProps = {
          game: game as unknown as Game
        }

        render(<GridCardAdapter {...props} />)
      })

      expect(mockGridCard).toHaveBeenCalledTimes(3)
    })
  })

  describe('Performance', () => {
    it('deve lidar com múltiplas renderizações', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      const { rerender } = render(<GridCardAdapter {...props} />)

      for (let i = 0; i < 10; i++) {
        rerender(<GridCardAdapter {...props} />)
      }

      expect(mockGridCard).toHaveBeenCalledTimes(11)
    })

    it('deve manter performance com games grandes', () => {
      const largeGame = {
        ...mockGame,
        name: 'A'.repeat(1000),
        background_image: 'B'.repeat(1000)
      }

      const props: CardRendererProps = {
        game: largeGame as unknown as Game
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.games[0]).toBe(largeGame)
    })
  })

  describe('Testes de Regressão', () => {
    it('deve manter comportamento após múltiplos ciclos', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      for (let i = 0; i < 5; i++) {
        const { unmount } = render(<GridCardAdapter {...props} />)

        const callArgs = mockGridCard.mock.calls[i][0]
        expect(callArgs.games).toEqual([mockGame])
        expect(callArgs.emptyMessage).toBe('Nenhum jogo encontrado')

        unmount()
      }
    })

    it('deve manter estrutura de props consistente', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]

      expect(callArgs).toHaveProperty('games')
      expect(callArgs).toHaveProperty('onGameClick')
      expect(callArgs).toHaveProperty('emptyMessage')

      expect(Array.isArray(callArgs.games)).toBe(true)
      expect(typeof callArgs.onGameClick).toBe('function')
      expect(typeof callArgs.emptyMessage).toBe('string')
    })
  })

  describe('Validação de Dados', () => {
    it('deve validar props obrigatórias', () => {
      const props: CardRendererProps = {
        game: mockGame
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(callArgs.games).toBeDefined()
      expect(callArgs.onGameClick).toBeDefined()
      expect(callArgs.emptyMessage).toBeDefined()
    })

    it('deve manter tipagem correta', () => {
      const props: CardRendererProps = {
        game: mockGame,
        onGameClick: mockOnGameClick
      }

      render(<GridCardAdapter {...props} />)

      const callArgs = mockGridCard.mock.calls[0][0]
      expect(Array.isArray(callArgs.games)).toBe(true)
      expect(typeof callArgs.onGameClick).toBe('function')
      expect(typeof callArgs.emptyMessage).toBe('string')
    })
  })
})
