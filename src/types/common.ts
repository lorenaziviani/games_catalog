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

export const SORT_OPTIONS = [
  { value: SortOption.NAME, label: 'Nome' },
  { value: SortOption.RATING, label: 'Avaliação' },
  { value: SortOption.RELEASE, label: 'Data de Lançamento' },
  { value: SortOption.ADDED, label: 'Adicionados Recentemente' }
] as const

export const DEFAULT_SORT: SortOption = SortOption.ADDED
