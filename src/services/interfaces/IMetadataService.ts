import type {
  GenresResponse,
  PlatformsResponse,
  StoresResponse,
  TagsResponse
} from '@/types/game'

export interface IMetadataService {
  getGenres(): Promise<GenresResponse>
  getPlatforms(): Promise<PlatformsResponse>
  getStores(): Promise<StoresResponse>
  getTags(): Promise<TagsResponse>
}
