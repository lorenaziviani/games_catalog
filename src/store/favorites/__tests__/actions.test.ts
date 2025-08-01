import type { Game } from '@/types/game'
import { loadFavoritesFromStorage, saveFavoritesToStorage } from '../actions'
import { favoritesStorage } from '../utils'

jest.mock('../utils', () => ({
  favoritesStorage: {
    isAvailable: jest.fn(),
    load: jest.fn(),
    save: jest.fn()
  }
}))

describe('favorites actions', () => {
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

  const mockFavorites = [mockGame]

  beforeEach(() => {
    jest.clearAllMocks()
    console.error = jest.fn()
  })

  const mockFavoritesStorage = favoritesStorage as jest.Mocked<
    typeof favoritesStorage
  >

  describe('loadFavoritesFromStorage', () => {
    it('deve carregar favoritos com sucesso', async () => {
      mockFavoritesStorage.isAvailable.mockResolvedValue(true)
      mockFavoritesStorage.load.mockResolvedValue(mockFavorites)

      const result = await loadFavoritesFromStorage()(jest.fn(), jest.fn(), {})

      expect(mockFavoritesStorage.isAvailable).toHaveBeenCalled()
      expect(mockFavoritesStorage.load).toHaveBeenCalled()
      expect(result.payload).toEqual(mockFavorites)
    })
  })

  describe('saveFavoritesToStorage', () => {
    it('deve salvar favoritos com sucesso', async () => {
      mockFavoritesStorage.isAvailable.mockResolvedValue(true)
      mockFavoritesStorage.save.mockResolvedValue(undefined)

      const result = await saveFavoritesToStorage(mockFavorites)(
        jest.fn(),
        jest.fn(),
        {}
      )

      expect(mockFavoritesStorage.isAvailable).toHaveBeenCalled()
      expect(mockFavoritesStorage.save).toHaveBeenCalledWith(mockFavorites)
      expect(result.payload).toEqual(mockFavorites)
    })
  })

  describe('syncFavorites', () => {})
})
