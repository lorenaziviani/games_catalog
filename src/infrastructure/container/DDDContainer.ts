import type { IFavoritesRepository } from '../../domain/repositories/IFavoritesRepository'
import type { IGameRepository } from '../../domain/repositories/IGameRepository'
import { GameDomainService } from '../../domain/services/GameDomainService'
import { FavoritesRepository } from '../repositories/FavoritesRepository'
import { GameRepository } from '../repositories/GameRepository'

class DDDContainer {
  private static instance: DDDContainer
  private repositories: Map<string, any> = new Map()
  private services: Map<string, any> = new Map()

  private constructor() {
    this.initializeRepositories()
    this.initializeServices()
  }

  static getInstance(): DDDContainer {
    if (!DDDContainer.instance) {
      DDDContainer.instance = new DDDContainer()
    }
    return DDDContainer.instance
  }

  private initializeRepositories(): void {
    this.repositories.set('GameRepository', new GameRepository())
    this.repositories.set('FavoritesRepository', new FavoritesRepository())
  }

  private initializeServices(): void {
    const gameRepository = this.getRepository<IGameRepository>('GameRepository')
    const favoritesRepository = this.getRepository<IFavoritesRepository>(
      'FavoritesRepository'
    )

    this.services.set(
      'GameDomainService',
      new GameDomainService(gameRepository, favoritesRepository)
    )
  }

  getRepository<T>(name: string): T {
    const repository = this.repositories.get(name)
    if (!repository) {
      throw new Error(`Repository ${name} not found`)
    }
    return repository as T
  }

  getService<T>(name: string): T {
    const service = this.services.get(name)
    if (!service) {
      throw new Error(`Service ${name} not found`)
    }
    return service as T
  }

  getGameRepository(): IGameRepository {
    return this.getRepository<IGameRepository>('GameRepository')
  }

  getFavoritesRepository(): IFavoritesRepository {
    return this.getRepository<IFavoritesRepository>('FavoritesRepository')
  }

  getGameDomainService(): GameDomainService {
    return this.getService<GameDomainService>('GameDomainService')
  }
}

export const dddContainer = DDDContainer.getInstance()
