import { getRawgApiUrl } from '@/config/api'
import { API_ENDPOINTS, API_ERROR_MESSAGES } from '@/types/common'
import type {
  GenresResponse,
  PlatformsResponse,
  StoresResponse,
  TagsResponse
} from '@/types/game'
import { fetchWithHeaders } from '@/utils/api'
import type { IMetadataService } from './interfaces/IMetadataService'

export class MetadataService implements IMetadataService {
  async getGenres(): Promise<GenresResponse> {
    try {
      const response = await fetchWithHeaders(
        getRawgApiUrl(API_ENDPOINTS.GENRES)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.GENRES, error)
      throw error
    }
  }

  async getPlatforms(): Promise<PlatformsResponse> {
    try {
      const response = await fetchWithHeaders(
        getRawgApiUrl(API_ENDPOINTS.PLATFORMS)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.PLATFORMS, error)
      throw error
    }
  }

  async getStores(): Promise<StoresResponse> {
    try {
      const response = await fetchWithHeaders(
        getRawgApiUrl(API_ENDPOINTS.STORES)
      )

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.STORES, error)
      throw error
    }
  }

  async getTags(): Promise<TagsResponse> {
    try {
      const response = await fetchWithHeaders(getRawgApiUrl(API_ENDPOINTS.TAGS))

      if (!response.ok) {
        throw new Error(`${API_ERROR_MESSAGES.DEFAULT} ${response.status}`)
      }

      const data = await response.json()

      return data
    } catch (error) {
      console.error(API_ERROR_MESSAGES.TAGS, error)
      throw error
    }
  }
}
