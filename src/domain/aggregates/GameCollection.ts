import { Game } from '@/domain/entities/Game'

export class GameCollection {
  private readonly _games: Game[]
  private readonly _totalCount: number
  private readonly _nextPage?: string
  private readonly _previousPage?: string

  constructor(
    games: Game[],
    totalCount: number,
    nextPage?: string,
    previousPage?: string
  ) {
    this._games = games
    this._totalCount = totalCount
    this._nextPage = nextPage
    this._previousPage = previousPage
  }

  get games(): Game[] {
    return [...this._games]
  }

  get totalCount(): number {
    return this._totalCount
  }

  get nextPage(): string | undefined {
    return this._nextPage
  }

  get previousPage(): string | undefined {
    return this._previousPage
  }

  get count(): number {
    return this._games.length
  }

  isEmpty(): boolean {
    return this._games.length === 0
  }

  hasNextPage(): boolean {
    return !!this._nextPage
  }

  hasPreviousPage(): boolean {
    return !!this._previousPage
  }

  getHighlyRatedGames(): Game[] {
    return this._games.filter(game => game.isHighlyRated())
  }

  getReleasedGames(): Game[] {
    return this._games.filter(game => game.isReleased())
  }

  getGamesWithMetacriticScore(): Game[] {
    return this._games.filter(game => game.hasMetacriticScore())
  }

  searchGames(searchTerm: string): Game[] {
    if (!searchTerm.trim()) return this._games
    return this._games.filter(game => game.matchesSearchTerm(searchTerm))
  }

  filterByGenres(genreIds: number[]): Game[] {
    return this._games.filter(game => game.matchesGenreFilter(genreIds))
  }

  filterByPlatforms(platformIds: number[]): Game[] {
    return this._games.filter(game => game.matchesPlatformFilter(platformIds))
  }

  filterByStores(storeIds: number[]): Game[] {
    return this._games.filter(game => game.matchesStoreFilter(storeIds))
  }

  filterByTags(tagIds: number[]): Game[] {
    return this._games.filter(game => game.matchesTagFilter(tagIds))
  }

  sortByRating(ascending: boolean = false): Game[] {
    return [...this._games].sort((a, b) => {
      return ascending ? a.rating - b.rating : b.rating - a.rating
    })
  }

  sortByName(ascending: boolean = true): Game[] {
    return [...this._games].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name)
      return ascending ? comparison : -comparison
    })
  }

  sortByReleaseDate(ascending: boolean = false): Game[] {
    return [...this._games].sort((a, b) => {
      const dateA = new Date(a.released).getTime()
      const dateB = new Date(b.released).getTime()
      return ascending ? dateA - dateB : dateB - dateA
    })
  }

  getAverageRating(): number {
    if (this._games.length === 0) return 0
    const totalRating = this._games.reduce((sum, game) => sum + game.rating, 0)
    return totalRating / this._games.length
  }

  getGamesByGenre(genreName: string): Game[] {
    return this._games.filter(game =>
      game
        .getGenreNames()
        .some(name => name.toLowerCase().includes(genreName.toLowerCase()))
    )
  }

  getGamesByPlatform(platformName: string): Game[] {
    return this._games.filter(game =>
      game
        .getPlatformNames()
        .some(name => name.toLowerCase().includes(platformName.toLowerCase()))
    )
  }

  getUniqueGenres(): string[] {
    const allGenres = this._games.flatMap(game => game.getGenreNames())
    return [...new Set(allGenres)]
  }

  getUniquePlatforms(): string[] {
    const allPlatforms = this._games.flatMap(game => game.getPlatformNames())
    return [...new Set(allPlatforms)]
  }

  getUniqueStores(): string[] {
    const allStores = this._games.flatMap(game => game.getStoreNames())
    return [...new Set(allStores)]
  }

  getUniqueTags(): string[] {
    const allTags = this._games.flatMap(game => game.getTagNames())
    return [...new Set(allTags)]
  }

  getTopRatedGames(limit: number = 10): Game[] {
    return this.sortByRating(false).slice(0, limit)
  }

  getRecentlyReleasedGames(limit: number = 10): Game[] {
    return this.sortByReleaseDate(false).slice(0, limit)
  }

  getGamesWithHighMetacriticScore(threshold: number = 80): Game[] {
    return this._games.filter(
      game => game.hasMetacriticScore() && game.metacritic! >= threshold
    )
  }

  getPage(page: number, pageSize: number): Game[] {
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return this._games.slice(startIndex, endIndex)
  }

  getTotalPages(pageSize: number): number {
    return Math.ceil(this._totalCount / pageSize)
  }

  getGenreDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {}

    this._games.forEach(game => {
      game.getGenreNames().forEach(genre => {
        distribution[genre] = (distribution[genre] || 0) + 1
      })
    })

    return distribution
  }

  getPlatformDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {}

    this._games.forEach(game => {
      game.getPlatformNames().forEach(platform => {
        distribution[platform] = (distribution[platform] || 0) + 1
      })
    })

    return distribution
  }

  getRatingDistribution(): Record<string, number> {
    const distribution: Record<string, number> = {
      '0-1': 0,
      '1-2': 0,
      '2-3': 0,
      '3-4': 0,
      '4-5': 0
    }

    this._games.forEach(game => {
      const rating = game.rating
      if (rating >= 0 && rating < 1) distribution['0-1']++
      else if (rating >= 1 && rating < 2) distribution['1-2']++
      else if (rating >= 2 && rating < 3) distribution['2-3']++
      else if (rating >= 3 && rating < 4) distribution['3-4']++
      else if (rating >= 4 && rating <= 5) distribution['4-5']++
    })

    return distribution
  }
}
