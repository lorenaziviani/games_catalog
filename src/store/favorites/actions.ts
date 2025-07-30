import type { Game } from '@/types/game'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { favoritesStorage } from './utils'

export const loadFavoritesFromStorage = createAsyncThunk(
  'favorites/loadFromStorage',
  async (_, { rejectWithValue }) => {
    try {
      if (!favoritesStorage.isAvailable()) {
        throw new Error('localStorage não está disponível')
      }

      const favorites = favoritesStorage.load()
      return favorites
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error)
      return rejectWithValue('Erro ao carregar favoritos')
    }
  }
)

export const saveFavoritesToStorage = createAsyncThunk(
  'favorites/saveToStorage',
  async (favorites: Game[], { rejectWithValue }) => {
    try {
      if (!favoritesStorage.isAvailable()) {
        throw new Error('localStorage não está disponível')
      }

      favoritesStorage.save(favorites)
      return favorites
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error)
      return rejectWithValue('Erro ao salvar favoritos')
    }
  }
)

export const syncFavorites = createAsyncThunk(
  'favorites/sync',
  async (favorites: Game[], { dispatch }) => {
    try {
      await dispatch(saveFavoritesToStorage(favorites)).unwrap()
      return favorites
    } catch (error) {
      console.error('Erro ao sincronizar favoritos:', error)
      throw error
    }
  }
)
