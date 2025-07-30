export enum TextVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  QUATERNARY = 'quaternary',
  QUINARY = 'quinary',
  WHITE = 'white'
}

export enum TagVariant {
  GENRE = 'genre',
  PLATFORM = 'platform'
}

export enum TagSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum ComponentSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum ElementType {
  P = 'p',
  SPAN = 'span',
  TITLE = 'h2'
}

export enum Position {
  TOP_RIGHT = 'top-right',
  TOP_LEFT = 'top-left',
  BOTTOM_RIGHT = 'bottom-right',
  BOTTOM_LEFT = 'bottom-left'
}

export enum LoadingSpinnerVariant {
  DEFAULT = 'default',
  DOTS = 'dots',
  GRADIENT = 'gradient'
}

export enum LoadingSpinnerSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum LoadingMessage {
  DEFAULT = 'Carregando...',
  GAMES = 'Carregando jogos...',
  DATA = 'Carregando dados...',
  API = 'Buscando na API...',
  SEARCH = 'Buscando jogos...'
}

export enum MetacriticScoreSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum MetacriticLabel {
  DEFAULT = 'Metacrítico:'
}

export enum RatingBadgeSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

export enum SortOption {
  NAME = 'name',
  RATING = 'rating',
  RELEASE = 'release',
  ADDED = 'added'
}

export enum RangeSliderThumbType {
  MIN = 'min',
  MAX = 'max'
}

export const RANGE_SLIDER_EVENTS = {
  MOUSE_MOVE: 'mousemove',
  MOUSE_UP: 'mouseup',
  TOUCH_MOVE: 'touchmove',
  TOUCH_END: 'touchend'
} as const

export const RANGE_SLIDER_CONSTRAINTS = {
  MIN_PERCENTAGE: 0,
  MAX_PERCENTAGE: 100,
  TOUCH_PASSIVE: false
} as const

export const GAME_DATA_STORAGE_KEYS = {
  GENRES: 'games-catalog-genres',
  PLATFORMS: 'games-catalog-platforms',
  PARENT_PLATFORMS: 'games-catalog-parent-platforms',
  STORES: 'games-catalog-stores',
  DEVELOPERS: 'games-catalog-developers',
  PUBLISHERS: 'games-catalog-publishers',
  TAGS: 'games-catalog-tags',
  CREATORS: 'games-catalog-creators'
} as const

export const GAME_DATA_QUERY_KEYS = {
  GENRES: 'genres',
  PLATFORMS: 'platforms',
  STORES: 'stores',
  TAGS: 'tags'
} as const

export const GAME_DATA_STALE_TIME = 24 * 60 * 60 * 1000 // 24 horas

export const FILTER_STORAGE_KEY = 'games-catalog-filters'

export const DATE_RANGE_DEFAULTS = {
  START: '1960-01-01',
  END: '2030-12-31'
} as const

export const API_ENDPOINTS = {
  GAMES: '/games',
  GENRES: '/genres',
  PLATFORMS: '/platforms',
  STORES: '/stores',
  TAGS: '/tags'
} as const

export const API_QUERY_PARAMS = {
  PAGE: 'page',
  PAGE_SIZE: 'page_size',
  SEARCH: 'search',
  GENRES: 'genres',
  PLATFORMS: 'platforms',
  PARENT_PLATFORMS: 'parent_platforms',
  STORES: 'stores',
  TAGS: 'tags',
  DATES: 'dates',
  METACRITIC: 'metacritic',
  ORDERING: 'ordering'
} as const

export const API_ORDERING = {
  RATING_DESC: '-rating'
} as const

export const API_ERROR_MESSAGES = {
  DEFAULT: 'Erro na API:',
  POPULAR_GAMES: 'Erro na RAWG API:',
  SEARCH_GAMES: 'Erro na busca RAWG API:',
  FILTERED_GAMES: 'Erro na RAWG API com filtros:',
  GAME_BY_ID: 'Erro ao buscar jogo por ID:',
  GAMES_BY_GENRE: 'Erro ao buscar por gênero:',
  GENRES: 'Erro ao buscar gêneros:',
  PLATFORMS: 'Erro ao buscar plataformas:',
  STORES: 'Erro ao buscar lojas:',
  TAGS: 'Erro ao buscar tags:'
} as const

export const FILTER_FIELDS = {
  GENRES: 'genres',
  PLATFORMS: 'platforms',
  STORES: 'stores',
  TAGS: 'tags'
} as const

export const DEFAULT_FILTER_ORDERING = API_ORDERING.RATING_DESC

export const SORT_OPTIONS = [
  { value: SortOption.NAME, label: 'Nome' },
  { value: SortOption.RATING, label: 'Avaliação' },
  { value: SortOption.RELEASE, label: 'Data de Lançamento' },
  { value: SortOption.ADDED, label: 'Adicionados Recentemente' }
] as const

export const DEFAULT_SORT: SortOption = SortOption.ADDED
