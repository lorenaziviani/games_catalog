import type { Game as GameDTO } from '@/types/game'

export class Game {
  private readonly _id: number
  private readonly _name: string
  private readonly _slug: string
  private readonly _backgroundImage: string
  private readonly _rating: number
  private readonly _ratingTop: number
  private readonly _metacritic: number | null
  private readonly _playtime: number
  private readonly _released: string
  private readonly _updated: string
  private readonly _tba: boolean
  private readonly _added: number
  private readonly _addedByStatus: {
    yet: number
    owned: number
    beaten: number
    toplay: number
    dropped: number
    playing: number
  }
  private readonly _ratings: Array<{
    id: number
    title: string
    count: number
    percent: number
  }>
  private readonly _ratingsCount: number
  private readonly _reviewsTextCount: number
  private readonly _suggestionsCount: number
  private readonly _userGame: string | null
  private readonly _reviewsCount: number
  private readonly _saturatedColor: string
  private readonly _dominantColor: string
  private readonly _platforms: Array<{
    platform: {
      id: number
      name: string
      slug: string
      image: string | null
      yearEnd: number | null
      yearStart: number | null
      gamesCount: number
      imageBackground: string
    }
    releasedAt: string
    requirementsEn: {
      minimum?: string
      recommended?: string
    }
    requirementsRu: {
      minimum?: string
      recommended?: string
    } | null
  }>
  private readonly _genres: Array<{
    id: number
    name: string
    slug: string
    gamesCount: number
    imageBackground: string
  }>
  private readonly _stores: Array<{
    id: number
    store: {
      id: number
      name: string
      slug: string
      domain: string
      gamesCount: number
      imageBackground: string
    }
  }>
  private readonly _tags: Array<{
    id: number
    name: string
    slug: string
    language: string
    gamesCount: number
    imageBackground: string
  }>
  private readonly _esrbRating?: {
    id: number
    name: string
    slug: string
  }
  private readonly _shortScreenshots: Array<{
    id: number
    image: string
  }>
  private readonly _clip: string | null

  constructor(gameData: GameDTO) {
    this._id = gameData.id
    this._name = gameData.name
    this._slug = gameData.slug
    this._backgroundImage = gameData.background_image
    this._rating = gameData.rating
    this._ratingTop = gameData.rating_top
    this._metacritic = gameData.metacritic
    this._playtime = gameData.playtime
    this._released = gameData.released
    this._updated = gameData.updated
    this._tba = gameData.tba
    this._added = gameData.added
    this._addedByStatus = gameData.added_by_status
    this._ratings = gameData.ratings
    this._ratingsCount = gameData.ratings_count
    this._reviewsTextCount = gameData.reviews_text_count
    this._suggestionsCount = gameData.suggestions_count
    this._userGame = gameData.user_game
    this._reviewsCount = gameData.reviews_count
    this._saturatedColor = gameData.saturated_color
    this._dominantColor = gameData.dominant_color
    this._platforms = gameData.platforms.map(platform => ({
      platform: {
        id: platform.platform.id,
        name: platform.platform.name,
        slug: platform.platform.slug,
        image: platform.platform.image,
        yearEnd: platform.platform.year_end,
        yearStart: platform.platform.year_start,
        gamesCount: platform.platform.games_count,
        imageBackground: platform.platform.image_background
      },
      releasedAt: platform.released_at,
      requirementsEn: platform.requirements_en,
      requirementsRu: platform.requirements_ru
    }))
    this._genres = gameData.genres.map(genre => ({
      id: genre.id,
      name: genre.name,
      slug: genre.slug,
      gamesCount: genre.games_count,
      imageBackground: genre.image_background
    }))
    this._stores = gameData.stores.map(store => ({
      id: store.id,
      store: {
        id: store.store.id,
        name: store.store.name,
        slug: store.store.slug,
        domain: store.store.domain,
        gamesCount: store.store.games_count,
        imageBackground: store.store.image_background
      }
    }))
    this._tags = gameData.tags.map(tag => ({
      id: tag.id,
      name: tag.name,
      slug: tag.slug,
      language: tag.language,
      gamesCount: tag.games_count,
      imageBackground: tag.image_background
    }))
    this._esrbRating = gameData.esrb_rating
    this._shortScreenshots = gameData.short_screenshots
    this._clip = gameData.clip
  }

  get id(): number {
    return this._id
  }

  get name(): string {
    return this._name
  }

  get slug(): string {
    return this._slug
  }

  get backgroundImage(): string {
    return this._backgroundImage
  }

  get rating(): number {
    return this._rating
  }

  get ratingTop(): number {
    return this._ratingTop
  }

  get metacritic(): number | null {
    return this._metacritic
  }

  get playtime(): number {
    return this._playtime
  }

  get released(): string {
    return this._released
  }

  get updated(): string {
    return this._updated
  }

  get tba(): boolean {
    return this._tba
  }

  get added(): number {
    return this._added
  }

  get addedByStatus() {
    return this._addedByStatus
  }

  get ratings() {
    return this._ratings
  }

  get ratingsCount(): number {
    return this._ratingsCount
  }

  get reviewsTextCount(): number {
    return this._reviewsTextCount
  }

  get suggestionsCount(): number {
    return this._suggestionsCount
  }

  get userGame(): string | null {
    return this._userGame
  }

  get reviewsCount(): number {
    return this._reviewsCount
  }

  get saturatedColor(): string {
    return this._saturatedColor
  }

  get dominantColor(): string {
    return this._dominantColor
  }

  get platforms() {
    return this._platforms
  }

  get genres() {
    return this._genres
  }

  get stores() {
    return this._stores
  }

  get tags() {
    return this._tags
  }

  get esrbRating() {
    return this._esrbRating
  }

  get shortScreenshots() {
    return this._shortScreenshots
  }

  get clip(): string | null {
    return this._clip
  }

  isReleased(): boolean {
    return !this._tba && this._released !== null
  }

  isHighlyRated(): boolean {
    return this._rating >= 4.0
  }

  hasMetacriticScore(): boolean {
    return this._metacritic !== null && this._metacritic > 0
  }

  getPlatformNames(): string[] {
    return this._platforms.map(p => p.platform.name)
  }

  getGenreNames(): string[] {
    return this._genres.map(g => g.name)
  }

  getStoreNames(): string[] {
    return this._stores.map(s => s.store.name)
  }

  getTagNames(): string[] {
    return this._tags.map(t => t.name)
  }

  getPlatformIds(): number[] {
    return this._platforms.map(p => p.platform.id)
  }

  getGenreIds(): number[] {
    return this._genres.map(g => g.id)
  }

  getStoreIds(): number[] {
    return this._stores.map(s => s.store.id)
  }

  getTagIds(): number[] {
    return this._tags.map(t => t.id)
  }

  matchesSearchTerm(searchTerm: string): boolean {
    const normalizedSearch = searchTerm.toLowerCase()
    const normalizedName = this._name.toLowerCase()
    return normalizedName.includes(normalizedSearch)
  }

  matchesGenreFilter(genreIds: number[]): boolean {
    if (genreIds.length === 0) return true
    const gameGenreIds = this.getGenreIds()
    return genreIds.some(genreId => gameGenreIds.includes(genreId))
  }

  matchesPlatformFilter(platformIds: number[]): boolean {
    if (platformIds.length === 0) return true
    const gamePlatformIds = this.getPlatformIds()
    return platformIds.some(platformId => gamePlatformIds.includes(platformId))
  }

  matchesStoreFilter(storeIds: number[]): boolean {
    if (storeIds.length === 0) return true
    const gameStoreIds = this.getStoreIds()
    return storeIds.some(storeId => gameStoreIds.includes(storeId))
  }

  matchesTagFilter(tagIds: number[]): boolean {
    if (tagIds.length === 0) return true
    const gameTagIds = this.getTagIds()
    return tagIds.some(tagId => gameTagIds.includes(tagId))
  }

  toDTO(): GameDTO {
    return {
      id: this._id,
      name: this._name,
      slug: this._slug,
      background_image: this._backgroundImage,
      rating: this._rating,
      rating_top: this._ratingTop,
      metacritic: this._metacritic,
      playtime: this._playtime,
      released: this._released,
      updated: this._updated,
      tba: this._tba,
      added: this._added,
      added_by_status: this._addedByStatus,
      ratings: this._ratings,
      ratings_count: this._ratingsCount,
      reviews_text_count: this._reviewsTextCount,
      suggestions_count: this._suggestionsCount,
      user_game: this._userGame,
      reviews_count: this._reviewsCount,
      saturated_color: this._saturatedColor,
      dominant_color: this._dominantColor,
      platforms: this._platforms.map(platform => ({
        platform: {
          id: platform.platform.id,
          name: platform.platform.name,
          slug: platform.platform.slug,
          image: platform.platform.image,
          year_end: platform.platform.yearEnd,
          year_start: platform.platform.yearStart,
          games_count: platform.platform.gamesCount,
          image_background: platform.platform.imageBackground
        },
        released_at: platform.releasedAt,
        requirements_en: platform.requirementsEn,
        requirements_ru: platform.requirementsRu
      })),
      genres: this._genres.map(genre => ({
        id: genre.id,
        name: genre.name,
        slug: genre.slug,
        games_count: genre.gamesCount,
        image_background: genre.imageBackground
      })),
      stores: this._stores.map(store => ({
        id: store.id,
        store: {
          id: store.store.id,
          name: store.store.name,
          slug: store.store.slug,
          domain: store.store.domain,
          games_count: store.store.gamesCount,
          image_background: store.store.imageBackground
        }
      })),
      tags: this._tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        language: tag.language,
        games_count: tag.gamesCount,
        image_background: tag.imageBackground
      })),
      esrb_rating: this._esrbRating,
      short_screenshots: this._shortScreenshots,
      clip: this._clip
    }
  }
}
