import type { Game } from '@/types/game'
import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { loadFavoritesFromStorage, saveFavoritesToStorage } from './actions'
import type { FavoritesState } from './types'
import { favoritesStorage } from './utils'

const initialState: FavoritesState = {
  items: [],
  isLoading: false,
  error: null,
  lastUpdated: null
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Game>) => {
      const game = state.items.find(item => item.id === action.payload.id)
      if (!game) {
        state.items.push(action.payload)
        state.lastUpdated = Date.now()
        favoritesStorage.save(state.items)
      }
    },

    removeFromFavorites: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.lastUpdated = Date.now()
      favoritesStorage.save(state.items)
    },

    toggleFavorite: (state, action: PayloadAction<Game>) => {
      const gameIndex = state.items.findIndex(
        item => item.id === action.payload.id
      )
      if (gameIndex === -1) {
        state.items.push(action.payload)
      } else {
        state.items.splice(gameIndex, 1)
      }
      state.lastUpdated = Date.now()
      favoritesStorage.save(state.items)
    },

    clearFavorites: state => {
      state.items = []
      state.lastUpdated = Date.now()
      favoritesStorage.clear()
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadFavoritesFromStorage.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loadFavoritesFromStorage.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload
        state.lastUpdated = Date.now()
      })
      .addCase(loadFavoritesFromStorage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Erro ao carregar favoritos'
      })
      .addCase(saveFavoritesToStorage.pending, state => {
        state.isLoading = true
        state.error = null
      })
      .addCase(saveFavoritesToStorage.fulfilled, state => {
        state.isLoading = false
      })
      .addCase(saveFavoritesToStorage.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || 'Erro ao salvar favoritos'
      })
  }
})

export default favoritesSlice.reducer

export const {
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  clearFavorites
} = favoritesSlice.actions
