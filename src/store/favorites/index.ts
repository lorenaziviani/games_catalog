// Types
export type { FavoritesState, StoredFavorites } from './types'

// Actions
export {
  loadFavoritesFromStorage,
  saveFavoritesToStorage,
  syncFavorites
} from './actions'

// Selectors
export {
  selectError,
  selectFavorites,
  selectFavoritesCount,
  selectIsFavorite,
  selectIsLoading
} from './selectors'

// Utils
export {
  FAVORITES_STORAGE_KEY,
  FAVORITES_VERSION,
  favoritesStorage
} from './utils'

// Reducer
export { default as favoritesReducer } from './reducer'

// Actions do reducer
export {
  addToFavorites,
  clearFavorites,
  removeFromFavorites,
  toggleFavorite
} from './reducer'
