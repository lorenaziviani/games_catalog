import type { Game } from '@/types/game'
import { configureStore } from '@reduxjs/toolkit'
import { loadFavoritesFromStorage, saveFavoritesToStorage } from '../actions'
import favoritesReducer, {
  addToFavorites,
  clearFavorites,
  removeFromFavorites,
  toggleFavorite
} from '../reducer'

jest.mock('../utils', () => ({
  favoritesStorage: {
    save: jest.fn(),
    clear: jest.fn()
  }
}))

describe('favoritesReducer', () => {
  const mockGame: Game = {
    id: 1,
    name: 'Test Game',
    slug: 'test-game',
    background_image: 'https://example.com/image.jpg',
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
      beaten: 30,
      toplay: 5,
      dropped: 3,
      playing: 2
    },
    ratings: [
      {
        id: 1,
        title: 'Exceptional',
        count: 100,
        percent: 85
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
          year_start: 1990,
          games_count: 1000,
          image_background: 'https://example.com/platform-bg.jpg'
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
        image_background: 'https://example.com/genre-bg.jpg'
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
    tags: [
      {
        id: 1,
        name: 'Adventure',
        slug: 'adventure',
        language: 'eng',
        games_count: 200,
        image_background: 'https://example.com/genre-bg.jpg'
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
        image: 'https://example.com/screenshot.jpg'
      }
    ],
    clip: null
  }

  const mockGame2: Game = {
    ...mockGame,
    id: 2,
    name: 'Test Game 2',
    slug: 'test-game-2'
  }

  let store: ReturnType<typeof configureStore>

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favorites: favoritesReducer
      }
    })
    jest.clearAllMocks()
  })

  describe('initial state', () => {
    it('deve ter o estado inicial correto', () => {
      const state = store.getState().favorites
      expect(state).toEqual({
        items: [],
        isLoading: false,
        error: null,
        lastUpdated: null
      })
    })
  })

  describe('addToFavorites', () => {
    it('deve adicionar um jogo aos favoritos', () => {
      store.dispatch(addToFavorites(mockGame))

      const state = store.getState().favorites
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual(mockGame)
      expect(state.lastUpdated).toBeGreaterThan(0)
    })

    it('não deve adicionar o mesmo jogo duas vezes', () => {
      store.dispatch(addToFavorites(mockGame))
      store.dispatch(addToFavorites(mockGame))

      const state = store.getState().favorites
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual(mockGame)
    })

    it('deve adicionar jogos diferentes', () => {
      store.dispatch(addToFavorites(mockGame))
      store.dispatch(addToFavorites(mockGame2))

      const state = store.getState().favorites
      expect(state.items).toHaveLength(2)
      expect(state.items).toContainEqual(mockGame)
      expect(state.items).toContainEqual(mockGame2)
    })
  })

  describe('removeFromFavorites', () => {
    it('deve remover um jogo dos favoritos', () => {
      store.dispatch(addToFavorites(mockGame))
      store.dispatch(addToFavorites(mockGame2))

      store.dispatch(removeFromFavorites(mockGame.id))

      const state = store.getState().favorites
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual(mockGame2)
      expect(state.lastUpdated).toBeGreaterThan(0)
    })

    it('deve manter a lista inalterada se o jogo não existir', () => {
      store.dispatch(addToFavorites(mockGame))
      const initialState = store.getState().favorites

      store.dispatch(removeFromFavorites(999))

      const state = store.getState().favorites
      expect(state.items).toEqual(initialState.items)
    })
  })

  describe('toggleFavorite', () => {
    it('deve adicionar um jogo quando não está nos favoritos', () => {
      store.dispatch(toggleFavorite(mockGame))

      const state = store.getState().favorites
      expect(state.items).toHaveLength(1)
      expect(state.items[0]).toEqual(mockGame)
      expect(state.lastUpdated).toBeGreaterThan(0)
    })

    it('deve remover um jogo quando já está nos favoritos', () => {
      store.dispatch(addToFavorites(mockGame))
      store.dispatch(toggleFavorite(mockGame))

      const state = store.getState().favorites
      expect(state.items).toHaveLength(0)
      expect(state.lastUpdated).toBeGreaterThan(0)
    })

    it('deve alternar corretamente entre adicionar e remover', () => {
      store.dispatch(toggleFavorite(mockGame))
      expect(store.getState().favorites.items).toHaveLength(1)

      store.dispatch(toggleFavorite(mockGame))
      expect(store.getState().favorites.items).toHaveLength(0)

      store.dispatch(toggleFavorite(mockGame))
      expect(store.getState().favorites.items).toHaveLength(1)
    })
  })

  describe('clearFavorites', () => {
    it('deve limpar todos os favoritos', () => {
      store.dispatch(addToFavorites(mockGame))
      store.dispatch(addToFavorites(mockGame2))

      store.dispatch(clearFavorites())

      const state = store.getState().favorites
      expect(state.items).toHaveLength(0)
      expect(state.lastUpdated).toBeGreaterThan(0)
    })
  })

  describe('extraReducers - loadFavoritesFromStorage', () => {
    it('deve lidar com pending', () => {
      store.dispatch(loadFavoritesFromStorage.pending(''))

      const state = store.getState().favorites
      expect(state.isLoading).toBe(true)
      expect(state.error).toBe(null)
    })

    it('deve lidar com fulfilled', () => {
      const mockFavorites = [mockGame, mockGame2]
      store.dispatch(loadFavoritesFromStorage.fulfilled(mockFavorites, ''))

      const state = store.getState().favorites
      expect(state.isLoading).toBe(false)
      expect(state.items).toEqual(mockFavorites)
      expect(state.lastUpdated).toBeGreaterThan(0)
    })

    it('deve lidar com rejected', () => {
      const error = new Error('Erro ao carregar favoritos')
      store.dispatch(
        loadFavoritesFromStorage.rejected(error, '', undefined, error)
      )

      const state = store.getState().favorites
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe('Erro ao carregar favoritos')
    })
  })

  describe('extraReducers - saveFavoritesToStorage', () => {
    it('deve lidar com pending', () => {
      store.dispatch(saveFavoritesToStorage.pending('', [mockGame]))

      const state = store.getState().favorites
      expect(state.isLoading).toBe(true)
      expect(state.error).toBe(null)
    })

    it('deve lidar com fulfilled', () => {
      store.dispatch(
        saveFavoritesToStorage.fulfilled([mockGame], '', [mockGame])
      )

      const state = store.getState().favorites
      expect(state.isLoading).toBe(false)
    })

    it('deve lidar com rejected', () => {
      const error = new Error('Erro ao salvar favoritos')
      store.dispatch(
        saveFavoritesToStorage.rejected(error, '', [mockGame], error)
      )

      const state = store.getState().favorites
      expect(state.isLoading).toBe(false)
      expect(state.error).toBe('Erro ao salvar favoritos')
    })
  })
})
