import { FavoritesService } from '@/store/favorites/FavoritesService'
import { LocalStorageFavoritesRepository } from '@/store/favorites/repositories/LocalStorageFavoritesRepository'
import { GameService } from './GameService'
import type { IGameService } from './interfaces/IGameService'
import type { IMetadataService } from './interfaces/IMetadataService'
import { MetadataService } from './metadataService'
import { ObservabilityService } from './observability/ObservabilityService'
import { ConsoleProvider } from './observability/providers/ConsoleProvider'
import { LogRocketProvider } from './observability/providers/LogRocketProvider'

export class ServiceContainer {
  private static instance: ServiceContainer
  private gameService: IGameService
  private metadataService: IMetadataService
  private favoritesService: FavoritesService
  private observabilityService: ObservabilityService

  private constructor() {
    this.observabilityService = new ObservabilityService({
      enabled: true,
      providers: [new ConsoleProvider(), new LogRocketProvider()]
    })
    this.metadataService = new MetadataService()
    this.gameService = new GameService(this.observabilityService)
    this.favoritesService = new FavoritesService(
      new LocalStorageFavoritesRepository()
    )
  }

  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer()
    }
    return ServiceContainer.instance
  }

  getGameService(): IGameService {
    return this.gameService
  }

  getMetadataService(): IMetadataService {
    return this.metadataService
  }

  getFavoritesService(): FavoritesService {
    return this.favoritesService
  }
}

export const serviceContainer = ServiceContainer.getInstance()
