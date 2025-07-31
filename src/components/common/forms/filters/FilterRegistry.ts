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

  getAllFilters(): FilterRenderer[] {
    return Array.from(this.filters.values())
  }

  hasFilter(type: FilterType): boolean {
    return this.filters.has(type)
  }

  removeFilter(type: FilterType): boolean {
    return this.filters.delete(type)
  }
}

export const filterRegistry = new FilterRegistry()
