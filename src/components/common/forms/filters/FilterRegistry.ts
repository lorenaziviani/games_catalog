import type { FilterType } from '@/types/filter'
import type { FilterRenderer, FilterRegistry as IFilterRegistry } from './types'

export class FilterRegistry implements IFilterRegistry {
  private filters: Map<FilterType, FilterRenderer> = new Map()

  registerFilter(renderer: FilterRenderer): void {
    this.filters.set(renderer.type, renderer)
  }

  getFilter(type: FilterType): FilterRenderer | undefined {
    return this.filters.get(type)
  }
}

export const filterRegistry = new FilterRegistry()
