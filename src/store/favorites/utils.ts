import type { Game } from '@/types/game'
import { LocalStorageProvider } from './storage/LocalStorageProvider'
import { StorageService } from './storage/StorageService'
import type { StorageConfig } from './storage/types'
import type { StoredFavorites } from './types'

export const FAVORITES_STORAGE_KEY = 'favorites'
export const FAVORITES_VERSION = '1.0.0'

const storageConfig: StorageConfig = {
  provider: new LocalStorageProvider('heroes_catalog'),
  prefix: 'favorites'
}

const storageService = new StorageService(storageConfig)

export const favoritesStorage = {
  save: async (favorites: Game[]): Promise<void> => {
    try {
      const data: StoredFavorites = {
        items: favorites,
        lastUpdated: Date.now()
      }
      await storageService.save(FAVORITES_STORAGE_KEY, data)
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error)
      throw new Error('Erro ao salvar favoritos')
    }
  },

  load: async (): Promise<Game[]> => {
    try {
      const data: StoredFavorites = await storageService.load(
        FAVORITES_STORAGE_KEY
      )

      if (!data || !Array.isArray(data.items)) {
        console.warn('Dados inválidos no storage, limpando...')
        await storageService.remove(FAVORITES_STORAGE_KEY)
        return []
      }

      return data.items
    } catch (error) {
      console.error('Erro ao carregar favoritos:', error)
      await storageService.remove(FAVORITES_STORAGE_KEY)
      return []
    }
  },

  clear: async (): Promise<void> => {
    try {
      await storageService.remove(FAVORITES_STORAGE_KEY)
    } catch (error) {
      console.error('Erro ao limpar favoritos:', error)
    }
  },

  isAvailable: async (): Promise<boolean> => {
    try {
      await storageService.save('test', 'test')
      await storageService.remove('test')
      return true
    } catch {
      return false
    }
  },

  setStorageProvider: (provider: any) => {
    storageService.setProvider(provider)
  },

  migrateData: async (newProvider: any, keys: string[]) => {
    await storageService.migrateToProvider(newProvider, keys)
  }
}
