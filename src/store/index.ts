import { configureStore } from '@reduxjs/toolkit'
import { favoritesReducer } from './favorites'

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'favorites/toggleFavorite',
          'favorites/addToFavorites',
          'favorites/removeFromFavorites'
        ],
        ignoredPaths: ['favorites.lastUpdated']
      }
    }),
  devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
